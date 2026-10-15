import { Module } from '@nestjs/common'
import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'
import { CompanyRepositoryModule } from './repositories/CompanyRepository.module'

@Module({
  imports: [CompanyRepositoryModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
