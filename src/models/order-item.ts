import { Expose, Type } from 'class-transformer'
import { Product } from './product'

export class OrderItem {
  @Expose()
  id: string

  @Expose()
  productName: string

  @Expose()
  price: number

  @Expose()
  quantity: number

  @Expose()
  productId: string

  @Expose()
  @Type(() => Product)
  product: Product

  @Expose()
  orderId: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt: Date
}
