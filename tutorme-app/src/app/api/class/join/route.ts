import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { withAuth, withCsrf, ValidationError, NotFoundError, withRateLimit } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable } from '@/lib/db/schema'
import { dailyProvider } from '@/lib/video/daily-provider'
import { z } from 'zod'

const JoinClassSchema = z.object({
  sessionId: z.string().min(1, 'Session ID required').max(128, 'Session ID too long'),
})

// POST /api/class/join - Join a class session
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const { response: rateLimitResponse } = await withRateLimit(req, 40)
  if (rateLimitResponse) return rateLimitResponse

  const body = await req.json().catch(() => null)
  const parsed = JoinClassSchema.safeParse(body)
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message || 'Invalid request body')
  }
  const { sessionId } = parsed.data

  const [sessionRow] = await drizzleDb
    .select()
    .from(liveSessionTable)
    .where(eq(liveSessionTable.roomId, sessionId))
    .limit(1)

  if (!sessionRow) {
    throw new NotFoundError('Session not found')
  }

  const isOwner = session.user.id === sessionRow.tutorId

  const token = await dailyProvider.createMeetingToken(
    sessionId,
    session.user.id,
    { isOwner }
  )

  return NextResponse.json({
    sessionId: sessionRow.id,
    room: {
      url: sessionRow.roomUrl ?? undefined,
      id: sessionRow.roomId ?? undefined,
    },
    token,
  })
}))
