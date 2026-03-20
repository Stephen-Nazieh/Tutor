import { describe, expect, it, beforeEach } from 'vitest'
import crypto from 'crypto'
import { validateWebhook, resetWebhookReplayCache } from './payment-security'

describe('PaymentSecurityValidator.validateWebhook', () => {
  beforeEach(() => {
    process.env.HITPAY_SALT = 'hitpay-salt'
    process.env.AIRWALLEX_WEBHOOK_SECRET = 'airwallex-secret'
    resetWebhookReplayCache()
  })

  it('validates Hitpay signatures', async () => {
    const body = JSON.stringify({ id: 'evt_1' })
    const signature = crypto
      .createHmac('sha256', process.env.HITPAY_SALT as string)
      .update(body)
      .digest('hex')
    const result = await validateWebhook({
      headers: {},
      body,
      signature,
      timestamp: String(Date.now()),
      gateway: 'HITPAY',
      ipAddress: '8.8.8.8',
      urlPath: '/api/payments/webhooks/hitpay',
    })

    expect(result.isValid).toBe(true)
  })

  it('rejects invalid Hitpay signatures', async () => {
    const body = JSON.stringify({ id: 'evt_1' })
    const result = await validateWebhook({
      headers: {},
      body,
      signature: 'bad-signature',
      timestamp: String(Date.now()),
      gateway: 'HITPAY',
      ipAddress: '8.8.8.8',
      urlPath: '/api/payments/webhooks/hitpay',
    })

    expect(result.isValid).toBe(false)
    expect(result.isTampered).toBe(true)
  })

  it('validates Airwallex signatures', async () => {
    const body = JSON.stringify({ id: 'evt_2' })
    const timestamp = String(Date.now())
    const signature = crypto
      .createHmac('sha256', process.env.AIRWALLEX_WEBHOOK_SECRET as string)
      .update(`${timestamp}${body}`)
      .digest('hex')

    const result = await validateWebhook({
      headers: { 'x-timestamp': timestamp },
      body,
      signature,
      timestamp,
      gateway: 'AIRWALLEX',
      ipAddress: '8.8.4.4',
      urlPath: '/api/payments/webhooks/airwallex',
    })

    expect(result.isValid).toBe(true)
  })

  it('detects replay with identical payload', async () => {
    const body = JSON.stringify({ id: 'evt_3' })
    const signature = crypto
      .createHmac('sha256', process.env.HITPAY_SALT as string)
      .update(body)
      .digest('hex')

    const first = await validateWebhook({
      headers: {},
      body,
      signature,
      timestamp: String(Date.now()),
      gateway: 'HITPAY',
      ipAddress: '8.8.8.8',
      urlPath: '/api/payments/webhooks/hitpay',
    })
    expect(first.isValid).toBe(true)

    const second = await validateWebhook({
      headers: {},
      body,
      signature,
      timestamp: String(Date.now()),
      gateway: 'HITPAY',
      ipAddress: '8.8.8.8',
      urlPath: '/api/payments/webhooks/hitpay',
    })
    expect(second.isReplay).toBe(true)
    expect(second.isValid).toBe(false)
  })
})
