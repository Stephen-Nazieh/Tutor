'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAnalytics, useAdminUsers } from '@/lib/admin/hooks'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  TrendingUp,
  BookOpen,
  Video,
  GraduationCap,
  ArrowUpRight,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Wallet,
  BarChart3,
  Layers,
} from 'lucide-react'

const timeRanges = [
  { value: '7', label: '7 Days' },
  { value: '30', label: '30 Days' },
  { value: '90', label: '90 Days' },
]

export default function AdminDashboard() {
  const [days, setDays] = useState(7)
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics(days)
  const { data: usersData, isLoading: usersLoading } = useAdminUsers({ limit: 5 })

  const stats = analytics?.summary
  const enterprise = analytics?.enterprise as
    | {
        featureUsage: Array<{ feature: string; usageCount: number }>
        userAnalytics: {
          dauTrend: Array<{ date: string; activeUsers: number }>
          topActions: Array<{ action: string; count: number }>
          averageActionsPerActiveUser: number
        }
        paymentAnalytics: {
          totalPayments: number
          paymentVolume: number
          paymentSuccessRate: number
          refundRate: number
          pendingPayments: number
        }
        liveClassAnalytics: {
          sessionsCreated: number
          avgParticipantsPerSession: number
          pollResponses: number
          whiteboardSessions: number
        }
        securityAnalytics: {
          failedLogins: number
          criticalEvents: number
          suspiciousIpCount: number
        }
        funnel: {
          registrations: number
          activeUsers: number
          learningActiveUsers: number
          payingUsers: number
        }
      }
    | undefined

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back to the admin panel</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
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
      </div>

      <>
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Users"
              value={stats?.totalUsers}
              change={stats?.userGrowthRate}
              icon={Users}
              isLoading={analyticsLoading}
              href="/admin/users"
            />
            <StatCard
              title="Active Users"
              value={stats?.activeUsers}
              subtitle={`${Math.round(((stats?.activeUsers || 0) / (stats?.totalUsers || 1)) * 100)}% of total`}
              icon={Activity}
              isLoading={analyticsLoading}
            />
            <StatCard
              title="Total Sessions"
              value={stats?.totalSessions}
              icon={Video}
              isLoading={analyticsLoading}
            />
            <StatCard
              title="Enrollments"
              value={stats?.totalEnrollments}
              icon={GraduationCap}
              isLoading={analyticsLoading}
            />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Charts & Activity */}
            <div className="space-y-6 lg:col-span-2">
              {/* Enterprise KPI rail */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Feature Events"
                  value={enterprise?.featureUsage.reduce((sum, f) => sum + f.usageCount, 0) || 0}
                  icon={Layers}
                  isLoading={analyticsLoading}
                />
                <StatCard
                  title="Payments Volume"
                  value={enterprise ? Math.round(enterprise.paymentAnalytics.paymentVolume) : 0}
                  subtitle={enterprise ? `${enterprise.paymentAnalytics.paymentSuccessRate.toFixed(1)}% success` : undefined}
                  icon={Wallet}
                  isLoading={analyticsLoading}
                />
                <StatCard
                  title="Security Alerts"
                  value={enterprise?.securityAnalytics.failedLogins || 0}
                  subtitle={enterprise ? `${enterprise.securityAnalytics.criticalEvents} critical` : undefined}
                  icon={ShieldAlert}
                  isLoading={analyticsLoading}
                />
                <StatCard
                  title="Avg Actions / Active User"
                  value={enterprise ? Math.round(enterprise.userAnalytics.averageActionsPerActiveUser) : 0}
                  icon={BarChart3}
                  isLoading={analyticsLoading}
                />
              </div>

          {/* Feature usage and action telemetry */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Use Rate</CardTitle>
              <CardDescription>Granular adoption volume by platform capability</CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <div className="space-y-3">
                  {(enterprise?.featureUsage || []).map((item) => {
                    const max = Math.max(...(enterprise?.featureUsage || []).map((x) => x.usageCount), 1)
                    const pct = (item.usageCount / max) * 100
                    return (
                      <div key={item.feature} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.feature}</span>
                          <span className="font-medium">{item.usageCount}</span>
                        </div>
                        <div className="h-2 rounded bg-slate-100">
                          <div className="h-2 rounded bg-blue-600" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Funnel</CardTitle>
                <CardDescription>Registration to learning/payment conversion</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsLoading ? (
                  <Skeleton className="h-36 w-full" />
                ) : (
                  <div className="space-y-3 text-sm">
                    <FunnelRow label="Registrations" value={enterprise?.funnel.registrations || 0} />
                    <FunnelRow label="Active Users" value={enterprise?.funnel.activeUsers || 0} />
                    <FunnelRow label="Learning Active" value={enterprise?.funnel.learningActiveUsers || 0} />
                    <FunnelRow label="Paying Users" value={enterprise?.funnel.payingUsers || 0} />
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Reliability</CardTitle>
                <CardDescription>Enterprise billing health</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsLoading ? (
                  <Skeleton className="h-36 w-full" />
                ) : (
                  <div className="space-y-3 text-sm">
                    <FunnelRow label="Total Payments" value={enterprise?.paymentAnalytics.totalPayments || 0} />
                    <FunnelRow label="Pending" value={enterprise?.paymentAnalytics.pendingPayments || 0} />
                    <FunnelRow
                      label="Success Rate"
                      value={`${enterprise?.paymentAnalytics.paymentSuccessRate.toFixed(1) || '0.0'}%`}
                    />
                    <FunnelRow
                      label="Refund Rate"
                      value={`${enterprise?.paymentAnalytics.refundRate.toFixed(1) || '0.0'}%`}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <QuickActionButton
                  href="/admin/users"
                  icon={Users}
                  title="Manage Users"
                  description="View and edit user accounts"
                />
                <QuickActionButton
                  href="/admin/feature-flags"
                  icon={CheckCircle2}
                  title="Feature Flags"
                  description="Toggle platform features"
                />
                <QuickActionButton
                  href="/admin/llm"
                  icon={BookOpen}
                  title="AI Configuration"
                  description="Manage LLM providers"
                />
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current system status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <HealthItem
                  name="Database"
                  status="healthy"
                  latency="12ms"
                />
                <HealthItem
                  name="API Server"
                  status="healthy"
                  latency="45ms"
                />
                <HealthItem
                  name="AI Services"
                  status="healthy"
                  latency="120ms"
                />
                <HealthItem
                  name="Storage"
                  status="healthy"
                  latency="28ms"
                />
              </div>
            </CardContent>
          </Card>
        </div>

            {/* Right Column - Recent Activity */}
            <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Actions</CardTitle>
              <CardDescription>Most-used platform actions in selected range</CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsLoading ? (
                <Skeleton className="h-40 w-full" />
              ) : (
                <div className="space-y-2">
                  {(enterprise?.userAnalytics.topActions || []).slice(0, 8).map((a) => (
                    <div key={a.action} className="flex items-center justify-between text-sm">
                      <span className="truncate pr-3">{a.action}</span>
                      <Badge variant="secondary">{a.count}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/users">View all</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usersLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))
                ) : usersData?.users?.length === 0 ? (
                  <p className="text-center text-sm text-slate-500 py-4">
                    No users found
                  </p>
                ) : (
                  usersData?.users?.map((user: Record<string, unknown>) => (
                    <div key={user.id as string} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                        <span className="text-xs font-medium">
                          {(user.name as string)?.[0] || (user.email as string)?.[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {(user.name as string) || (user.email as string)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(user.createdAt as string).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'} className="text-xs">
                        {user.role as string}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Users by role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsLoading ? (
                  <Skeleton className="h-32 w-full" />
                ) : (
                  analytics?.usersByRole?.map((item: { role: string; count: number }) => (
                    <div key={item.role} className="flex items-center justify-between">
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
                        <span className="text-sm capitalize">{item.role.toLowerCase()}s</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.count}</span>
                        <span className="text-xs text-slate-500">
                          ({Math.round((item.count / (stats?.totalUsers || 1)) * 100)}%)
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
            </div>
        </div>
      </>
    </div>
  )
}

function FunnelRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between rounded-md border px-3 py-2">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  )
}

// Components
function StatCard({
  title,
  value,
  change,
  subtitle,
  icon: Icon,
  isLoading,
  href,
}: {
  title: string
  value?: number
  change?: number
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  isLoading: boolean
  href?: string
}) {
  const content = (
    <Card className={href ? 'cursor-pointer hover:border-blue-300 transition-colors' : ''}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            {isLoading ? (
              <Skeleton className="mt-2 h-8 w-24" />
            ) : (
              <p className="mt-2 text-3xl font-bold">{value?.toLocaleString() || 0}</p>
            )}
            {change !== undefined && !isLoading && (
              <p className={`mt-1 text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(1)}% from last period
              </p>
            )}
            {subtitle && !isLoading && (
              <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return href ? <Link href={href}>{content}</Link> : content
}

function QuickActionButton({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-slate-50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 text-slate-400" />
    </Link>
  )
}

function HealthItem({
  name,
  status,
  latency,
}: {
  name: string
  status: 'healthy' | 'warning' | 'error'
  latency: string
}) {
  const statusColors = {
    healthy: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`h-2 w-2 rounded-full ${statusColors[status].replace('text', 'bg')}`} />
        <span className="text-sm font-medium">{name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500">{latency}</span>
        <Badge variant={status === 'healthy' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'} className="text-xs">
          {status === 'healthy' && <CheckCircle2 className="mr-1 h-3 w-3" />}
          {status === 'warning' && <AlertCircle className="mr-1 h-3 w-3" />}
          {status === 'error' && <AlertCircle className="mr-1 h-3 w-3" />}
          {status}
        </Badge>
      </div>
    </div>
  )
}
