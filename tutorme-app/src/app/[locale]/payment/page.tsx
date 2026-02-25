'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, CreditCard, ArrowLeft, Lock } from 'lucide-react'
import { toast } from 'sonner'

type GatewayOption = 'HITPAY' | 'AIRWALLEX' | 'WECHAT_PAY' | 'ALIPAY'

const gatewayOptions: { value: GatewayOption; label: string; description: string }[] = [
  { value: 'HITPAY', label: 'HitPay', description: 'Cards, PayNow, GrabPay' },
  { value: 'AIRWALLEX', label: 'Airwallex', description: 'Global cards & wallets' },
  { value: 'WECHAT_PAY', label: 'WeChat Pay', description: 'For China users' },
  { value: 'ALIPAY', label: 'Alipay', description: 'For China users' },
]

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState<{ name: string; subject: string } | null>(null)
  const [selectedGateway, setSelectedGateway] = useState<GatewayOption>('HITPAY')

  const curriculumId = searchParams.get('curriculumId')
  const amount = searchParams.get('amount')
  const currency = searchParams.get('currency') || 'USD'

  useEffect(() => {
    if (curriculumId) {
      // Load course details
      fetch(`/api/curriculum/${curriculumId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.curriculum) {
            setCourse({
              name: data.curriculum.name,
              subject: data.curriculum.subject
            })
          }
        })
        .catch(() => {})
    }
  }, [curriculumId])

  const handlePayment = async () => {
    if (!curriculumId || !amount) {
      toast.error('Invalid payment details')
      return
    }

    setLoading(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      // Use different endpoints for Chinese gateways vs standard gateways
      const isChineseGateway = selectedGateway === 'WECHAT_PAY' || selectedGateway === 'ALIPAY'
      const endpoint = isChineseGateway ? '/api/payments/chinese-gateways' : '/api/payments/create'
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({
          curriculumId,
          amount: parseFloat(amount),
          currency,
          gateway: selectedGateway,
          description: course ? `Course: ${course.name}` : 'Course enrollment',
        }),
      })

      const data = await res.json()

      if (res.ok && (data.checkoutUrl || data.paymentUrl)) {
        // Redirect to payment gateway
        window.location.href = data.checkoutUrl || data.paymentUrl
      } else {
        toast.error(data.error || 'Failed to create payment')
        setLoading(false)
      }
    } catch {
      toast.error('Failed to process payment')
      setLoading(false)
    }
  }

  const formatCurrency = (amount: string, currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      SGD: 'S$',
      CNY: '¥',
      MYR: 'RM',
      EUR: '€',
      GBP: '£',
      AUD: 'A$',
      CAD: 'C$',
      JPY: '¥',
      INR: '₹',
      KRW: '₩',
      HKD: 'HK$',
    }
    const symbol = symbols[currency] || currency + ' '
    return `${symbol}${parseFloat(amount).toFixed(2)}`
  }

  if (!curriculumId || !amount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Invalid Payment Request</CardTitle>
            <CardDescription>
              Missing required payment information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/curriculum">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href={`/curriculum/${curriculumId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Complete Payment
            </CardTitle>
            <CardDescription>
              Secure payment for your course enrollment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Course Info */}
            {course && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Course</p>
                <p className="text-lg font-semibold text-blue-900">{course.name}</p>
                <p className="text-sm text-blue-700">{course.subject}</p>
              </div>
            )}

            {/* Amount */}
            <div className="text-center py-6 border-y">
              <p className="text-sm text-gray-500 mb-1">Total Amount</p>
              <p className="text-4xl font-bold text-gray-900">
                {formatCurrency(amount, currency)}
              </p>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select
                value={selectedGateway}
                onValueChange={(v) => setSelectedGateway(v as GatewayOption)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose payment method" />
                </SelectTrigger>
                <SelectContent>
                  {gatewayOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label} — {opt.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="h-4 w-4" />
              <span>Secure payment processing</span>
            </div>

            {/* Pay Button */}
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Pay {formatCurrency(amount, currency)}
                </>
              )}
            </Button>

            <p className="text-xs text-center text-gray-400">
              You will be redirected to our secure payment partner to complete the transaction.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
