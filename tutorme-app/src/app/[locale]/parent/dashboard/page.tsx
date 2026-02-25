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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No data available</p>
      </div>
    )
  }

  const unreadNotifications = data.stats.unreadNotifications
  const averageProgress =
    data.children.length > 0
      ? Math.round(data.children.reduce((acc, child) => acc + child.progress, 0) / data.children.length)
      : 0
  const childrenNeedingAttention = data.children.filter(
    (child) => child.assignmentsDue > 0 || child.progress < 40
  )
  const remainingBudget = Math.max(
    0,
    data.financialSummary.monthlyBudget - data.financialSummary.spentThisMonth
  )
  const budgetUsagePercent =
    data.financialSummary.monthlyBudget > 0
      ? Math.round((data.financialSummary.spentThisMonth / data.financialSummary.monthlyBudget) * 100)
      : 0

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {data.parentName}!</h1>
          <p className="text-gray-500 mt-1">
            You have {data.children.length} children enrolled. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/parent/notifications">
            <Button variant="outline" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Children</p>
                <p className="text-2xl font-bold">{data.children.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
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
              <div className="p-3 bg-green-100 rounded-full">
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
              <div className="p-3 bg-yellow-100 rounded-full">
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
              <div className="p-3 bg-purple-100 rounded-full">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parent Intelligence Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Learning Health</p>
                <p className="text-2xl font-bold text-blue-900">{averageProgress}%</p>
                <p className="text-xs text-blue-700 mt-1">Average progress across all children</p>
              </div>
              <Sparkles className="h-5 w-5 text-blue-700" />
            </div>
            <Progress value={averageProgress} className="h-2 mt-3" />
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">Attention Needed</p>
                <p className="text-2xl font-bold text-amber-900">{childrenNeedingAttention.length}</p>
                <p className="text-xs text-amber-700 mt-1">Children with overdue work or low progress</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-amber-700" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">Budget Balance</p>
                <p className="text-2xl font-bold text-emerald-900">¥{remainingBudget}</p>
                <p className="text-xs text-emerald-700 mt-1">Month usage {budgetUsagePercent}%</p>
              </div>
              <Wallet className="h-5 w-5 text-emerald-700" />
            </div>
            <Progress value={Math.min(100, budgetUsagePercent)} className="h-2 mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Children Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Children</h2>
            <Link href="/parent/children">
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.children.map((child) => (
              <Card key={child.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {child.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{child.name}</h3>
                      <p className="text-sm text-gray-500">{child.grade}</p>
                      
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
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
                          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded">
                            <Award className="h-4 w-4" />
                            {child.recentAchievement}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Link href={`/parent/students/${child.id}`}>
                          <Button size="sm" variant="outline">View Progress</Button>
                        </Link>
                        <Link href="/parent/classes">
                          <Button size="sm" variant="outline">Schedule</Button>
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
                {data.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className={`
                      p-2 rounded-full
                      ${activity.type === 'class_completed' ? 'bg-green-100 text-green-600' : ''}
                      ${activity.type === 'assignment_submitted' ? 'bg-blue-100 text-blue-600' : ''}
                      ${activity.type === 'achievement_earned' ? 'bg-yellow-100 text-yellow-600' : ''}
                      ${activity.type === 'message' ? 'bg-purple-100 text-purple-600' : ''}
                      ${activity.type === 'activity' ? 'bg-gray-100 text-gray-600' : ''}
                      ${!['class_completed','assignment_submitted','achievement_earned','message','activity'].includes(activity.type) ? 'bg-gray-100 text-gray-600' : ''}
                    `}>
                      {activity.type === 'class_completed' && <Calendar className="h-4 w-4" />}
                      {activity.type === 'assignment_submitted' && <BookOpen className="h-4 w-4" />}
                      {activity.type === 'achievement_earned' && <Award className="h-4 w-4" />}
                      {activity.type === 'message' && <MessageSquare className="h-4 w-4" />}
                      {(activity.type === 'activity' || !['class_completed','assignment_submitted','achievement_earned','message'].includes(activity.type)) && <TrendingUp className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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
                childrenNeedingAttention.map((child) => (
                  <div key={child.id} className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <p className="text-sm font-medium text-amber-900">{child.name}</p>
                    <p className="text-xs text-amber-800 mt-1">
                      {child.assignmentsDue > 0
                        ? `${child.assignmentsDue} assignments due`
                        : `Progress is ${child.progress}%`}
                    </p>
                    <div className="mt-2">
                      <Link href={`/parent/students/${child.id}`}>
                        <Button size="sm" variant="outline">Open Student View</Button>
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
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.financialSummary.upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{payment.description}</p>
                      <p className="text-xs text-gray-500">Due {payment.dueDate}</p>
                    </div>
                    <span className="font-semibold">¥{payment.amount}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Due</span>
                  <span className="font-bold text-lg">
                    ¥{data.financialSummary.upcomingPayments.reduce((acc, p) => acc + p.amount, 0)}
                  </span>
                </div>
                <Button className="w-full mt-4">
                  <CreditCard className="h-4 w-4 mr-2" />
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
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-500">Spent</span>
                    <span className="font-medium">
                      ¥{data.financialSummary.spentThisMonth} / ¥{data.financialSummary.monthlyBudget}
                    </span>
                  </div>
                  <Progress 
                    value={(data.financialSummary.spentThisMonth / data.financialSummary.monthlyBudget) * 100} 
                    className="h-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Remaining</p>
                    <p className="font-semibold text-green-600">
                      ¥{data.financialSummary.monthlyBudget - data.financialSummary.spentThisMonth}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="font-semibold">
                      ¥{data.financialSummary.monthlyBudget}
                    </p>
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
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Class
                </Button>
              </Link>
              <Link href="/parent/messages">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Tutor
                </Button>
              </Link>
              <Link href="/parent/progress">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
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
