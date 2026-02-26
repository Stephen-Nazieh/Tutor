/**
 * Student Quizzes API
 * 
 * GET /api/student/quizzes - List quizzes available to the student
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { StudentQuiz } from '@/types/quiz'

export const GET = withAuth(async (req: NextRequest, session) => {
    const studentId = session.user.id
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') // 'available', 'completed', 'all'

    // Get student's enrolled curricula
    const enrollments = await db.curriculumEnrollment.findMany({
        where: { studentId },
        select: { curriculumId: true }
    })

    const enrolledCurriculumIds = enrollments.map((e: any) => e.curriculumId)

    // Get active quiz assignments for this student
    const assignments = await db.quizAssignment.findMany({
        where: {
            isActive: true,
            OR: [
                { assignedToType: 'student', assignedToId: studentId },
                { assignedToAll: true },
                // Quizzes assigned to curricula the student is enrolled in
                {
                    quiz: {
                        curriculumId: { in: enrolledCurriculumIds }
                    }
                }
            ]
        },
        include: {
            quiz: true
        }
    })

    // Get unique quizzes
    const quizMap = new Map()
    assignments.forEach((assignment: any) => {
        if (!quizMap.has(assignment.quizId)) {
            quizMap.set(assignment.quizId, {
                quiz: assignment.quiz,
                dueDate: assignment.dueDate,
                assignmentId: assignment.id
            })
        }
    })

    // Get student's attempts for these quizzes
    const quizIds = Array.from(quizMap.keys())
    const attempts = await db.quizAttempt.findMany({
        where: {
            studentId,
            quizId: { in: quizIds }
        },
        orderBy: { completedAt: 'desc' }
    })

    // Group attempts by quiz
    const attemptsByQuiz = new Map()
    attempts.forEach((attempt: any) => {
        if (!attemptsByQuiz.has(attempt.quizId)) {
            attemptsByQuiz.set(attempt.quizId, [])
        }
        attemptsByQuiz.get(attempt.quizId).push(attempt)
    })

    // Format quizzes for student
    const now = new Date()
    const quizzes: StudentQuiz[] = []

    for (const [quizId, data] of quizMap) {
        const quiz = data.quiz
        const quizAttempts = attemptsByQuiz.get(quizId) || []
        const completedAttempts = quizAttempts.filter((a: any) => a.status === 'graded' || a.status === 'submitted')
        const attemptsMade = completedAttempts.length
        const bestAttempt = completedAttempts[0] // Sorted by completedAt desc

        // Determine status
        let quizStatus: StudentQuiz['status'] = 'available'

        if (quiz.startDate && new Date(quiz.startDate) > now) {
            quizStatus = 'upcoming'
        } else if (quiz.dueDate && new Date(quiz.dueDate) < now) {
            quizStatus = attemptsMade > 0 ? 'completed' : 'overdue'
        } else if (attemptsMade >= quiz.allowedAttempts) {
            quizStatus = 'completed'
        } else if (attemptsMade > 0) {
            quizStatus = 'available' // Can retry
        }

        // Filter by status if requested
        if (status === 'available' && quizStatus !== 'available' && quizStatus !== 'upcoming') continue
        if (status === 'completed' && quizStatus !== 'completed') continue

        quizzes.push({
            id: quiz.id,
            title: quiz.title,
            description: quiz.description,
            type: quiz.type,
            timeLimit: quiz.timeLimit || undefined,
            allowedAttempts: quiz.allowedAttempts,
            totalQuestions: (quiz.questions as any[]).length,
            totalPoints: quiz.totalPoints,
            dueDate: data.dueDate || quiz.dueDate || undefined,
            startDate: quiz.startDate || undefined,
            status: quizStatus,
            attemptsMade,
            bestScore: bestAttempt ? Math.round((bestAttempt.score / bestAttempt.maxScore) * 100) : undefined,
            canAttempt: quizStatus === 'available' && attemptsMade < quiz.allowedAttempts
        })
    }

    // Sort: upcoming first, then available by due date, then completed
    quizzes.sort((a, b) => {
        if (a.status === 'upcoming' && b.status !== 'upcoming') return -1
        if (a.status !== 'upcoming' && b.status === 'upcoming') return 1
        if (a.dueDate && b.dueDate) return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        return 0
    })

    return NextResponse.json({ quizzes })
}, { role: 'STUDENT' })
