import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Role, User } from 'prisma/generated/prisma/client'
import type { RedisClientType } from 'redis'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service'
import { SessionService } from 'src/common/services/session/session.service'
import { REDIS_CLIENT } from 'src/consts'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { IUserRepository } from './IUserRepository'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private prisma: PrismaService,
    private session: SessionService,
    private cloudinary: CloudinaryService,
    @Inject(REDIS_CLIENT)
    private redis: RedisClientType,
  ) {}

  async getAll(query?: QueryDto): Promise<[User[], number]> {
    const cacheKey = `getAllUsers:${JSON.stringify({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        deletedAt: null,
      },
    })}`

    const getAllUsers = await this.redis.get(cacheKey)

    if (getAllUsers) {
      return JSON.parse(getAllUsers)
    }

    const users = await this.prisma.extensions.user.findManyAndCount({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        deletedAt: null,
      },
      include: {
        addresses: {
          where: {
            deletedAt: null,
          },
        },
        cart: true,
        orders: {
          where: {
            deletedAt: null,
          },
        },
        company: true,
      },
    })

    await this.redis.set(cacheKey, JSON.stringify(users), { EX: 10 })

    return users
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
        company: true,
      },
    })
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
        deletedAt: null,
      },
      include: {
        addresses: true,
        cart: true,
        orders: true,
        company: true,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async create(data: CreateUserDto): Promise<User> {
    const role = data.role ?? Role.CUSTOMER

    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role,
        ...(role === Role.CUSTOMER && {
          cart: {
            create: {},
          },
        }),
      },
    })
  }

  async uploadAvatar(file: Express.Multer.File): Promise<User> {
    const userId = this.session.getUserId()

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const result = await this.cloudinary.upload(file, user.id, 'avatars')

    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: result.url,
      },
    })
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        document: data.document,
        phone: data.phone,
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
