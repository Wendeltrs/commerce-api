import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { SessionService } from 'src/common/services/session/session.service'
import { ShippingService } from 'src/common/services/shipping/shipping.service'
import { StripeService } from 'src/common/services/stripe/stripe.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'

@Module({
  imports: [HttpModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, SessionService, StripeService, PrismaService, ShippingService],
})
export class PaymentsModule {}
