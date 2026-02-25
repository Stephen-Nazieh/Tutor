/**
 * AI Quiz Generation API
 * Generates quiz questions from video transcript
 * 
 * POST /api/quiz/generate
 * Body: { contentId, transcript, grade, weakAreas }
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { quizGeneratorPrompt } from '@/lib/ai/prompts'

export const POST = withCsrf(withAuth(async (req) => {
  const body = await req.json()
  const { transcript, grade = 8, weakAreas = [] } = body

  if (!transcript) {
    throw new ValidationError('Transcript is required')
  }

  // Build the prompt for quiz generation
  const prompt = quizGeneratorPrompt({
    transcript,
    grade,
    weakAreas,
    subject: 'general'
  })

  // Generate quiz with AI
  const result = await generateWithFallback(prompt, {
    temperature: 0.7,
    maxTokens: 1500
  })

  // Parse the JSON response
  let questions
  try {
    const jsonMatch = result.content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      questions = parsed.questions
    } else {
      throw new Error('No JSON found in response')
    }
  } catch (parseError) {
    console.error('Failed to parse quiz JSON:', parseError)
    return NextResponse.json(
      {
        error: 'AI response format invalid. Please retry.',
        provider: result.provider,
      },
      { status: 502 }
    )
  }

  return NextResponse.json({
    questions,
    provider: result.provider
  })
}, { role: 'STUDENT' }))
