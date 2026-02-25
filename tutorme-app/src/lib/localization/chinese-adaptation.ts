/**
 * Comprehensive Chinese Localization and Cultural Adaptation
 * 中文本地化与文化适配 - TutorMe Chinese Market
 *
 * Implements:
 * - Complete zh-CN localization with cultural nuances
 * - Asian character fonts and text rendering
 * - Chinese numeral and date formatting
 * - Social platform integration (WeChat, QQ, DingTalk)
 * - Business culture adaptation
 * - Chinese government compliance (PBOC, PIPL, Cybersecurity Law)
 */

// =============================================================================
// 1. COMPLETE CHINESE LANGUAGE SUPPORT
// =============================================================================

/** Primary locale for Chinese market */
export const CHINESE_LOCALIZATION = {
  LANGUAGE: 'zh-CN' as const,
  REGION: 'CN' as const,
  CULTURAL_CONTEXT: {
    /** 礼貌 (polite), 商务 (business), 亲密 (intimate) */
    FORMALITY_LEVELS: ['礼貌', '商务', '亲密'] as const,
    /** Use honorifics: 先生/女士/老师 */
    HONORIFICS: true,
    /** Indirect communication style preferred */
    INDIRECT_COMMUNICATION: true,
  },
} as const

export type FormalityLevel = (typeof CHINESE_LOCALIZATION.CULTURAL_CONTEXT.FORMALITY_LEVELS)[number]

/** Honorific suffixes for formal address */
export const CHINESE_HONORIFICS = {
  MALE: '先生',
  FEMALE: '女士',
  TEACHER: '老师',
  PROFESSOR: '教授',
  DOCTOR: '博士',
  MANAGER: '经理',
} as const

/** Indirect communication patterns - soften direct statements */
export const INDIRECT_PATTERNS = {
  SUGGEST: '建议您...',
  PREFER: '最好...',
  AVOID_DIRECT_NO: '可能不太合适...',
  SOFT_REQUEST: '麻烦您...',
  POLITE_DECLINE: '暂时不方便...',
} as const

// =============================================================================
// 2. ASIAN CHARACTERS & FONTS
// =============================================================================

/** System fonts optimized for Chinese character rendering */
export const CHINESE_FONT_STACK = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'PingFang SC',
  'Hiragino Sans GB',
  'Microsoft YaHei',
  '微软雅黑',
  'WenQuanYi Micro Hei',
  'Noto Sans SC',
  'sans-serif',
] as const

/** CSS font-family value for Chinese text */
export const CHINESE_FONT_FAMILY = CHINESE_FONT_STACK.join(', ')

/** Font configuration for different contexts */
export const FONT_CONFIG = {
  /** Primary UI text */
  PRIMARY: CHINESE_FONT_FAMILY,
  /** Monospace for numbers/codes */
  MONO: "'PingFang SC', 'Microsoft YaHei', 'Consolas', monospace",
  /** Formal documents */
  FORMAL: "'SimSun', '宋体', 'STSong', serif",
  /** Headings */
  HEADING: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
} as const

/** Text rendering hints for Chinese characters */
export const TEXT_RENDERING = {
  /** Optimize for legibility (Chinese glyphs) */
  OPTIMIZE_LEGIBILITY: 'optimizeLegibility' as const,
  /** Geometric precision for mixed content */
  GEOMETRIC_PRECISION: 'geometricPrecision' as const,
  /** Auto hinting for CJK */
  AUTO: 'auto' as const,
} as const

/** RTL support for mixed content (Arabic/Hebrew in Chinese docs) */
export const DIRECTION = {
  LTR: 'ltr' as const,
  RTL: 'rtl' as const,
  AUTO: 'auto' as const,
} as const

/** Get CSS variables for Chinese typography */
export function getChineseTypographyCSS(): Record<string, string> {
  return {
    '--font-chinese': CHINESE_FONT_FAMILY,
    '--font-chinese-mono': FONT_CONFIG.MONO,
    '--font-chinese-formal': FONT_CONFIG.FORMAL,
    'text-rendering': TEXT_RENDERING.OPTIMIZE_LEGIBILITY,
  }
}

