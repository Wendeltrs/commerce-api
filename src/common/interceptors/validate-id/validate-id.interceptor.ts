import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { VALIDATE_ID } from 'src/consts'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ValidateIdInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Request>> {
    const shouldValidateId = this.reflector.get<boolean>(VALIDATE_ID, context.getHandler())

    if (!shouldValidateId) {
      return next.handle()
    }

    const request = context.switchToHttp().getRequest<Request>()
    const { userId, addressId, categoryId, productId, cartItemId, orderId, companyId } =
      request.params

    if (userId) {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId as string,
          deletedAt: null,
        },
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }
    }

    if (addressId) {
      const address = await this.prisma.address.findFirst({
        where: {
          id: addressId as string,
          deletedAt: null,
        },
      })

      if (!address) {
        throw new NotFoundException('Address not found')
      }
    }

    if (categoryId) {
      const category = await this.prisma.category.findFirst({
        where: {
          id: categoryId as string,
          deletedAt: null,
        },
      })

      if (!category) {
        throw new NotFoundException('Category not found')
      }
    }

    if (productId) {
      const product = await this.prisma.product.findFirst({
        where: {
          id: productId as string,
          deletedAt: null,
        },
      })

      if (!product) {
        throw new NotFoundException('Product not found')
      }
    }

    if (cartItemId) {
      const cartItem = await this.prisma.cartItem.findFirst({
        where: {
          id: cartItemId as string,
          deletedAt: null,
        },
      })

      if (!cartItem) {
        throw new NotFoundException('Cart item not found')
      }
    }

    if (orderId) {
      const order = await this.prisma.order.findFirst({
        where: {
          id: orderId as string,
          deletedAt: null,
        },
      })

      if (!order) {
        throw new NotFoundException('Order not found')
      }
    }

    if (companyId) {
      const company = await this.prisma.company.findFirst({
        where: {
          id: companyId as string,
          deletedAt: null,
        },
      })

      if (!company) {
        throw new NotFoundException('Company not found')
      }
    }

    return next.handle()
  }
}
