/**
 * Validation Schemas
 * Zod schemas for API request validation
 */

import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'
import { ValidationError } from '@/lib/api/middleware'

// ============================================
// User & Authentication Schemas
// ============================================

export const RegisterUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password too long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    role: z.enum(['STUDENT', 'TUTOR', 'ADMIN']),
    tosAccepted: z.boolean().refine(val => val === true, { message: "You must accept the Terms of Service" })
})

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
})

export const UpdateProfileSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    bio: z.string().max(1000).optional(),
    avatarUrl: z.string().url().optional(),
    gradeLevel: z.string().optional(),
    hourlyRate: z.number().min(0).max(10000).optional(),
    subjects: z.array(z.string()).optional()
})

// ============================================
// Class & Live Session Schemas
// ============================================

export const CreateRoomSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100).optional(),
    subject: z.string().min(2, 'Subject must be at least 2 characters').max(50),
    gradeLevel: z.string().optional(),
    maxStudents: z.number().int().min(1).max(500).default(50),
    durationMinutes: z.number().int().min(15).max(480).default(120),
    enableRecording: z.boolean().default(true)
})

export const JoinRoomSchema = z.object({
    sessionId: z.string().cuid('Invalid session ID'),
    userId: z.string().cuid('Invalid user ID')
})

export const CreateBreakoutSchema = z.object({
    parentSessionId: z.string().cuid('Invalid session ID'),
    studentIds: z.array(z.string().cuid()).min(1, 'At least one student required'),
    durationMinutes: z.number().int().min(5).max(120).default(30),
    topic: z.string().max(200).optional()
})

export const SendMessageSchema = z.object({
    sessionId: z.string().cuid('Invalid session ID'),
    content: z.string().min(1, 'Message cannot be empty').max(5000),
    type: z.enum(['text', 'system', 'hint']).default('text')
})

// ============================================
// Task & Assignment Schemas
// ============================================

export const GenerateTaskSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    topics: z.array(z.string()).min(1, 'At least one topic required'),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    count: z.number().int().min(1).max(20).default(5),
    taskTypes: z.array(
        z.enum(['multiple_choice', 'short_answer', 'long_answer', 'coding', 'diagram'])
    ).min(1),
    distributionMode: z.enum(['uniform', 'personalized', 'clustered', 'peer_group']).default('uniform'),
    studentIds: z.array(z.string().cuid()).optional(),
    roomId: z.string().optional()
})

export const SubmitTaskSchema = z.object({
    taskId: z.string().cuid('Invalid task ID'),
    studentId: z.string().cuid('Invalid student ID'),
    answers: z.record(z.string(), z.unknown()),
    timeSpent: z.number().int().min(0),
    questionIndex: z.number().int().min(0).optional()
})

// ============================================
// Curriculum & Learning Schemas
// ============================================

export const CreateCurriculumSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    subject: z.string().min(1).optional(),
    gradeLevel: z.string().max(50).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    estimatedHours: z.number().min(0).max(1000).optional(),
    isLiveOnline: z.boolean().optional()
})

export const EnrollCurriculumSchema = z.object({
    curriculumId: z.string().cuid('Invalid curriculum ID'),
    studentId: z.string().cuid('Invalid student ID')
})

// Tutor course settings (curriculum page)
const ScheduleItemSchema = z.object({
    dayOfWeek: z.string().min(1),
    startTime: z.string().regex(/^\d{1,2}:\d{2}$/, 'Use HH:MM format'),
    durationMinutes: z.number().int().min(5).max(480)
})

