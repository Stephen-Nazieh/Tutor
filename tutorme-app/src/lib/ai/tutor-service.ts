/**
 * AI Tutor Service
 * Subject-aware tutoring with Socratic methodology
 */

import { generateWithFallback } from './orchestrator'
import {
  buildSystemPrompt,
  getSubjectContext,
  findRelevantConcepts,
  getCommonMistakeHelp
} from './subjects'
import { MemoryService } from './memory-service'
import { StudentContext } from './types/context'

export interface TutorMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface TutorContext {
  studentId?: string // Link to memory service
  subject: string
  currentTopic?: string
  conversationHistory: TutorMessage[]
  knowledgeGraph?: any
  recentQuizAttempts?: any[]
  // NEW: Age-based teaching and voice preferences
  teachingAge?: number
  voiceGender?: string
  voiceAccent?: string
}

export interface TutorResponse {
  message: string
  hintType: 'socratic' | 'direct' | 'encouragement' | 'clarification'
  relevantConcepts?: string[]
  suggestedNextSteps?: string[]
}

/**
 * Generate a Socratic tutor response
 */
export async function generateTutorResponse(
  studentMessage: string,
  context: TutorContext
): Promise<TutorResponse> {
  const subjectContext = getSubjectContext(context.subject)

  // Build system prompt with subject context and preferences
  const systemPrompt = buildSystemPrompt(context.subject, {
    teachingAge: context.teachingAge || 15,
    voiceGender: context.voiceGender || 'female',
    voiceAccent: context.voiceAccent || 'us'
  })

  // Fetch unified student context
  let studentContext: StudentContext | null = null
  if (context.studentId) {
    try {
      studentContext = await MemoryService.getStudentContext(context.studentId)
    } catch (error) {
      console.error('Failed to fetch student memory:', error)
    }
  }

  // Find relevant concepts
  const relevantConcepts = findRelevantConcepts(context.subject, studentMessage)

  // Check for common mistakes
  const mistakeHelp = getCommonMistakeHelp(context.subject, studentMessage)

  // Build conversation context
  let fullPrompt = `${systemPrompt}\n\n`

  // Inject Student Context (Shared Brain)
  if (studentContext) {
    fullPrompt += `## Student Context (SHARED BRAIN)\n`
    fullPrompt += `Name: ${studentContext.profile.name} (${studentContext.profile.level})\n`
    fullPrompt += `Learning Style: ${studentContext.profile.learningStyle}\n`
    fullPrompt += `Current Mood: ${studentContext.state.currentMood}\n`

    if (studentContext.state.recentStruggles.length > 0) {
      fullPrompt += `Recent Struggles:\n`
      studentContext.state.recentStruggles.forEach(s => {
        fullPrompt += `- ${s.topic} (${s.errorType})\n`
      })
      fullPrompt += `INSTRUCTION: Be extra patient with these topics. Acknowledge improvement if they do well.\n`
    }

    if (studentContext.signals.length > 0) {
      const recentSignals = studentContext.signals.slice(-3)
      fullPrompt += `Recent Signals (from other agents):\n`
      recentSignals.forEach(s => {
        fullPrompt += `- [${s.source}]: ${s.content}\n`
      })
    }
    fullPrompt += `\n`
  }

  // Add relevant concepts if found
  if (relevantConcepts.length > 0) {
    fullPrompt += `## Relevant Concepts\n`
    relevantConcepts.forEach(conceptId => {
      const concept = subjectContext.concepts.find(c => c.id === conceptId)
      if (concept) {
        fullPrompt += `- ${concept.name}: ${concept.description}\n`
      }
    })
    fullPrompt += `\n`
  }

  // Add common mistake guidance if detected
  if (mistakeHelp) {
    fullPrompt += `## Mistake Prevention\n${mistakeHelp}\n\n`
  }

  // Add conversation history
  fullPrompt += `## Conversation History\n`
  context.conversationHistory.slice(-5).forEach(msg => {
    fullPrompt += `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}\n`
  })

  // Add current message
  fullPrompt += `\nStudent: ${studentMessage}\n`
  fullPrompt += `\nTutor (respond as a Socratic tutor):`

  // Generate response
  const result = await generateWithFallback(fullPrompt, {
    temperature: 0.7,
    maxTokens: 300
  })

  // Determine hint type based on content
  const hintType = classifyHintType(result.content)

  // Extract suggested next steps if any
  const suggestedNextSteps = extractNextSteps(result.content)

  return {
    message: result.content.trim(),
    hintType,
    relevantConcepts,
    suggestedNextSteps
  }
}

