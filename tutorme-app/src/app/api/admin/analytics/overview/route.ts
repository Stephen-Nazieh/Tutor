import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
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

    // Get various metrics
    const [
      totalUsers,
      newUsers,
      activeUsers,
      totalSessions,
      totalContentItems,
      totalEnrollments,
      recentLogins,
      usersByRole,
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
      // Total users
      prisma.user.count(),

      // New users in period
      prisma.user.count({
        where: { createdAt: { gte: startDate } },
      }),

      // Active users (had activity in period)
      prisma.userActivityLog.groupBy({
        by: ['userId'],
        where: { createdAt: { gte: startDate } },
        _count: { userId: true },
      }).then((r: Array<Record<string, unknown>>) => r.length),

      // Total live sessions
      prisma.liveSession.count(),

      // Total content items
      prisma.contentItem.count(),

      // Total enrollments
      prisma.curriculumEnrollment.count(),

      // Recent login activity
      prisma.userActivityLog.count({
        where: {
          action: 'login',
          createdAt: { gte: startDate },
        },
      }),

      // Users by role
      prisma.user.groupBy({
        by: ['role'],
        _count: { id: true },
      }),
      prisma.userActivityLog.findMany({
        where: { createdAt: { gte: startDate } },
        select: { userId: true, action: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 20000,
      }),
      prisma.securityEvent.findMany({
        where: { createdAt: { gte: startDate } },
        select: { id: true, eventType: true, ip: true, severity: true, createdAt: true, action: true },
        orderBy: { createdAt: 'desc' },
        take: 5000,
      }),
      prisma.payment.findMany({
        where: { createdAt: { gte: startDate } },
        select: { id: true, status: true, amount: true, createdAt: true, paidAt: true },
      }),
      prisma.refund.findMany({
        where: { createdAt: { gte: startDate } },
        select: { id: true, status: true, amount: true, createdAt: true },
      }),
      prisma.liveSession.findMany({
        where: { createdAt: { gte: startDate } },
        select: { id: true, status: true, createdAt: true, startedAt: true, endedAt: true },
      }),
      prisma.sessionParticipant.findMany({
        where: { joinedAt: { gte: startDate } },
        select: { sessionId: true, studentId: true, joinedAt: true },
      }),
      prisma.taskSubmission.findMany({
        where: { submittedAt: { gte: startDate } },
        select: { id: true, studentId: true, submittedAt: true, score: true },
      }),
      prisma.quizAttempt.findMany({
        where: { startedAt: { gte: startDate } },
        select: { id: true, studentId: true, startedAt: true, score: true },
      }),
      prisma.videoWatchEvent.findMany({
        where: { watchedAt: { gte: startDate } },
        select: { id: true, studentId: true, watchedAt: true, completed: true },
      }),
      prisma.curriculumLessonProgress.findMany({
        where: { updatedAt: { gte: startDate } },
        select: { id: true, studentId: true, updatedAt: true, status: true },
      }),
      prisma.poll.findMany({
        where: { createdAt: { gte: startDate } },
        select: { id: true, status: true, createdAt: true, totalResponses: true },
      }),
      prisma.whiteboardSession.findMany({
        where: { startedAt: { gte: startDate } },
        select: { id: true, roomId: true, startedAt: true },
      }),
    ])

    // Calculate growth rates
    const previousPeriodStart = new Date(startDate)
    previousPeriodStart.setDate(previousPeriodStart.getDate() - days)

    const previousNewUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: previousPeriodStart,
          lt: startDate,
        },
      },
    })

    const userGrowthRate = previousNewUsers > 0
      ? ((newUsers - previousNewUsers) / previousNewUsers) * 100
      : 0

    // Enterprise analytics
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

    const paidPayments = recentPayments.filter((p: any) => p.status === 'COMPLETED')
    const pendingPayments = recentPayments.filter((p: any) => p.status === 'PENDING' || p.status === 'PROCESSING')
    const refundedPayments = recentPayments.filter((p: any) => p.status === 'REFUNDED')
    const paymentVolume = recentPayments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0)
    const paymentSuccessRate = recentPayments.length > 0 ? (paidPayments.length / recentPayments.length) * 100 : 0
    const refundRate = recentPayments.length > 0 ? (refundedPayments.length / recentPayments.length) * 100 : 0

    const failedLoginEvents = recentSecurityEvents.filter((e: any) =>
      e.eventType?.toLowerCase().includes('auth_failed') || e.action?.toLowerCase().includes('login_failed')
    )
    const criticalSecurityEvents = recentSecurityEvents.filter((e: any) => (e.severity || '').toLowerCase() === 'critical')
    const suspiciousIps = new Set(failedLoginEvents.map((e: any) => e.ip).filter(Boolean as unknown as (v: string | null) => v is string))

    const sessionParticipantCount = new Map<string, Set<string>>()
    for (const p of recentSessionParticipants) {
      if (!sessionParticipantCount.has(p.sessionId)) sessionParticipantCount.set(p.sessionId, new Set<string>())
      sessionParticipantCount.get(p.sessionId)?.add(p.studentId)
    }
    const avgParticipantsPerLive = recentLiveSessions.length > 0
      ? recentLiveSessions.reduce((sum: number, s: any) => sum + (sessionParticipantCount.get(s.id)?.size || 0), 0) / recentLiveSessions.length
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

    const funnel = {
      registrations: newUsers,
      activeUsers,
      learningActiveUsers: activeFeatureUsers.size,
      payingUsers: new Set(
        paidPayments
          .map((p: any) => {
            const maybe = recentUserActivities.find((a: any) => a.createdAt <= p.createdAt)
            return maybe?.userId
          })
          .filter(Boolean as unknown as (v: string | undefined) => v is string)
      ).size,
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
        pollResponses: recentPolls.reduce((sum: number, p: any) => sum + (p.totalResponses || 0), 0),
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
      usersByRole: usersByRole.map((r: Record<string, unknown>) => ({
        role: r.role,
        count: (r._count as Record<string, number>).id,
      })),
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
