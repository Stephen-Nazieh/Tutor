'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  BarChart3,
  PieChart,
  Download,
  Eye,
  ChevronRight,
  Mail,
  Send
} from 'lucide-react'

interface RevenueDashboardProps {
  compact?: boolean
  defaultTab?: 'overview' | 'earnings' | 'courses' | 'analytics'
  externalEmailDialogOpen?: boolean
  onExternalEmailDialogChange?: (open: boolean) => void
}

interface EarningRecord {
  id: string
  date: string
  description: string
  amount: number
  type: 'class' | 'course' | 'refund' | 'payout'
  status: 'completed' | 'pending' | 'processing'
  studentName?: string
}

interface CoursePerformance {
  id: string
  name: string
  enrollments: number
  revenue: number
  conversionRate: number
  rating: number
}

interface TimeSlotPopularity {
  slot: string
  bookings: number
  revenue: number
}

// Demo data
const generateDemoEarnings = (): EarningRecord[] => [
  { id: '1', date: '2026-02-15', description: 'Advanced Mathematics Class', amount: 150, type: 'class', status: 'completed', studentName: 'Alice Zhang' },
  { id: '2', date: '2026-02-14', description: 'Physics 101 Course Sale', amount: 299, type: 'course', status: 'completed' },
  { id: '3', date: '2026-02-13', description: 'English Literature Class', amount: 120, type: 'class', status: 'completed', studentName: 'Bob Li' },
  { id: '4', date: '2026-02-12', description: 'Refund - Cancelled Class', amount: -150, type: 'refund', status: 'completed', studentName: 'Carol Wang' },
  { id: '5', date: '2026-02-10', description: 'Monthly Payout', amount: -1200, type: 'payout', status: 'completed' },
  { id: '6', date: '2026-02-09', description: 'Chemistry Tutoring', amount: 180, type: 'class', status: 'completed', studentName: 'David Chen' },
  { id: '7', date: '2026-02-08', description: 'Math Course Bundle', amount: 499, type: 'course', status: 'completed' },
  { id: '8', date: '2026-02-07', description: 'Private Session', amount: 200, type: 'class', status: 'pending', studentName: 'Emma Liu' },
]

const generateDemoCoursePerformance = (): CoursePerformance[] => [
  { id: '1', name: 'Advanced Mathematics', enrollments: 45, revenue: 13455, conversionRate: 12.5, rating: 4.8 },
  { id: '2', name: 'Physics 101', enrollments: 32, revenue: 9568, conversionRate: 8.3, rating: 4.6 },
  { id: '3', name: 'English Literature', enrollments: 28, revenue: 5544, conversionRate: 6.7, rating: 4.9 },
  { id: '4', name: 'Chemistry Basics', enrollments: 18, revenue: 5382, conversionRate: 5.2, rating: 4.4 },
]

const generateDemoTimeSlots = (): TimeSlotPopularity[] => [
  { slot: 'Mon-Fri 6-8 PM', bookings: 45, revenue: 6750 },
  { slot: 'Sat-Sun 10-12 AM', bookings: 38, revenue: 5700 },
  { slot: 'Mon-Fri 4-6 PM', bookings: 32, revenue: 4800 },
  { slot: 'Sat-Sun 2-4 PM', bookings: 28, revenue: 4200 },
  { slot: 'Weekday Mornings', bookings: 15, revenue: 2250 },
]

// Email Dialog Component
interface EmailStatementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  emailAddress: string
  setEmailAddress: (email: string) => void
  sendingEmail: boolean
  onSend: () => void
}

