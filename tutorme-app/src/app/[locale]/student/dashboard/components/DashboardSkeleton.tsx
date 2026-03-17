'use client'

interface DashboardSkeletonProps {
  loadingLabel?: string
}

export function DashboardSkeleton({ loadingLabel = 'Loading your dashboard...' }: DashboardSkeletonProps) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8" aria-live="polite" aria-busy="true">
      <p className="sr-only">{loadingLabel}</p>
      {/* Welcome skeleton */}
      <div className="mb-8">
        <div className="h-9 w-64 bg-muted rounded animate-pulse" />
        <div className="h-5 w-80 mt-2 bg-muted/70 rounded animate-pulse" />
      </div>
      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning skeleton */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="h-6 w-40 bg-muted rounded animate-pulse" />
            <div className="space-y-3 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-3 border border-border rounded-lg">
                  <div className="h-12 w-12 rounded-lg bg-muted/70 animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-1/2 mt-2 bg-muted/70 rounded animate-pulse" />
                    <div className="h-2 w-full mt-2 bg-muted/70 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Recommendations skeleton */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="h-6 w-44 bg-muted rounded animate-pulse" />
            <div className="space-y-3 mt-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 bg-muted/70 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Upcoming Classes skeleton */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="h-6 w-36 bg-muted rounded animate-pulse" />
            <div className="space-y-3 mt-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 bg-muted/70 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
