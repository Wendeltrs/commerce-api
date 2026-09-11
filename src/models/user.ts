import { Expose } from "class-transformer";

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

    //TODO: Additional properties for the full user model can be added here
    //@Expose()
    //cart: Cart;

    //@Expose()
    //addresses: Addresses[];

    //@Expose()
    //orders: Orders[];
}