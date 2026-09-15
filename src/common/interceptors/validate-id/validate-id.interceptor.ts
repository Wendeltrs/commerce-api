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
    const { userId, addressId, categoryId, productId } = request.params

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

    return next.handle()
  }
}
