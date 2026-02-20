'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, BookOpen, Loader2, FileText, GraduationCap, Users } from 'lucide-react'
import { TutorList } from './components/TutorList'

interface CurriculumListItem {
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
  const [curriculums, setCurriculums] = useState<CurriculumListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const subjectLabel = subjectCode.charAt(0).toUpperCase() + subjectCode.slice(1).replace(/-/g, ' ')
  const signupUrl = `/student/subjects/${encodeURIComponent(subjectCode)}/signup`

  useEffect(() => {
    if (!subjectCode) return
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`/api/curriculums/list?subject=${encodeURIComponent(subjectCode)}`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load courses')
        return res.json()
      })
      .then((data: { curriculums: CurriculumListItem[] }) => {
        if (!cancelled) setCurriculums(data.curriculums ?? [])
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load courses')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [subjectCode])

  const formatPrice = (price: number | null, currency: string | null) => {
    if (price == null || price === 0) return 'Free'
    const curr = currency ?? 'SGD'
    return `${curr} ${Number(price).toFixed(2)}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <Link
          href={signupUrl}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to signup
        </Link>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Choose a Course / Tutor — {subjectLabel}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Select a course to enroll or find a tutor for personalized help.
        </p>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="tutors" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Tutors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            )}

            {error && (
              <Card className="border-destructive/50">
                <CardContent className="pt-6">
                  <p className="text-sm text-destructive">{error}</p>
                  <Button variant="outline" asChild className="mt-4">
                    <Link href={signupUrl}>Back to signup</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {!loading && !error && curriculums.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No courses available for {subjectLabel} yet.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href={signupUrl}>Back to signup</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !error && curriculums.length > 0 && (
              <ul className="space-y-4">
                {curriculums.map((c) => (
                  <li key={c.id}>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{c.name}</CardTitle>
                        {(c.gradeLevel || c.difficulty) && (
                          <CardDescription className="flex flex-wrap gap-2 mt-1">
                            {c.gradeLevel && <span>{c.gradeLevel}</span>}
                            {c.difficulty && (
                              <span className="capitalize">{c.difficulty}</span>
                            )}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {c.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {c.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span>{c.estimatedHours}h estimated</span>
                          <span>{c.modulesCount} modules · {c.lessonsCount} lessons</span>
                          {c.studentCount > 0 && (
                            <span>{c.studentCount} students</span>
                          )}
                          <span className="font-medium text-foreground">
                            {formatPrice(c.price, c.currency)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button asChild className="w-full sm:w-auto">
                            <Link href={`/student/subjects/${encodeURIComponent(subjectCode)}/courses/${encodeURIComponent(c.id)}`}>
                              Select
                            </Link>
                          </Button>
                          <Button variant="outline" asChild className="w-full sm:w-auto">
                            <Link href={`/student/subjects/${encodeURIComponent(subjectCode)}/courses/${encodeURIComponent(c.id)}/details`}>
                              <FileText className="w-3 h-3 mr-1" />
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
