import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'prisma/generated/prisma/client'
import { SessionService } from 'src/common/services/session/session.service'
import { RESET_PASSWORD } from 'src/consts'
import { IBcryptoRepository } from 'src/core/crypto/bcrypto/IBcryptoRepository'
import { IUserRepository } from 'src/modules/users/repositories/IUserRepository'
import { ChangePasswordDto } from '../dto/change-password.dto'
import { ForgotPasswordDto } from '../dto/forgot-password.dto'
import { ResetPasswordDto } from '../dto/reset-password.dto'
import { SignInDto } from '../dto/sign-in.dto'
import { SignUpDto } from '../dto/sign-up.dto'
import { IAuthRepository } from './IAuthRepository'

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(IUserRepository)
    private users: IUserRepository,
    @Inject(IBcryptoRepository)
    private bcrypt: IBcryptoRepository,
    private session: SessionService,
    private jwtService: JwtService,
  ) {}

  async getMe(id: string): Promise<User> {
    const user = await this.users.getById(id)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }

  async signUp(data: SignUpDto): Promise<{ message: string }> {
    const hashedPassword = await this.bcrypt.hash(data.password)

    await this.users.create({
      ...data,
      password: hashedPassword,
    })

    return {
      message: 'Signup successful',
    }
  }

  async signIn(data: SignInDto): Promise<{ message: string; access_token: string }> {
    const user = await this.users.getByEmail(data.email)

    if (user && (await this.bcrypt.compare(data.password, user.password))) {
      return {
        access_token: this.jwtService.sign({
          sub: user.id,
          email: user.email,
          role: user.role,
        }),
        message: 'Signed in successfully',
      }
    }

    throw new UnauthorizedException('Invalid credentials')
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.users.getByEmail(data.email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const access_token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      purpose: RESET_PASSWORD,
    })

    // TODO: Create a microservice for sending emails and send the reset password email to the user
    // this.mail.forgotPassword(user.email, access_token)

    return {
      message: 'Password reset email sent',
    }
  }

  async resetPassword(data: ResetPasswordDto, token: string): Promise<{ message: string }> {
    const access_token = this.jwtService.verify(token, { ignoreExpiration: false })
    const user = await this.users.getById(access_token.sub)

    if (!user || access_token.purpose !== RESET_PASSWORD) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const hashedPassword = await this.bcrypt.hash(data.password)

    await this.users.update(user.id, {
      password: hashedPassword,
    })

    return {
      message: 'Password reset successful',
    }
  }

  async changePassword(data: ChangePasswordDto): Promise<User> {
    const userId = this.session.getUserId()
    const user = await this.users.getById(userId)

    if (!user || !(await this.bcrypt.compare(data.currentPassword, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return user

    // const hashedPassword = await this.bcrypt.hash(data.newPassword)

    // return await this.users.update(userId, {
    //   password: hashedPassword,
    // })
  }
}
