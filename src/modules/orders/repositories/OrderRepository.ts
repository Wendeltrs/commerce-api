import { createHash } from 'node:crypto'
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Order, OrderStatus, PaymentStatus, Prisma } from 'prisma/generated/prisma/client'
import type { RedisClientType } from 'redis'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { SessionService } from 'src/common/services/session/session.service'
import { ShippingService } from 'src/common/services/shipping/shipping.service'
import { StripeService } from 'src/common/services/stripe/stripe.service'
import { REDIS_CLIENT } from 'src/consts'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from '../dto/create-order.dto'
import { IOrderRepository } from './IOrderRepository'

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    private prisma: PrismaService,
    private session: SessionService,
    private shipping: ShippingService,
    private stripe: StripeService,
    @Inject(REDIS_CLIENT)
    private redis: RedisClientType,
  ) {}

  async getAll(query?: QueryDto): Promise<[Order[], number]> {
    const cacheKey = `getAllOrders:${JSON.stringify({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,
      where: {
        ...query?.where,
        userId: this.session.getUserId(),
        deletedAt: null,
      },
    })}`

    const getAllOrders = await this.redis.get(cacheKey)

    if (getAllOrders) {
      return JSON.parse(getAllOrders)
    }

    const orders = await this.prisma.extensions.order.findManyAndCount({
      skip: query?.skip,
      take: query?.take,
      orderBy: query?.orderBy,

      where: {
        ...query?.where,
        userId: this.session.getUserId(),
        deletedAt: null,
      },

      include: {
        address: true,
        payment: true,
        items: true,
      },
    })

    await this.redis.set(cacheKey, JSON.stringify(orders), { EX: 10 })

    return orders
  }

  async get(id: string): Promise<Order | null> {
    return await this.prisma.order.findFirst({
      where: {
        id,
        userId: this.session.getUserId(),
        deletedAt: null,
      },

      include: {
        address: true,
        payment: true,
        items: true,
      },
    })
  }

  async calculateShipping(addressId: string) {
    const userId = this.session.getUserId()

    const calculateCacheKey = `calculateShipping:${userId}`

    const calculateShipping = await this.redis.get(calculateCacheKey)

    if (calculateShipping) {
      return JSON.parse(calculateShipping)
    }

    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
        deletedAt: null,
      },

      include: {
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

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException('Cart not found')
    }

    const address = await this.prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
        deletedAt: null,
      },
    })

    if (!address) {
      throw new NotFoundException('Address not found')
    }

    const companyIds = [...new Set(cart.items.map((item) => item.product.companyId))]

    if (companyIds.length !== 1) {
      throw new BadRequestException('All cart products must belong to the same company')
    }

    const company = await this.prisma.company.findFirst({
      where: {
        id: companyIds[0]!,
        deletedAt: null,
      },

      include: {
        address: true,
      },
    })

    if (!company) {
      throw new NotFoundException('Company not found')
    }

    if (!company.address) {
      throw new BadRequestException('Company address not found')
    }

    const shipping = await this.shipping.calculate(
      company.address.zipCode,
      address.zipCode,
      cart.items.map((item) => ({
        id: item.product.id,
        weight: item.product.weight,
        width: item.product.width,
        height: item.product.height,
        length: item.product.length,
        insurance_value: Number(item.product.price),
        quantity: item.quantity,
      })),
    )

    await this.redis.set(calculateCacheKey, JSON.stringify(shipping), { EX: 10 })

    return shipping
  }

  async create(data: CreateOrderDto): Promise<{
    order: Order
    paymentUrl: string
  }> {
    const userId = this.session.getUserId()
    const requestHash = createHash('sha256')
      .update(JSON.stringify([data.addressId, data.shippingServiceId]))
      .digest('hex')
    const idempotencyKey = `${userId}-${requestHash}`

    const existingKey = await this.prisma.idempotencyKey.findUnique({
      where: {
        userId_key: {
          userId,
          key: idempotencyKey,
        },
      },
    })

    if (existingKey) {
      return this.replayOrder(existingKey, requestHash)
    }

    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
        deletedAt: null,
      },

      include: {
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

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException('Cart not found')
    }

    const addressTo = await this.prisma.address.findFirst({
      where: {
        id: data.addressId,
        userId,
        deletedAt: null,
      },

      include: {
        user: true,
      },
    })

    if (!addressTo) {
      throw new NotFoundException('Address not found')
    }

    const companyIds = [...new Set(cart.items.map((item) => item.product.companyId))]

    if (companyIds.length !== 1) {
      throw new BadRequestException('All cart products must belong to the same company')
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
      throw new NotFoundException('Company not found')
    }

    if (!company.address || !company.user) {
      throw new BadRequestException('Company address or user not found')
    }

    const shippingOptions = await this.shipping.calculate(
      company.address.zipCode,
      addressTo.zipCode,
      cart.items.map((item) => ({
        id: item.product.id,
        weight: item.product.weight,
        width: item.product.width,
        height: item.product.height,
        length: item.product.length,
        insurance_value: Number(item.product.price),
        quantity: item.quantity,
      })),
    )

    const shipping = shippingOptions.find(
      (item) => String(item.serviceId) === String(data.shippingServiceId),
    )

    if (!shipping) {
      throw new BadRequestException('Invalid shipping service')
    }

    const subtotal = cart.items.reduce(
      (acc, item) => acc + Number(item.product.price) * item.quantity,
      0,
    )

    const shippingCost = shipping.price
    const total = subtotal + shippingCost
    let orderId: string

    try {
      orderId = await this.prisma.$transaction(async (transaction) => {
        const order = await transaction.order.create({
          data: {
            addressId: addressTo.id,
            userId,
            status: OrderStatus.PENDING,
            subtotal: Number(subtotal),
            shippingCost: Number(shippingCost),
            total: Number(total),
            shippingName: shipping.name,
            shippingCompanyName: shipping.companyName,
            shippingTime: String(shipping.deliveryTime),
            items: {
              createMany: {
                data: cart.items.map((item) => ({
                  productId: item.product.id,
                  productName: item.product.name,
                  price: Number(item.product.price),
                  quantity: item.quantity,
                })),
              },
            },
            payment: {
              create: {
                amount: Number(total),
                status: PaymentStatus.PENDING,
              },
            },
          },
        })

        await transaction.idempotencyKey.create({
          data: {
            userId,
            key: idempotencyKey,
            requestHash,
            orderId: order.id,
          },
        })

        return order.id
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const concurrentKey = await this.prisma.idempotencyKey.findUnique({
          where: {
            userId_key: {
              userId,
              key: idempotencyKey,
            },
          },
        })

        if (concurrentKey) {
          return this.replayOrder(concurrentKey, requestHash)
        }
      }

      throw error
    }

    return this.replayOrder({ orderId, requestHash }, requestHash)
  }

  private async replayOrder(
    idempotencyKey: { orderId: string; requestHash: string },
    requestHash: string,
  ): Promise<{ order: Order; paymentUrl: string }> {
    if (idempotencyKey.requestHash !== requestHash) {
      throw new ConflictException('Idempotency-Key was already used with a different request')
    }

    const order = await this.prisma.order.findUnique({
      where: { id: idempotencyKey.orderId },
      include: {
        address: { include: { user: true } },
        items: { where: { deletedAt: null } },
        payment: true,
      },
    })

    if (!order?.payment) {
      throw new NotFoundException('Order not found')
    }

    const cachedPaymentUrl = order.payment.checkoutUrl

    if (cachedPaymentUrl) {
      const { address, items, payment, ...orderData } = order
      return {
        order: orderData,
        paymentUrl: cachedPaymentUrl,
      }
    }

    const stripeProducts = order.items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.productName,
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }))

    stripeProducts.push({
      price_data: {
        currency: 'brl',
        product_data: {
          name: `Frete - ${order.shippingName}`,
        },
        unit_amount: Math.round(Number(order.shippingCost) * 100),
      },
      quantity: 1,
    })

    let paymentUrl: string

    if (order.payment.transactionId) {
      const stripeSession = await this.stripe.verifySession(order.payment.transactionId)

      if (!stripeSession.url) {
        throw new Error('Stripe checkout session does not have a payment URL')
      }

      paymentUrl = stripeSession.url
    } else {
      const stripeSession = await this.stripe.session(
        order.address.user.email,
        order.id,
        stripeProducts,
      )

      paymentUrl = stripeSession.url

      await this.prisma.payment.update({
        where: { orderId: order.id },
        data: { transactionId: stripeSession.id, checkoutUrl: paymentUrl },
      })
    }

    if (order.payment.transactionId && !order.payment.checkoutUrl) {
      await this.prisma.payment.update({
        where: { orderId: order.id },
        data: { checkoutUrl: paymentUrl },
      })
    }

    const { address, items, payment, ...orderData } = order

    return {
      order: orderData,
      paymentUrl,
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.update({
      where: {
        id,
        userId: this.session.getUserId(),
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
