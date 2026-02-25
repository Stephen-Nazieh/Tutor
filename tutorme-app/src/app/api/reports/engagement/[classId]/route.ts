/**
 * GET /api/reports/engagement/[classId]
 * Export engagement report in Excel format
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { calculateClassEngagement } from '@/lib/reports/engagement-analytics'
import { generateEngagementReportExcel } from '@/lib/reports/export-service'

export const GET = withAuth(async (req: NextRequest, session, context: any) => {
  const params = await context?.params;
  const { classId } = await params
  const { searchParams } = new URL(req.url)
  const days = parseInt(searchParams.get('days') || '30')

  try {
    // Get class info
    const curriculum = await db.curriculum.findUnique({
      where: { id: classId },
      select: { title: true, subject: true },
    })

    if (!curriculum) {
      return NextResponse.json(
        { success: false, error: 'Class not found' },
        { status: 404 }
      )
    }

    const endDate = new Date()
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const engagement = await calculateClassEngagement(classId, {
      startDate,
      endDate,
      includeDailyTrend: true,
      includeHourlyPattern: true,
    })

    const excelBuffer = generateEngagementReportExcel(engagement, curriculum.title)

    return new NextResponse(excelBuffer as any, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="engagement-report-${classId}.xlsx"`,
      },
    })
  } catch (error) {
    console.error('Error generating engagement export:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate engagement report' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
