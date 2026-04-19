'use client'

import { Suspense } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, BookOpen, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import { BackButton } from '@/components/navigation'

interface CourseDetail {
  id: string
  name: string
  subject: string
  description: string | null
  difficulty: string
  estimatedHours: number
  price: number | null
  currency: string | null
  modulesCount: number
  lessonsCount: number
  enrolled?: boolean
}

function CourseEnrollPageInner() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const subjectCode = typeof params.subjectCode === 'string' ? params.subjectCode : ''
  const courseId = typeof params.courseId === 'string' ? params.courseId : ''
  const batchId = searchParams.get('batch')

  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<string | null>(null)

  const coursesUrl = `/student/subjects/${encodeURIComponent(subjectCode)}/courses`
  const isFree = course != null && (course.price == null || course.price === 0)

  useEffect(() => {
    if (!courseId) return
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`/api/courses/${encodeURIComponent(courseId)}`, { credentials: 'include' })
      .then(res => {
        if (res.status === 404) throw new Error('Course not found')
        if (!res.ok) throw new Error('Failed to load course')
        return res.json()
      })
      .then((data: CourseDetail) => {
        if (!cancelled) setCourse(data)
      })
      .catch(e => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load course')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [courseId])

  const getCsrf = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    return data?.token ?? null
  }

  const handleEnroll = async () => {
    if (!course || !isFree) return
    if (!startDate) {
      toast.error('Please select a start date')
      return
    }
    setEnrolling(true)
    try {
      const csrf = await getCsrf()
      const bodyPayload: any = { startDate }
      if (batchId) bodyPayload.batchId = batchId

      const res = await fetch(`/api/course/${encodeURIComponent(courseId)}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify(bodyPayload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(json?.message ?? 'Enrollment failed')
        return
      }
      toast.success('Enrolled successfully')
      router.push('/student/courses?tab=mine')
    } catch {
      toast.error('Enrollment failed')
    } finally {
      setEnrolling(false)
    }
  }

  const handlePayAndEnroll = async () => {
    if (!course || isFree) return
    if (!startDate) {
      toast.error('Please select a start date')
      return
    }
    setPaying(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ courseId, metadata: { startDate } }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(json?.message ?? json?.error ?? 'Could not start payment')
        return
      }
      const url = json?.checkoutUrl
      if (url) {
        window.location.href = url
        return
      }
      toast.error('No checkout URL received')
    } catch {
      toast.error('Could not start payment')
    } finally {
      setPaying(false)
    }
  }

  const formatPrice = (price: number | null, currency: string | null) => {
    if (price == null || price === 0) return 'Free'
    const curr = currency ?? 'SGD'
    return `${curr} ${Number(price).toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-xl p-4 sm:p-6">
          <BackButton href={coursesUrl} className="mb-4" />
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-xl p-4 sm:p-6">
          <BackButton href={coursesUrl} className="mb-4" />
          <Card className="border-destructive/50">
            <CardContent className="pt-6">
              <p className="text-destructive text-sm">{error ?? 'Course not found'}</p>
              <Button variant="outline" asChild className="mt-4">
                <Link href={coursesUrl}>Back to courses</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-xl p-4 sm:p-6">
        <BackButton href={coursesUrl} className="mb-4" />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {course.name}
            </CardTitle>
            {course.difficulty && (
              <CardDescription className="flex flex-wrap gap-2">
                <span className="capitalize">{course.difficulty}</span>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {course.description && (
              <p className="text-muted-foreground text-sm">{course.description}</p>
            )}
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>{course.estimatedHours}h estimated</li>
              <li>
                {course.modulesCount} modules · {course.lessonsCount} lessons
              </li>
              <li className="text-foreground font-medium">
                Price: {formatPrice(course.price, course.currency)}
              </li>
            </ul>

            {course.enrolled ? (
              <div className="bg-muted/50 space-y-2 rounded-lg border p-4">
                <p className="text-sm font-medium">You&apos;re already enrolled in this course.</p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild>
                    <Link href="/student/dashboard">Go to dashboard</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/student/scores">My scores</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link
                      href={`/student/subjects/${encodeURIComponent(subjectCode)}/courses/${encodeURIComponent(courseId)}/details`}
                    >
                      View course details
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    When would you like to start?
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate ?? ''}
                      onChange={e => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                {isFree ? (
                  <Button className="w-full sm:w-auto" onClick={handleEnroll} disabled={enrolling}>
                    {enrolling ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enrolling…
                      </>
                    ) : (
                      'Enroll'
                    )}
                  </Button>
                ) : (
                  <div className="bg-muted/50 space-y-2 rounded-lg border p-4">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <CreditCard className="h-4 w-4" />
                      Pay & Enroll
                    </p>
                    <p className="text-muted-foreground text-sm">
                      You will be redirected to our secure payment page. After payment, you will be
                      enrolled automatically.
                    </p>
                    <Button
                      className="w-full sm:w-auto"
                      onClick={handlePayAndEnroll}
                      disabled={paying}
                    >
                      {paying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Redirecting…
                        </>
                      ) : (
                        'Pay & Enroll'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CourseEnrollPage() {
  return (
    <Suspense fallback={null}>
      <CourseEnrollPageInner />
    </Suspense>
  )
}
