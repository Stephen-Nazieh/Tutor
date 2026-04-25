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
    // Safely extract courseId whether context.params is a Promise or an object, or fallback to URL parsing
    let courseId = ''
    try {
      const params = await context?.params
      courseId = (params as any)?.id
    } catch (e) {}
    
    if (!courseId) {
      // Fallback string extraction that handles both /sessions and /sessions/ safely
      const parts = req.nextUrl.pathname.split('/').filter(Boolean)
      const sessionsIdx = parts.lastIndexOf('sessions')
      if (sessionsIdx > 0) {
        courseId = parts[sessionsIdx - 1]
      }
    }

    const statusParam = req.nextUrl.searchParams.get('status')
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
      enrolledStudents: s.participants.length,
      status: s.status,
      roomUrl: s.roomUrl,
    }))

    return NextResponse.json({ sessions: formattedSessions })
  },
  { role: 'TUTOR' }
)
