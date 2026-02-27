/**
 * GET /api/parent/payments
 * Payment history for family (FamilyPayment + Payment via children enrollments/bookings)
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, desc, inArray } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  familyPayment,
  curriculumEnrollment,
  clinicBooking,
  payment
} from '@/lib/db/schema'
import cacheManager from '@/lib/cache-manager'

const CACHE_TTL = 120

export const GET = withAuth(
  async (req: NextRequest, session) => {
    const family = await getFamilyAccountForParent(session)
    if (!family) {
      return NextResponse.json(
        { error: '未找到家庭账户' },
        { status: 404 }
      )
    }

    const cacheKey = `parent:payments:${family.id}`
    const cached = await cacheManager.get<object>(cacheKey)
    if (cached) return NextResponse.json({ success: true, data: cached })

    const [familyPaymentsRaw, enrollmentsWithDetails, bookingsWithDetails, coursePaymentRows, clinicPaymentRows] = await Promise.all([
      drizzleDb.query.familyPayment.findMany({
        where: eq(familyPayment.parentId, family.id),
        orderBy: [desc(familyPayment.createdAt)],
        limit: 50,
      }),
      family.studentIds.length > 0
        ? drizzleDb.query.curriculumEnrollment.findMany({
          where: inArray(curriculumEnrollment.studentId, family.studentIds),
          with: {
            student: { with: { profile: { columns: { name: true } } } },
            curriculum: { columns: { name: true } },
          },
        })
        : Promise.resolve([]),
      family.studentIds.length > 0
        ? drizzleDb.query.clinicBooking.findMany({
          where: inArray(clinicBooking.studentId, family.studentIds),
          with: {
            student: { with: { profile: { columns: { name: true } } } },
            clinic: { columns: { title: true } },
          },
        })
        : Promise.resolve([]),
      family.studentIds.length > 0
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
            .where(inArray(curriculumEnrollment.studentId, family.studentIds))
        : Promise.resolve([]),
      family.studentIds.length > 0
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
            .where(inArray(clinicBooking.studentId, family.studentIds))
        : Promise.resolve([]),
    ])

    const enrollmentById = new Map((enrollmentsWithDetails as { id: string; curriculum?: { name: string } | null; student?: { profile?: { name: string | null } } | null }[]).map((e) => [e.id, e]))
    const bookingById = new Map((bookingsWithDetails as { id: string; clinic?: { title: string } | null; student?: { profile?: { name: string | null } } | null }[]).map((b) => [b.id, b]))

    const coursePayments = coursePaymentRows.map((p) => {
      const e = enrollmentById.get(p.enrollmentId ?? '')
      return {
        id: p.paymentId,
        type: 'course' as const,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        createdAt: p.createdAt,
        paidAt: p.paidAt,
        description: e?.curriculum?.name ?? null,
        studentName: e?.student?.profile?.name ?? null,
      }
    })

    const clinicPayments = clinicPaymentRows.map((p) => {
      const b = bookingById.get(p.bookingId ?? '')
      return {
        id: p.paymentId,
        type: 'clinic' as const,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        createdAt: p.createdAt,
        paidAt: p.paidAt,
        description: b?.clinic?.title ?? null,
        studentName: b?.student?.profile?.name ?? null,
      }
    })

    const budgetPayments = familyPaymentsRaw.map((p: any) => ({
      id: p.id,
      type: 'budget' as const,
      amount: p.amount,
      currency: family.defaultCurrency,
      status: p.status,
      createdAt: p.createdAt,
      method: p.method,
    }))

    const allPayments = [...coursePayments, ...clinicPayments, ...budgetPayments].sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const totalSpent = allPayments
      .filter(
        (p: any) =>
          p.status?.toUpperCase() === 'COMPLETED' ||
          p.status?.toLowerCase() === 'paid'
      )
      .reduce((s: any, p: any) => s + p.amount, 0)

    const data = {
      payments: allPayments.slice(0, 50),
      summary: {
        totalSpent,
        monthlyBudget: family.monthlyBudget,
        currency: family.defaultCurrency,
      },
    }

    await cacheManager.set(cacheKey, data, { ttl: CACHE_TTL, tags: [`family:${family.id}`] })
    return NextResponse.json({ success: true, data })
  },
  { role: 'PARENT' }
)
