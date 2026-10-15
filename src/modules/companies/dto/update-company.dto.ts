import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateCompanyDto {
  @ApiProperty({ description: 'The name of the company', required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ description: 'The phone of the company', required: false })
  @IsString()
  @IsOptional()
  phone?: string

  @ApiProperty({ description: 'The address id of the company', required: false })
  @IsString()
  @IsOptional()
  addressId?: string
}
