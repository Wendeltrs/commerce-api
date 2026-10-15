import { Injectable } from '@nestjs/common'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { ICompanyRepository } from './repositories/ICompanyRepository'

@Injectable()
export class CompaniesService {
  constructor(private companyRepository: ICompanyRepository) {}

  async getAll(query?: QueryDto) {
    return await this.companyRepository.getAll(query)
  }

  async get(id: string) {
    return await this.companyRepository.get(id)
  }

  async create(data: CreateCompanyDto) {
    return await this.companyRepository.create(data)
  }

  async update(id: string, data: UpdateCompanyDto) {
    return await this.companyRepository.update(id, data)
  }

  async delete(id: string) {
    return await this.companyRepository.delete(id)
  }
}
