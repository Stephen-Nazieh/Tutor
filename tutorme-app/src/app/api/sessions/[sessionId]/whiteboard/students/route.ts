/**
 * Get all visible student whiteboards for a session
 *
 * GET /api/sessions/[sessionId]/whiteboard/students
 * Returns all student whiteboards that are visible to the tutor
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage, profile } from '@/lib/db/schema'
import { eq, and, inArray, asc, desc } from 'drizzle-orm'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = (await context?.params) ?? {}
  const { sessionId } = params

  if (session.user.role !== 'TUTOR') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const whiteboards = await drizzleDb
    .select()
    .from(whiteboard)
    .where(
      and(
        eq(whiteboard.sessionId, sessionId),
        eq(whiteboard.ownerType, 'student'),
        inArray(whiteboard.visibility, ['tutor-only', 'public'])
      )
    )
    .orderBy(desc(whiteboard.updatedAt))

  const studentIds = whiteboards.map((wb) => wb.tutorId)
  if (studentIds.length === 0) {
    return NextResponse.json({ whiteboards: [] })
  }

  const profiles = await drizzleDb
    .select({ userId: profile.userId, name: profile.name })
    .from(profile)
    .where(inArray(profile.userId, studentIds))

  const studentMap = new Map(
    profiles.map((p) => [p.userId, p.name ?? 'Unknown'])
  )

  const formattedWhiteboards = await Promise.all(
    whiteboards.map(async (wb) => {
      const pages = await drizzleDb
        .select()
        .from(whiteboardPage)
        .where(eq(whiteboardPage.whiteboardId, wb.id))
        .orderBy(asc(whiteboardPage.order))
        .limit(1)
      return {
        id: wb.id,
        studentId: wb.tutorId,
        studentName: studentMap.get(wb.tutorId) ?? 'Unknown',
        visibility: wb.visibility,
        title: wb.title,
        pages,
        updatedAt: wb.updatedAt,
      }
    })
  )

  return NextResponse.json({ whiteboards: formattedWhiteboards })
})
