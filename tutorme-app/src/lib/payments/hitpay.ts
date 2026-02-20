/**
 * Hitpay payment gateway implementation
 * - Create payment request (POST /v1/payment-requests)
 * - HMAC signature verification (Hitpay-Signature: SHA-256 derived from salt)
 * - Webhook processing (charge.created, payment_request.completed, etc.)
 * - Refund (POST /v1/refund)
 */

import crypto from 'crypto'
import type {
  CreatePaymentRequest,
  PaymentResponse,
  PaymentGateway,
  WebhookResult,
  RefundResponse
} from './types'

const SANDBOX_BASE = 'https://api.sandbox.hit-pay.com'
const PRODUCTION_BASE = 'https://api.hit-pay.com'

function getBaseUrl(): string {
  const env = process.env.HITPAY_ENV || 'sandbox'
  return env === 'production' ? PRODUCTION_BASE : SANDBOX_BASE
}

export class HitpayGateway implements PaymentGateway {
  async createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
    const apiKey = process.env.HITPAY_API_KEY
    if (!apiKey) {
      throw new Error('Hitpay: HITPAY_API_KEY is required')
    }

    const base = getBaseUrl()
    const defaultRedirect = process.env.PAYMENT_SUCCESS_URL || `${process.env.NEXT_PUBLIC_APP_URL || ''}/payment/success`
    const redirectUrl = request.successUrl ?? defaultRedirect
    const webhookUrl = process.env.HITPAY_WEBHOOK_URL || `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/payments/webhooks/hitpay`

    const body = {
      amount: request.amount,
      currency: request.currency.toLowerCase(),
      email: request.studentEmail,
      purpose: request.description,
      reference_number: request.bookingId ?? (request.curriculumId ? `course:${request.curriculumId}` : 'payment'),
      redirect_url: redirectUrl,
      webhook: webhookUrl
    }

    const res = await fetch(`${base}/v1/payment-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-BUSINESS-API-KEY': apiKey
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Hitpay create payment failed: ${res.status} ${text}`)
    }

    const data = (await res.json()) as {
      id?: string
      status?: string
      url?: string
    }

    const paymentId = data.id
    if (!paymentId) {
      throw new Error('Hitpay: no payment request id in response')
    }

    const checkoutUrl = data.url || ''

    return {
      paymentId,
      checkoutUrl,
      status: data.status || 'pending'
    }
  }

  /**
   * Verify Hitpay webhook signature.
   * Pass the raw request body string as payload and the Hitpay-Signature header value as signature.
   * Hitpay uses HMAC-SHA256 with the salt as key and the JSON payload as message.
   */
  verifyWebhook(payload: unknown, signature: string): boolean {
    const salt = process.env.HITPAY_SALT
    if (!salt) {
      return false
    }
    const rawBody = typeof payload === 'string' ? payload : JSON.stringify(payload)
    const expected = crypto.createHmac('sha256', salt).update(rawBody).digest('hex')
    if (expected.length !== signature.length) {
      return false
    }
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'))
  }

  async processWebhook(payload: unknown): Promise<WebhookResult> {
    const body = payload as {
      id?: string
      status?: string
      payment_request_id?: string
      amount?: number
    }

    const paymentId = body?.id || body?.payment_request_id
    const status = body?.status

    if (!paymentId) {
      return { success: false, eventType: 'unknown', error: 'Missing payment id in webhook' }
    }

    const statusMap: Record<string, string> = {
      succeeded: 'succeeded',
      completed: 'completed',
      paid: 'completed',
      pending: 'pending',
      failed: 'failed',
      expired: 'expired',
      canceled: 'cancelled',
      cancelled: 'cancelled',
      partially_refunded: 'partially_refunded',
      refunded: 'refunded'
    }
    const normalizedStatus = status ? statusMap[status.toLowerCase()] || status : 'unknown'

    return {
      success: true,
      paymentId,
      eventType: 'payment_request.completed',
      status: normalizedStatus
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<RefundResponse> {
    const apiKey = process.env.HITPAY_API_KEY
    if (!apiKey) {
      return { refundId: '', status: 'failed', error: 'Hitpay: HITPAY_API_KEY is required' }
    }

    const base = getBaseUrl()
    const body: { payment_id: string; amount?: number } = { payment_id: paymentId }
    if (amount != null && amount > 0) {
      body.amount = amount
    }

    const res = await fetch(`${base}/v1/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-BUSINESS-API-KEY': apiKey
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const text = await res.text()
      return {
        refundId: '',
        status: 'failed',
        error: `Hitpay refund failed: ${res.status} ${text}`
      }
    }

    const data = (await res.json()) as { id?: string; status?: string; amount_refunded?: number }
    return {
      refundId: data.id || '',
      status: data.status || 'succeeded',
      amountRefunded: data.amount_refunded
    }
  }
}
