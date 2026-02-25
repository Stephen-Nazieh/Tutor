import { NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'

const VALID = new Set(['play', 'pause', 'seek', 'complete', 'quality_change'])
const MAX = 100

export const POST = withCsrf(withAuth(async (req, session, context: any) => {
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
  const content = await db.contentItem.findFirst({
    where: { id: contentId, isPublished: true },
    select: { id: true },
  })
  if (!content) return NextResponse.json({ error: 'Content not found' }, { status: 404 })
  await db.videoWatchEvent.createMany({
    data: events.map((e: { eventType: string; videoSeconds: number; metadata?: unknown }) => ({
      contentId,
      studentId: session.user.id,
      eventType: e.eventType,
      videoSeconds: e.videoSeconds,
      metadata: e.metadata ?? undefined,
    })),
  })
  return NextResponse.json({ ok: true, recorded: events.length })
}, { role: 'STUDENT' }))
