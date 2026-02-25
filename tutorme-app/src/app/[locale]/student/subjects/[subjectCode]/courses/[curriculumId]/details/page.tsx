'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, Loader2, User, Clock, DollarSign, Globe, Calendar, Users } from 'lucide-react'

interface ScheduleSlot {
  dayOfWeek?: number
  startTime?: string
  durationMinutes?: number
}

interface CurriculumDetails {
  id: string
  name: string
  subject: string
  description: string | null
  difficulty: string
  estimatedHours: number
  price: number | null
  currency: string | null
  gradeLevel: string | null
  languageOfInstruction: string | null
  schedule: ScheduleSlot[] | null
  isLiveOnline: boolean
  modulesCount: number
  lessonsCount: number
  studentCount?: number
  enrolled?: boolean
  creator: {
    id: string
    name: string
    bio: string | null
  } | null
}

export default function CourseDetailsPage() {
  const params = useParams()
  const subjectCode = typeof params.subjectCode === 'string' ? params.subjectCode : ''
  const curriculumId = typeof params.curriculumId === 'string' ? params.curriculumId : ''
  const [data, setData] = useState<CurriculumDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const coursesUrl = `/student/subjects/${encodeURIComponent(subjectCode)}/courses`
  const enrollUrl = `/student/subjects/${encodeURIComponent(subjectCode)}/courses/${encodeURIComponent(curriculumId)}`

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
      .then((d: CurriculumDetails) => {
        if (!cancelled) setData(d)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load course')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [curriculumId])

  const formatPrice = (price: number | null, currency: string | null) => {
    if (price == null || price === 0) return 'Free'
    const curr = currency ?? 'SGD'
    return `${curr} ${Number(price).toFixed(2)}`
  }

  const formatSchedule = (schedule: ScheduleSlot[] | null) => {
    if (!schedule || !Array.isArray(schedule) || schedule.length === 0) return null
    return schedule.map((s) => {
      const day = typeof s.dayOfWeek === 'number' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][s.dayOfWeek] : ''
      const time = s.startTime ?? ''
      const mins = s.durationMinutes ?? 0
      return `${day} ${time} (${mins} min)`.trim()
    }).filter(Boolean).join(' · ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-xl mx-auto p-4 sm:p-6">
          <Link href={coursesUrl} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
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

  const scheduleText = formatSchedule(data.schedule)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <Link href={coursesUrl} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to courses
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl">{data.name}</CardTitle>
                <CardDescription className="flex flex-wrap gap-2 mt-1">
                  {data.gradeLevel && <span>{data.gradeLevel}</span>}
                  {data.difficulty && (
                    <Badge variant="secondary" className="capitalize">{data.difficulty}</Badge>
                  )}
                  {data.subject && (
                    <span className="capitalize">{data.subject.replace(/-/g, ' ')}</span>
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.description}</p>
              </div>
            )}

            {data.creator && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Tutor
                </h3>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="font-medium">{data.creator.name}</p>
                  {data.creator.bio && (
                    <p className="text-sm text-muted-foreground mt-1">{data.creator.bio}</p>
                  )}
                </div>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span><strong>Duration:</strong> {data.estimatedHours} hours estimated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span><strong>Price:</strong> {formatPrice(data.price, data.currency)}</span>
              </div>
              {data.languageOfInstruction && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span><strong>Language:</strong> {data.languageOfInstruction}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span>{data.modulesCount} modules · {data.lessonsCount} lessons</span>
              </div>
              {data.studentCount != null && data.studentCount > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{data.studentCount} students enrolled</span>
                </div>
              )}
            </div>

            {data.isLiveOnline && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                Live online sessions available
              </p>
            )}

            {scheduleText && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </h3>
                <p className="text-sm text-muted-foreground">{scheduleText}</p>
              </div>
            )}

            <div className="pt-4 flex flex-wrap gap-2">
              <Button asChild>
                <Link href={enrollUrl}>
                  {data.enrolled ? 'View enrollment' : 'Enroll or view details'}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={coursesUrl}>Back to course list</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
