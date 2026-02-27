// @ts-nocheck
/**
 * Individual Question Bank Item API Routes
 *
 * GET /api/tutor/question-bank/[id] - Get a specific question
 * PATCH /api/tutor/question-bank/[id] - Update a question
 * DELETE /api/tutor/question-bank/[id] - Delete a question
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { questionBankItem } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

// GET /api/tutor/question-bank/[id] - Get a specific question
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context.params
  const { id } = params

  const rows = await drizzleDb
    .select()
    .from(questionBankItem)
    .where(and(eq(questionBankItem.id, id), eq(questionBankItem.tutorId, session.user.id)))
    .limit(1)

  const question = rows[0]
  if (!question) {
    throw new NotFoundError('Question not found')
  }

  return NextResponse.json({ question })
}, { role: 'TUTOR' })

// PATCH /api/tutor/question-bank/[id] - Update a question
export const PATCH = withCsrf(
  withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params

    const existingRows = await drizzleDb
      .select()
      .from(questionBankItem)
      .where(and(eq(questionBankItem.id, id), eq(questionBankItem.tutorId, session.user.id)))
      .limit(1)

    const existing = existingRows[0]
    if (!existing) {
      throw new NotFoundError('Question not found')
    }

    const body = await req.json()
    const {
      question: questionText,
      options,
      correctAnswer,
      explanation,
      hint,
      points,
      difficulty,
      tags,
      subject,
      curriculumId,
      lessonId,
      isPublic,
    } = body

    const updateData: Record<string, unknown> = {}
    if (questionText !== undefined) updateData.question = questionText
    if (options !== undefined) updateData.options = options
    if (correctAnswer !== undefined) updateData.correctAnswer = correctAnswer
    if (explanation !== undefined) updateData.explanation = explanation
    if (hint !== undefined) updateData.hint = hint
    if (points !== undefined) updateData.points = Math.max(1, points)
    if (difficulty !== undefined) updateData.difficulty = difficulty
    if (tags !== undefined) updateData.tags = tags
    if (subject !== undefined) updateData.subject = subject
    if (curriculumId !== undefined) updateData.curriculumId = curriculumId
    if (lessonId !== undefined) updateData.lessonId = lessonId
    if (isPublic !== undefined) updateData.isPublic = isPublic

    const updatedType = body.type || existing.type
    if (
      (updatedType === 'multiple_choice' || updatedType === 'multi_select') &&
      options !== undefined &&
      options.length < 2
    ) {
      throw new ValidationError('Multiple choice questions require at least 2 options')
    }

    const [updatedQuestion] = await drizzleDb
      .update(questionBankItem)
      .set(updateData)
      .where(eq(questionBankItem.id, id))
      .returning()

    return NextResponse.json({
      success: true,
      question: updatedQuestion,
    })
  }, { role: 'TUTOR' })
)

// DELETE /api/tutor/question-bank/[id] - Delete a question
export const DELETE = withCsrf(
  withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params

    const existingRows = await drizzleDb
      .select()
      .from(questionBankItem)
      .where(and(eq(questionBankItem.id, id), eq(questionBankItem.tutorId, session.user.id)))
      .limit(1)

    if (!existingRows[0]) {
      throw new NotFoundError('Question not found')
    }

    await drizzleDb.delete(questionBankItem).where(eq(questionBankItem.id, id))

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
    })
  }, { role: 'TUTOR' })
)
