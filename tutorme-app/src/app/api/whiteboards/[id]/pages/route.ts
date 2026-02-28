/**
 * Whiteboard Pages API
 * GET /api/whiteboards/[id]/pages - List pages
 * POST /api/whiteboards/[id]/pages - Create new page
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage } from '@/lib/db/schema'
import { eq, and, isNull, asc, desc } from 'drizzle-orm'
import { z } from 'zod'
import crypto from 'crypto'

const CreatePageSchema = z.object({
  name: z.string().min(1),
  order: z.number().optional(),
  backgroundColor: z.string().optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots', 'lines']).optional(),
  backgroundImage: z.string().optional(),
})

// GET - List pages
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const whiteboardId = await getParamAsync(context?.params, 'id')
  if (!whiteboardId) {
    return NextResponse.json({ error: 'Whiteboard ID required' }, { status: 400 })
  }
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

    const pages = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, whiteboardId))
      .orderBy(asc(whiteboardPage.order))

    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Fetch pages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// POST - Create page
export const POST = withAuth(async (req: NextRequest, session, context) => {
  const whiteboardId = await getParamAsync(context?.params, 'id')
  if (!whiteboardId) {
    return NextResponse.json({ error: 'Whiteboard ID required' }, { status: 400 })
  }
  const userId = session.user.id

  try {
    const body = await req.json()
    const validation = CreatePageSchema.safeParse(body)

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

    let order = data.order
    if (order === undefined) {
      const [maxRow] = await drizzleDb
        .select({ order: whiteboardPage.order })
        .from(whiteboardPage)
        .where(eq(whiteboardPage.whiteboardId, whiteboardId))
        .orderBy(desc(whiteboardPage.order))
        .limit(1)
      order = (maxRow?.order ?? -1) + 1
    }

    const inserted = await drizzleDb
      .insert(whiteboardPage)
      .values({
        id: crypto.randomUUID(),
        whiteboardId,
        name: data.name,
        order,
        backgroundColor: data.backgroundColor ?? null,
        backgroundStyle: data.backgroundStyle ?? null,
        backgroundImage: data.backgroundImage ?? null,
        strokes: [],
        shapes: [],
        texts: [],
        images: [],
      })
      .returning()

    return NextResponse.json({ page: inserted[0] }, { status: 201 })
  } catch (error) {
    console.error('Create page error:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// PUT - Reorder pages
export const PUT = withAuth(async (req: NextRequest, session, context) => {
  const whiteboardId = await getParamAsync(context?.params, 'id')
  if (!whiteboardId) {
    return NextResponse.json({ error: 'Whiteboard ID required' }, { status: 400 })
  }
  const userId = session.user.id

  try {
    const body = await req.json()
    const { pageOrders } = body as { pageOrders: { id: string; order: number }[] }

    if (!Array.isArray(pageOrders)) {
      return NextResponse.json(
        { error: 'pageOrders array is required' },
        { status: 400 }
      )
    }

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

    await drizzleDb.transaction(async (tx) => {
      for (const po of pageOrders) {
        await tx
          .update(whiteboardPage)
          .set({ order: po.order })
          .where(eq(whiteboardPage.id, po.id))
      }
    })

    const pages = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, whiteboardId))
      .orderBy(asc(whiteboardPage.order))

    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Reorder pages error:', error)
    return NextResponse.json(
      { error: 'Failed to reorder pages' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
