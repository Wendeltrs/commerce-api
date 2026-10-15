import { ApiProperty } from '@nestjs/swagger'
import { OrderStatus } from 'prisma/generated/prisma/enums'
import { AddressDto } from 'src/modules/addresses/dto/address.dto'
import { UserDto } from 'src/modules/users/dto/user.dto'
import { OrderItemDto } from './order-item.dto'
import { PaymentDto } from './payment.dto'

export class OrderDto {
  @ApiProperty() id: string
  @ApiProperty() userId: string
  @ApiProperty({ enum: OrderStatus, default: OrderStatus.PENDING }) status: OrderStatus =
    OrderStatus.PENDING
  @ApiProperty() subtotal: number
  @ApiProperty() shippingCost: number
  @ApiProperty() total: number
  @ApiProperty({ type: () => UserDto }) user: UserDto
  @ApiProperty() addressId: string
  @ApiProperty({ type: () => AddressDto }) address: AddressDto
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
  @ApiProperty({ type: () => [OrderItemDto] }) items: OrderItemDto[]
  @ApiProperty({ type: () => PaymentDto }) payment: PaymentDto
}

export class CreateOrderResponseDto extends OrderDto {
  @ApiProperty() paymentUrl: string
}