export const UpdateCourseSettingsSchema = z.object({
    name: z.string().min(1).max(200).optional().nullable(),
    description: z.string().max(2000).optional().nullable(),
    gradeLevel: z.string().max(50).optional().nullable(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().nullable(),
    languageOfInstruction: z.string().min(1).max(20).optional().nullable(),
    price: z.number().min(0).optional().nullable(),
    currency: z.string().length(3).optional().nullable(),
    curriculumSource: z.enum(['PLATFORM', 'UPLOADED']).optional().nullable(),
    outlineSource: z.enum(['SELF', 'AI']).optional().nullable(),
    schedule: z.array(ScheduleItemSchema).optional().nullable(),
    isLiveOnline: z.boolean().optional().nullable()
})

export const UpdateProgressSchema = z.object({
    lessonId: z.string().cuid('Invalid lesson ID'),
    studentId: z.string().cuid('Invalid student ID'),
    progressPercentage: z.number().min(0).max(100),
    completed: z.boolean().default(false)
})

// ============================================
// AI Tutor Schemas
// ============================================

export const AITutorEnrollSchema = z.object({
    studentId: z.string().cuid('Invalid student ID'),
    subjectCode: z.string().min(1, 'Subject code required'),
    gradeLevel: z.string().optional()
})

export const AITutorQuerySchema = z.object({
    studentId: z.string().cuid('Invalid student ID'),
    query: z.string().min(1, 'Query cannot be empty').max(2000),
    context: z.object({
        lessonId: z.string().cuid().optional(),
        currentTopic: z.string().optional(),
        previousMessages: z.array(z.any()).optional()
    }).optional()
})

// ============================================
// Feedback & Review Schemas
// ============================================

export const GenerateFeedbackSchema = z.object({
    studentId: z.string().cuid('Invalid student ID'),
    submissionId: z.string().cuid('Invalid submission ID'),
    type: z.enum(['task_feedback', 'progress_report', 'encouragement', 'correction']),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
    context: z.object({
        taskId: z.string().cuid().optional(),
        subject: z.string().optional(),
        recentPerformance: z.number().min(0).max(100).optional(),
        strengths: z.array(z.string()).optional(),
        weaknesses: z.array(z.string()).optional(),
        specificIssue: z.string().optional()
    }).optional()
})

export const ReviewFeedbackSchema = z.object({
    workflowId: z.string().cuid('Invalid workflow ID'),
    decision: z.enum(['approve', 'reject', 'modify']),
    modifications: z.object({
        modifiedScore: z.number().min(0).max(100).optional(),
        modifiedComments: z.string().max(2000).optional(),
        addedNotes: z.string().max(1000).optional()
    }).optional()
})

// ============================================
// Analytics & Reporting Schemas
// ============================================

export const AnalyticsQuerySchema = z.object({
    studentId: z.string().cuid('Invalid student ID').optional(),
    classId: z.string().cuid('Invalid class ID').optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    metrics: z.array(
        z.enum(['completion', 'performance', 'engagement', 'attendance'])
    ).optional()
})

// ============================================
// Pagination & Filtering Schemas
// ============================================

export const PaginationSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const FilterSchema = z.object({
    search: z.string().max(200).optional(),
    status: z.string().optional(),
    subject: z.string().optional(),
    gradeLevel: z.string().optional(),
    dateFrom: z.coerce.date().optional(),
    dateTo: z.coerce.date().optional()
})

// Helper function to validate request body

/**
 * Validate request body against a Zod schema
 * Throws ValidationError if validation fails
 */
export async function validateRequest<T extends z.ZodType>(
    req: NextRequest,
    schema: T
): Promise<z.infer<T>> {
    try {
        const body = await req.json()
        return schema.parse(body)
    } catch (error) {
        if (error instanceof z.ZodError) {
            const zodError = error as z.ZodError
            const messages = zodError.issues.map((e: { path: (string | number)[]; message: string }) => `${e.path.join('.')}: ${e.message}`).join(', ')
            throw new ValidationError(messages)
        }
        throw error
    }
}

/**
 * Validate query parameters against a Zod schema
 */
export function validateQuery<T extends z.ZodType>(
    req: NextRequest,
    schema: T
): z.infer<T> {
    try {
        const params = Object.fromEntries(req.nextUrl.searchParams.entries())
        return schema.parse(params)
    } catch (error) {
        if (error instanceof z.ZodError) {
            const zodError = error as z.ZodError
            const messages = zodError.issues.map((e: { path: (string | number)[]; message: string }) => `${e.path.join('.')}: ${e.message}`).join(', ')
            throw new ValidationError(messages)
        }
        throw error
    }
}

// ============================================
// Type exports for use in API routes
// ============================================

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>
export type CreateRoomInput = z.infer<typeof CreateRoomSchema>
export type GenerateTaskInput = z.infer<typeof GenerateTaskSchema>
export type AITutorQueryInput = z.infer<typeof AITutorQuerySchema>
export type AnalyticsQueryInput = z.infer<typeof AnalyticsQuerySchema>
