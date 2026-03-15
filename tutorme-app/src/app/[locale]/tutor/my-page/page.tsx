'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Copy, ExternalLink, Edit, DollarSign, LayoutGrid, List, Search, Filter, BookOpen, Clock, ChevronRight, GraduationCap, ArrowLeft, Sparkles, MessageSquare } from 'lucide-react'
import { AIChat } from '@/components/ai/AIChat'

interface PublicCourse {
  id: string
  name: string
  description?: string | null
  subject: string
  gradeLevel?: string | null
  difficulty?: string | null
  publishedAt?: string
  sessions?: number
  tasks?: number
  assessments?: number
  avgScore?: number
  completionRate?: number
}

interface DraftCourse {
  id: string
  name: string
  description?: string | null
  subject: string
  isPublished: boolean
  updatedAt: string
  type: 'course' | 'class'
  _count: {
    modules: number
    lessons: number
  }
}

interface ClassItem {
  id: string
  title: string
  subject: string
  scheduledAt: string
  duration: number
  status: 'scheduled' | 'live' | 'completed'
}

export default function TutorMyPage() {
  const params = useParams<{ locale?: string }>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const initialTab = searchParams.get('tab') || 'courses'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [publishedCourses, setPublishedCourses] = useState<PublicCourse[]>([])
  const [buildingItems, setBuildingItems] = useState<DraftCourse[]>([])
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [completedItems, setCompletedItems] = useState<PublicCourse[]>([])
  const [activeTab, setActiveTab] = useState(initialTab)
  const [draftViewMode, setDraftViewMode] = useState<'grid' | 'list'>('list')
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [chatQuery, setChatQuery] = useState('')

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
        
        // Published courses (active)
        const published = (data?.courses || []).map((c: any) => ({
          ...c,
          publishedAt: c.updatedAt,
          sessions: Math.floor(Math.random() * 20) + 5,
          tasks: Math.floor(Math.random() * 50) + 10,
          assessments: Math.floor(Math.random() * 10) + 2,
          avgScore: Math.floor(Math.random() * 30) + 70,
          completionRate: Math.floor(Math.random() * 40) + 60,
        }))
        setPublishedCourses(published)

        // Load all courses for building tab
        const coursesRes = await fetch('/api/tutor/courses', { credentials: 'include' })
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json()
          const drafts = (coursesData.courses || [])
            .filter((c: any) => !c.isPublished)
            .map((c: any) => ({
              id: c.id,
              name: c.name,
              description: c.description,
              subject: c.subject,
              isPublished: c.isPublished,
              updatedAt: c.updatedAt,
              type: 'course' as const,
              _count: c._count || { modules: 0, lessons: 0 }
            }))
            .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          setBuildingItems(drafts)
        }

        // Load classes
        const classesRes = await fetch('/api/tutor/classes', { credentials: 'include' })
        if (classesRes.ok) {
          const classesData = await classesRes.json()
          setClasses((classesData.classes || []).map((c: any) => ({
            id: c.id,
            title: c.title,
            subject: c.subject,
            scheduledAt: c.scheduledAt,
            duration: c.duration,
            status: c.status
          })))
        }

        // Completed courses (mock for now)
        setCompletedItems(published.slice().reverse())
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
  const publicUrl = useMemo(
    () => (typeof window !== 'undefined' && publicPath ? `${window.location.origin}${publicPath}` : publicPath),
    [publicPath]
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

  const selectedCourse = useMemo(() => {
    if (!selectedCourseId) return null
    return publishedCourses.find(c => c.id === selectedCourseId) || null
  }, [selectedCourseId, publishedCourses])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button Header */}
      <div className="bg-white border-b px-4 py-3">
        <Button variant="ghost" onClick={() => router.push('/tutor/dashboard')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header: title + primary actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Page</h1>
            <p className="text-muted-foreground mt-1">
              Manage your public profile and view your courses.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button onClick={() => router.push('/tutor/courses/new')}>
              Create Course
            </Button>
            {publicPath && normalizedUsername && (
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
            </div>
            <Button onClick={save} disabled={loading || saving} size="sm">
              {saving ? 'Saving...' : 'Save Public Page'}
            </Button>
          </CardContent>
        </Card>

        {/* Tabs for Published Courses and Work in Progress */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="courses">
              Courses
              {publishedCourses.length > 0 && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                  {publishedCourses.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="classes">
              Classes
              {classes.length > 0 && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                  {classes.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="building">
              Building
              {buildingItems.length > 0 && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                  {buildingItems.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              {completedItems.length > 0 && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                  {completedItems.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Courses ({publishedCourses.length})</CardTitle>
                    <CardDescription>Published and active courses visible on your public page.</CardDescription>
                  </div>
                  <Button onClick={() => router.push('/tutor/courses/new')} className="w-fit">
                    Create Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {publishedCourses.map((course) => (
                  <div 
                    key={course.id} 
                    className={`rounded border p-3 cursor-pointer transition-colors ${selectedCourseId === course.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedCourseId(course.id === selectedCourseId ? null : course.id)}
                  >
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground">{course.description || 'No description'}</div>
                    <div className="mt-2 flex gap-2">
                      <Badge variant="secondary">{course.subject}</Badge>
                      {course.gradeLevel ? <Badge variant="outline">{course.gradeLevel}</Badge> : null}
                    </div>
                  </div>
                ))}
                {publishedCourses.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No published courses yet.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Analytics Section for Selected Course */}
            {selectedCourse && (
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    Analytics: {selectedCourse.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Date Published</p>
                      <p className="font-medium">{formatDate(selectedCourse.publishedAt || '')}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">No. of Sessions</p>
                      <p className="font-medium">{selectedCourse.sessions}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Task Completion Rate</p>
                      <p className="font-medium">{selectedCourse.completionRate}%</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Number of Tasks</p>
                      <p className="font-medium">{selectedCourse.tasks}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Number of Assessments</p>
                      <p className="font-medium">{selectedCourse.assessments}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Avg Score on Assessments</p>
                      <p className="font-medium">{selectedCourse.avgScore}%</p>
                    </div>
                  </div>

                  {/* AI Chat Area */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Ask AI about this course or students
                    </p>
                    <AIChat 
                      context={`Course: ${selectedCourse.name}. Subject: ${selectedCourse.subject}.`}
                      placeholder="Ask about student performance, course insights, or recommendations..."
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Classes ({classes.length})</CardTitle>
                <CardDescription>Scheduled individual classes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {classes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No scheduled classes yet.
                  </p>
                ) : (
                  classes.map((cls) => (
                    <div key={cls.id} className="rounded border p-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{cls.title}</div>
                        <Badge variant={cls.status === 'live' ? 'destructive' : 'secondary'}>
                          {cls.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{cls.subject}</div>
                      <div className="mt-2 text-xs text-gray-500">
                        {formatDate(cls.scheduledAt)} • {cls.duration} min
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="building" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Building</CardTitle>
                    <CardDescription>
                      Courses and classes being developed (most recent first).
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
                      <Link href="/tutor/courses/new">+ New</Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {buildingItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No items in progress. Start building!
                    </p>
                    <Button onClick={() => router.push('/tutor/courses/new')}>
                      Create New
                    </Button>
                  </div>
                ) : draftViewMode === 'list' ? (
                  <div className="space-y-3">
                    {buildingItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded border p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">{item.name}</span>
                            <Badge variant="secondary">{item.subject}</Badge>
                            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                              {item.type === 'course' ? 'Draft' : 'Planning'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description || 'No description'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {item._count.modules} modules • {item._count.lessons} lessons • Last edited {formatDate(item.updatedAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" asChild>
                            <Link href={`/tutor/courses/${item.id}/builder`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/tutor/courses/${item.id}`}>
                              <DollarSign className="h-4 w-4 mr-1" />
                              Price
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {buildingItems.map((item) => (
                      <div
                        key={item.id}
                        className="rounded border p-4 hover:bg-muted/50 transition-colors flex flex-col"
                      >
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="font-medium truncate">{item.name}</span>
                            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 shrink-0">
                              {item.type === 'course' ? 'Draft' : 'Planning'}
                            </Badge>
                          </div>
                          <Badge variant="secondary" className="mb-2">{item.subject}</Badge>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description || 'No description'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-3">
                            {item._count.modules} modules • {item._count.lessons} lessons
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last edited {formatDate(item.updatedAt)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 mt-4 pt-3 border-t">
                          <Button size="sm" asChild className="w-full">
                            <Link href={`/tutor/courses/${item.id}/builder`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild className="w-full">
                            <Link href={`/tutor/courses/${item.id}`}>
                              <DollarSign className="h-4 w-4 mr-1" />
                              Price
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

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed</CardTitle>
                <CardDescription>Courses and classes that have closed (most recent first).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {completedItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No completed courses yet.
                  </p>
                ) : (
                  completedItems.map((item) => (
                    <div key={item.id} className="rounded border p-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{item.name}</div>
                        <Badge variant="outline">Closed</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.subject}</div>
                      <div className="mt-2 text-xs text-gray-500">
                        Published: {formatDate(item.publishedAt || '')}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
