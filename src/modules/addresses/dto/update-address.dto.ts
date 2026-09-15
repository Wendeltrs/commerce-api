import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateAddressDto {
    @ApiProperty({ description: 'The name of the address', required: false })
    @IsString()
    @IsOptional()
    name?: string

    @ApiProperty({ description: 'The street of the address', required: false })
    @IsString()
    @IsOptional()
    street?: string

    @ApiProperty({ description: 'The number of the address', required: false })
    @IsString()
    @IsOptional()
    number?: string

    @ApiProperty({ description: 'The complement of the address', required: false })
    @IsString()
    @IsOptional()
    complement?: string

    @ApiProperty({ description: 'The neighborhood of the address', required: false })
    @IsString()
    @IsOptional()
    neighborhood?: string

    @ApiProperty({ description: 'The city of the address', required: false })
    @IsString()
    @IsOptional()
    city?: string

    @ApiProperty({ description: 'The state of the address', required: false })
    @IsString()
    @IsOptional()
    state?: string

    @ApiProperty({ description: 'The zip code of the address', required: false })
    @IsString()
    @IsOptional()
    zipCode?: string
}