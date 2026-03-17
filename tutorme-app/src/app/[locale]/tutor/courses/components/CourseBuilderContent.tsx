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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, BookOpen, Loader2, Save, ChevronRight } from 'lucide-react'
import { CourseBuilder } from '../../dashboard/components/CourseBuilder'
import type { Module as CourseBuilderModule, CourseBuilderRef } from '../../dashboard/components/CourseBuilder'
import { toast } from 'sonner'
import { DASHBOARD_THEMES, getThemeStyle } from '@/components/dashboard-theme'

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
  const [loadedModules, setLoadedModules] = useState<CourseBuilderModule[] | null>(null)
  const [savedVariants, setSavedVariants] = useState<AdaptiveVariantLink[]>([])
  const courseBuilderRef = useRef<CourseBuilderRef>(null)

  // Theme state with localStorage persistence
  const [themeId, setThemeId] = useState('current')
  const selectedTheme = DASHBOARD_THEMES.find((theme) => theme.id === themeId) ?? DASHBOARD_THEMES[0]
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
    try {
      // Load course metadata
      const res = await fetch(`/api/tutor/courses/${courseId}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setCourse(data.course)
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

  if (!courseId) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6" style={themeStyle}>
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
        toast.success('Course Saved')
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
    <div className="min-h-screen bg-background text-foreground" style={themeStyle}>
      {/* Top Navigation Header - Same structure as Lesson Bank */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tutor/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-xl font-semibold flex items-center gap-2 text-foreground">
              <BookOpen className="h-5 w-5" />
              {loading ? 'Loading...' : (course?.name ?? 'Course Builder')}
            </h1>
            <p className="text-sm text-muted-foreground">
              Build your course curriculum with lessons, tasks, and assessments.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Selector */}
            <Select value={themeId} onValueChange={setThemeId}>
              <SelectTrigger className="h-8 w-[180px] border-border bg-card text-foreground">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {DASHBOARD_THEMES.map((theme) => (
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
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Course
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              asChild
            >
              <Link href={`/tutor/courses/${courseId}`}>
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 py-6">
        {savedVariants.length > 0 && (
          <Card className="mb-4 border-emerald-200 bg-emerald-50/40">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm text-foreground">Adaptive Variant Join Links</CardTitle>
              <CardDescription>
                Share the correct link with students for each difficulty level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pb-4">
              {savedVariants.map((variant) => (
                <div key={variant.batchId} className="rounded-md border bg-card p-2.5">
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
      </div>
    </div>
  )
}
