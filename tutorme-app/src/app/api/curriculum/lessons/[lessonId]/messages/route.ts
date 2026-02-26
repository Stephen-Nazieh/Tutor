/**
 * Lesson Messages API
 * GET: Get message history for a lesson session
 * POST: Save a message to the session history
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'

export const GET = withAuth(async (req, session, routeContext: any) => {
  const params = await routeContext?.params;
  const { lessonId } = await params

  // Get session
  const lessonSession = await db.lessonSession.findUnique({
    where: {
      studentId_lessonId: {
        studentId: session.user.id,
        lessonId
      }
    }
  })

  if (!lessonSession) {
    return NextResponse.json({ messages: [] })
  }

  // Get messages from context
  const messages = (lessonSession.sessionContext as any)?.messages || []

  return NextResponse.json({ messages })
}, { role: 'STUDENT' })

export const POST = withCsrf(withAuth(async (req, session, routeContext: any) => {
  const params = await routeContext?.params;
  const { lessonId } = await params
  const body = await req.json()
  const { role, content, section, whiteboardItems } = body
  const safeContent = typeof content === 'string' ? sanitizeHtmlWithMax(content, 10000) : ''

  // Get session
  const lessonSession = await db.lessonSession.findUnique({
    where: {
      studentId_lessonId: {
        studentId: session.user.id,
        lessonId
      }
    }
  })

  if (!lessonSession) {
    throw new NotFoundError('Session not found')
  }

  // Add message to context
  const context = (lessonSession.sessionContext as any) || {}
  const messages = context.messages || []

  messages.push({
    id: Date.now().toString(),
    role,
    content: safeContent,
    section,
    whiteboardItems,
    timestamp: new Date().toISOString()
  })

  // Keep only last 50 messages
  if (messages.length > 50) {
    messages.splice(0, messages.length - 50)
  }

  context.messages = messages

  // Update session
  await db.lessonSession.update({
    where: { id: lessonSession.id },
    data: {
      sessionContext: context
    }
  })

  return NextResponse.json({ success: true })
}, { role: 'STUDENT' }))
