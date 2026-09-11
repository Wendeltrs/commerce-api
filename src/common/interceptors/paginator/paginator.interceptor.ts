import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { isArray } from 'class-validator'
import { Response } from 'express'
import { map, Observable } from 'rxjs'

@Injectable()
export class PaginatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>()
        const totalCount = data.at(1) || 0

        if (!isArray(data)) {
          throw new BadRequestException('Incorrect data format received')
        }

        response.setHeader('X-Total-Count', totalCount)
        return data.at(0) || []
      }),
    )
  }
}
