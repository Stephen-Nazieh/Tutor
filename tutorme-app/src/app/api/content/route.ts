/**
 * Content API
 * Returns available learning content for students
 * GET /api/content
 * 7.2 Backend: Redis/in-memory cache + N+1 fix (batch progress query)
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db, cache } from '@/lib/db'

const CONTENT_LIST_CACHE_TTL = 60 // 1 minute

export const GET = withAuth(async (req, session) => {
  const cacheKey = `content:list:${session.user.id}`

  const contentWithProgress = await cache.getOrSet(
    cacheKey,
    async () => {
      const profile = await db.profile.findUnique({
        where: { userId: session.user.id },
        select: { subjectsOfInterest: true }
      })

      const whereClause: Record<string, unknown> = { isPublished: true }
      if (profile?.subjectsOfInterest && profile.subjectsOfInterest.length > 0) {
        whereClause.subject = { in: profile.subjectsOfInterest }
      }

      const contents = await db.contentItem.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        take: 20
      })

      if (contents.length === 0) return []

      const contentIds: string[] = contents.map((c: { id: string }) => c.id)
      const progressList = await db.contentProgress.findMany({
        where: {
          contentId: { in: contentIds },
          studentId: session.user.id
        }
      })
      const progressByContentId = new Map(progressList.map((p: { contentId: string }) => [p.contentId, p]))

      return contents.map((content: { id: string; subject: string; title: string; type: string; duration: number | null; difficulty: string | null; thumbnailUrl: string | null }) => {
        const progress = progressByContentId.get(content.id) as { progress: number; completed: boolean; updatedAt: Date } | undefined
        return {
          id: content.id,
          subject: content.subject,
          topic: content.title,
          type: content.type,
          duration: content.duration,
          difficulty: content.difficulty,
          progress: progress?.progress ?? 0,
          completed: progress?.completed ?? false,
          thumbnailUrl: content.thumbnailUrl,
          lastStudied: progress?.updatedAt?.toISOString() ?? null
        }
      })
    },
    CONTENT_LIST_CACHE_TTL
  )

  return NextResponse.json({ contents: contentWithProgress })
}, { role: 'STUDENT' })
