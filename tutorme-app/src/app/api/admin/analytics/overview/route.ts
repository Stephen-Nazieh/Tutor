import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  user,
  userActivityLog,
  liveSession,
  contentItem,
  curriculumEnrollment,
  securityEvent,
  payment,
  refund,
  sessionParticipant,
  taskSubmission,
  quizAttempt,
  videoWatchEvent,
  curriculumLessonProgress,
  poll,
  whiteboardSession,
} from '@/lib/db/schema'
import { eq, gte, lt, and, desc, sql } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.ANALYTICS_READ)

  if (!session) return response!

  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '7')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const [
      totalUsersRows,
      newUsersRows,
      activeUsersRows,
      totalSessionsRows,
      totalContentItemsRows,
      totalEnrollmentsRows,
      recentLoginsRows,
      usersByRoleRows,
      recentUserActivities,
      recentSecurityEvents,
      recentPayments,
      recentRefunds,
      recentLiveSessions,
      recentSessionParticipants,
      recentTaskSubmissions,
      recentQuizAttempts,
      recentVideoEvents,
      recentLessonProgress,
      recentPolls,
      recentWhiteboardSessions,
    ] = await Promise.all([
      drizzleDb.select({ count: sql<number>`count(*)::int` }).from(user),
      drizzleDb.select({ count: sql<number>`count(*)::int` }).from(user).where(gte(user.createdAt, startDate)),
      drizzleDb
        .select({ userId: userActivityLog.userId })
        .from(userActivityLog)
        .where(gte(userActivityLog.createdAt, startDate))
        .groupBy(userActivityLog.userId),
      drizzleDb.select({ count: sql<number>`count(*)::int` }).from(liveSession),
      drizzleDb.select({ count: sql<number>`count(*)::int` }).from(contentItem),
      drizzleDb.select({ count: sql<number>`count(*)::int` }).from(curriculumEnrollment),
      drizzleDb
        .select({ count: sql<number>`count(*)::int` })
        .from(userActivityLog)
        .where(and(eq(userActivityLog.action, 'login'), gte(userActivityLog.createdAt, startDate))),
      drizzleDb.select({ role: user.role, count: sql<number>`count(*)::int` }).from(user).groupBy(user.role),
      drizzleDb
        .select({ userId: userActivityLog.userId, action: userActivityLog.action, createdAt: userActivityLog.createdAt })
        .from(userActivityLog)
        .where(gte(userActivityLog.createdAt, startDate))
        .orderBy(desc(userActivityLog.createdAt))
        .limit(20000),
      drizzleDb
        .select({
          id: securityEvent.id,
          eventType: securityEvent.eventType,
          ip: securityEvent.ip,
          severity: securityEvent.severity,
          createdAt: securityEvent.createdAt,
          action: securityEvent.action,
        })
        .from(securityEvent)
        .where(gte(securityEvent.createdAt, startDate))
        .orderBy(desc(securityEvent.createdAt))
        .limit(5000),
      drizzleDb
        .select({
          id: payment.id,
          status: payment.status,
          amount: payment.amount,
          createdAt: payment.createdAt,
          paidAt: payment.paidAt,
        })
        .from(payment)
        .where(gte(payment.createdAt, startDate)),
      drizzleDb
        .select({ id: refund.id, status: refund.status, amount: refund.amount, createdAt: refund.createdAt })
        .from(refund)
        .where(gte(refund.createdAt, startDate)),
      drizzleDb
        .select({
          id: liveSession.id,
          status: liveSession.status,
          startedAt: liveSession.startedAt,
          endedAt: liveSession.endedAt,
        })
        .from(liveSession)
        .where(gte(liveSession.startedAt, startDate)),
      drizzleDb
        .select({ sessionId: sessionParticipant.sessionId, studentId: sessionParticipant.studentId, joinedAt: sessionParticipant.joinedAt })
        .from(sessionParticipant)
        .where(gte(sessionParticipant.joinedAt, startDate)),
      drizzleDb
        .select({ id: taskSubmission.id, studentId: taskSubmission.studentId, submittedAt: taskSubmission.submittedAt, score: taskSubmission.score })
        .from(taskSubmission)
        .where(gte(taskSubmission.submittedAt, startDate)),
      drizzleDb
        .select({ id: quizAttempt.id, studentId: quizAttempt.studentId, startedAt: quizAttempt.startedAt, score: quizAttempt.score })
        .from(quizAttempt)
        .where(gte(quizAttempt.startedAt, startDate)),
      drizzleDb
        .select({ id: videoWatchEvent.id, studentId: videoWatchEvent.studentId, createdAt: videoWatchEvent.createdAt })
        .from(videoWatchEvent)
        .where(gte(videoWatchEvent.createdAt, startDate)),
      drizzleDb
        .select({
          id: curriculumLessonProgress.id,
          studentId: curriculumLessonProgress.studentId,
          updatedAt: curriculumLessonProgress.updatedAt,
          status: curriculumLessonProgress.status,
        })
        .from(curriculumLessonProgress)
        .where(gte(curriculumLessonProgress.updatedAt, startDate)),
      drizzleDb
        .select({ id: poll.id, status: poll.status, createdAt: poll.createdAt, totalResponses: poll.totalResponses })
        .from(poll)
        .where(gte(poll.createdAt, startDate)),
      drizzleDb
        .select({ id: whiteboardSession.id, roomId: whiteboardSession.roomId, startedAt: whiteboardSession.startedAt })
        .from(whiteboardSession)
        .where(gte(whiteboardSession.startedAt, startDate)),
    ])

    const totalUsers = totalUsersRows[0]?.count ?? 0
    const newUsers = newUsersRows[0]?.count ?? 0
    const activeUsers = activeUsersRows.length
    const totalSessions = totalSessionsRows[0]?.count ?? 0
    const totalContentItems = totalContentItemsRows[0]?.count ?? 0
    const totalEnrollments = totalEnrollmentsRows[0]?.count ?? 0
    const recentLogins = recentLoginsRows[0]?.count ?? 0

    const previousPeriodStart = new Date(startDate)
    previousPeriodStart.setDate(previousPeriodStart.getDate() - days)

    const [previousNewUsersRows] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(user)
      .where(and(gte(user.createdAt, previousPeriodStart), lt(user.createdAt, startDate)))

    const previousNewUsers = previousNewUsersRows?.count ?? 0
    const userGrowthRate = previousNewUsers > 0 ? ((newUsers - previousNewUsers) / previousNewUsers) * 100 : 0

    const dayBuckets = Array.from({ length: days }, (_, i) => {
      const d = new Date()
      d.setHours(0, 0, 0, 0)
      d.setDate(d.getDate() - (days - 1 - i))
      return d
    })
    const toDayKey = (dt: Date) => {
      const d = new Date(dt)
      d.setHours(0, 0, 0, 0)
      return d.toISOString().slice(0, 10)
    }
    const bucketMap = new Map<string, Set<string>>()
    for (const d of dayBuckets) bucketMap.set(d.toISOString().slice(0, 10), new Set<string>())
    for (const act of recentUserActivities) {
      const k = toDayKey(act.createdAt)
      const s = bucketMap.get(k)
      if (s) s.add(act.userId)
    }
    const dauTrend = dayBuckets.map((d) => {
      const key = d.toISOString().slice(0, 10)
      return { date: key, activeUsers: bucketMap.get(key)?.size ?? 0 }
    })

    const actionCounts = new Map<string, number>()
    for (const act of recentUserActivities) {
      actionCounts.set(act.action, (actionCounts.get(act.action) || 0) + 1)
    }
    const topActions = Array.from(actionCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([action, count]) => ({ action, count }))

    const paidPayments = recentPayments.filter((p) => p.status === 'COMPLETED')
    const pendingPayments = recentPayments.filter((p) => p.status === 'PENDING' || p.status === 'PROCESSING')
    const refundedPayments = recentPayments.filter((p) => p.status === 'REFUNDED')
    const paymentVolume = recentPayments.reduce((sum, p) => sum + (p.amount || 0), 0)
    const paymentSuccessRate = recentPayments.length > 0 ? (paidPayments.length / recentPayments.length) * 100 : 0
    const refundRate = recentPayments.length > 0 ? (refundedPayments.length / recentPayments.length) * 100 : 0

    const failedLoginEvents = recentSecurityEvents.filter(
      (e) =>
        e.eventType?.toLowerCase().includes('auth_failed') || e.action?.toLowerCase().includes('login_failed')
    )
    const criticalSecurityEvents = recentSecurityEvents.filter(
      (e) => (e.severity || '').toLowerCase() === 'critical'
    )
    const suspiciousIps = new Set(
      failedLoginEvents.map((e) => e.ip).filter((v): v is string => Boolean(v))
    )

    const sessionParticipantCount = new Map<string, Set<string>>()
    for (const p of recentSessionParticipants) {
      if (!sessionParticipantCount.has(p.sessionId))
        sessionParticipantCount.set(p.sessionId, new Set<string>())
      sessionParticipantCount.get(p.sessionId)?.add(p.studentId)
    }
    const avgParticipantsPerLive =
      recentLiveSessions.length > 0
        ? recentLiveSessions.reduce(
            (sum, s) => sum + (sessionParticipantCount.get(s.id)?.size || 0),
            0
          ) / recentLiveSessions.length
        : 0

    const activeFeatureUsers = new Set<string>()
    for (const s of recentTaskSubmissions) activeFeatureUsers.add(s.studentId)
    for (const q of recentQuizAttempts) activeFeatureUsers.add(q.studentId)
    for (const v of recentVideoEvents) activeFeatureUsers.add(v.studentId)
    for (const l of recentLessonProgress) activeFeatureUsers.add(l.studentId)

    const featureUsage = [
      { feature: 'Live Sessions', usageCount: recentLiveSessions.length },
      { feature: 'Polls', usageCount: recentPolls.length },
      { feature: 'Whiteboard Sessions', usageCount: recentWhiteboardSessions.length },
      { feature: 'Task Submissions', usageCount: recentTaskSubmissions.length },
      { feature: 'Quiz Attempts', usageCount: recentQuizAttempts.length },
      { feature: 'Video Learning', usageCount: recentVideoEvents.length },
      { feature: 'Lesson Progress Updates', usageCount: recentLessonProgress.length },
      { feature: 'Payments Initiated', usageCount: recentPayments.length },
      { feature: 'Refund Requests', usageCount: recentRefunds.length },
    ]

    const payingUsers = new Set(
      paidPayments
        .map((p) => {
          const maybe = recentUserActivities.find((a) => a.createdAt <= (p.createdAt ?? new Date(0)))
          return maybe?.userId
        })
        .filter((v): v is string => Boolean(v))
    ).size

    const funnel = {
      registrations: newUsers,
      activeUsers,
      learningActiveUsers: activeFeatureUsers.size,
      payingUsers,
    }

    const enterprise = {
      featureUsage,
      userAnalytics: {
        dauTrend,
        topActions,
        averageActionsPerActiveUser:
          activeUsers > 0 ? Math.round((recentUserActivities.length / activeUsers) * 100) / 100 : 0,
      },
      paymentAnalytics: {
        totalPayments: recentPayments.length,
        paymentVolume: Math.round(paymentVolume * 100) / 100,
        paymentSuccessRate: Math.round(paymentSuccessRate * 100) / 100,
        refundRate: Math.round(refundRate * 100) / 100,
        pendingPayments: pendingPayments.length,
      },
      liveClassAnalytics: {
        sessionsCreated: recentLiveSessions.length,
        avgParticipantsPerSession: Math.round(avgParticipantsPerLive * 100) / 100,
        pollResponses: recentPolls.reduce((sum, p) => sum + (p.totalResponses || 0), 0),
        whiteboardSessions: recentWhiteboardSessions.length,
      },
      securityAnalytics: {
        failedLogins: failedLoginEvents.length,
        criticalEvents: criticalSecurityEvents.length,
        suspiciousIpCount: suspiciousIps.size,
      },
      funnel,
    }

    return NextResponse.json({
      summary: {
        totalUsers,
        newUsers,
        activeUsers,
        userGrowthRate: Math.round(userGrowthRate * 100) / 100,
        totalSessions,
        totalContentItems,
        totalEnrollments,
        recentLogins,
      },
      usersByRole: usersByRoleRows.map((r) => ({ role: r.role, count: r.count })),
      enterprise,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
