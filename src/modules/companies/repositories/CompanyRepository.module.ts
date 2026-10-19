import { Module } from '@nestjs/common'
import { RedisModule } from 'src/common/infra/redis/redis.module'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CompanyRepository } from './CompanyRepository'
import { ICompanyRepository } from './ICompanyRepository'

@Module({
  imports: [RedisModule],
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
