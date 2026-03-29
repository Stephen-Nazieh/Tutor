/**
 * Per-course builder UI for `/tutor/courses/[id]/builder` only.
 * Structural changes here do not affect Insights or Lesson Bank routes.
 */

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, BookOpen, Loader2, Save, ChevronRight } from 'lucide-react'
import { CourseBuilder } from '../../dashboard/components/CourseBuilder'
import { toast } from 'sonner'
import { DASHBOARD_THEMES } from '@/components/dashboard-theme'
import { useCourseBuilderContentModel } from './use-course-builder-content-model'

export function CourseBuilderCourseRoute({ courseId }: { courseId: string | null }) {
  const model = useCourseBuilderContentModel({
    courseId,
    dataMode: 'default',
  })

  if (model.shouldShowCoursePickerEmpty) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground"
        style={model.themeStyle}
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
              <Link href="/tutor/courses">Open Course Catalogue</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="flex h-screen w-full flex-col items-stretch overflow-hidden bg-[#fafafc] text-foreground"
      data-tutor-route="course-builder"
      style={model.themeStyle}
    >
      <div className="sticky top-0 z-10 w-full border-b border-border bg-card">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-1 sm:px-6">
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                model.router.back()
              } else {
                model.router.push('/tutor/dashboard')
              }
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex shrink-0 items-center gap-3">
            <Select value={model.themeId} onValueChange={model.setThemeId}>
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
              onClick={() => model.courseBuilderRef.current?.save()}
              disabled={model.saving}
            >
              {model.saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Course
            </Button>
            {courseId ? (
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
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col overflow-hidden px-6 pb-6 pt-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2">
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground">
          Course Builder
        </h1>
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
          />
        )}
      </div>
    </div>
  )
}
