// @ts-nocheck
/**
 * Student Performance Analytics Service
 * Calculates metrics from task submissions, identifies strengths/weaknesses,
 * and assigns performance clusters
 */

import { db } from '@/lib/db'

export type PerformanceCluster = 'advanced' | 'intermediate' | 'struggling'

export interface StudentMetrics {
  averageScore: number
  completionRate: number
  engagementScore: number
  attendanceRate: number
  participationRate: number
}

export interface TaskHistoryItem {
  taskId: string
  score: number
  timeSpent: number
  attempts: number
  completedAt: Date
  strengths: string[]
  weaknesses: string[]
}

export interface CommonMistake {
  type: string
  frequency: number
  lastOccurred: Date
}

export interface StudentPerformanceData {
  studentId: string
  overallMetrics: StudentMetrics
  subjectStrengths: string[]
  subjectWeaknesses: string[]
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed'
  pace: 'fast' | 'normal' | 'slow'
  taskHistory: TaskHistoryItem[]
  commonMistakes: CommonMistake[]
  performanceCluster: PerformanceCluster
}

/** Per-question result from a single attempt/submission */
export interface QuestionResultRow {
  sourceType: 'quiz' | 'task'
  sourceId: string
  sourceTitle?: string
  questionId: string
  correct: boolean
  pointsEarned: number
  pointsMax: number
  selectedAnswer?: unknown
  completedAt: Date
}

/** Question-level breakdown for reports */
export interface QuestionLevelBreakdown {
  bySource: Array<{
    sourceType: 'quiz' | 'task'
    sourceId: string
    sourceTitle?: string
    completedAt: Date
    questions: QuestionResultRow[]
  }>
  weakQuestionIds: string[]
  totalCorrect: number
  totalQuestions: number
}

/**
 * Calculate comprehensive performance metrics for a student
 */
export async function calculateStudentMetrics(
  studentId: string,
  curriculumId?: string
): Promise<StudentMetrics> {
  // Get all task submissions for the student
  const submissions = await db.taskSubmission.findMany({
    where: {
      studentId
      // Note: curriculum filtering would require joining with GeneratedTask
    }
  })

  if (submissions.length === 0) {
    return {
      averageScore: 0,
      completionRate: 0,
      engagementScore: 0,
      attendanceRate: 0,
      participationRate: 0
    }
  }

  // Calculate average score
  const averageScore = submissions.reduce((sum, s) => sum + (s.score || 0), 0) / submissions.length

  // Calculate completion rate
  const completedTasks = submissions.filter(s => s.status === 'graded').length
  const completionRate = (completedTasks / submissions.length) * 100

  // Calculate engagement (based on time spent and attempts)
  const avgTimeSpent = submissions.reduce((sum, s) => sum + (s.timeSpent || 0), 0) / submissions.length
  const avgAttempts = submissions.reduce((sum, s) => sum + (s.attempts || 1), 0) / submissions.length
  const engagementScore = Math.min(100, (avgTimeSpent / 300) * 50 + (1 / avgAttempts) * 50)

  // Get attendance data from session participants
  const enrollments = await db.curriculumEnrollment.findMany({
    where: { studentId }
  })

  let totalSessions = 0
  let attendedSessions = 0

  for (const enrollment of enrollments) {
    const sessions = await db.liveSession.findMany({
      where: {
        participants: {
          some: {
            studentId
          }
        }
      },
      include: {
        participants: true
      }
    })
    totalSessions += sessions.length
    attendedSessions += sessions.filter(s =>
      s.participants.some(p => p.studentId === studentId && p.joinedAt)
    ).length
  }

  const attendanceRate = totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0

  // Calculate participation (messages sent during sessions)
  const messages = await db.message.count({
    where: {
      userId: studentId
    }
  })
  const participationRate = Math.min(100, messages * 5) // 20 messages = 100%

  return {
    averageScore: Math.round(averageScore * 10) / 10,
    completionRate: Math.round(completionRate * 10) / 10,
    engagementScore: Math.round(engagementScore * 10) / 10,
    attendanceRate: Math.round(attendanceRate * 10) / 10,
    participationRate: Math.round(participationRate * 10) / 10
  }
}

