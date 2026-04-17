/**
 * Insights-only course builder shell — `/tutor/insights`.
 * Does not share JSX with CourseBuilderCourseRoute; edit this file without touching the per-course builder layout.
 */

'use client'

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
import { ArrowLeft, Loader2, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { DASHBOARD_THEMES } from '@/components/dashboard-theme'
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
  courseName?: string
  onCourseNameChange?: (name: string) => void
}

export function CourseBuilderInsightsRoute({
  courseId,
  insightsProps,
  dataMode = 'default',
  detachedStorageKey,
  detachedCourseName,
  sessionCategory,
  sessionNationality,
  onSaveCourse,
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
  courseName,
  onCourseNameChange,
}: Props) {
  const model = useCourseBuilderContentModel({
    courseId,
    insightsProps,
    dataMode,
    detachedStorageKey,
    detachedCourseName,
  })

  const [endingSession, setEndingSession] = useState(false)
  const [themeId, setThemeId] = useState('current')

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

  return (
    <div
      className="text-foreground flex h-screen w-full flex-col items-stretch overflow-hidden bg-[#fafafc]"
      data-tutor-route="insights-builder"
      style={model.themeStyle}
    >
      <div className="border-border bg-card sticky top-0 z-10 w-full border-b">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-1 sm:px-6">
          <Button variant="ghost" size="sm" className="shrink-0" asChild>
            <Link href="/tutor/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex shrink-0 items-center gap-3">
            <h1 className="text-foreground text-lg font-bold tracking-tight">
              Live Session
              {model.course?.name && (
                <span className="text-muted-foreground ml-2 text-sm font-normal">
                  — {model.course.name}
                </span>
              )}
            </h1>
            {(sessionCategory || sessionNationality) && (
              <span className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                {sessionCategory && sessionNationality
                  ? `${sessionCategory} — ${sessionNationality}`
                  : sessionCategory || sessionNationality}
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <BookOpen className="text-muted-foreground h-4 w-4" />
            {courses && courses.length > 0 && insightsProps.onCourseChange && (
              <Select
                value={courseId ?? ''}
                onValueChange={v => insightsProps.onCourseChange?.(v)}
              >
                <SelectTrigger className="h-8 w-[160px] text-xs">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {onCourseNameChange && (
              <Input
                value={courseName || ''}
                onChange={e => onCourseNameChange(e.target.value)}
                className="h-8 w-[200px] text-sm font-semibold"
                placeholder="Course name"
              />
            )}
            {courseId && courseId !== 'insights-draft' && (
              <Button size="sm" variant="outline" className="gap-1" asChild>
                <Link href={`/tutor/courses/${courseId}`}>
                  Next
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </Button>
            )}
            <Select value={themeId} onValueChange={setThemeId}>
              <SelectTrigger className="border-border bg-card text-foreground h-8 w-[180px]">
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
            {insightsProps.sessionId && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleEndSession}
                disabled={endingSession}
              >
                {endingSession ? 'Ending…' : 'End Session'}
              </Button>
            )}
            {onSaveCourse && (
              <Button
                size="sm"
                onClick={() => {
                  const cb = (model.courseBuilderRef.current as any)?.saveAll
                  if (typeof cb === 'function') cb()
                  else onSaveCourse([])
                }}
              >
                Save
              </Button>
            )}
            {onCreateCourse && !insightsProps.sessionId && (
              <Button size="sm" variant="outline" onClick={onCreateCourse}>
                New Course
              </Button>
            )}
            {onDeleteCourse && !insightsProps.sessionId && courses && courses.length > 1 && (
              <Button size="sm" variant="outline" onClick={onDeleteCourse}>
                Delete
              </Button>
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
            insightsProps={insightsProps}
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
            onKeyDown={e => { if (e.key === 'Enter') onCreateNewCourse?.() }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen?.(false)}>Cancel</Button>
            <Button onClick={onCreateNewCourse}>Create</Button>
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
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen?.(false)}>Cancel</Button>
            <Button variant="destructive" onClick={onDeleteCourseConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
