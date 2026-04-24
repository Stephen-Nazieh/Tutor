#!/usr/bin/env tsx
/**
 * Test Script: Create, Schedule, and Publish a Course
 *
 * Usage:
 *   npx tsx scripts/test-course-creation.ts <session_cookie>
 *
 * Or set environment variable:
 *   TUTOR_SESSION_TOKEN=<token> npx tsx scripts/test-course-creation.ts
 */

import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumModule, curriculumLesson, courseBatch } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import crypto from 'crypto'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'

interface CourseInput {
  title: string
  description: string
  subject: string
  gradeLevel: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  price?: number
  currency?: string
  isFree?: boolean
  schedule?: Array<{
    dayOfWeek: string
    startTime: string
    durationMinutes: number
  }>
}

interface CreatedCourse {
  id: string
  name: string
  description: string | null
  subject: string
  gradeLevel: string | null
  difficulty: string
  estimatedHours: number
  price: number | null
  currency: string | null
  isPublished: boolean
  isFree: boolean
  schedule: unknown
  modules: Array<{
    id: string
    title: string
    description: string | null
    lessons: Array<{
      id: string
      title: string
      description: string | null
      duration: number
    }>
  }>
  batches: Array<{
    id: string
    name: string
    difficulty: string | null
    startDate: Date | null
    schedule: unknown
  }>
}

/**
 * Create a course directly via database (bypasses HTTP API)
 */
async function createCourseDirect(tutorId: string, input: CourseInput): Promise<CreatedCourse> {
  console.log('📝 Creating course...')

  const now = new Date()
  const curriculumId = crypto.randomUUID()

  const result = await drizzleDb.transaction(async tx => {
    // 1. Create curriculum
    const [newCurriculum] = await tx
      .insert(curriculum)
      .values({
        id: curriculumId,
        name: input.title,
        description: input.description,
        subject: input.subject,
        gradeLevel: input.gradeLevel,
        difficulty: input.difficulty,
        estimatedHours: input.estimatedHours,
        isPublished: false,
        isFree: input.isFree ?? false,
        price: input.price ?? null,
        currency: input.currency ?? 'SGD',
        creatorId: tutorId,
        createdAt: now,
        updatedAt: now,
        schedule: input.schedule ?? [],
      })
      .returning()

    // 2. Create default module
    const moduleId = crypto.randomUUID()
    await tx.insert(curriculumModule).values({
      id: moduleId,
      curriculumId: newCurriculum.id,
      title: 'Module 1: Introduction',
      description: 'Getting started with the basics',
      order: 0,
    })

    // 3. Create default lessons
    await tx.insert(curriculumLesson).values([
      {
        id: crypto.randomUUID(),
        moduleId: moduleId,
        title: 'Lesson 1: Course Overview',
        description: 'Introduction to the course structure',
        order: 0,
        duration: 30,
      },
      {
        id: crypto.randomUUID(),
        moduleId: moduleId,
        title: 'Lesson 2: Key Concepts',
        description: 'Understanding fundamental concepts',
        order: 1,
        duration: 45,
      },
    ])

    // 4. Create a batch if schedule provided
    let batch = null
    if (input.schedule && input.schedule.length > 0) {
      const [newBatch] = await tx
        .insert(courseBatch)
        .values({
          id: crypto.randomUUID(),
          curriculumId: newCurriculum.id,
          name: `Batch A - ${now.toISOString().split('T')[0]}`,
          difficulty: input.difficulty,
          startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          schedule: input.schedule,
          order: 0,
        })
        .returning()
      batch = newBatch
    }

    return { curriculum: newCurriculum, batch }
  })

  // Fetch complete course with relations
  const course = await drizzleDb.query.curriculum.findFirst({
    where: eq(curriculum.id, result.curriculum.id),
    with: {
      modules: {
        with: {
          lessons: true,
        },
      },
      batches: true,
    },
  })

  if (!course) {
    throw new Error('Failed to fetch created course')
  }

  console.log('✅ Course created:', course.id)

  return {
    id: course.id,
    name: course.name,
    description: course.description,
    subject: course.subject,
    gradeLevel: course.gradeLevel,
    difficulty: course.difficulty,
    estimatedHours: course.estimatedHours,
    price: course.price,
    currency: course.currency,
    isPublished: course.isPublished,
    isFree: course.isFree,
    schedule: course.schedule,
    modules: course.modules.map(m => ({
      id: m.id,
      title: m.title,
      description: m.description,
      lessons: m.lessons.map(l => ({
        id: l.id,
        title: l.title,
        description: l.description,
        duration: l.duration,
      })),
    })),
    batches: course.batches.map(b => ({
      id: b.id,
      name: b.name,
      difficulty: b.difficulty,
      startDate: b.startDate,
      schedule: b.schedule,
    })),
  }
}

