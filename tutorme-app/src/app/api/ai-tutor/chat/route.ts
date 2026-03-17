/**
 * Enhanced AI Tutor Chat API
 * 
 * POST /api/ai-tutor/chat - Send message with gamification context
 * Uses layered prompt architecture:
 * 1. Core Identity
 * 2. Teaching Mode
 * 3. Personality
 * 4. Gamification Context
 * 5. Mission Context
 * 6. Tier Controls
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { AISecurityManager } from '@/lib/security/ai-sanitization'
import { runTutorChat } from '@/lib/agents/tutor-chat-service'

export const POST = withCsrf(withAuth(async (req, session) => {
  const body = await req.json()
  const {
    message,
    subject,
    topic,
    personality,
    missionId,
    worldId,
    teachingMode = 'socratic',
    teachingAge,
    voiceGender,
    voiceAccent,
    chatHistory = [],
  } = body

  if (!message) {
    throw new ValidationError('Message is required')
  }
  const safeMessage = AISecurityManager.sanitizeAiInput(String(message))
  if (!safeMessage) {
    throw new ValidationError('Message is required or invalid after sanitization')
  }

  const aiResponse = await runTutorChat({
    userId: session.user.id,
    message: safeMessage,
    subject,
    topic,
    teachingMode,
    teachingAge,
    voiceGender,
    voiceAccent,
    personality,
    missionId,
    worldId,
    chatHistory: Array.isArray(chatHistory) ? chatHistory : [],
  })

  return NextResponse.json({
    success: true,
    data: {
      response: aiResponse.response,
      provider: aiResponse.provider,
      latencyMs: aiResponse.latencyMs,
      hintType: aiResponse.hintType,
      relevantConcepts: aiResponse.relevantConcepts,
      suggestedNextSteps: aiResponse.suggestedNextSteps,
      whiteboardItems: aiResponse.whiteboardItems,
      personality,
      gamification: aiResponse.gamification
    },
  })
}, { role: 'STUDENT' }))
