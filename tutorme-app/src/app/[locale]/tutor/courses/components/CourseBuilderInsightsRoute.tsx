/**
 * Insights-only course builder shell — `/tutor/insights`.
 * Does not share JSX with CourseBuilderCourseRoute; edit this file without touching the per-course builder layout.
 */

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { CourseBuilder } from '../../dashboard/components/CourseBuilder'
import { toast } from 'sonner'
import type { CourseBuilderInsightsProps } from './course-builder-types'
import {
  useCourseBuilderContentModel,
  type UseCourseBuilderContentArgs,
} from './use-course-builder-content-model'

type Props = UseCourseBuilderContentArgs & {
  insightsProps: CourseBuilderInsightsProps
}

export function CourseBuilderInsightsRoute({
  courseId,
  insightsProps,
  dataMode = 'default',
  detachedStorageKey,
  detachedCourseName,
}: Props) {
  const model = useCourseBuilderContentModel({
    courseId,
    insightsProps,
    dataMode,
    detachedStorageKey,
    detachedCourseName,
  })

  const [isBuilderVisible, setIsBuilderVisible] = useState(false)
  const [endingSession, setEndingSession] = useState(false)

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
      model.router.push('/tutor/classes')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to end session')
    } finally {
      setEndingSession(false)
    }
  }

  return (
    <div
      className="flex h-screen w-full flex-col items-stretch overflow-hidden bg-[#fafafc] text-foreground"
      data-tutor-route="insights-builder"
      style={model.themeStyle}
    >
      <div className="sticky top-0 z-10 w-full border-b border-border bg-card">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-1 sm:px-6">
          <Button variant="ghost" size="sm" className="shrink-0" asChild>
            <Link href="/tutor/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex shrink-0 items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight text-foreground">Live Session</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBuilderVisible(!isBuilderVisible)}
              className="gap-2"
            >
              {isBuilderVisible ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Hide Builder
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show Builder
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col overflow-hidden px-6 pb-6 pt-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2">
        {model.savedVariants.length > 0 && (
          <Card className="mb-8 w-full border border-emerald-200/50 bg-emerald-50/30 shadow-xl backdrop-blur-md">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm text-foreground">Adaptive Variant Join Links</CardTitle>
              <CardDescription>
                Share the correct link with students for each difficulty level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pb-4">
              {model.savedVariants.map(variant => (
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

        {model.loading ? (
          <div className="flex flex-1 items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <CourseBuilder
            ref={model.courseBuilderRef}
            courseId={courseId ?? ''}
            courseName={model.course?.name}
            initialModules={model.loadedModules ?? undefined}
            onSave={model.handleSave}
            insightsProps={insightsProps}
            isCollapsed={!isBuilderVisible}
          />
        )}
      </div>
    </div>
  )
}
