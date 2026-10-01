import { ApiProperty } from '@nestjs/swagger'
import { Role } from 'prisma/generated/prisma/enums'
import { AddressDto } from 'src/modules/addresses/dto/address.dto'
import { CartDto } from 'src/modules/carts/dto/cart.dto'

export class UserDto {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() email: string
  @ApiProperty() avatar: string
  @ApiProperty({ enum: Role, default: Role.CUSTOMER }) role: Role
  @ApiProperty({ format: 'date-time' }) createdAt: Date
  @ApiProperty({ format: 'date-time' }) updatedAt: Date
  @ApiProperty({ format: 'date-time' }) deletedAt: Date
  @ApiProperty({ type: () => [AddressDto] }) addresses: AddressDto[]
  @ApiProperty({ type: () => CartDto }) cart: CartDto

  // TODO: Additional properties for the full user DTO can be added here
  //@ApiProperty({ type: () => [Orders] }) orders: Orders[]
}
