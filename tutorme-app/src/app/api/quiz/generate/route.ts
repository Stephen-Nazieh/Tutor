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

export const POST = withCsrf(withAuth(async (req) => {
  const body = await req.json()
  const { transcript, grade = 8, weakAreas = [] } = body

  if (!transcript) {
    throw new ValidationError('Transcript is required')
  }

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
}, { role: 'STUDENT' }))
