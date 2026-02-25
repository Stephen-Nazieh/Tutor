/**
 * Standardized API request/response types.
 * Use for consistent JSON shapes across all API routes.
 *
 * STANDARD FORMAT:
 * - Success: { success: true, data?: T }
 * - Error: { error: string }
 */

/** Standard API error response (4xx/5xx) */
export interface ApiErrorResponse {
  error: string
}

/** Standard success response - always use { success: true, data?: T } */
export interface ApiSuccessResponse<T = unknown> {
  success: true
  data?: T
  message?: string
}

/** Legacy success with named payload - prefer ApiSuccessResponse<T> for new code */
export type ApiSuccessWithPayload<T, K extends string> = {
  success: true
} & Record<K, T>

/** Type guard for API error body */
export function isApiErrorResponse(body: unknown): body is ApiErrorResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof (body as ApiErrorResponse).error === 'string'
  )
}

/** Create standardized success response */
export function apiSuccess<T>(data: T, status = 200): Response {
  return Response.json({ success: true, data }, { status })
}

/** Create standardized success response with message (e.g. for 201 Created) */
export function apiSuccessWithMessage<T>(data: T, message: string, status = 200): Response {
  return Response.json({ success: true, data, message }, { status })
}

/** Create standardized error response */
export function apiError(message: string, status = 400): Response {
  return Response.json({ error: message }, { status })
}
