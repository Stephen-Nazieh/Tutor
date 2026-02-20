/**
 * Shared payment gateway types
 */

export interface CreatePaymentRequest {
  amount: number
  currency: string
  /** For clinic bookings; omit for course payments */
  bookingId?: string
  /** For course payments; used as gateway reference when bookingId is absent */
  curriculumId?: string
  studentEmail: string
  description: string
  metadata?: Record<string, unknown>
  /** Override success redirect (e.g. with ?type=course or ?type=booking). */
  successUrl?: string
  /** Override cancel/failure redirect when supported by gateway. */
  cancelUrl?: string
}

export interface PaymentResponse {
  paymentId: string
  checkoutUrl: string
  status: string
}

export interface WebhookResult {
  success: boolean
  paymentId?: string
  eventType: string
  status?: string
  error?: string
}

export interface RefundResponse {
  refundId: string
  status: string
  amountRefunded?: number
  error?: string
}

export interface PaymentGateway {
  createPayment(request: CreatePaymentRequest): Promise<PaymentResponse>
  verifyWebhook(payload: unknown, signature: string): boolean
  processWebhook(payload: unknown): Promise<WebhookResult>
  refundPayment(paymentId: string, amount?: number): Promise<RefundResponse>
}
