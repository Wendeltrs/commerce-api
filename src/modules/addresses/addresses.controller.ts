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
import { Address } from 'src/models/address'
import { AddressesService } from './addresses.service'
import { AddressDto } from './dto/address.dto'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

@Controller({ path: 'addresses', version: '1' })
@UseInterceptors(ValidateIdInterceptor)
@UseGuards(JwtAuthGuard)
@ApiCookieAuth(ACCESS_TOKEN)
@Serializer(Address)
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Get()
  @Paginator()
  @ApiPaginatedResponse(AddressDto)
  async getAll(@QueryPaginator() query?: QueryDto) {
    return await this.addressesService.getAll(query)
  }

  @Get(':addressId')
  @ValidateId()
  @ApiResponse({ type: AddressDto, status: HttpStatus.OK })
  async get(@Param('addressId', ParseUUIDPipe) id: string) {
    return await this.addressesService.get(id)
  }

  @Post()
  @ApiResponse({ type: AddressDto, status: HttpStatus.CREATED })
  async create(@Body() data: CreateAddressDto) {
    return await this.addressesService.create(data)
  }

  @Put(':addressId')
  @ValidateId()
  @ApiResponse({ type: AddressDto, status: HttpStatus.OK })
  async update(@Param('addressId', ParseUUIDPipe) id: string, @Body() data: UpdateAddressDto) {
    return await this.addressesService.update(id, data)
  }

  @Delete(':addressId')
  @ValidateId()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('addressId', ParseUUIDPipe) id: string) {
    await this.addressesService.delete(id)
  }
}
