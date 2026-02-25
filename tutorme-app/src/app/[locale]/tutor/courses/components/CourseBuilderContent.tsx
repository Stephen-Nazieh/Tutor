/**
 * Course Builder 2.0 content for a given course.
 * Loads the curriculum tree from the backend on mount;
 * saves back via PUT /api/tutor/courses/[id]/curriculum.
 */

'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Wand2, BookOpen, Radio, Loader2, Settings, Save } from 'lucide-react'
import { CourseBuilder } from '../../dashboard/components/CourseBuilder'
import type { Module as CourseBuilderModule, CourseBuilderRef } from '../../dashboard/components/CourseBuilder'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { PublishStatusBadge } from '@/components/tutor/PublishButton'
import { CoursePitchSection } from '@/components/tutor/CoursePitchSection'

interface CourseData {
  id: string
  name: string
  description?: string | null
  subject?: string | null
  isLiveOnline?: boolean
  studentCount: number
  isPublished: boolean
  price?: number | null
  currency?: string | null
}

interface AdaptiveVariantLink {
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  batchId: string
  batchName: string
  joinLink: string
}

const DIFFICULTY_ORDER: Record<AdaptiveVariantLink['difficulty'], number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
}

function normalizeVariantLinks(data: unknown): AdaptiveVariantLink[] {
  if (!Array.isArray(data)) return []

  return data
    .filter((item): item is AdaptiveVariantLink => {
      if (!item || typeof item !== 'object') return false
      const candidate = item as Partial<AdaptiveVariantLink>
      return (
        (candidate.difficulty === 'beginner' ||
          candidate.difficulty === 'intermediate' ||
          candidate.difficulty === 'advanced') &&
        typeof candidate.batchId === 'string' &&
        typeof candidate.batchName === 'string' &&
        typeof candidate.joinLink === 'string'
      )
    })
    .sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty])
}

export function CourseBuilderContent({ courseId }: { courseId: string | null }) {
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isLiveOnline, setIsLiveOnline] = useState(true)
  const [loadedModules, setLoadedModules] = useState<CourseBuilderModule[] | null>(null)
  const [savedVariants, setSavedVariants] = useState<AdaptiveVariantLink[]>([])
  const courseBuilderRef = useRef<CourseBuilderRef>(null)

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

  const handleSave = async (
    modules: CourseBuilderModule[],
    options?: {
      developmentMode: 'single' | 'multi'
      previewDifficulty: 'all' | 'beginner' | 'intermediate' | 'advanced'
    }
  ) => {
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
        body: JSON.stringify({
          modules,
          developmentMode: options?.developmentMode ?? 'single',
          previewDifficulty: options?.previewDifficulty ?? 'all',
        }),
      })

      if (res.ok) {
        const data = await res.json()
        toast.success(`Curriculum saved — ${data.moduleCount} modules, ${data.lessonCount} lessons`)
        const ordered = normalizeVariantLinks(data.variants)
        if (ordered.length > 0) {
          setSavedVariants(ordered)
          toast.success(`Adaptive variants ready: ${ordered.map((v) => v.difficulty).join(', ')}`)
        } else {
          setSavedVariants([])
        }
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
                <Link href="/tutor/my-page?tab=drafts">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">
                  {loading ? 'Loading...' : (course?.name ?? 'Course Builder 2.0')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  <Link href="/tutor/my-page?tab=drafts" className="hover:text-blue-600 hover:underline">
                    ← Back to Work in Progress
                  </Link>
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

              <Button
                variant="default"
                className="gap-2"
                onClick={() => courseBuilderRef.current?.save()}
                disabled={saving}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Course
              </Button>
              {course && (
                <>
                  <PublishStatusBadge isPublished={course.isPublished} />
                  <Button variant="outline" asChild>
                    <Link href={`/tutor/courses/${courseId}`}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width for 3-Column Layout */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {savedVariants.length > 0 && (
          <Card className="mb-4 border-emerald-200 bg-emerald-50/40">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm">Adaptive Variant Join Links</CardTitle>
              <CardDescription>
                Share the correct link with students for each difficulty level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pb-4">
              {savedVariants.map((variant) => (
                <div key={variant.batchId} className="rounded-md border bg-white p-2.5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-medium capitalize">{variant.difficulty}</p>
                      <p className="truncate text-[11px] text-muted-foreground">{variant.batchName}</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(variant.joinLink)
                          toast.success(`${variant.difficulty} join link copied`)
                        } catch {
                          toast.error('Failed to copy link')
                        }
                      }}
                    >
                      Copy Link
                    </Button>
                  </div>
                  <p className="mt-1 break-all text-[11px] text-muted-foreground">{variant.joinLink}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <CourseBuilder
            ref={courseBuilderRef}
            courseId={courseId}
            courseName={course?.name}
            initialModules={loadedModules ?? undefined}
            onSave={handleSave}
          />
        )}

        {/* Course Pitch Section - Now at the BOTTOM */}
        {courseId && <CoursePitchSection courseId={courseId} />}
      </div>
    </div>
  )
}
