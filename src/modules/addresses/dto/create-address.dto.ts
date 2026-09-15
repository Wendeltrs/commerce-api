import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateAddressDto {
    @ApiProperty({ description: 'The name of the address' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ description: 'The street of the address' })
    @IsString()
    @IsNotEmpty()
    street: string

    @ApiProperty({ description: 'The number of the address' })
    @IsString()
    @IsNotEmpty()
    number: string

    @ApiProperty({ description: 'The complement of the address' })
    @IsString()
    @IsOptional()
    complement?: string

    @ApiProperty({ description: 'The neighborhood of the address' })
    @IsString()
    @IsNotEmpty()
    neighborhood: string

    @ApiProperty({ description: 'The city of the address' })
    @IsString()
    @IsNotEmpty()
    city: string

    @ApiProperty({ description: 'The state of the address' })
    @IsString()
    @IsNotEmpty()
    state: string

    @ApiProperty({ description: 'The zip code of the address' })
    @IsString()
    @IsNotEmpty()
    zipCode: string
}