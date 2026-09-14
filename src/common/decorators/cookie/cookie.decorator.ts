import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { CookieInterceptor } from 'src/common/interceptors/cookie/cookie.interceptor'

export const Cookie = (logout?: boolean) => {
  return applyDecorators(UseInterceptors(new CookieInterceptor(logout!)))
}
