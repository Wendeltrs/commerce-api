import { Inject, Injectable } from '@nestjs/common'
import { Address } from 'prisma/generated/prisma/client'
import type { RedisClientType } from 'redis'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { SessionService } from 'src/common/services/session/session.service'
import { REDIS_CLIENT } from 'src/consts'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAddressDto } from '../dto/create-address.dto'
import { UpdateAddressDto } from '../dto/update-address.dto'
import { IAddressRepository } from './IAddressRepository'

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    private prisma: PrismaService,
    private session: SessionService,
    @Inject(REDIS_CLIENT)
    private redis: RedisClientType,
  ) {}

  async getAll(query?: QueryDto): Promise<[Address[], number]> {
    const cacheKey = `getAllAddresses:${JSON.stringify({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        userId: this.session.getUserId(),
        deletedAt: null,
      },
    })}`

    const getAllAddresses = await this.redis.get(cacheKey)

    if (getAllAddresses) {
      return JSON.parse(getAllAddresses)
    }

    const addresses = await this.prisma.extensions.address.findManyAndCount({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        userId: this.session.getUserId(),
        deletedAt: null,
      },
      include: {
        orders: true,
        user: true,
      },
    })

    await this.redis.set(cacheKey, JSON.stringify(addresses), { EX: 10 })

    return addresses
  }

  async get(id: string): Promise<Address | null> {
    return await this.prisma.address.findFirst({
      where: {
        id,
        userId: this.session.getUserId(),
        deletedAt: null,
      },
      include: {
        orders: true,
        user: true,
      },
    })
  }

  async create(data: CreateAddressDto): Promise<Address> {
    const userId = this.session.getUserId()

    const hasAddress = await this.prisma.address.findFirst({
      where: {
        userId,
        deletedAt: null,
      },
    })

    return await this.prisma.address.create({
      data: {
        name: data.name,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state_abbr: data.state_abbr,
        country_id: data.country_id,
        zipCode: data.zipCode,
        userId: this.session.getUserId(),
        default: !hasAddress,
      },
    })
  }

  async update(id: string, data: UpdateAddressDto): Promise<Address> {
    return await this.prisma.address.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state_abbr: data.state_abbr,
        country_id: data.country_id,
        zipCode: data.zipCode,
      },
    })
  }

  async setDefault(id: string): Promise<Address> {
    const userId = this.session.getUserId()

    await this.prisma.address.updateMany({
      where: {
        userId,
        default: true,
        id: {
          not: id,
        },
      },
      data: {
        default: false,
      },
    })

    return await this.prisma.address.update({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      data: {
        default: true,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.address.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
