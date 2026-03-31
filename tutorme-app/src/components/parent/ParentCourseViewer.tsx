'use client'

/**
 * ParentCourseViewer - Display shared course content for parents
 * Enterprise-grade with multi-language, currency, timezone support
 */

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, User, ChevronRight, GraduationCap } from 'lucide-react'
import { BackButton } from '@/components/navigation'

export interface CourseShareData {
  shareId: string
  courseId: string
  name: string
  description: string | null
  subject: string
  gradeLevel: string | null
  difficulty: string
  estimatedHours: number
  price: number | null
  currency: string
  languageOfInstruction: string | null
  tutorName: string
  sharedMessage: string
  sharedAt: string
  modules: Array<{
    id: string
    title: string
    description: string | null
    order: number
    lessons: Array<{
      id: string
      title: string
      description: string | null
      duration: number
      order: number
      learningObjectives: string[]
    }>
  }>
}

function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    SGD: 'S$',
    USD: '$',
    EUR: '€',
    CNY: '¥',
    GBP: '£',
  }
  const symbol = symbols[currency] ?? currency + ' '
  return symbol + amount.toFixed(2)
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface ParentCourseViewerProps {
  course: CourseShareData
}

export function ParentCourseViewer({ course }: ParentCourseViewerProps) {
  const totalLessons = course.modules.reduce((sum, m) => sum + (m.lessons?.length ?? 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <BackButton href="/parent/dashboard" className="mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
          <p className="mt-1 text-gray-500">{course.description ?? 'No description'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Shared by</p>
                <p className="font-medium">{course.tutorName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-medium capitalize">{course.subject}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 p-2">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {course.estimatedHours}h - {totalLessons} lessons
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {course.price != null && course.price > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">{formatCurrency(course.price, course.currency)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {course.sharedMessage && (
        <Card className="border-blue-100 bg-blue-50/50">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Message from {course.tutorName}:</span>{' '}
              {course.sharedMessage}
            </p>
            <p className="mt-2 text-xs text-gray-500">Shared on {formatDate(course.sharedAt)}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Course Outline</CardTitle>
          <CardDescription>
            {course.modules.length} modules, {totalLessons} lessons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {course.modules.map(module => (
              <div key={module.id} className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="secondary">Module {module.order}</Badge>
                  <h3 className="font-semibold">{module.title}</h3>
                </div>
                {module.description && (
                  <p className="mb-4 text-sm text-gray-500">{module.description}</p>
                )}
                <ul className="space-y-2">
                  {(module.lessons ?? []).map(lesson => (
                    <li
                      key={lesson.id}
                      className="flex items-start gap-3 border-b py-2 last:border-0"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{lesson.title}</p>
                        {lesson.learningObjectives?.length > 0 && (
                          <ul className="mt-1 list-inside list-disc text-xs text-gray-500">
                            {lesson.learningObjectives.slice(0, 2).map((obj, i) => (
                              <li key={i}>{obj}</li>
                            ))}
                          </ul>
                        )}
                        <p className="mt-1 text-xs text-gray-400">{lesson.duration} min</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link href="/parent/classes">
          <Button>View Classes & Schedule</Button>
        </Link>
        <Link href="/parent/children">
          <Button variant="outline">Enroll a Child</Button>
        </Link>
      </div>
    </div>
  )
}
