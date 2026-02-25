/**
 * Question Bank API Routes
 * 
 * GET /api/tutor/question-bank - List all questions for the tutor
 * POST /api/tutor/question-bank - Create a new question
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { QuestionType, QuestionDifficulty } from '@/types/quiz'

// GET /api/tutor/question-bank - List questions with filtering
export const GET = withAuth(async (req: NextRequest, session) => {
    const { searchParams } = new URL(req.url)
    
    // Parse filters
    const type = searchParams.get('type') as QuestionType | null
    const difficulty = searchParams.get('difficulty') as QuestionDifficulty | null
    const subject = searchParams.get('subject')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean)
    const curriculumId = searchParams.get('curriculumId')
    const lessonId = searchParams.get('lessonId')
    const searchQuery = searchParams.get('q')
    const isPublic = searchParams.get('isPublic')
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = {
        tutorId: session.user.id
    }
    
    if (type) where.type = type
    if (difficulty) where.difficulty = difficulty
    if (subject) where.subject = { equals: subject, mode: 'insensitive' }
    if (curriculumId) where.curriculumId = curriculumId
    if (lessonId) where.lessonId = lessonId
    if (isPublic !== null) where.isPublic = isPublic === 'true'
    
    if (tags && tags.length > 0) {
        where.tags = { hasEvery: tags }
    }
    
    if (searchQuery) {
        where.OR = [
            { question: { contains: searchQuery, mode: 'insensitive' } },
            { explanation: { contains: searchQuery, mode: 'insensitive' } },
            { tags: { has: searchQuery } }
        ]
    }
    
    // Fetch questions
    const [questions, totalCount] = await Promise.all([
        db.questionBankItem.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
            skip,
            take: limit
        }),
        db.questionBankItem.count({ where })
    ])
    
    return NextResponse.json({
        questions,
        pagination: {
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        }
    })
}, { role: 'TUTOR' })

// POST /api/tutor/question-bank - Create a new question
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
    const body = await req.json()
    
    const {
        type,
        question,
        options,
        correctAnswer,
        explanation,
        hint,
        points = 1,
        difficulty = 'medium',
        tags = [],
        subject,
        curriculumId,
        lessonId,
        isPublic = false
    } = body
    
    // Validation
    if (!type || !question) {
        throw new ValidationError('Type and question are required')
    }
    
    // Type-specific validation
    if (type === 'multiple_choice' || type === 'multi_select') {
        if (!options || options.length < 2) {
            throw new ValidationError('Multiple choice questions require at least 2 options')
        }
    }
    
    if (type === 'true_false') {
        if (!correctAnswer || (correctAnswer !== 'true' && correctAnswer !== 'false')) {
            throw new ValidationError('True/False questions require correctAnswer to be "true" or "false"')
        }
    }
    
    // Create question
    const newQuestion = await db.questionBankItem.create({
        data: {
            tutorId: session.user.id,
            type,
            question,
            options: options || null,
            correctAnswer: correctAnswer !== undefined ? correctAnswer : null,
            explanation: explanation || null,
            hint: hint || null,
            points: Math.max(1, points),
            difficulty,
            tags,
            subject: subject || null,
            curriculumId: curriculumId || null,
            lessonId: lessonId || null,
            isPublic
        }
    })
    
    return NextResponse.json({ 
        success: true, 
        question: newQuestion 
    }, { status: 201 })
}, { role: 'TUTOR' }))
