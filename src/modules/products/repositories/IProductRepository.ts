import { Product } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'

export abstract class IProductRepository {
  abstract getAll(query?: QueryDto): Promise<[Product[], number]>
  abstract get(id: string): Promise<Product | null>
  abstract create(data: CreateProductDto): Promise<Product>
  abstract update(id: string, data: UpdateProductDto): Promise<Product>
  abstract delete(id: string): Promise<void>
}
