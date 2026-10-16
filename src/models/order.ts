import { Expose, Type } from 'class-transformer'
import { OrderStatus } from 'prisma/generated/prisma/enums'
import { Address } from './address'
import { OrderItem } from './order-item'
import { Payment } from './payment'
import { User } from './user'

export class Order {
  @Expose()
  id: string

  @Expose()
  userId: string

  @Expose()
  @Type(() => User)
  user: User

  @Expose()
  addressId: string

  @Expose()
  @Type(() => Address)
  address: Address

  @Expose()
  status: OrderStatus = OrderStatus.PENDING

  @Expose()
  total: number

  @Expose()
  subtotal: number

  @Expose()
  shippingCost: number

  @Expose()
  paymentUrl: string

  @Expose()
  shippingId: string

  @Expose()
  shippingCompanyName: string

  @Expose()
  shippingName: string

  @Expose()
  shippingTime: string

  @Expose()
  @Type(() => OrderItem)
  items: OrderItem[]

  @Expose()
  @Type(() => Payment)
  payment: Payment

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt: Date
}
