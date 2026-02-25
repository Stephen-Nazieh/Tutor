/**
 * Enterprise WeChat Pay SDK - Native QR Code Payments
 * API v3: https://pay.weixin.qq.com/docs/merchant/apis/native-payment/native-prepay.html
 *
 * Features:
 * - QR code generation for in-app payments (<1s target)
 * - SHA256-RSA signing (PBOC compliant)
 * - CNY (人民币) currency, CN country
 * - Chinese error messages
 */

import crypto from 'crypto'
import type {
  CreatePaymentRequest,
  PaymentResponse,
  PaymentGateway,
  WebhookResult,
  RefundResponse,
} from './types'
import {
  CHINESE_CURRENCY,
  cnyToFen,
  getChineseErrorMessage,
  isValidChineseAmount,
} from './chinese-gateways'

/** WeChat Pay API v3 config */
export const WECHAT_PAY_CONFIG = {
  APP_ID: process.env.WECHAT_APP_ID,
  MCH_ID: process.env.WECHAT_MCH_ID,
  DOMAIN: 'https://api.mch.weixin.qq.com',
  SANDBOX_DOMAIN: 'https://api.mch.weixin.qq.com',
  CURRENCY: 'CNY',
  COUNTRY: 'CN',
} as const

function getWeChatPayDomain(): string {
  const env = process.env.WECHAT_PAY_ENV || 'production'
  return env === 'sandbox' ? WECHAT_PAY_CONFIG.SANDBOX_DOMAIN : WECHAT_PAY_CONFIG.DOMAIN
}

function getPrivateKey(): string {
  const key = process.env.WECHAT_PAY_PRIVATE_KEY
  if (!key) {
    throw new Error(getChineseErrorMessage('WECHAT_PAY_INVALID_CONFIG'))
  }
  return key.replace(/\\n/g, '\n')
}

function getApiV3Key(): string {
  const key = process.env.WECHAT_PAY_API_V3_KEY
  if (!key) {
    throw new Error(getChineseErrorMessage('WECHAT_PAY_INVALID_CONFIG'))
  }
  return key
}

/**
 * Build WeChat Pay v3 Authorization header (WECHATPAY2-SHA256-RSA2048)
 */
function buildAuthorization(
  method: string,
  url: string,
  body: string,
  privateKey: string
): string {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const nonce = crypto.randomBytes(16).toString('hex')
  const message = `${method}\n${url}\n${timestamp}\n${nonce}\n${body}\n`
  const sign = crypto.createSign('RSA-SHA256').update(message).sign(privateKey, 'base64')
  return `WECHATPAY2-SHA256-RSA2048 mchid="${WECHAT_PAY_CONFIG.MCH_ID}",nonce_str="${nonce}",timestamp="${timestamp}",signature="${sign}"`
}

/**
 * Verify WeChat Pay webhook signature (RSA-SHA256 with platform certificate)
 * Set WECHAT_PAY_PLATFORM_PUBLIC_KEY for production verification
 */
function verifyWebhookSignature(
  body: string,
  signature: string,
  timestamp: string,
  nonce: string
): boolean {
  const platformCert = process.env.WECHAT_PAY_PLATFORM_PUBLIC_KEY
  if (!platformCert) {
    return true
  }
  const publicKey = platformCert.replace(/\\n/g, '\n')
  const message = `${timestamp}\n${nonce}\n${body}\n`
  try {
    return crypto.createVerify('RSA-SHA256').update(message).verify(publicKey, signature, 'base64')
  } catch {
    return false
  }
}

/**
 * Decrypt WeChat Pay webhook resource (AES-256-GCM)
 */
function decryptWebhookResource(ciphertext: string, nonce: string, associatedData: string): string {
  const apiV3Key = getApiV3Key()
  const key = Buffer.from(apiV3Key, 'utf8')
  const iv = Buffer.from(nonce, 'utf8')
  const authTag = Buffer.from(ciphertext.slice(-24), 'base64')
  const data = Buffer.from(ciphertext.slice(0, -24), 'base64')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv, { authTagLength: 16 })
  decipher.setAuthTag(authTag)
  decipher.setAAD(Buffer.from(associatedData, 'utf8'))
  return decipher.update(data) + decipher.final('utf8')
}

export class WeChatPayClient implements PaymentGateway {
  async createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
    const appId = WECHAT_PAY_CONFIG.APP_ID
    const mchId = WECHAT_PAY_CONFIG.MCH_ID
    if (!appId || !mchId) {
      throw new Error(getChineseErrorMessage('WECHAT_PAY_INVALID_CONFIG'))
    }

    const amount = request.amount
    if (!isValidChineseAmount(amount)) {
      throw new Error(getChineseErrorMessage('PAYMENT_AMOUNT_INVALID'))
    }

    const outTradeNo = `T${Date.now()}${Math.random().toString(36).slice(2, 9)}`
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
    const notifyUrl =
      process.env.WECHAT_PAY_NOTIFY_URL || `${baseUrl}/api/payments/webhooks/wechat-pay`

    const body = {
      appid: appId,
      mchid: mchId,
      description: request.description.slice(0, 127),
      out_trade_no: outTradeNo,
      notify_url: notifyUrl,
      amount: {
        total: cnyToFen(amount),
        currency: request.currency || CHINESE_CURRENCY,
      },
    }

