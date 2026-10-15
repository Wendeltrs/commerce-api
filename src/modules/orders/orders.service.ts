import { Injectable } from '@nestjs/common'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { IOrderRepository } from './repositories/IOrderRepository'

@Injectable()
export class OrdersService {
  constructor(private orderRepository: IOrderRepository) {}

  async getAll(query?: QueryDto) {
    return this.orderRepository.getAll(query)
  }

  async get(id: string) {
    return this.orderRepository.get(id)
  }

  async calculateShipping(addressId: string) {
    return this.orderRepository.calculateShipping(addressId)
  }

  async create(data: CreateOrderDto) {
    return this.orderRepository.create(data)
  }

  async delete(id: string) {
    return this.orderRepository.delete(id)
  }
}
