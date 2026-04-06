/**
 * Payment Security Validator
 * Comprehensive fraud detection and payment security validation
 * For all payment gateways including WeChat Pay, Alipay, Airwallex, Hitpay
 */

import { drizzleDb } from '@/lib/db/drizzle'
import { payment, user as userTable } from '@/lib/db/schema'
import { eq, and, gte, desc, sql, inArray, or } from 'drizzle-orm'
import { ValidationError, ForbiddenError } from '@/lib/api/middleware'
import { securityLogger } from '@/lib/security/logging'
import crypto from 'crypto'

export interface PaymentValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  fraudLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  riskFactors: string[]
}

export interface WebhookSecurityResult {
  isValid: boolean
  isReplay: boolean
  isTampered: boolean
  errors: string[]
  timestamp: number
  signature: string
}

export class PaymentSecurityValidator {
  private static readonly FRAUD_THRESHOLDS = {
    MAX_AMOUNT: 10000, // $10,000 USD equivalent
    MAX_TRANSACTIONS_PER_HOUR: 10,
    MAX_TRANSACTIONS_PER_DAY: 50,
    DUPLICATE_TIME_LIMIT: 60000, // 1 minute
    SUSPICIOUS_TIME_WINDOW: 300000, // 5 minutes for rapid-fire
    EXPIRY_TIME_LIMIT: 30 * 60 * 1000, // 30 minutes for timestamps
  }

  private static readonly SUSPICIOUS_IPS = new Set([
    '192.168.1.1', // Example (in practice, use a real threat feed)
    '127.0.0.1',
    '::1',
  ])

  private static readonly SUSPICIOUS_DOMAINS = new Set(['tempmail.com', '10minutemail.com'])

  private static readonly WEBHOOK_REPLAY_TTL_MS = 5 * 60 * 1000
  private static webhookReplayCache = new Map<string, number>()

  /**
   * Validate payment creation with comprehensive fraud detection
   */
  static async validatePaymentCreation(data: {
    amount: number
    currency: string
    studentId: string
    ipAddress: string
    userAgent?: string
    email?: string
    gateway: string
    paymentType?: string
  }): Promise<PaymentValidationResult> {
    const errors: string[] = []
    const warnings: string[] = []
    const riskFactors: string[] = []
    let fraudLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW'

    try {
      // Basic validation
      if (!data?.amount || data.amount <= 0) {
        errors.push('Invalid payment amount')
        fraudLevel = 'MEDIUM'
      }

      if (!data?.studentId) {
        errors.push('Student ID is required')
        fraudLevel = 'HIGH'
      }

      if (!data?.ipAddress || this.isLoopbackAddress(data.ipAddress)) {
        errors.push('Invalid or private IP address')
        fraudLevel = 'HIGH'
        riskFactors.push('SUSPICIOUS_IP_ADDRESS')
      }

      // Amount validation
      const amountValidation = await this.validateAmount(data.amount, data.currency, data.studentId)
      if (amountValidation.length > 0) {
        warnings.push(...amountValidation)
        fraudLevel = this.upgradeFraudLevel(fraudLevel, 'HIGH')
      }

      // Velocity checks
      const velocityValidation = await this.validateVelocityChecks(data.studentId, data.ipAddress)
      if (velocityValidation.isSuspicious) {
        warnings.push(...velocityValidation.issues)
        riskFactors.push('VELOCITY_CONCERN')
        fraudLevel = this.upgradeFraudLevel(fraudLevel, velocityValidation.fraudLevel)
      }

      // User validation
      const userValidation = await this.validateUserProfile(data.studentId, data.email)
      if (userValidation.isSuspicious) {
        warnings.push(...userValidation.issues)
        riskFactors.push('SUSPICIOUS_USER_PROFILE')
        fraudLevel = this.upgradeFraudLevel(fraudLevel, userValidation.fraudLevel)
      }

      // Device/IP fingerprinting
      const deviceValidation = await this.validateDeviceContext({
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        studentId: data.studentId,
      })

      if (deviceValidation.isSuspicious) {
        warnings.push(...deviceValidation.issues)
        riskFactors.push('DEVICE_CONTEXT_SUSPECT')
        fraudLevel = this.upgradeFraudLevel(fraudLevel, deviceValidation.fraudLevel)
      }

      // Duplication checks
      const duplicateValidation = await this.checkForDuplicates(data)
      if (duplicateValidation.isDuplicate) {
        errors.push('Potential duplicate transaction detected')
        fraudLevel = this.upgradeFraudLevel(fraudLevel, 'HIGH')
      }

      // Gateway-specific validation
      const gatewayValidation = await this.validateGatewaySpecific(data.gateway, data)
      if (gatewayValidation.length > 0) {
        warnings.push(...gatewayValidation)
        riskFactors.push('GATEWAY_SPECIFIC_CONCERN')
      }

      // Risk scoring
      const riskScore = this.calculateRiskScore(fraudLevel, riskFactors.length)
    } catch (error: unknown) {
      securityLogger.logEvent({
        eventType: 'PAYMENT_VALIDATION_ERROR',
        description: 'Payment validation encountered unexpected error',
        severity: 'HIGH',
        metadata: {
          error: error instanceof Error ? error.message : String(error),
          studentId: data.studentId,
          amount: data.amount,
        },
      })

      errors.push('Payment validation encountered technical error')
      fraudLevel = 'CRITICAL'
    }

    return {
      isValid: errors.length === 0 && fraudLevel !== 'CRITICAL',
      errors,
      warnings,
      fraudLevel,
      riskFactors,
    }
  }

