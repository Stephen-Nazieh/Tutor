// @ts-nocheck
'use client'

/**
 * Course Development Panel - Phase 1 Enhancements
 * Features: Quick Start Templates, Smart Defaults, Quick Assign
 */

import { useState, useEffect, useTransition, startTransition } from 'react'
import {
  getLibraryTasks,
  saveLibraryTask,
  toggleFavoriteTask,
  deleteLibraryTask,
  incrementTaskUsage,
} from '@/lib/api/library-client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Wand2,
  Users,
  CheckCircle,
  Loader2,
  Send,
  Save,
  Trash2,
  Edit3,
  GraduationCap,
  BookOpen,
  FileQuestion,
  Clock,
  BarChart3,
  Sparkles,
  LayoutGrid,
  List,
  Zap,
  Heart,
  Star,
  Stethoscope,
  Eye,
  Copy,
  Square,
  CheckSquare,
  Library,
  Search,
  FolderHeart,
  UploadCloud,
  FileText,
  FileUp,
  X,
  Target,
} from 'lucide-react'
import { AssetsPanel } from './assets-panel'
import { toast } from 'sonner'
import { MemoryService } from '@/lib/ai/memory-service.client'

interface CourseDevPanelProps {
  roomId: string
  students: {
    id: string
    name: string
    userId: string
    status?: string
  }[]
}

// Phase 3: Library Task Interface
interface LibraryTask {
  id: string
  question: string
  type: 'multiple_choice' | 'short_answer'
  options?: string[]
  correctAnswer?: string
  explanation: string
  difficulty: string
  subject: string
  topics: string[]
  savedAt: string
  usedCount: number
  isFavorite: boolean
  lastUsed?: string
}

interface Library {
  tasks: LibraryTask[]
  version: number
}

// Quick Start Templates
const QUICK_TEMPLATES = [
  {
    id: 'math-algebra',
    name: 'Math: Algebra Practice',
    subject: 'Mathematics',
    topics: 'Algebra, Linear Equations, Solving for Variables',
    difficulty: 'intermediate' as const,
    count: 5,
    icon: '📐',
  },
  {
    id: 'science-forces',
    name: 'Science: Forces & Motion',
    subject: 'Physics',
    topics: "Newton's Laws, Force, Acceleration, Friction",
    difficulty: 'intermediate' as const,
    count: 8,
    icon: '⚛️',
  },
  {
    id: 'reading-comp',
    name: 'Reading Comprehension',
    subject: 'English',
    topics: 'Main Idea, Inference, Context Clues',
    difficulty: 'beginner' as const,
    count: 6,
    icon: '📚',
  },
  {
    id: 'math-geometry',
    name: 'Geometry Basics',
    subject: 'Mathematics',
    topics: 'Area, Perimeter, Circles, Triangles',
    difficulty: 'beginner' as const,
    count: 7,
    icon: '📏',
  },
]

