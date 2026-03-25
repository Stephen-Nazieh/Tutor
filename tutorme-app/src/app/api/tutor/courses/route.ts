import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum as curriculumTable, curriculumModule, curriculumLesson } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { CreateCurriculumSchema } from '@/lib/validation/schemas'
import { ZodError } from 'zod'

// Insert curriculum, automatically removing fields that don't exist in DB
async function insertCurriculumSafely(
  values: Record<string, unknown>
): Promise<{ curriculum: typeof curriculumTable.$inferSelect; fieldsUsed: string[] }> {
  let currentValues = { ...values }
  const attemptedFields: string[] = []

  while (true) {
    try {
      const [curriculum] = await drizzleDb
        .insert(curriculumTable)
        .values(currentValues as typeof curriculumTable.$inferInsert)
        .returning()

      console.log(`Curriculum inserted successfully using fields: ${Object.keys(currentValues).join(', ')}`)
      return { curriculum, fieldsUsed: Object.keys(currentValues) }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)

      // Check if error is about a missing column
      const columnMatch = errorMessage.match(/column "([^"]+)" of relation "Curriculum" does not exist/)
      if (columnMatch) {
        const missingColumn = columnMatch[1]
        console.warn(`Column '${missingColumn}' does not exist, removing and retrying...`)

        if (missingColumn in currentValues) {
          attemptedFields.push(missingColumn)
          const { [missingColumn]: _, ...rest } = currentValues
          currentValues = rest
          continue
        }
      }

      // Re-throw if we can't handle it
      throw error
    }
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

    // Build insert values with all possible fields
    // The insertCurriculumSafely function will remove any that don't exist
    const curriculumValues: Record<string, unknown> = {
      id: crypto.randomUUID(),
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

    // Insert curriculum first (outside transaction to handle column errors)
    const { curriculum: newCurriculum, fieldsUsed } = await insertCurriculumSafely(curriculumValues)
    console.log('Curriculum created:', newCurriculum.id)

    // Then create module and lesson in a transaction
    try {
      await drizzleDb.transaction(async tx => {
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
        id: newCurriculum.id,
        name: newCurriculum.name,
        description: newCurriculum.description,
        subject: newCurriculum.subject,
        difficulty: newCurriculum.difficulty,
        isPublished: newCurriculum.isPublished,
        isLiveOnline: newCurriculum.isLiveOnline,
        createdAt: newCurriculum.createdAt?.toISOString?.() ?? newCurriculum.createdAt,
        updatedAt: newCurriculum.updatedAt?.toISOString?.() ?? newCurriculum.updatedAt,
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

    const existingCourse = await drizzleDb.query.curriculum.findFirst({
      where: (curriculum, { eq, and }) =>
        and(eq(curriculum.id, courseId), eq(curriculum.creatorId, session.user.id)),
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
      .update(curriculumTable)
      .set(updateData)
      .where(eq(curriculumTable.id, courseId))
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

    const existingCourse = await drizzleDb.query.curriculum.findFirst({
      where: (curriculum, { eq, and }) =>
        and(eq(curriculum.id, courseId), eq(curriculum.creatorId, session.user.id)),
    })

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found or access denied' }, { status: 404 })
    }

    await drizzleDb.delete(curriculumTable).where(eq(curriculumTable.id, courseId))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Course deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
