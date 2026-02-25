import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import {
  createAdminSession,
  isIpWhitelisted,
  getClientIp,
  logAdminAction,
  verifyPassword,
  hashPassword,
  ADMIN_TOKEN_NAME,
  ADMIN_TOKEN_EXPIRY,
} from '@/lib/admin/auth'
import { withRateLimitPreset } from '@/lib/api/middleware'
import { isSuspiciousIp, logFailedLogin } from '@/lib/security/suspicious-activity'

export async function POST(req: NextRequest) {
  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(req, 'login')
    if (rateLimitResponse) return rateLimitResponse

    const body = await req.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check IP whitelist if configured (skip in development when bypass is enabled)
    const clientIp = getClientIp(req)
    const skipSuspiciousInDev =
      process.env.NODE_ENV === 'development' &&
      (process.env.ADMIN_SKIP_SUSPICIOUS_IP !== 'false')
    if (!skipSuspiciousInDev && clientIp && clientIp !== 'unknown' && await isSuspiciousIp(clientIp)) {
      return NextResponse.json(
        { error: 'Too many failed login attempts. Please try again later.' },
        { status: 429 }
      )
    }

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
    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      include: includeAdmin,
    })

    if (!user || !user.password) {
      await logFailedLogin(clientIp, email || undefined)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const passwordCandidates = Array.from(
      new Set(
        [password, password.trim(), password.normalize('NFC'), password.trim().normalize('NFC')].filter(Boolean)
      )
    )
    let isValidPassword = false
    for (const candidate of passwordCandidates) {
      if (await verifyPassword(candidate, user.password)) {
        isValidPassword = true
        break
      }
    }

    // Legacy fallback: some old records may still store plaintext password.
    if (!isValidPassword && passwordCandidates.includes(user.password)) {
      isValidPassword = true
      const migratedHash = await hashPassword(password)
      await prisma.user.update({
        where: { id: user.id },
        data: { password: migratedHash },
      })
    }

    if (!isValidPassword) {
      await logFailedLogin(clientIp, email || undefined)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create admin session after credential verification.
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
        roles: user.adminAssignments.length > 0
          ? (user.adminAssignments as Array<Record<string, unknown>>).map((a: Record<string, unknown>) => (a.role as Record<string, string>).name)
          : [user.role],
      },
    })

    // Set cookie on the response so it is sent to the client (required in App Router route handlers)
    response.cookies.set(ADMIN_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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
