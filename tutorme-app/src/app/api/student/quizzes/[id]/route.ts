/**
 * Individual Student Quiz API
 * 
 * GET /api/student/quizzes/[id] - Get quiz details for student
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, NotFoundError, ForbiddenError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req: NextRequest, session, context) => {
    const params = await context?.params ?? {}
    const { id } = params
    const studentId = session.user.id

    // Get quiz
    const quiz = await db.quiz.findUnique({
        where: { id }
    })

    if (!quiz) {
        throw new NotFoundError('Quiz not found')
    }

    // Check if quiz is accessible to this student
    const hasAccess = await checkQuizAccess(quiz, studentId)
    if (!hasAccess) {
        throw new ForbiddenError('You do not have access to this quiz')
    }

    // Check timing
    const now = new Date()
    if (quiz.startDate && new Date(quiz.startDate) > now) {
        throw new ForbiddenError('This quiz is not yet available')
    }

    // Get student's attempts
    const attempts = await db.quizAttempt.findMany({
        where: {
            quizId: id,
            studentId
        },
        orderBy: { attemptNumber: 'desc' }
    })

    const completedAttempts = attempts.filter((a: any) => a.status === 'graded' || a.status === 'submitted')
    const attemptsRemaining = Math.max(0, quiz.allowedAttempts - completedAttempts.length)
    const canAttempt = attemptsRemaining > 0 && (!quiz.dueDate || new Date(quiz.dueDate) >= now)

    // Prepare questions (shuffle if needed, hide answers)
    let questions = quiz.questions as any[]

    // Shuffle questions if enabled and this is a new attempt
    if (quiz.shuffleQuestions && canAttempt) {
        questions = shuffleArray([...questions])
    }

    // Shuffle options for each question if enabled
    if (quiz.shuffleOptions && canAttempt) {
        questions = questions.map(q => {
            if (q.options && q.options.length > 1) {
                const shuffledOptions = shuffleArray([...q.options])
                return { ...q, options: shuffledOptions }
            }
            return q
        })
    }

    // Remove correct answers from questions for student view
    const sanitizedQuestions = questions.map(q => ({
        id: q.id,
        type: q.type,
        question: q.question,
        options: q.options,
        points: q.points,
        difficulty: q.difficulty,
        hint: q.hint,
        order: q.order
        // Note: correctAnswer and explanation are NOT included
    }))

    return NextResponse.json({
        quiz: {
            id: quiz.id,
            title: quiz.title,
            description: quiz.description,
            type: quiz.type,
            timeLimit: quiz.timeLimit,
            totalPoints: quiz.totalPoints,
            startDate: quiz.startDate,
            dueDate: quiz.dueDate,
            showCorrectAnswers: quiz.showCorrectAnswers
        },
        questions: sanitizedQuestions,
        attempts: completedAttempts.map((a: any) => ({
            id: a.id,
            score: Math.round((a.score / a.maxScore) * 100),
            completedAt: a.completedAt,
            attemptNumber: a.attemptNumber,
            timeSpent: a.timeSpent
        })),
        canAttempt,
        attemptsRemaining
    })
}, { role: 'STUDENT' })

/**
 * Check if student has access to quiz
 */
async function checkQuizAccess(quiz: any, studentId: string): Promise<boolean> {
    // Check direct assignment
    const directAssignment = await db.quizAssignment.findFirst({
        where: {
            quizId: quiz.id,
            isActive: true,
            OR: [
                { assignedToType: 'student', assignedToId: studentId },
                { assignedToAll: true }
            ]
        }
    })

    if (directAssignment) return true

    // Check curriculum-based access
    if (quiz.curriculumId) {
        const enrollment = await db.curriculumEnrollment.findFirst({
            where: {
                curriculumId: quiz.curriculumId,
                studentId
            }
        })
        if (enrollment) return true
    }

    return false
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
