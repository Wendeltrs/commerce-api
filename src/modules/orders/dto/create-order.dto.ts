import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateOrderDto {
  @ApiProperty({ description: 'The id of the address of the delivery' })
  @IsString()
  @IsNotEmpty()
  addressId: string

  @ApiProperty({ description: 'The service id of the shipping' })
  @IsString()
  @IsNotEmpty()
  shippingServiceId: string
}
