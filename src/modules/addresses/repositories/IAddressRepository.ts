import { Address } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateAddressDto } from '../dto/create-address.dto'
import { UpdateAddressDto } from '../dto/update-address.dto'

export abstract class IAddressRepository {
  abstract getAll(query?: QueryDto): Promise<[Address[], number]>
  abstract get(id: string): Promise<Address | null>
  abstract create(data: CreateAddressDto): Promise<Address>
  abstract update(id: string, data: UpdateAddressDto): Promise<Address>
  abstract delete(id: string): Promise<void>
}
