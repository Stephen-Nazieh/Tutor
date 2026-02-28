/**
 * Whiteboard API
 * GET /api/whiteboards - List user's whiteboards
 * POST /api/whiteboards - Create new whiteboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage, whiteboardSnapshot } from '@/lib/db/schema'
import { and, eq, desc, isNull, sql, inArray } from 'drizzle-orm'
import { z } from 'zod'

const CreateWhiteboardSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  sessionId: z.string().optional(),
  roomId: z.string().optional(),
  curriculumId: z.string().optional(),
  lessonId: z.string().optional(),
  isTemplate: z.boolean().default(false),
  isPublic: z.boolean().default(false),
  width: z.number().default(10000),
  height: z.number().default(10000),
  backgroundColor: z.string().default('#ffffff'),
  backgroundStyle: z.enum(['solid', 'grid', 'dots', 'lines']).default('solid'),
})

// GET - List whiteboards
export const GET = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id
  const { searchParams } = new URL(req.url)

  const sessionId = searchParams.get('sessionId')
  const roomId = searchParams.get('roomId')
  const isTemplate = searchParams.get('isTemplate')
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100)

  try {
    const conditions = [
      eq(whiteboard.tutorId, userId),
      isNull(whiteboard.deletedAt),
      ...(sessionId ? [eq(whiteboard.sessionId, sessionId)] : []),
      ...(roomId ? [eq(whiteboard.roomId, roomId)] : []),
      ...(isTemplate !== null && isTemplate !== '' ? [eq(whiteboard.isTemplate, isTemplate === 'true')] : []),
    ].filter(Boolean) as ReturnType<typeof eq>[]

    const boards = await drizzleDb
      .select()
      .from(whiteboard)
      .where(and(...conditions))
      .orderBy(desc(whiteboard.updatedAt))
      .limit(limit)

    const boardIds = boards.map((b) => b.id)

    const [pagesRows, snapshotCounts] = await Promise.all([
      boardIds.length
        ? drizzleDb
            .select({
              whiteboardId: whiteboardPage.whiteboardId,
              id: whiteboardPage.id,
              name: whiteboardPage.name,
              order: whiteboardPage.order,
            })
            .from(whiteboardPage)
            .where(inArray(whiteboardPage.whiteboardId, boardIds))
            .orderBy(whiteboardPage.order)
        : [],
      boardIds.length
        ? drizzleDb
            .select({
              whiteboardId: whiteboardSnapshot.whiteboardId,
              count: sql<number>`count(*)::int`,
            })
            .from(whiteboardSnapshot)
            .where(inArray(whiteboardSnapshot.whiteboardId, boardIds))
            .groupBy(whiteboardSnapshot.whiteboardId)
        : [],
    ])

    const snapshotByBoard = Object.fromEntries(
      (snapshotCounts as { whiteboardId: string; count: number }[]).map((r) => [r.whiteboardId, r.count])
    )
    const pagesByBoard = (pagesRows as { whiteboardId: string; id: string; name: string; order: number }[]).reduce(
      (acc, p) => {
        if (!acc[p.whiteboardId]) acc[p.whiteboardId] = []
        acc[p.whiteboardId].push({ id: p.id, name: p.name, order: p.order })
        return acc
      },
      {} as Record<string, { id: string; name: string; order: number }[]>
    )

    const whiteboards = boards.map((b) => ({
      ...b,
      pages: (pagesByBoard[b.id] ?? []).sort((a, b) => a.order - b.order),
      _count: { pages: pagesByBoard[b.id]?.length ?? 0, snapshots: snapshotByBoard[b.id] ?? 0 },
    }))

    return NextResponse.json({ whiteboards })
  } catch (error) {
    console.error('Fetch whiteboards error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch whiteboards' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// POST - Create whiteboard
export const POST = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id

  try {
    const body = await req.json()
    const validation = CreateWhiteboardSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }

    const data = validation.data
    const whiteboardId = crypto.randomUUID()
    const pageId = crypto.randomUUID()

    await drizzleDb.transaction(async (tx) => {
      await tx.insert(whiteboard).values({
        id: whiteboardId,
        tutorId: userId,
        title: data.title,
        description: data.description ?? null,
        sessionId: data.sessionId ?? null,
        roomId: data.roomId ?? null,
        curriculumId: data.curriculumId ?? null,
        lessonId: data.lessonId ?? null,
        isTemplate: data.isTemplate,
        isPublic: data.isPublic,
        width: data.width,
        height: data.height,
        backgroundColor: data.backgroundColor,
        backgroundStyle: data.backgroundStyle,
        visibility: 'private',
        isBroadcasting: false,
        ownerType: 'tutor',
      })
      await tx.insert(whiteboardPage).values({
        id: pageId,
        whiteboardId,
        name: 'Page 1',
        order: 0,
        strokes: [],
        shapes: [],
        texts: [],
        images: [],
      })
    })

    const [wb] = await drizzleDb.select().from(whiteboard).where(eq(whiteboard.id, whiteboardId))
    const pages = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, whiteboardId))
      .orderBy(whiteboardPage.order)

    return NextResponse.json(
      { whiteboard: wb ? { ...wb, pages } : null },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create whiteboard error:', error)
    return NextResponse.json(
      { error: 'Failed to create whiteboard' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
