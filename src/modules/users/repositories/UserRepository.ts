import { Injectable } from '@nestjs/common'
import { User } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { IUserRepository } from './IUserRepository'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(query?: QueryDto): Promise<[User[], number]> {
    return await this.prisma.extensions.user.findManyAndCount({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        deletedAt: null,
      },
      include: {
        addresses: true,
        cart: true,
        orders: true,
      },
    })
  }

  async getById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        addresses: true,
        cart: true,
        orders: true,
      },
    })
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
        deletedAt: null,
      },
      include: {
        addresses: true,
        cart: true,
        orders: true,
      },
    })
  }

  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      },
    })
  }

  async uploadAvatar(file: Express.Multer.File): Promise<void> {
    // TODO: Implementation for uploading user avatar
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
