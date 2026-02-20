'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import {
  BookOpen,
  ArrowLeft,
  Loader2,
  Target,
  AlertCircle,
  Languages,
  Calculator,
  Atom,
  Microscope,
  Monitor,
  Music,
  Palette,
  Globe,
  Trophy,
  GraduationCap
} from 'lucide-react'

interface SubjectDetail {
  id: string
  name: string
  code: string
  category?: string
  description: string
  progress: number
  confidence: number
  xp: number
  level: number
  streakDays: number
  skills: Record<string, number>
  conceptMastery?: {
    concept: string
    score: number
    totalQuestions: number
    correctAnswers: number
  }[]
  recentLessons: {
    id: string
    title: string
    completed: boolean
    score?: number
  }[]
  totalLessons: number
  completedLessons: number
  enrollmentSource?: string | null
}

const subjectIcons: Record<string, React.ReactNode> = {
  english: <Languages className="w-8 h-8" />,
  math: <Calculator className="w-8 h-8" />,
  precalculus: <Calculator className="w-8 h-8" />,
  'ap-calculus-ab': <Calculator className="w-8 h-8" />,
  'ap-calculus-bc': <Calculator className="w-8 h-8" />,
  'ap-statistics': <Calculator className="w-8 h-8" />,
  physics: <Atom className="w-8 h-8" />,
  chemistry: <Microscope className="w-8 h-8" />,
  biology: <Microscope className="w-8 h-8" />,
  ielts: <GraduationCap className="w-8 h-8" />,
  toefl: <GraduationCap className="w-8 h-8" />,
  cs: <Monitor className="w-8 h-8" />,
  music: <Music className="w-8 h-8" />,
  art: <Palette className="w-8 h-8" />,
  geography: <Globe className="w-8 h-8" />,
}

const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
  english: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
  math: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' },
  precalculus: { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200' },
  'ap-calculus-ab': { bg: 'bg-violet-500', text: 'text-violet-600', border: 'border-violet-200' },
  'ap-calculus-bc': { bg: 'bg-fuchsia-500', text: 'text-fuchsia-600', border: 'border-fuchsia-200' },
  'ap-statistics': { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200' },
  physics: { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200' },
  chemistry: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200' },
  biology: { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-200' },
  ielts: { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-200' },
  toefl: { bg: 'bg-blue-700', text: 'text-blue-700', border: 'border-blue-200' },
  cs: { bg: 'bg-gray-700', text: 'text-gray-700', border: 'border-gray-200' },
}

// Mock concept mastery data for math
const mathConceptMastery = [
  { concept: 'Linear Equations', score: 85, totalQuestions: 20, correctAnswers: 17 },
  { concept: 'Systems of Equations', score: 60, totalQuestions: 15, correctAnswers: 9 },
  { concept: 'Fractional Equations', score: 35, totalQuestions: 10, correctAnswers: 3 },
  { concept: 'Quadratic Equations', score: 70, totalQuestions: 12, correctAnswers: 8 },
  { concept: 'Polynomials', score: 55, totalQuestions: 8, correctAnswers: 4 },
]

export default function SubjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const subjectCode = params.subjectCode as string

  const [subject, setSubject] = useState<SubjectDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubjectDetail()
  }, [subjectCode])

  const fetchSubjectDetail = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/student/subjects/${subjectCode}`)

      if (!res.ok) {
        // Use mock data if API doesn't exist
        setSubject(getMockSubjectData(subjectCode))
        setLoading(false)
        return
      }

      const data = await res.json()
      const sub = data.subject
      // If not signed up (browse-only), redirect to signup
      if (sub?.enrollmentSource === 'browse') {
        router.replace(`/student/subjects/${encodeURIComponent(subjectCode)}/signup`)
        return
      }
      setSubject(sub)
    } catch (error) {
      // Use mock data on error
      setSubject(getMockSubjectData(subjectCode))
    } finally {
      setLoading(false)
    }
  }

  const getMockSubjectData = (code: string): SubjectDetail => {
    const subjectConfigs: Record<string, Partial<SubjectDetail>> = {
      english: {
        name: 'English',
        description: 'Language arts, writing, and literature analysis',
        skills: {
          grammar: 75,
          vocabulary: 80,
          speaking: 70,
          listening: 85,
          writing: 72,
          reading: 88,
        },
      },
      math: {
        name: 'Mathematics',
        description: 'Algebra, geometry, calculus, and problem solving',
        skills: {
          algebra: 65,
          geometry: 70,
          calculus: 45,
          statistics: 60,
          probability: 55,
        },
        conceptMastery: mathConceptMastery,
      },
      physics: {
        name: 'Physics',
        description: 'Mechanics, thermodynamics, electricity, and quantum physics',
        skills: {
          mechanics: 55,
          thermodynamics: 40,
          electricity: 50,
          waves: 45,
          quantum: 30,
        },
      },
      ielts: {
        name: 'IELTS',
        description: 'International English Language Testing System preparation',
        skills: {
          listening: 75,
          reading: 80,
          writing: 70,
          speaking: 72,
          'task-1': 68,
          'task-2': 70,
        },
      },
      toefl: {
        name: 'TOEFL',
        description: 'Test of English as a Foreign Language preparation',
        skills: {
          listening: 78,
          reading: 82,
          writing: 74,
          speaking: 70,
          'integrated-tasks': 72,
          'independent-tasks': 75,
        },
      },
    }

    const config = subjectConfigs[code.toLowerCase()] || {
      name: code.charAt(0).toUpperCase() + code.slice(1),
      description: 'Subject description',
      skills: { general: 50 },
    }

    return {
      id: '1',
      code,
      category: 'academic',
      progress: 65,
      confidence: 72,
      xp: 1250,
      level: 5,
      streakDays: 3,
      totalLessons: 20,
      completedLessons: 13,
      recentLessons: [
        { id: '1', title: 'Lesson 1: Introduction', completed: true, score: 85 },
        { id: '2', title: 'Lesson 2: Fundamentals', completed: true, score: 78 },
        { id: '3', title: 'Lesson 3: Advanced Topics', completed: false },
        { id: '4', title: 'Lesson 4: Practice', completed: false },
      ],
      ...config,
    } as SubjectDetail
  }

  const getSubjectIcon = () => {
    return subjectIcons[subjectCode.toLowerCase()] || <BookOpen className="w-8 h-8" />
  }

  const getSubjectColors = () => {
    return subjectColors[subjectCode.toLowerCase()] || {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      border: 'border-blue-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-8 pb-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Subject Not Found</h2>
            <p className="text-gray-600 mb-4">The subject you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.push('/student/dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const colors = getSubjectColors()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/student/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg text-white ${colors.bg}`}>
                  {getSubjectIcon()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{subject.name}</h1>
                  <p className="text-gray-600 text-sm">{subject.description}</p>
                </div>
              </div>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Classroom</CardTitle>
            <CardDescription>
              Join live classes and view your progress for {subject.name}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href={`/student/courses?subject=${encodeURIComponent(subjectCode)}`}>
              <Button className="w-full" size="lg">
                <Target className="w-5 h-5 mr-2" />
                View upcoming classes
              </Button>
            </Link>
            <Link href="/student/scores">
              <Button className="w-full" variant="outline" size="lg">
                <Trophy className="w-5 h-5 mr-2" />
                My scores & progress
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
