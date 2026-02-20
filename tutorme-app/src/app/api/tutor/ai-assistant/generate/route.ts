/**
 * AI Content Generation API
 * POST /api/tutor/ai-assistant/generate
 * 
 * Generates teaching content:
 * - explanation: Detailed topic explanations
 * - example: Worked examples with steps
 * - analogy: Analogies and metaphors
 * - simplification: Simplified explanations
 * - activity: Classroom activities
 * - assessment: Assessment rubrics
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { z } from 'zod'

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
  type: typeof GenerationTypes[number]
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
  
  const typePrompts: Record<typeof GenerationTypes[number], string> = {
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
- 3 different analogies from various domains (everyday life, nature, technology, etc.)
- For each analogy: the analogy itself, why it works, and its limitations
- Visual descriptions where helpful
- Connections back to the actual concept

Make analogies relatable and appropriate for ${params.difficulty} level students.`,

    simplification: `
Create a simplified explanation of "${params.topic}" for ${params.subject}.

This should be for:
- Students struggling with the concept
- Those new to the subject
- Visual/spatial learners

Requirements:
- Use simple, everyday language
- Avoid jargon (or explain it immediately)
- Include a simple visual description or diagram concept
- Connect to something students already know
- Focus on the most essential understanding

Make it accessible without being condescending.`,

    activity: `
Design a classroom activity for teaching "${params.topic}" in ${params.subject}.

Include:
- Activity name and objective
- Materials needed
- Step-by-step procedure
- Grouping strategy (individual/pairs/groups)
- Estimated time for each phase
- Assessment checkpoints
- Adaptations for different learning needs
- Discussion questions for debrief
${params.gradeLevel ? `- Designed for ${params.gradeLevel} students` : ''}

Make it interactive and engaging.`,

    assessment: `
Create an assessment rubric for "${params.topic}" in ${params.subject}.

Include:
- Learning objectives being assessed
- Performance criteria (3-4 levels: Exceeds/Meets/Approaching/Below)
- Clear descriptors for each level
- Point values or grading scale
- Self-assessment checklist for students
${params.gradeLevel ? `- Appropriate for ${params.gradeLevel}` : ''}

Focus on measuring understanding, not just memorization.`,
  }
  
  let prompt = typePrompts[params.type]
  
  if (params.context) {
    prompt += `\n\nADDITIONAL CONTEXT: ${params.context}`
  }
  
  if (params.language === 'zh') {
    prompt += '\n\n请用中文回答。'
  } else if (params.language === 'both') {
    prompt += '\n\nProvide the response in both English and Chinese ( bilingual format).'
  }
  
  return prompt
}

function parseGeneratedContent(content: string, params: GenerateRequest): GeneratedContent {
  // Extract title from first line or generate one
  const lines = content.split('\n').filter(l => l.trim())
  let title = lines[0]?.replace(/^#+\s*/, '').slice(0, 100) || `${params.topic} - ${params.type}`
  
  // Clean up the title
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
    const body = await req.json()
    const validation = GenerateRequestSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const params = validation.data
    
    // Build generation prompt
    const prompt = buildPrompt(params)
    
    // Generate content
    const result = await generateWithFallback(prompt, {
      temperature: 0.7,
      maxTokens: 2500,
    })
    
    // Parse the response
    const generated = parseGeneratedContent(result.content, params)
    
    // Save to teaching materials if table exists
    const savedMaterial = await db.teachingMaterial?.create({
      data: {
        tutorId,
        title: generated.title,
        type: params.type,
        subject: params.subject,
        topic: params.topic,
        gradeLevel: params.gradeLevel,
        content: generated.content,
        metadata: generated.metadata,
      },
    }).catch(() => {
      console.log('TeachingMaterial table not found, skipping save')
      return null
    })
    
    // Create insight
    await db.aIAssistantInsight.create({
      data: {
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
      },
    }).catch(() => {
      // Continue even if insight creation fails
    })
    
    return NextResponse.json({
      content: generated,
      saved: !!savedMaterial,
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

// GET - List generated content
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const materials = await db.teachingMaterial?.findMany({
      where: { tutorId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        type: true,
        subject: true,
        topic: true,
        gradeLevel: true,
        createdAt: true,
      },
    }).catch(() => []) || []
    
    return NextResponse.json({ materials })
  } catch (error) {
    console.error('Fetch materials error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
