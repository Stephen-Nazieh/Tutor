import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError, withRateLimit } from '@/lib/api/middleware'
import { db } from '@/lib/db'
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

  // Fetch the live session by roomId
  const liveSession = await db.liveSession.findFirst({
    where: { roomId: sessionId }
  })

  if (!liveSession) {
    throw new NotFoundError('Session not found')
  }

  // Create a meeting token
  // Determine properties based on role
  const isOwner = session.user.id === liveSession.tutorId

  const token = await dailyProvider.createMeetingToken(
    liveSession.roomId,
    session.user.id,
    { isOwner }
  )

  return NextResponse.json({
    sessionId: liveSession.id,
    room: {
      url: liveSession.roomUrl,
      id: liveSession.roomId
    },
    token
  })
}))
