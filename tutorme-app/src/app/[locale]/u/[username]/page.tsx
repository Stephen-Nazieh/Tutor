'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, Clock3, GraduationCap, Compass, FileText, Heart, Star } from 'lucide-react'
import { toast } from 'sonner'

interface PublicTutorResponse {
  tutor: {
    id: string
    name: string
    username: string
    bio: string
    avatarUrl: string | null
    specialties: string[]
    credentials: string
    hourlyRate: number | null
  }
  courses: Array<{
    id: string
    name: string
    description?: string | null
    subject: string
    gradeLevel?: string | null
    difficulty?: string | null
    estimatedHours?: number | null
    enrollmentCount: number
    moduleCount: number
    lessonCount: number
    price?: number | null
    currency?: string | null
  }>
  source?: 'db' | 'mock'
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

export default function PublicTutorPage() {
  const params = useParams()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const username = typeof params?.username === 'string' ? params.username : ''
  
  const [data, setData] = useState<PublicTutorResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    loadTutorData()
    checkFavoriteStatus()
  }, [username])

  const checkFavoriteStatus = () => {
    const saved = localStorage.getItem('tutorme-favorites')
    if (saved && data?.tutor?.id) {
      try {
        const parsed = JSON.parse(saved)
        setIsFavorited(parsed.tutors?.includes(data.tutor.id) || false)
      } catch {
        // ignore
      }
    }
  }

  const loadTutorData = async () => {
    setLoading(true)
    try {
      const normalized = username.replace(/^@+/, '').toLowerCase()
      const res = await fetch(`/api/public/tutors/${encodeURIComponent(normalized)}`, {
        cache: 'no-store',
      })

      if (!res.ok) throw new Error('Not found')

      const tutorData = await res.json()
      
      // Enrich with mock ratings for now
      setData({
        ...tutorData,
        courses: tutorData.courses.map((course: any) => ({
          ...course,
          rating: 4.2 + Math.random() * 0.8,
          reviewCount: Math.floor(Math.random() * 50) + 5,
          price: course.price || Math.floor(Math.random() * 100) + 50
        }))
      })
    } catch {
      // Handle error
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = () => {
    if (!data?.tutor?.id) return
    
    const saved = localStorage.getItem('tutorme-favorites')
    const parsed = saved ? JSON.parse(saved) : { tutors: [], courses: [] }
    
    if (isFavorited) {
      parsed.tutors = parsed.tutors.filter((id: string) => id !== data.tutor.id)
      toast.success('Removed from favorites')
    } else {
      parsed.tutors = [...(parsed.tutors || []), data.tutor.id]
      toast.success('Added to favorites')
    }
    
    localStorage.setItem('tutorme-favorites', JSON.stringify(parsed))
    setIsFavorited(!isFavorited)
  }

  // Calculate aggregated tutor rating from courses
  const tutorRating = data?.courses?.length 
    ? data.courses.reduce((sum, c: any) => sum + (c.rating || 0), 0) / data.courses.length 
    : 0
  const totalReviews = data?.courses?.reduce((sum, c: any) => sum + (c.reviewCount || 0), 0) || 0

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-8 w-1/3 rounded bg-muted" />
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-6">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-bold">Tutor not found</h2>
            <Button asChild className="mt-4">
              <Link href={`/${locale}/student/tutors`}>Browse Tutors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { tutor, courses, source } = data
  const totalEnrollments = courses.reduce((sum, course) => sum + course.enrollmentCount, 0)
  const subjects = Array.from(new Set(courses.map((course) => course.subject)))

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6">
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border shadow-sm">
                <AvatarImage src={tutor.avatarUrl || undefined} alt={`${tutor.name} avatar`} />
                <AvatarFallback>{getInitials(tutor.name)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tutor.name}</h1>
                <p className="text-sm font-medium text-slate-600">@{tutor.username}</p>
                {source === 'mock' ? <Badge variant="outline">Demo Data</Badge> : null}
                {tutor.bio ? <p className="max-w-2xl text-sm text-slate-700">{tutor.bio}</p> : null}
                {tutorRating > 0 && (
                  <div className="flex items-center gap-1 pt-1">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-lg">{tutorRating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({totalReviews} reviews)</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={isFavorited ? 'default' : 'outline'} 
                onClick={toggleFavorite}
                className={isFavorited ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-white' : ''}`} />
                {isFavorited ? 'Favorited' : 'Add to Favorites'}
              </Button>
              <Button asChild variant="outline">
                <Link href={`/@${tutor.username}`}>Share @handle</Link>
              </Button>
              <Button asChild>
                <Link href={`/${locale}/student/tutors`}>
                  <Compass className="mr-2 h-4 w-4" />
                  Discover Tutors
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Published Courses</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{courses.length}</p>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Enrollments</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{totalEnrollments}</p>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Subjects</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{subjects.length}</p>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Rating</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {tutorRating > 0 ? tutorRating.toFixed(1) : 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expertise</CardTitle>
          <CardDescription>Specialties and credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tutor.specialties.length > 0 ? (
              tutor.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))
            ) : (
              <Badge variant="outline">General Tutoring</Badge>
            )}
          </div>
          {tutor.credentials ? (
            <div className="rounded-lg border bg-muted/30 p-3 text-sm text-slate-700">
              <p className="mb-1.5 font-medium text-slate-900">Credentials</p>
              <p>{tutor.credentials}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Catalog</CardTitle>
          <CardDescription>Published courses by @{tutor.username}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {courses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No published courses yet.</p>
          ) : (
            courses.map((course: any) => (
              <div key={course.id} className="rounded-lg border bg-card p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1 flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900">{course.name}</h3>
                    <p className="text-sm text-slate-600">{course.description || 'No description provided.'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{course.subject}</Badge>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {course.gradeLevel ? <Badge variant="outline"><GraduationCap className="mr-1 h-3 w-3" />{course.gradeLevel}</Badge> : null}
                  {course.difficulty ? <Badge variant="outline">{course.difficulty}</Badge> : null}
                  {course.estimatedHours ? <Badge variant="outline"><Clock3 className="mr-1 h-3 w-3" />{course.estimatedHours}h</Badge> : null}
                  <Badge variant="outline"><BookOpen className="mr-1 h-3 w-3" />{course.moduleCount} modules</Badge>
                  <Badge variant="outline">{course.lessonCount} lessons</Badge>
                  <Badge variant="outline"><Users className="mr-1 h-3 w-3" />{course.enrollmentCount} enrolled</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4">
                    <StarRating rating={course.rating || 0} count={course.reviewCount} />
                    {course.price && (
                      <span className="font-bold text-slate-900">
                        ${course.price}
                      </span>
                    )}
                  </div>
                  <Button asChild size="sm" variant="default">
                    <Link href={`/${locale}/curriculum/${course.id}`}>
                      <FileText className="mr-1 h-3 w-3" />
                      View Outline
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
