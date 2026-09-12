import { User } from 'prisma/generated/prisma/client'
import { ChangePasswordDto } from '../dto/change-password.dto'
import { ForgotPasswordDto } from '../dto/forgot-password.dto'
import { ResetPasswordDto } from '../dto/reset-password.dto'
import { SignInDto } from '../dto/sign-in.dto'
import { SignUpDto } from '../dto/sign-up.dto'

export abstract class IAuthRepository {
  abstract getMe(id: string): Promise<User>
  abstract signUp(data: SignUpDto): Promise<{ message: string }>
  abstract signIn(data: SignInDto): Promise<{ message: string, access_token: string }>
  abstract forgotPassword(data: ForgotPasswordDto): Promise<{ message: string }>
  abstract resetPassword(data: ResetPasswordDto, token: string): Promise<{ message: string }>
  abstract changePassword(data: ChangePasswordDto): Promise<User>
}
