import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from 'src/modules/users/dto/user.dto'
import { CartItemDto } from './cart-item.dto'

export class CartDto {
  @ApiProperty() id: string
  @ApiProperty() userId: string
  @ApiProperty({ type: () => UserDto }) user: UserDto
  @ApiProperty({ type: () => [CartItemDto] }) items: CartItemDto[]
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
  @ApiProperty({ format: 'date-time' }) deletedAt: string
}
