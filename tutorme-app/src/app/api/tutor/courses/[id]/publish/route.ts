import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseLesson, courseVariant } from '@/lib/db/schema'
import { eq, and, inArray } from 'drizzle-orm'
import crypto from 'crypto'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions, req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id: templateCourseId } = await params
  const userId = session.user.id
  const body = await req.json().catch(() => ({}))

  const countries: string[] = Array.isArray(body.countries)
    ? body.countries.filter((c: unknown) => typeof c === 'string')
    : []
  const categories: string[] = Array.isArray(body.categories)
    ? body.categories.filter((c: unknown) => typeof c === 'string')
    : []

  if (countries.length === 0) {
    return NextResponse.json({ error: 'Select at least one nationality/country' }, { status: 400 })
  }
  if (categories.length === 0) {
    return NextResponse.json({ error: 'Select at least one category' }, { status: 400 })
  }

  try {
    // Verify ownership of the template course
    const [templateCourse] = await drizzleDb
      .select({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
        price: course.price,
        currency: course.currency,
        isFree: course.isFree,
        schedule: course.schedule,
        languageOfInstruction: course.languageOfInstruction,
        creatorId: course.creatorId,
        isLiveOnline: course.isLiveOnline,
      })
      .from(course)
      .where(and(eq(course.courseId, templateCourseId), eq(course.creatorId, userId)))
      .limit(1)

    if (!templateCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Load lessons from the template course
    const templateLessons = await drizzleDb
      .select({
        lessonId: courseLesson.lessonId,
        title: courseLesson.title,
        description: courseLesson.description,
        duration: courseLesson.duration,
        order: courseLesson.order,
        builderData: courseLesson.builderData,
      })
      .from(courseLesson)
      .where(eq(courseLesson.courseId, templateCourseId))
      .orderBy(courseLesson.order)

    const now = new Date()
    const publishedCourses: Array<{
      courseId: string
      name: string
      nationality: string
      category: string
    }> = []

    await drizzleDb.transaction(async tx => {
      // Find existing variants for this template
      const existingVariants = await tx
        .select({ publishedCourseId: courseVariant.publishedCourseId })
        .from(courseVariant)
        .where(eq(courseVariant.templateCourseId, templateCourseId))

      const existingPublishedIds = existingVariants.map(v => v.publishedCourseId)

      // Delete existing published courses (variants) and their lessons
      if (existingPublishedIds.length > 0) {
        await tx.delete(courseLesson).where(inArray(courseLesson.courseId, existingPublishedIds))
        await tx.delete(course).where(inArray(course.courseId, existingPublishedIds))
        await tx.delete(courseVariant).where(eq(courseVariant.templateCourseId, templateCourseId))
      }

      // Create a published course for each (category × country) combination
      for (const category of categories) {
        for (const country of countries) {
          const publishedCourseId = crypto.randomUUID()
          const courseName = `${category} - ${country}`

          await tx.insert(course).values({
            courseId: publishedCourseId,
            name: courseName,
            description: templateCourse.description,
            categories: [category],
            isPublished: true,
            createdAt: now,
            updatedAt: now,
            creatorId: userId,
            isLiveOnline: templateCourse.isLiveOnline ?? false,
            languageOfInstruction: templateCourse.languageOfInstruction,
            price: templateCourse.price,
            currency: templateCourse.currency,
            isFree: templateCourse.isFree ?? false,
            schedule: templateCourse.schedule,
          })

          // Copy lessons
          for (const lesson of templateLessons) {
            await tx.insert(courseLesson).values({
              lessonId: crypto.randomUUID(),
              courseId: publishedCourseId,
              title: lesson.title,
              description: lesson.description,
              duration: lesson.duration ?? 60,
              order: lesson.order,
              builderData: lesson.builderData,
              createdAt: now,
              updatedAt: now,
            })
          }

          // Track the variant
          await tx.insert(courseVariant).values({
            variantId: crypto.randomUUID(),
            templateCourseId,
            publishedCourseId,
            nationality: country,
            category,
            createdAt: now,
            updatedAt: now,
          })

          publishedCourses.push({
            courseId: publishedCourseId,
            name: courseName,
            nationality: country,
            category,
          })
        }
      }
    })

    return NextResponse.json({
      success: true,
      publishedCount: publishedCourses.length,
      courses: publishedCourses,
    })
  } catch (error: any) {
    console.error('[POST /api/tutor/courses/[id]/publish] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to publish course' },
      { status: 500 }
    )
  }
}

// Unpublish: delete all published variants for this template
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions, req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id: templateCourseId } = await params
  const userId = session.user.id

  try {
    // Verify ownership
    const [templateCourse] = await drizzleDb
      .select({ courseId: course.courseId })
      .from(course)
      .where(and(eq(course.courseId, templateCourseId), eq(course.creatorId, userId)))
      .limit(1)

    if (!templateCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const existingVariants = await drizzleDb
      .select({ publishedCourseId: courseVariant.publishedCourseId })
      .from(courseVariant)
      .where(eq(courseVariant.templateCourseId, templateCourseId))

    const existingPublishedIds = existingVariants.map(v => v.publishedCourseId)

    if (existingPublishedIds.length > 0) {
      await drizzleDb
        .delete(courseLesson)
        .where(inArray(courseLesson.courseId, existingPublishedIds))
      await drizzleDb.delete(course).where(inArray(course.courseId, existingPublishedIds))
      await drizzleDb
        .delete(courseVariant)
        .where(eq(courseVariant.templateCourseId, templateCourseId))
    }

    return NextResponse.json({
      success: true,
      message: 'Course unpublished and variants removed',
    })
  } catch (error: any) {
    console.error('[DELETE /api/tutor/courses/[id]/publish] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to unpublish course' },
      { status: 500 }
    )
  }
}
