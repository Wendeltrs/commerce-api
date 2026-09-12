import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user', required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ description: 'The email of the user', uniqueItems: true, required: false })
  @IsEmail()
  @IsOptional()
  email?: string

  @ApiProperty({ description: 'The password of the user', minLength: 8, required: false })
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string
}
