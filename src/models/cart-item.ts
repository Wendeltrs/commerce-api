import { Expose, Type } from 'class-transformer'
import { Cart } from './cart'
import { Product } from './product'

export class CartItem {
  @Expose()
  id: string

  @Expose()
  productId: string

  @Expose()
  cartId: string

  @Expose()
  @Type(() => Cart)
  cart: Cart

  @Expose()
  @Type(() => Product)
  product: Product

  @Expose()
  quantity: number

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt: Date
}
