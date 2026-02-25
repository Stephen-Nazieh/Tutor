'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Activity, 
  Users, 
  Calendar, 
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'

interface EngagementMetrics {
  classId: string
  period: { start: string; end: string }
  overallEngagement: number
  metrics: {
    attendance: number
    participation: number
    assignmentCompletion: number
    quizParticipation: number
    discussionActivity: number
  }
  dailyTrend: { date: string; engagement: number; attendance: number }[]
  hourlyPattern: { hour: number; activity: number }[]
  studentsAtRisk: string[]
}

interface EngagementDashboardProps {
  classId: string
}

export function EngagementDashboard({ classId }: EngagementDashboardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [engagement, setEngagement] = useState<EngagementMetrics | null>(null)
  const [period, setPeriod] = useState(30)

  useEffect(() => {
    if (!classId) return
    
    fetchEngagementData()
  }, [classId, period])

  const fetchEngagementData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/analytics/engagement/${classId}?days=${period}`, {
        credentials: 'include',
      })
      
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setEngagement(data.data)
        }
      } else {
        toast.error('Failed to load engagement data')
      }
    } catch (error) {
      console.error('Error fetching engagement:', error)
      toast.error('Error loading engagement metrics')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportEngagement = async () => {
    try {
      const res = await fetch(`/api/reports/engagement/${classId}?days=${period}`, {
        credentials: 'include',
      })
      
      if (res.ok) {
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `engagement-report-${classId}.xlsx`
        a.click()
        window.URL.revokeObjectURL(url)
        toast.success('Engagement report downloaded')
      } else {
        toast.error('Failed to export engagement report')
      }
    } catch (error) {
      toast.error('Error exporting report')
    }
  }

  const getEngagementColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getEngagementBgColor = (score: number) => {
    if (score >= 70) return 'bg-green-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getEngagementLabel = (score: number) => {
    if (score >= 70) return 'High'
    if (score >= 50) return 'Medium'
    return 'Low'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!engagement) {
    return (
      <Card className="py-12">
        <CardContent className="text-center">
          <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No Data Available</h3>
          <p className="text-gray-500">Engagement metrics could not be loaded for this class.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <span className="text-sm text-gray-500">
            {new Date(engagement.period.start).toLocaleDateString()} - {new Date(engagement.period.end).toLocaleDateString()}
          </span>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleExportEngagement}>
          <Download className="h-4 w-4" />
          Export Excel
        </Button>
      </div>

      {/* Overall Engagement Score */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${(engagement.overallEngagement / 100) * 351.86} 351.86`}
                  className={getEngagementBgColor(engagement.overallEngagement)}
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold ${getEngagementColor(engagement.overallEngagement)}`}>
                  {engagement.overallEngagement}%
                </span>
                <span className="text-xs text-gray-500">Overall</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Class Engagement Score</h3>
              <p className="text-gray-500 text-sm mb-3">
                Based on attendance, participation, assignments, quizzes, and discussions.
              </p>
              <Badge className={
                engagement.overallEngagement >= 70 ? 'bg-green-100 text-green-700' :
                engagement.overallEngagement >= 50 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }>
                {getEngagementLabel(engagement.overallEngagement)} Engagement
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Attendance Rate"
          value={engagement.metrics.attendance}
          icon={Calendar}
          description="Live session attendance"
        />
        <MetricCard
          title="Participation"
          value={engagement.metrics.participation}
          icon={Users}
          description="Chat & interaction activity"
        />
        <MetricCard
          title="Assignment Completion"
          value={engagement.metrics.assignmentCompletion}
          icon={Activity}
          description="Tasks & assignments submitted"
        />
        <MetricCard
          title="Quiz Participation"
          value={engagement.metrics.quizParticipation}
          icon={TrendingUp}
          description="Quizzes attempted"
        />
        <MetricCard
          title="Discussion Activity"
          value={engagement.metrics.discussionActivity}
          icon={Clock}
          description="Forum & discussion posts"
        />
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Students At Risk</span>
            </div>
            <p className="text-2xl font-bold">{engagement.studentsAtRisk.length}</p>
            <p className="text-xs text-gray-500">
              Low engagement across metrics
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Engagement Trend</CardTitle>
          <CardDescription>Engagement and attendance over the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end gap-1">
            {engagement.dailyTrend.map((day, i) => {
              const maxEngagement = Math.max(...engagement.dailyTrend.map(d => d.engagement))
              const height = maxEngagement > 0 ? (day.engagement / maxEngagement) * 100 : 0
              
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1 group relative"
                >
                  <div className="w-full bg-blue-500 rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] text-gray-500 rotate-45 origin-left translate-y-2">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                    <div>Engagement: {day.engagement}%</div>
                    <div>Attendance: {day.attendance}%</div>
                    <div>{new Date(day.date).toLocaleDateString()}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Hourly Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Pattern by Hour</CardTitle>
          <CardDescription>When students are most active during the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end gap-1">
            {engagement.hourlyPattern.map((hour) => {
              const maxActivity = Math.max(...engagement.hourlyPattern.map(h => h.activity))
              const height = maxActivity > 0 ? (hour.activity / maxActivity) * 100 : 0
              
              return (
                <div
                  key={hour.hour}
                  className="flex-1 flex flex-col items-center gap-1 group relative"
                >
                  <div 
                    className="w-full bg-purple-500 rounded-t-sm opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                  {hour.hour % 4 === 0 && (
                    <span className="text-[10px] text-gray-500">{hour.hour}</span>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                    {hour.hour}:00 - Activity: {hour.activity}%
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Students At Risk */}
      {engagement.studentsAtRisk.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Students At Risk
            </CardTitle>
            <CardDescription>
              Students with low engagement across multiple metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {engagement.studentsAtRisk.map((student, i) => (
                <Badge key={i} variant="outline" className="bg-orange-50 border-orange-200">
                  {student}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  description 
}: { 
  title: string
  value: number
  icon: React.ElementType
  description: string
}) {
  const getColor = (v: number) => {
    if (v >= 70) return 'text-green-600'
    if (v >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-gray-500" />
            <span className="font-medium text-sm">{title}</span>
          </div>
          <span className={`text-xl font-bold ${getColor(value)}`}>
            {value}%
          </span>
        </div>
        <Progress value={value} className="h-2" />
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}
