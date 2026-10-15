import { ApiProperty } from '@nestjs/swagger'
import { AddressDto } from 'src/modules/addresses/dto/address.dto'
import { ProductDto } from 'src/modules/products/dto/product.dto'
import { UserDto } from 'src/modules/users/dto/user.dto'

export class CompanyDto {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() phone: string
  @ApiProperty() document: string
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
  @ApiProperty() userId: string
  @ApiProperty({ type: () => UserDto }) user: UserDto
  @ApiProperty() addressId: string
  @ApiProperty({ type: () => AddressDto }) address: AddressDto
  @ApiProperty({ type: () => [ProductDto] }) products: ProductDto[]
}
