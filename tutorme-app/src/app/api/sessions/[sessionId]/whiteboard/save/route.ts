/**
 * Save whiteboard strokes/pages
 * 
 * POST /api/sessions/[sessionId]/whiteboard/save
 * Save the current state of a whiteboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withRateLimit } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const MAX_ITEMS_PER_LAYER = 5000
const MAX_PAYLOAD_BYTES = 512 * 1024

const SaveWhiteboardSchema = z.object({
  pageId: z.string().min(1).max(128),
  strokes: z.array(z.unknown()).max(MAX_ITEMS_PER_LAYER).optional(),
  shapes: z.array(z.unknown()).max(MAX_ITEMS_PER_LAYER).optional(),
  texts: z.array(z.unknown()).max(MAX_ITEMS_PER_LAYER).optional(),
  viewState: z.record(z.string(), z.unknown()).optional(),
})

export const POST = withAuth(async (req: NextRequest, session, context) => {
  const params = await context.params
  const { sessionId } = params
  const userId = session.user.id

  const { response: rateLimitResponse } = await withRateLimit(req, 30)
  if (rateLimitResponse) return rateLimitResponse

  const body = await req.json().catch(() => null)
  const parsed = SaveWhiteboardSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid whiteboard payload' }, { status: 400 })
  }
  const { pageId, strokes, shapes, texts, viewState } = parsed.data

  const payloadSize = Buffer.byteLength(JSON.stringify(parsed.data), 'utf8')
  if (payloadSize > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }
  
  // Find the whiteboard page
  const page = await db.whiteboardPage.findFirst({
    where: {
      id: pageId,
      whiteboard: {
        sessionId,
        tutorId: userId
      }
    }
  })
  
  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }
  
  // Update page
  const updateData: Record<string, unknown> = {}
  if (strokes !== undefined) updateData.strokes = strokes
  if (shapes !== undefined) updateData.shapes = shapes
  if (texts !== undefined) updateData.texts = texts
  if (viewState !== undefined) updateData.viewState = viewState
  
  const updatedPage = await db.whiteboardPage.update({
    where: { id: pageId },
    data: updateData
  })
  
  // Update whiteboard updatedAt
  await db.whiteboard.updateMany({
    where: {
      sessionId,
      tutorId: userId
    },
    data: {
      updatedAt: new Date()
    }
  })
  
  return NextResponse.json({ success: true, page: updatedPage })
})
