/**
 * Public curriculum catalogue API ("curriculums list").
 * GET /api/curriculums/list — returns published curriculums only (no auth).
 * Rate limited per IP. For "my courses" with user progress, use GET /api/curriculum (withAuth) instead.
 *
 * Subject codes: ?subject= is normalized (lowercased). Supported values should match curriculum.subject
 * in DB (e.g. math, english). Aliases below map URL/subject codes to DB values for consistency with
 * dashboard signup links (e.g. /student/subjects/math/courses).
 */
import { NextRequest, NextResponse } from 'next/server'
import { withRateLimit, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumModule, curriculumLesson, curriculumEnrollment } from '@/lib/db/schema'
import { eq, and, inArray, desc, sql } from 'drizzle-orm'

const LIST_RATE_LIMIT_MAX = 60 // per minute per IP

/** Map alternate subject codes to canonical DB subject (e.g. mathematics -> math). */
const SUBJECT_ALIAS: Record<string, string> = {
  mathematics: 'math',
  english_language: 'english',
  chinese: 'chinese'
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

    const filters = [eq(curriculum.isPublished, true)]
    if (subject) {
      filters.push(eq(curriculum.subject, subject))
    }

    const curriculums = await drizzleDb
      .select()
      .from(curriculum)
      .where(and(...filters))
      .orderBy(desc(curriculum.createdAt))

    if (curriculums.length === 0) {
      return NextResponse.json({ curriculums: [] })
    }

    const curriculumIds = curriculums.map((c) => c.id)

    // Parallel fetch counts
    const [modulesRaw, enrollmentsRaw, allModules] = await Promise.all([
      drizzleDb
        .select({
          curriculumId: curriculumModule.curriculumId,
          count: sql<number>`count(${curriculumModule.id})::int`
        })
        .from(curriculumModule)
        .where(inArray(curriculumModule.curriculumId, curriculumIds))
        .groupBy(curriculumModule.curriculumId),

      drizzleDb
        .select({
          curriculumId: curriculumEnrollment.curriculumId,
          count: sql<number>`count(${curriculumEnrollment.id})::int`
        })
        .from(curriculumEnrollment)
        .where(inArray(curriculumEnrollment.curriculumId, curriculumIds))
        .groupBy(curriculumEnrollment.curriculumId),

      drizzleDb
        .select({ id: curriculumModule.id, curriculumId: curriculumModule.curriculumId })
        .from(curriculumModule)
        .where(inArray(curriculumModule.curriculumId, curriculumIds))
    ])

    const moduleCounts = new Map(modulesRaw.map(m => [m.curriculumId, m.count]))
    const enrollmentCounts = new Map(enrollmentsRaw.map(e => [e.curriculumId, e.count]))
    const moduleIds = allModules.map(m => m.id)
    const lessonsMap = new Map<string, number>()

    if (moduleIds.length > 0) {
      const lessonsRaw = await drizzleDb
        .select({
          moduleId: curriculumLesson.moduleId,
          count: sql<number>`count(${curriculumLesson.id})::int`
        })
        .from(curriculumLesson)
        .where(inArray(curriculumLesson.moduleId, moduleIds))
        .groupBy(curriculumLesson.moduleId)

      const lessonCountsByModule = new Map(lessonsRaw.map(l => [l.moduleId, l.count]))
      for (const m of allModules) {
        const lCount = lessonCountsByModule.get(m.id) || 0
        lessonsMap.set(m.curriculumId, (lessonsMap.get(m.curriculumId) || 0) + lCount)
      }
    }

    const enrichedCurriculums = curriculums.map((c) => ({
      id: c.id,
      name: c.name,
      subject: c.subject,
      description: c.description,
      difficulty: c.difficulty,
      estimatedHours: c.estimatedHours,
      price: c.price,
      currency: c.currency,
      gradeLevel: c.gradeLevel,
      modulesCount: moduleCounts.get(c.id) || 0,
      lessonsCount: lessonsMap.get(c.id) || 0,
      studentCount: enrollmentCounts.get(c.id) || 0,
      createdAt: c.createdAt
    }))

    return NextResponse.json({ curriculums: enrichedCurriculums })
  } catch (error) {
    return handleApiError(error, 'Failed to list curriculums', 'curriculums/list')
  }
}
