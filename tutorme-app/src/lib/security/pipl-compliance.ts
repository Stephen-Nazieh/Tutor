/**
 * PIPL (Personal Information Protection Law) Compliance System
 * 个人信息保护法合规系统 - Chinese Market
 *
 * Implements key PIPL articles for data protection compliance:
 * - Article 6: Explicit Consent
 * - Article 15: Right to Access (Data Subject Report)
 * - Article 16: Right to Rectification
 * - Article 29: Cross-border Data Transfer
 * - Article 41: Right to Explanation (Algorithm Transparency)
 *
 * Performance targets:
 * - Consent creation: <100ms
 * - Data subject report: <5 seconds
 * - PII classification: <50ms per record
 * - Cross-border documentation: <200ms
 */

import { db } from '@/lib/db'
import { generateWithFallback } from '@/lib/ai/orchestrator'

// =============================================================================
// CONSTANTS & TYPES
// =============================================================================

const PIPL_ACTIONS = {
  CONSENT_CREATED: 'pipl_consent_created',
  ACCESS_REQUEST: 'pipl_access_request',
  RECTIFICATION: 'pipl_rectification',
  CROSS_BORDER: 'pipl_cross_border',
  AI_EXPLANATION: 'pipl_ai_explanation',
  PRIVACY_POLICY_CHANGE: 'pipl_privacy_policy_change'
} as const

/** PII sensitivity levels per PIPL */
export type PIILevel = 'general' | 'sensitive' | 'critical'

/** Known PII field patterns for automatic classification */
const PII_PATTERNS: Record<string, { level: PIILevel; labelZh: string }> = {
  email: { level: 'general', labelZh: '电子邮箱' },
  name: { level: 'general', labelZh: '姓名' },
  phone: { level: 'sensitive', labelZh: '电话号码' },
  idCard: { level: 'critical', labelZh: '身份证号' },
  dateOfBirth: { level: 'sensitive', labelZh: '出生日期' },
  address: { level: 'sensitive', labelZh: '地址' },
  avatarUrl: { level: 'general', labelZh: '头像' },
  bio: { level: 'general', labelZh: '个人简介' },
  password: { level: 'critical', labelZh: '密码' },
  wechatId: { level: 'sensitive', labelZh: '微信ID' },
  bankAccount: { level: 'critical', labelZh: '银行账户' }
}

/** Regions that require cross-border transfer documentation when data leaves China */
const CROSS_BORDER_DESTINATIONS = new Set([
  'US', 'EU', 'SG', 'HK', 'JP', 'KR', 'TW', 'AU', 'UK', 'CA'
])

// =============================================================================
// ARTICLE 6 – Explicit Consent (明确同意)
// =============================================================================

export interface ConsentInput {
  userId: string
  dataTypes: string[]
  purpose: string
  legalBasis?: string
  expiresAt?: Date
}

export interface ConsentRecord {
  id: string
  userId: string
  dataTypes: string[]
  purpose: string
  legalBasis: string
  createdAt: Date
  expiresAt?: Date
}

