/**
 * API Route Middleware Utilities
 * Provides authentication, authorization, CSRF, rate limiting, and error handling for API routes
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import type { Session } from 'next-auth'
import { verifyCsrfToken } from '@/lib/security/csrf'
import { checkRateLimit, checkRateLimitPreset, getClientIdentifier } from '@/lib/security/rate-limit'
import { hasPermission, type Permission } from '@/lib/security/rbac'
import { isAdminIpAllowed, getClientIp } from '@/lib/security/admin-ip'

// Custom error classes
export class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized - Please log in') {
        super(message)
        this.name = 'UnauthorizedError'
    }
}

export class ForbiddenError extends Error {
    constructor(message = 'Forbidden - Insufficient permissions') {
        super(message)
        this.name = 'ForbiddenError'
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message)
        this.name = 'NotFoundError'
    }
}

/**
 * Centralised API error logging and 500 response.
 * Use in route catch blocks for consistent logging and response shape.
 */
export function handleApiError(
    error: unknown,
    defaultMessage: string = 'Internal server error',
    logLabel: string = 'API Error'
): NextResponse {
    console.error(`[${logLabel}]`, error)
    const message = error instanceof Error ? error.message : defaultMessage
    const isDev = process.env.NODE_ENV === 'development'
    return NextResponse.json(
        { error: isDev ? message : defaultMessage },
        { status: 500 }
    )
}

// Handler type (context is optional route params, e.g. { params: { id: string } })
type Handler = (
    req: NextRequest,
    session: Session,
    context?: { params?: Record<string, string | string[]> }
) => Promise<Response> | Response

// Middleware options
interface WithAuthOptions {
    role?: 'TUTOR' | 'STUDENT' | 'ADMIN'
    optional?: boolean
}

/**
 * Authentication middleware wrapper
 * Automatically handles session validation, role checking, and error responses
 * 
 * @example
 * export const GET = withAuth(async (req, session) => {
 *   // session is guaranteed to exist
 *   return NextResponse.json({ userId: session.user.id })
 * })
 * 
 * @example with role requirement
 * export const POST = withAuth(async (req, session) => {
 *   // session.user.role === 'TUTOR' is guaranteed
 *   return NextResponse.json({})
 * }, { role: 'TUTOR' })
 */
export function withAuth(
    handler: Handler,
    options?: WithAuthOptions
) {
    return async (req: NextRequest, context?: { params?: Record<string, string | string[]> }) => {
        try {
            const session = await getServerSession(authOptions)

            // Check if user is authenticated
            if (!session?.user?.id) {
                if (options?.optional) {
                    // Allow unauthenticated access
                    return handler(req, session as Session, context)
                }
                throw new UnauthorizedError()
            }

            // Check role requirements
            if (options?.role && session.user.role !== options.role) {
                throw new ForbiddenError(`This endpoint requires ${options.role} role`)
            }

            // Call the actual handler
            return await handler(req, session, context)

        } catch (error) {
            // Handle known error types
            if (error instanceof UnauthorizedError) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 401 }
                )
            }

            if (error instanceof ForbiddenError) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 403 }
                )
            }

            if (error instanceof ValidationError) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                )
            }

            if (error instanceof NotFoundError) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 404 }
                )
            }

            // Handle unknown errors
            console.error('API Error:', error)

            // Don't expose internal errors in production
            const isDev = process.env.NODE_ENV === 'development'
            return NextResponse.json(
                {
                    error: isDev
                        ? (error instanceof Error ? error.message : 'Unknown error')
                        : 'Internal server error'
                },
                { status: 500 }
            )
        }
    }
}

/**
 * Get the current user session without throwing errors
 * Useful for optional authentication scenarios
 */
export async function getCurrentSession(): Promise<Session | null> {
    try {
        return await getServerSession(authOptions)
    } catch (error) {
        console.error('Error getting session:', error)
        return null
    }
}

/**
 * Require authentication - throws if not authenticated
 * Useful when you need the session inside a try/catch block
 */
export async function requireAuth(): Promise<Session> {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new UnauthorizedError()
    }
    return session
}

/**
 * Require specific role - throws if wrong role
 */
export async function requireRole(role: 'TUTOR' | 'STUDENT' | 'ADMIN'): Promise<Session> {
    const session = await requireAuth()
    if (session.user.role !== role) {
        throw new ForbiddenError(`This action requires ${role} role`)
    }
    return session
}

/** State-changing methods that require CSRF */
const CSRF_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

