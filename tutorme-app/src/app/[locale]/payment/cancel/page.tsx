'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle } from 'lucide-react'
import { BackButton } from '@/components/navigation'

function PaymentCancelContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const curriculumId = searchParams.get('curriculumId')
  const isCourse = type === 'course'

  const tryAgainUrl = isCourse && curriculumId ? `/student/dashboard` : '/student/classes'

  return (
    <div className="safe-top safe-bottom flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <BackButton fallbackHref="/student/dashboard" className="mb-4" />
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-2">
                <XCircle className="h-10 w-10 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Payment cancelled</CardTitle>
                <p className="mt-0.5 text-sm text-gray-500">No charge was made</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              {isCourse
                ? 'Your payment was cancelled or failed. You can try again from your dashboard or the course page.'
                : 'Your payment was cancelled or failed. Your booking may still be pending—complete payment from "My bookings" to confirm your spot.'}
            </p>
            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              {isCourse ? (
                <>
                  <Button asChild className="flex-1">
                    <Link href="/student/dashboard">View my courses</Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link href={tryAgainUrl}>Back to dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="flex-1">
                    <Link href="/student/classes">View classes</Link>
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
    </div>
  )
}

export default function PaymentCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="safe-top safe-bottom flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Loading...</p>
            </CardContent>
          </Card>
        </div>
      }
    >
      <PaymentCancelContent />
    </Suspense>
  )
}
