import { ApiProperty } from '@nestjs/swagger'
import { CategoryDto } from 'src/modules/categories/dto/category.dto'

export class ProductDto {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() description: string
  @ApiProperty() slug: string
  @ApiProperty() price: number
  @ApiProperty({ default: 0 }) stock: number
  @ApiProperty() categoryId: string
  @ApiProperty({ type: CategoryDto }) category: CategoryDto
  @ApiProperty({ default: true }) active: boolean
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string

  // TODO
  // @ApiProperty({ type: [ImageDto] }) images: ImageDto[]
  // @ApiProperty({ type: [OrderItemDto] }) orderItems: OrderItemDto[]
  // @ApiProperty({ type: [CartItemDto] }) cartItems: CartItemDto[]
}