/** API path prefixes that skip CSRF (webhooks, auth, public) */
const CSRF_SKIP_PATHS = ['/api/auth', '/api/payments/webhooks', '/api/csrf', '/api/health']

/**
 * Verify CSRF for state-changing requests. Call at the start of POST/PUT/PATCH/DELETE handlers
 * that are not webhooks or auth. Returns 403 response if invalid; otherwise returns null.
 */
export async function requireCsrf(req: NextRequest): Promise<NextResponse | null> {
    if (!CSRF_METHODS.has(req.method)) return null
    const path = req.nextUrl?.pathname ?? ''
    if (CSRF_SKIP_PATHS.some((p) => path.startsWith(p))) return null
    const valid = await verifyCsrfToken(req)
    if (!valid) {
        return NextResponse.json({ error: 'Invalid or missing CSRF token' }, { status: 403 })
    }
    return null
}

type AnyHandler = (req: NextRequest, ...args: unknown[]) => Promise<Response> | Response

/**
 * Wraps a state-changing handler to require a valid CSRF token (POST/PUT/PATCH/DELETE).
 * Use with withAuth: export const POST = withCsrf(withAuth(async (req, session) => ...))
 */
export function withCsrf(handler: AnyHandler): AnyHandler {
    return async (req: NextRequest, ...args: unknown[]) => {
        const csrfError = await requireCsrf(req)
        if (csrfError) return csrfError
        return handler(req, ...args)
    }
}

/**
 * Apply rate limit by client IP (and optionally by userId when session exists).
 * Returns 429 response if over limit; otherwise returns null.
 */
export async function withRateLimit(
    req: NextRequest,
    max: number = 100
): Promise<{ response: NextResponse | null; remaining: number }> {
    const key = getClientIdentifier(req)
    const { allowed, remaining } = await checkRateLimit(key, max)
    if (!allowed) {
        const res = NextResponse.json(
            { error: 'Too many requests' },
            { status: 429, headers: { 'Retry-After': '60' } }
        )
        return { response: res, remaining: 0 }
    }
    return { response: null, remaining }
}

type RateLimitPreset = 'login' | 'register' | 'paymentCreate' | 'enroll' | 'booking'

/**
 * Apply rate limit using a named preset (stricter limits for sensitive routes).
 * Returns 429 response if over limit; otherwise returns null.
 */
export async function withRateLimitPreset(
    req: NextRequest,
    preset: RateLimitPreset
): Promise<{ response: NextResponse | null; remaining: number }> {
    const { allowed, remaining, resetAt } = await checkRateLimitPreset(req as unknown as Request, preset)
    if (!allowed) {
        const retryAfter = Math.ceil((resetAt - Date.now()) / 1000)
        const res = NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429, headers: { 'Retry-After': String(Math.max(1, retryAfter)) } }
        )
        return { response: res, remaining: 0 }
    }
    return { response: null, remaining }
}

/**
 * Require a specific permission (RBAC). Call after withAuth.
 * Returns 403 if user's role does not have the permission.
 */
export function requirePermission(session: Session, permission: Permission): NextResponse | null {
    const role = session?.user?.role as 'ADMIN' | 'TUTOR' | 'STUDENT' | undefined
    if (!role || !hasPermission(role, permission)) {
        return NextResponse.json({ error: 'Forbidden - Insufficient permissions' }, { status: 403 })
    }
    return null
}

/**
 * Require admin IP whitelist. When ADMIN_IP_WHITELIST is set, only listed IPs can access.
 * Returns 403 if client IP is not allowed.
 */
export function requireAdminIp(req: NextRequest): NextResponse | null {
    const ip = getClientIp(req as unknown as Request)
    if (!isAdminIpAllowed(ip)) {
        return NextResponse.json({ error: 'Forbidden - Admin access not allowed from this IP' }, { status: 403 })
    }
    return null
}

/**
 * Get auth from session or API key (Bearer). Use for admin routes that support both browser and server-to-server.
 * Returns session if logged in, or { apiKey: keyId } if valid Bearer key, else null.
 */
export async function getSessionOrApiKey(req: NextRequest): Promise<
    | { type: 'session'; session: Session }
    | { type: 'apiKey'; keyId: string }
    | null
> {
    const authHeader = req.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7)
        if (token.startsWith('tm_')) {
            const { verifyApiKey } = await import('@/lib/security/api-key')
            const key = await verifyApiKey(token)
            if (key) return { type: 'apiKey', keyId: key.id }
        }
    }
    const session = await getServerSession(authOptions)
    if (session?.user?.id) return { type: 'session', session }
    return null
}
