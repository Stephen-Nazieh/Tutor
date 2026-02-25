/**
 * Parent Financial Service - fetches and aggregates payment data for family accounts.
 */
import { db } from '@/lib/db'
import type { FamilyAccountWithMembers } from '@/lib/api/parent-helpers'
import {
  calculateCommission,
  getPlatformFeeRate,
  COMPLETED_PAYMENT_STATUSES,
} from '@/lib/financial/calculations'

export interface UnifiedPayment {
  id: string
  type: 'course' | 'clinic' | 'budget'
  amount: number
  currency: string
  status: string
  createdAt: Date
  paidAt?: Date | null
  description?: string
  studentName?: string
  studentId?: string
}

export async function fetchFamilyPayments(
  family: FamilyAccountWithMembers,
  options?: { studentId?: string; startDate?: Date; endDate?: Date }
): Promise<UnifiedPayment[]> {
  const { studentIds } = family
  const filterStudentIds =
    options?.studentId && studentIds.includes(options.studentId)
      ? [options.studentId]
      : studentIds

  const dateFilter =
    options?.startDate || options?.endDate
      ? {
          ...(options.startDate && { gte: options.startDate }),
          ...(options.endDate && { lte: options.endDate }),
        }
      : undefined

  const [enrollments, bookings, familyPayments] = await Promise.all([
    filterStudentIds.length > 0
      ? db.curriculumEnrollment.findMany({
          where: { studentId: { in: filterStudentIds } },
          include: {
            payments: dateFilter ? { where: { createdAt: dateFilter } } : true,
            student: { select: { profile: { select: { name: true } } } },
            curriculum: { select: { name: true } },
          },
        })
      : [],
    filterStudentIds.length > 0
      ? db.clinicBooking.findMany({
          where: { studentId: { in: filterStudentIds } },
          include: {
            payment: true,
            student: { select: { profile: { select: { name: true } } } },
            clinic: { select: { title: true } },
          },
        })
      : [],
    db.familyPayment.findMany({
      where: {
        parentId: family.id,
        ...(dateFilter && { createdAt: dateFilter }),
      },
    }),
  ])

  const coursePayments: UnifiedPayment[] = enrollments.flatMap((e) =>
    (e.payments || []).map((p) => ({
      id: p.id,
      type: 'course' as const,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      createdAt: p.createdAt,
      paidAt: p.paidAt,
      description: e.curriculum.name,
      studentName: e.student.profile?.name ?? undefined,
      studentId: e.studentId,
    }))
  )

  const clinicPayments: UnifiedPayment[] = bookings
    .filter((b) => b.payment)
    .map((b) => ({
      id: b.payment!.id,
      type: 'clinic' as const,
      amount: b.payment!.amount,
      currency: b.payment!.currency,
      status: b.payment!.status,
      createdAt: b.payment!.createdAt,
      paidAt: b.payment!.paidAt,
      description: b.clinic.title,
      studentName: b.student.profile?.name ?? undefined,
      studentId: b.studentId,
    }))

  const budgetPayments: UnifiedPayment[] = familyPayments.map((p) => ({
    id: p.id,
    type: 'budget' as const,
    amount: p.amount,
    currency: family.defaultCurrency,
    status: p.status,
    createdAt: p.createdAt,
    paidAt: undefined,
    studentId: undefined,
  }))

  let all = [...coursePayments, ...clinicPayments, ...budgetPayments]
  if (dateFilter) {
    all = all.filter((p) => {
      const t = p.createdAt.getTime()
      if (options?.startDate && t < options.startDate.getTime()) return false
      if (options?.endDate && t > options.endDate.getTime()) return false
      return true
    })
  }
  return all.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function computeFinancialSummary(
  payments: UnifiedPayment[],
  monthlyBudget: number,
  currency: string
) {
  const completed = payments.filter((p) =>
    COMPLETED_PAYMENT_STATUSES.includes(p.status as (typeof COMPLETED_PAYMENT_STATUSES)[number])
  )
  const totalSpent = completed.reduce((s, p) => s + p.amount, 0)
  const feeRate = getPlatformFeeRate()
  let platformFeesPaid = 0
  let tutorPayments = 0
  for (const p of completed) {
    if (p.type !== 'budget') {
      const { platformFee, tutorAmount } = calculateCommission(p.amount, feeRate)
      platformFeesPaid += platformFee
      tutorPayments += tutorAmount
    }
  }

  const budgetRemaining = monthlyBudget - totalSpent
  const utilizationPercent =
    monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0

  return {
    totalSpent: Math.round(totalSpent * 100) / 100,
    monthlyBudget,
    budgetRemaining: Math.round(budgetRemaining * 100) / 100,
    utilizationPercent: Math.round(utilizationPercent * 100) / 100,
    currency,
    platformFeesPaid: Math.round(platformFeesPaid * 100) / 100,
    tutorPayments: Math.round(tutorPayments * 100) / 100,
    paymentCount: completed.length,
  }
}

export async function getBudgetForCurrentMonth(
  familyId: string
): Promise<{ amount: number; spent: number } | null> {
  const now = new Date()
  const budget = await db.familyBudget.findUnique({
    where: {
      parentId_month_year: {
        parentId: familyId,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      },
    },
  })
  if (!budget) return null
  return { amount: budget.amount, spent: budget.spent }
}
