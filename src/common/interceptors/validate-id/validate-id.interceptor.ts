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
    const { userId } = request.params

    if (userId) {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId as string,
        },
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }
    }

    return next.handle()
  }
}
