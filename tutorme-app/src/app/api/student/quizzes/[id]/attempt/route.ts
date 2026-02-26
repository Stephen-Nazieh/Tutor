/**
 * Quiz Attempt Start API
 * 
 * POST /api/student/quizzes/[id]/attempt - Start a new quiz attempt
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError, ForbiddenError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const POST = withCsrf(withAuth(async (req: NextRequest, session, context) => {
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

    // Check if quiz is available
    const now = new Date()
    if (quiz.startDate && new Date(quiz.startDate) > now) {
        throw new ForbiddenError('This quiz is not yet available')
    }
    if (quiz.dueDate && new Date(quiz.dueDate) < now) {
        throw new ForbiddenError('This quiz has passed its due date')
    }

    // Check if student has attempts remaining
    const completedAttempts = await db.quizAttempt.count({
        where: {
            quizId: id,
            studentId,
            status: { in: ['submitted', 'graded'] }
        }
    })

    if (completedAttempts >= quiz.allowedAttempts) {
        throw new ForbiddenError('You have used all your attempts for this quiz')
    }

    // Check for existing in-progress attempt
    const existingAttempt = await db.quizAttempt.findFirst({
        where: {
            quizId: id,
            studentId,
            status: 'in_progress'
        }
    })

    if (existingAttempt) {
        // Return existing attempt
        return NextResponse.json({
            attemptId: existingAttempt.id,
            startedAt: existingAttempt.startedAt,
            timeRemaining: quiz.timeLimit
                ? calculateTimeRemaining(existingAttempt.startedAt, quiz.timeLimit)
                : undefined
        })
    }

    // Create new attempt
    const attempt = await db.quizAttempt.create({
        data: {
            quizId: id,
            studentId,
            status: 'in_progress',
            answers: {},
            score: 0,
            maxScore: quiz.totalPoints,
            attemptNumber: completedAttempts + 1,
            startedAt: new Date(),
            questionResults: []
        }
    })

    return NextResponse.json({
        attemptId: attempt.id,
        startedAt: attempt.startedAt,
        timeRemaining: quiz.timeLimit ? quiz.timeLimit * 60 : undefined
    }, { status: 201 })
}, { role: 'STUDENT' }))

function calculateTimeRemaining(startedAt: Date, timeLimitMinutes: number): number {
    const elapsedMs = Date.now() - startedAt.getTime()
    const limitMs = timeLimitMinutes * 60 * 1000
    return Math.max(0, Math.floor((limitMs - elapsedMs) / 1000))
}
