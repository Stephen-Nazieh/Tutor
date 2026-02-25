'use client'

/**
 * useParentFinancialCalculations
 * Client hook for parent financial dashboard with complex aggregation.
 * Fetches from /api/parent/financial/* and provides computed metrics.
 */

import { useState, useEffect, useCallback } from 'react'

export interface FinancialSummary {
  totalSpent: number
  monthlyBudget: number
  budgetRemaining: number
  utilizationPercent: number
  currency: string
  platformFeesPaid: number
  tutorPayments: number
  paymentCount: number
}

export interface SpendingTrendItem {
  period: string
  amount: number
  count: number
  category: 'course' | 'clinic' | 'other'
}

export interface PaymentRecord {
  id: string
  type: 'course' | 'clinic' | 'budget'
  amount: number
  currency: string
  status: string
  createdAt: string
  paidAt?: string
  description?: string
  studentName?: string
}

export interface BudgetInfo {
  month: number
  year: number
  amount: number
  spent: number
  remaining: number
  utilizationPercent: number
  alertLevel: 'ok' | 'warning' | 'critical'
}

export interface RevenueForecastItem {
  month: string
  projectedRevenue: number
  confidence: 'low' | 'medium' | 'high'
}

export interface ParentFinancialData {
  summary: FinancialSummary
  spendingTrends: SpendingTrendItem[]
  monthlySummaries: Array<{
    year: number
    month: number
    totalSpent: number
    platformFees: number
    tutorPayments: number
    paymentCount: number
    budget?: number
    budgetUtilization?: number
  }>
  payments: PaymentRecord[]
  budgetVsActual: BudgetInfo | null
  revenueForecast: RevenueForecastItem[]
}

interface UseParentFinancialCalculationsResult {
  data: ParentFinancialData | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const DEFAULT_DATA: ParentFinancialData = {
  summary: {
    totalSpent: 0,
    monthlyBudget: 0,
    budgetRemaining: 0,
    utilizationPercent: 0,
    currency: 'CNY',
    platformFeesPaid: 0,
    tutorPayments: 0,
    paymentCount: 0,
  },
  spendingTrends: [],
  monthlySummaries: [],
  payments: [],
  budgetVsActual: null,
  revenueForecast: [],
}

export function useParentFinancialCalculations(
  options?: { period?: 'monthly' | 'weekly'; studentId?: string }
): UseParentFinancialCalculationsResult {
  const [data, setData] = useState<ParentFinancialData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (options?.period) params.set('period', options.period)
      if (options?.studentId) params.set('studentId', options.studentId)

      const [dashboardRes, spendingRes, paymentsRes, budgetRes] = await Promise.all([
        fetch(`/api/parent/financial/dashboard?${params}`),
        fetch(`/api/parent/financial/spending?${params}`),
        fetch(`/api/parent/financial/payments?${params}`),
        fetch(`/api/parent/financial/budget?${params}`),
      ])

      const dashboardJson = await dashboardRes.json()
      const spendingJson = await spendingRes.json()
      const paymentsJson = await paymentsRes.json()
      const budgetJson = await budgetRes.json()

      if (!dashboardRes.ok) {
        throw new Error(dashboardJson.error || '获取财务概览失败')
      }

      const merged: ParentFinancialData = {
        summary: dashboardJson.data?.summary ?? DEFAULT_DATA.summary,
        spendingTrends: spendingJson.data?.trends ?? DEFAULT_DATA.spendingTrends,
        monthlySummaries:
          spendingJson.data?.monthlySummaries ?? DEFAULT_DATA.monthlySummaries,
        payments: paymentsJson.data?.payments ?? DEFAULT_DATA.payments,
        budgetVsActual: budgetJson.data?.budgetVsActual ?? null,
        revenueForecast: dashboardJson.data?.revenueForecast ?? DEFAULT_DATA.revenueForecast,
      }

      setData(merged)
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载财务数据失败')
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [options?.period, options?.studentId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, refetch: fetchData }
}
