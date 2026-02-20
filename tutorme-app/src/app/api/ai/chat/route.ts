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

// In-memory conversation storage (use Redis in production)
const conversationStore = new Map<string, TutorMessage[]>()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { 
      message, 
      subject = 'general', 
      context = {},
      conversationId 
    } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get or initialize conversation history
    const userId = session?.user?.id || 'anonymous'
    const convoKey = conversationId || `${userId}-${subject}`
    
    let conversationHistory = conversationStore.get(convoKey) || []
    
    // Add user message to history
    conversationHistory.push({
      role: 'user',
      content: message
    })
    
    // Keep only last 10 messages for context
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10)
    }

    // Generate subject-aware response
    const response = await generateTutorResponse(message, {
      subject,
      currentTopic: context.videoTitle || context.topic,
      conversationHistory,
      knowledgeGraph: context.knowledgeGraph,
      recentQuizAttempts: context.recentQuizAttempts
    })

    // Add assistant response to history
    conversationHistory.push({
      role: 'assistant',
      content: response.message
    })
    
    // Store updated history
    conversationStore.set(convoKey, conversationHistory)

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
