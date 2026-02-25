/**
 * POST /api/tutor/questions/generate
 *
 * Lightweight AI question generation endpoint for the QuestionEditor.
 * Takes a topic and desired number of questions, returns QuizQuestion-format results.
 *
 * Body: {
 *   topic: string
 *   count?: number (default 5)
 *   difficulty?: 'beginner' | 'intermediate' | 'advanced'
 *   types?: ('multiple_choice' | 'short_answer')[]
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateUniformTasks, TaskConfiguration } from '@/lib/ai/task-generator'
import { withRateLimitPreset } from '@/lib/api/middleware'
import { z } from 'zod'

const QuestionGenerateSchema = z.object({
    topic: z.string().min(1).max(200),
    count: z.number().int().min(1).max(20).default(5),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
    types: z.array(z.enum(['multiple_choice', 'short_answer'])).min(1).max(2).default(['multiple_choice', 'short_answer']),
})

export async function POST(req: NextRequest) {
    const { response: rateLimitResponse } = await withRateLimitPreset(req, 'aiGenerate')
    if (rateLimitResponse) return rateLimitResponse

    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'TUTOR' && session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json().catch(() => null)
    const parsed = QuestionGenerateSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    const { topic, count, difficulty, types } = parsed.data

    try {
        const config: TaskConfiguration = {
            subject: topic,
            topics: [topic],
            difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
            taskTypes: types,
            count: Math.min(count, 20), // cap at 20
        }

        const tasks = await generateUniformTasks(config)

        // Map to QuizQuestion format for the QuestionEditor
        const questions = tasks.map((t, idx) => ({
            id: `ai-${Date.now()}-${idx}`,
            type: t.type === 'multiple_choice' ? 'mcq' :
                t.type === 'short_answer' ? 'shortanswer' :
                    t.type === 'long_answer' ? 'essay' : 'mcq',
            question: t.question || '',
            options: t.options || undefined,
            correctAnswer: t.correctAnswer || '',
            points: t.rubric?.[0]?.points ?? 1,
            explanation: t.explanation || '',
        }))

        return NextResponse.json({
            success: true,
            questions,
            count: questions.length,
        })
    } catch (error) {
        console.error('AI question generation failed:', error)
        return NextResponse.json(
            { error: 'Failed to generate questions' },
            { status: 500 }
        )
    }
}
