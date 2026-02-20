/**
 * Payment gateway factory
 * Returns the appropriate gateway implementation for the given provider.
 */

import type { PaymentGateway } from './types'
import { AirwallexGateway } from './airwallex'
import { HitpayGateway } from './hitpay'

export type GatewayName = 'AIRWALLEX' | 'HITPAY'

export function getPaymentGateway(gateway: GatewayName): PaymentGateway {
  switch (gateway) {
    case 'AIRWALLEX':
      return new AirwallexGateway()
    case 'HITPAY':
      return new HitpayGateway()
    default:
      throw new Error(`Unsupported payment gateway: ${gateway}`)
  }
}
