import { Injectable } from '@nestjs/common'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { IAddressRepository } from './repositories/IAddressRepository'

@Injectable()
export class AddressesService {
  constructor(private addressRepository: IAddressRepository) {}

  public async getAll(query?: QueryDto) {
    return await this.addressRepository.getAll(query)
  }

  public async get(id: string) {
    return await this.addressRepository.get(id)
  }

  public async create(data: CreateAddressDto) {
    return await this.addressRepository.create(data)
  }

  public async update(id: string, data: UpdateAddressDto) {
    return await this.addressRepository.update(id, data)
  }

  public async delete(id: string) {
    return await this.addressRepository.delete(id)
  }
}
