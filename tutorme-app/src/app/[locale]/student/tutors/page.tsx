'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Compass, ExternalLink, Search, Sparkles, Users, Star, Heart } from 'lucide-react'
import { toast } from 'sonner'

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
    .map((part) => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      <span className="font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-muted-foreground text-sm">({count})</span>
      )}
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
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tutorme-favorites')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFavorites(new Set(parsed.tutors || []))
      } catch {
        // ignore
      }
    }
  }, [])

  // Save favorites to localStorage
  const toggleFavorite = (tutorId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(tutorId)) {
        next.delete(tutorId)
        toast.success('Removed from favorites')
      } else {
        next.add(tutorId)
        toast.success('Added to favorites')
      }
      const saved = localStorage.getItem('tutorme-favorites')
      const parsed = saved ? JSON.parse(saved) : { tutors: [], courses: [] }
      parsed.tutors = Array.from(next)
      localStorage.setItem('tutorme-favorites', JSON.stringify(parsed))
      return next
    })
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
        
        // Enrich with mock ratings for now
        const enrichedTutors = (Array.isArray(data?.tutors) ? data.tutors : []).map((tutor: TutorDirectoryItem) => ({
          ...tutor,
          averageRating: 4.5 + Math.random() * 0.5,
          totalReviewCount: Math.floor(Math.random() * 100) + 10,
          coursePreview: tutor.coursePreview.map(course => ({
            ...course,
            rating: 4.2 + Math.random() * 0.8,
            reviewCount: Math.floor(Math.random() * 50) + 5,
            price: course.price || Math.floor(Math.random() * 100) + 50,
            currency: course.currency || 'USD'
          }))
        }))
        
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
      totalReviews: courses.reduce((sum, c) => sum + (c.reviewCount || 0), 0)
    }))
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Find Your Tutor</h1>
              <p className="max-w-2xl text-sm text-slate-700">
                Explore tutor profiles, compare subjects and courses, and open any tutor profile instantly.
              </p>
            </div>
            <Button asChild>
              <Link href={`/${locale}/student/courses`}>
                <Compass className="mr-2 h-4 w-4" />
                Go to Courses
              </Link>
            </Button>
          </div>
        </div>
        <CardContent className="grid gap-3 p-4 sm:grid-cols-3 sm:p-6">
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Tutors</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{headlineMetrics.tutorCount}</p>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Published Courses</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{headlineMetrics.totalCourses}</p>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Enrollments</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{headlineMetrics.totalEnrollments}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
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
              onChange={(event) => setSearchQuery(event.target.value)}
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
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject.toLowerCase()}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
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
            <Card key={`loading-${index}`} className="animate-pulse">
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
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>No tutors match your current filters</CardTitle>
              <CardDescription>Try broadening search terms or selecting a different subject.</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          tutors.map((tutor) => (
            <Card 
              key={tutor.id} 
              className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer relative"
              onClick={() => setActiveTutor(tutor)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(tutor.id)
                }}
                className="absolute top-3 right-3 z-10 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Heart 
                  className={`h-5 w-5 ${favorites.has(tutor.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                />
              </button>
              <CardHeader className="space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={tutor.avatarUrl || undefined} alt={`${tutor.name} avatar`} />
                    <AvatarFallback>{getInitials(tutor.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 pr-8">
                    <CardTitle className="truncate text-lg">{tutor.name}</CardTitle>
                    <CardDescription>@{tutor.username}</CardDescription>
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-slate-600">
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
                  {tutor.subjects.slice(0, 3).map((subject) => (
                    <Badge key={`${tutor.id}:${subject}`} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                  {tutor.subjects.length > 3 ? <Badge variant="outline">+{tutor.subjects.length - 3}</Badge> : null}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-md border p-2">
                    <p className="text-slate-500">Courses</p>
                    <p className="font-semibold text-slate-900">{tutor.courseCount}</p>
                  </div>
                  <div className="rounded-md border p-2">
                    <p className="text-slate-500">Enrollments</p>
                    <p className="font-semibold text-slate-900">{tutor.totalEnrollments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={Boolean(activeTutor)} onOpenChange={(open) => !open && setActiveTutor(null)}>
        <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-3xl">
          {activeTutor ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={activeTutor.avatarUrl || undefined} alt={`${activeTutor.name} avatar`} />
                    <AvatarFallback>{getInitials(activeTutor.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{activeTutor.name}</span>
                    {activeTutor.averageRating && (
                      <div className="flex items-center gap-1 text-sm font-normal">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span>{activeTutor.averageRating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({activeTutor.totalReviewCount} reviews)</span>
                      </div>
                    )}
                  </div>
                </DialogTitle>
                <DialogDescription>@{activeTutor.username}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/20 p-3 text-sm text-slate-700">
                  {activeTutor.bio || 'No bio provided yet.'}
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-slate-500">Courses</p>
                    <p className="text-lg font-semibold text-slate-900">{activeTutor.courseCount}</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-slate-500">Enrollments</p>
                    <p className="text-lg font-semibold text-slate-900">{activeTutor.totalEnrollments}</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-slate-500">Rating</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {activeTutor.averageRating?.toFixed(1) || 'N/A'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-900">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {(activeTutor.specialties.length > 0 ? activeTutor.specialties : ['General Tutoring']).map((specialty) => (
                      <Badge key={`${activeTutor.id}:${specialty}`} variant="secondary">
                        <Sparkles className="mr-1 h-3 w-3" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-900">Subjects & Courses</p>
                  {getSubjectGroups(activeTutor).map((subject) => (
                    <div key={subject.name} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{subject.name}</Badge>
                          <span className="text-xs text-muted-foreground">{subject.courses.length} courses</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <StarRating rating={subject.averageRating} count={subject.totalReviews} />
                          <span className="font-medium text-slate-900">
                            ${subject.averageRate.toFixed(0)}/course
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {subject.courses.slice(0, 3).map((course) => (
                          <div key={course.id} className="flex items-center justify-between text-sm">
                            <span className="text-slate-700">{course.name}</span>
                            <div className="flex items-center gap-2">
                              <StarRating rating={course.rating || 0} count={course.reviewCount} />
                              <span className="text-slate-900 font-medium">
                                ${course.price}{course.currency}
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
                  <Button 
                    variant="outline" 
                    onClick={() => toggleFavorite(activeTutor.id)}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${favorites.has(activeTutor.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {favorites.has(activeTutor.id) ? 'Favorited' : 'Add to Favorites'}
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
