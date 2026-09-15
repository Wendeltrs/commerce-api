import { Category } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'

export abstract class ICategoryRepository {
  abstract getAll(query?: QueryDto): Promise<[Category[], number]>
  abstract get(id: string): Promise<Category | null>
  abstract create(data: CreateCategoryDto): Promise<Category>
  abstract update(id: string, data: UpdateCategoryDto): Promise<Category>
  abstract delete(id: string): Promise<void>
}
