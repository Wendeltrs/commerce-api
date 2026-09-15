import { Module } from '@nestjs/common'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoryRepository } from './CategoryRepository'
import { ICategoryRepository } from './ICategoryRepository'

@Module({
  providers: [
    {
      provide: ICategoryRepository,
      useClass: CategoryRepository,
    },
    PrismaService,
    SessionService,
  ],
  exports: [ICategoryRepository, PrismaService, SessionService],
})
export class CategoryRepositoryModule {}
