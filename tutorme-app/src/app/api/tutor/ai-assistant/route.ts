/**
 * AI Teaching Assistant API
 * GET /api/tutor/ai-assistant - Get current/active session
 * POST /api/tutor/ai-assistant - Create new session or send message
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { chatWithFallback } from '@/lib/ai/orchestrator'

// GET - Get or create active session
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  // Get most recent active session
  let aiSession = await db.aIAssistantSession.findFirst({
    where: { tutorId, status: 'active' },
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
        take: 50,
      },
      insights: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })
  
  // Create new session if none exists
  if (!aiSession) {
    aiSession = await db.aIAssistantSession.create({
      data: {
        tutorId,
        title: 'AI Teaching Assistant',
        status: 'active',
      },
      include: {
        messages: true,
        insights: true,
      },
    })
    
    // Add welcome message
    await db.aIAssistantMessage.create({
      data: {
        sessionId: aiSession.id,
        role: 'assistant',
        content: "Hello! I'm your AI Teaching Assistant. I can help you with:\n\n• Lesson plan ideas\n• Explaining complex topics\n• Analyzing student performance\n• Generating practice questions\n• Teaching strategies\n\nWhat would you like help with today?",
      },
    })
    
    // Refresh to include welcome message
    aiSession = await db.aIAssistantSession.findUnique({
      where: { id: aiSession.id },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        insights: true,
      },
    })
  }
  
  return NextResponse.json({ session: aiSession })
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
    
    // Get or create session
    let aiSession
    if (sessionId) {
      aiSession = await db.aIAssistantSession.findFirst({
        where: { id: sessionId, tutorId },
      })
    }
    
    if (!aiSession) {
      aiSession = await db.aIAssistantSession.create({
        data: {
          tutorId,
          title: context ? `Chat about ${context}` : 'AI Teaching Assistant',
          context,
          status: 'active',
        },
      })
    }
    
    // Save user message
    await db.aIAssistantMessage.create({
      data: {
        sessionId: aiSession.id,
        role: 'user',
        content: message,
      },
    })
    
    // Get recent messages for context
    const recentMessages = await db.aIAssistantMessage.findMany({
      where: { sessionId: aiSession.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
    
    // Build conversation for AI
    const conversation = recentMessages.reverse().map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    }))
    
    // Add system prompt
    const systemPrompt = `You are an AI Teaching Assistant helping tutors improve their teaching. 
You can help with lesson planning, explaining concepts, student engagement strategies, and content creation.
Be concise, practical, and encouraging. Provide specific examples when possible.`
    
    // Get AI response
    const aiResult = await chatWithFallback([
      { role: 'system', content: systemPrompt },
      ...conversation,
    ])
    const aiResponseContent = typeof aiResult === 'string' ? aiResult : aiResult.content

    // Save AI response
    const assistantMessage = await db.aIAssistantMessage.create({
      data: {
        sessionId: aiSession.id,
        role: 'assistant',
        content: aiResponseContent,
        metadata: { model: 'fallback', timestamp: new Date().toISOString() },
      },
    })
    
    // Update session timestamp
    await db.aIAssistantSession.update({
      where: { id: aiSession.id },
      data: { updatedAt: new Date() },
    })
    
    // Generate insights based on conversation
    await generateInsights(aiSession.id, tutorId, message, aiResponseContent)

    return NextResponse.json({
      message: assistantMessage,
      session: aiSession,
    })
  } catch (error) {
    console.error('AI Assistant error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// Generate insights from conversation
async function generateInsights(
  sessionId: string, 
  tutorId: string, 
  userMessage: string, 
  aiResponse: string
) {
  // Check for patterns that suggest insights
  const patterns = [
    { 
      type: 'lesson_idea', 
      keywords: ['lesson', 'plan', 'teach', 'topic', 'subject'],
      title: 'Lesson Plan Suggestion',
    },
    { 
      type: 'student_analysis', 
      keywords: ['student', 'struggling', 'difficulty', 'performance'],
      title: 'Student Support Strategy',
    },
    { 
      type: 'content_suggestion', 
      keywords: ['material', 'content', 'resource', 'worksheet', 'quiz'],
      title: 'Content Resource Idea',
    },
    { 
      type: 'engagement_tip', 
      keywords: ['engage', 'attention', 'participation', 'interactive'],
      title: 'Engagement Tip',
    },
  ]
  
  const lowerMessage = userMessage.toLowerCase()
  
  for (const pattern of patterns) {
    if (pattern.keywords.some(k => lowerMessage.includes(k))) {
      // Check if we already have a recent insight of this type
      const existing = await db.aIAssistantInsight.findFirst({
        where: { 
          sessionId, 
          type: pattern.type,
          createdAt: { gte: new Date(Date.now() - 1000 * 60 * 60) }, // Within last hour
        },
      })
      
      if (!existing) {
        await db.aIAssistantInsight.create({
          data: {
            sessionId,
            type: pattern.type,
            title: pattern.title,
            content: aiResponse.slice(0, 500),
          },
        })
      }
      break
    }
  }
}
