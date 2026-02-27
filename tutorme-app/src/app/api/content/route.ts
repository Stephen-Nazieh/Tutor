/**
 * Content API
 * Returns available learning content for students
 * GET /api/content
 * 7.2 Backend: Redis/in-memory cache + N+1 fix (batch progress query)
 */

import { NextResponse } from 'next/server'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { cache } from '@/lib/db'
import { drizzleDb } from '@/lib/db/drizzle'
import { contentItem, contentProgress, profile } from '@/lib/db/schema'

const CONTENT_LIST_CACHE_TTL = 60 // 1 minute

export const GET = withAuth(async (req, session) => {
  const cacheKey = `content:list:${session.user.id}`

  const contentWithProgress = await cache.getOrSet(
    cacheKey,
    async () => {
      const [profileRow] = await drizzleDb
        .select({ subjectsOfInterest: profile.subjectsOfInterest })
        .from(profile)
        .where(eq(profile.userId, session.user.id))
        .limit(1)

      let contents
      if (
        profileRow?.subjectsOfInterest &&
        profileRow.subjectsOfInterest.length > 0
      ) {
        contents = await drizzleDb
          .select()
          .from(contentItem)
          .where(
            and(
              eq(contentItem.isPublished, true),
              inArray(contentItem.subject, profileRow.subjectsOfInterest)
            )
          )
          .orderBy(desc(contentItem.createdAt))
          .limit(20)
      } else {
        contents = await drizzleDb
          .select()
          .from(contentItem)
          .where(eq(contentItem.isPublished, true))
          .orderBy(desc(contentItem.createdAt))
          .limit(20)
      }

      if (contents.length === 0) return []

      const contentIds = contents.map((c) => c.id)
      const progressList = await drizzleDb
        .select()
        .from(contentProgress)
        .where(
          and(
            inArray(contentProgress.contentId, contentIds),
            eq(contentProgress.studentId, session.user.id)
          )
        )
      const progressByContentId = new Map(
        progressList.map((p) => [p.contentId, p])
      )

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
