/**
 * POST /api/auth/register
 * Register a new user account (Drizzle ORM)
 */

import { NextRequest, NextResponse } from 'next/server'
import { ValidationError } from '@/lib/api/middleware'
import { performRegistration } from '@/lib/registration/register-user'
import type { RegisterUserInput } from '@/lib/validation/schemas'

export async function POST(request: NextRequest) {
  try {
    let body: RegisterUserInput
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    const result = await performRegistration(request, body)
    return NextResponse.json(result.body, { status: result.status, headers: result.headers })
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
        : err.message || 'Internal server error. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
