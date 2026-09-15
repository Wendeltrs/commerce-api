import { Expose, Type } from 'class-transformer'
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

  // TODO: add relations
  // @Expose()
  // @Type(() => ProductImage)
  // images: ProductImage[]

  // @Expose()
  // @Type(() => CartItem)
  // cartItems: CartItem[]

  // @Expose()
  // @Type(() => OrderItem)
  // orderItems: OrderItem[]
}
