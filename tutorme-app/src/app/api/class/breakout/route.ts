/**
 * Breakout Room API
 * Creates 1:1 breakout rooms for targeted tutoring
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError, withRateLimit } from '@/lib/api/middleware'
import { dailyProvider } from '@/lib/video/daily-provider'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, breakoutRoom, breakoutRoomAssignment } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { z } from 'zod'
import crypto from 'crypto'

const BreakoutSchema = z.object({
  parentSessionId: z.string().min(1, 'Parent session ID is required').max(128),
  studentId: z.string().min(1, 'Student ID is required').max(128),
  durationMinutes: z.number().int().min(5).max(120).default(30),
})

// POST /api/class/breakout - Create a breakout room
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const { response: rateLimitResponse } = await withRateLimit(req, 20)
  if (rateLimitResponse) return rateLimitResponse

  const body = await req.json().catch(() => null)
  const parsed = BreakoutSchema.safeParse(body)
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message || 'Invalid request body')
  }
  const { parentSessionId, studentId, durationMinutes } = parsed.data

  if (!parentSessionId || !studentId) {
    throw new ValidationError('Parent session ID and student ID are required')
  }

  const [parentSession] = await drizzleDb
    .select()
    .from(liveSession)
    .where(and(eq(liveSession.id, parentSessionId), eq(liveSession.tutorId, session.user.id)))
    .limit(1)

  if (!parentSession) {
    throw new NotFoundError('Parent session not found')
  }

  const breakoutRoomResult = await dailyProvider.createBreakoutRoom(
    parentSessionId,
    { durationMinutes }
  )

  const tutorToken = await dailyProvider.createMeetingToken(
    breakoutRoomResult.id,
    session.user.id,
    { isOwner: true, durationMinutes }
  )

  const studentToken = await dailyProvider.createMeetingToken(
    breakoutRoomResult.id,
    studentId,
    { isOwner: false, durationMinutes }
  )

  const roomId = crypto.randomUUID()
  const assignmentId = crypto.randomUUID()
  await drizzleDb.insert(breakoutRoom).values({
    id: roomId,
    sessionId: parentSessionId,
    name: `Breakout-${breakoutRoomResult.id.slice(-6)}`,
    aiEnabled: true,
    aiMode: 'passive',
    status: 'active',
    endsAt: new Date(Date.now() + durationMinutes * 60 * 1000),
    aiNotes: {},
    alerts: {},
  })
  await drizzleDb.insert(breakoutRoomAssignment).values({
    id: assignmentId,
    roomId,
    studentId,
  })

  return NextResponse.json({
    breakoutRoom: {
      id: roomId,
      dailyRoomId: breakoutRoomResult.id,
      url: breakoutRoomResult.url,
      tutorToken,
      studentToken
    }
  })
}, { role: 'TUTOR' }))
