/**
 * PATCH /api/tutor/sessions/[id]
 * Cancel a specific session
 */

import { NextResponse } from 'next/server'
import { eq, and } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable } from '@/lib/db/schema'

export const PATCH = withAuth(
  async (req, { user }) => {
    const tutorId = user.id
    const sessionId = req.nextUrl.pathname.split('/').pop()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    const body = await req.json().catch(() => ({}))
    const { action, reason } = body

    if (action !== 'cancel') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    // Verify the session belongs to this tutor
    const existingSession = await drizzleDb.query.liveSession.findFirst({
      where: and(eq(liveSessionTable.sessionId, sessionId), eq(liveSessionTable.tutorId, tutorId)),
    })

    if (!existingSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (existingSession.status === 'ended') {
      return NextResponse.json({ error: 'Session has already ended' }, { status: 400 })
    }

    // Mark session as ended with cancellation note
    const cancellationNote = reason ? ` [Cancelled by tutor: ${reason}]` : ' [Cancelled by tutor]'
    const updatedSession = await drizzleDb
      .update(liveSessionTable)
      .set({
        status: 'ended',
        endedAt: new Date(),
        description: (existingSession.description || '') + cancellationNote,
      })
      .where(and(eq(liveSessionTable.sessionId, sessionId), eq(liveSessionTable.tutorId, tutorId)))
      .returning()

    return NextResponse.json({
      message: 'Session cancelled successfully',
      session: updatedSession[0],
    })
  },
  { role: 'TUTOR' }
)
