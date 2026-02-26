// @ts-nocheck
/**
 * Individual Question Bank Item API Routes
 * 
 * GET /api/tutor/question-bank/[id] - Get a specific question
 * PATCH /api/tutor/question-bank/[id] - Update a question
 * DELETE /api/tutor/question-bank/[id] - Delete a question
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET /api/tutor/question-bank/[id] - Get a specific question
export const GET = withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params
    
    const question = await db.questionBankItem.findFirst({
        where: {
            id,
            tutorId: session.user.id
        }
    })
    
    if (!question) {
        throw new NotFoundError('Question not found')
    }
    
    return NextResponse.json({ question })
}, { role: 'TUTOR' })

// PATCH /api/tutor/question-bank/[id] - Update a question
export const PATCH = withCsrf(withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params
    
    // Verify ownership
    const existing = await db.questionBankItem.findFirst({
        where: {
            id,
            tutorId: session.user.id
        }
    })
    
    if (!existing) {
        throw new NotFoundError('Question not found')
    }
    
    const body = await req.json()
    const {
        question,
        options,
        correctAnswer,
        explanation,
        hint,
        points,
        difficulty,
        tags,
        subject,
        curriculumId,
        lessonId,
        isPublic
    } = body
    
    // Build update data (only include provided fields)
    const updateData: any = {}
    if (question !== undefined) updateData.question = question
    if (options !== undefined) updateData.options = options
    if (correctAnswer !== undefined) updateData.correctAnswer = correctAnswer
    if (explanation !== undefined) updateData.explanation = explanation
    if (hint !== undefined) updateData.hint = hint
    if (points !== undefined) updateData.points = Math.max(1, points)
    if (difficulty !== undefined) updateData.difficulty = difficulty
    if (tags !== undefined) updateData.tags = tags
    if (subject !== undefined) updateData.subject = subject
    if (curriculumId !== undefined) updateData.curriculumId = curriculumId
    if (lessonId !== undefined) updateData.lessonId = lessonId
    if (isPublic !== undefined) updateData.isPublic = isPublic
    
    // Validate type-specific constraints
    const updatedType = body.type || existing.type
    if ((updatedType === 'multiple_choice' || updatedType === 'multi_select') && options !== undefined) {
        if (options.length < 2) {
            throw new ValidationError('Multiple choice questions require at least 2 options')
        }
    }
    
    const updatedQuestion = await db.questionBankItem.update({
        where: { id },
        data: updateData
    })
    
    return NextResponse.json({
        success: true,
        question: updatedQuestion
    })
}, { role: 'TUTOR' }))

// DELETE /api/tutor/question-bank/[id] - Delete a question
export const DELETE = withCsrf(withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params
    
    // Verify ownership
    const existing = await db.questionBankItem.findFirst({
        where: {
            id,
            tutorId: session.user.id
        }
    })
    
    if (!existing) {
        throw new NotFoundError('Question not found')
    }
    
    await db.questionBankItem.delete({
        where: { id }
    })
    
    return NextResponse.json({
        success: true,
        message: 'Question deleted successfully'
    })
}, { role: 'TUTOR' }))
