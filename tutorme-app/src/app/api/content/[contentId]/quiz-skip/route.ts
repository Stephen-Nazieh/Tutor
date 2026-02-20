/**
 * Inline quiz skip with note (record and resume)
 * POST /api/content/[contentId]/quiz-skip
 * Body: { videoTimestampSeconds: number, note?: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const POST = withCsrf(withAuth(async (req, session, context: { params?: Promise<{ contentId: string }> }) => {
  const params = context?.params ? await context.params : null
  const contentId = params?.contentId
  if (!contentId) {
    return NextResponse.json({ error: 'Content ID required' }, { status: 400 })
  }

  let body: { videoTimestampSeconds?: number; note?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const videoTimestampSeconds = Number(body?.videoTimestampSeconds)
  if (!Number.isFinite(videoTimestampSeconds) || videoTimestampSeconds < 0) {
    return NextResponse.json(
      { error: 'videoTimestampSeconds (number >= 0) required' },
      { status: 400 }
    )
  }

  const content = await db.contentItem.findFirst({
    where: { id: contentId, isPublished: true },
    select: { id: true },
  })
  if (!content) {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 })
  }

  await db.videoWatchEvent.create({
    data: {
      contentId,
      studentId: session.user.id,
      eventType: 'quiz_skip',
      videoSeconds: videoTimestampSeconds,
      metadata: { note: typeof body.note === 'string' ? body.note.slice(0, 500) : undefined },
    },
  })

  return NextResponse.json({ ok: true })
}, { role: 'STUDENT' }))
