/**
 * Video analytics - watch time, completion, drop-off, heatmap
 * GET /api/content/[contentId]/analytics
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { contentItem, videoWatchEvent } from '@/lib/db/schema'
import { eq, and, asc } from 'drizzle-orm'

const SEGMENT_SECONDS = 10

export const GET = withAuth(async (req, session, context) => {
  const contentId = await getParamAsync(context?.params, 'contentId')
  if (!contentId) return NextResponse.json({ error: 'Content ID required' }, { status: 400 })

  const { searchParams } = new URL(req.url)
  const studentIdParam = searchParams.get('studentId')
  const forStudentId = studentIdParam || session.user.id
  const isAdmin = session.user.role === 'ADMIN'
  if (forStudentId !== session.user.id && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const [content] = await drizzleDb
    .select({ id: contentItem.id, duration: contentItem.duration })
    .from(contentItem)
    .where(eq(contentItem.id, contentId))
    .limit(1)
  if (!content) return NextResponse.json({ error: 'Content not found' }, { status: 404 })

  const durationSec = (content.duration ?? 0) || 1
  const eventsByStudent = await drizzleDb
    .select()
    .from(videoWatchEvent)
    .where(and(eq(videoWatchEvent.contentId, contentId), eq(videoWatchEvent.studentId, forStudentId)))
    .orderBy(asc(videoWatchEvent.createdAt))

  let totalWatchSeconds = 0
  let lastPlayTime = 0
  let lastEventWasPlay = false
  const segmentCounts: Record<number, number> = {}

  for (const e of eventsByStudent) {
    const t = e.videoSeconds
    const seg = Math.floor(t / SEGMENT_SECONDS) * SEGMENT_SECONDS
    segmentCounts[seg] = (segmentCounts[seg] ?? 0) + 1
    if (e.eventType === 'play') {
      lastPlayTime = t
      lastEventWasPlay = true
    } else if (e.eventType === 'pause' && lastEventWasPlay) {
      totalWatchSeconds += Math.max(0, t - lastPlayTime)
      lastEventWasPlay = false
    } else if (e.eventType === 'seek' && e.metadata && typeof e.metadata === 'object') {
      const meta = e.metadata as { fromTime?: number; toTime?: number }
      if (typeof meta.fromTime === 'number' && typeof meta.toTime === 'number') {
        totalWatchSeconds += Math.abs(meta.toTime - meta.fromTime)
      }
    } else if (e.eventType === 'complete') {
      totalWatchSeconds += Math.max(0, durationSec - lastPlayTime)
      lastEventWasPlay = false
    }
  }
  if (lastEventWasPlay) totalWatchSeconds += Math.max(0, durationSec - lastPlayTime)

  const completionPercent = durationSec > 0 ? Math.min(100, Math.round((totalWatchSeconds / durationSec) * 100)) : 0
  const lastPosition = eventsByStudent.length ? Math.max(...eventsByStudent.map((e) => e.videoSeconds)) : 0
  const dropOffPercent = durationSec > 0 ? Math.round((lastPosition / durationSec) * 100) : 0
  const heatmap = Array.from({ length: Math.ceil(durationSec / SEGMENT_SECONDS) }, (_, i) => {
    const seg = i * SEGMENT_SECONDS
    return { segmentStart: seg, count: segmentCounts[seg] ?? 0 }
  })

  return NextResponse.json({
    contentId,
    durationSeconds: durationSec,
    totalWatchSeconds,
    completionPercent,
    lastPositionSeconds: lastPosition,
    dropOffPercent,
    eventCount: eventsByStudent.length,
    heatmap,
  })
}, { role: 'STUDENT' })