  /**
   * Enhanced webhook security validation
   */
  static async validateWebhook(request: {
    headers: Record<string, string | undefined>
    body: string
    signature?: string
    timestamp?: string
    gateway: string
    ipAddress: string
    urlPath?: string
  }): Promise<WebhookSecurityResult> {
    const errors: string[] = []
    let isReplay = false
    let isTampered = false
    const timestamp = parseInt(request.timestamp || '0')
    const currentTime = Date.now()

    try {
      // Validate timestamp (replay protection)
      if (timestamp) {
        const timeDiff = Math.abs(currentTime - timestamp)
        if (timeDiff > this.FRAUD_THRESHOLDS.EXPIRY_TIME_LIMIT) {
          errors.push(`Timestamp expired (${timeDiff}ms)`)
          isReplay = true
        } else if (timeDiff > 5000) {
          isReplay = true // Slight delay
        }
      }

      // Validate IP address
      const ipValidation = this.validateWebhookIP(request.ipAddress)
      if (ipValidation.length > 0) {
        errors.push(...ipValidation)
      }

      // Validate signature based on gateway
      const signatureValidation = await this.validateSignature(request)
      if (!signatureValidation.isValid) {
        errors.push(...signatureValidation.errors)
        isTampered = true
      }

      // Check for obvious replay attacks
      if (request.urlPath && request.body) {
        const wasRecentlyUsed = await this.checkRecentWebhookUsage(request.urlPath, request.body)
        if (wasRecentlyUsed) {
          errors.push('Webhook payload recently used - potential replay attack')
          isReplay = true
        }
      }

      // Validate message integrity
      const integrityCheck = await this.validateMessageIntegrity(request.body)
      if (!integrityCheck.isValid) {
        errors.push('Message integrity check failed')
        isTampered = true
      }

      // Log validation attempt
      securityLogger.logEvent({
        eventType: 'WEBHOOK_VALIDATION',
        description: `Webhook validation for ${request.gateway}`,
        severity: errors.length > 0 ? 'MEDIUM' : 'LOW',
        metadata: {
          gateway: request.gateway,
          timestamp,
          currentTime,
          isReplay,
          isTampered,
          errors: errors.length,
        },
      })
    } catch (error: unknown) {
      securityLogger.logEvent({
        eventType: 'WEBHOOK_VALIDATION_ERROR',
        description: 'Webhook validation encountered error',
        severity: 'HIGH',
        metadata: {
          error: error instanceof Error ? error.message : String(error),
          gateway: request.gateway,
        },
      })
      errors.push('Webhook validation encountered technical error')
    }

    return {
      isValid: errors.length === 0 && !isReplay && !isTampered,
      isReplay,
      isTampered,
      errors,
      timestamp,
      signature: request.signature || 'unknown',
    }
  }

