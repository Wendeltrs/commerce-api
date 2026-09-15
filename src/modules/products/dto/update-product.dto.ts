import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto {
  @ApiProperty({ description: 'The name of the product', required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ description: 'The description of the product', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: 'The slug of the product', uniqueItems: true, required: false })
  @IsString()
  @IsOptional()
  slug?: string

  @ApiProperty({ description: 'The price of the product', required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price?: number

  @ApiProperty({ description: 'The stock of the product', default: 0, required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  stock?: number = 0

  @ApiProperty({ description: 'The category of the product', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string

  @ApiProperty({ description: 'The active of the product', default: true, required: false })
  @IsBoolean()
  @IsOptional()
  active?: boolean = true
}
