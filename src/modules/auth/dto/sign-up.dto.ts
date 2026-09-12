import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'
import { Role } from 'prisma/generated/prisma/enums'

export class SignUpDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'The email of the user', uniqueItems: true })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: 'The password of the user', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @ApiProperty({
    description: 'The role of the user',
    enum: Role,
    default: Role.CUSTOMER,
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.CUSTOMER
}
