import { Expose, Type } from 'class-transformer'
import { CartItem } from './cart-item'
import { Category } from './category'

export class Product {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  description: string

  @Expose()
  slug: string

  @Expose()
  @Type(() => Number)
  price: number

  @Expose()
  stock: number

  @Expose()
  active: boolean

  @Expose()
  categoryId: string

  @Expose()
  @Type(() => Category)
  category: Category

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt: Date

  @Expose()
  images: JSON

  @Expose()
  @Type(() => CartItem)
  cartItems: CartItem[]

  // TODO: add relations

  // @Expose()
  // @Type(() => OrderItem)
  // orderItems: OrderItem[]
}
