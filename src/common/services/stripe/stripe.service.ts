import { Injectable } from '@nestjs/common'

@Injectable()
export class StripeService {
  private stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  async session(
    email: string,
    orderId: string,
    products: {
      price_data: {
        currency: string
        product_data: {
          name: string
        }
        unit_amount: number
      }
      quantity: number
    }[],
    idempotencyKey = orderId,
  ): Promise<{ id: string; url: string }> {
    const session = await this.stripe.checkout.sessions.create(
      {
        customer_email: email,
        client_reference_id: orderId,
        metadata: {
          orderId,
        },
        success_url: `${process.env.STRIPE_REDIRECT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.STRIPE_REDIRECT_URL}/cancel`,
        line_items: products,
        mode: 'payment',
        payment_method_options: {
          boleto: {
            expires_after_days: 7,
          },
          card: {
            request_three_d_secure: 'any',
          },
          pix: {
            expires_after_seconds: 60,
          },
        },
      },
      { idempotencyKey },
    )

    return {
      id: session.id,
      url: session.url,
    }
  }

  async verifySession(id: string) {
    return await this.stripe.checkout.sessions.retrieve(id)
  }

  constructWebhookEvent(payload: Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  }

  async getPaymentMethod(paymentIntentId: string) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['payment_method'],
    })

    return paymentIntent.payment_method
  }
}
