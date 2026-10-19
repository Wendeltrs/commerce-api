import { Module } from '@nestjs/common'
import { RedisModule } from 'src/common/infra/redis/redis.module'
import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { IProductRepository } from './IProductRepository'
import { ProductRepository } from './ProductRepository'

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    PrismaService,
    SessionService,
    CloudinaryService,
  ],
  exports: [IProductRepository, PrismaService, SessionService, CloudinaryService],
})
export class ProductRepositoryModule {}
