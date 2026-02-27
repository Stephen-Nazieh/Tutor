/**
 * Class Engagement Analytics Service
 * Calculates comprehensive engagement metrics for classes and live sessions (Drizzle ORM)
 */

import { and, eq, gte, inArray, isNotNull, lt, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  liveSession,
  message,
  profile,
  quizAttempt,
  sessionParticipant,
  taskSubmission,
  user,
} from '@/lib/db/schema'
import { EngagementMetrics } from './export-service'

export interface EngagementCalculationOptions {
  startDate?: Date
  endDate?: Date
  includeDailyTrend?: boolean
  includeHourlyPattern?: boolean
}

/**
 * Calculate engagement metrics for a class
 */
export async function calculateClassEngagement(
  classId: string,
  options: EngagementCalculationOptions = {}
): Promise<EngagementMetrics> {
  const {
    startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    endDate = new Date(),
    includeDailyTrend = true,
    includeHourlyPattern = true,
  } = options

  const enrollments = await drizzleDb
    .select({ studentId: curriculumEnrollment.studentId })
    .from(curriculumEnrollment)
    .where(eq(curriculumEnrollment.curriculumId, classId))
  const studentIds = enrollments.map((e) => e.studentId)

  if (studentIds.length === 0) {
    return {
      classId,
      period: { start: startDate, end: endDate },
      overallEngagement: 0,
      metrics: {
        attendance: 0,
        participation: 0,
        assignmentCompletion: 0,
        quizParticipation: 0,
        discussionActivity: 0,
      },
      dailyTrend: [],
      hourlyPattern: [],
      studentsAtRisk: [],
    }
  }

  // 1. Calculate Attendance Rate
  const attendanceMetrics = await calculateAttendanceRate(classId, studentIds, startDate, endDate)

  // 2. Calculate Participation Rate
  const participationMetrics = await calculateParticipationRate(studentIds, startDate, endDate)

  // 3. Calculate Assignment Completion
  const assignmentMetrics = await calculateAssignmentCompletion(studentIds, startDate, endDate)

  // 4. Calculate Quiz Participation
  const quizMetrics = await calculateQuizParticipation(studentIds, startDate, endDate)

  // 5. Calculate Discussion Activity
  const discussionMetrics = await calculateDiscussionActivity(studentIds, startDate, endDate)

  // 6. Calculate Overall Engagement Score (weighted average)
  const weights = {
    attendance: 0.25,
    participation: 0.20,
    assignment: 0.25,
    quiz: 0.15,
    discussion: 0.15,
  }

  const overallEngagement = Math.round(
    attendanceMetrics.rate * weights.attendance +
    participationMetrics.rate * weights.participation +
    assignmentMetrics.rate * weights.assignment +
    quizMetrics.rate * weights.quiz +
    discussionMetrics.rate * weights.discussion
  )

  // 7. Get Daily Trend
  const dailyTrend = includeDailyTrend
    ? await calculateDailyTrend(classId, studentIds, startDate, endDate)
    : []

  // 8. Get Hourly Pattern
  const hourlyPattern = includeHourlyPattern
    ? await calculateHourlyPattern(studentIds, startDate, endDate)
    : []

  // 9. Identify Students At Risk
  const studentsAtRisk = await identifyStudentsAtRisk(
    studentIds,
    attendanceMetrics,
    assignmentMetrics,
    quizMetrics
  )

  return {
    classId,
    period: { start: startDate, end: endDate },
    overallEngagement,
    metrics: {
      attendance: Math.round(attendanceMetrics.rate),
      participation: Math.round(participationMetrics.rate),
      assignmentCompletion: Math.round(assignmentMetrics.rate),
      quizParticipation: Math.round(quizMetrics.rate),
      discussionActivity: Math.round(discussionMetrics.rate),
    },
    dailyTrend,
    hourlyPattern,
    studentsAtRisk,
  }
}

/**
 * Calculate attendance rate based on live session participation
 */
