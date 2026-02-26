/**
 * GET /api/parent/payments
 * Payment history for family (FamilyPayment + Payment via children enrollments/bookings)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { db } from '@/lib/db'
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

    const [familyPayments, enrollments, bookings] = await Promise.all([
      db.familyPayment.findMany({
        where: { parentId: family.id },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      family.studentIds.length > 0
        ? db.curriculumEnrollment.findMany({
          where: { studentId: { in: family.studentIds } },
          include: {
            payments: true,
            student: { select: { profile: { select: { name: true } } } },
            curriculum: { select: { name: true } },
          },
        })
        : [],
      family.studentIds.length > 0
        ? db.clinicBooking.findMany({
          where: { studentId: { in: family.studentIds } },
          include: {
            payment: true,
            student: { select: { profile: { select: { name: true } } } },
            clinic: { select: { title: true } },
          },
        })
        : [],
    ])

    const coursePayments = enrollments.flatMap((e: any) =>
      e.payments.map((p: any) => ({
        id: p.id,
        type: 'course' as const,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        createdAt: p.createdAt,
        paidAt: p.paidAt,
        description: e.curriculum.name,
        studentName: e.student.profile?.name ?? null,
      }))
    )

    const clinicPayments = bookings
      .filter((b: any) => b.payment)
      .map((b: any) => ({
        id: b.payment!.id,
        type: 'clinic' as const,
        amount: b.payment!.amount,
        currency: b.payment!.currency,
        status: b.payment!.status,
        createdAt: b.payment!.createdAt,
        paidAt: b.payment!.paidAt,
        description: b.clinic.title,
        studentName: b.student.profile?.name ?? null,
      }))

    const budgetPayments = familyPayments.map((p: any) => ({
      id: p.id,
      type: 'budget' as const,
      amount: p.amount,
      currency: family.defaultCurrency,
      status: p.status,
      createdAt: p.createdAt,
      method: p.method,
    }))

    const allPayments = [...coursePayments, ...clinicPayments, ...budgetPayments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const totalSpent = allPayments
      .filter(
        (p: any) =>
          p.status === 'COMPLETED' ||
          p.status === 'completed' ||
          p.status === 'paid'
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
