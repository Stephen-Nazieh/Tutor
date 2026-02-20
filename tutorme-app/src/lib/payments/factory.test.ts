import { describe, it, expect } from 'vitest'
import { getPaymentGateway, type GatewayName } from './factory'

describe('payments/factory', () => {
  it('returns Hitpay gateway for HITPAY', () => {
    const gateway = getPaymentGateway('HITPAY')
    expect(gateway).toBeDefined()
    expect(typeof gateway.createPayment).toBe('function')
  })

  it('returns Airwallex gateway for AIRWALLEX', () => {
    const gateway = getPaymentGateway('AIRWALLEX')
    expect(gateway).toBeDefined()
    expect(typeof gateway.createPayment).toBe('function')
  })

  it('throws for unsupported gateway name', () => {
    expect(() => getPaymentGateway('STRIPE' as GatewayName)).toThrow('Unsupported payment gateway')
  })
})
