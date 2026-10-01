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
import { ApiResponse } from '@nestjs/swagger'
import { Serializer } from 'src/common/decorators/serializer/serializer.decorator'
import { ValidateId } from 'src/common/decorators/validate-id/validate-id.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard'
import { ValidateIdInterceptor } from 'src/common/interceptors/validate-id/validate-id.interceptor'
import { Cart } from 'src/models/cart'
import { CartItem } from 'src/models/cart-item'
import { CartService } from './carts.service'
import { CartDto } from './dto/cart.dto'
import { CartItemDto } from './dto/cart-item.dto'
import { CreateCartItemDto } from './dto/create-cart-item.dto'
import { UpdateCartItemDto } from './dto/update-cart-item.dto'

@Controller({ path: 'carts', version: '1' })
@UseInterceptors(ValidateIdInterceptor)
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @Serializer(Cart)
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
  public async get() {
    return await this.cartService.get()
  }

  @Post('/item')
  @Serializer(CartItem)
  @ApiResponse({ status: HttpStatus.CREATED, type: CartItemDto })
  public async create(@Body() data: CreateCartItemDto) {
    return await this.cartService.create(data)
  }

  @Put('/item/:cartItemId')
  @ValidateId()
  @Serializer(CartItem)
  @ApiResponse({ status: HttpStatus.OK, type: CartItemDto })
  public async update(
    @Param('cartItemId', ParseUUIDPipe) id: string,
    @Body() data: UpdateCartItemDto,
  ) {
    return await this.cartService.update(id, data)
  }

  @Delete('/item/:cartItemId')
  @ValidateId()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('cartItemId', ParseUUIDPipe) id: string) {
    return await this.cartService.delete(id)
  }
}
