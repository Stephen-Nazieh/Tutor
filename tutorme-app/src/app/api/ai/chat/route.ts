/**
 * AI Chat API with Subject Context
 * Chat with the AI tutor using Socratic method and subject-specific knowledge
 * 
 * POST /api/ai/chat
 * Body: { message: string, subject?: string, context?: {...} }
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateTutorResponse, TutorMessage } from '@/lib/ai/tutor-service'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { withRateLimitPreset } from '@/lib/api/middleware'
import { z } from 'zod'
import { AISecurityManager } from '@/lib/security/ai-sanitization'

// In-memory conversation storage (use Redis in production)
const conversationStore = new Map<string, TutorMessage[]>()
const MAX_CONVERSATIONS = 500

const AIChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  subject: z.string().max(80).default('general'),
  context: z.record(z.string(), z.unknown()).default({}),
  conversationId: z.string().max(128).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(request, 'aiGenerate')
    if (rateLimitResponse) return rateLimitResponse

    const session = await getServerSession(authOptions)
    const body = await request.json().catch(() => null)
    const parsed = AIChatRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    const { message, subject, context, conversationId } = parsed.data

    const safeMessage = AISecurityManager.sanitizeAiInput(message)
    if (!safeMessage) {
      return NextResponse.json({ error: 'Invalid or empty message after sanitization' }, { status: 400 })
    }

    // Get or initialize conversation history
    const userId = session?.user?.id || 'anonymous'
    const convoKey = conversationId || `${userId}-${subject}`
    
    let conversationHistory = conversationStore.get(convoKey) || []
    
    // Add user message to history (sanitized)
    conversationHistory.push({
      role: 'user',
      content: safeMessage
    })
    
    // Keep only last 10 messages for context
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10)
    }

    // Generate subject-aware response
    const ctx = context as Record<string, unknown>
    const response = await generateTutorResponse(safeMessage, {
      subject,
      currentTopic: (ctx.videoTitle as string) || (ctx.topic as string),
      conversationHistory,
      knowledgeGraph: ctx.knowledgeGraph,
      recentQuizAttempts: ctx.recentQuizAttempts as any[]
    })

    // Add assistant response to history
    conversationHistory.push({
      role: 'assistant',
      content: response.message
    })
    
    // Store updated history
    conversationStore.set(convoKey, conversationHistory)
    if (conversationStore.size > MAX_CONVERSATIONS) {
      const oldestKey = conversationStore.keys().next().value
      if (oldestKey) conversationStore.delete(oldestKey)
    }

    // Validate AI response before returning
    const validation = await AISecurityManager.validateAiResponse(response.message)
    if (!validation.isValid && validation.severity === 'CRITICAL') {
      return NextResponse.json(
        { error: 'AI response failed security validation' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      response: response.message,
      hintType: response.hintType,
      relevantConcepts: response.relevantConcepts,
      suggestedNextSteps: response.suggestedNextSteps,
      conversationId: convoKey
    })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}

// Get available subjects
export async function GET() {
  const { getAvailableSubjects } = await import('@/lib/ai/subjects')
  
  return NextResponse.json({
    subjects: getAvailableSubjects()
  })
}
