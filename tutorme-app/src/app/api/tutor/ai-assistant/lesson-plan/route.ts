/**
 * AI Lesson Plan Generation API
 * POST /api/tutor/ai-assistant/lesson-plan
 *
 * Generates comprehensive lesson plans with objectives,
 * activities, materials, and assessments.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aIAssistantInsight } from '@/lib/db/schema'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { z } from 'zod'
import { randomUUID } from 'crypto'

const LessonPlanRequestSchema = z.object({
  topic: z.string().min(1),
  subject: z.string().min(1),
  gradeLevel: z.string().optional(),
  duration: z.number().min(15).max(180).default(60),
  classSize: z.number().min(1).max(100).optional(),
  objectives: z.array(z.string()).optional(),
  teachingStyle: z.enum(['interactive', 'lecture', 'discussion', 'hands-on', 'mixed']).default('mixed'),
  resources: z.array(z.string()).optional(),
  priorKnowledge: z.string().optional(),
  differentiation: z.enum(['none', 'mild', 'moderate', 'extensive']).default('mild'),
})

type LessonPlanRequest = z.infer<typeof LessonPlanRequestSchema>

interface LessonPlan {
  title: string
  overview: string
  learningObjectives: string[]
  materials: string[]
  duration: number
  structure: {
    phase: string
    duration: number
    activity: string
    description: string
    materials: string[]
  }[]
  assessment: { formative: string[]; summative: string[] }
  differentiation: { struggling: string[]; advanced: string[] }
  homework?: string
  reflection: string[]
}

export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id

  try {
    const body = await req.json()
    const validation = LessonPlanRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }

    const params = validation.data

    const prompt = `
Create a detailed lesson plan for the following:

TOPIC: ${params.topic}
SUBJECT: ${params.subject}
${params.gradeLevel ? `GRADE LEVEL: ${params.gradeLevel}` : ''}
DURATION: ${params.duration} minutes
TEACHING STYLE: ${params.teachingStyle}
${params.classSize ? `CLASS SIZE: ${params.classSize} students` : ''}
${params.priorKnowledge ? `PRIOR KNOWLEDGE: ${params.priorKnowledge}` : ''}
${params.objectives?.length ? `SPECIFIC OBJECTIVES: ${params.objectives.join(', ')}` : ''}
${params.resources?.length ? `AVAILABLE RESOURCES: ${params.resources.join(', ')}` : ''}
DIFFERENTIATION NEEDS: ${params.differentiation}

Please provide a comprehensive lesson plan in the following JSON format:

{
  "title": "Lesson title",
  "overview": "Brief description of the lesson",
  "learningObjectives": ["Objective 1", "Objective 2", "Objective 3"],
  "materials": ["Material 1", "Material 2"],
  "duration": ${params.duration},
  "structure": [
    {
      "phase": "Introduction/Warm-up",
      "duration": 10,
      "activity": "Activity name",
      "description": "Detailed description",
      "materials": ["Required materials"]
    }
  ],
  "assessment": {
    "formative": ["Assessment method 1"],
    "summative": ["Assessment method 2"]
  },
  "differentiation": {
    "struggling": ["Support strategy 1"],
    "advanced": ["Extension activity 1"]
  },
  "homework": "Optional homework assignment",
  "reflection": ["Question 1 for teacher reflection"]
}

Make the lesson engaging, practical, and aligned with best teaching practices. Include specific timing for each phase.
`

    const result = await generateWithFallback(prompt, {
      temperature: 0.7,
      maxTokens: 3000,
    })

    let lessonPlan: LessonPlan
    try {
      const jsonMatch = result.content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        lessonPlan = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch {
      lessonPlan = {
        title: `${params.topic} - Lesson Plan`,
        overview: result.content.slice(0, 200),
        learningObjectives: params.objectives || ['Understand key concepts', 'Apply knowledge', 'Analyze and evaluate'],
        materials: params.resources || ['Whiteboard', 'Textbook'],
        duration: params.duration,
        structure: [
          {
            phase: 'Introduction',
            duration: Math.floor(params.duration * 0.15),
            activity: 'Warm-up',
            description: result.content.slice(0, 300),
            materials: [],
          },
        ],
        assessment: {
          formative: ['Class discussion', 'Quick checks'],
          summative: ['End of lesson quiz'],
        },
        differentiation: {
          struggling: ['Peer support', 'Simplified worksheets'],
          advanced: ['Extension problems', 'Teaching others'],
        },
        reflection: ['What worked well?', 'What would you change?'],
      }
    }

    let savedPlan: unknown = null
    // LessonPlan table not in Drizzle schema; skip save

    if (body.sessionId && body.sessionId !== 'temp') {
      try {
        await drizzleDb.insert(aIAssistantInsight).values({
          id: randomUUID(),
          sessionId: body.sessionId,
          type: 'lesson_idea',
          title: `Lesson Plan: ${lessonPlan.title}`,
          content: lessonPlan.overview,
          relatedData: {
            topic: params.topic,
            subject: params.subject,
            duration: params.duration,
          },
          applied: false,
        })
      } catch {
        // continue
      }
    }

    return NextResponse.json({
      lessonPlan,
      saved: !!savedPlan,
      metadata: {
        provider: result.provider,
        latencyMs: result.latencyMs,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Lesson plan generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate lesson plan' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// GET - List saved lesson plans (no LessonPlan table in Drizzle schema)
export const GET = withAuth(async (_req: NextRequest, _session) => {
  return NextResponse.json({ plans: [] })
}, { role: 'TUTOR' })
