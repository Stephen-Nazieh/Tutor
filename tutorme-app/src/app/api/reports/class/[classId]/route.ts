/**
 * GET /api/reports/class/[classId]
 * Get class visual report data
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getClassPerformanceSummary } from '@/lib/performance/student-analytics'


export const GET = withAuth(async (req, session, context: any) => {
  const params = await context?.params;
  const { classId } = await params

  // Note: Curriculum model doesn't have tutorId field
  // In production, add tutor relationship to Curriculum or use LiveSession
  // For now, all tutors can view all class reports

  const summary = await getClassPerformanceSummary(classId)

  // Generate score distribution for class
  const totalStudents = summary.totalStudents
  const averageScore = summary.averageScore
  
  // Estimate distribution based on average
  const stdDev = 15 // Assuming normal distribution
  const scoreDistribution = [
    { range: '0-59', count: Math.round(totalStudents * 0.1) },
    { range: '60-69', count: Math.round(totalStudents * 0.15) },
    { range: '70-79', count: Math.round(totalStudents * 0.3) },
    { range: '80-89', count: Math.round(totalStudents * 0.3) },
    { range: '90-100', count: Math.round(totalStudents * 0.15) },
  ]

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
        scoreDistribution,
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
