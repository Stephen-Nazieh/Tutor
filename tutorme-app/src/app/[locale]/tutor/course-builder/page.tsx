'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react'

const DEFAULT_SUBJECT = 'general'
const DEFAULT_COURSE_NAME = 'Untitled Course'

export default function CourseBuilderPage() {
  const router = useRouter()
  const [creating, setCreating] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const createCourse = useCallback(async () => {
    setCreating(true)
    setErrorMessage(null)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/tutor/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: DEFAULT_COURSE_NAME,
          description: undefined,
          subject: DEFAULT_SUBJECT,
          categories: [],
          schedule: [],
          isLiveOnline: false,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.course?.id) {
        toast.success('Course created! Opening builder...')
        router.push(`/tutor/courses/${data.course.id}/builder`)
        return
      }

      const message = data.error || 'Failed to create course. Please try again.'
      setErrorMessage(message)
      toast.error(message)
    } catch {
      const message = 'An error occurred. Please check your connection and try again.'
      setErrorMessage(message)
      toast.error(message)
    } finally {
      setCreating(false)
    }
  }, [router])

  useEffect(() => {
    void createCourse()
  }, [createCourse])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-4" onClick={() => router.push('/tutor/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Opening Course Builder
            </CardTitle>
            <CardDescription>
              Creating a new course and taking you directly to the builder.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {creating ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating your course...
              </div>
            ) : errorMessage ? (
              <div className="space-y-3">
                <p className="text-sm text-red-600">{errorMessage}</p>
                <Button onClick={() => void createCourse()}>Try Again</Button>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Redirecting...</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
