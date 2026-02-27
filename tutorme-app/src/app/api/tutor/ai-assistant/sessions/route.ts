/**
 * AI Assistant Sessions API
 * GET /api/tutor/ai-assistant/sessions - List all sessions
 * DELETE /api/tutor/ai-assistant/sessions - Archive old sessions
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aIAssistantSession, aIAssistantMessage, aIAssistantInsight } from '@/lib/db/schema'
import { eq, and, desc, inArray, sql } from 'drizzle-orm'

// GET - List all sessions
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id

  const sessions = await drizzleDb
    .select()
    .from(aIAssistantSession)
    .where(eq(aIAssistantSession.tutorId, tutorId))
    .orderBy(desc(aIAssistantSession.updatedAt))

  const sessionIds = sessions.map((s) => s.id)
  const [messageCounts, insightCounts] = await Promise.all([
    sessionIds.length > 0
      ? drizzleDb
          .select({
            sessionId: aIAssistantMessage.sessionId,
            count: sql<number>`count(*)::int`,
          })
          .from(aIAssistantMessage)
          .where(inArray(aIAssistantMessage.sessionId, sessionIds))
          .groupBy(aIAssistantMessage.sessionId)
      : Promise.resolve([]),
    sessionIds.length > 0
      ? drizzleDb
          .select({
            sessionId: aIAssistantInsight.sessionId,
            count: sql<number>`count(*)::int`,
          })
          .from(aIAssistantInsight)
          .where(inArray(aIAssistantInsight.sessionId, sessionIds))
          .groupBy(aIAssistantInsight.sessionId)
      : Promise.resolve([]),
  ])

  const msgMap = new Map(messageCounts.map((c) => [c.sessionId, c.count]))
  const insMap = new Map(insightCounts.map((c) => [c.sessionId, c.count]))

  const sessionsWithCounts = sessions.map((s) => ({
    ...s,
    _count: {
      messages: msgMap.get(s.id) ?? 0,
      insights: insMap.get(s.id) ?? 0,
    },
  }))

  return NextResponse.json({ sessions: sessionsWithCounts })
}, { role: 'TUTOR' })

// DELETE - Archive old sessions (keep last 10)
export const DELETE = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id

  try {
    const toArchive = await drizzleDb
      .select({ id: aIAssistantSession.id })
      .from(aIAssistantSession)
      .where(and(eq(aIAssistantSession.tutorId, tutorId), eq(aIAssistantSession.status, 'active')))
      .orderBy(desc(aIAssistantSession.updatedAt))
      .offset(10)

    const ids = toArchive.map((s) => s.id)
    if (ids.length > 0) {
      await drizzleDb
        .update(aIAssistantSession)
        .set({ status: 'archived' })
        .where(inArray(aIAssistantSession.id, ids))
    }

    return NextResponse.json({
      archived: ids.length,
      success: true,
    })
  } catch (error) {
    console.error('Archive sessions error:', error)
    return NextResponse.json(
      { error: 'Failed to archive sessions' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
