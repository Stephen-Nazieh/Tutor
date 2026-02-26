/**
 * Join Class Room API
 * Generates meeting token for students to join a class session
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { dailyProvider } from '@/lib/video/daily-provider'
import { db } from '@/lib/db'

// POST /api/class/rooms/[id]/join - Join a class room
export const POST = withCsrf(withAuth(async (req: NextRequest, session, context: any) => {
  const params = await context?.params;
  const { id } = params || {};

  // Find the class session
  const classSession = await db.liveSession.findUnique({
    where: { id },
    include: {
      tutor: {
        include: {
          profile: {
            select: {
              name: true,
              avatarUrl: true
            }
          }
        }
      },
      participants: true
    }
  })

  if (!classSession) {
    throw new NotFoundError('Class session not found')
  }

  if (classSession.status !== 'ACTIVE') {
    throw new ValidationError('Class session is not active')
  }

  // Check if room is at capacity
  if (classSession.participants.length >= classSession.maxStudents) {
    throw new ValidationError('Class session is full')
  }

  // Check if student is already a participant
  const existingParticipant = await db.sessionParticipant.findFirst({
    where: {
      sessionId: id,
      studentId: session.user.id
    }
  })

  if (!existingParticipant) {
    // Add student as participant
    await db.sessionParticipant.create({
      data: {
        sessionId: id,
        studentId: session.user.id,
        joinedAt: new Date()
      }
    })
  }

  // Generate meeting token for student
  if (!classSession.roomId) {
    throw new ValidationError('Room not created yet')
  }
  
  const token = await dailyProvider.createMeetingToken(
    classSession.roomId,
    session.user.id,
    { isOwner: false, durationMinutes: 120 }
  )

  return NextResponse.json({
    session: classSession,
    token,
    roomUrl: classSession.roomUrl
  })
}, { role: 'STUDENT' }))
