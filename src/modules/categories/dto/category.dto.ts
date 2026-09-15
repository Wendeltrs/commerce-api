import { ApiProperty } from "@nestjs/swagger"

export class CategoryDto {
    @ApiProperty() id: string
    @ApiProperty() name: string
    @ApiProperty() slug: string
    @ApiProperty({ format: 'date-time' }) createdAt: string
    @ApiProperty({ format: 'date-time' }) updatedAt: string
    @ApiProperty({ format: 'date-time' }) deletedAt: string

    // TODO: Adicionar relação com produtos
    //@ApiProperty({ type: [ProductDto] }) products: ProductDto[]
}