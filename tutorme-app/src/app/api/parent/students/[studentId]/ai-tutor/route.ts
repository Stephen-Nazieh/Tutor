/**
 * GET /api/parent/students/[studentId]/ai-tutor
 * Returns AI tutor interaction history, session summaries, and performance metrics for a student
 * Parent must own this student via family account
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, and, gte, inArray, desc } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  lessonSession,
  aITutorEnrollment,
  aITutorDailyUsage,
  userActivityLog,
  aIInteractionSession,
} from '@/lib/db/schema'

export const GET = withAuth(
  async (req: NextRequest, session, context) => {
    const studentId = await getParamAsync(context?.params, 'studentId')
    if (!studentId) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
    }

    const family = await getFamilyAccountForParent(session)
    if (!family) {
      return NextResponse.json({ error: '未找到家庭账户' }, { status: 404 })
    }

    if (!family.studentIds.includes(studentId)) {
      return NextResponse.json(
        { error: '无权查看该学生的AI辅导数据' },
        { status: 403 }
      )
    }

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Parallel fetching of all AI-related data
    const [
      sessions,
      enrollmentsData,
      dailyUsageData,
      activities,
      interactions
    ] = await Promise.all([
      drizzleDb.query.lessonSession.findMany({
        where: eq(lessonSession.studentId, studentId),
        with: {
          lesson: {
            with: {
              module: { with: { curriculum: { columns: { name: true } } } }
            },
            columns: { id: true, title: true }
          }
        },
        orderBy: [desc(lessonSession.lastActivityAt)],
        limit: 30,
      }),
      drizzleDb.query.aITutorEnrollment.findMany({
        where: eq(aITutorEnrollment.studentId, studentId),
      }),
      drizzleDb.query.aITutorDailyUsage.findMany({
        where: and(
          eq(aITutorDailyUsage.userId, studentId),
          gte(aITutorDailyUsage.date, thirtyDaysAgo)
        ),
        orderBy: [desc(aITutorDailyUsage.date)],
        limit: 30,
      }),
      drizzleDb.query.userActivityLog.findMany({
        where: and(
          eq(userActivityLog.userId, studentId),
          inArray(userActivityLog.action, [
            'AI_CONVERSATION',
            'ai_conversation',
            'AI_SESSION_START',
            'AI_SESSION_END',
            'ai_session_start',
            'ai_session_end',
          ])
        ),
        orderBy: [desc(userActivityLog.createdAt)],
        limit: 50,
      }),
      drizzleDb.query.aIInteractionSession.findMany({
        where: eq(aIInteractionSession.studentId, studentId),
        orderBy: [desc(aIInteractionSession.startedAt)],
        limit: 20,
      }).catch(() => []) // Gracefully handle if table doesn't exist or schema mismatch
    ])

    const sessionSummaries = sessions.map((ls: any) => {
      const context = (ls.sessionContext as Record<string, unknown>) || {}
      const messages = (context.messages as Array<{ role: string; content: string }>) || []
      const lastMessage = context.lastMessage as string | undefined
      const lastResponse = context.lastResponse as string | undefined
      return {
        id: ls.id,
        lessonId: ls.lessonId,
        lessonTitle: ls.lesson?.title ?? null,
        curriculumName: ls.lesson?.module?.curriculum?.name ?? null,
        status: ls.status,
        currentSection: ls.currentSection,
        conceptMastery: ls.conceptMastery as Record<string, number>,
        messageCount: messages.length,
        lastMessage: lastMessage ?? null,
        lastResponse: lastResponse ?? null,
        startedAt: ls.startedAt.toISOString(),
        lastActivityAt: ls.lastActivityAt.toISOString(),
        completedAt: ls.completedAt?.toISOString() ?? null,
      }
    })

    const interactionSessions = interactions.map((s: any) => ({
      id: s.id,
      subjectCode: s.subjectCode,
      startedAt: s.startedAt.toISOString(),
      endedAt: s.endedAt?.toISOString() ?? null,
      messageCount: s.messageCount,
      topicsCovered: s.topicsCovered as string[],
      summary: s.summary,
    }))

    // 6. Performance metrics
    const totalSessions =
      sessionSummaries.filter((s: any) => s.status === 'completed').length +
      interactionSessions.length
    const totalMessages = sessionSummaries.reduce((s: any, x: any) => s + x.messageCount, 0) +
      interactionSessions.reduce((s: any, x: any) => s + x.messageCount, 0)
    const totalMinutes = dailyUsageData.reduce((s: any, u: any) => s + u.minutesUsed, 0)
    const avgMessagesPerSession =
      totalSessions > 0 ? Math.round(totalMessages / totalSessions) : 0

    return NextResponse.json({
      success: true,
      data: {
        sessionSummaries,
        enrollments: enrollmentsData.map((e: any) => ({
          subjectCode: e.subjectCode,
          enrolledAt: e.enrolledAt.toISOString(),
          lastSessionAt: e.lastSessionAt?.toISOString() ?? null,
          totalSessions: e.totalSessions,
          totalMinutes: e.totalMinutes,
          status: e.status,
        })),
        dailyUsage: dailyUsageData.map((u: any) => ({
          date: u.date.toISOString().slice(0, 10),
          sessionCount: u.sessionCount,
          messageCount: u.messageCount,
          minutesUsed: u.minutesUsed,
        })),
        recentActivities: activities.map((a: any) => ({
          id: a.id,
          action: a.action,
          metadata: a.metadata,
          createdAt: a.createdAt.toISOString(),
        })),
        interactionSessions,
        metrics: {
          totalSessions,
          totalMessages,
          totalMinutes,
          avgMessagesPerSession,
          activeSubjects: enrollmentsData.length,
        },
        recommendations: generateRecommendations(
          totalSessions,
          totalMessages,
          sessionSummaries,
          enrollmentsData
        ),
      },
    })
  },
  { role: 'PARENT' }
)

function generateRecommendations(
  totalSessions: number,
  totalMessages: number,
  sessions: Array<{ status: string; conceptMastery: Record<string, number> }>,
  enrollments: Array<{ subjectCode: string; totalSessions: number }>
): string[] {
  const recs: string[] = []
  if (totalSessions < 5) {
    recs.push('建议增加AI辅导使用频率，每周至少3-5次对话有助于巩固学习')
  }
  if (totalMessages > 0 && totalMessages < 20) {
    recs.push('可以尝试与AI导师进行更深入的对话，探索更多学习主题')
  }
  const completedCount = sessions.filter((s: any) => s.status === 'completed').length
  if (completedCount > 0) {
    recs.push(`已完成 ${completedCount} 个课程单元的AI辅导，继续保持！`)
  }
  if (enrollments.length > 0) {
    recs.push(`当前已注册 ${enrollments.length} 个科目的AI辅导`)
  }
  if (recs.length === 0) {
    recs.push('AI辅导数据较少，鼓励孩子多使用AI导师进行学习')
  }
  return recs
}
