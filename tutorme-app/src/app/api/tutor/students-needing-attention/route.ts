/**
 * GET /api/tutor/students-needing-attention
 * Returns students linked to this tutor who need attention:
 * - Low quiz scores: students in tutor's live sessions with recent QuizAttempt below 60%
 * - Missed clinics: students who booked but did not attend this tutor's clinics (recent)
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

const QUIZ_LOOKBACK_DAYS = 30
const MISSED_BOOKING_DAYS = 14
const LOW_QUIZ_THRESHOLD = 0.6 // below 60%

function getDisplayName(user: { email: string; profile?: { name: string | null } | null }): string {
  const name = user.profile?.name?.trim()
  if (name) return name
  const local = user.email?.split('@')[0]
  return local || 'Student'
}

function getInitial(displayName: string): string {
  return (displayName.charAt(0) || 'S').toUpperCase()
}

export const GET = withAuth(async (_req, session) => {
  const tutorId = session.user.id
  const now = new Date()
  const quizSince = new Date(now.getTime() - QUIZ_LOOKBACK_DAYS * 24 * 60 * 60 * 1000)
  const bookingSince = new Date(now.getTime() - MISSED_BOOKING_DAYS * 24 * 60 * 60 * 1000)

  // Students who have participated in this tutor's live sessions
  const tutorSessionIds = await db.liveSession
    .findMany({ where: { tutorId }, select: { id: true } })
    .then((s: { id: string }[]) => s.map((x: { id: string }) => x.id))

  const participantRows = await db.sessionParticipant.findMany({
    where: { sessionId: { in: tutorSessionIds } },
    select: { studentId: true },
  })
  const tutorStudentIds = [...new Set(participantRows.map((p: { studentId: string }) => p.studentId))]

  if (tutorStudentIds.length === 0) {
    return NextResponse.json({ students: [] })
  }

  // Low quiz: recent attempts below threshold for these students
  const lowQuizStudents = await db.quizAttempt.findMany({
    where: {
      studentId: { in: tutorStudentIds },
      completedAt: { gte: quizSince },
    },
    select: { studentId: true, score: true, maxScore: true },
    orderBy: { completedAt: 'desc' },
  })

  const lowQuizByStudent = new Map<string, { count: number; recentPct: number }>()
  for (const a of lowQuizStudents) {
    const pct = a.maxScore > 0 ? a.score / a.maxScore : 0
    if (pct < LOW_QUIZ_THRESHOLD) {
      const cur = lowQuizByStudent.get(a.studentId)
      if (!cur) lowQuizByStudent.set(a.studentId, { count: 1, recentPct: pct })
      else lowQuizByStudent.set(a.studentId, { count: cur.count + 1, recentPct: pct })
    }
  }

  // Missed clinics: booked but not attended for this tutor's clinics
  const tutorClinicIds = await db.clinic
    .findMany({ where: { tutorId }, select: { id: true } })
    .then((c: { id: string }[]) => c.map((x: { id: string }) => x.id))

  const missedBookingStudentIds: string[] = []
  if (tutorClinicIds.length > 0) {
    const missed = await db.clinicBooking.findMany({
      where: {
        clinicId: { in: tutorClinicIds },
        attended: false,
        bookedAt: { gte: bookingSince },
      },
      select: { studentId: true },
    })
    missed.forEach((b: { studentId: string }) => missedBookingStudentIds.push(b.studentId))
  }

  const needAttention = new Map<
    string,
    { issue: string; color: string }
  >()

  for (const [studentId, { count, recentPct }] of lowQuizByStudent) {
    const pct = Math.round(recentPct * 100)
    const issue =
      count >= 3
        ? `${count} recent quiz(zes) below 60%`
        : `Recent quiz score below 60% (${pct}%)`
    needAttention.set(studentId, { issue, color: 'red' })
  }
  for (const studentId of missedBookingStudentIds) {
    const existing = needAttention.get(studentId)
    if (!existing) {
      needAttention.set(studentId, {
        issue: 'Missed scheduled clinic',
        color: 'yellow',
      })
    } else {
      needAttention.set(studentId, {
        issue: `${existing.issue}; missed clinic`,
        color: 'red',
      })
    }
  }

  const userIds = [...needAttention.keys()]
  if (userIds.length === 0) {
    return NextResponse.json({ students: [] })
  }

  const users = await db.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true, profile: { select: { name: true } } },
  })

  const students = users.map((user: { id: string; email: string; profile: { name: string | null } | null }) => {
    const att = needAttention.get(user.id)!
    const name = getDisplayName(user)
    return {
      id: user.id,
      name,
      initial: getInitial(name),
      color: att.color,
      issue: att.issue,
    }
  })

  return NextResponse.json({ students })
}, { role: 'TUTOR' })
