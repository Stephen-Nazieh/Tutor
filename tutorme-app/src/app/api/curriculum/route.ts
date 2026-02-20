/**
 * "My courses" API (authenticated).
 * GET /api/curriculum — list curriculums with current user's progress (withAuth).
 * For public catalogue of published curriculums only, use GET /api/curriculums/list instead.
 * 7.2 Backend: cache + N+1 fix (batch progress query)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db, cache } from '@/lib/db'
import { Prisma } from '@prisma/client'

const CURRICULUM_LIST_CACHE_TTL = 120 // 2 minutes

// Type definitions for query results
type CurriculumWithCount = Prisma.CurriculumGetPayload<{
  include: { _count: { select: { modules: true; batches: true } } }
}>

type ModuleLessonCount = Prisma.CurriculumModuleGetPayload<{
  select: { curriculumId: true; _count: { select: { lessons: true } } }
}>

type CurriculumProgressData = Prisma.CurriculumProgressGetPayload<{}>

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
      const curriculums = await db.curriculum.findMany({
        include: {
          _count: { select: { modules: true, batches: true } }
        },
        orderBy: { createdAt: 'desc' }
      })

      if (curriculums.length === 0) return []

      const curriculumIds = curriculums.map((c: CurriculumWithCount) => c.id)

      const [progressList, moduleLessonCounts] = await Promise.all([
        db.curriculumProgress.findMany({
          where: {
            studentId: session.user.id,
            curriculumId: { in: curriculumIds }
          }
        }),
        db.curriculumModule.findMany({
          where: { curriculumId: { in: curriculumIds } },
          select: { curriculumId: true, _count: { select: { lessons: true } } }
        })
      ])

      const progressByCurriculumId = new Map<string, CurriculumProgressData>(
        progressList.map((p: CurriculumProgressData) => [p.curriculumId, p])
      )
      const lessonsByCurriculumId = new Map<string, number>()
      for (const m of moduleLessonCounts) {
        lessonsByCurriculumId.set(
          m.curriculumId,
          (lessonsByCurriculumId.get(m.curriculumId) ?? 0) + m._count.lessons
        )
      }

      return curriculums.map((curriculum: CurriculumWithCount): CurriculumResponse => {
        const progress = progressByCurriculumId.get(curriculum.id)
        const totalLessons = lessonsByCurriculumId.get(curriculum.id) ?? 0
        return {
          id: curriculum.id,
          name: curriculum.name,
          description: curriculum.description,
          subject: curriculum.subject,
          gradeLevel: curriculum.gradeLevel,
          difficulty: curriculum.difficulty,
          estimatedHours: curriculum.estimatedHours,
          hasOutline: hasOutline(curriculum.courseMaterials),
          _count: {
            modules: curriculum._count.modules,
            lessons: totalLessons,
            batches: curriculum._count.batches ?? 0,
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
}) // Any authenticated user (students see progress; tutors see catalogue without progress)
