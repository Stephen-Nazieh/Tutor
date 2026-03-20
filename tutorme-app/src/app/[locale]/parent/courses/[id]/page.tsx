'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ParentCourseViewer, type CourseShareData } from '@/components/parent/ParentCourseViewer'
import { Button } from '@/components/ui/button'

export default function ParentCoursePage() {
  const params = useParams()
  const courseId = params.id as string
  const [courseData, setCourseData] = useState<CourseShareData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) return
    fetch(`/api/parent/courses/${courseId}`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error(res.status === 404 ? 'Course not found' : 'Failed to load')
        return res.json()
      })
      .then(data => {
        setCourseData(data.course ?? null)
      })
      .catch(err => {
        setError(err.message ?? 'Failed to load course')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [courseId])

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <span className="ml-3 text-gray-500">Loading course details...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    )
  }

  return <ParentCourseViewer course={courseData} />
}
