/**
 * DELETE /api/tutor/classes/:id
 * Cancels/deletes a class session. Only the tutor who created the class can delete it.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'

function normalizeCourseText(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b(live|class|session|clinic)\b/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * GET /api/tutor/classes/:id
 * Returns a tutor-owned class with participants/messages for live hub bootstrapping.
 */
export const GET = withAuth(async (req, session, context: any) => {
  const tutorId = session.user.id
  const { id: classId } = await params

  const liveSession = await db.liveSession.findFirst({
    where: {
      id: classId,
      tutorId,
    },
    include: {
      participants: {
        include: {
          student: {
            include: { profile: true },
          },
        },
      },
      messages: {
        include: {
          user: {
            include: { profile: true },
          },
        },
        orderBy: { timestamp: 'asc' },
        take: 200,
      },
    },
  })

  if (!liveSession) {
    return NextResponse.json(
      { error: 'Class not found or you do not have permission to view it' },
      { status: 404 }
    )
  }

  const messagesByUser = new Map<string, number>()
  for (const m of liveSession.messages) {
    messagesByUser.set(m.userId, (messagesByUser.get(m.userId) || 0) + 1)
  }

  const students = liveSession.participants.map((p) => {
    const chatCount = messagesByUser.get(p.studentId) || 0
    const engagementScore = Math.max(20, Math.min(100, 40 + chatCount * 12))
    const attentionLevel = engagementScore >= 80 ? 'high' : engagementScore >= 55 ? 'medium' : 'low'
    const lastMessage = [...liveSession.messages].reverse().find((m) => m.userId === p.studentId)
    const displayName = p.student.profile?.name || p.student.email || 'Student'

    return {
      id: p.studentId,
      name: displayName,
      status: p.leftAt ? 'offline' : 'online',
      engagementScore,
      handRaised: false,
      attentionLevel,
      lastActive: (lastMessage?.timestamp || p.joinedAt).toISOString(),
      joinedAt: p.joinedAt.toISOString(),
      reactions: 0,
      chatMessages: chatCount,
    }
  })

  const activeStudents = students.filter((s) => s.status === 'online')
  const averageEngagement = activeStudents.length > 0
    ? Math.round(activeStudents.reduce((sum, s) => sum + s.engagementScore, 0) / activeStudents.length)
    : 0

  const classStart = liveSession.startedAt || liveSession.scheduledAt || new Date()
  const classDuration = Math.max(0, Math.floor((Date.now() - classStart.getTime()) / 60000))

  const tutorCourses = await db.curriculum.findMany({
    where: {
      creatorId: tutorId,
      subject: liveSession.subject,
    },
    select: {
      id: true,
      name: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  })

  const normalizedSessionTitle = normalizeCourseText(liveSession.title || '')
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
  const deterministicLinkedCourseId = liveSession.curriculumId || linkedCourse?.id || null

  return NextResponse.json({
    session: {
      id: liveSession.id,
      title: liveSession.title,
      subject: liveSession.subject,
      status: liveSession.status,
      roomId: liveSession.roomId,
      roomUrl: liveSession.roomUrl,
      scheduledAt: liveSession.scheduledAt?.toISOString() || null,
      startedAt: liveSession.startedAt?.toISOString() || null,
      maxStudents: liveSession.maxStudents,
      linkedCourseId: deterministicLinkedCourseId,
    },
    students,
    messages: liveSession.messages.map((m) => ({
      id: m.id,
      studentId: m.userId,
      studentName: m.user.profile?.name || m.user.email || 'User',
      content: m.content,
      timestamp: m.timestamp.toISOString(),
      sentiment: 'neutral',
      isQuestion: m.content.includes('?'),
      isPinned: false,
    })),
    metrics: {
      totalStudents: students.length,
      activeStudents: activeStudents.length,
      averageEngagement,
      participationRate: students.length > 0 ? Math.round((activeStudents.length / students.length) * 100) : 0,
      totalChatMessages: liveSession.messages.length,
      classDuration,
      classStartTime: classStart.toISOString(),
      veryEngaged: students.filter((s) => s.engagementScore >= 85).length,
      engaged: students.filter((s) => s.engagementScore >= 60 && s.engagementScore < 85).length,
      passive: students.filter((s) => s.engagementScore >= 30 && s.engagementScore < 60).length,
      disengaged: students.filter((s) => s.engagementScore < 30).length,
      engagementTrend: 'stable',
    },
    alerts: [],
  })
}, { role: 'TUTOR' })

/**
 * POST /api/tutor/classes/:id
 * Starts the class (sets status ACTIVE and startedAt if needed).
 */
export const POST = withCsrf(withAuth(async (req, session, context: any) => {
  const tutorId = session.user.id
  const { id: classId } = await params

  const liveSession = await db.liveSession.findFirst({
    where: {
      id: classId,
      tutorId,
    },
  })

  if (!liveSession) {
    return NextResponse.json(
      { error: 'Class not found or you do not have permission to start it' },
      { status: 404 }
    )
  }

  if (liveSession.status === 'COMPLETED') {
    return NextResponse.json({ error: 'Cannot start a completed class' }, { status: 400 })
  }

  const updated = await db.liveSession.update({
    where: { id: classId },
    data: {
      status: 'ACTIVE',
      startedAt: liveSession.startedAt || new Date(),
    },
  })

  return NextResponse.json({
    session: {
      id: updated.id,
      status: updated.status,
      startedAt: updated.startedAt?.toISOString() || null,
      roomId: updated.roomId,
      roomUrl: updated.roomUrl,
    },
  })
}, { role: 'TUTOR' }))

export const DELETE = withAuth(async (req, session, context: any) => {
  const tutorId = session.user.id
  const { id: classId } = await params

  try {
    // Check if the class exists and belongs to this tutor
    const liveSession = await db.liveSession.findFirst({
      where: {
        id: classId,
        tutorId,
      },
    })

    if (!liveSession) {
      return NextResponse.json(
        { error: 'Class not found or you do not have permission to delete it' },
        { status: 404 }
      )
    }

    // Check if class is already active or completed
    if (liveSession.status === 'ACTIVE') {
      return NextResponse.json(
        { error: 'Cannot delete an active class. Please end the class first.' },
        { status: 400 }
      )
    }

    if (liveSession.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Cannot delete a completed class' },
        { status: 400 }
      )
    }

    // Delete the class (cascade will handle related records)
    await db.liveSession.delete({
      where: { id: classId },
    })

    return NextResponse.json({ message: 'Class deleted successfully' })
  } catch (error) {
    console.error('Error deleting class:', error)
    return NextResponse.json(
      { error: 'Failed to delete class' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
