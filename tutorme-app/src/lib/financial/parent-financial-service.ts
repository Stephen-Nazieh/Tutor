import { drizzleDb } from '@/lib/db/drizzle'
import { familyBudget } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'

export interface FamilyPaymentItem {
  id: string
  type: 'course' | 'clinic' | 'budget'
  amount: number
  currency: string
  status: string
  createdAt: Date
  paidAt?: Date | null
  description?: string | null
  studentName?: string | null
}

export interface FinancialSummary {
  totalSpent: number
  totalPayments: number
  pendingPayments: number
  completedPayments: number
  byType: Record<string, number>
  byMonth: Record<string, number>
}

export async function fetchFamilyPayments(
  family?: { familyAccountId: string },
  options?: { studentId?: string; startDate?: Date }
): Promise<FamilyPaymentItem[]> {
  // TODO: Implement actual payment fetching from database
  // For now, return empty array as placeholder
  return []
}

export function computeFinancialSummary(
  payments: FamilyPaymentItem[],
  monthlyBudget: number,
  currency: string
): FinancialSummary {
  const completedPayments = payments.filter(p =>
    ['COMPLETED', 'completed', 'paid'].includes(p.status)
  )

  const totalSpent = completedPayments.reduce((sum, p) => sum + p.amount, 0)

  const byType = payments.reduce<Record<string, number>>((acc, p) => {
    acc[p.type] = (acc[p.type] ?? 0) + p.amount
    return acc
  }, {})

  const byMonth = completedPayments.reduce<Record<string, number>>((acc, p) => {
    const key = `${p.createdAt.getFullYear()}-${String(p.createdAt.getMonth() + 1).padStart(2, '0')}`
    acc[key] = (acc[key] ?? 0) + p.amount
    return acc
  }, {})

  return {
    totalSpent,
    totalPayments: payments.length,
    pendingPayments: payments.filter(p => p.status === 'PENDING').length,
    completedPayments: completedPayments.length,
    byType,
    byMonth,
  }
}

export async function getBudgetForCurrentMonth(familyAccountId: string) {
  const now = new Date()
  const [record] = await drizzleDb
    .select()
    .from(familyBudget)
    .where(
      and(
        eq(familyBudget.parentId, familyAccountId),
        eq(familyBudget.month, now.getMonth() + 1),
        eq(familyBudget.year, now.getFullYear())
      )
    )
    .limit(1)

  return record ?? null
}
