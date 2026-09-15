import { Injectable } from '@nestjs/common'
import { Address } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAddressDto } from '../dto/create-address.dto'
import { UpdateAddressDto } from '../dto/update-address.dto'
import { IAddressRepository } from './IAddressRepository'

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    private prisma: PrismaService,
    private session: SessionService,
  ) {}

  async getAll(query?: QueryDto): Promise<[Address[], number]> {
    return await this.prisma.extensions.address.findManyAndCount({
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
    return await this.prisma.address.create({
      data: {
        name: data.name,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        userId: this.session.getUserId(),
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
        state: data.state,
        zipCode: data.zipCode,
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
