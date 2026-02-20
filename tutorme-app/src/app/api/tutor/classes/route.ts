/**
 * GET /api/tutor/classes
 * Returns the current tutor's classes: upcoming (scheduledAt >= now) and active sessions.
 *
 * "Upcoming" definition: all future scheduled sessions plus any currently active session,
 * with no time cap (all future dates). Same definition used for the "Upcoming" stat count.
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

const DEFAULT_DURATION_MINUTES = 60

/** Upcoming = scheduled in the future OR status ACTIVE (no date limit). */
export const GET = withAuth(async (req, session) => {
  const tutorId = session.user.id
  const now = new Date()

  const sessions = await db.liveSession.findMany({
    where: {
      tutorId,
      OR: [
        { scheduledAt: { gte: now } },
        { status: 'ACTIVE' },
      ],
    },
    include: {
      _count: { select: { participants: true } },
    },
    orderBy: { scheduledAt: 'asc' },
  })

  const classes = sessions.map((s: typeof sessions[0]) => ({
    id: s.id,
    title: s.title,
    subject: s.subject,
    scheduledAt: s.scheduledAt?.toISOString() ?? new Date().toISOString(),
    duration: DEFAULT_DURATION_MINUTES,
    maxStudents: s.maxStudents,
    enrolledStudents: s._count.participants,
    status: s.status === 'ACTIVE' ? 'active' : 'upcoming',
  }))

  return NextResponse.json({ classes })
}, { role: 'TUTOR' })
