// @ts-nocheck
'use client'

import React, { ErrorBoundary } from 'react-error-boundary'
import * as Sentry from '@sentry/nextjs'

export function GlobalErrorFallback({ error, resetErrorBoundary }) {
  const errorId = Sentry.captureException(error)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-red-600">抱歉，出现了错误</h1>
          <p className="mb-4 text-gray-600">错误已记录，错误ID: {errorId}</p>
          <button
            onClick={resetErrorBoundary}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            重新加载页面
          </button>
        </div>
      </div>
    </div>
  )
}
