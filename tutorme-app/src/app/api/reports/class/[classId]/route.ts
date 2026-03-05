/**
 * GET /api/reports/class/[classId]
 * Get class visual report data
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { getClassPerformanceSummary } from '@/lib/performance/student-analytics'
import { tutorOwnsCurriculum } from '@/lib/security/tutor-student-access'


export const GET = withAuth(async (_req, session, context) => {
  const classId = await getParamAsync(context?.params, 'classId')
  if (!classId) {
    return NextResponse.json({ error: 'Class ID required' }, { status: 400 })
  }

  const isAdmin = session.user.role === 'ADMIN'
  if (!isAdmin) {
    const ownsCurriculum = await tutorOwnsCurriculum(session.user.id, classId)
    if (!ownsCurriculum) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const summary = await getClassPerformanceSummary(classId)

  // Cluster distribution
  const clusterDistribution = [
    { name: '优秀', count: summary.clusterDistribution.advanced, color: '#22c55e' },
    { name: '中等', count: summary.clusterDistribution.intermediate, color: '#eab308' },
    { name: '需帮助', count: summary.clusterDistribution.struggling, color: '#ef4444' },
  ]

  return NextResponse.json({
    success: true,
    data: {
      classInfo: {
        id: classId,
        totalStudents: summary.totalStudents,
        averageScore: summary.averageScore,
      },
      charts: {
        scoreDistribution: summary.scoreDistribution,
        clusterDistribution,
      },
      topStudents: summary.topStudents,
      studentsNeedingAttention: summary.studentsNeedingAttention,
      summary: {
        totalStudents: summary.totalStudents,
        averageScore: summary.averageScore,
        advancedCount: summary.clusterDistribution.advanced,
        intermediateCount: summary.clusterDistribution.intermediate,
        strugglingCount: summary.clusterDistribution.struggling,
      }
    }
  })
}, { role: 'TUTOR' })