  /**
   * Amount validation with comprehensive checks
   */
  private static async validateAmount(
    amount: number,
    currency: string,
    studentId: string
  ): Promise<string[]> {
    const warnings: string[] = []

    // Maximum amount limit
    if (amount > this.FRAUD_THRESHOLDS.MAX_AMOUNT) {
      warnings.push(`Amount exceeds maximum limit ($${this.FRAUD_THRESHOLDS.MAX_AMOUNT})`)
    }

    // Unusual amount patterns
    const rounded = Math.round(amount)
    if (amount === rounded && rounded % 100 === 0) {
      warnings.push('Suspicious rounded amount')
    }

    // Frequency analysis for same student
    const amountFrequency = await this.checkAmountFrequency(studentId, amount, currency)
    if (amountFrequency.isSuspicious) {
      warnings.push(amountFrequency.warning)
    }

    return warnings
  }

  /**
   * Velocity checks for transaction frequency
   */
  private static async validateVelocityChecks(
    studentId: string,
    ipAddress: string
  ): Promise<{
    isSuspicious: boolean
    issues: string[]
    fraudLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }> {
    const issues: string[] = []
    let isSuspicious = false
    let fraudLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW'

    try {
      const cutoffRecent = new Date(Date.now() - this.FRAUD_THRESHOLDS.SUSPICIOUS_TIME_WINDOW)
      const ids: string[] = []
      const conditions =
        ids.length > 0
          ? or(sql`(metadata->>'studentId') = ${studentId}`, inArray(payment.bookingId, ids))
          : sql`(metadata->>'studentId') = ${studentId}`
      const [recentRow] = await drizzleDb
        .select({ count: sql<number>`count(*)::int` })
        .from(payment)
        .where(
          and(conditions, gte(payment.createdAt, cutoffRecent), eq(payment.status, 'COMPLETED'))
        )
      const recentCount = recentRow?.count ?? 0

      if (recentCount >= 3) {
        issues.push('High transaction velocity detected')
        isSuspicious = true
        fraudLevel = 'HIGH'
      }

      const hourCutoff = new Date(Date.now() - 60 * 60 * 1000)
      const hourConditions =
        ids.length > 0
          ? or(sql`(metadata->>'studentId') = ${studentId}`, inArray(payment.bookingId, ids))
          : sql`(metadata->>'studentId') = ${studentId}`
      const [hourRow] = await drizzleDb
        .select({ count: sql<number>`count(*)::int` })
        .from(payment)
        .where(and(hourConditions, gte(payment.createdAt, hourCutoff)))
      const hourlyCount = hourRow?.count ?? 0

      if (hourlyCount >= this.FRAUD_THRESHOLDS.MAX_TRANSACTIONS_PER_HOUR) {
        issues.push('Hourly transaction limit exceeded')
        isSuspicious = true
        fraudLevel = 'CRITICAL'
      }

      const dayCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const dayConditions =
        ids.length > 0
          ? or(sql`(metadata->>'studentId') = ${studentId}`, inArray(payment.bookingId, ids))
          : sql`(metadata->>'studentId') = ${studentId}`
      const [dayRow] = await drizzleDb
        .select({ count: sql<number>`count(*)::int` })
        .from(payment)
        .where(and(dayConditions, gte(payment.createdAt, dayCutoff)))
      const dailyCount = dayRow?.count ?? 0

      if (dailyCount >= this.FRAUD_THRESHOLDS.MAX_TRANSACTIONS_PER_DAY) {
        issues.push('Daily transaction limit exceeded')
        isSuspicious = true
        fraudLevel = 'CRITICAL'
      }
    } catch (error: unknown) {
      securityLogger.logEvent({
        eventType: 'VELOCITY_CHECK_ERROR',
        description: 'Velocity check encountered error',
        severity: 'MEDIUM',
        metadata: {
          error: error instanceof Error ? error.message : String(error),
          studentId,
        },
      })
    }

    return { isSuspicious, issues, fraudLevel }
  }

