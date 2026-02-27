import * as Sentry from '@sentry/nextjs'
import type { NextResponse } from 'next/server'

export interface ErrorHandlerContext {
  path?: string
  method?: string
  query?: unknown
  userAgent?: string
  user?: unknown
  route?: string
  requestId?: string
}

export function captureError(error: Error, context: ErrorHandlerContext = {}): string {
  const errorId = Sentry.captureException(error, {
    contexts: {
      api: {
        path: context.path,
        method: context.method,
        query: context.query,
        userAgent: context.userAgent,
      },
      ...(context.user !== undefined && { user: context.user as Record<string, unknown> }),
    },
    tags: {
      source: 'api',
      route: context.route,
      requestId: context.requestId,
    },
  })

  return errorId
}

export async function monitoredApiHandler(
  handler: () => Promise<NextResponse>,
  context: ErrorHandlerContext
): Promise<NextResponse> {
  return Sentry.startSpan(
    {
      op: 'http.server',
      name: (context.route as string) || 'api',
      attributes: {
        'http.method': context.method,
        'http.route': context.route,
      },
    },
    async () => {
      try {
        return await handler()
      } catch (error) {
        captureError(error as Error, context)
        throw error
      }
    }
  )
}
