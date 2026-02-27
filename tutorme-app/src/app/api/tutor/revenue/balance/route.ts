/**
 * Revenue Balance API
 *
 * GET /api/tutor/revenue/balance
 * Returns current available balance and earnings summary
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { payment, payout, clinicBooking, clinic, curriculumEnrollment, curriculum } from '@/lib/db/schema'
import { eq, and, inArray } from 'drizzle-orm'

const COMPLETED = 'COMPLETED'
const PENDING = 'PENDING'
const PROCESSING = 'PROCESSING'

export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id

  const [clinicIdsResult, curriculumIdsResult] = await Promise.all([
    drizzleDb.select({ id: clinic.id }).from(clinic).where(eq(clinic.tutorId, tutorId)),
    drizzleDb.select({ id: curriculum.id }).from(curriculum).where(eq(curriculum.creatorId, tutorId)),
  ])

  const clinicIds = clinicIdsResult.map((c) => c.id)
  const curriculumIds = curriculumIdsResult.map((c) => c.id)

  let bookingIds: string[] = []
  let enrollmentIds: string[] = []

  if (clinicIds.length > 0) {
    const bookings = await drizzleDb
      .select({ id: clinicBooking.id })
      .from(clinicBooking)
      .where(inArray(clinicBooking.clinicId, clinicIds))
    bookingIds = bookings.map((b) => b.id)
  }
  if (curriculumIds.length > 0) {
    const enrollments = await drizzleDb
      .select({ id: curriculumEnrollment.id })
      .from(curriculumEnrollment)
      .where(inArray(curriculumEnrollment.curriculumId, curriculumIds))
    enrollmentIds = enrollments.map((e) => e.id)
  }

  const allCompleted = await drizzleDb
    .select({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      createdAt: payment.createdAt,
      tutorId: payment.tutorId,
      bookingId: payment.bookingId,
      enrollmentId: payment.enrollmentId,
    })
    .from(payment)
    .where(eq(payment.status, COMPLETED))

  const completedPaymentsFiltered = allCompleted.filter(
    (p) =>
      p.tutorId === tutorId ||
      (p.bookingId && bookingIds.includes(p.bookingId)) ||
      (p.enrollmentId && enrollmentIds.includes(p.enrollmentId))
  )

  const allPending = await drizzleDb
    .select({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      tutorId: payment.tutorId,
      bookingId: payment.bookingId,
      enrollmentId: payment.enrollmentId,
    })
    .from(payment)
    .where(inArray(payment.status, [PENDING, PROCESSING]))

  const pendingPaymentsFiltered = allPending.filter(
    (p) =>
      p.tutorId === tutorId ||
      (p.bookingId && bookingIds.includes(p.bookingId)) ||
      (p.enrollmentId && enrollmentIds.includes(p.enrollmentId))
  )

  const payouts = await drizzleDb
    .select({ amount: payout.amount, status: payout.status })
    .from(payout)
    .where(eq(payout.tutorId, tutorId))

  const totalEarnings = completedPaymentsFiltered.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
  const pendingAmount = pendingPaymentsFiltered.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
  const totalPayouts = payouts
    .filter((p) => p.status === COMPLETED)
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
  const pendingPayouts = payouts
    .filter((p) => p.status === PENDING || p.status === PROCESSING)
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

  const availableBalance = totalEarnings - totalPayouts - pendingPayouts

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const thisMonthEarnings = completedPaymentsFiltered
    .filter((p) => p.createdAt && new Date(p.createdAt) >= monthStart)
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
  const lastMonthEarnings = completedPaymentsFiltered
    .filter((p) => {
      const date = p.createdAt ? new Date(p.createdAt) : null
      return date && date >= lastMonthStart && date <= lastMonthEnd
    })
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

  const monthlyChange =
    lastMonthEarnings > 0 ? ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100 : 0

  const recentPayments = completedPaymentsFiltered
    .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      date: p.createdAt,
    }))

  return NextResponse.json({
    balance: {
      available: Math.round(availableBalance * 100) / 100,
      pending: Math.round(pendingAmount * 100) / 100,
      pendingPayouts: Math.round(pendingPayouts * 100) / 100,
      totalEarnings: Math.round(totalEarnings * 100) / 100,
      totalPayouts: Math.round(totalPayouts * 100) / 100,
    },
    thisMonth: {
      earnings: Math.round(thisMonthEarnings * 100) / 100,
      change: Math.round(monthlyChange * 10) / 10,
    },
    recentPayments,
    currency: 'SGD',
  })
}, { role: 'TUTOR' })
