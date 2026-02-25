'use client'

import React, { ErrorBoundary } from 'react-error-boundary'
import * as Sentry from '@sentry/nextjs'

export function GlobalErrorFallback({ error, resetErrorBoundary }) {
  const errorId = Sentry.captureException(error)
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            抱歉，出现了错误
          </h1>
          <p className="text-gray-600 mb-4">
            错误已记录，错误ID: {errorId}
          </p>
          <button
            onClick={resetErrorBoundary}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            重新加载页面
          </button>
        </div>
      </div>
    </div>
  )
}