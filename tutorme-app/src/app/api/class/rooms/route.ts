/**
 * Class Room Management API
 * Creates and manages video rooms for live class sessions
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { CreateRoomSchema, validateRequest } from '@/lib/validation/schemas'
import { dailyProvider } from '@/lib/video/daily-provider'
import { db } from '@/lib/db'

// POST /api/class/rooms - Create a new class room
export const POST = withCsrf(withAuth(async (req, session) => {
  // Validate request body
  const data = await validateRequest(req, CreateRoomSchema)

  // Create video room via Daily.co
  const room = await dailyProvider.createRoom(session.user.id, {
    maxParticipants: data.maxStudents + 1, // +1 for tutor
    durationMinutes: data.durationMinutes,
    enableRecording: data.enableRecording
  })

  // Create meeting token for tutor (as owner)
  const tutorToken = await dailyProvider.createMeetingToken(
    room.id,
    session.user.id,
    { isOwner: true, durationMinutes: data.durationMinutes }
  )

  // Store class session in database
  const classSession = await db.liveSession.create({
    data: {
      tutorId: session.user.id,
      title: data.title || `${data.subject} Class`,
      subject: data.subject,
      gradeLevel: data.gradeLevel || null,
      type: 'GROUP',
      roomUrl: room.url,
      roomId: room.id,
      maxStudents: data.maxStudents,
      scheduledAt: new Date(),
      status: 'ACTIVE'
    }
  })

  return NextResponse.json({
    session: classSession,
    room: {
      ...room,
      token: tutorToken
    }
  })
}, { role: 'TUTOR' })) // Only tutors can create rooms


// GET /api/class/rooms - List active class rooms
export const GET = withAuth(async (req, session) => {
  const { searchParams } = new URL(req.url)
  const subject = searchParams.get('subject')
  const tutorId = searchParams.get('tutorId')
  const gradeLevel = searchParams.get('gradeLevel')

  // Build filter
  const where: any = {
    status: 'ACTIVE',
    scheduledAt: {
      gte: new Date(Date.now() - 4 * 60 * 60 * 1000) // Started within last 4 hours
    }
  }

  if (subject) where.subject = subject
  if (tutorId) where.tutorId = tutorId
  if (gradeLevel) where.gradeLevel = gradeLevel

  // For students, also include classes that match their grade level or have no grade specified
  if (session.user.role === 'STUDENT' && !gradeLevel) {
    // Get student's profile to find their grade
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: { profile: true }
    })

    const studentGrade = user?.profile?.gradeLevel
    if (studentGrade) {
      where.OR = [
        { gradeLevel: studentGrade },
        { gradeLevel: null }
      ]
    }
  }

  const sessions = await db.liveSession.findMany({
    where,
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
    },
    orderBy: { scheduledAt: 'desc' }
  })

  // Filter out expired rooms
  const activeSessions = sessions.filter((s: any) => {
    return s.roomId && dailyProvider.isRoomActive(s.roomId)
  })

  return NextResponse.json({ sessions: activeSessions })
})

