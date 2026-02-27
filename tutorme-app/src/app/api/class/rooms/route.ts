/**
 * Class Room Management API
 * Creates and manages video rooms for live class sessions
 */

import { NextResponse } from 'next/server'
import { eq, and, gte, or, isNull, desc, SQL } from 'drizzle-orm'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { CreateRoomSchema, validateRequest } from '@/lib/validation/schemas'
import { dailyProvider } from '@/lib/video/daily-provider'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, curriculum, user, profile, sessionParticipant } from '@/lib/db/schema'
import crypto from 'crypto'

// POST /api/class/rooms - Create a new class room
export const POST = withCsrf(withAuth(async (req, session) => {
  // Validate request body
  const data = await validateRequest(req, CreateRoomSchema)
  const scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : new Date()
  const isScheduledForFuture = scheduledAt.getTime() > Date.now()

  if (data.curriculumId) {
    const [ownedCurriculum] = await drizzleDb
      .select({ id: curriculum.id, subject: curriculum.subject })
      .from(curriculum)
      .where(
        and(
          eq(curriculum.id, data.curriculumId),
          eq(curriculum.creatorId, session.user.id)
        )
      )
      .limit(1)

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
  const [classSessionResult] = await drizzleDb.insert(liveSession).values({
    id: crypto.randomUUID(),
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
  }).returning()

  return NextResponse.json({
    session: classSessionResult,
    room: {
      ...room,
      token: tutorToken
    }
  })
}, { role: 'TUTOR' }))


// GET /api/class/rooms - List active class rooms
export const GET = withAuth(async (req, session) => {
  const { searchParams } = new URL(req.url)
  const subject = searchParams.get('subject')
  const tutorId = searchParams.get('tutorId')
  const gradeLevel = searchParams.get('gradeLevel')

  // Build filter
  const filtersOfRequest: SQL[] = [
    eq(liveSession.status, 'ACTIVE'),
    gte(liveSession.scheduledAt, new Date(Date.now() - 4 * 60 * 60 * 1000))
  ]

  if (subject) filtersOfRequest.push(eq(liveSession.subject, subject))
  if (tutorId) filtersOfRequest.push(eq(liveSession.tutorId, tutorId))
  if (gradeLevel) filtersOfRequest.push(eq(liveSession.gradeLevel, gradeLevel))

  // For students, also include classes that match their grade level or have no grade specified
  if (session.user.role === 'STUDENT' && !gradeLevel) {
    const [studentUser] = await drizzleDb
      .select({ gradeLevel: profile.gradeLevel })
      .from(user)
      .innerJoin(profile, eq(profile.userId, user.id))
      .where(eq(user.id, session.user.id))
      .limit(1)

    const studentGrade = studentUser?.gradeLevel
    if (studentGrade) {
      const gradeFilter = or(
        eq(liveSession.gradeLevel, studentGrade),
        isNull(liveSession.gradeLevel)
      )
      if (gradeFilter) filtersOfRequest.push(gradeFilter)
    }
  }

  // Fetch sessions with tutor info
  // Since participants is a relation, and we don't have 'with' defined, 
  // we'll fetch sessions and then participants if needed, or just sessions with tutor.
  const sessions = await drizzleDb
    .select({
      session: liveSession,
      tutorName: profile.name,
      tutorAvatar: profile.avatarUrl,
    })
    .from(liveSession)
    .innerJoin(user, eq(user.id, liveSession.tutorId))
    .innerJoin(profile, eq(profile.userId, user.id))
    .where(filtersOfRequest.length > 0 ? and(...filtersOfRequest) : undefined)
    .orderBy(desc(liveSession.scheduledAt))

  // Filter out expired rooms and format
  const activeSessions = (
    await Promise.all(
      sessions.map(async (row) => {
        const s = row.session
        if (!s.roomId) return null
        const isActive = await dailyProvider.isRoomActive(s.roomId)
        if (!isActive) return null

        return {
          ...s,
          tutor: {
            profile: {
              name: row.tutorName,
              avatarUrl: row.tutorAvatar
            }
          }
        }
      })
    )
  ).filter((s): s is any => s !== null)

  return NextResponse.json({ sessions: activeSessions })
})
