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

import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aITutorEnrollment, aITutorSubscription, aIInteractionSession, mission } from '@/lib/db/schema'
import { AISecurityManager } from '@/lib/security/ai-sanitization'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { buildCompletePrompt, type PromptConfig } from '@/lib/ai/teaching-prompts/prompt-builder'
import { getGamificationSummary } from '@/lib/gamification/service'
import { updateQuestProgress } from '@/lib/gamification/daily-quests'
import { logActivity } from '@/lib/gamification/activity-log'

export const POST = withCsrf(withAuth(async (req, session) => {
  const body = await req.json()
  const {
    message,
    personality,
    missionId,
    worldId,
    teachingMode = 'socratic',
    chatHistory = [],
  } = body

  if (!message) {
    throw new ValidationError('Message is required')
  }
  const safeMessage = AISecurityManager.sanitizeAiInput(String(message))
  if (!safeMessage) {
    throw new ValidationError('Message is required or invalid after sanitization')
  }

  // Sanitize chat history user messages to prevent prompt injection
  const safeChatHistory = (Array.isArray(chatHistory) ? chatHistory : []).map(
    (msg: { role?: string; content?: string }) => ({
      role: msg?.role || 'user',
      content:
        msg?.role === 'user'
          ? AISecurityManager.sanitizeAiInput(String(msg?.content ?? ''))
          : String(msg?.content ?? ''),
    })
  )

    // Get user's gamification data
    const gamification = await getGamificationSummary(session.user.id)

    // Get user's enrollment for personality preference
    const [enrollment] = await drizzleDb
      .select()
      .from(aITutorEnrollment)
      .where(eq(aITutorEnrollment.studentId, session.user.id))
      .limit(1)

    const selectedPersonality = personality || 'friendly_mentor'

    // Get mission context if provided
    let missionContext = undefined
    if (missionId) {
      const [missionRow] = await drizzleDb
        .select()
        .from(mission)
        .where(eq(mission.id, missionId))
        .limit(1)
      if (missionRow) {
        missionContext = {
          missionId: missionRow.id,
          missionTitle: missionRow.title,
          missionObjective: missionRow.description,
          missionType: missionRow.type as any,
        }
      }
    }

    // Get subscription tier (AITutorSubscription uses userId)
    const [subscription] = await drizzleDb
      .select()
      .from(aITutorSubscription)
      .where(eq(aITutorSubscription.userId, session.user.id))
      .limit(1)
    const tier = (subscription?.tier as string) ?? 'FREE'

    // Build complete prompt with all layers
    const promptConfig: PromptConfig = {
      language: 'en',
      teachingMode,
      personality: selectedPersonality as any,
      gamification: gamification as any,
      mission: missionContext,
      tier: tier as any,
      chatHistory: safeChatHistory,
      userMessage: safeMessage,
    }

    const systemPrompt = buildCompletePrompt(promptConfig)

    // Generate AI response
    const aiResponse = await generateWithFallback(systemPrompt, {
      temperature: 0.7,
      maxTokens: 2048,
    })

    // Validate AI response before returning
    const validation = await AISecurityManager.validateAiResponse(aiResponse.content)
    if (!validation.isValid && validation.severity === 'CRITICAL') {
      return NextResponse.json(
        { success: false, error: 'AI response failed security validation' },
        { status: 500 }
      )
    }

    // Log the interaction (with anonymized student hash for AI context compliance)
    const studentHash = AISecurityManager.createStudentHash(session.user.id)
    await logActivity(session.user.id, 'AI_CONVERSATION', {
      missionId,
      personality: selectedPersonality,
      teachingMode,
      studentHash, // Anonymized identifier for AI/PII compliance
    })

    // Update daily quest progress for AI conversation
    await updateQuestProgress(session.user.id, 'speaking', 1)

    // Store interaction in database (Drizzle schema: studentId, subjectCode, messageCount, topicsCovered, summary)
    await drizzleDb.insert(aIInteractionSession).values({
      id: crypto.randomUUID(),
      studentId: session.user.id,
      subjectCode: 'chat',
      messageCount: 0,
      topicsCovered: [],
    })

  return NextResponse.json({
    success: true,
    data: {
      response: aiResponse,
      personality: selectedPersonality,
      gamification: {
        level: gamification.level,
        xp: gamification.xp,
        streakDays: gamification.streakDays,
      },
    },
  })
}, { role: 'STUDENT' }))
