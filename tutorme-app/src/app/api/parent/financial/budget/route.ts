/**
 * GET /api/parent/financial/budget
 * Budget management and alerts
 */
import { NextRequest, NextResponse } from 'next/server'
import { withAuth, handleApiError } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import {
  fetchFamilyPayments,
  computeFinancialSummary,
  getBudgetForCurrentMonth,
} from '@/lib/financial/parent-financial-service'
import { computeBudgetVsActual } from '@/lib/financial/calculations'
import { db } from '@/lib/db'
import cacheManager from '@/lib/cache-manager'

const CACHE_TTL = 120

export const GET = withAuth(
  async (req: NextRequest, session) => {
    try {
      const family = await getFamilyAccountForParent(session)
      if (!family) {
        return NextResponse.json(
          { error: '未找到家庭账户' },
          { status: 404 }
        )
      }

      const cacheKey = `parent:financial:budget:${family.id}`
      const cached = await cacheManager.get<object>(cacheKey)
      if (cached) return NextResponse.json({ success: true, data: cached })

      const payments = await fetchFamilyPayments(family)
      const summary = computeFinancialSummary(
        payments,
        family.monthlyBudget,
        family.defaultCurrency
      )

      const budgetRecord = await getBudgetForCurrentMonth(family.id)
      const now = new Date()
      const budgetAmount = budgetRecord?.amount ?? family.monthlyBudget
      const spent = budgetRecord?.spent ?? summary.totalSpent

      const budgetVsActual = computeBudgetVsActual(
        budgetAmount,
        spent,
        family.defaultCurrency
      )

      const budgetRecords = await db.familyBudget.findMany({
        where: { parentId: family.id },
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
        take: 12,
      })

      const alerts = await db.budgetAlert.findMany({
        where: { parentId: family.id, isRead: false },
        orderBy: { createdAt: 'desc' },
        take: 10,
      })

      const data = {
        budgetVsActual: {
          ...budgetVsActual,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        },
        budgetRecords: budgetRecords.map((r: any) => ({
          month: r.month,
          year: r.year,
          amount: r.amount,
          spent: r.spent,
          remaining: Math.round((r.amount - r.spent) * 100) / 100,
        })),
        alerts: alerts.map((a: any) => ({
          id: a.id,
          type: a.type,
          message: a.message,
          createdAt: a.createdAt.toISOString(),
        })),
        enableBudget: family.enableBudget ?? false,
      }

      await cacheManager.set(cacheKey, data, {
        ttl: CACHE_TTL,
        tags: [`family:${family.id}`],
      })

      return NextResponse.json({ success: true, data })
    } catch (err) {
      return handleApiError(err, '获取预算信息失败', 'ParentFinancialBudget')
    }
  },
  { role: 'PARENT' }
)
