export abstract class IPaymentRepository {
  abstract handleWebhook(event: { type: string; data: { object } }): Promise<void>
  abstract paymentSuccess(session: {
    metadata: { orderId: string }
    client_reference_id: string
    payment_status: string
    payment_intent: string
  }): Promise<void>
  abstract paymentFailed(session: {
    metadata: { orderId: string }
    client_reference_id: string
  }): Promise<void>
  abstract createShipping(orderId: string): Promise<void>
}
