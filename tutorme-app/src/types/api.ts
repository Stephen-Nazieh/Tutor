/**
 * Shared API request/response types.
 * Use for consistent JSON shapes and to reduce `any` in route handlers.
 */

/** Standard API error response (4xx/5xx) */
export interface ApiErrorResponse {
  error: string
}

/** Generic success with data payload */
export interface ApiSuccessResponse<T = unknown> {
  data?: T
  message?: string
  [key: string]: unknown
}

/** Type guard for API error body */
export function isApiErrorResponse(body: unknown): body is ApiErrorResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof (body as ApiErrorResponse).error === 'string'
  )
}
