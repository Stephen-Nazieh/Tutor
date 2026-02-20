'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
  DropAnimation,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import {
  Plus,
  Trash2,
  Copy,
  FileText,
  Video,
  Image as ImageIcon,
  FileQuestion,
  ChevronRight,
  ChevronDown,
  Save,
  Wand2,
  BookOpen,
  Layers,
  Upload,
  CheckCircle,
  Clock,
  GraduationCap,
  ListTodo,
  Home,
  BrainCircuit,
  GripVertical,
  MoreVertical,
  X,
  Lightbulb,
  LayoutTemplate,
  Sparkles,
  History,
  RotateCcw,
  Check,
  Zap,
  PenTool,
  Users,
  MonitorPlay,
  Gamepad2,
  Code,
  Send,
  Paperclip,
  Mic,
  Play,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Shield,
  Loader2,
  BarChart3,
  Signal,
  SignalHigh,
  SignalLow,
  Layers2
} from 'lucide-react'

// ============================================
// ENHANCED TYPES - Hierarchical Structure
// ============================================

export interface Video {
  id: string
  title: string
  url: string
  duration: number
  thumbnail?: string
}

export interface Image {
  id: string
  title: string
  url: string
  alt?: string
}

export interface Document {
  id: string
  title: string
  url: string
  type: 'pdf' | 'doc' | 'ppt' | 'other'
}

export interface Task extends WithDifficultyVariants {
  id: string
  title: string
  description: string
  instructions: string
  estimatedMinutes: number
  points: number
  submissionType: 'text' | 'file' | 'link' | 'none' | 'questions'
  isAiGraded: boolean
  rubric?: string
  /** @protected Instructor-only answer key */
  answerKey?: string
  /** @protected Whether answer key is encrypted/protected */
  answerKeyProtected?: boolean
  /** Questions for question-based tasks */
  questions?: QuizQuestion[]
  /** Whether questions are randomized */
  randomizeQuestions?: boolean
  /** When false, not visible to students (draft) */
  isPublished?: boolean
}

export interface Homework {
  id: string
  title: string
  description: string
  instructions: string
  dueDate?: string
  estimatedMinutes: number
  points: number
  submissionType: 'text' | 'file' | 'link' | 'multiple' | 'questions'
  allowLateSubmission: boolean
  latePenalty?: number
  /** @protected Instructor-only answer key */
  answerKey?: string
  /** @protected Whether answer key is encrypted/protected */
  answerKeyProtected?: boolean
  /** Questions for question-based homework */
  questions?: QuizQuestion[]
  /** Whether questions are randomized */
  randomizeQuestions?: boolean
  /** Time limit for completion (optional) */
  timeLimit?: number
  /** When false, not visible to students (draft) */
  isPublished?: boolean
}

export interface QuizQuestion {
  id: string
  type: 'mcq' | 'truefalse' | 'shortanswer' | 'essay'
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  points: number
  explanation?: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  timeLimit?: number
  attemptsAllowed: number
  questions: QuizQuestion[]
  passingScore?: number
  showCorrectAnswers: boolean
  randomizeQuestions: boolean
  /** @protected When true, correct answers are never shown to students */
  answersNeverVisible?: boolean
  /** When false, not visible to students (draft) */
  isPublished?: boolean
}

export interface Content {
  id: string
  title: string
  type: 'text' | 'video' | 'audio' | 'interactive' | 'embed'
  body?: string
  url?: string
  duration?: number
  order: number
}

// ============================================
// DIFFICULTY & ADAPTIVE CONTENT TYPES
// ============================================

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export type DifficultyMode = 'fixed' | 'adaptive' | 'all'

/** Partial variant for a specific difficulty level */
export interface DifficultyVariant {
  title?: string
  description?: string
  duration?: number
  instructions?: string
  points?: number
  /** Whether this variant is enabled */
  enabled?: boolean
}

/** Mixin for content that supports difficulty variants */
export interface WithDifficultyVariants {
  /** How this content handles difficulty levels */
  difficultyMode: DifficultyMode
  /** Fixed difficulty level (when mode is 'fixed') */
  fixedDifficulty?: DifficultyLevel
  /** Difficulty-specific overrides (when mode is 'adaptive') */
  variants?: {
    beginner?: DifficultyVariant
    intermediate?: DifficultyVariant
    advanced?: DifficultyVariant
  }
}

export interface Lesson extends WithDifficultyVariants {
  id: string
  title: string
  description?: string
  duration: number
  order: number
  isPublished: boolean
  prerequisites?: string[]
  media: {
    videos: Video[]
    images: Image[]
  }
  docs: Document[]
  content: Content[]
  tasks: Task[]
  homework: Homework[]
  quizzes: Quiz[]
}

export interface ModuleQuiz extends Quiz, WithDifficultyVariants {
  coverage: 'all_lessons' | 'selected_lessons'
  coveredLessonIds?: string[]
}

export interface Module extends WithDifficultyVariants {
  id: string
  title: string
  description?: string
  order: number
  isPublished: boolean
  lessons: Lesson[]
  moduleQuizzes: ModuleQuiz[]
}

// ============================================
// PROPS
// ============================================

interface CourseBuilderProps {
  courseId: string
  courseName?: string
  initialModules?: Module[]
  onSave?: (modules: Module[]) => void
}

// ============================================
// DEFAULT TEMPLATES
// ============================================

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

const DEFAULT_CONTENT = (order: number): Content => ({
  id: `content-${generateId()}`,
  title: `Content ${order + 1}`,
  type: 'text',
  body: '',
  order
})

const DEFAULT_LESSON = (order: number): Lesson => ({
  id: `lesson-${generateId()}`,
  title: `Lesson ${order + 1}`,
  description: '',
  duration: 45,
  order,
  isPublished: false,
  prerequisites: [],
  media: { videos: [], images: [] },
  docs: [],
  content: [],
  tasks: [],
  homework: [],
  quizzes: [],
  difficultyMode: 'all',
  variants: {}
})

const DEFAULT_TASK = (order: number): Task => ({
  id: `task-${generateId()}`,
  title: `Task ${order + 1}`,
  description: '',
  instructions: '',
  estimatedMinutes: 15,
  points: 10,
  submissionType: 'text',
  isAiGraded: false,
  answerKey: '',
  answerKeyProtected: true,
  questions: [],
  randomizeQuestions: false,
  difficultyMode: 'all',
  variants: {},
  isPublished: false
})

const DEFAULT_HOMEWORK = (order: number): Homework => ({
  id: `homework-${generateId()}`,
  title: `Homework ${order + 1}`,
  description: '',
  instructions: '',
  estimatedMinutes: 30,
  points: 20,
  submissionType: 'file',
  allowLateSubmission: true,
  questions: [],
  randomizeQuestions: false,
  latePenalty: 10,
  answerKey: '',
  answerKeyProtected: true,
  difficultyMode: 'all',
  variants: {},
  isPublished: false
})

const DEFAULT_QUIZ = (order: number): Quiz => ({
  id: `quiz-${generateId()}`,
  title: `Quiz ${order + 1}`,
  description: '',
  attemptsAllowed: 1,
  questions: [],
  passingScore: 70,
  showCorrectAnswers: true,
  randomizeQuestions: false,
  answersNeverVisible: false,
  difficultyMode: 'all',
  variants: {},
  isPublished: false
})

const DEFAULT_MODULE_QUIZ = (order: number): ModuleQuiz => ({
  ...DEFAULT_QUIZ(order),
  coverage: 'all_lessons'
})

const DEFAULT_MODULE = (order: number): Module => ({
  id: `module-${generateId()}`,
  title: `Module ${order + 1}`,
  description: '',
  order,
  isPublished: false,
  lessons: [],
  moduleQuizzes: [],
  difficultyMode: 'all',
  variants: {}
})

// ============================================
// AI SUGGESTIONS & TEMPLATES
// ============================================

const AI_SUGGESTIONS = [
  { id: 1, type: 'content', title: 'Add prerequisites section', description: 'Students often struggle without reviewing basics first', icon: Lightbulb },
  { id: 2, type: 'quiz', title: 'Add checkpoint quiz', description: 'Insert a 5-question quiz after this module', icon: FileQuestion },
  { id: 3, type: 'video', title: 'Replace with video', description: 'Convert this text section to a 5-min video', icon: Video },
  { id: 4, type: 'activity', title: 'Add group activity', description: 'Collaborative exercise for peer learning', icon: Users },
  { id: 5, type: 'assessment', title: 'Add practice problems', description: '3 similar problems with varying difficulty', icon: PenTool }
]

const CONTENT_TEMPLATES = [
  {
    id: 'lesson-standard',
    name: 'Standard Lesson',
    category: 'lesson',
    description: 'Title, content, and summary format',
    icon: BookOpen
  },
  {
    id: 'lesson-video',
    name: 'Video Lesson',
    category: 'lesson',
    description: 'Video-based lesson with discussion questions',
    icon: Video
  },
  {
    id: 'quiz-mcq',
    name: 'Multiple Choice Quiz',
    category: 'quiz',
    description: 'Standard multiple choice assessment',
    icon: FileQuestion
  },
  {
    id: 'activity-interactive',
    name: 'Interactive Activity',
    category: 'activity',
    description: 'Drag-drop or interactive exercise',
    icon: Gamepad2
  },
  {
    id: 'assessment-project',
    name: 'Project Assignment',
    category: 'assessment',
    description: 'Long-form project with rubric',
    icon: PenTool
  },
  {
    id: 'lesson-flipped',
    name: 'Flipped Classroom',
    category: 'lesson',
    description: 'Pre-work video + in-class activity',
    icon: MonitorPlay
  }
]

// ============================================
// BUILDER MODAL COMPONENTS
// ============================================

interface BuilderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  initialData?: any
}

// Module Builder Modal
function ModuleBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  const [data, setData] = useState(initialData || { title: '', description: '' })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Module Builder
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Module Title *</Label>
            <Input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Enter module title"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="What will students learn in this module?"
              rows={3}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={data.isPublished}
              onCheckedChange={(checked) => setData({ ...data, isPublished: checked })}
            />
            <Label>Published (visible to students)</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(data)}>Save Module</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Lesson Builder Modal
