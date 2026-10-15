import type { RawBodyRequest } from '@nestjs/common'
import { BadRequestException, Controller, Get, Headers, Post, Query, Req } from '@nestjs/common'
import { Request } from 'express'
import { StripeService } from 'src/common/services/stripe/stripe.service'
import { PaymentsService } from './payments.service'

@Controller({ path: 'payments', version: '1' })
export class PaymentsController {
  constructor(
    private paymentsService: PaymentsService,
    private stripe: StripeService,
  ) {}

  @Post('/webhook')
  async webhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers('stripe-signature')
    signature: string,
  ) {
    const event = this.stripe.constructWebhookEvent(request.rawBody!, signature)

    await this.paymentsService.handleWebhook(event)

    return {
      received: true,
    }
  }

  @Get('/success')
  async success(@Query('session_id') sessionId: string) {
    if (!sessionId) {
      throw new BadRequestException('Session ID is required')
    }

    const session = await this.stripe.verifySession(sessionId)

    return {
      message:
        session.payment_status === 'paid'
          ? 'Pagamento confirmado'
          : 'Pagamento ainda não confirmado',
      paymentStatus: session.payment_status,
      orderId: session.metadata?.orderId ?? session.client_reference_id,
    }
  }

  @Get('/cancel')
  cancel() {
    return {
      message: 'Checkout cancelado ou interrompido',
    }
  }
}
