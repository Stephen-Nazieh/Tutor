/**
 * Curriculum Sidebar Component
 * Shows curriculum modules and lessons for the student
 * Allows linking tutoring sessions to specific lessons
 */

'use client'

import { useState, useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChevronDown, ChevronRight, BookOpen, CheckCircle, Circle, PlayCircle, GraduationCap, PanelLeft, PanelLeftClose } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Lesson {
  id: string
  title: string
  order: number
  duration: number
  difficulty: string
  progress?: {
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
    completedAt?: string
    score?: number
  }
}

interface Module {
  id: string
  title: string
  description: string
  order: number
  estimatedHours: number
  skills: string[]
  lessons: Lesson[]
}

interface Curriculum {
  id: string
  name: string
  category: string
  description: string
  modules: Module[]
}

interface CurriculumSidebarProps {
  curriculum: Curriculum
  currentLessonId?: string
  onSelectLesson?: (lesson: Lesson, module: Module) => void
  compact?: boolean
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function CurriculumSidebar({
  curriculum,
  currentLessonId,
  onSelectLesson,
  compact = false,
  collapsed = false,
  onToggleCollapse
}: CurriculumSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  
  // Expand first incomplete module by default
  useEffect(() => {
    if (curriculum.modules.length > 0) {
      for (const module of curriculum.modules) {
        const hasIncomplete = module.lessons.some(
          l => !l.progress || l.progress.status !== 'COMPLETED'
        )
        if (hasIncomplete) {
          setExpandedModules(new Set([module.id]))
          break
        }
      }
    }
  }, [curriculum.modules])

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.progress?.status === 'COMPLETED') {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    }
    if (lesson.progress?.status === 'IN_PROGRESS') {
      return <PlayCircle className="w-4 h-4 text-blue-500" />
    }
    return <Circle className="w-4 h-4 text-gray-300" />
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  // Calculate overall progress
  const totalLessons = curriculum.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessons = curriculum.modules.reduce(
    (acc, m) => acc + m.lessons.filter(l => l.progress?.status === 'COMPLETED').length,
    0
  )
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  // Collapsed mode - icon bar
  if (collapsed) {
    return (
      <div className="w-16 flex flex-col items-center py-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className="mb-2"
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
        
        <div className="w-8 h-px bg-gray-200 my-2" />
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-2">
          <GraduationCap className="w-5 h-5 text-purple-600" />
        </div>
        
        <div className="text-center">
          <span className="text-xs font-bold text-purple-600">{Math.round(progressPercentage)}%</span>
        </div>
        
        <div className="w-8 h-px bg-gray-200 my-2" />
        
        <div className="flex flex-col items-center gap-1">
          {curriculum.modules.slice(0, 4).map((module, idx) => (
            <div 
              key={module.id}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                module.lessons.some(l => l.progress?.status === 'COMPLETED') 
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              )}
              title={module.title}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="space-y-3">
        <div className="p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-sm">{curriculum.name}</span>
          </div>
          <Progress value={progressPercentage} className="mt-2 h-1.5" />
          <p className="text-xs text-gray-500 mt-1">
            {completedLessons}/{totalLessons} lessons completed
          </p>
        </div>
        
        <div className="space-y-1">
          {curriculum.modules.slice(0, 2).map(module => (
            <div key={module.id} className="text-sm">
              <p className="font-medium text-gray-700 truncate">{module.title}</p>
              <div className="flex gap-1 mt-1">
                {module.skills.slice(0, 2).map(skill => (
                  <Badge key={skill} variant="secondary" className="text-xs capitalize">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Curriculum Header */}
      <div className="p-4 border-b bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">{curriculum.name}</h3>
          </div>
          {onToggleCollapse && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleCollapse}>
              <PanelLeftClose className="w-4 h-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{curriculum.description}</p>
        
        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>
      </div>

      {/* Modules List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {curriculum.modules.map((module, index) => {
            const isExpanded = expandedModules.has(module.id)
            const completedInModule = module.lessons.filter(
              l => l.progress?.status === 'COMPLETED'
            ).length
            
            return (
              <div key={module.id} className="border rounded-lg overflow-hidden">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors text-left"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      Module {index + 1}: {module.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {completedInModule}/{module.lessons.length} lessons • {module.estimatedHours}h
                    </p>
                  </div>
                </button>

                {/* Lessons List */}
                {isExpanded && (
                  <div className="border-t bg-gray-50/50">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson?.(lesson, module)}
                        className={`w-full p-3 flex items-start gap-2 text-left hover:bg-white transition-colors ${
                          currentLessonId === lesson.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                        }`}
                      >
                        {getLessonIcon(lesson)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{lesson.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">{lesson.duration} min</span>
                            <Badge className={`text-xs ${getDifficultyColor(lesson.difficulty)}`}>
                              {lesson.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export function CurriculumMiniCard({ curriculumId }: { curriculumId: string }) {
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCurriculum()
  }, [curriculumId])

  const fetchCurriculum = async () => {
    try {
      const res = await fetch(`/api/curriculum`)
      const data = await res.json()
      if (data.curriculum) {
        setCurriculum(data.curriculum)
      }
    } catch (error) {
      console.error('Failed to load curriculum:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-4 border rounded-lg animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
      </div>
    )
  }

  if (!curriculum) return null

  return (
    <div className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-purple-600" />
        <span className="font-medium">{curriculum.name}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{curriculum.modules.length} modules</p>
    </div>
  )
}
