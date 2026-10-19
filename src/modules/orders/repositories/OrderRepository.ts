import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Order, OrderStatus, PaymentStatus } from 'prisma/generated/prisma/client'
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

    const order = await this.prisma.order.create({
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

    const stripeProducts = cart.items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.product.name,
        },
        unit_amount: Math.round(Number(item.product.price) * 100),
      },
      quantity: item.quantity,
    }))

    stripeProducts.push({
      price_data: {
        currency: 'brl',
        product_data: {
          name: `Frete - ${shipping.name}`,
        },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    })

    const stripeSession = await this.stripe.session(addressTo.user.email, order.id, stripeProducts)

    await this.prisma.payment.update({
      where: {
        orderId: order.id,
      },
      data: {
        transactionId: stripeSession.id,
      },
    })

    return {
      order,
      paymentUrl: stripeSession.url,
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
