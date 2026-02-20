/**
 * Airwallex payment gateway implementation
 * - OAuth2-style token authentication (login with API key, use Bearer token)
 * - Create payment intent
 * - Webhook signature verification (HMAC-SHA256 of timestamp + raw body)
 * - Refund via payment_attempt_id (store attempt_id from webhook for refunds)
 */

import crypto from 'crypto'
import type {
  CreatePaymentRequest,
  PaymentResponse,
  PaymentGateway,
  WebhookResult,
  RefundResponse
} from './types'

const SANDBOX_BASE = 'https://api-demo.airwallex.com'
const PRODUCTION_BASE = 'https://api.airwallex.com'

interface TokenCache {
  token: string
  expiresAt: number
}

let tokenCache: TokenCache | null = null

function getBaseUrl(): string {
  const env = process.env.AIRWALLEX_ENV || 'sandbox'
  return env === 'production' ? PRODUCTION_BASE : SANDBOX_BASE
}

async function getAccessToken(): Promise<string> {
  const now = Date.now()
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.token
  }

  const clientId = process.env.AIRWALLEX_CLIENT_ID
  const apiKey = process.env.AIRWALLEX_API_KEY
  if (!clientId || !apiKey) {
    throw new Error('Airwallex: AIRWALLEX_CLIENT_ID and AIRWALLEX_API_KEY are required')
  }

  const base = getBaseUrl()
  const res = await fetch(`${base}/api/v1/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-client-id': clientId,
      'x-api-key': apiKey
    }
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airwallex auth failed: ${res.status} ${text}`)
  }

  const data = (await res.json()) as { token?: string; expires_at?: string }
  const token = data.token
  const expiresAt = data.expires_at
  if (!token) {
    throw new Error('Airwallex: no token in auth response')
  }

  const expiresAtMs = expiresAt ? new Date(expiresAt).getTime() : Date.now() + 25 * 60 * 1000
  tokenCache = { token, expiresAt: expiresAtMs }
  return token
}

/**
 * For Airwallex webhook verification, pass an object with rawBody and timestamp:
 * { rawBody: string, timestamp: string } (timestamp from x-timestamp header).
 * If payload is a string, it is treated as rawBody and timestamp must be in signature header context
 * (caller should pass timestamp separately - we don't have it in the interface, so we require the object form).
 */
function getRawBodyAndTimestamp(payload: unknown): { rawBody: string; timestamp: string } | null {
  if (payload && typeof payload === 'object' && 'rawBody' in payload && 'timestamp' in payload) {
    const rawBody = (payload as { rawBody: unknown }).rawBody
    const timestamp = (payload as { timestamp: unknown }).timestamp
    if (typeof rawBody === 'string' && typeof timestamp === 'string') {
      return { rawBody, timestamp }
    }
  }
  return null
}

export class AirwallexGateway implements PaymentGateway {
  async createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
    const token = await getAccessToken()
    const base = getBaseUrl()
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

    const defaultReturn = process.env.PAYMENT_SUCCESS_URL || `${process.env.NEXT_PUBLIC_APP_URL || ''}/payment/success`
    const returnUrl = request.successUrl ?? defaultReturn
    const body = {
      request_id: requestId,
      amount: request.amount,
      currency: request.currency.toUpperCase(),
      merchant_order_id: request.bookingId ?? (request.curriculumId ? `course:${request.curriculumId}` : 'payment'),
      return_url: returnUrl
    }

    const res = await fetch(`${base}/api/v1/pa/payment_intents/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'x-client-id': process.env.AIRWALLEX_CLIENT_ID!
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Airwallex create payment intent failed: ${res.status} ${text}`)
    }

    const data = (await res.json()) as {
      id?: string
      status?: string
      client_secret?: string
      url?: string
    }

    const paymentId = data.id
    if (!paymentId) {
      throw new Error('Airwallex: no payment intent id in response')
    }

    const checkoutUrl =
      data.url ||
      `${process.env.NEXT_PUBLIC_APP_URL || ''}/payment/checkout?intent_id=${paymentId}&client_secret=${encodeURIComponent(data.client_secret || '')}`

    return {
      paymentId,
      checkoutUrl,
      status: data.status || 'REQUIRES_PAYMENT_METHOD'
    }
  }

  verifyWebhook(payload: unknown, signature: string): boolean {
    const secret = process.env.AIRWALLEX_WEBHOOK_SECRET
    if (!secret) {
      return false
    }
    const parsed = getRawBodyAndTimestamp(payload)
    if (!parsed) {
      return false
    }
    const { rawBody, timestamp } = parsed
    const policy = `${timestamp}${rawBody}`
    const expected = crypto.createHmac('sha256', secret).update(policy).digest('hex')
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'))
  }

  async processWebhook(payload: unknown): Promise<WebhookResult> {
    const body = payload as { name?: string; data?: { id?: string; status?: string; payment_attempt_id?: string } }
    const eventName = body?.name || ''
    const data = body?.data

    if (!data) {
      return { success: false, eventType: eventName, error: 'Missing event data' }
    }

    const paymentId = data.id
    const status = data.status

    if (eventName === 'payment_intent.succeeded') {
      return {
        success: true,
        paymentId,
        eventType: eventName,
        status: status || 'succeeded'
      }
    }

    if (eventName === 'payment_intent.cancelled' || eventName === 'payment_intent.failed') {
      return {
        success: true,
        paymentId,
        eventType: eventName,
        status: status || 'cancelled'
      }
    }

    return {
      success: true,
      paymentId,
      eventType: eventName,
      status
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<RefundResponse> {
    const token = await getAccessToken()
    const base = getBaseUrl()
    const requestId = `refund_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

    const body: Record<string, unknown> = {
      payment_attempt_id: paymentId,
      reason: 'customer_requested',
      request_id: requestId
    }
    if (amount != null && amount > 0) {
      body.amount = amount
    }

    const res = await fetch(`${base}/api/v1/pa/refunds/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'x-client-id': process.env.AIRWALLEX_CLIENT_ID!
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const text = await res.text()
      return {
        refundId: '',
        status: 'failed',
        error: `Airwallex refund failed: ${res.status} ${text}`
      }
    }

    const data = (await res.json()) as { id?: string; status?: string; amount?: number }
    return {
      refundId: data.id || requestId,
      status: data.status || 'RECEIVED',
      amountRefunded: data.amount
    }
  }
}
