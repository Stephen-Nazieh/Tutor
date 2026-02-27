// @ts-nocheck
/**
 * Quiz Assignment API
 *
 * POST /api/tutor/quizzes/[id]/assign - Assign quiz to students/groups
 * GET /api/tutor/quizzes/[id]/assign - Get assignments for this quiz
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { quiz, quizAssignment } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { randomUUID } from 'crypto'

// GET /api/tutor/quizzes/[id]/assign - Get assignments for this quiz
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context.params
  const { id } = params

  const quizRows = await drizzleDb
    .select()
    .from(quiz)
    .where(and(eq(quiz.id, id), eq(quiz.tutorId, session.user.id)))
    .limit(1)

  if (!quizRows[0]) {
    throw new NotFoundError('Quiz not found')
  }

  const assignments = await drizzleDb
    .select()
    .from(quizAssignment)
    .where(eq(quizAssignment.quizId, id))
    .orderBy(desc(quizAssignment.assignedAt))

  return NextResponse.json({ assignments })
}, { role: 'TUTOR' })

// POST /api/tutor/quizzes/[id]/assign - Assign quiz to students/groups
export const POST = withCsrf(
  withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params

    const quizRows = await drizzleDb
      .select()
      .from(quiz)
      .where(and(eq(quiz.id, id), eq(quiz.tutorId, session.user.id)))
      .limit(1)

    const quizRow = quizRows[0]
    if (!quizRow) {
      throw new NotFoundError('Quiz not found')
    }

    const body = await req.json()
    const {
      assignedToType,
      assignedToId,
      assignedToAll = false,
      dueDate,
    } = body

    if (!assignedToType) {
      throw new ValidationError('assignedToType is required')
    }
    if (!assignedToAll && !assignedToId) {
      throw new ValidationError('Either assignedToId or assignedToAll must be provided')
    }

    const existingRows = await drizzleDb
      .select()
      .from(quizAssignment)
      .where(
        and(
          eq(quizAssignment.quizId, id),
          eq(quizAssignment.assignedToType, assignedToType),
          eq(quizAssignment.assignedToId, assignedToId || null),
          eq(quizAssignment.assignedToAll, assignedToAll),
          eq(quizAssignment.isActive, true)
        )
      )
      .limit(1)

    const existingAssignment = existingRows[0]

    if (existingAssignment) {
      const [updated] = await drizzleDb
        .update(quizAssignment)
        .set({
          dueDate: dueDate ? new Date(dueDate) : null,
          assignedAt: new Date(),
        })
        .where(eq(quizAssignment.id, existingAssignment.id))
        .returning()
      return NextResponse.json({
        success: true,
        assignment: updated,
        message: 'Assignment updated',
      })
    }

    const [assignment] = await drizzleDb
      .insert(quizAssignment)
      .values({
        id: randomUUID(),
        quizId: id,
        assignedByTutorId: session.user.id,
        assignedToType,
        assignedToId: assignedToId || null,
        assignedToAll,
        dueDate: dueDate ? new Date(dueDate) : null,
        isActive: true,
      })
      .returning()

    if (quizRow.status === 'draft') {
      await drizzleDb.update(quiz).set({ status: 'published' }).where(eq(quiz.id, id))
    }

    return NextResponse.json(
      {
        success: true,
        assignment,
        message: 'Quiz assigned successfully',
      },
      { status: 201 }
    )
  }, { role: 'TUTOR' })
)

// DELETE /api/tutor/quizzes/[id]/assign - Remove assignment
export const DELETE = withCsrf(
  withAuth(async (req: NextRequest, session, context) => {
    const params = await context.params
    const { id } = params

    const quizRows = await drizzleDb
      .select()
      .from(quiz)
      .where(and(eq(quiz.id, id), eq(quiz.tutorId, session.user.id)))
      .limit(1)

    if (!quizRows[0]) {
      throw new NotFoundError('Quiz not found')
    }

    const { searchParams } = new URL(req.url)
    const assignmentId = searchParams.get('assignmentId')

    if (!assignmentId) {
      throw new ValidationError('assignmentId is required')
    }

    const assignmentRows = await drizzleDb
      .select()
      .from(quizAssignment)
      .where(and(eq(quizAssignment.id, assignmentId), eq(quizAssignment.quizId, id)))
      .limit(1)

    const assignment = assignmentRows[0]
    if (!assignment) {
      throw new NotFoundError('Assignment not found')
    }

    await drizzleDb
      .update(quizAssignment)
      .set({ isActive: false })
      .where(eq(quizAssignment.id, assignmentId))

    return NextResponse.json({
      success: true,
      message: 'Assignment deactivated',
    })
  }, { role: 'TUTOR' })
)
