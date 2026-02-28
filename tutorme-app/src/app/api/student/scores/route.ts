/**
 * Student Scores API
 * Uses only existing schema: CurriculumEnrollment, Curriculum, QuizAttempt,
 * TaskSubmission, GeneratedTask, UserGamification.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumEnrollment,
  generatedTask,
  quizAttempt,
  taskSubmission,
  userGamification,
} from '@/lib/db/schema'
import { eq, desc, inArray } from 'drizzle-orm'

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, _request)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const studentId = session.user.id

    const quizAttempts = await drizzleDb
      .select()
      .from(quizAttempt)
      .where(eq(quizAttempt.studentId, studentId))
      .orderBy(desc(quizAttempt.completedAt))

    const taskSubmissions = await drizzleDb
      .select()
      .from(taskSubmission)
      .where(eq(taskSubmission.studentId, studentId))
      .orderBy(desc(taskSubmission.submittedAt))

    const taskIds = [...new Set(taskSubmissions.map((t) => t.taskId))]
    const generatedTasks =
      taskIds.length > 0
        ? await drizzleDb
            .select({ id: generatedTask.id, title: generatedTask.title, type: generatedTask.type })
            .from(generatedTask)
            .where(inArray(generatedTask.id, taskIds))
        : []
    const taskById = new Map(generatedTasks.map((t) => [t.id, t]))

    const [gamification] = await drizzleDb
      .select()
      .from(userGamification)
      .where(eq(userGamification.userId, studentId))
      .limit(1)

    const enrollmentsRows = await drizzleDb
      .select({
        id: curriculumEnrollment.id,
        curriculumId: curriculumEnrollment.curriculumId,
        lastActivity: curriculumEnrollment.lastActivity,
        enrolledAt: curriculumEnrollment.enrolledAt,
        curriculumName: curriculum.name,
        curriculumSubject: curriculum.subject,
      })
      .from(curriculumEnrollment)
      .innerJoin(curriculum, eq(curriculumEnrollment.curriculumId, curriculum.id))
      .where(eq(curriculumEnrollment.studentId, studentId))

    type SubjectScore = {
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

    const subjectScores = new Map<string, SubjectScore>()

    enrollmentsRows.forEach((row) => {
      subjectScores.set(row.curriculumId, {
        id: row.curriculumId,
        subject: row.curriculumSubject,
        subjectName: row.curriculumName,
        totalScore: 0,
        maxScore: 0,
        percentage: 0,
        grade: '-',
        assignmentsCompleted: 0,
        assignmentsTotal: 0,
        quizzesCompleted: 0,
        quizzesTotal: 0,
        lastActivity:
          row.lastActivity?.toISOString() ?? row.enrolledAt.toISOString(),
        trend: 'stable',
      })
    })

    const firstSubjectId = enrollmentsRows[0]?.curriculumId
    if (firstSubjectId && subjectScores.has(firstSubjectId)) {
      quizAttempts.forEach((attempt) => {
        const score = subjectScores.get(firstSubjectId)!
        score.quizzesTotal++
        score.totalScore += attempt.score ?? 0
        score.maxScore += attempt.maxScore ?? 0
        if (attempt.completedAt) {
          score.quizzesCompleted++
          if (
            new Date(attempt.completedAt) > new Date(score.lastActivity)
          ) {
            score.lastActivity = attempt.completedAt.toISOString()
          }
        }
      })
    } else if (quizAttempts.length > 0) {
      const generalId = 'general'
      subjectScores.set(generalId, {
        id: generalId,
        subject: 'general',
        subjectName: 'General',
        totalScore: quizAttempts.reduce((s, a) => s + (a.score ?? 0), 0),
        maxScore: quizAttempts.reduce((s, a) => s + a.maxScore, 0),
        percentage: 0,
        grade: '-',
        assignmentsCompleted: 0,
        assignmentsTotal: 0,
        quizzesCompleted: quizAttempts.filter((q) => q.completedAt).length,
        quizzesTotal: quizAttempts.length,
        lastActivity:
          quizAttempts[0]?.completedAt?.toISOString() ?? new Date().toISOString(),
        trend: 'stable',
      })
    }

    taskSubmissions.forEach((sub) => {
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
        ? Math.round(
            scores.reduce((sum, s) => sum + s.percentage, 0) / totalSubjects
          )
        : 0
    const totalQuizzes = quizAttempts.filter((q) => q.completedAt).length
    const totalAssignments = taskSubmissions.filter(
      (t) => t.status === 'graded' && t.score != null
    ).length
    const studyHours = Math.round(
      quizAttempts.reduce((sum, q) => sum + (q.timeSpent ?? 0), 0) / 3600 +
        taskSubmissions.length * 0.5
    )

    const quizzes = quizAttempts
      .filter((q) => q.completedAt)
      .map((q, i) => ({
        id: q.id,
        quizTitle: `Quiz ${i + 1}`,
        subject: 'General',
        score: q.score ?? 0,
        maxScore: q.maxScore ?? 100,
        percentage: Math.round(
          ((q.score ?? 0) / (q.maxScore ?? 100)) * 100
        ),
        completedAt: q.completedAt,
        timeSpent: q.timeSpent ?? 0,
        status:
          (q.score ?? 0) >= ((q.maxScore ?? 100) * 0.6) ? 'passed' : 'failed',
      }))

    const formattedAssignments = taskSubmissions.map((a) => {
      const task = taskById.get(a.taskId)
      return {
        id: a.id,
        assignmentTitle: task?.title ?? 'Assignment',
        subject: 'General',
        score: a.status === 'graded' ? a.score : null,
        maxScore: a.maxScore ?? 100,
        status: (a.status?.toLowerCase() ?? 'submitted') as
          | 'submitted'
          | 'graded'
          | 'pending',
        submittedAt: a.submittedAt,
        dueDate: task?.id
          ? new Date().toISOString()
          : new Date().toISOString(),
      }
    })

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
