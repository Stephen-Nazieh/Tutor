/**
 * Whiteboard Page Content API
 * GET /api/whiteboards/[id]/pages/[pageId] - Get page content
 * PUT /api/whiteboards/[id]/pages/[pageId] - Update page content
 * DELETE /api/whiteboards/[id]/pages/[pageId] - Delete page
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, handleApiError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage } from '@/lib/db/schema'
import { eq, and, isNull, asc, sql } from 'drizzle-orm'
import { z } from 'zod'

const UpdatePageSchema = z.object({
  name: z.string().min(1).optional(),
  strokes: z.array(z.any()).optional(),
  shapes: z.array(z.any()).optional(),
  texts: z.array(z.any()).optional(),
  images: z.array(z.any()).optional(),
  version: z.number().int().positive().optional(),
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

function getExpectedVersion(req: NextRequest, fallback?: number) {
  const ifMatch = req.headers.get('if-match')
  if (ifMatch) {
    const match = ifMatch.match(/v(\d+)/i) ?? ifMatch.match(/(\d+)/)
    if (match?.[1]) return Number(match[1])
  }
  return fallback
}

function makeEtag(version: number) {
  return `W/"v${version}"`
}

// GET - Get page content
export const GET = withAuth(
  async (req: NextRequest, session, context) => {
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
            eq(whiteboard.whiteboardId, whiteboardId),
            eq(whiteboard.ownerId, userId),
            isNull(whiteboard.deletedAt)
          )
        )
        .limit(1)

      if (!wb) {
        return NextResponse.json({ error: 'Whiteboard not found' }, { status: 404 })
      }

      const [page] = await drizzleDb
        .select()
        .from(whiteboardPage)
        .where(and(eq(whiteboardPage.pageId, pageId), eq(whiteboardPage.whiteboardId, whiteboardId)))
        .limit(1)

      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 })
      }

      return NextResponse.json({ page }, { headers: { ETag: makeEtag(page.version) } })
    } catch (error) {
      console.error('Fetch page error:', error)
      return handleApiError(
        error,
        'Failed to fetch page',
        'api/whiteboards/[id]/pages/[pageId]/route.ts'
      )
    }
  },
  { role: 'TUTOR' }
)

// PUT - Update page content
export const PUT = withAuth(
  async (req: NextRequest, session, context) => {
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
            eq(whiteboard.whiteboardId, whiteboardId),
            eq(whiteboard.ownerId, userId),
            isNull(whiteboard.deletedAt)
          )
        )
        .limit(1)

      if (!wb) {
        return NextResponse.json({ error: 'Whiteboard not found' }, { status: 404 })
      }

      const expectedVersion = getExpectedVersion(req, data.version)
      if (!expectedVersion) {
        return NextResponse.json({ error: 'Missing If-Match version' }, { status: 428 })
      }

      const [pageRow] = await drizzleDb
        .select({ version: whiteboardPage.version })
        .from(whiteboardPage)
        .where(and(eq(whiteboardPage.pageId, pageId), eq(whiteboardPage.whiteboardId, whiteboardId)))
        .limit(1)
      if (!pageRow) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 })
      }
      if (pageRow.version !== expectedVersion) {
        return NextResponse.json(
          { error: 'Whiteboard page has changed', currentVersion: pageRow.version },
          {
            status: 412,
            headers: { ETag: makeEtag(pageRow.version) },
          }
        )
      }

      const updateData: Record<string, unknown> = {}
      if (data.name !== undefined) updateData.name = data.name
      if (data.strokes !== undefined) updateData.strokes = data.strokes
      if (data.shapes !== undefined) updateData.shapes = data.shapes
      if (data.texts !== undefined) updateData.texts = data.texts
      if (data.images !== undefined) updateData.images = data.images
      if (data.viewState !== undefined) updateData.viewState = data.viewState
      if (data.backgroundColor !== undefined) updateData.backgroundColor = data.backgroundColor
      if (data.backgroundStyle !== undefined) updateData.backgroundStyle = data.backgroundStyle
      if (data.backgroundImage !== undefined) updateData.backgroundImage = data.backgroundImage

      const updatedRows = await drizzleDb
        .update(whiteboardPage)
        .set({
          ...updateData,
          version: sql<number>`${whiteboardPage.version} + 1`,
        })
        .where(
          and(
            eq(whiteboardPage.pageId, pageId),
            eq(whiteboardPage.whiteboardId, whiteboardId),
            eq(whiteboardPage.version, expectedVersion)
          )
        )
        .returning()

      await drizzleDb
        .update(whiteboard)
        .set({ updatedAt: new Date() })
        .where(eq(whiteboard.id, whiteboardId))

      if (updatedRows.length === 0) {
        const [latest] = await drizzleDb
          .select({ version: whiteboardPage.version })
          .from(whiteboardPage)
          .where(and(eq(whiteboardPage.pageId, pageId), eq(whiteboardPage.whiteboardId, whiteboardId)))
          .limit(1)
        const latestVersion = latest?.version ?? expectedVersion
        return NextResponse.json(
          { error: 'Whiteboard page has changed', currentVersion: latestVersion },
          {
            status: 412,
            headers: { ETag: makeEtag(latestVersion) },
          }
        )
      }

      const page = updatedRows[0]
      return NextResponse.json({ page: page! }, { headers: { ETag: makeEtag(page!.version) } })
    } catch (error) {
      console.error('Update page error:', error)
      return handleApiError(
        error,
        'Failed to update page',
        'api/whiteboards/[id]/pages/[pageId]/route.ts'
      )
    }
  },
  { role: 'TUTOR' }
)

// DELETE - Delete page
export const DELETE = withAuth(
  async (req: NextRequest, session, context) => {
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
            eq(whiteboard.whiteboardId, whiteboardId),
            eq(whiteboard.ownerId, userId),
            isNull(whiteboard.deletedAt)
          )
        )
        .limit(1)

      if (!wb) {
        return NextResponse.json({ error: 'Whiteboard not found' }, { status: 404 })
      }

      const [existingPage] = await drizzleDb
        .select({ pageId: whiteboardPage.pageId })
        .from(whiteboardPage)
        .where(and(eq(whiteboardPage.pageId, pageId), eq(whiteboardPage.whiteboardId, whiteboardId)))
        .limit(1)
      if (!existingPage) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 })
      }

      const pageRows = await drizzleDb
        .select()
        .from(whiteboardPage)
        .where(eq(whiteboardPage.whiteboardId, whiteboardId))

      if (pageRows.length <= 1) {
        return NextResponse.json({ error: 'Cannot delete the last page' }, { status: 400 })
      }

      await drizzleDb
        .delete(whiteboardPage)
        .where(and(eq(whiteboardPage.pageId, pageId), eq(whiteboardPage.whiteboardId, whiteboardId)))

      const remainingPages = await drizzleDb
        .select()
        .from(whiteboardPage)
        .where(eq(whiteboardPage.whiteboardId, whiteboardId))
        .orderBy(asc(whiteboardPage.order))

      await drizzleDb.transaction(async tx => {
        for (let i = 0; i < remainingPages.length; i++) {
          await tx
            .update(whiteboardPage)
            .set({ order: i })
            .where(eq(whiteboardPage.pageId, remainingPages[i].pageId))
        }
      })

      return NextResponse.json({ message: 'Page deleted' })
    } catch (error) {
      console.error('Delete page error:', error)
      return handleApiError(
        error,
        'Failed to delete page',
        'api/whiteboards/[id]/pages/[pageId]/route.ts'
      )
    }
  },
  { role: 'TUTOR' }
)
