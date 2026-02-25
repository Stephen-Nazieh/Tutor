/**
 * POST /api/tutor/courses
 * Create a new course (curriculum) with one default module and one placeholder lesson.
 * Tutor-only.
 * 
 * GET /api/tutor/courses
 * List all courses created by the logged-in tutor.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { CreateCurriculumSchema } from '@/lib/validation/schemas'
import { db } from '@/lib/db'

/**
 * GET handler - List tutor's courses
 */
export const GET = withAuth(async (req, session) => {
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const curriculums = await db.curriculum.findMany({
      where: { creatorId: userId },
      include: {
        _count: {
          select: {
            modules: true,
            enrollments: true
          }
        },
        modules: {
          include: {
            _count: {
              select: { lessons: true }
            }
          }
        },
        batches: {
          where: {
            difficulty: { in: ['beginner', 'intermediate', 'advanced'] }
          },
          orderBy: { order: 'asc' },
          include: {
            _count: {
              select: { enrollments: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const courses = curriculums.map((curriculum) => {
      const totalLessons = curriculum.modules.reduce(
        (sum, m) => sum + m._count.lessons, 
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
          modules: curriculum._count.modules,
          lessons: totalLessons,
          enrollments: curriculum._count.enrollments
        },
        variants: curriculum.batches.map((batch) => ({
          batchId: batch.id,
          name: batch.name,
          difficulty: batch.difficulty,
          enrollmentCount: batch._count.enrollments,
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
export const POST = withCsrf(withAuth(async (req, session) => {
  const body = await req.json().catch(() => ({}))
  const parsed = CreateCurriculumSchema.safeParse(body)
  if (!parsed.success) {
    const msg = parsed.error.issues.map((issue) => issue.message).join('; ')
    throw new ValidationError(msg || 'Invalid request body')
  }
  const data = parsed.data

  // Verify user exists in database (session may be stale after DB reset)
  const userId = session?.user?.id
  if (userId) {
    const userExists = await db.user.findUnique({
      where: { id: userId },
      select: { id: true }
    })
    if (!userExists) {
      return NextResponse.json(
        { error: 'User session invalid. Please log out and log in again.' },
        { status: 401 }
      )
    }
  }

  const profile = userId
    ? await db.profile.findUnique({ where: { userId }, select: { currency: true } })
    : null
  const defaultCurrency = profile?.currency ?? 'SGD'

  const defaultSchedule = [{ dayOfWeek: 'Monday', startTime: '09:00', durationMinutes: 45 }] as object

  const curriculum = await db.curriculum.create({
    data: {
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
    },
  })

  const defaultModule = await db.curriculumModule.create({
    data: {
      curriculumId: curriculum.id,
      title: 'Module 1',
      description: 'Get started',
      order: 0,
    },
  })

  await db.curriculumLesson.create({
    data: {
      moduleId: defaultModule.id,
      title: 'Introduction',
      description: 'Introduction to this course.',
      order: 0,
      duration: 30,
      difficulty: curriculum.difficulty,
      learningObjectives: [],
      teachingPoints: [],
      keyConcepts: [],
      commonMisconceptions: [],
      prerequisiteLessonIds: [],
    },
  })

  return NextResponse.json({
    course: {
      id: curriculum.id,
      name: curriculum.name,
      description: curriculum.description,
      subject: curriculum.subject,
      difficulty: curriculum.difficulty,
      estimatedHours: curriculum.estimatedHours,
      isPublished: curriculum.isPublished,
    },
    message: 'Course created successfully. You can add more modules and lessons from the curriculum.',
  })
}, { role: 'TUTOR' }))
