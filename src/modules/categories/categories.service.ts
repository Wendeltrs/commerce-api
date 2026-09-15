import { Injectable } from '@nestjs/common'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ICategoryRepository } from './repositories/ICategoryRepository'

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async getAll(query?: QueryDto) {
    return await this.categoryRepository.getAll(query)
  }

  public async get(id: string) {
    return await this.categoryRepository.get(id)
  }

  public async create(data: CreateCategoryDto) {
    return await this.categoryRepository.create(data)
  }

  public async update(id: string, data: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, data)
  }

  public async delete(id: string) {
    return await this.categoryRepository.delete(id)
  }
}
