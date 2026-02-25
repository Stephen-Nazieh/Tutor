/**
 * Curriculum Listing Page
 * Browse and enroll in available curriculums
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  BookOpen, 
  Clock, 
  BarChart3, 
  ChevronRight, 
  Play,
  Trophy,
  Target,
  GraduationCap,
  Code,
  Calculator,
  FlaskConical,
  Globe,
  ArrowLeft
} from 'lucide-react'

interface Curriculum {
  id: string
  name: string
  description: string | null
  subject: string
  gradeLevel: string | null
  difficulty: string
  estimatedHours: number
  hasOutline?: boolean
  _count: {
    modules: number
    lessons: number
    batches: number
  }
  progress?: {
    lessonsCompleted: number
    totalLessons: number
    averageScore: number | null
    isCompleted: boolean
  }
}

const SUBJECT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  mathematics: Calculator,
  programming: Code,
  science: FlaskConical,
  language: Globe,
  default: BookOpen
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
  expert: 'bg-purple-100 text-purple-800 border-purple-200'
}

export default function CurriculumPage() {
  const { data: session } = useSession()
  const isTutor = session?.user?.role === 'TUTOR'
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all')

  useEffect(() => {
    loadCurriculums()
  }, [activeTab])

  const loadCurriculums = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/curriculum?filter=${activeTab}`)
      if (res.ok) {
        const data = await res.json()
        setCurriculums(data.curriculums)
      }
    } catch (error) {
      console.error('Failed to load curriculums:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const enrollInCurriculum = async (curriculumId: string) => {
    try {
      const res = await fetch(`/api/curriculum/${curriculumId}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (res.ok) {
        // Refresh list
        loadCurriculums()
      }
    } catch (error) {
      console.error('Failed to enroll:', error)
    }
  }

  const filteredCurriculums = curriculums.filter(c => {
    if (activeTab === 'in-progress') return c.progress && !c.progress.isCompleted
    if (activeTab === 'completed') return c.progress?.isCompleted
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {isTutor && (
            <Link
              href="/tutor/dashboard"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to dashboard
            </Link>
          )}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Course catalog</h1>
              <p className="text-gray-600 mt-1">Choose a course and start learning with AI tutoring</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Overall progress</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {curriculums.filter(c => c.progress).length} / {curriculums.length}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
          >
            All courses
          </Button>
          <Button
            variant={activeTab === 'in-progress' ? 'default' : 'outline'}
            onClick={() => setActiveTab('in-progress')}
          >
            In progress
          </Button>
          <Button
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </Button>
        </div>

        {/* Curriculum Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-32 bg-gray-200" />
                <CardContent className="space-y-3 pt-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCurriculums.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses</h3>
            <p className="text-gray-600">
              {activeTab === 'all' 
                ? 'No courses available yet.' 
                : activeTab === 'in-progress'
                ? "You haven't started any courses."
                : "You haven't completed any courses."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCurriculums.map((curriculum) => {
              const SubjectIcon = SUBJECT_ICONS[curriculum.subject] || SUBJECT_ICONS.default
              const progress = curriculum.progress
              const progressPercent = progress 
                ? Math.round((progress.lessonsCompleted / progress.totalLessons) * 100)
                : 0

              return (
                <Card key={curriculum.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-indigo-100 rounded-lg">
                        <SubjectIcon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={DIFFICULTY_COLORS[curriculum.difficulty] || DIFFICULTY_COLORS.beginner}
                      >
                        {curriculum.difficulty === 'beginner' && 'Beginner'}
                        {curriculum.difficulty === 'intermediate' && 'Intermediate'}
                        {curriculum.difficulty === 'advanced' && 'Advanced'}
                        {curriculum.difficulty === 'expert' && 'Expert'}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{curriculum.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600">
                      {curriculum.gradeLevel && (
                        <span className="font-medium text-gray-700">{curriculum.gradeLevel}</span>
                      )}
                      {curriculum._count.batches > 0 && (
                        <span className="text-gray-500">{curriculum._count.batches} group{curriculum._count.batches !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">
                      {curriculum.description || 'No description'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{curriculum._count.modules} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{curriculum._count.lessons} lessons</span>
                      </div>
                      {curriculum.hasOutline && curriculum.estimatedHours > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{curriculum.estimatedHours} hours</span>
                        </div>
                      )}
                    </div>

                    {progress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{progressPercent}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                        <p className="text-xs text-gray-500">
                          Completed {progress.lessonsCompleted} / {progress.totalLessons} lessons
                          {progress.averageScore && (
                            <span className="ml-2">
                              Avg score: {Math.round(progress.averageScore)}%
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter>
                    {progress ? (
                      <Link href={`/curriculum/${curriculum.id}`} className="w-full">
                        <Button className="w-full" variant={progress.isCompleted ? 'outline' : 'default'}>
                          {progress.isCompleted ? (
                            <>
                              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                              View results
                            </>
                          ) : progressPercent > 0 ? (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Continue
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start learning
                            </>
                          )}
                        </Button>
                      </Link>
                    ) : isTutor ? (
                      <Link href={`/tutor/courses/${curriculum.id}/builder`} className="w-full">
                        <Button className="w-full" variant="outline">
                          <ChevronRight className="w-4 h-4 mr-2" />
                          Manage course
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => enrollInCurriculum(curriculum.id)}
                      >
                        Enroll
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
