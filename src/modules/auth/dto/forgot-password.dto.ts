import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class ForgotPasswordDto {
  @ApiProperty({ description: 'The email of the user', uniqueItems: true })
  @IsEmail()
  @IsNotEmpty()
  email: string
}