function LessonBuilderModal({ isOpen, onClose, onSave, initialData, allLessons = [] }: BuilderModalProps & { allLessons?: Lesson[] }) {
  const [data, setData] = useState<Lesson>(initialData || DEFAULT_LESSON(0))
  const [activeVariant, setActiveVariant] = useState<DifficultyLevel>('beginner')

  const updateVariant = (level: DifficultyLevel, updates: Partial<DifficultyVariant>) => {
    setData({
      ...data,
      variants: {
        ...data.variants,
        [level]: { ...data.variants?.[level], ...updates }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-500" />
            Lesson Builder
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Difficulty Mode Section */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Difficulty Settings
            </Label>

            <Select
              value={data.difficultyMode}
              onValueChange={(v: DifficultyMode) => setData({ ...data, difficultyMode: v })}
            >
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">📋 All Levels (Same content for everyone)</SelectItem>
                <SelectItem value="fixed">🎯 Fixed Level (Only for specific level)</SelectItem>
                <SelectItem value="adaptive">🔄 Adaptive (Different content per level)</SelectItem>
              </SelectContent>
            </Select>

            {/* Fixed Difficulty Selector */}
            {data.difficultyMode === 'fixed' && (
              <div className="space-y-2">
                <Label className="text-xs">Select Fixed Level</Label>
                <div className="flex gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setData({ ...data, fixedDifficulty: level })}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all",
                        data.fixedDifficulty === level
                          ? level === 'beginner'
                            ? "bg-green-500 text-white border-green-500"
                            : level === 'intermediate'
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-purple-500 text-white border-purple-500"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {level === 'beginner' && <SignalLow className="h-4 w-4 inline mr-1" />}
                      {level === 'intermediate' && <Signal className="h-4 w-4 inline mr-1" />}
                      {level === 'advanced' && <SignalHigh className="h-4 w-4 inline mr-1" />}
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variants Editor (Adaptive Mode) */}
            {data.difficultyMode === 'adaptive' && (
              <div className="space-y-3 pt-2">
                <Label className="text-xs">Customize for each level:</Label>
                <div className="flex gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setActiveVariant(level)}
                      className={cn(
                        "flex-1 py-1.5 px-2 rounded text-xs font-medium transition-all border",
                        activeVariant === level
                          ? level === 'beginner'
                            ? "bg-green-100 border-green-300 text-green-700"
                            : level === 'intermediate'
                              ? "bg-blue-100 border-blue-300 text-blue-700"
                              : "bg-purple-100 border-purple-300 text-purple-700"
                          : "bg-white border-gray-200 text-gray-600"
                      )}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                      {data.variants?.[level]?.enabled && <Check className="h-3 w-3 inline ml-1" />}
                    </button>
                  ))}
                </div>

                {/* Variant Editor for Active Level */}
                <div className="bg-white rounded-lg p-3 border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-sm font-medium capitalize",
                      activeVariant === 'beginner' ? "text-green-700" :
                        activeVariant === 'intermediate' ? "text-blue-700" : "text-purple-700"
                    )}>
                      {activeVariant} Version
                    </span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={data.variants?.[activeVariant]?.enabled ?? false}
                        onCheckedChange={(checked) => updateVariant(activeVariant, { enabled: checked })}
                      />
                      <Label className="text-xs">Enable variant</Label>
                    </div>
                  </div>

                  {data.variants?.[activeVariant]?.enabled && (
                    <div className="space-y-2">
                      <Input
                        placeholder={`${activeVariant} title (optional)`}
                        value={data.variants?.[activeVariant]?.title || ''}
                        onChange={(e) => updateVariant(activeVariant, { title: e.target.value })}
                      />
                      <Textarea
                        placeholder={`${activeVariant} description (optional)`}
                        value={data.variants?.[activeVariant]?.description || ''}
                        onChange={(e) => updateVariant(activeVariant, { description: e.target.value })}
                        rows={2}
                      />
                      <Input
                        type="number"
                        placeholder={`${activeVariant} duration in minutes`}
                        value={data.variants?.[activeVariant]?.duration || ''}
                        onChange={(e) => updateVariant(activeVariant, { duration: parseInt(e.target.value) || undefined })}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Lesson Title *</Label>
            <Input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Enter lesson title (base version)"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Brief overview of this lesson (base version)"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={data.duration}
                onChange={(e) => setData({ ...data, duration: parseInt(e.target.value) || 45 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex items-center gap-2 pt-2">
                <Switch
                  checked={data.isPublished}
                  onCheckedChange={(checked) => setData({ ...data, isPublished: checked })}
                />
                <Label className="text-sm">Published</Label>
              </div>
            </div>
          </div>
          {allLessons.length > 0 && (
            <div className="space-y-2">
              <Label>Prerequisites (optional)</Label>
              <p className="text-xs text-muted-foreground">Students must complete selected lessons before accessing this one</p>
              <div className="border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
                {allLessons.map((lesson) => (
                  <label key={lesson.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.prerequisites?.includes(lesson.id)}
                      onChange={(e) => {
                        const prereqs = data.prerequisites || []
                        if (e.target.checked) {
                          setData({ ...data, prerequisites: [...prereqs, lesson.id] })
                        } else {
                          setData({ ...data, prerequisites: prereqs.filter((id: string) => id !== lesson.id) })
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{lesson.title}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(data)}>Save Lesson</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Task Builder Modal
function TaskBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  const [data, setData] = useState<Task>(initialData || DEFAULT_TASK(0))
  const [showAnswerKey, setShowAnswerKey] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState<QuizQuestion | null>(null)

  const addQuestion = (type: QuizQuestion['type']) => {
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: type === 'mcq' ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined
    }
    setData({ ...data, questions: [...(data.questions || []), newQuestion] })
    setActiveQuestion(newQuestion)
  }

  const updateQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    const newQuestions = [...(data.questions || [])]
    newQuestions[index] = { ...newQuestions[index], ...updates }
    setData({ ...data, questions: newQuestions })
  }

  const removeQuestion = (index: number) => {
    setData({ ...data, questions: (data.questions || []).filter((_, i) => i !== index) })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-orange-500" />
            Task Builder
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview (student view)</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="space-y-4 py-2">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Task Title *</Label>
                <Input
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder="e.g., Complete the reading exercise"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="Brief description of the task"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Instructions *</Label>
                <Textarea
                  value={data.instructions}
                  onChange={(e) => setData({ ...data, instructions: e.target.value })}
                  placeholder="Detailed step-by-step instructions"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Time (min)</Label>
                  <Input
                    type="number"
                    value={data.estimatedMinutes}
                    onChange={(e) => setData({ ...data, estimatedMinutes: parseInt(e.target.value) || 15 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={data.points}
                    onChange={(e) => setData({ ...data, points: parseInt(e.target.value) || 10 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Submission</Label>
                  <Select
                    value={data.submissionType}
                    onValueChange={(v: Task['submissionType']) => setData({ ...data, submissionType: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="file">File</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="questions">Questions</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Questions Section - Only when submissionType is 'questions' */}
              {data.submissionType === 'questions' && (
                <div className="border rounded-lg p-4 space-y-4 bg-orange-50/30">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center gap-2">
                      <FileQuestion className="h-4 w-4 text-orange-500" />
                      Questions ({data.questions?.length || 0})
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => addQuestion('mcq')}>
                        <Plus className="h-4 w-4 mr-1" /> MCQ
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addQuestion('truefalse')}>
                        <Plus className="h-4 w-4 mr-1" /> T/F
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addQuestion('shortanswer')}>
                        <Plus className="h-4 w-4 mr-1" /> Short
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addQuestion('essay')}>
                        <Plus className="h-4 w-4 mr-1" /> Essay
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={data.randomizeQuestions}
                      onCheckedChange={(checked) => setData({ ...data, randomizeQuestions: checked })}
                    />
                    <Label className="text-sm">Randomize question order</Label>
                  </div>
                  <div className="space-y-3">
                    {(data.questions || []).map((q, idx) => (
                      <div key={q.id} className="border rounded-lg p-4 space-y-3 bg-white">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">Q{idx + 1} - {q.type.toUpperCase()}</Badge>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              className="w-20 h-8"
                              value={q.points}
                              onChange={(e) => updateQuestion(idx, { points: parseInt(e.target.value) || 1 })}
                            />
                            <span className="text-sm text-muted-foreground">pts</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeQuestion(idx)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          value={q.question}
                          onChange={(e) => updateQuestion(idx, { question: e.target.value })}
                          placeholder="Enter question"
                          rows={2}
                        />
                        {q.type === 'mcq' && q.options && (
                          <div className="space-y-2 pl-4">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${q.id}`}
                                  checked={q.correctAnswer === opt}
                                  onChange={() => updateQuestion(idx, { correctAnswer: opt })}
                                />
                                <Input
                                  value={opt}
                                  onChange={(e) => {
                                    const newOptions = [...q.options!]
                                    newOptions[optIdx] = e.target.value
                                    updateQuestion(idx, { options: newOptions })
                                  }}
                                  placeholder={`Option ${optIdx + 1}`}
                                  className="flex-1"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {q.type === 'truefalse' && (
                          <div className="flex gap-4 pl-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctAnswer === 'True'}
                                onChange={() => updateQuestion(idx, { correctAnswer: 'True' })}
                              />
                              <span>True</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctAnswer === 'False'}
                                onChange={() => updateQuestion(idx, { correctAnswer: 'False' })}
                              />
                              <span>False</span>
                            </label>
                          </div>
                        )}
                        <Textarea
                          value={q.explanation || ''}
                          onChange={(e) => updateQuestion(idx, { explanation: e.target.value })}
                          placeholder="Explanation (shown after answering)"
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Switch
                  checked={data.isAiGraded}
                  onCheckedChange={(checked) => setData({ ...data, isAiGraded: checked })}
                />
                <Label>Enable AI grading assistance</Label>
              </div>

              {/* Answer Key Section - Protected */}
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <Label className="text-amber-700 font-medium">Instructor Answer Key (Protected)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs gap-1"
                      onClick={() => setShowAnswerKey(!showAnswerKey)}
                    >
                      {showAnswerKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      {showAnswerKey ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </div>
                {showAnswerKey ? (
                  <div className="space-y-3">
                    <Textarea
                      value={data.answerKey || ''}
                      onChange={(e) => setData({ ...data, answerKey: e.target.value })}
                      placeholder="Enter the expected answer/solution here. This is ONLY visible to instructors."
                      rows={4}
                      className="border-amber-200 bg-amber-50/30"
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={data.answerKeyProtected !== false}
                        onCheckedChange={(checked) => setData({ ...data, answerKeyProtected: checked })}
                      />
                      <Label className="text-xs text-muted-foreground">
                        <Lock className="h-3 w-3 inline mr-1" />
                        Protect answer key (never visible to students)
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded border border-dashed border-gray-200 text-center">
                    <Lock className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                    <span className="text-xs text-muted-foreground">Answer key is hidden. Click "Show" to view/edit.</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview" className="space-y-4 py-2">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <h3 className="font-semibold">{data.title}</h3>
              {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
              {data.instructions && (
                <div className="text-sm"><span className="font-medium text-muted-foreground">Instructions: </span>{data.instructions}</div>
              )}
              <p className="text-xs text-muted-foreground">{data.estimatedMinutes} min · {data.points} pts · {data.submissionType}</p>
              <h4 className="text-sm font-medium mt-4">Questions</h4>
              <QuestionsPreview questions={data.questions ?? []} />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="outline" onClick={() => onSave({ ...data, isPublished: false })}>Save as draft</Button>
          <Button onClick={() => onSave({ ...data, isPublished: true })}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Homework Builder Modal
function HomeworkBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  const [data, setData] = useState<Homework>(initialData || DEFAULT_HOMEWORK(0))
  const [showAnswerKey, setShowAnswerKey] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState<QuizQuestion | null>(null)

  const addQuestion = (type: QuizQuestion['type']) => {
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: type === 'mcq' ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined
    }
    setData({ ...data, questions: [...(data.questions || []), newQuestion] })
    setActiveQuestion(newQuestion)
  }

  const updateQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    const newQuestions = [...(data.questions || [])]
    newQuestions[index] = { ...newQuestions[index], ...updates }
    setData({ ...data, questions: newQuestions })
  }

  const removeQuestion = (index: number) => {
    setData({ ...data, questions: (data.questions || []).filter((_, i) => i !== index) })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-purple-500" />
            Homework Builder
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview (student view)</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="space-y-4 py-2">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Homework Title *</Label>
                <Input
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder="e.g., Week 1 Homework"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="Brief description"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Instructions *</Label>
                <Textarea
                  value={data.instructions}
                  onChange={(e) => setData({ ...data, instructions: e.target.value })}
                  placeholder="Detailed homework instructions"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Due Date (optional)</Label>
                  <Input
                    type="datetime-local"
                    value={data.dueDate || ''}
                    onChange={(e) => setData({ ...data, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estimated Time (min)</Label>
                  <Input
                    type="number"
                    value={data.estimatedMinutes}
                    onChange={(e) => setData({ ...data, estimatedMinutes: parseInt(e.target.value) || 30 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={data.points}
                    onChange={(e) => setData({ ...data, points: parseInt(e.target.value) || 20 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Submission Type</Label>
                  <Select
                    value={data.submissionType}
                    onValueChange={(v: Homework['submissionType']) => setData({ ...data, submissionType: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="questions">Questions</SelectItem>
                      <SelectItem value="multiple">Multiple Types</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Questions Section - Only when submissionType is 'questions' */}
              {data.submissionType === 'questions' && (
                <div className="border rounded-lg p-4 space-y-4 bg-purple-50/30">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center gap-2">
                      <FileQuestion className="h-4 w-4 text-purple-500" />
                      Questions ({data.questions?.length || 0})
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => addQuestion('mcq')}>
                        <Plus className="h-4 w-4 mr-1" /> MCQ
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addQuestion('truefalse')}>
                        <Plus className="h-4 w-4 mr-1" /> T/F
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addQuestion('shortanswer')}>
                        <Plus className="h-4 w-4 mr-1" /> Short
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addQuestion('essay')}>
                        <Plus className="h-4 w-4 mr-1" /> Essay
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={data.randomizeQuestions}
                      onCheckedChange={(checked) => setData({ ...data, randomizeQuestions: checked })}
                    />
                    <Label className="text-sm">Randomize question order</Label>
                  </div>
                  <div className="space-y-3">
                    {(data.questions || []).map((q, idx) => (
                      <div key={q.id} className="border rounded-lg p-4 space-y-3 bg-white">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">Q{idx + 1} - {q.type.toUpperCase()}</Badge>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              className="w-20 h-8"
                              value={q.points}
                              onChange={(e) => updateQuestion(idx, { points: parseInt(e.target.value) || 1 })}
                            />
                            <span className="text-sm text-muted-foreground">pts</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeQuestion(idx)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          value={q.question}
                          onChange={(e) => updateQuestion(idx, { question: e.target.value })}
                          placeholder="Enter question"
                          rows={2}
                        />
                        {q.type === 'mcq' && q.options && (
                          <div className="space-y-2 pl-4">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${q.id}`}
                                  checked={q.correctAnswer === opt}
                                  onChange={() => updateQuestion(idx, { correctAnswer: opt })}
                                />
                                <Input
                                  value={opt}
                                  onChange={(e) => {
                                    const newOptions = [...q.options!]
                                    newOptions[optIdx] = e.target.value
                                    updateQuestion(idx, { options: newOptions })
                                  }}
                                  placeholder={`Option ${optIdx + 1}`}
                                  className="flex-1"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {q.type === 'truefalse' && (
                          <div className="flex gap-4 pl-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctAnswer === 'True'}
                                onChange={() => updateQuestion(idx, { correctAnswer: 'True' })}
                              />
                              <span>True</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctAnswer === 'False'}
                                onChange={() => updateQuestion(idx, { correctAnswer: 'False' })}
                              />
                              <span>False</span>
                            </label>
                          </div>
                        )}
                        <Textarea
                          value={q.explanation || ''}
                          onChange={(e) => updateQuestion(idx, { explanation: e.target.value })}
                          placeholder="Explanation (shown after answering)"
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 border rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={data.allowLateSubmission}
                    onCheckedChange={(checked) => setData({ ...data, allowLateSubmission: checked })}
                  />
                  <Label>Allow late submissions</Label>
                </div>
                {data.allowLateSubmission && (
                  <div className="space-y-2">
                    <Label>Late Penalty (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={data.latePenalty}
                      onChange={(e) => setData({ ...data, latePenalty: parseInt(e.target.value) || 0 })}
                    />
                    <p className="text-xs text-muted-foreground">Percentage deducted for late submissions</p>
                  </div>
                )}
              </div>

              {/* Answer Key Section - Protected */}
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <Label className="text-amber-700 font-medium">Instructor Answer Key (Protected)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs gap-1"
                      onClick={() => setShowAnswerKey(!showAnswerKey)}
                    >
                      {showAnswerKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      {showAnswerKey ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </div>
                {showAnswerKey ? (
                  <div className="space-y-3">
                    <Textarea
                      value={data.answerKey || ''}
                      onChange={(e) => setData({ ...data, answerKey: e.target.value })}
                      placeholder="Enter the expected answer/solution here. This is ONLY visible to instructors."
                      rows={4}
                      className="border-amber-200 bg-amber-50/30"
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={data.answerKeyProtected !== false}
                        onCheckedChange={(checked) => setData({ ...data, answerKeyProtected: checked })}
                      />
                      <Label className="text-xs text-muted-foreground">
                        <Lock className="h-3 w-3 inline mr-1" />
                        Protect answer key (never visible to students)
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded border border-dashed border-gray-200 text-center">
                    <Lock className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                    <span className="text-xs text-muted-foreground">Answer key is hidden. Click "Show" to view/edit.</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview" className="space-y-4 py-2">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <h3 className="font-semibold">{data.title}</h3>
              {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
              {data.instructions && (
                <div className="text-sm"><span className="font-medium text-muted-foreground">Instructions: </span>{data.instructions}</div>
              )}
              <p className="text-xs text-muted-foreground">{data.estimatedMinutes} min · {data.points} pts · {data.submissionType}</p>
              <h4 className="text-sm font-medium mt-4">Questions</h4>
              <QuestionsPreview questions={data.questions ?? []} />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="outline" onClick={() => onSave({ ...data, isPublished: false })}>Save as draft</Button>
          <Button onClick={() => onSave({ ...data, isPublished: true })}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Quiz Builder Modal
function QuizBuilderModal({ isOpen, onClose, onSave, initialData, isModuleQuiz = false }: BuilderModalProps & { isModuleQuiz?: boolean }) {
  const [data, setData] = useState<Quiz | ModuleQuiz>(initialData || (isModuleQuiz ? DEFAULT_MODULE_QUIZ(0) : DEFAULT_QUIZ(0)))
  const [activeQuestion, setActiveQuestion] = useState<QuizQuestion | null>(null)

  const addQuestion = (type: QuizQuestion['type']) => {
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: type === 'mcq' ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined
    }
    setData({ ...data, questions: [...data.questions, newQuestion] })
    setActiveQuestion(newQuestion)
  }

  const updateQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    const newQuestions = [...data.questions]
    newQuestions[index] = { ...newQuestions[index], ...updates }
    setData({ ...data, questions: newQuestions })
  }

  const removeQuestion = (index: number) => {
    setData({ ...data, questions: data.questions.filter((_, i) => i !== index) })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-red-500" />
            {isModuleQuiz ? 'End of Module Quiz Builder (Summative)' : 'Lesson Quiz Builder (Formative)'}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview (student view)</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="space-y-4 py-2">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Quiz Title *</Label>
                <Input
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder={isModuleQuiz ? "e.g., Module 1 Comprehensive Assessment" : "e.g., Lesson 1 Quiz"}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="Instructions for students"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Time Limit (min)</Label>
                  <Input
                    type="number"
                    placeholder="No limit"
                    value={data.timeLimit || ''}
                    onChange={(e) => setData({ ...data, timeLimit: e.target.value ? parseInt(e.target.value) : undefined })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Attempts Allowed</Label>
                  <Input
                    type="number"
                    min={1}
                    value={data.attemptsAllowed}
                    onChange={(e) => setData({ ...data, attemptsAllowed: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Passing Score (%)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={data.passingScore}
                    onChange={(e) => setData({ ...data, passingScore: parseInt(e.target.value) || 70 })}
                  />
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={data.showCorrectAnswers}
                    onCheckedChange={(checked) => setData({ ...data, showCorrectAnswers: checked })}
                    disabled={data.answersNeverVisible}
                  />
                  <Label className="text-sm">Show correct answers</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={data.randomizeQuestions}
                    onCheckedChange={(checked) => setData({ ...data, randomizeQuestions: checked })}
                  />
                  <Label className="text-sm">Randomize questions</Label>
                </div>
                <div className="flex items-center gap-2 border-l pl-4 border-amber-200">
                  <Switch
                    checked={data.answersNeverVisible}
                    onCheckedChange={(checked) => setData({ ...data, answersNeverVisible: checked, showCorrectAnswers: checked ? false : data.showCorrectAnswers })}
                  />
                  <Label className="text-sm text-amber-700 font-medium flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Never show answers to students
                  </Label>
                </div>
              </div>

              {isModuleQuiz && (
                <div className="space-y-2 border rounded-lg p-4 bg-blue-50">
                  <Label>Coverage</Label>
                  <Select
                    value={(data as ModuleQuiz).coverage}
                    onValueChange={(v) => setData({ ...data, coverage: v as 'all_lessons' | 'selected_lessons' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_lessons">All lessons in module</SelectItem>
                      <SelectItem value="selected_lessons">Selected lessons only</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    This is a summative assessment covering knowledge from the entire module
                  </p>
                </div>
              )}

              <Separator />

              {/* Questions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Questions ({data.questions.length})</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => addQuestion('mcq')}>
                      <Plus className="h-4 w-4 mr-1" /> MCQ
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('truefalse')}>
                      <Plus className="h-4 w-4 mr-1" /> T/F
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('shortanswer')}>
                      <Plus className="h-4 w-4 mr-1" /> Short
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('essay')}>
                      <Plus className="h-4 w-4 mr-1" /> Essay
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {data.questions.map((q, idx) => (
                    <div key={q.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Q{idx + 1} - {q.type.toUpperCase()}</Badge>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            className="w-20 h-8"
                            value={q.points}
                            onChange={(e) => updateQuestion(idx, { points: parseInt(e.target.value) || 1 })}
                          />
                          <span className="text-sm text-muted-foreground">pts</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeQuestion(idx)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={q.question}
                        onChange={(e) => updateQuestion(idx, { question: e.target.value })}
                        placeholder="Enter question"
                        rows={2}
                      />
                      {q.type === 'mcq' && q.options && (
                        <div className="space-y-2 pl-4">
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctAnswer === opt}
                                onChange={() => updateQuestion(idx, { correctAnswer: opt })}
                              />
                              <Input
                                value={opt}
                                onChange={(e) => {
                                  const newOptions = [...q.options!]
                                  newOptions[optIdx] = e.target.value
                                  updateQuestion(idx, { options: newOptions })
                                }}
                                placeholder={`Option ${optIdx + 1}`}
                                className="flex-1"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {q.type === 'truefalse' && (
                        <div className="flex gap-4 pl-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct-${q.id}`}
                              checked={q.correctAnswer === 'True'}
                              onChange={() => updateQuestion(idx, { correctAnswer: 'True' })}
                            />
                            <span>True</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct-${q.id}`}
                              checked={q.correctAnswer === 'False'}
                              onChange={() => updateQuestion(idx, { correctAnswer: 'False' })}
                            />
                            <span>False</span>
                          </label>
                        </div>
                      )}
                      <Textarea
                        value={q.explanation || ''}
                        onChange={(e) => updateQuestion(idx, { explanation: e.target.value })}
                        placeholder="Explanation (shown after answering)"
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview" className="space-y-4 py-2">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <h3 className="font-semibold">{data.title}</h3>
              {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
              <p className="text-xs text-muted-foreground">
                {data.timeLimit != null ? `${data.timeLimit} min limit · ` : ''}
                {data.attemptsAllowed} attempt(s) · {data.questions.length} questions
              </p>
              <h4 className="text-sm font-medium mt-4">Questions</h4>
              <QuestionsPreview questions={data.questions ?? []} />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="outline" onClick={() => onSave({ ...data, isPublished: false })} disabled={data.questions.length === 0}>
            Save as draft
          </Button>
          <Button onClick={() => onSave({ ...data, isPublished: true })} disabled={data.questions.length === 0}>
            Publish ({data.questions.length} questions)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Content Builder Modal
function ContentBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  const [data, setData] = useState<Content>(initialData || DEFAULT_CONTENT(0))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-500" />
            Content Builder
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Content Title *</Label>
            <Input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="e.g., Introduction to the Topic"
            />
          </div>
          <div className="space-y-2">
            <Label>Content Type</Label>
            <Select value={data.type} onValueChange={(value: Content['type']) => setData({ ...data, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text / Article</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="interactive">Interactive</SelectItem>
                <SelectItem value="embed">Embed (iframe)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {data.type === 'text' && (
            <div className="space-y-2">
              <Label>Content Body</Label>
              <Textarea
                value={data.body || ''}
                onChange={(e) => setData({ ...data, body: e.target.value })}
                placeholder="Enter your lesson content here..."
                rows={10}
              />
            </div>
          )}
          {data.type !== 'text' && (
            <div className="space-y-2">
              <Label>URL / Embed Code</Label>
              <Input
                value={data.url || ''}
                onChange={(e) => setData({ ...data, url: e.target.value })}
                placeholder={data.type === 'embed' ? "Paste iframe or embed code" : "https://..."}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>Duration (minutes, optional)</Label>
            <Input
              type="number"
              value={data.duration || ''}
              onChange={(e) => setData({ ...data, duration: parseInt(e.target.value) || undefined })}
              placeholder="e.g., 15"
            />
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              type="number"
              value={data.order}
              onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })}
              min={0}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(data)} disabled={!data.title.trim()}>
            Save Content
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ============================================
// TREE VIEW COMPONENTS
// ============================================

interface TreeItemProps {
  children: React.ReactNode
  depth: number
  isLast?: boolean
}

function TreeItem({ children, depth, isLast }: TreeItemProps) {
  return (
    <div className="relative" style={{ marginLeft: depth * 20 }}>
      {depth > 0 && (
        <>
          <div
            className="absolute border-l-2 border-dashed border-gray-300"
            style={{
              left: -10,
              top: 0,
              bottom: isLast ? '50%' : 0,
              height: isLast ? '50%' : '100%'
            }}
          />
          <div
            className="absolute border-t-2 border-dashed border-gray-300"
            style={{
              left: -10,
              top: '50%',
              width: 10
            }}
          />
        </>
      )}
      {children}
    </div>
  )
}

// Difficulty Badge Component
interface DifficultyBadgeProps {
  mode: DifficultyMode
  fixedDifficulty?: DifficultyLevel
  showLabel?: boolean
  size?: 'sm' | 'xs'
}

function DifficultyBadge({ mode, fixedDifficulty, showLabel = true, size = 'xs' }: DifficultyBadgeProps) {
  if (mode === 'all') {
    return (
      <span className={cn(
        "inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200",
        size === 'xs' ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
      )}>
        <Layers2 className={cn(size === 'xs' ? "h-3 w-3" : "h-3.5 w-3.5")} />
        {showLabel && "All Levels"}
      </span>
    )
  }

  if (mode === 'fixed' && fixedDifficulty) {
    const colors = {
      beginner: 'bg-green-100 text-green-700 border-green-200',
      intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
      advanced: 'bg-purple-100 text-purple-700 border-purple-200'
    }
    const icons = {
      beginner: SignalLow,
      intermediate: Signal,
      advanced: SignalHigh
    }
    const Icon = icons[fixedDifficulty]

    return (
      <span className={cn(
        "inline-flex items-center gap-1 rounded-full border",
        colors[fixedDifficulty],
        size === 'xs' ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
      )} title={`Fixed: ${fixedDifficulty}`}>
        <Icon className={cn(size === 'xs' ? "h-3 w-3" : "h-3.5 w-3.5")} />
        {showLabel && (
          <>
            <span className="opacity-70">🎯</span>
            <span className="capitalize">{fixedDifficulty}</span>
          </>
        )}
      </span>
    )
  }

  // Adaptive mode
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200",
      size === 'xs' ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
    )} title="Adaptive - adjusts to group difficulty">
      <BarChart3 className={cn(size === 'xs' ? "h-3 w-3" : "h-3.5 w-3.5")} />
      {showLabel && <span className="opacity-70">🔄</span>}
      {showLabel && "Adaptive"}
    </span>
  )
}

// Sortable Tree Item for Drag & Drop
interface SortableTreeItemProps extends TreeItemProps {
  id: string
  dragHandle?: boolean
  onDragStart?: () => void
}

function SortableTreeItem({ id, children, depth, isLast, dragHandle = true }: SortableTreeItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      {dragHandle && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </button>
      )}
      <TreeItem depth={depth} isLast={isLast}>
        {children}
      </TreeItem>
    </div>
  )
}

// ============================================
// PREVIEW CARD - Center panel preview for quiz/homework/task
// ============================================

function resolveSelectedItem(
  selectedItem: { type: string; id: string } | null,
  modules: Module[]
): { item: Task | Homework | Quiz | Lesson | Module; moduleId: string; lessonId?: string } | null {
  if (!selectedItem) return null
  for (const mod of modules) {
    if (selectedItem.type === 'module' && mod.id === selectedItem.id) {
      return { item: mod, moduleId: mod.id }
    }
    if (selectedItem.type === 'moduleQuiz') {
      const quiz = mod.moduleQuizzes?.find(q => q.id === selectedItem.id)
      if (quiz) return { item: quiz, moduleId: mod.id }
    }
    for (const lesson of mod.lessons) {
      if (selectedItem.type === 'lesson' && lesson.id === selectedItem.id) {
        return { item: lesson, moduleId: mod.id, lessonId: lesson.id }
      }
      if (selectedItem.type === 'task') {
        const task = lesson.tasks?.find(t => t.id === selectedItem.id)
        if (task) return { item: task, moduleId: mod.id, lessonId: lesson.id }
      }
      if (selectedItem.type === 'homework') {
        const hw = lesson.homework?.find(h => h.id === selectedItem.id)
        if (hw) return { item: hw, moduleId: mod.id, lessonId: lesson.id }
      }
      if (selectedItem.type === 'quiz') {
        const quiz = lesson.quizzes?.find(q => q.id === selectedItem.id)
        if (quiz) return { item: quiz, moduleId: mod.id, lessonId: lesson.id }
      }
    }
  }
  return null
}

function QuestionsPreview({ questions }: { questions: QuizQuestion[] }) {
  if (!questions?.length) return <p className="text-sm text-muted-foreground">No questions yet.</p>
  return (
    <div className="space-y-3 mt-2">
      {questions.map((q, idx) => (
        <div key={q.id} className="border rounded-lg p-3 bg-muted/30 space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">Q{idx + 1} · {q.type.toUpperCase()}</Badge>
            <span className="text-xs text-muted-foreground">{q.points} pts</span>
          </div>
          <p className="text-sm font-medium">{q.question || '(No question text)'}</p>
          {q.type === 'mcq' && q.options?.length && (
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {q.options.map((opt, i) => (
                <li key={i}>{opt || `Option ${i + 1}`}</li>
              ))}
            </ul>
          )}
          {q.type === 'truefalse' && (
            <p className="text-sm text-muted-foreground">Options: True / False</p>
          )}
          {q.explanation && (
            <p className="text-xs text-muted-foreground border-t pt-2 mt-2">Explanation: {q.explanation}</p>
          )}
          <p className="text-xs text-amber-600">Answer key hidden (instructor only)</p>
        </div>
      ))}
    </div>
  )
}

/** Student-like question preview (one at a time) */
function StudentPreviewModal({ questions, onClose }: { questions: QuizQuestion[]; onClose: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const q = questions[currentIdx]

  if (!questions.length) return null

  if (showResults) {
    const correct = questions.filter(qq => {
      const a = answers[qq.id]?.toLowerCase()
      const ca = Array.isArray(qq.correctAnswer) ? qq.correctAnswer[0]?.toLowerCase() : (typeof qq.correctAnswer === 'string' ? qq.correctAnswer.toLowerCase() : '')
      return a && ca && a === ca
    }).length
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
          <h3 className="text-xl font-bold mb-4">Preview Results</h3>
          <p className="text-3xl font-bold text-center mb-2">{correct}/{questions.length}</p>
          <p className="text-center text-muted-foreground mb-6">This is how a student would see their results</p>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {questions.map((qq, i) => {
              const a = answers[qq.id]?.toLowerCase()
              const ca = Array.isArray(qq.correctAnswer) ? qq.correctAnswer[0]?.toLowerCase() : (typeof qq.correctAnswer === 'string' ? qq.correctAnswer.toLowerCase() : '')
              const isCorrect = !!(a && ca && a === ca)
              return (
                <div key={qq.id} className={`p-3 rounded-lg border text-sm ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <span className="font-medium">Q{i + 1}:</span> {qq.question.slice(0, 80)}
                  <span className={`ml-2 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? '\u2713' : '\u2717'}
                  </span>
                </div>
              )
            })}
          </div>
          <Button onClick={onClose} className="w-full mt-4">Close Preview</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">Question {currentIdx + 1} of {questions.length}</Badge>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <h3 className="text-lg font-semibold mb-4">{q.question}</h3>
        {q.type === 'mcq' && q.options && (
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-all text-sm",
                  answers[q.id] === opt ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                )}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </button>
            ))}
          </div>
        )}
        {q.type === 'truefalse' && (
          <div className="flex gap-3">
            {['True', 'False'].map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                className={cn(
                  "flex-1 p-3 rounded-lg border transition-all font-medium",
                  answers[q.id] === opt ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        {(q.type === 'shortanswer' || q.type === 'essay') && (
          <Textarea
            value={answers[q.id] || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswers({ ...answers, [q.id]: e.target.value })}
            placeholder="Type your answer..."
            rows={q.type === 'essay' ? 5 : 2}
          />
        )}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
          >
            Previous
          </Button>
          {currentIdx < questions.length - 1 ? (
            <Button onClick={() => setCurrentIdx(currentIdx + 1)}>Next</Button>
          ) : (
            <Button onClick={() => setShowResults(true)}>Finish</Button>
          )}
        </div>
      </div>
    </div>
  )
}

interface PreviewCardProps {
  type: 'task' | 'homework' | 'quiz' | 'moduleQuiz' | 'lesson' | 'module'
  item: Task | Homework | Quiz | Lesson | Module
  onEdit: () => void
  onDuplicate: () => void
  onRemove: () => void
  courseId?: string
  lessonId?: string
}

function PreviewCard({ type, item, onEdit, onDuplicate, onRemove, courseId, lessonId }: PreviewCardProps) {
  const [studentPreviewOpen, setStudentPreviewOpen] = useState(false)
  const [publishing, setPublishing] = useState(false)

  // Lesson preview
  if (type === 'lesson') {
    const lesson = item as Lesson
    return (
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-500" />
            <div>
              <Badge variant="outline" className="text-xs">Lesson</Badge>
              {!lesson.isPublished && <Badge variant="secondary" className="text-xs ml-1">Draft</Badge>}
              <h3 className="font-semibold text-lg mt-1">{lesson.title}</h3>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit} className="gap-1">
            <PenTool className="h-3 w-3" /> Edit
          </Button>
        </div>
        {lesson.description && <p className="text-sm text-muted-foreground">{lesson.description}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          <div><span className="text-muted-foreground">Duration:</span> {lesson.duration} min</div>
          <div><span className="text-muted-foreground">Tasks:</span> {lesson.tasks.length}</div>
          <div><span className="text-muted-foreground">Homework:</span> {lesson.homework.length}</div>
          <div><span className="text-muted-foreground">Quizzes:</span> {lesson.quizzes.length}</div>
        </div>
        {lesson.content.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Content ({lesson.content.length})</h4>
            <div className="space-y-1">
              {lesson.content.map(c => (
                <div key={c.id} className="flex items-center gap-2 text-sm border rounded p-2">
                  <Badge variant="secondary" className="text-xs capitalize">{c.type}</Badge>
                  <span>{c.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {lesson.prerequisites && lesson.prerequisites.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Prerequisites: {lesson.prerequisites.length} lesson(s) required
          </div>
        )}
      </div>
    )
  }

  // Module preview
  if (type === 'module') {
    const mod = item as Module
    return (
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            <div>
              <Badge variant="outline" className="text-xs">Module</Badge>
              <h3 className="font-semibold text-lg mt-1">{mod.title}</h3>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit} className="gap-1">
            <PenTool className="h-3 w-3" /> Edit
          </Button>
        </div>
        {mod.description && <p className="text-sm text-muted-foreground">{mod.description}</p>}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div><span className="text-muted-foreground">Lessons:</span> {mod.lessons.length}</div>
          <div><span className="text-muted-foreground">Module quizzes:</span> {mod.moduleQuizzes.length}</div>
          <div><span className="text-muted-foreground">Total items:</span> {mod.lessons.reduce((s, l) => s + l.tasks.length + l.homework.length + l.quizzes.length, 0)}</div>
        </div>
      </div>
    )
  }

  const isQuiz = type === 'quiz' || type === 'moduleQuiz'
  const questions = 'questions' in item ? (item as Quiz | Task | Homework).questions ?? [] : []
  const label = type === 'moduleQuiz' ? 'Module quiz' : type === 'task' ? 'Task' : type === 'homework' ? 'Homework' : 'Lesson quiz'
  const isDraft = 'isPublished' in item && item.isPublished === false

  const handlePublish = async () => {
    if (!courseId) { toast.error('Course ID not available'); return }
    setPublishing(true)
    try {
      const builderItem = {
        type,
        title: item.title,
        description: 'description' in item ? (item as any).description : '',
        questions: questions ?? [],
        lessonId: lessonId || null,
        difficulty: 'medium',
        points: 'points' in item ? (item as any).points : undefined,
        estimatedMinutes: 'estimatedMinutes' in item ? (item as any).estimatedMinutes : undefined,
      }
      const res = await fetch(`/api/tutor/courses/${courseId}/tasks/publish-from-builder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items: [builderItem], assignTo: 'all' }),
      })
      if (res.ok) {
        const data = await res.json()
        toast.success(data.message)
      } else {
        toast.error('Failed to publish')
      }
    } catch {
      toast.error('Failed to publish')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {type === 'task' && <ListTodo className="h-5 w-5 text-orange-500" />}
          {type === 'homework' && <Home className="h-5 w-5 text-purple-500" />}
          {(type === 'quiz' || type === 'moduleQuiz') && <FileQuestion className="h-5 w-5 text-red-500" />}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">{label}</Badge>
              {isDraft && <Badge variant="secondary" className="text-xs">Draft</Badge>}
            </div>
            <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={onEdit} className="gap-1">
            <PenTool className="h-3 w-3" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={onDuplicate} className="gap-1">
            <Copy className="h-3 w-3" />
            Duplicate
          </Button>
          {questions.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setStudentPreviewOpen(true)} className="gap-1">
              <Eye className="h-3 w-3" />
              Preview as Student
            </Button>
          )}
          {courseId && (
            <Button size="sm" onClick={handlePublish} disabled={publishing} className="gap-1">
              {publishing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
              Publish & Assign
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onRemove} className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-3 w-3" />
            Remove
          </Button>
        </div>
      </div>
      {'description' in item && (item as any).description && (
        <p className="text-sm text-muted-foreground">{(item as any).description}</p>
      )}
      {'instructions' in item && (item as any).instructions && (
        <div className="rounded-lg bg-muted/40 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Instructions</p>
          <p className="text-sm whitespace-pre-wrap">{(item as any).instructions}</p>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        {'estimatedMinutes' in item && (
          <div><span className="text-muted-foreground">Time:</span> {(item as any).estimatedMinutes} min</div>
        )}
        {'points' in item && (
          <div><span className="text-muted-foreground">Points:</span> {(item as any).points}</div>
        )}
        {'submissionType' in item && (
          <div><span className="text-muted-foreground">Submission:</span> {(item as any).submissionType}</div>
        )}
        {'timeLimit' in item && (item as any).timeLimit != null && (
          <div><span className="text-muted-foreground">Time limit:</span> {(item as any).timeLimit} min</div>
        )}
        {isQuiz && 'attemptsAllowed' in item && (
          <div><span className="text-muted-foreground">Attempts:</span> {(item as any).attemptsAllowed}</div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Questions ({questions?.length ?? 0})</h4>
        <QuestionsPreview questions={questions ?? []} />
      </div>
      {studentPreviewOpen && questions.length > 0 && (
        <StudentPreviewModal
          questions={questions}
          onClose={() => setStudentPreviewOpen(false)}
        />
      )}
    </div>
  )
}

// ============================================
// MAIN COURSE BUILDER COMPONENT
// ============================================

export function CourseBuilder({ courseId, courseName, initialModules = [], onSave }: CourseBuilderProps) {
  const [modules, setModules] = useState<Module[]>(initialModules)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<{ type: string; id: string } | null>(null)

  // AI Prompt state
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])

  const handleSendPrompt = async () => {
    if (!aiPrompt.trim() && attachedFiles.length === 0) return

    setIsGenerating(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('AI is generating your course content...')
    setAiPrompt('')
    setAttachedFiles([])
    setIsGenerating(false)
  }

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setAttachedFiles(prev => [...prev, ...Array.from(files)])
    }
    e.target.value = ''
  }

  const removeAttachedFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  // Modal states
  const [activeModal, setActiveModal] = useState<{
    type: 'module' | 'lesson' | 'task' | 'homework' | 'quiz' | 'moduleQuiz' | 'content'
    isOpen: boolean
    moduleId?: string
    lessonId?: string
    itemId?: string
  }>({ type: 'module', isOpen: false })

  const [editingData, setEditingData] = useState<any>(null)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  // Difficulty Development Mode State
  const [devMode, setDevMode] = useState<'single' | 'multi'>('single')
  const [previewDifficulty, setPreviewDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')

  // Helper to get effective value based on difficulty mode and preview
  const getEffectiveValue = <T extends WithDifficultyVariants>(
    item: T,
    field: keyof DifficultyVariant
  ): any => {
    if (devMode === 'single' || previewDifficulty === 'all' || item.difficultyMode === 'all') {
      return item[field as keyof T]
    }

    if (item.difficultyMode === 'fixed' && item.fixedDifficulty) {
      // If previewing a different difficulty than fixed, show base with warning indicator
      return item[field as keyof T]
    }

    // Adaptive mode - show variant for previewed difficulty
    const variant = previewDifficulty !== 'all' ? item.variants?.[previewDifficulty] : undefined
    return variant?.[field] ?? item[field as keyof T]
  }

  // Dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const toggleModule = (moduleId: string) => {
    const newSet = new Set(expandedModules)
    if (newSet.has(moduleId)) {
      newSet.delete(moduleId)
    } else {
      newSet.add(moduleId)
    }
    setExpandedModules(newSet)
  }

  const toggleLesson = (lessonId: string) => {
    const newSet = new Set(expandedLessons)
    if (newSet.has(lessonId)) {
      newSet.delete(lessonId)
    } else {
      newSet.add(lessonId)
    }
    setExpandedLessons(newSet)
  }

  // Add handlers
  const addModule = () => {
    const newModule = DEFAULT_MODULE(modules.length)
    setModules([...modules, newModule])
    setExpandedModules(new Set([...expandedModules, newModule.id]))
    setEditingData(newModule)
    setActiveModal({ type: 'module', isOpen: true })
  }

  const addLesson = (moduleId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return

    const newLesson = DEFAULT_LESSON(modules[moduleIndex].lessons.length)
    const newModules = [...modules]
    newModules[moduleIndex].lessons.push(newLesson)
    setModules(newModules)
    setExpandedLessons(new Set([...expandedLessons, newLesson.id]))
    setEditingData(newLesson)
    setActiveModal({ type: 'lesson', isOpen: true, moduleId })
  }

  const addTask = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) return

    const newTask = DEFAULT_TASK(modules[moduleIndex].lessons[lessonIndex].tasks.length)
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].tasks.push(newTask)
    setModules(newModules)
    setEditingData(newTask)
    setActiveModal({ type: 'task', isOpen: true, moduleId, lessonId })
  }

  const addContent = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) return

    const newContent = DEFAULT_CONTENT(modules[moduleIndex].lessons[lessonIndex].content?.length || 0)
    const newModules = [...modules]
    if (!newModules[moduleIndex].lessons[lessonIndex].content) {
      newModules[moduleIndex].lessons[lessonIndex].content = []
    }
    newModules[moduleIndex].lessons[lessonIndex].content.push(newContent)
    setModules(newModules)
    setEditingData(newContent)
    setActiveModal({ type: 'content', isOpen: true, moduleId, lessonId })
  }

  const addHomework = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) return

    const newHomework = DEFAULT_HOMEWORK(modules[moduleIndex].lessons[lessonIndex].homework.length)
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].homework.push(newHomework)
    setModules(newModules)
    setEditingData(newHomework)
    setActiveModal({ type: 'homework', isOpen: true, moduleId, lessonId })
  }

  const addQuiz = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) return

    const newQuiz = DEFAULT_QUIZ(modules[moduleIndex].lessons[lessonIndex].quizzes.length)
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].quizzes.push(newQuiz)
    setModules(newModules)
    setEditingData(newQuiz)
    setActiveModal({ type: 'quiz', isOpen: true, moduleId, lessonId })
  }

  const addModuleQuiz = (moduleId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return

    const newQuiz = DEFAULT_MODULE_QUIZ(modules[moduleIndex].moduleQuizzes.length)
    const newModules = [...modules]
    newModules[moduleIndex].moduleQuizzes.push(newQuiz)
    setModules(newModules)
    setEditingData(newQuiz)
    setActiveModal({ type: 'moduleQuiz', isOpen: true, moduleId })
  }

  // Drag & Drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveDragId(null)

    if (!over || active.id === over.id) return

    const activeId = active.id as string
    const overId = over.id as string

    // Check if dragging a module
    const activeModuleIndex = modules.findIndex(m => m.id === activeId)
    const overModuleIndex = modules.findIndex(m => m.id === overId)

    if (activeModuleIndex !== -1 && overModuleIndex !== -1) {
      setModules(arrayMove(modules, activeModuleIndex, overModuleIndex))
      return
    }

    // Check if dragging a lesson
    for (let mIdx = 0; mIdx < modules.length; mIdx++) {
      const activeLessonIndex = modules[mIdx].lessons.findIndex(l => l.id === activeId)
      const overLessonIndex = modules[mIdx].lessons.findIndex(l => l.id === overId)

      if (activeLessonIndex !== -1 && overLessonIndex !== -1) {
        const newModules = [...modules]
        newModules[mIdx].lessons = arrayMove(
          newModules[mIdx].lessons,
          activeLessonIndex,
          overLessonIndex
        )
        setModules(newModules)
        return
      }
    }

    // Check if dragging content within a lesson
    for (let mIdx = 0; mIdx < modules.length; mIdx++) {
      for (let lIdx = 0; lIdx < modules[mIdx].lessons.length; lIdx++) {
        const lesson = modules[mIdx].lessons[lIdx]
        const activeContentIndex = lesson.content?.findIndex(c => c.id === activeId) ?? -1
        const overContentIndex = lesson.content?.findIndex(c => c.id === overId) ?? -1

        if (activeContentIndex !== -1 && overContentIndex !== -1) {
          const newModules = [...modules]
          newModules[mIdx].lessons[lIdx].content = arrayMove(
            newModules[mIdx].lessons[lIdx].content,
            activeContentIndex,
            overContentIndex
          )
          setModules(newModules)
          return
        }
      }
    }

    // Check if dragging a task within a lesson
    for (let mIdx = 0; mIdx < modules.length; mIdx++) {
      for (let lIdx = 0; lIdx < modules[mIdx].lessons.length; lIdx++) {
        const lesson = modules[mIdx].lessons[lIdx]
        const activeTaskIndex = lesson.tasks?.findIndex(t => t.id === activeId) ?? -1
        const overTaskIndex = lesson.tasks?.findIndex(t => t.id === overId) ?? -1

        if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
          const newModules = [...modules]
          newModules[mIdx].lessons[lIdx].tasks = arrayMove(
            newModules[mIdx].lessons[lIdx].tasks,
            activeTaskIndex,
            overTaskIndex
          )
          setModules(newModules)
          return
        }
      }
    }

    // Check if dragging homework within a lesson
    for (let mIdx = 0; mIdx < modules.length; mIdx++) {
      for (let lIdx = 0; lIdx < modules[mIdx].lessons.length; lIdx++) {
        const lesson = modules[mIdx].lessons[lIdx]
        const activeHwIndex = lesson.homework?.findIndex(h => h.id === activeId) ?? -1
        const overHwIndex = lesson.homework?.findIndex(h => h.id === overId) ?? -1

        if (activeHwIndex !== -1 && overHwIndex !== -1) {
          const newModules = [...modules]
          newModules[mIdx].lessons[lIdx].homework = arrayMove(
            newModules[mIdx].lessons[lIdx].homework,
            activeHwIndex,
            overHwIndex
          )
          setModules(newModules)
          return
        }
      }
    }

    // Check if dragging quizzes within a lesson
    for (let mIdx = 0; mIdx < modules.length; mIdx++) {
      for (let lIdx = 0; lIdx < modules[mIdx].lessons.length; lIdx++) {
        const lesson = modules[mIdx].lessons[lIdx]
        const activeQuizIndex = lesson.quizzes?.findIndex(q => q.id === activeId) ?? -1
        const overQuizIndex = lesson.quizzes?.findIndex(q => q.id === overId) ?? -1

        if (activeQuizIndex !== -1 && overQuizIndex !== -1) {
          const newModules = [...modules]
          newModules[mIdx].lessons[lIdx].quizzes = arrayMove(
            newModules[mIdx].lessons[lIdx].quizzes,
            activeQuizIndex,
            overQuizIndex
          )
          setModules(newModules)
          return
        }
      }
    }
  }

  // Save handlers
  const handleSaveModule = (data: any) => {
    if (activeModal.itemId) {
      setModules(modules.map(m => m.id === activeModal.itemId ? { ...m, ...data } : m))
    } else {
      setModules(modules.map(m =>
        m.id === editingData.id ? { ...m, ...data } : m
      ))
    }
    setActiveModal({ type: 'module', isOpen: false })
    toast.success('Module saved')
  }

  const handleSaveLesson = (data: any) => {
    const moduleIndex = modules.findIndex(m => m.id === activeModal.moduleId)
    if (moduleIndex === -1) return

    const newModules = [...modules]
    const lessonIndex = newModules[moduleIndex].lessons.findIndex(l => l.id === editingData.id)
    if (lessonIndex !== -1) {
      newModules[moduleIndex].lessons[lessonIndex] = {
        ...newModules[moduleIndex].lessons[lessonIndex],
        ...data
      }
    }
    setModules(newModules)
    setActiveModal({ type: 'lesson', isOpen: false })
    toast.success('Lesson saved')
  }

  const handleSaveTask = (data: any) => {
    const moduleIndex = modules.findIndex(m => m.id === activeModal.moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === activeModal.lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return

    const newModules = [...modules]
    const taskIndex = newModules[moduleIndex].lessons[lessonIndex].tasks.findIndex(t => t.id === editingData.id)
    if (taskIndex !== -1) {
      newModules[moduleIndex].lessons[lessonIndex].tasks[taskIndex] = data
    }
    setModules(newModules)
    setActiveModal({ type: 'task', isOpen: false })
    toast.success('Task saved')
  }

  const handleSaveContent = (data: Content) => {
    const moduleIndex = modules.findIndex(m => m.id === activeModal.moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === activeModal.lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return

    const newModules = [...modules]
    const contentIndex = newModules[moduleIndex].lessons[lessonIndex].content?.findIndex(c => c.id === editingData?.id)
    if (contentIndex !== undefined && contentIndex !== -1) {
      newModules[moduleIndex].lessons[lessonIndex].content[contentIndex] = data
    } else {
      newModules[moduleIndex].lessons[lessonIndex].content.push(data)
    }
    setModules(newModules)
    setActiveModal({ type: 'content', isOpen: false })
    toast.success('Content saved')
  }

  const handleSaveHomework = (data: any) => {
    const moduleIndex = modules.findIndex(m => m.id === activeModal.moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === activeModal.lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return

    const newModules = [...modules]
    const hwIndex = newModules[moduleIndex].lessons[lessonIndex].homework.findIndex(h => h.id === editingData.id)
    if (hwIndex !== -1) {
      newModules[moduleIndex].lessons[lessonIndex].homework[hwIndex] = data
    }
    setModules(newModules)
    setActiveModal({ type: 'homework', isOpen: false })
    toast.success('Homework saved')
  }

  const handleSaveQuiz = (data: any) => {
    const moduleIndex = modules.findIndex(m => m.id === activeModal.moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === activeModal.lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return

    const newModules = [...modules]
    const quizIndex = newModules[moduleIndex].lessons[lessonIndex].quizzes.findIndex(q => q.id === editingData.id)
    if (quizIndex !== -1) {
      newModules[moduleIndex].lessons[lessonIndex].quizzes[quizIndex] = data
    }
    setModules(newModules)
    setActiveModal({ type: 'quiz', isOpen: false })
    toast.success('Quiz saved')
  }

  const handleSaveModuleQuiz = (data: any) => {
    const moduleIndex = modules.findIndex(m => m.id === activeModal.moduleId)
    if (moduleIndex === -1) return

    const newModules = [...modules]
    const quizIndex = newModules[moduleIndex].moduleQuizzes.findIndex(q => q.id === editingData.id)
    if (quizIndex !== -1) {
      newModules[moduleIndex].moduleQuizzes[quizIndex] = data
    }
    setModules(newModules)
    setActiveModal({ type: 'moduleQuiz', isOpen: false })
    toast.success('Module Quiz saved')
  }

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId))
    toast.success('Module deleted')
  }

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
        : m
    ))
    toast.success('Lesson deleted')
  }

  const deleteTask = (moduleId: string, lessonId: string, taskId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? {
          ...m,
          lessons: m.lessons.map(l =>
            l.id === lessonId
              ? { ...l, tasks: (l.tasks || []).filter(t => t.id !== taskId) }
              : l
          )
        }
        : m
    ))
    setSelectedItem(null)
    toast.success('Task removed')
  }

  const deleteHomework = (moduleId: string, lessonId: string, hwId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? {
          ...m,
          lessons: m.lessons.map(l =>
            l.id === lessonId
              ? { ...l, homework: (l.homework || []).filter(h => h.id !== hwId) }
              : l
          )
        }
        : m
    ))
    setSelectedItem(null)
    toast.success('Homework removed')
  }

  const deleteQuiz = (moduleId: string, lessonId: string, quizId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? {
          ...m,
          lessons: m.lessons.map(l =>
            l.id === lessonId
              ? { ...l, quizzes: (l.quizzes || []).filter(q => q.id !== quizId) }
              : l
          )
        }
        : m
    ))
    setSelectedItem(null)
    toast.success('Quiz removed')
  }

  const deleteModuleQuiz = (moduleId: string, quizId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? { ...m, moduleQuizzes: (m.moduleQuizzes || []).filter(q => q.id !== quizId) }
        : m
    ))
    setSelectedItem(null)
    toast.success('Module quiz removed')
  }

  const duplicateTask = (moduleId: string, lessonId: string, task: Task) => {
    const copy: Task = {
      ...task,
      id: `task-${generateId()}`,
      title: `${task.title} (copy)`,
      questions: task.questions?.map(q => ({ ...q, id: `q-${generateId()}` }))
    }
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) return
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].tasks = [
      ...(newModules[moduleIndex].lessons[lessonIndex].tasks || []),
      copy
    ]
    setModules(newModules)
    setSelectedItem({ type: 'task', id: copy.id })
    toast.success('Task duplicated')
  }

  const duplicateHomework = (moduleId: string, lessonId: string, hw: Homework) => {
    const copy: Homework = {
      ...hw,
      id: `homework-${generateId()}`,
      title: `${hw.title} (copy)`,
      questions: hw.questions?.map(q => ({ ...q, id: `q-${generateId()}` }))
    }
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) return
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].homework = [
      ...(newModules[moduleIndex].lessons[lessonIndex].homework || []),
      copy
    ]
    setModules(newModules)
    setSelectedItem({ type: 'homework', id: copy.id })
    toast.success('Homework duplicated')
  }

  const duplicateQuiz = (moduleId: string, lessonId: string, quiz: Quiz) => {
    const copy: Quiz = {
      ...quiz,
      id: `quiz-${generateId()}`,
      title: `${quiz.title} (copy)`,
      questions: quiz.questions?.map(q => ({ ...q, id: `q-${generateId()}` }))
    }
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) return
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].quizzes = [
      ...(newModules[moduleIndex].lessons[lessonIndex].quizzes || []),
      copy
    ]
    setModules(newModules)
    setSelectedItem({ type: 'quiz', id: copy.id })
    toast.success('Quiz duplicated')
  }

  const duplicateModuleQuiz = (moduleId: string, quiz: ModuleQuiz) => {
    const copy: ModuleQuiz = {
      ...quiz,
      id: `quiz-${generateId()}`,
      title: `${quiz.title} (copy)`,
      questions: quiz.questions?.map(q => ({ ...q, id: `q-${generateId()}` }))
    }
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    const newModules = [...modules]
    newModules[moduleIndex].moduleQuizzes = [
      ...(newModules[moduleIndex].moduleQuizzes || []),
      copy
    ]
    setModules(newModules)
    setSelectedItem({ type: 'moduleQuiz', id: copy.id })
    toast.success('Module quiz duplicated')
  }

  const getAllLessons = () => {
    return modules.flatMap(m => m.lessons)
  }

  // File upload handlers for Media and Docs
  const handleMediaUpload = (moduleId: string, lessonId: string, files: FileList | null, type: 'video' | 'image') => {
    if (!files || files.length === 0) return

    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return

    const newModules = [...modules]

    Array.from(files).forEach(file => {
      if (type === 'video') {
        newModules[moduleIndex].lessons[lessonIndex].media.videos.push({
          id: `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: file.name,
          url: URL.createObjectURL(file),
          duration: 0
        })
      } else {
        newModules[moduleIndex].lessons[lessonIndex].media.images.push({
          id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: file.name,
          url: URL.createObjectURL(file)
        })
      }
    })

    setModules(newModules)
    toast.success(`${files.length} ${type}(s) uploaded`)
  }

  const handleDocUpload = (moduleId: string, lessonId: string, files: FileList | null) => {
    if (!files || files.length === 0) return

    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return

    const newModules = [...modules]

    Array.from(files).forEach(file => {
      const ext = file.name.split('.').pop()?.toLowerCase()
      const docType = ext === 'pdf' ? 'pdf' : ext === 'doc' || ext === 'docx' ? 'doc' : ext === 'ppt' || ext === 'pptx' ? 'ppt' : 'other'

      newModules[moduleIndex].lessons[lessonIndex].docs.push({
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: file.name,
        url: URL.createObjectURL(file),
        type: docType
      })
    })

    setModules(newModules)
    toast.success(`${files.length} document(s) uploaded`)
  }

  return (
    <div className="space-y-4">
      {/* DIFFICULTY DEVELOPMENT MODE HEADER */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Difficulty Development Mode</h3>
                <p className="text-xs text-muted-foreground">
                  Choose how to develop content for different skill levels
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Development Mode Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border">
                <button
                  onClick={() => setDevMode('single')}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    devMode === 'single'
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  Single Level
                </button>
                <button
                  onClick={() => setDevMode('multi')}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    devMode === 'multi'
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  Multi-Level (Adaptive)
                </button>
              </div>

              {/* Preview Difficulty Selector (only in multi mode) */}
              {devMode === 'multi' && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Preview:</span>
                  <div className="flex items-center gap-1 bg-white rounded-lg p-1 border">
                    {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setPreviewDifficulty(level)}
                        className={cn(
                          "px-2 py-1 rounded text-xs font-medium transition-all capitalize",
                          previewDifficulty === level
                            ? level === 'all'
                              ? "bg-gray-800 text-white"
                              : level === 'beginner'
                                ? "bg-green-500 text-white"
                                : level === 'intermediate'
                                  ? "bg-blue-500 text-white"
                                  : "bg-purple-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        {level === 'all' ? 'All' : level}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-3 pt-3 border-t border-blue-200/50">
            <p className="text-xs text-blue-700">
              {devMode === 'single' ? (
                <>
                  <span className="font-medium">Single Level Mode:</span> All content is created for one difficulty level.
                  When assigned to groups, content adapts automatically based on each group's difficulty setting.
                </>
              ) : (
                <>
                  <span className="font-medium">Multi-Level Mode:</span> Create customized versions for each difficulty level.
                  Use the Preview buttons to see how content appears at different levels.
                  Items marked with 🎯 are fixed to specific levels, while 🔄 adaptive items adjust automatically.
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT PANEL - Course Structure (narrower) */}
        <div className="col-span-4">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Start here!
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 flex-1 flex flex-col">
              {/* AI Prompt Input - LLM Style */}
              <div className="mb-4 space-y-2">
                <div className="relative border rounded-xl bg-white shadow-sm">
                  {/* Attached Files */}
                  {attachedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50 rounded-t-xl">
                      {attachedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1 text-xs">
                          <FileText className="h-3 w-3 text-blue-500" />
                          <span className="truncate max-w-[80px]">{file.name}</span>
                          <button
                            onClick={() => removeAttachedFile(idx)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <Textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Describe what you want to create... e.g., 'Create a 4-week Python course for beginners with hands-on projects'"
                    className="min-h-[80px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendPrompt()
                      }
                    }}
                  />

                  <div className="flex items-center justify-between p-2 border-t">
                    <div className="flex items-center gap-1">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileAttach}
                          accept=".pdf,.doc,.docx,.txt,.md,.ppt,.pptx,.xls,.xlsx,image/*,video/*"
                        />
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
                          <Paperclip className="h-4 w-4 text-gray-500" />
                        </Button>
                      </label>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
                        <Mic className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      onClick={handleSendPrompt}
                      disabled={isGenerating || (!aiPrompt.trim() && attachedFiles.length === 0)}
                      className="gap-1"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      {isGenerating ? 'Generating...' : 'Generate'}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  AI will generate modules, lessons, and assessments based on your description
                </p>
              </div>

              <ScrollArea className="flex-1">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <div className="space-y-1">
                    {/* Course Root */}
                    <div className="flex items-center justify-between py-2 font-semibold text-sm border-b mb-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                        <span className="truncate">{courseName || 'Course'}</span>
                      </div>
                      <Button size="sm" onClick={addModule} className="gap-1 h-6 text-xs">
                        <Plus className="h-3 w-3" />
                        Module
                      </Button>
                    </div>

                    {/* Modules - with drag sorting */}
                    <SortableContext
                      items={modules.map(m => m.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {modules.map((module, moduleIdx) => (
                        <SortableTreeItem key={module.id} id={module.id} depth={1} isLast={moduleIdx === modules.length - 1}>
                          <div className="group">
                            <div
                              className={cn(
                                "flex items-center gap-1.5 py-1.5 px-2 rounded cursor-pointer transition-colors",
                                "bg-blue-50 hover:bg-blue-100 border border-blue-200"
                              )}
                              onClick={() => toggleModule(module.id)}
                            >
                              {expandedModules.has(module.id) ? (
                                <ChevronDown className="h-3 w-3 text-blue-600" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-blue-600" />
                              )}
                              <Layers className="h-3 w-3 text-blue-600" />
                              <span className="text-sm font-medium flex-1 truncate">{module.title}</span>
                              <Badge variant="secondary" className="text-[10px] h-4">
                                {module.lessons.length}
                              </Badge>

                              {/* Difficulty Badge */}
                              <DifficultyBadge
                                mode={module.difficultyMode}
                                fixedDifficulty={module.fixedDifficulty}
                                size="xs"
                              />

                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-[10px] gap-1 opacity-0 group-hover:opacity-100 px-2"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setEditingData(module)
                                  setActiveModal({ type: 'module', isOpen: true, itemId: module.id })
                                }}
                              >
                                <Wand2 className="h-3 w-3" />
                                Builder
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteModule(module.id)
                                }}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
                            </div>

                            {expandedModules.has(module.id) && (
                              <div className="mt-1 space-y-1">
                                <TreeItem depth={2} isLast={false}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-[10px] gap-1 text-muted-foreground hover:text-foreground px-2"
                                    onClick={() => addLesson(module.id)}
                                  >
                                    <Plus className="h-3 w-3" />
                                    Add Lesson
                                  </Button>
                                </TreeItem>

                                {/* Lessons - with drag sorting */}
                                <SortableContext
                                  items={module.lessons.map(l => l.id)}
                                  strategy={verticalListSortingStrategy}
                                >
                                  {module.lessons.map((lesson, lessonIdx) => (
                                    <SortableTreeItem
                                      key={lesson.id}
                                      id={lesson.id}
                                      depth={2}
                                      isLast={lessonIdx === module.lessons.length - 1 && (module.moduleQuizzes?.length || 0) === 0}
                                    >
                                      <div className="group">
                                        <div
                                          className={cn(
                                            "flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer transition-colors",
                                            "bg-green-50 hover:bg-green-100 border border-green-200"
                                          )}
                                          onClick={() => toggleLesson(lesson.id)}
                                        >
                                          {expandedLessons.has(lesson.id) ? (
                                            <ChevronDown className="h-3 w-3 text-green-600" />
                                          ) : (
                                            <ChevronRight className="h-3 w-3 text-green-600" />
                                          )}
                                          <BookOpen className="h-3 w-3 text-green-600" />
                                          <span className="text-xs flex-1 truncate">{lesson.title}</span>
                                          <span className="text-[10px] text-muted-foreground">{lesson.duration}m</span>

                                          {/* Difficulty Badge */}
                                          <DifficultyBadge
                                            mode={lesson.difficultyMode}
                                            fixedDifficulty={lesson.fixedDifficulty}
                                            size="xs"
                                          />

                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 text-[10px] gap-1 opacity-0 group-hover:opacity-100 px-1.5"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              setEditingData(lesson)
                                              setActiveModal({ type: 'lesson', isOpen: true, moduleId: module.id, itemId: lesson.id })
                                            }}
                                          >
                                            <Wand2 className="h-3 w-3" />
                                            Builder
                                          </Button>

                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 opacity-0 group-hover:opacity-100"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              deleteLesson(module.id, lesson.id)
                                            }}
                                          >
                                            <Trash2 className="h-3 w-3 text-red-500" />
                                          </Button>
                                        </div>

                                        {expandedLessons.has(lesson.id) && (
                                          <div className="mt-1 space-y-1">
                                            {/* Media */}
                                            <TreeItem depth={3} isLast={false}>
                                              <div className="py-1 px-2 rounded bg-gray-50 border border-gray-200 group/media">
                                                <div className="flex items-center gap-1.5">
                                                  <Video className="h-3 w-3 text-gray-500" />
                                                  <span className="text-[10px] text-muted-foreground">Media</span>
                                                  <span className="text-[10px] text-muted-foreground">
                                                    ({lesson.media?.videos?.length || 0}v, {lesson.media?.images?.length || 0}i)
                                                  </span>
                                                  <div className="flex items-center gap-1 ml-auto opacity-0 group-hover/media:opacity-100">
                                                    <label className="cursor-pointer">
                                                      <input
                                                        type="file"
                                                        accept="video/*"
                                                        multiple
                                                        className="hidden"
                                                        onChange={(e) => handleMediaUpload(module.id, lesson.id, e.target.files, 'video')}
                                                      />
                                                      <span className="flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-700">
                                                        <Upload className="h-3 w-3" /> Vid
                                                      </span>
                                                    </label>
                                                    <label className="cursor-pointer">
                                                      <input
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        className="hidden"
                                                        onChange={(e) => handleMediaUpload(module.id, lesson.id, e.target.files, 'image')}
                                                      />
                                                      <span className="flex items-center gap-1 text-[10px] text-green-600 hover:text-green-700">
                                                        <ImageIcon className="h-3 w-3" /> Img
                                                      </span>
                                                    </label>
                                                  </div>
                                                </div>
                                                {/* List uploaded media */}
                                                {(lesson.media?.videos?.length > 0 || lesson.media?.images?.length > 0) && (
                                                  <div className="mt-1.5 space-y-0.5 pl-4 border-l border-dashed border-gray-300 ml-1">
                                                    {lesson.media?.videos?.map((video, vIdx) => (
                                                      <div key={video.id} className="flex items-center gap-1 text-[10px] text-gray-600">
                                                        <Play className="h-3 w-3" />
                                                        <span className="truncate flex-1">{video.title}</span>
                                                        <span className="text-gray-400">{video.duration > 0 ? `${Math.floor(video.duration / 60)}m` : '—'}</span>
                                                      </div>
                                                    ))}
                                                    {lesson.media?.images?.map((img, iIdx) => (
                                                      <div key={img.id} className="flex items-center gap-1 text-[10px] text-gray-600">
                                                        <ImageIcon className="h-3 w-3" />
                                                        <span className="truncate flex-1">{img.title}</span>
                                                      </div>
                                                    ))}
                                                  </div>
                                                )}
                                              </div>
                                            </TreeItem>

                                            {/* Docs */}
                                            <TreeItem depth={3} isLast={false}>
                                              <div className="py-1 px-2 rounded bg-gray-50 border border-gray-200 group/docs">
                                                <div className="flex items-center gap-1.5">
                                                  <FileText className="h-3 w-3 text-gray-500" />
                                                  <span className="text-[10px] text-muted-foreground">Docs ({lesson.docs?.length || 0})</span>
                                                  <label className="cursor-pointer ml-auto opacity-0 group-hover/docs:opacity-100">
                                                    <input
                                                      type="file"
                                                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                                                      multiple
                                                      className="hidden"
                                                      onChange={(e) => handleDocUpload(module.id, lesson.id, e.target.files)}
                                                    />
                                                    <span className="flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-700">
                                                      <Upload className="h-3 w-3" /> Upload
                                                    </span>
                                                  </label>
                                                </div>
                                                {/* List uploaded docs */}
                                                {lesson.docs?.length > 0 && (
                                                  <div className="mt-1.5 space-y-0.5 pl-4 border-l border-dashed border-gray-300 ml-1">
                                                    {lesson.docs?.map((doc, dIdx) => (
                                                      <div key={doc.id} className="flex items-center gap-1 text-[10px] text-gray-600">
                                                        <FileText className="h-3 w-3" />
                                                        <span className="truncate flex-1">{doc.title}</span>
                                                        <span className="text-gray-400 uppercase">{doc.type}</span>
                                                      </div>
                                                    ))}
                                                  </div>
                                                )}
                                              </div>
                                            </TreeItem>

                                            {/* Content - with drag sorting */}
                                            <SortableContext
                                              items={lesson.content?.map(c => c.id) || []}
                                              strategy={verticalListSortingStrategy}
                                            >
                                              {(lesson.content || []).map((contentItem, idx) => (
                                                <SortableTreeItem key={contentItem.id} id={contentItem.id} depth={3} isLast={idx === (lesson.content?.length || 0) - 1}>
                                                  <div className="flex items-center gap-1.5 py-1 px-2 rounded bg-teal-50 border border-teal-200 group/item">
                                                    <BookOpen className="h-3 w-3 text-teal-500" />
                                                    <span className="text-[10px] flex-1 truncate">{contentItem.title}</span>
                                                    <Badge variant="outline" className="text-[8px] h-4 px-1 bg-teal-100 capitalize">{contentItem.type}</Badge>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                                      onClick={() => {
                                                        setEditingData(contentItem)
                                                        setActiveModal({ type: 'content', isOpen: true, moduleId: module.id, lessonId: lesson.id, itemId: contentItem.id })
                                                      }}
                                                    >
                                                      <Wand2 className="h-3 w-3" />
                                                    </Button>
                                                  </div>
                                                </SortableTreeItem>
                                              ))}
                                            </SortableContext>
                                            <TreeItem depth={3} isLast={false}>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-5 text-[10px] gap-1 text-teal-600 px-2"
                                                onClick={() => addContent(module.id, lesson.id)}
                                              >
                                                <Plus className="h-3 w-3" />
                                                Content
                                              </Button>
                                            </TreeItem>

                                            {/* Tasks - with drag sorting */}
                                            <SortableContext
                                              items={lesson.tasks?.map(t => t.id) || []}
                                              strategy={verticalListSortingStrategy}
                                            >
                                              {(lesson.tasks || []).map((task, idx) => (
                                                <SortableTreeItem key={task.id} id={task.id} depth={3} isLast={idx === (lesson.tasks?.length || 0) - 1}>
                                                  <div
                                                    className="flex items-center gap-1.5 py-1 px-2 rounded bg-orange-50 border border-orange-200 group/item cursor-pointer hover:bg-orange-100"
                                                    onClick={() => setSelectedItem({ type: 'task', id: task.id })}
                                                  >
                                                    <ListTodo className="h-3 w-3 text-orange-500" />
                                                    <span className="text-[10px] flex-1 truncate">{task.title}</span>
                                                    <span className="text-[10px] text-muted-foreground">{task.points}pts</span>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                                      onClick={(e) => {
                                                        e.stopPropagation()
                                                        setEditingData(task)
                                                        setActiveModal({ type: 'task', isOpen: true, moduleId: module.id, lessonId: lesson.id, itemId: task.id })
                                                      }}
                                                    >
                                                      Edit
                                                    </Button>
                                                  </div>
                                                </SortableTreeItem>
                                              ))}
                                            </SortableContext>
                                            <TreeItem depth={3} isLast={false}>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-5 text-[10px] gap-1 text-orange-600 px-2"
                                                onClick={() => addTask(module.id, lesson.id)}
                                              >
                                                <Plus className="h-3 w-3" />
                                                Task
                                              </Button>
                                            </TreeItem>

                                            {/* Homework - with drag sorting */}
                                            <SortableContext
                                              items={lesson.homework?.map(h => h.id) || []}
                                              strategy={verticalListSortingStrategy}
                                            >
                                              {(lesson.homework || []).map((hw, idx) => (
                                                <SortableTreeItem key={hw.id} id={hw.id} depth={3} isLast={idx === (lesson.homework?.length || 0) - 1}>
                                                  <div
                                                    className="flex items-center gap-1.5 py-1 px-2 rounded bg-purple-50 border border-purple-200 group/item cursor-pointer hover:bg-purple-100"
                                                    onClick={() => setSelectedItem({ type: 'homework', id: hw.id })}
                                                  >
                                                    <Home className="h-3 w-3 text-purple-500" />
                                                    <span className="text-[10px] flex-1 truncate">{hw.title}</span>
                                                    <span className="text-[10px] text-muted-foreground">{hw.points}pts</span>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                                      onClick={(e) => {
                                                        e.stopPropagation()
                                                        setEditingData(hw)
                                                        setActiveModal({ type: 'homework', isOpen: true, moduleId: module.id, lessonId: lesson.id, itemId: hw.id })
                                                      }}
                                                    >
                                                      Edit
                                                    </Button>
                                                  </div>
                                                </SortableTreeItem>
                                              ))}
                                            </SortableContext>
                                            <TreeItem depth={3} isLast={false}>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-5 text-[10px] gap-1 text-purple-600 px-2"
                                                onClick={() => addHomework(module.id, lesson.id)}
                                              >
                                                <Plus className="h-3 w-3" />
                                                Homework
                                              </Button>
                                            </TreeItem>

                                            {/* Lesson Quizzes - with drag sorting */}
                                            <SortableContext
                                              items={lesson.quizzes?.map(q => q.id) || []}
                                              strategy={verticalListSortingStrategy}
                                            >
                                              {(lesson.quizzes || []).map((quiz, idx) => (
                                                <SortableTreeItem key={quiz.id} id={quiz.id} depth={3} isLast={idx === (lesson.quizzes?.length || 0) - 1}>
                                                  <div
                                                    className="flex items-center gap-1.5 py-1 px-2 rounded bg-red-50 border border-red-200 group/item cursor-pointer hover:bg-red-100"
                                                    onClick={() => setSelectedItem({ type: 'quiz', id: quiz.id })}
                                                  >
                                                    <FileQuestion className="h-3 w-3 text-red-500" />
                                                    <span className="text-[10px] text-red-600 font-medium">Lesson:</span>
                                                    <span className="text-[10px] flex-1 truncate">{quiz.title.replace('Lesson quiz ', 'Quiz ')}</span>
                                                    <Badge variant="outline" className="text-[8px] h-4 px-1 bg-red-100">Formative</Badge>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                                      onClick={(e) => {
                                                        e.stopPropagation()
                                                        setEditingData(quiz)
                                                        setActiveModal({ type: 'quiz', isOpen: true, moduleId: module.id, lessonId: lesson.id, itemId: quiz.id })
                                                      }}
                                                    >
                                                      Edit
                                                    </Button>
                                                  </div>
                                                </SortableTreeItem>
                                              ))}
                                            </SortableContext>
                                            <TreeItem depth={3} isLast={(module.moduleQuizzes?.length || 0) === 0}>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-5 text-[10px] gap-1 text-red-600 px-2"
                                                onClick={() => addQuiz(module.id, lesson.id)}
                                              >
                                                <Plus className="h-3 w-3" />
                                                Lesson quiz
                                              </Button>
                                            </TreeItem>
                                          </div>
                                        )}
                                      </div>
                                    </SortableTreeItem>
                                  ))}
                                </SortableContext>

                                {/* End of Module Quizzes */}
                                {(module.moduleQuizzes || []).map((quiz, quizIdx) => (
                                  <TreeItem key={quiz.id} depth={2} isLast={quizIdx === (module.moduleQuizzes?.length || 0) - 1}>
                                    <div
                                      className="flex items-center gap-1.5 py-1 px-2 rounded bg-red-100 border border-red-300 group cursor-pointer hover:bg-red-200"
                                      onClick={() => setSelectedItem({ type: 'moduleQuiz', id: quiz.id })}
                                    >
                                      <FileQuestion className="h-3 w-3 text-red-600" />
                                      <span className="text-xs font-medium flex-1 truncate">{quiz.title}</span>
                                      <Badge variant="default" className="text-[8px] h-4 px-1 bg-red-600">Summative</Badge>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-5 text-[10px] gap-1 opacity-0 group-hover:opacity-100 px-1"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setEditingData(quiz)
                                          setActiveModal({ type: 'moduleQuiz', isOpen: true, moduleId: module.id, itemId: quiz.id })
                                        }}
                                      >
                                        Edit
                                      </Button>
                                    </div>
                                  </TreeItem>
                                ))}
                                <TreeItem depth={2} isLast={true}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-[10px] gap-1 text-red-700 font-medium px-2"
                                    onClick={() => addModuleQuiz(module.id)}
                                  >
                                    <Plus className="h-3 w-3" />
                                    End of module quiz
                                  </Button>
                                </TreeItem>
                              </div>
                            )}
                          </div>
                        </SortableTreeItem>
                      ))}
                    </SortableContext>

                    {modules.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Layers className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No modules yet. Click "Module" to add one.</p>
                      </div>
                    )}
                  </div>
                </DndContext>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* CENTER PANEL - Preview/Workspace */}
        <div className="col-span-5">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              {(() => {
                const resolved = resolveSelectedItem(selectedItem, modules)
                if (!resolved) {
                  return (
                    <div className="flex items-center justify-center text-muted-foreground h-full min-h-[200px]">
                      <div className="text-center">
                        <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p>Select an item from the left to preview</p>
                        <p className="text-sm mt-2">Click a lesson, task, quiz, or homework</p>
                      </div>
                    </div>
                  )
                }
                const { item, moduleId, lessonId } = resolved
                const itemType = selectedItem?.type as 'task' | 'homework' | 'quiz' | 'moduleQuiz' | 'lesson' | 'module'
                const onEdit = () => {
                  if (itemType === 'lesson') {
                    setEditingData(item)
                    setActiveModal({ type: 'lesson', isOpen: true, moduleId, lessonId })
                    return
                  }
                  if (itemType === 'module') {
                    setEditingData(item)
                    setActiveModal({ type: 'module', isOpen: true, moduleId })
                    return
                  }
                  setEditingData(item)
                  setActiveModal({
                    type: itemType || 'task',
                    isOpen: true,
                    moduleId,
                    lessonId,
                    itemId: item.id
                  })
                }
                const onRemove = () => {
                  if (!confirm(`Remove "${item.title}"? This cannot be undone.`)) return
                  if (selectedItem?.type === 'task' && lessonId) deleteTask(moduleId, lessonId, item.id)
                  else if (selectedItem?.type === 'homework' && lessonId) deleteHomework(moduleId, lessonId, item.id)
                  else if (selectedItem?.type === 'quiz' && lessonId) deleteQuiz(moduleId, lessonId, item.id)
                  else if (selectedItem?.type === 'moduleQuiz') deleteModuleQuiz(moduleId, item.id)
                }
                const onDuplicate = () => {
                  if (selectedItem?.type === 'task' && lessonId) duplicateTask(moduleId, lessonId, item as Task)
                  else if (selectedItem?.type === 'homework' && lessonId) duplicateHomework(moduleId, lessonId, item as Homework)
                  else if (selectedItem?.type === 'quiz' && lessonId) duplicateQuiz(moduleId, lessonId, item as Quiz)
                  else if (selectedItem?.type === 'moduleQuiz') duplicateModuleQuiz(moduleId, item as ModuleQuiz)
                }
                return (
                  <PreviewCard
                    type={itemType}
                    item={item}
                    onEdit={onEdit}
                    onDuplicate={onDuplicate}
                    onRemove={onRemove}
                    courseId={courseId}
                    lessonId={lessonId}
                  />
                )
              })()}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANEL - AI Assistant & Templates */}
        <div className="col-span-3 space-y-4">
          {/* AI Suggestions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-amber-500" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {AI_SUGGESTIONS.slice(0, 3).map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-start gap-2 p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <suggestion.icon className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{suggestion.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{suggestion.description}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Zap className="h-3 w-3" />
                Generate More Ideas
              </Button>
            </CardContent>
          </Card>

          {/* Templates */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <LayoutTemplate className="h-4 w-4 text-blue-500" />
                Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {CONTENT_TEMPLATES.slice(0, 4).map((template) => (
                <div
                  key={template.id}
                  className="flex items-center gap-2 p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <template.icon className="h-4 w-4 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{template.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{template.description}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Templates
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Course Stats</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold">{modules.length}</p>
                  <p className="text-xs text-muted-foreground">Modules</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold">
                    {modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold">
                    {modules.reduce((acc, m) => acc + m.lessons.reduce((lacc, l) => lacc + l.quizzes.length, 0) + m.moduleQuizzes.length, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Quizzes</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold">
                    {modules.reduce((acc, m) => acc + m.lessons.reduce((lacc, l) => lacc + l.tasks.length + l.homework.length, 0), 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Activities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {onSave && (
            <Button onClick={() => onSave(modules)} className="w-full gap-2">
              <Save className="h-4 w-4" />
              Save Course
            </Button>
          )}
        </div>

        {/* Modals */}
        <ModuleBuilderModal
          isOpen={activeModal.type === 'module' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'module', isOpen: false })}
          onSave={handleSaveModule}
          initialData={editingData}
        />

        <LessonBuilderModal
          isOpen={activeModal.type === 'lesson' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'lesson', isOpen: false })}
          onSave={handleSaveLesson}
          initialData={editingData}
          allLessons={getAllLessons()}
        />

        <TaskBuilderModal
          isOpen={activeModal.type === 'task' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'task', isOpen: false })}
          onSave={handleSaveTask}
          initialData={editingData}
        />

        <HomeworkBuilderModal
          isOpen={activeModal.type === 'homework' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'homework', isOpen: false })}
          onSave={handleSaveHomework}
          initialData={editingData}
        />

        <QuizBuilderModal
          isOpen={activeModal.type === 'quiz' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'quiz', isOpen: false })}
          onSave={handleSaveQuiz}
          initialData={editingData}
        />

        <QuizBuilderModal
          isOpen={activeModal.type === 'moduleQuiz' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'moduleQuiz', isOpen: false })}
          onSave={handleSaveModuleQuiz}
          initialData={editingData}
          isModuleQuiz={true}
        />

        <ContentBuilderModal
          isOpen={activeModal.type === 'content' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'content', isOpen: false })}
          onSave={handleSaveContent}
          initialData={editingData}
        />
      </div>
    </div>
  )
}
