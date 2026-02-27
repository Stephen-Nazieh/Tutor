/**
 * GET /api/tutor/classes
 * Returns the current tutor's classes: upcoming (scheduledAt >= now) and active sessions.
 *
 * "Upcoming" definition: all future scheduled sessions plus any currently active session,
 * with no time cap (all future dates). Same definition used for the "Upcoming" stat count.
 */

import { NextResponse } from 'next/server'
import { eq, or, and, gte, asc } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable } from '@/lib/db/schema'

const DEFAULT_DURATION_MINUTES = 60

/** Upcoming = scheduled in the future OR status ACTIVE (no date limit). */
export const GET = withAuth(async (req, session) => {
  const tutorId = session.user.id
  const now = new Date()

  const sessions = await drizzleDb.query.liveSession.findMany({
    where: or(
      and(eq(liveSessionTable.tutorId, tutorId), gte(liveSessionTable.scheduledAt, now)),
      and(eq(liveSessionTable.tutorId, tutorId), eq(liveSessionTable.status, 'ACTIVE'))
    ),
    with: {
      participants: {
        columns: { id: true }
      },
    },
    orderBy: [asc(liveSessionTable.scheduledAt)],
  })

  const classes = sessions.map((s) => ({
    id: s.id,
    title: s.title,
    subject: s.subject,
    scheduledAt: s.scheduledAt?.toISOString() ?? new Date().toISOString(),
    duration: DEFAULT_DURATION_MINUTES,
    maxStudents: s.maxStudents,
    enrolledStudents: s.participants.length,
    status: s.status === 'ACTIVE' ? 'active' : 'upcoming',
  }))

  return NextResponse.json({ classes })
}, { role: 'TUTOR' })
