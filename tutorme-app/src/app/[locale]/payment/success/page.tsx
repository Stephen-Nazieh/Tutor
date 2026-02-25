'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const isCourse = type === 'course'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 safe-top safe-bottom">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Payment successful</CardTitle>
              <p className="text-sm text-gray-500 mt-0.5">
                {isCourse
                  ? "You're enrolled in the course"
                  : 'Your booking is confirmed'}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            {isCourse
              ? 'Thank you for your payment. You will receive a confirmation email shortly. You can access the course from your dashboard.'
              : 'Thank you for your payment. You will receive a confirmation email shortly. Your spot in the class is now reserved.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            {isCourse ? (
              <>
                <Button asChild className="flex-1">
                  <Link href="/student/dashboard">View my courses</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/student/dashboard">Back to dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="flex-1">
                  <Link href="/student/classes">View my bookings</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/student/dashboard">Back to dashboard</Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 safe-top safe-bottom">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