// =============================================================================
// 3. CULTURAL NUMBERS & DATES
// =============================================================================

/** Chinese formal numerals (大写数字) for invoices and legal documents */
const CHINESE_FORMAL_NUMERALS: Record<string, string> = {
  '0': '零',
  '1': '壹',
  '2': '贰',
  '3': '叁',
  '4': '肆',
  '5': '伍',
  '6': '陆',
  '7': '柒',
  '8': '捌',
  '9': '玖',
}

/** Chinese casual numerals (小写) */
const CHINESE_CASUAL_NUMERALS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

/** Place value units for formal amounts */
const FORMAL_UNITS = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿']

/** Heavenly stems (天干) for 干支纪年 */
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

/** Earthly branches (地支) */
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

/** Convert number to Chinese formal (大写) for invoices */
export function toChineseFormalNumeral(num: number): string {
  if (num === 0) return '零'
  const intPart = Math.floor(num)
  const decPart = Math.round((num - intPart) * 100)
  let result = ''

  const str = intPart.toString()
  for (let i = 0; i < str.length; i++) {
    const digit = str[i]
    const unitIdx = str.length - 1 - i
    const unit = FORMAL_UNITS[unitIdx] || ''
    if (digit !== '0') {
      result += CHINESE_FORMAL_NUMERALS[digit] + unit
    } else if (result && !result.endsWith('零')) {
      result += '零'
    }
  }
  result = result.replace(/零+$/, '') || '零'

  if (decPart > 0) {
    result += '点'
    const decStr = decPart.toString().padStart(2, '0')
    result += CHINESE_FORMAL_NUMERALS[decStr[0]] + CHINESE_FORMAL_NUMERALS[decStr[1]]
  }
  return result
}

/** Convert number to Chinese casual (小写) */
export function toChineseCasualNumeral(num: number): string {
  if (num === 0) return '零'
  if (num < 10) return CHINESE_CASUAL_NUMERALS[num]
  const str = num.toString()
  return str
    .split('')
    .map((d) => CHINESE_CASUAL_NUMERALS[parseInt(d, 10)])
    .join('')
}

/** Get 干支 (Heavenly Stem + Earthly Branch) year */
export function getGanZhiYear(date: Date = new Date()): string {
  const year = date.getFullYear()
  const baseYear = 4
  const stemIdx = (year - baseYear) % 10
  const branchIdx = (year - baseYear) % 12
  return TIAN_GAN[stemIdx] + DI_ZHI[branchIdx] + '年'
}

/** Format date for Chinese locale */
export function formatChineseDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions & { useLunar?: boolean }
): string {
  const { useLunar = false, ...fmtOptions } = options ?? {}
  if (useLunar) {
    return formatLunarDate(date)
  }
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...fmtOptions,
  })
}

/** Simplified lunar date placeholder - full implementation would use lunar calendar library */
function formatLunarDate(date: Date): string {
  const solar = date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
  return `农历 ${solar}` // Placeholder; integrate with lunar-calendar lib for accuracy
}

/** Chinese number formatting (1,234.56 style with 万/亿 for large numbers) */
export function formatChineseNumber(
  num: number,
  options?: { formal?: boolean; compact?: boolean }
): string {
  const { formal = false, compact = false } = options ?? {}
  if (compact && num >= 10000) {
    if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿'
    if (num >= 10000) return (num / 10000).toFixed(1) + '万'
  }
  const formatted = num.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  return formal ? toChineseFormalNumeral(num) : formatted
}

// =============================================================================
// 4. CHINESE SOCIAL INTEGRATION
// =============================================================================

/** WeChat integration config */
export const WECHAT_INTEGRATION = {
  SHARE_TITLE: '分享到微信',
  MINI_PROGRAM_SUPPORT: true,
  SHARE_TIMELINE: '分享到朋友圈',
  SHARE_FRIEND: '分享给好友',
  SCAN_QR: '扫码关注',
} as const