async function calculateAttendanceRate(
  classId: string,
  studentIds: string[],
  startDate: Date,
  endDate: Date
): Promise<{ rate: number; sessions: number; attended: number }> {
  const sessions = await drizzleDb
    .select()
    .from(liveSession)
    .where(
      and(
        eq(liveSession.curriculumId, classId),
        gte(liveSession.scheduledAt, startDate),
        lt(liveSession.scheduledAt, new Date(endDate.getTime() + 1))
      )
    )

  if (sessions.length === 0) {
    return { rate: 0, sessions: 0, attended: 0 }
  }

  let actualAttendances = 0
  for (const session of sessions) {
    const participants = await drizzleDb
      .select()
      .from(sessionParticipant)
      .where(
        and(
          eq(sessionParticipant.sessionId, session.id),
          inArray(sessionParticipant.studentId, studentIds)
        )
      )
    actualAttendances += participants.filter((p) => p.joinedAt != null).length
  }
  const totalPossibleAttendances = studentIds.length * sessions.length

  return {
    rate: totalPossibleAttendances > 0 ? (actualAttendances / totalPossibleAttendances) * 100 : 0,
    sessions: sessions.length,
    attended: actualAttendances,
  }
}

/**
 * Calculate participation rate based on chat messages and interactions
 */
async function calculateParticipationRate(
  studentIds: string[],
  startDate: Date,
  endDate: Date
): Promise<{ rate: number; messages: number }> {
  const [countRow] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(message)
    .where(
      and(
        inArray(message.userId, studentIds),
        gte(message.timestamp, startDate),
        lt(message.timestamp, new Date(endDate.getTime() + 1))
      )
    )
  const messageCount = countRow?.count ?? 0

  // Participation rate based on messages per student per week
  // Assuming 5 messages per week per student = 100% participation
  const weeks = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)))
  const expectedMessages = studentIds.length * weeks * 5

  return {
    rate: expectedMessages > 0 ? Math.min(100, (messageCount / expectedMessages) * 100) : 0,
    messages: messageCount,
  }
}

/**
 * Calculate assignment completion rate
 */
async function calculateAssignmentCompletion(
  studentIds: string[],
  startDate: Date,
  endDate: Date
): Promise<{ rate: number; completed: number; total: number }> {
  const submissions = await drizzleDb
    .select()
    .from(taskSubmission)
    .where(
      and(
        inArray(taskSubmission.studentId, studentIds),
        gte(taskSubmission.submittedAt, startDate),
        lt(taskSubmission.submittedAt, new Date(endDate.getTime() + 1))
      )
    )

  const completed = submissions.filter((s) => s.status === 'graded').length

  // Get total assignments (unique tasks assigned to these students)
  const uniqueTasks = new Set(submissions.map(s => s.taskId)).size
  const total = uniqueTasks * studentIds.length

  return {
    rate: total > 0 ? (completed / total) * 100 : 0,
    completed,
    total,
  }
}

/**
 * Calculate quiz participation rate
 */
async function calculateQuizParticipation(
  studentIds: string[],
  startDate: Date,
  endDate: Date
): Promise<{ rate: number; attempts: number; totalQuizzes: number }> {
  const attempts = await drizzleDb
    .select()
    .from(quizAttempt)
    .where(
      and(
        inArray(quizAttempt.studentId, studentIds),
        gte(quizAttempt.completedAt, startDate),
        lt(quizAttempt.completedAt, new Date(endDate.getTime() + 1))
      )
    )

  // Get total available quizzes
  const uniqueQuizzes = new Set(attempts.map(a => a.quizId)).size
  const totalQuizzes = uniqueQuizzes * studentIds.length

  return {
    rate: totalQuizzes > 0 ? (attempts.length / totalQuizzes) * 100 : 0,
    attempts: attempts.length,
    totalQuizzes,
  }
}

/**
 * Calculate discussion activity based on messages and forum posts
 */
