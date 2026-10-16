import { Injectable } from '@nestjs/common'
import { IPaymentRepository } from './repositories/IPaymentRepository'

@Injectable()
export class PaymentsService {
  constructor(private paymentRepository: IPaymentRepository) {}

  async handleWebhook(event: { type: string; data: { object } }) {
    await this.paymentRepository.handleWebhook(event)
  }

  private async paymentSuccess(session: {
    metadata: { orderId: string }
    client_reference_id: string
    payment_status: string
    payment_intent: string
  }) {
    await this.paymentRepository.paymentSuccess(session)
  }

  private async paymentFailed(session: {
    metadata: { orderId: string }
    client_reference_id: string
  }) {
    await this.paymentRepository.paymentFailed(session)
  }

  private async createShipping(orderId: string) {
    await this.paymentRepository.createShipping(orderId)
  }
}
