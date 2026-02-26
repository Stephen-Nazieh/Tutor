/**
 * Student Scores API
 * Uses only existing schema: CurriculumEnrollment, Curriculum, QuizAttempt,
 * TaskSubmission, GeneratedTask, UserGamification.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const studentId = session.user.id

    // Quiz attempts (no Quiz model; use score/maxScore only)
    const quizAttempts = await db.quizAttempt.findMany({
      where: { studentId },
      orderBy: { completedAt: 'desc' },
    })

    // Task submissions (assignments) with task details
    const taskSubmissions = await db.taskSubmission.findMany({
      where: { studentId },
      orderBy: { submittedAt: 'desc' },
    })
    const taskIds = [...new Set(taskSubmissions.map((t: any) => t.taskId))]
    const generatedTasks =
      taskIds.length > 0
        ? await db.generatedTask.findMany({
          where: { id: { in: taskIds } },
          select: { id: true, title: true, type: true },
        })
        : []
    const taskById = new Map(generatedTasks.map((t: any) => [t.id, t]))

    // User gamification (no skills on schema yet; derive placeholder from level/xp)
    const gamification = await db.userGamification.findUnique({
      where: { userId: studentId },
    })

    // Enrolled subjects from CurriculumEnrollment + Curriculum
    const enrollments = await db.curriculumEnrollment.findMany({
      where: { studentId },
      include: {
        curriculum: {
          select: { id: true, name: true, subject: true },
        },
      },
    })

    // Build subject-wise scores keyed by curriculum id (we use curriculum.subject for display)
    const subjectScores = new Map<
      string,
      {
        id: string
        subject: string
        subjectName: string
        totalScore: number
        maxScore: number
        percentage: number
        grade: string
        assignmentsCompleted: number
        assignmentsTotal: number
        quizzesCompleted: number
        quizzesTotal: number
        lastActivity: string
        trend: string
      }
    >()

    enrollments.forEach((enrollment: any) => {
      const c = enrollment.curriculum
      subjectScores.set(c.id, {
        id: c.id,
        subject: c.subject,
        subjectName: c.name,
        totalScore: 0,
        maxScore: 0,
        percentage: 0,
        grade: '-',
        assignmentsCompleted: 0,
        assignmentsTotal: 0,
        quizzesCompleted: 0,
        quizzesTotal: 0,
        lastActivity: enrollment.lastActivity?.toISOString() ?? enrollment.enrolledAt.toISOString(),
        trend: 'stable',
      })
    })

    // QuizAttempt has no subject/quiz relation; attribute by curriculum if we had contentId - we don't.
    // So we only add quiz totals to "overall" or first subject. Plan: aggregate quiz stats per subject
    // by using a synthetic "General" subject if no enrollments, or attach to first subject.
    const firstSubjectId = enrollments[0]?.curriculum?.id
    if (firstSubjectId && subjectScores.has(firstSubjectId)) {
      quizAttempts.forEach((attempt: any) => {
        const score = subjectScores.get(firstSubjectId)!
        score.quizzesTotal++
        score.totalScore += attempt.score ?? 0
        score.maxScore += attempt.maxScore ?? 0
        if (attempt.completedAt) {
          score.quizzesCompleted++
          if (new Date(attempt.completedAt) > new Date(score.lastActivity)) {
            score.lastActivity = attempt.completedAt.toISOString()
          }
        }
      })
    } else if (quizAttempts.length > 0) {
      // No enrollments: create a single "General" subject for quiz-only data
      const generalId = 'general'
      subjectScores.set(generalId, {
        id: generalId,
        subject: 'general',
        subjectName: 'General',
        totalScore: quizAttempts.reduce((s: number, a: any) => s + (a.score ?? 0), 0),
        maxScore: quizAttempts.reduce((s: number, a: any) => s + a.maxScore, 0),
        percentage: 0,
        grade: '-',
        assignmentsCompleted: 0,
        assignmentsTotal: 0,
        quizzesCompleted: quizAttempts.filter((q: any) => q.completedAt).length,
        quizzesTotal: quizAttempts.length,
        lastActivity:
          quizAttempts[0]?.completedAt?.toISOString() ?? new Date().toISOString(),
        trend: 'stable',
      })
    }

    // Task submissions (assignments) - attribute to first subject or general
    taskSubmissions.forEach((sub: any) => {
      const task = taskById.get(sub.taskId)
      const subjectId = firstSubjectId ?? 'general'
      if (!subjectScores.has(subjectId)) {
        subjectScores.set(subjectId, {
          id: subjectId,
          subject: subjectId,
          subjectName: 'General',
          totalScore: 0,
          maxScore: 0,
          percentage: 0,
          grade: '-',
          assignmentsCompleted: 0,
          assignmentsTotal: 0,
          quizzesCompleted: 0,
          quizzesTotal: 0,
          lastActivity: sub.submittedAt.toISOString(),
          trend: 'stable',
        })
      }
      const score = subjectScores.get(subjectId)!
      score.assignmentsTotal++
      if (sub.status === 'graded' && sub.score != null) {
        score.assignmentsCompleted++
        score.totalScore += sub.score
        score.maxScore += sub.maxScore ?? 100
      }
      if (new Date(sub.submittedAt) > new Date(score.lastActivity)) {
        score.lastActivity = sub.submittedAt.toISOString()
      }
    })

    // Compute percentage and grade per subject
    const scores = Array.from(subjectScores.values()).map((score) => {
      if (score.maxScore > 0) {
        score.percentage = Math.round((score.totalScore / score.maxScore) * 100)
        score.grade = calculateGrade(score.percentage)
      }
      return score
    })

    const totalSubjects = scores.length
    const averageScore =
      totalSubjects > 0
        ? Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / totalSubjects)
        : 0
    const totalQuizzes = quizAttempts.filter((q: any) => q.completedAt).length
    const totalAssignments = taskSubmissions.filter(
      (t: any) => t.status === 'graded' && t.score != null
    ).length
    const studyHours = Math.round(
      quizAttempts.reduce((sum: number, q: any) => sum + (q.timeSpent ?? 0), 0) / 3600 +
      taskSubmissions.length * 0.5
    )

    const quizzes = quizAttempts
      .filter((q: any) => q.completedAt)
      .map((q: any, i: number) => ({
        id: q.id,
        quizTitle: `Quiz ${i + 1}`,
        subject: 'General',
        score: q.score ?? 0,
        maxScore: q.maxScore ?? 100,
        percentage: Math.round(((q.score ?? 0) / (q.maxScore ?? 100)) * 100),
        completedAt: q.completedAt,
        timeSpent: q.timeSpent ?? 0,
        status: (q.score ?? 0) >= ((q.maxScore ?? 100) * 0.6) ? 'passed' : 'failed',
      }))

    const formattedAssignments = taskSubmissions.map((a: any) => {
      const task = taskById.get(a.taskId)
      return {
        id: a.id,
        assignmentTitle: (task as any)?.title ?? 'Assignment',
        subject: 'General',
        score: a.status === 'graded' ? a.score : null,
        maxScore: a.maxScore ?? 100,
        status: (a.status?.toLowerCase() ?? 'submitted') as 'submitted' | 'graded' | 'pending',
        submittedAt: a.submittedAt,
        dueDate: (task as any)?.id ? new Date().toISOString() : new Date().toISOString(),
      }
    })

    // Skills: UserGamification has no skill fields; return placeholder from level/xp
    const level = gamification?.level ?? 1
    const xp = gamification?.xp ?? 0
    const nextLevelXp = (level + 1) * 200
    const skills = [
      { name: 'Vocabulary', level, maxLevel: 100, xp, nextLevelXp },
      { name: 'Grammar', level, maxLevel: 100, xp, nextLevelXp },
      { name: 'Speaking', level, maxLevel: 100, xp, nextLevelXp },
      { name: 'Listening', level, maxLevel: 100, xp, nextLevelXp },
      { name: 'Reading', level, maxLevel: 100, xp, nextLevelXp },
      { name: 'Writing', level, maxLevel: 100, xp, nextLevelXp },
    ]

    return NextResponse.json({
      success: true,
      scores,
      quizzes,
      assignments: formattedAssignments,
      skills,
      overallStats: {
        totalSubjects,
        averageScore,
        totalQuizzes,
        totalAssignments,
        studyHours,
      },
    })
  } catch (error) {
    console.error('Error fetching student scores:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch scores' },
      { status: 500 }
    )
  }
}

function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'A'
  if (percentage >= 80) return 'B'
  if (percentage >= 70) return 'C'
  if (percentage >= 60) return 'D'
  return 'F'
}
