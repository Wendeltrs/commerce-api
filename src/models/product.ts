import { Expose, Type } from 'class-transformer'
import { CartItem } from './cart-item'
import { Category } from './category'
import { OrderItem } from './order-item'
import { Company } from './company'

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
  width: number

  @Expose()
  height: number

  @Expose()
  length: number

  @Expose()
  weight: number

  @Expose()
  @Type(() => CartItem)
  cartItems: CartItem[]

  @Expose()
  @Type(() => OrderItem)
  orderItems: OrderItem[]

  @Expose()
  companyId: string

  @Expose()
  @Type(() => Company)
  company: Company
}