function EmailStatementDialog({
  open,
  onOpenChange,
  emailAddress,
  setEmailAddress,
  sendingEmail,
  onSend
}: EmailStatementDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Statement
          </DialogTitle>
          <DialogDescription>
            Send your revenue statement to any email address. The statement will include all transactions for the current period.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address..."
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
            />
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-sm">
            <p className="font-medium text-gray-700">Statement will include:</p>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• Transaction history</li>
              <li>• Revenue summary</li>
              <li>• Course performance metrics</li>
              <li>• Tax information (if applicable)</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSend}
            disabled={sendingEmail}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            {sendingEmail ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Statement
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function RevenueDashboard({
  compact = false,
  defaultTab = 'overview',
  externalEmailDialogOpen,
  onExternalEmailDialogChange
}: RevenueDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [earnings] = useState<EarningRecord[]>(generateDemoEarnings())
  const [courses] = useState<CoursePerformance[]>(generateDemoCoursePerformance())
  const [timeSlots] = useState<TimeSlotPopularity[]>(generateDemoTimeSlots())
  const [internalShowEmailDialog, setInternalShowEmailDialog] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')
  const [sendingEmail, setSendingEmail] = useState(false)

  // Use external dialog state if provided, otherwise use internal
  const showEmailDialog = externalEmailDialogOpen !== undefined ? externalEmailDialogOpen : internalShowEmailDialog
  const setShowEmailDialog = (open: boolean) => {
    if (onExternalEmailDialogChange) {
      onExternalEmailDialogChange(open)
    }
    setInternalShowEmailDialog(open)
  }

  // Calculate metrics
  const totalRevenue = earnings
    .filter(e => e.type !== 'payout' && e.type !== 'refund')
    .reduce((sum, e) => sum + e.amount, 0)

  const pendingAmount = earnings
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0)

  const availableBalance = totalRevenue - earnings
    .filter(e => e.type === 'payout')
    .reduce((sum, e) => sum + Math.abs(e.amount), 0)

  const thisMonthRevenue = earnings
    .filter(e => e.date.startsWith('2026-02') && e.type !== 'payout' && e.type !== 'refund')
    .reduce((sum, e) => sum + e.amount, 0)

  const lastMonthRevenue = 8500 // Demo comparison
  const revenueChange = ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100

  const totalBookings = earnings.filter(e => e.type === 'class').length
  const avgBookingValue = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="default" className="bg-green-600">Completed</Badge>
      case 'pending': return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>
      case 'processing': return <Badge variant="outline" className="text-blue-600 border-blue-600">Processing</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return <Calendar className="w-4 h-4 text-blue-500" />
      case 'course': return <BarChart3 className="w-4 h-4 text-purple-500" />
      case 'refund': return <ArrowDownRight className="w-4 h-4 text-red-500" />
      case 'payout': return <Wallet className="w-4 h-4 text-orange-500" />
      default: return <DollarSign className="w-4 h-4 text-gray-500" />
    }
  }

  const handleSendEmail = async () => {
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    setSendingEmail(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success(`Statement sent to ${emailAddress}`)
    setSendingEmail(false)
    setShowEmailDialog(false)
    setEmailAddress('')
  }

  if (compact) {
    return (
      <>
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <CardTitle className="text-base">Revenue</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.push('/tutor/revenue')}>
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(availableBalance)}</p>
                  <p className="text-xs text-gray-500">Available Balance</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+{revenueChange.toFixed(1)}%</span>
                  </div>
                  <p className="text-xs text-gray-500">vs last month</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold">{totalBookings}</p>
                  <p className="text-xs text-gray-500">Bookings</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold">{formatCurrency(avgBookingValue)}</p>
                  <p className="text-xs text-gray-500">Avg Value</p>
                </div>
              </div>

              {pendingAmount > 0 && (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {formatCurrency(pendingAmount)} pending clearance
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Button className="w-full" variant="outline" onClick={() => router.push('/tutor/revenue')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Revenue & Analytics
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEmailDialog(true)}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <EmailStatementDialog
          open={showEmailDialog}
          onOpenChange={setShowEmailDialog}
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          sendingEmail={sendingEmail}
          onSend={handleSendEmail}
        />
      </>
    )

    return (
      <>
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <CardTitle className="text-base">Revenue & Business</CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => setShowEmailDialog(true)}>
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-600 mb-1">Available Balance</p>
                <p className="text-xl font-bold text-green-800">{formatCurrency(availableBalance)}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 mb-1">This Month</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-blue-800">{formatCurrency(thisMonthRevenue)}</p>
                  <Badge variant={revenueChange >= 0 ? 'default' : 'destructive'} className="text-xs">
                    {revenueChange >= 0 ? '+' : ''}{revenueChange.toFixed(0)}%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab as any} className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                <TabsTrigger value="earnings" className="text-xs">Earnings</TabsTrigger>
                <TabsTrigger value="courses" className="text-xs">Courses</TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100%-180px)]">
              <div className="px-4 pb-4">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <p className="text-lg font-bold">{totalBookings}</p>
                        <p className="text-xs text-gray-500">Total Bookings</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <p className="text-lg font-bold">{formatCurrency(avgBookingValue)}</p>
                        <p className="text-xs text-gray-500">Avg Booking Value</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <p className="text-lg font-bold">{courses.length}</p>
                        <p className="text-xs text-gray-500">Active Courses</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <p className="text-lg font-bold">4.7</p>
                        <p className="text-xs text-gray-500">Avg Rating</p>
                      </div>
                    </div>

                    {/* Recent Earnings */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Recent Transactions</h3>
                      <div className="space-y-2">
                        {earnings.slice(0, 5).map((earning) => (
                          <div key={earning.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(earning.type)}
                              <div>
                                <p className="text-sm font-medium">{earning.description}</p>
                                <p className="text-xs text-gray-500">{formatDate(earning.date)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={cn(
                                "text-sm font-medium",
                                earning.amount < 0 ? "text-red-600" : "text-green-600"
                              )}>
                                {earning.amount < 0 ? '' : '+'}{formatCurrency(earning.amount)}
                              </p>
                              {getStatusBadge(earning.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payout Button */}
                    {availableBalance > 0 && (
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                        <Wallet className="w-4 h-4 mr-2" />
                        Request Payout ({formatCurrency(availableBalance)})
                      </Button>
                    )}
                  </div>
                )}

                {activeTab === 'earnings' && (
                  <div className="space-y-3">
                    {earnings.map((earning) => (
                      <div key={earning.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              {getTypeIcon(earning.type)}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{earning.description}</p>
                              {earning.studentName && (
                                <p className="text-xs text-gray-500">Student: {earning.studentName}</p>
                              )}
                              <p className="text-xs text-gray-400">{earning.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={cn(
                              "font-bold",
                              earning.amount < 0 ? "text-red-600" : "text-green-600"
                            )}>
                              {earning.amount < 0 ? '' : '+'}{formatCurrency(earning.amount)}
                            </p>
                            {getStatusBadge(earning.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <div key={course.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{course.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            ⭐ {course.rating}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 bg-gray-50 rounded">
                            <p className="text-lg font-bold">{course.enrollments}</p>
                            <p className="text-xs text-gray-500">Students</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <p className="text-lg font-bold">{formatCurrency(course.revenue)}</p>
                            <p className="text-xs text-gray-500">Revenue</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <p className="text-lg font-bold">{course.conversionRate}%</p>
                            <p className="text-xs text-gray-500">Conversion</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-4">
                    {/* Conversion Funnel - Moved to top for visibility */}
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <h3 className="font-medium mb-4 flex items-center gap-2 text-blue-900">
                        <TrendingUp className="w-5 h-5" />
                        Conversion Funnel
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700 font-medium">👀 Page Views</span>
                            <span className="font-bold">1,245</span>
                          </div>
                          <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="text-xs text-gray-500">▼ 36.6% conversion</div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700 font-medium">📚 Course Views</span>
                            <span className="font-bold">456 (36.6%)</span>
                          </div>
                          <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '36.6%' }} />
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="text-xs text-gray-500">▼ 27.0% conversion</div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700 font-medium">✅ Enrollments</span>
                            <span className="font-bold text-green-600">123 (27.0%)</span>
                          </div>
                          <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '27.0%' }} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-white/70 rounded text-sm">
                        <p className="text-gray-700">
                          <strong>💡 Insight:</strong> Your course pages are converting well!
                          Consider optimizing the landing page to increase views.
                        </p>
                      </div>
                    </div>

                    {/* Popular Time Slots */}
                    <div>
                      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Popular Time Slots
                      </h3>
                      <div className="space-y-2">
                        {timeSlots.map((slot, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="text-xs w-32 truncate">{slot.slot}</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${(slot.bookings / 50) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs w-12 text-right">{slot.bookings}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Conversion Funnel */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium mb-3">Conversion Funnel</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Page Views</span>
                          <span className="font-medium">1,245</span>
                        </div>
                        <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Course Views</span>
                          <span className="font-medium">456 (36.6%)</span>
                        </div>
                        <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '36.6%' }} />
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Enrollments</span>
                          <span className="font-medium">123 (27.0%)</span>
                        </div>
                        <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '27.0%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Revenue Trend */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium mb-3">Monthly Revenue Trend</h3>
                      <div className="flex items-end gap-2 h-24">
                        {[65, 78, 45, 89, 92, 85, 95].map((height, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-purple-500 rounded-t"
                              style={{ height: `${height}%` }}
                            />
                            <span className="text-xs text-gray-500">
                              {['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'][idx]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <EmailStatementDialog
          open={showEmailDialog}
          onOpenChange={setShowEmailDialog}
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          sendingEmail={sendingEmail}
          onSend={handleSendEmail}
        />
      </>
    )
  }
}
