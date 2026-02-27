/**
 * GET /api/tutor/students-needing-attention
 * Returns students linked to this tutor who need attention.
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, sessionParticipant, quizAttempt, clinic, clinicBooking, user, profile } from '@/lib/db/schema'
import { eq, and, inArray, gte } from 'drizzle-orm'

const QUIZ_LOOKBACK_DAYS = 30
const MISSED_BOOKING_DAYS = 14
const LOW_QUIZ_THRESHOLD = 0.6

function getDisplayName(row: { email: string | null; name: string | null }): string {
  const name = row.name?.trim()
  if (name) return name
  const local = row.email?.split('@')[0]
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

  const tutorSessions = await drizzleDb
    .select({ id: liveSession.id })
    .from(liveSession)
    .where(eq(liveSession.tutorId, tutorId))
  const tutorSessionIds = tutorSessions.map((s) => s.id)

  if (tutorSessionIds.length === 0) {
    return NextResponse.json({ students: [] })
  }

  const participantRows = await drizzleDb
    .select({ studentId: sessionParticipant.studentId })
    .from(sessionParticipant)
    .where(inArray(sessionParticipant.sessionId, tutorSessionIds))
  const tutorStudentIds = [...new Set(participantRows.map((p) => p.studentId))]

  if (tutorStudentIds.length === 0) {
    return NextResponse.json({ students: [] })
  }

  const lowQuizRows = await drizzleDb
    .select({ studentId: quizAttempt.studentId, score: quizAttempt.score, maxScore: quizAttempt.maxScore })
    .from(quizAttempt)
    .where(
      and(
        inArray(quizAttempt.studentId, tutorStudentIds),
        gte(quizAttempt.completedAt, quizSince)
      )
    )

  const lowQuizByStudent = new Map<string, { count: number; recentPct: number }>()
  for (const a of lowQuizRows) {
    const pct = a.maxScore > 0 ? a.score / a.maxScore : 0
    if (pct < LOW_QUIZ_THRESHOLD) {
      const cur = lowQuizByStudent.get(a.studentId)
      if (!cur) lowQuizByStudent.set(a.studentId, { count: 1, recentPct: pct })
      else lowQuizByStudent.set(a.studentId, { count: cur.count + 1, recentPct: pct })
    }
  }

  const tutorClinics = await drizzleDb.select({ id: clinic.id }).from(clinic).where(eq(clinic.tutorId, tutorId))
  const tutorClinicIds = tutorClinics.map((c) => c.id)
  const missedBookingStudentIds: string[] = []
  if (tutorClinicIds.length > 0) {
    const missed = await drizzleDb
      .select({ studentId: clinicBooking.studentId })
      .from(clinicBooking)
      .where(
        and(
          inArray(clinicBooking.clinicId, tutorClinicIds),
          eq(clinicBooking.attended, false),
          gte(clinicBooking.bookedAt, bookingSince)
        )
      )
    missed.forEach((b) => missedBookingStudentIds.push(b.studentId))
  }

  const needAttention = new Map<string, { issue: string; color: string }>()

  for (const [studentId, { count, recentPct }] of lowQuizByStudent) {
    const pct = Math.round(recentPct * 100)
    const issue =
      count >= 3 ? `${count} recent quiz(zes) below 60%` : `Recent quiz score below 60% (${pct}%)`
    needAttention.set(studentId, { issue, color: 'red' })
  }
  for (const studentId of missedBookingStudentIds) {
    const existing = needAttention.get(studentId)
    if (!existing) {
      needAttention.set(studentId, { issue: 'Missed scheduled clinic', color: 'yellow' })
    } else {
      needAttention.set(studentId, { issue: `${existing.issue}; missed clinic`, color: 'red' })
    }
  }

  const userIds = [...needAttention.keys()]
  if (userIds.length === 0) {
    return NextResponse.json({ students: [] })
  }

  const users = await drizzleDb
    .select({
      id: user.id,
      email: user.email,
      name: profile.name,
    })
    .from(user)
    .leftJoin(profile, eq(profile.userId, user.id))
    .where(inArray(user.id, userIds))

  const students = users.map((u) => {
    const att = needAttention.get(u.id)!
    const name = getDisplayName({ email: u.email, name: u.name })
    return {
      id: u.id,
      name,
      initial: getInitial(name),
      color: att.color,
      issue: att.issue,
    }
  })

  return NextResponse.json({ students })
}, { role: 'TUTOR' })
