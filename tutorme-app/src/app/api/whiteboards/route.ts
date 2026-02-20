/**
 * Whiteboard API
 * GET /api/whiteboards - List user's whiteboards
 * POST /api/whiteboards - Create new whiteboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
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
  const limit = parseInt(searchParams.get('limit') || '50', 10)
  
  try {
    const whiteboards = await db.whiteboard.findMany({
      where: {
        tutorId: userId,
        deletedAt: null,
        ...(sessionId ? { sessionId } : {}),
        ...(roomId ? { roomId } : {}),
        ...(isTemplate !== null ? { isTemplate: isTemplate === 'true' } : {}),
      },
      orderBy: { updatedAt: 'desc' },
      take: limit,
      include: {
        pages: {
          select: { id: true, name: true, order: true },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { pages: true, snapshots: true },
        },
      },
    })
    
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
    
    // Create whiteboard with initial page
    const whiteboard = await db.whiteboard.create({
      data: {
        tutorId: userId,
        title: data.title,
        description: data.description,
        sessionId: data.sessionId,
        roomId: data.roomId,
        curriculumId: data.curriculumId,
        lessonId: data.lessonId,
        isTemplate: data.isTemplate,
        isPublic: data.isPublic,
        width: data.width,
        height: data.height,
        backgroundColor: data.backgroundColor,
        backgroundStyle: data.backgroundStyle,
        pages: {
          create: {
            name: 'Page 1',
            order: 0,
            strokes: [],
            shapes: [],
            texts: [],
            images: [],
          },
        },
      },
      include: {
        pages: true,
      },
    })
    
    return NextResponse.json({ whiteboard }, { status: 201 })
  } catch (error) {
    console.error('Create whiteboard error:', error)
    return NextResponse.json(
      { error: 'Failed to create whiteboard' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
