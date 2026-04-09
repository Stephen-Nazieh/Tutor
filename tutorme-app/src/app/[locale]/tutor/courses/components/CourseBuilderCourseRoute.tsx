/**
 * Per-course builder UI for `/tutor/courses/[id]/builder` only.
 * Structural changes here do not affect Insights or Lesson Bank routes.
 */

'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BookOpen, Loader2, Save, ChevronRight, Plus, Trash2 } from 'lucide-react'
import { CourseBuilder } from '../../dashboard/components/CourseBuilder'
import { toast } from 'sonner'
import { DASHBOARD_THEMES } from '@/components/dashboard-theme'

interface Course {
  id: string
  name: string
  subject?: string | null
  gradeLevel?: string | null
}

export function CourseBuilderCourseRoute({ courseId }: { courseId: string | null }) {
  const [courses, setCourses] = useState<Course[]>([])
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)
  const [courseName, setCourseName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [loadedModules, setLoadedModules] = useState<any[] | null>(null)
  const [themeId, setThemeId] = useState('current')
  const [savedVariants, setSavedVariants] = useState<any[]>([])
  const courseBuilderRef = useRef<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCourseName, setNewCourseName] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Fetch all tutor courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/tutor/courses', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          const coursesList = data.courses || []
          setCourses(coursesList)

          // If courseId is provided, find and set the current course
          if (courseId) {
            const current = coursesList.find((c: Course) => c.id === courseId)
            if (current) {
              setCurrentCourse(current)
              setCourseName(current.name)
            }
          } else if (coursesList.length > 0) {
            // Default to first course if no courseId
            setCurrentCourse(coursesList[0])
            setCourseName(coursesList[0].name)
          }
        }
      } catch (error) {
        toast.error('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [courseId])

  // Fetch course curriculum when course changes
  useEffect(() => {
    if (!currentCourse?.id) return

    const fetchCurriculum = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/tutor/courses/${currentCourse.id}/curriculum`, {
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          setLoadedModules(data.modules || [])
        }
      } catch (error) {
        toast.error('Failed to load curriculum')
      } finally {
        setLoading(false)
      }
    }

    fetchCurriculum()
  }, [currentCourse?.id])

  const handleCourseSelect = useCallback(
    (selectedCourseId: string) => {
      const selected = courses.find(c => c.id === selectedCourseId)
      if (selected) {
        setCurrentCourse(selected)
        setCourseName(selected.name)
        // Update URL without full page reload
        window.history.replaceState({}, '', `/tutor/courses/${selected.id}/builder`)
      }
    },
    [courses]
  )

  const handleCourseNameChange = useCallback(
    async (newName: string) => {
      setCourseName(newName)
      if (currentCourse && newName.trim() && newName !== currentCourse.name) {
        try {
          const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
          const csrfData = await csrfRes.json().catch(() => ({}))
          const csrfToken = csrfData?.token ?? null

          const res = await fetch(`/api/tutor/courses/${currentCourse.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
            },
            credentials: 'include',
            body: JSON.stringify({ name: newName.trim() }),
          })

          if (res.ok) {
            setCurrentCourse(prev => (prev ? { ...prev, name: newName.trim() } : null))
            setCourses(prev =>
              prev.map(c => (c.id === currentCourse.id ? { ...c, name: newName.trim() } : c))
            )
          }
        } catch {
          // Silent fail - name will be saved when user clicks Save Course
        }
      }
    },
    [currentCourse]
  )

  const handleCreateNewCourse = useCallback(async () => {
    if (!newCourseName.trim()) {
      toast.error('Please enter a course name')
      return
    }

    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/tutor/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: newCourseName.trim(),
          subject: 'general',
          categories: [],
          schedule: [],
          isLiveOnline: false,
        }),
      })

      const data = await res.json()
      if (res.ok && data.course) {
        const newCourse = data.course
        setCourses(prev => [...prev, newCourse])
        setCurrentCourse(newCourse)
        setCourseName(newCourse.name)
        setLoadedModules([])
        setNewCourseName('')
        setIsCreateDialogOpen(false)
        toast.success(`Created course "${newCourse.name}"`)
        // Navigate to the new course builder
        window.history.replaceState({}, '', `/tutor/courses/${newCourse.id}/builder`)
      } else {
        toast.error(data.error || 'Failed to create course')
      }
    } catch {
      toast.error('Failed to create course')
    }
  }, [newCourseName])

  const handleDeleteCourse = useCallback(async () => {
    if (!currentCourse) return
    if (courses.length <= 1) {
      toast.error('Cannot delete the last course')
      setIsDeleteDialogOpen(false)
      return
    }

    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${currentCourse.id}`, {
        method: 'DELETE',
        headers: {
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
      })

      if (res.ok) {
        const remainingCourses = courses.filter(c => c.id !== currentCourse.id)
        setCourses(remainingCourses)
        setCurrentCourse(remainingCourses[0])
        setCourseName(remainingCourses[0].name)
        setIsDeleteDialogOpen(false)
        toast.success('Course deleted')
        // Navigate to another course
        window.history.replaceState({}, '', `/tutor/courses/${remainingCourses[0].id}/builder`)
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || 'Failed to delete course')
      }
    } catch {
      toast.error('Failed to delete course')
    }
  }, [currentCourse, courses])

  const handleSave = useCallback(
    async (modules: any[], options?: any) => {
      if (!currentCourse?.id) return
      if (!options?.isAutoSave) setSaving(true)
      try {
        const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
        const csrfData = await csrfRes.json().catch(() => ({}))
        const csrfToken = csrfData?.token ?? null

        const res = await fetch(`/api/tutor/courses/${currentCourse.id}/curriculum`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
          },
          credentials: 'include',
          body: JSON.stringify({ modules }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          if (!options?.isAutoSave) toast.error(data.error || 'Failed to save curriculum')
        } else {
          if (!options?.isAutoSave) toast.success('Course saved successfully')
        }
      } catch {
        if (!options?.isAutoSave) toast.error('Failed to save course')
      } finally {
        if (!options?.isAutoSave) setSaving(false)
      }
    },
    [currentCourse?.id]
  )

  const router = useRouter()
  const pathname = usePathname()

  // Extract locale from pathname (e.g., /en/tutor/courses/123 -> en)
  const locale = pathname?.split('/')[1] || 'en'

  const selectedTheme = DASHBOARD_THEMES.find(t => t.id === themeId) ?? DASHBOARD_THEMES[0]
  const themeStyle = selectedTheme.tokens
    ? {
        ['--dashboard-bg' as string]: selectedTheme.tokens.background,
        ['--dashboard-panel' as string]: selectedTheme.tokens.panel,
        ['--dashboard-accent' as string]: selectedTheme.tokens.accent,
      }
    : {}

  // Auto-create a course if none exists
  const [isAutoCreating, setIsAutoCreating] = useState(false)
  const [autoCreateError, setAutoCreateError] = useState<string | null>(null)

  useEffect(() => {
    if (!currentCourse && !loading && !isAutoCreating && courses.length === 0 && !autoCreateError) {
      setIsAutoCreating(true)
      const createCourse = async () => {
        try {
          console.log('[CourseBuilder] Auto-creating course...')
          const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
          const csrfData = await csrfRes.json().catch(() => ({}))
          const csrfToken = csrfData?.token ?? null

          const res = await fetch('/api/tutor/courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
            },
            credentials: 'include',
            body: JSON.stringify({
              title: 'Untitled Course',
              description: undefined,
              subject: 'general',
              categories: [],
              schedule: [],
              isLiveOnline: false,
            }),
          })

          const data = await res.json().catch(() => ({}))
          console.log('[CourseBuilder] Create course response:', { ok: res.ok, data })

          if (res.ok && data.course?.id) {
            toast.success('Created new course!')
            // Add the new course to the list and set it as current
            const newCourse = {
              id: data.course.id,
              name: data.course.name,
              subject: data.course.subject,
              gradeLevel: data.course.gradeLevel,
            }
            setCourses([newCourse])
            setCurrentCourse(newCourse)
            setCourseName(newCourse.name)
            // Update URL
            window.history.replaceState({}, '', `/tutor/courses/${newCourse.id}/builder`)
          } else {
            const errorMsg = data.error || `Failed to create course (status: ${res.status})`
            console.error('[CourseBuilder] Create course failed:', errorMsg)
            setAutoCreateError(errorMsg)
            toast.error(errorMsg)
          }
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Failed to create course'
          console.error('[CourseBuilder] Create course error:', err)
          setAutoCreateError(errorMsg)
          toast.error(errorMsg)
        } finally {
          setIsAutoCreating(false)
        }
      }
      void createCourse()
    }
  }, [currentCourse, loading, isAutoCreating, courses.length, autoCreateError])

  if (!currentCourse && !loading) {
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
              {isAutoCreating
                ? 'Creating your course...'
                : autoCreateError
                  ? 'Failed to create course automatically'
                  : 'Getting course builder ready...'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAutoCreating ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : autoCreateError ? (
              <div className="space-y-3">
                <p className="text-sm text-red-600">{autoCreateError}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setAutoCreateError(null)
                      setIsAutoCreating(false)
                    }}
                    className="flex-1"
                  >
                    Try Again
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/tutor/dashboard')}>
                    Go Back
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="flex h-screen w-full flex-col items-stretch overflow-hidden bg-[#fafafc] text-foreground"
      data-tutor-route="course-builder"
      style={themeStyle}
    >
      {/* Top Navigation Bar with Course Controls */}
      <div className="sticky top-0 z-10 w-full border-b border-border bg-card">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-2 sm:px-6">
          {/* Course Selector and Name Editor */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/tutor/dashboard')}
              title="Back to Dashboard"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <BookOpen className="h-5 w-5 text-blue-500" />
            <Select value={currentCourse?.id} onValueChange={handleCourseSelect}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={courseName}
              onChange={e => {
                setCourseName(e.target.value)
                handleCourseNameChange(e.target.value)
              }}
              className="w-[250px] text-center font-semibold"
              placeholder="Course name"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCreateDialogOpen(true)}
              title="Create new course"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              title="Delete current course"
              disabled={courses.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex shrink-0 items-center gap-3">
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
            {currentCourse?.id ? (
              <Button variant="outline" className="gap-2" asChild>
                <Link href={`/${locale}/tutor/courses/${currentCourse.id}`}>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col overflow-y-auto px-6 pb-6 pt-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2">
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground">
          Course Builder
        </h1>

        {loading ? (
          <div className="flex flex-1 items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <CourseBuilder
            ref={courseBuilderRef}
            courseId={currentCourse?.id ?? ''}
            courseName={courseName}
            initialModules={loadedModules ?? undefined}
            onSave={handleSave}
            hideCourseNameInTabs
          />
        )}
      </div>

      {/* Create New Course Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>Enter a name for your new course.</DialogDescription>
          </DialogHeader>
          <Input
            value={newCourseName}
            onChange={e => setNewCourseName(e.target.value)}
            placeholder="Course name"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleCreateNewCourse()
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNewCourse}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{courseName}&quot;? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
