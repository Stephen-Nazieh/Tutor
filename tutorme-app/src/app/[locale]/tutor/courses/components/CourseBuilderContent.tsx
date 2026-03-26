/**
 * Course Builder 2.0 content for a given course.
 * Loads the curriculum tree from the backend on mount;
 * saves back via PUT /api/tutor/courses/[id]/curriculum.
 */

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, BookOpen, Loader2, Save, ChevronRight } from 'lucide-react'
import { CourseBuilder } from '../../dashboard/components/CourseBuilder'
import type {
  Module as CourseBuilderModule,
  CourseBuilderRef,
} from '../../dashboard/components/CourseBuilder'
import { toast } from 'sonner'
import { DASHBOARD_THEMES, getThemeStyle } from '@/components/dashboard-theme'
import type { LiveTask } from '@/lib/socket'

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

interface InsightsSessionOption {
  id: string
  title: string
  subject: string
  scheduledAt: string
  status: string
}

import type { LiveStudent, EngagementMetrics } from '@/types/live-session'

interface CourseBuilderInsightsProps {
  courseId?: string | null
  courses?: Array<{ id: string; name: string }>
  onCourseChange?: (courseId: string) => void
  sessionId: string | null
  sessions: InsightsSessionOption[]
  onSessionChange: (sessionId: string) => void
  liveTasks: LiveTask[]
  onDeployTask: (task: LiveTask) => void
  onSendPoll: (payload: { taskId: string; question: string }) => void
  onSendQuestion: (payload: { taskId: string; prompt: string }) => void
  students?: LiveStudent[]
  metrics?: EngagementMetrics | null
  classDuration?: number
  isRecording?: boolean
  recordingDuration?: number
  onToggleRecording?: () => void
}

