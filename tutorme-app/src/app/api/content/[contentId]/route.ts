/**
 * Single content item API (video learning) (Drizzle ORM)
 * GET /api/content/[contentId] - returns content with videoUrl, transcript, quiz checkpoints, variants
 */

import { NextRequest, NextResponse } from 'next/server'
import { and, asc, eq } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { contentItem, contentQuizCheckpoint } from '@/lib/db/schema'

export const GET = withAuth(async (req, session, context) => {
  const contentId = await getParamAsync(context?.params, 'contentId')
  if (!contentId) {
    return NextResponse.json({ error: 'Content ID required' }, { status: 400 })
  }

  const [item] = await drizzleDb
    .select()
    .from(contentItem)
    .where(
      and(
        eq(contentItem.id, contentId),
        eq(contentItem.isPublished, true)
      )
    )
    .limit(1)

  if (!item) {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 })
  }

  const quizCheckpoints = await drizzleDb
    .select({
      id: contentQuizCheckpoint.id,
      videoTimestampSec: contentQuizCheckpoint.videoTimestampSec,
      title: contentQuizCheckpoint.title,
      questions: contentQuizCheckpoint.questions,
    })
    .from(contentQuizCheckpoint)
    .where(eq(contentQuizCheckpoint.contentId, contentId))
    .orderBy(asc(contentQuizCheckpoint.videoTimestampSec))

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
      quizTimestamps: quizCheckpoints.map((q) => q.videoTimestampSec),
      quizCheckpoints: quizCheckpoints.map((q) => ({
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
