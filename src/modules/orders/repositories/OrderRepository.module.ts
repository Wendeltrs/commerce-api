import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { RedisModule } from 'src/common/infra/redis/redis.module'
import { SessionService } from 'src/common/services/session/session.service'
import { ShippingService } from 'src/common/services/shipping/shipping.service'
import { StripeService } from 'src/common/services/stripe/stripe.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { IOrderRepository } from './IOrderRepository'
import { OrderRepository } from './OrderRepository'

@Module({
  imports: [HttpModule, RedisModule],
  providers: [
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
    PrismaService,
    SessionService,
    ShippingService,
    StripeService,
  ],
  exports: [IOrderRepository, PrismaService, SessionService, ShippingService, StripeService],
})
export class OrderRepositoryModule {}