export function CourseDevPanel({ roomId, students }: CourseDevPanelProps) {
  const [step, setStep] = useState<'generate' | 'review' | 'assign'>('generate')
  const [isGenerating, setIsGenerating] = useState(false)

  // Phase 2: Inline editing
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  // Phase 2: Batch operations
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set())
  // Phase 4: Difficulty Auto-Calibration
  // No new state needed, uses existing config.difficulty

  // Phase 5: Import & Digitization
  const [showImport, setShowImport] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [importedTasks, setImportedTasks] = useState<any[]>([])
  const [importFile, setImportFile] = useState<File | null>(null)

  // Phase 14: Source Selection & Assets Integration
  const [sourceType, setSourceType] = useState<
    'lesson_transcript' | 'uploaded_documents' | 'all_sources'
  >('lesson_transcript')
  const [showAssetsPanel, setShowAssetsPanel] = useState(false)
  const [selectedAssets, setSelectedAssets] = useState<any[]>([])

  // Phase 6: Assessment Builder
  const [assignmentMode, setAssignmentMode] = useState<'practice' | 'exam'>('practice')
  const [examConfig, setExamConfig] = useState({
    title: '',
    timeLimit: 30, // minutes
    passingScore: 70, // percentage
    shuffle: true,
  })

  const [generatedTasks, setGeneratedTasks] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Phase 3: Task Library
  const [showLibrary, setShowLibrary] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [library, setLibrary] = useState<Library>({ tasks: [], version: 1 })

  const [config, setConfig] = useState({
    subject: '',
    topics: '',
    difficulty: 'intermediate',
    count: 5,
    distributionMode: 'personalized' as 'uniform' | 'personalized' | 'clustered',
    questionType: 'mixed' as 'mixed' | 'multiple_choice' | 'short_answer',
  })

  // Smart Defaults: Load from localStorage on mount
  useEffect(() => {
    const loadSmartDefaults = () => {
      try {
        const saved = localStorage.getItem('coursedev-preferences')
        if (saved) {
          const prefs = JSON.parse(saved)
          // Apply smart defaults
          if (prefs.recentSubject) {
            setConfig(prev => ({
              ...prev,
              subject: prefs.recentSubject,
              topics: prefs.recentTopics || '',
              difficulty: prefs.preferredDifficulty || 'intermediate',
            }))
          }
        }
      } catch (error) {
        console.error('Failed to load preferences:', error)
      }
    }
    loadSmartDefaults()
  }, [])

  useEffect(() => {
    let isMounted = true
    const loadLibrary = async () => {
      try {
        const tasks = await getLibraryTasks()
        if (!isMounted) return
        setLibrary({ tasks, version: 1 })
      } catch (error) {
        console.error('Failed to load library tasks:', error)
      }
    }
    loadLibrary()
    return () => {
      isMounted = false
    }
  }, [])

  // Save preferences when generating
  const savePreferences = () => {
    try {
      localStorage.setItem(
        'coursedev-preferences',
        JSON.stringify({
          recentSubject: config.subject,
          recentTopics: config.topics,
          preferredDifficulty: config.difficulty,
          lastUsed: new Date().toISOString(),
        })
      )
    } catch (error) {
      console.error('Failed to save preferences:', error)
    }
  }

  const handleGenerate = async () => {
    if (!config.subject || !config.topics) {
      toast.error('Please fill in subject and topics')
      return
    }

    // Phase 14: Validate source-specific requirements
    if (sourceType === 'uploaded_documents' && selectedAssets.length === 0) {
      toast.error('Please select materials', {
        description: 'Click "Browse & Select Materials" to choose documents',
      })
      return
    }

    setIsGenerating(true)
    savePreferences() // Save preferences for smart defaults

    // Phase 14: Build context based on source type
    let contextPrompt = ''

    if (sourceType === 'lesson_transcript') {
      contextPrompt = `Generate tasks based on today's classroom lesson about ${config.subject}. `
      contextPrompt += `Focus on the key concepts covered: ${config.topics}. `

      // Fetch actual transcript from memory
      const transcript = MemoryService.getTranscript(roomId)
      if (transcript.length > 0) {
        const transcriptText = transcript.map((t: any) => `${t.speaker}: ${t.text}`).join('\n')
        contextPrompt += `\nLATEST TRANSCRIPT:\n${transcriptText}\n`
      } else {
        contextPrompt += `\n(No active transcript found for this session yet)\n`
      }

      contextPrompt += `Use the lesson content as the primary source. `
    } else if (sourceType === 'uploaded_documents') {
      contextPrompt = `Generate tasks based on the following uploaded materials:\n`

      // Include selected asset content
      selectedAssets.forEach(asset => {
        contextPrompt += `\n--- Document: ${asset.name} ---\n`
        contextPrompt += asset.content || asset.description || '(No text content available)'
        contextPrompt += `\n----------------\n`
      })

      contextPrompt += `\nSubject: ${config.subject}. Topics to cover: ${config.topics}. `
      contextPrompt += `Use only the content from these documents. `
    } else if (sourceType === 'all_sources') {
      contextPrompt = `Generate comprehensive tasks for ${config.subject} covering ${config.topics}. `

      // Combine Transcript
      const transcript = MemoryService.getTranscript(roomId)
      if (transcript.length > 0) {
        const transcriptText = transcript.map((t: any) => `${t.speaker}: ${t.text}`).join('\n')
        contextPrompt += `\nLATEST TRANSCRIPT:\n${transcriptText}\n`
      }

      // Combine Docs
      if (selectedAssets.length > 0) {
        contextPrompt += `\nREFERENCE MATERIALS:\n`
        selectedAssets.forEach(asset => {
          contextPrompt += `${asset.name}: ${asset.content || asset.description || 'No content'}\n`
        })
      }

      contextPrompt += `Use lesson content, provided materials, and your general knowledge. `
    }

    // Simulate generation with context
    setTimeout(() => {
      const mockTasks = Array.from({ length: config.count }, (_, i) => {
        let type = config.questionType
        if (type === 'mixed') {
          type = i % 2 === 0 ? 'multiple_choice' : 'short_answer'
        }

        // Add source indicator to question for demo
        const sourceIndicator =
          sourceType === 'lesson_transcript'
            ? '[From Lesson]'
            : sourceType === 'uploaded_documents'
              ? '[From Docs]'
              : '[All Sources]'

        return {
          id: `task-${Date.now()}-${i}`,
          type: type === 'multiple_choice' ? 'multiple_choice' : 'short_answer',
          question: `${sourceIndicator} Sample ${config.subject} question ${i + 1} (${type}) about ${config.topics.split(',')[0]?.trim() || 'topic'}`,
          options:
            type === 'multiple_choice'
              ? ['Option A', 'Option B', 'Option C', 'Option D']
              : undefined,
          correctAnswer: type === 'multiple_choice' ? 'Option A' : undefined,
          explanation: `This tests understanding of core concepts. ${contextPrompt.substring(0, 100)}...`,
          difficulty: config.difficulty,
        }
      })
      setGeneratedTasks(mockTasks)
      setStep('review')
      setIsGenerating(false)

      // Enhanced success message showing source
      const sourceLabel =
        sourceType === 'lesson_transcript'
          ? 'lesson transcript'
          : sourceType === 'uploaded_documents'
            ? `${selectedAssets.length} document(s)`
            : 'all sources'

      toast.success(`Generated ${mockTasks.length} tasks from ${sourceLabel}`)
    }, 1500)
  }

  // Quick Assign: Generate and assign in one click
  const handleQuickAssign = async (target: 'all' | 'struggling') => {
    if (!config.subject || !config.topics) {
      toast.error('Please fill in subject and topics first')
      return
    }

    setIsGenerating(true)
    savePreferences()

    // Simulate generation + assignment
    setTimeout(() => {
      const taskCount = config.count
      const targetStudents =
        target === 'all' ? students : students.filter(s => s.status === 'struggling')

      toast.success(
        `✅ Generated ${taskCount} tasks and assigned to ${targetStudents.length} student${targetStudents.length !== 1 ? 's' : ''}!`,
        {
          description:
            target === 'struggling' ? 'Helping struggling students' : 'Assigned to all students',
          duration: 4000,
        }
      )

      setIsGenerating(false)
    }, 1500)
  }

  // Load template
  const loadTemplate = (template: (typeof QUICK_TEMPLATES)[0]) => {
    setConfig(prev => ({
      ...prev,
      subject: template.subject,
      topics: template.topics,
      difficulty: template.difficulty as 'beginner' | 'intermediate' | 'advanced',
      count: template.count,
      distributionMode: 'personalized',
    }))
    toast.success(`Loaded template: ${template.name}`)
  }

  // Phase 2: Update task
  const updateTask = (taskId: string, updates: Partial<any>) => {
    setGeneratedTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, ...updates } : task))
    )
  }

  // Phase 2: Duplicate task
  const duplicateTask = (taskId: string) => {
    const task = generatedTasks.find(t => t.id === taskId)
    if (task) {
      const newTask = { ...task, id: `task-${Date.now()}` }
      setGeneratedTasks(prev => [...prev, newTask])
      toast.success('Task duplicated')
    }
  }

  // Phase 2: Delete task
  const deleteTask = (taskId: string) => {
    setGeneratedTasks(prev => prev.filter(t => t.id !== taskId))
    setSelectedTasks(prev => {
      const next = new Set(prev)
      next.delete(taskId)
      return next
    })
    toast.success('Task deleted')
  }

  // Phase 2: Batch operations
  const toggleSelectAll = () => {
    if (selectedTasks.size === generatedTasks.length) {
      setSelectedTasks(new Set())
    } else {
      setSelectedTasks(new Set(generatedTasks.map(t => t.id)))
    }
  }

  const bulkDelete = () => {
    setGeneratedTasks(prev => prev.filter(t => !selectedTasks.has(t.id)))
    toast.success(`Deleted ${selectedTasks.size} tasks`)
    setSelectedTasks(new Set())
  }

  const bulkSetDifficulty = (difficulty: string) => {
    setGeneratedTasks(prev =>
      prev.map(task => (selectedTasks.has(task.id) ? { ...task, difficulty } : task))
    )
    toast.success(`Updated ${selectedTasks.size} tasks to ${difficulty}`)
    setSelectedTasks(new Set())
  }

  // Phase 2: Generate sample preview
  const generatePreview = () => {
    if (!config.subject || !config.topics) return null
    const topic = config.topics.split(',')[0]?.trim() || 'topic'
    return `Solve for x: 2x + 5 = 13 (${topic})`
  }

  // Phase 3: Library helpers

  // Phase 3: Save to library (Server Action)
  const saveToLibrary = async (task: any) => {
    startTransition(async () => {
      try {
        const newTask = await saveLibraryTask({
          ...task,
          subject: config.subject,
          topics: config.topics.split(',').map(t => t.trim()),
        })

        setLibrary(prev => ({
          ...prev,
          tasks: [...prev.tasks, newTask as any],
        }))
        toast.success('Task saved to library')
      } catch (error) {
        toast.error('Failed to save task')
      }
    })
  }

  // Phase 3: Add from library (Server Action)
  const addFromLibrary = async (libraryTask: LibraryTask) => {
    const newTask = {
      ...libraryTask,
      id: `task-${Date.now()}`,
    }

    setGeneratedTasks(prev => [...prev, newTask])

    // Update usage stats on server
    startTransition(async () => {
      await incrementTaskUsage(libraryTask.id)

      // Optimistic update
      setLibrary(prev => ({
        ...prev,
        tasks: prev.tasks.map(t =>
          t.id === libraryTask.id
            ? { ...t, usedCount: t.usedCount + 1, lastUsed: new Date().toISOString() }
            : t
        ),
      }))
    })

    toast.success('Task added from library')
  }

  // Phase 3: Toggle favorite (Server Action)
  const toggleFavorite = async (taskId: string) => {
    // Optimistic update
    setLibrary(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => (t.id === taskId ? { ...t, isFavorite: !t.isFavorite } : t)),
    }))

    startTransition(async () => {
      try {
        await toggleFavoriteTask(taskId)
      } catch (error) {
        // Revert on failure
        setLibrary(prev => ({
          ...prev,
          tasks: prev.tasks.map(t => (t.id === taskId ? { ...t, isFavorite: !t.isFavorite } : t)),
        }))
        toast.error('Failed to update favorite')
      }
    })
  }

  // Phase 3: Delete from library (Server Action)
  const deleteFromLibrary = async (taskId: string) => {
    // Optimistic update
    const previousLibrary = library
    setLibrary(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId),
    }))

    startTransition(async () => {
      try {
        await deleteLibraryTask(taskId)
        toast.success('Task removed from library')
      } catch (error) {
        // Revert
        setLibrary(previousLibrary)
        toast.error('Failed to delete task')
      }
    })
  }

  // Phase 3: Get filtered library tasks
  const getFilteredLibraryTasks = () => {
    let tasks = library.tasks

    if (showFavoritesOnly) {
      tasks = tasks.filter(t => t.isFavorite)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      tasks = tasks.filter(
        t =>
          t.question.toLowerCase().includes(query) ||
          t.subject.toLowerCase().includes(query) ||
          t.topics.some(topic => topic.toLowerCase().includes(query))
      )
    }

    // Sort by favorites first, then by usage
    return tasks.sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) {
        return a.isFavorite ? -1 : 1
      }
      return b.usedCount - a.usedCount
    })
  }

  // Phase 4: Auto-detect difficulty
  const autoDetectDifficulty = () => {
    const total = students.length
    if (total === 0) return

    const struggling = students.filter(s => s.status === 'struggling').length
    const onTrack = students.filter(s => s.status === 'on_track').length

    let suggestedDifficulty = 'intermediate'
    let reasoning = ''

    if (struggling / total > 0.3) {
      suggestedDifficulty = 'beginner'
      reasoning = `Detected ${Math.round((struggling / total) * 100)}% struggling students. Suggesting Beginner difficulty.`
    } else if (onTrack / total > 0.6) {
      suggestedDifficulty = 'advanced'
      reasoning = `Detected ${Math.round((onTrack / total) * 100)}% on-track students. Suggesting Advanced difficulty.`
    } else {
      suggestedDifficulty = 'intermediate'
      reasoning = 'Class performance is balanced. Suggesting Intermediate difficulty.'
    }

    setConfig(prev => ({ ...prev, difficulty: suggestedDifficulty }))
    toast.success('Difficulty Adjusted', { description: reasoning })
  }

  // Phase 5: Import & Digitization Logic
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large', { description: 'Please upload a file smaller than 5MB' })
      return
    }

    setImportFile(file)
    simulateOCR(file)
  }

  const simulateOCR = async (file: File) => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    // Simulate analysis time (2s)
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearInterval(interval)
    setAnalysisProgress(100)

    // Mock results based on filename
    const mockTasks = [
      {
        id: `imported-${Date.now()}-1`,
        question: 'What is the primary function of the mitochondria?',
        type: 'multiple_choice',
        options: ['Energy production', 'Protein synthesis', 'Waste disposal', 'Cell division'],
        correctAnswer: 'Energy production',
        subject: 'Biology',
        topics: ['Cell Biology'],
        difficulty: 'intermediate',
      },
      {
        id: `imported-${Date.now()}-2`,
        question: 'Describe the process of osmosis.',
        type: 'short_answer',
        subject: 'Biology',
        topics: ['Cell Biology'],
        difficulty: 'intermediate',
      },
      {
        id: `imported-${Date.now()}-3`,
        question: "Which organelle is known as the 'brain' of the cell?",
        type: 'multiple_choice',
        options: ['Nucleus', 'Ribosome', 'Golgi apparatus', 'Endoplasmic reticulum'],
        correctAnswer: 'Nucleus',
        subject: 'Biology',
        topics: ['Cell Biology'],
        difficulty: 'beginner',
      },
    ]

    setImportedTasks(mockTasks)
    setIsAnalyzing(false)
    toast.success('Analysis Complete', {
      description: `Extracted ${mockTasks.length} questions from ${file.name}`,
    })
  }

  const importExtractedTasks = () => {
    setGeneratedTasks(prev => [...prev, ...importedTasks])
    setShowImport(false)
    setImportedTasks([])
    setImportFile(null)
    setStep('review')
    toast.success('Import Successful', {
      description: `Added ${importedTasks.length} tasks to your set`,
    })
  }

  const getStatusCounts = () => ({
    total: students.length,
    onTrack: students.filter(s => s.status === 'on_track').length,
    needHelp: students.filter(s => s.status === 'needs_help').length,
    struggling: students.filter(s => s.status === 'struggling').length,
  })

  const counts = getStatusCounts()

  // Phase 14: Handle Assets Selection
  const handleAssetsSelect = (assets: any[]) => {
    setSelectedAssets(assets)
    setShowAssetsPanel(false)
    toast.success(`Selected ${assets.length} material(s)`, {
      description: 'Assets ready for AI task generation',
    })
  }

  return (
    <div className="flex h-full flex-col bg-gray-900 text-white">
      {/* Progress Steps */}
      <div className="border-b border-gray-700 bg-gray-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep('generate')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
              step === 'generate' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                step === 'generate' ? 'bg-white text-blue-600' : 'bg-gray-700'
              }`}
            >
              1
            </div>
            <span className="font-medium">Configure</span>
          </button>
          <div className="h-px w-8 bg-gray-700" />
          <button
            onClick={() => generatedTasks.length > 0 && setStep('review')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
              step === 'review'
                ? 'bg-blue-600 text-white'
                : generatedTasks.length > 0
                  ? 'text-gray-400 hover:text-white'
                  : 'cursor-not-allowed text-gray-600'
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                step === 'review'
                  ? 'bg-white text-blue-600'
                  : generatedTasks.length > 0
                    ? 'bg-gray-700'
                    : 'bg-gray-800'
              }`}
            >
              2
            </div>
            <span className="font-medium">Review</span>
            {generatedTasks.length > 0 && (
              <Badge className="bg-blue-500">{generatedTasks.length}</Badge>
            )}
          </button>
          <div className="h-px w-8 bg-gray-700" />
          <button
            onClick={() => generatedTasks.length > 0 && setStep('assign')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
              step === 'assign'
                ? 'bg-blue-600 text-white'
                : generatedTasks.length > 0
                  ? 'text-gray-400 hover:text-white'
                  : 'cursor-not-allowed text-gray-600'
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                step === 'assign'
                  ? 'bg-white text-blue-600'
                  : generatedTasks.length > 0
                    ? 'bg-gray-700'
                    : 'bg-gray-800'
              }`}
            >
              3
            </div>
            <span className="font-medium">Assign</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {step === 'generate' && (
          <div className="flex h-full">
            {/* Configuration Form */}
            <div className="flex-1 overflow-auto p-6">
              <div className="mx-auto max-w-3xl space-y-6">
                <div>
                  <h2 className="mb-2 text-2xl font-bold">Task Configuration</h2>
                  <p className="text-gray-400">
                    Configure AI to generate personalized learning tasks
                  </p>
                </div>

                {/* Quick Start Templates */}
                <Card className="border-blue-700 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-white">
                      <Sparkles className="h-5 w-5 text-yellow-400" />
                      Quick Start Templates
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Load pre-configured templates to get started instantly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {QUICK_TEMPLATES.map(template => (
                        <button
                          key={template.id}
                          onClick={() => loadTemplate(template)}
                          className="group rounded-lg border-2 border-gray-600 bg-gray-800 p-4 text-left transition-all hover:border-blue-500 hover:bg-gray-700"
                        >
                          <div className="mb-2 flex items-center gap-3">
                            <span className="text-2xl">{template.icon}</span>
                            <div className="flex-1">
                              <div className="text-sm font-semibold transition-colors group-hover:text-blue-400">
                                {template.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {template.count} tasks • {template.difficulty}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}

                      {/* Phase 14: Browse Assets Card */}
                      <button
                        onClick={() => setShowAssetsPanel(true)}
                        className="group flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 p-4 text-left transition-all hover:border-purple-500 hover:bg-gray-800"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/30 transition-transform group-hover:scale-110">
                          <Library className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold transition-colors group-hover:text-purple-400">
                            Browse & Select Materials
                          </div>
                          <div className="text-xs text-gray-400">From Assets Panel</div>
                        </div>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-gray-900 px-4 text-gray-400">OR BUILD CUSTOM</span>
                  </div>
                </div>

                {/* Phase 14: AI Source Selection */}
                <Card className="border-purple-700/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-white">
                      <Target className="h-5 w-5 text-purple-400" />
                      AI Source Selection
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Choose where AI should generate tasks from
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {/* Lesson Transcript Option */}
                      <button
                        onClick={() => setSourceType('lesson_transcript')}
                        className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                          sourceType === 'lesson_transcript'
                            ? 'border-purple-500 bg-purple-900/30'
                            : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              sourceType === 'lesson_transcript'
                                ? 'border-purple-500'
                                : 'border-gray-500'
                            }`}
                          >
                            {sourceType === 'lesson_transcript' && (
                              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white">Lesson Transcript</div>
                            <div className="text-sm text-gray-400">
                              Generate from today's classroom session
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Uploaded Documents Option */}
                      <button
                        onClick={() => setSourceType('uploaded_documents')}
                        className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                          sourceType === 'uploaded_documents'
                            ? 'border-purple-500 bg-purple-900/30'
                            : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              sourceType === 'uploaded_documents'
                                ? 'border-purple-500'
                                : 'border-gray-500'
                            }`}
                          >
                            {sourceType === 'uploaded_documents' && (
                              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white">Uploaded Documents</div>
                            <div className="text-sm text-gray-400">
                              Generate from selected materials
                              {selectedAssets.length > 0 && ` (${selectedAssets.length} selected)`}
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* All Sources Option */}
                      <button
                        onClick={() => setSourceType('all_sources')}
                        className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                          sourceType === 'all_sources'
                            ? 'border-purple-500 bg-purple-900/30'
                            : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              sourceType === 'all_sources' ? 'border-purple-500' : 'border-gray-500'
                            }`}
                          >
                            {sourceType === 'all_sources' && (
                              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white">All Sources</div>
                            <div className="text-sm text-gray-400">
                              Lesson + Documents + General Knowledge
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Selected Materials Display */}
                    {selectedAssets.length > 0 && (
                      <div className="mt-4 rounded-lg border border-gray-700 bg-gray-800/50 p-3">
                        <div className="mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-400" />
                          <span className="text-sm font-medium text-gray-300">
                            Selected Materials:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedAssets.map((asset, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="border-purple-700 bg-purple-900/30 text-purple-300"
                            >
                              {asset.name || `Asset ${idx + 1}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="border-gray-700 bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base text-white">
                        <BookOpen className="h-4 w-4 text-blue-400" />
                        Subject & Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Subject</Label>
                        <Input
                          placeholder="e.g., Mathematics"
                          value={config.subject}
                          onChange={e => setConfig({ ...config, subject: e.target.value })}
                          className="border-gray-600 bg-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Topics</Label>
                        <Textarea
                          placeholder="e.g., Algebra, Linear Equations, Quadratic Functions"
                          value={config.topics}
                          onChange={e => setConfig({ ...config, topics: e.target.value })}
                          className="min-h-[100px] border-gray-600 bg-gray-700 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-700 bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base text-white">
                        <BarChart3 className="h-4 w-4 text-green-400" />
                        Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-300">Difficulty</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={autoDetectDifficulty}
                            className="h-6 px-2 text-xs text-blue-400 hover:text-blue-300"
                          >
                            <Sparkles className="mr-1 h-3 w-3" />
                            Auto-detect
                          </Button>
                        </div>
                        <Select
                          value={config.difficulty}
                          onValueChange={v => setConfig({ ...config, difficulty: v })}
                        >
                          <SelectTrigger className="border-gray-600 bg-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Distribution Mode</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { key: 'uniform', label: 'Same for all students' },
                            { key: 'personalized', label: 'Personalized to each student' },
                            { key: 'clustered', label: 'By performance cluster' },
                          ].map(({ key, label }) => (
                            <button
                              key={key}
                              onClick={() => setConfig({ ...config, distributionMode: key as any })}
                              className={`rounded-lg border p-3 text-left transition-colors ${
                                config.distributionMode === key
                                  ? 'border-blue-500 bg-blue-500/20'
                                  : 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {config.distributionMode === key && (
                                  <CheckCircle className="h-4 w-4 text-blue-400" />
                                )}
                                <span className="text-sm">{label}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Number of Tasks: {config.count}</Label>
                        <input
                          type="range"
                          min={1}
                          max={20}
                          value={config.count}
                          onChange={e => setConfig({ ...config, count: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Phase 2: Live Preview */}
                {(config.subject || config.topics) && (
                  <Card className="border-2 border-blue-600 bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm text-white">
                        <Eye className="h-4 w-4 text-blue-400" />
                        Live Preview
                      </CardTitle>
                      <CardDescription className="text-xs text-gray-400">
                        Sample question based on your configuration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg bg-gray-700 p-4">
                        <p className="mb-3 text-sm text-gray-300">{generatePreview()}</p>
                        <div className="space-y-1.5">
                          <div className="rounded bg-gray-600 px-3 py-2 text-xs text-gray-300">
                            A. x = 3
                          </div>
                          <div className="rounded border border-green-700 bg-green-900/50 px-3 py-2 text-xs text-green-300">
                            B. x = 4 ✓
                          </div>
                          <div className="rounded bg-gray-600 px-3 py-2 text-xs text-gray-300">
                            C. x = 8
                          </div>
                          <div className="rounded bg-gray-600 px-3 py-2 text-xs text-gray-300">
                            D. x = 9
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-gray-500">
                          💡 This is a sample. Actual questions will vary.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !config.subject || !config.topics}
                  className="h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Tasks...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate {config.count} Tasks
                    </>
                  )}
                </Button>

                {/* Quick Assign Shortcuts - Phase 1 Feature */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleQuickAssign('all')}
                      disabled={isGenerating || !config.subject || !config.topics}
                      className="h-10 border-blue-600 text-blue-400 hover:bg-blue-600/20"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Quick Assign to All
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleQuickAssign('struggling')}
                      disabled={
                        isGenerating || !config.subject || !config.topics || counts.struggling === 0
                      }
                      className="h-10 border-red-600 text-red-400 hover:bg-red-600/20"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Help Struggling {counts.struggling > 0 && `(${counts.struggling})`}
                    </Button>
                  </div>
                  <p className="text-center text-xs text-gray-500">
                    ⚡ Quick Assign skips review and assigns tasks immediately
                  </p>
                </div>
              </div>
            </div>

            {/* Student Summary Sidebar */}
            <div className="w-72 border-l border-gray-700 bg-gray-800 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Users className="h-4 w-4" />
                Students ({counts.total})
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-green-900/30 p-3">
                  <span className="text-green-400">On Track</span>
                  <span className="font-bold text-green-400">{counts.onTrack}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-yellow-900/30 p-3">
                  <span className="text-yellow-400">Need Help</span>
                  <span className="font-bold text-yellow-400">{counts.needHelp}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-red-900/30 p-3">
                  <span className="text-red-400">Struggling</span>
                  <span className="font-bold text-red-400">{counts.struggling}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div className="flex h-full flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-6 py-3">
              <div className="flex items-center gap-4">
                {/* Phase 2: Batch Selection */}
                <div className="flex items-center gap-2">
                  <button onClick={toggleSelectAll} className="rounded p-1 hover:bg-gray-700">
                    {selectedTasks.size === generatedTasks.length ? (
                      <CheckSquare className="h-4 w-4 text-blue-400" />
                    ) : (
                      <Square className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  <h3 className="font-semibold">
                    {selectedTasks.size > 0 ? (
                      <span>
                        {selectedTasks.size} of {generatedTasks.length} Selected
                      </span>
                    ) : (
                      <span>{generatedTasks.length} Tasks Generated</span>
                    )}
                  </h3>
                </div>

                {/* Phase 2: Bulk Actions */}
                {selectedTasks.size > 0 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={bulkDelete}
                      className="h-8 border-red-600 text-red-400"
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                    <Select onValueChange={bulkSetDifficulty}>
                      <SelectTrigger className="h-8 w-32 bg-gray-700">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Set Easy</SelectItem>
                        <SelectItem value="intermediate">Set Medium</SelectItem>
                        <SelectItem value="advanced">Set Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Phase 3: Library Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLibrary(true)}
                  className="h-8 border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                >
                  <Library className="mr-2 h-4 w-4" />
                  Library
                </Button>

                <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`rounded p-1.5 ${viewMode === 'grid' ? 'bg-gray-600' : ''}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`rounded p-1.5 ${viewMode === 'list' ? 'bg-gray-600' : ''}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setStep('generate')}>
                  Back
                </Button>
                <Button onClick={() => setStep('assign')}>
                  Continue to Assign
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tasks Grid */}
            <ScrollArea className="flex-1 p-6">
              <div
                className={
                  viewMode === 'grid' ? 'grid grid-cols-2 gap-4 lg:grid-cols-3' : 'space-y-3'
                }
              >
                {generatedTasks.map((task, index) => (
                  <Card key={task.id} className="border-gray-700 bg-gray-800">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        {/* Phase 2: Checkbox */}
                        <button
                          onClick={() => {
                            const next = new Set(selectedTasks)
                            if (next.has(task.id)) {
                              next.delete(task.id)
                            } else {
                              next.add(task.id)
                            }
                            setSelectedTasks(next)
                          }}
                          className="mr-3 mt-1"
                        >
                          {selectedTasks.has(task.id) ? (
                            <CheckSquare className="h-5 w-5 text-blue-400" />
                          ) : (
                            <Square className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        <div className="flex-1">
                          <Badge
                            className="mb-2"
                            variant={task.type === 'multiple_choice' ? 'default' : 'secondary'}
                          >
                            {task.type === 'multiple_choice' ? 'Multiple Choice' : 'Short Answer'}
                          </Badge>
                          <CardTitle className="text-sm text-white">Task {index + 1}</CardTitle>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          {/* Phase 3: Save Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
                            onClick={() => saveToLibrary(task)}
                            title="Save to Library"
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          {/* Phase 2: Duplicate Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => duplicateTask(task.id)}
                            title="Duplicate"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400"
                            onClick={() => deleteTask(task.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Phase 2: Editable Question */}
                      {editingTaskId === task.id ? (
                        <Input
                          value={task.question}
                          onChange={e => updateTask(task.id, { question: e.target.value })}
                          onBlur={() => setEditingTaskId(null)}
                          autoFocus
                          className="border-blue-600 bg-gray-700 text-white"
                        />
                      ) : (
                        <p
                          className="cursor-pointer text-sm text-gray-300 transition-colors hover:text-blue-400"
                          onClick={() => setEditingTaskId(task.id)}
                          title="Click to edit"
                        >
                          {task.question}
                        </p>
                      )}
                      {task.options && (
                        <div className="space-y-1">
                          {task.options.map((opt: string, i: number) => (
                            <div
                              key={i}
                              className={`rounded px-3 py-1.5 text-sm ${
                                opt === task.correctAnswer
                                  ? 'border border-green-700 bg-green-900/50 text-green-300'
                                  : 'bg-gray-700 text-gray-400'
                              }`}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {step === 'assign' && (
          <div className="flex h-full">
            {/* Assignment Options */}
            <div className="flex-1 overflow-auto p-6">
              <div className="mx-auto max-w-3xl space-y-6">
                <div>
                  <h2 className="mb-2 text-2xl font-bold">Assign Tasks</h2>
                  <p className="text-gray-400">Choose how students will receive this content</p>
                </div>

                {/* Phase 6: Assignment Mode Toggle */}
                <Tabs
                  value={assignmentMode}
                  onValueChange={v => setAssignmentMode(v as any)}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                    <TabsTrigger value="practice">Practice Assignment</TabsTrigger>
                    <TabsTrigger value="exam">Formal Assessment (Exam)</TabsTrigger>
                  </TabsList>

                  <TabsContent value="practice" className="mt-6 space-y-6">
                    <div className="grid gap-4">
                      <Card className="cursor-pointer border-gray-700 bg-gray-800 transition-colors hover:border-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                                <GraduationCap className="h-6 w-6" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">All Students</h3>
                                <p className="text-gray-400">Assign to everyone in the session</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{counts.total}</p>
                              <p className="text-sm text-gray-400">students</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-2 gap-4">
                        <Card className="cursor-pointer border-gray-700 bg-gray-800 transition-colors hover:border-green-500">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold">On Track</h3>
                                <p className="text-sm text-gray-400">{counts.onTrack} students</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="cursor-pointer border-gray-700 bg-gray-800 transition-colors hover:border-yellow-500">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-600">
                                <Clock className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold">Need Help</h3>
                                <p className="text-sm text-gray-400">{counts.needHelp} students</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="cursor-pointer border-gray-700 bg-gray-800 transition-colors hover:border-red-500">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
                              <FileQuestion className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold">Struggling Students</h3>
                              <p className="text-sm text-gray-400">
                                {counts.struggling} students need extra support
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="exam" className="mt-6 space-y-6">
                    <Card className="border-gray-700 bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-red-500" />
                          Exam Configuration
                        </CardTitle>
                        <CardDescription>
                          Configure settings for this formal assessment
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Assessment Title</Label>
                          <Input
                            placeholder="e.g., Unit 4 Mid-Term Exam"
                            value={examConfig.title}
                            onChange={e => setExamConfig({ ...examConfig, title: e.target.value })}
                            className="border-gray-600 bg-gray-900"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Time Limit (minutes)</Label>
                            <Input
                              type="number"
                              value={examConfig.timeLimit}
                              onChange={e =>
                                setExamConfig({
                                  ...examConfig,
                                  timeLimit: parseInt(e.target.value),
                                })
                              }
                              className="border-gray-600 bg-gray-900"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Passing Score (%)</Label>
                            <div className="flex items-center gap-4">
                              <input
                                type="range"
                                min="50"
                                max="100"
                                step="5"
                                value={examConfig.passingScore}
                                onChange={e =>
                                  setExamConfig({
                                    ...examConfig,
                                    passingScore: parseInt(e.target.value),
                                  })
                                }
                                className="flex-1"
                              />
                              <span className="w-12 text-right font-bold">
                                {examConfig.passingScore}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            checked={examConfig.shuffle}
                            onChange={e =>
                              setExamConfig({ ...examConfig, shuffle: e.target.checked })
                            }
                            id="shuffle"
                            className="h-4 w-4 rounded border-gray-600 bg-gray-900 text-blue-600 focus:ring-blue-500"
                          />
                          <Label htmlFor="shuffle" className="cursor-pointer">
                            Randomize question order for each student
                          </Label>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-3 rounded-lg border border-blue-800 bg-blue-900/20 p-4">
                      <div className="h-fit rounded bg-blue-900/50 p-2">
                        <Target className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-300">Exam Mode Active</h4>
                        <p className="mt-1 text-sm text-blue-200/70">
                          Students will see a timer and receive a grade upon completion. Answers
                          will be hidden until the exam is closed.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep('review')}>
                    Back
                  </Button>
                  <Button
                    className={`flex-1 ${assignmentMode === 'exam' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    onClick={() => {
                      if (assignmentMode === 'exam' && !examConfig.title) {
                        toast.error('Missing Title', {
                          description: 'Please provide a title for the exam',
                        })
                        return
                      }
                      const message =
                        assignmentMode === 'exam'
                          ? `Exam "${examConfig.title}" Published!`
                          : 'Practice tasks assigned successfully!'

                      const description =
                        assignmentMode === 'exam'
                          ? `Time limit: ${examConfig.timeLimit} mins • Passing: ${examConfig.passingScore}%`
                          : `Assigned to ${counts.total} students`

                      toast.success(message, { description })
                    }}
                  >
                    {assignmentMode === 'exam' ? (
                      <>
                        <Target className="mr-2 h-4 w-4" />
                        Publish Assessment
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Assign Tasks
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="w-72 border-l border-gray-700 bg-gray-800 p-6">
              <h3 className="mb-4 font-semibold">Assignment Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tasks:</span>
                  <span className="font-medium">{generatedTasks.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subject:</span>
                  <span className="font-medium">{config.subject || 'Not set'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Difficulty:</span>
                  <span className="font-medium capitalize">{config.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Mode:</span>
                  <span className="font-medium capitalize">{config.distributionMode}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Phase 3: Library Dialog */}
      <Dialog open={showLibrary} onOpenChange={setShowLibrary}>
        <DialogContent className="flex h-[600px] max-w-4xl flex-col border-gray-700 bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Library className="h-5 w-5 text-blue-400" />
              Task Library
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-4 border-b border-gray-800 py-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search saved tasks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="border-gray-700 bg-gray-800 pl-9 text-white focus:border-blue-500"
              />
            </div>
            <Button
              variant={showFavoritesOnly ? 'default' : 'outline'}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={
                showFavoritesOnly ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-gray-700'
              }
            >
              <Star className={`mr-2 h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              Favorites
            </Button>
          </div>

          <ScrollArea className="-mx-6 flex-1 px-6">
            <div className="grid gap-3 py-4">
              {getFilteredLibraryTasks().length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <FolderHeart className="mx-auto mb-3 h-12 w-12 opacity-20" />
                  <p>No tasks found in library</p>
                  <p className="text-sm">
                    Save tasks from the Review step to build your collection
                  </p>
                </div>
              ) : (
                getFilteredLibraryTasks().map(task => (
                  <Card
                    key={task.id}
                    className="border-gray-700 bg-gray-800 transition-colors hover:border-gray-600"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="border-gray-700 bg-gray-900 text-gray-400"
                            >
                              {task.subject}
                            </Badge>
                            <Badge variant="secondary">
                              {task.type === 'multiple_choice' ? 'MC' : 'SA'}
                            </Badge>
                            {task.topics.map((t, i) => (
                              <span key={i} className="text-xs text-gray-500">
                                {t}
                              </span>
                            ))}
                          </div>
                          <p className="font-medium text-white">{task.question}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>Used {task.usedCount} times</span>
                            <span>•</span>
                            <span>Saved {new Date(task.savedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" onClick={() => addFromLibrary(task)}>
                            Add to Set
                          </Button>
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleFavorite(task.id)}
                            >
                              <Star
                                className={`h-4 w-4 ${task.isFavorite ? 'fill-current text-yellow-400' : 'text-gray-500'}`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-400 hover:text-red-300"
                              onClick={() => deleteFromLibrary(task.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Phase 5: Import Dialog */}
      <Dialog
        open={showImport}
        onOpenChange={open => {
          if (!isAnalyzing) {
            setShowImport(open)
            if (!open) {
              setImportedTasks([])
              setImportFile(null)
            }
          }
        }}
      >
        <DialogContent className="max-w-3xl border-gray-700 bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileUp className="h-5 w-5 text-blue-400" />
              Import Content
            </DialogTitle>
          </DialogHeader>

          <div className="flex min-h-[400px] flex-col">
            {!importFile ? (
              <div className="relative m-4 flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gray-800/50 transition-colors hover:bg-gray-800/80">
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                  <UploadCloud className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Upload Worksheet</h3>
                <p className="mb-6 max-w-sm text-center text-gray-400">
                  Drag and drop your PDF or Image file here,
                  <br />
                  or click to browse
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> PDF
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> PNG
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> JPG
                  </span>
                </div>
              </div>
            ) : isAnalyzing ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8">
                <div className="relative mb-6 h-24 w-24">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                  <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                    {analysisProgress}%
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-medium">Analyzing Document...</h3>
                <p className="animate-pulse text-gray-400">Running OCR and extracting questions</p>
                <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                  <FileText className="h-4 w-4" />
                  {importFile.name}
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
                  <div>
                    <h3 className="font-medium">Detected Questions</h3>
                    <p className="text-sm text-gray-400">
                      {importedTasks.length} items found in {importFile.name}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setImportFile(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-4 py-4">
                    {importedTasks.map((task, i) => (
                      <Card key={i} className="border-gray-700 bg-gray-800">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-xs font-bold text-blue-400">
                              {i + 1}
                            </div>
                            <div className="flex-1 space-y-2">
                              <Input
                                value={task.question}
                                onChange={e => {
                                  const newTasks = [...importedTasks]
                                  newTasks[i].question = e.target.value
                                  setImportedTasks(newTasks)
                                }}
                                className="border-gray-600 bg-gray-900"
                              />
                              <div className="flex gap-2">
                                <Badge variant="outline">{task.type}</Badge>
                                <Badge variant="secondary">{task.difficulty}</Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex justify-end gap-3 border-t border-gray-800 p-4">
                  <Button variant="outline" onClick={() => setImportFile(null)}>
                    Back
                  </Button>
                  <Button onClick={importExtractedTasks}>
                    Import {importedTasks.length} Tasks
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Phase 14: Assets Panel Side Drawer */}
      {/* Assets Selection Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[600px] transform border-l border-gray-800 bg-gray-900 shadow-2xl transition-transform duration-300 ${showAssetsPanel ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <AssetsPanel
          roomId={roomId}
          students={students.map(s => ({
            id: s.id,
            name: s.name,
            status: (s.status === 'on_track' ? 'active' : s.status || 'active') as
              | 'active'
              | 'struggling'
              | 'idle'
              | 'needs_help',
          }))}
          selectionMode={true}
          onAssetsSelect={handleAssetsSelect}
          onClose={() => setShowAssetsPanel(false)}
        />
      </div>
    </div>
  )
}
