/**
 * Individual AI Insight API
 * PATCH /api/tutor/ai-assistant/insights/[id] - Update insight (mark as applied)
 * DELETE /api/tutor/ai-assistant/insights/[id] - Delete insight
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { aIAssistantInsight, aIAssistantSession } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

// PATCH - Update insight
export const PATCH = withAuth(async (req: NextRequest, session, context) => {
  const tutorId = session.user.id
  const insightId = await getParamAsync(context?.params, 'id')
  if (!insightId) {
    return NextResponse.json({ error: 'Insight ID required' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { applied, title, content } = body

    const rows = await drizzleDb
      .select({ insight: aIAssistantInsight })
      .from(aIAssistantInsight)
      .innerJoin(aIAssistantSession, eq(aIAssistantInsight.sessionId, aIAssistantSession.id))
      .where(and(eq(aIAssistantInsight.id, insightId), eq(aIAssistantSession.tutorId, tutorId)))
      .limit(1)

    const insight = rows[0]?.insight
    if (!insight) {
      return NextResponse.json(
        { error: 'Insight not found' },
        { status: 404 }
      )
    }

    const updateData: { applied?: boolean; title?: string; content?: string } = {}
    if (applied !== undefined) updateData.applied = applied
    if (title) updateData.title = title
    if (content) updateData.content = content

    const [updatedInsight] = await drizzleDb
      .update(aIAssistantInsight)
      .set(updateData)
      .where(eq(aIAssistantInsight.id, insightId))
      .returning()

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
export const DELETE = withAuth(async (req: NextRequest, session, context) => {
  const tutorId = session.user.id
  const insightId = await getParamAsync(context?.params, 'id')
  if (!insightId) {
    return NextResponse.json({ error: 'Insight ID required' }, { status: 400 })
  }

  try {
    const rows = await drizzleDb
      .select()
      .from(aIAssistantInsight)
      .innerJoin(aIAssistantSession, eq(aIAssistantInsight.sessionId, aIAssistantSession.id))
      .where(and(eq(aIAssistantInsight.id, insightId), eq(aIAssistantSession.tutorId, tutorId)))
      .limit(1)

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Insight not found' },
        { status: 404 }
      )
    }

    await drizzleDb.delete(aIAssistantInsight).where(eq(aIAssistantInsight.id, insightId))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete insight error:', error)
    return NextResponse.json(
      { error: 'Failed to delete insight' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
