import { Inject, Injectable } from '@nestjs/common'
import { ChangePasswordDto } from './dto/change-password.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { IAuthRepository } from './repositories/IAuthRepository'

@Injectable()
export class AuthService {
  constructor(@Inject(IAuthRepository) private authRepository: IAuthRepository) {}

  public async getMe(id: string) {
    return await this.authRepository.getMe(id)
  }

  public async signUp(data: SignUpDto) {
    return await this.authRepository.signUp(data)
  }

  public async signIn(data: SignInDto) {
    return await this.authRepository.signIn(data)
  }

  public async forgotPassword(data: ForgotPasswordDto) {
    return await this.authRepository.forgotPassword(data)
  }

  public async resetPassword(data: ResetPasswordDto, token: string) {
    return await this.authRepository.resetPassword(data, token)
  }

  public async changePassword(data: ChangePasswordDto) {
    return await this.authRepository.changePassword(data)
  }
}
