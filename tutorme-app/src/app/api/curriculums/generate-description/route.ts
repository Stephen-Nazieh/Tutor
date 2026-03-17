/**
 * POST /api/curriculums/generate-description
 * Generate a short course description from subject, grade level, and difficulty.
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { generateCourseDescription } from '@/lib/agents/curriculum-service'

export const POST = withAuth(async (req) => {
  const body = await req.json().catch(() => ({}))
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const gradeLevel = typeof body.gradeLevel === 'string' ? body.gradeLevel.trim() : undefined
  const difficulty = typeof body.difficulty === 'string' ? body.difficulty.trim() : undefined

  if (!subject) {
    return NextResponse.json({ error: 'Subject is required' }, { status: 400 })
  }

  const result = await generateCourseDescription({
    subject,
    gradeLevel,
    difficulty,
  })
  return NextResponse.json({ description: result.description })
}, { role: 'TUTOR' })
