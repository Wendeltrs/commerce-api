import { Expose } from 'class-transformer'
import { PaymentMethod, PaymentStatus } from 'prisma/generated/prisma/enums'

export class Payment {
  @Expose()
  id: string

  @Expose()
  status: PaymentStatus = PaymentStatus.PENDING

  @Expose()
  method: PaymentMethod

  @Expose()
  amount: number

  @Expose()
  orderId: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt: Date
}
