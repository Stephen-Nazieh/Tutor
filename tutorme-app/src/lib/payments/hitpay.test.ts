import { describe, expect, it, vi } from 'vitest'
import { HitpayGateway } from './hitpay'

describe('HitpayGateway.verifyWebhook', () => {
  it('returns false for malformed hex signatures', () => {
    vi.stubEnv('HITPAY_SALT', 'test-salt')

    const gateway = new HitpayGateway()

    expect(gateway.verifyWebhook('{"id":"evt_1"}', 'not-hex')).toBe(false)
    expect(gateway.verifyWebhook('{"id":"evt_1"}', 'abc')).toBe(false)

    vi.unstubAllEnvs()
  })
})
