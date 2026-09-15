import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateCategoryDto {
    @ApiProperty({ description: 'The name of the category', required: false })
    @IsString()
    @IsOptional()
    name?: string

    @ApiProperty({ description: 'The slug of the category', required: false, uniqueItems: true })
    @IsString()
    @IsOptional()
    slug?: string
}