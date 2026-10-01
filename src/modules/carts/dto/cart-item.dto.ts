import { ApiProperty } from '@nestjs/swagger'
import { ProductDto } from 'src/modules/products/dto/product.dto'
import { CartDto } from './cart.dto'

export class CartItemDto {
  @ApiProperty() id: string
  @ApiProperty() productId: string
  @ApiProperty({ type: () => ProductDto }) product: ProductDto
  @ApiProperty() cartId: string
  @ApiProperty({ type: () => CartDto }) cart: CartDto
  @ApiProperty({ default: 1 }) quantity: number
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
}
