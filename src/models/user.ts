import { Expose, Type } from 'class-transformer'
import { Role } from 'prisma/generated/prisma/enums'
import { Address } from './address'
import { Cart } from './cart'
import { Company } from './company'
import { Order } from './order'

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
  role: Role = Role.CUSTOMER

  @Expose()
  document: string
  
  @Expose()
  phone: string

  @Expose()
  @Type(() => Company)
  company: Company

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

  @Expose()
  @Type(() => Order)
  orders: Order[]
}
