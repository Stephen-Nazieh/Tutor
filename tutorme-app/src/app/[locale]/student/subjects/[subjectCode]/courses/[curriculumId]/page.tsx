'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2, BookOpen, CreditCard } from 'lucide-react'
import { toast } from 'sonner'

interface CurriculumDetail {
  id: string
  name: string
  subject: string
  description: string | null
  difficulty: string
  estimatedHours: number
  price: number | null
  currency: string | null
  gradeLevel: string | null
  modulesCount: number
  lessonsCount: number
  enrolled?: boolean
}

export default function CourseEnrollPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const subjectCode = typeof params.subjectCode === 'string' ? params.subjectCode : ''
  const curriculumId = typeof params.curriculumId === 'string' ? params.curriculumId : ''
  const batchId = searchParams.get('batch')

  const [curriculum, setCurriculum] = useState<CurriculumDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const coursesUrl = `/student/subjects/${encodeURIComponent(subjectCode)}/courses`
  const isFree = curriculum != null && (curriculum.price == null || curriculum.price === 0)

  useEffect(() => {
    if (!curriculumId) return
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`/api/curriculums/${encodeURIComponent(curriculumId)}`, { credentials: 'include' })
      .then((res) => {
        if (res.status === 404) throw new Error('Course not found')
        if (!res.ok) throw new Error('Failed to load course')
        return res.json()
      })
      .then((data: CurriculumDetail) => {
        if (!cancelled) setCurriculum(data)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load course')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [curriculumId])

  const getCsrf = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    return data?.token ?? null
  }

  const handleEnroll = async () => {
    if (!curriculum || !isFree) return
    setEnrolling(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/curriculum/${encodeURIComponent(curriculumId)}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify(batchId ? { batchId } : {})
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(json?.message ?? 'Enrollment failed')
        return
      }
      toast.success('Enrolled successfully')
      router.push('/student/dashboard')
    } catch {
      toast.error('Enrollment failed')
    } finally {
      setEnrolling(false)
    }
  }

  const handlePayAndEnroll = async () => {
    if (!curriculum || isFree) return
    setPaying(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ curriculumId })
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error || !curriculum) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-xl mx-auto p-4 sm:p-6">
          <Link
            href={coursesUrl}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to courses
          </Link>
          <Card className="border-destructive/50">
            <CardContent className="pt-6">
              <p className="text-sm text-destructive">{error ?? 'Course not found'}</p>
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
      <div className="max-w-xl mx-auto p-4 sm:p-6">
        <Link
          href={coursesUrl}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to courses
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {curriculum.name}
            </CardTitle>
            {(curriculum.gradeLevel || curriculum.difficulty) && (
              <CardDescription className="flex flex-wrap gap-2">
                {curriculum.gradeLevel && <span>{curriculum.gradeLevel}</span>}
                {curriculum.difficulty && (
                  <span className="capitalize">{curriculum.difficulty}</span>
                )}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {curriculum.description && (
              <p className="text-sm text-muted-foreground">{curriculum.description}</p>
            )}
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>{curriculum.estimatedHours}h estimated</li>
              <li>{curriculum.modulesCount} modules · {curriculum.lessonsCount} lessons</li>
              <li className="font-medium text-foreground">
                Price: {formatPrice(curriculum.price, curriculum.currency)}
              </li>
            </ul>

            {curriculum.enrolled ? (
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <p className="text-sm font-medium">You&apos;re already enrolled in this course.</p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild>
                    <Link href="/student/dashboard">Go to dashboard</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/student/scores">My scores</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/student/subjects/${encodeURIComponent(subjectCode)}/courses/${encodeURIComponent(curriculumId)}/details`}>
                      View course details
                    </Link>
                  </Button>
                </div>
              </div>
            ) : isFree ? (
              <Button
                className="w-full sm:w-auto"
                onClick={handleEnroll}
                disabled={enrolling}
              >
                {enrolling ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enrolling…
                  </>
                ) : (
                  'Enroll'
                )}
              </Button>
            ) : (
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <p className="text-sm font-medium flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Pay & Enroll
                </p>
                <p className="text-sm text-muted-foreground">
                  You will be redirected to our secure payment page. After payment, you will be enrolled automatically.
                </p>
                <Button
                  className="w-full sm:w-auto"
                  onClick={handlePayAndEnroll}
                  disabled={paying}
                >
                  {paying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Redirecting…
                    </>
                  ) : (
                    'Pay & Enroll'
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
