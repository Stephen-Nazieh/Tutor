/**
 * GET /api/parent/students/[studentId]
 * Returns basic info for a single student (parent must own via family account)
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, and } from 'drizzle-orm'
import { withAuth, handleApiError } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, curriculumEnrollment, userGamification } from '@/lib/db/schema'
import cacheManager from '@/lib/cache-manager'

const CACHE_TTL = parseInt(process.env.CACHE_TTL_STUDENT_ANALYTICS || '45', 10)

export const GET = withAuth(
  async (req: NextRequest, session, context) => {
    const startTime = Date.now()
    const params = await (context?.params as Promise<{ studentId: string }>) ?? Promise.resolve({ studentId: '' })
    const { studentId } = await params
    if (!studentId) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
    }

    const family = await getFamilyAccountForParent(session)
    if (!family) {
      return NextResponse.json({ error: '未找到家庭账户' }, { status: 404 })
    }

    if (!family.studentIds.includes(studentId)) {
      return NextResponse.json(
        { error: '无权查看该学生' },
        { status: 403 }
      )
    }

    const member = family.members.find(
      (m) => m.userId === studentId || m.id === studentId
    )
    if (!member?.userId) {
      return NextResponse.json({ error: '学生未关联' }, { status: 404 })
    }

    const cacheKey = `parent:student:analytics:${family.id}:${studentId}`
    const cached = await cacheManager.get<object>(cacheKey)
    if (cached) {
      const res = NextResponse.json({ success: true, data: cached })
      res.headers.set('X-Cache', 'HIT')
      res.headers.set('X-Response-Time', `${Date.now() - startTime}ms`)
      return res
    }

    const [userData, enrollments, gamificationData] = await Promise.all([
      drizzleDb.query.user.findFirst({
        where: eq(user.id, studentId),
        with: {
          profile: { columns: { name: true } }
        },
        columns: {
          id: true,
          email: true,
        }
      }),
      drizzleDb.query.curriculumEnrollment.findMany({
        where: eq(curriculumEnrollment.studentId, studentId),
        with: {
          curriculum: { columns: { id: true, name: true } }
        }
      }),
      drizzleDb.query.userGamification.findFirst({
        where: eq(userGamification.userId, studentId)
      })
    ])

    if (!userData) {
      return NextResponse.json({ error: '学生不存在' }, { status: 404 })
    }

    const data = {
      id: userData.id,
      name: userData.profile?.name ?? member.name,
      email: userData.email,
      relation: member.relation,
      enrollments: enrollments.map((e: any) => ({
        curriculumId: e.curriculum.id,
        curriculumName: e.curriculum.name,
        enrolledAt: e.enrolledAt,
      })),
      level: gamificationData?.level ?? null,
      xp: gamificationData?.xp ?? null,
    }

    await cacheManager.set(cacheKey, data, {
      ttl: CACHE_TTL,
      tags: [`family:${family.id}`, `student:${studentId}`],
    })

    const res = NextResponse.json({ success: true, data })
    res.headers.set('X-Cache', 'MISS')
    res.headers.set('X-Response-Time', `${Date.now() - startTime}ms`)
    return res
  },
  { role: 'PARENT' }
)
