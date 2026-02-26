// @ts-nocheck
/**
 * GET /api/tutor/stats
 * Returns aggregate stats for the current tutor: total classes, students, upcoming classes, earnings.
 *
 * "Upcoming" count: sessions where scheduledAt >= now OR status = ACTIVE (same as GET /api/tutor/classes).
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (_req, session) => {
  const tutorId = session.user.id
  const now = new Date()

  try {
    const [profile, totalClasses, sessionIds, upcomingCount, directTutorPayments, clinicPayments] = await Promise.all([
      db.profile.findUnique({
        where: { userId: tutorId },
        select: { currency: true },
      }),
      db.liveSession.count({ where: { tutorId } }),
      db.liveSession.findMany({
        where: { tutorId },
        select: { id: true },
      }),
      db.liveSession.count({
        where: {
          tutorId,
          OR: [{ scheduledAt: { gte: now } }, { status: 'ACTIVE' }],
        },
      }),
      db.payment.findMany({
        where: {
          status: 'COMPLETED',
          tutorId,
        },
        select: { amount: true },
      }),
      db.payment.findMany({
        where: {
          status: 'COMPLETED',
          booking: {
            clinic: { tutorId },
          },
        },
        select: { amount: true },
      }),
    ])

    let totalStudents = 0
    if (sessionIds.length > 0) {
      const participants = await db.sessionParticipant.findMany({
        where: { sessionId: { in: sessionIds.map((s) => s.id) } },
        select: { studentId: true },
      })
      totalStudents = new Set(participants.map((p) => p.studentId)).size
    }

    const directAmount = directTutorPayments.reduce((sum, p) => sum + p.amount, 0)
    const clinicAmount = clinicPayments.reduce((sum, p) => sum + p.amount, 0)
    const earnings = Math.max(directAmount, clinicAmount)
    const currency = profile?.currency ?? 'SGD'

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
