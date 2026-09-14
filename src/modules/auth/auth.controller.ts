import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiResponse } from '@nestjs/swagger'
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user/authenticated-user.decorator'
import { Cookie } from 'src/common/decorators/cookie/cookie.decorator'
import { Serializer } from 'src/common/decorators/serializer/serializer.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard'
import { ACCESS_TOKEN } from 'src/consts'
import { User } from 'src/models/user'
import { UserDto } from '../users/dto/user.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  @ApiResponse({ type: UserDto, status: HttpStatus.OK })
  @Serializer(User)
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth(ACCESS_TOKEN)
  public async getMe(@AuthenticatedUser() user: User) {
    return await this.authService.getMe(user.id)
  }

  @Post('/sign-up')
  @ApiResponse({ type: AuthDto, status: HttpStatus.CREATED })
  public async signUp(@Body() data: SignUpDto) {
    return await this.authService.signUp(data)
  }

  @Post('/sign-in')
  @ApiResponse({ type: AuthDto, status: HttpStatus.OK })
  @Cookie()
  public async signIn(@Body() data: SignInDto) {
    return await this.authService.signIn(data)
  }

  @Post('/sign-out')
  @ApiResponse({ type: AuthDto, status: HttpStatus.OK })
  @Cookie(true)
  public async signOut() {}

  @Post('/forgot-password')
  @ApiResponse({ type: AuthDto, status: HttpStatus.OK })
  public async forgotPassword(@Body() data: ForgotPasswordDto) {
    return await this.authService.forgotPassword(data)
  }

  @Post('/reset-password')
  @ApiResponse({ type: AuthDto, status: HttpStatus.OK })
  public async resetPassword(@Body() data: ResetPasswordDto, @Query('token') token: string) {
    return await this.authService.resetPassword(data, token)
  }

  @Post('/change-password')
  @ApiResponse({ type: AuthDto, status: HttpStatus.OK })
  @Serializer(User)
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth(ACCESS_TOKEN)
  public async changePassword(@Body() data: ChangePasswordDto) {
    return await this.authService.changePassword(data)
  }
}
