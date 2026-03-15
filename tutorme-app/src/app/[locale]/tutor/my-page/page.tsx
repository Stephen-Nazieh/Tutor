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
import { Copy, ExternalLink, Edit, DollarSign, LayoutGrid, List, Search, Filter, BookOpen, Clock, ChevronRight, GraduationCap, ArrowLeft, Sparkles, MessageSquare, Pencil, Play } from 'lucide-react'
import { AIChat } from '@/components/ai/AIChat'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'

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
  isPublished: boolean
  updatedAt: string
  _count?: {
    lessons: number
    enrollments?: number
  }
  price?: number | null
  currency?: string | null
  estimatedHours?: number
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
  const [allCourses, setAllCourses] = useState<PublicCourse[]>([])
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [completedItems, setCompletedItems] = useState<PublicCourse[]>([])
  const [activeTab, setActiveTab] = useState(initialTab)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceEdits, setPriceEdits] = useState<Record<string, string>>({})
  const [priceSaving, setPriceSaving] = useState<Record<string, boolean>>({})
  const [deleteBusy, setDeleteBusy] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        // Load public profile
        const res = await fetch('/api/tutor/public-profile', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load public profile')
        const data = await res.json()
        if (!active) return
        setUsername(data?.profile?.username || '')
        setBio(data?.profile?.bio || '')

        // Load all courses (published and drafts) - same as /tutor/courses
        const coursesRes = await fetch('/api/tutor/courses', { credentials: 'include' })
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json()
          const courses = (coursesData.courses || []).map((c: any) => ({
            ...c,
            publishedAt: c.updatedAt,
            sessions: Math.floor(Math.random() * 20) + 5,
            tasks: Math.floor(Math.random() * 50) + 10,
            assessments: Math.floor(Math.random() * 10) + 2,
            avgScore: Math.floor(Math.random() * 30) + 70,
            completionRate: Math.floor(Math.random() * 40) + 60,
          }))
          setAllCourses(courses)
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
        setCompletedItems([])
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
    () => {
      if (!normalizedUsername) return ''
      const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
      return `${prefix}/u/${normalizedUsername}`
    },
    [locale, normalizedUsername]
  )
  const publicUrl = useMemo(
    () => (typeof window !== 'undefined' && publicPath ? `${window.location.origin}${publicPath}` : publicPath),
    [publicPath]
  )

  // Filter courses based on search
  const filteredCourses = allCourses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const publishedCourses = filteredCourses.filter(c => c.isPublished)
  const paidPublishedCourses = publishedCourses.filter(c => (c.price ?? 0) > 0)
  const draftCourses = filteredCourses.filter(c => !c.isPublished)

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
    return allCourses.find(c => c.id === selectedCourseId) || null
  }, [selectedCourseId, allCourses])

  const getPriceValue = (course: PublicCourse) => {
    if (priceEdits[course.id] !== undefined) return priceEdits[course.id]
    return String(course.price ?? 0)
  }

  const fetchCsrfToken = async () => {
    const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
    const csrfData = await csrfRes.json().catch(() => ({}))
    return csrfData?.token ?? null
  }

  const saveCoursePrice = async (course: PublicCourse) => {
    const rawValue = getPriceValue(course).trim()
    const priceValue = rawValue === '' ? NaN : Number(rawValue)
    if (!Number.isFinite(priceValue) || priceValue < 0) {
      toast.error('Enter a valid price (0 or more).')
      return
    }
    setPriceSaving((prev) => ({ ...prev, [course.id]: true }))
    try {
      const csrfToken = await fetchCsrfToken()
      const res = await fetch(`/api/tutor/courses/${course.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ price: priceValue }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'Failed to update price')
        return
      }
      setAllCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, price: priceValue } : c))
      )
      setPriceEdits((prev) => {
        const next = { ...prev }
        delete next[course.id]
        return next
      })
      toast.success('Price updated')
    } catch {
      toast.error('Failed to update price')
    } finally {
      setPriceSaving((prev) => ({ ...prev, [course.id]: false }))
    }
  }

  const deleteCourse = async (course: PublicCourse) => {
    if (!confirm(`Delete "${course.name}"? This cannot be undone.`)) return
    setDeleteBusy((prev) => ({ ...prev, [course.id]: true }))
    try {
      const csrfToken = await fetchCsrfToken()
      const res = await fetch(`/api/tutor/courses/${course.id}`, {
        method: 'DELETE',
        headers: {
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'Failed to delete course')
        return
      }
      setAllCourses((prev) => prev.filter((c) => c.id !== course.id))
      setSelectedCourseId((prev) => (prev === course.id ? null : prev))
      toast.success('Course deleted')
    } catch {
      toast.error('Failed to delete course')
    } finally {
      setDeleteBusy((prev) => ({ ...prev, [course.id]: false }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button Header */}
      <div className="bg-white border-b px-4 py-3">
        <Button variant="ghost" onClick={() => router.push('/tutor/dashboard')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="w-full p-6 space-y-6">
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

        {/* Tabs for Courses, Classes, Building, and Completed */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="courses">
              Courses
              {paidPublishedCourses.length > 0 && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                  {paidPublishedCourses.length}
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
              {draftCourses.length > 0 && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                  {draftCourses.length}
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
            {/* Search and Filter Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-md p-1 bg-muted/50">
                      <Button
                        variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="h-9 px-2"
                        onClick={() => setViewMode('grid')}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="h-9 px-2"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button onClick={() => router.push('/tutor/courses/new')}>
                      Create Course
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Grid/List */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading courses...</p>
              </div>
            ) : paidPublishedCourses.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No published paid courses yet</h3>
                  <Button onClick={() => router.push('/tutor/courses/new')}>
                    Create New Course
                  </Button>
                </CardContent>
              </Card>
            ) : viewMode === 'list' ? (
              <div className="space-y-3">
                {paidPublishedCourses.map((course) => (
                  <Card 
                    key={course.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedCourseId === course.id ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedCourseId(course.id === selectedCourseId ? null : course.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-medium truncate">{course.name}</h3>
                              <Badge variant={course.isPublished ? 'default' : 'secondary'}>
                                {course.isPublished ? 'Published' : 'Draft'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                              {course.description || 'No description'}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline">{course.subject}</Badge>
                              {course.gradeLevel && <Badge variant="outline">{course.gradeLevel}</Badge>}
                              {course.difficulty && <Badge variant="outline" className="capitalize">{course.difficulty}</Badge>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.estimatedHours || 0}h</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{course._count?.lessons || 0} lessons</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GraduationCap className="h-4 w-4" />
                              <span>{course._count?.enrollments || 0} students</span>
                            </div>
                          </div>
                          <div className="text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min="0"
                                step="1"
                                value={getPriceValue(course)}
                                onChange={(e) => {
                                  setPriceEdits((prev) => ({ ...prev, [course.id]: e.target.value }))
                                }}
                                className="h-8 w-24 text-right"
                              />
                              <span className="text-xs text-muted-foreground">{course.currency || 'USD'}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={priceSaving[course.id]}
                                onClick={() => saveCoursePrice(course)}
                              >
                                {priceSaving[course.id] ? 'Saving...' : 'Save'}
                              </Button>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/tutor/courses/${course.id}/builder`)
                              }}
                            >
                              <Pencil className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/tutor/classes?course=${course.id}`)
                              }}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Go Live
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              disabled={deleteBusy[course.id]}
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteCourse(course)
                              }}
                            >
                              {deleteBusy[course.id] ? 'Deleting...' : 'Delete'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paidPublishedCourses.map((course) => (
                  <Card 
                    key={course.id} 
                    className={`hover:shadow-2xl transition-all border-none neon-border-inner bg-white/60 hover:bg-white backdrop-blur-sm cursor-pointer ${selectedCourseId === course.id ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedCourseId(course.id === selectedCourseId ? null : course.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <Badge variant={course.isPublished ? 'default' : 'secondary'}>
                          {course.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-3">{course.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description || 'No description'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">{course.subject}</Badge>
                        {course.gradeLevel && <Badge variant="outline">{course.gradeLevel}</Badge>}
                        {course.difficulty && <Badge variant="outline" className="capitalize">{course.difficulty}</Badge>}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.estimatedHours || 0}h</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{course._count?.lessons || 0} lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>{course._count?.enrollments || 0} students</span>
                        </div>
                      </div>

                      <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            step="1"
                            value={getPriceValue(course)}
                            onChange={(e) => {
                              setPriceEdits((prev) => ({ ...prev, [course.id]: e.target.value }))
                            }}
                            className="h-8 w-24 text-right"
                          />
                          <span className="text-xs text-muted-foreground">{course.currency || 'USD'}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={priceSaving[course.id]}
                            onClick={() => saveCoursePrice(course)}
                          >
                            {priceSaving[course.id] ? 'Saving...' : 'Save'}
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/tutor/courses/${course.id}/builder`)
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/tutor/classes?course=${course.id}`)
                          }}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Go Live
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="flex-1"
                          disabled={deleteBusy[course.id]}
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteCourse(course)
                          }}
                        >
                          {deleteBusy[course.id] ? 'Deleting...' : 'Delete'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

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
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Classes ({classes.length})</CardTitle>
                    <CardDescription>Scheduled individual classes.</CardDescription>
                  </div>
                  <Button onClick={() => router.push('/tutor/classes/new')}>
                    Schedule Class
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {classes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No scheduled classes yet.
                    </p>
                    <Button onClick={() => router.push('/tutor/classes/new')}>
                      Schedule Your First Class
                    </Button>
                  </div>
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
                    <CardTitle>Building ({draftCourses.length})</CardTitle>
                    <CardDescription>
                      Draft courses being developed (most recent first).
                    </CardDescription>
                  </div>
                  <Button onClick={() => router.push('/tutor/courses/new')}>
                    Create New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {draftCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No items in progress. Start building!
                    </p>
                    <Button onClick={() => router.push('/tutor/courses/new')}>
                      Create New Course
                    </Button>
                  </div>
                ) : (
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
                            {course._count?.lessons || 0} lessons • Last edited {formatDate(course.updatedAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" onClick={() => router.push(`/tutor/courses/${course.id}/builder`)}>
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => router.push(`/tutor/courses/${course.id}`)}>
                            <DollarSign className="h-4 w-4 mr-1" />
                            Price
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={deleteBusy[course.id]}
                            onClick={() => deleteCourse(course)}
                          >
                            {deleteBusy[course.id] ? 'Deleting...' : 'Delete'}
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
