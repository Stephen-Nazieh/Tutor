/**
 * GET /api/tutor/courses/[id]/sessions
 * Returns all sessions (live classes) for a specific course
 */

import { NextResponse } from 'next/server'
import { eq, and, asc } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable } from '@/lib/db/schema'

export const GET = withAuth(
  async (req, { user }) => {
    const tutorId = user.id
    const courseId = req.nextUrl.pathname.split('/').slice(-2)[0]

    const sessions = await drizzleDb.query.liveSession.findMany({
      where: and(eq(liveSessionTable.tutorId, tutorId), eq(liveSessionTable.courseId, courseId)),
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
