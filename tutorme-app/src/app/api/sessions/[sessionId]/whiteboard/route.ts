/**
 * Session Whiteboard API Routes
 *
 * GET /api/sessions/[sessionId]/whiteboard - Get current user's whiteboard for this session
 * POST /api/sessions/[sessionId]/whiteboard - Create or get whiteboard for this session
 * PATCH /api/sessions/[sessionId]/whiteboard - Update whiteboard settings (visibility, etc.)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ValidationError, withRateLimit } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  whiteboard,
  whiteboardPage,
  liveSession,
} from '@/lib/db/schema'
import { eq, and, asc } from 'drizzle-orm'
import { z } from 'zod'
import crypto from 'crypto'

const WhiteboardCreateSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z.string().max(2000).optional().nullable(),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots']).optional(),
})

const WhiteboardPatchSchema = z.object({
  visibility: z.enum(['public', 'private', 'tutor-only']).optional(),
  isBroadcasting: z.boolean().optional(),
  title: z.string().min(1).max(120).optional(),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  backgroundStyle: z.enum(['solid', 'grid', 'dots']).optional(),
})

// GET - Get current user's whiteboard for this session
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const sessionId = await getParamAsync(context?.params, 'sessionId')
  if (!sessionId) return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
  const userId = session.user.id

  const [whiteboardRow] = await drizzleDb
    .select()
    .from(whiteboard)
    .where(
      and(
        eq(whiteboard.sessionId, sessionId),
        eq(whiteboard.tutorId, userId)
      )
    )
    .limit(1)

  if (!whiteboardRow) {
    return NextResponse.json({ whiteboard: null })
  }

  const pages = await drizzleDb
    .select()
    .from(whiteboardPage)
    .where(eq(whiteboardPage.whiteboardId, whiteboardRow.id))
    .orderBy(asc(whiteboardPage.order))

  return NextResponse.json({
    whiteboard: { ...whiteboardRow, pages },
  })
})

// POST - Create a new whiteboard for this session
export const POST = withAuth(async (req: NextRequest, session, context) => {
  const sessionId = await getParamAsync(context?.params, 'sessionId')
  if (!sessionId) return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
  const userId = session.user.id
  const userRole = session.user.role

  const [liveSessionRow] = await drizzleDb
    .select()
    .from(liveSession)
    .where(eq(liveSession.id, sessionId))
    .limit(1)

  if (!liveSessionRow) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const [existingWhiteboard] = await drizzleDb
    .select()
    .from(whiteboard)
    .where(
      and(
        eq(whiteboard.sessionId, sessionId),
        eq(whiteboard.tutorId, userId)
      )
    )
    .limit(1)

  if (existingWhiteboard) {
    const pages = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, existingWhiteboard.id))
      .orderBy(asc(whiteboardPage.order))
    return NextResponse.json({
      whiteboard: { ...existingWhiteboard, pages },
    })
  }

  const { response: rateLimitResponse } = await withRateLimit(req, 30)
  if (rateLimitResponse) return rateLimitResponse

  const rawBody = await req.json().catch(() => ({}))
  const parsedBody = WhiteboardCreateSchema.safeParse(rawBody)
  if (!parsedBody.success) {
    throw new ValidationError(
      parsedBody.error.issues[0]?.message || 'Invalid whiteboard payload'
    )
  }
  const body = parsedBody.data

  const whiteboardId = crypto.randomUUID()
  const pageId = crypto.randomUUID()
  const backgroundColor = body.backgroundColor ?? '#ffffff'
  const backgroundStyle = body.backgroundStyle ?? 'solid'

  await drizzleDb.insert(whiteboard).values({
    id: whiteboardId,
    tutorId: userId,
    sessionId,
    title: body.title ?? `${session.user.name || 'My'} Whiteboard`,
    description: body.description ?? null,
    backgroundColor,
    backgroundStyle,
    visibility: userRole === 'TUTOR' ? 'public' : 'private',
    isBroadcasting: false,
    ownerType: userRole === 'TUTOR' ? 'tutor' : 'student',
    isTemplate: false,
    isPublic: false,
    width: 1920,
    height: 1080,
  })

  await drizzleDb.insert(whiteboardPage).values({
    id: pageId,
    whiteboardId,
    name: 'Page 1',
    order: 0,
    backgroundColor,
    backgroundStyle,
    strokes: [],
    shapes: [],
    texts: [],
    images: [],
  })

  const [created] = await drizzleDb
    .select()
    .from(whiteboard)
    .where(eq(whiteboard.id, whiteboardId))
    .limit(1)
  const pages = await drizzleDb
    .select()
    .from(whiteboardPage)
    .where(eq(whiteboardPage.whiteboardId, whiteboardId))
    .orderBy(asc(whiteboardPage.order))

  return NextResponse.json(
    { whiteboard: created ? { ...created, pages } : null },
    { status: 201 }
  )
})

// PATCH - Update whiteboard settings
export const PATCH = withAuth(async (req: NextRequest, session, context) => {
  const sessionId = await getParamAsync(context?.params, 'sessionId')
  if (!sessionId) return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
  const userId = session.user.id

  const { response: rateLimitResponse } = await withRateLimit(req, 30)
  if (rateLimitResponse) return rateLimitResponse

  const body = await req.json().catch(() => null)
  const parsedBody = WhiteboardPatchSchema.safeParse(body)
  if (!parsedBody.success) {
    throw new ValidationError(
      parsedBody.error.issues[0]?.message || 'Invalid whiteboard payload'
    )
  }
  const { visibility, isBroadcasting, title, backgroundColor, backgroundStyle } =
    parsedBody.data

  const [whiteboardRow] = await drizzleDb
    .select()
    .from(whiteboard)
    .where(
      and(
        eq(whiteboard.sessionId, sessionId),
        eq(whiteboard.tutorId, userId)
      )
    )
    .limit(1)

  if (!whiteboardRow) {
    return NextResponse.json(
      { error: 'Whiteboard not found' },
      { status: 404 }
    )
  }

  const updateData: Record<string, unknown> = {}
  if (visibility !== undefined) updateData.visibility = visibility
  if (isBroadcasting !== undefined)
    updateData.isBroadcasting = isBroadcasting
  if (title !== undefined) updateData.title = title
  if (backgroundColor !== undefined) updateData.backgroundColor = backgroundColor
  if (backgroundStyle !== undefined) updateData.backgroundStyle = backgroundStyle

  await drizzleDb
    .update(whiteboard)
    .set(updateData)
    .where(eq(whiteboard.id, whiteboardRow.id))

  const [updatedWhiteboard] = await drizzleDb
    .select()
    .from(whiteboard)
    .where(eq(whiteboard.id, whiteboardRow.id))
    .limit(1)

  return NextResponse.json({ whiteboard: updatedWhiteboard! })
})
