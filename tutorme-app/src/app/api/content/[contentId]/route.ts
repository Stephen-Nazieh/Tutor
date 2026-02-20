/**
 * Single content item API (video learning)
 * GET /api/content/[contentId] - returns content with videoUrl, transcript, quiz checkpoints, variants
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req, session, context: { params?: Promise<{ contentId: string }> }) => {
  const params = context?.params ? await context.params : null
  const contentId = params?.contentId
  if (!contentId) {
    return NextResponse.json({ error: 'Content ID required' }, { status: 400 })
  }

  const item = await db.contentItem.findFirst({
    where: {
      id: contentId,
      isPublished: true,
    },
    include: {
      quizCheckpoints: {
        orderBy: { videoTimestampSec: 'asc' },
        select: {
          id: true,
          videoTimestampSec: true,
          title: true,
          questions: true,
        },
      },
    },
  })

  if (!item) {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 })
  }

  const videoUrl = item.url ?? null
  const variants = (item.videoVariants as Record<string, string> | null) ?? {}
  const durationSeconds = item.duration ?? 0

  return NextResponse.json({
    content: {
      id: item.id,
      subject: item.subject,
      topic: item.title,
      videoUrl,
      transcript: item.transcript ?? item.description ?? '',
      duration: durationSeconds,
      videoVariants: Object.keys(variants).length ? variants : undefined,
      quizTimestamps: item.quizCheckpoints.map((q: { videoTimestampSec: number }) => q.videoTimestampSec),
      quizCheckpoints: item.quizCheckpoints.map((q: { id: string; videoTimestampSec: number; title: string; questions: unknown }) => ({
        id: q.id,
        videoTimestampSec: q.videoTimestampSec,
        title: q.title,
        questions: q.questions,
      })),
      thumbnailUrl: item.thumbnailUrl,
      difficulty: item.difficulty,
    },
  })
}, { role: 'STUDENT' })
