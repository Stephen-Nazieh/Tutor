/**
 * Class Room Management API
 * Creates and manages video rooms for live class sessions
 */

import { NextResponse } from 'next/server'
import { eq, and, gte, desc, SQL } from 'drizzle-orm'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { CreateRoomSchema, validateRequest } from '@/lib/validation/schemas'
import { dailyProvider } from '@/lib/video/daily-provider'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, course, user, profile, sessionParticipant } from '@/lib/db/schema'
import crypto from 'crypto'

// POST /api/class/rooms - Create a new class room
export const POST = withCsrf(
  withAuth(
    async (req, session) => {
      const userId = session?.user?.id
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized - Please log in' }, { status: 401 })
      }

      try {
        // Validate request body
        const data = await validateRequest(req, CreateRoomSchema)
        const scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : new Date()
        const isScheduledForFuture = scheduledAt.getTime() > Date.now()

        if (data.courseId) {
          const [ownedCourse] = await drizzleDb
            .select({ courseId: course.courseId })
            .from(course)
            .where(and(eq(course.courseId, data.courseId), eq(course.creatorId, userId)))
            .limit(1)

          if (!ownedCourse) {
            return NextResponse.json(
              { error: 'Invalid course selection for this tutor' },
              { status: 400 }
            )
          }
        }

        // Create video room via Daily.co
        // Cap at 10 to stay within Daily.co plan limits (most plans support 10-20)
        let room
        try {
          const maxParticipants = Math.min(data.maxStudents + 1, 10) // +1 for tutor, capped at 10
          room = await dailyProvider.createRoom(userId, {
            maxParticipants,
            durationMinutes: data.durationMinutes,
          })
        } catch (error) {
          console.error('[Class Rooms] Daily.co createRoom error:', error)
          return NextResponse.json(
            { error: 'Video service unavailable. Please try again later.' },
            { status: 503 }
          )
        }

        // Create meeting token for tutor (as owner)
        let tutorToken
        try {
          tutorToken = await dailyProvider.createMeetingToken(room.id, userId, {
            isOwner: true,
            durationMinutes: data.durationMinutes,
          })
        } catch (error) {
          console.error('[Class Rooms] Daily.co createMeetingToken error:', error)
          return NextResponse.json(
            { error: 'Video service unavailable. Please try again later.' },
            { status: 503 }
          )
        }

        const category = data.subject?.trim() || 'General'

        // Store class session in database
        let classSessionResult
        try {
          const [result] = await drizzleDb
            .insert(liveSession)
            .values({
              sessionId: crypto.randomUUID(),
              tutorId: userId,
              courseId: data.courseId || null,
              title: data.title || `${data.subject} Class`,
              category,
              description: data.description || null,
              roomUrl: room.url,
              roomId: room.id,
              maxStudents: data.maxStudents,
              scheduledAt,
              status: isScheduledForFuture ? 'scheduled' : 'active',
            })
            .returning()
          classSessionResult = result
        } catch (error) {
          const rootError = (error as { cause?: Error }).cause ?? error
          const msg = rootError instanceof Error ? rootError.message : String(rootError)
          console.error('[Class Rooms] DB insert failed:', rootError)
          const isSchemaError =
            msg.includes('column') || msg.includes('enum') || msg.includes('does not exist')
          return NextResponse.json(
            {
              error: 'Failed to create session. Please try again.',
              details: msg,
              hint: isSchemaError
                ? 'If this is a schema mismatch, run: psql -f scripts/apply-schema-changes.sql'
                : undefined,
            },
            { status: 500 }
          )
        }

        return NextResponse.json({
          session: classSessionResult,
          room: {
            ...room,
            token: tutorToken,
          },
        })
      } catch (error) {
        if (error instanceof ValidationError) {
          return NextResponse.json({ error: error.message }, { status: 400 })
        }
        console.error('[Class Rooms] Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
    },
    { role: 'TUTOR' }
  )
)

// GET /api/class/rooms - List active class rooms
export const GET = withAuth(async (req, session) => {
  const { searchParams } = new URL(req.url)
  const subject = searchParams.get('subject')
  const tutorId = searchParams.get('tutorId')
  const courseId = searchParams.get('courseId')

  // Build filter
  const filtersOfRequest: SQL[] = [
    eq(liveSession.status, 'active'),
    gte(liveSession.scheduledAt, new Date(Date.now() - 4 * 60 * 60 * 1000)),
  ]

  if (subject) filtersOfRequest.push(eq(liveSession.category, subject))
  if (tutorId) filtersOfRequest.push(eq(liveSession.tutorId, tutorId))
  if (courseId) filtersOfRequest.push(eq(liveSession.courseId, courseId))

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
    .innerJoin(user, eq(user.userId, liveSession.tutorId))
    .innerJoin(profile, eq(profile.userId, user.userId))
    .where(filtersOfRequest.length > 0 ? and(...filtersOfRequest) : undefined)
    .orderBy(desc(liveSession.scheduledAt))

  // Filter out expired rooms and format
  const activeSessions = (
    await Promise.all(
      sessions.map(async row => {
        const s = row.session
        if (!s.roomId) return null
        const isActive = await dailyProvider.isRoomActive(s.roomId)
        if (!isActive) return null

        return {
          ...s,
          tutor: {
            profile: {
              name: row.tutorName,
              avatarUrl: row.tutorAvatar,
            },
          },
        }
      })
    )
  ).filter((s): s is any => s !== null)

  return NextResponse.json({ sessions: activeSessions })
})
