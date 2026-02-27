/**
 * AI Assistant Insights API
 * GET /api/tutor/ai-assistant/insights - Get all insights
 * PATCH /api/tutor/ai-assistant/insights - Mark insight as applied
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aIAssistantInsight, aIAssistantSession } from '@/lib/db/schema'
import { eq, and, desc, inArray } from 'drizzle-orm'
import { randomUUID } from 'crypto'

// GET - List all insights
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)

  const type = searchParams.get('type')
  const applied = searchParams.get('applied')

  const tutorSessionIds = await drizzleDb
    .select({ id: aIAssistantSession.id })
    .from(aIAssistantSession)
    .where(eq(aIAssistantSession.tutorId, tutorId))

  const sessionIds = tutorSessionIds.map((s) => s.id)
  if (sessionIds.length === 0) {
    return NextResponse.json({ insights: [] })
  }

  const whereParts = [inArray(aIAssistantInsight.sessionId, sessionIds)]
  if (type) whereParts.push(eq(aIAssistantInsight.type, type))
  if (applied !== null && applied !== '') whereParts.push(eq(aIAssistantInsight.applied, applied === 'true'))

  const insightsRows = await drizzleDb
    .select({
      insight: aIAssistantInsight,
      sessionTitle: aIAssistantSession.title,
      sessionContext: aIAssistantSession.context,
    })
    .from(aIAssistantInsight)
    .innerJoin(aIAssistantSession, eq(aIAssistantInsight.sessionId, aIAssistantSession.id))
    .where(and(...whereParts))
    .orderBy(desc(aIAssistantInsight.createdAt))
    .limit(50)

  const insights = insightsRows.map((r) => ({
    ...r.insight,
    session: { title: r.sessionTitle, context: r.sessionContext },
  }))

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

    const aiSession = await drizzleDb
      .select()
      .from(aIAssistantSession)
      .where(and(eq(aIAssistantSession.id, sessionId), eq(aIAssistantSession.tutorId, tutorId)))
      .limit(1)
      .then((r) => r[0] ?? null)

    if (!aiSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    const [insight] = await drizzleDb
      .insert(aIAssistantInsight)
      .values({
        id: randomUUID(),
        sessionId,
        type,
        title,
        content,
        relatedData: relatedData ?? null,
        applied: false,
      })
      .returning()

    return NextResponse.json({ insight }, { status: 201 })
  } catch (error) {
    console.error('Create insight error:', error)
    return NextResponse.json(
      { error: 'Failed to create insight' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
