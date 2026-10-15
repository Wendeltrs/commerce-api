import { Injectable, NotFoundException } from '@nestjs/common'
import { Cart, CartItem } from 'prisma/generated/prisma/client'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCartItemDto } from '../dto/create-cart-item.dto'
import { UpdateCartItemDto } from '../dto/update-cart-item.dto'
import { ICartRepository } from './ICartRepository'

@Injectable()
export class CartRespository implements ICartRepository {
  constructor(
    private prisma: PrismaService,
    private session: SessionService,
  ) {}

  get(): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: {
        userId: this.session.getUserId(),
        deletedAt: null,
      },
      include: {
        items: {
          where: { deletedAt: null },
          include: { product: true },
        },
      },
    })
  }

  async create(data: CreateCartItemDto): Promise<CartItem> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: this.session.getUserId(),
        deletedAt: null,
      },
    })

    if (!cart) {
      throw new NotFoundException('Cart not found')
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id: data.productId,
      },
    })

    if (!product || product.stock < data.quantity || product.active === false) {
      throw new NotFoundException(`Product ${product?.name} is out of stock`)
    }

    const item = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: data.productId,
        },
        deletedAt: null,
      },
    })

    if (item) {
      return this.prisma.cartItem.update({
        where: {
          id: item.id,
        },
        data: {
          quantity: { increment: data.quantity },
        },
      })
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: data.productId,
        quantity: data.quantity,
      },
    })
  }

  async update(id: string, data: UpdateCartItemDto): Promise<CartItem> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: this.session.getUserId(),
        deletedAt: null,
      },
    })

    if (!cart) {
      throw new NotFoundException('Cart not found')
    }

    const item = await this.prisma.cartItem.findFirst({
      where: {
        id,
        cartId: cart.id,
        deletedAt: null,
      },
    })

    if (!item) {
      throw new NotFoundException('Cart item not found')
    }

    return this.prisma.cartItem.update({
      where: {
        id: item.id,
      },
      data: {
        quantity: data.quantity,
      },
    })
  }

  async delete(id: string): Promise<void> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: this.session.getUserId(),
        deletedAt: null,
      },
    })

    if (!cart) {
      throw new NotFoundException('Cart not found')
    }

    const item = await this.prisma.cartItem.findFirst({
      where: {
        id,
        cartId: cart.id,
        deletedAt: null,
      },
    })

    if (!item) {
      throw new NotFoundException('Cart item not found')
    }

    await this.prisma.cartItem.update({
      where: {
        id: item.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
