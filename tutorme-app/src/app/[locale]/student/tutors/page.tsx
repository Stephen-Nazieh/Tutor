'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BookOpen, Compass, ExternalLink, Search, Sparkles, Users, Star, Heart } from 'lucide-react'
import { toast } from 'sonner'
import { DASHBOARD_THEMES, getThemeStyle } from '@/components/dashboard-theme'
import { cn } from '@/lib/utils'

interface TutorCoursePreview {
  id: string
  name: string
  subject: string
  gradeLevel: string | null
  difficulty: string | null
  enrollmentCount: number
  moduleCount: number
  lessonCount: number
  updatedAt: string
  price?: number | null
  currency?: string | null
  rating?: number
  reviewCount?: number
}

interface TutorDirectoryItem {
  id: string
  name: string
  username: string
  bio: string
  avatarUrl: string | null
  specialties: string[]
  hourlyRate: number | null
  courseCount: number
  totalEnrollments: number
  subjects: string[]
  latestCourseUpdatedAt: string | null
  coursePreview: TutorCoursePreview[]
  averageRating?: number
  totalReviewCount?: number
}

interface SubjectInfo {
  name: string
  courses: TutorCoursePreview[]
  averageRate: number
  averageRating: number
  totalReviews: number
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      <span className="font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-sm text-muted-foreground">({count})</span>}
    </div>
  )
}

