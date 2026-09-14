import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Response } from 'express'
import { map, Observable } from 'rxjs'
import { ACCESS_TOKEN } from 'src/consts'

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(private logout: boolean) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<{ message: string }> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>()

        if (this.logout) {
          response.clearCookie(ACCESS_TOKEN, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
          })

          return { message: 'Signed out successfully' }
        }

        response.cookie(ACCESS_TOKEN, data.access_token, {
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
