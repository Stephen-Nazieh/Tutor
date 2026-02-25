/**
 * Financial Calculations Library
 * Enterprise-grade financial logic for parent dashboard, revenue tracking,
 * and commission calculations. Optimized for Chinese market (CNY, zh-CN).
 */

/** Default platform commission rate (15%) */
export const DEFAULT_PLATFORM_FEE_RATE = 0.15

/** Completed payment statuses */
export const COMPLETED_PAYMENT_STATUSES = ['COMPLETED', 'completed', 'paid'] as const

export interface CommissionBreakdown {
  /** Gross amount (total paid by parent) */
  grossAmount: number
  /** Platform fee (commission) */
  platformFee: number
  /** Tutor net earnings after commission */
  tutorAmount: number
  /** Commission rate applied (e.g. 0.15 for 15%) */
  rate: number
}

export interface SpendingTrend {
  period: string // "2025-01", "2025-W03"
  amount: number
  count: number
  category: 'course' | 'clinic' | 'other'
}

export interface MonthlySpendingSummary {
  year: number
  month: number
  totalSpent: number
  platformFees: number
  tutorPayments: number
  paymentCount: number
  budget?: number
  budgetUtilization?: number // 0-1 or >1 if over
}

export interface BudgetVsActual {
  budget: number
  actual: number
  remaining: number
  utilizationPercent: number
  isOverBudget: boolean
  alertLevel: 'ok' | 'warning' | 'critical'
}

export interface RevenueForecast {
  month: string
  projectedRevenue: number
  confidence: 'low' | 'medium' | 'high'
  basedOnMonths: number
}

/**
 * Calculate commission breakdown for a payment amount
 * Platform takes 15% default; tutor receives 85%
 */
export function calculateCommission(
  amount: number,
  rate: number = DEFAULT_PLATFORM_FEE_RATE
): CommissionBreakdown {
  if (amount < 0) {
    throw new Error('金额不能为负数')
  }
  const platformFee = Math.round(amount * rate * 100) / 100
  const tutorAmount = Math.round((amount - platformFee) * 100) / 100
  return {
    grossAmount: amount,
    platformFee,
    tutorAmount,
    rate,
  }
}

/**
 * Get commission rate from env (supports Chinese market overrides)
 */
export function getPlatformFeeRate(): number {
  const envRate = process.env.PLATFORM_FEE_RATE
  if (envRate) {
    const parsed = parseFloat(envRate)
    if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 1) {
      return parsed
    }
  }
  return DEFAULT_PLATFORM_FEE_RATE
}

/**
 * Aggregate spending by period (monthly or weekly)
 */
export function aggregateSpendingByPeriod(
  payments: Array<{ amount: number; createdAt: Date; type?: string }>,
  period: 'monthly' | 'weekly'
): SpendingTrend[] {
  const grouped = new Map<string, { amount: number; count: number; category: string }>()

  for (const p of payments) {
    const d = new Date(p.createdAt)
    const key =
      period === 'monthly'
        ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        : `${d.getFullYear()}-W${getWeekNumber(d)}`
    const cat = (p.type as string) || 'other'
    const existing = grouped.get(key) || { amount: 0, count: 0, category: cat }
    existing.amount += p.amount
    existing.count += 1
    grouped.set(key, existing)
  }

  return Array.from(grouped.entries())
    .map(([period, data]) => ({
      period,
      amount: Math.round(data.amount * 100) / 100,
      count: data.count,
      category: data.category as 'course' | 'clinic' | 'other',
    }))
    .sort((a, b) => a.period.localeCompare(b.period))
}

/** ISO week number */
function getWeekNumber(d: Date): string {
  const start = new Date(d.getFullYear(), 0, 1)
  const days = Math.floor((d.getTime() - start.getTime()) / 86400000)
  const week = Math.ceil((days + start.getDay() + 1) / 7)
  return String(week).padStart(2, '0')
}

/**
 * Compute family budget vs actual spending
 */
