import { ApiProperty } from '@nestjs/swagger'
import { Role } from 'prisma/generated/prisma/enums'
import { AddressDto } from 'src/modules/addresses/dto/address.dto'
import { CartDto } from 'src/modules/carts/dto/cart.dto'
import { CompanyDto } from 'src/modules/companies/dto/company.dto'
import { OrderDto } from 'src/modules/orders/dto/order.dto'

export class UserDto {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() email: string
  @ApiProperty() avatar: string
  @ApiProperty() document: string
  @ApiProperty() phone: string
  @ApiProperty() companyId: string
  @ApiProperty({ type: () => CompanyDto }) company: CompanyDto
  @ApiProperty({ enum: Role, default: Role.CUSTOMER }) role: Role
  @ApiProperty({ format: 'date-time' }) createdAt: Date
  @ApiProperty({ format: 'date-time' }) updatedAt: Date
  @ApiProperty({ format: 'date-time' }) deletedAt: Date
  @ApiProperty({ type: () => [AddressDto] }) addresses: AddressDto[]
  @ApiProperty({ type: () => CartDto }) cart: CartDto
  @ApiProperty({ type: () => [OrderDto] }) orders: OrderDto[]
}
