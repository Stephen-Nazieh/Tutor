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
import { db } from '@/lib/db'
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
    const enrollment = await db.aITutorEnrollment.findFirst({
      where: { studentId: session.user.id },
    })

    const selectedPersonality = personality || enrollment?.avatarPersonality || 'friendly_mentor'

    // Get mission context if provided
    let missionContext = undefined
    if (missionId) {
      const mission = await db.mission.findUnique({
        where: { id: missionId },
        include: { world: true },
      })
      if (mission) {
        missionContext = {
          worldId: mission.worldId,
          worldName: mission.world.name,
          worldEmoji: mission.world.emoji,
          missionId: mission.id,
          missionTitle: mission.title,
          missionObjective: mission.objective,
          missionType: mission.missionType as any,
          vocabulary: mission.vocabulary as string[] | undefined,
          grammarFocus: mission.grammarFocus || undefined,
          difficulty: mission.difficulty,
        }
      }
    }

    // Get subscription tier
    const subscription = await db.aITutorSubscription.findUnique({
      where: { studentId: session.user.id },
    })
    const tier = subscription?.tier || 'FREE'

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

    // Store interaction in database
    await db.aIInteractionSession.create({
      data: {
        userId: session.user.id,
        missionId: missionId || null,
        avatarPersonality: selectedPersonality,
        // Metrics will be updated after analysis
        speakingDurationSeconds: 0,
        hesitationCount: 0,
        correctionCount: 0,
        confidenceDelta: 0,
      },
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
