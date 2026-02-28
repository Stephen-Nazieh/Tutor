import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { contentProgress, contentItem, reviewSchedule, quizAttempt } from '@/lib/db/schema'
import { eq, and, inArray } from 'drizzle-orm'
import crypto from 'crypto'

// Forgetting curve calculation (Ebbinghaus-inspired)
// R = e^(-t/S) where t is time elapsed, S is stability
function calculateRetention(
  hoursSinceLastReview: number,
  stability: number
): number {
  if (hoursSinceLastReview < 0) return 100
  const retrievability = Math.exp(-hoursSinceLastReview / stability)
  return Math.min(100, Math.round(retrievability * 100))
}

// Calculate stability based on repetition history
function calculateStability(
  repetitionCount: number,
  easeFactor: number,
  baseStability: number = 24 // hours
): number {
  if (repetitionCount === 0) return baseStability
  if (repetitionCount === 1) return baseStability * easeFactor * 1
  if (repetitionCount === 2) return baseStability * easeFactor * 1.5
  return baseStability * easeFactor * Math.pow(1.2, repetitionCount - 2)
}

// Calculate when retention drops below threshold
function calculateReviewDueDate(
  lastReviewDate: Date,
  stability: number,
  targetRetention: number = 0.85 // 85% threshold
): Date {
  const hoursUntilReview = -stability * Math.log(targetRetention)
  const dueDate = new Date(lastReviewDate)
  dueDate.setHours(dueDate.getHours() + hoursUntilReview)
  return dueDate
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, request)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const studentId = session.user.id
    const now = new Date()

    // Get all student content progress
    const contentProgressRows = await drizzleDb
      .select()
      .from(contentProgress)
      .where(eq(contentProgress.studentId, studentId))

    if (contentProgressRows.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          subjectCurves: [],
          upcomingReviews: [],
          overdueReviews: [],
          totalDue: 0,
        }
      })
    }

    const contentIds = [...new Set(contentProgressRows.map((p) => p.contentId))]
    const contentMap = new Map<string, { id: string; title: string; subject: string }>()
    if (contentIds.length > 0) {
      const items = await drizzleDb
        .select({
          id: contentItem.id,
          title: contentItem.title,
          subject: contentItem.subject,
        })
        .from(contentItem)
        .where(inArray(contentItem.id, contentIds))
      for (const c of items) contentMap.set(c.id, c)
    }

    const contentProgressWithContent = contentProgressRows.map((p) => ({
      ...p,
      content: contentMap.get(p.contentId)
        ? {
            id: contentMap.get(p.contentId)!.id,
            title: contentMap.get(p.contentId)!.title,
            subjectId: contentMap.get(p.contentId)!.subject,
            subject: {
              id: contentMap.get(p.contentId)!.subject,
              name: contentMap.get(p.contentId)!.subject,
              code: contentMap.get(p.contentId)!.subject,
              color: '#3B82F6',
            },
          }
        : null,
    }))

    // Get quiz attempts for performance data (Drizzle Quiz has no contentId; use all attempts)
    const { desc } = await import('drizzle-orm')
    const quizAttemptRows = await drizzleDb
      .select()
      .from(quizAttempt)
      .where(eq(quizAttempt.studentId, studentId))
      .orderBy(desc(quizAttempt.completedAt))

    const quizAttempts = quizAttemptRows.map((q) => ({
      ...q,
      quiz: { contentId: null as string | null, subjectId: null as string | null },
    }))

    // Get existing review schedules
    let reviewScheduleRows = await drizzleDb
      .select()
      .from(reviewSchedule)
      .where(eq(reviewSchedule.studentId, studentId))

    const scheduleContentIds = [...new Set(reviewScheduleRows.map((r) => r.contentId))]
    const scheduleContentMap = new Map<string, { id: string; title: string; subject: string }>()
    if (scheduleContentIds.length > 0) {
      const items = await drizzleDb
        .select({ id: contentItem.id, title: contentItem.title, subject: contentItem.subject })
        .from(contentItem)
        .where(inArray(contentItem.id, scheduleContentIds))
      for (const c of items) scheduleContentMap.set(c.id, c)
    }

    let reviewSchedules: Array<{
      id: string
      contentId: string
      content?: { id: string; title: string; subjectId: string; subject: { id: string; name: string; code: string; color: string } }
      lastReviewed: Date
      nextReview: Date
      stability: number
      easeFactor: number
      repetitionCount: number
      performance: number
      priority?: string
    }> = reviewScheduleRows.map((r) => {
      const c = scheduleContentMap.get(r.contentId)
      return {
        id: r.id,
        contentId: r.contentId,
        content: c
          ? {
              id: c.id,
              title: c.title,
              subjectId: c.subject,
              subject: { id: c.subject, name: c.subject, code: c.subject, color: '#3B82F6' },
            }
          : undefined,
        lastReviewed: r.lastReviewed,
        nextReview: r.nextReview,
        stability: r.stability,
        easeFactor: r.easeFactor,
        repetitionCount: r.repetitionCount,
        performance: r.performance,
      }
    })

    if (reviewSchedules.length === 0) {
      const newSchedules: typeof reviewSchedules = []
      for (const progress of contentProgressWithContent) {
        if (progress.progress > 0 && progress.content) {
          const contentQuizzes = quizAttempts.filter(
            (q: any) => q.quiz?.contentId === progress.contentId && q.completedAt
          )
          const avgPerformance =
            contentQuizzes.length > 0
              ? contentQuizzes.reduce((sum: number, q: any) => sum + (q.score || 0), 0) /
                contentQuizzes.length
              : 70
          const easeFactor = 1.3 + (Math.min(100, avgPerformance) / 100) * 1.2
          const repetitionCount = contentQuizzes.length
          const stability = calculateStability(repetitionCount, easeFactor)
          const lastReview =
            contentQuizzes[0]?.completedAt || progress.updatedAt
          const nextReview = calculateReviewDueDate(lastReview, stability)
          newSchedules.push({
            id: `${studentId}-${progress.contentId}`,
            contentId: progress.contentId,
            content: progress.content as any,
            lastReviewed: lastReview,
            nextReview,
            stability,
            easeFactor,
            repetitionCount,
            performance: avgPerformance,
            priority:
              nextReview < now
                ? 'high'
                : nextReview.getTime() - now.getTime() < 2 * 24 * 60 * 60 * 1000
                  ? 'medium'
                  : 'low',
          })
        }
      }
      reviewSchedules = newSchedules
    }

    const subjectsMap = new Map<
      string,
      { id: string; name: string; color: string; schedules: typeof reviewSchedules }
    >()
    const daysToProject = 30

    for (const schedule of reviewSchedules) {
      const subjectId = schedule.content?.subjectId || 'general'
      const subjectName = schedule.content?.subject?.name || 'General'
      const subjectColor = schedule.content?.subject?.color || '#3B82F6'
      if (!subjectsMap.has(subjectId)) {
        subjectsMap.set(subjectId, {
          id: subjectId,
          name: subjectName,
          color: subjectColor,
          schedules: [],
        })
      }
      subjectsMap.get(subjectId)?.schedules.push(schedule)
    }

    const subjectCurves: Array<{
      subjectId: string
      subjectName: string
      color: string
      dataPoints: Array<{
        day: number
        date: Date
        retention: number
        isReviewPoint: boolean
        reviewId?: string
        contentTitle?: string
        contentId?: string
      }>
    }> = []

    for (const [subjectId, subjectData] of subjectsMap) {
      const curve = {
        subjectId,
        subjectName: subjectData.name,
        color: subjectData.color,
        dataPoints: [] as Array<{
          day: number
          date: Date
          retention: number
          isReviewPoint: boolean
          reviewId?: string
          contentTitle?: string
          contentId?: string
        }>,
      }
      for (let day = 0; day <= daysToProject; day++) {
        const pointDate = new Date(now)
        pointDate.setDate(pointDate.getDate() + day)
        let totalRetention = 0
        let hasReviewOnThisDay = false
        let reviewData: { reviewId: string; contentTitle?: string; contentId?: string } | null = null
        for (const schedule of subjectData.schedules) {
          const lastReview = new Date(schedule.lastReviewed)
          const hoursSinceLastReview =
            (pointDate.getTime() - lastReview.getTime()) / (1000 * 60 * 60)
          const nextReview = new Date(schedule.nextReview)
          const isSameDay = nextReview.toDateString() === pointDate.toDateString()
          if (isSameDay) {
            hasReviewOnThisDay = true
            reviewData = {
              reviewId: schedule.id,
              contentTitle: schedule.content?.title,
              contentId: schedule.content?.id,
            }
            totalRetention += 95
          } else if (hoursSinceLastReview < 0) {
            totalRetention += 100
          } else {
            const retention = calculateRetention(hoursSinceLastReview, schedule.stability)
            totalRetention += retention
          }
        }
        const avgRetention =
          subjectData.schedules.length > 0
            ? Math.round(totalRetention / subjectData.schedules.length)
            : 0
        curve.dataPoints.push({
          day,
          date: pointDate,
          retention: Math.max(0, Math.min(100, avgRetention)),
          isReviewPoint: hasReviewOnThisDay,
          ...reviewData!,
        })
      }
      subjectCurves.push(curve)
    }

    const fourteenDaysLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
    const upcomingReviews = reviewSchedules
      .filter(
        (s: any) => s.nextReview >= now && s.nextReview <= fourteenDaysLater
      )
      .sort((a: any, b: any) => a.nextReview.getTime() - b.nextReview.getTime())
      .slice(0, 10)
      .map((s: any) => ({
        id: s.id,
        contentId: s.contentId,
        contentTitle: s.content?.title || 'Unknown',
        subjectId: s.content?.subjectId,
        subjectName: s.content?.subject?.name || 'General',
        subjectColor: s.content?.subject?.color || '#3B82F6',
        scheduledFor: s.nextReview,
        isOverdue: s.nextReview < now,
        daysUntilDue: Math.ceil(
          (s.nextReview.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        ),
        currentRetention: calculateRetention(
          (now.getTime() - new Date(s.lastReviewed).getTime()) / (1000 * 60 * 60),
          s.stability
        ),
        repetitionCount: s.repetitionCount,
        priority: s.priority,
      }))

    const overdueReviews = reviewSchedules
      .filter((s: any) => s.nextReview < now)
      .sort((a: any, b: any) => a.nextReview.getTime() - b.nextReview.getTime())
      .map((s: any) => ({
        id: s.id,
        contentId: s.contentId,
        contentTitle: s.content?.title || 'Unknown',
        subjectId: s.content?.subjectId,
        subjectName: s.content?.subject?.name || 'General',
        subjectColor: s.content?.subject?.color || '#3B82F6',
        scheduledFor: s.nextReview,
        daysOverdue: Math.floor(
          (now.getTime() - s.nextReview.getTime()) / (1000 * 60 * 60 * 24)
        ),
        currentRetention: calculateRetention(
          (now.getTime() - new Date(s.lastReviewed).getTime()) / (1000 * 60 * 60),
          s.stability
        ),
      }))

    return NextResponse.json({
      success: true,
      data: {
        subjectCurves,
        upcomingReviews,
        overdueReviews,
        totalDue:
          overdueReviews.length +
          upcomingReviews.filter((r: any) => r.daysUntilDue === 0).length,
      }
    })
  } catch (error) {
    console.error('Error fetching review schedule:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review schedule' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, request)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { contentId, performance } = body

    if (!contentId) {
      return NextResponse.json(
        { success: false, error: 'Content ID required' },
        { status: 400 }
      )
    }

    const studentId = session.user.id
    const now = new Date()

    const [existing] = await drizzleDb
      .select()
      .from(reviewSchedule)
      .where(
        and(
          eq(reviewSchedule.studentId, studentId),
          eq(reviewSchedule.contentId, contentId)
        )
      )
      .limit(1)

    if (!existing) {
      const easeFactor = 1.3 + (Math.min(100, performance || 70) / 100) * 1.2
      const stability = calculateStability(1, easeFactor)
      const nextReview = calculateReviewDueDate(now, stability)
      const interval = Math.round(stability / 24)
      const id = crypto.randomUUID()
      await drizzleDb.insert(reviewSchedule).values({
        id,
        studentId,
        contentId,
        lastReviewed: now,
        nextReview,
        stability,
        easeFactor,
        repetitionCount: 1,
        performance: performance ?? 70,
        interval,
      })
      const [schedule] = await drizzleDb
        .select()
        .from(reviewSchedule)
        .where(eq(reviewSchedule.id, id))
        .limit(1)
      return NextResponse.json({
        success: true,
        data: { schedule: schedule ?? { id, studentId, contentId, lastReviewed: now, nextReview, stability, easeFactor, repetitionCount: 1, performance: performance ?? 70, interval } }
      })
    }

    const newRepetitionCount = existing.repetitionCount + 1
    let newEaseFactor = existing.easeFactor
    if (performance !== undefined) {
      if (performance < 60) {
        newEaseFactor = Math.max(1.3, existing.easeFactor - 0.2)
      } else if (performance > 85) {
        newEaseFactor = Math.min(2.5, existing.easeFactor + 0.15)
      }
    }
    const newStability = calculateStability(
      newRepetitionCount,
      newEaseFactor,
      existing.stability
    )
    const nextReview = calculateReviewDueDate(now, newStability)
    const interval = Math.round(newStability / 24)

    await drizzleDb
      .update(reviewSchedule)
      .set({
        lastReviewed: now,
        nextReview,
        stability: newStability,
        easeFactor: newEaseFactor,
        repetitionCount: newRepetitionCount,
        performance: performance !== undefined ? performance : existing.performance,
        interval,
      })
      .where(eq(reviewSchedule.id, existing.id))

    const [updated] = await drizzleDb
      .select()
      .from(reviewSchedule)
      .where(eq(reviewSchedule.id, existing.id))
      .limit(1)

    return NextResponse.json({
      success: true,
      data: { schedule: updated ?? existing }
    })
  } catch (error) {
    console.error('Error recording review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to record review' },
      { status: 500 }
    )
  }
}
