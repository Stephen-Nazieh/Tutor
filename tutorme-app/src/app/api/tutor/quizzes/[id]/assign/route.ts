/**
 * Quiz Assignment API
 * 
 * POST /api/tutor/quizzes/[id]/assign - Assign quiz to students/groups
 * GET /api/tutor/quizzes/[id]/assign - Get assignments for this quiz
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET /api/tutor/quizzes/[id]/assign - Get assignments for this quiz
export const GET = withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params
    
    // Verify quiz ownership
    const quiz = await db.quiz.findFirst({
        where: {
            id,
            tutorId: session.user.id
        }
    })
    
    if (!quiz) {
        throw new NotFoundError('Quiz not found')
    }
    
    const assignments = await db.quizAssignment.findMany({
        where: { quizId: id },
        orderBy: { assignedAt: 'desc' }
    })
    
    return NextResponse.json({ assignments })
}, { role: 'TUTOR' })

// POST /api/tutor/quizzes/[id]/assign - Assign quiz to students/groups
export const POST = withCsrf(withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params
    
    // Verify quiz ownership
    const quiz = await db.quiz.findFirst({
        where: {
            id,
            tutorId: session.user.id
        }
    })
    
    if (!quiz) {
        throw new NotFoundError('Quiz not found')
    }
    
    const body = await req.json()
    const {
        assignedToType, // 'student', 'group', 'all'
        assignedToId,   // studentId or groupId (null if assignedToAll)
        assignedToAll = false,
        dueDate
    } = body
    
    // Validation
    if (!assignedToType) {
        throw new ValidationError('assignedToType is required')
    }
    
    if (!assignedToAll && !assignedToId) {
        throw new ValidationError('Either assignedToId or assignedToAll must be provided')
    }
    
    // Check for duplicate assignment
    const existingAssignment = await db.quizAssignment.findFirst({
        where: {
            quizId: id,
            assignedToType,
            assignedToId: assignedToId || null,
            assignedToAll,
            isActive: true
        }
    })
    
    if (existingAssignment) {
        // Update existing assignment
        const updated = await db.quizAssignment.update({
            where: { id: existingAssignment.id },
            data: {
                dueDate: dueDate ? new Date(dueDate) : null,
                assignedAt: new Date()
            }
        })
        
        return NextResponse.json({
            success: true,
            assignment: updated,
            message: 'Assignment updated'
        })
    }
    
    // Create new assignment
    const assignment = await db.quizAssignment.create({
        data: {
            quizId: id,
            assignedByTutorId: session.user.id,
            assignedToType,
            assignedToId: assignedToId || null,
            assignedToAll,
            dueDate: dueDate ? new Date(dueDate) : null
        }
    })
    
    // Update quiz status to published if it's a draft
    if (quiz.status === 'draft') {
        await db.quiz.update({
            where: { id },
            data: { status: 'published' }
        })
    }
    
    return NextResponse.json({
        success: true,
        assignment,
        message: 'Quiz assigned successfully'
    }, { status: 201 })
}, { role: 'TUTOR' }))

// DELETE /api/tutor/quizzes/[id]/assign - Remove assignment
export const DELETE = withCsrf(withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params
    
    // Verify quiz ownership
    const quiz = await db.quiz.findFirst({
        where: {
            id,
            tutorId: session.user.id
        }
    })
    
    if (!quiz) {
        throw new NotFoundError('Quiz not found')
    }
    
    const { searchParams } = new URL(req.url)
    const assignmentId = searchParams.get('assignmentId')
    
    if (!assignmentId) {
        throw new ValidationError('assignmentId is required')
    }
    
    // Verify assignment belongs to this quiz
    const assignment = await db.quizAssignment.findFirst({
        where: {
            id: assignmentId,
            quizId: id
        }
    })
    
    if (!assignment) {
        throw new NotFoundError('Assignment not found')
    }
    
    // Deactivate instead of delete to preserve attempt history
    await db.quizAssignment.update({
        where: { id: assignmentId },
        data: { isActive: false }
    })
    
    return NextResponse.json({
        success: true,
        message: 'Assignment deactivated'
    })
}, { role: 'TUTOR' }))
