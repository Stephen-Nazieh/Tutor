import * as Sentry from '@sentry/nextjs'

export function captureError(error: Error, context: Record<string, unknown> = {}): string {
  const errorId = Sentry.captureException(error, {
    contexts: {
      api: {
        path: context.path,
        method: context.method,
        query: context.query,
        userAgent: context.userAgent
      },
      user: context.user
    },
    tags: {
      source: 'api',
      route: context.route,
      requestId: context.requestId
    }
  })
  
  return errorId
}

export async function monitoredApiHandler(
  handler: () => Promise<NextResponse>,
  context: Record<string, unknown>
): Promise<NextResponse> {
  const transaction = Sentry.startTransaction({
    op: 'http.server',
    name: context.route,
    tags: {
      method: context.method,
      route: context.route
    }
  })
  
  try {
    return await handler()
  } catch (error) {
    captureError(error as Error, context)
    throw error
  } finally {
    transaction.finish()
  }
}