/**
 * Enterprise Chinese Payment Gateway Integration
 * Multi-gateway system for Chinese market (CNY, Asia/Shanghai, PBOC compliance)
 *
 * Supported gateways:
 * - WeChat Pay (微信支付) - QR code Native payments
 * - Alipay (支付宝) - Page pay, mobile wallet
 * - UnionPay (银联) - Bank card payments
 * - Bank Transfer (银行转账) - B2B payments
 */

/** Asia/Shanghai timezone for all Chinese payment timing */
export const CHINESE_TIMEZONE = 'Asia/Shanghai'

/** Default currency for Chinese market - 人民币 */
export const CHINESE_CURRENCY = 'CNY'

/** Country code for China */
export const CHINA_COUNTRY_CODE = 'CN'

/** Performance targets (milliseconds) */
export const PERFORMANCE_TARGETS = {
  PAYMENT_PROCESSING_MS: 2000,
  QR_CODE_GENERATION_MS: 1000,
  WEBHOOK_RESPONSE_MS: 500,
} as const

/** Chinese gateway types */
export type ChineseGatewayType = 'WECHAT_PAY' | 'ALIPAY' | 'UNIONPAY' | 'BANK_TRANSFER'

/** UnionPay integration config (for future implementation) */
export const UNIONPAY_CONFIG = {
  DOMAIN: process.env.UNIONPAY_DOMAIN || 'https://gateway.95516.com',
  MERCHANT_ID: process.env.UNIONPAY_MERCHANT_ID,
  CURRENCY: CHINESE_CURRENCY,
  COUNTRY: CHINA_COUNTRY_CODE,
} as const

/** Bank transfer config for B2B payments */
export const BANK_TRANSFER_CONFIG = {
  CURRENCY: CHINESE_CURRENCY,
  SUPPORTED_BANKS: ['ICBC', 'CCB', 'ABC', 'BOC', 'CMB'] as const,
  SETTLEMENT_DAYS: 1,
} as const

/**
 * Chinese error messages for payment failures (PBOC compliance, user-friendly)
 */
export const CHINESE_ERROR_MESSAGES: Record<string, string> = {
  // WeChat Pay
  WECHAT_PAY_INVALID_CONFIG: '微信支付配置错误，请联系客服',
  WECHAT_PAY_SIGN_FAILED: '微信支付签名验证失败',
  WECHAT_PAY_ORDER_FAILED: '微信支付下单失败，请稍后重试',
  WECHAT_PAY_QR_EXPIRED: '支付二维码已过期，请刷新后重试',
  WECHAT_PAY_USER_CANCEL: '用户已取消支付',

  // Alipay
  ALIPAY_INVALID_CONFIG: '支付宝配置错误，请联系客服',
  ALIPAY_SIGN_FAILED: '支付宝签名验证失败',
  ALIPAY_ORDER_FAILED: '支付宝下单失败，请稍后重试',
  ALIPAY_USER_CANCEL: '用户已取消支付',

  // UnionPay
  UNIONPAY_INVALID_CONFIG: '银联支付配置错误，请联系客服',
  UNIONPAY_ORDER_FAILED: '银联支付下单失败，请稍后重试',

  // Bank Transfer
  BANK_TRANSFER_INVALID: '银行转账信息无效',
  BANK_TRANSFER_PENDING: '银行转账处理中，请等待到账',

  // Generic
  PAYMENT_TIMEOUT: '支付超时，请重试',
  PAYMENT_AMOUNT_INVALID: '支付金额无效',
  PAYMENT_NETWORK_ERROR: '网络异常，请检查网络后重试',
  PAYMENT_SYSTEM_ERROR: '支付系统繁忙，请稍后重试',
  FRAUD_DETECTION: '交易存在风险，请联系客服核实',
  MFA_REQUIRED: '需要二次验证以完成支付',
}

/**
 * Get Chinese error message by key, with fallback
 */
export function getChineseErrorMessage(key: string, fallback?: string): string {
  return CHINESE_ERROR_MESSAGES[key] ?? fallback ?? CHINESE_ERROR_MESSAGES.PAYMENT_SYSTEM_ERROR
}

/**
 * Mobile wallet compatibility flags
 */
export interface MobileWalletSupport {
  wechat: boolean
  alipay: boolean
  unionPay: boolean
  applePay: boolean
}

/**
 * Chinese payment metadata for compliance
 */
export interface ChinesePaymentMetadata {
  gateway: ChineseGatewayType
  currency: typeof CHINESE_CURRENCY
  timezone: typeof CHINESE_TIMEZONE
  country: typeof CHINA_COUNTRY_CODE
  /** PBOC transaction reference if applicable */
  pbocRef?: string
  /** Fraud detection score 0-100 */
  fraudScore?: number
  /** MFA required flag */
  mfaRequired?: boolean
}

/**
 * Check if amount is valid for Chinese market (min 0.01 CNY)
 */
export function isValidChineseAmount(amount: number): boolean {
  return typeof amount === 'number' && amount >= 0.01 && amount < 1_000_000
}

/**
 * Convert CNY to fen (分) for WeChat Pay API (integer)
 */
export function cnyToFen(cny: number): number {
  return Math.round(cny * 100)
}

/**
 * Convert fen to CNY
 */
export function fenToCny(fen: number): number {
  return fen / 100
}

/**
 * Format amount for Alipay (2 decimal places string)
 */
export function formatAlipayAmount(cny: number): string {
  return cny.toFixed(2)
}
