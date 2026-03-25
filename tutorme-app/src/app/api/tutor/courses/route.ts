import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum as curriculumTable, curriculumModule, curriculumLesson } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { CreateCurriculumSchema } from '@/lib/validation/schemas'
import { ZodError } from 'zod'

// Type for curriculum insert values
type CurriculumInsertValues = Record<string, unknown>

// List of optional columns that might not exist in older databases
const OPTIONAL_COLUMNS = [
  'categories',
  'currency',
  'schedule',
  'isLiveOnline',
  'isFree',
  'difficulty',
  'estimatedHours',
  'languageOfInstruction',
  'price',
  'curriculumSource',
  'outlineSource',
  'courseMaterials',
  'coursePitch',
]

// Build base insert values without optional fields
function buildBaseValues(
  data: {
    title: string
    description?: string
    subject?: string
    gradeLevel?: string
  },
  userId: string
): CurriculumInsertValues {
  const now = new Date()
  return {
    id: crypto.randomUUID(),
    name: data.title,
    description: data.description ?? null,
    subject: data.subject ?? 'general',
    gradeLevel: data.gradeLevel ?? null,
    isPublished: false,
    createdAt: now,
    updatedAt: now,
    creatorId: userId ?? null,
  }
}

// Add optional fields to values
function addOptionalFields(
  baseValues: CurriculumInsertValues,
  data: {
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    estimatedHours?: number
    isLiveOnline?: boolean
    categories?: string[]
    schedule?: unknown[]
  },
  defaultCurrency: string,
  schedule: unknown[] | null
): CurriculumInsertValues {
  return {
    ...baseValues,
    difficulty: data.difficulty ?? 'intermediate',
    estimatedHours: data.estimatedHours ?? 0,
    isLiveOnline: data.isLiveOnline ?? false,
    isFree: false,
    categories: data.categories ?? [],
    currency: defaultCurrency,
    schedule,
  }
}

// Try to insert curriculum, removing problematic fields on error
async function tryInsertCurriculum(
  tx: Parameters<Parameters<typeof drizzleDb.transaction>[0]>[0],
  values: CurriculumInsertValues
): Promise<{ curriculum: typeof curriculumTable.$inferSelect; usedFields: string[] }> {
  let currentValues = { ...values }
  let excludedFields: string[] = []

  while (true) {
    try {
      const [curriculum] = await tx
        .insert(curriculumTable)
        .values(currentValues as typeof curriculumTable.$inferInsert)
        .returning()

      const usedFields = Object.keys(currentValues)
      if (excludedFields.length > 0) {
        console.log(`Insert succeeded after excluding fields: ${excludedFields.join(', ')}`)
      }
      return { curriculum, usedFields }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)

      // Check if error is about a missing column
      const columnMatch = errorMessage.match(
        /column "([^"]+)" of relation "Curriculum" does not exist/
      )
      if (columnMatch) {
        const missingColumn = columnMatch[1]
        console.warn(`Column '${missingColumn}' does not exist, removing from insert`)

        if (missingColumn in currentValues) {
          excludedFields.push(missingColumn)
          const { [missingColumn]: _, ...rest } = currentValues
          currentValues = rest
          continue
        }
      }

      // Check for other common column-related errors
      if (
        errorMessage.includes('does not exist') ||
        errorMessage.includes('column') ||
        errorMessage.includes('field')
      ) {
        console.error('Column-related error:', errorMessage)
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
    const defaultCurrency = 'USD'

    const schedule = Array.isArray(data.schedule) && data.schedule.length > 0 ? data.schedule : null

    // Build full insert values (will remove problematic fields automatically)
    const baseValues = buildBaseValues(data, userId)
    const fullValues = addOptionalFields(baseValues, data, defaultCurrency, schedule)

    console.log('Attempting curriculum insert with fields:', Object.keys(fullValues).join(', '))

    // Start transaction for course + module + lesson creation
    const result = await drizzleDb.transaction(async tx => {
      // Insert curriculum with automatic field removal on error
      const { curriculum: newCurriculum, usedFields } = await tryInsertCurriculum(tx, fullValues)
      console.log(
        'Curriculum created successfully:',
        newCurriculum.id,
        'Fields used:',
        usedFields.join(', ')
      )

      const moduleId = crypto.randomUUID()
      await tx.insert(curriculumModule).values({
        id: moduleId,
        curriculumId: newCurriculum.id,
        title: 'Lesson 1',
        description: 'Get started',
        order: 0,
      })
      console.log('Module created:', moduleId)

      // Check if difficulty was actually stored
      const hasDifficultyInDb = usedFields.includes('difficulty')

      await tx.insert(curriculumLesson).values({
        id: crypto.randomUUID(),
        moduleId: moduleId,
        title: 'Introduction',
        description: 'Introduction to this course.',
        order: 0,
        duration: 30,
        difficulty: hasDifficultyInDb
          ? (newCurriculum.difficulty ?? 'intermediate')
          : 'intermediate',
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
        and(eq(curriculum.id, courseId), eq(curriculum.creatorId, session.user.id)),
    })

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found or access denied' }, { status: 404 })
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

    // Verify ownership before deleting
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
