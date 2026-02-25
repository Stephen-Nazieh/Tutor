/**
 * Quiz Management API Routes
 * 
 * GET /api/tutor/quizzes - List all quizzes for the tutor
 * POST /api/tutor/quizzes - Create a new quiz
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { QuizStatus, QuizType, QuizQuestion } from '@/types/quiz'

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
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = {
        tutorId: session.user.id
    }
    
    if (status) where.status = status
    if (type) where.type = type
    if (curriculumId) where.curriculumId = curriculumId
    
    if (searchQuery) {
        where.OR = [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
            { tags: { has: searchQuery } }
        ]
    }
    
    // Fetch quizzes with attempt counts
    const [quizzes, totalCount] = await Promise.all([
        db.quiz.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
            skip,
            take: limit,
            include: {
                _count: {
                    select: {
                        attempts: true,
                        assignments: true
                    }
                }
            }
        }),
        db.quiz.count({ where })
    ])
    
    // Format response
    const formattedQuizzes = quizzes.map(quiz => ({
        ...quiz,
        attemptCount: quiz._count.attempts,
        assignmentCount: quiz._count.assignments,
        _count: undefined
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
    const body = await req.json()
    
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
    
    if (questions.length === 0) {
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
        id: q.id || `q-${Date.now()}-${index}`,
        order: index
    }))
    
    // Create quiz
    const quiz = await db.quiz.create({
        data: {
            tutorId: session.user.id,
            title,
            description: description || null,
            type,
            status: 'draft',
            timeLimit: timeLimit || null,
            allowedAttempts: Math.max(1, allowedAttempts),
            shuffleQuestions,
            shuffleOptions,
            showCorrectAnswers,
            passingScore: passingScore || null,
            questions: orderedQuestions,
            totalPoints,
            tags,
            startDate: startDate ? new Date(startDate) : null,
            dueDate: dueDate ? new Date(dueDate) : null,
            curriculumId: curriculumId || null,
            lessonId: lessonId || null
        }
    })
    
    return NextResponse.json({
        success: true,
        quiz
    }, { status: 201 })
}, { role: 'TUTOR' }))
