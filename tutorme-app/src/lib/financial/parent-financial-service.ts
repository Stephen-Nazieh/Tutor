/**
 * Parent Financial Service - fetches and aggregates payment data for family accounts.
 */
import { and, eq, inArray, gte, lte } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  clinicBooking,
  familyPayment,
  familyBudget,
  payment
} from '@/lib/db/schema'
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

  const [enrollmentsWithDetails, bookingsWithDetails, coursePaymentRows, clinicPaymentRows, familyPaymentsRaw] = await Promise.all([
    filterStudentIds.length > 0
      ? drizzleDb.query.curriculumEnrollment.findMany({
        where: inArray(curriculumEnrollment.studentId, filterStudentIds),
        with: {
          student: { with: { profile: { columns: { name: true } } } },
          curriculum: { columns: { name: true } },
        },
      })
      : Promise.resolve([]),
    filterStudentIds.length > 0
      ? drizzleDb.query.clinicBooking.findMany({
        where: inArray(clinicBooking.studentId, filterStudentIds),
        with: {
          student: { with: { profile: { columns: { name: true } } } },
          clinic: { columns: { title: true } },
        },
      })
      : Promise.resolve([]),
    filterStudentIds.length > 0
      ? drizzleDb
          .select({
            paymentId: payment.id,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status,
            createdAt: payment.createdAt,
            paidAt: payment.paidAt,
            enrollmentId: payment.enrollmentId,
          })
          .from(payment)
          .innerJoin(curriculumEnrollment, eq(payment.enrollmentId, curriculumEnrollment.id))
          .where(
            and(
              inArray(curriculumEnrollment.studentId, filterStudentIds),
              ...(options?.startDate ? [gte(payment.createdAt, options.startDate)] : []),
              ...(options?.endDate ? [lte(payment.createdAt, options.endDate)] : [])
            )
          )
      : Promise.resolve([]),
    filterStudentIds.length > 0
      ? drizzleDb
          .select({
            paymentId: payment.id,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status,
            createdAt: payment.createdAt,
            paidAt: payment.paidAt,
            bookingId: payment.bookingId,
          })
          .from(payment)
          .innerJoin(clinicBooking, eq(payment.bookingId, clinicBooking.id))
          .where(
            and(
              inArray(clinicBooking.studentId, filterStudentIds),
              ...(options?.startDate ? [gte(payment.createdAt, options.startDate)] : []),
              ...(options?.endDate ? [lte(payment.createdAt, options.endDate)] : [])
            )
          )
      : Promise.resolve([]),
    drizzleDb.query.familyPayment.findMany({
      where: and(
        eq(familyPayment.parentId, family.id),
        ...(options?.startDate ? [gte(familyPayment.createdAt, options.startDate)] : []),
        ...(options?.endDate ? [lte(familyPayment.createdAt, options.endDate)] : [])
      ),
    }),
  ])

  const enrollmentById = new Map(
    (enrollmentsWithDetails as { id: string; studentId: string; curriculum?: { name: string } | null; student?: { profile?: { name: string | null } } | null }[]).map((e) => [e.id, e])
  )
  const bookingById = new Map(
    (bookingsWithDetails as { id: string; studentId: string; clinic?: { title: string } | null; student?: { profile?: { name: string | null } } | null }[]).map((b) => [b.id, b])
  )

  const coursePayments: UnifiedPayment[] = coursePaymentRows.map((p) => {
    const e = enrollmentById.get(p.enrollmentId ?? '')
    return {
      id: p.paymentId,
      type: 'course' as const,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      createdAt: p.createdAt,
      paidAt: p.paidAt,
      description: e?.curriculum?.name,
      studentName: e?.student?.profile?.name ?? undefined,
      studentId: e?.studentId,
    }
  })

  const clinicPayments: UnifiedPayment[] = clinicPaymentRows.map((p) => {
    const b = bookingById.get(p.bookingId ?? '')
    return {
      id: p.paymentId,
      type: 'clinic' as const,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      createdAt: p.createdAt,
      paidAt: p.paidAt,
      description: b?.clinic?.title,
      studentName: b?.student?.profile?.name ?? undefined,
      studentId: b?.studentId,
    }
  })

  const budgetPayments: UnifiedPayment[] = familyPaymentsRaw.map((p) => ({
    id: p.id,
    type: 'budget' as const,
    amount: p.amount,
    currency: family.defaultCurrency,
    status: p.status,
    createdAt: p.createdAt,
    paidAt: undefined,
    studentId: undefined,
  }))

  const all = [...coursePayments, ...clinicPayments, ...budgetPayments]
  // Manual date filtering for clinicPayments if they don't support table-level dateFilter because Drizzle nested filtering on 'one' relation is implicit in 'where' if we use it, but here it's 1:1.
  // Actually clinicBooking -> payment is 1:1.
  let filtered = all
  if (options?.startDate || options?.endDate) {
    filtered = all.filter((p) => {
      const t = p.createdAt.getTime()
      if (options?.startDate && t < options.startDate.getTime()) return false
      if (options?.endDate && t > options.endDate.getTime()) return false
      return true
    })
  }

  return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function computeFinancialSummary(
  payments: UnifiedPayment[],
  monthlyBudget: number,
  currency: string
) {
  const completed = payments.filter((p) =>
    COMPLETED_PAYMENT_STATUSES.includes(p.status as any)
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
  const budget = await drizzleDb.query.familyBudget.findFirst({
    where: and(
      eq(familyBudget.parentId, familyId),
      eq(familyBudget.month, now.getMonth() + 1),
      eq(familyBudget.year, now.getFullYear())
    ),
  })
  if (!budget) return null
  return { amount: budget.amount, spent: budget.spent }
}