async function calculateDiscussionActivity(
  studentIds: string[],
  startDate: Date,
  endDate: Date
): Promise<{ rate: number; posts: number; reactions: number }> {
  const messages = await drizzleDb
    .select()
    .from(message)
    .where(
      and(
        inArray(message.userId, studentIds),
        gte(message.timestamp, startDate),
        lt(message.timestamp, new Date(endDate.getTime() + 1))
      )
    )

  const discussionMessages = messages.filter((m) => {
    const content = String(m.content ?? '')
    return content.length > 50 || content.includes('?')
  })

  // Activity rate: 2 discussion messages per week per student = 100%
  const weeks = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)))
  const expectedDiscussions = studentIds.length * weeks * 2

  return {
    rate: expectedDiscussions > 0 ? Math.min(100, (discussionMessages.length / expectedDiscussions) * 100) : 0,
    posts: discussionMessages.length,
    reactions: 0, // Would require reaction tracking
  }
}

/**
 * Calculate daily engagement trend
 */
async function calculateDailyTrend(
  classId: string,
  studentIds: string[],
  startDate: Date,
  endDate: Date
): Promise<{ date: string; engagement: number; attendance: number }[]> {
  const days: { date: string; engagement: number; attendance: number }[] = []

  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const dayStart = new Date(currentDate)
    const dayEnd = new Date(currentDate)
    dayEnd.setDate(dayEnd.getDate() + 1)

    const daySessions = await drizzleDb
      .select()
      .from(liveSession)
      .where(
        and(
          eq(liveSession.curriculumId, classId),
          gte(liveSession.scheduledAt, dayStart),
          lt(liveSession.scheduledAt, dayEnd)
        )
      )

    let actualAttended = 0
    for (const s of daySessions) {
      const participants = await drizzleDb
        .select()
        .from(sessionParticipant)
        .where(
          and(
            eq(sessionParticipant.sessionId, s.id),
            inArray(sessionParticipant.studentId, studentIds)
          )
        )
      actualAttended += participants.filter((p) => p.joinedAt != null).length
    }
    const totalPossible = studentIds.length * daySessions.length
    const dayAttendance = totalPossible > 0 ? (actualAttended / totalPossible) * 100 : 0

    const [msgCountRow] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(message)
      .where(
        and(
          inArray(message.userId, studentIds),
          gte(message.timestamp, dayStart),
          lt(message.timestamp, dayEnd)
        )
      )
    const messages = msgCountRow?.count ?? 0

    // Engagement is based on messages and attendance
    const dayEngagement = Math.min(100, (messages / studentIds.length) * 10 + dayAttendance * 0.5)

    days.push({
      date: dateStr,
      engagement: Math.round(dayEngagement),
      attendance: Math.round(dayAttendance),
    })

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return days
}

/**
 * Calculate hourly activity pattern
 */
async function calculateHourlyPattern(
  studentIds: string[],
  startDate: Date,
  endDate: Date
): Promise<{ hour: number; activity: number }[]> {
  const messages = await drizzleDb
    .select({ timestamp: message.timestamp })
    .from(message)
    .where(
      and(
        inArray(message.userId, studentIds),
        gte(message.timestamp, startDate),
        lt(message.timestamp, new Date(endDate.getTime() + 1))
      )
    )

  // Count messages by hour
  const hourCounts: Record<number, number> = {}
  for (let i = 0; i < 24; i++) {
    hourCounts[i] = 0
  }

  messages.forEach((m) => {
    const hour = new Date(m.timestamp).getHours()
    hourCounts[hour]++
  })

  // Normalize to percentage
  const maxCount = Math.max(...Object.values(hourCounts), 1)

  return Object.entries(hourCounts).map(([hour, count]) => ({
    hour: parseInt(hour),
    activity: Math.round((count / maxCount) * 100),
  }))
}

/**
 * Identify students at risk based on low engagement metrics
 */
