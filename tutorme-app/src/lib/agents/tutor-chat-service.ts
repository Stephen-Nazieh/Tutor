import crypto from 'crypto'
import { eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { aITutorEnrollment, aITutorSubscription, aIInteractionSession } from '@/lib/db/schema'
import { AISecurityManager } from '@/lib/security/ai-sanitization'
import { generateWithFallback } from './orchestrator-llm'
import { buildCompletePrompt, type PromptConfig } from '@/lib/ai/teaching-prompts/prompt-builder'
import { getGamificationSummary } from '@/lib/gamification/service'
import { updateQuestProgress } from '@/lib/gamification/daily-quests'
import { logActivity, ACTIVITY_EVENTS } from '@/lib/gamification/activity-log'
import { findRelevantConcepts } from '@/lib/ai/subjects'
import { extractWhiteboardItems } from '@/lib/ai/whiteboard-extract'
import { classifyHintType, extractNextSteps } from '@/lib/agents/tutor'

export interface TutorChatInput {
  userId: string
  message: string
  subject?: string
  topic?: string | null
  teachingMode?: 'socratic' | 'direct' | 'lesson' | 'practice'
  teachingAge?: number
  voiceGender?: string
  voiceAccent?: string
  personality?: string
  missionId?: string
  worldId?: string
  chatHistory?: Array<{ role?: string; content?: string }>
}

export interface TutorChatOutput {
  response: string
  provider: string
  latencyMs: number
  gamification?: {
    level: number
    xp: number
    streakDays: number
    skills: Record<string, number>
  }
  hintType?: 'socratic' | 'direct' | 'encouragement' | 'clarification'
  relevantConcepts?: string[]
  suggestedNextSteps?: string[]
  whiteboardItems?: Array<{ type: 'text' | 'formula' | 'example' | 'tip'; content: string }>
}

function sanitizeChatHistory(chatHistory: Array<{ role?: string; content?: string }> = []) {
  return chatHistory.map(msg => ({
    role: msg?.role || 'user',
    content:
      msg?.role === 'user'
        ? AISecurityManager.sanitizeAiInput(String(msg?.content ?? ''))
        : String(msg?.content ?? ''),
  }))
}

/**
 * Canonical tutor chat entrypoint for API routes and UI features.
 * Lives under `lib/agents` so "AI agent" features share one orchestration boundary.
 */
export async function runTutorChat(input: TutorChatInput): Promise<TutorChatOutput> {
  const safeMessage = AISecurityManager.sanitizeAiInput(String(input.message))
  if (!safeMessage) {
    throw new Error('Message is required or invalid after sanitization')
  }

  const safeChatHistory = sanitizeChatHistory(input.chatHistory)

  const gamification = await getGamificationSummary(input.userId)
  await drizzleDb
    .select()
    .from(aITutorEnrollment)
    .where(eq(aITutorEnrollment.studentId, input.userId))
    .limit(1)

  const selectedPersonality = (input.personality ||
    'friendly_mentor') as PromptConfig['personality']

  const [subscription] = await drizzleDb
    .select()
    .from(aITutorSubscription)
    .where(eq(aITutorSubscription.userId, input.userId))
    .limit(1)
  const tier = (subscription?.tier as string) ?? 'FREE'

  const promptConfig: PromptConfig = {
    language: 'en',
    teachingMode: input.teachingMode || 'socratic',
    personality: selectedPersonality,
    subject: input.subject,
    topic: input.topic,
    teachingAge: input.teachingAge,
    voiceGender: input.voiceGender,
    voiceAccent: input.voiceAccent,
    gamification: gamification as PromptConfig['gamification'],
    mission: undefined,
    tier: tier as PromptConfig['tier'],
    chatHistory: safeChatHistory.map(msg => ({
      role: msg.role || 'user',
      content: msg.content || '',
    })),
    userMessage: safeMessage,
  }

  const systemPrompt = buildCompletePrompt(promptConfig)

  const aiResponse = await generateWithFallback(systemPrompt, {
    temperature: 0.7,
    maxTokens: 2048,
  })

  const validation = await AISecurityManager.validateAiResponse(aiResponse.content)
  if (!validation.isValid && validation.severity === 'CRITICAL') {
    throw new Error('AI response failed security validation')
  }

  const hintType = classifyHintType(aiResponse.content)
  const relevantConcepts = input.subject
    ? findRelevantConcepts(input.subject, safeMessage)
    : undefined
  const suggestedNextSteps = extractNextSteps(aiResponse.content)
  const whiteboardItems = extractWhiteboardItems(aiResponse.content)

  const studentHash = AISecurityManager.createStudentHash(input.userId)
  await logActivity(input.userId, ACTIVITY_EVENTS.AI_CONVERSATION, {
    missionId: input.missionId,
    personality: selectedPersonality,
    teachingMode: input.teachingMode || 'socratic',
    studentHash,
  })

  await updateQuestProgress(input.userId, 'speaking', 1)

  await drizzleDb.insert(aIInteractionSession).values({
    interactionId: crypto.randomUUID(),
    studentId: input.userId,
    subjectCode: input.subject || 'chat',
    messageCount: 0,
    topicsCovered: [],
  })

  return {
    response: aiResponse.content,
    provider: aiResponse.provider,
    latencyMs: aiResponse.latencyMs,
    gamification: {
      level: gamification.level,
      xp: gamification.xp,
      streakDays: gamification.streakDays,
      skills: gamification.skills ?? {},
    },
    hintType,
    relevantConcepts,
    suggestedNextSteps,
    whiteboardItems: whiteboardItems.length > 0 ? whiteboardItems : undefined,
  }
}
