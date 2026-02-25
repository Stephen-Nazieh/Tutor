'use client'

/**
 * ParentCourseViewer - Display shared course content for parents
 * Enterprise-grade with multi-language, currency, timezone support
 */

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Clock,
  User,
  ChevronRight,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react'

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
  const totalLessons = course.modules.reduce(
    (sum, m) => sum + (m.lessons?.length ?? 0),
    0
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/parent/dashboard">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
          <p className="text-gray-500 mt-1">{course.description ?? 'No description'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
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
              <div className="p-2 bg-green-100 rounded-lg">
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
              <div className="p-2 bg-amber-100 rounded-lg">
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
                <div className="p-2 bg-purple-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">
                    {formatCurrency(course.price, course.currency)}
                  </p>
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
            <p className="text-xs text-gray-500 mt-2">
              Shared on {formatDate(course.sharedAt)}
            </p>
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
            {course.modules.map((module) => (
              <div key={module.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">Module {module.order}</Badge>
                  <h3 className="font-semibold">{module.title}</h3>
                </div>
                {module.description && (
                  <p className="text-sm text-gray-500 mb-4">{module.description}</p>
                )}
                <ul className="space-y-2">
                  {(module.lessons ?? []).map((lesson) => (
                    <li
                      key={lesson.id}
                      className="flex items-start gap-3 py-2 border-b last:border-0"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{lesson.title}</p>
                        {lesson.learningObjectives?.length > 0 && (
                          <ul className="text-xs text-gray-500 mt-1 list-disc list-inside">
                            {lesson.learningObjectives.slice(0, 2).map((obj, i) => (
                              <li key={i}>{obj}</li>
                            ))}
                          </ul>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {lesson.duration} min
                        </p>
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
