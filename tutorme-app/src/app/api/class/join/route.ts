import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { dailyProvider } from '@/lib/video/daily-provider'

// POST /api/class/join - Join a class session
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const { sessionId } = await req.json()
  
  if (!sessionId) {
    throw new ValidationError('Session ID required')
  }

  // Fetch the live session
  const liveSession = await db.liveSession.findUnique({
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
    room: {
      url: liveSession.roomUrl,
      id: liveSession.roomId
    },
    token
  })
}))
