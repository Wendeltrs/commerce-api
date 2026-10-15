import { Injectable, NotFoundException } from '@nestjs/common'
import { OrderStatus, PaymentMethod, PaymentStatus } from 'prisma/generated/prisma/enums'
import { ShippingService } from 'src/common/services/shipping/shipping.service'
import { StripeService } from 'src/common/services/stripe/stripe.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PaymentsService {
  constructor(
    private stripe: StripeService,
    private prisma: PrismaService,
    private shipping: ShippingService,
  ) {}

  async handleWebhook(event: { type: string; data: { object } }) {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await this.paymentSuccess(event.data.object)
        break

      case 'checkout.session.async_payment_failed':
        await this.paymentFailed(event.data.object)
        break
    }
  }

  private async paymentSuccess(session: {
    metadata: { orderId: string }
    client_reference_id: string
    payment_status: string
    payment_intent: string
  }) {
    const orderId = session.metadata?.orderId || session.client_reference_id

    if (!orderId) {
      throw new Error('Order ID not found in Stripe Session')
    }

    const payment = await this.prisma.payment.findUnique({
      where: {
        orderId,
      },
    })

    if (!payment) {
      throw new NotFoundException('Payment not found')
    }

    if (payment.status === PaymentStatus.PAID) {
      return
    }

    if (session.payment_status !== 'paid') {
      return
    }

    let method: PaymentMethod = PaymentMethod.CREDIT_CARD

    if (session.payment_intent) {
      const stripePaymentMethod = await this.stripe.getPaymentMethod(session.payment_intent)

      if (stripePaymentMethod?.type === 'pix') {
        method = PaymentMethod.PIX
      }

      if (stripePaymentMethod?.type === 'boleto') {
        method = PaymentMethod.BOLETO
      }

      if (stripePaymentMethod?.type === 'card') {
        if (stripePaymentMethod.card?.funding === 'debit') {
          method = PaymentMethod.DEBIT_CARD
        } else {
          method = PaymentMethod.CREDIT_CARD
        }
      }
    }

    await this.prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.PAID,
        method,
      },
    })

    await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: OrderStatus.CONFIRMED,
      },
    })

    await this.createShipping(orderId)
  }

  private async paymentFailed(session: {
    metadata: { orderId: string }
    client_reference_id: string
  }) {
    const orderId = session.metadata?.orderId || session.client_reference_id

    if (!orderId) {
      return
    }

    const payment = await this.prisma.payment.findUnique({
      where: {
        orderId,
      },
    })

    if (!payment) {
      return
    }

    await this.prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.FAILED,
      },
    })
  }

  private async createShipping(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        address: {
          include: {
            user: true,
          },
        },
        items: {
          where: {
            deletedAt: null,
          },
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      throw new NotFoundException('Order not found')
    }

    if (order.shippingId) {
      return
    }

    const companyIds = [...new Set(order.items.map((item) => item.product.companyId))]

    if (companyIds.length !== 1) {
      throw new Error('Order products belong to different companies')
    }

    const company = await this.prisma.company.findFirst({
      where: {
        id: companyIds[0]!,
        deletedAt: null,
      },
      include: {
        address: true,
        user: true,
      },
    })

    if (!company) {
      throw new NotFoundException('Company data not found')
    }

    const shippingOptions = await this.shipping.calculate(
      company.address.zipCode,
      order.address.zipCode,
      order.items.map((item) => ({
        id: item.product.id,
        weight: item.product.weight,
        width: item.product.width,
        height: item.product.height,
        length: item.product.length,
        insurance_value: Number(item.product.price),
        quantity: item.quantity,
      })),
    )

    const shipping = shippingOptions.find((item) => item.name === order.shippingName)

    if (!shipping) {
      throw new Error('Shipping service not found')
    }

    const shippingCart = await this.shipping.cart(
      company,
      order.address,
      shipping.serviceId,
      order.items.map((item) => ({
        name: item.product.name,
        unitary_value: Number(item.product.price),
        quantity: item.quantity,
      })),
      order.items.map((item) => ({
        weight: item.product.weight as number,
        width: item.product.width as number,
        height: item.product.height as number,
        length: item.product.length as number,
      })),
      Number(order.subtotal),
    )

    await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        shippingId: shippingCart.id,
      },
    })

    await this.shipping.checkout([shippingCart.id])
  }
}
