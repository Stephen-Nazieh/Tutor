/**
 * Whiteboard Snapshots API
 * GET /api/whiteboards/[id]/snapshots - List snapshots
 * POST /api/whiteboards/[id]/snapshots - Create snapshot
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

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
    
    const snapshots = await db.whiteboardSnapshot.findMany({
      where: { whiteboardId },
      orderBy: { createdAt: 'desc' },
    })
    
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
    
    // Verify ownership
    const whiteboard = await db.whiteboard.findFirst({
      where: { id: whiteboardId, tutorId: userId, deletedAt: null },
      include: { pages: true },
    })
    
    if (!whiteboard) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }
    
    // Create snapshot with current state
    const snapshot = await db.whiteboardSnapshot.create({
      data: {
        whiteboardId,
        name: data.name,
        thumbnailUrl: data.thumbnailUrl,
        pages: whiteboard.pages.map((page: any) => ({
          id: page.id,
          name: page.name,
          order: page.order,
          backgroundColor: page.backgroundColor,
          backgroundStyle: page.backgroundStyle,
          backgroundImage: page.backgroundImage,
          strokes: page.strokes,
          shapes: page.shapes,
          texts: page.texts,
          images: page.images,
          viewState: page.viewState,
        })),
        createdBy: userId,
      },
    })
    
    return NextResponse.json({ snapshot }, { status: 201 })
  } catch (error) {
    console.error('Create snapshot error:', error)
    return NextResponse.json(
      { error: 'Failed to create snapshot' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
