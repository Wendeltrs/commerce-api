import { Expose, Type } from 'class-transformer'
import { Address } from './address'
import { Product } from './product'
import { User } from './user'

export class Company {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  document: string

  @Expose()
  phone: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt: Date

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
  @Type(() => Product)
  products: Product[]
}
