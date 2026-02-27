/**
 * Whiteboard Snapshots API
 * GET /api/whiteboards/[id]/snapshots - List snapshots
 * POST /api/whiteboards/[id]/snapshots - Create snapshot
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage, whiteboardSnapshot } from '@/lib/db/schema'
import { eq, and, isNull, asc, desc } from 'drizzle-orm'
import { z } from 'zod'
import crypto from 'crypto'

const CreateSnapshotSchema = z.object({
  name: z.string().min(1),
  thumbnailUrl: z.string().optional(),
})

// GET - List snapshots
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const whiteboardId = params?.id as string
  const userId = session.user.id

  try {
    const [wb] = await drizzleDb
      .select()
      .from(whiteboard)
      .where(
        and(
          eq(whiteboard.id, whiteboardId),
          eq(whiteboard.tutorId, userId),
          isNull(whiteboard.deletedAt)
        )
      )
      .limit(1)

    if (!wb) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }

    const snapshots = await drizzleDb
      .select()
      .from(whiteboardSnapshot)
      .where(eq(whiteboardSnapshot.whiteboardId, whiteboardId))
      .orderBy(desc(whiteboardSnapshot.createdAt))

    return NextResponse.json({ snapshots })
  } catch (error) {
    console.error('Fetch snapshots error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch snapshots' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// POST - Create snapshot
export const POST = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const whiteboardId = params?.id as string
  const userId = session.user.id

  try {
    const body = await req.json()
    const validation = CreateSnapshotSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }

    const data = validation.data

    const [wb] = await drizzleDb
      .select()
      .from(whiteboard)
      .where(
        and(
          eq(whiteboard.id, whiteboardId),
          eq(whiteboard.tutorId, userId),
          isNull(whiteboard.deletedAt)
        )
      )
      .limit(1)

    if (!wb) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }

    const pages = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, whiteboardId))
      .orderBy(asc(whiteboardPage.order))

    const snapshotPages = pages.map((p) => ({
      id: p.id,
      name: p.name,
      order: p.order,
      backgroundColor: p.backgroundColor,
      backgroundStyle: p.backgroundStyle,
      backgroundImage: p.backgroundImage,
      strokes: p.strokes,
      shapes: p.shapes,
      texts: p.texts,
      images: p.images,
      viewState: p.viewState,
    }))

    const inserted = await drizzleDb
      .insert(whiteboardSnapshot)
      .values({
        id: crypto.randomUUID(),
        whiteboardId,
        name: data.name,
        thumbnailUrl: data.thumbnailUrl ?? null,
        pages: snapshotPages,
        createdBy: userId,
      })
      .returning()

    return NextResponse.json({ snapshot: inserted[0] }, { status: 201 })
  } catch (error) {
    console.error('Create snapshot error:', error)
    return NextResponse.json(
      { error: 'Failed to create snapshot' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
