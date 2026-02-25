'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { 
  Users, 
  Clock, 
  MessageSquare, 
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  PieChart,
  AlertCircle
} from 'lucide-react'
import type { EngagementMetrics, Alert } from '../types'

interface LiveAnalyticsProps {
  metrics: EngagementMetrics
  alerts: Alert[]
}

export function LiveAnalytics({ metrics, alerts }: LiveAnalyticsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  // Calculate percentages
  const veryEngagedPct = Math.round((metrics.veryEngaged / metrics.totalStudents) * 100)
  const engagedPct = Math.round((metrics.engaged / metrics.totalStudents) * 100)
  const passivePct = Math.round((metrics.passive / metrics.totalStudents) * 100)
  const disengagedPct = Math.round((metrics.disengaged / metrics.totalStudents) * 100)

  return (
    <div className="space-y-4">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Avg. Engagement</p>
                <p className="text-2xl font-bold">{metrics.averageEngagement}%</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.engagementTrend)}
                <span className={cn(
                  "text-xs font-medium",
                  metrics.engagementTrend === 'up' ? 'text-green-600' : 
                  metrics.engagementTrend === 'down' ? 'text-red-600' : 'text-gray-600'
                )}>
                  {metrics.engagementTrend === 'up' ? '+5%' : 
                   metrics.engagementTrend === 'down' ? '-3%' : '0%'}
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Activity className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">Last 5 min avg</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Participation</p>
                <p className="text-2xl font-bold">{metrics.participationRate}%</p>
              </div>
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {metrics.totalChatMessages} messages sent
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Active Students</p>
                <p className="text-2xl font-bold">{metrics.activeStudents}</p>
              </div>
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-500">
                of {metrics.totalStudents} total
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Class Duration</p>
                <p className="text-2xl font-bold">
                  {Math.floor(metrics.classDuration / 60)}:
                  {(metrics.classDuration % 60).toString().padStart(2, '0')}
                </p>
              </div>
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-500">
                Started {new Date(metrics.classStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Distribution */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            <CardTitle className="text-sm font-medium">Engagement Distribution</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-20 text-xs font-medium text-gray-600">Very Engaged</div>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${veryEngagedPct}%` }}
                />
              </div>
              <span className="w-10 text-xs text-right">{veryEngagedPct}%</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 text-xs font-medium text-gray-600">Engaged</div>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${engagedPct}%` }}
                />
              </div>
              <span className="w-10 text-xs text-right">{engagedPct}%</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 text-xs font-medium text-gray-600">Passive</div>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full transition-all"
                  style={{ width: `${passivePct}%` }}
                />
              </div>
              <span className="w-10 text-xs text-right">{passivePct}%</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 text-xs font-medium text-gray-600">Disengaged</div>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all"
                  style={{ width: `${disengagedPct}%` }}
                />
              </div>
              <span className="w-10 text-xs text-right">{disengagedPct}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <CardTitle className="text-sm font-medium">Attention Alerts</CardTitle>
            </div>
            {alerts.filter(a => !a.acknowledged).length > 0 && (
              <Badge variant="destructive" className="text-xs">
                {alerts.filter(a => !a.acknowledged).length} Active
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {alerts.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No alerts - class is going smoothly!
            </p>
          ) : (
            <div className="space-y-2">
              {alerts.slice(0, 5).map((alert) => (
                <div 
                  key={alert.id}
                  className={cn(
                    "p-3 rounded-lg border text-sm",
                    getAlertColor(alert.severity),
                    !alert.acknowledged && "animate-pulse"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-xs opacity-80 mt-0.5">{alert.message}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
