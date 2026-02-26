// @ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export interface PaymentAlertButtonProps {
  courseId: string
  roomId: string
  redirectPath?: string
}

export function PaymentAlertButton({
  courseId,
  roomId,
  redirectPath,
}: PaymentAlertButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentRequired, setPaymentRequired] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePaymentAlert = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/class/payment-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, courseId }),
      })

      const data = await response.json()

      if (data.canJoin) {
        // Class page removed - redirect to student dashboard with the class info
        // Students will join through the Live Class system
        toast.success('You can join the class from your dashboard')
        window.location.href = redirectPath ?? '/student/dashboard'
        return
      }

      if (data.paymentRequired) {
        setPaymentRequired(true)
        if (!data.parentNotified) {
          setError(data.error ?? 'Payment required for this course.')
        }
      } else if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      console.error('Payment alert failed:', err)
      setError('Failed to send payment reminder. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (paymentRequired) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-500" />
          <div className="space-y-1">
            <p className="font-medium text-amber-800 dark:text-amber-200">
              Payment required for this course.
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Check parent notifications for payment details.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        size="lg"
        onClick={handlePaymentAlert}
        disabled={isLoading}
        className="min-h-[44px]"
      >
        {isLoading ? 'Sending payment reminder...' : 'Alert Parent for Payment'}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
