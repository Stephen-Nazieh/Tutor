/**
 * POST /api/auth/register
 * Register a new user account (Drizzle ORM)
 */

import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, familyAccount, familyMember, emergencyContact } from '@/lib/db/schema'
import { RegisterUserSchema } from '@/lib/validation/schemas'
import { ValidationError } from '@/lib/api/middleware'
import { sanitizeHtml } from '@/lib/security/sanitize'
import { checkRateLimit, getClientIdentifier, RATE_LIMIT_PRESETS } from '@/lib/security/rate-limit'
import {
  verifyAllChildren,
  isStudentAlreadyLinked,
} from '@/lib/security/parent-child-queries'

function normalizeUsernameSeed(seed: string): string {
  const cleaned = seed
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .replace(/\.+/g, '.')
    .replace(/^\.|\.$/g, '')
  if (cleaned.length >= 3) return cleaned.slice(0, 24)
  return `user${nanoid(6).toLowerCase()}`
}

async function generateUniqueUsername(
  checkExists: (username: string) => Promise<boolean>,
  preferred: string
): Promise<string> {
  const base = normalizeUsernameSeed(preferred)
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = attempt === 0 ? '' : String(Math.floor(Math.random() * 9000) + 1000)
    const candidate = `${base}${suffix}`.slice(0, 30)
    const exists = await checkExists(candidate)
    if (!exists) return candidate
  }
  return `tutor${nanoid(8).toLowerCase()}`
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    const parsed = RegisterUserSchema.safeParse(body)
    if (!parsed.success) {
      const messages = parsed.error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ')
      return NextResponse.json({ error: messages }, { status: 400 })
    }

    const { email, password, role } = parsed.data
    const name = sanitizeHtml(parsed.data.name).trim().slice(0, 100) || 'User'
    const normalizedEmail = email.toLowerCase()

    const clientId = getClientIdentifier(request)
    const registerOptions = RATE_LIMIT_PRESETS.register
    const scopedRateLimit = await checkRateLimit(
      `register:${clientId}:${String(role).toUpperCase()}:${normalizedEmail}`,
      registerOptions
    )
    if (!scopedRateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': String(scopedRateLimit.remaining),
            'X-RateLimit-Reset': String(Math.ceil(scopedRateLimit.resetAt / 1000)),
          },
        }
      )
    }

    let verifiedStudents: Map<number, import('@/lib/security/parent-child-queries').VerifiedStudent> | undefined

    const [existingUser] = await drizzleDb
      .select()
      .from(user)
      .where(eq(user.email, normalizedEmail))
      .limit(1)
    if (existingUser) {
      throw new ValidationError('Email already registered')
    }

    if (role === 'PARENT' && body && typeof body === 'object' && 'additionalData' in body) {
      const additionalData = (body as { additionalData?: { students?: import('@/lib/validation/parent-child-security').StudentLinkingInput[] } }).additionalData
      if (additionalData?.students?.length) {
        const { verified, errors } = await verifyAllChildren(additionalData.students)
        if (errors.length > 0) {
          const msg = errors.map((e) => `Child ${e.index + 1}: ${e.message}`).join('; ')
          return NextResponse.json({ error: msg }, { status: 400 })
        }
        verifiedStudents = verified
        for (const [, student] of verified) {
          if (await isStudentAlreadyLinked(student.userId)) {
            return NextResponse.json(
              { error: `Student ${student.email} is already linked to another parent account.` },
              { status: 400 }
            )
          }
        }
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await drizzleDb.transaction(async (tx) => {
      const userId = crypto.randomUUID()
      await tx.insert(user).values({
        id: userId,
        email: normalizedEmail,
        password: hashedPassword,
        role,
      })

      const checkUsername = async (username: string) => {
        const [existing] = await tx.select().from(profile).where(eq(profile.username, username)).limit(1)
        return !!existing
      }
      const defaultUsername =
        role === 'TUTOR'
          ? await generateUniqueUsername(checkUsername, name || email.split('@')[0] || 'tutor')
          : null

      await tx.insert(profile).values({
        id: crypto.randomUUID(),
        userId,
        name,
        username: defaultUsername ?? undefined,
        tosAccepted: true,
        tosAcceptedAt: new Date(),
        timezone: 'Asia/Shanghai',
        emailNotifications: true,
        smsNotifications: false,
        subjectsOfInterest: [],
        preferredLanguages: [],
        learningGoals: [],
        isOnboarded: role !== 'TUTOR',
        specialties: [],
        paidClassesEnabled: false,
        ...(role === 'STUDENT' && { studentUniqueId: `STU-${nanoid(12)}` }),
      })

      if (role === 'TUTOR' && body && typeof body === 'object' && 'additionalData' in body) {
        const ad = (body as { additionalData?: { education?: string; experience?: string; subjects?: string[]; gradeLevels?: unknown; hourlyRate?: number } }).additionalData
        if (ad) {
          await tx
            .update(profile)
            .set({
              credentials: ad.education ? sanitizeHtml(ad.education).trim().slice(0, 2000) : null,
              bio: ad.experience ? `Experience: ${ad.experience} years` : null,
              specialties: Array.isArray(ad.subjects) ? ad.subjects : [],
              hourlyRate: typeof ad.hourlyRate === 'number' ? ad.hourlyRate : null,
              isOnboarded: false,
            })
            .where(eq(profile.userId, userId))
        }
      }

      if (role === 'PARENT' && body && typeof body === 'object' && 'additionalData' in body) {
        const ad = (body as {
          additionalData?: { students?: Array<{ name?: string }>; emergencyContacts?: Array<{ name: string; relationship: string; phone: string }> }
          profileData?: { phoneNumber?: string; timezone?: string }
        }).additionalData
        const profileData = (body as { profileData?: { phoneNumber?: string; timezone?: string } }).profileData
        const familyAccountId = crypto.randomUUID()
        await tx.insert(familyAccount).values({
          id: familyAccountId,
          familyName: name,
          familyType: 'PARENT_STUDENT',
          primaryEmail: normalizedEmail,
          phoneNumber: profileData?.phoneNumber ?? null,
          timezone: profileData?.timezone ?? 'Asia/Shanghai',
          defaultCurrency: 'CNY',
          monthlyBudget: 0,
          enableBudget: false,
          allowAdults: false,
          isActive: true,
          isVerified: false,
        })
        await tx.insert(familyMember).values({
          id: crypto.randomUUID(),
          familyAccountId,
          userId,
          name,
          relation: 'parent',
          email: normalizedEmail,
        })
        const contacts = (ad?.emergencyContacts || []).filter(
          (c: { name?: string; phone?: string }) => c.name && c.phone
        )
        for (const contact of contacts as Array<{ name: string; relationship: string; phone: string }>) {
          await tx.insert(emergencyContact).values({
            id: crypto.randomUUID(),
            parentId: familyAccountId,
            name: contact.name,
            relation: contact.relationship,
            phone: contact.phone,
            isPrimary: false,
          })
        }
        const students = ad?.students
        if (students?.length && verifiedStudents) {
          for (let i = 0; i < students.length; i++) {
            const v = verifiedStudents.get(i)
            if (v) {
              const studentName = (students[i] as { name?: string })?.name || v.name || v.email
              await tx.insert(familyMember).values({
                id: crypto.randomUUID(),
                familyAccountId,
                userId: v.userId,
                name: studentName,
                relation: 'child',
                email: v.email,
              })
            }
          }
        }
      }

      return { id: userId, email: normalizedEmail, role, createdAt: new Date() }
    })

    let studentUniqueId: string | undefined
    if (role === 'STUDENT') {
      const [prof] = await drizzleDb
        .select({ studentUniqueId: profile.studentUniqueId })
        .from(profile)
        .where(eq(profile.userId, newUser.id))
        .limit(1)
      studentUniqueId = prof?.studentUniqueId ?? undefined
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          name,
          email: newUser.email,
          role: newUser.role,
          tosAccepted: true,
          ...(studentUniqueId && { studentUniqueId }),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('Registration error:', err.message, err.stack)
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as { issues: Array<{ message: string }> }
      return NextResponse.json({ error: zodError.issues.map((i) => i.message).join(', ') }, { status: 400 })
    }
    if (error instanceof ValidationError || (error as Error)?.name === 'ValidationError') {
      return NextResponse.json({ error: (error as Error).message || 'Validation error' }, { status: 400 })
    }
    if (error && typeof error === 'object' && 'code' in error) {
      const e = error as { code: string }
      if (e.code === '23505') {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
      }
    }
    const message =
      process.env.NODE_ENV === 'development'
        ? err.message || 'Internal server error. Please try again.'
        : 'Internal server error. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
