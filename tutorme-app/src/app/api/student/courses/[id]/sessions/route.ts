import { NextResponse } from 'next/server'
import { eq, and, asc, inArray } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable, courseEnrollment } from '@/lib/db/schema'

export const GET = withAuth(
  async (req, session, context) => {
    const studentId = session.user.id
    
    let courseId = ''
    try {
      const params = await context?.params
      courseId = (params as any)?.id
    } catch (e) {}
    
    if (!courseId) {
      const parts = req.nextUrl.pathname.split('/').filter(Boolean)
      const sessionsIdx = parts.lastIndexOf('sessions')
      if (sessionsIdx > 0) {
        courseId = parts[sessionsIdx - 1]
      }
    }

    // Verify enrollment
    const [enrollment] = await drizzleDb
      .select()
      .from(courseEnrollment)
      .where(
        and(eq(courseEnrollment.courseId, courseId), eq(courseEnrollment.studentId, studentId))
      )
      .limit(1)

    if (!enrollment) {
      return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 403 })
    }

    const sessions = await drizzleDb.query.liveSession.findMany({
      where: eq(liveSessionTable.courseId, courseId),
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
      status: s.status,
      roomId: s.roomId,
      tutorId: s.tutorId,
    }))

    return NextResponse.json({ sessions: formattedSessions })
  },
  { role: 'STUDENT' }
)
