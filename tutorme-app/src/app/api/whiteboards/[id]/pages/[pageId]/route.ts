/**
 * Whiteboard Page Content API
 * GET /api/whiteboards/[id]/pages/[pageId] - Get page content
 * PUT /api/whiteboards/[id]/pages/[pageId] - Update page content
 * DELETE /api/whiteboards/[id]/pages/[pageId] - Delete page
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const UpdatePageSchema = z.object({
  name: z.string().min(1).optional(),
  strokes: z.array(z.any()).optional(),
  shapes: z.array(z.any()).optional(),
  texts: z.array(z.any()).optional(),
  images: z.array(z.any()).optional(),
  viewState: z.object({
    scale: z.number().optional(),
    panX: z.number().optional(),
    panY: z.number().optional(),
  }).optional(),
  backgroundColor: z.string().optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots', 'lines']).optional(),
  backgroundImage: z.string().optional(),
})

// GET - Get page content
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const whiteboardId = params?.id as string
  const pageId = params?.pageId as string
  const userId = session.user.id
  
  try {
    // Verify ownership
    const whiteboard = await db.whiteboard.findFirst({
      where: { id: whiteboardId, tutorId: userId, deletedAt: null },
    })
    
    if (!whiteboard) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }
    
    const page = await db.whiteboardPage.findFirst({
      where: { id: pageId, whiteboardId },
    })
    
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
  const params = await context?.params
  const whiteboardId = params?.id as string
  const pageId = params?.pageId as string
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
    
    // Verify ownership
    const whiteboard = await db.whiteboard.findFirst({
      where: { id: whiteboardId, tutorId: userId, deletedAt: null },
    })
    
    if (!whiteboard) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }
    
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.strokes !== undefined) updateData.strokes = data.strokes
    if (data.shapes !== undefined) updateData.shapes = data.shapes
    if (data.texts !== undefined) updateData.texts = data.texts
    if (data.images !== undefined) updateData.images = data.images
    if (data.viewState !== undefined) updateData.viewState = data.viewState
    if (data.backgroundColor !== undefined) updateData.backgroundColor = data.backgroundColor
    if (data.backgroundStyle !== undefined) updateData.backgroundStyle = data.backgroundStyle
    if (data.backgroundImage !== undefined) updateData.backgroundImage = data.backgroundImage
    
    const page = await db.whiteboardPage.update({
      where: { id: pageId },
      data: updateData,
    })
    
    // Update whiteboard's updatedAt
    await db.whiteboard.update({
      where: { id: whiteboardId },
      data: { updatedAt: new Date() },
    })
    
    return NextResponse.json({ page })
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
  const params = await context?.params
  const whiteboardId = params?.id as string
  const pageId = params?.pageId as string
  const userId = session.user.id
  
  try {
    // Verify ownership
    const whiteboard = await db.whiteboard.findFirst({
      where: { id: whiteboardId, tutorId: userId, deletedAt: null },
    })
    
    if (!whiteboard) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }
    
    // Check if this is the last page
    const pageCount = await db.whiteboardPage.count({
      where: { whiteboardId },
    })
    
    if (pageCount <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the last page' },
        { status: 400 }
      )
    }
    
    await db.whiteboardPage.delete({
      where: { id: pageId },
    })
    
    // Reorder remaining pages
    const remainingPages = await db.whiteboardPage.findMany({
      where: { whiteboardId },
      orderBy: { order: 'asc' },
    })
    
    await db.$transaction(
      remainingPages.map((page: any, index: number) =>
        db.whiteboardPage.update({
          where: { id: page.id },
          data: { order: index },
        })
      )
    )
    
    return NextResponse.json({ message: 'Page deleted' })
  } catch (error) {
    console.error('Delete page error:', error)
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
