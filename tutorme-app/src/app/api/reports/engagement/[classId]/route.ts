/**
 * GET /api/reports/engagement/[classId]
 * Export engagement report in Excel format
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum } from '@/lib/db/schema'
import { calculateClassEngagement } from '@/lib/reports/engagement-analytics'
import { generateEngagementReportExcel } from '@/lib/reports/export-service'
import { eq } from 'drizzle-orm'

export const GET = withAuth(async (req: NextRequest, _session, context) => {
  const classId = await getParamAsync(context?.params, 'classId')
  if (!classId) {
    return NextResponse.json(
      { success: false, error: 'Class ID required' },
      { status: 400 }
    )
  }
  const { searchParams } = new URL(req.url)
  const days = parseInt(searchParams.get('days') || '30')

  try {
    const [curriculumRow] = await drizzleDb
      .select({ name: curriculum.name, subject: curriculum.subject })
      .from(curriculum)
      .where(eq(curriculum.id, classId))
      .limit(1)

    if (!curriculumRow) {
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

    const excelBuffer = generateEngagementReportExcel(engagement, curriculumRow.name)

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