export default function StudentTutorDirectoryPage() {
  const params = useParams<{ locale?: string }>()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'

  const [loading, setLoading] = useState(true)
  const [tutors, setTutors] = useState<TutorDirectoryItem[]>([])
  const [subjects, setSubjects] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'courses' | 'rate'>('popular')
  const [activeTutor, setActiveTutor] = useState<TutorDirectoryItem | null>(null)
  const [dataSource, setDataSource] = useState<'db' | 'mock'>('db')
  const [following, setFollowing] = useState<Set<string>>(new Set())

  // Theme state with localStorage persistence
  const [themeId, setThemeId] = useState('current')
  const selectedTheme = DASHBOARD_THEMES.find(theme => theme.id === themeId) ?? DASHBOARD_THEMES[0]
  const themeStyle = getThemeStyle(selectedTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('student-dashboard-theme')
    if (savedTheme) {
      setThemeId(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('student-dashboard-theme', themeId)
  }, [themeId])

  // Load following from API on mount
  useEffect(() => {
    const loadFollowing = async () => {
      try {
        const res = await fetch('/api/follows/list')
        if (res.ok) {
          const data = await res.json()
          setFollowing(new Set(data.following.map((t: any) => t.id)))
        }
      } catch (error) {
        console.error('Failed to load following list:', error)
      }
    }
    loadFollowing()
  }, [])

  // Toggle follow
  const toggleFollow = async (tutorId: string) => {
    const isFollowing = following.has(tutorId)
    const method = isFollowing ? 'DELETE' : 'POST'
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/follows', {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ tutorId }),
      })
      if (res.ok) {
        setFollowing(prev => {
          const next = new Set(prev)
          if (isFollowing) {
            next.delete(tutorId)
            toast.success('Unfollowed tutor')
          } else {
            next.add(tutorId)
            toast.success('Following tutor')
          }
          return next
        })
      } else {
        const data = await res.json()
        toast.error(data.error || `Failed to ${isFollowing ? 'unfollow' : 'follow'} tutor`)
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    }
  }

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      try {
        const qs = new URLSearchParams()
        if (searchQuery.trim()) qs.set('q', searchQuery.trim())
        if (subjectFilter !== 'all') qs.set('subject', subjectFilter)
        qs.set('sort', sortBy)

        const res = await fetch(`/api/public/tutors?${qs.toString()}`, {
          credentials: 'include',
          cache: 'no-store',
        })
        if (!res.ok) throw new Error('Failed to load tutors')
        const data = await res.json()
        if (!active) return

        // No longer enriching with random mock data to ensure real data is shown
        const enrichedTutors = Array.isArray(data?.tutors) ? data.tutors : []

        setTutors(enrichedTutors)
        setSubjects(Array.isArray(data?.availableSubjects) ? data.availableSubjects : [])
        setDataSource(data?.source === 'mock' ? 'mock' : 'db')
      } catch {
        if (!active) return
        setTutors([])
        setDataSource('db')
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()
    return () => {
      active = false
    }
  }, [searchQuery, subjectFilter, sortBy])

  const headlineMetrics = useMemo(() => {
    const totalCourses = tutors.reduce((sum, tutor) => sum + tutor.courseCount, 0)
    const totalEnrollments = tutors.reduce((sum, tutor) => sum + tutor.totalEnrollments, 0)
    return {
      tutorCount: tutors.length,
      totalCourses,
      totalEnrollments,
    }
  }, [tutors])

  // Group courses by subject for the modal
  const getSubjectGroups = (tutor: TutorDirectoryItem): SubjectInfo[] => {
    const groups = new Map<string, TutorCoursePreview[]>()
    tutor.coursePreview.forEach(course => {
      const existing = groups.get(course.subject) || []
      existing.push(course)
      groups.set(course.subject, existing)
    })

    return Array.from(groups.entries()).map(([name, courses]) => ({
      name,
      courses,
      averageRate: courses.reduce((sum, c) => sum + (c.price || 0), 0) / courses.length,
      averageRating: courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length,
      totalReviews: courses.reduce((sum, c) => sum + (c.reviewCount || 0), 0),
    }))
  }

  return (
    <div
      className="min-h-screen w-full space-y-6 bg-background p-4 text-foreground sm:p-6"
      style={themeStyle}
    >
      <Card className="overflow-hidden border-border bg-card shadow-sm">
        <div className="bg-gradient-to-br from-sky-50/80 via-cyan-50/80 to-emerald-50/80 p-6 dark:from-sky-950/30 dark:via-cyan-950/30 dark:to-emerald-950/30 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Find Your Tutor</h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Explore tutor profiles, compare subjects and courses, and open any tutor profile
                instantly.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Theme Selector */}
              <Select value={themeId} onValueChange={setThemeId}>
                <SelectTrigger className="h-9 w-[150px] border-border bg-background text-xs text-foreground">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {DASHBOARD_THEMES.map(theme => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button asChild>
                <Link href={`/${locale}/student/courses`}>
                  <Compass className="mr-2 h-4 w-4" />
                  Go to My Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="grid gap-3 p-4 sm:grid-cols-3 sm:p-6">
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Tutors</p>
            <p className="mt-1 text-xl font-semibold text-foreground">
              {headlineMetrics.tutorCount}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Published Courses
            </p>
            <p className="mt-1 text-xl font-semibold text-foreground">
              {headlineMetrics.totalCourses}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Total Enrollments
            </p>
            <p className="mt-1 text-xl font-semibold text-foreground">
              {headlineMetrics.totalEnrollments}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Search & Filter</CardTitle>
          <CardDescription>
            Refine by keywords, subject, and ranking.
            {dataSource === 'mock' ? ' Showing demo tutors right now.' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search tutor, subject, specialty..."
              className="pl-9"
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject.toLowerCase()}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={value => setSortBy(value as typeof sortBy)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Recently Updated</SelectItem>
              <SelectItem value="courses">Most Courses</SelectItem>
              <SelectItem value="rate">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={`loading-${index}`} className="animate-pulse border-border bg-card">
              <CardHeader className="space-y-3">
                <div className="h-6 w-2/3 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-4 rounded bg-muted" />
                <div className="h-4 rounded bg-muted" />
              </CardContent>
            </Card>
          ))
        ) : tutors.length === 0 ? (
          <Card className="col-span-full border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">
                No tutors match your current filters
              </CardTitle>
              <CardDescription>
                Try broadening search terms or selecting a different subject.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          tutors.map(tutor => (
            <Card
              key={tutor.id}
              className={cn(
                'relative h-full cursor-pointer transition-all duration-500',
                'border-border bg-card shadow-lg hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl',
                'ring-1 ring-black/5'
              )}
              onClick={() => setActiveTutor(tutor)}
            >
              <Button
                variant={following.has(tutor.id) ? 'default' : 'outline'}
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  toggleFollow(tutor.id)
                }}
                className="absolute right-3 top-3 z-10 h-8 gap-1 rounded-full px-3 text-xs"
              >
                {following.has(tutor.id) ? 'Following' : 'Follow'}
              </Button>
              <CardHeader className="space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarImage src={tutor.avatarUrl || undefined} alt={`${tutor.name} avatar`} />
                    <AvatarFallback className="bg-muted text-foreground">
                      {getInitials(tutor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 pr-8">
                    <CardTitle className="truncate text-lg text-foreground">{tutor.name}</CardTitle>
                    <CardDescription>@{tutor.username}</CardDescription>
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {tutor.bio || 'Experienced tutor ready to help you improve quickly.'}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  {tutor.averageRating && (
                    <StarRating rating={tutor.averageRating} count={tutor.totalReviewCount} />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.slice(0, 3).map(subject => (
                    <Badge key={`${tutor.id}:${subject}`} variant="secondary" className="bg-muted">
                      {subject}
                    </Badge>
                  ))}
                  {tutor.subjects.length > 3 ? (
                    <Badge variant="outline" className="border-border">
                      +{tutor.subjects.length - 3}
                    </Badge>
                  ) : null}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-md border border-border bg-muted/30 p-2">
                    <p className="text-muted-foreground">Courses</p>
                    <p className="font-semibold text-foreground">{tutor.courseCount}</p>
                  </div>
                  <div className="rounded-md border border-border bg-muted/30 p-2">
                    <p className="text-muted-foreground">Enrollments</p>
                    <p className="font-semibold text-foreground">{tutor.totalEnrollments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={Boolean(activeTutor)} onOpenChange={open => !open && setActiveTutor(null)}>
        <DialogContent className="max-h-[88vh] overflow-y-auto border-border bg-card sm:max-w-3xl">
          {activeTutor ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-foreground">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage
                      src={activeTutor.avatarUrl || undefined}
                      alt={`${activeTutor.name} avatar`}
                    />
                    <AvatarFallback className="bg-muted">
                      {getInitials(activeTutor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{activeTutor.name}</span>
                    {activeTutor.averageRating && (
                      <div className="flex items-center gap-1 text-sm font-normal">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span>{activeTutor.averageRating.toFixed(1)}</span>
                        <span className="text-muted-foreground">
                          ({activeTutor.totalReviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </DialogTitle>
                <DialogDescription>@{activeTutor.username}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted/20 p-3 text-sm text-foreground">
                  {activeTutor.bio || 'No bio provided yet.'}
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">Courses</p>
                    <p className="text-lg font-semibold text-foreground">
                      {activeTutor.courseCount}
                    </p>
                  </div>
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">Enrollments</p>
                    <p className="text-lg font-semibold text-foreground">
                      {activeTutor.totalEnrollments}
                    </p>
                  </div>
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="text-lg font-semibold text-foreground">
                      {activeTutor.averageRating?.toFixed(1) || 'N/A'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {(activeTutor.specialties.length > 0
                      ? activeTutor.specialties
                      : ['General Tutoring']
                    ).map(specialty => (
                      <Badge
                        key={`${activeTutor.id}:${specialty}`}
                        variant="secondary"
                        className="bg-muted"
                      >
                        <Sparkles className="mr-1 h-3 w-3" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Subjects & Courses</p>
                  {getSubjectGroups(activeTutor).map(subject => (
                    <div
                      key={subject.name}
                      className="rounded-lg border border-border bg-muted/10 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-muted">
                            {subject.name}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {subject.courses.length} courses
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <StarRating rating={subject.averageRating} count={subject.totalReviews} />
                          <span className="font-medium text-foreground">
                            ${subject.averageRate.toFixed(0)}/course
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {subject.courses.slice(0, 3).map(course => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-muted-foreground">{course.name}</span>
                            <div className="flex items-center gap-2">
                              <StarRating rating={course.rating || 0} count={course.reviewCount} />
                              <span className="font-medium text-foreground">
                                ${course.price}
                                {course.currency}
                              </span>
                            </div>
                          </div>
                        ))}
                        {subject.courses.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{subject.courses.length - 3} more courses
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button asChild>
                    <Link href={`/${locale}/u/${activeTutor.username}`} target="_blank">
                      Open Full Public Page
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
