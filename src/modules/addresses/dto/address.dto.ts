import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from 'src/modules/users/dto/user.dto'

export class AddressDto {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() street: string
  @ApiProperty() number: string
  @ApiProperty() complement: string
  @ApiProperty() neighborhood: string
  @ApiProperty() city: string
  @ApiProperty() state: string
  @ApiProperty() zipCode: string
  @ApiProperty() userId: string
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
  @ApiProperty({ type: UserDto }) user: UserDto

  // TODO: Additional properties for the full address DTO can be added here
  //@ApiProperty({ type: [Orders] }) orders: Orders[]
}
