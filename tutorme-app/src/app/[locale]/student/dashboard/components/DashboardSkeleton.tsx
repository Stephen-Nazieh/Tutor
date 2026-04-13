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
        <div className="bg-muted h-9 w-64 animate-pulse rounded" />
        <div className="bg-muted/70 mt-2 h-5 w-80 animate-pulse rounded" />
      </div>
      {/* Two-column grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Continue Learning skeleton */}
          <div className="border-border bg-card rounded-lg border p-6">
            <div className="bg-muted h-6 w-40 animate-pulse rounded" />
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="border-border flex gap-4 rounded-lg border p-3">
                  <div className="bg-muted/70 h-12 w-12 animate-pulse rounded-lg" />
                  <div className="flex-1">
                    <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
                    <div className="bg-muted/70 mt-2 h-3 w-1/2 animate-pulse rounded" />
                    <div className="bg-muted/70 mt-2 h-2 w-full animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Recommendations skeleton */}
          <div className="border-border bg-card rounded-lg border p-6">
            <div className="bg-muted h-6 w-44 animate-pulse rounded" />
            <div className="mt-4 space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="bg-muted/70 h-20 animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Upcoming Classes skeleton */}
          <div className="border-border bg-card rounded-lg border p-6">
            <div className="bg-muted h-6 w-36 animate-pulse rounded" />
            <div className="mt-4 space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="bg-muted/70 h-16 animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
