/**
 * POST /api/curriculums/generate-description
 * Generate a short course description from subject, grade level, and difficulty.
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { courseDescriptionFromSubjectPrompt } from '@/lib/ai/prompts'

export const POST = withAuth(async (req) => {
  const body = await req.json().catch(() => ({}))
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const gradeLevel = typeof body.gradeLevel === 'string' ? body.gradeLevel.trim() : undefined
  const difficulty = typeof body.difficulty === 'string' ? body.difficulty.trim() : undefined

  if (!subject) {
    return NextResponse.json({ error: 'Subject is required' }, { status: 400 })
  }

  const prompt = courseDescriptionFromSubjectPrompt({
    subject,
    gradeLevel,
    difficulty,
  })

  const result = await generateWithFallback(prompt, {
    temperature: 0.6,
    maxTokens: 200,
    skipCache: true,
  })

  const description = (result.content || '').trim()
  return NextResponse.json({ description })
}, { role: 'TUTOR' })
