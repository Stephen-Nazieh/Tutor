'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { toast } from "sonner"
import {
  Users,
  CheckCircle,
  BookOpen,
  Filter,
  Heart,
  Star,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Loader2,
  Plus
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Calculator,
  Languages,
  Music,
  Palette,
  Globe,
  Search,
  MessageCircle
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// Loading fallback for Suspense
function CoursesPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

// --- TYPES & DATA FROM BROWSE PAGE ---
interface Subject {
  id: string
  name: string
  code: string
  category: string
  description: string
  level: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'AP'
  estimatedHours: number
  prerequisites?: string[]
  isEnrolled?: boolean
}

const subjectIcons: Record<string, React.ReactNode> = {
  english: <Languages className="w-6 h-6" />,
  math: <Calculator className="w-6 h-6" />,
  precalculus: <Calculator className="w-6 h-6" />,
  'ap-calculus-ab': <Calculator className="w-6 h-6" />,
  'ap-calculus-bc': <Calculator className="w-6 h-6" />,
  'ap-statistics': <Calculator className="w-6 h-6" />,
  ielts: <GraduationCap className="w-6 h-6" />,
  toefl: <GraduationCap className="w-6 h-6" />,
  'sat-math': <Calculator className="w-6 h-6" />,
  'sat-english': <BookOpen className="w-6 h-6" />,
  'ib-math': <Calculator className="w-6 h-6" />,
  'ib-english': <BookOpen className="w-6 h-6" />,
  music: <Music className="w-6 h-6" />,
  art: <Palette className="w-6 h-6" />,
  geography: <Globe className="w-6 h-6" />,
}

const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
  english: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
  math: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' },
  precalculus: { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200' },
  'ap-calculus-ab': { bg: 'bg-violet-500', text: 'text-violet-600', border: 'border-violet-200' },
  'ap-calculus-bc': { bg: 'bg-fuchsia-500', text: 'text-fuchsia-600', border: 'border-fuchsia-200' },
  'ap-statistics': { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200' },
  ielts: { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-200' },
  toefl: { bg: 'bg-blue-700', text: 'text-blue-700', border: 'border-blue-200' },
  'sat-math': { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200' },
  'sat-english': { bg: 'bg-amber-600', text: 'text-amber-700', border: 'border-amber-200' },
  'ib-math': { bg: 'bg-teal-500', text: 'text-teal-600', border: 'border-teal-200' },
  'ib-english': { bg: 'bg-teal-600', text: 'text-teal-700', border: 'border-teal-200' },
  music: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200' },
  art: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200' },
  geography: { bg: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-200' },
}

const allSubjects: Subject[] = [
  {
    id: '1', name: 'English', code: 'english', category: 'Language Arts', description: 'Language arts, writing, grammar, and literature analysis', level: 'Middle School - High School', difficulty: 'Intermediate', estimatedHours: 120,
  },
  {
    id: '2', name: 'Mathematics', code: 'math', category: 'Mathematics', description: 'Algebra, geometry, and foundational problem solving', level: 'Middle School - High School', difficulty: 'Intermediate', estimatedHours: 150,
  },
  {
    id: '3', name: 'Pre-calculus', code: 'precalculus', category: 'Mathematics', description: 'Functions, trigonometry, and preparation for calculus', level: 'High School', difficulty: 'Advanced', estimatedHours: 100, prerequisites: ['Mathematics'],
  },
  {
    id: '4', name: 'AP Calculus AB', code: 'ap-calculus-ab', category: 'Mathematics', description: 'Limits, derivatives, integrals, and the Fundamental Theorem', level: 'High School (AP)', difficulty: 'AP', estimatedHours: 140, prerequisites: ['Pre-calculus'],
  },
  {
    id: '5', name: 'AP Calculus BC', code: 'ap-calculus-bc', category: 'Mathematics', description: 'All AB topics plus series, parametric, and polar calculus', level: 'High School (AP)', difficulty: 'AP', estimatedHours: 160, prerequisites: ['Pre-calculus', 'AP Calculus AB (recommended)'],
  },
  {
    id: '6', name: 'AP Statistics', code: 'ap-statistics', category: 'Mathematics', description: 'Data analysis, probability, and statistical inference', level: 'High School (AP)', difficulty: 'AP', estimatedHours: 120, prerequisites: ['Mathematics'],
  },
  {
    id: '10', name: 'IELTS', code: 'ielts', category: 'Test Preparation', description: 'International English Language Testing System preparation', level: 'High School - Adult', difficulty: 'Advanced', estimatedHours: 80, prerequisites: ['English'],
  },
  {
    id: '11', name: 'TOEFL', code: 'toefl', category: 'Test Preparation', description: 'Test of English as a Foreign Language preparation', level: 'High School - Adult', difficulty: 'Advanced', estimatedHours: 80, prerequisites: ['English'],
  },
  {
    id: '13', name: 'SAT Math', code: 'sat-math', category: 'Test Preparation', description: 'SAT Mathematics preparation covering algebra, problem solving, and data analysis', level: 'High School', difficulty: 'Advanced', estimatedHours: 100, prerequisites: ['Mathematics'],
  },
  {
    id: '14', name: 'SAT English', code: 'sat-english', category: 'Test Preparation', description: 'SAT Reading and Writing preparation with grammar and comprehension focus', level: 'High School', difficulty: 'Advanced', estimatedHours: 100, prerequisites: ['English'],
  },
  {
    id: '15', name: 'IB Math', code: 'ib-math', category: 'International Baccalaureate', description: 'International Baccalaureate Mathematics at Standard and Higher Levels', level: 'High School (IB)', difficulty: 'Advanced', estimatedHours: 180, prerequisites: ['Mathematics'],
  },
  {
    id: '16', name: 'IB English', code: 'ib-english', category: 'International Baccalaureate', description: 'International Baccalaureate English Language and Literature', level: 'High School (IB)', difficulty: 'Advanced', estimatedHours: 160, prerequisites: ['English'],
  },
]

const lumaCardClass = 'border border-[#E6D9FF] bg-gradient-to-br from-[#FFF7ED] via-white to-[#E0F2FE] shadow-[0_12px_32px_rgba(99,102,241,0.14)]'

// Inner component that uses searchParams
function CoursesPageContent() {
  const router = useRouter()
  const { status } = useSession()

  const [loading, setLoading] = useState(true)

  // --- BROWSE STATE ---
  const [subjects, setSubjects] = useState<Subject[]>(allSubjects)
  const [enrolledIds, setEnrolledIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [enrolling, setEnrolling] = useState(false)
  const [removingSubjectCode, setRemovingSubjectCode] = useState<string | null>(null)

  // --- FAVORITES STATE ---
  const [favoriteTutors, setFavoriteTutors] = useState<Array<{
    id: string
    name: string
    username: string
    bio: string
    specialties: string[]
    courseCount: number
    averageRating?: number
    totalReviewCount?: number
  }>>([])
  const [favoriteCourses, setFavoriteCourses] = useState<Array<{
    id: string
    name: string
    description: string | null
    subject: string
    difficulty: string
    estimatedHours: number
    moduleCount: number
    lessonCount: number
    tutorName?: string
    tutorUsername?: string
    rating?: number
    reviewCount?: number
  }>>([])
  const [favoritesLoading, setFavoritesLoading] = useState(false)

  const loadFavorites = useCallback(async () => {
    setFavoritesLoading(true)
    try {
      const saved = localStorage.getItem('tutorme-favorites')
      if (!saved) {
        setFavoritesLoading(false)
        return
      }
      const parsed = JSON.parse(saved)
      const tutorIds = parsed.tutors || []
      const courseIds = parsed.courses || []

      if (tutorIds.length > 0) {
        const tutorsRes = await fetch('/api/public/tutors?ids=' + tutorIds.join(','))
        if (tutorsRes.ok) {
          const data = await tutorsRes.json()
          setFavoriteTutors(data.tutors || [])
        }
      }
      if (courseIds.length > 0) {
        const coursesRes = await fetch('/api/curriculum/batch?ids=' + courseIds.join(','))
        if (coursesRes.ok) {
          const data = await coursesRes.json()
          setFavoriteCourses(data.curricula || [])
        }
      }
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setFavoritesLoading(false)
    }
  }, [])

  const removeFavoriteTutor = (tutorId: string) => {
    const saved = localStorage.getItem('tutorme-favorites')
    if (saved) {
      const parsed = JSON.parse(saved)
      parsed.tutors = (parsed.tutors || []).filter((id: string) => id !== tutorId)
      localStorage.setItem('tutorme-favorites', JSON.stringify(parsed))
      setFavoriteTutors(prev => prev.filter(t => t.id !== tutorId))
      toast.success('Removed from favorites')
    }
  }

  const removeFavoriteCourse = (courseId: string) => {
    const saved = localStorage.getItem('tutorme-favorites')
    if (saved) {
      const parsed = JSON.parse(saved)
      parsed.courses = (parsed.courses || []).filter((id: string) => id !== courseId)
      localStorage.setItem('tutorme-favorites', JSON.stringify(parsed))
      setFavoriteCourses(prev => prev.filter(c => c.id !== courseId))
      toast.success('Removed from favorites')
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchEnrolledSubjects()
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status])

  const fetchEnrolledSubjects = async () => {
    try {
      const res = await fetch('/api/student/subjects')
      if (res.ok) {
        const data = await res.json()
        const enrolled = data.subjects?.map((s: Subject) => s.id) || []
        setEnrolledIds(enrolled)
      }
    } catch (error) {
      console.error('Failed to fetch enrolled subjects')
    } finally {
      setLoading(false)
    }
  }

  const getCsrf = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    return data?.token ?? null
  }

  const handleEnroll = async (subject: Subject) => {
    setEnrolling(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch('/api/student/subjects/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf && { 'X-CSRF-Token': csrf }),
        },
        credentials: 'include',
        body: JSON.stringify({ subjectCode: subject.code }),
      })

      if (res.ok) {
        toast.success(`Enrolled in ${subject.name}!`)
        setEnrolledIds([...enrolledIds, subject.id])
        setSelectedSubject(null)
      } else {
        const error = await res.json().catch(() => ({}))
        toast.error(error.message || error.error || 'Failed to enroll')
      }
    } catch (error) {
      toast.error('Failed to enroll in subject')
    } finally {
      setEnrolling(false)
    }
  }

  const handleUnenroll = async (subject: Subject) => {
    setRemovingSubjectCode(subject.code)
    try {
      const csrf = await getCsrf()
      const res = await fetch('/api/student/subjects/unenroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf && { 'X-CSRF-Token': csrf }),
        },
        credentials: 'include',
        body: JSON.stringify({ subjectCode: subject.code }),
      })
      if (res.ok) {
        toast.success(`Removed ${subject.name}`)
        setEnrolledIds(prev => prev.filter(id => id !== subject.id))
      } else {
        const error = await res.json().catch(() => ({}))
        toast.error(error.message || error.error || 'Failed to remove subject')
      }
    } catch {
      toast.error('Failed to remove subject')
    } finally {
      setRemovingSubjectCode(null)
    }
  }

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || subject.category === categoryFilter
    const matchesDifficulty = difficultyFilter === 'all' || subject.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Helper functions
  const getSubjectIcon = (code: string) => subjectIcons[code.toLowerCase()] || <BookOpen className="w-6 h-6" />

  const getSubjectColors = (code: string) => subjectColors[code.toLowerCase()] || {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-200'
  }

  // Standard categories matching the Course details page
  const categories = ['all', 'Academic', 'Test Preparation', 'Language Arts', 'Mathematics', 'Science', 'Humanities', 'Arts']
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced', 'AP']

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Solocorn</h1>
          </div>
          <UserNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">My Courses</h2>
        </div>

        <div className="space-y-10">

          <section className="space-y-8">
            {/* Favorite Tutors section removed */}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-800">Favorite Courses</h4>
                {favoriteCourses.length > 0 && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{favoriteCourses.length}</span>
                )}
              </div>
                {favoritesLoading ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader className="space-y-3">
                          <div className="h-6 w-2/3 rounded bg-muted" />
                          <div className="h-4 w-1/2 rounded bg-muted" />
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : favoriteCourses.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No favorite courses yet</h3>
                      <p className="text-muted-foreground mb-4">Browse courses and click the heart icon to save them here.</p>
                      <Button asChild>
                        <Link href="/curriculum">Explore Courses</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {favoriteCourses.map((course) => (
                      <Card key={course.id} className={`relative ${lumaCardClass}`}>
                        <button
                          onClick={() => removeFavoriteCourse(course.id)}
                          className="absolute top-3 right-3 p-2 rounded-full hover:bg-muted transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                        </button>
                        <CardHeader>
                          <div className="pr-8">
                            <CardTitle className="text-lg">{course.name}</CardTitle>
                            <CardDescription>{course.subject}</CardDescription>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {course.description || 'No description available.'}
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{course.difficulty}</Badge>
                            {course.estimatedHours > 0 && <Badge variant="outline">{course.estimatedHours} hours</Badge>}
                          </div>
                          {course.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              <span className="font-medium">{course.rating.toFixed(1)}</span>
                              <span className="text-muted-foreground text-sm">({course.reviewCount} reviews)</span>
                            </div>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {course.moduleCount} modules
                            </span>
                            <span>{course.lessonCount} lessons</span>
                          </div>
                          {course.tutorName && (
                            <p className="text-sm">
                              By{' '}
                              <Link href={course.tutorUsername ? `/u/${course.tutorUsername}` : '#'} className="text-indigo-600 hover:text-indigo-800">
                                {course.tutorName}
                              </Link>
                            </p>
                          )}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <Button asChild size="sm">
                              <Link href={`/curriculum/${course.id}`}>
                                View Course
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Browse Subjects</h3>
              <p className="text-sm text-slate-500">Discover new subjects and enroll.</p>
            </div>
            {/* Filters removed */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map(subject => {
                const colors = getSubjectColors(subject.code)
                const isEnrolled = enrolledIds.includes(subject.id)

                return (
                  <Card
                    key={subject.id}
                    className={`${lumaCardClass} hover:shadow-xl transition-all ${colors.border} ${isEnrolled ? 'opacity-70' : ''}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg text-white ${colors.bg}`}>
                            {getSubjectIcon(subject.code)}
                          </div>
                          <div>
                            <CardTitle className="text-base">{subject.name}</CardTitle>
                            <Badge variant="outline" className="mt-1">
                              {subject.difficulty}
                            </Badge>
                          </div>
                        </div>
                        {isEnrolled && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        {subject.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span>{subject.level}</span>
                      </div>
                      {subject.prerequisites && (
                        <p className="text-xs text-orange-600 mb-3">
                          Requires: {subject.prerequisites.join(', ')}
                        </p>
                      )}
                      <div className="flex flex-col gap-2">
                        {isEnrolled ? (
                          <>
                            <Button
                              className="w-full"
                              variant="outline"
                              onClick={() => router.push(`/student/subjects/${subject.code}`)}
                            >
                              Continue Learning
                            </Button>
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                                onClick={() => router.push(`/student/courses?subject=${subject.code}`)}
                              >
                                <Users className="w-3 h-3 mr-1" />
                                Human tutor
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/student/subjects/${subject.code}/chat`)}
                              >
                                <MessageCircle className="w-3 h-3 mr-1" />
                                AI tutor
                              </Button>
                            </div>
                            <Button
                              className="w-full"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUnenroll(subject)}
                              disabled={removingSubjectCode === subject.code}
                            >
                              {removingSubjectCode === subject.code ? (
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              ) : null}
                              Remove
                            </Button>
                          </>
                        ) : (
                          <Button
                            className="w-full"
                            onClick={() => setSelectedSubject(subject)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Subject
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Enroll Dialog */}
          <Dialog open={!!selectedSubject} onOpenChange={(open) => !open && setSelectedSubject(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enroll in {selectedSubject?.name}</DialogTitle>
                <DialogDescription>
                  Are you sure you want to add this subject to your learning path?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedSubject(null)}>Cancel</Button>
                <Button onClick={() => selectedSubject && handleEnroll(selectedSubject)} disabled={enrolling}>
                  {enrolling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    'Confirm Enrollment'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div >
  )
}


// Main export wrapped in Suspense
export default function CoursesPage() {
  return (
    <Suspense fallback={<CoursesPageSkeleton />}>
      <CoursesPageContent />
    </Suspense>
  )
}
