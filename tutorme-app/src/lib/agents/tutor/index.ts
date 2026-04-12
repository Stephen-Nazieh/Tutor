/**
 * ============================================================================
 * TUTOR AGENT - Main Implementation
 * ============================================================================
 *
 * UI LOCATIONS:
 * - /student/ai-tutor (ai-tutor-chat.tsx) - Main chat interface
 * - /student/learn/[contentId] - "Ask AI" button in lessons
 * - /student/quizzes/[id] - "Hint" button during quizzes
 *
 * This agent handles all student tutoring interactions using Socratic method.
 */

import { generateWithFallback, chatWithFallback } from '../orchestrator-llm'
import {
  Student,
  Conversation,
  Message,
  Course,
  ProgressData,
  getStudent,
  getConversation,
  getCourse,
  getProgress,
  saveMessage,
} from '../shared-data'
import { buildSystemPrompt, buildHintPrompt, buildExplanationPrompt } from './prompts/system-prompt'
import { findRelevantConcepts } from '@/lib/ai/subjects'

export interface TutorRequest {
  studentId: string
  subject: string
  message: string
  conversationId?: string
}

export interface TutorResponse {
  content: string
  provider: string
  latencyMs: number
  intent?: string
  hintType?: 'socratic' | 'direct' | 'encouragement' | 'clarification'
  relevantConcepts?: string[]
  suggestedNextSteps?: string[]
}

/**
 * Main tutoring function - handles student messages
 *
 * UI FLOW:
 * 1. Student types in /student/ai-tutor chat
 * 2. Frontend calls POST /api/ai/chat
 * 3. API route calls this function
 * 4. Response streamed back to UI
 */
export async function tutorChat(request: TutorRequest): Promise<TutorResponse> {
  const startTime = Date.now()

  // FETCH DATA (READ access only)
  const [student, conversation, course, progress] = await Promise.all([
    getStudent(request.studentId),
    getConversation(request.studentId, request.subject, request.conversationId),
    getCourse(request.subject, 'default'),
    getProgress(request.studentId, 'current'),
  ])

  if (!student) {
    throw new Error('Student not found')
  }

  // Build context for the prompt
  const context = {
    student,
    subject: request.subject,
    course: course || undefined,
    progress: progress || undefined,
    conversationHistory:
      conversation?.messages
        .slice(-5)
        .map(m => `${m.role}: ${m.content}`)
        .join('\n') || 'No previous conversation',
  }

  // Build messages array with system prompt
  const messages = [
    { role: 'system' as const, content: buildSystemPrompt(context) },
    ...(conversation?.messages.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })) || []),
    { role: 'user' as const, content: request.message },
  ]

  if (conversation) {
    await saveMessage(conversation.id, {
      id: crypto.randomUUID(),
      role: 'user',
      content: request.message,
      timestamp: new Date(),
      metadata: {
        intent: analyzeIntent(request.message),
      },
    })
  }

  // Call AI (uses Kimi as primary)
  const result = await chatWithFallback(messages, {
    temperature: 0.7,
    maxTokens: 2048,
  })

  const hintType = classifyHintType(result.content)
  const relevantConcepts = findRelevantConcepts(request.subject, request.message)
  const suggestedNextSteps = extractNextSteps(result.content)

  // SAVE TO DATABASE (WRITE access)
  if (conversation) {
    await saveMessage(conversation.id, {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: result.content,
      timestamp: new Date(),
      metadata: {
        intent: 'tutoring',
        sentiment: 'positive',
      },
    })
  }

  return {
    content: result.content,
    provider: result.provider,
    latencyMs: Date.now() - startTime,
    hintType,
    relevantConcepts,
    suggestedNextSteps,
  }
}

/**
 * Generate a hint for a question
 *
 * UI: "Hint" button in quiz interface (/student/quizzes/[id])
 * TRIGGER: Student clicks hint during quiz
 */
export async function generateHint(question: string, studentAttempt?: string): Promise<string> {
  const prompt = buildHintPrompt(question, studentAttempt)

  const result = await generateWithFallback(prompt, {
    temperature: 0.5, // Lower for more focused hints
    maxTokens: 150,
  })

  return result.content
}

/**
 * Explain a concept
 *
 * UI: "Explain" button in lesson content (/student/learn/[contentId])
 * TRIGGER: Student clicks explain on a difficult concept
 */
export async function explainConcept(concept: string, studentId: string): Promise<string> {
  const student = await getStudent(studentId)
  if (!student) throw new Error('Student not found')

  const prompt = buildExplanationPrompt(concept, student.currentLevel)

  const result = await generateWithFallback(prompt, {
    temperature: 0.6,
    maxTokens: 500,
  })

  return result.content
}

/**
 * Analyze student message intent
 * Used to categorize messages for analytics
 */
export function analyzeIntent(message: string): string {
  const lower = message.toLowerCase()

  if (lower.includes('hint') || lower.includes('help') || lower.includes('stuck')) {
    return 'asking_for_help'
  }
  if (lower.includes('why') || lower.includes('how come')) {
    return 'seeking_explanation'
  }
  if (lower.includes('answer') || lower.includes('solution')) {
    return 'asking_for_answer'
  }
  if (lower.includes('correct') || lower.includes('right') || lower.includes('wrong')) {
    return 'checking_understanding'
  }
  return 'general_chat'
}

export function classifyHintType(message: string): TutorResponse['hintType'] {
  const lower = message.toLowerCase()

  if (
    lower.includes('?') &&
    (lower.includes('what') || lower.includes('how') || lower.includes('why'))
  ) {
    return 'socratic'
  }
  if (lower.includes('try') || lower.includes('consider') || lower.includes('think about')) {
    return 'socratic'
  }
  if (lower.includes('well done') || lower.includes('great') || lower.includes('excellent')) {
    return 'encouragement'
  }
  if (lower.includes('let me explain') || lower.includes("here's how")) {
    return 'direct'
  }

  return 'clarification'
}

export function extractNextSteps(message: string): string[] | undefined {
  const patterns = [
    /try (to |)([^.]+)/i,
    /next, ([^.]+)/i,
    /you could ([^.]+)/i,
    /consider ([^.]+)/i,
  ]

  const steps: string[] = []
  patterns.forEach(pattern => {
    const match = message.match(pattern)
    if (match) {
      steps.push(match[0])
    }
  })

  return steps.length > 0 ? steps : undefined
}