export const PIPL_ARTICLE_6 = {
  /**
   * Create explicit consent record with detailed documentation.
   * Performance target: <100ms
   */
  async createConsentRecord(
    userId: string,
    dataTypes: string[],
    purpose: string,
    options?: { legalBasis?: string; expiresAt?: Date }
  ): Promise<ConsentRecord> {
    const start = performance.now()
    const record: ConsentRecord = {
      id: `consent_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      userId,
      dataTypes,
      purpose,
      legalBasis: options?.legalBasis ?? 'explicit_consent',
      createdAt: new Date(),
      expiresAt: options?.expiresAt
    }

    await db.userActivityLog.create({
      data: {
        userId,
        action: PIPL_ACTIONS.CONSENT_CREATED,
        metadata: {
          consentId: record.id,
          dataTypes,
          purpose,
          legalBasis: record.legalBasis,
          expiresAt: record.expiresAt?.toISOString()
        } as object
      }
    })

    const elapsed = performance.now() - start
    if (elapsed > 100) {
      console.warn(`[PIPL] Consent creation took ${elapsed.toFixed(0)}ms (target <100ms)`)
    }
    return record
  }
}

// =============================================================================
// ARTICLE 15 – Right to Access (知情权、决定权)
// =============================================================================

export interface DataSubjectReport {
  exportedAt: string
  userId: string
  user: object
  profile: object | null
  accounts: object[]
  enrollments: object[]
  bookings: object[]
  payments: object[]
  messages: object[]
  activitySummary: object
  piiClassification: PIIClassificationResult[]
}

export interface AccessRightsRecord {
  requestId: string
  userId: string
  requestedData: string[]
  fulfilledAt: Date
}

export const PIPL_ARTICLE_15 = {
  /**
   * Generate comprehensive data subject report (download all personal data).
   * PIPL requires response within 15 days; this provides immediate export.
   * Performance target: <5 seconds
   */
  async generateDataSubjectReport(userId: string): Promise<DataSubjectReport> {
    const start = performance.now()

    const [
      user,
      profile,
      accounts,
      clinicBookings,
      curriculumEnrollments,
      messages,
      aiEnrollments,
      quizAttempts,
      activityLogs
    ] = await Promise.all([
      db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
          emailVerified: true,
          image: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      db.profile.findUnique({ where: { userId } }),
      db.account.findMany({
        where: { userId },
        select: { provider: true, type: true }
      }),
      db.clinicBooking.findMany({
        where: { studentId: userId },
        include: { clinic: { select: { title: true, startTime: true } } }
      }),
      db.curriculumEnrollment.findMany({
        where: { userId },
        include: { curriculum: { select: { name: true, subject: true } } }
      }),
      db.message.findMany({
        where: { userId },
        take: 500,
        select: { id: true, content: true, source: true, createdAt: true }
      }),
      db.aITutorEnrollment.findMany({
        where: { userId },
        select: { subjectCode: true, tier: true, enrolledAt: true }
      }),
      db.quizAttempt.findMany({
        where: { userId },
        take: 200,
        select: { id: true, score: true, submittedAt: true }
      }),
      db.userActivityLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 100,
        select: { action: true, createdAt: true }
      })
    ])

    const bookingIds = clinicBookings.map((b) => b.id)
    const payments =
      bookingIds.length > 0
        ? await db.payment.findMany({
            where: { bookingId: { in: bookingIds } },
            select: { id: true, amount: true, status: true, createdAt: true }
          })
        : []

    const userData = user ?? { id: userId }
    const profileData = profile ?? {}
    const piiClassification = classifyPII({ user: userData, profile: profileData })

    const report: DataSubjectReport = {
      exportedAt: new Date().toISOString(),
      userId,
      user: userData,
      profile: profileData,
      accounts: accounts ?? [],
      enrollments: [
        ...(curriculumEnrollments ?? []),
        ...(aiEnrollments ?? []).map((e) => ({ type: 'ai_tutor', ...e }))
      ],
      bookings: clinicBookings ?? [],
      payments,
      messages: messages ?? [],
      activitySummary: {
        totalActivityLogs: activityLogs?.length ?? 0,
        recentActions: activityLogs?.slice(0, 20) ?? [],
        quizAttempts: quizAttempts?.length ?? 0
      },
      piiClassification
    }

    await db.userActivityLog.create({
      data: {
        userId,
        action: PIPL_ACTIONS.ACCESS_REQUEST,
        metadata: {
          requestType: 'data_subject_report',
          fulfilledAt: new Date().toISOString()
        } as object
      }
    })

    const elapsed = performance.now() - start
    if (elapsed > 5000) {
      console.warn(`[PIPL] Data subject report took ${(elapsed / 1000).toFixed(1)}s (target <5s)`)
    }
    return report
  },

  /**
   * Track data access requests for compliance audit.
   */
  async createAccessRightsRecord(
    userId: string,
    requestId: string,
    requestedData: string[]
  ): Promise<AccessRightsRecord> {
    const record: AccessRightsRecord = {
      requestId,
      userId,
      requestedData,
      fulfilledAt: new Date()
    }

    await db.userActivityLog.create({
      data: {
        userId,
        action: PIPL_ACTIONS.ACCESS_REQUEST,
        metadata: {
          requestId,
          requestedData,
          fulfilledAt: record.fulfilledAt.toISOString()
        } as object
      }
    })
    return record
  }
}

// =============================================================================
// ARTICLE 16 – Right to Rectification (更正权)
// =============================================================================

export interface RectificationRecord {
  id: string
  userId: string
  field: string
  oldValue: string
  newValue: string
  timestamp: Date
}

export const PIPL_ARTICLE_16 = {
  /**
   * Track all data changes with full audit trail.
   */
  async createRectificationRecord(
    userId: string,
    field: string,
    oldValue: string,
    newValue: string
  ): Promise<RectificationRecord> {
    const record: RectificationRecord = {
      id: `rect_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      userId,
      field,
      oldValue: String(oldValue),
      newValue: String(newValue),
      timestamp: new Date()
    }

    await db.userActivityLog.create({
      data: {
        userId,
        action: PIPL_ACTIONS.RECTIFICATION,
        metadata: {
          rectificationId: record.id,
          field,
          oldValue: record.oldValue,
          newValue: record.newValue
        } as object
      }
    })
    return record
  }
}

