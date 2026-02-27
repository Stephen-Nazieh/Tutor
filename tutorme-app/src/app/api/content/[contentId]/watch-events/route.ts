import { NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { contentItem, videoWatchEvent } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import crypto from 'crypto'

const VALID = new Set(['play', 'pause', 'seek', 'complete', 'quality_change'])
const MAX = 100

export const POST = withCsrf(withAuth(async (req, session, context: { params?: Promise<{ contentId?: string }> }) => {
  const p = context?.params ? await context.params : null
  const contentId = p?.contentId
  if (!contentId) return NextResponse.json({ error: 'Content ID required' }, { status: 400 })
  const body = await req.json().catch(() => null)
  const events = Array.isArray(body?.events) ? body.events : []
  if (events.length === 0 || events.length > MAX) {
    return NextResponse.json({ error: '1-' + MAX + ' events' }, { status: 400 })
  }
  const ok = events.every((e: { eventType?: string; videoSeconds?: number }) =>
    e && typeof e.eventType === 'string' && VALID.has(e.eventType) && typeof e.videoSeconds === 'number')
  if (!ok) return NextResponse.json({ error: 'eventType and videoSeconds required' }, { status: 400 })

  const [content] = await drizzleDb
    .select({ id: contentItem.id, isPublished: contentItem.isPublished })
    .from(contentItem)
    .where(eq(contentItem.id, contentId))
    .limit(1)
  if (!content || !content.isPublished) return NextResponse.json({ error: 'Content not found' }, { status: 404 })

  await drizzleDb.insert(videoWatchEvent).values(
    events.map((e: { eventType: string; videoSeconds: number; metadata?: unknown }) => ({
      id: crypto.randomUUID(),
      contentId,
      studentId: session.user.id,
      eventType: e.eventType,
      videoSeconds: e.videoSeconds,
      metadata: (e.metadata ?? null) as Record<string, unknown> | null,
    }))
  )
  return NextResponse.json({ ok: true, recorded: events.length })
}, { role: 'STUDENT' }))
