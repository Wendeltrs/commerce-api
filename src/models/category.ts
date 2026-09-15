import { Expose } from "class-transformer";

export class Category {
    @Expose()
    id: string

    @Expose()
    name: string

    @Expose()
    slug: string

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date

    @Expose()
    deletedAt: Date

    // TODO: add products
    // @Expose()
    // @Type(() => Products)
    // products: Products[]
}