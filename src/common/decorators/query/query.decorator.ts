import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common'
import { getPrismaWhere } from 'src/prisma/prisma.utils'

export const QueryPaginator = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  const { page = 1, perPage = 30, sortBy, sortOrder = 'desc', query } = request.query

  if (perPage > 100) {
    throw new InternalServerErrorException('Per page limit exceeded. Maximum allowed is 100.')
  }

  const where = getPrismaWhere(query)

  return {
    skip: (page - 1) * perPage,
    take: perPage,
    where: where,
    ...(sortBy && {
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
  }
})
