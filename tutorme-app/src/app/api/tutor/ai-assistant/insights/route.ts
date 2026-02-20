/**
 * AI Assistant Insights API
 * GET /api/tutor/ai-assistant/insights - Get all insights
 * PATCH /api/tutor/ai-assistant/insights - Mark insight as applied
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET - List all insights
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)
  
  const type = searchParams.get('type')
  const applied = searchParams.get('applied')
  
  const where: any = {
    session: { tutorId },
  }
  
  if (type) where.type = type
  if (applied !== null) where.applied = applied === 'true'
  
  const insights = await db.aIAssistantInsight.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      session: {
        select: { title: true, context: true },
      },
    },
    take: 50,
  })
  
  return NextResponse.json({ insights })
}, { role: 'TUTOR' })

// POST - Create insight from analysis
export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const { sessionId, type, title, content, relatedData } = body
    
    if (!sessionId || !type || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Verify session belongs to tutor
    const aiSession = await db.aIAssistantSession.findFirst({
      where: { id: sessionId, tutorId },
    })
    
    if (!aiSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }
    
    const insight = await db.aIAssistantInsight.create({
      data: {
        sessionId,
        type,
        title,
        content,
        relatedData,
      },
    })
    
    return NextResponse.json({ insight }, { status: 201 })
  } catch (error) {
    console.error('Create insight error:', error)
    return NextResponse.json(
      { error: 'Failed to create insight' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
