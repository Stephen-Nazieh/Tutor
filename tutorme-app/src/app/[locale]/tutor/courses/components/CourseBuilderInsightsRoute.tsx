/**
 * Insights-only course builder shell — `/tutor/insights`.
 * Standalone insights builder shell — edit this file independently.
 */

'use client'

import { Suspense, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Loader2, BookOpen, MoreVertical, RefreshCw, Plus, Timer, LayoutTemplate } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CourseBuilder } from '../../dashboard/components/CourseBuilder'
import { toast } from 'sonner'
import type { CourseBuilderInsightsProps } from './course-builder-types'
import {
  useCourseBuilderContentModel,
  type UseCourseBuilderContentArgs,
} from './use-course-builder-content-model'

type Props = UseCourseBuilderContentArgs & {
  insightsProps: CourseBuilderInsightsProps
  sessionCategory?: string | null
  sessionNationality?: string | null
  onSaveCourse?: (lessons: any[], options?: any) => void
  onSyncToLiveSession?: () => void
  onCreateCourse?: () => void
  onDeleteCourse?: () => void
  isCreateDialogOpen?: boolean
  setIsCreateDialogOpen?: (v: boolean) => void
  newCourseName?: string
  setNewCourseName?: (v: string) => void
  onCreateNewCourse?: () => void
  isDeleteDialogOpen?: boolean
  setIsDeleteDialogOpen?: (v: boolean) => void
  onDeleteCourseConfirm?: () => void
  courses?: { id: string; name: string }[]
  draftCourses?: { id: string; name: string }[]
  courseName?: string
  onCourseNameChange?: (name: string) => void
  saveMode?: 'live' | 'draft'
  onSaveModeChange?: (mode: 'live' | 'draft') => void
}