export function CourseBuilderContent({
  courseId,
  insightsProps,
  dataMode = 'default',
  detachedStorageKey,
  detachedCourseName,
}: {
  courseId: string | null
  insightsProps?: CourseBuilderInsightsProps
  dataMode?: 'default' | 'detached'
  detachedStorageKey?: string
  detachedCourseName?: string
}) {
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [loadedModules, setLoadedModules] = useState<CourseBuilderModule[] | null>(null)
  const [savedVariants, setSavedVariants] = useState<AdaptiveVariantLink[]>([])
  const courseBuilderRef = useRef<CourseBuilderRef>(null)
  const router = useRouter()

  // Theme state with localStorage persistence
  const [themeId, setThemeId] = useState('current')
  const selectedTheme = DASHBOARD_THEMES.find(theme => theme.id === themeId) ?? DASHBOARD_THEMES[0]
  const themeStyle = getThemeStyle(selectedTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('tutor-dashboard-theme')
    if (savedTheme) {
      setThemeId(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tutor-dashboard-theme', themeId)
  }, [themeId])

  const loadCourse = useCallback(async () => {
    if (!courseId) return
    setLoading(true)
    const isDetached = dataMode === 'detached'
    const storageKey = detachedStorageKey || `insights-course-builder:${courseId}`
    try {
      if (isDetached) {
        setCourse({
          id: courseId,
          name: detachedCourseName || 'Insights Builder',
          studentCount: 0,
          isPublished: false,
        })
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          const parsed = JSON.parse(stored) as { modules?: CourseBuilderModule[] }
          if (Array.isArray(parsed.modules) && parsed.modules.length > 0) {
            setLoadedModules(parsed.modules)
          } else {
            setLoadedModules(null)
          }
        } else {
          setLoadedModules(null)
        }
        return
      }
      // Load course metadata
      const res = await fetch(`/api/tutor/courses/${courseId}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setCourse(data.course)
      }

      // Load curriculum tree from DB
      const currRes = await fetch(`/api/tutor/courses/${courseId}/curriculum`, {
        credentials: 'include',
      })
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
  }, [courseId, dataMode, detachedCourseName, detachedStorageKey])

  useEffect(() => {
    loadCourse()
  }, [loadCourse])

  if (!courseId && dataMode !== 'detached') {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground"
        style={themeStyle}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Builder
            </CardTitle>
            <CardDescription>
              Select a course to edit its curriculum. Open a course from the Course Catalogue or
              from your dashboard to use the builder.
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
      courseName?: string
      courseDescription?: string
    }
  ) => {
    const isDetached = dataMode === 'detached'
    if (isDetached) {
      const storageKey = detachedStorageKey || `insights-course-builder:${courseId ?? 'default'}`
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            modules,
            savedAt: new Date().toISOString(),
            options: {
              developmentMode: options?.developmentMode ?? 'single',
              previewDifficulty: options?.previewDifficulty ?? 'all',
            },
          })
        )
        toast.success('Insights draft saved')
      } catch {
        toast.error('Failed to save Insights draft')
      }
      return
    }
    setSaving(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      let currentCourseId = courseId

      // If it's a draft and we have a name, create the course first
      if (courseId === 'builder-draft' && options?.courseName) {
        const createRes = await fetch('/api/tutor/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
          },
          credentials: 'include',
          body: JSON.stringify({
            title: options.courseName,
            description: options.courseDescription || '',
          }),
        })

        if (!createRes.ok) {
          const err = await createRes.json().catch(() => ({}))
          throw new Error(err.error ?? 'Failed to create course')
        }

        const newCourse = await createRes.json()
        currentCourseId = newCourse.id
        // Update URL to reflect the new course ID without full reload
        router.replace(`/tutor/courses/${currentCourseId}/builder`)
      }

      const res = await fetch(`/api/tutor/courses/${currentCourseId}/curriculum`, {
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
        toast.success('Course Saved')
        const ordered = normalizeVariantLinks(data.variants)
        if (ordered.length > 0) {
          setSavedVariants(ordered)
          toast.success(`Adaptive variants ready: ${ordered.map(v => v.difficulty).join(', ')}`)
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
    <div
      className="flex h-screen w-full flex-col items-stretch overflow-hidden bg-background text-foreground"
      style={themeStyle}
    >
      {/* Top Navigation Header - Course Builder centered at top */}
      <div className="sticky top-0 z-10 w-full border-b border-border bg-card">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                router.back()
              } else {
                router.push('/tutor/dashboard')
              }
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {!insightsProps && (
            <h1 className="pointer-events-none absolute left-0 right-0 flex flex-1 items-center justify-center gap-2 text-xl font-semibold text-foreground">
              <BookOpen className="h-5 w-5" />
              Course Builder
            </h1>
          )}
          <div className="flex shrink-0 items-center gap-3">
            {insightsProps && (
              <div className="flex items-center gap-2">
                {insightsProps.courses && insightsProps.courses.length > 0 && (
                  <Select
                    value={insightsProps.courseId ?? undefined}
                    onValueChange={value => insightsProps.onCourseChange?.(value)}
                  >
                    <SelectTrigger className="h-8 w-[200px] border-border bg-card text-foreground">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {insightsProps.courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Select
                  value={insightsProps.sessionId ?? undefined}
                  onValueChange={insightsProps.onSessionChange}
                >
                  <SelectTrigger className="h-8 w-[220px] border-border bg-card text-foreground">
                    <SelectValue placeholder="Select live session" />
                  </SelectTrigger>
                  <SelectContent>
                    {insightsProps.sessions.map(sessionItem => (
                      <SelectItem key={sessionItem.id} value={sessionItem.id}>
                        {sessionItem.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Theme Selector */}
            <Select value={themeId} onValueChange={setThemeId}>
              <SelectTrigger className="h-8 w-[180px] border-border bg-card text-foreground">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {DASHBOARD_THEMES.map(theme => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="gap-2"
              onClick={() => courseBuilderRef.current?.save()}
              disabled={saving}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Course
            </Button>
            {!insightsProps &&
              (courseId ? (
                <Button variant="outline" className="gap-2" asChild>
                  <Link href={`/tutor/courses/${courseId}`}>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="gap-2"
                  type="button"
                  onClick={() =>
                    toast.error('Course ID not available yet. Please wait a moment and try again.')
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full flex-1 flex-col overflow-hidden px-0 py-0">
        {savedVariants.length > 0 && (
          <Card className="mb-4 w-full border-emerald-200 bg-emerald-50/40">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm text-foreground">Adaptive Variant Join Links</CardTitle>
              <CardDescription>
                Share the correct link with students for each difficulty level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pb-4">
              {savedVariants.map(variant => (
                <div key={variant.batchId} className="rounded-md border bg-card p-2.5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-medium capitalize">{variant.difficulty}</p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {variant.batchName}
                      </p>
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
                  <p className="mt-1 break-all text-[11px] text-muted-foreground">
                    {variant.joinLink}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex flex-1 items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <CourseBuilder
            ref={courseBuilderRef}
            courseId={courseId ?? ''}
            courseName={course?.name}
            initialModules={loadedModules ?? undefined}
            onSave={handleSave}
            insightsProps={insightsProps}
          />
        )}
      </div>
    </div>
  )
}