/** QQ integration config */
export const QQ_INTEGRATION = {
  LOGIN_LABEL: 'QQ登录',
  PROFILE_LINKING: true,
  QQ_SPACE_SHARE: '分享到QQ空间',
} as const

/** DingTalk (钉钉) enterprise integration */
export const DINGTALK_INTEGRATION = {
  ENTERPRISE_LOGIN: '钉钉登录',
  WORK_NOTIFICATION: true,
  GROUP_MESSAGING: true,
} as const

/** Chinese social platform types */
export type ChineseSocialPlatform = 'WECHAT' | 'QQ' | 'DINGTALK' | 'WEIBO'

/** Invoice amount in 大写 (formal Chinese numerals) - PBOC compliant */
export function formatInvoiceAmount(amount: number, currency: string = '元'): string {
  const intPart = Math.floor(amount)
  const decPart = Math.round((amount - intPart) * 100)
  let result = toChineseFormalNumeral(intPart) + currency
  if (decPart > 0) {
    const jiao = Math.floor(decPart / 10)
    const fen = decPart % 10
    if (jiao > 0) result += CHINESE_FORMAL_NUMERALS[jiao.toString()] + '角'
    if (fen > 0) result += CHINESE_FORMAL_NUMERALS[fen.toString()] + '分'
    if (jiao > 0 && fen === 0) result += '整'
  } else {
    result += '整'
  }
  return result
}

// =============================================================================
// 5. BUSINESS CULTURE ADAPTATION
// =============================================================================

/** Formal Chinese business email structure */
export const CHINESE_EMAIL_TEMPLATE = {
  GREETING: '尊敬的{honorific}{name}：',
  BODY_PREFIX: '您好！',
  CLOSING: '此致\n敬礼',
  SIGNATURE: '{sender}\n{date}',
} as const

/** Meeting etiquette patterns */
export const MEETING_ETIQUETTE = {
  /** Punctuality emphasis */
  PUNCTUALITY: '请提前5-10分钟到场',
  /** Seating hierarchy */
  SEATING_ORDER: true,
  /** Gift exchange norms */
  GIFT_ACCEPTABLE: true,
  /** Business card exchange */
  BUSINESS_CARD: '双手递接名片',
} as const

/** Payment timing optimization for Chinese habits */
export const PAYMENT_TIMING = {
  /** Peak payment hours (UTC+8) */
  PEAK_HOURS: [9, 10, 11, 14, 15, 20, 21] as number[],
  /** Preferred payment days (avoid 4) */
  AVOID_NUMBER: 4,
  /** Lucky numbers for amounts */
  LUCKY_NUMBERS: [6, 8, 9] as number[],
  /** Red envelope (红包) amounts */
  RED_ENVELOPE_AMOUNTS: [6.6, 8.8, 66, 88, 168, 666, 888] as number[],
} as const

/** Communication patterns */
export const COMMUNICATION_PATTERNS = {
  /** Save face (面子) */
  FACE_SAVING: true,
  /** Relationship first (关系) */
  GUANXI_FIRST: true,
  /** Hierarchy awareness */
  HIERARCHY_AWARE: true,
  /** Indirect feedback */
  INDIRECT_FEEDBACK: true,
} as const

/** Generate formal email greeting */
export function getFormalEmailGreeting(name: string, honorific: keyof typeof CHINESE_HONORIFICS): string {
  return CHINESE_EMAIL_TEMPLATE.GREETING.replace('{honorific}', CHINESE_HONORIFICS[honorific]).replace(
    '{name}',
    name
  )
}

// =============================================================================
// 6. CHINESE GOVERNMENT COMPLIANCE
// =============================================================================

/** PBOC (中国人民银行) payment standards */
export const PBOC_STANDARDS = {
  /** Minimum transaction amount (CNY) */
  MIN_AMOUNT: 0.01,
  /** Maximum single transaction (CNY) - configurable */
  MAX_SINGLE_AMOUNT: 50000,
  /** Settlement timing (T+1 typical) */
  SETTLEMENT_DAYS: 1,
  /** Currency code */
  CURRENCY: 'CNY' as const,
  /** Required receipt fields */
  RECEIPT_FIELDS: ['商户名称', '交易金额', '交易时间', '交易流水号'] as const,
} as const

