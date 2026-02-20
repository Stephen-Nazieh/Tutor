/**
 * Individual Whiteboard API
 * GET /api/whiteboards/[id] - Get whiteboard details
 * PUT /api/whiteboards/[id] - Update whiteboard
 * DELETE /api/whiteboards/[id] - Delete whiteboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const UpdateWhiteboardSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  isTemplate: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  backgroundColor: z.string().optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots', 'lines']).optional(),
  backgroundImage: z.string().optional(),
  collaborators: z.array(z.object({
    userId: z.string(),
    role: z.enum(['editor', 'viewer']),
  })).optional(),
})

// GET - Get whiteboard
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const userId = session.user.id
  const { searchParams } = new URL(req.url)
  const includePages = searchParams.get('pages') !== 'false'
  
  try {
    const whiteboard = await db.whiteboard.findFirst({
      where: {
        id,
        tutorId: userId,
        deletedAt: null,
      },
      include: {
        pages: includePages ? {
          orderBy: { order: 'asc' },
        } : false,
        snapshots: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    })
    
    if (!whiteboard) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ whiteboard })
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
  const id = params?.id as string
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
    
    // Check ownership
    const existing = await db.whiteboard.findFirst({
      where: { id, tutorId: userId, deletedAt: null },
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }
    
    const updateData: any = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.isTemplate !== undefined) updateData.isTemplate = data.isTemplate
    if (data.isPublic !== undefined) updateData.isPublic = data.isPublic
    if (data.backgroundColor !== undefined) updateData.backgroundColor = data.backgroundColor
    if (data.backgroundStyle !== undefined) updateData.backgroundStyle = data.backgroundStyle
    if (data.backgroundImage !== undefined) updateData.backgroundImage = data.backgroundImage
    if (data.collaborators !== undefined) updateData.collaborators = data.collaborators
    
    const whiteboard = await db.whiteboard.update({
      where: { id },
      data: updateData,
      include: {
        pages: {
          orderBy: { order: 'asc' },
        },
      },
    })
    
    return NextResponse.json({ whiteboard })
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
  const id = params?.id as string
  const userId = session.user.id
  
  try {
    const existing = await db.whiteboard.findFirst({
      where: { id, tutorId: userId, deletedAt: null },
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }
    
    await db.whiteboard.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    
    return NextResponse.json({ message: 'Whiteboard deleted' })
  } catch (error) {
    console.error('Delete whiteboard error:', error)
    return NextResponse.json(
      { error: 'Failed to delete whiteboard' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