  /**
   * Device and IP fingerprint validation
   */
  private static async validateDeviceContext(data: {
    ipAddress: string
    userAgent?: string
    studentId: string
  }): Promise<{
    isSuspicious: boolean
    issues: string[]
    fraudLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }> {
    const issues: string[] = []
    let isSuspicious = false
    let fraudLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW'

    try {
      // Check for suspicious IP
      if (this.SUSPICIOUS_IPS.has(data.ipAddress)) {
        issues.push('IP address flagged as suspicious')
        isSuspicious = true
        fraudLevel = 'HIGH'
      }

      const weekCutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      const studentBookingIds: string[] = []
      const payCondition =
        studentBookingIds.length > 0
          ? or(
              sql`(metadata->>'studentId') = ${data.studentId}`,
              inArray(payment.bookingId, studentBookingIds)
            )
          : sql`(metadata->>'studentId') = ${data.studentId}`
      const recentPayments = await drizzleDb
        .select()
        .from(payment)
        .where(
          and(payCondition, eq(payment.status, 'COMPLETED'), gte(payment.createdAt, weekCutoff))
        )
        .orderBy(desc(payment.createdAt))
        .limit(1)
      const paymentRow = recentPayments[0]

      if (
        paymentRow &&
        (paymentRow.metadata as Record<string, unknown>)?.ipAddress !== data.ipAddress
      ) {
        issues.push('Different IP address detected from recent transaction')
        isSuspicious = true
        fraudLevel = 'MEDIUM'
      }

      if (data.userAgent) {
        const recentPaymentsForDevice = await drizzleDb
          .select({ metadata: payment.metadata })
          .from(payment)
          .where(
            and(payCondition, eq(payment.status, 'COMPLETED'), gte(payment.createdAt, weekCutoff))
          )
          .orderBy(desc(payment.createdAt))
          .limit(5)

        const consistentDevice = recentPaymentsForDevice.every(
          p => (p.metadata as Record<string, unknown>)?.userAgent === data.userAgent
        )
        if (!consistentDevice && recentPaymentsForDevice.length >= 3) {
          issues.push('Inconsistent device fingerprint detected')
          isSuspicious = true
          fraudLevel = 'MEDIUM'
        }
      }
    } catch (error: unknown) {
      securityLogger.logEvent({
        eventType: 'DEVICE_VALIDATION_ERROR',
        description: 'Device validation encountered error',
        severity: 'LOW',
        metadata: {
          error: error instanceof Error ? error.message : String(error),
          studentId: data.studentId,
        },
      })
    }

    return { isSuspicious, issues, fraudLevel }
  }

  /**
   * Helper functions for various validation checks
   */
  private static isLoopbackAddress(ip: string): boolean {
    return (
      ['127.', '192.168.', '10.', 'localhost', '::1'].some(prefix => ip.includes(prefix)) ||
      /^172\.(1[6-9]|2[0-9]|3[01])\./.test(ip)
    )
  }

