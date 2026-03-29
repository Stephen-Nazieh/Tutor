import { NextResponse } from 'next/server'
import { captureError } from './error-handler'
import { ZodError } from 'zod'

export type ApiHandler<T = any> = (
  req: Request,
  context: { params: T }
) => Promise<NextResponse> | NextResponse

export function withApiHandler<T = any>(handler: ApiHandler<T>) {
  return async (req: Request, context: { params: T }) => {
    try {
      return await handler(req, context)
    } catch (error: any) {
      console.error('[API Error]', error)

      // Handle Zod validation errors
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            error: 'Validation Error',
            details: error.issues,
          },
          { status: 400 }
        )
      }

      // Capture in Sentry
      const errorId = captureError(error, {
        path: new URL(req.url).pathname,
        method: req.method,
      })

      // Return consistent error response
      return NextResponse.json(
        {
          error: error.message || 'Internal Server Error',
          errorId,
        },
        { status: error.status || 500 }
      )
    }
  }
}
