import { Injectable } from '@nestjs/common'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { IProductRepository } from './repositories/IProductRepository'

@Injectable()
export class ProductsService {
  constructor(private productRepository: IProductRepository) {}

  async getAll(query?: QueryDto) {
    return await this.productRepository.getAll(query)
  }

  async get(id: string) {
    return await this.productRepository.get(id)
  }

  async create(data: CreateProductDto) {
    return await this.productRepository.create(data)
  }

  async update(id: string, data: UpdateProductDto) {
    return await this.productRepository.update(id, data)
  }

  async delete(id: string) {
    await this.productRepository.delete(id)
  }
}
