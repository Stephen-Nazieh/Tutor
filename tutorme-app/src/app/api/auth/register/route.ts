/**
 * POST /api/auth/register
 * Register a new user account
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { RegisterUserSchema } from '@/lib/validation/schemas'
import { ValidationError, withRateLimitPreset } from '@/lib/api/middleware'
import { sanitizeHtml } from '@/lib/security/sanitize'

export async function POST(request: NextRequest) {
  const { response: rateLimitResponse } = await withRateLimitPreset(request, 'register')
  if (rateLimitResponse) return rateLimitResponse

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
      const messages = parsed.error.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ')
      return NextResponse.json({ error: messages }, { status: 400 })
    }

    const { email, password, role } = parsed.data
    const name = sanitizeHtml(parsed.data.name).trim().slice(0, 100) || 'User'

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      throw new ValidationError('Email already registered')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with profile in a transaction
    const user = await db.$transaction(async (tx: any) => {
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

      // Create the profile
      await tx.profile.create({
        data: {
          userId: newUser.id,
          name,
          tosAccepted: true,
          tosAcceptedAt: new Date(),
        }
      })

      return newUser
    })

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        name,
        email: user.email,
        role: user.role,
        tosAccepted: true,
      }
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
