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

    // If this is a parent course and publishVariants is true, publish all variants
    if (!existingCourse.isVariant && publishVariants && existingCourse.parentCourseId === null) {
      // This is a parent course - publish it and all its variants
      const coursesToPublish = await drizzleDb.query.course.findMany({
        where: (course, { eq, and, or }) =>
          and(
            eq(course.creatorId, session.user.id),
            or(eq(course.courseId, courseId), eq(course.parentCourseId, courseId))
          ),
      })

      const courseIdsToPublish = coursesToPublish.map(c => c.courseId)

      if (courseIdsToPublish.length > 0) {
        const updatedCourses = await drizzleDb
          .update(courseTable)
          .set({ isPublished: true, updatedAt: now })
          .where(inArray(courseTable.courseId, courseIdsToPublish))
          .returning()

        const publishedCourses = updatedCourses.map(updated => ({
          id: updated.courseId,
          name: updated.name,
          country: updated.country,
          isVariant: updated.isVariant,
        }))

        return NextResponse.json({
          success: true,
          message: `Published ${publishedCourses.length} course(s)`,
          courses: publishedCourses,
        })
      }
      return NextResponse.json({ success: true, message: 'No courses to publish', courses: [] })
    } else {
      // Just publish this single course
      const [updated] = await drizzleDb
        .update(courseTable)
        .set({ isPublished: true, updatedAt: now })
        .where(eq(courseTable.courseId, courseId))
        .returning()

      return NextResponse.json({
        success: true,
        message: 'Course published successfully',
        courses: [
          {
            id: updated.courseId,
            name: updated.name,
            country: updated.country,
            isVariant: updated.isVariant,
          },
        ],
      })
    }
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
    const unpublishedCourses = []

    // If this is a parent course and unpublishVariants is true, unpublish all variants
    if (!existingCourse.isVariant && unpublishVariants && existingCourse.parentCourseId === null) {
      // This is a parent course - unpublish it and all its variants
      const coursesToUnpublish = await drizzleDb.query.course.findMany({
        where: (course, { eq, and, or }) =>
          and(
            eq(course.creatorId, session.user.id),
            or(eq(course.courseId, courseId), eq(course.parentCourseId, courseId))
          ),
      })

      for (const course of coursesToUnpublish) {
        const [updated] = await drizzleDb
          .update(courseTable)
          .set({ isPublished: false, updatedAt: now })
          .where(eq(courseTable.courseId, course.courseId))
          .returning()

        unpublishedCourses.push({
          id: updated.courseId,
          name: updated.name,
          country: updated.country,
        })
      }

      return NextResponse.json({
        success: true,
        message: `Unpublished ${unpublishedCourses.length} course(s)`,
        courses: unpublishedCourses,
      })
    } else {
      // Just unpublish this single course
      const [updated] = await drizzleDb
        .update(courseTable)
        .set({ isPublished: false, updatedAt: now })
        .where(eq(courseTable.courseId, courseId))
        .returning()

      return NextResponse.json({
        success: true,
        message: 'Course unpublished successfully',
        courses: [
          {
            id: updated.courseId,
            name: updated.name,
            country: updated.country,
          },
        ],
      })
    }
  } catch (error) {
    console.error('Course unpublish error:', error)
    return NextResponse.json({ error: 'Failed to unpublish course' }, { status: 500 })
  }
}
