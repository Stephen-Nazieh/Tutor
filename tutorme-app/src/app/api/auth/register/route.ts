/**
 * POST /api/auth/register
 * Register a new user account
 */

import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { db } from '@/lib/db'
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

async function generateUniqueUsername(tx: Prisma.TransactionClient, preferred: string): Promise<string> {
  const base = normalizeUsernameSeed(preferred)
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = attempt === 0 ? '' : String(Math.floor(Math.random() * 9000) + 1000)
    const candidate = `${base}${suffix}`.slice(0, 30)
    const exists = await tx.profile.findUnique({
      where: { username: candidate },
      select: { id: true },
    })
    if (!exists) return candidate
  }
  return `tutor${nanoid(8).toLowerCase()}`
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body first to catch JSON parsing errors
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    // Validate request body with Zod
    const parsed = RegisterUserSchema.safeParse(body)
    if (!parsed.success) {
      const messages = parsed.error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ')
      return NextResponse.json({ error: messages }, { status: 400 })
    }

    const { email, password, role } = parsed.data
    const name = sanitizeHtml(parsed.data.name).trim().slice(0, 100) || 'User'

    // Role/email scoped rate limit prevents cross-tab role registrations from tripping each other.
    const clientId = getClientIdentifier(request)
    const registerOptions = RATE_LIMIT_PRESETS.register
    const scopedRateLimit = await checkRateLimit(
      `register:${clientId}:${String(role).toUpperCase()}:${String(email).toLowerCase()}`,
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

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      throw new ValidationError('Email already registered')
    }

    // PARENT: Verify all children exist before creating family (security requirement)
    if (role === 'PARENT' && body.additionalData?.students) {
      const { verified, errors } = await verifyAllChildren(body.additionalData.students)
      if (errors.length > 0) {
        const msg = errors.map((e) => `Child ${e.index + 1}: ${e.message}`).join('; ')
        return NextResponse.json({ error: msg }, { status: 400 })
      }
      // Check no student is already linked to another family
      verifiedStudents = verified
      for (const [, student] of verified) {
        if (await isStudentAlreadyLinked(student.userId)) {
          return NextResponse.json(
            {
              error: `Student ${student.email} is already linked to another parent account.`,
            },
            { status: 400 }
          )
        }
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with profile in a transaction
    const user = await db.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create the user
      const newUser = await tx.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          role,
        },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
        }
      })

      const defaultUsername =
        role === 'TUTOR'
          ? await generateUniqueUsername(tx, name || email.split('@')[0] || 'tutor')
          : null

      // Create the profile (with studentUniqueId for STUDENT role - used for parent linking)
      await tx.profile.create({
        data: {
          userId: newUser.id,
          name,
          ...(defaultUsername ? { username: defaultUsername } : {}),
          tosAccepted: true,
          tosAcceptedAt: new Date(),
          ...(role === 'STUDENT' && {
            studentUniqueId: `STU-${nanoid(12)}`,
          }),
        },
      })

      // If TUTOR role, update profile with tutor-specific data
      if (role === 'TUTOR' && body.additionalData) {
        const { education, experience, subjects, gradeLevels, hourlyRate } = body.additionalData
        
        await tx.profile.update({
          where: { userId: newUser.id },
          data: {
            // Map education to credentials, experience to bio
            credentials: education ? sanitizeHtml(education).trim().slice(0, 2000) : null,
            // Combine experience with bio if provided
            bio: experience ? `Experience: ${experience} years` : null,
            // Map subjects to specialties
            specialties: Array.isArray(subjects) ? subjects : [],
            // Store hourly rate
            hourlyRate: typeof hourlyRate === 'number' ? hourlyRate : null,
            // Tutor starts as not onboarded - needs admin approval
            isOnboarded: false,
          },
        })
      }

      // If PARENT role, create family account and related data
      if (role === 'PARENT' && body.additionalData) {
        const { students, emergencyContacts, notificationPreferences } = body.additionalData
        
        // Create FamilyAccount
        const familyAccount = await tx.familyAccount.create({
          data: {
            familyName: name,
            primaryEmail: email.toLowerCase(),
            phoneNumber: body.profileData?.phoneNumber,
            timezone: body.profileData?.timezone || 'Asia/Shanghai',
            defaultCurrency: 'CNY',
          }
        })

        // Link parent user to family account
        await tx.familyMember.create({
          data: {
            familyAccountId: familyAccount.id,
            userId: newUser.id,
            name,
            relation: 'parent',
            email: email.toLowerCase(),
          }
        })

        // Create emergency contacts (filter out empty placeholder entries)
        const validContacts = (emergencyContacts || []).filter(
          (c: { name?: string; phone?: string }) => c.name && c.phone
        )
        if (validContacts.length > 0) {
          await tx.emergencyContact.createMany({
            data: validContacts.map((contact: { name: string; relationship: string; phone: string }) => ({
              parentId: familyAccount.id,
              name: contact.name,
              relation: contact.relationship,
              phone: contact.phone,
              isPrimary: false,
            }))
          })
        }

        // Create family member records for verified students (with userId for proper linking)
        if (students && students.length > 0 && verifiedStudents) {
          for (let i = 0; i < students.length; i++) {
            const v = verifiedStudents.get(i)
            if (v) {
              await tx.familyMember.create({
                data: {
                  familyAccountId: familyAccount.id,
                  userId: v.userId,
                  name: v.name || students[i].name || v.email,
                  relation: 'child',
                  email: v.email,
                },
              })
            }
          }
        }
      }

      return newUser
    })

    // For STUDENT: fetch studentUniqueId to return (for parent linking)
    let studentUniqueId: string | undefined
    if (role === 'STUDENT') {
      const profile = await db.profile.findUnique({
        where: { userId: user.id },
        select: { studentUniqueId: true },
      })
      studentUniqueId = profile?.studentUniqueId ?? undefined
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        name,
        email: user.email,
        role: user.role,
        tosAccepted: true,
        ...(studentUniqueId && { studentUniqueId }),
      },
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)

    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as { issues: Array<{ message: string }> }
      const message = zodError.issues.map(i => i.message).join(', ')
      return NextResponse.json({ error: message }, { status: 400 })
    }

    // Handle ValidationError
    if (error instanceof ValidationError || (error as Error)?.name === 'ValidationError') {
      const message = (error as Error).message || 'Validation error'
      return NextResponse.json({ error: message }, { status: 400 })
    }

    // Handle Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; message?: string }
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
