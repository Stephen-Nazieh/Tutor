/**
 * Whiteboard Pages API
 * GET /api/whiteboards/[id]/pages - List pages
 * POST /api/whiteboards/[id]/pages - Create new page
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const CreatePageSchema = z.object({
  name: z.string().min(1),
  order: z.number().optional(),
  backgroundColor: z.string().optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots', 'lines']).optional(),
  backgroundImage: z.string().optional(),
})

// GET - List pages
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const whiteboardId = params?.id as string
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
    
    const pages = await db.whiteboardPage.findMany({
      where: { whiteboardId },
      orderBy: { order: 'asc' },
    })
    
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
  const params = await context?.params
  const whiteboardId = params?.id as string
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
    
    // Get max order if not specified
    let order = data.order
    if (order === undefined) {
      const maxOrder = await db.whiteboardPage.aggregate({
        where: { whiteboardId },
        _max: { order: true },
      })
      order = (maxOrder._max.order ?? -1) + 1
    }
    
    const page = await db.whiteboardPage.create({
      data: {
        whiteboardId,
        name: data.name,
        order,
        backgroundColor: data.backgroundColor,
        backgroundStyle: data.backgroundStyle,
        backgroundImage: data.backgroundImage,
        strokes: [],
        shapes: [],
        texts: [],
        images: [],
      },
    })
    
    return NextResponse.json({ page }, { status: 201 })
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
  const params = await context?.params
  const whiteboardId = params?.id as string
  const userId = session.user.id
  
  try {
    const body = await req.json()
    const { pageOrders } = body // [{ id, order }, ...]
    
    if (!Array.isArray(pageOrders)) {
      return NextResponse.json(
        { error: 'pageOrders array is required' },
        { status: 400 }
      )
    }
    
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
    
    // Update all page orders in a transaction
    await db.$transaction(
      pageOrders.map((po: { id: string; order: number }) =>
        db.whiteboardPage.update({
          where: { id: po.id },
          data: { order: po.order },
        })
      )
    )
    
    const pages = await db.whiteboardPage.findMany({
      where: { whiteboardId },
      orderBy: { order: 'asc' },
    })
    
    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Reorder pages error:', error)
    return NextResponse.json(
      { error: 'Failed to reorder pages' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
