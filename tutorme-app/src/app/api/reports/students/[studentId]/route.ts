/**
 * GET /api/reports/students/[studentId]
 * Get visual report data for a student
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getStudentPerformance, getQuestionLevelBreakdown } from '@/lib/performance/student-analytics'


export const GET = withAuth(async (req, session, { params }) => {
  const { studentId } = await params
  const { searchParams } = new URL(req.url)
  const curriculumId = searchParams.get('curriculumId') || undefined
  const includeQuestionLevel = searchParams.get('includeQuestionLevel') === 'true'

  // Access policy: tutor + student(self) + admin
  const isOwnRecord = session.user.role === 'STUDENT' && session.user.id === studentId
  const isTutor = session.user.role === 'TUTOR'
  const isAdmin = session.user.role === 'ADMIN'

  if (!isOwnRecord && !isTutor && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const performance = await getStudentPerformance(studentId, curriculumId)

  // Format data for charts
  const scoreDistribution = [
    { range: '0-59', count: performance.overallMetrics.averageScore < 60 ? 1 : 0 },
    { range: '60-69', count: performance.overallMetrics.averageScore >= 60 && performance.overallMetrics.averageScore < 70 ? 1 : 0 },
    { range: '70-79', count: performance.overallMetrics.averageScore >= 70 && performance.overallMetrics.averageScore < 80 ? 1 : 0 },
    { range: '80-89', count: performance.overallMetrics.averageScore >= 80 && performance.overallMetrics.averageScore < 90 ? 1 : 0 },
    { range: '90-100', count: performance.overallMetrics.averageScore >= 90 ? 1 : 0 },
  ]

  const trendData = performance.taskHistory.map((task) => ({
    date: new Date(task.completedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
    score: task.score,
  }))

  const skillsData = [
    { skill: '理解能力', score: performance.overallMetrics.averageScore, fullMark: 100 },
    { skill: '应用能力', score: performance.overallMetrics.completionRate, fullMark: 100 },
    { skill: '参与度', score: performance.overallMetrics.participationRate, fullMark: 100 },
    { skill: '出勤率', score: performance.overallMetrics.attendanceRate, fullMark: 100 },
    { skill: '学习投入', score: performance.overallMetrics.engagementScore, fullMark: 100 },
  ]

  const topicMastery = buildTopicMastery(
    performance.subjectStrengths,
    performance.subjectWeaknesses,
    performance.overallMetrics.averageScore
  )

  const questionLevel = includeQuestionLevel ? await getQuestionLevelBreakdown(studentId) : undefined

  return NextResponse.json({
    success: true,
    data: {
      studentInfo: {
        id: studentId,
        cluster: performance.performanceCluster,
        pace: performance.pace,
        learningStyle: performance.learningStyle,
      },
      overallMetrics: performance.overallMetrics,
      charts: {
        scoreDistribution,
        trendData,
        skillsData,
        topicMastery: topicMastery.length > 0 ? topicMastery : [{ topic: '暂无数据', mastery: 0 }],
      },
      strengths: performance.subjectStrengths,
      weaknesses: performance.subjectWeaknesses,
      recommendations: generateRecommendations(performance),
      ...(questionLevel && { questionLevel }),
    }
  })
})

interface RecommendationMetrics {
  overallMetrics: {
    averageScore: number
    completionRate: number
    attendanceRate: number
  }
  subjectWeaknesses: string[]
  commonMistakes: Array<{ type: string }>
}

function generateRecommendations(performance: RecommendationMetrics): string[] {
  const recommendations: string[] = []

  if (performance.overallMetrics.averageScore < 60) {
    recommendations.push('建议加强基础知识学习，参加课后辅导')
  }
  if (performance.overallMetrics.completionRate < 70) {
    recommendations.push('需要提高作业完成率，按时提交作业')
  }
  if (performance.overallMetrics.attendanceRate < 80) {
    recommendations.push('出勤率偏低，请保证课堂出勤')
  }
  if (performance.subjectWeaknesses.length > 0) {
    recommendations.push(`重点加强：${performance.subjectWeaknesses.slice(0, 2).join('、')}`)
  }
  if (performance.commonMistakes.length > 0) {
    recommendations.push(`注意常见错误类型：${performance.commonMistakes[0].type}`)
  }

  if (recommendations.length === 0) {
    recommendations.push('表现优秀，继续保持！')
    recommendations.push('可以尝试更有挑战性的拓展内容')
  }

  return recommendations
}

function buildTopicMastery(strengths: string[], weaknesses: string[], averageScore: number): Array<{ topic: string; mastery: number }> {
  const strengthBase = Math.max(70, Math.min(98, Math.round(averageScore + 12)))
  const weaknessBase = Math.max(20, Math.min(65, Math.round(averageScore - 18)))

  return [
    ...strengths.map((topic, index) => ({
      topic,
      mastery: Math.min(100, strengthBase - index * 3),
    })),
    ...weaknesses.map((topic, index) => ({
      topic,
      mastery: Math.max(0, weaknessBase - index * 4),
    })),
  ]
}
