import { Expose, Type } from 'class-transformer'
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
  state: string

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

  //TODO: Additional properties for the full address model can be added here
  //@Expose()
  //@Type(() => Orders)
  //orders: Orders[];
}
