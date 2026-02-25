/**
 * Enterprise Alipay SDK - Page Pay & Mobile Wallet
 * https://opendocs.alipay.com/open/270/105898
 *
 * Features:
 * - PC web page payment (alipay.trade.page.pay)
 * - CNY (人民币), Asia/Shanghai timezone
 * - RSA2 (SHA256WithRSA) signing
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
  CHINESE_TIMEZONE,
  formatAlipayAmount,
  getChineseErrorMessage,
  isValidChineseAmount,
} from './chinese-gateways'

/** Alipay API config */
export const ALIPAY_CONFIG = {
  APP_ID: process.env.ALIPAY_APP_ID,
  DOMAIN: 'https://openapi.alipay.com',
  SANDBOX_DOMAIN: 'https://openapi-sandbox.dl.alipaydev.com',
  CURRENCY: CHINESE_CURRENCY,
  TIMEZONE: CHINESE_TIMEZONE,
} as const

function getAlipayDomain(): string {
  const env = process.env.ALIPAY_ENV || 'production'
  return env === 'sandbox' ? ALIPAY_CONFIG.SANDBOX_DOMAIN : ALIPAY_CONFIG.DOMAIN
}

function getPrivateKey(): string {
  const key = process.env.ALIPAY_PRIVATE_KEY
  if (!key) {
    throw new Error(getChineseErrorMessage('ALIPAY_INVALID_CONFIG'))
  }
  return key.replace(/\\n/g, '\n')
}

/**
 * Build Alipay RSA2 signature
 */
function sign(params: Record<string, string>, privateKey: string): string {
  const sortedKeys = Object.keys(params).sort()
  const signStr = sortedKeys
    .filter((k) => params[k] !== '' && params[k] != null)
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  return crypto.createSign('RSA-SHA256').update(signStr).sign(privateKey, 'base64')
}

/**
 * Verify Alipay webhook/return signature
 */
function verifySign(params: Record<string, string>, signature: string, publicKey: string): boolean {
  const signType = params.sign_type || 'RSA2'
  if (signType !== 'RSA2') return false
  const sortedKeys = Object.keys(params)
    .filter((k) => k !== 'sign' && k !== 'sign_type')
    .sort()
  const signStr = sortedKeys
    .filter((k) => params[k] !== '' && params[k] != null)
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  try {
    return crypto.createVerify('RSA-SHA256').update(signStr).verify(publicKey, signature, 'base64')
  } catch {
    return false
  }
}

export class AlipayClient implements PaymentGateway {
  async createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
    const appId = ALIPAY_CONFIG.APP_ID
    if (!appId) {
      throw new Error(getChineseErrorMessage('ALIPAY_INVALID_CONFIG'))
    }

    const amount = request.amount
    if (!isValidChineseAmount(amount)) {
      throw new Error(getChineseErrorMessage('PAYMENT_AMOUNT_INVALID'))
    }

    const outTradeNo = `A${Date.now()}${Math.random().toString(36).slice(2, 9)}`
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
    const returnUrl = request.successUrl ?? `${baseUrl}/payment/success`
    const notifyUrl =
      process.env.ALIPAY_NOTIFY_URL || `${baseUrl}/api/payments/webhooks/alipay`

    const bizContent = {
      out_trade_no: outTradeNo,
      total_amount: formatAlipayAmount(amount),
      subject: request.description.slice(0, 256),
      product_code: 'FAST_INSTANT_TRADE_PAY',
    }

    const params: Record<string, string> = {
      app_id: appId,
      method: 'alipay.trade.page.pay',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: new Date().toISOString().replace(/\\.\d{3}Z$/, 'Z'),
      version: '1.0',
      return_url: returnUrl,
      notify_url: notifyUrl,
      biz_content: JSON.stringify(bizContent),
    }

    const signature = sign(params, getPrivateKey())
    params.sign = signature

    const gateway = `${getAlipayDomain()}/gateway.do`
    const query = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')
    const checkoutUrl = `${gateway}?${query}`

    return {
      paymentId: outTradeNo,
      checkoutUrl,
      status: 'WAIT_BUYER_PAY',
    }
  }

  verifyWebhook(payload: unknown, signature: string): boolean {
    const params = (typeof payload === 'object' && payload !== null ? payload : {}) as Record<string, string>
    const sig = params.sign ?? signature
    const publicKey = process.env.ALIPAY_PUBLIC_KEY
    if (!publicKey) return false
    return verifySign(params, sig, publicKey.replace(/\\n/g, '\n'))
  }

  async processWebhook(payload: unknown): Promise<WebhookResult> {
    const body = payload as Record<string, string>
    const tradeStatus = body.trade_status
    const outTradeNo = body.out_trade_no

    if (!outTradeNo) {
      return { success: false, eventType: 'notify', error: getChineseErrorMessage('ALIPAY_SIGN_FAILED') }
    }

    const statusMap: Record<string, string> = {
      WAIT_BUYER_PAY: 'pending',
      TRADE_CLOSED: 'cancelled',
      TRADE_SUCCESS: 'completed',
      TRADE_FINISHED: 'completed',
    }
    const status = tradeStatus ? statusMap[tradeStatus] || tradeStatus : 'unknown'

    return {
      success: true,
      paymentId: outTradeNo,
      eventType: 'trade.notify',
      status,
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<RefundResponse> {
    const appId = ALIPAY_CONFIG.APP_ID
    if (!appId) {
      return {
        refundId: '',
        status: 'failed',
        error: getChineseErrorMessage('ALIPAY_INVALID_CONFIG'),
      }
    }

    const refundNo = `R${Date.now()}${Math.random().toString(36).slice(2, 9)}`
    const bizContent: Record<string, string> = {
      out_trade_no: paymentId,
      refund_amount: amount != null ? formatAlipayAmount(amount) : '0',
      out_request_no: refundNo,
    }

    const params: Record<string, string> = {
      app_id: appId,
      method: 'alipay.trade.refund',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: new Date().toISOString().replace(/\\.\d{3}Z$/, 'Z'),
      version: '1.0',
      biz_content: JSON.stringify(bizContent),
    }

    const signature = sign(params, getPrivateKey())
    params.sign = signature

    const gateway = `${getAlipayDomain()}/gateway.do`
    const query = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')

    const startTime = Date.now()
    const res = await fetch(gateway, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: query,
    })

    if (Date.now() - startTime > 2000) {
      return {
        refundId: '',
        status: 'failed',
        error: getChineseErrorMessage('PAYMENT_TIMEOUT'),
      }
    }

    const data = (await res.json()) as {
      alipay_trade_refund_response?: { code?: string; msg?: string; sub_code?: string }
    }
    const resp = data.alipay_trade_refund_response
    if (!resp || resp.code !== '10000') {
      return {
        refundId: '',
        status: 'failed',
        error: resp?.sub_code || resp?.msg || getChineseErrorMessage('ALIPAY_ORDER_FAILED'),
      }
    }

    return {
      refundId: refundNo,
      status: 'completed',
      amountRefunded: amount,
    }
  }
}
