/**
 * Forgot Password API
 * Handles password reset requests
 * POST /api/auth/forgot-password
 *
 * Security features:
 * - Returns success even if email not found (prevents user enumeration)
 * - Rate limiting applied at handler level (5 per 15 min per IP)
 * - Tokens expire after 1 hour and are stored in cache (Redis or in-memory)
 */

import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { randomBytes } from 'crypto'
import { getAllowedOrigins } from '@/lib/middleware-edge/cors'
import { checkRateLimit, getClientIdentifier } from '@/lib/security/rate-limit'
import cacheManager from '@/lib/cache-manager'

interface ForgotPasswordRequest {
  email: string
}

interface ForgotPasswordResponse {
  success: boolean
  message: string
}

function buildCorsHeaders(origin: string | null): Record<string, string> {
  if (!origin) return {}
  if (!getAllowedOrigins().includes(origin)) return {}
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin',
  }
}

/**
 * Generate a secure random token
 */
function generateResetToken(): string {
  return randomBytes(32).toString('hex')
}

/**
 * POST handler for forgot password
 */
export async function POST(req: NextRequest): Promise<NextResponse<ForgotPasswordResponse>> {
  try {
    const origin = req.headers.get('origin')
    if (origin && !getAllowedOrigins().includes(origin)) {
      return NextResponse.json({ success: false, message: 'CORS not allowed' }, { status: 403 })
    }
    const corsHeaders = buildCorsHeaders(origin)

    // Rate limiting: 5 requests per 15 minutes per IP
    const clientId = getClientIdentifier(req)
    const { allowed } = await checkRateLimit(`forgot-password:${clientId}`, {
      max: 5,
      windowMs: 15 * 60 * 1000,
    })
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429, headers: { ...corsHeaders, 'Retry-After': '900' } }
      )
    }

    // Parse request body
    const body = (await req.json()) as ForgotPasswordRequest
    const { email } = body

    // Validate email format
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400, headers: corsHeaders }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    // Look up user by email
    const userRecord = await drizzleDb.query.user.findFirst({
      where: eq(user.email, normalizedEmail),
    })

    // IMPORTANT: Return success even if user not found
    // This prevents user enumeration attacks
    if (!userRecord) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Forgot Password] No user found for email: ${normalizedEmail}`)
      }

      return NextResponse.json(
        {
          success: true,
          message: 'If an account exists with this email, you will receive a password reset link.',
        },
        { status: 200, headers: corsHeaders }
      )
    }

    // Generate reset token
    const resetToken = generateResetToken()
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Store token in cache (Redis or in-memory fallback) with 1-hour TTL
    try {
      await cacheManager.set(
        `password-reset:${resetToken}`,
        {
          userId: userRecord.userId,
          email: normalizedEmail,
          expiresAt: tokenExpiry.toISOString(),
        },
        { ttl: 3600 }
      )
    } catch (cacheError) {
      console.error('[Forgot Password] Failed to store reset token:', cacheError)
      // Return generic success to prevent enumeration, but log the backend failure
    }

    // TODO: Send password reset email
    // This should be implemented with a proper email service like SendGrid, Mailgun, etc.

    return NextResponse.json(
      {
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('[Forgot Password] Error:', error)

    // Return generic error message
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again.',
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS handler for CORS preflight
 */
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin')
  if (origin && !getAllowedOrigins().includes(origin)) {
    return NextResponse.json({ success: false, message: 'CORS not allowed' }, { status: 403 })
  }
  return new NextResponse(null, {
    status: 204,
    headers: buildCorsHeaders(origin),
  })
}
