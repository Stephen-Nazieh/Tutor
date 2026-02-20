/**
 * Course Builder 2.0 content for a given course.
 * Loads the curriculum tree from the backend on mount;
 * saves back via PUT /api/tutor/courses/[id]/curriculum.
 */

'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Wand2, BookOpen, Radio, Loader2 } from 'lucide-react'
import { CourseBuilder } from '@/app/tutor/dashboard/components/CourseBuilder'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CourseData {
  id: string
  name: string
  isLiveOnline?: boolean
  studentCount: number
}

export function CourseBuilderContent({ courseId }: { courseId: string | null }) {
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isLiveOnline, setIsLiveOnline] = useState(true)
  const [loadedModules, setLoadedModules] = useState<any[] | null>(null)

  const loadCourse = useCallback(async () => {
    if (!courseId) return
    setLoading(true)
    try {
      // Load course metadata
      const res = await fetch(`/api/tutor/courses/${courseId}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setCourse(data.course)
        setIsLiveOnline(data.course?.isLiveOnline ?? true)
      }

      // Load curriculum tree from DB
      const currRes = await fetch(`/api/tutor/courses/${courseId}/curriculum`, { credentials: 'include' })
      if (currRes.ok) {
        const currData = await currRes.json()
        if (Array.isArray(currData.modules) && currData.modules.length > 0) {
          setLoadedModules(currData.modules)
        } else {
          // No modules saved yet — start with empty defaults
          setLoadedModules(null)
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    loadCourse()
  }, [loadCourse])

  const handleToggleAvailability = async () => {
    const newValue = !isLiveOnline
    setIsLiveOnline(newValue)

    setSaving(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${courseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ isLiveOnline: newValue }),
      })

      if (res.ok) {
        toast.success(newValue ? 'Course is now online' : 'Course is now offline')
        setCourse(prev => prev ? { ...prev, isLiveOnline: newValue } : null)
      } else {
        setIsLiveOnline(!newValue)
        toast.error('Failed to update availability')
      }
    } catch {
      setIsLiveOnline(!newValue)
      toast.error('Failed to update availability')
    } finally {
      setSaving(false)
    }
  }

  if (!courseId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Builder
            </CardTitle>
            <CardDescription>
              Select a course to edit its curriculum. Open a course from the Course Catalogue or from your dashboard to use the builder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/curriculum">Open Course Catalogue</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSave = async (modules: unknown[]) => {
    setSaving(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${courseId}/curriculum`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ modules }),
      })

      if (res.ok) {
        const data = await res.json()
        toast.success(`Curriculum saved — ${data.moduleCount} modules, ${data.lessonCount} lessons`)
      } else {
        const err = await res.json().catch(() => ({}))
        toast.error(err.error ?? 'Failed to save curriculum')
      }
    } catch {
      toast.error('Failed to save curriculum')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/tutor/courses/${courseId}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">
                  {loading ? 'Loading...' : (course?.name ?? 'Course Builder 2.0')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Visual curriculum editor with AI assistance
                  {saving && <span className="ml-2 text-blue-600">• Saving...</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Course Availability Toggle */}
              <div className="flex items-center gap-2 pr-4 border-r">
                <Radio className={cn(
                  "h-4 w-4",
                  isLiveOnline ? "text-green-500" : "text-gray-400"
                )} />
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {isLiveOnline ? 'Online' : 'Offline'}
                </span>
                <button
                  type="button"
                  onClick={handleToggleAvailability}
                  disabled={saving || loading}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    isLiveOnline ? 'bg-green-500' : 'bg-gray-200',
                    (saving || loading) && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      isLiveOnline ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              <Button variant="outline" asChild>
                <Link href={`/tutor/courses/${courseId}`}>
                  Back to Course
                </Link>
              </Button>
              <Button className="gap-2">
                <Wand2 className="w-4 h-4" />
                AI Assist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width for 3-Column Layout */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <CourseBuilder
            courseId={courseId}
            courseName={course?.name}
            initialModules={loadedModules ?? undefined}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  )
}
