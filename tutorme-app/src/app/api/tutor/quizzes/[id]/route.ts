// @ts-nocheck
/**
 * Individual Quiz API Routes
 * 
 * GET /api/tutor/quizzes/[id] - Get a specific quiz
 * PATCH /api/tutor/quizzes/[id] - Update a quiz
 * DELETE /api/tutor/quizzes/[id] - Delete a quiz
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { QuizQuestion } from '@/types/quiz'

// GET /api/tutor/quizzes/[id] - Get a specific quiz
export const GET = withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params
    
    const quiz = await db.quiz.findFirst({
        where: {
            id,
            tutorId: session.user.id
        },
        include: {
            _count: {
                select: {
                    attempts: true,
                    assignments: true
                }
            }
        }
    })
    
    if (!quiz) {
        throw new NotFoundError('Quiz not found')
    }
    
    // Get recent attempts summary
    const recentAttempts = await db.quizAttempt.findMany({
        where: { quizId: id },
        orderBy: { completedAt: 'desc' },
        take: 5,
        select: {
            id: true,
            score: true,
            maxScore: true,
            completedAt: true,
            student: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
    
    return NextResponse.json({
        quiz: {
            ...quiz,
            attemptCount: quiz._count.attempts,
            assignmentCount: quiz._count.assignments,
            _count: undefined
        },
        recentAttempts: recentAttempts.map(a => ({
            id: a.id,
            score: a.score,
            maxScore: a.maxScore,
            percentage: Math.round((a.score / a.maxScore) * 100),
            completedAt: a.completedAt,
            studentName: a.student.profile?.name || 'Unknown'
        }))
    })
}, { role: 'TUTOR' })

// PATCH /api/tutor/quizzes/[id] - Update a quiz
export const PATCH = withCsrf(withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params
    
    // Verify ownership
    const existing = await db.quiz.findFirst({
        where: {
            id,
            tutorId: session.user.id
        }
    })
    
    if (!existing) {
        throw new NotFoundError('Quiz not found')
    }
    
    const body = await req.json()
    const {
        title,
        description,
        type,
        status,
        timeLimit,
        allowedAttempts,
        shuffleQuestions,
        shuffleOptions,
        showCorrectAnswers,
        passingScore,
        questions,
        tags,
        startDate,
        dueDate,
        curriculumId,
        lessonId
    } = body
    
    // Build update data
    const updateData: Prisma.QuizUpdateInput = {}
    
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (type !== undefined) updateData.type = type
    if (status !== undefined) updateData.status = status
    if (timeLimit !== undefined) updateData.timeLimit = timeLimit
    if (allowedAttempts !== undefined) updateData.allowedAttempts = Math.max(1, allowedAttempts)
    if (shuffleQuestions !== undefined) updateData.shuffleQuestions = shuffleQuestions
    if (shuffleOptions !== undefined) updateData.shuffleOptions = shuffleOptions
    if (showCorrectAnswers !== undefined) updateData.showCorrectAnswers = showCorrectAnswers
    if (passingScore !== undefined) updateData.passingScore = passingScore
    if (tags !== undefined) updateData.tags = tags
    if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : null
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null
    if (curriculumId !== undefined) updateData.curriculumId = curriculumId
    if (lessonId !== undefined) updateData.lessonId = lessonId
    
    // If questions are being updated, recalculate total points and validate
    if (questions !== undefined) {
        if (questions.length === 0) {
            throw new ValidationError('Quiz must have at least one question')
        }
        
        // Validate questions
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i]
            if (!q.question) {
                throw new ValidationError(`Question ${i + 1} is missing text`)
            }
        }
        
        // Add order to questions
        updateData.questions = questions.map((q: QuizQuestion, index: number) => ({
            ...q,
            id: q.id || `q-${Date.now()}-${index}`,
            order: index
        }))
        
        updateData.totalPoints = questions.reduce((sum: number, q: QuizQuestion) => sum + (q.points || 1), 0)
    }
    
    const updatedQuiz = await db.quiz.update({
        where: { id },
        data: updateData
    })
    
    return NextResponse.json({
        success: true,
        quiz: updatedQuiz
    })
}, { role: 'TUTOR' }))

// DELETE /api/tutor/quizzes/[id] - Delete a quiz
export const DELETE = withCsrf(withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params
    
    // Verify ownership
    const existing = await db.quiz.findFirst({
        where: {
            id,
            tutorId: session.user.id
        }
    })
    
    if (!existing) {
        throw new NotFoundError('Quiz not found')
    }
    
    // Check if there are any attempts
    const attemptCount = await db.quizAttempt.count({
        where: { quizId: id }
    })
    
    if (attemptCount > 0) {
        // Instead of deleting, archive the quiz
        await db.quiz.update({
            where: { id },
            data: { status: 'archived' }
        })
        
        return NextResponse.json({
            success: true,
            message: 'Quiz has attempts and was archived instead of deleted'
        })
    }
    
    await db.quiz.delete({
        where: { id }
    })
    
    return NextResponse.json({
        success: true,
        message: 'Quiz deleted successfully'
    })
}, { role: 'TUTOR' }))
