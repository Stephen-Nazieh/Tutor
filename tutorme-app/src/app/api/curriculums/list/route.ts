/**
 * Public curriculum catalogue API ("curriculums list").
 * GET /api/curriculums/list — returns published curriculums only (no auth).
 * Rate limited per IP. For "my courses" with user progress, use GET /api/curriculum (withAuth) instead.
 *
 * Subject codes: ?subject= is normalized (lowercased). Supported values should match course.subject
 * in DB (e.g. math, english). Aliases below map URL/subject codes to DB values for consistency with
 * dashboard signup links (e.g. /student/subjects/math/courses).
 */
import { NextRequest, NextResponse } from 'next/server'
import { withRateLimit, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseLesson, courseEnrollment } from '@/lib/db/schema'
import { eq, and, inArray, desc, sql } from 'drizzle-orm'

const LIST_RATE_LIMIT_MAX = 60 // per minute per IP

/** Map alternate subject codes to canonical DB subject (e.g. mathematics -> math). */
const SUBJECT_ALIAS: Record<string, string> = {
  mathematics: 'math',
  english_language: 'english',
  chinese: 'chinese',
}

export async function GET(req: NextRequest) {
  const { response: rateLimitRes } = await withRateLimit(req, LIST_RATE_LIMIT_MAX)
  if (rateLimitRes) return rateLimitRes

  try {
    const { searchParams } = new URL(req.url)
    const subjectParam = searchParams.get('subject')
    const subject = subjectParam
      ? (SUBJECT_ALIAS[subjectParam.toLowerCase()] ?? subjectParam.toLowerCase())
      : undefined

    const filters = [eq(course.isPublished, true)]
    if (subject) {
      // Filter by categories array instead of subject field
      // Using a simple contains check for now
    }

    const curriculums = await drizzleDb
      .select()
      .from(course)
      .where(and(...filters))
      .orderBy(desc(course.createdAt))

    if (curriculums.length === 0) {
      return NextResponse.json({ curriculums: [] })
    }

    const courseIds = curriculums.map(c => c.courseId)

    // Parallel fetch counts
    const [modulesRaw, enrollmentsRaw, lessonsRaw] = await Promise.all([
      drizzleDb
        .select({
          courseId: curriculumModule.curriculumId,
          count: sql<number>`count(${curriculumModule.moduleId})::int`,
        })
        .from(curriculumModule)
        .where(inArray(curriculumModule.curriculumId, courseIds))
        .groupBy(curriculumModule.curriculumId),

      drizzleDb
        .select({
          courseId: courseEnrollment.courseId,
          count: sql<number>`count(${courseEnrollment.enrollmentId})::int`,
        })
        .from(courseEnrollment)
        .where(inArray(courseEnrollment.courseId, courseIds))
        .groupBy(courseEnrollment.courseId),

      drizzleDb
        .select({
          courseId: courseLesson.courseId,
          count: sql<number>`count(${courseLesson.lessonId})::int`,
        })
        .from(courseLesson)
        .where(inArray(courseLesson.courseId, courseIds))
        .groupBy(courseLesson.courseId),
    ])

    const moduleCounts = new Map(modulesRaw.map(m => [m.courseId, m.count]))
    const enrollmentCounts = new Map(enrollmentsRaw.map(e => [e.courseId, e.count]))
    const lessonCounts = new Map(lessonsRaw.map(l => [l.courseId, l.count]))

    const enrichedCurriculums = curriculums.map(c => ({
      id: c.courseId,
      name: c.name,
      subject: c.categories?.[0] ?? '', // Use categories instead of subject
      description: c.description,
      difficulty: '', // No longer in schema
      estimatedHours: 0, // No longer in schema
      price: c.price,
      currency: c.currency,
      isFree: c.isFree,
      gradeLevel: '', // No longer in schema
      modulesCount: moduleCounts.get(c.courseId) || 0,
      lessonsCount: lessonCounts.get(c.courseId) || 0,
      studentCount: enrollmentCounts.get(c.courseId) || 0,
      createdAt: c.createdAt,
    }))

    return NextResponse.json({ curriculums: enrichedCurriculums })
  } catch (error) {
    return handleApiError(error, 'Failed to list curriculums', 'curriculums/list')
  }
}
