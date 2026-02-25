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
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses ?? [])
      })
      .catch(() => setError('Failed to load courses'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
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
      <p className="text-gray-500">
        Courses shared with you by tutors. Click to view details.
      </p>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-500 text-center py-8">
              No courses have been shared with you yet. When a tutor shares a course, it will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {courses.map((c) => (
            <Card key={c.shareId} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{c.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{c.description ?? 'No description'}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>By {c.tutorName}</span>
                      <span className="capitalize">{c.subject}</span>
                      {c.estimatedHours > 0 && (
                        <span>{c.estimatedHours}h</span>
                      )}
                    </div>
                    {c.sharedMessage && (
                      <p className="text-sm text-gray-600 mt-2 italic">&quot;{c.sharedMessage}&quot;</p>
                    )}
                  </div>
                  <Link href={`/parent/courses/${c.shareId}`}>
                    <Button variant="outline" size="sm">
                      View
                      <ChevronRight className="h-4 w-4 ml-1" />
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
