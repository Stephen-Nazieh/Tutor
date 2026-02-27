/**
 * GET /api/tutor/stats
 * Returns aggregate stats for the current tutor: total classes, students, upcoming classes, earnings.
 *
 * "Upcoming" count: sessions where scheduledAt >= now OR status = ACTIVE (same as GET /api/tutor/classes).
 */

import { NextResponse } from 'next/server'
import { eq, and, or, gte, inArray, count, sql } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  profile,
  liveSession,
  sessionParticipant,
  payment,
  clinicBooking,
  clinic
} from '@/lib/db/schema'

export const GET = withAuth(async (_req, session) => {
  const tutorId = session.user.id
  const now = new Date()

  try {
    const [
      profileData,
      totalClassesRes,
      sessionIdsRes,
      upcomingCountRes,
      directPayments,
      clinicPaymentsRes
    ] = await Promise.all([
      drizzleDb.select({ currency: profile.currency })
        .from(profile)
        .where(eq(profile.userId, tutorId))
        .limit(1),

      drizzleDb.select({ value: count() })
        .from(liveSession)
        .where(eq(liveSession.tutorId, tutorId)),

      drizzleDb.select({ id: liveSession.id })
        .from(liveSession)
        .where(eq(liveSession.tutorId, tutorId)),

      drizzleDb.select({ value: count() })
        .from(liveSession)
        .where(
          and(
            eq(liveSession.tutorId, tutorId),
            or(gte(liveSession.scheduledAt, now), eq(liveSession.status, 'ACTIVE'))
          )
        ),

      drizzleDb.select({ amount: payment.amount })
        .from(payment)
        .where(
          and(
            eq(payment.status, 'COMPLETED'),
            eq(payment.tutorId, tutorId)
          )
        ),

      drizzleDb.select({ amount: payment.amount })
        .from(payment)
        .innerJoin(clinicBooking, eq(clinicBooking.id, payment.bookingId))
        .innerJoin(clinic, eq(clinic.id, clinicBooking.clinicId))
        .where(
          and(
            eq(payment.status, 'COMPLETED'),
            eq(clinic.tutorId, tutorId)
          )
        )
    ])

    const totalClasses = Number(totalClassesRes[0]?.value || 0)
    const upcomingCount = Number(upcomingCountRes[0]?.value || 0)
    const sessionIds = sessionIdsRes.map(s => s.id)

    let totalStudents = 0
    if (sessionIds.length > 0) {
      const participants = await drizzleDb.select({ studentId: sessionParticipant.studentId })
        .from(sessionParticipant)
        .where(inArray(sessionParticipant.sessionId, sessionIds))

      totalStudents = new Set(participants.map((p) => p.studentId)).size
    }

    const directAmount = directPayments.reduce((sum, p) => sum + (p.amount || 0), 0)
    const clinicAmount = clinicPaymentsRes.reduce((sum, p) => sum + (p.amount || 0), 0)
    // Maintain the original logic: earnings is the max of direct vs clinic totals
    // (This seems like odd logic, but we preserve it to match original behavior)
    const earnings = Math.max(directAmount, clinicAmount)
    const currency = profileData[0]?.currency ?? 'SGD'

    return NextResponse.json({
      totalClasses,
      totalStudents,
      upcomingClasses: upcomingCount,
      earnings: Math.round(earnings * 100) / 100,
      currency,
    })
  } catch (error) {
    console.error('Tutor stats fallback due to error:', error)
    return NextResponse.json({
      totalClasses: 0,
      totalStudents: 0,
      upcomingClasses: 0,
      earnings: 0,
      currency: 'SGD',
    })
  }
}, { role: 'TUTOR' })
