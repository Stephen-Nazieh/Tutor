import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return Math.round(value)
}

export const GET = withAuth(async (_req, session) => {
  const tutorId = session.user.id

  const [enrollments, clinicBookings, sessionParticipants] = await Promise.all([
    db.curriculumEnrollment.findMany({
      where: { curriculum: { creatorId: tutorId } },
      select: {
        studentId: true,
        lessonsCompleted: true,
        curriculum: {
          select: {
            lessons: { select: { id: true } },
          },
        },
      },
    }),
    db.clinicBooking.findMany({
      where: { clinic: { tutorId } },
      select: { studentId: true, attended: true },
    }),
    db.sessionParticipant.findMany({
      where: { session: { tutorId } },
      select: { studentId: true, joinedAt: true, leftAt: true },
    }),
  ])

  const studentIds = new Set<string>()
  enrollments.forEach((e) => studentIds.add(e.studentId))
  clinicBookings.forEach((b) => studentIds.add(b.studentId))
  sessionParticipants.forEach((p) => studentIds.add(p.studentId))
  const ids = [...studentIds]

  if (ids.length === 0) {
    return NextResponse.json({ students: [] })
  }

  const [attempts, submissions] = await Promise.all([
    db.quizAttempt.findMany({
      where: { studentId: { in: ids } },
      select: { studentId: true, score: true, maxScore: true },
      take: 5000,
      orderBy: { completedAt: 'desc' },
    }),
    db.taskSubmission.findMany({
      where: { studentId: { in: ids } },
      select: { studentId: true, score: true, maxScore: true, status: true },
      take: 5000,
      orderBy: { submittedAt: 'desc' },
    }),
  ])

  const enrollmentByStudent = new Map<string, { completed: number; total: number }>()
  for (const enrollment of enrollments) {
    const current = enrollmentByStudent.get(enrollment.studentId) ?? { completed: 0, total: 0 }
    current.completed += enrollment.lessonsCompleted
    current.total += enrollment.curriculum.lessons.length
    enrollmentByStudent.set(enrollment.studentId, current)
  }

  const clinicByStudent = new Map<string, { attended: number; total: number }>()
  for (const booking of clinicBookings) {
    const current = clinicByStudent.get(booking.studentId) ?? { attended: 0, total: 0 }
    current.total += 1
    if (booking.attended) current.attended += 1
    clinicByStudent.set(booking.studentId, current)
  }

  const sessionByStudent = new Map<string, { quality: number; total: number }>()
  for (const participant of sessionParticipants) {
    const current = sessionByStudent.get(participant.studentId) ?? { quality: 0, total: 0 }
    current.total += 1
    const durationMs = participant.leftAt ? participant.leftAt.getTime() - participant.joinedAt.getTime() : 30 * 60 * 1000
    current.quality += durationMs >= 10 * 60 * 1000 ? 1 : 0.4
    sessionByStudent.set(participant.studentId, current)
  }

  const attemptsByStudent = new Map<string, { score: number; max: number; count: number }>()
  for (const attempt of attempts) {
    const current = attemptsByStudent.get(attempt.studentId) ?? { score: 0, max: 0, count: 0 }
    current.score += attempt.score
    current.max += attempt.maxScore
    current.count += 1
    attemptsByStudent.set(attempt.studentId, current)
  }

  const submissionByStudent = new Map<string, { submitted: number; total: number; score: number; max: number }>()
  for (const submission of submissions) {
    const current = submissionByStudent.get(submission.studentId) ?? { submitted: 0, total: 0, score: 0, max: 0 }
    current.total += 1
    if (submission.status === 'submitted' || submission.status === 'graded') current.submitted += 1
    if (typeof submission.score === 'number') {
      current.score += submission.score
      current.max += submission.maxScore
    }
    submissionByStudent.set(submission.studentId, current)
  }

  const students = ids.map((studentId) => {
    const enrollment = enrollmentByStudent.get(studentId)
    const clinic = clinicByStudent.get(studentId)
    const session = sessionByStudent.get(studentId)
    const attempt = attemptsByStudent.get(studentId)
    const submission = submissionByStudent.get(studentId)

    const curriculumProgress = enrollment && enrollment.total > 0 ? (enrollment.completed / enrollment.total) * 100 : 0
    const attendanceRate = clinic && clinic.total > 0 ? (clinic.attended / clinic.total) * 100 : 0
    const participationRate = session && session.total > 0 ? (session.quality / session.total) * 100 : 0

    const gradedScorePct = (() => {
      const totalScore = (attempt?.score ?? 0) + (submission?.score ?? 0)
      const totalMax = (attempt?.max ?? 0) + (submission?.max ?? 0)
      if (totalMax <= 0) return 0
      return (totalScore / totalMax) * 100
    })()

    const assignmentCompletion = submission && submission.total > 0 ? (submission.submitted / submission.total) * 100 : 0

    const engagementRate = clampPercent((attendanceRate * 0.4) + (participationRate * 0.6))
    const overallProgress = clampPercent((curriculumProgress * 0.5) + (gradedScorePct * 0.3) + (assignmentCompletion * 0.2))

    const recentRisk: 'low' | 'medium' | 'high' =
      overallProgress < 45 || engagementRate < 40
        ? 'high'
        : overallProgress < 65 || engagementRate < 60
          ? 'medium'
          : 'low'

    return {
      studentId,
      overallProgress,
      engagementRate,
      assignmentCompletion: clampPercent(assignmentCompletion),
      averageScore: clampPercent(gradedScorePct),
      recentRisk,
    }
  })

  return NextResponse.json({ students })
}, { role: 'TUTOR' })
