/**
 * Student Progress API (Drizzle)
 * GET /api/progress — all progress for current student (withAuth)
 * POST /api/progress — update progress (withAuth + CSRF, Zod-validated)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { eq, and, desc, inArray } from 'drizzle-orm'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { contentProgress, contentItem } from '@/lib/db/schema'
import { z } from 'zod'

const postBodySchema = z.object({
  contentId: z.string().min(1, 'Content ID is required'),
  progress: z.number().min(0).max(100).optional(),
  lastPosition: z.number().min(0).optional(),
  completed: z.boolean().optional(),
})

async function getHandler(_req: NextRequest, session: Session) {
  try {
    const progressRows = await drizzleDb
      .select()
      .from(contentProgress)
      .where(eq(contentProgress.studentId, session.user.id))
      .orderBy(desc(contentProgress.updatedAt))

    const contentIds = progressRows.map((p) => p.contentId)
    const contents =
      contentIds.length > 0
        ? await drizzleDb.select().from(contentItem).where(inArray(contentItem.id, contentIds))
        : []
    const contentMap = new Map(contents.map((c) => [c.id, c]))

    const progress = progressRows.map((p) => ({
      ...p,
      content: contentMap.get(p.contentId)
        ? {
            id: p.contentId,
            title: contentMap.get(p.contentId)!.title,
            subject: contentMap.get(p.contentId)!.subject,
            type: contentMap.get(p.contentId)!.type,
            duration: contentMap.get(p.contentId)!.duration,
          }
        : null,
    }))

    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Progress fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const parsed = postBodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((i) => i.message).join('; ') },
        { status: 400 }
      )
    }
    const { contentId, progress, lastPosition, completed } = parsed.data
    const studentId = session.user.id

    const [existing] = await drizzleDb
      .select()
      .from(contentProgress)
      .where(and(eq(contentProgress.contentId, contentId), eq(contentProgress.studentId, studentId)))
      .limit(1)

    let updatedProgress
    if (existing) {
      const [updated] = await drizzleDb
        .update(contentProgress)
        .set({
          ...(progress !== undefined && { progress }),
          ...(lastPosition !== undefined && { lastPosition }),
          ...(completed !== undefined && { completed }),
        })
        .where(eq(contentProgress.id, existing.id))
        .returning()
      updatedProgress = updated ?? existing
    } else {
      const id = crypto.randomUUID()
      const createdRows = await drizzleDb
        .insert(contentProgress)
        .values({
          id,
          studentId,
          contentId,
          progress: progress ?? 0,
          lastPosition: lastPosition ?? undefined,
          completed: completed ?? false,
        })
        .returning()
      updatedProgress = createdRows[0]!
    }

    return NextResponse.json({ progress: updatedProgress })
  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
