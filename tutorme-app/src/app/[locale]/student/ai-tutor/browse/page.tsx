'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Check,
  Star,
  Users,
  Clock,
  Sparkles,
  ChevronLeft,
  User,
  Volume2,
  Globe,
  BookOpen,
  GraduationCap,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BackButton } from '@/components/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Course {
  id: string
  code: string
  name: string
  category: string
  description: string
  skills: string[]
  modulesCount?: number
  lessonsCount?: number
}

interface Subject {
  id: string
  name: string
  description: string
  icon: string
  topics: string[]
  features: string[]
  estimatedStudents: number
  averageRating: number
  color: string
  comingSoon?: boolean
}

const AGE_OPTIONS = [
  { value: 5, label: '5-8 years', description: 'Simple words, stories' },
  { value: 8, label: '8-10 years', description: 'Clear explanations' },
  { value: 10, label: '10-12 years', description: 'Academic language' },
  { value: 12, label: '12-15 years', description: 'Critical thinking' },
  { value: 15, label: '15-18 years', description: 'College-prep' },
  { value: 18, label: 'Adult', description: 'Sophisticated' },
]

const GENDER_OPTIONS = [
  { value: 'female', label: 'Female', emoji: '👩' },
  { value: 'male', label: 'Male', emoji: '👨' },
  { value: 'neutral', label: 'Neutral', emoji: '🧑' },
]

const ACCENT_OPTIONS = [
  { value: 'us', label: 'American', flag: '🇺🇸' },
  { value: 'uk', label: 'British', flag: '🇬🇧' },
  { value: 'au', label: 'Australian', flag: '🇦🇺' },
  { value: 'ca', label: 'Canadian', flag: '🇨🇦' },
]

