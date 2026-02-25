/**
 * POST /api/auth/register/admin
 * Register a new admin user with organization and role assignments
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { adminRegistrationSchema } from '@/lib/validation/user-registration'
import { ValidationError, withRateLimitPreset } from '@/lib/api/middleware'
import { sanitizeHtml } from '@/lib/security/sanitize'

export async function POST(request: NextRequest) {
  const { response: rateLimitResponse } = await withRateLimitPreset(request, 'register')
  if (rateLimitResponse) return rateLimitResponse

  try {
    // Public bootstrap is allowed only before any admin account exists,
    // unless explicitly opened for multi-admin self-registration.
    const allowPublicAdminRegistration =
      process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION === 'true' ||
      (process.env.NODE_ENV !== 'production' && process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION !== 'false')

    const existingAdminCount = await db.user.count({ where: { role: 'ADMIN' } })
    if (existingAdminCount > 0 && !allowPublicAdminRegistration) {
      return NextResponse.json(
        { error: 'Admin bootstrap is closed. Ask an existing admin to create additional admin users.' },
        { status: 403 }
      )
    }

    // Optional hard gate for first-admin creation in production.
    const bootstrapKey = process.env.ADMIN_BOOTSTRAP_KEY
    if (bootstrapKey) {
      const providedKey = request.headers.get('x-admin-bootstrap-key')
      if (!providedKey || providedKey !== bootstrapKey) {
        return NextResponse.json(
          { error: 'Invalid bootstrap key' },
          { status: 403 }
        )
      }
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    const parsed = adminRegistrationSchema.safeParse(body)
    if (!parsed.success) {
      const messages = parsed.error.issues
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ')
      return NextResponse.json({ error: messages }, { status: 400 })
    }

    const data = parsed.data
    const name = sanitizeHtml(`${data.firstName} ${data.lastName}`).trim().slice(0, 100) || 'Admin'
    const email = data.email.toLowerCase().trim()

    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await db.$transaction(async (tx: any) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'ADMIN',
          emailVerified: null,
        },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
        },
      })

      await tx.profile.create({
        data: {
          userId: newUser.id,
          name,
          tosAccepted: true,
          tosAcceptedAt: new Date(),
          organizationName: sanitizeHtml(data.organizationName).trim().slice(0, 200) || null,
          timezone: data.adminLevel === 'super' ? 'Asia/Shanghai' : 'Asia/Shanghai',
        },
      })

      const roleName =
        data.adminLevel === 'super'
          ? 'SUPER_ADMIN'
          : data.adminLevel === 'limited'
            ? 'MODERATOR'
            : 'ADMIN'

      const adminRole = await tx.adminRole.findUnique({
        where: { name: roleName },
      })

      if (adminRole) {
        await tx.adminAssignment.create({
          data: {
            userId: newUser.id,
            roleId: adminRole.id,
            assignedBy: newUser.id,
            isActive: true,
          },
        })
      } else {
        const fallbackRole = await tx.adminRole.findFirst({
          where: { name: { in: ['ADMIN', 'SUPER_ADMIN'] } },
        })
        if (fallbackRole) {
          await tx.adminAssignment.create({
            data: {
              userId: newUser.id,
              roleId: fallbackRole.id,
              assignedBy: newUser.id,
              isActive: true,
            },
          })
        }
      }

      return newUser
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Admin account created successfully',
        user: {
          id: user.id,
          name,
          email: user.email,
          role: user.role,
          tosAccepted: true,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Admin registration error:', error)

    if (error instanceof ValidationError || (error as Error)?.name === 'ValidationError') {
      return NextResponse.json(
        { error: (error as Error).message || 'Validation error' },
        { status: 400 }
      )
    }

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string }
      if (prismaError.code === 'P2002') {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
      }
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
