import { Inject, Injectable } from '@nestjs/common'
import { Company } from 'prisma/generated/prisma/client'
import type { RedisClientType } from 'redis'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { SessionService } from 'src/common/services/session/session.service'
import { REDIS_CLIENT } from 'src/consts'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCompanyDto } from '../dto/create-company.dto'
import { UpdateCompanyDto } from '../dto/update-company.dto'
import { ICompanyRepository } from './ICompanyRepository'

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    private prisma: PrismaService,
    private session: SessionService,
    @Inject(REDIS_CLIENT)
    private redis: RedisClientType,
  ) {}

  async getAll(query?: QueryDto): Promise<[Company[], number]> {
    const cacheKey = `getAllCompanies:${JSON.stringify({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        deletedAt: null,
      },
    })}`

    const getAllCompanies = await this.redis.get(cacheKey)

    if (getAllCompanies) {
      return JSON.parse(getAllCompanies)
    }

    const companies = await this.prisma.extensions.company.findManyAndCount({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        deletedAt: null,
      },
      include: {
        products: true,
        address: true,
        user: true,
      },
    })

    await this.redis.set(cacheKey, JSON.stringify(companies), { EX: 10 })

    return companies
  }

  async get(id: string): Promise<Company | null> {
    return await this.prisma.company.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        products: true,
        address: true,
        user: true,
      },
    })
  }

  async create(data: CreateCompanyDto): Promise<Company> {
    return await this.prisma.company.create({
      data: {
        name: data.name,
        phone: data.phone,
        document: data.document,
        addressId: data.addressId,
        userId: this.session.getUserId(),
      },
    })
  }

  async update(id: string, data: UpdateCompanyDto): Promise<Company> {
    return await this.prisma.company.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        phone: data.phone,
        ...(data.addressId && {
          addressId: data.addressId,
        }),
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.company.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
