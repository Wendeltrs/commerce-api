import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class ChangePasswordDto {
  @ApiProperty({ description: 'The password of the user', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string

  @ApiProperty({ description: 'The password of the user', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  currentPassword: string
}
