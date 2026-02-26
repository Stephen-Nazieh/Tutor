/**
 * GET /api/analytics/class/[classId]
 * Get class-wide performance analytics
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getClassPerformanceSummary } from '@/lib/performance/student-analytics'


export const GET = withAuth(async (req, session, context: any) => {
  const params = await context?.params
  const classId = params?.classId

  // Note: Curriculum model doesn't have tutorId field
  // In production, add tutor relationship to Curriculum or use LiveSession
  // For now, all tutors can view all class analytics

  const summary = await getClassPerformanceSummary(classId)

  return NextResponse.json({
    success: true,
    data: summary
  })
}, { role: 'TUTOR' })
