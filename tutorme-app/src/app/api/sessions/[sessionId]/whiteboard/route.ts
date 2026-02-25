/**
 * Session Whiteboard API Routes
 * 
 * GET /api/sessions/[sessionId]/whiteboard - Get current user's whiteboard for this session
 * POST /api/sessions/[sessionId]/whiteboard - Create or get whiteboard for this session
 * PATCH /api/sessions/[sessionId]/whiteboard - Update whiteboard settings (visibility, etc.)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ValidationError, withRateLimit } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const WhiteboardCreateSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z.string().max(2000).optional().nullable(),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots']).optional(),
})

const WhiteboardPatchSchema = z.object({
  visibility: z.enum(['public', 'private']).optional(),
  isBroadcasting: z.boolean().optional(),
  title: z.string().min(1).max(120).optional(),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots']).optional(),
})

// GET - Get current user's whiteboard for this session
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context.params
  const { sessionId } = params
  const userId = session.user.id
  
  // Find whiteboard for this user in this session
  const whiteboard = await db.whiteboard.findFirst({
    where: {
      sessionId,
      tutorId: userId, // The owner field maps to tutorId in the schema
    },
    include: {
      pages: {
        orderBy: { order: 'asc' }
      }
    }
  })
  
  if (!whiteboard) {
    return NextResponse.json({ whiteboard: null })
  }
  
  return NextResponse.json({ whiteboard })
})

// POST - Create a new whiteboard for this session
export const POST = withAuth(async (req: NextRequest, session, context) => {
  const params = await context.params
  const { sessionId } = params
  const userId = session.user.id
  const userRole = session.user.role
  
  // Check if session exists
  const liveSession = await db.liveSession.findUnique({
    where: { id: sessionId }
  })
  
  if (!liveSession) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
  
  // Check if user already has a whiteboard for this session
  const existingWhiteboard = await db.whiteboard.findFirst({
    where: {
      sessionId,
      tutorId: userId,
    }
  })
  
  if (existingWhiteboard) {
    return NextResponse.json({ whiteboard: existingWhiteboard })
  }
  
  const { response: rateLimitResponse } = await withRateLimit(req, 30)
  if (rateLimitResponse) return rateLimitResponse

  // Get request body for customization
  const rawBody = await req.json().catch(() => ({}))
  const parsedBody = WhiteboardCreateSchema.safeParse(rawBody)
  if (!parsedBody.success) {
    throw new ValidationError(parsedBody.error.issues[0]?.message || 'Invalid whiteboard payload')
  }
  const body = parsedBody.data
  
  // Create new whiteboard
  const whiteboard = await db.whiteboard.create({
    data: {
      tutorId: userId,
      sessionId,
      title: body.title || `${session.user.name || 'My'} Whiteboard`,
      description: body.description || null,
      backgroundColor: body.backgroundColor || '#ffffff',
      backgroundStyle: body.backgroundStyle || 'solid',
      visibility: userRole === 'TUTOR' ? 'public' : 'private',
      isBroadcasting: false,
      ownerType: userRole === 'TUTOR' ? 'tutor' : 'student',
      pages: {
        create: {
          name: 'Page 1',
          order: 0,
          backgroundColor: body.backgroundColor || '#ffffff',
          backgroundStyle: body.backgroundStyle || 'solid',
          strokes: [],
          shapes: [],
          texts: [],
          images: []
        }
      }
    },
    include: {
      pages: true
    }
  })
  
  return NextResponse.json({ whiteboard }, { status: 201 })
})

// PATCH - Update whiteboard settings
export const PATCH = withAuth(async (req: NextRequest, session, context) => {
  const params = await context.params
  const { sessionId } = params
  const userId = session.user.id
  
  const { response: rateLimitResponse } = await withRateLimit(req, 30)
  if (rateLimitResponse) return rateLimitResponse

  const body = await req.json().catch(() => null)
  const parsedBody = WhiteboardPatchSchema.safeParse(body)
  if (!parsedBody.success) {
    throw new ValidationError(parsedBody.error.issues[0]?.message || 'Invalid whiteboard payload')
  }
  const { visibility, isBroadcasting, title, backgroundColor, backgroundStyle } = parsedBody.data
  
  // Find the whiteboard
  const whiteboard = await db.whiteboard.findFirst({
    where: {
      sessionId,
      tutorId: userId,
    }
  })
  
  if (!whiteboard) {
    return NextResponse.json({ error: 'Whiteboard not found' }, { status: 404 })
  }
  
  // Build update data
  const updateData: Record<string, unknown> = {}
  if (visibility !== undefined) updateData.visibility = visibility
  if (isBroadcasting !== undefined) updateData.isBroadcasting = isBroadcasting
  if (title !== undefined) updateData.title = title
  if (backgroundColor !== undefined) updateData.backgroundColor = backgroundColor
  if (backgroundStyle !== undefined) updateData.backgroundStyle = backgroundStyle
  
  const updatedWhiteboard = await db.whiteboard.update({
    where: { id: whiteboard.id },
    data: updateData
  })
  
  return NextResponse.json({ whiteboard: updatedWhiteboard })
})
