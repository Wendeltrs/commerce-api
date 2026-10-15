import { Order } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateOrderDto } from '../dto/create-order.dto'
import { ShippingDto } from '../dto/shipping.dto'

export abstract class IOrderRepository {
  abstract getAll(query?: QueryDto): Promise<[Order[], number]>
  abstract get(id: string): Promise<Order | null>
  abstract calculateShipping(addressId: string): Promise<ShippingDto>
  abstract create(data: CreateOrderDto): Promise<{ order: Order; paymentUrl: string }>
  abstract delete(id: string): Promise<void>
}
