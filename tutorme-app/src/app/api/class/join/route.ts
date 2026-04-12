import { NextRequest, NextResponse } from 'next/server'
import { and, eq, or, sql } from 'drizzle-orm'
import {
  withAuth,
  withCsrf,
  ValidationError,
  NotFoundError,
  withRateLimit,
} from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable, sessionParticipant } from '@/lib/db/schema'
import { dailyProvider } from '@/lib/video/daily-provider'
import { z } from 'zod'
import crypto from 'crypto'

const JoinClassSchema = z.object({
  sessionId: z.string().min(1, 'Session ID required').max(128, 'Session ID too long'),
})

// POST /api/class/join - Join a class session
export const POST = withCsrf(
  withAuth(async (req: NextRequest, session) => {
    const { response: rateLimitResponse } = await withRateLimit(req, 40)
    if (rateLimitResponse) return rateLimitResponse

    const body = await req.json().catch(() => null)
    const parsed = JoinClassSchema.safeParse(body)
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message || 'Invalid request body')
    }
    const { sessionId } = parsed.data

    const sessionRow = await drizzleDb.transaction(async tx => {
      const [row] = await tx
        .select()
        .from(liveSessionTable)
        .where(
          or(eq(liveSessionTable.sessionId, sessionId), eq(liveSessionTable.roomId, sessionId))
        )
        .limit(1)
        .for('update')

      if (!row) {
        throw new NotFoundError('Session not found')
      }

      if (row.status !== 'ACTIVE') {
        throw new ValidationError('Class session is not active')
      }

      const [existingParticipant] = await tx
        .select()
        .from(sessionParticipant)
        .where(
          and(
            eq(sessionParticipant.sessionId, row.sessionId),
            eq(sessionParticipant.studentId, session.user.id)
          )
        )
        .limit(1)

      if (!existingParticipant) {
        const [{ count }] = await tx
          .select({ count: sql<number>`count(*)::int` })
          .from(sessionParticipant)
          .where(eq(sessionParticipant.sessionId, row.sessionId))

        if (count >= row.maxStudents) {
          throw new ValidationError('Class session is full')
        }

        await tx.insert(sessionParticipant).values({
          participantId: crypto.randomUUID(),
          sessionId: row.sessionId,
          studentId: session.user.id,
          joinedAt: new Date(),
        })
      }

      return row
    })

    const isOwner = session.user.id === sessionRow.tutorId
    if (!sessionRow.roomId) {
      throw new ValidationError('Room not created yet')
    }

    const token = await dailyProvider.createMeetingToken(sessionRow.roomId, session.user.id, {
      isOwner,
    })

    return NextResponse.json({
      sessionId: sessionRow.sessionId,
      room: {
        url: sessionRow.roomUrl ?? undefined,
        id: sessionRow.roomId ?? undefined,
      },
      token,
    })
  })
)
