/**
 * Post-Session Insights API
 * 
 * GET /api/sessions/insights?sessionId=xxx - Get session insights report
 * POST /api/sessions/insights - Generate new insights report (triggered after session)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const generateInsightsSchema = z.object({
  sessionId: z.string().uuid()
})

// GET - Retrieve session insights
export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('sessionId')
  
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 })
  }

  try {
    // Get the report
    const report = await db.postSessionReport.findUnique({
      where: { sessionId }
    })

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    // Get student insights
    const studentInsights = await db.studentSessionInsight.findMany({
      where: { sessionId },
      include: {
        student: {
          select: {
            id: true,
            profile: {
              select: { name: true }
            }
          }
        }
      }
    })

    // Get bookmarks/timeline
    const bookmarks = await db.sessionBookmark.findMany({
      where: { sessionId },
      orderBy: { timestampSeconds: 'asc' }
    })

    return NextResponse.json({
      report,
      studentInsights,
      bookmarks
    })
  } catch (error) {
    console.error('Error fetching session insights:', error)
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    )
  }
})

// POST - Generate new insights report
export const POST = withAuth(async (req: NextRequest, session) => {
  try {
    const body = await req.json()
    const data = generateInsightsSchema.parse(body)

    // Check if report already exists
    const existing = await db.postSessionReport.findUnique({
      where: { sessionId: data.sessionId }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Report already exists for this session' },
        { status: 400 }
      )
    }

    // Get session data
    const liveSession = await db.liveSession.findUnique({
      where: { id: data.sessionId },
      include: {
        tutor: {
          select: { id: true, profile: { select: { name: true } } }
        }
      }
    })

    if (!liveSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Get engagement summary
    const engagementSummary = await db.sessionEngagementSummary.findUnique({
      where: { sessionId: data.sessionId }
    })

    // Get engagement snapshots for all students
    const snapshots = await db.engagementSnapshot.findMany({
      where: { sessionId: data.sessionId },
      orderBy: { timestamp: 'desc' },
      distinct: ['studentId']
    })

    // Create student insights
    const studentInsightsData = snapshots.map((s: Record<string, unknown>) => ({
      sessionId: data.sessionId,
      studentId: s.studentId as string,
      engagement: s.engagementScore as number,
      participation: s.participationCount as number,
      questionsAsked: s.chatMessages as number,
      timeAwayMinutes: 0, // Would need more data to calculate
      flaggedForFollowUp: (s.engagementScore as number) < 50 || (s.struggleIndicators as number) > 0,
      followUpReason: (s.struggleIndicators as number) > 0 ? 'Showing signs of struggle' : 
                      (s.engagementScore as number) < 50 ? 'Low engagement' : undefined
    }))

    await db.studentSessionInsight.createMany({
      data: studentInsightsData
    })

    // Create the report
    const report = await db.postSessionReport.create({
      data: {
        sessionId: data.sessionId,
        tutorId: session.user.id,
        status: 'processing',
        // These would be populated by AI service in production
        keyConcepts: [],
        mainTopics: [],
        studentQuestions: [],
        challengingConcepts: [],
        overallAssessment: '',
        averageEngagement: engagementSummary?.averageEngagement || 0,
        peakEngagement: engagementSummary?.peakEngagement || 0,
        lowEngagement: engagementSummary?.lowEngagement || 0,
        participationRate: engagementSummary?.participationRate || 0,
        chatActivity: engagementSummary?.totalChatMessages || 0,
        handRaises: engagementSummary?.totalHandRaises || 0,
        timeOnTask: engagementSummary?.timeOnTaskPercentage || 0
      }
    })

    // Trigger AI analysis (would be async in production)
    // await analyzeSessionWithAI(data.sessionId)

    return NextResponse.json({ success: true, report })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', issues: error.issues },
        { status: 400 }
      )
    }
    console.error('Error generating insights:', error)
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
