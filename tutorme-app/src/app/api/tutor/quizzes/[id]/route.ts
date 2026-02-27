/**
 * Individual Quiz API Routes
 * 
 * GET /api/tutor/quizzes/[id] - Get a specific quiz
 * PATCH /api/tutor/quizzes/[id] - Update a quiz
 * DELETE /api/tutor/quizzes/[id] - Delete a quiz
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, and, desc, count } from 'drizzle-orm'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { quiz, quizAttempt, quizAssignment, user, profile } from '@/lib/db/schema'
import { QuizQuestion } from '@/types/quiz'

// GET /api/tutor/quizzes/[id] - Get a specific quiz
export const GET = withAuth(async (req: NextRequest, session, context) => {
    const params = await (context as any).params
    const id = String(params?.id || '')

    const [quizData] = await drizzleDb
        .select()
        .from(quiz)
        .where(
            and(
                eq(quiz.id, id),
                eq(quiz.tutorId, session.user.id)
            )
        )
        .limit(1)

    if (!quizData) {
        throw new NotFoundError('Quiz not found')
    }

    // Get attempts count
    const [attemptsStats] = await drizzleDb
        .select({ value: count() })
        .from(quizAttempt)
        .where(eq(quizAttempt.quizId, id))

    // Get assignments count
    const [assignmentsStats] = await drizzleDb
        .select({ value: count() })
        .from(quizAssignment)
        .where(eq(quizAssignment.quizId, id))

    // Get recent attempts summary
    const recentAttemptsRaw = await drizzleDb
        .select({
            id: quizAttempt.id,
            score: quizAttempt.score,
            maxScore: quizAttempt.maxScore,
            completedAt: quizAttempt.completedAt,
            studentName: profile.name,
            studentId: user.id
        })
        .from(quizAttempt)
        .innerJoin(user, eq(user.id, quizAttempt.studentId))
        .leftJoin(profile, eq(profile.userId, user.id))
        .where(eq(quizAttempt.quizId, id))
        .orderBy(desc(quizAttempt.completedAt))
        .limit(5)

    return NextResponse.json({
        quiz: {
            ...quizData,
            attemptCount: Number(attemptsStats?.value || 0),
            assignmentCount: Number(assignmentsStats?.value || 0)
        },
        recentAttempts: recentAttemptsRaw.map(a => ({
            id: a.id,
            score: a.score,
            maxScore: a.maxScore,
            percentage: Math.round((a.score / a.maxScore) * 100),
            completedAt: a.completedAt,
            studentName: a.studentName || 'Unknown'
        }))
    })
}, { role: 'TUTOR' })

// PATCH /api/tutor/quizzes/[id] - Update a quiz
export const PATCH = withCsrf(withAuth(async (req: NextRequest, session, context) => {
    const params = await (context as any).params
    const id = String(params?.id || '')

    // Verify ownership
    const [existing] = await drizzleDb
        .select()
        .from(quiz)
        .where(
            and(
                eq(quiz.id, id),
                eq(quiz.tutorId, session.user.id)
            )
        )
        .limit(1)

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
    const updateData: any = {}

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

    const [updatedQuiz] = await drizzleDb
        .update(quiz)
        .set(updateData)
        .where(eq(quiz.id, id))
        .returning()

    return NextResponse.json({
        success: true,
        quiz: updatedQuiz
    })
}, { role: 'TUTOR' }))

// DELETE /api/tutor/quizzes/[id] - Delete a quiz
export const DELETE = withCsrf(withAuth(async (req: NextRequest, session, context) => {
    const params = await (context as any).params
    const id = String(params?.id || '')

    // Verify ownership
    const [existing] = await drizzleDb
        .select()
        .from(quiz)
        .where(
            and(
                eq(quiz.id, id),
                eq(quiz.tutorId, session.user.id)
            )
        )
        .limit(1)

    if (!existing) {
        throw new NotFoundError('Quiz not found')
    }

    // Check if there are any attempts
    const [attemptsStats] = await drizzleDb
        .select({ value: count() })
        .from(quizAttempt)
        .where(eq(quizAttempt.quizId, id))

    const attemptCount = Number(attemptsStats?.value || 0)

    if (attemptCount > 0) {
        // Instead of deleting, archive the quiz
        await drizzleDb
            .update(quiz)
            .set({ status: 'archived' })
            .where(eq(quiz.id, id))

        return NextResponse.json({
            success: true,
            message: 'Quiz has attempts and was archived instead of deleted'
        })
    }

    await drizzleDb
        .delete(quiz)
        .where(eq(quiz.id, id))

    return NextResponse.json({
        success: true,
        message: 'Quiz deleted successfully'
    })
}, { role: 'TUTOR' }))