/** PRC compliance references */
export const PRC_COMPLIANCE = {
  /** Cybersecurity Law (网络安全法) */
  CYBERSECURITY_LAW: 'CSL',
  /** Personal Information Protection Law (个人信息保护法) */
  PIPL: 'PIPL',
  /** Data Security Law (数据安全法) */
  DSL: 'DSL',
  /** E-commerce Law (电子商务法) */
  ECOMMERCE_LAW: 'ECL',
} as const

/** China Cybersecurity Law (中国网络安全法) requirements */
export const CYBERSECURITY_LAW_REQUIREMENTS = {
  /** Data localization for critical data */
  DATA_LOCALIZATION: true,
  /** Security level classification */
  SECURITY_LEVELS: ['一般', '重要', '核心'] as const,
  /** Incident reporting within 24h */
  INCIDENT_REPORT_HOURS: 24,
  /** Real-name verification */
  REAL_NAME_VERIFICATION: true,
} as const

/** China PIPL (个人信息保护法) - aligns with pipl-compliance.ts */
export const PIPL_REQUIREMENTS = {
  /** Explicit consent required */
  EXPLICIT_CONSENT: true,
  /** Right to access (Article 15) */
  RIGHT_TO_ACCESS: true,
  /** Right to rectification (Article 16) */
  RIGHT_TO_RECTIFICATION: true,
  /** Cross-border transfer rules (Article 29) */
  CROSS_BORDER_RULES: true,
  /** Algorithm transparency (Article 41) */
  ALGORITHM_TRANSPARENCY: true,
  /** Minors' data special protection */
  MINOR_PROTECTION: true,
} as const

/** China-specific privacy law checklist */
export const CHINA_PRIVACY_CHECKLIST = {
  PIPL: PIPL_REQUIREMENTS,
  CSL: CYBERSECURITY_LAW_REQUIREMENTS,
  /** Consent must be specific and informed */
  SPECIFIC_CONSENT: true,
  /** Data minimization principle */
  DATA_MINIMIZATION: true,
  /** Purpose limitation */
  PURPOSE_LIMITATION: true,
} as const

// =============================================================================
// EXPORTS & UTILITIES
// =============================================================================

/** Default timezone for Chinese operations */
export const CHINESE_TIMEZONE = 'Asia/Shanghai'

/** Default locale for formatting */
export const DEFAULT_LOCALE = 'zh-CN'

/** Check if current context should use Chinese adaptation */
export function shouldUseChineseAdaptation(locale?: string): boolean {
  return !locale || locale.startsWith('zh')
}

/** Get comprehensive Chinese adaptation config */
export function getChineseAdaptationConfig() {
  return {
    localization: CHINESE_LOCALIZATION,
    fonts: FONT_CONFIG,
    numerals: {
      toFormal: toChineseFormalNumeral,
      toCasual: toChineseCasualNumeral,
      format: formatChineseNumber,
      invoice: formatInvoiceAmount,
    },
    dates: {
      format: formatChineseDate,
      ganZhi: getGanZhiYear,
    },
    social: {
      wechat: WECHAT_INTEGRATION,
      qq: QQ_INTEGRATION,
      dingtalk: DINGTALK_INTEGRATION,
    },
    business: {
      email: CHINESE_EMAIL_TEMPLATE,
      meeting: MEETING_ETIQUETTE,
      payment: PAYMENT_TIMING,
      communication: COMMUNICATION_PATTERNS,
    },
    compliance: {
      pboc: PBOC_STANDARDS,
      prc: PRC_COMPLIANCE,
      cybersecurity: CYBERSECURITY_LAW_REQUIREMENTS,
      pipl: PIPL_REQUIREMENTS,
      privacy: CHINA_PRIVACY_CHECKLIST,
    },
  }
}
