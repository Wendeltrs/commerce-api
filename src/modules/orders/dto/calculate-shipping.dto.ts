import { ApiProperty } from '@nestjs/swagger'

export class CalculateShippingDto {
  @ApiProperty() id: string
  @ApiProperty() weight: number | null
  @ApiProperty() width: number | null
  @ApiProperty() length: number | null
  @ApiProperty() height: number | null
  @ApiProperty() insurance_value: number
  @ApiProperty() quantity: number
}
