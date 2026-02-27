/**
 * Question Bank API Routes
 *
 * GET /api/tutor/question-bank - List all questions for the tutor
 * POST /api/tutor/question-bank - Create a new question
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { questionBankItem } from '@/lib/db/schema'
import { eq, and, or, desc, ilike, sql } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import type { QuestionType, QuestionDifficulty } from '@/types/quiz'

// GET /api/tutor/question-bank - List questions with filtering
export const GET = withAuth(async (req: NextRequest, session) => {
  const { searchParams } = new URL(req.url)

  const type = searchParams.get('type') as QuestionType | null
  const difficulty = searchParams.get('difficulty') as QuestionDifficulty | null
  const subject = searchParams.get('subject')
  const tagsParam = searchParams.get('tags')?.split(',').filter(Boolean) as string[] | undefined
  const curriculumId = searchParams.get('curriculumId')
  const lessonId = searchParams.get('lessonId')
  const searchQuery = searchParams.get('q')
  const isPublic = searchParams.get('isPublic')

  const page = parseInt(searchParams.get('page') || '1')
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
  const skip = (page - 1) * limit

  const conditions = [eq(questionBankItem.tutorId, session.user.id)]
  if (type) conditions.push(eq(questionBankItem.type, type))
  if (difficulty) conditions.push(eq(questionBankItem.difficulty, difficulty))
  if (subject) conditions.push(sql`lower(${questionBankItem.subject}) = lower(${subject})`)
  if (curriculumId) conditions.push(eq(questionBankItem.curriculumId, curriculumId))
  if (lessonId) conditions.push(eq(questionBankItem.lessonId, lessonId))
  if (isPublic !== null && isPublic !== '') conditions.push(eq(questionBankItem.isPublic, isPublic === 'true'))
  if (tagsParam && tagsParam.length > 0) {
    conditions.push(sql`${questionBankItem.tags} @> ${tagsParam}::text[]`)
  }
  if (searchQuery) {
    conditions.push(
      or(
        ilike(questionBankItem.question, `%${searchQuery}%`),
        ilike(questionBankItem.explanation ?? '', `%${searchQuery}%`),
        sql`${searchQuery} = ANY(${questionBankItem.tags})`
      )!
    )
  }

  const whereClause = and(...conditions)

  const [questions, countRows] = await Promise.all([
    drizzleDb
      .select()
      .from(questionBankItem)
      .where(whereClause)
      .orderBy(desc(questionBankItem.updatedAt))
      .offset(skip)
      .limit(limit),
    drizzleDb.select({ count: sql<number>`count(*)::int` }).from(questionBankItem).where(whereClause),
  ])

  const totalCount = countRows[0]?.count ?? 0

  return NextResponse.json({
    questions,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  })
}, { role: 'TUTOR' })

// POST /api/tutor/question-bank - Create a new question
export const POST = withCsrf(
  withAuth(async (req: NextRequest, session) => {
    const body = await req.json()

    const {
      type,
      question,
      options,
      correctAnswer,
      explanation,
      hint,
      points = 1,
      difficulty = 'medium',
      tags = [],
      subject,
      curriculumId,
      lessonId,
      isPublic = false,
    } = body

    if (!type || !question) {
      throw new ValidationError('Type and question are required')
    }

    if (type === 'multiple_choice' || type === 'multi_select') {
      if (!options || options.length < 2) {
        throw new ValidationError('Multiple choice questions require at least 2 options')
      }
    }

    if (type === 'true_false') {
      if (!correctAnswer || (correctAnswer !== 'true' && correctAnswer !== 'false')) {
        throw new ValidationError('True/False questions require correctAnswer to be "true" or "false"')
      }
    }

    const [newQuestion] = await drizzleDb
      .insert(questionBankItem)
      .values({
        id: randomUUID(),
        tutorId: session.user.id,
        type,
        question,
        options: options ?? null,
        correctAnswer: correctAnswer !== undefined ? correctAnswer : null,
        explanation: explanation ?? null,
        hint: hint ?? null,
        points: Math.max(1, points),
        difficulty,
        tags: tags ?? [],
        subject: subject ?? null,
        curriculumId: curriculumId ?? null,
        lessonId: lessonId ?? null,
        isPublic,
        usageCount: 0,
      })
      .returning()

    return NextResponse.json(
      {
        success: true,
        question: newQuestion,
      },
      { status: 201 }
    )
  }, { role: 'TUTOR' })
)
