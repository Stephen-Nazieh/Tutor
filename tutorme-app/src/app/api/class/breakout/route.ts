/**
 * Breakout Room API
 * Creates 1:1 breakout rooms for targeted tutoring
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { dailyProvider } from '@/lib/video/daily-provider'
import { db } from '@/lib/db'

// POST /api/class/breakout - Create a breakout room
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const { parentSessionId, studentId, durationMinutes = 30 } = await req.json()

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
