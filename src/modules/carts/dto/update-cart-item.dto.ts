import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, Min } from 'class-validator'

export class UpdateCartItemDto {
  @ApiProperty({ description: 'The quantity of the product', default: 1, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  quantity?: number
}
