'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { LiveStudent } from '@/types/live-session'
import {
  TrendingUp,
  Clock,
  Target,
  AlertTriangle,
  BarChart3,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react'

interface StudentProgressPanelProps {
  students: LiveStudent[]
  classDuration: number
}

interface ProgressMetric {
  label: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
}

export function StudentProgressPanel({ students, classDuration }: StudentProgressPanelProps) {
  const [selectedView, setSelectedView] = useState<'overview' | 'individual'>('overview')

  // Calculate metrics
  const avgEngagement = Math.round(
    students.filter(s => s.status === 'online').reduce((sum, s) => sum + s.engagementScore, 0) /
      Math.max(1, students.filter(s => s.status === 'online').length)
  )

  const participationRate = Math.round(
    (students.filter(s => s.chatMessages > 0 || s.reactions > 0).length /
      Math.max(1, students.length)) *
      100
  )

  const strugglingStudents = students.filter(s => s.engagementScore < 50 && s.status === 'online')
  const excellingStudents = students.filter(s => s.engagementScore >= 85 && s.status === 'online')

  // Progress metrics
  const metrics: ProgressMetric[] = [
    { label: 'Avg Engagement', value: avgEngagement, change: 5, trend: 'up' },
    { label: 'Participation', value: participationRate, change: 3, trend: 'up' },
    {
      label: 'Attention Rate',
      value: Math.round(
        (students.filter(s => s.attentionLevel === 'high').length / Math.max(1, students.length)) *
          100
      ),
      change: -2,
      trend: 'down',
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <CardTitle className="text-sm font-medium">Progress Tracking</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant={selectedView === 'overview' ? 'default' : 'ghost'}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setSelectedView('overview')}
            >
              Overview
            </Button>
            <Button
              variant={selectedView === 'individual' ? 'default' : 'ghost'}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setSelectedView('individual')}
            >
              Students
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="space-y-4 px-4 pb-4">
            {selectedView === 'overview' ? (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {metrics.map((metric, idx) => (
                    <div key={idx} className="rounded-lg bg-gray-50 p-3 text-center">
                      <p className="text-lg font-bold">{metric.value}%</p>
                      <p className="text-xs text-gray-500">{metric.label}</p>
                      <div className="mt-1 flex items-center justify-center gap-1">
                        {getTrendIcon(metric.trend)}
                        <span
                          className={cn(
                            'text-xs',
                            metric.trend === 'up'
                              ? 'text-green-600'
                              : metric.trend === 'down'
                                ? 'text-red-600'
                                : 'text-gray-500'
                          )}
                        >
                          {metric.change > 0 ? '+' : ''}
                          {metric.change}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Class Distribution */}
                <div className="rounded-lg bg-gray-50 p-3">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4" />
                    Engagement Distribution
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-xs">High (85%+)</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{
                            width: `${(excellingStudents.length / students.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs">{excellingStudents.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-xs">Medium</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${(students.filter(s => s.engagementScore >= 50 && s.engagementScore < 85).length / students.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs">
                        {
                          students.filter(s => s.engagementScore >= 50 && s.engagementScore < 85)
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-xs">Low (&lt;50%)</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{
                            width: `${(strugglingStudents.length / students.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs">{strugglingStudents.length}</span>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {strugglingStudents.length > 0 && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-red-800">
                      <AlertTriangle className="h-4 w-4" />
                      Students Need Attention
                    </h3>
                    <div className="space-y-2">
                      {strugglingStudents.slice(0, 3).map(student => (
                        <div key={student.id} className="flex items-center justify-between">
                          <span className="text-sm text-red-700">{student.name}</span>
                          <Badge variant="outline" className="bg-white text-xs">
                            {student.engagementScore}% engagement
                          </Badge>
                        </div>
                      ))}
                      {strugglingStudents.length > 3 && (
                        <p className="text-xs text-red-600">
                          +{strugglingStudents.length - 3} more students
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Activity Timeline */}
                <div className="rounded-lg bg-gray-50 p-3">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4" />
                    Class Activity
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">
                        {Math.floor(classDuration / 60)}h {classDuration % 60}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Messages</span>
                      <span className="font-medium">
                        {students.reduce((sum, s) => sum + s.chatMessages, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reactions</span>
                      <span className="font-medium">
                        {students.reduce((sum, s) => sum + s.reactions, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hand Raises</span>
                      <span className="font-medium">
                        {students.filter(s => s.handRaised).length}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Individual Student List */
              <div className="space-y-2">
                {students
                  .sort((a, b) => b.engagementScore - a.engagementScore)
                  .map(student => (
                    <div
                      key={student.id}
                      className={cn(
                        'rounded-lg border p-3',
                        student.engagementScore >= 85
                          ? 'border-green-200 bg-green-50'
                          : student.engagementScore >= 50
                            ? 'border-gray-200 bg-white'
                            : 'border-red-200 bg-red-50'
                      )}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              'h-2 w-2 rounded-full',
                              student.status === 'online'
                                ? 'bg-green-500'
                                : student.status === 'idle'
                                  ? 'bg-yellow-500'
                                  : 'bg-gray-400'
                            )}
                          />
                          <span className="text-sm font-medium">{student.name}</span>
                        </div>
                        <span
                          className={cn(
                            'text-sm font-bold',
                            student.engagementScore >= 85
                              ? 'text-green-600'
                              : student.engagementScore >= 50
                                ? 'text-blue-600'
                                : 'text-red-600'
                          )}
                        >
                          {student.engagementScore}%
                        </span>
                      </div>

                      <Progress value={student.engagementScore} className="h-1.5" />

                      <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {student.attentionLevel}
                        </span>
                        <span>•</span>
                        <span>{student.chatMessages} messages</span>
                        <span>•</span>
                        <span>{student.reactions} reactions</span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
