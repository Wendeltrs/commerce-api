import { ApiProperty } from '@nestjs/swagger'
import { PaymentMethod, PaymentStatus } from 'prisma/generated/prisma/enums'
import { OrderDto } from './order.dto'

export class PaymentDto {
  @ApiProperty() id: string
  @ApiProperty({ enum: PaymentStatus, default: PaymentStatus.PENDING }) status: PaymentStatus =
    PaymentStatus.PENDING
  @ApiProperty({ enum: PaymentMethod }) method: PaymentMethod
  @ApiProperty() amount: number
  @ApiProperty() orderId: string
  @ApiProperty({ type: () => OrderDto }) order: OrderDto
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
}
