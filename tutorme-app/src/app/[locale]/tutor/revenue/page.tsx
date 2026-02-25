'use client'

import { useState, useEffect } from 'react'
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
  Download,
  ArrowLeft,
  Mail,
  Send,
  ChevronRight,
  PieChart,
  Activity,
  Loader2,
  Building2,
  CheckCircle2,
  XCircle,
  Hourglass
} from 'lucide-react'

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  currency: string
  type: 'class' | 'course' | 'refund' | 'payout'
  status: 'completed' | 'pending' | 'processing'
  studentName?: string
  clinicId?: string
}

interface CourseMetric {
  id: string
  name: string
  enrollments: number
  periodEnrollments: number
  estimatedRevenue: number
  currency: string
  conversionRate: number
  rating: number
}

interface TimeSlot {
  slot: string
  bookings: number
  revenue: number
}

interface MonthlyTrend {
  month: string
  revenue: number
}

interface Payout {
  id: string
  amount: number
  currency: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED'
  method: string
  requestedAt: string
  processedAt?: string
  completedAt?: string
  transactionReference?: string
  paymentCount: number
  payments: Array<{
    id: string
    amount: number
    description: string
    date: string
  }>
}

interface RevenueData {
  summary: {
    availableBalance: number
    periodEarnings: number
    periodChange: number
    totalBookings: number
    avgBookingValue: number
    pendingAmount: number
    currency: string
  }
  transactions: Transaction[]
  courses: CourseMetric[]
  timeSlots: TimeSlot[]
  monthlyTrend: MonthlyTrend[]
  payouts?: Payout[]
}