export default function BrowseTutorsPage() {
  const router = useRouter()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState<string | null>(null)

  // Preferences dialog
  const [showPreferences, setShowPreferences] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [preferences, setPreferences] = useState({
    teachingAge: 15,
    voiceGender: 'female',
    voiceAccent: 'us',
  })

  // Course selection
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [loadingCourses, setLoadingCourses] = useState(false)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/ai-tutor/subjects')
      const data = await res.json()
      setSubjects(data.subjects || [])
    } catch (error) {
      toast.error('Failed to load subjects')
    } finally {
      setLoading(false)
    }
  }

  const openPreferences = async (subjectId: string) => {
    setSelectedSubject(subjectId)
    setShowPreferences(true)

    // Load available courses
    try {
      setLoadingCourses(true)
      const res = await fetch('/api/courses/list')
      const data = await res.json()
      setCourses(data.courses || [])

      // Auto-select first course if available
      if (data.courses?.length > 0) {
        setSelectedCourse(data.courses[0].id)
      }
    } catch (error) {
      console.error('Failed to load courses:', error)
    } finally {
      setLoadingCourses(false)
    }
  }

  const handleEnroll = async () => {
    if (!selectedSubject) return

    try {
      setEnrolling(selectedSubject)
      setShowPreferences(false)

      const res = await fetch('/api/ai-tutor/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          englishLevel: 'intermediate',
          focusAreas: ['essay_writing', 'grammar'],
          teachingAge: preferences.teachingAge,
          voiceGender: preferences.voiceGender,
          voiceAccent: preferences.voiceAccent,
          avatarStyle: 'modern',
          courseId: selectedCourse,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to enroll')
      }

      toast.success(data.message || 'Successfully enrolled!')
      router.push(`/student/ai-tutor/${selectedSubject}`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to enroll')
    } finally {
      setEnrolling(null)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading available tutors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <BackButton href="/student/ai-tutor" />
            <div>
              <h1 className="mb-2 text-3xl font-bold">Find an AI Tutor</h1>
              <p className="text-gray-600">
                Choose a subject and customize your learning experience
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Available Now Section */}
        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="h-5 w-5 text-blue-500" />
            Available Now
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {subjects
              .filter(s => !s.comingSoon)
              .map(subject => (
                <Card key={subject.id} className="border-2 border-blue-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{subject.icon}</span>
                        <div>
                          <CardTitle className="text-xl">{subject.name}</CardTitle>
                          <div className="mt-1 flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                              <span className="text-sm font-medium">{subject.averageRating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                {subject.estimatedStudents.toLocaleString()} students
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">{subject.description}</p>

                    <div className="mb-4">
                      <p className="mb-2 text-sm font-medium">Topics Covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map(topic => (
                          <Badge key={topic} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="mb-2 text-sm font-medium">Features:</p>
                      <ul className="space-y-1">
                        {subject.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <Clock className="mr-1 inline h-4 w-4" />
                        Free: 5 messages/day
                      </div>
                      <Button
                        size="lg"
                        onClick={() => openPreferences(subject.id)}
                        disabled={enrolling === subject.id}
                      >
                        {enrolling === subject.id ? 'Enrolling...' : 'Enroll Free'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-500">Coming Soon</h2>
          <div className="grid gap-4 opacity-60 md:grid-cols-3">
            {[
              { icon: '🔢', name: 'Mathematics', topics: 'Algebra, Calculus, Geometry' },
              { icon: '⚛️', name: 'Physics', topics: 'Mechanics, Energy, Waves' },
              { icon: '🧪', name: 'Chemistry', topics: 'Stoichiometry, Reactions' },
            ].map(subject => (
              <Card key={subject.name} className="grayscale">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <span className="text-4xl">{subject.icon}</span>
                    <h3 className="mt-2 font-semibold">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.topics}</p>
                    <Badge variant="secondary" className="mt-3">
                      Coming Soon
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customize Your AI Tutor</DialogTitle>
            <DialogDescription>
              Personalize how your English AI Tutor teaches and communicates with you.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="preferences" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="course" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Course
                {selectedCourse && <Check className="h-3 w-3 text-green-500" />}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preferences" className="space-y-6 py-4">
              {/* Teaching Age */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  Teach me like I'm...
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {AGE_OPTIONS.map(age => (
                    <button
                      key={age.value}
                      onClick={() => setPreferences(prev => ({ ...prev, teachingAge: age.value }))}
                      className={`rounded-lg border p-3 text-left transition-all ${
                        preferences.teachingAge === age.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{age.label}</span>
                      <p className="mt-1 text-xs text-gray-500">{age.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Gender */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <Volume2 className="h-4 w-4" />
                  Voice Gender
                </label>
                <div className="flex gap-2">
                  {GENDER_OPTIONS.map(gender => (
                    <button
                      key={gender.value}
                      onClick={() =>
                        setPreferences(prev => ({ ...prev, voiceGender: gender.value }))
                      }
                      className={`flex-1 rounded-lg border p-3 text-center transition-all ${
                        preferences.voiceGender === gender.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{gender.emoji}</span>
                      <p className="mt-1 text-sm">{gender.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Accent */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <Globe className="h-4 w-4" />
                  Voice Accent
                </label>
                <div className="flex gap-2">
                  {ACCENT_OPTIONS.map(accent => (
                    <button
                      key={accent.value}
                      onClick={() =>
                        setPreferences(prev => ({ ...prev, voiceAccent: accent.value }))
                      }
                      className={`flex-1 rounded-lg border p-3 text-center transition-all ${
                        preferences.voiceAccent === accent.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{accent.flag}</span>
                      <p className="mt-1 text-sm">{accent.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="course" className="py-4">
              {loadingCourses ? (
                <div className="py-8 text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Loading courses...</p>
                </div>
              ) : courses.length === 0 ? (
                <div className="py-8 text-center">
                  <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-700">No Courses Available</h3>
                  <p className="text-sm text-gray-500">
                    There are no courses set up yet. You can still enroll and get general English
                    tutoring.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {courses.map(course => (
                      <button
                        key={course.id}
                        onClick={() => setSelectedCourse(course.id)}
                        className={`w-full rounded-lg border p-4 text-left transition-all ${
                          selectedCourse === course.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`rounded-lg p-2 ${
                              course.category === 'test_prep' ? 'bg-purple-100' : 'bg-blue-100'
                            }`}
                          >
                            {course.category === 'test_prep' ? (
                              <GraduationCap className="h-5 w-5 text-purple-600" />
                            ) : (
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{course.name}</h3>
                              {selectedCourse === course.id && (
                                <Check className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{course.description}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {course.skills?.map(skill => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="text-xs capitalize"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                              <span>{course.modulesCount || 0} modules</span>
                              <span>{course.lessonsCount || 0} lessons</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}

              <div className="mt-4 rounded-lg bg-blue-50 p-3">
                <p className="text-sm text-blue-700">
                  <strong>Why choose a course?</strong> Courses provide structured learning paths
                  with organized lessons, exercises, and progress tracking. Your AI tutor will
                  follow the course to help you achieve your goals faster.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 border-t pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowPreferences(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleEnroll} disabled={enrolling !== null}>
              {enrolling ? 'Enrolling...' : 'Start Learning'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
