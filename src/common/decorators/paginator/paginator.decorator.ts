import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { PaginatorInterceptor } from 'src/common/interceptors/paginator/paginator.interceptor'

export const Paginator = () => {
  return applyDecorators(UseInterceptors(new PaginatorInterceptor()))
}
