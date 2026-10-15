import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

export class CreateCartItemDto {
  @ApiProperty({ description: 'The id of the product' })
  @IsString()
  @IsNotEmpty()
  productId: string

  @ApiProperty({ description: 'The quantity of the product', default: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number = 1
}
