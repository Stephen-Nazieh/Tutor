'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Copy, ExternalLink, Edit, DollarSign, LayoutGrid, List } from 'lucide-react'
import { CreateCourseDialog } from '../dashboard/components/CreateCourseDialog'

interface PublicCourse {
  id: string
  name: string
  description?: string | null
  subject: string
  gradeLevel?: string | null
  difficulty?: string | null
}

interface DraftCourse {
  id: string
  name: string
  description?: string | null
  subject: string
  isPublished: boolean
  updatedAt: string
  _count: {
    modules: number
    lessons: number
  }
}

export default function TutorMyPage() {
  const params = useParams<{ locale?: string }>()
  const searchParams = useSearchParams()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const initialTab = searchParams.get('tab') === 'drafts' ? 'drafts' : 'public'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [publishedCourses, setPublishedCourses] = useState<PublicCourse[]>([])
  const [draftCourses, setDraftCourses] = useState<DraftCourse[]>([])
  const [activeTab, setActiveTab] = useState(initialTab)
  const [draftViewMode, setDraftViewMode] = useState<'grid' | 'list'>('list')
  const [showCreateCourseDialog, setShowCreateCourseDialog] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        // Load public profile and published courses
        const res = await fetch('/api/tutor/public-profile', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load public profile')
        const data = await res.json()
        if (!active) return
        setUsername(data?.profile?.username || '')
        setBio(data?.profile?.bio || '')
        setPublishedCourses(Array.isArray(data?.courses) ? data.courses : [])

        // Load all courses to get drafts
        const coursesRes = await fetch('/api/tutor/courses', { credentials: 'include' })
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json()
          const drafts = (coursesData.courses || [])
            .filter((c: DraftCourse) => !c.isPublished)
            .map((c: DraftCourse) => ({
              id: c.id,
              name: c.name,
              description: c.description,
              subject: c.subject,
              isPublished: c.isPublished,
              updatedAt: c.updatedAt,
              _count: c._count || { modules: 0, lessons: 0 }
            }))
          setDraftCourses(drafts)
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load data')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [activeTab])

  const normalizedUsername = useMemo(() => username.trim().replace(/^@+/, ''), [username])
  const publicPath = useMemo(
    () => (normalizedUsername ? `/${locale}/u/${normalizedUsername}` : ''),
    [locale, normalizedUsername]
  )
  const publicHandlePath = useMemo(
    () => (normalizedUsername ? `/@${normalizedUsername}` : ''),
    [normalizedUsername]
  )
  const publicUrl = useMemo(
    () => (typeof window !== 'undefined' && publicPath ? `${window.location.origin}${publicPath}` : publicPath),
    [publicPath]
  )
  const publicHandleUrl = useMemo(
    () =>
      typeof window !== 'undefined' && publicHandlePath
        ? `${window.location.origin}${publicHandlePath}`
        : publicHandlePath,
    [publicHandlePath]
  )

  const save = async () => {
    setSaving(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null
      const res = await fetch('/api/tutor/public-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ username, bio }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'Failed to save profile')
        return
      }
      setUsername(data?.profile?.username || username)
      setBio(data?.profile?.bio || bio)
      toast.success('Public page settings updated')
    } catch {
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header: title + primary actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Page & Courses</h1>
          <p className="text-muted-foreground mt-1">
            Manage your public profile and view your courses.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button onClick={() => setShowCreateCourseDialog(true)}>
            Create New Course
          </Button>
          {publicPath && (
            <Button variant="outline" size="sm" asChild>
              <Link href={publicPath} target="_blank">
                <ExternalLink className="h-4 w-4 mr-1.5" />
                View public page
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Profile Settings - compact block above tabs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Profile Settings</CardTitle>
          <CardDescription>
            Customize how you appear to students on your public page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                placeholder="e.g. jane.math"
                disabled={loading || saving}
              />
              <p className="text-xs text-muted-foreground">Displayed as @{username.replace(/^@+/, '') || 'username'}</p>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                disabled={loading || saving}
                placeholder="Short bio for your public page..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {publicUrl && (
              <div className="flex flex-wrap items-center gap-2 rounded-md border bg-muted/30 p-2.5 text-sm">
                <span className="font-medium shrink-0">Public URL</span>
                <span className="break-all text-muted-foreground flex-1 min-w-0">{publicUrl}</span>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7"
                    onClick={() => {
                      navigator.clipboard.writeText(publicUrl)
                      toast.success('Public URL copied')
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7" asChild>
                    <Link href={publicPath} target="_blank">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
            {publicHandleUrl && (
              <div className="flex flex-wrap items-center gap-2 rounded-md border bg-muted/30 p-2.5 text-sm">
                <span className="font-medium shrink-0">@ Handle</span>
                <span className="break-all text-muted-foreground flex-1 min-w-0">{publicHandleUrl}</span>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7"
                    onClick={() => {
                      navigator.clipboard.writeText(publicHandleUrl)
                      toast.success('@ link copied')
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7" asChild>
                    <Link href={publicHandlePath} target="_blank">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Button onClick={save} disabled={loading || saving} size="sm">
            {saving ? 'Saving...' : 'Save Public Page'}
          </Button>
        </CardContent>
      </Card>

      {/* Tabs for Published Courses and Work in Progress */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="public">
            Published Courses
            {publishedCourses.length > 0 && (
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                {publishedCourses.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Work in Progress
            {draftCourses.length > 0 && (
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                {draftCourses.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Published Courses ({publishedCourses.length})</CardTitle>
                  <CardDescription>These courses are visible on your public page.</CardDescription>
                </div>
                <Button onClick={() => setShowCreateCourseDialog(true)} className="w-fit">
                  Create New Course
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {publishedCourses.map((course) => (
                <div key={course.id} className="rounded border p-3">
                  <div className="font-medium">{course.name}</div>
                  <div className="text-sm text-muted-foreground">{course.description || 'No description'}</div>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary">{course.subject}</Badge>
                    {course.gradeLevel ? <Badge variant="outline">{course.gradeLevel}</Badge> : null}
                    {course.difficulty ? <Badge variant="outline">{course.difficulty}</Badge> : null}
                  </div>
                </div>
              ))}
              {publishedCourses.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No published courses yet. Go to "Work in Progress" to publish your courses.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Work in Progress</CardTitle>
                  <CardDescription>
                    Courses you&apos;re building that aren&apos;t published yet.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md p-1 bg-muted/50">
                    <Button
                      variant={draftViewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="sm"
                      className="h-7 px-2"
                      onClick={() => setDraftViewMode('grid')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={draftViewMode === 'list' ? 'secondary' : 'ghost'}
                      size="sm"
                      className="h-7 px-2"
                      onClick={() => setDraftViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button asChild>
                    <Link href="/tutor/curriculum">+ New Course</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {draftCourses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No courses in progress. Start building your first course!
                  </p>
                  <Button onClick={() => setShowCreateCourseDialog(true)}>
                    Create New Course
                  </Button>
                </div>
              ) : draftViewMode === 'list' ? (
                <div className="space-y-3">
                  {draftCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between rounded border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{course.name}</span>
                          <Badge variant="secondary">{course.subject}</Badge>
                          <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                            Draft
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.description || 'No description'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {course._count.modules} modules • {course._count.lessons} lessons • Last edited {formatDate(course.updatedAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" asChild>
                          <Link href={`/tutor/courses/${course.id}/builder`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit & Publish
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/tutor/courses/${course.id}`}>
                            <DollarSign className="h-4 w-4 mr-1" />
                            Price & Schedule
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {draftCourses.map((course) => (
                    <div
                      key={course.id}
                      className="rounded border p-4 hover:bg-muted/50 transition-colors flex flex-col"
                    >
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-medium truncate">{course.name}</span>
                          <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 shrink-0">
                            Draft
                          </Badge>
                        </div>
                        <Badge variant="secondary" className="mb-2">{course.subject}</Badge>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description || 'No description'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-3">
                          {course._count.modules} modules • {course._count.lessons} lessons
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last edited {formatDate(course.updatedAt)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 mt-4 pt-3 border-t">
                        <Button size="sm" asChild className="w-full">
                          <Link href={`/tutor/courses/${course.id}/builder`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit & Publish
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild className="w-full">
                          <Link href={`/tutor/courses/${course.id}`}>
                            <DollarSign className="h-4 w-4 mr-1" />
                            Price & Schedule
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Course Dialog */}
      <CreateCourseDialog
        open={showCreateCourseDialog}
        onOpenChange={setShowCreateCourseDialog}
        onCourseCreated={() => {
          // Refresh the draft courses list
          fetch('/api/tutor/courses', { credentials: 'include' })
            .then(res => res.ok ? res.json() : { courses: [] })
            .then(data => {
              const drafts = (data.courses || []).filter((c: DraftCourse) => !c.isPublished)
              setDraftCourses(drafts)
            })
            .catch(() => {})
        }}
      />
    </div>
  )
}
