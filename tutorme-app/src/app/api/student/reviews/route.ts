import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

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
  // Solve for t: targetRetention = e^(-t/S)
  // t = -S * ln(targetRetention)
  const hoursUntilReview = -stability * Math.log(targetRetention)
  const dueDate = new Date(lastReviewDate)
  dueDate.setHours(dueDate.getHours() + hoursUntilReview)
  return dueDate
}

// Generate mock data for demo mode
function generateMockData(now: Date) {
  const subjects = [
    { id: 'math', name: 'Mathematics', color: '#3B82F6' },
    { id: 'english', name: 'English', color: '#10B981' },
    { id: 'science', name: 'Science', color: '#8B5CF6' },
    { id: 'history', name: 'History', color: '#F59E0B' }
  ]

  // Generate subject curves with forgetting curves
  const subjectCurves = subjects.map(subject => {
    const dataPoints = []
    for (let day = 0; day <= 30; day++) {
      // Simulate exponential decay with occasional review spikes
      let retention = 100 * Math.exp(-day / 8)
      
      // Add review points that reset retention
      if (day === 0 || day === 7 || day === 14) {
        retention = 95
      }
      
      dataPoints.push({
        day,
        date: new Date(now.getTime() + day * 24 * 60 * 60 * 1000).toISOString(),
        retention: Math.round(retention),
        isReviewPoint: day === 0 || day === 7 || day === 14,
        reviewId: day === 0 || day === 7 || day === 14 ? `review-${subject.id}-${day}` : undefined,
        contentTitle: day === 0 ? `${subject.name} - Chapter 1` : 
                      day === 7 ? `${subject.name} - Chapter 2` : 
                      day === 14 ? `${subject.name} - Chapter 3` : undefined,
        contentId: day === 0 || day === 7 || day === 14 ? `content-${subject.id}-${day}` : undefined
      })
    }
    
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      color: subject.color,
      dataPoints
    }
  })

  // Generate upcoming reviews
  const upcomingReviews = [
    {
      id: 'review-1',
      contentId: 'content-math-1',
      contentTitle: 'Quadratic Equations',
      subjectId: 'math',
      subjectName: 'Mathematics',
      subjectColor: '#3B82F6',
      scheduledFor: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      isOverdue: false,
      daysUntilDue: 1,
      currentRetention: 35,
      repetitionCount: 2,
      priority: 'high'
    },
    {
      id: 'review-2',
      contentId: 'content-english-1',
      contentTitle: 'Shakespeare Sonnets',
      subjectId: 'english',
      subjectName: 'English',
      subjectColor: '#10B981',
      scheduledFor: now.toISOString(),
      isOverdue: true,
      daysUntilDue: 0,
      daysOverdue: 1,
      currentRetention: 28,
      repetitionCount: 1,
      priority: 'critical'
    },
    {
      id: 'review-3',
      contentId: 'content-science-1',
      contentTitle: 'Cell Biology',
      subjectId: 'science',
      subjectName: 'Science',
      subjectColor: '#8B5CF6',
      scheduledFor: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      isOverdue: false,
      daysUntilDue: 2,
      currentRetention: 62,
      repetitionCount: 3,
      priority: 'medium'
    },
    {
      id: 'review-4',
      contentId: 'content-history-1',
      contentTitle: 'World War II',
      subjectId: 'history',
      subjectName: 'History',
      subjectColor: '#F59E0B',
      scheduledFor: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      isOverdue: false,
      daysUntilDue: 3,
      currentRetention: 78,
      repetitionCount: 4,
      priority: 'low'
    }
  ]

  // Generate overdue reviews
  const overdueReviews = upcomingReviews.filter(r => r.isOverdue)

  return {
    subjectCurves,
    upcomingReviews,
    overdueReviews,
    totalDue: overdueReviews.length + upcomingReviews.filter(r => r.daysUntilDue === 0).length
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const studentId = session.user.id
    const now = new Date()
    
    // DEMO MODE: If ?demo=true, return mock data
    const { searchParams } = new URL(request.url)
    const isDemo = searchParams.get('demo') === 'true'
    
    // Return mock data for demo mode
    if (isDemo) {
      const mockData = generateMockData(now)
      return NextResponse.json({
        success: true,
        data: mockData
      })
    }

    // Get all student content progress with review data
    const contentProgress = await prisma.contentProgress.findMany({
      where: { studentId },
      include: {
        content: {
          select: {
            id: true,
            title: true,
            subjectId: true,
            subject: {
              select: {
                id: true,
                name: true,
                code: true,
                color: true
              }
            }
          }
        }
      }
    })

    // If no content progress, return mock data for demo
    if (contentProgress.length === 0) {
      const mockData = generateMockData(now)
      return NextResponse.json({
        success: true,
        data: mockData,
        isDemo: true
      })
    }

    // Get quiz attempts for performance data
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { studentId },
      include: {
        quiz: {
          select: {
            contentId: true,
            subjectId: true
          }
        }
      },
      orderBy: { completedAt: 'desc' }
    })

    // Get existing review schedules or create default
    let reviewSchedules = await prisma.reviewSchedule.findMany({
      where: { studentId },
      include: {
        content: {
          select: {
            id: true,
            title: true,
            subjectId: true,
            subject: {
              select: {
                id: true,
                name: true,
                code: true,
                color: true
              }
            }
          }
        }
      }
    })

    // If no review schedules exist, create them from content progress
    if (reviewSchedules.length === 0) {
      const newSchedules = []
      
      for (const progress of contentProgress) {
        if (progress.progress > 0) {
          // Calculate performance from quiz attempts for this content
          const contentQuizzes = quizAttempts.filter(
            q => q.quiz?.contentId === progress.contentId && q.completedAt
          )
          
          const avgPerformance = contentQuizzes.length > 0
            ? contentQuizzes.reduce((sum, q) => sum + (q.score || 0), 0) / contentQuizzes.length
            : 70 // Default assumption

          // Calculate ease factor based on performance (1.3 - 2.5)
          const easeFactor = 1.3 + (Math.min(100, avgPerformance) / 100) * 1.2
          
          // Calculate stability
          const repetitionCount = contentQuizzes.length
          const stability = calculateStability(repetitionCount, easeFactor)
          
          // Last review is either from quiz completion or content progress update
          const lastReview = contentQuizzes[0]?.completedAt || progress.updatedAt
          
          // Calculate next review
          const nextReview = calculateReviewDueDate(lastReview, stability)
          
          newSchedules.push({
            id: `${studentId}-${progress.contentId}`,
            studentId,
            contentId: progress.contentId,
            content: progress.content,
            lastReviewed: lastReview,
            nextReview,
            stability,
            easeFactor,
            repetitionCount,
            performance: avgPerformance,
            interval: Math.round(stability / 24), // Convert to days
            priority: nextReview < now ? 'high' : nextReview.getTime() - now.getTime() < 2 * 24 * 60 * 60 * 1000 ? 'medium' : 'low'
          })
        }
      }
      
      reviewSchedules = newSchedules
    }

    // Generate retention curve data points for each subject
    const subjectsMap = new Map()
    const daysToProject = 30
    const hoursPerDay = 24
    
    // Group schedules by subject
    for (const schedule of reviewSchedules) {
      const subjectId = schedule.content?.subjectId || 'general'
      const subjectName = schedule.content?.subject?.name || 'General'
      const subjectColor = schedule.content?.subject?.color || '#3B82F6'
      
      if (!subjectsMap.has(subjectId)) {
        subjectsMap.set(subjectId, {
          id: subjectId,
          name: subjectName,
          color: subjectColor,
          schedules: []
        })
      }
      
      subjectsMap.get(subjectId).schedules.push(schedule)
    }

    // Build retention curves for each subject
    const subjectCurves = []
    
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
        }>
      }

      // Generate data points for each day over 30 days
      for (let day = 0; day <= daysToProject; day++) {
        const pointDate = new Date(now)
        pointDate.setDate(pointDate.getDate() + day)
        
        // Calculate average retention for this subject on this day
        let totalRetention = 0
        let hasReviewOnThisDay = false
        let reviewData: any = null
        
        for (const schedule of subjectData.schedules) {
          const lastReview = new Date(schedule.lastReviewed)
          const hoursSinceLastReview = (pointDate.getTime() - lastReview.getTime()) / (1000 * 60 * 60)
          
          // Check if there's a scheduled review on this day
          const nextReview = new Date(schedule.nextReview)
          const isSameDay = nextReview.toDateString() === pointDate.toDateString()
          
          if (isSameDay) {
            hasReviewOnThisDay = true
            reviewData = {
              reviewId: schedule.id,
              contentTitle: schedule.content?.title,
              contentId: schedule.content?.id
            }
            // After review, retention resets to high
            totalRetention += 95
          } else if (hoursSinceLastReview < 0) {
            // Before last review (shouldn't happen in our range, but handle it)
            totalRetention += 100
          } else {
            // Normal forgetting curve decay
            const retention = calculateRetention(hoursSinceLastReview, schedule.stability)
            totalRetention += retention
          }
        }
        
        const avgRetention = subjectData.schedules.length > 0 
          ? Math.round(totalRetention / subjectData.schedules.length)
          : 0
        
        curve.dataPoints.push({
          day,
          date: pointDate,
          retention: Math.max(0, Math.min(100, avgRetention)),
          isReviewPoint: hasReviewOnThisDay,
          ...reviewData
        })
      }
      
      subjectCurves.push(curve)
    }

    // Get upcoming reviews (next 14 days)
    const upcomingReviews = reviewSchedules
      .filter(s => s.nextReview >= now && s.nextReview <= new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000))
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())
      .slice(0, 10)
      .map(s => ({
        id: s.id,
        contentId: s.contentId,
        contentTitle: s.content?.title || 'Unknown',
        subjectId: s.content?.subjectId,
        subjectName: s.content?.subject?.name || 'General',
        subjectColor: s.content?.subject?.color || '#3B82F6',
        scheduledFor: s.nextReview,
        isOverdue: s.nextReview < now,
        daysUntilDue: Math.ceil((s.nextReview.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        currentRetention: calculateRetention(
          (now.getTime() - new Date(s.lastReviewed).getTime()) / (1000 * 60 * 60),
          s.stability
        ),
        repetitionCount: s.repetitionCount,
        priority: s.priority
      }))

    // Get overdue reviews
    const overdueReviews = reviewSchedules
      .filter(s => s.nextReview < now)
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())
      .map(s => ({
        id: s.id,
        contentId: s.contentId,
        contentTitle: s.content?.title || 'Unknown',
        subjectId: s.content?.subjectId,
        subjectName: s.content?.subject?.name || 'General',
        subjectColor: s.content?.subject?.color || '#3B82F6',
        scheduledFor: s.nextReview,
        daysOverdue: Math.floor((now.getTime() - s.nextReview.getTime()) / (1000 * 60 * 60 * 24)),
        currentRetention: calculateRetention(
          (now.getTime() - new Date(s.lastReviewed).getTime()) / (1000 * 60 * 60),
          s.stability
        )
      }))

    return NextResponse.json({
      success: true,
      data: {
        subjectCurves,
        upcomingReviews,
        overdueReviews,
        totalDue: overdueReviews.length + upcomingReviews.filter(r => r.daysUntilDue === 0).length
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

// POST to record a review completion
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
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
    
    // Get or create review schedule
    let schedule = await prisma.reviewSchedule.findFirst({
      where: { studentId, contentId }
    })

    if (!schedule) {
      // Create new schedule
      const easeFactor = 1.3 + (Math.min(100, performance || 70) / 100) * 1.2
      const stability = calculateStability(1, easeFactor)
      
      schedule = await prisma.reviewSchedule.create({
        data: {
          studentId,
          contentId,
          lastReviewed: now,
          nextReview: calculateReviewDueDate(now, stability),
          stability,
          easeFactor,
          repetitionCount: 1,
          performance: performance || 70
        }
      })
    } else {
      // Update existing schedule
      const newRepetitionCount = schedule.repetitionCount + 1
      
      // Adjust ease factor based on performance
      let newEaseFactor = schedule.easeFactor
      if (performance !== undefined) {
        if (performance < 60) {
          newEaseFactor = Math.max(1.3, schedule.easeFactor - 0.2)
        } else if (performance > 85) {
          newEaseFactor = Math.min(2.5, schedule.easeFactor + 0.15)
        }
      }
      
      const newStability = calculateStability(
        newRepetitionCount,
        newEaseFactor,
        schedule.stability
      )
      
      await prisma.reviewSchedule.update({
        where: { id: schedule.id },
        data: {
          lastReviewed: now,
          nextReview: calculateReviewDueDate(now, newStability),
          stability: newStability,
          easeFactor: newEaseFactor,
          repetitionCount: newRepetitionCount,
          performance: performance !== undefined ? performance : schedule.performance
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: { schedule }
    })

  } catch (error) {
    console.error('Error recording review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to record review' },
      { status: 500 }
    )
  }
}
