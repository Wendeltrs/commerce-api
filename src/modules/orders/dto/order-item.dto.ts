import { ApiProperty } from '@nestjs/swagger'
import { ProductDto } from 'src/modules/products/dto/product.dto'
import { OrderDto } from './order.dto'

export class OrderItemDto {
  @ApiProperty() id: string
  @ApiProperty() productName: string
  @ApiProperty() price: number
  @ApiProperty() quantity: number
  @ApiProperty() productId: string
  @ApiProperty({ type: () => ProductDto }) product: ProductDto
  @ApiProperty() orderId: string
  @ApiProperty({ type: () => OrderDto }) order: OrderDto
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
}
