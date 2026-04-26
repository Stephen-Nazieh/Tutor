/**
 * GET /api/tutor/courses/[id]/sessions
 * Returns all sessions (live classes) for a specific course
 */

import { NextResponse } from 'next/server'
import { eq, and, asc, inArray, sql } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable, sessionParticipant } from '@/lib/db/schema'

export const GET = withAuth(
  async (req, session, context) => {
    const tutorId = session.user.id
    
    // Ultimate source of truth: extract directly from the URL pathname to avoid Next.js param bugs
    const safeUrl = req.nextUrl?.href || req.url || ''
    
    // Extract the ID robustly using RegExp: matches /courses/<id>/sessions
    const match = safeUrl.match(/\/courses\/([^/]+)\/sessions/)
    const courseId = match ? match[1] : ''

    if (!courseId || courseId === 'undefined' || courseId === 'null') {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const urlObj = new URL(safeUrl, 'http://localhost:3000')
    const statusParam = urlObj.searchParams.get('status')
    const allowedStatuses = statusParam
      ? statusParam
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
      : ['scheduled', 'active']

    try {
      // Build where conditions dynamically
      const conditions = [
        eq(liveSessionTable.tutorId, tutorId),
        eq(liveSessionTable.courseId, courseId),
      ]
      if (allowedStatuses.length > 0) {
        conditions.push(
          inArray(
            liveSessionTable.status,
            allowedStatuses as Array<
              'active' | 'scheduled' | 'ended' | 'preparing' | 'live' | 'paused'
            >
          )
        )
      }

      // Use regular select query for reliability
      const sessions = await drizzleDb
        .select()
        .from(liveSessionTable)
        .where(and(...conditions))
        .orderBy(asc(liveSessionTable.scheduledAt))

      // Fetch participant counts separately
      const sessionIds = sessions.map(s => s.sessionId)
      const participants =
        sessionIds.length > 0
          ? await drizzleDb
              .select({ sessionId: sessionParticipant.sessionId })
              .from(sessionParticipant)
              .where(inArray(sessionParticipant.sessionId, sessionIds))
          : []

      const participantCounts = participants.reduce(
        (acc, p) => {
          acc[p.sessionId] = (acc[p.sessionId] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      )

      const formattedSessions = sessions.map(s => ({
        id: s.sessionId,
        title: s.title,
        category: s.category,
        description: s.description,
        scheduledAt: s.scheduledAt?.toISOString() ?? null,
        startedAt: s.startedAt?.toISOString() ?? null,
        endedAt: s.endedAt?.toISOString() ?? null,
        maxStudents: s.maxStudents,
        enrolledStudents: participantCounts[s.sessionId] || 0,
        status: s.status,
        roomUrl: s.roomUrl,
      }))

      return NextResponse.json({ sessions: formattedSessions })
    } catch (err) {
      console.error('[Tutor Sessions API] Error:', err)
      const message = err instanceof Error ? err.message : 'Database query failed'
      return NextResponse.json({ error: message }, { status: 500 })
    }
  },
  { role: 'TUTOR' }
)
