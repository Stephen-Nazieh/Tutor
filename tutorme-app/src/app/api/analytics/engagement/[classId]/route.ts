/**
 * GET /api/analytics/engagement/[classId]
 * Get class engagement metrics with trends and patterns
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { calculateClassEngagement, EngagementCalculationOptions } from '@/lib/reports/engagement-analytics'

export const GET = withAuth(async (req: NextRequest, session, context: any) => {
  const params = await context?.params
  const classId = params?.classId

  // Parse query parameters
  const { searchParams } = new URL(req.url)
  const days = parseInt(searchParams.get('days') || '30')
  const includeDaily = searchParams.get('daily') !== 'false'
  const includeHourly = searchParams.get('hourly') !== 'false'

  const endDate = new Date()
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const options: EngagementCalculationOptions = {
    startDate,
    endDate,
    includeDailyTrend: includeDaily,
    includeHourlyPattern: includeHourly,
  }

  try {
    const engagement = await calculateClassEngagement(classId, options)

    return NextResponse.json({
      success: true,
      data: engagement,
    })
  } catch (error) {
    console.error('Error calculating engagement:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate engagement metrics' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
