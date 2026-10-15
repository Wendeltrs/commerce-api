import { ApiProperty } from '@nestjs/swagger'

export class PaymentDto {
  @ApiProperty() message: string
}
