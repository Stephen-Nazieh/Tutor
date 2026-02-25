/**
 * Breakout Room API
 * Creates 1:1 breakout rooms for targeted tutoring
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError, withRateLimit } from '@/lib/api/middleware'
import { dailyProvider } from '@/lib/video/daily-provider'
import { db } from '@/lib/db'
import { z } from 'zod'

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

  // Verify the parent session exists and belongs to this tutor
  const parentSession = await db.liveSession.findFirst({
    where: {
      id: parentSessionId,
      tutorId: session.user.id
    }
  })

  if (!parentSession) {
    throw new NotFoundError('Parent session not found')
  }

  // Create breakout room via Daily.co
  const breakoutRoom = await dailyProvider.createBreakoutRoom(
    parentSessionId,
    { durationMinutes }
  )

  // Create tokens for tutor and student
  const tutorToken = await dailyProvider.createMeetingToken(
    breakoutRoom.id,
    session.user.id,
    { isOwner: true, durationMinutes }
  )

  const studentToken = await dailyProvider.createMeetingToken(
    breakoutRoom.id,
    studentId,
    { isOwner: false, durationMinutes }
  )

  // Store breakout room in database
  const room = await db.breakoutRoom.create({
    data: {
      sessionId: parentSessionId,
      name: `Breakout-${breakoutRoom.id.slice(-6)}`,
      aiEnabled: true,
      aiMode: 'passive',
      status: 'active',
      endsAt: new Date(Date.now() + durationMinutes * 60 * 1000)
    }
  })

  // Create assignment for student
  await db.breakoutRoomAssignment.create({
    data: {
      roomId: room.id,
      studentId: studentId
    }
  })

  return NextResponse.json({
    breakoutRoom: {
      id: room.id,
      dailyRoomId: breakoutRoom.id,
      url: breakoutRoom.url,
      tutorToken,
      studentToken
    }
  })
}, { role: 'TUTOR' }))
