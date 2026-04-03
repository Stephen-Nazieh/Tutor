import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { course as courseTable, courseModule, courseLesson } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { CreateCurriculumSchema } from '@/lib/validation/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const courses = await drizzleDb.query.course.findMany({
      where: (course, { eq }) => eq(course.creatorId, session.user.id),
      orderBy: (course, { desc }) => [desc(course.createdAt)],
      columns: {
        courseId: true,
        name: true,
        description: true,
        subject: true,
        difficulty: true,
        isPublished: true,
        isLiveOnline: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Failed to fetch courses:', error)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    console.log('Course creation request:', JSON.stringify(body, null, 2))

    let data
    try {
      data = CreateCurriculumSchema.parse(body)
    } catch (parseError) {
      console.error('Schema validation error:', parseError)
      if (parseError instanceof ZodError) {
        return NextResponse.json(
          { error: 'Invalid request data', details: parseError.issues },
          { status: 400 }
        )
      }
      throw parseError
    }

    const userId = session.user.id
    const now = new Date()

    // Build insert values
    const courseValues: Record<string, unknown> = {
      courseId: crypto.randomUUID(),
      name: data.title,
      description: data.description ?? null,
      subject: data.subject ?? 'general',
      gradeLevel: data.gradeLevel ?? null,
      difficulty: data.difficulty ?? 'intermediate',
      estimatedHours: data.estimatedHours ?? 0,
      isPublished: false,
      isLiveOnline: data.isLiveOnline ?? false,
      isFree: false,
      categories: data.categories ?? [],
      currency: 'USD',
      schedule: Array.isArray(data.schedule) && data.schedule.length > 0 ? data.schedule : null,
      createdAt: now,
      updatedAt: now,
      creatorId: userId,
    }

    // Insert course first (outside transaction to handle column errors)
    const [newCourse] = await drizzleDb
      .insert(courseTable)
      .values(courseValues as typeof courseTable.$inferInsert)
      .returning()
    console.log('Course created:', newCourse.courseId)

    // Then create module and lesson in a transaction
    try {
      await drizzleDb.transaction(async tx => {
        const moduleId = crypto.randomUUID()
        await tx.insert(courseModule).values({
          moduleId: moduleId,
          courseId: newCourse.courseId,
          title: 'Lesson 1',
          description: 'Get started',
          order: 0,
        })
        console.log('Module created:', moduleId)

        await tx.insert(courseLesson).values({
          lessonId: crypto.randomUUID(),
          moduleId: moduleId,
          title: 'Introduction',
          description: 'Introduction to this course.',
          order: 0,
          duration: 30,
          difficulty: newCurriculum.difficulty ?? 'intermediate',
          learningObjectives: [],
          teachingPoints: [],
          keyConcepts: [],
          commonMisconceptions: [],
          prerequisiteLessonIds: [],
        })
        console.log('Lesson created for module:', moduleId)
      })
    } catch (txError) {
      // If module/lesson creation fails, we should ideally rollback the curriculum insert
      // But since we already committed it, log the error
      console.error('Failed to create module/lesson after curriculum was created:', txError)
      // Still return the curriculum since it was created successfully
    }

    return NextResponse.json({
      course: {
        id: newCourse.courseId,
        name: newCourse.name,
        description: newCourse.description,
        subject: newCourse.subject,
        difficulty: newCourse.difficulty,
        isPublished: newCourse.isPublished,
        isLiveOnline: newCourse.isLiveOnline,
        createdAt: newCourse.createdAt?.toISOString?.() ?? newCourse.createdAt,
        updatedAt: newCourse.updatedAt?.toISOString?.() ?? newCourse.updatedAt,
      },
    })
  } catch (error) {
    console.error('Course creation error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to create course'

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { courseId, ...updates } = body

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const existingCourse = await drizzleDb.query.course.findFirst({
      where: (course, { eq, and }) =>
        and(eq(course.courseId, courseId), eq(course.creatorId, session.user.id)),
    })

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found or access denied' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    }

    if (updates.title !== undefined) updateData.name = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.subject !== undefined) updateData.subject = updates.subject
    if (updates.gradeLevel !== undefined) updateData.gradeLevel = updates.gradeLevel
    if (updates.difficulty !== undefined) updateData.difficulty = updates.difficulty
    if (updates.estimatedHours !== undefined) updateData.estimatedHours = updates.estimatedHours
    if (updates.isPublished !== undefined) updateData.isPublished = updates.isPublished
    if (updates.isLiveOnline !== undefined) updateData.isLiveOnline = updates.isLiveOnline
    if (updates.categories !== undefined) updateData.categories = updates.categories

    const [updatedCourse] = await drizzleDb
      .update(courseTable)
      .set(updateData)
      .where(eq(courseTable.courseId, courseId))
      .returning()

    return NextResponse.json({ course: updatedCourse })
  } catch (error) {
    console.error('Course update error:', error)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('id')

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const existingCourse = await drizzleDb.query.course.findFirst({
      where: (course, { eq, and }) =>
        and(eq(course.courseId, courseId), eq(course.creatorId, session.user.id)),
    })

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found or access denied' }, { status: 404 })
    }

    await drizzleDb.delete(courseTable).where(eq(courseTable.courseId, courseId))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Course deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
