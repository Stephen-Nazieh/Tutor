import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { course as courseTable } from '@/lib/db/schema'
import { eq, or, and, inArray } from 'drizzle-orm'
import { z } from 'zod'

const PublishCourseSchema = z.object({
  publishVariants: z.boolean().optional().default(true),
})

/**
 * Publish a course and optionally all its variants
 * POST /api/tutor/courses/[id]/publish
 * Body: { publishVariants: boolean }
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: courseId } = await params
    const body = await req.json().catch(() => ({}))
    const parsed = PublishCourseSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 })
    }
    const { publishVariants } = parsed.data

    // Get the course
    const existingCourse = await drizzleDb.query.course.findFirst({
      where: (course, { eq, and }) =>
        and(eq(course.courseId, courseId), eq(course.creatorId, session.user.id)),
    })

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found or access denied' }, { status: 404 })
    }

    const now = new Date()

    // Publish this single course
    // (variant publishing requires parentCourseId/isVariant columns not yet in production)
    const [updated] = await drizzleDb
      .update(courseTable)
      .set({ isPublished: true, updatedAt: now })
      .where(eq(courseTable.courseId, courseId))
      .returning({
        courseId: courseTable.courseId,
        name: courseTable.name,
      })

    return NextResponse.json({
      success: true,
      message: 'Course published successfully',
      courses: [
        {
          id: updated.courseId,
          name: updated.name,
        },
      ],
    })
  } catch (error) {
    console.error('Course publish error:', error)
    return NextResponse.json({ error: 'Failed to publish course' }, { status: 500 })
  }
}

/**
 * Unpublish a course and optionally all its variants
 * DELETE /api/tutor/courses/[id]/publish?variants=true
 */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: courseId } = await params
    const { searchParams } = new URL(req.url)
    const unpublishVariants = searchParams.get('variants') === 'true'

    // Get the course
    const existingCourse = await drizzleDb.query.course.findFirst({
      where: (course, { eq, and }) =>
        and(eq(course.courseId, courseId), eq(course.creatorId, session.user.id)),
    })

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found or access denied' }, { status: 404 })
    }

    const now = new Date()

    // Unpublish this single course
    // (variant unpublishing requires parentCourseId/isVariant columns not yet in production)
    const [updated] = await drizzleDb
      .update(courseTable)
      .set({ isPublished: false, updatedAt: now })
      .where(eq(courseTable.courseId, courseId))
      .returning({
        courseId: courseTable.courseId,
        name: courseTable.name,
      })

    return NextResponse.json({
      success: true,
      message: 'Course unpublished successfully',
      courses: [
        {
          id: updated.courseId,
          name: updated.name,
        },
      ],
    })
  } catch (error) {
    console.error('Course unpublish error:', error)
    return NextResponse.json({ error: 'Failed to unpublish course' }, { status: 500 })
  }
}
