import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AddressShippingDto {
  @ApiProperty({ description: 'The id of the address of the delivery' })
  @IsString()
  @IsNotEmpty()
  addressId: string
}
