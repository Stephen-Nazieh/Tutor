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
import {
  course,
  courseProgress,
  curriculumModule,
  courseLesson,
  courseBatch,
  courseEnrollment,
} from '@/lib/db/schema'
import { eq, inArray, desc, sql, and } from 'drizzle-orm'

const CURRICULUM_LIST_CACHE_TTL = 0 // Disable cache for real-time updates

function hasOutline(courseMaterials: unknown): boolean {
  if (!courseMaterials || typeof courseMaterials !== 'object') return false
  const outline = (courseMaterials as { outline?: unknown[] }).outline
  return Array.isArray(outline) && outline.length > 0
}

interface ScheduleItem {
  dayOfWeek: string
  startTime: string
  durationMinutes: number
}

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function normalizeSchedule(schedule: unknown): ScheduleItem[] {
  if (!Array.isArray(schedule)) return []
  return schedule.filter(
    (slot): slot is ScheduleItem =>
      !!slot &&
      typeof slot === 'object' &&
      typeof (slot as ScheduleItem).dayOfWeek === 'string' &&
      typeof (slot as ScheduleItem).startTime === 'string' &&
      typeof (slot as ScheduleItem).durationMinutes === 'number'
  )
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return 0
  return h * 60 + m
}

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const date = new Date()
  date.setHours(h, m, 0, 0)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function availabilitySummary(schedule: ScheduleItem[]): string | null {
  if (schedule.length === 0) return null
  const byDay = new Map<string, { start: number; end: number }>()
  for (const slot of schedule) {
    const start = toMinutes(slot.startTime)
    const end = start + slot.durationMinutes
    const entry = byDay.get(slot.dayOfWeek)
    if (!entry) {
      byDay.set(slot.dayOfWeek, { start, end })
    } else {
      entry.start = Math.min(entry.start, start)
      entry.end = Math.max(entry.end, end)
    }
  }
  const dayOrderIndex = new Map(DAY_ORDER.map((day, idx) => [day, idx]))
  const days = Array.from(byDay.keys()).sort(
    (a, b) => (dayOrderIndex.get(a) ?? 99) - (dayOrderIndex.get(b) ?? 99)
  )
  const dayLabel =
    days.length <= 3 ? days.join(' & ') : `${days.slice(0, 3).join(', ')} +${days.length - 3}`
  const ranges = Array.from(byDay.values())
  const earliest = Math.min(...ranges.map(r => r.start))
  const latest = Math.max(...ranges.map(r => r.end))
  return `${dayLabel}, ${formatTime(earliest)}–${formatTime(latest)}`
}

interface CurriculumResponse {
  id: string
  name: string
  description: string | null
  subject: string

  estimatedHours: number // Kept for response structure
  hasOutline: boolean
  _count: {
    modules: number
    lessons: number
    batches: number
  }
  availability: {
    summary: string | null
    slots: ScheduleItem[]
  }
  progress:
    | {
        lessonsCompleted: number
        totalLessons: number
        averageScore: number | null
        isCompleted: boolean
      }
    | undefined
  enrollment?: {
    startDate: string | null
  }
}

export const GET = withAuth(async (req, session) => {
  const { searchParams } = new URL(req.url)
  const filter = searchParams.get('filter') || 'all'
  const cacheKey = `curriculum:list:${session.user.id}:${filter}`

  const curriculumsWithProgress = await cache.getOrSet<CurriculumResponse[]>(
    cacheKey,
    async () => {
      // 1. Fetch main curriculum rows
      const curriculums = await drizzleDb.select().from(course).orderBy(desc(course.createdAt))

      if (curriculums.length === 0) return []
      const courseIds = curriculums.map(c => c.courseId)

      // 2. Fetch module counts
      const modulesRaw = await drizzleDb
        .select({
          courseId: curriculumModule.curriculumId,
          moduleCount: sql<number>`count(${curriculumModule.moduleId})::int`,
        })
        .from(curriculumModule)
        .where(inArray(curriculumModule.curriculumId, courseIds))
        .groupBy(curriculumModule.curriculumId)

      const modulesMap = new Map<string, number>(modulesRaw.map(m => [m.courseId, m.moduleCount]))

      // 3. Fetch batch counts
      const batchesRaw = await drizzleDb
        .select({
          courseId: courseBatch.courseId,
          batchCount: sql<number>`count(${courseBatch.batchId})::int`,
        })
        .from(courseBatch)
        .where(inArray(courseBatch.courseId, courseIds))
        .groupBy(courseBatch.courseId)

      const batchesMap = new Map<string, number>(batchesRaw.map(b => [b.courseId, b.batchCount]))

      // 4. Lessons now stored in builderData JSON field, can't query count directly
      const allModules = await drizzleDb
        .select({ moduleId: curriculumModule.moduleId, courseId: curriculumModule.curriculumId })
        .from(curriculumModule)
        .where(inArray(curriculumModule.curriculumId, courseIds))

      const lessonsMap = new Map<string, number>()
      // Lessons count not available with new schema (stored in JSON)

      // 5. Fetch user progress
      const progressList = await drizzleDb
        .select()
        .from(courseProgress)
        .where(
          and(
            eq(courseProgress.studentId, session.user.id),
            inArray(courseProgress.courseId, courseIds)
          )
        )

      const progressByCourseId = new Map<string, (typeof progressList)[number]>(
        progressList.map(p => [p.courseId, p])
      )

      // 5.5 Fetch user enrollment
      const enrollmentList = await drizzleDb
        .select()
        .from(courseEnrollment)
        .where(
          and(
            eq(courseEnrollment.studentId, session.user.id),
            inArray(courseEnrollment.courseId, courseIds)
          )
        )

      const enrollmentByCourseId = new Map<string, (typeof enrollmentList)[number]>(
        enrollmentList.map(e => [e.courseId, e])
      )

      // 6. Map everything together
      return curriculums.map((curr): CurriculumResponse => {
        const progress = progressByCourseId.get(curr.courseId)
        const enrollment = enrollmentByCourseId.get(curr.courseId)
        const schedule = normalizeSchedule(curr.schedule)
        return {
          id: curr.courseId,
          name: curr.name,
          description: curr.description,
          subject: curr.categories?.[0] ?? '', // Use categories instead of subject

          estimatedHours: 0, // No longer in schema
          hasOutline: false, // courseMaterials no longer in schema
          _count: {
            modules: modulesMap.get(curr.courseId) || 0,
            lessons: lessonsMap.get(curr.courseId) || 0,
            batches: batchesMap.get(curr.courseId) || 0,
          },
          availability: {
            summary: availabilitySummary(schedule),
            slots: schedule,
          },
          progress: progress
            ? {
                lessonsCompleted: progress.lessonsCompleted,
                totalLessons: progress.totalLessons,
                averageScore: progress.averageScore,
                isCompleted: progress.isCompleted,
              }
            : undefined,
          enrollment: enrollment
            ? {
                startDate: enrollment.startDate
                  ? new Date(enrollment.startDate).toISOString()
                  : null,
              }
            : undefined,
        }
      })
    },
    CURRICULUM_LIST_CACHE_TTL
  )

  return NextResponse.json({ curriculums: curriculumsWithProgress })
})
