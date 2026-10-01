import { Module } from '@nestjs/common'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CartRespository } from './CartRespository'
import { ICartRepository } from './ICartRepository'

@Module({
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
