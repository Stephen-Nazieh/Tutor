'use client'

import { useState } from 'react'
import { useAnalytics, useAdminUsers } from '@/lib/admin/hooks'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Users,
  TrendingUp,
  GraduationCap,
  Video,
  Clock,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
} from 'lucide-react'

const timeRanges = [
  { value: '7', label: 'Last 7 Days' },
  { value: '30', label: 'Last 30 Days' },
  { value: '90', label: 'Last 90 Days' },
]

export default function AnalyticsPage() {
  const [days, setDays] = useState(7)
  const { data: analytics, isLoading } = useAnalytics(days)

  const stats = analytics?.summary
  const usersByRole = analytics?.usersByRole || []

  // Calculate percentages for user distribution
  const totalUsers = stats?.totalUsers || 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500">Platform performance and user insights</p>
        </div>
        <Tabs value={String(days)} onValueChange={(v) => setDays(Number(v))}>
          <TabsList>
            {timeRanges.map((range) => (
              <TabsTrigger key={range.value} value={range.value}>
                {range.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={stats?.totalUsers}
          change={stats?.userGrowthRate}
          icon={Users}
          isLoading={isLoading}
        />
        <MetricCard
          title="New Users"
          value={stats?.newUsers}
          subtitle={`${Math.round(((stats?.newUsers || 0) / (stats?.totalUsers || 1)) * 100)}% growth`}
          icon={TrendingUp}
          isLoading={isLoading}
        />
        <MetricCard
          title="Active Users"
          value={stats?.activeUsers}
          subtitle={`${Math.round(((stats?.activeUsers || 0) / (stats?.totalUsers || 1)) * 100)}% engagement`}
          icon={Activity}
          isLoading={isLoading}
        />
        <MetricCard
          title="Enrollments"
          value={stats?.totalEnrollments}
          icon={GraduationCap}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Users by role</CardDescription>
              </div>
              <PieChart className="h-5 w-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <div className="space-y-4">
                {usersByRole.map((item: { role: string; count: number }) => (
                  <div key={item.role} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              item.role === 'ADMIN'
                                ? '#3b82f6'
                                : item.role === 'TUTOR'
                                ? '#10b981'
                                : '#f59e0b',
                          }}
                        />
                        <span className="text-sm font-medium capitalize">
                          {item.role.toLowerCase()}s
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{item.count.toLocaleString()}</span>
                        <span className="text-xs text-slate-500">
                          ({Math.round((item.count / totalUsers) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={(item.count / totalUsers) * 100}
                      className="h-2"
                    />
                  </div>
                ))}

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {usersByRole.find((u: { role: string }) => u.role === 'ADMIN')?.count || 0}
                    </p>
                    <p className="text-xs text-slate-500">Admins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {usersByRole.find((u: { role: string }) => u.role === 'TUTOR')?.count || 0}
                    </p>
                    <p className="text-xs text-slate-500">Tutors</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600">
                      {usersByRole.find((u: { role: string }) => u.role === 'STUDENT')?.count || 0}
                    </p>
                    <p className="text-xs text-slate-500">Students</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Key platform metrics</CardDescription>
              </div>
              <BarChart3 className="h-5 w-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <div className="space-y-6">
                <OverviewItem
                  label="Total Live Sessions"
                  value={stats?.totalSessions || 0}
                  icon={Video}
                />
                <OverviewItem
                  label="Course Enrollments"
                  value={stats?.totalEnrollments || 0}
                  icon={GraduationCap}
                />
                <OverviewItem
                  label="Content Items"
                  value={stats?.totalContentItems || 0}
                  icon={BarChart3}
                />
                <OverviewItem
                  label="Recent Logins"
                  value={stats?.recentLogins || 0}
                  icon={Clock}
                  change={`+${Math.round(((stats?.recentLogins || 0) / (stats?.activeUsers || 1)) * 100)}%`}
                />

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Average engagement rate</span>
                    <span className="font-medium">24.5%</span>
                  </div>
                  <Progress value={24.5} className="mt-2 h-2" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">User Retention</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Day 1</span>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="w-24 h-2" />
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Day 7</span>
                  <div className="flex items-center gap-2">
                    <Progress value={62} className="w-24 h-2" />
                    <span className="text-sm font-medium">62%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Day 30</span>
                  <div className="flex items-center gap-2">
                    <Progress value={45} className="w-24 h-2" />
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Session Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Avg. Session Duration</span>
                  <span className="font-medium">24 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Completion Rate</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Student Satisfaction</span>
                  <Badge variant="default" className="text-xs">4.6/5</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Usage</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Daily AI Interactions</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Avg. Response Time</span>
                  <span className="font-medium">1.2s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Cost per 1K requests</span>
                  <span className="font-medium">$0.12</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Components
function MetricCard({
  title,
  value,
  change,
  subtitle,
  icon: Icon,
  isLoading,
}: {
  title: string
  value?: number
  change?: number
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  isLoading: boolean
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            {isLoading ? (
              <Skeleton className="mt-2 h-8 w-24" />
            ) : (
              <p className="mt-2 text-2xl font-bold">{value?.toLocaleString() || 0}</p>
            )}
            {change !== undefined && !isLoading && (
              <div className={`mt-1 flex items-center gap-1 text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(change).toFixed(1)}%
              </div>
            )}
            {subtitle && !isLoading && (
              <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
            <Icon className="h-5 w-5 text-slate-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function OverviewItem({
  label,
  value,
  icon: Icon,
  change,
}: {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  change?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
          <Icon className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-lg font-semibold">{value.toLocaleString()}</p>
        </div>
      </div>
      {change && (
        <Badge variant="secondary" className="text-xs">
          {change}
        </Badge>
      )}
    </div>
  )
}
