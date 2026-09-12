import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Response } from 'express'
import { map, Observable } from 'rxjs'

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<{ message: string }> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>()

        response.cookie('access_token', data.access_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })

        return { message: data.message }
      }),
    )
  }
}
