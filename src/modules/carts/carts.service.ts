import { Injectable } from '@nestjs/common'
import { CreateCartItemDto } from './dto/create-cart-item.dto'
import { UpdateCartItemDto } from './dto/update-cart-item.dto'
import { ICartRepository } from './repositories/ICartRepository'

@Injectable()
export class CartService {
  constructor(private cartRepository: ICartRepository) {}

  async get() {
    return this.cartRepository.get()
  }

  async create(data: CreateCartItemDto) {
    return this.cartRepository.create(data)
  }

  async update(id: string, data: UpdateCartItemDto) {
    return this.cartRepository.update(id, data)
  }

  async delete(id: string) {
    return this.cartRepository.delete(id)
  }
}
