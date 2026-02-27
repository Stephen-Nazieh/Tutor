/**
 * GET /api/student/progress
 *
 * Aggregates real progress data from:
 *  - StudentPerformance (scores, strengths, weaknesses, skillBreakdown, taskHistory)
 *  - CurriculumLessonProgress (per-lesson completion)
 *  - CurriculumEnrollment (enrolled courses)
 *  - UserGamification (XP, level, streak)
 *  - Achievement (earned badges)
 *  - TaskSubmission (submission counts)
 *
 * Performance: <100ms target with cache hit
 * Cache: L1 memory + L2 Redis, 180s TTL via cache.getOrSet
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumLessonProgress,
  studentPerformance,
  userGamification,
  achievement,
  taskSubmission,
} from '@/lib/db/schema'
import { eq, desc, inArray } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import cacheManager from '@/lib/cache-manager'

const CACHE_TTL = parseInt(process.env.CACHE_TTL_STUDENT_PROGRESS || '180', 10)

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const studentId = session.user.id
  const startTime = Date.now()

  try {
    const data = await cacheManager.getOrSet(
      `student:progress:${studentId}`,
      async () => {
        const enrollmentsRows = await drizzleDb
          .select()
          .from(curriculumEnrollment)
          .where(eq(curriculumEnrollment.studentId, studentId))
        const curriculumIds = enrollmentsRows.map((r) => r.curriculumId)
        const curricula =
          curriculumIds.length > 0
            ? await drizzleDb
                .select()
                .from(curriculum)
                .where(inArray(curriculum.id, curriculumIds))
            : []
        const curriculumMap = new Map(curricula.map((c) => [c.id, c]))
        const modules =
          curriculumIds.length > 0
            ? await drizzleDb
                .select()
                .from(curriculumModule)
                .where(inArray(curriculumModule.curriculumId, curriculumIds))
            : []
        const moduleIds = modules.map((m) => m.id)
        const lessons =
          moduleIds.length > 0
            ? await drizzleDb
                .select({ id: curriculumLesson.id, title: curriculumLesson.title, order: curriculumLesson.order, duration: curriculumLesson.duration, moduleId: curriculumLesson.moduleId })
                .from(curriculumLesson)
                .where(inArray(curriculumLesson.moduleId, moduleIds))
            : []
        const allLessonIds = lessons.map((l) => l.id)
        const lessonProgress =
          allLessonIds.length > 0
            ? await drizzleDb
                .select()
                .from(curriculumLessonProgress)
                .where(
                  eq(curriculumLessonProgress.studentId, studentId)
                )
            : []
        const progressMap = new Map(
          lessonProgress
            .filter((lp) => allLessonIds.includes(lp.lessonId))
            .map((lp) => [lp.lessonId, lp])
        )

        const performances = await drizzleDb
          .select()
          .from(studentPerformance)
          .where(eq(studentPerformance.studentId, studentId))

        const [gamification] = await drizzleDb
          .select()
          .from(userGamification)
          .where(eq(userGamification.userId, studentId))
          .limit(1)

        const achievements = await drizzleDb
          .select()
          .from(achievement)
          .where(eq(achievement.userId, studentId))
          .orderBy(desc(achievement.unlockedAt))
          .limit(10)

        const [{ count: submissionCount }] = await drizzleDb
          .select({ count: sql<number>`count(*)::int` })
          .from(taskSubmission)
          .where(eq(taskSubmission.studentId, studentId))

        const totalStudyMinutes = gamification?.totalStudyMinutes ?? 0

        const moduleByCurriculum = new Map<string, typeof modules>()
        for (const m of modules) {
          const list = moduleByCurriculum.get(m.curriculumId) ?? []
          list.push(m)
          moduleByCurriculum.set(m.curriculumId, list)
        }
        const lessonsByModule = new Map<string, typeof lessons>()
        for (const l of lessons) {
          const list = lessonsByModule.get(l.moduleId) ?? []
          list.push(l)
          lessonsByModule.set(l.moduleId, list)
        }

        const courses = enrollmentsRows.map((enrollment) => {
          const curr = curriculumMap.get(enrollment.curriculumId)
          const mods = moduleByCurriculum.get(enrollment.curriculumId) ?? []
          const allLessons = mods.flatMap((m) => lessonsByModule.get(m.id) ?? [])
          const completedLessons = allLessons.filter(
            (l) => progressMap.get(l.id)?.status === 'COMPLETED'
          )
          const inProgressLessons = allLessons.filter(
            (l) => progressMap.get(l.id)?.status === 'IN_PROGRESS'
          )
          const scores = completedLessons
            .map((l) => progressMap.get(l.id)?.score)
            .filter((s): s is number => s != null)
          const avgScore =
            scores.length > 0
              ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
              : null
          const studyMinutes = completedLessons.reduce(
            (sum, l) => sum + (l.duration || 30),
            0
          )
          return {
            id: curr?.id ?? enrollment.curriculumId,
            name: curr?.name ?? '',
            totalLessons: allLessons.length,
            completedLessons: completedLessons.length,
            inProgressLessons: inProgressLessons.length,
            progress:
              allLessons.length > 0
                ? Math.round((completedLessons.length / allLessons.length) * 100)
                : 0,
            averageScore: avgScore,
            studyMinutes,
            enrolledAt: enrollment.enrolledAt,
          }
        })

        const allStrengths: string[] = performances.flatMap(
          (p) => (p.strengths as string[]) || []
        )
        const allWeaknesses: string[] = performances.flatMap(
          (p) => (p.weaknesses as string[]) || []
        )
        const strengthCounts = countFrequency(allStrengths)
        const weaknessCounts = countFrequency(allWeaknesses)

        const allHistory: Array<{ date: string; score: number }> = performances.flatMap(
          (p) => (p.taskHistory as any[]) || []
        )
        const scoreTrend = allHistory
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(-20)

        const totalCompleted = courses.reduce((s, c) => s + c.completedLessons, 0)
        const totalLessons = courses.reduce((s, c) => s + c.totalLessons, 0)
        const overallAvg =
          performances.length > 0
            ? Math.round(
                performances.reduce((s, p) => s + p.averageScore, 0) /
                  performances.length
              )
            : null

        return {
          overview: {
            lessonsCompleted: totalCompleted,
            totalLessons,
            studyHours: Math.round((totalStudyMinutes / 60) * 10) / 10,
            averageScore: overallAvg,
            achievementCount: achievements.length,
            submissionCount: submissionCount ?? 0,
            level: gamification?.level ?? 1,
            xp: gamification?.xp ?? 0,
            streakDays: gamification?.streakDays ?? 0,
          },
          courses,
          strengths: strengthCounts.slice(0, 5),
          weaknesses: weaknessCounts.slice(0, 5),
          scoreTrend,
          achievements: achievements.map((a) => ({
            id: a.id,
            type: a.type,
            title: a.title,
            description: a.description,
            unlockedAt: a.unlockedAt,
            xpAwarded: a.xpAwarded,
          })),
          skillBreakdown: (performances[0]?.skillBreakdown as Record<string, unknown>) ?? {},
        }
      },
      {
        ttl: CACHE_TTL,
        tags: [`student:${studentId}`, 'progress', 'dashboard'],
      }
    )

        const res = NextResponse.json({ success: true, data })
        res.headers.set('X-Response-Time', `${Date.now() - startTime}ms`)
        return res
    } catch (error) {
        console.error('Failed to fetch student progress:', error)
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    }
}

function countFrequency(items: string[]): Array<{ topic: string; count: number }> {
    const freq: Record<string, number> = {}
    for (const item of items) {
        freq[item] = (freq[item] || 0) + 1
    }
    return Object.entries(freq)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
}
