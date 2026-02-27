/**
 * POST /api/auth/register/admin
 * Register a new admin user with organization and role assignments
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, adminRole, adminAssignment } from '@/lib/db/schema'
import { eq, inArray } from 'drizzle-orm'
import { adminRegistrationSchema } from '@/lib/validation/user-registration'
import { ValidationError, withRateLimitPreset } from '@/lib/api/middleware'
import { sanitizeHtml } from '@/lib/security/sanitize'
import crypto from 'crypto'
import { sql } from 'drizzle-orm'


export async function POST(request: NextRequest) {
  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(request, 'register')
    if (rateLimitResponse) return rateLimitResponse

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    const allowPublicAdminRegistration =
      process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION === 'true' ||
      (process.env.NODE_ENV !== 'production' && process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION !== 'false')

    const [{ count }] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(user)
      .where(eq(user.role, 'ADMIN'))
    if (count > 0 && !allowPublicAdminRegistration) {
      return NextResponse.json(
        { error: 'Admin bootstrap is closed' },
        { status: 400 }
      )
    }

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

    const [existingUser] = await drizzleDb.select().from(user).where(eq(user.email, email)).limit(1)
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await drizzleDb.transaction(async (tx) => {
      const userId = crypto.randomUUID()
      const profileId = crypto.randomUUID()
      await tx.insert(user).values({
        id: userId,
        email,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: null,
      })

      await tx.insert(profile).values({
        id: profileId,
        userId,
        name,
        tosAccepted: true,
        tosAcceptedAt: new Date(),
        organizationName: sanitizeHtml(data.organizationName).trim().slice(0, 200) || null,
        timezone: 'Asia/Shanghai',
        emailNotifications: true,
        smsNotifications: false,
        subjectsOfInterest: [],
        preferredLanguages: [],
        learningGoals: [],
        isOnboarded: true,
        specialties: [],
        paidClassesEnabled: false,
      })

      const roleName =
        data.adminLevel === 'super'
          ? 'SUPER_ADMIN'
          : data.adminLevel === 'limited'
            ? 'MODERATOR'
            : 'ADMIN'

      const [adminRoleRow] = await tx.select().from(adminRole).where(eq(adminRole.name, roleName)).limit(1)
      const roleId = adminRoleRow?.id
        ? adminRoleRow.id
        : (await tx.select().from(adminRole).where(inArray(adminRole.name, ['ADMIN', 'SUPER_ADMIN'])).limit(1))[0]?.id

      if (roleId) {
        await tx.insert(adminAssignment).values({
          id: crypto.randomUUID(),
          userId,
          roleId,
          assignedBy: userId,
          isActive: true,
        })
      }

      const [u] = await tx.select().from(user).where(eq(user.id, userId)).limit(1)
      return u!
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Admin account created successfully',
        user: {
          id: newUser.id,
          name,
          email: newUser.email,
          role: newUser.role,
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
      const dbError = error as { code: string }
      if (dbError.code === '23505') {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
      }
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
