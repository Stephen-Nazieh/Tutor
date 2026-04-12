'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BookOpen, Loader2, FileText, GraduationCap, Users } from 'lucide-react'
import { TutorList } from './components/TutorList'
import { DASHBOARD_THEMES, getThemeStyle } from '@/components/dashboard-theme'
import { BackButton } from '@/components/navigation'

interface CourseListItem {
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
  studentCount: number
  createdAt: string
}

export default function SubjectCoursesPage() {
  const params = useParams()
  const subjectCode = typeof params.subjectCode === 'string' ? params.subjectCode : ''
  const [courses, setCourses] = useState<CourseListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Theme state with localStorage persistence
  const [themeId, setThemeId] = useState('current')
  const selectedTheme = DASHBOARD_THEMES.find(theme => theme.id === themeId) ?? DASHBOARD_THEMES[0]
  const themeStyle = getThemeStyle(selectedTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('student-dashboard-theme')
    if (savedTheme) {
      setThemeId(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('student-dashboard-theme', themeId)
  }, [themeId])

  const subjectLabel = subjectCode.charAt(0).toUpperCase() + subjectCode.slice(1).replace(/-/g, ' ')
  const signupUrl = `/student/subjects/${encodeURIComponent(subjectCode)}/signup`

  useEffect(() => {
    if (!subjectCode) return
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`/api/courses/list?subject=${encodeURIComponent(subjectCode)}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load courses')
        return res.json()
      })
      .then((data: { courses: CourseListItem[] }) => {
        if (!cancelled) setCourses(data.courses ?? [])
      })
      .catch(e => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load courses')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [subjectCode])

  const formatPrice = (price: number | null, currency: string | null) => {
    if (price == null || price === 0) return 'Free'
    const curr = currency ?? 'SGD'
    return `${curr} ${Number(price).toFixed(2)}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={themeStyle}>
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <BackButton href={signupUrl} />
          {/* Theme Selector */}
          <Select value={themeId} onValueChange={setThemeId}>
            <SelectTrigger className="h-8 w-[160px] border-border bg-card text-xs text-foreground">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {DASHBOARD_THEMES.map(theme => (
                <SelectItem key={theme.id} value={theme.id}>
                  {theme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <h1 className="mb-2 text-2xl font-semibold text-foreground">
          Choose a Course / Tutor — {subjectLabel}
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Select a course to enroll or find a tutor for personalized help.
        </p>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="tutors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Tutors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}

            {error && (
              <Card className="border-destructive/50 bg-card">
                <CardContent className="pt-6">
                  <p className="text-sm text-destructive">{error}</p>
                  <Button variant="outline" asChild className="mt-4">
                    <Link href={signupUrl}>Back to signup</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {!loading && !error && courses.length === 0 && (
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center py-8 text-center">
                    <BookOpen className="mb-4 h-12 w-12 text-muted" />
                    <p className="mb-4 text-muted-foreground">
                      No courses available for {subjectLabel} yet.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href={signupUrl}>Back to signup</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !error && courses.length > 0 && (
              <ul className="space-y-4">
                {courses.map(c => (
                  <li key={c.id}>
                    <Card className="border-border bg-card transition-colors hover:border-accent">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-foreground">{c.name}</CardTitle>
                        {(c.gradeLevel || c.difficulty) && (
                          <CardDescription className="mt-1 flex flex-wrap gap-2">
                            {c.gradeLevel && <span>{c.gradeLevel}</span>}
                            {c.difficulty && <span className="capitalize">{c.difficulty}</span>}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {c.description && (
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {c.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span>{c.estimatedHours}h estimated</span>
                          <span>
                            {c.modulesCount} modules · {c.lessonsCount} lessons
                          </span>
                          {c.studentCount > 0 && <span>{c.studentCount} students</span>}
                          <span className="font-medium text-foreground">
                            {formatPrice(c.price, c.currency)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button asChild className="w-full sm:w-auto">
                            <Link
                              href={`/student/subjects/${encodeURIComponent(subjectCode)}/courses/${encodeURIComponent(c.id)}`}
                            >
                              Select
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            asChild
                            className="w-full border-border sm:w-auto"
                          >
                            <Link
                              href={`/student/subjects/${encodeURIComponent(subjectCode)}/courses/${encodeURIComponent(c.id)}/details`}
                            >
                              <FileText className="mr-1 h-3 w-3" />
                              View course details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="tutors">
            <TutorList subjectCode={subjectCode} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
