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
import { Order } from 'src/models/order'
import { Shipping } from 'src/models/shipping'
import { AddressShippingDto } from './dto/address-shipping.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { CreateOrderResponseDto, OrderDto } from './dto/order.dto'
import { ShippingDto } from './dto/shipping.dto'
import { OrdersService } from './orders.service'

@Controller({ path: 'orders', version: '1' })
@UseGuards(JwtAuthGuard)
@UseInterceptors(ValidateIdInterceptor)
@ApiCookieAuth(ACCESS_TOKEN)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @Paginator()
  @ApiPaginatedResponse(OrderDto)
  async getAll(@QueryPaginator() query: QueryDto) {
    return this.ordersService.getAll(query)
  }

  @Get(':orderId')
  @ValidateId()
  @ApiResponse({ status: HttpStatus.OK, type: OrderDto })
  async get(@Param('orderId', ParseUUIDPipe) id: string) {
    return this.ordersService.get(id)
  }

  @Post('/shipping')
  @ApiResponse({ status: HttpStatus.OK, type: ShippingDto })
  async calculateShipping(@Body() data: AddressShippingDto) {
    return this.ordersService.calculateShipping(data.addressId)
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateOrderResponseDto })
  async create(@Body() data: CreateOrderDto) {
    return this.ordersService.create(data)
  }

  @Delete(':orderId')
  @ValidateId()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('orderId', ParseUUIDPipe) id: string) {
    return this.ordersService.delete(id)
  }
}
