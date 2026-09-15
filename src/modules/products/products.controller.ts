import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiResponse } from '@nestjs/swagger'
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response/api-paginated-response.decorator'
import { Paginator } from 'src/common/decorators/paginator/paginator.decorator'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { QueryPaginator } from 'src/common/decorators/query/query.decorator'
import { Serializer } from 'src/common/decorators/serializer/serializer.decorator'
import { ValidateId } from 'src/common/decorators/validate-id/validate-id.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard'
import { ValidateIdInterceptor } from 'src/common/interceptors/validate-id/validate-id.interceptor'
import { ACCESS_TOKEN } from 'src/consts'
import { Product } from 'src/models/product'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductDto } from './dto/product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'

@Controller({ path: 'products', version: '1' })
@UseInterceptors(ValidateIdInterceptor)
@UseGuards(JwtAuthGuard)
@ApiCookieAuth(ACCESS_TOKEN)
@Serializer(Product)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Paginator()
  @ApiPaginatedResponse(ProductDto)
  async getAll(@QueryPaginator() query?: QueryDto) {
    return await this.productsService.getAll(query)
  }

  @Get(':productId')
  @ApiResponse({ type: ProductDto, status: HttpStatus.OK })
  @ValidateId()
  async get(@Param('productId', ParseUUIDPipe) id: string) {
    return await this.productsService.get(id)
  }

  @Post()
  @ApiResponse({ type: ProductDto, status: HttpStatus.CREATED })
  async create(@Body() data: CreateProductDto) {
    return await this.productsService.create(data)
  }

  @Put(':productId')
  @ApiResponse({ type: ProductDto, status: HttpStatus.OK })
  @ValidateId()
  async update(@Param('productId', ParseUUIDPipe) id: string, @Body() data: UpdateProductDto) {
    return await this.productsService.update(id, data)
  }

  @Delete(':productId')
  @ValidateId()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('productId', ParseUUIDPipe) id: string) {
    await this.productsService.delete(id)
  }
}
