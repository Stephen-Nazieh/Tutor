/**
 * DELETE /api/tutor/classes/:id
 * GET /api/tutor/classes/:id - Class details with participants/messages
 * POST /api/tutor/classes/:id - Start class
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  liveSession,
  sessionParticipant,
  message,
  user,
  profile,
  curriculum,
} from '@/lib/db/schema'
import { eq, and, asc, desc } from 'drizzle-orm'

function normalizeCourseText(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b(live|class|session|clinic)\b/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const tutorId = session.user.id
  const classId = await getParamAsync(context?.params, 'id')
  if (!classId) return NextResponse.json({ error: 'Class ID required' }, { status: 400 })

  const sessionRows = await drizzleDb
    .select()
    .from(liveSession)
    .where(and(eq(liveSession.id, classId), eq(liveSession.tutorId, tutorId)))
    .limit(1)

  const liveSessionRow = sessionRows[0]
  if (!liveSessionRow) {
    return NextResponse.json(
      { error: 'Class not found or you do not have permission to view it' },
      { status: 404 }
    )
  }

  const participants = await drizzleDb
    .select({
      participant: sessionParticipant,
      studentId: sessionParticipant.studentId,
      name: profile.name,
      email: user.email,
    })
    .from(sessionParticipant)
    .innerJoin(user, eq(sessionParticipant.studentId, user.id))
    .leftJoin(profile, eq(profile.userId, user.id))
    .where(eq(sessionParticipant.sessionId, classId))

  const messages = await drizzleDb
    .select({
      msg: message,
      userId: message.userId,
      content: message.content,
      timestamp: message.timestamp,
      userName: profile.name,
      userEmail: user.email,
    })
    .from(message)
    .innerJoin(user, eq(message.userId, user.id))
    .leftJoin(profile, eq(profile.userId, user.id))
    .where(eq(message.sessionId, classId))
    .orderBy(asc(message.timestamp))
    .limit(200)

  const messagesByUser = new Map<string, number>()
  for (const m of messages) {
    messagesByUser.set(m.userId, (messagesByUser.get(m.userId) || 0) + 1)
  }

  const students = participants.map((p) => {
    const chatCount = messagesByUser.get(p.studentId) || 0
    const engagementScore = Math.max(20, Math.min(100, 40 + chatCount * 12))
    const attentionLevel = engagementScore >= 80 ? 'high' : engagementScore >= 55 ? 'medium' : 'low'
    const lastMessage = [...messages].reverse().find((m) => m.userId === p.studentId)
    const displayName = p.name || p.email || 'Student'
    return {
      id: p.studentId,
      name: displayName,
      status: p.participant.leftAt ? 'offline' : 'online',
      engagementScore,
      handRaised: false,
      attentionLevel,
      lastActive: (lastMessage?.timestamp || p.participant.joinedAt)?.toISOString?.() ?? new Date().toISOString(),
      joinedAt: p.participant.joinedAt?.toISOString?.() ?? new Date().toISOString(),
      reactions: 0,
      chatMessages: chatCount,
    }
  })

  const activeStudents = students.filter((s) => s.status === 'online')
  const averageEngagement =
    activeStudents.length > 0
      ? Math.round(
          activeStudents.reduce((sum, s) => sum + s.engagementScore, 0) / activeStudents.length
        )
      : 0

  const classStart = liveSessionRow.startedAt || liveSessionRow.scheduledAt || new Date()
  const classDuration = Math.max(0, Math.floor((Date.now() - new Date(classStart).getTime()) / 60000))

  const tutorCourses = await drizzleDb
    .select({ id: curriculum.id, name: curriculum.name, updatedAt: curriculum.updatedAt })
    .from(curriculum)
    .where(and(eq(curriculum.creatorId, tutorId), eq(curriculum.subject, liveSessionRow.subject)))
    .orderBy(desc(curriculum.updatedAt))
    .limit(50)

  const normalizedSessionTitle = normalizeCourseText(liveSessionRow.title || '')
  const exactNameMatch = tutorCourses.find(
    (course) => normalizeCourseText(course.name) === normalizedSessionTitle
  )
  const containsMatch = tutorCourses.find((course) => {
    const normalizedCourseName = normalizeCourseText(course.name)
    return (
      normalizedCourseName.length > 0 &&
      (normalizedSessionTitle.includes(normalizedCourseName) ||
        normalizedCourseName.includes(normalizedSessionTitle))
    )
  })
  const subjectSingleton = tutorCourses.length === 1 ? tutorCourses[0] : null
  const linkedCourse = exactNameMatch || containsMatch || subjectSingleton || null
  const deterministicLinkedCourseId = liveSessionRow.curriculumId || linkedCourse?.id || null

  return NextResponse.json({
    session: {
      id: liveSessionRow.id,
      title: liveSessionRow.title,
      subject: liveSessionRow.subject,
      status: liveSessionRow.status,
      roomId: liveSessionRow.roomId,
      roomUrl: liveSessionRow.roomUrl,
      scheduledAt: liveSessionRow.scheduledAt?.toISOString?.() ?? null,
      startedAt: liveSessionRow.startedAt?.toISOString?.() ?? null,
      maxStudents: liveSessionRow.maxStudents,
      linkedCourseId: deterministicLinkedCourseId,
    },
    students,
    messages: messages.map((m) => ({
      id: m.msg.id,
      studentId: m.userId,
      studentName: m.userName || m.userEmail || 'User',
      content: m.content,
      timestamp: m.timestamp?.toISOString?.() ?? new Date().toISOString(),
      sentiment: 'neutral',
      isQuestion: m.content?.includes('?'),
      isPinned: false,
    })),
    metrics: {
      totalStudents: students.length,
      activeStudents: activeStudents.length,
      averageEngagement,
      participationRate:
        students.length > 0 ? Math.round((activeStudents.length / students.length) * 100) : 0,
      totalChatMessages: messages.length,
      classDuration,
      classStartTime: classStart?.toISOString?.() ?? new Date().toISOString(),
      veryEngaged: students.filter((s) => s.engagementScore >= 85).length,
      engaged: students.filter((s) => s.engagementScore >= 60 && s.engagementScore < 85).length,
      passive: students.filter((s) => s.engagementScore >= 30 && s.engagementScore < 60).length,
      disengaged: students.filter((s) => s.engagementScore < 30).length,
      engagementTrend: 'stable',
    },
    alerts: [],
  })
}, { role: 'TUTOR' })

export const POST = withCsrf(
  withAuth(async (req: NextRequest, session, context) => {
    const tutorId = session.user.id
    const classId = await getParamAsync(context?.params, 'id')
    if (!classId) return NextResponse.json({ error: 'Class ID required' }, { status: 400 })

    const sessionRows = await drizzleDb
      .select()
      .from(liveSession)
      .where(and(eq(liveSession.id, classId), eq(liveSession.tutorId, tutorId)))
      .limit(1)

    const liveSessionRow = sessionRows[0]
    if (!liveSessionRow) {
      return NextResponse.json(
        { error: 'Class not found or you do not have permission to start it' },
        { status: 404 }
      )
    }

    if (liveSessionRow.status === 'COMPLETED') {
      return NextResponse.json({ error: 'Cannot start a completed class' }, { status: 400 })
    }

    const [updated] = await drizzleDb
      .update(liveSession)
      .set({
        status: 'ACTIVE',
        startedAt: liveSessionRow.startedAt || new Date(),
      })
      .where(eq(liveSession.id, classId))
      .returning()

    return NextResponse.json({
      session: {
        id: updated!.id,
        status: updated!.status,
        startedAt: updated!.startedAt?.toISOString?.() ?? null,
        roomId: updated!.roomId,
        roomUrl: updated!.roomUrl,
      },
    })
  }, { role: 'TUTOR' })
)

export const DELETE = withAuth(async (req: NextRequest, session, context) => {
  const tutorId = session.user.id
  const classId = await getParamAsync(context?.params, 'id')
  if (!classId) return NextResponse.json({ error: 'Class ID required' }, { status: 400 })

  try {
    const sessionRows = await drizzleDb
      .select()
      .from(liveSession)
      .where(and(eq(liveSession.id, classId), eq(liveSession.tutorId, tutorId)))
      .limit(1)

    const liveSessionRow = sessionRows[0]
    if (!liveSessionRow) {
      return NextResponse.json(
        { error: 'Class not found or you do not have permission to delete it' },
        { status: 404 }
      )
    }

    if (liveSessionRow.status === 'ACTIVE') {
      return NextResponse.json(
        { error: 'Cannot delete an active class. Please end the class first.' },
        { status: 400 }
      )
    }

    if (liveSessionRow.status === 'COMPLETED') {
      return NextResponse.json({ error: 'Cannot delete a completed class' }, { status: 400 })
    }

    await drizzleDb.delete(liveSession).where(eq(liveSession.id, classId))

    return NextResponse.json({ message: 'Class deleted successfully' })
  } catch (error) {
    console.error('Error deleting class:', error)
    return NextResponse.json(
      { error: 'Failed to delete class' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
