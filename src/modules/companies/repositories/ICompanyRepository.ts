import { Company } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateCompanyDto } from '../dto/create-company.dto'
import { UpdateCompanyDto } from '../dto/update-company.dto'

export abstract class ICompanyRepository {
  abstract getAll(query?: QueryDto): Promise<[Company[], number]>
  abstract get(id: string): Promise<Company | null>
  abstract create(data: CreateCompanyDto): Promise<Company>
  abstract update(id: string, data: UpdateCompanyDto): Promise<Company>
  abstract delete(id: string): Promise<void>
}
