import { Injectable } from '@nestjs/common'
import { Category } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'
import { ICategoryRepository } from './ICategoryRepository'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(query?: QueryDto): Promise<[Category[], number]> {
    return await this.prisma.extensions.category.findManyAndCount({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        deletedAt: null,
      },
    })
  }

  async get(id: string): Promise<Category | null> {
    return await this.prisma.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        products: true,
      },
    })
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    })
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        slug: data.slug,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
