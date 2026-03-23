'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Wrench } from 'lucide-react'

interface Course {
  id: string
  updatedAt: string
}

export default function CourseBuilderPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/tutor/courses', { credentials: 'include' })
        if (!res.ok) {
          // Silent fallback if API fails
          router.replace('/tutor/courses/builder-draft/builder')
          return
        }
        const data = await res.json()
        const coursesList = data.courses || []
        setCourses(coursesList)
        if (coursesList.length > 0) {
          const sorted = [...coursesList].sort(
            (a: Course, b: Course) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          router.replace(`/tutor/courses/${sorted[0].id}/builder`)
        } else {
          // No courses found, use default
          router.replace('/tutor/courses/builder-draft/builder')
        }
      } catch (error) {
        // Network or other error fallback
        router.replace('/tutor/courses/builder-draft/builder')
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-xl">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <Wrench className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-lg font-semibold">Opening Course Builder…</h1>
              <p className="text-sm text-muted-foreground">
                Redirecting to your most recently updated course.
              </p>
            </div>
            {loading && <Loader2 className="h-6 w-6 animate-spin text-blue-500" />}
            {!loading && courses.length === 0 && (
              <Button onClick={() => router.push('/tutor/courses/new')}>New session</Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
