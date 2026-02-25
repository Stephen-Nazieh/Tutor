/**
 * Modular AI Tutor API
 * Supports teaching modes and subject-specific prompts
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateModularResponse, TeachingMode } from '@/lib/ai/modular-tutor'
import { getTeachingModes } from '@/lib/ai/teaching-prompts'
import { withRateLimitPreset } from '@/lib/api/middleware'
import { z } from 'zod'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// In-memory conversation storage (use Redis in production)
const conversationStore = new Map<string, ChatMessage[]>()
const MAX_CONVERSATIONS = 500

const TutorRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  subject: z.string().min(1).max(80),
  topic: z.string().max(120).nullable().optional(),
  mode: z.enum(['socratic', 'direct', 'hint']).default('socratic'),
  teachingAge: z.number().int().min(5).max(100).default(15),
  voiceGender: z.enum(['female', 'male']).default('female'),
  voiceAccent: z.string().max(32).default('US'),
  conversationId: z.string().max(128).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(request, 'aiGenerate')
    if (rateLimitResponse) return rateLimitResponse

    const body = await request.json().catch(() => null)
    const parsed = TutorRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    const {
      message,
      subject,
      topic = null,
      mode,
      teachingAge,
      voiceGender,
      voiceAccent,
      conversationId,
    } = parsed.data

    // Get or create conversation
    const convoKey = conversationId || `tutor-${subject}-${Date.now()}`
    const conversationHistory = conversationStore.get(convoKey) || []
    
    // Generate response using modular system
    const response = await generateModularResponse(message, {
      subject,
      topic,
      mode: mode as TeachingMode,
      teachingAge,
      voiceGender,
      voiceAccent,
      conversationHistory
    })
    
    // Update conversation history
    conversationHistory.push({ role: 'user', content: message })
    conversationHistory.push({ role: 'assistant', content: response.message })
    
    // Keep only last 10 messages
    if (conversationHistory.length > 10) {
      conversationHistory.splice(0, conversationHistory.length - 10)
    }
    
    conversationStore.set(convoKey, conversationHistory)
    if (conversationStore.size > MAX_CONVERSATIONS) {
      const oldestKey = conversationStore.keys().next().value
      if (oldestKey) conversationStore.delete(oldestKey)
    }

    return NextResponse.json({
      success: true,
      response: response.message,
      mode: response.mode,
      isSocratic: response.isSocratic,
      whiteboardItems: response.whiteboardItems,
      conversationId: convoKey
    })
  } catch (error) {
    console.error('AI tutor error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get AI response',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return available teaching modes
  const modes = getTeachingModes()
  
  return NextResponse.json({
    modes,
    defaultMode: 'socratic'
  })
}
