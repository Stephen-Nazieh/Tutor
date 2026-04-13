'use client'

import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BookOpen, RefreshCw, Loader2 } from 'lucide-react'
import { CourseBuilder } from '../../dashboard/components/CourseBuilder'
import type { Lesson as CourseBuilderLesson } from '../../dashboard/components/CourseBuilder'
import type { VisibleDocumentPayload } from '../../dashboard/components/CourseBuilder'
import type { Lesson } from '../../dashboard/components/builder-types'
import { toast } from 'sonner'

interface CourseSummary {
  id: string
  name: string
  subject: string
}

interface CourseStructureLinkPanelProps {
  buttonClassName?: string
  initialCourseId?: string | null
  classSubject?: string
  onMakeVisibleToStudents?: (payload: VisibleDocumentPayload) => void
}

export function CourseStructureLinkPanel({
  buttonClassName,
  initialCourseId,
  classSubject,
  onMakeVisibleToStudents,
}: CourseStructureLinkPanelProps) {
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState<CourseSummary[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState<string>('')
  const [loadingCourses, setLoadingCourses] = useState(false)
  const [loadingBuilder, setLoadingBuilder] = useState(false)
  const [savingBuilder, setSavingBuilder] = useState(false)
  const [lessons, setLessons] = useState<Lesson[] | null>(null)
  const [builderVersion, setBuilderVersion] = useState(0)
  const [panelWidth, setPanelWidth] = useState(720)
  const isResizingRef = useRef(false)

  const selectedCourse = useMemo(
    () => courses.find(course => course.id === selectedCourseId) || null,
    [courses, selectedCourseId]
  )

  const loadCourses = useCallback(async () => {
    setLoadingCourses(true)
    try {
      const res = await fetch('/api/tutor/courses', { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to load courses')
      const data = await res.json()
      const nextCourses = (Array.isArray(data.courses) ? data.courses : []) as CourseSummary[]
      setCourses(nextCourses)

      const preferred =
        initialCourseId && nextCourses.some(course => course.id === initialCourseId)
          ? initialCourseId
          : null
      if (preferred) {
        setSelectedCourseId(preferred)
      } else if (!selectedCourseId && nextCourses.length > 0) {
        setSelectedCourseId(nextCourses[0].id)
      }
    } catch {
      setCourses([])
    } finally {
      setLoadingCourses(false)
    }
  }, [selectedCourseId, initialCourseId])

  const loadBuilderTree = useCallback(async (courseId: string) => {
    if (!courseId) return
    setLoadingBuilder(true)
    try {
      const res = await fetch(`/api/tutor/courses/${courseId}/course`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to load course builder data')
      const data = await res.json()
      setLessons(Array.isArray(data.lessons) ? (data.lessons as Lesson[]) : [])
      setBuilderVersion(prev => prev + 1)
    } catch {
      setLessons([])
      toast.error('Failed to load course content')
    } finally {
      setLoadingBuilder(false)
    }
  }, [])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  useEffect(() => {
    if (!open || !selectedCourseId) return
    loadBuilderTree(selectedCourseId)
  }, [open, selectedCourseId, loadBuilderTree])

  const handleSave = async (
    nextLessons: Lesson[],
    options?: {
      developmentMode: 'single' | 'multi'
      previewDifficulty: 'all' | 'beginner' | 'intermediate' | 'advanced'
    }
  ) => {
    if (!selectedCourseId) return
    setSavingBuilder(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${selectedCourseId}/course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({
          lessons: nextLessons,
          developmentMode: options?.developmentMode ?? 'single',
          previewDifficulty: options?.previewDifficulty ?? 'all',
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data.error ?? 'Failed to save course')
        return
      }

      setLessons(nextLessons)
      toast.success('Course Saved')
    } catch {
      toast.error('Failed to save course')
    } finally {
      setSavingBuilder(false)
    }
  }

  const buttonLabel =
    selectedCourse?.name ?? (classSubject ? `${classSubject} Class` : 'Course Builder')

  useEffect(() => {
    const applyDefaultWidth = () => {
      const viewport = window.innerWidth
      const preferred = Math.round(viewport * 0.48)
      const clamped = Math.max(420, Math.min(Math.max(620, viewport - 280), preferred))
      setPanelWidth(clamped)
    }

    applyDefaultWidth()
    window.addEventListener('resize', applyDefaultWidth)
    return () => window.removeEventListener('resize', applyDefaultWidth)
  }, [])

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!isResizingRef.current) return
      const maxWidth = Math.max(620, window.innerWidth - 240)
      const nextWidth = Math.max(420, Math.min(maxWidth, event.clientX))
      setPanelWidth(nextWidth)
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!isResizingRef.current) return
      const touch = event.touches[0]
      if (!touch) return
      const maxWidth = Math.max(620, window.innerWidth - 240)
      const nextWidth = Math.max(420, Math.min(maxWidth, touch.clientX))
      setPanelWidth(nextWidth)
    }

    const handleUp = () => {
      isResizingRef.current = false
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchend', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchend', handleUp)
    }
  }, [])

  const startResize = () => {
    isResizingRef.current = true
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
  }

  return (
    <>
      <Button variant="outline" size="sm" className={buttonClassName} onClick={() => setOpen(true)}>
        <BookOpen className="mr-2 h-4 w-4" />
        <span className="max-w-[220px] truncate">{buttonLabel}</span>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close course builder panel overlay"
            className="absolute inset-0 bg-black/65"
            onClick={() => setOpen(false)}
          />

          <div
            className="bg-background absolute inset-y-0 left-0 flex h-full border-r shadow-xl"
            style={{ width: `${panelWidth}px` }}
          >
            <button
              type="button"
              aria-label="Resize course builder panel"
              onMouseDown={startResize}
              onTouchStart={startResize}
              className="absolute right-0 top-0 z-20 h-full w-3 cursor-col-resize border-r border-transparent bg-transparent transition-colors hover:border-blue-300"
            />
            <div className="flex h-full min-w-0 flex-1 flex-col">
              <div className="border-b px-6 py-4">
                <div className="text-lg font-semibold">Live Course Builder Panel</div>
                <div className="text-muted-foreground text-sm">
                  This is the same builder as Course Builder page. Changes stay in sync.
                </div>
              </div>

              <div className="flex items-center gap-2 border-b px-6 py-3">
                <div className="w-[360px]">
                  <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={loadingCourses ? 'Loading courses…' : 'Select a course'}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!selectedCourseId || loadingBuilder}
                  onClick={() => loadBuilderTree(selectedCourseId)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {loadingBuilder ? 'Syncing…' : 'Sync'}
                </Button>
                {savingBuilder && <Badge variant="secondary">Saving…</Badge>}
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                {!selectedCourseId ? (
                  <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                    Select a course to open the builder.
                  </div>
                ) : loadingBuilder || lessons === null ? (
                  <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                  </div>
                ) : (
                  <div className="h-full overflow-auto px-4 py-4">
                    <CourseBuilder
                      key={`${selectedCourseId}:${builderVersion}`}
                      courseId={selectedCourseId}
                      courseName={selectedCourse?.name}
                      panelMode="live-class"
                      initialLessons={lessons}
                      onSave={handleSave}
                      onMakeVisibleToStudents={payload => {
                        setOpen(false)
                        onMakeVisibleToStudents?.(payload)
                      }}
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                className="border-border bg-background text-muted-foreground hover:text-foreground absolute right-4 top-4 rounded border px-2 py-1 text-xs"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
