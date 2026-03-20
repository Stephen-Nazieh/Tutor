/**
 * GET /api/analytics/students/[studentId]
 * Get comprehensive performance analytics for a student
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { getStudentPerformance } from '@/lib/performance/student-analytics'
import { tutorHasStudent } from '@/lib/security/tutor-student-access'

export const GET = withAuth(async (req, session, context) => {
  const studentId = await getParamAsync(context?.params, 'studentId')
  if (!studentId) {
    return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
  }
  const { searchParams } = new URL(req.url)
  const curriculumId = searchParams.get('curriculumId') || undefined

  const isOwnRecord = session.user.role === 'STUDENT' && session.user.id === studentId
  const isAdmin = session.user.role === 'ADMIN'
  const isTutor = session.user.role === 'TUTOR'

  if (!isOwnRecord && !isAdmin && !isTutor) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (isTutor) {
    const hasRelation = await tutorHasStudent(session.user.id, studentId)
    if (!hasRelation) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const performance = await getStudentPerformance(studentId, curriculumId)

  return NextResponse.json({
    success: true,
    data: performance,
  })
})
