import { Expose, Type } from 'class-transformer'
import { Address } from './address'
import { Cart } from './cart'

export class User {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  email: string

  @Expose()
  avatar: string

  @Expose()
  role: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt: Date

  @Expose()
  @Type(() => Address)
  addresses: Address[]

  @Expose()
  @Type(() => Cart)
  cart: Cart

  //TODO: Additional properties for the full user model can be added here

  //@Expose()
  //@Type(() => Orders)
  //orders: Orders[];
}
