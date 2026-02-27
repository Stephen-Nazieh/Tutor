import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  user,
  profile,
  adminAssignment,
  adminRole,
  curriculumEnrollment,
  liveSession,
  quizAttempt,
} from '@/lib/db/schema'
import { eq, and, desc, ilike, inArray, sql, isNull, isNotNull } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.USERS_READ)

  if (!session) return response!

  try {
    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role')
    const search = searchParams.get('search')
    const isActive = searchParams.get('isActive')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const conditions = []
    if (role && role !== 'all') conditions.push(eq(user.role, role.toUpperCase() as 'STUDENT' | 'TUTOR' | 'PARENT' | 'ADMIN'))
    if (isActive !== null && isActive !== undefined) {
      if (isActive === 'true') conditions.push(isNotNull(user.emailVerified))
      else conditions.push(isNull(user.emailVerified))
    }

    if (search) {
      const [emailRows, nameRows] = await Promise.all([
        drizzleDb.select({ id: user.id }).from(user).where(ilike(user.email, `%${search}%`)),
        drizzleDb.select({ userId: profile.userId }).from(profile).where(ilike(profile.name, `%${search}%`)),
      ])
      const searchIds = [...new Set([...emailRows.map((r) => r.id), ...nameRows.map((r) => r.userId)])]
      if (searchIds.length === 0) {
        return NextResponse.json({
          users: [],
          pagination: { page, limit, total: 0, totalPages: 0 },
        })
      }
      conditions.push(inArray(user.id, searchIds))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const users = await drizzleDb
      .select()
      .from(user)
      .where(whereClause)
      .orderBy(desc(user.createdAt))
      .limit(limit)
      .offset(skip)

    const countRows = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(user)
      .where(whereClause)
    const total = countRows[0]?.count ?? 0

    const userIds = users.map((u) => u.id)
    const profiles =
      userIds.length > 0
        ? await drizzleDb.select().from(profile).where(inArray(profile.userId, userIds))
        : []
    const assignments =
      userIds.length > 0
        ? await drizzleDb
            .select({ userId: adminAssignment.userId, roleName: adminRole.name })
            .from(adminAssignment)
            .innerJoin(adminRole, eq(adminAssignment.roleId, adminRole.id))
            .where(and(inArray(adminAssignment.userId, userIds), eq(adminAssignment.isActive, true)))
        : []

    const enrollCounts =
      userIds.length > 0
        ? await drizzleDb
            .select({ studentId: curriculumEnrollment.studentId, count: sql<number>`count(*)::int` })
            .from(curriculumEnrollment)
            .where(inArray(curriculumEnrollment.studentId, userIds))
            .groupBy(curriculumEnrollment.studentId)
        : []
    const sessionCounts =
      userIds.length > 0
        ? await drizzleDb
            .select({ tutorId: liveSession.tutorId, count: sql<number>`count(*)::int` })
            .from(liveSession)
            .where(inArray(liveSession.tutorId, userIds))
            .groupBy(liveSession.tutorId)
        : []
    const quizCounts =
      userIds.length > 0
        ? await drizzleDb
            .select({ studentId: quizAttempt.studentId, count: sql<number>`count(*)::int` })
            .from(quizAttempt)
            .where(inArray(quizAttempt.studentId, userIds))
            .groupBy(quizAttempt.studentId)
        : []

    const profileByUserId = new Map(profiles.map((p) => [p.userId, p]))
    const assignmentsByUserId = new Map<string, string[]>()
    for (const a of assignments) {
      const list = assignmentsByUserId.get(a.userId) ?? []
      list.push(a.roleName)
      assignmentsByUserId.set(a.userId, list)
    }
    const enrollByUserId = new Map(enrollCounts.map((e) => [e.studentId, e.count]))
    const sessionByUserId = new Map(sessionCounts.map((s) => [s.tutorId, s.count]))
    const quizByUserId = new Map(quizCounts.map((q) => [q.studentId, q.count]))

    const formattedUsers = users.map((u) => {
      const p = profileByUserId.get(u.id)
      const adminRoles = assignmentsByUserId.get(u.id) ?? []
      return {
        id: u.id,
        email: u.email,
        name: p?.name ?? null,
        avatar: p?.avatarUrl ?? null,
        role: u.role,
        gradeLevel: p?.gradeLevel ?? null,
        isAdmin: adminRoles.length > 0,
        adminRoles,
        isVerified: !!u.emailVerified,
        createdAt: u.createdAt,
        stats: {
          enrollments: enrollByUserId.get(u.id) ?? 0,
          sessions: sessionByUserId.get(u.id) ?? 0,
          quizzes: quizByUserId.get(u.id) ?? 0,
        },
      }
    })

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
