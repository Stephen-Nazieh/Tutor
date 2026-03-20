'use client'

interface DashboardSkeletonProps {
  loadingLabel?: string
}

export function DashboardSkeleton({
  loadingLabel = 'Loading your dashboard...',
}: DashboardSkeletonProps) {
  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8" aria-live="polite" aria-busy="true">
      <p className="sr-only">{loadingLabel}</p>
      {/* Welcome skeleton */}
      <div className="mb-8">
        <div className="h-9 w-64 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-5 w-80 animate-pulse rounded bg-muted/70" />
      </div>
      {/* Two-column grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Continue Learning skeleton */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="h-6 w-40 animate-pulse rounded bg-muted" />
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 rounded-lg border border-border p-3">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-muted/70" />
                  <div className="flex-1">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted/70" />
                    <div className="mt-2 h-2 w-full animate-pulse rounded bg-muted/70" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Recommendations skeleton */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="h-6 w-44 animate-pulse rounded bg-muted" />
            <div className="mt-4 space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="h-20 animate-pulse rounded-lg bg-muted/70" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Upcoming Classes skeleton */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="h-6 w-36 animate-pulse rounded bg-muted" />
            <div className="mt-4 space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="h-16 animate-pulse rounded-lg bg-muted/70" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
