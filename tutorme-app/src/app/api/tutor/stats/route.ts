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

  const [profile, totalClasses, totalStudentsResult, upcomingCount, earningsResult] = await Promise.all([
    db.profile.findUnique({
      where: { userId: tutorId },
      select: { currency: true },
    }),
    db.liveSession.count({ where: { tutorId } }),
    db.liveSession.findMany({
      where: { tutorId },
      select: { id: true },
    }).then(async (sessions: { id: string }[]) => {
      const sessionIds = sessions.map((s: { id: string }) => s.id)
      const participants = await db.sessionParticipant.findMany({
        where: { sessionId: { in: sessionIds } },
        select: { studentId: true },
      })
      const uniqueStudents = new Set(participants.map((p: { studentId: string }) => p.studentId))
      return uniqueStudents.size
    }),
    db.liveSession.count({
      where: {
        tutorId,
        OR: [
          { scheduledAt: { gte: now } },
          { status: 'ACTIVE' },
        ],
      },
    }),
    db.payment.findMany({
      where: {
        status: 'COMPLETED',
        booking: {
          clinic: { tutorId },
        },
      },
      select: { amount: true },
    }).then((payments: { amount: number }[]) => payments.reduce((sum: number, p: { amount: number }) => sum + p.amount, 0)),
  ])

  const earnings = earningsResult
  const currency = profile?.currency ?? 'SGD'

  return NextResponse.json({
    totalClasses,
    totalStudents: totalStudentsResult,
    upcomingClasses: upcomingCount,
    earnings: Math.round(earnings * 100) / 100,
    currency,
  })
}, { role: 'TUTOR' })
