/**
 * Standardized API response helpers.
 * Use these for consistent response shapes across all API routes.
 *
 * Success: { success: true, data?: T }
 * Error: { error: string }
 */

import { NextResponse } from 'next/server'

/** Create standardized success response */
export function apiSuccess<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status })
}

/** Create standardized success response with message (e.g. for 201 Created) */
export function apiSuccessWithMessage<T>(
  data: T,
  message: string,
  status = 200
): NextResponse {
  return NextResponse.json({ success: true, data, message }, { status })
}

/** Create standardized error response */
export function apiError(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status })
}
