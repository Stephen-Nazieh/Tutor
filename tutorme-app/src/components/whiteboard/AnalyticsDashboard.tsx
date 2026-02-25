/**
 * Analytics Dashboard Component
 * 
 * Real-time whiteboard analytics with latency percentiles, ops/sec, and alerts.
 */

'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Activity, 
  Clock, 
  Zap,
  AlertTriangle,
  Users,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AnalyticsSnapshot } from '@/lib/whiteboard/analytics'

interface AnalyticsDashboardProps {
  snapshot: AnalyticsSnapshot | null
  alerts: Array<{
    level: 'warning' | 'critical'
    message: string
    metric: string
    value: number
    threshold: number
  }>
  timeSeriesData: Array<{
    timestamp: number
    opsPerSecond: number
    p95Latency: number
  }>
  className?: string
}

export function AnalyticsDashboard({
  snapshot,
  alerts,
  timeSeriesData,
  className,
}: AnalyticsDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<'ops' | 'latency'>('ops')

  // Calculate sparkline path
  const sparklinePath = useMemo(() => {
    if (timeSeriesData.length < 2) return ''
    
    const values = selectedMetric === 'ops' 
      ? timeSeriesData.map(d => d.opsPerSecond)
      : timeSeriesData.map(d => d.p95Latency)
    
    const max = Math.max(...values, 1)
    const min = Math.min(...values)
    const range = max - min || 1
    
    const width = 200
    const height = 40
    
    return values.map((value, i) => {
      const x = (i / (values.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
  }, [timeSeriesData, selectedMetric])

  const formatLatency = (ms: number) => {
    if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`
    if (ms < 1000) return `${ms.toFixed(1)}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  const criticalAlerts = alerts.filter(a => a.level === 'critical')
  const warningAlerts = alerts.filter(a => a.level === 'warning')

  if (!snapshot) {
    return (
      <div className={cn('bg-gray-50 border rounded-lg p-8 text-center', className)}>
        <Activity className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-500">Analytics not available</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {criticalAlerts.map((alert, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">{alert.message}</span>
            </div>
          ))}
          {warningAlerts.map((alert, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-700">{alert.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ops/Sec */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-gray-500">Ops/Sec</CardTitle>
            <Zap className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{snapshot.opsPerSecond.toFixed(1)}</div>
            <p className="text-xs text-gray-400">
              {snapshot.dropRate > 0 && (
                <span className="text-red-500">{(snapshot.dropRate * 100).toFixed(1)}% dropped</span>
              )}
            </p>
          </CardContent>
        </Card>

        {/* P95 Latency */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-gray-500">P95 Latency</CardTitle>
            <Clock className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatLatency(snapshot.p95LatencyMs)}</div>
            <p className="text-xs text-gray-400">
              p50: {formatLatency(snapshot.p50LatencyMs)}
            </p>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-gray-500">Active Users</CardTitle>
            <Users className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{snapshot.activeUsers}</div>
            <p className="text-xs text-gray-400">
              {snapshot.reconnectRate > 0 && (
                <span>{snapshot.reconnectRate.toFixed(1)}/min reconnects</span>
              )}
            </p>
          </CardContent>
        </Card>

        {/* Conflict Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-gray-500">Conflict Rate</CardTitle>
            <RefreshCw className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-2xl font-bold",
              snapshot.conflictRate > 0.1 ? 'text-red-600' : 'text-green-600'
            )}>
              {(snapshot.conflictRate * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-gray-400">
              Queue: {snapshot.queueDepth}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sparkline Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Real-time Metrics</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMetric('ops')}
              className={cn(
                "px-2 py-1 text-xs rounded",
                selectedMetric === 'ops' ? 'bg-gray-900 text-white' : 'bg-gray-100'
              )}
            >
              Ops/sec
            </button>
            <button
              onClick={() => setSelectedMetric('latency')}
              className={cn(
                "px-2 py-1 text-xs rounded",
                selectedMetric === 'latency' ? 'bg-gray-900 text-white' : 'bg-gray-100'
              )}
            >
              Latency
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-16 w-full">
            {sparklinePath ? (
              <svg viewBox="0 0 200 40" className="w-full h-full">
                <path
                  d={sparklinePath}
                  fill="none"
                  stroke={selectedMetric === 'ops' ? '#f59e0b' : '#3b82f6'}
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-2">
        <span>Last updated: {new Date(snapshot.timestamp).toLocaleTimeString()}</span>
        <span>p99: {formatLatency(snapshot.p99LatencyMs)}</span>
      </div>
    </div>
  )
}
