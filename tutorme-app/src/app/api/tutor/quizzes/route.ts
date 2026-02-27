/**
 * Quiz Management API Routes
 * 
 * GET /api/tutor/quizzes - List all quizzes for the tutor
 * POST /api/tutor/quizzes - Create a new quiz
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, and, or, ilike, sql, desc } from 'drizzle-orm'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { quiz } from '@/lib/db/schema'
import { QuizStatus, QuizType, QuizQuestion } from '@/types/quiz'
import crypto from 'crypto'

// GET /api/tutor/quizzes - List quizzes with filtering
export const GET = withAuth(async (req: NextRequest, session) => {
    const { searchParams } = new URL(req.url)

    // Parse filters
    const status = searchParams.get('status') as QuizStatus | null
    const type = searchParams.get('type') as QuizType | null
    const curriculumId = searchParams.get('curriculumId')
    const searchQuery = searchParams.get('q')

    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const offset = (page - 1) * limit

    // Build where clause
    const conditions = [eq(quiz.tutorId, session.user.id)]

    if (status) conditions.push(eq(quiz.status, status))
    if (type) conditions.push(eq(quiz.type, type))
    if (curriculumId) conditions.push(eq(quiz.curriculumId, curriculumId))

    if (searchQuery) {
        const searchCond = or(
            ilike(quiz.title, `%${searchQuery}%`),
            ilike(quiz.description, `%${searchQuery}%`),
            sql`${quiz.tags} @> ARRAY[${searchQuery}]::text[]`
        )
        if (searchCond) conditions.push(searchCond)
    }

    const where = and(...conditions)

    // Fetch quizzes with attempt counts using relational queries
    const [quizzes, totalCountResult] = await Promise.all([
        drizzleDb.query.quiz.findMany({
            where,
            orderBy: [desc(quiz.updatedAt)],
            limit,
            offset,
            with: {
                attempts: { columns: { id: true } },
                assignments: { columns: { id: true } }
            }
        }),
        drizzleDb.select({ count: sql<number>`count(*)` })
            .from(quiz)
            .where(where)
    ])

    const totalCount = Number(totalCountResult[0]?.count || 0)

    // Format response
    const formattedQuizzes = quizzes.map(q => ({
        ...q,
        attemptCount: q.attempts.length,
        assignmentCount: q.assignments.length,
        attempts: undefined,
        assignments: undefined
    }))

    return NextResponse.json({
        quizzes: formattedQuizzes,
        pagination: {
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        }
    })
}, { role: 'TUTOR' })

// POST /api/tutor/quizzes - Create a new quiz
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
    const body = await req.json().catch(() => ({}))

    const {
        title,
        description,
        type = 'graded',
        timeLimit,
        allowedAttempts = 1,
        shuffleQuestions = false,
        shuffleOptions = false,
        showCorrectAnswers = 'after_attempt',
        passingScore,
        questions = [],
        tags = [],
        startDate,
        dueDate,
        curriculumId,
        lessonId
    } = body

    // Validation
    if (!title) {
        throw new ValidationError('Title is required')
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        throw new ValidationError('Quiz must have at least one question')
    }

    // Calculate total points
    const totalPoints = questions.reduce((sum: number, q: QuizQuestion) => sum + (q.points || 1), 0)

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i]
        if (!q.question) {
            throw new ValidationError(`Question ${i + 1} is missing text`)
        }
        if ((q.type === 'multiple_choice' || q.type === 'multi_select') && (!q.options || q.options.length < 2)) {
            throw new ValidationError(`Question ${i + 1} requires at least 2 options`)
        }
    }

    // Add order to questions
    const orderedQuestions = questions.map((q: QuizQuestion, index: number) => ({
        ...q,
        id: q.id || `q-${crypto.randomUUID()}-${index}`,
        order: index
    }))

    // Create quiz
    const [newQuiz] = await drizzleDb.insert(quiz).values({
        id: crypto.randomUUID(),
        tutorId: session.user.id,
        title,
        description: description || null,
        type,
        status: 'draft',
        timeLimit: timeLimit || null,
        allowedAttempts: Math.max(1, allowedAttempts),
        shuffleQuestions: !!shuffleQuestions,
        shuffleOptions: !!shuffleOptions,
        showCorrectAnswers,
        passingScore: passingScore || null,
        questions: orderedQuestions,
        totalPoints,
        tags: Array.isArray(tags) ? tags : [],
        startDate: startDate ? new Date(startDate) : null,
        dueDate: dueDate ? new Date(dueDate) : null,
        curriculumId: curriculumId || null,
        lessonId: lessonId || null
    }).returning()

    return NextResponse.json({
        success: true,
        quiz: newQuiz
    }, { status: 201 })
}, { role: 'TUTOR' }))
