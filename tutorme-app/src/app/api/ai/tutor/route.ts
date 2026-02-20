/**
 * Modular AI Tutor API
 * Supports teaching modes and subject-specific prompts
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateModularResponse, TeachingMode } from '@/lib/ai/modular-tutor'
import { getTeachingModes } from '@/lib/ai/teaching-prompts'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// In-memory conversation storage (use Redis in production)
const conversationStore = new Map<string, ChatMessage[]>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      message, 
      subject,
      topic = null,
      mode = 'socratic',
      teachingAge = 15,
      voiceGender = 'female',
      voiceAccent = 'US',
      conversationId 
    } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!subject) {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      )
    }

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
