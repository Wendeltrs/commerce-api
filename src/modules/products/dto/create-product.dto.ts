import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'The description of the product' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ description: 'The slug of the product', uniqueItems: true })
  @IsString()
  @IsNotEmpty()
  slug: string

  @ApiProperty({ description: 'The price of the product' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number

  @ApiProperty({ description: 'The stock of the product', default: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  stock: number = 0

  @ApiProperty({ description: 'The category of the product' })
  @IsString()
  @IsNotEmpty()
  categoryId: string

  @ApiProperty({ description: 'The active of the product', default: true })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean = true
}