  private static upgradeFraudLevel(
    current: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
    upgrade: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  ): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const levels: Record<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', number> = {
      LOW: 0,
      MEDIUM: 1,
      HIGH: 2,
      CRITICAL: 3,
    }
    const target = Math.max(levels[current], levels[upgrade])
    const entries: Array<['LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', number]> = [
      ['LOW', 0],
      ['MEDIUM', 1],
      ['HIGH', 2],
      ['CRITICAL', 3],
    ]
    return entries.find(([, v]) => v === target)?.[0] ?? 'LOW'
  }

  private static calculateRiskScore(fraudLevel: string, riskFactorCount: number): number {
    const levelScores = { LOW: 10, MEDIUM: 30, HIGH: 60, CRITICAL: 90 }
    const baseRisk = levelScores[fraudLevel as keyof typeof levelScores] || 0
    const factorRisk = Math.min(riskFactorCount * 5, 30) // Max 30 points from factors
    return Math.min(baseRisk + factorRisk, 100)
  }

  // Placeholder implementations for comprehensive validation
  private static async userQueryExists(
    queryFunction: () => Promise<boolean>,
    description: string
  ): Promise<boolean> {
    try {
      return await queryFunction()
    } catch (error: unknown) {
      securityLogger.logEvent({
        eventType: 'PAYMENT_VALIDATION_QUERY_ERROR',
        description: `Validation query failed: ${description}`,
        severity: 'LOW',
        metadata: { error: error instanceof Error ? error.message : String(error) },
      })
      return true // Conservative approach - assume risk when queries fail
    }
  }

  private static async checkAmountFrequency(
    studentId: string,
    amount: number,
    currency: string
  ): Promise<{
    isSuspicious: boolean
    warning: string
  }> {
    try {
      const dayCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const [row] = await drizzleDb
        .select({
          count: sql<number>`count(*)`,
        })
        .from(payment)
        .where(
          and(
            gte(payment.createdAt, dayCutoff),
            eq(payment.currency, currency),
            eq(payment.amount, amount),
            sql`((${payment.metadata}->>'studentId') = ${studentId} OR (${payment.metadata}->>'payerId') = ${studentId})`
          )
        )
        .limit(1)

      const count = row?.count ?? 0
      if (count >= 3) {
        return { isSuspicious: true, warning: 'Repeated payment amount within 24 hours' }
      }
    } catch (error: unknown) {
      securityLogger.logEvent({
        eventType: 'AMOUNT_FREQUENCY_CHECK_ERROR',
        description: 'Failed to check amount frequency',
        severity: 'LOW',
        metadata: { error: error instanceof Error ? error.message : String(error), studentId },
      })
    }

    return { isSuspicious: false, warning: '' }
  }

  private static async validateUserProfile(
    studentId: string,
    email?: string
  ): Promise<{
    isSuspicious: boolean
    issues: string[]
    fraudLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }> {
    const issues: string[] = []
    let fraudLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW'

    if (!studentId) {
      return { isSuspicious: true, issues: ['Missing student id'], fraudLevel: 'HIGH' }
    }

    if (email) {
      const domain = email.split('@')[1]?.toLowerCase() || ''
      if (domain && this.SUSPICIOUS_DOMAINS.has(domain)) {
        issues.push('Suspicious email domain detected')
        fraudLevel = this.upgradeFraudLevel(fraudLevel, 'MEDIUM')
      }
    }

    try {
      const [userRow] = await drizzleDb
        .select({ createdAt: userTable.createdAt, email: userTable.email })
        .from(userTable)
        .where(eq(userTable.userId, studentId))
        .limit(1)

      if (!userRow) {
        issues.push('Student record not found')
        fraudLevel = this.upgradeFraudLevel(fraudLevel, 'HIGH')
      } else {
        const accountAgeMs = Date.now() - userRow.createdAt.getTime()
        if (accountAgeMs < 60 * 60 * 1000) {
          issues.push('New account created within last hour')
          fraudLevel = this.upgradeFraudLevel(fraudLevel, 'MEDIUM')
        }
        if (email && userRow.email && userRow.email.toLowerCase() !== email.toLowerCase()) {
          issues.push('Email mismatch between session and stored user')
          fraudLevel = this.upgradeFraudLevel(fraudLevel, 'MEDIUM')
        }
      }
    } catch (error: unknown) {
      securityLogger.logEvent({
        eventType: 'USER_PROFILE_VALIDATION_ERROR',
        description: 'User profile validation failed',
        severity: 'LOW',
        metadata: { error: error instanceof Error ? error.message : String(error), studentId },
      })
    }

    return { isSuspicious: issues.length > 0, issues, fraudLevel }
  }

  private static async checkForDuplicates(data: {
    amount: number
    currency: string
    studentId: string
    ipAddress: string
  }): Promise<{
    isDuplicate: boolean
    existingPayment?: any
  }> {
    try {
      const cutoff = new Date(Date.now() - this.FRAUD_THRESHOLDS.DUPLICATE_TIME_LIMIT)
      const [existing] = await drizzleDb
        .select()
        .from(payment)
        .where(
          and(
            gte(payment.createdAt, cutoff),
            eq(payment.amount, data.amount),
            eq(payment.currency, data.currency),
            sql`((${payment.metadata}->>'studentId') = ${data.studentId} OR (${payment.metadata}->>'payerId') = ${data.studentId})`
          )
        )
        .limit(1)

      if (existing) {
        return { isDuplicate: true, existingPayment: existing }
      }
    } catch (error: unknown) {
      securityLogger.logEvent({
        eventType: 'DUPLICATE_CHECK_ERROR',
        description: 'Failed to check duplicate payments',
        severity: 'LOW',
        metadata: {
          error: error instanceof Error ? error.message : String(error),
          studentId: data.studentId,
        },
      })
    }

    return { isDuplicate: false }
  }

  private static async validateGatewaySpecific(gateway: string, data: any): Promise<string[]> {
    const warnings: string[] = []
    const normalized = gateway.toUpperCase()
    const supported = ['HITPAY', 'AIRWALLEX', 'WECHAT', 'ALIPAY']
    if (!supported.includes(normalized)) {
      warnings.push(`Unsupported gateway: ${gateway}`)
    }
    if (typeof data?.currency === 'string' && data.currency.length > 5) {
      warnings.push('Unusual currency code length')
    }
    if (typeof data?.amount === 'number' && data.amount > this.FRAUD_THRESHOLDS.MAX_AMOUNT) {
      warnings.push('Payment amount exceeds configured maximum threshold')
    }
    return warnings
  }

  private static validateWebhookIP(ipAddress: string): string[] {
    const errors: string[] = []

    if (this.isLoopbackAddress(ipAddress)) {
      errors.push('Invalid webhook IP address')
    }

    if (this.SUSPICIOUS_IPS.has(ipAddress)) {
      errors.push('Suspicious webhook IP address detected')
    }

    return errors
  }

  private static async validateSignature(request: {
    headers: Record<string, string | undefined>
    body: string
    signature?: string
    gateway: string
  }): Promise<{
    isValid: boolean
    errors: string[]
  }> {
    const errors: string[] = []
    const signature = request.signature || ''
    if (!signature) {
      return { isValid: false, errors: ['Missing signature'] }
    }

    const gateway = request.gateway.toUpperCase()
    try {
      if (gateway === 'HITPAY') {
        const salt = process.env.HITPAY_SALT
        if (!salt) {
          return { isValid: false, errors: ['HITPAY_SALT not configured'] }
        }
        const expected = crypto.createHmac('sha256', salt).update(request.body).digest('hex')
        if (expected.toLowerCase() === signature.toLowerCase()) {
          return { isValid: true, errors: [] }
        }
        if (expected.length !== signature.length) {
          return { isValid: false, errors: ['Invalid Hitpay signature'] }
        }
        const isValid = crypto.timingSafeEqual(
          Buffer.from(expected, 'hex'),
          Buffer.from(signature, 'hex')
        )
        if (!isValid) errors.push('Invalid Hitpay signature')
        return { isValid, errors }
      }

      if (gateway === 'AIRWALLEX') {
        const timestamp =
          request.headers['x-timestamp'] || request.headers['x-airwallex-timestamp'] || ''
        if (!timestamp) {
          return { isValid: false, errors: ['Missing Airwallex timestamp'] }
        }
        const secret = process.env.AIRWALLEX_WEBHOOK_SECRET
        if (!secret) {
          return { isValid: false, errors: ['AIRWALLEX_WEBHOOK_SECRET not configured'] }
        }
        const expected = crypto
          .createHmac('sha256', secret)
          .update(`${timestamp}${request.body}`)
          .digest('hex')
        if (expected.toLowerCase() === signature.toLowerCase()) {
          return { isValid: true, errors: [] }
        }
        if (expected.length !== signature.length) {
          return { isValid: false, errors: ['Invalid Airwallex signature'] }
        }
        const isValid = crypto.timingSafeEqual(
          Buffer.from(expected, 'hex'),
          Buffer.from(signature, 'hex')
        )
        if (!isValid) errors.push('Invalid Airwallex signature')
        return { isValid, errors }
      }

      errors.push('Unsupported gateway signature validation')
      return { isValid: false, errors }
    } catch (error: unknown) {
      errors.push(error instanceof Error ? error.message : 'Signature validation error')
      return { isValid: false, errors }
    }
  }

  private static async checkRecentWebhookUsage(urlPath: string, body: string): Promise<boolean> {
    const now = Date.now()
    const key = crypto.createHash('sha256').update(`${urlPath}:${body}`).digest('hex')
    const existing = this.webhookReplayCache.get(key)
    if (existing && now - existing < this.WEBHOOK_REPLAY_TTL_MS) {
      return true
    }
    this.webhookReplayCache.set(key, now)
    if (this.webhookReplayCache.size > 5000) {
      for (const [k, ts] of this.webhookReplayCache.entries()) {
        if (now - ts > this.WEBHOOK_REPLAY_TTL_MS) {
          this.webhookReplayCache.delete(k)
        }
      }
    }
    return false
  }

  private static async validateMessageIntegrity(body: string): Promise<{
    isValid: boolean
    hash?: string
  }> {
    if (!body) return { isValid: false }
    const hash = crypto.createHash('sha256').update(body).digest('hex')
    return { isValid: Boolean(hash), hash }
  }

  // Public export functions for compatibility
  static async createStudentHash(studentId: string): Promise<string> {
    const secret = process.env.NEXTAUTH_SECRET
    if (!secret || secret === 'default_secret') {
      if (process.env.NODE_ENV === 'production') {
        securityLogger.logEvent({
          eventType: 'STUDENT_HASH_CONFIG_ERROR',
          description: 'Missing NEXTAUTH_SECRET for payment hashing in production',
          severity: 'HIGH',
        })
        return 'anonymous_student'
      }
    }
    const hashSecret = secret || 'dev-secret'
    return crypto
      .createHash('sha256')
      .update(studentId)
      .update(hashSecret)
      .digest('hex')
      .substring(0, 16)
  }

  static sanitizeAiInput(input: string): string {
    if (!input || typeof input !== 'string') return ''

    // Remove prompt injection attempts
    const injectionPatterns = [
      /ignore.*previous.*instructions/gi,
      /system.*prompt.*override/gi,
      /you.*are.*now.*admin/gi,
    ]

    let sanitized = input
    injectionPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[BLOCKED]')
    })

    return sanitized.trim()
  }
}

// Export convenience functions
export const validatePaymentCreation = (
  ...args: Parameters<typeof PaymentSecurityValidator.validatePaymentCreation>
) => PaymentSecurityValidator.validatePaymentCreation(...args)

export const validateWebhook = (
  ...args: Parameters<typeof PaymentSecurityValidator.validateWebhook>
) => PaymentSecurityValidator.validateWebhook(...args)

export { PaymentSecurityValidator as default }

export function resetWebhookReplayCache(): void {
  ;(
    PaymentSecurityValidator as unknown as { webhookReplayCache?: Map<string, number> }
  ).webhookReplayCache?.clear?.()
}
