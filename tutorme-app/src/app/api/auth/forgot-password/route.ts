/**
 * Forgot Password API
 * Handles password reset requests
 * POST /api/auth/forgot-password
 *
 * Security features:
 * - Returns success even if email not found (prevents user enumeration)
 * - Rate limiting should be applied at middleware level
 * - Tokens expire after 1 hour
 */

import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { randomBytes } from 'crypto'

interface ForgotPasswordRequest {
  email: string
}

interface ForgotPasswordResponse {
  success: boolean
  message: string
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
    // Parse request body
    const body = (await req.json()) as ForgotPasswordRequest
    const { email } = body

    // Validate email format
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 })
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
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = generateResetToken()
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // TODO: Store token in database
    // For now, log it in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Forgot Password] Reset token generated:', {
        email: normalizedEmail,
        token: resetToken,
        expires: tokenExpiry.toISOString(),
        userId: userRecord.id,
      })
    }

    // TODO: Send password reset email
    // This should be implemented with a proper email service like SendGrid, AWS SES, etc.
    // Example:
    // await sendPasswordResetEmail({
    //   to: normalizedEmail,
    //   token: resetToken,
    //   userName: userRecord.name,
    // });

    // For now, in development, we log the reset URL
    if (process.env.NODE_ENV === 'development') {
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3003'
      const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`
      console.log('[Forgot Password] Reset URL:', resetUrl)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      },
      { status: 200 }
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
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
