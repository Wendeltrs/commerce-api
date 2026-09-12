import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDto {
  @ApiProperty({ description: 'The email of the user', uniqueItems: true })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: 'The password of the user', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
