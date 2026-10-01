import { ApiProperty } from '@nestjs/swagger'
import { CartItemDto } from 'src/modules/carts/dto/cart-item.dto'
import { CategoryDto } from 'src/modules/categories/dto/category.dto'

export class ProductDto {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() description: string
  @ApiProperty() slug: string
  @ApiProperty() price: number
  @ApiProperty({ default: 0 }) stock: number
  @ApiProperty() categoryId: string
  @ApiProperty() images: JSON
  @ApiProperty({ type: () => CategoryDto }) category: CategoryDto
  @ApiProperty({ default: true }) active: boolean
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
  @ApiProperty({ type: () => [CartItemDto] }) cartItems: CartItemDto[]

  // TODO: Additional properties for the full product DTO can be added here
  // @ApiProperty({ type: [OrderItemDto] }) orderItems: OrderItemDto[]
}