function CourseBuilderInsightsRouteInner({
  courseId,
  insightsProps,
  dataMode = 'default',
  detachedStorageKey,
  detachedCourseName,
  sessionCategory,
  sessionNationality,
  onSaveCourse,
  onSyncToLiveSession,
  onCreateCourse,
  onDeleteCourse,
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  newCourseName,
  setNewCourseName,
  onCreateNewCourse,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDeleteCourseConfirm,
  courses,
  draftCourses,
  courseName,
  onCourseNameChange,
  saveMode,
  onSaveModeChange,
}: Props) {
  const model = useCourseBuilderContentModel({
    courseId,
    insightsProps,
    dataMode,
    detachedStorageKey,
    detachedCourseName,
  })

  const [endingSession, setEndingSession] = useState(false)
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab') as 'live' | 'builder' | 'test-pci' | null
  const [activeMainTab, setActiveMainTab] = useState<'live' | 'builder' | 'test-pci'>(
    tabFromUrl ?? 'builder'
  )
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [leftPanelHidden, setLeftPanelHidden] = useState(false)

  const [now, setNow] = useState(new Date())
  useEffect(() => {
    if (activeMainTab !== 'live') return
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [activeMainTab])

  const currentSession = insightsProps?.sessions?.find(s => s.id === insightsProps?.sessionId)
  const scheduledDateStr = currentSession?.scheduledAt
  const sessionPlannedDurationMinutes = currentSession?.plannedDurationMinutes || 60
  let countdownText = '--:--'
  let isOverdue = false
  if (scheduledDateStr && activeMainTab === 'live') {
    const scheduled = new Date(scheduledDateStr).getTime()
    const endTime = scheduled + sessionPlannedDurationMinutes * 60 * 1000
    const diff = endTime - now.getTime()
    if (diff < 0) {
      isOverdue = true
      const absDiff = Math.abs(diff)
      const minutes = Math.floor(absDiff / 60000)
      const seconds = Math.floor((absDiff % 60000) / 1000)
      countdownText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} over`
    } else {
      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      countdownText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} remaining`
    }
  }

  const handleEndSession = async () => {
    if (!insightsProps.sessionId || endingSession) return
    if (!window.confirm('End this session? This will finalize the recording and analytics.')) {
      return
    }
    setEndingSession(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/classes/${insightsProps.sessionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Failed to end session')
      }

      toast.success('Session ended. Recording saved.')
      model.router.push(`/tutor/sessions/${insightsProps.sessionId}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to end session')
    } finally {
      setEndingSession(false)
    }
  }

  const handlePublishDraft = async () => {
    if (!courseId || courseId === 'insights-draft') return

    // 1. Trigger save to ensure latest data is persisted
    const saveCb = (model.courseBuilderRef.current as any)?.saveAll
    if (typeof saveCb === 'function') saveCb()

    // 2. Get current lessons from the builder ref
    const getLessonsCb = (model.courseBuilderRef.current as any)?.getLessons
    const lessons = typeof getLessonsCb === 'function' ? getLessonsCb() : []

    const courseTitle = courseName || detachedCourseName || 'Untitled Course'

    // 3. Create course in DB
    try {
      let csrfToken: string | null = null
      try {
        const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
        const csrfData = await csrfRes.json().catch(() => ({}))
        csrfToken = csrfData?.token ?? null
      } catch {
        // proceed without CSRF
      }

      const createRes = await fetch('/api/tutor/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: courseTitle,
          categories: [],
          schedule: [],
          isLiveOnline: false,
        }),
      })

      if (!createRes.ok) {
        const err = await createRes.json().catch(() => ({}))
        toast.error(err.error || 'Failed to create course')
        return
      }

      const newCourseData = await createRes.json()
      const newCourseId = newCourseData.courses?.[0]?.id
      if (!newCourseId) {
        toast.error('Course created but ID is missing')
        return
      }

      // 4. Save lessons to the new course
      const saveRes = await fetch(`/api/tutor/courses/${newCourseId}/course`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          lessons,
          developmentMode: 'single',
          previewDifficulty: 'all',
        }),
      })

      if (!saveRes.ok) {
        const err = await saveRes.json().catch(() => ({}))
        toast.error(err.error || 'Failed to save course content')
        return
      }

      toast.success('Course published successfully')
      model.router.push(`/tutor/courses/${newCourseId}`)
    } catch {
      toast.error('Failed to publish course')
    }
  }

  return (
    <div
      className="text-foreground flex h-screen w-full flex-col items-stretch overflow-hidden bg-[#fafafc]"
      data-tutor-route="insights-builder"
      style={model.themeStyle}
    >
      <div className="border-border bg-card sticky top-0 z-10 w-full border-b">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-1 sm:px-6">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" asChild>
            <Link href="/tutor/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setLeftPanelHidden(v => !v)}
            className={cn(
              'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
              leftPanelHidden
                ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                : 'bg-primary text-primary-foreground'
            )}
            title={leftPanelHidden ? 'Show directory' : 'Hide directory'}
          >
            <LayoutTemplate className="h-3.5 w-3.5" />
            Directory
          </button>
          {onSaveModeChange && activeMainTab === 'builder' && (
            <div className="flex items-center rounded-md bg-muted/40 p-px">
              <button
                type="button"
                className={cn(
                  'rounded-sm px-2 py-0.5 text-xs font-medium transition-colors',
                  saveMode === 'live'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => onSaveModeChange('live')}
              >
                Live
              </button>
              <button
                type="button"
                className={cn(
                  'rounded-sm px-2 py-0.5 text-xs font-medium transition-colors',
                  saveMode === 'draft'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => onSaveModeChange('draft')}
              >
                Draft
              </button>
            </div>
          )}
          {activeMainTab === 'test-pci' && saveMode && (
            <span className="bg-primary text-primary-foreground rounded-md px-3 py-1 text-xs font-medium">
              {saveMode === 'live' ? 'Live' : 'Draft'}
            </span>
          )}
          <div className="flex shrink-0 items-center gap-3">
            {activeMainTab === 'live' && (
              <h1 className="text-foreground flex items-center gap-2 text-lg font-bold tracking-tight">
                {model.course?.name && (
                  <span className="text-muted-foreground ml-2 text-sm font-normal">
                    — {model.course.name}
                  </span>
                )}
                {scheduledDateStr && (
                  <span
                    className={cn(
                      'ml-2 flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm transition-colors',
                      isOverdue
                        ? 'border-red-200 bg-red-50 text-red-700'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    )}
                  >
                    <Timer className="h-3.5 w-3.5" />
                    <span>{countdownText}</span>
                  </span>
                )}
              </h1>
            )}
            {(sessionCategory || sessionNationality) && (
              <span className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                {sessionCategory && sessionNationality
                  ? `${sessionCategory} — ${sessionNationality}`
                  : sessionCategory || sessionNationality}
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {activeMainTab !== 'live' && saveMode === 'draft' && insightsProps.onCourseChange && (
              <>
                <BookOpen className="text-muted-foreground h-4 w-4" />
                <Select
                  value={courseId ?? ''}
                  onValueChange={v => insightsProps.onCourseChange?.(v)}
                >
                  <SelectTrigger className="h-8 w-[160px] text-xs">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses && courses.length > 0 && (
                      <SelectItem
                        value="__live-header__"
                        disabled
                        className="text-muted-foreground text-xs font-semibold"
                      >
                        Live Courses
                      </SelectItem>
                    )}
                    {courses?.map(c => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                    {draftCourses && draftCourses.length > 0 && (
                      <SelectItem
                        value="__draft-header__"
                        disabled
                        className="text-muted-foreground text-xs font-semibold"
                      >
                        Draft Courses
                      </SelectItem>
                    )}
                    {draftCourses?.map(c => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            {activeMainTab === 'builder' && saveMode === 'draft' && onCreateCourse && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={onCreateCourse}
                title="New Course"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            {activeMainTab === 'builder' && insightsProps.sessionId && onSyncToLiveSession && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const cb = (model.courseBuilderRef.current as any)?.saveAll
                  if (typeof cb === 'function') cb()
                  const syncCb = (model.courseBuilderRef.current as any)?.syncToLive
                  if (typeof syncCb === 'function') syncCb()
                  onSyncToLiveSession()
                }}
              >
                <RefreshCw className="mr-1 h-3 w-3" />
                Sync
              </Button>
            )}
            {activeMainTab === 'builder' &&
              (onSaveCourse ||
                (onCreateCourse && !insightsProps.sessionId) ||
                (onDeleteCourse && !insightsProps.sessionId && courses && courses.length > 1) ||
                (onCourseNameChange && courseId && courseId !== 'insights-draft')) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onSaveCourse && (
                      <DropdownMenuItem
                        onClick={() => {
                          const cb = (model.courseBuilderRef.current as any)?.saveAll
                          if (typeof cb === 'function') cb()
                          else onSaveCourse([])
                        }}
                      >
                        Save
                      </DropdownMenuItem>
                    )}
                    {onCreateCourse && !insightsProps.sessionId && saveMode === 'draft' && (
                      <DropdownMenuItem onClick={onCreateCourse}>New Course</DropdownMenuItem>
                    )}
                    {onCourseNameChange && courseId && courseId !== 'insights-draft' && (
                      <DropdownMenuItem
                        onClick={() => {
                          setRenameValue(courseName || '')
                          setIsRenameDialogOpen(true)
                        }}
                      >
                        Rename Course
                      </DropdownMenuItem>
                    )}
                    {courseId && courseId !== 'insights-draft' && saveMode === 'draft' && (
                      <DropdownMenuItem onClick={handlePublishDraft}>Publish</DropdownMenuItem>
                    )}
                    {onDeleteCourse &&
                      !insightsProps.sessionId &&
                      saveMode === 'draft' &&
                      ((courses && courses.length > 1) ||
                        (draftCourses && draftCourses.length > 1)) && (
                        <DropdownMenuItem
                          onClick={onDeleteCourse}
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
                        >
                          Delete
                        </DropdownMenuItem>
                      )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
          </div>
        </div>
      </div>

      <div className="[&::-webkit-scrollbar-thumb]:bg-border flex w-full flex-1 flex-col overflow-hidden px-6 pb-6 pt-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2">
        {model.savedVariants.length > 0 && (
          <Card className="mb-8 w-full border border-emerald-200/50 bg-emerald-50/30 shadow-xl backdrop-blur-md">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-foreground text-sm">Adaptive Variant Join Links</CardTitle>
              <CardDescription>
                Share the correct link with students for each difficulty level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pb-4">
              {model.savedVariants.map(variant => (
                <div key={variant.batchId} className="bg-card rounded-md border p-2.5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-medium capitalize">{variant.difficulty}</p>
                      <p className="text-muted-foreground truncate text-[11px]">
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
                  <p className="text-muted-foreground mt-1 break-all text-[11px]">
                    {variant.joinLink}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {model.loading ? (
          <div className="flex flex-1 items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <CourseBuilder
            ref={model.courseBuilderRef}
            courseId={courseId ?? ''}
            courseName={model.course?.name}
            initialLessons={model.loadedLessons ?? undefined}
            onSave={onSaveCourse}
            insightsProps={{
              ...insightsProps,
              onEndSession: insightsProps.sessionId ? handleEndSession : undefined,
              endingSession,
            }}
            onMainTabChange={setActiveMainTab}
            initialMainTab={tabFromUrl ?? 'builder'}
            leftPanelHidden={leftPanelHidden}
            onLeftPanelHiddenChange={setLeftPanelHidden}
          />
        )}
      </div>
      {/* Create Course Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>Enter a name for your new course.</DialogDescription>
          </DialogHeader>
          <Input
            value={newCourseName}
            onChange={e => setNewCourseName?.(e.target.value)}
            placeholder="Course name"
            onKeyDown={e => {
              if (e.key === 'Enter') onCreateNewCourse?.()
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen?.(false)}>
              Cancel
            </Button>
            <Button onClick={onCreateNewCourse}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Course Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Course</DialogTitle>
            <DialogDescription>Enter a new name for this course.</DialogDescription>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={e => setRenameValue(e.target.value)}
            placeholder="Course name"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                onCourseNameChange?.(renameValue)
                setIsRenameDialogOpen(false)
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onCourseNameChange?.(renameValue)
                setIsRenameDialogOpen(false)
              }}
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen?.(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDeleteCourseConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function CourseBuilderInsightsRoute(props: Props) {
  return (
    <Suspense fallback={null}>
      <CourseBuilderInsightsRouteInner {...props} />
    </Suspense>
  )
}
