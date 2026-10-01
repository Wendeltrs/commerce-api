import { Expose, Type } from 'class-transformer'
import { CartItem } from './cart-item'
import { User } from './user'

export class Cart {
  @Expose()
  id: string

  @Expose()
  userId: string

  @Expose()
  @Type(() => User)
  user: User

  @Expose()
  @Type(() => CartItem)
  items: CartItem[]

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt: Date
}
