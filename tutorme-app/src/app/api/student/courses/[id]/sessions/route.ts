import { NextResponse } from 'next/server'
import { eq, and, asc, inArray } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable, courseEnrollment } from '@/lib/db/schema'

export const GET = withAuth(async (req, session, context) => {
  const studentId = session.user.id

  const safeUrl = req.nextUrl?.href || req.url || ''
  const match = safeUrl.match(/\/courses\/([^/]+)\/sessions/)
  const courseId = match ? match[1] : ''

  if (!courseId || courseId === 'undefined' || courseId === 'null') {
    return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
  }

  // Verify enrollment
  const [enrollment] = await drizzleDb
    .select()
    .from(courseEnrollment)
    .where(and(eq(courseEnrollment.courseId, courseId), eq(courseEnrollment.studentId, studentId)))
    .limit(1)

  if (!enrollment) {
    return NextResponse.json(
      { error: `Not enrolled in this course. courseId: ${courseId}, studentId: ${studentId}` },
      { status: 403 }
    )
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
})
