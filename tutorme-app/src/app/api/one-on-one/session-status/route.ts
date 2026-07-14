/**
 * GET /api/one-on-one/session-status?sessionId=…
 *
 * Lightweight, read-only status for the /call pre-join lobby: when the session
 * opens, whether it's live, and who it's with — without attempting the actual
 * join. Authorized to the session's two participants only.
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, calendarEvent, oneOnOneBookingRequest, profile } from '@/lib/db/schema'

// Match the join endpoint's early-entry window and the launcher's grace.
const EARLY_ENTRY_MS = 20 * 60 * 1000
const LINGER_AFTER_END_MS = 15 * 60 * 1000

export const GET = withAuth(async (req: NextRequest, session) => {
  const sessionId = new URL(req.url).searchParams.get('sessionId')
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
  }
  const userId = session.user.id

  const [ls] = await drizzleDb
    .select({
      sessionId: liveSession.sessionId,
      scheduledAt: liveSession.scheduledAt,
      durationMinutes: liveSession.durationMinutes,
      status: liveSession.status,
      title: liveSession.title,
      tutorId: liveSession.tutorId,
    })
    .from(liveSession)
    .where(eq(liveSession.sessionId, sessionId))
    .limit(1)

  if (!ls) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  // Confirm this is a 1-on-1 (has a booking linked via its calendar event) and
  // that the caller is one of its two participants.
  const [booking] = await drizzleDb
    .select({
      studentId: oneOnOneBookingRequest.studentId,
      tutorId: oneOnOneBookingRequest.tutorId,
      status: oneOnOneBookingRequest.status,
    })
    .from(oneOnOneBookingRequest)
    .innerJoin(calendarEvent, eq(calendarEvent.eventId, oneOnOneBookingRequest.calendarEventId))
    .where(eq(calendarEvent.externalId, sessionId))
    .limit(1)

  if (!booking) {
    return NextResponse.json({ error: 'Not a 1-on-1 session' }, { status: 404 })
  }
  const isTutor = booking.tutorId === userId
  if (booking.studentId !== userId && !isTutor) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const now = Date.now()
  const start = ls.scheduledAt ? new Date(ls.scheduledAt).getTime() : NaN
  const end = Number.isFinite(start) ? start + (ls.durationMinutes ?? 60) * 60 * 1000 : NaN
  const opensAt = Number.isFinite(start) ? start - EARLY_ENTRY_MS : NaN
  const live = ls.status === 'active'

  const otherPartyId = isTutor ? booking.studentId : booking.tutorId
  const [other] = await drizzleDb
    .select({ name: profile.name })
    .from(profile)
    .where(eq(profile.userId, otherPartyId))
    .limit(1)

  return NextResponse.json({
    sessionId: ls.sessionId,
    title: ls.title || '1-on-1 Session',
    withName: other?.name || (isTutor ? 'your student' : 'your tutor'),
    viewerIsTutor: isTutor,
    scheduledAt: Number.isFinite(start) ? new Date(start).toISOString() : null,
    opensAt: Number.isFinite(opensAt) ? new Date(opensAt).toISOString() : null,
    live,
    // The tutor may always enter; a student once the session is live or inside
    // the 20-min entry window.
    joinable: isTutor || live || (Number.isFinite(opensAt) && now >= opensAt),
    ended: Number.isFinite(end) && now > end + LINGER_AFTER_END_MS,
  })
})
