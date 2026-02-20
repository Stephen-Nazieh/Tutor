import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { requireAdmin, logAdminAction } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.USERS_READ)
  
  if (!session) return response!

  try {
    const { searchParams } = new URL(req.url)
    
    // Filters
    const role = searchParams.get('role')
    const search = searchParams.get('search')
    const isActive = searchParams.get('isActive')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    const where: Record<string, unknown> = {}
    
    if (role && role !== 'all') {
      where.role = role.toUpperCase()
    }
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { profile: { name: { contains: search, mode: 'insensitive' } } },
      ]
    }
    
    if (isActive !== null) {
      where.emailVerified = isActive === 'true' ? { not: null } : null
    }

    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          profile: {
            select: {
              name: true,
              avatarUrl: true,
              gradeLevel: true,
            },
          },
          adminAssignments: {
            where: { isActive: true },
            include: {
              role: {
                select: { name: true },
              },
            },
          },
          _count: {
            select: {
              curriculumEnrollments: true,
              liveSessions: true,
              quizAttempts: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ])

    const formattedUsers = users.map((user: Record<string, unknown>) => ({
      id: user.id,
      email: user.email,
      name: (user.profile as Record<string, string> | undefined)?.name,
      avatar: (user.profile as Record<string, string> | undefined)?.avatarUrl,
      role: user.role,
      gradeLevel: (user.profile as Record<string, string> | undefined)?.gradeLevel,
      isAdmin: (user.adminAssignments as Array<Record<string, unknown>>).length > 0,
      adminRoles: (user.adminAssignments as Array<Record<string, unknown>>).map((a: Record<string, unknown>) => (a.role as Record<string, string>).name),
      isVerified: !!user.emailVerified,
      createdAt: user.createdAt,
      stats: {
        enrollments: (user._count as Record<string, number>).curriculumEnrollments,
        sessions: (user._count as Record<string, number>).liveSessions,
        quizzes: (user._count as Record<string, number>).quizAttempts,
      },
    }))

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