/**
 * Analyze subject-specific strengths and weaknesses.
 * Enriched with per-question data from `questionResults` on both
 * TaskSubmission and QuizAttempt.
 */
export async function analyzeSubjectPerformance(
  studentId: string
): Promise<{ strengths: string[]; weaknesses: string[] }> {
  const subjectScores: Record<string, number[]> = {}

  // --- 1. Traditional: TaskSubmission overall scores by topic ---
  const submissions = await db.taskSubmission.findMany({
    where: { studentId }
  })

  for (const submission of submissions) {
    const answers = submission.answers as any
    const subjects: string[] = answers?.subjects || answers?.topics || ['general']
    for (const subject of subjects) {
      if (!subjectScores[subject]) subjectScores[subject] = []
      subjectScores[subject].push(submission.score || 0)
    }
  }

  // --- 2. Enrichment: per-question accuracy from questionResults ---
  // Per-question data gives a more granular signal than the overall score.
  const questionHits: Record<string, { correct: number; total: number }> = {}

  // From TaskSubmissions
  for (const s of submissions) {
    const qr = s.questionResults as Array<{ questionId: string; correct?: boolean }> | null
    if (!Array.isArray(qr)) continue
    for (const r of qr) {
      const id = r.questionId ?? 'unknown'
      if (!questionHits[id]) questionHits[id] = { correct: 0, total: 0 }
      questionHits[id].total++
      if (r.correct) questionHits[id].correct++
    }
  }

  // From QuizAttempts
  const attempts = await db.quizAttempt.findMany({
    where: { studentId, questionResults: { not: null } },
    take: 50
  })
  for (const a of attempts) {
    const qr = a.questionResults as Array<{ questionId: string; correct?: boolean }> | null
    if (!Array.isArray(qr)) continue
    for (const r of qr) {
      const id = r.questionId ?? 'unknown'
      if (!questionHits[id]) questionHits[id] = { correct: 0, total: 0 }
      questionHits[id].total++
      if (r.correct) questionHits[id].correct++
    }
  }

  // Derive per-question strengths/weaknesses
  for (const [qId, data] of Object.entries(questionHits)) {
    if (data.total === 0) continue
    const acc = (data.correct / data.total) * 100
    const label = `Q:${qId}` // namespaced to avoid collision with subject labels
    if (acc >= 80) {
      if (!subjectScores[label]) subjectScores[label] = []
      subjectScores[label].push(acc)
    } else if (acc < 50) {
      if (!subjectScores[label]) subjectScores[label] = []
      subjectScores[label].push(acc)
    }
  }

  // --- 3. Classify ---
  const strengths: string[] = []
  const weaknesses: string[] = []

  for (const [subject, scores] of Object.entries(subjectScores)) {
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
    if (avgScore >= 80) strengths.push(subject)
    else if (avgScore < 60) weaknesses.push(subject)
  }

  return { strengths, weaknesses }
}

/**
 * Determine student's learning pace based on task completion patterns
 */
export function determineLearningPace(
  taskHistory: TaskHistoryItem[]
): 'fast' | 'normal' | 'slow' {
  if (taskHistory.length < 3) return 'normal'

  const avgTimeSpent = taskHistory.reduce((sum, t) => sum + t.timeSpent, 0) / taskHistory.length
  const avgAttempts = taskHistory.reduce((sum, t) => sum + t.attempts, 0) / taskHistory.length

  // Fast learners: quick completion, few attempts
  if (avgTimeSpent < 180 && avgAttempts < 1.5) {
    return 'fast'
  }

  // Slow learners: take more time or many attempts
  if (avgTimeSpent > 600 || avgAttempts > 2.5) {
    return 'slow'
  }

  return 'normal'
}

