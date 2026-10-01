import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator'

export class CreateCartItemDto {
    @ApiProperty({ description: 'The id of the product' })
    @IsUUID()
    @IsNotEmpty()
    productId: string

    @ApiProperty({ description: 'The quantity of the product', default: 1 })
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    quantity: number = 1
}