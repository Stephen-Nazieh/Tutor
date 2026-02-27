/**
 * AI Teaching Assistant API
 * GET /api/tutor/ai-assistant - Get current/active session
 * POST /api/tutor/ai-assistant - Create new session or send message
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aIAssistantSession, aIAssistantMessage, aIAssistantInsight } from '@/lib/db/schema'
import { eq, and, desc, asc, gte } from 'drizzle-orm'
import { chatWithFallback } from '@/lib/ai/orchestrator'
import { AISecurityManager } from '@/lib/security/ai-sanitization'
import { randomUUID } from 'crypto'

// GET - Get or create active session
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id

  const activeSessions = await drizzleDb
    .select()
    .from(aIAssistantSession)
    .where(and(eq(aIAssistantSession.tutorId, tutorId), eq(aIAssistantSession.status, 'active')))
    .orderBy(desc(aIAssistantSession.updatedAt))
    .limit(1)

  let aiSessionRow = activeSessions[0] ?? null

  if (!aiSessionRow) {
    const id = randomUUID()
    await drizzleDb.insert(aIAssistantSession).values({
      id,
      tutorId,
      title: 'AI Teaching Assistant',
      status: 'active',
    })
    await drizzleDb.insert(aIAssistantMessage).values({
      id: randomUUID(),
      sessionId: id,
      role: 'assistant',
      content:
        "Hello! I'm your AI Teaching Assistant. I can help you with:\n\n• Lesson plan ideas\n• Explaining complex topics\n• Analyzing student performance\n• Generating practice questions\n• Teaching strategies\n\nWhat would you like help with today?",
    })
    const [created] = await drizzleDb
      .select()
      .from(aIAssistantSession)
      .where(eq(aIAssistantSession.id, id))
      .limit(1)
    aiSessionRow = created!
  }

  const sessionId = aiSessionRow.id
  const messages = await drizzleDb
    .select()
    .from(aIAssistantMessage)
    .where(eq(aIAssistantMessage.sessionId, sessionId))
    .orderBy(asc(aIAssistantMessage.createdAt))
    .limit(50)
  const insights = await drizzleDb
    .select()
    .from(aIAssistantInsight)
    .where(eq(aIAssistantInsight.sessionId, sessionId))
    .orderBy(desc(aIAssistantInsight.createdAt))
    .limit(10)

  const sessionPayload = {
    ...aiSessionRow,
    messages,
    insights,
  }

  return NextResponse.json({ session: sessionPayload })
}, { role: 'TUTOR' })

// POST - Send message and get AI response
export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id

  try {
    const body = await req.json()
    const { message, sessionId, context } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const safeMessage = AISecurityManager.sanitizeAiInput(String(message))
    if (!safeMessage) {
      return NextResponse.json(
        { error: 'Invalid or empty message after sanitization' },
        { status: 400 }
      )
    }

    let aiSessionRow: (typeof aIAssistantSession.$inferSelect) | null = null
    if (sessionId) {
      const rows = await drizzleDb
        .select()
        .from(aIAssistantSession)
        .where(and(eq(aIAssistantSession.id, sessionId), eq(aIAssistantSession.tutorId, tutorId)))
        .limit(1)
      aiSessionRow = rows[0] ?? null
    }

    if (!aiSessionRow) {
      const id = randomUUID()
      await drizzleDb.insert(aIAssistantSession).values({
        id,
        tutorId,
        title: context ? `Chat about ${context}` : 'AI Teaching Assistant',
        context: context ?? null,
        status: 'active',
      })
      const [created] = await drizzleDb
        .select()
        .from(aIAssistantSession)
        .where(eq(aIAssistantSession.id, id))
        .limit(1)
      aiSessionRow = created!
    }

    await drizzleDb.insert(aIAssistantMessage).values({
      id: randomUUID(),
      sessionId: aiSessionRow.id,
      role: 'user',
      content: safeMessage,
    })

    const recentRows = await drizzleDb
      .select()
      .from(aIAssistantMessage)
      .where(eq(aIAssistantMessage.sessionId, aiSessionRow.id))
      .orderBy(desc(aIAssistantMessage.createdAt))
      .limit(10)
    const conversation = recentRows.reverse().map((m) => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.role === 'user' ? AISecurityManager.sanitizeAiInput(m.content || '') : (m.content || ''),
    }))

    const systemPrompt = `You are an AI Teaching Assistant helping tutors improve their teaching. 
You can help with lesson planning, explaining concepts, student engagement strategies, and content creation.
Be concise, practical, and encouraging. Provide specific examples when possible.`

    const aiResult = await chatWithFallback([
      { role: 'system', content: systemPrompt },
      ...conversation,
    ])
    const aiResponseContent = typeof aiResult === 'string' ? aiResult : aiResult.content

    const assistantMessageRow = await drizzleDb
      .insert(aIAssistantMessage)
      .values({
        id: randomUUID(),
        sessionId: aiSessionRow.id,
        role: 'assistant',
        content: aiResponseContent,
        metadata: { model: 'fallback', timestamp: new Date().toISOString() },
      })
      .returning()
      .then((r) => r[0])

    await drizzleDb
      .update(aIAssistantSession)
      .set({ updatedAt: new Date() })
      .where(eq(aIAssistantSession.id, aiSessionRow.id))

    const validation = await AISecurityManager.validateAiResponse(aiResponseContent)
    if (!validation.isValid && validation.severity === 'CRITICAL') {
      return NextResponse.json(
        { error: 'AI response failed security validation' },
        { status: 500 }
      )
    }

    await generateInsights(aiSessionRow.id, tutorId, safeMessage, aiResponseContent)

    return NextResponse.json({
      message: assistantMessageRow,
      session: aiSessionRow,
    })
  } catch (error) {
    console.error('AI Assistant error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

async function generateInsights(
  sessionId: string,
  tutorId: string,
  userMessage: string,
  aiResponse: string
) {
  const patterns = [
    { type: 'lesson_idea', keywords: ['lesson', 'plan', 'teach', 'topic', 'subject'], title: 'Lesson Plan Suggestion' },
    { type: 'student_analysis', keywords: ['student', 'struggling', 'difficulty', 'performance'], title: 'Student Support Strategy' },
    { type: 'content_suggestion', keywords: ['material', 'content', 'resource', 'worksheet', 'quiz'], title: 'Content Resource Idea' },
    { type: 'engagement_tip', keywords: ['engage', 'attention', 'participation', 'interactive'], title: 'Engagement Tip' },
  ]

  const lowerMessage = userMessage.toLowerCase()

  for (const pattern of patterns) {
    if (pattern.keywords.some((k) => lowerMessage.includes(k))) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      const existing = await drizzleDb
        .select()
        .from(aIAssistantInsight)
        .where(
          and(
            eq(aIAssistantInsight.sessionId, sessionId),
            eq(aIAssistantInsight.type, pattern.type),
            gte(aIAssistantInsight.createdAt, oneHourAgo)
          )
        )
        .limit(1)
      const hasRecent = existing.length > 0
      if (!hasRecent) {
        await drizzleDb.insert(aIAssistantInsight).values({
          id: randomUUID(),
          sessionId,
          type: pattern.type,
          title: pattern.title,
          content: aiResponse.slice(0, 500),
          applied: false,
        })
      }
      break
    }
  }
}