/**
 * Generate a hint for a specific concept
 */
export async function generateConceptHint(
  conceptId: string,
  subject: string,
  difficulty: 'gentle' | 'medium' | 'strong' = 'medium'
): Promise<string> {
  const subjectContext = getSubjectContext(subject)
  const concept = subjectContext.concepts.find(c => c.id === conceptId)

  if (!concept) {
    return "Let's think about this step by step. What do you know so far?"
  }

  const difficultyPrompts = {
    gentle: 'Give a very gentle nudge in the right direction.',
    medium: 'Provide a helpful hint that guides thinking.',
    strong: 'Give a more specific hint while still requiring student work.'
  }

  const prompt = `
    You are a ${subjectContext.name} tutor helping a student with: ${concept.name}
    
    Concept: ${concept.description}
    Common misconceptions: ${concept.commonMisconceptions.join(', ')}
    
    ${difficultyPrompts[difficulty]}
    
    Provide a Socratic hint (question or guidance, NOT the answer):
  `

  const result = await generateWithFallback(prompt, {
    temperature: 0.6,
    maxTokens: 150
  })

  return result.content.trim()
}

/**
 * Analyze student work for errors
 */
export async function analyzeStudentWork(
  problem: string,
  studentWork: string,
  subject: string
): Promise<{
  hasError: boolean
  errorType?: string
  feedback: string
  correctionGuidance: string
}> {
  const subjectContext = getSubjectContext(subject)

  const prompt = `
    Subject: ${subjectContext.name}
    
    Problem: ${problem}
    Student's work: ${studentWork}
    
    Common mistakes in ${subjectContext.name}:
    ${subjectContext.commonMistakes.map(m => `- ${m.pattern}: ${m.description}`).join('\n')}
    
    Analyze the student's work. If there are errors:
    1. Identify the error type
    2. Provide gentle feedback (don't say "you're wrong")
    3. Give Socratic guidance to help them discover the error
    
    If the work is correct, provide encouraging feedback and suggest next steps.
    
    Respond in this format:
    HAS_ERROR: true/false
    ERROR_TYPE: [type or "none"]
    FEEDBACK: [encouraging response]
    GUIDANCE: [Socratic question to guide to correction]
  `

  const result = await generateWithFallback(prompt, {
    temperature: 0.5,
    maxTokens: 250
  })

  const lines = result.content.split('\n')
  const hasError = lines.find(l => l.includes('HAS_ERROR:'))?.includes('true') || false
  const errorType = lines.find(l => l.includes('ERROR_TYPE:'))?.split(':')[1]?.trim()
  const feedback = lines.find(l => l.includes('FEEDBACK:'))?.split(':').slice(1).join(':').trim() || ''
  const correctionGuidance = lines.find(l => l.includes('GUIDANCE:'))?.split(':').slice(1).join(':').trim() || ''

  return {
    hasError,
    errorType,
    feedback,
    correctionGuidance
  }
}

/**
 * Generate encouragement message
 */
export async function generateEncouragement(
  context: string,
  subject: string
): Promise<string> {
  const encouragements = [
    "You're making great progress! Keep thinking it through.",
    "That's a good insight. Let's build on that.",
    "I can see you're really thinking about this - that's exactly what good learners do!",
    "You're on the right track. What would happen if you tried...",
    "That's an interesting approach. Let's see where it leads.",
    "You're developing strong problem-solving skills!",
    "Don't worry if it takes time - deep understanding comes from persistence.",
    "You're asking the right questions. Keep exploring!"
  ]

  // Could use AI to generate contextual encouragement
  // For now, return random encouragement
  return encouragements[Math.floor(Math.random() * encouragements.length)]
}

// Helper functions

function classifyHintType(message: string): TutorResponse['hintType'] {
  const lower = message.toLowerCase()

  if (lower.includes('?') && (lower.includes('what') || lower.includes('how') || lower.includes('why'))) {
    return 'socratic'
  }
  if (lower.includes('try') || lower.includes('consider') || lower.includes('think about')) {
    return 'socratic'
  }
  if (lower.includes('well done') || lower.includes('great') || lower.includes('excellent')) {
    return 'encouragement'
  }
  if (lower.includes('let me explain') || lower.includes('here\'s how')) {
    return 'direct'
  }

  return 'clarification'
}

function extractNextSteps(message: string): string[] | undefined {
  // Look for phrases suggesting next steps
  const patterns = [
    /try (to |)([^.]+)/i,
    /next, ([^.]+)/i,
    /you could ([^.]+)/i,
    /consider ([^.]+)/i
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
