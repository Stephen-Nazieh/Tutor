/**
 * Class Engagement Analytics Service
 * Calculates comprehensive engagement metrics for classes and live sessions
 */

import { db } from '@/lib/db'
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

  // Get all students enrolled in the class
  const enrollments = await db.curriculumEnrollment.findMany({
    where: { curriculumId: classId },
    select: { studentId: true },
  })
  const studentIds = enrollments.map(e => e.studentId)

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
  // Get live sessions for this class/curriculum
  const sessions = await db.liveSession.findMany({
    where: {
      classId,
      scheduledAt: { gte: startDate, lte: endDate },
    },
    include: {
      participants: {
        where: {
          studentId: { in: studentIds },
        },
      },
    },
  })

  if (sessions.length === 0) {
    return { rate: 0, sessions: 0, attended: 0 }
  }

  let totalPossibleAttendances = studentIds.length * sessions.length
  let actualAttendances = 0

  for (const session of sessions) {
    actualAttendances += session.participants.filter(p => p.joinedAt !== null).length
  }

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
  const messageCount = await db.message.count({
    where: {
      userId: { in: studentIds },
      createdAt: { gte: startDate, lte: endDate },
    },
  })

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
  const submissions = await db.taskSubmission.findMany({
    where: {
      studentId: { in: studentIds },
      submittedAt: { gte: startDate, lte: endDate },
    },
    include: {
      task: true,
    },
  })

  const completed = submissions.filter(s => s.status === 'graded').length
  
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
  const attempts = await db.quizAttempt.findMany({
    where: {
      studentId: { in: studentIds },
      completedAt: { gte: startDate, lte: endDate },
    },
  })

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
  const messages = await db.message.findMany({
    where: {
      userId: { in: studentIds },
      createdAt: { gte: startDate, lte: endDate },
    },
  })

  // Count messages that are questions or replies (longer messages indicate discussion)
  const discussionMessages = messages.filter(m => {
    const content = (m.content as string) || ''
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

    // Get sessions for this day
    const sessions = await db.liveSession.findMany({
      where: {
        classId,
        scheduledAt: { gte: dayStart, lt: dayEnd },
      },
      include: {
        participants: {
          where: { studentId: { in: studentIds } },
        },
      },
    })

    // Calculate attendance for the day
    const totalPossible = studentIds.length * sessions.length
    const actualAttended = sessions.reduce((sum, s) => 
      sum + s.participants.filter(p => p.joinedAt !== null).length, 0
    )
    const dayAttendance = totalPossible > 0 ? (actualAttended / totalPossible) * 100 : 0

    // Get messages for engagement calculation
    const messages = await db.message.count({
      where: {
        userId: { in: studentIds },
        createdAt: { gte: dayStart, lt: dayEnd },
      },
    })
    
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
  const messages = await db.message.findMany({
    where: {
      userId: { in: studentIds },
      createdAt: { gte: startDate, lte: endDate },
    },
    select: {
      createdAt: true,
    },
  })

  // Count messages by hour
  const hourCounts: Record<number, number> = {}
  for (let i = 0; i < 24; i++) {
    hourCounts[i] = 0
  }

  messages.forEach(m => {
    const hour = new Date(m.createdAt).getHours()
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
    // Get individual student metrics
    const attendanceCount = await db.sessionParticipant.count({
      where: {
        studentId,
        joinedAt: { not: null },
      },
    })
    
    const assignmentCount = await db.taskSubmission.count({
      where: {
        studentId,
        status: 'graded',
      },
    })
    
    const quizCount = await db.quizAttempt.count({
      where: { studentId },
    })

    // Simplified risk assessment
    // (In production, compare against expected counts)
    if (attendanceCount < 2 || assignmentCount < 2 || quizCount < 1) {
      const student = await db.user.findUnique({
        where: { id: studentId },
        select: { profile: { select: { name: true } } },
      })
      atRisk.push(student?.profile?.name || `Student-${studentId.slice(-6)}`)
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
  const session = await db.liveSession.findUnique({
    where: { id: sessionId },
    include: {
      participants: true,
      _count: {
        select: { participants: true },
      },
    },
  })

  if (!session) {
    return {
      activeStudents: 0,
      totalStudents: 0,
      chatMessagesLast5Min: 0,
      averageSessionTime: 0,
      engagementLevel: 'low',
    }
  }

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
  
  const recentMessages = await db.message.count({
    where: {
      sessionId,
      createdAt: { gte: fiveMinutesAgo },
    },
  })

  const activeParticipants = session.participants.filter(p => {
    if (!p.joinedAt) return false
    // Consider active if joined within last 30 minutes
    const joinedTime = new Date(p.joinedAt).getTime()
    return Date.now() - joinedTime < 30 * 60 * 1000
  })

  // Calculate average session time
  const sessionTimes = session.participants
    .filter(p => p.joinedAt && p.leftAt)
    .map(p => {
      const joined = new Date(p.joinedAt!).getTime()
      const left = new Date(p.leftAt!).getTime()
      return (left - joined) / 1000 / 60 // minutes
    })
  
  const avgSessionTime = sessionTimes.length > 0
    ? sessionTimes.reduce((a, b) => a + b, 0) / sessionTimes.length
    : 0

  // Determine engagement level
  const participationRate = session._count.participants > 0
    ? (activeParticipants.length / session._count.participants) * 100
    : 0
  
  let engagementLevel: 'high' | 'medium' | 'low' = 'low'
  if (participationRate >= 70 && recentMessages >= 5) {
    engagementLevel = 'high'
  } else if (participationRate >= 40 || recentMessages >= 2) {
    engagementLevel = 'medium'
  }

  return {
    activeStudents: activeParticipants.length,
    totalStudents: session._count.participants,
    chatMessagesLast5Min: recentMessages,
    averageSessionTime: Math.round(avgSessionTime),
    engagementLevel,
  }
}
