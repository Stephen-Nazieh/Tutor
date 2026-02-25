/**
 * GET /api/parent/progress
 * Progress data for all children in family
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { db } from '@/lib/db'
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

    const [enrollments, lessonProgress, curriculumProgress, performances, gamification, achievements] = await Promise.all([
      db.curriculumEnrollment.findMany({
        where: { studentId: { in: family.studentIds } },
        include: {
          curriculum: {
            include: {
              modules: { include: { lessons: { select: { id: true, title: true, order: true } } } },
            },
          },
        },
      }),
      db.curriculumLessonProgress.findMany({
        where: { studentId: { in: family.studentIds } },
      }),
      db.curriculumProgress.findMany({
        where: { studentId: { in: family.studentIds } },
      }),
      db.studentPerformance.findMany({
        where: { studentId: { in: family.studentIds } },
      }),
      db.userGamification.findMany({
        where: { userId: { in: family.studentIds } },
      }),
      db.achievement.findMany({
        where: { userId: { in: family.studentIds } },
        orderBy: { unlockedAt: 'desc' },
        take: 20,
      }),
    ])

    const progressMap = new Map(lessonProgress.map((lp: any) => [`${lp.studentId}:${lp.lessonId}`, lp]))

    const children = family.members
      .filter((m: any) => ['child', 'children'].includes(m.relation.toLowerCase()) && m.userId)
      .map((m: any) => {
        const uid = m.userId!
        const enrolls = enrollments.filter((e: any) => e.studentId === uid)
        const prog = curriculumProgress.find((p: any) => p.studentId === uid)
        const perf = performances.find((p: any) => p.studentId === uid)
        const gam = gamification.find((g: any) => g.userId === uid)
        const studentAchievements = achievements.filter((a: any) => a.userId === uid)

        const courses = enrolls.map((e: any) => {
          const allLessons = e.curriculum.modules.flatMap((mod: any) => mod.lessons)
          const completed = allLessons.filter(
            (l: any) => (progressMap.get(`${uid}:${l.id}`) as any)?.status === 'COMPLETED'
          ).length
          return {
            curriculumId: e.curriculum.id,
            name: e.curriculum.name,
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
