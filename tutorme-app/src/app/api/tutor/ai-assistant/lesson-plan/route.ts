/**
 * AI Lesson Plan Generation API
 * POST /api/tutor/ai-assistant/lesson-plan
 * 
 * Generates comprehensive lesson plans with objectives,
 * activities, materials, and assessments.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { z } from 'zod'

const LessonPlanRequestSchema = z.object({
  topic: z.string().min(1),
  subject: z.string().min(1),
  gradeLevel: z.string().optional(),
  duration: z.number().min(15).max(180).default(60), // minutes
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
  assessment: {
    formative: string[]
    summative: string[]
  }
  differentiation: {
    struggling: string[]
    advanced: string[]
  }
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
    
    // Build comprehensive prompt
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
    
    // Generate lesson plan
    const result = await generateWithFallback(prompt, {
      temperature: 0.7,
      maxTokens: 3000,
    })
    
    // Parse the JSON response
    let lessonPlan: LessonPlan
    try {
      // Try to extract JSON from the response
      const jsonMatch = result.content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        lessonPlan = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      // Fallback: structure the text response
      console.log('JSON parse failed, using fallback structuring')
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
    
    // Save to database
    const savedPlan = await db.lessonPlan.create?.({
      data: {
        tutorId,
        title: lessonPlan.title,
        subject: params.subject,
        topic: params.topic,
        gradeLevel: params.gradeLevel,
        duration: params.duration,
        content: lessonPlan,
      },
    }).catch(() => {
      // If table doesn't exist, continue without saving
      console.log('LessonPlan table not found, skipping save')
      return null
    })
    
    // Create insight
    await db.aIAssistantInsight.create({
      data: {
        sessionId: body.sessionId || 'temp',
        type: 'lesson_idea',
        title: `Lesson Plan: ${lessonPlan.title}`,
        content: lessonPlan.overview,
        relatedData: {
          topic: params.topic,
          subject: params.subject,
          duration: params.duration,
        },
      },
    }).catch(() => {
      // Continue even if insight creation fails
    })
    
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

// GET - List saved lesson plans
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    // Check if lesson plan table exists
    const plans = await db.lessonPlan?.findMany({
      where: { tutorId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        subject: true,
        topic: true,
        gradeLevel: true,
        duration: true,
        createdAt: true,
      },
    }).catch(() => []) || []
    
    return NextResponse.json({ plans })
  } catch (error) {
    console.error('Fetch lesson plans error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lesson plans' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
