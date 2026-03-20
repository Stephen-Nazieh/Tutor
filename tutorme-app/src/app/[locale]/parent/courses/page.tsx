'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, ChevronRight } from 'lucide-react'

interface SharedCourse {
  shareId: string
  courseId: string
  name: string
  description: string | null
  subject: string
  gradeLevel: string | null
  estimatedHours: number
  price: number | null
  currency: string
  tutorName: string
  sharedMessage: string
  sharedAt: string
}

export default function ParentCoursesPage() {
  const [courses, setCourses] = useState<SharedCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/parent/courses', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setCourses(data.courses ?? [])
      })
      .catch(() => setError('Failed to load courses'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Shared Courses</h1>
      <p className="text-gray-500">Courses shared with you by tutors. Click to view details.</p>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="py-8 text-center text-gray-500">
              No courses have been shared with you yet. When a tutor shares a course, it will appear
              here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {courses.map(c => (
            <Card key={c.shareId} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{c.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {c.description ?? 'No description'}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                      <span>By {c.tutorName}</span>
                      <span className="capitalize">{c.subject}</span>
                      {c.estimatedHours > 0 && <span>{c.estimatedHours}h</span>}
                    </div>
                    {c.sharedMessage && (
                      <p className="mt-2 text-sm italic text-gray-600">
                        &quot;{c.sharedMessage}&quot;
                      </p>
                    )}
                  </div>
                  <Link href={`/parent/courses/${c.shareId}`}>
                    <Button variant="outline" size="sm">
                      View
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
