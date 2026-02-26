/**
 * Quiz Submission API
 * 
 * POST /api/student/quizzes/[id]/submit - Submit quiz answers
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError, ForbiddenError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { gradeQuiz } from '@/lib/quiz/auto-grading'

export const POST = withCsrf(withAuth(async (req: NextRequest, session, context) => {
    const params = await context?.params ?? {}
    const { id } = params
    const studentId = session.user.id

    const body = await req.json()
    const { attemptId, answers, timeSpent } = body

    if (!attemptId) {
        throw new ValidationError('attemptId is required')
    }

    if (!answers || typeof answers !== 'object') {
        throw new ValidationError('answers are required')
    }

    // Get quiz
    const quiz = await db.quiz.findUnique({
        where: { id }
    })

    if (!quiz) {
        throw new NotFoundError('Quiz not found')
    }

    // Get attempt
    const attempt = await db.quizAttempt.findFirst({
        where: {
            id: attemptId,
            quizId: id,
            studentId,
            status: 'in_progress'
        }
    })

    if (!attempt) {
        throw new NotFoundError('Active attempt not found')
    }

    // Check if time limit exceeded
    if (quiz.timeLimit) {
        const elapsedMinutes = (Date.now() - attempt.startedAt.getTime()) / 60000
        if (elapsedMinutes > quiz.timeLimit + 1) { // 1 minute grace period
            // Auto-submit with current answers
            console.log(`Quiz ${id} auto-submitted due to time limit for student ${studentId}`)
        }
    }

    // Grade the quiz
    const questions = quiz.questions as any[]
    const gradingResult = await gradeQuiz(questions, answers, {
        useAI: true,
        studentId
    })

    // Update attempt
    const updatedAttempt = await db.quizAttempt.update({
        where: { id: attemptId },
        data: {
            status: 'graded',
            answers,
            score: gradingResult.totalScore,
            maxScore: gradingResult.maxScore,
            completedAt: new Date(),
            timeSpent: timeSpent || Math.floor((Date.now() - attempt.startedAt.getTime()) / 1000),
            questionResults: gradingResult.results,
            isGraded: true
        }
    })

    // Award XP and check for badges
    try {
        const { onQuizComplete } = await import('@/lib/gamification/triggers')
        const gamificationResult = await onQuizComplete(
            studentId,
            Array.isArray(id) ? id[0] : id,
            gradingResult.percentage,
            gradingResult.percentage === 100
        )

            // Include gamification results in response
            ; (updatedAttempt as any).gamification = gamificationResult
    } catch (error) {
        console.error('Failed to award XP/badges:', error)
    }

    return NextResponse.json({
        success: true,
        attempt: {
            id: updatedAttempt.id,
            score: gradingResult.totalScore,
            maxScore: gradingResult.maxScore,
            percentage: gradingResult.percentage,
            completedAt: updatedAttempt.completedAt,
            questionResults: gradingResult.results
        }
    })
}, { role: 'STUDENT' }))
