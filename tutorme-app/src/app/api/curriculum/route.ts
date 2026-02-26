/**
 * "My courses" API (authenticated).
 * GET /api/curriculum — list curriculums with current user's progress (withAuth).
 * For public catalogue of published curriculums only, use GET /api/curriculums/list instead.
 * 7.2 Backend: cache + N+1 fix (batch progress query)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { cache } from '@/lib/db'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumProgress, curriculumModule, curriculumLesson, courseBatch } from '@/lib/db/schema'
import { eq, inArray, desc, sql, count } from 'drizzle-orm'

const CURRICULUM_LIST_CACHE_TTL = 120 // 2 minutes

function hasOutline(courseMaterials: unknown): boolean {
  if (!courseMaterials || typeof courseMaterials !== 'object') return false
  const outline = (courseMaterials as { outline?: unknown[] }).outline
  return Array.isArray(outline) && outline.length > 0
}

interface CurriculumResponse {
  id: string
  name: string
  description: string | null
  subject: string
  gradeLevel: string | null
  difficulty: string
  estimatedHours: number
  hasOutline: boolean
  _count: {
    modules: number
    lessons: number
    batches: number
  }
  progress: {
    lessonsCompleted: number
    totalLessons: number
    averageScore: number | null
    isCompleted: boolean
  } | undefined
}

export const GET = withAuth(async (req, session) => {
  const { searchParams } = new URL(req.url)
  const filter = searchParams.get('filter') || 'all'
  const cacheKey = `curriculum:list:${session.user.id}:${filter}`

  const curriculumsWithProgress = await cache.getOrSet<CurriculumResponse[]>(
    cacheKey,
    async () => {
      // 1. Fetch main curriculum rows
      const curriculums = await drizzleDb
        .select()
        .from(curriculum)
        .orderBy(desc(curriculum.createdAt))

      if (curriculums.length === 0) return []
      const curriculumIds = curriculums.map((c) => c.id)

      // 2. Fetch module counts
      const modulesRaw = await drizzleDb
        .select({
          curriculumId: curriculumModule.curriculumId,
          moduleCount: sql<number>`count(${curriculumModule.id})::int`
        })
        .from(curriculumModule)
        .where(inArray(curriculumModule.curriculumId, curriculumIds))
        .groupBy(curriculumModule.curriculumId)

      const modulesMap = new Map<string, number>(modulesRaw.map(m => [m.curriculumId, m.moduleCount]))

      // 3. Fetch batch counts
      const batchesRaw = await drizzleDb
        .select({
          curriculumId: courseBatch.curriculumId,
          batchCount: sql<number>`count(${courseBatch.id})::int`
        })
        .from(courseBatch)
        .where(inArray(courseBatch.curriculumId, curriculumIds))
        .groupBy(courseBatch.curriculumId)

      const batchesMap = new Map<string, number>(batchesRaw.map(b => [b.curriculumId, b.batchCount]))

      // 4. Fetch the lessons count by getting modules for these curriculums
      const allModules = await drizzleDb
        .select({ id: curriculumModule.id, curriculumId: curriculumModule.curriculumId })
        .from(curriculumModule)
        .where(inArray(curriculumModule.curriculumId, curriculumIds))

      const moduleIds = allModules.map(m => m.id)
      const lessonsMap = new Map<string, number>()

      if (moduleIds.length > 0) {
        const lessonsRaw = await drizzleDb
          .select({
            moduleId: curriculumLesson.moduleId,
            lessonCount: sql<number>`count(${curriculumLesson.id})::int`
          })
          .from(curriculumLesson)
          .where(inArray(curriculumLesson.moduleId, moduleIds))
          .groupBy(curriculumLesson.moduleId)

        const lessonCountsByModule = new Map<string, number>(lessonsRaw.map(l => [l.moduleId, l.lessonCount]))

        for (const m of allModules) {
          const lCount = lessonCountsByModule.get(m.id) || 0
          lessonsMap.set(m.curriculumId, (lessonsMap.get(m.curriculumId) || 0) + lCount)
        }
      }

      // 5. Fetch user progress
      const progressList = await drizzleDb
        .select()
        .from(curriculumProgress)
        .where(
          sql`${curriculumProgress.studentId} = ${session.user.id} AND ${curriculumProgress.curriculumId} IN ${inArray(
            curriculumProgress.curriculumId,
            curriculumIds
          )}`
        )

      const progressByCurriculumId = new Map<string, typeof progressList[number]>(
        progressList.map(p => [p.curriculumId, p])
      )

      // 6. Map everything together
      return curriculums.map((curr): CurriculumResponse => {
        const progress = progressByCurriculumId.get(curr.id)
        return {
          id: curr.id,
          name: curr.name,
          description: curr.description,
          subject: curr.subject,
          gradeLevel: curr.gradeLevel,
          difficulty: curr.difficulty,
          estimatedHours: curr.estimatedHours,
          hasOutline: hasOutline(curr.courseMaterials),
          _count: {
            modules: modulesMap.get(curr.id) || 0,
            lessons: lessonsMap.get(curr.id) || 0,
            batches: batchesMap.get(curr.id) || 0,
          },
          progress: progress
            ? {
              lessonsCompleted: progress.lessonsCompleted,
              totalLessons: progress.totalLessons,
              averageScore: progress.averageScore,
              isCompleted: progress.isCompleted
            }
            : undefined
        }
      })
    },
    CURRICULUM_LIST_CACHE_TTL
  )

  return NextResponse.json({ curriculums: curriculumsWithProgress })
})