export default function RevenuePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')
  const [sendingEmail, setSendingEmail] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<RevenueData | null>(null)
  const [period, setPeriod] = useState('30d')
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loadingPayouts, setLoadingPayouts] = useState(false)

  // Fetch revenue data
  useEffect(() => {
    fetchRevenueData()
    fetchPayouts()
  }, [period])

  const fetchRevenueData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/tutor/revenue?period=${period}`, {
        credentials: 'include',
      })
      if (res.ok) {
        const revenueData = await res.json()
        setData(revenueData)
      } else {
        toast.error('Failed to load revenue data')
      }
    } catch {
      toast.error('Failed to load revenue data')
    } finally {
      setLoading(false)
    }
  }

  const fetchPayouts = async () => {
    setLoadingPayouts(true)
    try {
      const res = await fetch('/api/tutor/payouts', {
        credentials: 'include',
      })
      if (res.ok) {
        const payoutData = await res.json()
        setPayouts(payoutData.payouts)
      }
    } catch {
      console.error('Failed to load payouts')
    } finally {
      setLoadingPayouts(false)
    }
  }

  const formatCurrency = (amount: number, currency: string = data?.summary.currency || 'SGD') => {
    return new Intl.NumberFormat('en-SG', { 
      style: 'currency', 
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
    })
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

  const getPayoutStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <Badge className="bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
      case 'PROCESSING': return <Badge variant="outline" className="text-blue-600 border-blue-600"><Hourglass className="w-3 h-3 mr-1" />Processing</Badge>
      case 'PENDING': return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'REJECTED': return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleExport = () => {
    if (!data) return
    
    // Create CSV content
    const csvRows = [
      ['Date', 'Description', 'Type', 'Amount', 'Currency', 'Status'].join(','),
      ...data.transactions.map(t => [
        formatDate(t.date),
        `"${t.description}"`,
        t.type,
        t.amount,
        t.currency,
        t.status,
      ].join(','))
    ]
    
    const csvContent = csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `revenue-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    
    toast.success('Report exported successfully')
  }

  const [showPayoutDialog, setShowPayoutDialog] = useState(false)
  const [payoutAmount, setPayoutAmount] = useState('')
  const [payoutMethod, setPayoutMethod] = useState('bank_transfer')
  const [submittingPayout, setSubmittingPayout] = useState(false)

  const handleRequestPayout = async () => {
    if (!data || data.summary.availableBalance <= 0) {
      toast.error('No available balance to payout')
      return
    }
    setShowPayoutDialog(true)
  }

  const submitPayoutRequest = async () => {
    const amount = parseFloat(payoutAmount)
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }
    if (amount > (data?.summary.availableBalance || 0)) {
      toast.error('Amount exceeds available balance')
      return
    }

    setSubmittingPayout(true)
    try {
      const res = await fetch('/api/tutor/payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          amount,
          method: payoutMethod,
          details: { currency: data?.summary.currency || 'SGD' },
        }),
      })

      if (res.ok) {
        toast.success('Payout request submitted successfully')
        setShowPayoutDialog(false)
        setPayoutAmount('')
        fetchPayouts()
        fetchRevenueData()
      } else {
        const error = await res.json()
        toast.error(error.error || 'Failed to submit payout request')
      }
    } catch {
      toast.error('Failed to submit payout request')
    } finally {
      setSubmittingPayout(false)
    }
  }

  const handleSendEmail = async () => {
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    setSendingEmail(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success(`Statement sent to ${emailAddress}`)
    setSendingEmail(false)
    setShowEmailDialog(false)
    setEmailAddress('')
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading revenue data...</p>
        </div>
      </div>
    )
  }

  const { summary, transactions, courses, timeSlots, monthlyTrend } = data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push('/tutor/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-bold">Revenue & Business Analytics</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowEmailDialog(true)}>
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-600 to-emerald-600"
                onClick={handleRequestPayout}
                disabled={summary.availableBalance <= 0}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Request Payout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Available Balance</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(summary.availableBalance)}
                  </p>
                </div>
                <Wallet className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">This Period</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {formatCurrency(summary.periodEarnings)}
                    </p>
                    {summary.periodChange !== 0 && (
                      <Badge variant={summary.periodChange >= 0 ? 'default' : 'destructive'} className="text-xs">
                        {summary.periodChange >= 0 ? '+' : ''}{summary.periodChange.toFixed(0)}%
                      </Badge>
                    )}
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Bookings</p>
                  <p className="text-2xl font-bold">{summary.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Avg Booking Value</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(summary.avgBookingValue)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Period:</span>
                <select 
                  className="border rounded px-2 py-1 text-sm"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">This Year</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Currency:</span>
                <span className="text-sm text-gray-700">{summary.currency}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Card className="min-h-[600px]">
          <CardHeader className="pb-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5 max-w-lg">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pt-6">
            <ScrollArea className="h-[500px]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold">{summary.totalBookings}</p>
                      <p className="text-xs text-gray-500">Total Bookings</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold">
                        {formatCurrency(summary.avgBookingValue)}
                      </p>
                      <p className="text-xs text-gray-500">Avg Booking Value</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold">{courses.length}</p>
                      <p className="text-xs text-gray-500">Active Courses</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold">
                        {courses.length > 0 
                          ? (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)
                          : '0.0'}
                      </p>
                      <p className="text-xs text-gray-500">Avg Rating</p>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                    {transactions.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No transactions in this period</p>
                    ) : (
                      <div className="space-y-3">
                        {transactions.slice(0, 5).map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getTypeIcon(transaction.type)}
                              <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={cn("font-bold", transaction.amount < 0 ? "text-red-600" : "text-green-600")}>
                                {transaction.amount < 0 ? '' : '+'}{formatCurrency(transaction.amount, transaction.currency)}
                              </p>
                              {getStatusBadge(transaction.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pending Amount Alert */}
                  {summary.pendingAmount > 0 && (
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-yellow-800 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">
                          {formatCurrency(summary.pendingAmount)} pending clearance
                        </span>
                      </p>
                      <p className="text-sm text-yellow-600 mt-1">
                        These funds will be available in your balance within 2-3 business days.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'earnings' && (
                <div className="space-y-4">
                  {transactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No transactions in this period</p>
                  ) : (
                    transactions.map((transaction) => (
                      <div key={transaction.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                              {getTypeIcon(transaction.type)}
                            </div>
                            <div>
                              <p className="font-medium text-lg">{transaction.description}</p>
                              {transaction.studentName && (
                                <p className="text-sm text-gray-500">Student: {transaction.studentName}</p>
                              )}
                              <p className="text-xs text-gray-400 mt-1">{formatDate(transaction.date)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={cn("text-xl font-bold", transaction.amount < 0 ? "text-red-600" : "text-green-600")}>
                              {transaction.amount < 0 ? '' : '+'}{formatCurrency(transaction.amount, transaction.currency)}
                            </p>
                            <div className="mt-2">{getStatusBadge(transaction.status)}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-4">
                  {courses.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No courses with enrollments in this period</p>
                  ) : (
                    courses.map((course) => (
                      <div key={course.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-lg">{course.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">⭐ {course.rating.toFixed(1)}</Badge>
                              <span className="text-sm text-gray-500">{course.enrollments} students enrolled</span>
                              {course.periodEnrollments > 0 && (
                                <Badge variant="default" className="text-xs bg-green-100 text-green-700">
                                  +{course.periodEnrollments} this period
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/tutor/courses/${course.id}/builder`)}>
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg text-center">
                            <p className="text-xl font-bold text-blue-700">{course.enrollments}</p>
                            <p className="text-xs text-blue-600">Students</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg text-center">
                            <p className="text-xl font-bold text-green-700">
                              {formatCurrency(course.estimatedRevenue, course.currency)}
                            </p>
                            <p className="text-xs text-green-600">Revenue</p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg text-center">
                            <p className="text-xl font-bold text-purple-700">{course.conversionRate.toFixed(1)}%</p>
                            <p className="text-xs text-purple-600">Conversion</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'payouts' && (
                <div className="space-y-4">
                  {/* Payout Summary */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600">Available Balance</p>
                      <p className="text-2xl font-bold text-green-700">
                        {formatCurrency(data?.summary.availableBalance || 0)}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600">Total Payouts</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {formatCurrency(payouts.filter(p => p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0))}
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-700">
                        {formatCurrency(payouts.filter(p => p.status === 'PENDING' || p.status === 'PROCESSING').reduce((sum, p) => sum + p.amount, 0))}
                      </p>
                    </div>
                  </div>

                  {/* Payout History */}
                  {payouts.length === 0 ? (
                    <div className="text-center py-12">
                      <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No payouts yet</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Request your first payout when you have available balance
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {payouts.map((payout) => (
                        <div key={payout.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                <Wallet className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-lg">
                                  Payout #{payout.id.slice(-8).toUpperCase()}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {payout.paymentCount} payments • {payout.method.replace('_', ' ')}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Requested {formatDate(payout.requestedAt)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-green-600">
                                {formatCurrency(payout.amount, payout.currency)}
                              </p>
                              <div className="mt-2">{getPayoutStatusBadge(payout.status)}</div>
                              {payout.transactionReference && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Ref: {payout.transactionReference}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Included Payments */}
                          {payout.payments.length > 0 && (
                            <div className="border-t pt-3 mt-3">
                              <p className="text-sm font-medium mb-2">Included Payments:</p>
                              <div className="space-y-1">
                                {payout.payments.slice(0, 3).map((payment) => (
                                  <div key={payment.id} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{payment.description}</span>
                                    <span className="font-medium">{formatCurrency(payment.amount)}</span>
                                  </div>
                                ))}
                                {payout.payments.length > 3 && (
                                  <p className="text-xs text-gray-400">
                                    +{payout.payments.length - 3} more payments
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  {/* Monthly Revenue Trend */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Monthly Revenue Trend</h3>
                    <div className="flex items-end gap-3 h-32">
                      {monthlyTrend.map((item, idx) => {
                        const maxRevenue = Math.max(...monthlyTrend.map(m => m.revenue), 1)
                        const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                            <div className="text-xs font-medium text-gray-600">
                              {formatCurrency(item.revenue)}
                            </div>
                            <div 
                              className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t"
                              style={{ height: `${Math.max(height, 5)}%` }}
                            />
                            <span className="text-xs text-gray-500">{item.month}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Popular Time Slots */}
                  {timeSlots.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Popular Time Slots
                      </h3>
                      <div className="space-y-3">
                        {timeSlots.map((slot, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm w-40 font-medium">{slot.slot}</span>
                            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${Math.min((slot.bookings / (timeSlots[0]?.bookings || 1)) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold w-12 text-right">{slot.bookings}</span>
                            <span className="text-xs text-gray-500 w-20 text-right">
                              {formatCurrency(slot.revenue)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conversion Funnel */}
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <h3 className="font-medium mb-6 flex items-center gap-2 text-blue-900">
                      <TrendingUp className="w-5 h-5" />
                      Revenue Insights
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        <strong>💡 Key Insights:</strong>
                      </p>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li>
                          • Your average booking value is {formatCurrency(summary.avgBookingValue)}. 
                          Consider offering package deals to increase this.
                        </li>
                        <li>
                          • You have {summary.totalBookings} bookings this period with 
                          {' '}{summary.periodChange > 0 ? 'an increase' : 'a decrease'} of{' '}
                          {Math.abs(summary.periodChange).toFixed(0)}% from the previous period.
                        </li>
                        {courses.length > 0 && (
                          <li>
                            • Your top course has {courses[0]?.enrollments || 0} enrollments. 
                            Focus marketing efforts on similar topics.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </main>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
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
                onKeyDown={(e) => e.key === 'Enter' && handleSendEmail()}
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
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendEmail}
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

      {/* Payout Request Dialog */}
      <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Request Payout
            </DialogTitle>
            <DialogDescription>
              Request a payout of your available balance. Processing typically takes 2-3 business days.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Available Balance</p>
              <p className="text-2xl font-bold text-green-700">
                {formatCurrency(data?.summary.availableBalance || 0)}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payout-amount">Payout Amount</Label>
              <Input
                id="payout-amount"
                type="number"
                placeholder="Enter amount..."
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
                min={1}
                max={data?.summary.availableBalance}
              />
              <p className="text-xs text-gray-500">
                Minimum payout: {formatCurrency(10)}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Payout Method</Label>
              <select
                className="w-full border rounded px-3 py-2"
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value)}
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="stripe_connect">Stripe Connect</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <p className="font-medium text-gray-700">Payout Details:</p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Processing time: 2-3 business days</li>
                <li>• No processing fees</li>
                <li>• You'll receive a confirmation email</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayoutDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitPayoutRequest}
              disabled={submittingPayout || !payoutAmount || parseFloat(payoutAmount) <= 0}
              className="bg-gradient-to-r from-green-600 to-emerald-600"
            >
              {submittingPayout ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Request Payout
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