    const path = '/v3/pay/transactions/native'
    const fullUrl = `${getWeChatPayDomain()}${path}`
    const bodyStr = JSON.stringify(body)
    const privateKey = getPrivateKey()
    const auth = buildAuthorization('POST', path, bodyStr, privateKey)

    const startTime = Date.now()
    const res = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'TutorMe-WeChatPay/1.0',
        Authorization: auth,
      },
      body: bodyStr,
    })

    if (Date.now() - startTime > 2000) {
      throw new Error(getChineseErrorMessage('PAYMENT_TIMEOUT'))
    }

    const data = (await res.json()) as {
      code_url?: string
      error_code?: string
      errcode?: string
      errmsg?: string
    }

    if (!res.ok || data.errcode || data.error_code) {
      const errMsg = data.errmsg || data.errcode || `HTTP ${res.status}`
      throw new Error(getChineseErrorMessage('WECHAT_PAY_ORDER_FAILED', errMsg))
    }

    const codeUrl = data.code_url
    if (!codeUrl) {
      throw new Error(getChineseErrorMessage('WECHAT_PAY_ORDER_FAILED'))
    }

    return {
      paymentId: outTradeNo,
      checkoutUrl: codeUrl,
      status: 'CREATED',
    }
  }

  verifyWebhook(payload: unknown, signature: string): boolean {
    const headers = typeof payload === 'object' && payload !== null && 'headers' in payload
      ? (payload as { headers: Record<string, string> }).headers
      : null
    const rawBody = typeof payload === 'object' && payload !== null && 'rawBody' in payload
      ? (payload as { rawBody: string }).rawBody
      : typeof payload === 'string'
        ? payload
        : JSON.stringify(payload)

    const wechatSignature = headers?.['wechatpay-signature'] ?? signature
    const timestamp = headers?.['wechatpay-timestamp'] ?? ''
    const nonce = headers?.['wechatpay-nonce'] ?? ''

    const sigMatch = wechatSignature.match(/timestamp="([^"]+)",nonce="([^"]+)",signature="([^"]+)"/)
    if (!sigMatch) return false

    const [, ts, n, sig] = sigMatch
    return verifyWebhookSignature(rawBody, sig, ts, n)
  }

  async processWebhook(payload: unknown): Promise<WebhookResult> {
    const body = payload as {
      event_type?: string
      resource?: {
        ciphertext?: string
        nonce?: string
        associated_data?: string
      }
    }

    const eventType = body?.event_type || 'unknown'
    const resource = body?.resource
    if (!resource?.ciphertext) {
      return { success: false, eventType, error: getChineseErrorMessage('WECHAT_PAY_SIGN_FAILED') }
    }

    try {
      const decrypted = decryptWebhookResource(
        resource.ciphertext,
        resource.nonce || '',
        resource.associated_data || ''
      )
      const data = JSON.parse(decrypted) as {
        out_trade_no?: string
        trade_state?: string
        transaction_id?: string
      }

      const paymentId = data.out_trade_no
      const tradeState = data.trade_state

      const statusMap: Record<string, string> = {
        SUCCESS: 'completed',
        REFUND: 'refunded',
        NOTPAY: 'pending',
        CLOSED: 'cancelled',
        REVOKED: 'cancelled',
        USERPAYING: 'processing',
        PAYERROR: 'failed',
      }
      const status = tradeState ? statusMap[tradeState] || tradeState : 'unknown'

      return {
        success: true,
        paymentId: paymentId || '',
        eventType,
        status,
      }
    } catch {
      return { success: false, eventType, error: getChineseErrorMessage('WECHAT_PAY_SIGN_FAILED') }
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<RefundResponse> {
    const mchId = WECHAT_PAY_CONFIG.MCH_ID
    if (!mchId) {
      return {
        refundId: '',
        status: 'failed',
        error: getChineseErrorMessage('WECHAT_PAY_INVALID_CONFIG'),
      }
    }

    const outRefundNo = `R${Date.now()}${Math.random().toString(36).slice(2, 9)}`
    const body: Record<string, unknown> = {
      out_trade_no: paymentId,
      out_refund_no: outRefundNo,
      reason: '用户申请退款',
      amount: {
        refund: amount != null ? cnyToFen(amount) : undefined,
        total: amount != null ? cnyToFen(amount) : undefined,
        currency: CHINESE_CURRENCY,
      },
    }

    const path = '/v3/refund/domestic/refunds'
    const fullUrl = `${getWeChatPayDomain()}${path}`
    const bodyStr = JSON.stringify(body)
    const privateKey = getPrivateKey()
    const auth = buildAuthorization('POST', path, bodyStr, privateKey)

    const res = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: auth,
      },
      body: bodyStr,
    })

    const data = (await res.json()) as {
      refund_id?: string
      status?: string
      errcode?: string
      errmsg?: string
    }

    if (!res.ok || data.errcode) {
      return {
        refundId: '',
        status: 'failed',
        error: data.errmsg || getChineseErrorMessage('WECHAT_PAY_ORDER_FAILED'),
      }
    }

    return {
      refundId: data.refund_id || outRefundNo,
      status: data.status || 'PROCESSING',
      amountRefunded: amount,
    }
  }
}
