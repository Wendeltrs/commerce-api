import { ApiProperty } from '@nestjs/swagger'
import { CartItemDto } from 'src/modules/carts/dto/cart-item.dto'
import { CategoryDto } from 'src/modules/categories/dto/category.dto'
import { CompanyDto } from 'src/modules/companies/dto/company.dto'
import { OrderItemDto } from 'src/modules/orders/dto/order-item.dto'

export class ProductDto {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() description: string
  @ApiProperty() slug: string
  @ApiProperty() price: number
  @ApiProperty({ default: 0 }) stock: number
  @ApiProperty() categoryId: string
  @ApiProperty() images: JSON
  @ApiProperty() companyId: string
  @ApiProperty({ default: true }) active: boolean
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
  @ApiProperty({ type: () => CategoryDto }) category: CategoryDto
  @ApiProperty({ type: () => CompanyDto }) company: CompanyDto
  @ApiProperty({ type: () => [CartItemDto] }) cartItems: CartItemDto[]
  @ApiProperty({ type: () => [OrderItemDto] }) orderItems: OrderItemDto[]
}
