/**
 * POST /api/tutor/courses
 * Create a new course (curriculum) with one default module and one placeholder lesson.
 * Tutor-only.
 * 
 * GET /api/tutor/courses
 * List all courses created by the logged-in tutor.
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, desc, asc, inArray } from 'drizzle-orm'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { CreateCurriculumSchema } from '@/lib/validation/schemas'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum as curriculumTable,
  curriculumModule,
  curriculumLesson,
  courseBatch,
  profile,
  user as userTable,
  curriculumEnrollment
} from '@/lib/db/schema'
import crypto from 'crypto'

/**
 * GET handler - List tutor's courses
 */
export const GET = withAuth(async (req: NextRequest, session) => {
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const curriculums = await drizzleDb.query.curriculum.findMany({
      where: eq(curriculumTable.creatorId, userId),
      with: {
        enrollments: {
          columns: { id: true }
        },
        modules: {
          with: {
            lessons: {
              columns: { id: true }
            }
          }
        },
        batches: {
          where: inArray(courseBatch.difficulty, ['beginner', 'intermediate', 'advanced']),
          orderBy: [asc(courseBatch.order)],
          with: {
            enrollments: {
              columns: { id: true }
            }
          }
        }
      },
      orderBy: [desc(curriculumTable.createdAt)]
    })

    const courses = curriculums.map((curriculum) => {
      const totalLessons = curriculum.modules.reduce(
        (sum, m) => sum + m.lessons.length,
        0
      )
      return {
        id: curriculum.id,
        name: curriculum.name,
        description: curriculum.description,
        subject: curriculum.subject,
        gradeLevel: curriculum.gradeLevel,
        difficulty: curriculum.difficulty,
        estimatedHours: curriculum.estimatedHours,
        isPublished: curriculum.isPublished,
        _count: {
          modules: curriculum.modules.length,
          lessons: totalLessons,
          enrollments: curriculum.enrollments.length
        },
        variants: curriculum.batches.map((batch) => ({
          batchId: batch.id,
          name: batch.name,
          difficulty: batch.difficulty,
          enrollmentCount: batch.enrollments.length,
          joinLink: batch.meetingUrl ?? `${req.nextUrl.origin}/curriculum/${curriculum.id}?batch=${batch.id}`
        }))
      }
    })

    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Failed to fetch tutor courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

/**
 * POST handler - Create a new course
 */
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const body = await req.json().catch(() => ({}))
  const parsed = CreateCurriculumSchema.safeParse(body)
  if (!parsed.success) {
    const msg = parsed.error.issues.map((issue) => issue.message).join('; ')
    throw new ValidationError(msg || 'Invalid request body')
  }
  const data = parsed.data

  const userId = session?.user?.id
  if (userId) {
    const [userExists] = await drizzleDb
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.id, userId))
      .limit(1)
    if (!userExists) {
      return NextResponse.json(
        { error: 'User session invalid. Please log out and log in again.' },
        { status: 401 }
      )
    }
  }

  const [tutorProfile] = userId
    ? await drizzleDb.select({ currency: profile.currency })
      .from(profile)
      .where(eq(profile.userId, userId))
      .limit(1)
    : []
  const defaultCurrency = tutorProfile?.currency ?? 'SGD'

  const defaultSchedule = [{ dayOfWeek: 'Monday', startTime: '09:00', durationMinutes: 45 }]

  const result = await drizzleDb.transaction(async (tx) => {
    const curriculumId = crypto.randomUUID()
    const [newCurriculum] = await tx.insert(curriculumTable).values({
      id: curriculumId,
      name: data.title,
      description: data.description ?? null,
      subject: data.subject ?? 'general',
      gradeLevel: data.gradeLevel ?? null,
      difficulty: data.difficulty ?? 'intermediate',
      estimatedHours: data.estimatedHours ?? 0,
      isPublished: false,
      currency: defaultCurrency,
      schedule: defaultSchedule,
      creatorId: userId ?? null,
      isLiveOnline: data.isLiveOnline ?? false,
    }).returning()

    const moduleId = crypto.randomUUID()
    await tx.insert(curriculumModule).values({
      id: moduleId,
      curriculumId: newCurriculum.id,
      title: 'Module 1',
      description: 'Get started',
      order: 0,
    })

    await tx.insert(curriculumLesson).values({
      id: crypto.randomUUID(),
      moduleId: moduleId,
      title: 'Introduction',
      description: 'Introduction to this course.',
      order: 0,
      duration: 30,
      difficulty: newCurriculum.difficulty,
      learningObjectives: [],
      teachingPoints: [],
      keyConcepts: [],
      commonMisconceptions: [],
      prerequisiteLessonIds: [],
    })

    return newCurriculum
  })

  return NextResponse.json({
    course: {
      id: result.id,
      name: result.name,
      description: result.description,
      subject: result.subject,
      difficulty: result.difficulty,
      estimatedHours: result.estimatedHours,
      isPublished: result.isPublished,
    },
    message: 'Course created successfully. You can add more modules and lessons from the curriculum.',
  })
}, { role: 'TUTOR' }))
