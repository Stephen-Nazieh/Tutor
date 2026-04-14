import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { course as courseTable, courseLesson } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { CreateCourseSchema } from '@/lib/validation/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const coursesData = await drizzleDb.query.course.findMany({
      where: (course, { eq }) => eq(course.creatorId, session.user.id),
      orderBy: (course, { desc }) => [desc(course.createdAt)],
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

    // Map courseId to id for frontend compatibility
    const courses = coursesData.map(c => ({
      id: c.courseId,
      name: c.name,
      description: c.description,
      categories: c.categories,
      isPublished: c.isPublished,
      isLiveOnline: c.isLiveOnline,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      region: c.region,
      country: c.country,
      isVariant: c.isVariant,
      parentCourseId: c.parentCourseId,
    }))

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
      data = CreateCourseSchema.parse(body)
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

    // Generate a parent course ID to link all variants
    const parentCourseId = crypto.randomUUID()

    // Determine which countries to create courses for
    const countries = data.countries || []
    const hasGlobal = countries.length === 0 || countries.includes('Global')

    // Create course variants based on countries
    const coursesToCreate: Array<{
      courseId: string
      name: string
      region: string | null
      country: string | null
      isVariant: boolean
    }> = []

    if (hasGlobal) {
      // Create just one course with no country suffix
      coursesToCreate.push({
        courseId: parentCourseId,
        name: data.title,
        region: data.region || 'Global',
        country: null,
        isVariant: false,
      })
    } else {
      // Create a parent course (template) - not published, just for reference
      coursesToCreate.push({
        courseId: parentCourseId,
        name: data.title,
        region: data.region || null,
        country: null,
        isVariant: false,
      })

      // Create a course for each country
      for (const country of countries) {
        coursesToCreate.push({
          courseId: crypto.randomUUID(),
          name: `${data.title} - ${country}`,
          region: data.region || null,
          country: country,
          isVariant: true,
        })
      }
    }

    const createdCourses: Array<{
      id: string
      name: string
      description: string | null
      categories: string[] | null
      isPublished: boolean
      isLiveOnline: boolean
      createdAt: string
      updatedAt: string
      region: string | null
      country: string | null
      isVariant: boolean
      parentCourseId: string | null
    }> = []

    // Create all courses in a transaction
    await drizzleDb.transaction(async tx => {
      for (const courseData of coursesToCreate) {
        // Build insert values with safe defaults
        // Ensure categories is always a proper array
        const categories =
          Array.isArray(data.categories) && data.categories.length > 0
            ? data.categories
            : [data.subject ?? 'general']

        // Ensure schedule is a proper array for jsonb
        const schedule = Array.isArray(data.schedule) && data.schedule.length > 0
          ? data.schedule
          : []

        // Build insert values object with all required defaults
        const insertValues = {
          courseId: courseData.courseId,
          name: courseData.name,
          description: data.description || null,
          isPublished: false,
          isLiveOnline: data.isLiveOnline ?? false,
          isFree: false,
          categories: categories,
          currency: 'USD',
          schedule: schedule,
          createdAt: now,
          updatedAt: now,
          creatorId: userId,
          // Multi-course publishing fields with defaults
          region: courseData.region || 'Global',
          country: courseData.country || null,
          parentCourseId: courseData.isVariant ? parentCourseId : null,
          isVariant: courseData.isVariant ?? false,
          // Optional fields with explicit defaults
          languageOfInstruction: null,
          price: null,
          deletedAt: null,
        }

        console.log('[Course Create] Insert values:', JSON.stringify(insertValues, null, 2))

        // Insert course
        const [newCourse] = await tx
          .insert(courseTable)
          .values(insertValues)
          .returning()

        // Create a default lesson for each course
        await tx.insert(courseLesson).values({
          lessonId: crypto.randomUUID(),
          courseId: newCourse.courseId,
          title: 'Introduction',
          description: 'Introduction to this course.',
          duration: 60,
          order: 0,
          updatedAt: now,
          builderData: {
            isPublished: false,
            duration: 60,
            difficultyMode: 'all',
            variants: {},
            media: { videos: [], images: [] },
            docs: [],
            content: [],
            tasks: [],
            homework: [],
            quizzes: [],
          },
        })

        createdCourses.push({
          id: newCourse.courseId,
          name: newCourse.name,
          description: newCourse.description,
          categories: newCourse.categories,
          isPublished: newCourse.isPublished,
          isLiveOnline: newCourse.isLiveOnline,
          createdAt: newCourse.createdAt?.toISOString?.() ?? newCourse.createdAt,
          updatedAt: newCourse.updatedAt?.toISOString?.() ?? newCourse.updatedAt,
          region: newCourse.region,
          country: newCourse.country,
          isVariant: courseData.isVariant,
          parentCourseId: courseData.isVariant ? parentCourseId : null,
        })

        console.log('Course created:', newCourse.courseId, '-', newCourse.name)
      }
    })

    return NextResponse.json({
      courses: createdCourses,
      parentCourseId,
      message: hasGlobal
        ? 'Course created successfully'
        : `Created ${createdCourses.length - 1} course variants for ${countries.join(', ')}`,
    })
  } catch (error) {
    console.error('Course creation error:', error)

    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      })
    }

    // Extract more details from database errors
    const dbError = error as { 
      message?: string; 
      code?: string; 
      detail?: string; 
      hint?: string;
      stack?: string;
    }
    
    const errorMessage = dbError.message || 'Failed to create course'
    const errorCode = dbError.code || 'UNKNOWN'
    const errorDetail = dbError.detail || ''

    return NextResponse.json(
      { 
        error: errorMessage, 
        code: errorCode,
        detail: errorDetail,
        fullError: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      },
      { status: 500 }
    )
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
