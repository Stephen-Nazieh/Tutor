/**
 * Individual Whiteboard API
 * GET /api/whiteboards/[id] - Get whiteboard details
 * PUT /api/whiteboards/[id] - Update whiteboard
 * DELETE /api/whiteboards/[id] - Delete whiteboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage, whiteboardSnapshot } from '@/lib/db/schema'
import { eq, and, isNull, asc, desc } from 'drizzle-orm'
import { z } from 'zod'

const UpdateWhiteboardSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  isTemplate: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  backgroundColor: z.string().optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots', 'lines']).optional(),
  backgroundImage: z.string().optional(),
  collaborators: z
    .array(
      z.object({
        userId: z.string(),
        role: z.enum(['editor', 'viewer']),
      })
    )
    .optional(),
})

// GET - Get whiteboard
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = (await params)?.id as string
  const userId = session.user.id
  const { searchParams } = new URL(req.url)
  const includePages = searchParams.get('pages') !== 'false'

  try {
    const [wb] = await drizzleDb
      .select()
      .from(whiteboard)
      .where(and(eq(whiteboard.id, id), eq(whiteboard.tutorId, userId), isNull(whiteboard.deletedAt)))
      .limit(1)

    if (!wb) {
      return NextResponse.json({ error: 'Whiteboard not found' }, { status: 404 })
    }

    const [pages, snapshots] = await Promise.all([
      includePages
        ? drizzleDb
            .select()
            .from(whiteboardPage)
            .where(eq(whiteboardPage.whiteboardId, id))
            .orderBy(asc(whiteboardPage.order))
        : [],
      drizzleDb
        .select()
        .from(whiteboardSnapshot)
        .where(eq(whiteboardSnapshot.whiteboardId, id))
        .orderBy(desc(whiteboardSnapshot.createdAt))
        .limit(5),
    ])

    const whiteboardResult = { ...wb, pages, snapshots }
    return NextResponse.json({ whiteboard: whiteboardResult })
  } catch (error) {
    console.error('Fetch whiteboard error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch whiteboard' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// PUT - Update whiteboard
export const PUT = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = (await params)?.id as string
  const userId = session.user.id

  try {
    const body = await req.json()
    const validation = UpdateWhiteboardSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }

    const data = validation.data

    const [existing] = await drizzleDb
      .select()
      .from(whiteboard)
      .where(and(eq(whiteboard.id, id), eq(whiteboard.tutorId, userId), isNull(whiteboard.deletedAt)))
      .limit(1)

    if (!existing) {
      return NextResponse.json({ error: 'Whiteboard not found' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.isTemplate !== undefined) updateData.isTemplate = data.isTemplate
    if (data.isPublic !== undefined) updateData.isPublic = data.isPublic
    if (data.backgroundColor !== undefined) updateData.backgroundColor = data.backgroundColor
    if (data.backgroundStyle !== undefined) updateData.backgroundStyle = data.backgroundStyle
    if (data.backgroundImage !== undefined) updateData.backgroundImage = data.backgroundImage
    if (data.collaborators !== undefined) updateData.collaborators = data.collaborators

    await drizzleDb.update(whiteboard).set(updateData).where(eq(whiteboard.id, id))

    const [updated] = await drizzleDb.select().from(whiteboard).where(eq(whiteboard.id, id))
    const pages = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, id))
      .orderBy(asc(whiteboardPage.order))

    return NextResponse.json({ whiteboard: updated ? { ...updated, pages } : null })
  } catch (error) {
    console.error('Update whiteboard error:', error)
    return NextResponse.json(
      { error: 'Failed to update whiteboard' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// DELETE - Soft delete whiteboard
export const DELETE = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = (await params)?.id as string
  const userId = session.user.id

  try {
    const [existing] = await drizzleDb
      .select()
      .from(whiteboard)
      .where(and(eq(whiteboard.id, id), eq(whiteboard.tutorId, userId), isNull(whiteboard.deletedAt)))
      .limit(1)

    if (!existing) {
      return NextResponse.json({ error: 'Whiteboard not found' }, { status: 404 })
    }

    await drizzleDb.update(whiteboard).set({ deletedAt: new Date() }).where(eq(whiteboard.id, id))

    return NextResponse.json({ message: 'Whiteboard deleted' })
  } catch (error) {
    console.error('Delete whiteboard error:', error)
    return NextResponse.json(
      { error: 'Failed to delete whiteboard' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
