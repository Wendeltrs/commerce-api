import { ApiProperty } from '@nestjs/swagger'
import { CompanyDto } from 'src/modules/companies/dto/company.dto'
import { OrderDto } from 'src/modules/orders/dto/order.dto'
import { UserDto } from 'src/modules/users/dto/user.dto'

export class AddressDto {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() street: string
  @ApiProperty() number: string
  @ApiProperty() complement: string
  @ApiProperty() neighborhood: string
  @ApiProperty() city: string
  @ApiProperty() state_abbr: string
  @ApiProperty() country_id: string
  @ApiProperty() default: boolean
  @ApiProperty() zipCode: string
  @ApiProperty() userId: string
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
  @ApiProperty({ type: () => UserDto }) user: UserDto
  @ApiProperty({ type: () => CompanyDto }) company: CompanyDto
  @ApiProperty({ type: () => [OrderDto] }) orders: OrderDto[]
}
