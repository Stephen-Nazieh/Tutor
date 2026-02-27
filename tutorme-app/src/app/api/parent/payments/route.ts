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

    const [familyPaymentsRaw, enrollments, bookings] = await Promise.all([
      drizzleDb.query.familyPayment.findMany({
        where: eq(familyPayment.parentId, family.id),
        orderBy: [desc(familyPayment.createdAt)],
        limit: 50,
      }),
      family.studentIds.length > 0
        ? drizzleDb.query.curriculumEnrollment.findMany({
          where: inArray(curriculumEnrollment.studentId, family.studentIds),
          with: {
            payments: true,
            student: { with: { profile: { columns: { name: true } } } },
            curriculum: { columns: { name: true } },
          },
        })
        : Promise.resolve([]),
      family.studentIds.length > 0
        ? drizzleDb.query.clinicBooking.findMany({
          where: inArray(clinicBooking.studentId, family.studentIds),
          with: {
            payment: true,
            student: { with: { profile: { columns: { name: true } } } },
            clinic: { columns: { title: true } },
          },
        })
        : Promise.resolve([]),
    ])

    const coursePayments = (enrollments as any[]).flatMap((e: any) =>
      (e.payments || []).map((p: any) => ({
        id: p.id,
        type: 'course' as const,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        createdAt: p.createdAt,
        paidAt: p.paidAt,
        description: e.curriculum?.name,
        studentName: e.student?.profile?.name ?? null,
      }))
    )

    const clinicPayments = (bookings as any[])
      .filter((b: any) => b.payment)
      .map((b: any) => ({
        id: b.payment!.id,
        type: 'clinic' as const,
        amount: b.payment!.amount,
        currency: b.payment!.currency,
        status: b.payment!.status,
        createdAt: b.payment!.createdAt,
        paidAt: b.payment!.paidAt,
        description: b.clinic?.title,
        studentName: b.student?.profile?.name ?? null,
      }))

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
