/**
 * GET /api/tutor/courses/[id]/sessions
 * Returns all sessions (live classes) for a specific course
 */

import { NextResponse } from 'next/server'
import { eq, and, asc, inArray } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable } from '@/lib/db/schema'

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

    const sessions = await drizzleDb.query.liveSession.findMany({
      where: and(
        eq(liveSessionTable.tutorId, tutorId),
        eq(liveSessionTable.courseId, courseId),
        allowedStatuses.length > 0
          ? inArray(
              liveSessionTable.status,
              allowedStatuses as Array<
                'active' | 'scheduled' | 'ended' | 'preparing' | 'live' | 'paused'
              >
            )
          : undefined
      ),
      with: {
        participants: {
          columns: { sessionId: true, studentId: true },
        },
      },
      orderBy: [asc(liveSessionTable.scheduledAt)],
    })

    const formattedSessions = sessions.map(s => ({
      id: s.sessionId,
      title: s.title,
      category: s.category,
      description: s.description,
      scheduledAt: s.scheduledAt?.toISOString() ?? null,
      startedAt: s.startedAt?.toISOString() ?? null,
      endedAt: s.endedAt?.toISOString() ?? null,
      maxStudents: s.maxStudents,
      enrolledStudents: s.participants?.length ?? 0,
      status: s.status,
      roomUrl: s.roomUrl,
    }))

    return NextResponse.json({ sessions: formattedSessions })
  },
  { role: 'TUTOR' }
)
