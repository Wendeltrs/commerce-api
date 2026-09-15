import { Expose, Type } from "class-transformer";
import { Address } from "./address";

export class User {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    avatar: string;

    @Expose()
    role: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    deletedAt: Date;

    @Expose()
    @Type(() => Address)
    addresses: Address[];

    //TODO: Additional properties for the full user model can be added here
    //@Expose()
    //@Type(() => Cart)
    //cart: Cart;

    //@Expose()
    //@Type(() => Orders)
    //orders: Orders[];
}