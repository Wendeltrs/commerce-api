import { Expose } from "class-transformer";

export class Shipping {
    @Expose()
    serviceId: string

    @Expose()
    name: string

    @Expose()
    price: number

    @Expose()
    deliveryTime: string

    @Expose()
    companyName: string
}