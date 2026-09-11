import { applyDecorators, HttpStatus, Type } from '@nestjs/common'
import { ApiQuery, ApiResponse } from '@nestjs/swagger'

export const ApiPaginatedResponse = <T extends Type<unknown>>(model: T) => {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'perPage', required: false, type: Number }),
    ApiQuery({ name: 'sortBy', required: false, type: String }),
    ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] }),
    ApiQuery({ name: 'query', required: false, type: String }),
    ApiResponse({ type: [model], status: HttpStatus.OK }),
  )
}
