/**
 * GET /api/parent/progress
 * Progress data for all children in family
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, inArray, desc } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  curriculumLessonProgress,
  curriculumProgress,
  studentPerformance,
  userGamification,
  achievement
} from '@/lib/db/schema'
import cacheManager from '@/lib/cache-manager'

const CACHE_TTL = 120

export const GET = withAuth(
  async (req: NextRequest, session) => {
    const family = await getFamilyAccountForParent(session)
    if (!family) {
      return NextResponse.json(
        { error: '未找到家庭账户' },
        { status: 404 }
      )
    }

    const cacheKey = `parent:progress:${family.id}`
    const cached = await cacheManager.get<object>(cacheKey)
    if (cached) return NextResponse.json({ success: true, data: cached })

    if (family.studentIds.length === 0) {
      const data = { children: [], overview: { totalLessons: 0, completedLessons: 0, averageScore: null } }
      return NextResponse.json({ success: true, data })
    }

    const [enrollments, lessonProgress, allCurriculumProgress, performances, gamification, achievements] = await Promise.all([
      drizzleDb.query.curriculumEnrollment.findMany({
        where: inArray(curriculumEnrollment.studentId, family.studentIds),
        with: {
          curriculum: {
            with: {
              modules: {
                with: {
                  lessons: { columns: { id: true, title: true, order: true } }
                }
              },
            },
          },
        },
      }),
      drizzleDb.query.curriculumLessonProgress.findMany({
        where: inArray(curriculumLessonProgress.studentId, family.studentIds),
      }),
      drizzleDb.query.curriculumProgress.findMany({
        where: inArray(curriculumProgress.studentId, family.studentIds),
      }),
      drizzleDb.query.studentPerformance.findMany({
        where: inArray(studentPerformance.studentId, family.studentIds),
      }),
      drizzleDb.query.userGamification.findMany({
        where: inArray(userGamification.userId, family.studentIds),
      }),
      drizzleDb.query.achievement.findMany({
        where: inArray(achievement.userId, family.studentIds),
        orderBy: [desc(achievement.unlockedAt)],
        limit: 20,
      }),
    ])

    const progressMap = new Map(lessonProgress.map((lp: any) => [`${lp.studentId}:${lp.lessonId}`, lp]))

    const children = family.members
      .filter((m: any) => ['child', 'children'].includes(m.relation.toLowerCase()) && m.userId)
      .map((m: any) => {
        const uid = m.userId!
        const enrolls = enrollments.filter((e: any) => e.studentId === uid)
        const prog = allCurriculumProgress.find((p: any) => p.studentId === uid)
        const perf = performances.find((p: any) => p.studentId === uid)
        const gam = gamification.find((g: any) => g.userId === uid)
        const studentAchievements = achievements.filter((a: any) => a.userId === uid)

        const courses = enrolls.map((e: any) => {
          const allLessons = (e.curriculum?.modules || []).flatMap((mod: any) => mod.lessons || [])
          const completed = allLessons.filter(
            (l: any) => (progressMap.get(`${uid}:${l.id}`) as any)?.status === 'COMPLETED'
          ).length
          return {
            curriculumId: e.curriculum?.id,
            name: e.curriculum?.name,
            totalLessons: allLessons.length,
            completedLessons: completed,
            progress: allLessons.length > 0 ? Math.round((completed / allLessons.length) * 100) : 0,
          }
        })

        return {
          id: uid,
          name: m.user?.profile?.name || m.name,
          courses,
          overallProgress: prog
            ? {
              lessonsCompleted: prog.lessonsCompleted,
              totalLessons: prog.totalLessons,
              averageScore: prog.averageScore,
              isCompleted: prog.isCompleted,
            }
            : null,
          strengths: (perf?.strengths as string[]) || [],
          weaknesses: (perf?.weaknesses as string[]) || [],
          level: gam?.level ?? 1,
          xp: gam?.xp ?? 0,
          achievements: studentAchievements.map((a: any) => ({
            id: a.id,
            title: a.title,
            type: a.type,
            unlockedAt: a.unlockedAt,
          })),
        }
      })

    const totalLessons = children.flatMap((c: any) => c.courses).reduce((s: any, co: any) => s + co.totalLessons, 0)
    const completedLessons = children.flatMap((c: any) => c.courses).reduce((s: any, co: any) => s + co.completedLessons, 0)
    const scores = children
      .map((c: any) => c.overallProgress?.averageScore)
      .filter((s): s is number => s != null)
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null

    const data = {
      children,
      overview: {
        totalLessons,
        completedLessons,
        averageScore: avgScore != null ? Math.round(avgScore) : null,
      },
    }

    await cacheManager.set(cacheKey, data, { ttl: CACHE_TTL, tags: [`family:${family.id}`] })
    return NextResponse.json({ success: true, data })
  },
  { role: 'PARENT' }
)
