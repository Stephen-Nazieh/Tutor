/**
 * Individual AI Insight API
 * PATCH /api/tutor/ai-assistant/insights/[id] - Update insight (mark as applied)
 * DELETE /api/tutor/ai-assistant/insights/[id] - Delete insight
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// PATCH - Update insight
export const PATCH = withAuth(async (req: NextRequest, context: any, session) => {
  const tutorId = session.user.id
  const { id: insightId } = await params
  
  try {
    const body = await req.json()
    const { applied, title, content } = body
    
    // Verify insight belongs to tutor
    const insight = await db.aIAssistantInsight.findFirst({
      where: {
        id: insightId,
        session: { tutorId },
      },
    })
    
    if (!insight) {
      return NextResponse.json(
        { error: 'Insight not found' },
        { status: 404 }
      )
    }
    
    const updatedInsight = await db.aIAssistantInsight.update({
      where: { id: insightId },
      data: {
        ...(applied !== undefined && { applied }),
        ...(title && { title }),
        ...(content && { content }),
      },
    })
    
    return NextResponse.json({ insight: updatedInsight })
  } catch (error) {
    console.error('Update insight error:', error)
    return NextResponse.json(
      { error: 'Failed to update insight' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// DELETE - Delete insight
export const DELETE = withAuth(async (req: NextRequest, context: any, session) => {
  const tutorId = session.user.id
  const { id: insightId } = await params
  
  try {
    // Verify insight belongs to tutor
    const insight = await db.aIAssistantInsight.findFirst({
      where: {
        id: insightId,
        session: { tutorId },
      },
    })
    
    if (!insight) {
      return NextResponse.json(
        { error: 'Insight not found' },
        { status: 404 }
      )
    }
    
    await db.aIAssistantInsight.delete({
      where: { id: insightId },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete insight error:', error)
    return NextResponse.json(
      { error: 'Failed to delete insight' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
