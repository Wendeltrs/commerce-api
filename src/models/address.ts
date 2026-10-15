import { Expose, Type } from 'class-transformer'
import { Company } from './company'
import { Order } from './order'
import { User } from './user'

export class Address {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  street: string

  @Expose()
  number: string

  @Expose()
  complement: string

  @Expose()
  neighborhood: string

  @Expose()
  city: string

  @Expose()
  state_abbr: string

  @Expose()
  country_id: string

  @Expose()
  default: boolean

  @Expose()
  zipCode: string

  @Expose()
  userId: string

  @Expose()
  @Type(() => User)
  user: User

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt: Date

  @Expose()
  @Type(() => Order)
  orders: Order[]

  @Expose()
  @Type(() => Company)
  company: Company
}