/**
 * Publish a course
 */
async function publishCourse(courseId: string): Promise<void> {
  console.log('📢 Publishing course...')

  await drizzleDb
    .update(curriculum)
    .set({ isPublished: true, updatedAt: new Date() })
    .where(eq(curriculum.id, courseId))

  console.log('✅ Course published!')
}

/**
 * Main test function
 */
async function main() {
  const tutorId = process.argv[2] || process.env.TUTOR_ID

  if (!tutorId) {
    console.error('❌ Error: Tutor ID required')
    console.error('Usage: npx tsx scripts/test-course-creation.ts <tutor_id>')
    console.error('Or set TUTOR_ID environment variable')
    process.exit(1)
  }

  console.log('🚀 Starting Course Creation Test')
  console.log('=================================')
  console.log(`Tutor ID: ${tutorId}`)
  console.log(`Base URL: ${BASE_URL}`)
  console.log('')

  try {
    // Step 1: Create course
    const timestamp = Date.now()
    const course = await createCourseDirect(tutorId, {
      title: `Test Course ${timestamp}`,
      description: 'This is an automated test course created via the test script',
      subject: 'Mathematics',
      gradeLevel: 'Grade 10',
      difficulty: 'intermediate',
      estimatedHours: 20,
      price: 99.99,
      currency: 'SGD',
      isFree: false,
      schedule: [
        { dayOfWeek: 'Monday', startTime: '09:00', durationMinutes: 60 },
        { dayOfWeek: 'Wednesday', startTime: '09:00', durationMinutes: 60 },
      ],
    })

    console.log('')
    console.log('📋 Course Details:')
    console.log(`  ID: ${course.id}`)
    console.log(`  Name: ${course.name}`)
    console.log(`  Subject: ${course.subject}`)
    console.log(`  Price: ${course.price} ${course.currency}`)
    console.log(`  Modules: ${course.modules.length}`)
    console.log(`  Batches: ${course.batches.length}`)
    console.log(`  Published: ${course.isPublished ? 'Yes' : 'No'}`)

    // Step 2: Publish course
    await publishCourse(course.id)

    // Step 3: Verification
    console.log('')
    console.log('🔍 Verifying...')
    const verified = await drizzleDb.query.curriculum.findFirst({
      where: eq(curriculum.id, course.id),
    })

    if (verified?.isPublished) {
      console.log('✅ Verification passed: Course is published')
    } else {
      throw new Error('Verification failed: Course is not published')
    }

    // Summary
    console.log('')
    console.log('=================================')
    console.log('✅ TEST COMPLETED SUCCESSFULLY!')
    console.log('=================================')
    console.log('')
    console.log('Created Course:')
    console.log(`  ID: ${course.id}`)
    console.log(`  URL: ${BASE_URL}/tutor/courses/${course.id}`)
    console.log(`  Insights: ${BASE_URL}/tutor/insights?courseId=${course.id}`)
    console.log('')
  } catch (error) {
    console.error('')
    console.error('❌ TEST FAILED')
    console.error('=================================')
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    process.exit(1)
  } finally {
    // Close database connection
    await drizzleDb.$client.end?.()
  }
}

main()
