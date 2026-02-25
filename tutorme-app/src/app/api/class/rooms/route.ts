/**
 * Class Room Management API
 * Creates and manages video rooms for live class sessions
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { CreateRoomSchema, validateRequest } from '@/lib/validation/schemas'
import { dailyProvider } from '@/lib/video/daily-provider'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

// POST /api/class/rooms - Create a new class room
export const POST = withCsrf(withAuth(async (req, session) => {
  // Validate request body
  const data = await validateRequest(req, CreateRoomSchema)
  const scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : new Date()
  const isScheduledForFuture = scheduledAt.getTime() > Date.now()

  if (data.curriculumId) {
    const ownedCurriculum = await db.curriculum.findFirst({
      where: {
        id: data.curriculumId,
        creatorId: session.user.id,
      },
      select: { id: true, subject: true },
    })
    if (!ownedCurriculum) {
      return NextResponse.json(
        { error: 'Invalid curriculum selection for this tutor' },
        { status: 400 }
      )
    }
  }

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
      curriculumId: data.curriculumId || null,
      title: data.title || `${data.subject} Class`,
      subject: data.subject,
      description: data.description || null,
      gradeLevel: data.gradeLevel || null,
      type: 'GROUP',
      roomUrl: room.url,
      roomId: room.id,
      maxStudents: data.maxStudents,
      scheduledAt,
      status: isScheduledForFuture ? 'SCHEDULED' : 'ACTIVE'
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
  const where: Prisma.LiveSessionWhereInput = {
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
  const activeSessions = (
    await Promise.all(
      sessions.map(async (s) => {
        if (!s.roomId) return null
        const isActive = await dailyProvider.isRoomActive(s.roomId)
        return isActive ? s : null
      })
    )
  ).filter((s): s is (typeof sessions)[number] => s !== null)

  return NextResponse.json({ sessions: activeSessions })
})