/**
 * Identify common mistakes from task submissions.
 * Enriched: also derives mistakes from `questionResults` on both
 * TaskSubmission and QuizAttempt (questions the student repeatedly gets wrong).
 */
export async function identifyCommonMistakes(
  studentId: string
): Promise<CommonMistake[]> {
  const submissions = await db.taskSubmission.findMany({
    where: { studentId },
    orderBy: { submittedAt: 'desc' },
    take: 50
  })

  const mistakeCounts: Record<string, { count: number; lastAt: Date }> = {}

  const bump = (type: string, at: Date) => {
    if (!mistakeCounts[type]) {
      mistakeCounts[type] = { count: 0, lastAt: at }
    }
    mistakeCounts[type].count++
    if (at > mistakeCounts[type].lastAt) mistakeCounts[type].lastAt = at
  }

  // --- 1. Legacy: answers.mistakes ---
  for (const submission of submissions) {
    const answers = submission.answers as any
    if (answers?.mistakes) {
      for (const mistake of answers.mistakes) {
        bump(mistake.type || 'general', submission.submittedAt)
      }
    }
  }

  // --- 2. New: derive from TaskSubmission.questionResults ---
  for (const submission of submissions) {
    const qr = submission.questionResults as Array<{
      questionId: string
      correct?: boolean
      selectedAnswer?: unknown
    }> | null
    if (!Array.isArray(qr)) continue
    for (const r of qr) {
      if (r.correct) continue // only wrong answers are mistakes
      const label = r.selectedAnswer
        ? `Q:${r.questionId}: chose ${String(r.selectedAnswer).slice(0, 40)}`
        : `Q:${r.questionId}: incorrect`
      bump(label, submission.submittedAt)
    }
  }

  // --- 3. New: derive from QuizAttempt.questionResults ---
  const attempts = await db.quizAttempt.findMany({
    where: { studentId, questionResults: { not: null } },
    orderBy: { completedAt: 'desc' },
    take: 50
  })

  for (const a of attempts) {
    const qr = a.questionResults as Array<{
      questionId: string
      correct?: boolean
      selectedAnswer?: unknown
    }> | null
    if (!Array.isArray(qr)) continue
    for (const r of qr) {
      if (r.correct) continue
      const label = r.selectedAnswer
        ? `Q:${r.questionId}: chose ${String(r.selectedAnswer).slice(0, 40)}`
        : `Q:${r.questionId}: incorrect`
      bump(label, a.completedAt)
    }
  }

  return Object.entries(mistakeCounts)
    .map(([type, data]) => ({
      type,
      frequency: data.count,
      lastOccurred: data.lastAt
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10)
}

/**
 * Assign performance cluster based on metrics
 */
export function assignPerformanceCluster(
  metrics: StudentMetrics,
  taskHistory: TaskHistoryItem[]
): PerformanceCluster {
  // Advanced: high scores, good completion, good engagement
  if (
    metrics.averageScore >= 80 &&
    metrics.completionRate >= 80 &&
    metrics.engagementScore >= 70
  ) {
    return 'advanced'
  }

  // Struggling: low scores or poor completion
  if (
    metrics.averageScore < 60 ||
    metrics.completionRate < 50 ||
    metrics.engagementScore < 40
  ) {
    return 'struggling'
  }

  return 'intermediate'
}

/**
 * Get per-question breakdown for a student (from quiz attempts and task submissions)
 */
export async function getQuestionLevelBreakdown(
  studentId: string
): Promise<QuestionLevelBreakdown> {
  const bySource: QuestionLevelBreakdown['bySource'] = []
  const weakQuestionIds: string[] = []
  let totalCorrect = 0
  let totalQuestions = 0

  const attempts = await db.quizAttempt.findMany({
    where: { studentId, questionResults: { not: null } },
    orderBy: { completedAt: 'desc' },
    take: 50
  })

  for (const a of attempts) {
    const results = a.questionResults as Array<{ questionId: string; correct?: boolean; pointsEarned?: number; pointsMax?: number; selectedAnswer?: unknown }> | null
    if (!Array.isArray(results) || results.length === 0) continue

    const rows: QuestionResultRow[] = results.map(r => ({
      sourceType: 'quiz',
      sourceId: a.quizId,
      questionId: r.questionId,
      correct: r.correct ?? (r.pointsEarned !== undefined && r.pointsMax !== undefined ? r.pointsEarned >= (r.pointsMax * 0.7) : false),
      pointsEarned: r.pointsEarned ?? 0,
      pointsMax: r.pointsMax ?? 100,
      selectedAnswer: r.selectedAnswer,
      completedAt: a.completedAt
    }))

    for (const r of rows) {
      totalQuestions++
      if (r.correct) totalCorrect++
      else weakQuestionIds.push(r.questionId)
    }

    bySource.push({
      sourceType: 'quiz',
      sourceId: a.quizId,
      completedAt: a.completedAt,
      questions: rows
    })
  }

  const submissions = await db.taskSubmission.findMany({
    where: { studentId, questionResults: { not: null } },
    orderBy: { submittedAt: 'desc' },
    take: 50
  })

  for (const s of submissions) {
    const results = s.questionResults as Array<{ questionId: string; correct?: boolean; pointsEarned?: number; pointsMax?: number; selectedAnswer?: unknown }> | null
    if (!Array.isArray(results) || results.length === 0) continue

    const rows: QuestionResultRow[] = results.map(r => ({
      sourceType: 'task',
      sourceId: s.taskId,
      questionId: r.questionId,
      correct: r.correct ?? (r.pointsEarned !== undefined && r.pointsMax !== undefined ? r.pointsEarned >= (r.pointsMax * 0.7) : false),
      pointsEarned: r.pointsEarned ?? 0,
      pointsMax: r.pointsMax ?? 100,
      selectedAnswer: r.selectedAnswer,
      completedAt: s.submittedAt
    }))

    for (const r of rows) {
      totalQuestions++
      if (r.correct) totalCorrect++
      else weakQuestionIds.push(r.questionId)
    }

    bySource.push({
      sourceType: 'task',
      sourceId: s.taskId,
      completedAt: s.submittedAt,
      questions: rows
    })
  }

  return {
    bySource,
    weakQuestionIds: [...new Set(weakQuestionIds)],
    totalCorrect,
    totalQuestions
  }
}

/**
 * Get comprehensive performance data for a student
 */
export async function getStudentPerformance(
  studentId: string,
  curriculumId?: string
): Promise<StudentPerformanceData> {
  // Get metrics
  const overallMetrics = await calculateStudentMetrics(studentId, curriculumId)

  // Get subject analysis
  const { strengths, weaknesses } = await analyzeSubjectPerformance(studentId)

  // Get task history
  const submissions = await db.taskSubmission.findMany({
    where: {
      studentId,
      ...(curriculumId && {
        task: { classId: curriculumId }
      })
    },
    orderBy: { submittedAt: 'desc' },
    take: 20
  })

  const taskHistory: TaskHistoryItem[] = submissions.map(s => {
    const answers = s.answers as any
    return {
      taskId: s.taskId,
      score: s.score || 0,
      timeSpent: s.timeSpent || 0,
      attempts: s.attempts || 1,
      completedAt: s.submittedAt,
      strengths: answers?.strengthsDemonstrated || [],
      weaknesses: answers?.areasForImprovement || []
    }
  })

  // Get common mistakes
  const commonMistakes = await identifyCommonMistakes(studentId)

  // Determine pace
  const pace = determineLearningPace(taskHistory)

  // Assign cluster
  const performanceCluster = assignPerformanceCluster(overallMetrics, taskHistory)

  // Infer learning style from submission patterns (simplified)
  const visualTasks = submissions.filter(s => {
    const answers = s.answers as any
    return answers?.taskType === 'visual'
  }).length

  const learningStyle: StudentPerformanceData['learningStyle'] =
    visualTasks > submissions.length / 2 ? 'visual' : 'mixed'

  return {
    studentId,
    overallMetrics,
    subjectStrengths: strengths,
    subjectWeaknesses: weaknesses,
    learningStyle,
    pace,
    taskHistory,
    commonMistakes,
    performanceCluster
  }
}

/**
 * Get class-wide performance summary
 */
export async function getClassPerformanceSummary(
  curriculumId: string
): Promise<{
  totalStudents: number
  averageScore: number
  clusterDistribution: Record<PerformanceCluster, number>
  topStudents: { id: string; name: string; score: number }[]
  studentsNeedingAttention: { id: string; name: string; reason: string }[]
}> {
  const enrollments = await db.curriculumEnrollment.findMany({
    where: { curriculumId },
    include: {
      student: {
        include: {
          profile: true
        }
      }
    }
  })

  const studentPerformances = await Promise.all(
    enrollments.map(async (enrollment) => ({
      id: enrollment.studentId,
      name: enrollment.student.profile?.name || 'Unknown',
      performance: await getStudentPerformance(enrollment.studentId, curriculumId)
    }))
  )

  const clusterDistribution: Record<PerformanceCluster, number> = {
    advanced: 0,
    intermediate: 0,
    struggling: 0
  }

  let totalScore = 0
  const studentsNeedingAttention: { id: string; name: string; reason: string }[] = []

  for (const sp of studentPerformances) {
    clusterDistribution[sp.performance.performanceCluster]++
    totalScore += sp.performance.overallMetrics.averageScore

    if (sp.performance.performanceCluster === 'struggling') {
      studentsNeedingAttention.push({
        id: sp.id,
        name: sp.name,
        reason: `Low performance: ${sp.performance.overallMetrics.averageScore.toFixed(0)}% avg`
      })
    }
  }

  // Sort by score and get top students
  const sortedStudents = studentPerformances
    .sort((a, b) => b.performance.overallMetrics.averageScore - a.performance.overallMetrics.averageScore)
    .slice(0, 5)
    .map(s => ({
      id: s.id,
      name: s.name,
      score: s.performance.overallMetrics.averageScore
    }))

  return {
    totalStudents: enrollments.length,
    averageScore: enrollments.length > 0 ? totalScore / enrollments.length : 0,
    clusterDistribution,
    topStudents: sortedStudents,
    studentsNeedingAttention
  }
}

/**
 * Update or create student performance record
 */
export async function updateStudentPerformanceRecord(
  studentId: string,
  curriculumId: string
): Promise<void> {
  const performance = await getStudentPerformance(studentId, curriculumId)

  // Find existing record
  const existing = await db.studentPerformance.findFirst({
    where: { studentId }
  })

  const data = {
    studentId,
    cluster: performance.performanceCluster,
    strengths: performance.subjectStrengths,
    weaknesses: performance.subjectWeaknesses,
    commonMistakes: performance.commonMistakes.map(m => ({
      type: m.type,
      frequency: m.frequency
    })),
    learningStyle: performance.learningStyle || 'mixed',
    averageScore: performance.overallMetrics.averageScore,
    completionRate: performance.overallMetrics.completionRate,
    engagementScore: performance.overallMetrics.engagementScore,
    attendanceRate: performance.overallMetrics.attendanceRate,
    participationRate: performance.overallMetrics.participationRate,
    pace: performance.pace
  }

  if (existing) {
    await db.studentPerformance.update({
      where: { id: existing.id },
      data
    })
  } else {
    await db.studentPerformance.create({
      data
    })
  }
}