// =============================================================================
// ARTICLE 29 – Cross-border Transfer (跨境传输)
// =============================================================================

export type CrossBorderTransferType = 'api_call' | 'storage' | 'analytics' | 'support'

export interface CrossBorderRecord {
  id: string
  userId: string
  region: string
  transferType: CrossBorderTransferType
  dataCategories: string[]
  legalBasis: string
  timestamp: Date
}

export const PIPL_ARTICLE_29 = {
  /**
   * Document data leaving China for compliance.
   * Performance target: <200ms
   */
  async createCrossBorderRecord(
    userId: string,
    region: string,
    transferType: CrossBorderTransferType,
    options?: { dataCategories?: string[]; legalBasis?: string }
  ): Promise<CrossBorderRecord> {
    const start = performance.now()
    const record: CrossBorderRecord = {
      id: `cb_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      userId,
      region,
      transferType,
      dataCategories: options?.dataCategories ?? ['profile', 'usage'],
      legalBasis: options?.legalBasis ?? 'user_consent',
      timestamp: new Date()
    }

    await db.userActivityLog.create({
      data: {
        userId,
        action: PIPL_ACTIONS.CROSS_BORDER,
        metadata: {
          crossBorderId: record.id,
          region,
          transferType,
          dataCategories: record.dataCategories,
          legalBasis: record.legalBasis
        } as object
      }
    })

    const elapsed = performance.now() - start
    if (elapsed > 200) {
      console.warn(`[PIPL] Cross-border record took ${elapsed.toFixed(0)}ms (target <200ms)`)
    }
    return record
  },

  /**
   * Determine if cross-border transfer documentation is required.
   */
  isCrossBorderTransferRequired(data: { destination?: string; region?: string }): boolean {
    const region = (data.destination ?? data.region ?? '').toUpperCase()
    if (!region) return false
    // Documentation required when data leaves China for these destinations
    return CROSS_BORDER_DESTINATIONS.has(region)
  }
}

// =============================================================================
// ARTICLE 41 – Right to Explanation (算法解释权)
// =============================================================================

export interface AIExplanationRecord {
  userId: string
  algorithmDecision: string
  explanation: string
  timestamp: Date
}

export const PIPL_ARTICLE_41 = {
  /**
   * Record AI/algorithm decision with explanation for transparency.
   */
  async createAccessRightsRecord(
    userId: string,
    algorithmDecision: string,
    explanation: string
  ): Promise<AIExplanationRecord> {
    const record: AIExplanationRecord = {
      userId,
      algorithmDecision,
      explanation,
      timestamp: new Date()
    }

    await db.userActivityLog.create({
      data: {
        userId,
        action: PIPL_ACTIONS.AI_EXPLANATION,
        metadata: {
          algorithmDecision,
          explanation
        } as object
      }
    })
    return record
  },

  /**
   * Generate plain-language AI decision explanation (Article 41).
   * Uses LLM to produce human-readable explanation in Chinese.
   */
  async generateAIExplanation(
    userId: string,
    decision: {
      type: string
      outcome: string
      factors?: string[]
      context?: string
    }
  ): Promise<string> {
    const prompt = `你是一个合规助手。根据以下算法/AI决策，用简洁的中文（100字以内）向用户解释这个决定的原因和依据。要求：通俗易懂，不涉及技术术语。

决策类型：${decision.type}
结果：${decision.outcome}
${decision.factors?.length ? `考虑因素：${decision.factors.join('、')}` : ''}
${decision.context ? `背景：${decision.context}` : ''}

请直接输出解释文字，不要加引号或前缀。`

    try {
      const result = await generateWithFallback(prompt, {
        temperature: 0.3,
        maxTokens: 200,
        timeoutMs: 5000
      })
      const explanation = result.content.trim()

      await this.createAccessRightsRecord(userId, decision.type, explanation)
      return explanation
    } catch (error) {
      const fallback =
        `根据${decision.type}，系统得出结果：${decision.outcome}。` +
        (decision.factors?.length ? `主要考虑因素包括：${decision.factors.join('、')}。` : '')
      await this.createAccessRightsRecord(userId, decision.type, fallback)
      return fallback
    }
  }
}

// =============================================================================
// DATA CLASSIFICATION & PII DETECTION
// =============================================================================

export interface PIIClassificationResult {
  field: string
  level: PIILevel
  labelZh: string
  hasValue: boolean
}

/**
 * Automatic PII detection and classification.
 * Performance target: <50ms per record
 */
export function classifyPII(record: Record<string, unknown>): PIIClassificationResult[] {
  const start = performance.now()
  const results: PIIClassificationResult[] = []

  const flatten = (obj: Record<string, unknown>, prefix = ''): void => {
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) continue
      const fullKey = prefix ? `${prefix}.${key}` : key
      const keyLower = key.toLowerCase()

      if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        flatten(value as Record<string, unknown>, fullKey)
        continue
      }

      let match = PII_PATTERNS[keyLower]
      if (!match) {
        for (const [pattern, config] of Object.entries(PII_PATTERNS)) {
          if (keyLower.includes(pattern)) {
            match = config
            break
          }
        }
      }
      if (match) {
        results.push({
          field: fullKey,
          level: match.level,
          labelZh: match.labelZh,
          hasValue: value !== '' && value != null
        })
      }
    }
  }

  flatten(record)
  const elapsed = performance.now() - start
  if (elapsed > 50) {
    console.warn(`[PIPL] PII classification took ${elapsed.toFixed(0)}ms (target <50ms)`)
  }
  return results
}

/**
 * Classify a single field value.
 */
export function classifyField(fieldName: string, _value: unknown): PIIClassificationResult | null {
  const keyLower = fieldName.toLowerCase()
  for (const [pattern, config] of Object.entries(PII_PATTERNS)) {
    if (keyLower.includes(pattern)) {
      return {
        field: fieldName,
        level: config.level,
        labelZh: config.labelZh,
        hasValue: true
      }
    }
  }
  return null
}

// =============================================================================
// CHINESE LANGUAGE NOTIFICATIONS (隐私政策变更通知)
// =============================================================================

export const PIPL_NOTIFICATIONS = {
  /** Privacy policy change notification - Chinese */
  PRIVACY_POLICY_CHANGE: {
    zh: {
      title: '隐私政策更新通知',
      body: '我们已更新《隐私政策》。请查阅最新版本以了解我们如何收集、使用和保护您的个人信息。如有疑问，请联系我们。',
      action: '查看隐私政策'
    }
  },

  /** Consent request - Chinese */
  CONSENT_REQUIRED: {
    zh: {
      title: '需要您的同意',
      body: '为继续使用此功能，我们需要您明确同意我们处理以下类型的个人数据：{dataTypes}。处理目的：{purpose}。',
      action: '同意'
    }
  },

  /** Data export ready - Chinese */
  DATA_EXPORT_READY: {
    zh: {
      title: '个人数据导出已就绪',
      body: '您请求的个人数据副本已准备完毕，可在15天内下载。',
      action: '下载数据'
    }
  },

  /** Cross-border transfer notice - Chinese */
  CROSS_BORDER_NOTICE: {
    zh: {
      title: '跨境数据传输告知',
      body: '您的部分数据可能被传输至中国境外进行处理。我们已采取适当保护措施，并已获得您的同意。',
      action: '了解更多'
    }
  }
} as const

/**
 * Get localized notification for privacy policy changes.
 */
export function getPrivacyPolicyChangeNotification(locale = 'zh'): {
  title: string
  body: string
  action: string
} {
  const notifications = PIPL_NOTIFICATIONS.PRIVACY_POLICY_CHANGE
  const fallback = notifications.zh
  return (notifications as Record<string, { title: string; body: string; action: string }>)[locale] ?? fallback
}

/**
 * Log privacy policy change and trigger notification tracking.
 */
export async function logPrivacyPolicyChange(
  userId: string,
  version: string,
  changeSummary: string
): Promise<void> {
  await db.userActivityLog.create({
    data: {
      userId,
      action: PIPL_ACTIONS.PRIVACY_POLICY_CHANGE,
      metadata: {
        version,
        changeSummary,
        notifiedAt: new Date().toISOString()
      } as object
    }
  })
}

// =============================================================================
// EXPORTS
// =============================================================================

export const piplCompliance = {
  article6: PIPL_ARTICLE_6,
  article15: PIPL_ARTICLE_15,
  article16: PIPL_ARTICLE_16,
  article29: PIPL_ARTICLE_29,
  article41: PIPL_ARTICLE_41,
  classifyPII,
  classifyField,
  notifications: PIPL_NOTIFICATIONS,
  getPrivacyPolicyChangeNotification,
  logPrivacyPolicyChange
}
