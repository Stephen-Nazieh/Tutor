'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useParent } from '@/hooks/useParent'
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Bell,
  Award,
  AlertTriangle,
  Wallet,
  Sparkles,
} from 'lucide-react'

export default function ParentDashboardPage() {
  const { data, isLoading, error, refetch } = useParent()

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    )
  }

  const unreadNotifications = data.stats.unreadNotifications
  const averageProgress =
    data.children.length > 0
      ? Math.round(
          data.children.reduce((acc, child) => acc + child.progress, 0) / data.children.length
        )
      : 0
  const childrenNeedingAttention = data.children.filter(
    child => child.assignmentsDue > 0 || child.progress < 40
  )
  const remainingBudget = Math.max(
    0,
    data.financialSummary.monthlyBudget - data.financialSummary.spentThisMonth
  )
  const budgetUsagePercent =
    data.financialSummary.monthlyBudget > 0
      ? Math.round(
          (data.financialSummary.spentThisMonth / data.financialSummary.monthlyBudget) * 100
        )
      : 0

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {data.parentName}!</h1>
          <p className="mt-1 text-gray-500">
            You have {data.children.length} children enrolled. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/parent/notifications">
            <Button variant="outline" className="relative">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Children</p>
                <p className="text-2xl font-bold">{data.children.length}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Classes</p>
                <p className="text-2xl font-bold">
                  {data.children.reduce((acc, child) => acc + child.upcomingClasses, 0)}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Assignments Due</p>
                <p className="text-2xl font-bold">
                  {data.children.reduce((acc, child) => acc + child.assignmentsDue, 0)}
                </p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <BookOpen className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Spending</p>
                <p className="text-2xl font-bold">¥{data.financialSummary.spentThisMonth}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parent Intelligence Strip */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Learning Health</p>
                <p className="text-2xl font-bold text-blue-900">{averageProgress}%</p>
                <p className="mt-1 text-xs text-blue-700">Average progress across all children</p>
              </div>
              <Sparkles className="h-5 w-5 text-blue-700" />
            </div>
            <Progress value={averageProgress} className="mt-3 h-2" />
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Attention Needed</p>
                <p className="text-2xl font-bold text-amber-900">
                  {childrenNeedingAttention.length}
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  Children with overdue work or low progress
                </p>
              </div>
              <AlertTriangle className="h-5 w-5 text-amber-700" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">Budget Balance</p>
                <p className="text-2xl font-bold text-emerald-900">¥{remainingBudget}</p>
                <p className="mt-1 text-xs text-emerald-700">Month usage {budgetUsagePercent}%</p>
              </div>
              <Wallet className="h-5 w-5 text-emerald-700" />
            </div>
            <Progress value={Math.min(100, budgetUsagePercent)} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Children Overview */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Children</h2>
            <Link href="/parent/children">
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.children.map(child => (
              <Card key={child.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {child.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{child.name}</h3>
                      <p className="text-sm text-gray-500">{child.grade}</p>

                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">{child.progress}%</span>
                          </div>
                          <Progress value={child.progress} className="h-2" />
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="h-4 w-4" />
                            {child.upcomingClasses} classes
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <BookOpen className="h-4 w-4" />
                            {child.assignmentsDue} assignments
                          </div>
                        </div>

                        {child.recentAchievement && (
                          <div className="flex items-center gap-2 rounded bg-green-50 p-2 text-sm text-green-600">
                            <Award className="h-4 w-4" />
                            {child.recentAchievement}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Link href={`/parent/students/${child.id}`}>
                          <Button size="sm" variant="outline">
                            View Progress
                          </Button>
                        </Link>
                        <Link href="/parent/classes">
                          <Button size="sm" variant="outline">
                            Schedule
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivity.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div
                      className={`rounded-full p-2 ${activity.type === 'class_completed' ? 'bg-green-100 text-green-600' : ''} ${activity.type === 'assignment_submitted' ? 'bg-blue-100 text-blue-600' : ''} ${activity.type === 'achievement_earned' ? 'bg-yellow-100 text-yellow-600' : ''} ${activity.type === 'message' ? 'bg-purple-100 text-purple-600' : ''} ${activity.type === 'activity' ? 'bg-gray-100 text-gray-600' : ''} ${!['class_completed', 'assignment_submitted', 'achievement_earned', 'message', 'activity'].includes(activity.type) ? 'bg-gray-100 text-gray-600' : ''} `}
                    >
                      {activity.type === 'class_completed' && <Calendar className="h-4 w-4" />}
                      {activity.type === 'assignment_submitted' && <BookOpen className="h-4 w-4" />}
                      {activity.type === 'achievement_earned' && <Award className="h-4 w-4" />}
                      {activity.type === 'message' && <MessageSquare className="h-4 w-4" />}
                      {(activity.type === 'activity' ||
                        ![
                          'class_completed',
                          'assignment_submitted',
                          'achievement_earned',
                          'message',
                        ].includes(activity.type)) && <TrendingUp className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Action Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Action Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {childrenNeedingAttention.length === 0 ? (
                <p className="text-sm text-gray-500">No urgent items right now.</p>
              ) : (
                childrenNeedingAttention.map(child => (
                  <div
                    key={child.id}
                    className="rounded-lg border border-amber-200 bg-amber-50 p-3"
                  >
                    <p className="text-sm font-medium text-amber-900">{child.name}</p>
                    <p className="mt-1 text-xs text-amber-800">
                      {child.assignmentsDue > 0
                        ? `${child.assignmentsDue} assignments due`
                        : `Progress is ${child.progress}%`}
                    </p>
                    <div className="mt-2">
                      <Link href={`/parent/students/${child.id}`}>
                        <Button size="sm" variant="outline">
                          Open Student View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Payments</CardTitle>
                <Link href="/parent/payments">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.financialSummary.upcomingPayments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{payment.description}</p>
                      <p className="text-xs text-gray-500">Due {payment.dueDate}</p>
                    </div>
                    <span className="font-semibold">¥{payment.amount}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Due</span>
                  <span className="text-lg font-bold">
                    ¥{data.financialSummary.upcomingPayments.reduce((acc, p) => acc + p.amount, 0)}
                  </span>
                </div>
                <Button className="mt-4 w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Make Payment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Budget */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Spent</span>
                    <span className="font-medium">
                      ¥{data.financialSummary.spentThisMonth} / ¥
                      {data.financialSummary.monthlyBudget}
                    </span>
                  </div>
                  <Progress
                    value={
                      (data.financialSummary.spentThisMonth / data.financialSummary.monthlyBudget) *
                      100
                    }
                    className="h-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Remaining</p>
                    <p className="font-semibold text-green-600">
                      ¥{data.financialSummary.monthlyBudget - data.financialSummary.spentThisMonth}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="font-semibold">¥{data.financialSummary.monthlyBudget}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/parent/classes/book">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book New Class
                </Button>
              </Link>
              <Link href="/parent/messages">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Tutor
                </Button>
              </Link>
              <Link href="/parent/progress">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Progress Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
