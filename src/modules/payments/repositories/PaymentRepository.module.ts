import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ShippingService } from 'src/common/services/shipping/shipping.service'
import { StripeService } from 'src/common/services/stripe/stripe.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { IPaymentRepository } from './IPaymentRepository'
import { PaymentRepository } from './PaymentRepository'

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: IPaymentRepository,
      useClass: PaymentRepository,
    },
    ShippingService,
    PrismaService,
    StripeService,
  ],
  exports: [IPaymentRepository, ShippingService, PrismaService, StripeService],
})
export class PaymentRepositoryModule {}
