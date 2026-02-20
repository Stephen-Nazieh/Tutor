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

export const POST = withCsrf(withAuth(async (req, session) => {
  const body = await req.json()
  const { contentId, transcript, grade = 8, weakAreas = [] } = body

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
    // Return fallback questions
    questions = getFallbackQuestions()
  }

  return NextResponse.json({
    questions,
    provider: result.provider
  })
}, { role: 'STUDENT' }))

function getFallbackQuestions() {
  return [
    {
      type: 'multiple_choice',
      question: 'What is the main concept discussed in this video?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'A'
    },
    {
      type: 'short_answer',
      question: 'Explain the key concept in your own words.',
      rubric: 'Clear explanation with key terms (100%)'
    },
    {
      type: 'short_answer',
      question: 'How would you apply this concept to solve a real-world problem?',
      rubric: 'Practical application with reasoning (100%)'
    }
  ]
}
