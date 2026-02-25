/**
 * GET /api/parent/students
 * List children/students linked to parent's family account
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { db } from '@/lib/db'
import cacheManager from '@/lib/cache-manager'

const CACHE_TTL = 180

export const GET = withAuth(
  async (req: NextRequest, session) => {
    const family = await getFamilyAccountForParent(session)
    if (!family) {
      return NextResponse.json(
        { error: '未找到家庭账户' },
        { status: 404 }
      )
    }

    const cacheKey = `parent:students:${family.id}`
    const cached = await cacheManager.get<object>(cacheKey)
    if (cached) return NextResponse.json({ success: true, data: cached })

    const children = family.members.filter((m) =>
      ['child', 'children'].includes(m.relation.toLowerCase())
    )

    if (family.studentIds.length === 0) {
      const data = children.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        relation: m.relation,
        userId: null,
        enrollments: [],
        progress: null,
      }))
      await cacheManager.set(cacheKey, data, { ttl: CACHE_TTL, tags: [`family:${family.id}`] })
      return NextResponse.json({ success: true, data })
    }

    const [enrollments, progress, gamification] = await Promise.all([
      db.curriculumEnrollment.findMany({
        where: { studentId: { in: family.studentIds } },
        include: {
          curriculum: { select: { id: true, name: true } },
        },
      }),
      db.curriculumProgress.findMany({
        where: { studentId: { in: family.studentIds } },
      }),
      db.userGamification.findMany({
        where: { userId: { in: family.studentIds } },
      }),
    ])

    const data = children.map((m) => {
      const uid = m.userId
      const enrolls = uid ? enrollments.filter((e: any) => e.studentId === uid) : []
      const prog = uid ? progress.find((p: any) => p.studentId === uid) : null
      const gam = uid ? gamification.find((g: any) => g.userId === uid) : null
      return {
        id: uid || m.id,
        name: m.user?.profile?.name || m.name,
        email: m.email || m.user?.email,
        relation: m.relation,
        userId: uid,
        enrollments: enrolls.map((e: any) => ({
          curriculumId: e.curriculum.id,
          curriculumName: e.curriculum.name,
          enrolledAt: e.enrolledAt,
        })),
        progress: prog
          ? {
            lessonsCompleted: prog.lessonsCompleted,
            totalLessons: prog.totalLessons,
            averageScore: prog.averageScore,
            isCompleted: prog.isCompleted,
          }
          : null,
        level: gam?.level ?? null,
        xp: gam?.xp ?? null,
      }
    })

    await cacheManager.set(cacheKey, data, { ttl: CACHE_TTL, tags: [`family:${family.id}`] })
    return NextResponse.json({ success: true, data })
  },
  { role: 'PARENT' }
)
