import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum as curriculumTable, curriculumModule, curriculumLesson } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { CreateCurriculumSchema } from '@/lib/validation/schemas'
import { ZodError } from 'zod'
// import { generateCourseOutline } from '@/lib/ai/course-outline'

// Helper function to check if a column exists in the Curriculum table
async function checkColumnExists(columnName: string): Promise<boolean> {
  try {
    const result = await drizzleDb.execute(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'Curriculum' AND column_name = '${columnName}'
    `)
    return (result.rows?.length ?? 0) > 0
  } catch {
    return false
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only fetch courses where this user is the creator
    const courses = await drizzleDb.query.curriculum.findMany({
      where: (curriculum, { eq }) => eq(curriculum.creatorId, session.user.id),
      orderBy: (curriculum, { desc }) => [desc(curriculum.createdAt)],
      columns: {
        id: true,
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
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
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
    const defaultCurrency = 'USD'

    // Check which columns exist in the database
    const [hasCategories, hasCurrency, hasSchedule, hasIsLiveOnline, hasIsFree, hasDifficulty, hasEstimatedHours] = await Promise.all([
      checkColumnExists('categories'),
      checkColumnExists('currency'),
      checkColumnExists('schedule'),
      checkColumnExists('isLiveOnline'),
      checkColumnExists('isFree'),
      checkColumnExists('difficulty'),
      checkColumnExists('estimatedHours'),
    ])

    console.log('Column existence check:', {
      hasCategories,
      hasCurrency,
      hasSchedule,
      hasIsLiveOnline,
      hasIsFree,
      hasDifficulty,
      hasEstimatedHours,
    })

    const schedule =
      Array.isArray(data.schedule) && data.schedule.length > 0 ? data.schedule : null
    const now = new Date()

    const result = await drizzleDb.transaction(async tx => {
      const curriculumId = crypto.randomUUID()

      // Build insert values dynamically based on column existence
      const insertValues: Record<string, unknown> = {
        id: curriculumId,
        name: data.title,
        description: data.description ?? null,
        subject: data.subject ?? 'general',
        gradeLevel: data.gradeLevel ?? null,
        isPublished: false,
        createdAt: now,
        updatedAt: now,
        creatorId: userId ?? null,
      }

      // Only add these fields if columns exist
      if (hasDifficulty) {
        insertValues.difficulty = data.difficulty ?? 'intermediate'
      }
      if (hasEstimatedHours) {
        insertValues.estimatedHours = data.estimatedHours ?? 0
      }
      if (hasIsLiveOnline) {
        insertValues.isLiveOnline = data.isLiveOnline ?? false
      }
      if (hasIsFree) {
        insertValues.isFree = false
      }
      if (hasCategories) {
        insertValues.categories = data.categories ?? []
      }
      if (hasCurrency) {
        insertValues.currency = defaultCurrency
      }
      if (hasSchedule) {
        insertValues.schedule = schedule
      }

      console.log('Inserting curriculum with values:', JSON.stringify(insertValues, null, 2))

      let newCurriculum
      try {
        ;[newCurriculum] = await tx.insert(curriculumTable).values(insertValues as typeof curriculumTable.$inferInsert).returning()
        console.log('Curriculum created successfully:', newCurriculum.id)
      } catch (insertError) {
        console.error('Curriculum insert error:', insertError)
        // Try minimal insert without optional fields
        // Note: difficulty, estimatedHours, and isLiveOnline are required by the schema
        const minimalValues: Record<string, unknown> = {
          id: curriculumId,
          name: data.title,
          description: data.description ?? null,
          subject: data.subject ?? 'general',
          gradeLevel: data.gradeLevel ?? null,
          isPublished: false,
          createdAt: now,
          updatedAt: now,
          creatorId: userId ?? null,
        }
        // Add required fields if columns exist
        if (hasDifficulty) {
          minimalValues.difficulty = data.difficulty ?? 'intermediate'
        }
        if (hasEstimatedHours) {
          minimalValues.estimatedHours = data.estimatedHours ?? 0
        }
        if (hasIsLiveOnline) {
          minimalValues.isLiveOnline = data.isLiveOnline ?? false
        }
        if (hasIsFree) {
          minimalValues.isFree = false
        }
        console.log('Retrying with minimal values:', JSON.stringify(minimalValues, null, 2))
        ;[newCurriculum] = await tx.insert(curriculumTable).values(minimalValues as typeof curriculumTable.$inferInsert).returning()
        console.log('Curriculum created with minimal values:', newCurriculum.id)
      }

      const moduleId = crypto.randomUUID()
      await tx.insert(curriculumModule).values({
        id: moduleId,
        curriculumId: newCurriculum.id,
        title: 'Lesson 1',
        description: 'Get started',
        order: 0,
      })
      console.log('Module created:', moduleId)

      await tx.insert(curriculumLesson).values({
        id: crypto.randomUUID(),
        moduleId: moduleId,
        title: 'Introduction',
        description: 'Introduction to this course.',
        order: 0,
        duration: 30,
        difficulty: hasDifficulty ? (newCurriculum.difficulty ?? 'intermediate') : 'intermediate',
        learningObjectives: [],
        teachingPoints: [],
        keyConcepts: [],
        commonMisconceptions: [],
        prerequisiteLessonIds: [],
      })
      console.log('Lesson created for module:', moduleId)

      return newCurriculum
    })

    return NextResponse.json({
      course: {
        id: result.id,
        name: result.name,
        description: result.description,
        subject: result.subject,
        difficulty: result.difficulty,
        isPublished: result.isPublished,
        isLiveOnline: result.isLiveOnline,
        createdAt: result.createdAt?.toISOString?.() ?? result.createdAt,
        updatedAt: result.updatedAt?.toISOString?.() ?? result.updatedAt,
      },
    })
  } catch (error) {
    console.error('Course creation error:', error)
    
    // Provide more detailed error information
    let errorMessage = 'Failed to create course'
    let errorDetails = null
    
    if (error instanceof Error) {
      errorMessage = error.message
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails,
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

    // First verify this user owns the course
    const existingCourse = await drizzleDb.query.curriculum.findFirst({
      where: (curriculum, { eq, and }) =>
        and(
          eq(curriculum.id, courseId),
          eq(curriculum.creatorId, session.user.id)
        ),
    })

    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found or access denied' },
        { status: 404 }
      )
    }

    // Build update object with only allowed fields
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
      .update(curriculumTable)
      .set(updateData)
      .where(eq(curriculumTable.id, courseId))
      .returning()

    return NextResponse.json({ course: updatedCourse })
  } catch (error) {
    console.error('Course update error:', error)
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
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

    // Verify ownership before deleting
    const existingCourse = await drizzleDb.query.curriculum.findFirst({
      where: (curriculum, { eq, and }) =>
        and(
          eq(curriculum.id, courseId),
          eq(curriculum.creatorId, session.user.id)
        ),
    })

    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found or access denied' },
        { status: 404 }
      )
    }

    await drizzleDb.delete(curriculumTable).where(eq(curriculumTable.id, courseId))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Course deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
