/**
 * AI Content Generation API
 * POST /api/tutor/ai-assistant/generate
 *
 * Generates teaching content (explanation, example, analogy, etc.).
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withRateLimitPreset } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aIAssistantInsight } from '@/lib/db/schema'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { z } from 'zod'
import { randomUUID } from 'crypto'

const GenerationTypes = ['explanation', 'example', 'analogy', 'simplification', 'activity', 'assessment'] as const

const GenerateRequestSchema = z.object({
  type: z.enum(GenerationTypes),
  topic: z.string().min(1),
  subject: z.string().min(1),
  gradeLevel: z.string().optional(),
  context: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
  format: z.enum(['plain', 'markdown', 'structured', 'bullet_points']).default('markdown'),
  length: z.enum(['brief', 'medium', 'detailed']).default('medium'),
  language: z.enum(['zh', 'en', 'both']).default('zh'),
})

type GenerateRequest = z.infer<typeof GenerateRequestSchema>

interface GeneratedContent {
  title: string
  content: string
  type: (typeof GenerationTypes)[number]
  metadata: {
    topic: string
    subject: string
    difficulty: string
    estimatedTime?: string
    prerequisites?: string[]
    relatedTopics?: string[]
  }
}

function buildPrompt(params: GenerateRequest): string {
  const lengthMap = {
    brief: 'Keep it concise (150-250 words).',
    medium: 'Provide moderate detail (300-500 words).',
    detailed: 'Be comprehensive (600-1000 words).',
  }
  const formatInstructions: Record<GenerateRequest['format'], string> = {
    plain: 'Use plain text without formatting.',
    markdown: 'Use Markdown formatting with headers, lists, and emphasis.',
    structured: 'Use clear sections with headings and subheadings.',
    bullet_points: 'Present key points as bullet lists.',
  }
  const typePrompts: Record<(typeof GenerationTypes)[number], string> = {
    explanation: `
Create a clear, comprehensive explanation of "${params.topic}" for ${params.subject}.
The explanation should:
- Start with a brief overview/definition
- Break down the concept into digestible parts
- Explain the "why" and "how", not just the "what"
- Use clear, precise language appropriate for ${params.difficulty} level
${params.gradeLevel ? `- Be appropriate for ${params.gradeLevel} students` : ''}
${lengthMap[params.length]}
${formatInstructions[params.format]}`,

    example: `
Create worked examples for "${params.topic}" in ${params.subject}.
Include:
- 2-3 diverse examples showing different aspects/applications
- Step-by-step solutions with clear reasoning
- Common pitfalls to avoid
- Variations that students might encounter
${params.gradeLevel ? `- Difficulty appropriate for ${params.gradeLevel}` : ''}
${lengthMap[params.length]}
${formatInstructions[params.format]}`,

    analogy: `
Create analogies and metaphors to explain "${params.topic}" for ${params.subject}.
Provide:
- 3 different analogies from various domains
- For each: the analogy itself, why it works, and its limitations
- Visual descriptions where helpful
Make analogies relatable and appropriate for ${params.difficulty} level students.`,

    simplification: `
Create a simplified explanation of "${params.topic}" for ${params.subject}.
- Use simple, everyday language
- Avoid jargon (or explain it immediately)
- Connect to something students already know
Make it accessible without being condescending.`,

    activity: `
Design a classroom activity for teaching "${params.topic}" in ${params.subject}.
Include:
- Activity name and objective
- Materials needed
- Step-by-step procedure
- Grouping strategy
- Estimated time
- Assessment checkpoints
${params.gradeLevel ? `- Designed for ${params.gradeLevel} students` : ''}
Make it interactive and engaging.`,

    assessment: `
Create an assessment rubric for "${params.topic}" in ${params.subject}.
Include:
- Learning objectives being assessed
- Performance criteria (3-4 levels)
- Clear descriptors for each level
- Point values or grading scale
${params.gradeLevel ? `- Appropriate for ${params.gradeLevel}` : ''}
Focus on measuring understanding, not just memorization.`,
  }

  let prompt = typePrompts[params.type]
  if (params.context) prompt += `\n\nADDITIONAL CONTEXT: ${params.context}`
  if (params.language === 'zh') prompt += '\n\n请用中文回答。'
  else if (params.language === 'both') prompt += '\n\nProvide the response in both English and Chinese (bilingual format).'
  return prompt
}

function parseGeneratedContent(content: string, params: GenerateRequest): GeneratedContent {
  const lines = content.split('\n').filter((l) => l.trim())
  let title = lines[0]?.replace(/^#+\s*/, '').slice(0, 100) || `${params.topic} - ${params.type}`
  title = title.replace(/\*\*/g, '').trim()
  return {
    title,
    content,
    type: params.type,
    metadata: {
      topic: params.topic,
      subject: params.subject,
      difficulty: params.difficulty,
      estimatedTime: params.type === 'activity' ? '15-30 minutes' : undefined,
      prerequisites: [],
      relatedTopics: [],
    },
  }
}

export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id

  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(req, 'aiGenerate')
    if (rateLimitResponse) return rateLimitResponse

    const body = await req.json()
    const validation = GenerateRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }

    const params = validation.data
    const prompt = buildPrompt(params)
    const result = await generateWithFallback(prompt, {
      temperature: 0.7,
      maxTokens: 2500,
    })

    const generated = parseGeneratedContent(result.content, params)

    // TeachingMaterial table not in Drizzle schema; skip save

    try {
      await drizzleDb.insert(aIAssistantInsight).values({
        id: randomUUID(),
        sessionId: body.sessionId || 'temp',
        type: 'content_suggestion',
        title: `Generated ${params.type}: ${generated.title}`,
        content: generated.content.slice(0, 200) + '...',
        relatedData: {
          generationType: params.type,
          topic: params.topic,
          subject: params.subject,
          difficulty: params.difficulty,
        },
        applied: false,
      })
    } catch {
      // continue
    }

    return NextResponse.json({
      content: generated,
      saved: false,
      metadata: {
        provider: result.provider,
        latencyMs: result.latencyMs,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// GET - List generated content (no TeachingMaterial table in Drizzle)
export const GET = withAuth(async (_req: NextRequest, _session) => {
  return NextResponse.json({ materials: [] })
}, { role: 'TUTOR' })
