import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseLesson } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

// GET /api/tutor/courses/[id] - Get a single course with lessons
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions, req)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const userId = session.user.id

    // Fetch course with lessons
    const courseData = await drizzleDb
      .select({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
        isPublished: course.isPublished,
        languageOfInstruction: course.languageOfInstruction,
        price: course.price,
        currency: course.currency,
        isFree: course.isFree,
        schedule: course.schedule,
        categories: course.categories,
        creatorId: course.creatorId,
      })
      .from(course)
      .where(and(eq(course.courseId, id), eq(course.creatorId, userId)))
      .limit(1)

    if (courseData.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Fetch lessons for this course
    const lessons = await drizzleDb
      .select({
        lessonId: courseLesson.lessonId,
        title: courseLesson.title,
        description: courseLesson.description,
        order: courseLesson.order,
        duration: courseLesson.duration,
        builderData: courseLesson.builderData,
      })
      .from(courseLesson)
      .where(eq(courseLesson.courseId, id))
      .orderBy(courseLesson.order)

    const courseRow = courseData[0]

    // Transform to expected format
    const responseCourse = {
      id: courseRow.courseId,
      name: courseRow.name,
      description: courseRow.description,
      isPublished: courseRow.isPublished,
      languageOfInstruction: courseRow.languageOfInstruction,
      price: courseRow.price,
      currency: courseRow.currency,
      isFree: courseRow.isFree ?? false,
      schedule: courseRow.schedule || [],
      categories: courseRow.categories || [],
      // Group lessons into a single module for compatibility
      modules: [
        {
          id: 'default-module',
          title: 'Course Content',
          description: null,
          order: 0,
          lessons: lessons.map(l => ({
            id: l.lessonId,
            title: l.title,
            description: l.description,
            order: l.order,
            duration: l.duration,
          })),
        },
      ],
      studentCount: 0, // Will be populated separately if needed
    }

    return NextResponse.json({ course: responseCourse })
  } catch (error) {
    console.error('[GET /api/tutor/courses/[id]] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 })
  }
}

// PATCH /api/tutor/courses/[id] - Update course details
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions, req)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const userId = session.user.id
    const body = await req.json()

    // Verify ownership
    const existingCourse = await drizzleDb
      .select({ courseId: course.courseId })
      .from(course)
      .where(and(eq(course.courseId, id), eq(course.creatorId, userId)))
      .limit(1)

    if (existingCourse.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {}

    // Name is required - don't allow null/empty
    if (body.name !== undefined && body.name !== null && body.name.trim() !== '') {
      updateData.name = body.name.trim()
    }
    if (body.description !== undefined) updateData.description = body.description
    if (body.languageOfInstruction !== undefined)
      updateData.languageOfInstruction = body.languageOfInstruction
    if (body.price !== undefined) updateData.price = body.price
    if (body.currency !== undefined) updateData.currency = body.currency
    if (body.isFree !== undefined) updateData.isFree = body.isFree
    if (body.isPublished !== undefined) updateData.isPublished = body.isPublished
    if (body.categories !== undefined) updateData.categories = body.categories
    if (body.schedule !== undefined) updateData.schedule = body.schedule

    // Update the course
    await drizzleDb.update(course).set(updateData).where(eq(course.courseId, id))

    // Fetch updated course
    const updatedCourse = await drizzleDb
      .select({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
        isPublished: course.isPublished,
        languageOfInstruction: course.languageOfInstruction,
        price: course.price,
        currency: course.currency,
        isFree: course.isFree,
        schedule: course.schedule,
        categories: course.categories,
      })
      .from(course)
      .where(eq(course.courseId, id))
      .limit(1)

    return NextResponse.json({
      message: 'Course updated successfully',
      course: updatedCourse[0],
    })
  } catch (error) {
    console.error('[PATCH /api/tutor/courses/[id]] Error:', error)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

// DELETE /api/tutor/courses/[id] - Delete a course
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions, req)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const userId = session.user.id

    // Verify ownership
    const existingCourse = await drizzleDb
      .select({ courseId: course.courseId })
      .from(course)
      .where(and(eq(course.courseId, id), eq(course.creatorId, userId)))
      .limit(1)

    if (existingCourse.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Delete the course (cascade will handle lessons)
    await drizzleDb.delete(course).where(eq(course.courseId, id))

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('[DELETE /api/tutor/courses/[id]] Error:', error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
