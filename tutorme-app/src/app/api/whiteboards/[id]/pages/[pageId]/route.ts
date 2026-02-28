/**
 * Whiteboard Page Content API
 * GET /api/whiteboards/[id]/pages/[pageId] - Get page content
 * PUT /api/whiteboards/[id]/pages/[pageId] - Update page content
 * DELETE /api/whiteboards/[id]/pages/[pageId] - Delete page
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage } from '@/lib/db/schema'
import { eq, and, isNull, asc } from 'drizzle-orm'
import { z } from 'zod'

const UpdatePageSchema = z.object({
  name: z.string().min(1).optional(),
  strokes: z.array(z.any()).optional(),
  shapes: z.array(z.any()).optional(),
  texts: z.array(z.any()).optional(),
  images: z.array(z.any()).optional(),
  viewState: z
    .object({
      scale: z.number().optional(),
      panX: z.number().optional(),
      panY: z.number().optional(),
    })
    .optional(),
  backgroundColor: z.string().optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots', 'lines']).optional(),
  backgroundImage: z.string().optional(),
})

// GET - Get page content
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const whiteboardId = await getParamAsync(context?.params, 'id')
  const pageId = await getParamAsync(context?.params, 'pageId')
  if (!whiteboardId || !pageId) {
    return NextResponse.json({ error: 'Whiteboard ID and page ID required' }, { status: 400 })
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

    const [page] = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(
        and(
          eq(whiteboardPage.id, pageId),
          eq(whiteboardPage.whiteboardId, whiteboardId)
        )
      )
      .limit(1)

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error('Fetch page error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// PUT - Update page content
export const PUT = withAuth(async (req: NextRequest, session, context) => {
  const whiteboardId = await getParamAsync(context?.params, 'id')
  const pageId = await getParamAsync(context?.params, 'pageId')
  if (!whiteboardId || !pageId) {
    return NextResponse.json({ error: 'Whiteboard ID and page ID required' }, { status: 400 })
  }
  const userId = session.user.id

  try {
    const body = await req.json()
    const validation = UpdatePageSchema.safeParse(body)

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

    const [existingPage] = await drizzleDb
      .select({ id: whiteboardPage.id })
      .from(whiteboardPage)
      .where(
        and(
          eq(whiteboardPage.id, pageId),
          eq(whiteboardPage.whiteboardId, whiteboardId)
        )
      )
      .limit(1)
    if (!existingPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.strokes !== undefined) updateData.strokes = data.strokes
    if (data.shapes !== undefined) updateData.shapes = data.shapes
    if (data.texts !== undefined) updateData.texts = data.texts
    if (data.images !== undefined) updateData.images = data.images
    if (data.viewState !== undefined) updateData.viewState = data.viewState
    if (data.backgroundColor !== undefined)
      updateData.backgroundColor = data.backgroundColor
    if (data.backgroundStyle !== undefined)
      updateData.backgroundStyle = data.backgroundStyle
    if (data.backgroundImage !== undefined)
      updateData.backgroundImage = data.backgroundImage

    await drizzleDb
      .update(whiteboardPage)
      .set(updateData)
      .where(
        and(
          eq(whiteboardPage.id, pageId),
          eq(whiteboardPage.whiteboardId, whiteboardId)
        )
      )

    await drizzleDb
      .update(whiteboard)
      .set({ updatedAt: new Date() })
      .where(eq(whiteboard.id, whiteboardId))

    const [page] = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(
        and(
          eq(whiteboardPage.id, pageId),
          eq(whiteboardPage.whiteboardId, whiteboardId)
        )
      )
      .limit(1)

    return NextResponse.json({ page: page! })
  } catch (error) {
    console.error('Update page error:', error)
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// DELETE - Delete page
export const DELETE = withAuth(async (req: NextRequest, session, context) => {
  const whiteboardId = await getParamAsync(context?.params, 'id')
  const pageId = await getParamAsync(context?.params, 'pageId')
  if (!whiteboardId || !pageId) {
    return NextResponse.json({ error: 'Whiteboard ID and page ID required' }, { status: 400 })
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

    const [existingPage] = await drizzleDb
      .select({ id: whiteboardPage.id })
      .from(whiteboardPage)
      .where(
        and(
          eq(whiteboardPage.id, pageId),
          eq(whiteboardPage.whiteboardId, whiteboardId)
        )
      )
      .limit(1)
    if (!existingPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    const pageRows = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, whiteboardId))

    if (pageRows.length <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the last page' },
        { status: 400 }
      )
    }

    await drizzleDb
      .delete(whiteboardPage)
      .where(
        and(
          eq(whiteboardPage.id, pageId),
          eq(whiteboardPage.whiteboardId, whiteboardId)
        )
      )

    const remainingPages = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, whiteboardId))
      .orderBy(asc(whiteboardPage.order))

    await drizzleDb.transaction(async (tx) => {
      for (let i = 0; i < remainingPages.length; i++) {
        await tx
          .update(whiteboardPage)
          .set({ order: i })
          .where(eq(whiteboardPage.id, remainingPages[i].id))
      }
    })

    return NextResponse.json({ message: 'Page deleted' })
  } catch (error) {
    console.error('Delete page error:', error)
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
