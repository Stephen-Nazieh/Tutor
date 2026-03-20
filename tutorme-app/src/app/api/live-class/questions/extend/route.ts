/**
 * POST /api/live-class/questions/extend
 * Generates a single follow-up question for live class extension mode.
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth, handleApiError, ValidationError } from '@/lib/api/middleware'
import { generateWithFallback } from '@/lib/agents'

const ExtendSchema = z.object({
  question: z.object({
    id: z.string().optional(),
    type: z.enum([
      'mcq',
      'truefalse',
      'shortanswer',
      'essay',
      'multiselect',
      'matching',
      'fillblank',
    ]),
    question: z.string().min(1),
    options: z.array(z.string()).optional(),
    correctAnswer: z.any().optional(),
    points: z.number().optional(),
    explanation: z.string().optional(),
    matchingPairs: z.array(z.object({ left: z.string(), right: z.string() })).optional(),
  }),
  difficulty: z.enum(['easier', 'harder']),
})

export const POST = withAuth(
  async req => {
    const body = await req.json().catch(() => null)
    const parsed = ExtendSchema.safeParse(body)
    if (!parsed.success) {
      throw new ValidationError('Invalid request body')
    }

    const { question, difficulty } = parsed.data
    const basePrompt = [
      `Create ONE ${difficulty} question similar to the following.`,
      `Type: ${question.type}`,
      `Question: ${question.question}`,
      question.options ? `Options: ${question.options.join(' | ')}` : '',
      question.matchingPairs
        ? `Matching Pairs: ${question.matchingPairs.map(p => `${p.left} -> ${p.right}`).join(' | ')}`
        : '',
      `Return JSON only in this shape:`,
      `{ "question": "string", "type": "${question.type}", "options": [], "correctAnswer": "", "explanation": "", "points": ${question.points ?? 1}, "matchingPairs": [] }`,
      `If type is matching, include matchingPairs as an array of {left,right}.`,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const result = await generateWithFallback(basePrompt, {
        temperature: 0.7,
        maxTokens: 700,
      })

      const match = result.content.match(/\{[\s\S]*\}/)
      if (!match) {
        throw new Error('No JSON found')
      }
      const parsedQuestion = JSON.parse(match[0])
      const nextQuestion = {
        id: `ext-${Date.now()}`,
        type: parsedQuestion.type || question.type,
        question: parsedQuestion.question || question.question,
        options: parsedQuestion.options,
        correctAnswer: parsedQuestion.correctAnswer,
        explanation: parsedQuestion.explanation || '',
        points: parsedQuestion.points ?? question.points ?? 1,
        matchingPairs: parsedQuestion.matchingPairs,
      }
      return NextResponse.json({ question: nextQuestion })
    } catch (error) {
      const fallback = {
        id: `ext-${Date.now()}`,
        type: question.type,
        question: `${difficulty === 'harder' ? 'Challenge' : 'Practice'}: ${question.question}`,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        points: question.points ?? 1,
        matchingPairs: question.matchingPairs,
      }
      return NextResponse.json({ question: fallback })
    }
  },
  { role: 'STUDENT' }
)
