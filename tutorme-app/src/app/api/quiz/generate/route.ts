/**
 * AI Quiz Generation API
 * Generates quiz questions from video transcript
 *
 * POST /api/quiz/generate
 * Body: { contentId, transcript, grade, weakAreas }
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { generateTranscriptQuiz } from '@/lib/agents/content-generator'
import { z } from 'zod'

const generateQuizSchema = z.strictObject({
  contentId: z.string().optional(),
  transcript: z.string().min(1, 'Transcript is required'),
  grade: z.number().int().min(1).max(12).optional().default(8),
  weakAreas: z.array(z.string()).optional().default([]),
})

export const POST = withCsrf(
  withAuth(
    async req => {
      let body: unknown
      try {
        body = await req.json()
      } catch {
        throw new ValidationError('Invalid JSON body')
      }

      const parseResult = generateQuizSchema.safeParse(body)
      if (!parseResult.success) {
        throw new ValidationError(parseResult.error.issues.map(i => i.message).join(', '))
      }

      const { transcript, grade, weakAreas } = parseResult.data

      try {
        const result = await generateTranscriptQuiz({
          transcript,
          grade,
          weakAreas,
          subject: 'general',
        })

        return NextResponse.json(
          {
            questions: result.questions,
            provider: result.provider,
          },
          { status: 200 }
        )
      } catch (error) {
        console.error('Failed to generate transcript quiz:', error)
        return NextResponse.json(
          {
            error: 'AI response format invalid. Please retry.',
            provider: 'unknown',
          },
          { status: 502 }
        )
      }
    },
    { role: 'STUDENT' }
  )
)
