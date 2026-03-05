/**
 * Get a specific student's whiteboard
 *
 * GET /api/sessions/[sessionId]/whiteboard/[studentId]
 * Tutor can view any student's whiteboard; students can only view if public
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage, profile, liveSession, sessionParticipant } from '@/lib/db/schema'
import { eq, and, asc } from 'drizzle-orm'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const sessionId = await getParamAsync(context?.params, 'sessionId')
  const studentId = await getParamAsync(context?.params, 'studentId')
  if (!sessionId || !studentId) return NextResponse.json({ error: 'Session and student ID required' }, { status: 400 })
  const userId = session.user.id
  const userRole = session.user.role

  const [sessionRow] = await drizzleDb
    .select({ tutorId: liveSession.tutorId })
    .from(liveSession)
    .where(eq(liveSession.id, sessionId))
    .limit(1)
  if (!sessionRow) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  if (userRole === 'TUTOR' && sessionRow.tutorId !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  if (userRole === 'STUDENT') {
    const [participant] = await drizzleDb
      .select({ id: sessionParticipant.id })
      .from(sessionParticipant)
      .where(and(eq(sessionParticipant.sessionId, sessionId), eq(sessionParticipant.studentId, userId)))
      .limit(1)
    if (!participant) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const [whiteboardRow] = await drizzleDb
    .select()
    .from(whiteboard)
    .where(
      and(
        eq(whiteboard.sessionId, sessionId),
        eq(whiteboard.tutorId, studentId),
        eq(whiteboard.ownerType, 'student')
      )
    )
    .limit(1)

  if (!whiteboardRow) {
    return NextResponse.json(
      { error: 'Whiteboard not found' },
      { status: 404 }
    )
  }

  if (userRole === 'TUTOR') {
    if (whiteboardRow.visibility === 'private') {
      return NextResponse.json(
        { error: 'Whiteboard is private' },
        { status: 403 }
      )
    }
  } else {
    if (studentId === userId) {
      const pages = await drizzleDb
        .select()
        .from(whiteboardPage)
        .where(eq(whiteboardPage.whiteboardId, whiteboardRow.id))
        .orderBy(asc(whiteboardPage.order))
      return NextResponse.json({
        whiteboard: { ...whiteboardRow, pages },
      })
    }
    if (whiteboardRow.visibility !== 'public') {
      return NextResponse.json(
        { error: 'Whiteboard is not public' },
        { status: 403 }
      )
    }
  }

  const pages = await drizzleDb
    .select()
    .from(whiteboardPage)
    .where(eq(whiteboardPage.whiteboardId, whiteboardRow.id))
    .orderBy(asc(whiteboardPage.order))

  const [profileRow] = await drizzleDb
    .select({ name: profile.name })
    .from(profile)
    .where(eq(profile.userId, studentId))
    .limit(1)

  return NextResponse.json({
    whiteboard: {
      ...whiteboardRow,
      pages,
      studentName: profileRow?.name ?? 'Unknown',
    },
  })
})
