import { randomUUID } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { Product } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { IProductRepository } from './IProductRepository'

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async getAll(query?: QueryDto): Promise<[Product[], number]> {
    return await this.prisma.extensions.product.findManyAndCount({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        deletedAt: null,
      },
    })
  }

  async get(id: string): Promise<Product | null> {
    return await this.prisma.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })
  }

  async create(data: CreateProductDto): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        active: data.active,
      },
    })
  }

  async upload(productId: string, files: Express.Multer.File[]): Promise<Product> {
    const ids = files.map(() => randomUUID())

    const uploads = await Promise.allSettled(
      files.map((file, index) => this.cloudinary.upload(file, ids[index], 'product-images')),
    )

    const imageRecords = uploads.map((upload, index) => {
      if (upload.status === 'rejected') {
        throw upload.reason
      }

      return {
        id: ids[index],
        url: upload.value.url,
        position: index,
      }
    })

    return await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        images: imageRecords,
      },
    })
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        active: data.active,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
