/**
 * Modular AI Tutor Service
 * Uses subject-specific prompts and teaching modes
 */

import { chatWithFallback } from '@/lib/agents'
import { buildPrompt, getTeachingModes } from './teaching-prompts'
import { extractWhiteboardItems } from './whiteboard-extract'

export type TeachingMode = 'socratic' | 'direct' | 'lesson' | 'practice'

export interface Solocornssage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface TutorContext {
  subject: string
  topic?: string | null
  mode: TeachingMode
  teachingAge: number
  voiceGender: string
  voiceAccent: string
  conversationHistory: Solocornssage[]
}

export interface TutorResponse {
  message: string
  mode: TeachingMode
  isSocratic: boolean
  whiteboardItems?: Array<{
    type: 'text' | 'formula' | 'example' | 'tip'
    content: string
  }>
}

/**
 * Generate a response using the modular prompt system
 */
export async function generateModularResponse(
  studentMessage: string,
  context: TutorContext
): Promise<TutorResponse> {
  // Build the appropriate prompt
  const { systemPrompt, useSocratic } = buildPrompt(
    context.subject,
    context.mode,
    context.topic || null,
    {
      teachingAge: context.teachingAge,
      voiceGender: context.voiceGender,
      voiceAccent: context.voiceAccent,
    }
  )

  // Build the conversation
  const messages: Solocornssage[] = [
    { role: 'system', content: systemPrompt },
    ...context.conversationHistory.slice(-6), // Keep last 6 messages for context
    { role: 'user', content: studentMessage },
  ]

  // Generate response
  const result = await chatWithFallback(messages, {
    temperature: 0.7,
    maxTokens: 800,
  })

  // Extract whiteboard items
  const whiteboardItems = extractWhiteboardItems(result.content)

  return {
    message: result.content.trim(),
    mode: context.mode,
    isSocratic: useSocratic,
    whiteboardItems: whiteboardItems.length > 0 ? whiteboardItems : undefined,
  }
}

/**
 * Generate a lesson plan for a topic
 */
export async function generateLessonPlan(
  subject: string,
  topic: string,
  context: Omit<TutorContext, 'topic' | 'mode'>
): Promise<{
  introduction: string
  concepts: string[]
  example: string
  practice: string
  summary: string
}> {
  const { systemPrompt } = buildPrompt(subject, 'lesson', topic, {
    teachingAge: context.teachingAge,
    voiceGender: context.voiceGender,
    voiceAccent: context.voiceAccent,
  })

  const prompt = `${systemPrompt}\n\nGenerate a structured lesson plan for the topic: ${topic}\n
Format your response exactly like this:

INTRODUCTION: [2 sentences introducing why this matters]

CONCEPTS:
- [Concept 1 with brief explanation]
- [Concept 2 with brief explanation]
- [Concept 3 with brief explanation]

EXAMPLE: [A complete worked example with steps numbered]

PRACTICE: [One practice problem for the student to try]

SUMMARY: [2-3 key takeaways]`

  const result = await chatWithFallback([{ role: 'user', content: prompt }], {
    temperature: 0.6,
    maxTokens: 1000,
  })

  const content = result.content

  return {
    introduction: extractSection(content, 'INTRODUCTION'),
    concepts: extractList(content, 'CONCEPTS'),
    example: extractSection(content, 'EXAMPLE'),
    practice: extractSection(content, 'PRACTICE'),
    summary: extractSection(content, 'SUMMARY'),
  }
}

// Helper to extract sections
function extractSection(content: string, sectionName: string): string {
  const regex = new RegExp(
    `${sectionName}:[\\s\\n]*([^\\n]+(?:\\n(?!(?:INTRODUCTION|CONCEPTS|EXAMPLE|PRACTICE|SUMMARY):)[^\\n]+)*)`,
    'i'
  )
  const match = content.match(regex)
  return match ? match[1].trim() : ''
}

function extractList(content: string, sectionName: string): string[] {
  const section = extractSection(content, sectionName)
  return section
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.replace(/^-\s*/, '').trim())
}

export { getTeachingModes }
