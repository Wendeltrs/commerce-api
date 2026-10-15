import { Module } from '@nestjs/common'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CompanyRepository } from './CompanyRepository'
import { ICompanyRepository } from './ICompanyRepository'

@Module({
  providers: [
    {
      provide: ICompanyRepository,
      useClass: CompanyRepository,
    },
    PrismaService,
    SessionService,
  ],
  exports: [ICompanyRepository, PrismaService, SessionService],
})
export class CompanyRepositoryModule {}
