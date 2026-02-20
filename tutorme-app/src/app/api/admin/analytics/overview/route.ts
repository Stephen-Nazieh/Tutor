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
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
