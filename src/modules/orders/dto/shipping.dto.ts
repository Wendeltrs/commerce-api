import { ApiProperty } from '@nestjs/swagger'

export class ShippingDto {
  @ApiProperty() serviceId: string
  @ApiProperty() name: string
  @ApiProperty() price: number
  @ApiProperty() deliveryTime: string
  @ApiProperty() companyName: string
}