async function identifyStudentsAtRisk(
  studentIds: string[],
  attendance: { rate: number },
  assignments: { rate: number },
  quizzes: { rate: number }
): Promise<string[]> {
  const atRisk: string[] = []

  // A student is at risk if they have:
  // - Less than 50% attendance
  // - Less than 50% assignment completion
  // - Less than 50% quiz participation

  for (const studentId of studentIds) {
    const [attRow] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(sessionParticipant)
      .where(
        and(
          eq(sessionParticipant.studentId, studentId),
          isNotNull(sessionParticipant.joinedAt)
        )
      )
    const attendanceCount = attRow?.count ?? 0

    const [assignRow] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(taskSubmission)
      .where(
        and(
          eq(taskSubmission.studentId, studentId),
          eq(taskSubmission.status, 'graded')
        )
      )
    const assignmentCount = assignRow?.count ?? 0

    const [quizRow] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(quizAttempt)
      .where(eq(quizAttempt.studentId, studentId))
    const quizCount = quizRow?.count ?? 0

    if (attendanceCount < 2 || assignmentCount < 2 || quizCount < 1) {
      const [userRow] = await drizzleDb
        .select()
        .from(user)
        .where(eq(user.id, studentId))
        .limit(1)
      const [profileRow] = userRow
        ? await drizzleDb
            .select({ name: profile.name })
            .from(profile)
            .where(eq(profile.userId, studentId))
            .limit(1)
        : []
      atRisk.push(profileRow?.name ?? `Student-${studentId.slice(-6)}`)
    }
  }

  return atRisk
}

/**
 * Get real-time engagement snapshot for a live session
 */
export async function getLiveSessionEngagement(sessionId: string): Promise<{
  activeStudents: number
  totalStudents: number
  chatMessagesLast5Min: number
  averageSessionTime: number
  engagementLevel: 'high' | 'medium' | 'low'
}> {
  const [session] = await drizzleDb
    .select()
    .from(liveSession)
    .where(eq(liveSession.id, sessionId))
    .limit(1)

  if (!session) {
    return {
      activeStudents: 0,
      totalStudents: 0,
      chatMessagesLast5Min: 0,
      averageSessionTime: 0,
      engagementLevel: 'low',
    }
  }

  const participants = await drizzleDb
    .select()
    .from(sessionParticipant)
    .where(eq(sessionParticipant.sessionId, sessionId))

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

  const [recentMsgRow] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(message)
    .where(
      and(
        eq(message.sessionId, sessionId),
        gte(message.timestamp, fiveMinutesAgo)
      )
    )
  const recentMessages = recentMsgRow?.count ?? 0

  const activeParticipants = participants.filter((p) => {
    if (!p.joinedAt) return false
    // Consider active if joined within last 30 minutes
    const joinedTime = new Date(p.joinedAt).getTime()
    return Date.now() - joinedTime < 30 * 60 * 1000
  })

  // Calculate average session time (use participants from query above)
  const sessionTimes = participants
    .filter((p: { joinedAt: Date | null; leftAt: Date | null }) => p.joinedAt && p.leftAt)
    .map((p: { joinedAt: Date | null; leftAt: Date | null }) => {
      const joined = new Date(p.joinedAt!).getTime()
      const left = new Date(p.leftAt!).getTime()
      return (left - joined) / 1000 / 60 // minutes
    })

  const avgSessionTime = sessionTimes.length > 0
    ? sessionTimes.reduce((a: number, b: number) => a + b, 0) / sessionTimes.length
    : 0

  // Determine engagement level (use participants.length instead of _count)
  const totalParticipants = participants.length
  const participationRate = totalParticipants > 0
    ? (activeParticipants.length / totalParticipants) * 100
    : 0

  let engagementLevel: 'high' | 'medium' | 'low' = 'low'
  if (participationRate >= 70 && recentMessages >= 5) {
    engagementLevel = 'high'
  } else if (participationRate >= 40 || recentMessages >= 2) {
    engagementLevel = 'medium'
  }

  return {
    activeStudents: activeParticipants.length,
    totalStudents: participants.length,
    chatMessagesLast5Min: recentMessages,
    averageSessionTime: Math.round(avgSessionTime),
    engagementLevel,
  }
}
