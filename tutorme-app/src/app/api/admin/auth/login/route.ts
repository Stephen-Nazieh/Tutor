import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { createAdminSession, isIpWhitelisted, getClientIp, logAdminAction, ADMIN_TOKEN_NAME, ADMIN_TOKEN_EXPIRY } from '@/lib/admin/auth'

const DEFAULT_ADMIN_EMAIL = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@tutorme.com').trim().toLowerCase()

async function ensureSuperAdminAssignment(userId: string): Promise<void> {
  const superAdminRole = await prisma.adminRole.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: {
      name: 'SUPER_ADMIN',
      description: 'Full platform access',
      permissions: ['*'],
    },
  })
  await prisma.adminAssignment.upsert({
    where: {
      userId_roleId: { userId, roleId: superAdminRole.id },
    },
    update: { isActive: true },
    create: {
      userId,
      roleId: superAdminRole.id,
      assignedBy: userId,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check IP whitelist if configured (skip in development when bypass is enabled)
    const clientIp = getClientIp(req)
    const skipWhitelistInDev =
      process.env.NODE_ENV === 'development' &&
      (process.env.ADMIN_SKIP_IP_WHITELIST === 'true' || process.env.ADMIN_SKIP_IP_WHITELIST === '1')
    const whitelistCount = skipWhitelistInDev ? 0 : await prisma.ipWhitelist.count({ where: { isActive: true } })

    if (whitelistCount > 0) {
      const whitelisted = await isIpWhitelisted(clientIp)
      if (!whitelisted) {
        return NextResponse.json(
          { error: 'Access denied from this IP address' },
          { status: 403 }
        )
      }
    }

    const includeAdmin = {
      profile: true,
      adminAssignments: {
        where: { isActive: true },
        include: { role: true },
      },
    } as const

    // Case-insensitive email lookup
    let user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      include: includeAdmin,
    })

    // Bootstrap: for default admin email, create user and/or assign SUPER_ADMIN if missing
    if (email === DEFAULT_ADMIN_EMAIL) {
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: DEFAULT_ADMIN_EMAIL,
            role: 'ADMIN',
            emailVerified: new Date(),
            profile: { create: { name: 'System Administrator' } },
          },
          include: includeAdmin,
        })
        await ensureSuperAdminAssignment(user.id)
      }
      if (user?.adminAssignments.length === 0) {
        await ensureSuperAdminAssignment(user.id)
      }
      if (user) {
        const refreshed = await prisma.user.findFirst({
          where: { id: user.id },
          include: includeAdmin,
        })
        if (refreshed) user = refreshed
      }
    }

    if (!user || user.adminAssignments.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create admin session (email-only; no password check)
    const userAgent = req.headers.get('user-agent') || undefined
    const token = await createAdminSession(user.id, clientIp, userAgent)

    // Log the login
    await logAdminAction(user.id, 'admin.login', {
      ipAddress: clientIp,
      userAgent,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.profile?.name,
        roles: (user.adminAssignments as Array<Record<string, unknown>>).map((a: Record<string, unknown>) => (a.role as Record<string, string>).name),
      },
    })

    // Set cookie on the response so it is sent to the client (required in App Router route handlers)
    response.cookies.set(ADMIN_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: ADMIN_TOKEN_EXPIRY,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
