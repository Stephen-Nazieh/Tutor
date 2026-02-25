'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, ChevronRight, Loader2, Plus, List, UserPlus, FileText, School, Trophy } from 'lucide-react'
import { toast } from 'sonner'

export interface EnrolledCourse {
  id: string
  name: string
  subject: string
  description: string | null
  progress: number
  completedLessons: number
  totalLessons: number
  lastStudied: string | null
  /** 'browse' = added from Add subject; 'signup' = enrolled via signup/course flow. null = legacy, treat as signup. */
  enrollmentSource?: string | null
}

const VISIBLE_COURSES = 5

interface MyCoursesCardProps {
  courses: EnrolledCourse[]
  onCourseRemoved?: () => void
}

export function MyCoursesCard({ courses, onCourseRemoved }: MyCoursesCardProps) {
  const [showAll, setShowAll] = useState(false)
  const [removingSubject, setRemovingSubject] = useState<string | null>(null)

  const visibleCourses = showAll || courses.length <= VISIBLE_COURSES
    ? courses
    : courses.slice(0, VISIBLE_COURSES)
  const hasMore = courses.length > VISIBLE_COURSES
  const isExpanded = showAll && hasMore

  const getCsrf = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    return data?.token ?? null
  }

  const handleRemove = async (course: EnrolledCourse) => {
    setRemovingSubject(course.subject)
    try {
      const csrf = await getCsrf()
      const res = await fetch('/api/student/subjects/unenroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ subjectCode: course.subject }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(json?.message ?? 'Failed to remove subject')
        return
      }
      toast.success('Subject removed')
      onCourseRemoved?.()
    } catch {
      toast.error('Failed to remove subject')
    } finally {
      setRemovingSubject(null)
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            My courses
          </CardTitle>
          <div className="flex items-center gap-2">
            <Link href="/student/courses?tab=browse">
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add subject
              </Button>
            </Link>
            {courses.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll((s) => !s)}
              >
                <List className="w-4 h-4 mr-1" />
                {isExpanded ? 'Show less' : 'Browse all'}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {courses.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-700">No courses yet</p>
            <p className="text-sm mt-1">Browse subjects and enroll in a course to get started.</p>
            <Link href="/student/courses?tab=browse">
              <Button className="mt-4">Add subject</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-wrap items-center gap-4 px-3 py-4 sm:py-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <Link href={`/student/subjects/${encodeURIComponent(course.subject)}`} className="flex flex-1 min-w-0 items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{course.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{course.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={course.progress} className="h-2 flex-1" />
                      <span className="text-xs text-gray-500 w-10 text-right">{course.progress}%</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                </Link>
                <div className="flex items-center gap-2 sm:gap-1 shrink-0 flex-wrap justify-end">
                  <Button
                    variant="default"
                    size="sm"
                    className="h-8 text-xs"
                    asChild
                  >
                    <Link
                      href={course.enrollmentSource === 'browse'
                        ? `/student/subjects/${encodeURIComponent(course.subject)}/signup`
                        : `/student/courses?subject=${encodeURIComponent(course.subject)}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <School className="w-3 h-3 mr-1" />
                      Enter classroom
                    </Link>
                  </Button>
                  {course.enrollmentSource === 'signup' || course.enrollmentSource == null ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      disabled
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      Enrolled
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      asChild
                    >
                      <Link href={`/student/subjects/${encodeURIComponent(course.subject)}/signup`} onClick={(e) => e.stopPropagation()}>
                        <UserPlus className="w-3 h-3 mr-1" />
                        Sign up
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    asChild
                  >
                    <Link href="/student/scores" onClick={(e) => e.stopPropagation()}>
                      <Trophy className="w-3 h-3 mr-1" />
                      My scores
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    asChild
                  >
                    <Link
                      href={`/student/subjects/${encodeURIComponent(course.subject)}/courses/${encodeURIComponent(course.id)}/details`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      View course details
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRemove(course)}
                    disabled={removingSubject === course.subject}
                  >
                    {removingSubject === course.subject ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Remove'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
