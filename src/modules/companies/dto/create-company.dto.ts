import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCompanyDto {
  @ApiProperty({ description: 'The name of the company' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'The phone of the company' })
  @IsString()
  @IsNotEmpty()
  phone: string

  @ApiProperty({ description: 'The CNPJ of the company' })
  @IsString()
  @IsNotEmpty()
  document: string

  @ApiProperty({ description: 'The address id of the company' })
  @IsString()
  @IsNotEmpty()
  addressId: string
}
