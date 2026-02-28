/**
 * Join Class Room API
 * Generates meeting token for students to join a class session
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { dailyProvider } from '@/lib/video/daily-provider'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, sessionParticipant, user, profile } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const POST = withCsrf(withAuth(async (req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    throw new ValidationError('Session ID required')
  }

  const [classSessionRow] = await drizzleDb
    .select()
    .from(liveSession)
    .where(eq(liveSession.id, id))
    .limit(1)

  if (!classSessionRow) {
    throw new NotFoundError('Class session not found')
  }

  if (classSessionRow.status !== 'ACTIVE') {
    throw new ValidationError('Class session is not active')
  }

  const participants = await drizzleDb
    .select()
    .from(sessionParticipant)
    .where(eq(sessionParticipant.sessionId, id))

  if (participants.length >= classSessionRow.maxStudents) {
    throw new ValidationError('Class session is full')
  }

  const [existingParticipant] = await drizzleDb
    .select()
    .from(sessionParticipant)
    .where(
      and(
        eq(sessionParticipant.sessionId, id),
        eq(sessionParticipant.studentId, session.user.id)
      )
    )
    .limit(1)

  if (!existingParticipant) {
    await drizzleDb.insert(sessionParticipant).values({
      id: crypto.randomUUID(),
      sessionId: id,
      studentId: session.user.id,
      joinedAt: new Date(),
    })
  }

  if (!classSessionRow.roomId) {
    throw new ValidationError('Room not created yet')
  }

  const token = await dailyProvider.createMeetingToken(
    classSessionRow.roomId,
    session.user.id,
    { isOwner: false, durationMinutes: 120 }
  )

  const [tutorRow] = await drizzleDb
    .select()
    .from(user)
    .where(eq(user.id, classSessionRow.tutorId))
    .limit(1)
  const [tutorProfile] = tutorRow
    ? await drizzleDb
        .select({ name: profile.name, avatarUrl: profile.avatarUrl })
        .from(profile)
        .where(eq(profile.userId, classSessionRow.tutorId))
        .limit(1)
    : [null]

  const classSession = {
    ...classSessionRow,
    tutor: tutorRow ? { profile: tutorProfile } : null,
    participants,
  }

  return NextResponse.json({
    session: classSession,
    token,
    roomUrl: classSessionRow.roomUrl,
  })
}, { role: 'STUDENT' }))
