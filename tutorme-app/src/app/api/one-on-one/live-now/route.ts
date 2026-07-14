/**
 * GET /api/one-on-one/live-now
 *
 * The current user's most imminent confirmed 1-on-1 session — live now or
 * starting soon — for the global Session Launcher. Works for either participant.
 * Returns null when nothing is near, so the launcher stays hidden.
 */

import { NextRequest, NextResponse } from 'next/server'
import { and, eq, or, gte, lte } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { oneOnOneBookingRequest, calendarEvent, liveSession, profile } from '@/lib/db/schema'

// How early the launcher appears, and how late it lingers after the end.
const LOOKAHEAD_MS = 30 * 60 * 1000 // 30 min before start
const LINGER_AFTER_END_MS = 15 * 60 * 1000 // 15 min after end
// Must match the join endpoint's early-entry window so "Join" only enables when
// the room will actually accept the student.
const EARLY_ENTRY_MS = 20 * 60 * 1000

export const GET = withAuth(async (_req: NextRequest, session) => {
  const userId = session.user.id
  const now = Date.now()

  // Candidate window: sessions scheduled from a few hours ago (so a long/late
  // session still counts) up to the lookahead. End is checked precisely below.
  const from = new Date(now - 4 * 60 * 60 * 1000)
  const until = new Date(now + LOOKAHEAD_MS)

  const rows = await drizzleDb
    .select({
      sessionId: liveSession.sessionId,
      scheduledAt: liveSession.scheduledAt,
      durationMinutes: liveSession.durationMinutes,
      status: liveSession.status,
      requestId: oneOnOneBookingRequest.requestId,
      tutorId: oneOnOneBookingRequest.tutorId,
      studentId: oneOnOneBookingRequest.studentId,
    })
    .from(oneOnOneBookingRequest)
    .innerJoin(calendarEvent, eq(calendarEvent.eventId, oneOnOneBookingRequest.calendarEventId))
    .innerJoin(liveSession, eq(liveSession.sessionId, calendarEvent.externalId))
    .where(
      and(
        eq(oneOnOneBookingRequest.status, 'PAID'),
        or(
          eq(oneOnOneBookingRequest.studentId, userId),
          eq(oneOnOneBookingRequest.tutorId, userId)
        ),
        eq(calendarEvent.isCancelled, false),
        gte(liveSession.scheduledAt, from),
        lte(liveSession.scheduledAt, until)
      )
    )
    .orderBy(liveSession.scheduledAt)

  // Pick the soonest session that is still within its live window.
  const pick = rows.find(r => {
    if (!r.scheduledAt) return false
    const start = new Date(r.scheduledAt).getTime()
    const end = start + (r.durationMinutes ?? 60) * 60 * 1000
    return now <= end + LINGER_AFTER_END_MS
  })

  if (!pick || !pick.scheduledAt) {
    return NextResponse.json({ session: null })
  }

  const start = new Date(pick.scheduledAt).getTime()
  const isTutor = pick.tutorId === userId
  const otherPartyId = isTutor ? pick.studentId : pick.tutorId
  const [other] = await drizzleDb
    .select({ name: profile.name })
    .from(profile)
    .where(eq(profile.userId, otherPartyId))
    .limit(1)

  return NextResponse.json({
    session: {
      sessionId: pick.sessionId,
      requestId: pick.requestId,
      scheduledAt: new Date(pick.scheduledAt).toISOString(),
      withName: other?.name || (isTutor ? 'your student' : 'your tutor'),
      viewerIsTutor: isTutor,
      // Live if the session is active, or if we're inside the 20-min entry window.
      joinable: pick.status === 'active' || now >= start - EARLY_ENTRY_MS,
      live: pick.status === 'active',
    },
  })
})
