import { Module } from '@nestjs/common'
import { RedisModule } from 'src/common/infra/redis/redis.module'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CartRespository } from './CartRespository'
import { ICartRepository } from './ICartRepository'

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: ICartRepository,
      useClass: CartRespository,
    },
    PrismaService,
    SessionService,
  ],
  exports: [ICartRepository, PrismaService, SessionService],
})
export class CartRepositoryModule {}
