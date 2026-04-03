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
import {
  course,
  curriculumModule,
  courseLesson,
  courseEnrollment,
} from '@/lib/db/schema'
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
      filters.push(eq(course.subject, subject))
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
    const [modulesRaw, enrollmentsRaw, allModules] = await Promise.all([
      drizzleDb
        .select({
          courseId: curriculumModule.curriculumId,
          count: sql<number>`count(${curriculumModule.id})::int`,
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
        .select({ id: curriculumModule.id, courseId: curriculumModule.curriculumId })
        .from(curriculumModule)
        .where(inArray(curriculumModule.curriculumId, courseIds)),
    ])

    const moduleCounts = new Map(modulesRaw.map(m => [m.courseId, m.count]))
    const enrollmentCounts = new Map(enrollmentsRaw.map(e => [e.courseId, e.count]))
    const moduleIds = allModules.map(m => m.id)
    const lessonsMap = new Map<string, number>()

    if (moduleIds.length > 0) {
      const lessonsRaw = await drizzleDb
        .select({
          moduleId: courseLesson.moduleId,
          count: sql<number>`count(${courseLesson.lessonId})::int`,
        })
        .from(courseLesson)
        .where(inArray(courseLesson.moduleId, moduleIds))
        .groupBy(courseLesson.moduleId)

      const lessonCountsByModule = new Map(lessonsRaw.map(l => [l.moduleId, l.count]))
      for (const m of allModules) {
        const lCount = lessonCountsByModule.get(m.id) || 0
        lessonsMap.set(m.courseId, (lessonsMap.get(m.courseId) || 0) + lCount)
      }
    }

    const enrichedCurriculums = curriculums.map(c => ({
      id: c.courseId,
      name: c.name,
      subject: c.subject,
      description: c.description,
      difficulty: c.difficulty,
      estimatedHours: c.estimatedHours,
      price: c.price,
      currency: c.currency,
      isFree: c.isFree,
      gradeLevel: c.gradeLevel,
      modulesCount: moduleCounts.get(c.courseId) || 0,
      lessonsCount: lessonsMap.get(c.courseId) || 0,
      studentCount: enrollmentCounts.get(c.courseId) || 0,
      createdAt: c.createdAt,
    }))

    return NextResponse.json({ curriculums: enrichedCurriculums })
  } catch (error) {
    return handleApiError(error, 'Failed to list curriculums', 'curriculums/list')
  }
}
