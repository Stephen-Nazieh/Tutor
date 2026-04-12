import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { eq, or, and } from 'drizzle-orm'

/**
 * Get all variants of a course
 * GET /api/tutor/courses/[id]/variants
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: courseId } = await params

    // Get the course to determine if it's a parent or variant
    const course = await drizzleDb.query.course.findFirst({
      where: (c, { eq }) => eq(c.courseId, courseId),
      columns: {
        courseId: true,
        parentCourseId: true,
        isVariant: true,
      },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Determine the parent course ID
    const parentId = course.isVariant ? course.parentCourseId : course.courseId

    if (!parentId) {
      // This is a standalone course with no variants
      return NextResponse.json({
        parentCourse: course,
        variants: [],
      })
    }

    // Get the parent course and all its variants
    const allCourses = await drizzleDb.query.course.findMany({
      where: (c, { eq, and, or }) =>
        and(
          eq(c.creatorId, session.user.id),
          or(
            eq(c.courseId, parentId),
            eq(c.parentCourseId, parentId)
          )
        ),
      orderBy: (c, { asc }) => [asc(c.country)],
      columns: {
        courseId: true,
        name: true,
        description: true,
        categories: true,
        isPublished: true,
        isLiveOnline: true,
        createdAt: true,
        updatedAt: true,
        region: true,
        country: true,
        isVariant: true,
        parentCourseId: true,
      },
    })

    const parentCourse = allCourses.find(c => c.courseId === parentId)
    const variants = allCourses.filter(c => c.courseId !== parentId)

    return NextResponse.json({
      parentCourse: parentCourse || null,
      variants: variants.map(v => ({
        id: v.courseId,
        name: v.name,
        description: v.description,
        categories: v.categories,
        isPublished: v.isPublished,
        isLiveOnline: v.isLiveOnline,
        createdAt: v.createdAt,
        updatedAt: v.updatedAt,
        region: v.region,
        country: v.country,
        isVariant: v.isVariant,
        parentCourseId: v.parentCourseId,
      })),
    })
  } catch (error) {
    console.error('Get course variants error:', error)
    return NextResponse.json({ error: 'Failed to fetch course variants' }, { status: 500 })
  }
}
