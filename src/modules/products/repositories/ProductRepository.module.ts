import { Module } from '@nestjs/common'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { IProductRepository } from './IProductRepository'
import { ProductRepository } from './ProductRepository'

@Module({
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    PrismaService,
    SessionService,
  ],
  exports: [IProductRepository, PrismaService, SessionService],
})
export class ProductRepositoryModule {}