export function computeBudgetVsActual(
  budget: number,
  actual: number,
  currency: string = 'CNY'
): BudgetVsActual {
  const remaining = Math.round((budget - actual) * 100) / 100
  const utilizationPercent = budget > 0 ? (actual / budget) * 100 : 0
  const isOverBudget = actual > budget

  let alertLevel: BudgetVsActual['alertLevel'] = 'ok'
  if (utilizationPercent >= 100) alertLevel = 'critical'
  else if (utilizationPercent >= 80) alertLevel = 'warning'

  return {
    budget,
    actual,
    remaining,
    utilizationPercent: Math.round(utilizationPercent * 100) / 100,
    isOverBudget,
    alertLevel,
  }
}

/**
 * Generate simple revenue forecast based on recent months
 */
export function generateRevenueForecast(
  monthlyTotals: number[],
  monthsAhead: number = 3
): RevenueForecast[] {
  if (monthlyTotals.length === 0) {
    return []
  }

  const avg = monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length
  const variance =
    monthlyTotals.length > 1
      ? monthlyTotals.reduce((s, x) => s + Math.pow(x - avg, 2), 0) / (monthlyTotals.length - 1)
      : 0
  const stdDev = Math.sqrt(variance)
  const cv = avg > 0 ? stdDev / avg : 0
  const confidence: RevenueForecast['confidence'] =
    cv < 0.2 ? 'high' : cv < 0.5 ? 'medium' : 'low'

  const forecasts: RevenueForecast[] = []
  const lastYear = new Date().getFullYear()
  const lastMonth = new Date().getMonth()

  for (let i = 1; i <= monthsAhead; i++) {
    let m = lastMonth + i
    let y = lastYear
    while (m > 11) {
      m -= 12
      y += 1
    }
    forecasts.push({
      month: `${y}-${String(m + 1).padStart(2, '0')}`,
      projectedRevenue: Math.round(avg * 100) / 100,
      confidence,
      basedOnMonths: monthlyTotals.length,
    })
  }

  return forecasts
}

/**
 * Compute monthly spending summary with commission breakdown
 */
export function computeMonthlySpendingSummary(
  payments: Array<{
    amount: number
    createdAt: Date
    type?: string
  }>,
  budgetByMonth?: Map<string, number>,
  feeRate: number = DEFAULT_PLATFORM_FEE_RATE
): MonthlySpendingSummary[] {
  const byMonth = new Map<
    string,
    { amount: number; count: number; platformFees: number; tutorPayments: number }
  >()

  for (const p of payments) {
    const d = new Date(p.createdAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const { platformFee, tutorAmount } = calculateCommission(p.amount, feeRate)
    const existing = byMonth.get(key) || {
      amount: 0,
      count: 0,
      platformFees: 0,
      tutorPayments: 0,
    }
    existing.amount += p.amount
    existing.count += 1
    existing.platformFees += platformFee
    existing.tutorPayments += tutorAmount
    byMonth.set(key, existing)
  }

  return Array.from(byMonth.entries())
    .map(([key, data]) => {
      const [year, month] = key.split('-').map(Number)
      const budget = budgetByMonth?.get(key)
      const summary: MonthlySpendingSummary = {
        year,
        month,
        totalSpent: Math.round(data.amount * 100) / 100,
        platformFees: Math.round(data.platformFees * 100) / 100,
        tutorPayments: Math.round(data.tutorPayments * 100) / 100,
        paymentCount: data.count,
      }
      if (budget != null && budget > 0) {
        summary.budget = budget
        summary.budgetUtilization = Math.round((data.amount / budget) * 1000) / 1000
      }
      return summary
    })
    .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.month - b.month))
}

/**
 * Round amount for display (2 decimal places, Chinese market)
 * Supports CNY (¥), SGD (S$), USD ($)
 */
export function formatAmount(amount: number, currency = 'CNY'): string {
  const rounded = Math.round(amount * 100) / 100
  const symbol = currency === 'CNY' ? '¥' : currency === 'SGD' ? 'S$' : currency + ' '
  return `${symbol}${rounded.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`
}
