/**
 * GET /api/analytics/students/[studentId]
 * Get comprehensive performance analytics for a student
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { getStudentPerformance } from '@/lib/performance/student-analytics'


export const GET = withAuth(async (req, session, context) => {
  const studentId = await getParamAsync(context?.params, 'studentId')
  if (!studentId) {
    return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
  }
  const { searchParams } = new URL(req.url)
  const curriculumId = searchParams.get('curriculumId') || undefined

  // Check permissions - only the student themselves, their tutor, or admin can view
  const isOwnRecord = session.user.id === studentId
  const isAdmin = session.user.role === 'ADMIN'

  if (!isOwnRecord && !isAdmin) {
    // If not own record and not admin, still allow (tutor role is already checked by middleware)
    // If tutor, verify they have a relationship with this student
    // Note: This check is simplified as Curriculum doesn't have tutorId
    // In production, add proper tutor-curriculum relationship
    // For now, allow all tutors to view student analytics
    // TODO: Add proper relationship check when Curriculum model has tutorId
  }

  const performance = await getStudentPerformance(studentId, curriculumId)

  return NextResponse.json({
    success: true,
    data: performance
  })
}, { role: 'TUTOR' })
