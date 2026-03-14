'use client'

import { useState, useCallback, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
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
import { AutoTextarea } from '@/components/ui/auto-textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { extractTextFromFile } from '@/lib/extract-file-text'
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
  FolderOpen,
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
  Play,
  Lock,
  Unlock,
  Shield,
  Loader2,
  BarChart3,
  Signal,
  SignalHigh,
  SignalLow,
  Settings,
  Layers2,
  GripHorizontal,
  CornerDownLeft
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

export interface ImportedLearningResource {
  fileName: string
  mimeType: string
  fileUrl: string
  extractedText: string
  uploadedAt: string
}

export interface VisibleDocumentPayload {
  title: string
  description?: string
  itemType: 'task' | 'homework' | 'worksheet' | 'moduleQuiz'
  sourceDocument?: ImportedLearningResource
  questions?: QuizQuestion[]
}

export interface Task extends WithDifficultyVariants {
  id: string
  title: string
  shortDescription?: string
  description: string
  instructions: string
  extensions?: Array<{ id: string; name: string; description?: string; content: string; pci: string }>
  dmiItems?: DMIQuestion[]
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
  sourceDocument?: ImportedLearningResource
}

export interface Assessment extends WithDifficultyVariants {
  id: string
  title: string
  description: string
  instructions: string
  dmiItems?: DMIQuestion[]
  category?: 'assessment' | 'homework'
  dueDate?: string
  estimatedMinutes: number
  points: number
  submissionType: 'text' | 'file' | 'link' | 'multiple' | 'questions'
  isAiGraded?: boolean
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
  attemptsAllowed?: number
  passingScore?: number
  showCorrectAnswers?: boolean
  answersNeverVisible?: boolean
  /** When false, not visible to students (draft) */
  isPublished?: boolean
  sourceDocument?: ImportedLearningResource
}

export interface QuizQuestion {
  id: string
  type: 'mcq' | 'truefalse' | 'shortanswer' | 'essay' | 'multiselect' | 'matching' | 'fillblank'
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  points: number
  explanation?: string
  matchingPairs?: Array<{ left: string; right: string }>
  extendEnabled?: boolean
}

export interface Quiz extends WithDifficultyVariants {
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
  sourceDocument?: ImportedLearningResource
  /** Allow late submissions */
  allowLateSubmission?: boolean
  /** Late penalty percentage */
  latePenalty?: number
  /** @protected Instructor-only answer key */
  answerKey?: string
  /** @protected Whether answer key is encrypted/protected */
  answerKeyProtected?: boolean
}

export interface Content {
  id: string
  title: string
  type: 'text' | 'video' | 'audio' | 'interactive' | 'embed'
  body?: string
  url?: string
  duration?: number
  order: number
  sourceDocument?: ImportedLearningResource
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

export interface Worksheet extends WithDifficultyVariants {
  id: string
  title: string
  description: string
  instructions: string
  estimatedMinutes: number
  points: number
  questions: QuizQuestion[]
  randomizeQuestions: boolean
  timeLimit?: number
  passingScore?: number
  allowMultipleAttempts: boolean
  maxAttempts?: number
  showCorrectAnswers: boolean
  /** @protected Instructor-only answer key */
  answerKey?: string
  /** @protected Whether answer key is encrypted/protected */
  answerKeyProtected?: boolean
  /** When false, not visible to students (draft) */
  isPublished?: boolean
  sourceDocument?: ImportedLearningResource
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
  homework: Assessment[]
  worksheets: Worksheet[]
  /** @deprecated legacy lesson quiz items are migrated into `homework` (Assessment) */
  quizzes?: Quiz[]
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
  panelMode?: 'default' | 'live-class'
  initialModules?: Module[]
  onMakeVisibleToStudents?: (payload: VisibleDocumentPayload) => void
  onSave?: (
    modules: Module[],
    options?: {
      developmentMode: 'single' | 'multi'
      previewDifficulty: 'all' | 'beginner' | 'intermediate' | 'advanced'
    }
  ) => void
}

export interface CourseBuilderRef {
  save: () => void
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
  worksheets: [],
  quizzes: [],
  difficultyMode: 'all',
  variants: {}
})

const DEFAULT_WORKSHEET = (order: number): Worksheet => ({
  id: `worksheet-${generateId()}`,
  title: `Worksheet ${order + 1}`,
  description: '',
  instructions: '',
  estimatedMinutes: 20,
  points: 15,
  questions: [],
  randomizeQuestions: false,
  timeLimit: undefined,
  passingScore: 70,
  allowMultipleAttempts: true,
  maxAttempts: 3,
  showCorrectAnswers: true,
  answerKey: '',
  answerKeyProtected: true,
  difficultyMode: 'all',
  variants: {},
  isPublished: false
})

const DEFAULT_TASK = (order: number): Task => ({
  id: `task-${generateId()}`,
  title: `Task ${order + 1}`,
  shortDescription: '',
  description: '',
  instructions: '',
  extensions: [],
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

const DEFAULT_HOMEWORK = (order: number, category: 'assessment' | 'homework' = 'assessment'): Assessment => ({
  id: `homework-${generateId()}`,
  title: category === 'homework' ? `Homework ${order + 1}` : `Assessment ${order + 1}`,
  description: '',
  instructions: '',
  category,
  estimatedMinutes: 30,
  points: 20,
  submissionType: 'file',
  isAiGraded: false,
  allowLateSubmission: true,
  questions: [],
  randomizeQuestions: false,
  timeLimit: undefined,
  attemptsAllowed: 1,
  passingScore: 70,
  showCorrectAnswers: true,
  answersNeverVisible: false,
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
  isPublished: false,
  allowLateSubmission: true,
  latePenalty: 0,
  answerKey: '',
  answerKeyProtected: true
})

const DEFAULT_MODULE_QUIZ = (order: number): ModuleQuiz => ({
  ...DEFAULT_QUIZ(order),
  coverage: 'all_lessons'
})

const DEFAULT_MODULE = (order: number): Module => ({
  id: `module-${generateId()}`,
  title: `Lesson ${order + 1}`,
  description: '',
  order,
  isPublished: false,
  lessons: [DEFAULT_LESSON(0)],
  moduleQuizzes: [],
  difficultyMode: 'all',
  variants: {}
})

function convertQuizToAssessment(quiz: Quiz): Assessment {
  return {
    id: `homework-${generateId()}`,
    title: quiz.title?.replace(/quiz/gi, 'Assessment') || 'Assessment',
    description: quiz.description || '',
    instructions: quiz.description || '',
    category: 'assessment',
    estimatedMinutes: quiz.timeLimit ?? 30,
    points: quiz.questions?.reduce((sum, q) => sum + (q.points || 1), 0) || 20,
    submissionType: 'questions',
    allowLateSubmission: true,
    latePenalty: 0,
    questions: quiz.questions || [],
    randomizeQuestions: quiz.randomizeQuestions || false,
    timeLimit: quiz.timeLimit,
    attemptsAllowed: quiz.attemptsAllowed || 1,
    passingScore: quiz.passingScore,
    showCorrectAnswers: quiz.showCorrectAnswers ?? true,
    answersNeverVisible: quiz.answersNeverVisible ?? false,
    answerKey: '',
    answerKeyProtected: true,
    difficultyMode: quiz.difficultyMode ?? 'all',
    variants: quiz.variants ?? {},
    isPublished: quiz.isPublished ?? false,
    sourceDocument: quiz.sourceDocument,
  }
}

function normalizeModulesForAssessments(rawModules: Module[]): Module[] {
  return rawModules.map((module) => ({
    ...module,
    lessons: ((module.lessons && module.lessons.length > 0) ? module.lessons : [DEFAULT_LESSON(0)]).map((lesson) => {
      const existingAssessments = lesson.homework || []
      const migratedAssessments = (lesson.quizzes || []).map(convertQuizToAssessment)
      return {
        ...lesson,
        homework: [...existingAssessments, ...migratedAssessments],
        quizzes: [],
      }
    }),
  }))
}

function normalizeGeneratedQuestionType(rawType: unknown): QuizQuestion['type'] {
  const type = typeof rawType === 'string' ? rawType.trim().toLowerCase() : ''
  if (type === 'mcq' || type === 'multiple_choice') return 'mcq'
  if (type === 'multiselect' || type === 'multi_select') return 'multiselect'
  if (type === 'truefalse' || type === 'true_false') return 'truefalse'
  if (type === 'matching') return 'matching'
  if (type === 'fillblank' || type === 'fill_in_blank') return 'fillblank'
  if (type === 'shortanswer' || type === 'short_answer') return 'shortanswer'
  return 'essay'
}

function mapGeneratedModulesToBuilder(rawModules: unknown[]): Module[] {
  if (!Array.isArray(rawModules)) return []

  return rawModules.map((rawModule, moduleIdx) => {
    const moduleObj = (rawModule ?? {}) as Record<string, any>
    const rawLessons = Array.isArray(moduleObj.lessons) ? moduleObj.lessons : []
    const rawExam = moduleObj.exam && typeof moduleObj.exam === 'object' ? moduleObj.exam : null

    return {
      ...DEFAULT_MODULE(moduleIdx),
      title: String(moduleObj.title || `Lesson ${moduleIdx + 1}`),
      description: String(moduleObj.description || ''),
      lessons: rawLessons.map((rawLesson: Record<string, any>, lessonIdx: number) => {
        const tasks = Array.isArray(rawLesson.tasks) ? rawLesson.tasks : []
        const assessments = Array.isArray(rawLesson.assessments) ? rawLesson.assessments : []
        const worksheets = Array.isArray(rawLesson.worksheets) ? rawLesson.worksheets : []

        const mapQuestions = (rawQuestions: unknown[]): QuizQuestion[] =>
          (Array.isArray(rawQuestions) ? rawQuestions : []).map((rawQuestion: unknown, questionIdx: number) => {
            const questionObj = (rawQuestion ?? {}) as Record<string, any>
            const qType = normalizeGeneratedQuestionType(questionObj.type)
            return {
              id: `q-${generateId()}`,
              type: qType,
              question: String(questionObj.question || `Question ${questionIdx + 1}`),
              options: (qType === 'mcq' || qType === 'multiselect')
                ? (Array.isArray(questionObj.options) && questionObj.options.length > 0
                  ? questionObj.options.map((opt: unknown) => String(opt))
                  : ['', '', '', ''])
                : qType === 'truefalse'
                  ? ['True', 'False']
                  : undefined,
              correctAnswer: questionObj.correctAnswer as string | string[] | undefined,
              points: Math.max(1, Number(questionObj.points) || 1),
              explanation: typeof questionObj.explanation === 'string' ? questionObj.explanation : '',
            }
          })

        return {
          ...DEFAULT_LESSON(lessonIdx),
          title: String(rawLesson.title || `Lesson ${lessonIdx + 1}`),
          description: String(rawLesson.description || ''),
          duration: Math.max(15, Number(rawLesson.duration) || 45),
          tasks: tasks.map((task: Record<string, any>, taskIdx: number) => ({
            ...DEFAULT_TASK(taskIdx),
            title: String(task.title || `Task ${taskIdx + 1}`),
            description: String(task.description || ''),
            instructions: String(task.instructions || ''),
            estimatedMinutes: Math.max(5, Number(task.estimatedMinutes) || 15),
            points: Math.max(1, Number(task.points) || 10),
            submissionType: Array.isArray(task.questions) && task.questions.length > 0 ? 'questions' : 'text',
            questions: mapQuestions(Array.isArray(task.questions) ? task.questions : []),
          })),
          homework: assessments.map((assessment: Record<string, any>, assessmentIdx: number) => ({
            ...DEFAULT_HOMEWORK(assessmentIdx),
            title: String(assessment.title || `Assessment ${assessmentIdx + 1}`),
            description: String(assessment.description || ''),
            instructions: String(assessment.instructions || ''),
            estimatedMinutes: Math.max(10, Number(assessment.estimatedMinutes) || 30),
            points: Math.max(1, Number(assessment.points) || 20),
            submissionType: Array.isArray(assessment.questions) && assessment.questions.length > 0 ? 'questions' : 'text',
            questions: mapQuestions(Array.isArray(assessment.questions) ? assessment.questions : []),
          })),
          worksheets: worksheets.map((worksheet: Record<string, any>, worksheetIdx: number) => ({
            ...DEFAULT_WORKSHEET(worksheetIdx),
            title: String(worksheet.title || `Worksheet ${worksheetIdx + 1}`),
            description: String(worksheet.description || ''),
            instructions: String(worksheet.instructions || ''),
            estimatedMinutes: Math.max(10, Number(worksheet.estimatedMinutes) || 20),
            points: Math.max(1, Number(worksheet.points) || 15),
            questions: mapQuestions(Array.isArray(worksheet.questions) ? worksheet.questions : []),
          })),
        }
      }),
      moduleQuizzes: rawExam
        ? [{
          ...DEFAULT_MODULE_QUIZ(0),
          title: String(rawExam.title || `Lesson ${moduleIdx + 1} Exam`),
          description: String(rawExam.description || ''),
          questions: (Array.isArray(rawExam.questions) ? rawExam.questions : []).map((rawQuestion: unknown, questionIdx: number) => {
            const questionObj = (rawQuestion ?? {}) as Record<string, any>
            const qType = normalizeGeneratedQuestionType(questionObj.type)
            return {
              id: `q-${generateId()}`,
              type: qType,
              question: String(questionObj.question || `Question ${questionIdx + 1}`),
              options: (qType === 'mcq' || qType === 'multiselect')
                ? (Array.isArray(questionObj.options) && questionObj.options.length > 0
                  ? questionObj.options.map((opt: unknown) => String(opt))
                  : ['', '', '', ''])
                : qType === 'truefalse'
                  ? ['True', 'False']
                  : undefined,
              correctAnswer: questionObj.correctAnswer as string | string[] | undefined,
              points: Math.max(1, Number(questionObj.points) || 1),
              explanation: typeof questionObj.explanation === 'string' ? questionObj.explanation : '',
            }
          }),
        }]
        : [],
    }
  })
}

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

type ResourceTargetField = 'instructions' | 'body' | 'description'

interface ResourceImportPanelProps<T extends { sourceDocument?: ImportedLearningResource; questions?: QuizQuestion[]; submissionType?: string }> {
  data: T
  setData: (next: T) => void
  targetField: ResourceTargetField
}

interface QuestionBankItemLite {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: string | string[] | null
  points?: number
}

function toBuilderQuestionType(type: string): QuizQuestion['type'] {
  if (type === 'multiple_choice') return 'mcq'
  if (type === 'multi_select') return 'multiselect'
  if (type === 'true_false') return 'truefalse'
  if (type === 'fill_in_blank') return 'fillblank'
  if (type === 'matching') return 'matching'
  if (type === 'short_answer') return 'shortanswer'
  return 'essay'
}

function mapQuestionBankToBuilderQuestion(item: QuestionBankItemLite): QuizQuestion {
  const builderType = toBuilderQuestionType(item.type)
  const options = Array.isArray(item.options) ? item.options : undefined
  const normalizedCorrect = (() => {
    if (builderType === 'truefalse' && typeof item.correctAnswer === 'string') {
      return item.correctAnswer.toLowerCase() === 'true' ? 'True' : 'False'
    }
    return item.correctAnswer ?? undefined
  })()

  return {
    id: `q-${generateId()}`,
    type: builderType,
    question: item.question || '',
    options: builderType === 'mcq' || builderType === 'multiselect'
      ? (options && options.length > 0 ? options : ['', '', '', ''])
      : (builderType === 'truefalse' ? ['True', 'False'] : undefined),
    correctAnswer: normalizedCorrect as string | string[] | undefined,
    points: Math.max(1, item.points ?? 1),
  }
}

/**
 * Generate a PDF question paper from questions using jsPDF
 */
function generateQuestionPaperPDF(title: string, description: string, questions: QuizQuestion[]): { blob: Blob; url: string; fileName: string } {
  // Dynamic import jsPDF to avoid SSR issues
  const jsPDF = require('jspdf')
  const doc = new jsPDF()

  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 15
  const contentWidth = pageWidth - (margin * 2)
  let y = 20

  // Title
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text(title.toUpperCase(), pageWidth / 2, y, { align: 'center' })
  y += 12

  // Line under title
  doc.setDrawColor(0)
  doc.line(margin, y, pageWidth - margin, y)
  y += 10

  // Instructions
  if (description) {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('INSTRUCTIONS:', margin, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    const descLines = doc.splitTextToSize(description, contentWidth)
    doc.text(descLines, margin, y)
    y += (descLines.length * 5) + 8
  }

  // Summary box
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, y - 5, contentWidth, 15, 'F')
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0)
  doc.text(`Total Questions: ${questions.length}    |    Total Points: ${totalPoints}`, margin + 5, y + 5)
  y += 20

  // Questions
  questions.forEach((q, idx) => {
    // Check for page break
    if (y > 260) {
      doc.addPage()
      y = 20
    }

    // Question header
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(`Question ${idx + 1}`, margin, y)

    // Points badge
    doc.setFillColor(230, 230, 230)
    doc.rect(pageWidth - margin - 30, y - 5, 30, 8, 'F')
    doc.setFontSize(9)
    doc.text(`${q.points || 1} pt${q.points !== 1 ? 's' : ''}`, pageWidth - margin - 15, y, { align: 'center' })
    y += 8

    // Question text
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    const questionLines = doc.splitTextToSize(q.question, contentWidth)
    doc.text(questionLines, margin, y)
    y += (questionLines.length * 5) + 6

    // Options for MCQ/Multi-select
    if (q.options && q.options.length > 0) {
      q.options.forEach((opt, optIdx) => {
        if (y > 270) {
          doc.addPage()
          y = 20
        }
        const letter = String.fromCharCode(65 + optIdx)
        doc.setFontSize(10)
        doc.text(`    ${letter}. ${opt}`, margin, y)
        y += 6
      })
      y += 4
    }

    // True/False
    if (q.type === 'truefalse') {
      doc.text('    [  ] True', margin + 5, y)
      y += 6
      doc.text('    [  ] False', margin + 5, y)
      y += 10
    }

    // Fill in blank
    if (q.type === 'fillblank') {
      doc.setDrawColor(180)
      doc.line(margin + 5, y, margin + 100, y)
      y += 10
    }

    // Short answer
    if (q.type === 'shortanswer') {
      doc.setDrawColor(180)
      doc.line(margin + 5, y, pageWidth - margin, y)
      y += 12
    }

    // Essay
    if (q.type === 'essay') {
      doc.setDrawColor(180)
      for (let i = 0; i < 4; i++) {
        doc.line(margin + 5, y + (i * 8), pageWidth - margin, y + (i * 8))
      }
      y += 40
    }

    y += 8
  })

  // Footer
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128)
    doc.text(`Page ${i} of ${totalPages}  |  ${title}`, pageWidth / 2, 285, { align: 'center' })
  }

  const pdfBlob = doc.output('blob')
  const pdfUrl = URL.createObjectURL(pdfBlob)
  const fileName = `${title.replace(/[^a-z0-9]/gi, '_')}_Question_Paper.pdf`

  return { blob: pdfBlob, url: pdfUrl, fileName }
}

function formatMatchingExplanation(pairs: Array<{ left: string; right: string }>) {
  if (pairs.length === 0) return ''
  return ['Column A | Column B', ...pairs.map((pair) => `${pair.left} | ${pair.right}`)].join('\n')
}

function MatchingPairsEditor({
  pairs,
  onChange,
}: {
  pairs: Array<{ left: string; right: string }>
  onChange: (next: Array<{ left: string; right: string }>) => void
}) {
  const updatePair = (index: number, field: 'left' | 'right', value: string) => {
    const next = pairs.map((pair, idx) => (idx === index ? { ...pair, [field]: value } : pair))
    onChange(next)
  }

  const addPair = () => onChange([...pairs, { left: '', right: '' }])
  const removePair = (index: number) => onChange(pairs.filter((_, idx) => idx !== index))

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3 text-xs font-medium text-muted-foreground">
        <span>Column A</span>
        <span>Column B</span>
      </div>
      <div className="space-y-2">
        {pairs.map((pair, idx) => (
          <div key={`pair-${idx}`} className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 items-center">
            <Input
              value={pair.left}
              onChange={(e: any) => updatePair(idx, 'left', e.target.value)}
              placeholder={`Left ${idx + 1}`}
            />
            <div className="text-xs text-muted-foreground">↔</div>
            <Input
              value={pair.right}
              onChange={(e: any) => updatePair(idx, 'right', e.target.value)}
              placeholder={`Right ${idx + 1}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => removePair(idx)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addPair}>
        <Plus className="h-3 w-3 mr-1" /> Add pair
      </Button>
      <div className="text-xs text-muted-foreground">
        Use the arrow as a visual cue for linking pairs. Students will match Column A to Column B.
      </div>
    </div>
  )
}

function QuestionBankQuickImport({
  onImport,
  className,
  showOpenButton = true,
  triggerClassName,
}: {
  onImport: (questions: QuizQuestion[]) => void
  className?: string
  showOpenButton?: boolean
  triggerClassName?: string
}) {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<QuestionBankItemLite[]>([])
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/tutor/question-bank?limit=100', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        const next = Array.isArray(data.questions) ? data.questions : []
        if (active) setItems(next)
      } catch {
        // Non-fatal.
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const handleSelect = (value: string) => {
    setSelectedId(value)
    const selected = items.find((item) => item.id === value)
    if (!selected) return
    onImport([mapQuestionBankToBuilderQuestion(selected)])
    toast.success('Question imported from question bank')
    setSelectedId('')
  }

  return (
    <div className={cn("rounded border border-dashed p-2.5 bg-background/80", className)}>
      <div className="flex flex-wrap gap-2 items-center">
        <Select value={selectedId} onValueChange={handleSelect}>
          <SelectTrigger className={cn("min-w-[260px] h-8", triggerClassName)}>
            <SelectValue placeholder={loading ? 'Loading question bank...' : 'Import from question bank'} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.question.slice(0, 70)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showOpenButton && (
          <Button type="button" variant="ghost" size="sm" asChild>
            <a href="/tutor/question-bank" target="_blank" rel="noreferrer">
              Open Question Bank
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

function ManualQuestionComposer({
  onImport,
}: {
  onImport: (questions: QuizQuestion[]) => void
}) {
  const [questionText, setQuestionText] = useState('')
  const [saving, setSaving] = useState(false)

  const handleAdd = async () => {
    const trimmed = questionText.trim()
    if (!trimmed) return

    const question: QuizQuestion = {
      id: `q-${generateId()}`,
      type: 'shortanswer',
      question: trimmed,
      points: 1,
      explanation: '',
    }
    onImport([question])
    setQuestionText('')
    setSaving(true)

    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const qbRes = await fetch('/api/tutor/question-bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          type: 'short_answer',
          question: trimmed,
          correctAnswer: '',
          explanation: '',
          points: 1,
          difficulty: 'medium',
          tags: ['course-builder', 'manual-entry'],
          isPublic: false,
        }),
      })

      if (!qbRes.ok) {
        toast.error('Question added locally, but failed to save in question bank')
      } else {
        toast.success('Question added and saved in question bank')
      }
    } catch {
      toast.error('Question added locally, but failed to save in question bank')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded border p-2.5 bg-muted/20 space-y-2">
      <Label className="text-xs font-medium">Write a new question</Label>
      <Textarea
        value={questionText}
        onChange={(e: any) => setQuestionText(e.target.value)}
        placeholder="Type a question here to add it directly and save to question bank."
        rows={2}
      />
      <div className="flex justify-end">
        <Button type="button" size="sm" variant="outline" disabled={!questionText.trim() || saving} onClick={handleAdd}>
          {saving ? 'Saving...' : 'Add Question'}
        </Button>
      </div>
    </div>
  )
}

function ResourceImportPanel<T extends { sourceDocument?: ImportedLearningResource; questions?: QuizQuestion[]; submissionType?: string }>({
  data,
  setData,
  targetField,
}: ResourceImportPanelProps<T>) {
  const [extracting, setExtracting] = useState(false)
  const [resources, setResources] = useState<Array<{ id: string; name: string; url: string; mimeType: string | null }>>([])
  const [resourceId, setResourceId] = useState('')
  const previousBlobUrlRef = useRef<string | null>(null)

  useEffect(() => {
    let active = true
    const loadResources = async () => {
      try {
        const res = await fetch('/api/tutor/resources', { credentials: 'include' })
        if (!res.ok) return
        const payload = await res.json()
        const items = Array.isArray(payload.resources) ? payload.resources : []
        if (active) setResources(items)
      } catch {
        // Non-fatal.
      }
    }
    loadResources()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const nextUrl = data.sourceDocument?.fileUrl
    const previousUrl = previousBlobUrlRef.current

    if (previousUrl && previousUrl !== nextUrl && previousUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previousUrl)
    }

    previousBlobUrlRef.current =
      typeof nextUrl === 'string' && nextUrl.startsWith('blob:') ? nextUrl : null

    return () => {
      const current = previousBlobUrlRef.current
      if (current && current.startsWith('blob:')) {
        URL.revokeObjectURL(current)
      }
      previousBlobUrlRef.current = null
    }
  }, [data.sourceDocument?.fileUrl])

  const handleImport = async (fileList: FileList | null) => {
    const file = fileList?.[0]
    if (!file) return
    setExtracting(true)
    try {
      const extractedText = await extractTextFromFile(file)
      const localObjectUrl = URL.createObjectURL(file)
      let fileUrl = localObjectUrl
      try {
        const formData = new FormData()
        formData.append('file', file)
        const uploadRes = await fetch('/api/uploads/documents', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        })
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json()
          if (typeof uploadData?.url === 'string' && uploadData.url.length > 0) {
            fileUrl = uploadData.url
            URL.revokeObjectURL(localObjectUrl)
          }
        }
      } catch {
        // Fallback to local object URL if upload endpoint is unavailable.
      }
      const sourceDocument: ImportedLearningResource = {
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        fileUrl,
        extractedText: extractedText || '',
        uploadedAt: new Date().toISOString(),
      }
      const currentTarget = (data as Record<string, unknown>)[targetField]
      if (!String(currentTarget || '').trim() && extractedText) {
        setData({ ...data, sourceDocument, [targetField]: extractedText.slice(0, 4000) } as T)
      } else {
        setData({ ...data, sourceDocument } as T)
      }
      toast.success('Document imported. You can edit it in preview.')
    } catch {
      toast.error('Failed to extract text from file')
    } finally {
      setExtracting(false)
    }
  }

  const handlePickExistingResource = async (selected: string) => {
    setResourceId(selected)
    const resource = resources.find((item) => item.id === selected)
    if (!resource) return

    setExtracting(true)
    try {
      let extractedText = ''
      try {
        const response = await fetch(resource.url)
        if (response.ok) {
          const blob = await response.blob()
          const file = new File([blob], resource.name, { type: resource.mimeType || blob.type || 'application/octet-stream' })
          extractedText = await extractTextFromFile(file)
        }
      } catch {
        // Keep empty text if remote source cannot be parsed.
      }

      const sourceDocument: ImportedLearningResource = {
        fileName: resource.name,
        mimeType: resource.mimeType || 'application/octet-stream',
        fileUrl: resource.url,
        extractedText: extractedText || '',
        uploadedAt: new Date().toISOString(),
      }

      const currentTarget = (data as Record<string, unknown>)[targetField]
      if (!String(currentTarget || '').trim() && extractedText) {
        setData({ ...data, sourceDocument, [targetField]: extractedText.slice(0, 4000) } as T)
      } else {
        setData({ ...data, sourceDocument } as T)
      }
      toast.success('Resource imported into this item.')
    } catch {
      toast.error('Failed to import selected resource')
    } finally {
      setExtracting(false)
      setResourceId('')
    }
  }

  const source = data.sourceDocument

  return (
    <div className="space-y-2 rounded-lg border border-dashed p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" disabled={extracting} asChild>
          <label className="cursor-pointer">
            {extracting ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Upload className="mr-1 h-3 w-3" />}
            Upload file
            <input
              type="file"
              className="hidden"
              accept=".pdf,.txt,.md,.doc,.docx,image/*"
              onChange={(e: any) => {
                handleImport(e.target.files)
                e.currentTarget.value = ''
              }}
            />
          </label>
        </Button>
        <Button type="button" variant="outline" size="sm" asChild>
          <a href="/tutor/resources" target="_blank" rel="noreferrer">
            Open Resources
          </a>
        </Button>
        <Button type="button" variant="outline" size="sm" asChild>
          <a href="/tutor/question-bank" target="_blank" rel="noreferrer">
            Open Question Bank
          </a>
        </Button>
      </div>
      {source && (
        <div className="space-y-2 rounded border bg-muted/20 p-3">
          <div className="text-xs text-muted-foreground">
            Imported: <span className="font-medium text-foreground">{source.fileName}</span>
          </div>
          <Textarea
            value={source.extractedText}
            onChange={(e: any) =>
              setData({
                ...data,
                sourceDocument: {
                  ...source,
                  extractedText: e.target.value,
                },
              } as T)
            }
            rows={6}
            placeholder="Imported content text (editable)"
          />
          {source.mimeType.startsWith('image/') && (
            <a href={source.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">
              Open image preview
            </a>
          )}
          {source.mimeType === 'application/pdf' && (
            <a href={source.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">
              Open PDF preview
            </a>
          )}
        </div>
      )}
    </div>
  )
}

// Module Builder Modal
function ModuleBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  const [data, setData] = useState(initialData || { title: '', description: '' })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Lesson Builder
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Lesson Title *</Label>
            <Input
              value={data.title}
              onChange={(e: any) => setData({ ...data, title: e.target.value })}
              placeholder="Enter module title"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <AutoTextarea value={data.description}
              onChange={(e: any) => setData({ ...data, description: e.target.value })}
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
          <Button onClick={() => onSave(data)}>Save Lesson</Button>
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
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
                        onChange={(e: any) => updateVariant(activeVariant, { title: e.target.value })}
                      />
                      <Textarea
                        placeholder={`${activeVariant} description (optional)`}
                        value={data.variants?.[activeVariant]?.description || ''}
                        onChange={(e: any) => updateVariant(activeVariant, { description: e.target.value })}
                        rows={2}
                      />
                      <Input
                        type="number"
                        placeholder={`${activeVariant} duration in minutes`}
                        value={data.variants?.[activeVariant]?.duration || ''}
                        onChange={(e: any) => updateVariant(activeVariant, { duration: parseInt(e.target.value) || undefined })}
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
              onChange={(e: any) => setData({ ...data, title: e.target.value })}
              placeholder="Enter lesson title (base version)"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <AutoTextarea value={data.description}
              onChange={(e: any) => setData({ ...data, description: e.target.value })}
              placeholder="Brief overview of this lesson (base version)"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/30 backdrop-blur-sm shadow-sm">
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={data.duration}
                onChange={(e: any) => setData({ ...data, duration: parseInt(e.target.value) || 45 })}
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
                      onChange={(e: any) => {
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

// AI Assist Agent Modal
interface AIAssistAgentProps {
  isOpen: boolean
  onClose: () => void
  context: 'task' | 'assessment'
  content: string
  pci: string
  title: string
  messages: { role: 'user' | 'assistant'; content: string }[]
  setMessages: React.Dispatch<React.SetStateAction<{ role: 'user' | 'assistant'; content: string }[]>>
  onApplyContent: (content: string) => void
  onApplyPci: (pci: string) => void
}

function AIAssistAgent({ isOpen, onClose, context, content, pci, title, messages, setMessages, onApplyContent, onApplyPci }: AIAssistAgentProps) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial system message
      setMessages([{
        role: 'assistant',
        content: `Hello! I'm your AI Course Builder Assistant. I can help you with this ${context === 'task' ? 'Task' : 'Assessment'}: "${title}".\n\nI have access to:\n📄 **Content Tab**: The questions/content${content ? ' (currently has content)' : ' (currently empty)'}\n⚙️ **PCI Tab**: Instructions on how to process the content${pci ? ' (currently has instructions)' : ' (currently empty)'}\n\nHow can I help you today?`
      }])
    }
  }, [isOpen, context, title, content, pci, messages.length, setMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const generatePrompt = (userInput: string) => {
    return `You are an AI Course Builder Assistant helping a tutor create educational content.

CURRENT CONTEXT:
- Type: ${context === 'task' ? 'Task' : 'Assessment'}
- Title: ${title}

CONTENT TAB (Questions/Content to work with):
${content || '(empty)'}

PCI TAB (Instructions for processing):
${pci || '(empty - you can suggest instructions based on the content)'}

USER REQUEST:
${userInput}

Please respond helpfully. You can:
1. Answer questions about the content
2. Suggest improvements to the PCI instructions
3. Analyze the questions and provide feedback
4. Generate additional content following the PCI pattern
5. If the user asks to apply something to Content or PCI, indicate that clearly

Format your response clearly and concisely.`
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      // Call the AI orchestrator
      const prompt = generatePrompt(userMessage)
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        })
      })

      if (!response.ok) throw new Error('Failed to get AI response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content || 'I apologize, but I was unable to process your request.' }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleApplyToContent = () => {
    const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant')
    if (lastAssistantMessage) {
      onApplyContent(lastAssistantMessage.content)
    }
  }

  const handleApplyToPci = () => {
    const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant')
    if (lastAssistantMessage) {
      onApplyPci(lastAssistantMessage.content)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            AI Assist Agent - {context === 'task' ? 'Task' : 'Assessment'} Builder
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-[300px] max-h-[400px]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
                }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e: any) => setInput(e.target.value)}
              placeholder="Ask me anything about your content or PCI instructions..."
              className="flex-1 min-h-[80px]"
              onKeyDown={(e: any) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
          </div>

          <div className="flex justify-end items-center">
            <Button onClick={handleSend} disabled={!input.trim() || loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Send className="h-4 w-4 mr-1" />}
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Question Bank Modal
// --- DMI Panel Component ---

interface DMIPanelProps {
  items: DMIQuestion[]
  onItemsChange: (items: DMIQuestion[]) => void
}

interface DMIQuestion {
  id: string
  questionNumber: number
  questionText: string
  answer: string
}

function DMIPanel({ items, onItemsChange }: DMIPanelProps) {
  const [previewOpen, setPreviewOpen] = useState(false)

  if (items.length === 0) {
    return (
      <div className="p-3 bg-slate-50 rounded-lg min-h-[150px]">
        <h4 className="text-sm font-medium mb-2">Digital Marking Interface</h4>
        <p className="text-xs text-muted-foreground">Click "Generate DMI" to create a student answer form from the Slide tab.</p>
      </div>
    )
  }

  return (
    <div className="p-3 bg-slate-50 rounded-lg min-h-[150px] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium">Digital Marking Interface</h4>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {items.map((item, idx) => (
          <div key={item.id} className="bg-white rounded border p-2">
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-blue-600 mt-0.5">Q{item.questionNumber}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-700 mb-2">{item.questionText}</p>
                <textarea
                  value={item.answer}
                  onChange={(e: any) => {
                    const next = items.map((q, qIdx) =>
                      qIdx === idx ? { ...q, answer: e.target.value } : q
                    )
                    onItemsChange(next)
                  }}
                  className="w-full text-xs border rounded p-2 resize-y min-h-[60px]"
                  placeholder="Student answer..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setPreviewOpen(true)}>
          Preview
        </Button>
        <Button size="sm" onClick={() => toast.success('DMI deployed')}>
          Deploy
        </Button>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>DMI Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="rounded border p-3 bg-white">
                <p className="text-sm font-medium mb-2">Q{item.questionNumber}. {item.questionText}</p>
                <textarea
                  className="w-full text-sm border rounded p-2 resize-y min-h-[80px]"
                  placeholder="Student answer..."
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => toast.success('DMI deployed')}>
              Deploy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// --- Question Bank Modal ---

interface QuestionBankModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (items: { questionText: string; pciText: string }[]) => void
}

interface Question {
  id: string
  type: 'multiple_choice' | 'short_answer' | 'essay'
  question: string
  options?: string[]
  correctAnswer?: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'multiple_choice',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
    difficulty: 'easy',
    subject: 'Geography'
  },
  {
    id: 'q2',
    type: 'short_answer',
    question: 'Explain the process of photosynthesis in your own words.',
    difficulty: 'medium',
    subject: 'Biology'
  },
  {
    id: 'q3',
    type: 'multiple_choice',
    question: 'Which of the following is NOT a prime number?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    difficulty: 'easy',
    subject: 'Mathematics'
  },
  {
    id: 'q4',
    type: 'essay',
    question: 'Discuss the causes and effects of climate change on global ecosystems.',
    difficulty: 'hard',
    subject: 'Environmental Science'
  },
  {
    id: 'q5',
    type: 'multiple_choice',
    question: 'In which year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: '1945',
    difficulty: 'medium',
    subject: 'History'
  }
]

function QuestionBankModal({ isOpen, onClose, onImport }: QuestionBankModalProps) {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set())
  const [previewQuestion, setPreviewQuestion] = useState<any | null>(null)
  const [filterSubject, setFilterSubject] = useState<string>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isOpen) return
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/tutor/question-bank?limit=200', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        const next = Array.isArray(data.questions) ? data.questions : []
        if (active) setQuestions(next)
      } catch {
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [isOpen])

  const subjects = Array.from(new Set(questions.map(q => q.subject).filter(Boolean)))

  const filteredQuestions = questions.filter(q => {
    const matchesSubject = filterSubject === 'all' || q.subject === filterSubject
    const matchesDifficulty = filterDifficulty === 'all' || q.difficulty === filterDifficulty
    const matchesSearch = searchQuery === '' ||
      (q.question && q.question.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.subject && q.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSubject && matchesDifficulty && matchesSearch
  })

  const toggleQuestion = (id: string) => {
    const newSelected = new Set(selectedQuestions)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedQuestions(newSelected)

    // Set preview to the last selected question
    const question = questions.find(q => q.id === id)
    if (question && newSelected.has(id)) {
      setPreviewQuestion(question)
    } else if (newSelected.size === 0) {
      setPreviewQuestion(null)
    }
  }

  const handleImport = () => {
    const selectedQList = questions.filter(q => selectedQuestions.has(q.id))
    const items = selectedQList.map((q, idx) => {
      let qText = `${idx + 1}. ${q.question}`
      if (q.options && Array.isArray(q.options) && q.options.length > 0) {
        qText += '\n    - ' + q.options.join('\n    - ')
      }
      let answerStr = q.correctAnswer
      if (Array.isArray(q.correctAnswer)) {
        answerStr = q.correctAnswer.join(', ')
      }
      let pciText = `${idx + 1}. ${answerStr || '[Answer goes here]'}`
      return { questionText: qText, pciText }
    })

    onImport(items)
    setSelectedQuestions(new Set())
    setPreviewQuestion(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Assessment Bank
          </DialogTitle>
        </DialogHeader>

        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <select
            value={filterSubject}
            onChange={(e: any) => setFilterSubject(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">All Subjects</option>
            {subjects.map(s => <option key={s as string} value={s as string}>{s as string}</option>)}
          </select>
          <select
            value={filterDifficulty}
            onChange={(e: any) => setFilterDifficulty(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Two-column layout */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Left: Question List */}
          <div className="flex-1 border rounded-lg overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading bank...</div>
            ) : filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No matched items</div>
            ) : (
              filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  onClick={() => toggleQuestion(question.id)}
                  className={`p-3 border-b cursor-pointer transition-colors ${selectedQuestions.has(question.id)
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center ${selectedQuestions.has(question.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                      }`}>
                      {selectedQuestions.has(question.id) && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{question.question}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px]">{question.type?.toUpperCase() || 'UNKNOWN'}</Badge>
                        <Badge variant="outline" className="text-[10px]">{question.difficulty || 'medium'}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Preview Area */}
          <div className="w-[400px] border rounded-lg flex flex-col bg-gray-50">
            {previewQuestion ? (
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Badge>{previewQuestion.subject || 'No Subject'}</Badge>
                  <Badge variant="outline">{previewQuestion.difficulty || 'medium'}</Badge>
                  <Badge variant="secondary">{previewQuestion.points || 1} pts</Badge>
                </div>
                <h3 className="font-medium text-lg mb-4">{previewQuestion.question}</h3>

                {previewQuestion.options && Array.isArray(previewQuestion.options) && previewQuestion.options.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-medium text-gray-500">Options:</p>
                    {previewQuestion.options.map((opt: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-white border text-sm">
                        <span className="font-medium text-gray-400 w-6">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Correct Answer:</p>
                  <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm border border-green-200">
                    {Array.isArray(previewQuestion.correctAnswer) ? previewQuestion.correctAnswer.join(', ') : (previewQuestion.correctAnswer || 'Not specified')}
                  </div>
                </div>

                {previewQuestion.explanation && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Explanation:</p>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded-md border">
                      {previewQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <BookOpen className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a question from the list to preview its details</p>
              </div>
            )}

            <div className="p-4 border-t bg-white flex justify-between items-center">
              <span className="text-sm font-medium">
                {selectedQuestions.size} selected
              </span>
              <Button
                onClick={handleImport}
                disabled={selectedQuestions.size === 0}
                className="gap-2"
              >
                Import Selected
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LessonSelectorDialog({
  isOpen,
  onClose,
  onConfirm,
  modules,
  itemType = 'item'
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: (moduleId: string, lessonId: string) => void
  modules: Module[]
  itemType?: string
}) {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('')
  const [selectedLessonId, setSelectedLessonId] = useState<string>('')

  const selectedModule = modules.find(m => m.id === selectedModuleId)
  const lessons = selectedModule?.lessons || []

  useEffect(() => {
    if (isOpen) {
      // Auto-select first module and lesson if available
      if (modules.length > 0 && !selectedModuleId) {
        setSelectedModuleId(modules[0].id)
        if (modules[0].lessons.length > 0) {
          setSelectedLessonId(modules[0].lessons[0].id)
        }
      }
    }
  }, [isOpen, modules, selectedModuleId])

  const handleConfirm = () => {
    if (selectedModuleId && selectedLessonId) {
      onConfirm(selectedModuleId, selectedLessonId)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Select Target Lesson
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Choose which lesson to save this {itemType} to:
          </p>

          <div className="space-y-2">
            <Label>Lesson</Label>
            <Select value={selectedModuleId} onValueChange={(value) => {
              setSelectedModuleId(value)
              const selectedMod = modules.find(m => m.id === value)
              if (selectedMod && selectedMod.lessons.length > 0) {
                setSelectedLessonId(selectedMod.lessons[0].id)
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a lesson" />
              </SelectTrigger>
              <SelectContent>
                {modules.map((module) => (
                  <SelectItem key={module.id} value={module.id}>
                    {module.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {lessons.length > 0 && (
            <div className="space-y-2">
              <Label>Topic</Label>
              <Select value={selectedLessonId} onValueChange={setSelectedLessonId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {lessons.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedModuleId || !selectedLessonId}
          >
            Save to Selected Lesson
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Extended props for modals with lesson selector
interface BuilderModalWithModulesProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any, moduleId?: string, lessonId?: string) => void
  initialData?: any
  modules: Module[]
}

// Task Builder Modal (now uses Assessment Builder layout)
function TaskBuilderModal({ isOpen, onClose, onSave, initialData, modules }: BuilderModalWithModulesProps) {
  const [showLessonSelector, setShowLessonSelector] = useState(false)
  const [pendingData, setPendingData] = useState<any>(null)

  const handleSaveRequest = (data: any) => {
    setPendingData(data)
    setShowLessonSelector(true)
  }

  const handleConfirmLesson = (moduleId: string, lessonId: string) => {
    if (pendingData) {
      onSave(pendingData, moduleId, lessonId)
    }
    setPendingData(null)
  }

  return (
    <>
      <AssessmentBuilderModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSaveRequest}
        initialData={initialData}
        builderType="task"
      />
      <LessonSelectorDialog
        isOpen={showLessonSelector}
        onClose={() => setShowLessonSelector(false)}
        onConfirm={handleConfirmLesson}
        modules={modules}
        itemType="task"
      />
    </>
  )
}

// Assessment Builder Modal
function AssessmentBuilderModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  builderType = 'assessment',
}: BuilderModalProps & { builderType?: 'task' | 'assessment' | 'homework' }) {
  const [data, setData] = useState<Task | Assessment>(
    initialData ||
    (builderType === 'task'
      ? DEFAULT_TASK(0)
      : DEFAULT_HOMEWORK(0, builderType === 'homework' ? 'homework' : 'assessment'))
  )
  const [showAnswerKey, setShowAnswerKey] = useState(false)
  const [showQuestionBankModal, setShowQuestionBankModal] = useState(false)
  const isTask = builderType === 'task'
  const isHomework = builderType === 'homework'
  const titleLabel = isTask ? 'Task' : isHomework ? 'Homework' : 'Assessment'
  const assessmentData = data as Assessment

  const addQuestion = (type: QuizQuestion['type']) => {
    const matchingPairs = type === 'matching'
      ? [
        { left: '', right: '' },
        { left: '', right: '' },
      ]
      : undefined
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: (type === 'mcq' || type === 'multiselect') ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined,
      matchingPairs,
      correctAnswer: matchingPairs ? matchingPairs.map((pair) => pair.right) : undefined,
    }
    setData({ ...data, questions: [...(data.questions || []), newQuestion] })
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isTask ? (
                <ListTodo className="h-5 w-5 text-orange-500" />
              ) : isHomework ? (
                <Home className="h-5 w-5 text-purple-500" />
              ) : (
                <FileQuestion className="h-5 w-5 text-purple-500" />
              )}
              {titleLabel} Builder
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-1 mb-4 p-1 rounded-xl border bg-gray-50">
              <TabsTrigger value="edit" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 transition-all duration-200">Edit</TabsTrigger>
              <TabsTrigger value="preview" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 transition-all duration-200">Preview (student view)</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="space-y-4 py-4 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md p-6 mt-4">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>{titleLabel} Title *</Label>
                  <Input
                    value={data.title}
                    onChange={(e: any) => setData({ ...data, title: e.target.value })}
                    placeholder={`e.g., ${titleLabel} 1`}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <AutoTextarea value={data.description}
                    onChange={(e: any) => setData({ ...data, description: e.target.value })}
                    placeholder="What should students know before starting this assessment?"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isTask ? 'Instructions *' : 'Question *'}</Label>
                  <AutoTextarea value={data.instructions}
                    onChange={(e: any) => setData({ ...data, instructions: e.target.value })}
                    placeholder={isTask ? 'Enter the task instructions here' : 'Enter the question here'}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/30 backdrop-blur-sm shadow-sm">
                  <div className="space-y-2">
                    <Label>Submission</Label>
                    {isTask ? (
                      <Select
                        value={data.submissionType as Task['submissionType']}
                        onValueChange={(v) =>
                          setData({
                            ...(data as Task),
                            submissionType: v as Task['submissionType'],
                          })
                        }
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
                    ) : (
                      <Select
                        value={data.submissionType as Assessment['submissionType']}
                        onValueChange={(v) =>
                          setData({
                            ...(data as Assessment),
                            submissionType: v as Assessment['submissionType'],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="file">File</SelectItem>
                          <SelectItem value="link">Link</SelectItem>
                          <SelectItem value="multiple">Multiple</SelectItem>
                          <SelectItem value="questions">Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
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
                        <Button variant="outline" size="sm" onClick={() => addQuestion('multiselect')}>
                          <Plus className="h-4 w-4 mr-1" /> Multi-select
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addQuestion('matching')}>
                          <Plus className="h-4 w-4 mr-1" /> Matching
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addQuestion('fillblank')}>
                          <Plus className="h-4 w-4 mr-1" /> Fill Blank
                        </Button>
                      </div>
                    </div>
                    <QuestionBankQuickImport
                      onImport={(incomingQuestions) =>
                        setData({ ...data, questions: [...(data.questions || []), ...incomingQuestions] })
                      }
                    />
                    <ManualQuestionComposer
                      onImport={(incomingQuestions) =>
                        setData({ ...data, questions: [...(data.questions || []), ...incomingQuestions] })
                      }
                    />
                    <div className="space-y-3">
                      {(data.questions || []).map((q, idx) => (
                        <div key={q.id} className="border rounded-lg p-4 space-y-3 bg-white">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">Q{idx + 1} - {q.type.toUpperCase()}</Badge>
                              <label className="flex items-center gap-1 text-xs text-muted-foreground">
                                <input
                                  type="checkbox"
                                  checked={q.extendEnabled ?? false}
                                  onChange={(e: any) => updateQuestion(idx, { extendEnabled: e.target.checked })}
                                />
                                Extend
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                className="w-20 h-8"
                                value={q.points}
                                onChange={(e: any) => updateQuestion(idx, { points: parseInt(e.target.value) || 1 })}
                              />
                              <span className="text-sm text-muted-foreground">pts</span>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeQuestion(idx)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <AutoTextarea value={q.question}
                            onChange={(e: any) => updateQuestion(idx, { question: e.target.value })}
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
                                    onChange={(e: any) => {
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
                          {q.type === 'multiselect' && q.options && (
                            <div className="space-y-2 pl-4">
                              {q.options.map((opt, optIdx) => {
                                const selectedAnswers = Array.isArray(q.correctAnswer) ? q.correctAnswer : []
                                const checked = selectedAnswers.includes(opt)
                                return (
                                  <div key={optIdx} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={(e: any) => {
                                        const next = new Set(selectedAnswers)
                                        if (e.target.checked) next.add(opt)
                                        else next.delete(opt)
                                        updateQuestion(idx, { correctAnswer: Array.from(next) })
                                      }}
                                    />
                                    <Input
                                      value={opt}
                                      onChange={(e: any) => {
                                        const newOptions = [...q.options!]
                                        newOptions[optIdx] = e.target.value
                                        updateQuestion(idx, { options: newOptions })
                                      }}
                                      placeholder={`Option ${optIdx + 1}`}
                                      className="flex-1"
                                    />
                                  </div>
                                )
                              })}
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
                          {q.type === 'matching' && (
                            <MatchingPairsEditor
                              pairs={q.matchingPairs ?? [{ left: '', right: '' }, { left: '', right: '' }]}
                              onChange={(nextPairs) =>
                                updateQuestion(idx, {
                                  matchingPairs: nextPairs,
                                  correctAnswer: nextPairs.map((pair) => pair.right),
                                  explanation: formatMatchingExplanation(nextPairs),
                                })
                              }
                            />
                          )}
                          <Textarea
                            value={q.explanation || ''}
                            onChange={(e: any) => updateQuestion(idx, { explanation: e.target.value })}
                            placeholder="Explanation (shown after answering)"
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!isTask && (
                  <div className="space-y-3 border rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={'allowLateSubmission' in data ? (data as Assessment).allowLateSubmission : false}
                        onCheckedChange={(checked) => setData({ ...(data as Assessment), allowLateSubmission: checked })}
                      />
                      <Label>Allow late submission</Label>
                    </div>
                    {'allowLateSubmission' in data && (data as Assessment).allowLateSubmission && (
                      <div className="space-y-2">
                        <Label>Late Penalty (%)</Label>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={(data as Assessment).latePenalty}
                          onChange={(e: any) => setData({ ...(data as Assessment), latePenalty: parseInt(e.target.value) || 0 })}
                        />
                        <p className="text-xs text-muted-foreground">Percentage deducted for late submissions</p>
                      </div>
                    )}
                  </div>
                )}

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
                        {showAnswerKey ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                        {showAnswerKey ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                  </div>
                  {showAnswerKey ? (
                    <div className="space-y-3">
                      <Textarea
                        value={data.answerKey || ''}
                        onChange={(e: any) => setData({ ...data, answerKey: e.target.value })}
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
            <TabsContent value="preview" className="space-y-4 py-4 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md p-6 mt-4">
              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <h3 className="font-semibold">{data.title}</h3>
                {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
                {data.instructions && (
                  <div className="text-sm"><span className="font-medium text-muted-foreground">Instructions: </span>{data.instructions}</div>
                )}
                {!isTask && (
                  <div className="space-y-3">
                    <ResourceImportPanel data={data} setData={setData} targetField="instructions" />
                  </div>
                )}
                {!isTask && data.sourceDocument && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Imported material (editable)</p>
                    <Textarea
                      value={data.sourceDocument.extractedText}
                      onChange={(e: any) => setData({
                        ...data,
                        sourceDocument: { ...data.sourceDocument!, extractedText: e.target.value }
                      })}
                      rows={6}
                    />
                  </div>
                )}
                {!isTask && (
                  <div className="space-y-3 rounded-lg border bg-white p-3">
                    <h4 className="text-sm font-medium">Settings</h4>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={assessmentData.showCorrectAnswers ?? true}
                          onCheckedChange={(checked) => setData({ ...assessmentData, showCorrectAnswers: checked })}
                          disabled={assessmentData.answersNeverVisible}
                        />
                        <Label className="text-sm">Show correct answers</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={assessmentData.answersNeverVisible ?? false}
                          onCheckedChange={(checked) => setData({ ...assessmentData, answersNeverVisible: checked, showCorrectAnswers: checked ? false : assessmentData.showCorrectAnswers })}
                        />
                        <Label className="text-sm">Never show answers</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={assessmentData.randomizeQuestions}
                          onCheckedChange={(checked) => setData({ ...assessmentData, randomizeQuestions: checked })}
                        />
                        <Label className="text-sm">Randomize question order</Label>
                      </div>
                    </div>
                  </div>
                )}
                <h4 className="text-sm font-medium mt-4">Questions</h4>
                <QuestionsPreview questions={data.questions ?? []} />
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => onSave({ ...data })}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Question Bank Modal */}
      <Dialog open={showQuestionBankModal} onOpenChange={setShowQuestionBankModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Question Bank
            </DialogTitle>
          </DialogHeader>
          <QuestionBankSelector
            onSelect={(questions) => {
              setData({ ...(data as Task | Assessment), questions: [...(data.questions || []), ...questions], submissionType: 'questions' })
              setShowQuestionBankModal(false)
              toast.success(`${questions.length} question(s) added`)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

// Homework Builder Modal (wraps AssessmentBuilderModal with lesson selector)
function HomeworkBuilderModal({ isOpen, onClose, onSave, initialData, modules }: BuilderModalWithModulesProps) {
  const [showLessonSelector, setShowLessonSelector] = useState(false)
  const [pendingData, setPendingData] = useState<any>(null)

  const handleSaveRequest = (data: any) => {
    setPendingData(data)
    setShowLessonSelector(true)
  }

  const handleConfirmLesson = (moduleId: string, lessonId: string) => {
    if (pendingData) {
      onSave(pendingData, moduleId, lessonId)
    }
    setPendingData(null)
  }

  return (
    <>
      <AssessmentBuilderModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSaveRequest}
        initialData={initialData}
        builderType="homework"
      />
      <LessonSelectorDialog
        isOpen={showLessonSelector}
        onClose={() => setShowLessonSelector(false)}
        onConfirm={handleConfirmLesson}
        modules={modules}
        itemType="homework"
      />
    </>
  )
}

// Assessment Builder Modal with lesson selector
function AssessmentBuilderModalWithSelector({ isOpen, onClose, onSave, initialData, modules }: BuilderModalWithModulesProps) {
  const [showLessonSelector, setShowLessonSelector] = useState(false)
  const [pendingData, setPendingData] = useState<any>(null)

  const handleSaveRequest = (data: any) => {
    setPendingData(data)
    setShowLessonSelector(true)
  }

  const handleConfirmLesson = (moduleId: string, lessonId: string) => {
    if (pendingData) {
      onSave(pendingData, moduleId, lessonId)
    }
    setPendingData(null)
  }

  return (
    <>
      <AssessmentBuilderModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSaveRequest}
        initialData={initialData}
        builderType="assessment"
      />
      <LessonSelectorDialog
        isOpen={showLessonSelector}
        onClose={() => setShowLessonSelector(false)}
        onConfirm={handleConfirmLesson}
        modules={modules}
        itemType="assessment"
      />
    </>
  )
}

// Worksheet Builder Modal
function WorksheetBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  const [data, setData] = useState<Worksheet>(initialData || DEFAULT_WORKSHEET(0))
  const [showAnswerKey, setShowAnswerKey] = useState(false)

  const addQuestion = (type: QuizQuestion['type']) => {
    const matchingPairs = type === 'matching'
      ? [
        { left: '', right: '' },
        { left: '', right: '' },
      ]
      : undefined
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: type === 'mcq' ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined,
      matchingPairs,
      correctAnswer: matchingPairs ? matchingPairs.map((pair) => pair.right) : undefined,
    }
    setData({ ...data, questions: [...data.questions, newQuestion] })
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-500" />
            Worksheet Builder
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-1 mb-4 p-1 rounded-xl border bg-gray-50">
            <TabsTrigger value="edit" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 transition-all duration-200">Edit</TabsTrigger>
            <TabsTrigger value="preview" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 transition-all duration-200">Preview (student view)</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="space-y-4 py-4 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md p-6 mt-4">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Worksheet Title *</Label>
                <Input
                  value={data.title}
                  onChange={(e: any) => setData({ ...data, title: e.target.value })}
                  placeholder="e.g., Practice Problems - Chapter 3"
                />
              </div>
              <div className="space-y-2">
                <Label>Instructions</Label>
                <AutoTextarea value={data.description}
                  onChange={(e: any) => setData({ ...data, description: e.target.value })}
                  placeholder="What should students know before starting this worksheet?"
                  rows={2}
                />
              </div>
              <ResourceImportPanel data={data} setData={setData} targetField="instructions" />
              <div className="space-y-2">
                <Label>Instructions *</Label>
                <AutoTextarea value={data.instructions}
                  onChange={(e: any) => setData({ ...data, instructions: e.target.value })}
                  placeholder="Detailed instructions for students"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Time (min)</Label>
                  <Input
                    type="number"
                    value={data.estimatedMinutes}
                    onChange={(e: any) => setData({ ...data, estimatedMinutes: parseInt(e.target.value) || 20 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={data.points}
                    onChange={(e: any) => setData({ ...data, points: parseInt(e.target.value) || 15 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Passing Score (%)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={data.passingScore}
                    onChange={(e: any) => setData({ ...data, passingScore: parseInt(e.target.value) || 70 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Attempts</Label>
                  <Input
                    type="number"
                    min={1}
                    value={data.maxAttempts}
                    onChange={(e: any) => setData({ ...data, maxAttempts: parseInt(e.target.value) || 3 })}
                    disabled={!data.allowMultipleAttempts}
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={data.allowMultipleAttempts}
                    onCheckedChange={(checked) => setData({ ...data, allowMultipleAttempts: checked })}
                  />
                  <Label className="text-sm">Allow multiple attempts</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={data.showCorrectAnswers}
                    onCheckedChange={(checked) => setData({ ...data, showCorrectAnswers: checked })}
                  />
                  <Label className="text-sm">Show correct answers after submission</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={data.randomizeQuestions}
                    onCheckedChange={(checked) => setData({ ...data, randomizeQuestions: checked })}
                  />
                  <Label className="text-sm">Randomize questions</Label>
                </div>
              </div>

              {/* Questions Section */}
              <div className="border rounded-lg p-4 space-y-4 bg-cyan-50/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-2">
                    <FileQuestion className="h-4 w-4 text-cyan-500" />
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
                <QuestionBankQuickImport
                  onImport={(incomingQuestions) =>
                    setData({ ...data, questions: [...(data.questions || []), ...incomingQuestions] })
                  }
                />
                <ManualQuestionComposer
                  onImport={(incomingQuestions) =>
                    setData({ ...data, questions: [...(data.questions || []), ...incomingQuestions] })
                  }
                />
                <div className="space-y-3">
                  {(data.questions || []).map((q, idx) => (
                    <div key={q.id} className="border rounded-lg p-4 space-y-3 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Q{idx + 1} - {q.type.toUpperCase()}</Badge>
                          <label className="flex items-center gap-1 text-xs text-muted-foreground">
                            <input
                              type="checkbox"
                              checked={q.extendEnabled ?? false}
                              onChange={(e: any) => updateQuestion(idx, { extendEnabled: e.target.checked })}
                            />
                            Extend
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            className="w-20 h-8"
                            value={q.points}
                            onChange={(e: any) => updateQuestion(idx, { points: parseInt(e.target.value) || 1 })}
                          />
                          <span className="text-sm text-muted-foreground">pts</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeQuestion(idx)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <AutoTextarea value={q.question}
                        onChange={(e: any) => updateQuestion(idx, { question: e.target.value })}
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
                                onChange={(e: any) => {
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
                      {q.type === 'matching' && (
                        <MatchingPairsEditor
                          pairs={q.matchingPairs ?? [{ left: '', right: '' }, { left: '', right: '' }]}
                          onChange={(nextPairs) =>
                            updateQuestion(idx, {
                              matchingPairs: nextPairs,
                              correctAnswer: nextPairs.map((pair) => pair.right),
                              explanation: formatMatchingExplanation(nextPairs),
                            })
                          }
                        />
                      )}
                      <Textarea
                        value={q.explanation || ''}
                        onChange={(e: any) => updateQuestion(idx, { explanation: e.target.value })}
                        placeholder="Explanation (shown after answering)"
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
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
                      {showAnswerKey ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                      {showAnswerKey ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </div>
                {showAnswerKey ? (
                  <div className="space-y-3">
                    <Textarea
                      value={data.answerKey || ''}
                      onChange={(e: any) => setData({ ...data, answerKey: e.target.value })}
                      placeholder="Enter the complete answer key here. This is ONLY visible to instructors."
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
          <TabsContent value="preview" className="space-y-4 py-4 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md p-6 mt-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <h3 className="font-semibold">{data.title}</h3>
              {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
              {data.instructions && (
                <div className="text-sm"><span className="font-medium text-muted-foreground">Instructions: </span>{data.instructions}</div>
              )}
              {data.sourceDocument && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Imported material (editable)</p>
                  <Textarea
                    value={data.sourceDocument.extractedText}
                    onChange={(e: any) => setData({
                      ...data,
                      sourceDocument: { ...data.sourceDocument!, extractedText: e.target.value }
                    })}
                    rows={6}
                  />
                </div>
              )}
              <div className="space-y-3 rounded-lg border bg-white p-3">
                <h4 className="text-sm font-medium">Settings</h4>
                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Time (min)</Label>
                    <Input
                      type="number"
                      value={data.estimatedMinutes}
                      onChange={(e: any) => setData({ ...data, estimatedMinutes: parseInt(e.target.value) || 30 })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Points</Label>
                    <Input
                      type="number"
                      value={data.points}
                      onChange={(e: any) => setData({ ...data, points: parseInt(e.target.value) || 20 })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Passing Score (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={data.passingScore}
                      onChange={(e: any) => setData({ ...data, passingScore: parseInt(e.target.value) || 70 })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Max Attempts</Label>
                    <Input
                      type="number"
                      min={1}
                      value={data.maxAttempts}
                      onChange={(e: any) => setData({ ...data, maxAttempts: parseInt(e.target.value) || 3 })}
                      disabled={!data.allowMultipleAttempts}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={data.allowMultipleAttempts}
                      onCheckedChange={(checked) => setData({ ...data, allowMultipleAttempts: checked })}
                    />
                    <Label className="text-sm">Allow multiple attempts</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={data.showCorrectAnswers}
                      onCheckedChange={(checked) => setData({ ...data, showCorrectAnswers: checked })}
                    />
                    <Label className="text-sm">Show correct answers after submission</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={data.randomizeQuestions}
                      onCheckedChange={(checked) => setData({ ...data, randomizeQuestions: checked })}
                    />
                    <Label className="text-sm">Randomize question order</Label>
                  </div>
                </div>
              </div>
              <h4 className="text-sm font-medium mt-4">Questions</h4>
              <QuestionsPreview questions={data.questions ?? []} />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave({ ...data })}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Exam Builder Modal
function QuizBuilderModal({ isOpen, onClose, onSave, initialData, isModuleQuiz = false }: BuilderModalProps & { isModuleQuiz?: boolean }) {
  const [data, setData] = useState<Quiz | ModuleQuiz>(initialData || (isModuleQuiz ? DEFAULT_MODULE_QUIZ(0) : DEFAULT_QUIZ(0)))
  const [showAnswerKey, setShowAnswerKey] = useState(false)
  const [showQuestionBankModal, setShowQuestionBankModal] = useState(false)

  const addQuestion = async (type: QuizQuestion['type']) => {
    const matchingPairs = type === 'matching'
      ? [
        { left: '', right: '' },
        { left: '', right: '' },
      ]
      : undefined
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: type === 'mcq' ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined,
      matchingPairs,
      correctAnswer: matchingPairs ? matchingPairs.map((pair) => pair.right) : undefined,
    }
    setData({ ...data, questions: [...data.questions, newQuestion] })

    // Auto-save to question bank
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      await fetch('/api/tutor/question-bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          question: newQuestion.question || '[Empty Question]',
          type: newQuestion.type,
          options: newQuestion.options,
          correctAnswer: newQuestion.correctAnswer,
          explanation: newQuestion.explanation || '',
        }),
      })
    } catch {
      // Silent fail - question is still added to the assessment
    }
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileQuestion className="h-5 w-5 text-red-500" />
              {isModuleQuiz ? 'Exam Builder (Summative)' : 'Assessment Builder'}
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-1 mb-4 p-1 rounded-xl border bg-gray-50">
              <TabsTrigger value="edit" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 transition-all duration-200">Edit</TabsTrigger>
              <TabsTrigger value="preview" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 transition-all duration-200">Preview (student view)</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="space-y-4 py-4 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md p-6 mt-4">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>{isModuleQuiz ? 'Exam Title *' : 'Assessment Title *'}</Label>
                  <Input
                    value={data.title}
                    onChange={(e: any) => setData({ ...data, title: e.target.value })}
                    placeholder={isModuleQuiz ? "e.g., Lesson 1 Comprehensive Exam" : "e.g., Lesson 1 Assessment"}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <AutoTextarea value={data.description}
                    onChange={(e: any) => setData({ ...data, description: e.target.value })}
                    placeholder="What should students know before starting this exam?"
                    rows={2}
                  />
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

                <ResourceImportPanel data={data} setData={setData} targetField="description" />

                {/* Questions Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Questions ({data.questions.length})</h3>
                  </div>

                  <div className="space-y-3">
                    {data.questions.map((q, idx) => (
                      <div key={q.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">Q{idx + 1} - {q.type.toUpperCase()}</Badge>
                            <label className="flex items-center gap-1 text-xs text-muted-foreground">
                              <input
                                type="checkbox"
                                checked={q.extendEnabled ?? false}
                                onChange={(e: any) => updateQuestion(idx, { extendEnabled: e.target.checked })}
                              />
                              Extend
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              className="w-20 h-8"
                              value={q.points}
                              onChange={(e: any) => updateQuestion(idx, { points: parseInt(e.target.value) || 1 })}
                            />
                            <span className="text-sm text-muted-foreground">pts</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeQuestion(idx)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <AutoTextarea value={q.question}
                          onChange={(e: any) => updateQuestion(idx, { question: e.target.value })}
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
                                  onChange={(e: any) => {
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
                        {q.type === 'matching' && (
                          <MatchingPairsEditor
                            pairs={q.matchingPairs ?? [{ left: '', right: '' }, { left: '', right: '' }]}
                            onChange={(nextPairs) =>
                              updateQuestion(idx, {
                                matchingPairs: nextPairs,
                                correctAnswer: nextPairs.map((pair) => pair.right),
                                explanation: formatMatchingExplanation(nextPairs),
                              })
                            }
                          />
                        )}
                        <Textarea
                          value={q.explanation || ''}
                          onChange={(e: any) => updateQuestion(idx, { explanation: e.target.value })}
                          placeholder="Explanation (shown after answering)"
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add Questions Bar */}
                  <div className="flex items-center gap-2 pt-4 border-t flex-wrap">
                    <Button variant="secondary" size="sm" onClick={() => setShowQuestionBankModal(true)}>
                      <BookOpen className="h-4 w-4 mr-1" /> Add from question bank
                    </Button>
                    <div className="h-6 w-px bg-border mx-1" />
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
                    <Button variant="outline" size="sm" onClick={() => addQuestion('multiselect')}>
                      <Plus className="h-4 w-4 mr-1" /> Multi
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('matching')}>
                      <Plus className="h-4 w-4 mr-1" /> Match
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('fillblank')}>
                      <Plus className="h-4 w-4 mr-1" /> Fill
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preview" className="space-y-4 py-4 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md p-6 mt-4">
              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <h3 className="font-semibold">{data.title}</h3>
                {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
                {data.sourceDocument && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Imported material (editable)</p>
                    <Textarea
                      value={data.sourceDocument.extractedText}
                      onChange={(e: any) => setData({
                        ...data,
                        sourceDocument: { ...data.sourceDocument!, extractedText: e.target.value }
                      })}
                      rows={6}
                    />
                  </div>
                )}
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
            <Button onClick={() => onSave({ ...data })} disabled={data.questions.length === 0}>
              Save ({data.questions.length} questions)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Question Bank Modal */}
      <Dialog open={showQuestionBankModal} onOpenChange={setShowQuestionBankModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Question Bank
            </DialogTitle>
          </DialogHeader>
          <QuestionBankSelector
            onSelect={(questions) => {
              setData({ ...data, questions: [...data.questions, ...questions] })
              setShowQuestionBankModal(false)
              toast.success(`${questions.length} question(s) added`)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

// Question Bank Selector Component for Modal
function QuestionBankSelector({ onSelect }: { onSelect: (questions: QuizQuestion[]) => void }) {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<QuestionBankItemLite[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/tutor/question-bank?limit=200', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        const next = Array.isArray(data.questions) ? data.questions : []
        if (active) setItems(next)
      } catch {
        // Non-fatal.
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const filteredItems = items.filter((item) =>
    item.question.toLowerCase().includes(filter.toLowerCase()) ||
    item.type.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search questions..."
        value={filter}
        onChange={(e: any) => setFilter(e.target.value)}
        className="w-full"
      />
      <div className="border rounded-lg max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filteredItems.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No questions found</div>
        ) : (
          <div className="divide-y">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${selectedIds.has(item.id) ? 'bg-blue-50 hover:bg-blue-100' : ''
                  }`}
                onClick={() => toggleSelection(item.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center ${selectedIds.has(item.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                    {selectedIds.has(item.id) && <CheckCircle className="h-3 w-3 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">{item.type.toUpperCase()}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.options?.length || 0} options
                      </span>
                    </div>
                    <p className="text-sm line-clamp-2">{item.question}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-muted-foreground">
          {selectedIds.size} selected
        </span>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectedIds(new Set())}>
            Clear
          </Button>
          <Button
            disabled={selectedIds.size === 0}
            onClick={() => {
              const selected = items.filter((item) => selectedIds.has(item.id))
              onSelect(selected.map(mapQuestionBankToBuilderQuestion))
            }}
          >
            Add Selected ({selectedIds.size})
          </Button>
        </div>
      </div>
    </div>
  )
}

// Content Builder Modal
function ContentBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  const [data, setData] = useState<Content>(initialData || DEFAULT_CONTENT(0))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
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
              onChange={(e: any) => setData({ ...data, title: e.target.value })}
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
            <>
              <ResourceImportPanel data={data} setData={setData} targetField="body" />
              <div className="space-y-2">
                <Label>Content Body</Label>
                <Textarea
                  value={data.body || ''}
                  onChange={(e: any) => setData({ ...data, body: e.target.value })}
                  placeholder="Enter your lesson content here..."
                  rows={10}
                />
              </div>
            </>
          )}
          {data.type !== 'text' && (
            <div className="space-y-2">
              <Label>URL / Embed Code</Label>
              <Input
                value={data.url || ''}
                onChange={(e: any) => setData({ ...data, url: e.target.value })}
                placeholder={data.type === 'embed' ? "Paste iframe or embed code" : "https://..."}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>Duration (minutes, optional)</Label>
            <Input
              type="number"
              value={data.duration || ''}
              onChange={(e: any) => setData({ ...data, duration: parseInt(e.target.value) || undefined })}
              placeholder="e.g., 15"
            />
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              type="number"
              value={data.order}
              onChange={(e: any) => setData({ ...data, order: parseInt(e.target.value) || 0 })}
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
      {children}
    </div>
  )
}

// ============================================
// RESIZABLE PANEL COMPONENT
// ============================================

interface ResizablePanelProps {
  children: React.ReactNode
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  actionButton?: React.ReactNode
}

function ResizablePanel({ children, defaultWidth = 192, minWidth = 150, maxWidth = 400, actionButton }: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<'left' | 'right' | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return
      const deltaX = e.clientX - startXRef.current
      const newWidth = resizeDirection === 'left'
        ? startWidthRef.current - deltaX
        : startWidthRef.current + deltaX
      setWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)))
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeDirection(null)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, minWidth, maxWidth, resizeDirection])

  const handleResizeStart = (direction: 'left' | 'right') => (e: React.MouseEvent) => {
    setResizeDirection(direction)
    setIsResizing(true)
    startXRef.current = e.clientX
    startWidthRef.current = panelRef.current?.offsetWidth || defaultWidth
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={panelRef}
        className="relative border-l pl-4 flex-shrink-0"
        style={{ width: `${width}px` }}
      >
        {children}
        {/* Left resize handle */}
        <div
          className="absolute left-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-200/50 transition-colors flex items-center justify-center z-10"
          onMouseDown={handleResizeStart('left')}
          title="Drag left to shrink, right to expand"
        >
          <GripHorizontal className="h-3 w-3 text-gray-400 rotate-90" />
        </div>
      </div>
      {/* Action button directly under the panel */}
      {actionButton && (
        <div style={{ width: `${width}px` }} className="pl-4">
          {actionButton}
        </div>
      )}
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
  inlineDragHandle?: boolean
  onDragStart?: () => void
}

function SortableTreeItem({ id, children, depth, isLast, dragHandle = true, inlineDragHandle = false }: SortableTreeItemProps) {
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
      {dragHandle && !inlineDragHandle && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded opacity-100"
          {...attributes}
          {...listeners}
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4 text-gray-500" />
        </button>
      )}
      <TreeItem depth={depth} isLast={isLast}>
        {inlineDragHandle ? (
          <div className="flex items-center gap-1">
            <button
              className="cursor-grab active:cursor-grabbing p-0.5 hover:bg-blue-200 rounded flex-shrink-0"
              {...attributes}
              {...listeners}
              title="Drag to reorder"
            >
              <GripVertical className="h-4 w-4 text-blue-400" />
            </button>
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </TreeItem>
    </div>
  )
}

// ============================================
// PREVIEW CARD - Center panel preview for assessments/tasks
// ============================================

function resolveSelectedItem(
  selectedItem: { type: string; id: string } | null,
  modules: Module[]
): { item: Task | Assessment | Worksheet | ModuleQuiz | Lesson | Module; moduleId: string; lessonId?: string } | null {
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
      if (selectedItem.type === 'worksheet') {
        const worksheet = lesson.worksheets?.find(w => w.id === selectedItem.id)
        if (worksheet) return { item: worksheet, moduleId: mod.id, lessonId: lesson.id }
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

type PreviewUpdatePayload = Partial<Task> | Partial<Assessment> | Partial<Worksheet>

interface PreviewCardProps {
  type: 'task' | 'homework' | 'worksheet' | 'moduleQuiz' | 'lesson' | 'module'
  item: Task | Assessment | Worksheet | Quiz | Lesson | Module
  onEdit: () => void
  onDuplicate: () => void
  onRemove: () => void
  onUpdateItem?: (updates: PreviewUpdatePayload) => void
  courseId?: string
  lessonId?: string
  showLiveShareAction?: boolean
  onMakeVisibleToStudents?: (payload: VisibleDocumentPayload) => void
  onSaveAll?: () => void
}

function PreviewCard({ type, item, onEdit, onDuplicate, onRemove, onUpdateItem, courseId, lessonId, showLiveShareAction, onMakeVisibleToStudents, onSaveAll }: PreviewCardProps) {
  const [studentPreviewOpen, setStudentPreviewOpen] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [resourceText, setResourceText] = useState('')
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false)
  const [generatedPdf, setGeneratedPdf] = useState<{ url: string; fileName: string; blob: Blob } | null>(null)
  const [questionBankOpen, setQuestionBankOpen] = useState(false)
  const [showPreviewAnswerKey, setShowPreviewAnswerKey] = useState(false)
  const [isAssigned, setIsAssigned] = useState(false)
  const normalizedItem = item as (Task | Assessment | Worksheet | Quiz | ModuleQuiz | Lesson | Module) & {
    description?: string
    instructions?: string
    points?: number
    estimatedMinutes?: number
    questions?: QuizQuestion[]
    isPublished?: boolean
    submissionType?: string
    timeLimit?: number
    attemptsAllowed?: number
    sourceDocument?: ImportedLearningResource
  }
  const sourceDocument = normalizedItem.sourceDocument
  const questions = normalizedItem.questions ?? []
  const totalQuestionPoints = questions.reduce((sum, question) => sum + (question.points || 0), 0)
  const showPreviewBadges = !showLiveShareAction
  const isDraft = normalizedItem.isPublished === false
  const allExtendEnabled = questions.length > 0 && questions.every((q) => q.extendEnabled)

  const addPreviewQuestion = (type: QuizQuestion['type']) => {
    if (!onUpdateItem) return
    const matchingPairs = type === 'matching'
      ? [
        { left: '', right: '' },
        { left: '', right: '' },
      ]
      : undefined
    const newQuestion: QuizQuestion = {
      id: `q-${generateId()}`,
      type,
      question: '',
      points: 1,
      options: (type === 'mcq' || type === 'multiselect') ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined,
      matchingPairs,
      correctAnswer: matchingPairs ? matchingPairs.map((pair) => pair.right) : undefined,
    }
    onUpdateItem({
      questions: [...(normalizedItem.questions || []), newQuestion],
      submissionType: 'questions',
    } as PreviewUpdatePayload)
  }

  const updatePreviewQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    if (!onUpdateItem) return
    const next = [...(normalizedItem.questions || [])]
    next[index] = { ...next[index], ...updates }
    onUpdateItem({ questions: next } as PreviewUpdatePayload)
  }

  const deletePreviewQuestion = (questionId: string) => {
    if (!onUpdateItem) return
    const next = (normalizedItem.questions || []).filter((q) => q.id !== questionId)
    onUpdateItem({ questions: next } as PreviewUpdatePayload)
  }

  useEffect(() => {
    setResourceText(sourceDocument?.extractedText || '')
  }, [sourceDocument?.extractedText, sourceDocument?.fileName])

  useEffect(() => {
    if (!onUpdateItem) return
    if ((normalizedItem.points || 0) !== totalQuestionPoints) {
      onUpdateItem({ points: totalQuestionPoints } as PreviewUpdatePayload)
    }
  }, [normalizedItem.points, onUpdateItem, totalQuestionPoints])

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
              {/* Draft badge removed */}
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
          <div><span className="text-muted-foreground">Assessment:</span> {lesson.homework.length}</div>
          <div><span className="text-muted-foreground">Exams:</span> 0</div>
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

  // Lesson (formerly module) preview
  if (type === 'module') {
    const mod = item as Module
    const totalTasks = mod.lessons.reduce((sum, l) => sum + l.tasks.length, 0)
    const totalAssessments = mod.lessons.reduce((sum, l) => sum + l.homework.length, 0)
    return (
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            <div>
              <Badge variant="outline" className="text-xs">Lesson</Badge>
              <h3 className="font-semibold text-lg mt-1">{mod.title}</h3>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit} className="gap-1">
            <PenTool className="h-3 w-3" /> Edit
          </Button>
        </div>
        {mod.description && <p className="text-sm text-muted-foreground">{mod.description}</p>}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div><span className="text-muted-foreground">Tasks:</span> {totalTasks}</div>
          <div><span className="text-muted-foreground">Assessments:</span> {totalAssessments}</div>
          <div><span className="text-muted-foreground">Exams:</span> {mod.moduleQuizzes.length}</div>
        </div>
      </div>
    )
  }

  const isQuiz = type === 'moduleQuiz'
  const homeworkLabel = type === 'homework' && (item as Assessment).category === 'homework' ? 'Homework' : 'Assessment'
  const label = type === 'moduleQuiz' ? 'Exam' : type === 'task' ? 'Task' : type === 'homework' ? homeworkLabel : type === 'worksheet' ? 'Worksheet' : 'Assessment'
  const isActivity = type === 'task' || type === 'homework'
  const activityLabel = type === 'task' ? 'Task' : homeworkLabel

  const handleGenerateAndPreviewPDF = () => {
    if (questions.length === 0) {
      toast.error('No questions to generate PDF')
      return
    }

    try {
      // Generate PDF from questions
      const pdf = generateQuestionPaperPDF(item.title, normalizedItem.description || '', questions)
      setGeneratedPdf({ url: pdf.url, fileName: pdf.fileName, blob: pdf.blob })
      setPdfPreviewOpen(true)
    } catch (error) {
      toast.error('Failed to generate PDF')
      console.error(error)
    }
  }

  const handleAssignToLiveClass = () => {
    if (!showLiveShareAction || !onMakeVisibleToStudents) return
    if (questions.length === 0) {
      toast.error('No questions to assign')
      return
    }
    onMakeVisibleToStudents({
      title: item.title,
      description: normalizedItem.description,
      itemType: type,
      questions,
    })
    setIsAssigned(true)
    toast.success('Assigned to live class')
  }

  const toggleAllExtend = (checked: boolean) => {
    if (!onUpdateItem) return
    const nextQuestions = questions.map((q) => ({ ...q, extendEnabled: checked }))
    onUpdateItem({ questions: nextQuestions } as PreviewUpdatePayload)
  }

  const handleConfirmPublish = async () => {
    if (!courseId) { toast.error('Course ID not available'); return }
    if (!generatedPdf) return

    setPublishing(true)
    try {
      // Convert blob to base64 for storage
      const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
      }

      const pdfBase64 = await blobToBase64(generatedPdf.blob)

      const generatedDocument: ImportedLearningResource = {
        fileName: generatedPdf.fileName,
        mimeType: 'application/pdf',
        fileUrl: pdfBase64,
        extractedText: `PDF Question Paper: ${item.title}\nTotal Questions: ${questions.length}`,
        uploadedAt: new Date().toISOString(),
      }

      const builderItem = {
        type,
        title: item.title,
        description: normalizedItem.description || '',
        questions: questions ?? [],
        lessonId: lessonId || null,
        difficulty: 'medium',
        points: normalizedItem.points,
        estimatedMinutes: normalizedItem.estimatedMinutes,
        documentSource: generatedDocument
          ? JSON.stringify({
            fileName: generatedDocument.fileName,
            mimeType: generatedDocument.mimeType,
            fileUrl: generatedDocument.fileUrl,
            extractedText: generatedDocument.extractedText,
          })
          : null,
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
        setPdfPreviewOpen(false)
        if (showLiveShareAction && onMakeVisibleToStudents) {
          onMakeVisibleToStudents({
            title: item.title,
            description: normalizedItem.description,
            itemType: type,
            sourceDocument: generatedDocument || undefined,
          })
        }
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
          {type === 'worksheet' && <FileText className="h-5 w-5 text-cyan-500" />}
          {type === 'moduleQuiz' && <FileQuestion className="h-5 w-5 text-red-500" />}
          <div>
            {showPreviewBadges && (
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">{label}</Badge>
                {/* Draft badge removed */}
              </div>
            )}
            <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={onEdit} className="gap-1">
            <PenTool className="h-3 w-3" />
            Edit
          </Button>
          {isActivity && (
            <div className="flex items-center gap-2 rounded-md border px-2 py-1">
              <Switch checked={allExtendEnabled} onCheckedChange={toggleAllExtend} />
              <Label className="text-xs">Extend</Label>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={onDuplicate} className="gap-1">
            <Copy className="h-3 w-3" />
            Duplicate
          </Button>
          {questions.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setStudentPreviewOpen(true)} className="gap-1">
              <Unlock className="h-3 w-3" />
              Student View
            </Button>
          )}
          {courseId && (
            <Button
              size="sm"
              onClick={isAssigned ? () => setStudentPreviewOpen(true) : (showLiveShareAction ? handleAssignToLiveClass : handleGenerateAndPreviewPDF)}
              disabled={publishing || questions.length === 0}
              className="gap-1"
            >
              {publishing ? <Loader2 className="h-3 w-3 animate-spin" /> : (isAssigned ? <Unlock className="h-3 w-3" /> : <Send className="h-3 w-3" />)}
              {isAssigned ? 'View' : (showLiveShareAction ? 'Assign' : 'Publish & Assign')}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onRemove} className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-3 w-3" />
            Remove
          </Button>
        </div>
      </div>
      {normalizedItem.description && (
        <div className="rounded-lg bg-muted/40 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Instructions</p>
          <p className="text-sm whitespace-pre-wrap">{normalizedItem.description}</p>
        </div>
      )}
      {'instructions' in normalizedItem && normalizedItem.instructions && (
        <div className="rounded-lg bg-muted/40 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Instructions</p>
          <p className="text-sm whitespace-pre-wrap">{normalizedItem.instructions}</p>
        </div>
      )}
      {isActivity && (
        <div className="space-y-3 rounded-lg border p-3">
          <h4 className="text-sm font-medium">{activityLabel} Settings</h4>
          {onUpdateItem && (
            <ResourceImportPanel
              data={item as Task}
              setData={(next) => onUpdateItem(next as PreviewUpdatePayload)}
              targetField="instructions"
            />
          )}
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-xs whitespace-nowrap">Points:</Label>
              <Input
                type="number"
                className="w-24 h-8"
                value={totalQuestionPoints}
                readOnly
              />
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        {'timeLimit' in normalizedItem && normalizedItem.timeLimit != null && (
          <div><span className="text-muted-foreground">Time limit:</span> {normalizedItem.timeLimit} min</div>
        )}
        {'attemptsAllowed' in normalizedItem && typeof normalizedItem.attemptsAllowed === 'number' && (
          <div><span className="text-muted-foreground">Attempts:</span> {normalizedItem.attemptsAllowed}</div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Questions ({questions?.length ?? 0})</h4>
        {isActivity ? (
          <div className="space-y-3">
            {(questions || []).map((q, idx) => (
              <div key={q.id} className="border rounded-lg p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">Q{idx + 1} - {q.type.toUpperCase()}</Badge>
                    <label className="flex items-center gap-1 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={q.extendEnabled ?? false}
                        onChange={(e: any) => updatePreviewQuestion(idx, { extendEnabled: e.target.checked })}
                      />
                      Extend
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      className="w-20 h-8"
                      value={q.points}
                      onChange={(e: any) => updatePreviewQuestion(idx, { points: parseInt(e.target.value) || 1 })}
                    />
                    <span className="text-sm text-muted-foreground">pts</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        if (!confirm('Delete this question?')) return
                        deletePreviewQuestion(q.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <AutoTextarea value={q.question}
                  onChange={(e: any) => updatePreviewQuestion(idx, { question: e.target.value })}
                  placeholder="Enter question"
                  rows={2}
                />
                {(q.type === 'mcq' || q.type === 'multiselect') && (
                  <div className="space-y-2 pl-4">
                    {(q.options && q.options.length > 0 ? q.options : ['', '', '', '']).map((opt, optIdx) => {
                      const options = q.options && q.options.length > 0 ? q.options : ['', '', '', '']
                      const selectedAnswers = Array.isArray(q.correctAnswer) ? q.correctAnswer : []
                      const checked = q.type === 'multiselect' ? selectedAnswers.includes(opt) : q.correctAnswer === opt
                      return (
                        <div key={optIdx} className="flex items-center gap-2">
                          {q.type === 'multiselect' ? (
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e: any) => {
                                const next = new Set(selectedAnswers)
                                if (e.target.checked) next.add(opt)
                                else next.delete(opt)
                                updatePreviewQuestion(idx, { correctAnswer: Array.from(next) })
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name={`correct-${q.id}`}
                              checked={checked}
                              onChange={() => updatePreviewQuestion(idx, { correctAnswer: opt })}
                            />
                          )}
                          <Input
                            value={options[optIdx]}
                            onChange={(e: any) => {
                              const nextOptions = [...options]
                              nextOptions[optIdx] = e.target.value
                              updatePreviewQuestion(idx, { options: nextOptions })
                            }}
                            placeholder={`Option ${optIdx + 1}`}
                            className="flex-1"
                          />
                        </div>
                      )
                    })}
                  </div>
                )}
                {q.type === 'truefalse' && (
                  <div className="flex gap-4 pl-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={q.correctAnswer === 'True'}
                        onChange={() => updatePreviewQuestion(idx, { correctAnswer: 'True' })}
                      />
                      <span>True</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={q.correctAnswer === 'False'}
                        onChange={() => updatePreviewQuestion(idx, { correctAnswer: 'False' })}
                      />
                      <span>False</span>
                    </label>
                  </div>
                )}
                {q.type === 'matching' && (
                  <MatchingPairsEditor
                    pairs={q.matchingPairs ?? [{ left: '', right: '' }, { left: '', right: '' }]}
                    onChange={(nextPairs) =>
                      updatePreviewQuestion(idx, {
                        matchingPairs: nextPairs,
                        correctAnswer: nextPairs.map((pair) => pair.right),
                        explanation: formatMatchingExplanation(nextPairs),
                      })
                    }
                  />
                )}
                <Textarea
                  value={q.explanation || ''}
                  onChange={(e: any) => updatePreviewQuestion(idx, { explanation: e.target.value })}
                  placeholder="Explanation (shown after answering)"
                  rows={2}
                  className="text-sm"
                />
              </div>
            ))}
          </div>
        ) : (
          <QuestionsPreview questions={questions ?? []} />
        )}
      </div>
      {isActivity && (
        <div className="flex items-center gap-2 pt-4 border-t flex-wrap">
          <Button variant="secondary" size="sm" onClick={() => setQuestionBankOpen(true)}>
            <BookOpen className="h-4 w-4 mr-1" /> Add from question bank
          </Button>
          <div className="h-6 w-px bg-border mx-1" />
          <Button variant="outline" size="sm" onClick={() => addPreviewQuestion('mcq')}>
            <Plus className="h-4 w-4 mr-1" /> MCQ
          </Button>
          <Button variant="outline" size="sm" onClick={() => addPreviewQuestion('truefalse')}>
            <Plus className="h-4 w-4 mr-1" /> T/F
          </Button>
          <Button variant="outline" size="sm" onClick={() => addPreviewQuestion('shortanswer')}>
            <Plus className="h-4 w-4 mr-1" /> Short
          </Button>
          <Button variant="outline" size="sm" onClick={() => addPreviewQuestion('essay')}>
            <Plus className="h-4 w-4 mr-1" /> Essay
          </Button>
          <Button variant="outline" size="sm" onClick={() => addPreviewQuestion('multiselect')}>
            <Plus className="h-4 w-4 mr-1" /> Multi
          </Button>
          <Button variant="outline" size="sm" onClick={() => addPreviewQuestion('matching')}>
            <Plus className="h-4 w-4 mr-1" /> Match
          </Button>
          <Button variant="outline" size="sm" onClick={() => addPreviewQuestion('fillblank')}>
            <Plus className="h-4 w-4 mr-1" /> Fill
          </Button>
        </div>
      )}
      {sourceDocument && (
        <div className="space-y-2 rounded-lg border p-3">
          <div className="text-xs text-muted-foreground">
            Imported file: <span className="font-medium text-foreground">{sourceDocument.fileName}</span>
          </div>
          <Textarea
            value={resourceText}
            onChange={(e: any) => setResourceText(e.target.value)}
            rows={8}
            placeholder="Edit imported content..."
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (!onUpdateItem) return
                onUpdateItem({
                  sourceDocument: { ...sourceDocument, extractedText: resourceText }
                })
                toast.success('Imported content updated')
              }}
            >
              Save Imported Content
            </Button>
          </div>
        </div>
      )}

      {studentPreviewOpen && questions.length > 0 && (
        <StudentPreviewModal
          questions={questions}
          onClose={() => setStudentPreviewOpen(false)}
        />
      )}

      {isActivity && (
        <Dialog open={questionBankOpen} onOpenChange={setQuestionBankOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Question Bank
              </DialogTitle>
            </DialogHeader>
            <QuestionBankSelector
              onSelect={(incomingQuestions) => {
                if (!onUpdateItem) return
                onUpdateItem({
                  questions: [...(normalizedItem.questions || []), ...incomingQuestions],
                  submissionType: 'questions',
                } as PreviewUpdatePayload)
                setQuestionBankOpen(false)
                toast.success(`${incomingQuestions.length} question(s) added`)
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* PDF Preview Modal */}
      <Dialog open={pdfPreviewOpen} onOpenChange={setPdfPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Preview Question Paper PDF
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Review the generated question paper before assigning to students. Each student will receive their own copy.
            </p>
            {generatedPdf && (
              <div className="border rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src={generatedPdf.url}
                  className="w-full h-[500px]"
                  title="Question Paper Preview"
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {questions.length} questions •
                {questions.reduce((sum, q) => sum + (q.points || 1), 0)} total points
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPdfPreviewOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmPublish}
                  disabled={publishing}
                  className="gap-1"
                >
                  {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Assign to Students
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ============================================
// MAIN COURSE BUILDER COMPONENT
// ============================================

export const CourseBuilder = forwardRef<CourseBuilderRef, CourseBuilderProps>(function CourseBuilder(
  { courseId, courseName, panelMode = 'default', initialModules = [], onSave, onMakeVisibleToStudents },
  ref
) {
  const [modules, setModules] = useState<Module[]>([])
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<{ type: string; id: string } | null>(null)
  const [outlineModalOpen, setOutlineModalOpen] = useState(false)
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [importTarget, setImportTarget] = useState<{ moduleId: string, lessonId: string } | null>(null)
  const [courseAssets, setCourseAssets] = useState<{ id: string, name: string, content?: string }[]>([])
  const [loadAsModalOpen, setLoadAsModalOpen] = useState(false)
  const [assetToLoad, setAssetToLoad] = useState<{name: string, content?: string} | null>(null)
  const [leftPanelHidden, setLeftPanelHidden] = useState(false)
  const [assetsOpen, setAssetsOpen] = useState(true)
  const [mediaOpen, setMediaOpen] = useState(true)
  const [docsOpen, setDocsOpen] = useState(true)
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
  const [collapsedTaskExtensions, setCollapsedTaskExtensions] = useState<Set<string>>(new Set())

  const objectUrlsRef = useRef<string[]>([])

  // State for lesson selection dialog
  const [lessonSelectDialog, setLessonSelectDialog] = useState<{
    isOpen: boolean
    type: 'task' | 'assessment' | null
    title: string
  }>({ isOpen: false, type: null, title: '' })

  // State for editable PCI tabs
  const [testPciTabs, setTestPciTabs] = useState([
    { id: 'classroom', label: 'Classroom' },
    { id: 'student1', label: 'Test Student 1' },
    { id: 'student2', label: 'Test Student 2' }
  ])
  const [editingTabId, setEditingTabId] = useState<string | null>(null)

  // Builder state for Task and Assessment
  // Task content is always preserved. Extensions have their own content.
  // When activeExtensionId is null, we show/edit taskContent/taskPci
  // When activeExtensionId is set, we show/edit that extension's content
  const [taskBuilder, setTaskBuilder] = useState({
    title: '',
    taskContent: '', // Base task content (never overwritten by extensions)
    taskPci: '', // Base task PCI (never overwritten by extensions)
    details: '',
    // Extensions have their own content stored separately
    extensions: [] as { id: string; name: string; description?: string; content: string; pci: string }[],
    activeExtensionId: null as string | null, // null = viewing task, string = viewing extension
  })

  const [assessmentBuilder, setAssessmentBuilder] = useState({
    title: '',
    taskContent: '',
    taskPci: '',
    details: '',
    extensions: [] as { id: string; name: string; description?: string; content: string; pci: string }[],
    activeExtensionId: null as string | null,
  })

  const [taskPciMessages, setTaskPciMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [taskExtensionPciMessages, setTaskExtensionPciMessages] = useState<Record<string, { role: 'user' | 'assistant'; content: string }[]>>({})
  const [taskExtensionPciInputs, setTaskExtensionPciInputs] = useState<Record<string, string>>({})
  const [assessmentPciMessages, setAssessmentPciMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [taskPciInput, setTaskPciInput] = useState('')
  const [assessmentPciInput, setAssessmentPciInput] = useState('')
  const [taskPciLoading, setTaskPciLoading] = useState(false)
  const [assessmentPciLoading, setAssessmentPciLoading] = useState(false)
  const [taskPciErrorHint, setTaskPciErrorHint] = useState('')
  const [assessmentPciErrorHint, setAssessmentPciErrorHint] = useState('')

  // AI Assist Agent state - separate for task and assessment
  const [aiAssistOpen, setAiAssistOpen] = useState(false)
  const [aiAssistContext, setAiAssistContext] = useState<'task' | 'assessment'>('task')
  const [taskAiMessages, setTaskAiMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [assessmentAiMessages, setAssessmentAiMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])

  // Uploaded files tracking
  const [taskUploadedFiles, setTaskUploadedFiles] = useState<{ id: string; name: string }[]>([])
  const [assessmentUploadedFiles, setAssessmentUploadedFiles] = useState<{ id: string; name: string }[]>([])

  // Test PCI state
  const [testPciInput, setTestPciInput] = useState('')
  const [testPciContent, setTestPciContent] = useState<Record<string, string>>({
    classroom: '',
    student1: '',
    student2: ''
  })
  // AI scoring results for Test PCI
  const [testPciScores, setTestPciScores] = useState<Record<string, { score: number; feedback: string }[]>>({
    classroom: [],
    student1: [],
    student2: []
  })
  const [testPciLoading, setTestPciLoading] = useState(false)
  const [testPciActiveTab, setTestPciActiveTab] = useState('classroom')
  const [testPciSource, setTestPciSource] = useState<'task' | 'assessment'>('task')
  const [taskDmiItems, setTaskDmiItems] = useState<DMIQuestion[]>([])
  const [assessmentDmiItems, setAssessmentDmiItems] = useState<DMIQuestion[]>([])

  // Active tab tracking for Enter button
  const [taskBuilderActiveTab, setTaskBuilderActiveTab] = useState<'content' | 'pci'>('content')
  const [assessmentBuilderActiveTab, setAssessmentBuilderActiveTab] = useState<'content' | 'pci'>('content')

  // Main builder tab (task vs assessment)
  const [mainBuilderTab, setMainBuilderTab] = useState<'task' | 'assessment'>('task')

  // Question Bank modal state
  const [questionBankOpen, setQuestionBankOpen] = useState(false)
  const [questionBankTarget, setQuestionBankTarget] = useState<string | null>(null)
  const [importTypeModalData, setImportTypeModalData] = useState<{ target: { moduleId: string, lessonId: string }, items: { questionText: string, pciText: string }[] } | null>(null)

  // Track currently loaded item for saving back
  const [loadedTaskId, setLoadedTaskId] = useState<string | null>(null)
  const [loadedAssessmentId, setLoadedAssessmentId] = useState<string | null>(null)

  // Load task data into taskBuilder
  const parsePciTranscript = (text: string) => {
    if (!text?.trim()) return [] as { role: 'user' | 'assistant'; content: string }[]
    const lines = text.split('\n')
    const messages: { role: 'user' | 'assistant'; content: string }[] = []
    let current: { role: 'user' | 'assistant'; content: string } | null = null
    for (const line of lines) {
      const trimmed = line.trim()
      const userMatch = trimmed.match(/^User:\s*(.*)$/i)
      const assistantMatch = trimmed.match(/^Assistant:\s*(.*)$/i)
      if (userMatch) {
        if (current) messages.push(current)
        current = { role: 'user', content: userMatch[1] }
        continue
      }
      if (assistantMatch) {
        if (current) messages.push(current)
        current = { role: 'assistant', content: assistantMatch[1] }
        continue
      }
      if (current) {
        current.content = `${current.content}\n${line}`
      } else if (trimmed) {
        current = { role: 'assistant', content: trimmed }
      }
    }
    if (current) messages.push(current)
    return messages
  }

  const loadTaskIntoBuilder = useCallback((task: Task, activeExtensionId: string | null = null) => {
    // Prioritize description over sourceDocument - description holds edited content
    const content = task.description || task.sourceDocument?.extractedText || ''
    setTaskBuilder({
      title: task.title || '',
      taskContent: content,
      taskPci: task.instructions || '',
      details: task.shortDescription || '',
      extensions: (task.extensions || []).map(ext => ({ ...ext, description: ext.description || '' })),
      activeExtensionId,
    })
    setTaskDmiItems(task.dmiItems || [])
    setTaskPciMessages(parsePciTranscript(task.instructions || ''))
    setTaskExtensionPciMessages(
      (task.extensions || []).reduce<Record<string, { role: 'user' | 'assistant'; content: string }[]>>((acc, ext) => {
        acc[ext.id] = parsePciTranscript(ext.pci || '')
        return acc
      }, {})
    )
    setTaskExtensionPciInputs(prev => {
      const next = { ...prev }
      for (const ext of task.extensions || []) {
        if (next[ext.id] === undefined) next[ext.id] = ''
      }
      return next
    })
    setLoadedTaskId(task.id)
    setTaskUploadedFiles(task.sourceDocument ? [{ id: 'source', name: task.sourceDocument.fileName }] : [])
  }, [])

  // Load assessment data into assessmentBuilder
  const loadAssessmentIntoBuilder = useCallback((assessment: Assessment) => {
    // Prioritize description over sourceDocument - description holds edited content
    const content = assessment.description || assessment.sourceDocument?.extractedText || ''
    setAssessmentBuilder({
      title: assessment.title || '',
      taskContent: content,
      taskPci: assessment.instructions || '',
      details: '',
      extensions: [],
      activeExtensionId: null,
    })
    setAssessmentDmiItems(assessment.dmiItems || [])
    setLoadedAssessmentId(assessment.id)
    setAssessmentUploadedFiles(assessment.sourceDocument ? [{ id: 'source', name: assessment.sourceDocument.fileName }] : [])
  }, [])

  // Load tutor assets from API on mount
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const res = await fetch('/api/tutor/assets', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          if (data.assets && Array.isArray(data.assets)) {
            setCourseAssets(data.assets)
          }
        }
      } catch (error) {
        console.error('Failed to load tutor assets:', error)
      }
    }
    loadAssets()
  }, [])

  // Save tutor assets to API when they change (debounced)
  const saveAssetsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const saveAssetsToApi = useCallback(async (assets: typeof courseAssets) => {
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/tutor/assets', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ assets }),
      })

      if (!res.ok) {
        console.error('Failed to save tutor assets')
      }
    } catch (error) {
      console.error('Error saving tutor assets:', error)
    }
  }, [])

  // Debounced assets save
  useEffect(() => {
    if (saveAssetsTimeoutRef.current) {
      clearTimeout(saveAssetsTimeoutRef.current)
    }
    saveAssetsTimeoutRef.current = setTimeout(() => {
      saveAssetsToApi(courseAssets)
    }, 2000) // Save after 2 seconds of inactivity

    return () => {
      if (saveAssetsTimeoutRef.current) {
        clearTimeout(saveAssetsTimeoutRef.current)
      }
    }
  }, [courseAssets, saveAssetsToApi])

  // Auto-save task on the fly (debounced)
  useEffect(() => {
    if (!loadedTaskId) return

    const timeoutId = setTimeout(() => {
      setModules(prev => prev.map(mod => ({
        ...mod,
        lessons: mod.lessons.map(lesson => ({
          ...lesson,
          tasks: lesson.tasks.map(task =>
            task.id === loadedTaskId
              ? {
                ...task,
                title: taskBuilder.title,
                shortDescription: taskBuilder.details,
                description: taskBuilder.taskContent,
                instructions: taskBuilder.taskPci,
                extensions: taskBuilder.extensions,
                dmiItems: taskDmiItems,
                sourceDocument: undefined
              }
              : task
          )
        }))
      })))
    }, 1000) // Auto-save after 1 second of inactivity

    return () => clearTimeout(timeoutId)
  }, [taskBuilder.title, taskBuilder.details, taskBuilder.taskContent, taskBuilder.taskPci, taskBuilder.extensions, taskDmiItems, loadedTaskId])

  // Auto-save assessment on the fly (debounced)
  useEffect(() => {
    if (!loadedAssessmentId) return

    const timeoutId = setTimeout(() => {
      setModules(prev => prev.map(mod => ({
        ...mod,
        lessons: mod.lessons.map(lesson => ({
          ...lesson,
          homework: lesson.homework.map(hw =>
            hw.id === loadedAssessmentId
              ? {
                ...hw,
                title: assessmentBuilder.title,
                description: assessmentBuilder.taskContent,
                instructions: assessmentBuilder.taskPci,
                dmiItems: assessmentDmiItems,
                sourceDocument: undefined
              }
              : hw
          )
        }))
      })))
    }, 1000) // Auto-save after 1 second of inactivity

    return () => clearTimeout(timeoutId)
  }, [assessmentBuilder.title, assessmentBuilder.taskContent, assessmentBuilder.taskPci, assessmentDmiItems, loadedAssessmentId])

  // Dev mode state for saving (declared early for ref access)
  const [devMode, setDevMode] = useState<'single' | 'multi'>('single')
  const [previewDifficulty, setPreviewDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')

  // Expose save method via ref
  useImperativeHandle(ref, () => ({
    save: () => {
      if (onSave) {
        onSave(modules, { developmentMode: devMode, previewDifficulty })
      }
    }
  }))

  const trackObjectUrl = useCallback((url: string) => {
    if (url.startsWith('blob:')) {
      objectUrlsRef.current.push(url)
    }
    return url
  }, [])

  const formatPciTranscript = (messages: { role: 'user' | 'assistant'; content: string }[]) =>
    messages.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')

  const handlePciSend = async (type: 'task' | 'assessment') => {
    const isTask = type === 'task'
    const activeTaskInput = taskBuilder.activeExtensionId
      ? (taskExtensionPciInputs[taskBuilder.activeExtensionId] || '')
      : taskPciInput
    const input = isTask ? activeTaskInput : assessmentPciInput
    const loading = isTask ? taskPciLoading : assessmentPciLoading
    if (!input.trim() || loading) return

    if (isTask && !loadedTaskId) autoCreateTask()
    if (!isTask && !loadedAssessmentId) autoCreateAssessment()

    const userMessage = input.trim()
    if (isTask) {
      if (taskBuilder.activeExtensionId) {
        setTaskExtensionPciInputs(prev => ({
          ...prev,
          [taskBuilder.activeExtensionId as string]: '',
        }))
      } else {
        setTaskPciInput('')
      }
    }
    else {
      setAssessmentPciInput('')
    }

    const currentTaskMessages = taskBuilder.activeExtensionId
      ? (taskExtensionPciMessages[taskBuilder.activeExtensionId] || [])
      : taskPciMessages
    const nextMessages = (isTask ? currentTaskMessages : assessmentPciMessages).concat({ role: 'user', content: userMessage })
    const updateTaskPciFromMessages = (messages: { role: 'user' | 'assistant'; content: string }[]) => {
      setTaskBuilder(prev => {
        if (prev.activeExtensionId) {
          return {
            ...prev,
            extensions: prev.extensions.map(ext =>
              ext.id === prev.activeExtensionId ? { ...ext, pci: formatPciTranscript(messages) } : ext
            )
          }
        }
        return { ...prev, taskPci: formatPciTranscript(messages) }
      })
    }

    if (isTask) {
      if (taskBuilder.activeExtensionId) {
        setTaskExtensionPciMessages(prev => ({
          ...prev,
          [taskBuilder.activeExtensionId as string]: nextMessages,
        }))
      } else {
        setTaskPciMessages(nextMessages)
      }
      updateTaskPciFromMessages(nextMessages)
      setTaskPciLoading(true)
    } else {
      setAssessmentPciMessages(nextMessages)
      setAssessmentBuilder(prev => ({ ...prev, taskPci: formatPciTranscript(nextMessages) }))
      setAssessmentPciLoading(true)
    }

    try {
      const slideContent = isTask
        ? taskBuilder.taskContent
        : assessmentBuilder.taskContent
      const pci = isTask
        ? (taskBuilder.activeExtensionId
          ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.pci || taskBuilder.taskPci
          : taskBuilder.taskPci)
        : assessmentBuilder.taskPci
      const sessionId = isTask
        ? (loadedTaskId ? `pci-task:${loadedTaskId}` : undefined)
        : (loadedAssessmentId ? `pci-assessment:${loadedAssessmentId}` : undefined)
      const extensionName = isTask && taskBuilder.activeExtensionId
        ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.name
        : undefined

      const response = await fetch('/api/ai/pci-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
          context: {
            type,
            title: isTask ? taskBuilder.title : assessmentBuilder.title,
            content: slideContent,
            pci,
            extensionName,
          },
        })
      })
      if (!response.ok) {
        let errorMessage = `Failed to get AI response (${response.status})`
        try {
          const errorBody = await response.json()
          if (errorBody?.error) {
            errorMessage = errorBody.errorId
              ? `${errorBody.error} (Error ID: ${errorBody.errorId})`
              : errorBody.error
          }
        } catch {
          // ignore JSON parse failures
        }
        throw new Error(errorMessage)
      }
      const data = await response.json()
      const assistantMessage = { role: 'assistant' as const, content: data.response || 'Unable to respond.' }
      if (isTask) {
        const updated = nextMessages.concat(assistantMessage)
        if (taskBuilder.activeExtensionId) {
          setTaskExtensionPciMessages(prev => ({
            ...prev,
            [taskBuilder.activeExtensionId as string]: updated,
          }))
        } else {
          setTaskPciMessages(updated)
        }
        updateTaskPciFromMessages(updated)
        setTaskPciErrorHint('')
      } else {
        const updated = nextMessages.concat(assistantMessage)
        setAssessmentPciMessages(updated)
        setAssessmentBuilder(prev => ({ ...prev, taskPci: formatPciTranscript(updated) }))
        setAssessmentPciErrorHint('')
      }
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? `PCI Assistant error: ${error.message}`
          : 'PCI Assistant error. Please try again.'
      toast.error(message)
      const hint =
        error instanceof Error && error.message
          ? error.message
          : 'Unable to reach the PCI assistant. Please try again.'
      if (isTask) setTaskPciErrorHint(hint)
      else setAssessmentPciErrorHint(hint)
      const errorMessage = { role: 'assistant' as const, content: 'Sorry, there was an error processing your request. Please try again.' }
      if (isTask) {
        const updated = nextMessages.concat(errorMessage)
        if (taskBuilder.activeExtensionId) {
          setTaskExtensionPciMessages(prev => ({
            ...prev,
            [taskBuilder.activeExtensionId as string]: updated,
          }))
        } else {
          setTaskPciMessages(updated)
        }
        updateTaskPciFromMessages(updated)
      } else {
        const updated = nextMessages.concat(errorMessage)
        setAssessmentPciMessages(updated)
        setAssessmentBuilder(prev => ({ ...prev, taskPci: formatPciTranscript(updated) }))
      }
    } finally {
      if (isTask) setTaskPciLoading(false)
      else setAssessmentPciLoading(false)
    }
  }

  // Handle Test PCI answer submission with AI scoring
  const handleTestPciSubmit = async () => {
    if (!testPciInput.trim() || testPciLoading) return

    const answer = testPciInput.trim()
    setTestPciInput('')
    setTestPciLoading(true)

    // Get PCI content from active task/assessment
    const pciContent = testPciSource === 'task'
      ? (taskBuilder.activeExtensionId
        ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.pci || taskBuilder.taskPci
        : taskBuilder.taskPci)
      : assessmentBuilder.taskPci

    // Determine which tabs to update
    const tabsToUpdate: string[] = []
    if (testPciActiveTab === 'classroom') {
      // Classroom goes to both students
      tabsToUpdate.push('classroom', 'student1', 'student2')
    } else {
      // Individual student tab
      tabsToUpdate.push(testPciActiveTab)
    }

    // Update content for all affected tabs
    setTestPciContent(prev => {
      const newContent = { ...prev }
      tabsToUpdate.forEach(tab => {
        newContent[tab] = (newContent[tab] ? newContent[tab] + '\n' : '') + `Tutor: ${answer}`
      })
      return newContent
    })

    try {
      // Call AI to score the answer
      const prompt = `You are an AI grading assistant. Please evaluate the following student answer.

Question/Task Content:
${testPciContent.classroom || 'No content provided'}

PCI (Instructions/Criteria):
${pciContent || 'No PCI provided - use your best judgment'}

Student Answer:
${answer}

Please provide:
1. A score from 0-100
2. Brief feedback explaining the score (why it's correct or what needs improvement)

Respond in this exact format:
SCORE: [number]
FEEDBACK: [your explanation]`

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3
        })
      })

      if (!response.ok) throw new Error('Failed to get AI response')

      const data = await response.json()
      const aiResponse = data.content || ''

      // Parse AI response
      const scoreMatch = aiResponse.match(/SCORE:\s*(\d+)/i)
      const feedbackMatch = aiResponse.match(/FEEDBACK:\s*([\s\S]+)/i)

      const score = scoreMatch ? parseInt(scoreMatch[1]) : 50
      const feedback = feedbackMatch ? feedbackMatch[1].trim() : 'No feedback provided'

      // Update scores for all affected tabs
      setTestPciScores(prev => {
        const newScores = { ...prev }
        tabsToUpdate.forEach(tab => {
          newScores[tab] = [...(newScores[tab] || []), { score, feedback: `Answer: ${answer}\n${feedback}` }]
        })
        return newScores
      })

      toast.success(`Answer scored: ${score}%`)
    } catch (error) {
      toast.error('Failed to score answer')
      // Still add the answer without scoring
      setTestPciScores(prev => {
        const newScores = { ...prev }
        tabsToUpdate.forEach(tab => {
          newScores[tab] = [...(newScores[tab] || []), { score: 0, feedback: `Answer: ${answer}\nError: Could not score - ${error instanceof Error ? error.message : 'Unknown error'}` }]
        })
        return newScores
      })
    } finally {
      setTestPciLoading(false)
    }
  }


  // Generate DMI using Slide content
  const handleGenerateDMI = async (type: 'task' | 'assessment') => {
    const isTask = type === 'task'
    const builder = isTask ? taskBuilder : assessmentBuilder
    const content = builder.taskContent

    if (!content.trim()) {
      toast.error('Please add slide content first')
      return
    }

    const lines = content.split('\n').filter(line => line.trim())
    const questionLines: { number: number; text: string }[] = []

    lines.forEach((line) => {
      const match = line.match(/^(?:Q(?:uestion)?\s*)?(\d+)[:.)\s]+(.+)$/i)
      if (match) {
        questionLines.push({
          number: parseInt(match[1]),
          text: match[2].trim()
        })
      }
    })

    if (questionLines.length === 0) {
      const chunks = content.split(/\n\n+/).filter(c => c.trim().length > 10)
      chunks.forEach((chunk, idx) => {
        const firstLine = chunk.split('\n')[0].trim()
        if (firstLine.length > 5) {
          questionLines.push({
            number: idx + 1,
            text: firstLine
          })
        }
      })
    }

    const items: DMIQuestion[] = questionLines.map(q => ({
      id: `dmi-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      questionNumber: q.number,
      questionText: q.text,
      answer: ''
    }))

    if (isTask) {
      setTaskDmiItems(items)
    } else {
      setAssessmentDmiItems(items)
    }

    toast.success('DMI form created from Slide content')
  }

  useEffect(() => {
    return () => {
      for (const url of objectUrlsRef.current) {
        try {
          URL.revokeObjectURL(url)
        } catch {
          // ignore
        }
      }
      objectUrlsRef.current = []
    }
  }, [])


  // Modal states
  const [activeModal, setActiveModal] = useState<{
    type: 'module' | 'lesson' | 'task' | 'homework' | 'worksheet' | 'moduleQuiz' | 'content'
    isOpen: boolean
    moduleId?: string
    lessonId?: string
    itemId?: string
  }>({ type: 'module', isOpen: false })

  const [editingData, setEditingData] = useState<any>(null)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  useEffect(() => {
    setModules(normalizeModulesForAssessments(initialModules))
  }, [initialModules])

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
    const variant = item.variants?.[previewDifficulty]
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

  const toggleSection = (moduleId: string, section: 'task' | 'assessment' | 'homework') => {
    const key = `${moduleId}:${section}`
    setCollapsedSections((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const isSectionCollapsed = (moduleId: string, section: 'task' | 'assessment' | 'homework') =>
    collapsedSections.has(`${moduleId}:${section}`)

  const ensureSectionExpanded = (moduleId: string, section: 'task' | 'assessment' | 'homework') => {
    setExpandedModules(prev => {
      const next = new Set(prev)
      next.add(moduleId)
      return next
    })
    setCollapsedSections(prev => {
      const next = new Set(prev)
      next.delete(`${moduleId}:${section}`)
      return next
    })
  }

  // Add handlers
  const addModule = () => {
    // Create a new module (lesson) directly without opening modal
    const newOrder = modules.length
    const newModule = DEFAULT_MODULE(newOrder)
    // Ensure the title follows "Lesson N" format
    newModule.title = `Lesson ${newOrder + 1}`
    newModule.lessons[0].title = `Lesson ${newOrder + 1}`

    setModules([...modules, newModule])
    setExpandedModules(new Set([...expandedModules, newModule.id]))
    // Do NOT open modal - just create directly
  }


  const addTask = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    let lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) {
      const fallbackLesson = DEFAULT_LESSON(modules[moduleIndex].lessons.length)
      const newModules = [...modules]
      newModules[moduleIndex].lessons.push(fallbackLesson)
      setModules(newModules)
      lessonIndex = newModules[moduleIndex].lessons.length - 1
    }

    const isFirstTask = modules[moduleIndex].lessons[lessonIndex].tasks.length === 0
    const newTask = DEFAULT_TASK(modules[moduleIndex].lessons[lessonIndex].tasks.length)
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].tasks.push(newTask)
    setModules(newModules)
    if (isFirstTask) ensureSectionExpanded(moduleId, 'task')
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

  const addAssessment = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    let lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) {
      const fallbackLesson = DEFAULT_LESSON(modules[moduleIndex].lessons.length)
      const newModules = [...modules]
      newModules[moduleIndex].lessons.push(fallbackLesson)
      setModules(newModules)
      lessonIndex = newModules[moduleIndex].lessons.length - 1
    }

    const isFirstAssessment = modules[moduleIndex].lessons[lessonIndex].homework.length === 0
    const newAssessment = DEFAULT_HOMEWORK(modules[moduleIndex].lessons[lessonIndex].homework.length, 'assessment')
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].homework.push(newAssessment)
    setModules(newModules)
    if (isFirstAssessment) ensureSectionExpanded(moduleId, 'assessment')
    // Just add to list without opening modal - same as addTask behavior
    toast.success('Assessment added')
  }

  const addHomework = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    let lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) {
      const fallbackLesson = DEFAULT_LESSON(modules[moduleIndex].lessons.length)
      const newModules = [...modules]
      newModules[moduleIndex].lessons.push(fallbackLesson)
      setModules(newModules)
      lessonIndex = newModules[moduleIndex].lessons.length - 1
    }

    const isFirstHomework = modules[moduleIndex].lessons[lessonIndex].homework.length === 0
    const newHomework = DEFAULT_HOMEWORK(modules[moduleIndex].lessons[lessonIndex].homework.length, 'homework')
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].homework.push(newHomework)
    setModules(newModules)
    if (isFirstHomework) ensureSectionExpanded(moduleId, 'homework')
    setEditingData(newHomework)
    setActiveModal({ type: 'homework', isOpen: true, moduleId, lessonId })
  }

  const addCourseExam = () => {
    const workingModules = modules.length > 0 ? [...modules] : [DEFAULT_MODULE(0)]
    const lastModuleIndex = workingModules.length - 1
    const lastModule = workingModules[lastModuleIndex]
    const newExam = {
      ...DEFAULT_MODULE_QUIZ(lastModule.moduleQuizzes.length),
      title: 'Final Exam',
      description: 'Comprehensive course-end assessment.',
    }
    workingModules[lastModuleIndex] = {
      ...lastModule,
      moduleQuizzes: [...(lastModule.moduleQuizzes || []), newExam],
    }
    setModules(workingModules)
    setExpandedModules(new Set([...expandedModules, workingModules[lastModuleIndex].id]))
    setEditingData(newExam)
    setActiveModal({ type: 'moduleQuiz', isOpen: true, moduleId: workingModules[lastModuleIndex].id })
    toast.success('Final exam added to end of course')
  }

  const ensureFirstLessonContext = useCallback(() => {
    let nextModules = [...modules]
    if (nextModules.length === 0) {
      nextModules = [DEFAULT_MODULE(0)]
    }
    if (nextModules[0].lessons.length === 0) {
      nextModules[0] = {
        ...nextModules[0],
        lessons: [DEFAULT_LESSON(0)],
      }
    }
    setModules(nextModules)
    setExpandedModules(new Set([...expandedModules, nextModules[0].id]))
    return {
      moduleId: nextModules[0].id,
      lessonId: nextModules[0].lessons[0].id,
    }
  }, [expandedModules, modules])

  // Auto-create task when typing in Task Builder without loaded task
  const autoCreateTask = useCallback(() => {
    const { moduleId, lessonId } = ensureFirstLessonContext()
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return null

    const isFirstTask = modules[moduleIndex].lessons[lessonIndex].tasks.length === 0
    const newTask = DEFAULT_TASK(modules[moduleIndex].lessons[lessonIndex].tasks.length)
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].tasks.push(newTask)
    setModules(newModules)
    if (isFirstTask) ensureSectionExpanded(moduleId, 'task')
    setLoadedTaskId(newTask.id)
    setTaskBuilder({
      title: newTask.title,
      taskContent: '',
      taskPci: '',
      details: newTask.shortDescription || '',
      extensions: [],
      activeExtensionId: null,
    })
    toast.success('New task created')
    return newTask
  }, [modules, ensureFirstLessonContext])

  // Auto-create assessment when typing in Assessment Builder without loaded assessment
  const autoCreateAssessment = useCallback(() => {
    const { moduleId, lessonId } = ensureFirstLessonContext()
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return null

    const isFirstAssessment = modules[moduleIndex].lessons[lessonIndex].homework.length === 0
    const newAssessment = DEFAULT_HOMEWORK(modules[moduleIndex].lessons[lessonIndex].homework.length, 'assessment')
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].homework.push(newAssessment)
    setModules(newModules)
    if (isFirstAssessment) ensureSectionExpanded(moduleId, 'assessment')
    setLoadedAssessmentId(newAssessment.id)
    setAssessmentBuilder({
      title: newAssessment.title,
      taskContent: '',
      taskPci: '',
      details: '',
      extensions: [],
      activeExtensionId: null,
    })
    toast.success('New assessment created')
    return newAssessment
  }, [modules, ensureFirstLessonContext])

  const assetsLesson = modules[0]?.lessons?.[0] ?? null

  const applyTemplate = useCallback((template: (typeof CONTENT_TEMPLATES)[number]) => {
    if (template.category === 'lesson') {
      addModule()
      toast.success(`Template applied: ${template.name}`)
      return
    }
    const { moduleId, lessonId } = ensureFirstLessonContext()
    if (template.category === 'quiz') {
      addAssessment(moduleId, lessonId)
      toast.success(`Template applied: ${template.name}`)
      return
    }
    if (template.category === 'assessment' || template.category === 'activity') {
      addTask(moduleId, lessonId)
      toast.success(`Template applied: ${template.name}`)
      return
    }
    toast.success(`Template selected: ${template.name}`)
  }, [addAssessment, addModule, addTask, ensureFirstLessonContext])

  // Drag & Drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string)
  }

  // Helper function to renumber module titles after reordering
  const renumberModules = (mods: Module[]): Module[] => {
    return mods.map((mod, idx) => ({
      ...mod,
      order: idx,
      title: mod.title.replace(/^Lesson \d+/, `Lesson ${idx + 1}`)
    }))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveDragId(null)

    if (!over || active.id === over.id) return

    const activeId = active.id as string
    const overId = over.id as string

    const findTaskLocation = (id: string) => {
      for (let mIdx = 0; mIdx < modules.length; mIdx++) {
        for (let lIdx = 0; lIdx < modules[mIdx].lessons.length; lIdx++) {
          const taskIndex = modules[mIdx].lessons[lIdx].tasks.findIndex(t => t.id === id)
          if (taskIndex !== -1) return { mIdx, lIdx, taskIndex }
        }
      }
      return null
    }

    const findHomeworkLocation = (id: string) => {
      for (let mIdx = 0; mIdx < modules.length; mIdx++) {
        for (let lIdx = 0; lIdx < modules[mIdx].lessons.length; lIdx++) {
          const hwIndex = modules[mIdx].lessons[lIdx].homework.findIndex(h => h.id === id)
          if (hwIndex !== -1) return { mIdx, lIdx, hwIndex }
        }
      }
      return null
    }

    const findLessonByModuleId = (id: string) => {
      const moduleIndex = modules.findIndex(m => m.id === id)
      if (moduleIndex === -1) return null
      return { mIdx: moduleIndex, lIdx: 0 }
    }

    // Check if dragging a module
    const activeModuleIndex = modules.findIndex(m => m.id === activeId)
    const overModuleIndex = modules.findIndex(m => m.id === overId)

    if (activeModuleIndex !== -1 && overModuleIndex !== -1) {
      const movedModules = arrayMove(modules, activeModuleIndex, overModuleIndex)
      setModules(renumberModules(movedModules))
      return
    }

    // Check if dragging a lesson
    for (let mIdx = 0; mIdx < modules.length; mIdx++) {
      const activeLessonIndex = modules[mIdx].lessons.findIndex(l => l.id === activeId)
      const overLessonIndex = modules[mIdx].lessons.findIndex(l => l.id === overId)

      if (activeLessonIndex !== -1 && overLessonIndex !== -1) {
        const newModules = [...modules]
        const movedLessons = arrayMove(
          newModules[mIdx].lessons,
          activeLessonIndex,
          overLessonIndex
        )
        // Renumber lessons after reordering
        newModules[mIdx].lessons = movedLessons.map((lesson, idx) => ({
          ...lesson,
          order: idx,
          title: lesson.title.replace(/^Lesson \d+/, `Lesson ${idx + 1}`)
        }))
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
          ).map((content, idx) => ({ ...content, order: idx }))
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

    // Move task across lessons
    const taskSource = findTaskLocation(activeId)
    if (taskSource) {
      const targetTaskLocation = findTaskLocation(overId)
      const targetLesson = targetTaskLocation
        ? { mIdx: targetTaskLocation.mIdx, lIdx: targetTaskLocation.lIdx }
        : findLessonByModuleId(overId)
      if (targetLesson && (taskSource.mIdx !== targetLesson.mIdx || taskSource.lIdx !== targetLesson.lIdx)) {
        const newModules = [...modules]
        const sourceTasks = newModules[taskSource.mIdx].lessons[taskSource.lIdx].tasks
        const [movedTask] = sourceTasks.splice(taskSource.taskIndex, 1)
        const targetTasks = newModules[targetLesson.mIdx].lessons[targetLesson.lIdx].tasks
        const insertIndex = targetTaskLocation ? targetTasks.findIndex(t => t.id === overId) : targetTasks.length
        targetTasks.splice(insertIndex === -1 ? targetTasks.length : insertIndex, 0, movedTask)
        setModules(newModules)
        return
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

    // Move homework/assessment across lessons
    const hwSource = findHomeworkLocation(activeId)
    if (hwSource) {
      const targetHwLocation = findHomeworkLocation(overId)
      const targetLesson = targetHwLocation
        ? { mIdx: targetHwLocation.mIdx, lIdx: targetHwLocation.lIdx }
        : findLessonByModuleId(overId)
      if (targetLesson && (hwSource.mIdx !== targetLesson.mIdx || hwSource.lIdx !== targetLesson.lIdx)) {
        const newModules = [...modules]
        const sourceHomework = newModules[hwSource.mIdx].lessons[hwSource.lIdx].homework
        const [movedHw] = sourceHomework.splice(hwSource.hwIndex, 1)
        const targetHomework = newModules[targetLesson.mIdx].lessons[targetLesson.lIdx].homework
        const insertIndex = targetHwLocation ? targetHomework.findIndex(h => h.id === overId) : targetHomework.length
        targetHomework.splice(insertIndex === -1 ? targetHomework.length : insertIndex, 0, movedHw)
        setModules(newModules)
        return
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
    toast.success('Lesson saved')
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

  const handleSaveTask = (data: any, targetModuleId?: string, targetLessonId?: string) => {
    const moduleId = targetModuleId || activeModal.moduleId
    const lessonId = targetLessonId || activeModal.lessonId
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return

    const newModules = [...modules]
    const taskIndex = newModules[moduleIndex].lessons[lessonIndex].tasks.findIndex(t => t.id === editingData?.id)
    if (taskIndex !== -1) {
      newModules[moduleIndex].lessons[lessonIndex].tasks[taskIndex] = data
    } else {
      // Add new task if not found
      newModules[moduleIndex].lessons[lessonIndex].tasks.push(data)
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

  const handleSaveAssessment = (data: any, targetModuleId?: string, targetLessonId?: string) => {
    const moduleId = targetModuleId || activeModal.moduleId
    const lessonId = targetLessonId || activeModal.lessonId
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return

    const newModules = [...modules]
    const hwIndex = newModules[moduleIndex].lessons[lessonIndex].homework.findIndex(h => h.id === editingData?.id)
    if (hwIndex !== -1) {
      newModules[moduleIndex].lessons[lessonIndex].homework[hwIndex] = data
    } else {
      // Add new homework/assessment if not found
      newModules[moduleIndex].lessons[lessonIndex].homework.push(data)
    }
    setModules(newModules)
    setActiveModal({ type: 'homework', isOpen: false })
    toast.success(data.category === 'homework' ? 'Homework saved' : 'Assessment saved')
  }

  const handleSaveWorksheet = (data: Worksheet) => {
    const moduleIndex = modules.findIndex(m => m.id === activeModal.moduleId)
    const lessonIndex = modules[moduleIndex]?.lessons.findIndex(l => l.id === activeModal.lessonId)
    if (moduleIndex === -1 || lessonIndex === -1) return

    const newModules = [...modules]
    if (!newModules[moduleIndex].lessons[lessonIndex].worksheets) {
      newModules[moduleIndex].lessons[lessonIndex].worksheets = []
    }
    const worksheetIndex = newModules[moduleIndex].lessons[lessonIndex].worksheets.findIndex(w => w.id === editingData.id)
    if (worksheetIndex !== -1) {
      newModules[moduleIndex].lessons[lessonIndex].worksheets[worksheetIndex] = data
    } else {
      newModules[moduleIndex].lessons[lessonIndex].worksheets.push(data)
    }
    setModules(newModules)
    setActiveModal({ type: 'worksheet', isOpen: false })
    toast.success('Worksheet saved')
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
    toast.success('Exam saved')
  }

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId))
    toast.success('Lesson deleted')
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

  const deleteAssessment = (moduleId: string, lessonId: string, hwId: string) => {
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
    toast.success('Assessment removed')
  }

  const deleteModuleQuiz = (moduleId: string, quizId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? { ...m, moduleQuizzes: (m.moduleQuizzes || []).filter(q => q.id !== quizId) }
        : m
    ))
    setSelectedItem(null)
    toast.success('Exam removed')
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

  const duplicateAssessment = (moduleId: string, lessonId: string, hw: Assessment) => {
    const copy: Assessment = {
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
    toast.success('Assessment duplicated')
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
    toast.success('Exam duplicated')
  }

  const deleteWorksheet = (moduleId: string, lessonId: string, worksheetId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? {
          ...m,
          lessons: m.lessons.map(l =>
            l.id === lessonId
              ? { ...l, worksheets: (l.worksheets || []).filter(w => w.id !== worksheetId) }
              : l
          )
        }
        : m
    ))
    setSelectedItem(null)
    toast.success('Worksheet removed')
  }

  const duplicateWorksheet = (moduleId: string, lessonId: string, worksheet: Worksheet) => {
    const copy: Worksheet = {
      ...worksheet,
      id: `worksheet-${generateId()}`,
      title: `${worksheet.title} (copy)`,
      questions: worksheet.questions?.map(q => ({ ...q, id: `q-${generateId()}` }))
    }
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) return
    const newModules = [...modules]
    if (!newModules[moduleIndex].lessons[lessonIndex].worksheets) {
      newModules[moduleIndex].lessons[lessonIndex].worksheets = []
    }
    newModules[moduleIndex].lessons[lessonIndex].worksheets = [
      ...newModules[moduleIndex].lessons[lessonIndex].worksheets,
      copy
    ]
    setModules(newModules)
    setSelectedItem({ type: 'worksheet', id: copy.id })
    toast.success('Worksheet duplicated')
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
          id: `video-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
          title: file.name,
          url: trackObjectUrl(URL.createObjectURL(file)),
          duration: 0
        })
      } else {
        newModules[moduleIndex].lessons[lessonIndex].media.images.push({
          id: `image-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
          title: file.name,
          url: trackObjectUrl(URL.createObjectURL(file))
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
        id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        title: file.name,
        url: trackObjectUrl(URL.createObjectURL(file)),
        type: docType
      })
    })

    setModules(newModules)
    toast.success(`${files.length} document(s) uploaded`)
  }

  const handleAssetsMediaUpload = (files: FileList | null, type: 'video' | 'image') => {
    const { moduleId, lessonId } = ensureFirstLessonContext()
    handleMediaUpload(moduleId, lessonId, files, type)
  }

  const handleAssetsDocUpload = (files: FileList | null) => {
    const { moduleId, lessonId } = ensureFirstLessonContext()
    handleDocUpload(moduleId, lessonId, files)
  }

  const handleDeleteAssetMedia = (mediaType: 'video' | 'image', mediaId: string) => {
    const { moduleId, lessonId } = ensureFirstLessonContext()
    setModules((prev) =>
      prev.map((module) => {
        if (module.id !== moduleId) return module
        return {
          ...module,
          lessons: module.lessons.map((lesson) => {
            if (lesson.id !== lessonId) return lesson
            return {
              ...lesson,
              media: {
                ...lesson.media,
                videos: mediaType === 'video' ? (lesson.media?.videos || []).filter((v) => v.id !== mediaId) : (lesson.media?.videos || []),
                images: mediaType === 'image' ? (lesson.media?.images || []).filter((i) => i.id !== mediaId) : (lesson.media?.images || []),
              },
            }
          }),
        }
      })
    )
  }

  const handleDeleteAssetDoc = (docId: string) => {
    const { moduleId, lessonId } = ensureFirstLessonContext()
    setModules((prev) =>
      prev.map((module) => {
        if (module.id !== moduleId) return module
        return {
          ...module,
          lessons: module.lessons.map((lesson) => {
            if (lesson.id !== lessonId) return lesson
            return {
              ...lesson,
              docs: (lesson.docs || []).filter((doc) => doc.id !== docId),
            }
          }),
        }
      })
    )
  }

  
  const getAssetIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase() || ''
    if (['doc', 'docx'].includes(ext)) return <FileText className="w-4 h-4 text-blue-600" />
    if (['pdf'].includes(ext)) return <FileText className="w-4 h-4 text-red-600" />
    if (['xls', 'xlsx', 'csv'].includes(ext)) return <FileText className="w-4 h-4 text-green-600" />
    if (['ppt', 'pptx'].includes(ext)) return <FileText className="w-4 h-4 text-orange-600" />
    if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) return <FileText className="w-4 h-4 text-purple-600" />
    if (['mp4', 'mov', 'webm'].includes(ext)) return <FileText className="w-4 h-4 text-pink-600" />
    return <FileText className="w-4 h-4 text-slate-500" />
  }

  const handleDragFiles = async (e: React.DragEvent<HTMLTextAreaElement>, onText: (t: string) => void) => {
    const files = Array.from(e.dataTransfer.files || [])
    if (files.length > 0) {
      e.preventDefault()
      let combined = ''
      for (const f of files) {
        try {
          // If it's a lightweight text file, parse as text directly. For PDF, DOCX, PPTX parse via extractTextFromFile
          const extracted = await extractTextFromFile(f)
          if (extracted) {
             combined += extracted + '\n\n'
          } else {
             combined += `[Imported ${f.name}]\n\n`
          }
        } catch {
          combined += `[Imported ${f.name}]\n\n`
        }
      }
      onText(combined.trim())
      toast.success('File(s) parsed and loaded')
    }
  }

  const handleLoadAsset = (asset: { name: string; content?: string }) => {
    // Always open the "Load as..." modal so the user can choose where to load
    setAssetToLoad(asset)
    setLoadAsModalOpen(true)
  }

  const renderAssetsFolder = () => (
    <div className="mt-4 border rounded-md">
      <div
        className="flex items-center justify-between p-2 bg-slate-100 cursor-pointer border-b"
        onClick={() => setAssetsOpen(!assetsOpen)}
      >
        <span className="text-xs font-semibold flex items-center gap-1">
          <FolderOpen className="w-3 h-3" /> Assets
        </span>
        <div className="flex items-center gap-3" onClick={(e: any) => e.stopPropagation()}>
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={async (e: any) => {
                const files = Array.from(e.target.files || [])
                const newAssets = await Promise.all(
                  files.map(async (f: any) => {
                    let textContent = ''
                    try {
                      const extracted = await extractTextFromFile(f)
                      textContent = extracted || `[Imported ${f.name}]`
                    } catch {
                      textContent = `[Imported ${f.name}]`
                    }
                    return {
                      id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                      name: f.name,
                      content: textContent
                    }
                  })
                )
                setCourseAssets((prev) => [...prev, ...newAssets])
                if (files.length > 0) toast.success(`${files.length} asset(s) imported`)
                e.target.value = ''
              }}
            />
            <span className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
              <Upload className="w-3 h-3" /> Import Asset
            </span>
          </label>
        </div>
      </div>
      {assetsOpen && (
        <div className="p-2 flex flex-col gap-2 min-h-[50px] bg-white rounded-b-md">
          {courseAssets.length === 0 ? (
            <p className="text-xs text-muted-foreground w-full py-2 text-center">No assets imported.</p>
          ) : (
            courseAssets.map(asset => (
              <div
                key={asset.id}
                draggable
                onDragStart={(e: any) => {
                  e.dataTransfer.setData('text/plain', `[Asset: ${asset.name}]`)
                  e.dataTransfer.effectAllowed = 'copy'
                }}
                className="text-xs bg-white border border-slate-200 rounded px-2 py-2 cursor-grab shadow-sm flex items-center justify-between hover:bg-slate-50 transition-colors"
                title="Drag or load into editor"
              >
                <div className="flex items-center gap-2 overflow-hidden mr-2 flex-1">
                   {getAssetIcon(asset.name)}
                   <span 
                     className="truncate font-medium cursor-text flex-1" 
                     onDoubleClick={() => {
                       const newName = prompt('Rename asset:', asset.name);
                       if (newName && newName.trim() !== '') {
                         setCourseAssets(prev => prev.map(a => a.id === asset.id ? { ...a, name: newName.trim() } : a));
                       }
                     }} 
                     title="Double click to rename"
                   >
                     {asset.name}
                   </span>
                </div>
                <div className="flex gap-1 items-center shrink-0">
                  <Button variant="outline" size="sm" className="h-6 px-2 text-[10px]" onClick={() => handleLoadAsset(asset)} title="Load into builder text area">
                     Load
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => {
                     setCourseAssets(prev => prev.filter(a => a.id !== asset.id))
                  }} title="Delete asset">
                     <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    
      <Dialog open={loadAsModalOpen} onOpenChange={setLoadAsModalOpen}>
        <DialogContent className="sm:max-w-md border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Load as...</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-gray-500">
              Select how you would like to load "{assetToLoad?.name}":
            </p>
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => {
              const { moduleId, lessonId } = ensureFirstLessonContext()
              const moduleIndex = modules.findIndex(m => m.id === moduleId)
              const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
              const newTask = DEFAULT_TASK(modules[moduleIndex].lessons[lessonIndex].tasks.length)
              const textToInsert = assetToLoad?.content || `[Asset: ${assetToLoad?.name}]`
              
              newTask.description = textToInsert
              
              const newModules = [...modules]
              newModules[moduleIndex].lessons[lessonIndex].tasks.push(newTask)
              setModules(newModules)
              setMainBuilderTab('task')
              setSelectedItem({ type: 'task', id: newTask.id })
              loadTaskIntoBuilder(newTask)
              
              toast.success(`Created new Task and loaded '${assetToLoad?.name}'`)
              setLoadAsModalOpen(false)
              setAssetToLoad(null)
            }}>
              <ListTodo className="h-4 w-4 text-orange-500" />
              Task
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => {
              const textToInsert = assetToLoad?.content || `[Asset: ${assetToLoad?.name}]`
              if (taskBuilder.activeExtensionId) {
                setTaskBuilder(prev => ({
                  ...prev,
                  extensions: prev.extensions.map(ext =>
                    ext.id === prev.activeExtensionId ? { ...ext, content: textToInsert } : ext
                  )
                }))
                if (loadedTaskId) {
                  setModules(prev => prev.map(mod => ({
                    ...mod,
                    lessons: mod.lessons.map(lesson => ({
                      ...lesson,
                      tasks: lesson.tasks.map(t =>
                        t.id === loadedTaskId
                          ? {
                            ...t,
                            extensions: (t.extensions || []).map(ext =>
                              ext.id === taskBuilder.activeExtensionId ? { ...ext, content: textToInsert } : ext
                            )
                          }
                          : t
                      )
                    }))
                  })))
                }
                setMainBuilderTab('task')
                toast.success(`Loaded '${assetToLoad?.name}' into extension`)
                setLoadAsModalOpen(false)
                setAssetToLoad(null)
                return
              }
              if (!loadedTaskId) {
                toast.error('Select a task to add an extension')
                return
              }
              const extNumber = taskBuilder.extensions.length + 1
              const newExtension = {
                id: `ext-${Date.now()}`,
                name: `Extension ${extNumber}`,
                description: '',
                content: textToInsert,
                pci: ''
              }
              setTaskExtensionPciMessages(prev => ({ ...prev, [newExtension.id]: [] }))
              setTaskExtensionPciInputs(prev => ({ ...prev, [newExtension.id]: '' }))
              setTaskBuilder(prev => ({
                ...prev,
                extensions: [...prev.extensions, newExtension],
                activeExtensionId: newExtension.id
              }))
              setModules(prev => prev.map(mod => ({
                ...mod,
                lessons: mod.lessons.map(lesson => ({
                  ...lesson,
                  tasks: lesson.tasks.map(t =>
                    t.id === loadedTaskId
                      ? { ...t, extensions: [...(t.extensions || []), newExtension] }
                      : t
                  )
                }))
              })))
              setMainBuilderTab('task')
              toast.success(`Created extension and loaded '${assetToLoad?.name}'`)
              setLoadAsModalOpen(false)
              setAssetToLoad(null)
            }}>
              <Layers2 className="h-4 w-4 text-orange-500" />
              Extensions
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => {
              const { moduleId, lessonId } = ensureFirstLessonContext()
              const moduleIndex = modules.findIndex(m => m.id === moduleId)
              const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
              const newAssess = DEFAULT_HOMEWORK(modules[moduleIndex].lessons[lessonIndex].homework.length, 'assessment')
              const textToInsert = assetToLoad?.content || `[Asset: ${assetToLoad?.name}]`
              
              newAssess.description = textToInsert
              
              const newModules = [...modules]
              newModules[moduleIndex].lessons[lessonIndex].homework.push(newAssess)
              setModules(newModules)
              setMainBuilderTab('assessment')
              setSelectedItem({ type: 'assessment', id: newAssess.id })
              loadAssessmentIntoBuilder(newAssess)
              
              toast.success(`Created new Assessment and loaded '${assetToLoad?.name}'`)
              setLoadAsModalOpen(false)
              setAssetToLoad(null)
            }}>
              <FileQuestion className="h-4 w-4 text-purple-500" />
              Assessment
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => {
              const { moduleId, lessonId } = ensureFirstLessonContext()
              const moduleIndex = modules.findIndex(m => m.id === moduleId)
              const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
              const newHw = DEFAULT_HOMEWORK(modules[moduleIndex].lessons[lessonIndex].homework.length, 'homework')
              const textToInsert = assetToLoad?.content || `[Asset: ${assetToLoad?.name}]`
              
              newHw.description = textToInsert
              
              const newModules = [...modules]
              newModules[moduleIndex].lessons[lessonIndex].homework.push(newHw)
              setModules(newModules)
              setMainBuilderTab('assessment')
              setSelectedItem({ type: 'homework', id: newHw.id })
              loadAssessmentIntoBuilder(newHw)
              
              toast.success(`Created new Homework and loaded '${assetToLoad?.name}'`)
              setLoadAsModalOpen(false)
              setAssetToLoad(null)
            }}>
              <FileQuestion className="h-4 w-4 text-pink-500" />
              Homework
            </Button>
          </div>
        </DialogContent>
      </Dialog>
</div>
  )

  const updateSelectedItem = (updates: PreviewUpdatePayload) => {
    if (!selectedItem) return
    const target = resolveSelectedItem(selectedItem, modules)
    if (!target?.lessonId) return

    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== target.moduleId) return mod
        return {
          ...mod,
          lessons: mod.lessons.map((lesson) => {
            if (lesson.id !== target.lessonId) return lesson
            if (selectedItem.type === 'task') {
              const taskUpdates = updates as Partial<Task>
              return {
                ...lesson,
                tasks: lesson.tasks.map((task) => task.id === selectedItem.id ? { ...task, ...taskUpdates } : task),
              }
            }
            if (selectedItem.type === 'homework') {
              const homeworkUpdates = updates as Partial<Assessment>
              return {
                ...lesson,
                homework: lesson.homework.map((hw) => hw.id === selectedItem.id ? { ...hw, ...homeworkUpdates } : hw),
              }
            }
            if (selectedItem.type === 'worksheet') {
              const worksheetUpdates = updates as Partial<Worksheet>
              return {
                ...lesson,
                worksheets: (lesson.worksheets || []).map((ws) => ws.id === selectedItem.id ? { ...ws, ...worksheetUpdates } : ws),
              }
            }
            return lesson
          }),
        }
      })
    )
  }

  const activeTaskExtension = taskBuilder.activeExtensionId
    ? taskBuilder.extensions.find(ext => ext.id === taskBuilder.activeExtensionId)
    : null
  const activeTaskPciMessages = taskBuilder.activeExtensionId
    ? (taskExtensionPciMessages[taskBuilder.activeExtensionId] || [])
    : taskPciMessages
  const activeTaskPciInput = taskBuilder.activeExtensionId
    ? (taskExtensionPciInputs[taskBuilder.activeExtensionId] || '')
    : taskPciInput
  const taskHeaderTitle = activeTaskExtension
    ? `${taskBuilder.title || 'Task'} ${activeTaskExtension.name}`
    : (taskBuilder.title || 'Task')
  const taskHeaderDescription = activeTaskExtension
    ? (activeTaskExtension.description || 'Add a short description')
    : (taskBuilder.details || 'Add a short description')

  const handleSaveAll = () => {
    if (!onSave) return
    onSave(modules, { developmentMode: devMode, previewDifficulty })
  }

  const isExtensionsCollapsed = (taskId: string) => collapsedTaskExtensions.has(taskId)

  const toggleExtensions = (taskId: string) => {
    setCollapsedTaskExtensions(prev => {
      const next = new Set(prev)
      if (next.has(taskId)) next.delete(taskId)
      else next.add(taskId)
      return next
    })
  }

  return (
    <div className={cn("space-y-4 flex-1 flex flex-col min-h-0", panelMode === 'live-class' && "pt-3")}>
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* LEFT PANEL - Course Structure */}
        {!leftPanelHidden && (
          <div className="col-span-4 flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col min-h-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    Course Builder
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-2 text-xs"
                    onClick={() => setLeftPanelHidden(true)}
                    title="Hide course panel"
                  >
                    <LayoutTemplate className="h-4 w-4" />
                    Hide Panel
                  </Button>
                </div>
              </CardHeader>
            <CardContent className="pt-0 flex-1 flex flex-col">
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
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline" onClick={addCourseExam} className="gap-1 h-6 text-xs">
                          <FileQuestion className="h-3 w-3" />
                          Exam
                        </Button>
                        <Button size="sm" onClick={addModule} className="gap-1 h-6 text-xs">
                          <Plus className="h-3 w-3" />
                          Lesson
                        </Button>
                      </div>
                    </div>


                    {/* Lessons (formerly modules) - with drag sorting */}
                    <SortableContext
                      items={modules.map(m => m.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {modules.map((module, moduleIdx) => {
                        const primaryLesson = module.lessons[0] ?? DEFAULT_LESSON(0)
                        const taskCount = primaryLesson.tasks?.length || 0
                        const assessments = (primaryLesson.homework || []).filter((h) => h.category !== 'homework')
                        const homeworkItems = (primaryLesson.homework || []).filter((h) => h.category === 'homework')
                        const totalItems = taskCount + assessments.length + homeworkItems.length
                        return (
                          <SortableTreeItem key={module.id} id={module.id} depth={1} isLast={moduleIdx === modules.length - 1} inlineDragHandle>
                            <div className="group">
                              <div
                                className={cn(
                                  "flex flex-wrap items-center gap-1.5 py-1.5 px-2 rounded cursor-pointer transition-colors",
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
                                <span className="text-sm font-medium flex-1 truncate min-w-0">{module.title}</span>
                                <Badge variant="secondary" className="text-[10px] h-4">
                                  {totalItems}
                                </Badge>

                                {/* +Task Button */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-[10px] gap-1 opacity-0 group-hover:opacity-100 px-2 text-orange-600"
                                  onClick={(e: any) => {
                                    e.stopPropagation()
                                    addTask(module.id, primaryLesson.id)
                                  }}
                                >
                                  <Plus className="h-3 w-3" />
                                  Task
                                </Button>

                                {/* +Assessment Button */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-[10px] gap-1 opacity-0 group-hover:opacity-100 px-2 text-purple-600"
                                  onClick={(e: any) => {
                                    e.stopPropagation()
                                    addAssessment(module.id, primaryLesson.id)
                                  }}
                                >
                                  <Plus className="h-3 w-3" />
                                  Assessment
                                </Button>

                                {/* Import Button */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-[10px] gap-1 opacity-0 group-hover:opacity-100 px-2 text-blue-600"
                                  onClick={(e: any) => {
                                    e.stopPropagation()
                                    setImportTarget({ moduleId: module.id, lessonId: primaryLesson.id })
                                    setQuestionBankOpen(true)
                                  }}
                                >
                                  <FolderOpen className="h-3 w-3" />
                                  Import
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                                  onClick={(e: any) => {
                                    e.stopPropagation()
                                    deleteModule(module.id)
                                  }}
                                >
                                  <Trash2 className="h-3 w-3 text-red-500" />
                                </Button>
                              </div>

                              {expandedModules.has(module.id) && (
                                <div className="mt-1 space-y-1">
                                  {/* Tasks */}
                                  <TreeItem depth={2} isLast={false}>
                                    <div className="flex items-center gap-1.5">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5"
                                        onClick={() => toggleSection(module.id, 'task')}
                                        aria-label={isSectionCollapsed(module.id, 'task') ? 'Expand tasks' : 'Collapse tasks'}
                                      >
                                        {isSectionCollapsed(module.id, 'task') ? (
                                          <ChevronRight className="h-3 w-3 text-orange-600" />
                                        ) : (
                                          <ChevronDown className="h-3 w-3 text-orange-600" />
                                        )}
                                      </Button>
                                    </div>
                                  </TreeItem>
                                  {!isSectionCollapsed(module.id, 'task') && (
                                    <SortableContext
                                      items={primaryLesson.tasks?.map(t => t.id) || []}
                                      strategy={verticalListSortingStrategy}
                                    >
                                      {(primaryLesson.tasks || []).map((task, idx) => (
                                        <div key={task.id} className="contents">
                                          <SortableTreeItem id={task.id} depth={2} isLast={idx === (primaryLesson.tasks?.length || 0) - 1}>
                                          <div
                                            className={cn(
                                              "flex items-center gap-1.5 py-1 px-2 rounded border group/item cursor-pointer transition-colors",
                                              selectedItem?.type === 'task' && selectedItem?.id === task.id
                                                ? "bg-orange-200 border-orange-400 ring-1 ring-orange-400"
                                                : "bg-orange-50 border-orange-200 hover:bg-orange-100"
                                            )}
                                            onClick={() => {
                                              // Auto-save current assessment if switching from one
                                              if (loadedAssessmentId) {
                                                setModules(prev => prev.map(mod => ({
                                                  ...mod,
                                                  lessons: mod.lessons.map(lesson => ({
                                                    ...lesson,
                                                    homework: lesson.homework.map(hw =>
                                                      hw.id === loadedAssessmentId
                                                        ? {
                                                          ...hw,
                                                          title: assessmentBuilder.title,
                                                          description: assessmentBuilder.taskContent,
                                                          instructions: assessmentBuilder.taskPci,
                                                          dmiItems: assessmentDmiItems,
                                                          sourceDocument: undefined
                                                        }
                                                        : hw
                                                    )
                                                  }))
                                                })))
                                              }
                                              // Auto-save current task if switching from another task
                                              if (loadedTaskId && loadedTaskId !== task.id) {
                                                setModules(prev => prev.map(mod => ({
                                                  ...mod,
                                                  lessons: mod.lessons.map(lesson => ({
                                                    ...lesson,
                                                    tasks: lesson.tasks.map(t =>
                                                      t.id === loadedTaskId
        ? {
          ...t,
          title: taskBuilder.title,
          description: taskBuilder.taskContent,
          instructions: taskBuilder.taskPci,
          extensions: taskBuilder.extensions,
          dmiItems: taskDmiItems,
          sourceDocument: undefined
        }
        : t
                                                    )
                                                  }))
                                                })))
                                              }
                                              setSelectedItem({ type: 'task', id: task.id })
                                              loadTaskIntoBuilder(task)
                                              setMainBuilderTab('task')
                                            }}
                                          >
                                            <ListTodo className="h-3 w-3 text-orange-500" />
                                            <span className="text-[10px] flex-1 truncate">
                                              <span className="font-semibold text-orange-700">{idx + 1}.</span> {task.title}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">{task.points}pts</span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                              onClick={(e: any) => {
                                                e.stopPropagation()
                                                setQuestionBankTarget(`task-${task.id}`)
                                                setImportTarget(null)
                                                setQuestionBankOpen(true)
                                              }}
                                            >
                                              Import
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                              onClick={(e: any) => {
                                                e.stopPropagation()
                                                setEditingData(task)
                                                setActiveModal({ type: 'task', isOpen: true, moduleId: module.id, lessonId: primaryLesson.id, itemId: task.id })
                                              }}
                                            >
                                              Edit
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-5 w-5 opacity-0 group-hover/item:opacity-100"
                                              onClick={(e: any) => {
                                                e.stopPropagation()
                                                if (!confirm(`Delete "${task.title}"?`)) return
                                                deleteTask(module.id, primaryLesson.id, task.id)
                                              }}
                                            >
                                              <Trash2 className="h-3 w-3 text-red-500" />
                                            </Button>
                                          </div>
                                          </SortableTreeItem>
                                        {loadedTaskId === task.id && taskBuilder.extensions.length > 0 && (
                                          <div className="ml-8 mt-1 space-y-1 border-l border-orange-200 pl-3">
                                            <div
                                              className="flex items-center gap-2 rounded px-2 py-1 text-[10px] border bg-white cursor-pointer"
                                              onClick={() => toggleExtensions(task.id)}
                                            >
                                              {isExtensionsCollapsed(task.id) ? (
                                                <ChevronRight className="h-3 w-3 text-orange-600" />
                                              ) : (
                                                <ChevronDown className="h-3 w-3 text-orange-600" />
                                              )}
                                              <FolderOpen className="h-3 w-3 text-orange-600" />
                                              <span className="font-semibold text-orange-700">Extensions</span>
                                              <span className="text-muted-foreground">({taskBuilder.extensions.length})</span>
                                            </div>
                                            {!isExtensionsCollapsed(task.id) && (
                                              <div className="ml-3 space-y-1">
                                                {taskBuilder.extensions.map((ext, extIdx) => (
                                                  <div
                                                    key={ext.id}
                                                    className={cn(
                                                      "flex items-center gap-2 rounded px-2 py-1 text-[10px] cursor-pointer border group/extension",
                                                      taskBuilder.activeExtensionId === ext.id
                                                        ? "bg-orange-100 border-orange-300"
                                                        : "bg-white border-orange-100 hover:bg-orange-50"
                                                    )}
                                                    onClick={() => {
                                                      setSelectedItem({ type: 'task', id: task.id })
                                                      loadTaskIntoBuilder(task, ext.id)
                                                      setMainBuilderTab('task')
                                                    }}
                                                  >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                                                    <span className="font-semibold text-orange-700">{idx + 1}.{extIdx + 1}</span>
                                                    <span className="flex-1 truncate text-muted-foreground">{ext.name}</span>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-5 text-[10px] gap-1 opacity-0 group-hover/extension:opacity-100 px-1"
                                                      onClick={(e: any) => {
                                                        e.stopPropagation()
                                                        setQuestionBankTarget(`extension-${ext.id}`)
                                                        setQuestionBankOpen(true)
                                                      }}
                                                    >
                                                      Import
                                                    </Button>
                                                    <Button
                                                      variant="ghost"
                                                      size="icon"
                                                      className="h-5 w-5 opacity-0 group-hover/extension:opacity-100"
                                                      onClick={(e: any) => {
                                                        e.stopPropagation()
                                                        if (!confirm(`Delete "${ext.name}"?`)) return
                                                        setTaskExtensionPciMessages(prev => {
                                                          const next = { ...prev }
                                                          delete next[ext.id]
                                                          return next
                                                        })
                                                        setTaskExtensionPciInputs(prev => {
                                                          const next = { ...prev }
                                                          delete next[ext.id]
                                                          return next
                                                        })
                                                        setTaskBuilder(prev => ({
                                                          ...prev,
                                                          extensions: prev.extensions.filter(e => e.id !== ext.id),
                                                          activeExtensionId: prev.activeExtensionId === ext.id ? null : prev.activeExtensionId
                                                        }))
                                                        if (loadedTaskId) {
                                                          setModules(prev => prev.map(mod => ({
                                                            ...mod,
                                                            lessons: mod.lessons.map(lesson => ({
                                                              ...lesson,
                                                              tasks: lesson.tasks.map(t =>
                                                                t.id === loadedTaskId
                                                                  ? { ...t, extensions: (t.extensions || []).filter(e => e.id !== ext.id) }
                                                                  : t
                                                              )
                                                            }))
                                                          })))
                                                        }
                                                      }}
                                                    >
                                                      <Trash2 className="h-3 w-3 text-red-500" />
                                                    </Button>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                        </div>
                                      ))}
                                    </SortableContext>
                                  )}

                                  {/* Assessments */}
                                  <TreeItem depth={2} isLast={false}>
                                    <div className="flex items-center gap-1.5">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5"
                                        onClick={() => toggleSection(module.id, 'assessment')}
                                        aria-label={isSectionCollapsed(module.id, 'assessment') ? 'Expand assessments' : 'Collapse assessments'}
                                      >
                                        {isSectionCollapsed(module.id, 'assessment') ? (
                                          <ChevronRight className="h-3 w-3 text-purple-600" />
                                        ) : (
                                          <ChevronDown className="h-3 w-3 text-purple-600" />
                                        )}
                                      </Button>
                                    </div>
                                  </TreeItem>
                                  {!isSectionCollapsed(module.id, 'assessment') && (
                                    <SortableContext
                                      items={assessments.map(h => h.id)}
                                      strategy={verticalListSortingStrategy}
                                    >
                                      {assessments.map((hw, idx) => (
                                        <SortableTreeItem key={hw.id} id={hw.id} depth={2} isLast={idx === assessments.length - 1}>
                                          <div
                                            className={cn(
                                              "flex items-center gap-1.5 py-1 px-2 rounded border group/item cursor-pointer transition-colors",
                                              selectedItem?.type === 'homework' && selectedItem?.id === hw.id
                                                ? "bg-purple-200 border-purple-400 ring-1 ring-purple-400"
                                                : "bg-purple-50 border-purple-200 hover:bg-purple-100"
                                            )}
                                            onClick={() => {
                                              // Auto-save current task if switching from one
                                              if (loadedTaskId) {
                                                setModules(prev => prev.map(mod => ({
                                                  ...mod,
                                                  lessons: mod.lessons.map(lesson => ({
                                                    ...lesson,
                                                    tasks: lesson.tasks.map(t =>
                                                      t.id === loadedTaskId
                                                        ? {
                                                          ...t,
                                                          title: taskBuilder.title,
                                                          shortDescription: taskBuilder.details,
                                                          description: taskBuilder.taskContent,
                                                          instructions: taskBuilder.taskPci,
                                                          extensions: taskBuilder.extensions,
                                                          sourceDocument: undefined
                                                        }
                                                        : t
                                                    )
                                                  }))
                                                })))
                                              }
                                              // Auto-save current assessment if switching from another assessment
                                              if (loadedAssessmentId && loadedAssessmentId !== hw.id) {
                                                setModules(prev => prev.map(mod => ({
                                                  ...mod,
                                                  lessons: mod.lessons.map(lesson => ({
                                                    ...lesson,
                                                    homework: lesson.homework.map(h =>
                                                      h.id === loadedAssessmentId
                                                        ? {
                                                          ...h,
                                                          title: assessmentBuilder.title,
                                                          description: assessmentBuilder.taskContent,
                                                          instructions: assessmentBuilder.taskPci,
                                                          sourceDocument: undefined
                                                        }
                                                        : h
                                                    )
                                                  }))
                                                })))
                                              }
                                              setSelectedItem({ type: 'homework', id: hw.id })
                                              loadAssessmentIntoBuilder(hw)
                                              setMainBuilderTab('assessment')
                                            }}
                                          >
                                            <FileQuestion className="h-3 w-3 text-purple-500" />
                                            <span className="text-[10px] flex-1 truncate">
                                              <span className="font-semibold text-purple-700">{idx + 1}.</span> {hw.title}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">{hw.points}pts</span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                              onClick={(e: any) => {
                                                e.stopPropagation()
                                                setQuestionBankTarget(`assessment-${hw.id}`)
                                                setImportTarget(null)
                                                setQuestionBankOpen(true)
                                              }}
                                            >
                                              Import
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                              onClick={(e: any) => {
                                                e.stopPropagation()
                                                setEditingData(hw)
                                                setActiveModal({ type: 'homework', isOpen: true, moduleId: module.id, lessonId: primaryLesson.id, itemId: hw.id })
                                              }}
                                            >
                                              Edit
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-5 w-5 opacity-0 group-hover/item:opacity-100"
                                              onClick={(e: any) => {
                                                e.stopPropagation()
                                                if (!confirm(`Delete "${hw.title}"?`)) return
                                                deleteAssessment(module.id, primaryLesson.id, hw.id)
                                              }}
                                            >
                                              <Trash2 className="h-3 w-3 text-red-500" />
                                            </Button>
                                          </div>
                                        </SortableTreeItem>
                                      ))}
                                    </SortableContext>
                                  )}

                                  {/* Homework Folder */}
                                  <TreeItem depth={2} isLast={false}>
                                    <div className="flex items-center gap-1.5">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5"
                                        onClick={() => toggleSection(module.id, 'homework')}
                                        aria-label={isSectionCollapsed(module.id, 'homework') ? 'Expand homework' : 'Collapse homework'}
                                      >
                                        {isSectionCollapsed(module.id, 'homework') ? (
                                          <ChevronRight className="h-3 w-3 text-emerald-600" />
                                        ) : (
                                          <ChevronDown className="h-3 w-3 text-emerald-600" />
                                        )}
                                      </Button>
                                      <span className="text-xs font-medium text-emerald-700">Homework</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-5 text-[10px] gap-1 opacity-0 group-hover:opacity-100 px-1 text-emerald-600"
                                        onClick={(e: any) => {
                                          e.stopPropagation()
                                          addHomework(module.id, primaryLesson.id)
                                        }}
                                      >
                                        <Plus className="h-3 w-3" />
                                        Add
                                      </Button>
                                    </div>
                                  </TreeItem>
                                  {!isSectionCollapsed(module.id, 'homework') && homeworkItems.length > 0 && (
                                    <SortableContext
                                      items={homeworkItems.map(h => h.id)}
                                      strategy={verticalListSortingStrategy}
                                    >
                                      {homeworkItems.map((hw, idx) => (
                                        <SortableTreeItem key={hw.id} id={hw.id} depth={2} isLast={idx === homeworkItems.length - 1}>
                                          <div
                                            className={cn(
                                              "flex items-center gap-1.5 py-1 px-2 rounded border group/item cursor-pointer transition-colors",
                                              selectedItem?.type === 'homework' && selectedItem?.id === hw.id
                                                ? "bg-emerald-200 border-emerald-400 ring-1 ring-emerald-400"
                                                : "bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                                            )}
                                            onClick={() => {
                                              // Auto-save current task if switching from one
                                              if (loadedTaskId) {
                                                setModules(prev => prev.map(mod => ({
                                                  ...mod,
                                                  lessons: mod.lessons.map(lesson => ({
                                                    ...lesson,
                                                    tasks: lesson.tasks.map(t =>
                                                      t.id === loadedTaskId
                                                        ? {
                                                          ...t,
                                                          title: taskBuilder.title,
                                                          shortDescription: taskBuilder.details,
                                                          description: taskBuilder.taskContent,
                                                          instructions: taskBuilder.taskPci,
                                                          extensions: taskBuilder.extensions,
                                                          sourceDocument: undefined
                                                        }
                                                        : t
                                                    )
                                                  }))
                                                })))
                                              }
                                              // Auto-save current assessment/homework if switching from another
                                              if (loadedAssessmentId && loadedAssessmentId !== hw.id) {
                                                setModules(prev => prev.map(mod => ({
                                                  ...mod,
                                                  lessons: mod.lessons.map(lesson => ({
                                                    ...lesson,
                                                    homework: lesson.homework.map(h =>
                                                      h.id === loadedAssessmentId
                                                        ? {
                                                          ...h,
                                                          title: assessmentBuilder.title,
                                                          description: assessmentBuilder.taskContent,
                                                          instructions: assessmentBuilder.taskPci,
                                                          sourceDocument: undefined
                                                        }
                                                        : h
                                                    )
                                                  }))
                                                })))
                                              }
                                              setSelectedItem({ type: 'homework', id: hw.id })
                                              loadAssessmentIntoBuilder(hw)
                                              setMainBuilderTab('assessment')
                                            }}
                                          >
                                            <Home className="h-3 w-3 text-emerald-500" />
                                            <span className="text-[10px] flex-1 truncate">
                                              <span className="font-semibold text-emerald-700">{idx + 1}.</span> {hw.title}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">{hw.points}pts</span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                              onClick={(e: any) => {
                                                e.stopPropagation()
                                                setQuestionBankTarget(`homework-${hw.id}`)
                                                setImportTarget(null)
                                                setQuestionBankOpen(true)
                                              }}
                                            >
                                              Import
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                              onClick={(e: any) => {
                                                e.stopPropagation()
                                                setEditingData(hw)
                                                setActiveModal({ type: 'homework', isOpen: true, moduleId: module.id, lessonId: primaryLesson.id, itemId: hw.id })
                                              }}
                                            >
                                              Edit
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-5 w-5 opacity-0 group-hover/item:opacity-100"
                                              onClick={(e: any) => {
                                                e.stopPropagation()
                                                if (!confirm(`Delete "${hw.title}"?`)) return
                                                deleteAssessment(module.id, primaryLesson.id, hw.id)
                                              }}
                                            >
                                              <Trash2 className="h-3 w-3 text-red-500" />
                                            </Button>
                                          </div>
                                        </SortableTreeItem>
                                      ))}
                                    </SortableContext>
                                  )}

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
                                          onClick={(e: any) => {
                                            e.stopPropagation()
                                            setEditingData(quiz)
                                            setActiveModal({ type: 'moduleQuiz', isOpen: true, moduleId: module.id, itemId: quiz.id })
                                          }}
                                        >
                                          Edit
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5 opacity-0 group-hover:opacity-100"
                                          onClick={(e: any) => {
                                            e.stopPropagation()
                                            deleteModuleQuiz(module.id, quiz.id)
                                          }}
                                        >
                                          <Trash2 className="h-3 w-3 text-red-500" />
                                        </Button>
                                      </div>
                                    </TreeItem>
                                  ))}
                                </div>
                              )}
                            </div>
                          </SortableTreeItem>
                        )
                      })}
                    </SortableContext>

                    {modules.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Layers className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No lessons yet. Click "Lesson" to add one.</p>
                      </div>
                    )}
                  </div>
                </DndContext>
              </ScrollArea>
              {/* Assets Folder added to the bottom of the left panel */}
              <div className="mt-4 pt-4 border-t">
                {renderAssetsFolder()}
              </div>
            </CardContent>
          </Card>
        </div>
        )}

        {/* CENTER PANEL - New Three-Section Design */}
        <div className={cn("flex flex-col min-h-0", leftPanelHidden ? "col-span-12" : "col-span-8")}>
          <div className="flex-1 flex flex-col space-y-4 overflow-auto">
            {leftPanelHidden && (
              <div className="flex justify-start">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setLeftPanelHidden(false)}
                >
                  <LayoutTemplate className="h-4 w-4" />
                  Show Course Panel
                </Button>
              </div>
            )}

            {/* COMBINED BUILDER: Task & Assessment Tabs with Shared Test PCI */}
            <Card className="flex-shrink-0 border rounded-2xl overflow-hidden">
              <CardContent className="pt-4">
                <Tabs value={mainBuilderTab} onValueChange={(v) => setMainBuilderTab(v as 'task' | 'assessment')} className="w-full">
                  {/* Main Builder Tabs */}
                  <TabsList className="grid w-full grid-cols-2 gap-1 mb-4 p-1 rounded-xl border bg-gray-50">
                    <TabsTrigger value="task" className="gap-2 border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900">
                      <ListTodo className="h-4 w-4 text-orange-500" />
                      Task Builder
                    </TabsTrigger>
                    <TabsTrigger value="assessment" className="gap-2 border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900">
                      <FileQuestion className="h-4 w-4 text-purple-500" />
                      Assessment Builder
                    </TabsTrigger>
                  </TabsList>

                  {/* Task Builder Tab */}
                  <TabsContent value="task" className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder={loadedTaskId ? "Task Title" : "Select a task from the left sidebar to edit"}
                            className="font-semibold"
                            value={taskBuilder.activeExtensionId ? taskHeaderTitle : taskBuilder.title}
                            onChange={(e: any) => setTaskBuilder(prev => ({ ...prev, title: e.target.value }))}
                            disabled={!loadedTaskId || !!taskBuilder.activeExtensionId}
                          />
                          <Input
                            placeholder={loadedTaskId ? (taskBuilder.activeExtensionId ? "Extension Description" : "Description") : "Select a task to edit description"}
                            value={taskBuilder.activeExtensionId ? (activeTaskExtension?.description || '') : taskBuilder.details}
                            onChange={(e: any) => {
                              const value = e.target.value
                              if (taskBuilder.activeExtensionId) {
                                setTaskBuilder(prev => ({
                                  ...prev,
                                  extensions: prev.extensions.map(ext =>
                                    ext.id === prev.activeExtensionId ? { ...ext, description: value } : ext
                                  )
                                }))
                              } else {
                                setTaskBuilder(prev => ({ ...prev, details: value }))
                              }
                            }}
                            disabled={!loadedTaskId}
                          />
                        </div>
                        {loadedTaskId && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Editing: {taskHeaderTitle}: {taskHeaderDescription}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {/* Main content with tabs */}
                      <div className="flex-1">
                        <Tabs
                          value={taskBuilderActiveTab}
                          onValueChange={(v) => {
                            setTaskBuilderActiveTab(v as 'content' | 'pci')
                          }}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-2 gap-1 p-1 rounded-xl border bg-gray-50">
                            <TabsTrigger value="content" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900">Slide</TabsTrigger>
                            <TabsTrigger value="pci" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900">PCI</TabsTrigger>
                          </TabsList>
                          <TabsContent value="content" className="mt-2 space-y-2">
                            <AutoTextarea
                              placeholder={taskBuilder.activeExtensionId ? "Extension content..." : "Enter task content or drop files here..."}
                              className="w-full min-h-[100px]"
                              onDrop={(e: any) => handleDragFiles(e, (text) => {
                                setTaskBuilder(prev => {
                                  if (prev.activeExtensionId) {
                                    const ext = prev.extensions.find(x => x.id === prev.activeExtensionId)
                                    const combined = ext ? ext.content + (ext.content ? '\n\n' : '') + text : text
                                    return {
                                      ...prev,
                                      extensions: prev.extensions.map(x =>
                                        x.id === prev.activeExtensionId
                                          ? { ...x, content: combined }
                                          : x
                                      )
                                    }
                                  } else {
                                    const combined = prev.taskContent + (prev.taskContent ? '\n\n' : '') + text
                                    return {
                                      ...prev,
                                      taskContent: combined
                                    }
                                  }
                                })
                              })}
                              // Show task content if no extension active, otherwise show active extension's content
                              value={taskBuilder.activeExtensionId
                                ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.content || ''
                                : taskBuilder.taskContent
                              }
                              onChange={(e: any) => {
                                const newContent = e.target.value
                                // Auto-create task if none loaded
                                if (!loadedTaskId && !taskBuilder.activeExtensionId) {
                                  autoCreateTask()
                                }
                                if (taskBuilder.activeExtensionId) {
                                  // Update extension content
                                  setTaskBuilder(prev => {
                                    return {
                                      ...prev,
                                      extensions: prev.extensions.map(ext =>
                                        ext.id === prev.activeExtensionId
                                          ? { ...ext, content: newContent }
                                          : ext
                                      )
                                    }
                                  })
                                } else {
                                  // Update task content
                                  setTaskBuilder(prev => ({
                                    ...prev,
                                    taskContent: newContent
                                  }))
                                }
                              }}
                            />
                            {/* Uploaded Files List - only show for task (not extensions) */}
                            {/* Upload button - only for task (not extensions) */}
                            {/* Assets Folder added to Slide Tab removed from here */}
                          </TabsContent>
                          <TabsContent value="pci" className="mt-2">
                            <div className="rounded-lg border bg-white">
                              <div className="max-h-[260px] overflow-y-auto p-3 space-y-3">
                                {activeTaskPciMessages.length === 0 && (
                                  <p className="text-xs text-muted-foreground">Start a PCI chat to build instructions with the assistant.</p>
                                )}
                                {activeTaskPciMessages.map((msg, idx) => (
                                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${msg.role === 'user'
                                      ? 'bg-blue-50 text-gray-900'
                                      : 'bg-gray-100 text-gray-800'
                                      }`}>
                                      <div className="whitespace-pre-wrap">{msg.content}</div>
                                    </div>
                                  </div>
                                ))}
                                {taskPciLoading && (
                                  <div className="flex justify-start">
                                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      <span className="text-xs text-gray-600">Thinking...</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="border-t p-2">
                                {taskPciErrorHint && (
                                  <div className="mb-2 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700">
                                    PCI assistant error: {taskPciErrorHint}
                                  </div>
                                )}
                                <div className="flex gap-2 items-end">
                                  <AutoTextarea
                                    placeholder="Ask the PCI assistant..."
                                    className="w-full min-h-[44px]"
                                    value={activeTaskPciInput}
                                    onChange={(e: any) => {
                                      const value = e.target.value
                                      if (taskBuilder.activeExtensionId) {
                                        setTaskExtensionPciInputs(prev => ({
                                          ...prev,
                                          [taskBuilder.activeExtensionId as string]: value,
                                        }))
                                      } else {
                                        setTaskPciInput(value)
                                      }
                                    }}
                                    onKeyDown={(e: any) => {
                                      if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handlePciSend('task')
                                      }
                                    }}
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9"
                                    disabled={taskPciLoading || !activeTaskPciInput.trim()}
                                    onClick={() => handlePciSend('task')}
                                  >
                                    {taskPciLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                        {/* Buttons row with Test and Save */}
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Prefill Test PCI with content from Task Builder
                              const content = taskBuilder.activeExtensionId
                                ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.content || taskBuilder.taskContent
                                : taskBuilder.taskContent

                              setTestPciScores({})
                              setTestPciInput('')

                              setTestPciContent({
                                classroom: content,
                                student1: content,
                                student2: content
                              })
                              setTestPciSource('task')
                              toast.success('Test PCI prefilled with task content')
                            }}
                          >
                            Test
                          </Button>
                        </div>
                      </div>
                      {/* Right panel: Extensions - resizable */}
                      <ResizablePanel
                        defaultWidth={192}
                        minWidth={150}
                        maxWidth={600}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mb-2"
                          disabled={!loadedTaskId}
                          onClick={() => {
                            if (!loadedTaskId) return
                            const extNumber = taskBuilder.extensions.length + 1
                              const newExtension = {
                                id: `ext-${Date.now()}`,
                                name: `Extension ${extNumber}`,
                                description: '',
                                content: '',
                                pci: ''
                              }
                              setTaskExtensionPciMessages(prev => ({ ...prev, [newExtension.id]: [] }))
                              setTaskExtensionPciInputs(prev => ({ ...prev, [newExtension.id]: '' }))
                            setTaskBuilder(prev => ({
                              ...prev,
                              extensions: [...prev.extensions, newExtension],
                              activeExtensionId: newExtension.id
                            }))
                            setModules(prev => prev.map(mod => ({
                              ...mod,
                              lessons: mod.lessons.map(lesson => ({
                                ...lesson,
                                tasks: lesson.tasks.map(t =>
                                  t.id === loadedTaskId
                                    ? { ...t, extensions: [...(t.extensions || []), newExtension] }
                                    : t
                                )
                              }))
                            })))
                          }}
                        >
                          Extensions
                        </Button>
                        <div className="mb-2">
                          <p className="text-xs text-muted-foreground truncate">{taskBuilder.title || 'Task'}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg min-h-[100px] space-y-2">
                          {taskBuilder.extensions.length === 0 ? (
                            <p className="text-xs text-muted-foreground">No extensions added</p>
                          ) : (
                            taskBuilder.extensions.map((ext) => (
                              <div key={ext.id} className="flex items-center gap-1 group">
                                <Button
                                  variant={taskBuilder.activeExtensionId === ext.id ? "default" : "ghost"}
                                  size="sm"
                                  className="flex-1 justify-start text-xs"
                                  onClick={() => {
                                    if (taskBuilder.activeExtensionId === ext.id) {
                                      setTaskBuilder(prev => ({ ...prev, activeExtensionId: null }))
                                    } else {
                                      setTaskBuilder(prev => ({ ...prev, activeExtensionId: ext.id }))
                                    }
                                  }}
                                >
                                  <FileText className="h-3 w-3 mr-1" />
                                  {ext.name}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                                  onClick={(e: any) => {
                                    e.stopPropagation()
                                    if (confirm(`Delete "${ext.name}"?`)) {
                                      setTaskBuilder(prev => ({
                                        ...prev,
                                        extensions: prev.extensions.filter(e => e.id !== ext.id),
                                        activeExtensionId: prev.activeExtensionId === ext.id ? null : prev.activeExtensionId
                                      }))
                                    }
                                  }}
                                >
                                  <Trash2 className="h-3 w-3 text-red-500" />
                                </Button>
                              </div>
                            ))
                          )}
                        </div>
                      </ResizablePanel>
                    </div>
                  </TabsContent>

                  {/* Assessment Builder Tab */}
                  <TabsContent value="assessment" className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Input
                          placeholder={loadedAssessmentId ? "Assessment Title" : "Select an assessment from the left sidebar to edit"}
                          className="font-semibold"
                          value={assessmentBuilder.title}
                          onChange={(e: any) => setAssessmentBuilder(prev => ({ ...prev, title: e.target.value }))}
                          disabled={!loadedAssessmentId}
                        />
                        {loadedAssessmentId && (
                          <p className="text-xs text-muted-foreground mt-1">Editing: {assessmentBuilder.title || 'Untitled Assessment'}</p>
                        )}
                      </div>

                    </div>
                    <div className="flex gap-4">
                      {/* Main content with tabs */}
                      <div className="flex-1">
                        <Tabs
                          value={assessmentBuilderActiveTab}
                          onValueChange={(v) => {
                            setAssessmentBuilderActiveTab(v as 'content' | 'pci')
                          }}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-2 gap-1 p-1 rounded-xl border bg-gray-50">
                            <TabsTrigger value="content" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900">Slide</TabsTrigger>
                            <TabsTrigger value="pci" className="border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900">PCI</TabsTrigger>
                          </TabsList>
                          <TabsContent value="content" className="mt-2 space-y-2">
                            <AutoTextarea
                              placeholder="Enter assessment content or drop files here..."
                              className="w-full min-h-[100px]"
                              onDrop={(e: any) => handleDragFiles(e, (text) => {
                                setAssessmentBuilder(prev => {
                                  const combined = prev.taskContent + (prev.taskContent ? '\n\n' : '') + text
                                  return {
                                    ...prev,
                                    taskContent: combined
                                  }
                                })
                              })}
                              value={assessmentBuilder.taskContent}
                              onChange={(e: any) => {
                                const newContent = e.target.value
                                // Auto-create assessment if none loaded
                                if (!loadedAssessmentId) {
                                  autoCreateAssessment()
                                }
                                setAssessmentBuilder(prev => ({
                                  ...prev,
                                  taskContent: newContent
                                }))
                              }}
                            />
                            {/* Uploaded Files List - only for assessment (not extensions) */}
                            {/* Upload button - only for assessment (not extensions) */}
                            {/* Assets Folder added to Slide Tab removed from here */}
                          </TabsContent>
                          <TabsContent value="pci" className="mt-2">
                            <div className="rounded-lg border bg-white">
                              <div className="max-h-[260px] overflow-y-auto p-3 space-y-3">
                                {assessmentPciMessages.length === 0 && (
                                  <p className="text-xs text-muted-foreground">Start a PCI chat to build instructions with the assistant.</p>
                                )}
                                {assessmentPciMessages.map((msg, idx) => (
                                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${msg.role === 'user'
                                      ? 'bg-blue-50 text-gray-900'
                                      : 'bg-gray-100 text-gray-800'
                                      }`}>
                                      <div className="whitespace-pre-wrap">{msg.content}</div>
                                    </div>
                                  </div>
                                ))}
                                {assessmentPciLoading && (
                                  <div className="flex justify-start">
                                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      <span className="text-xs text-gray-600">Thinking...</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="border-t p-2">
                                {assessmentPciErrorHint && (
                                  <div className="mb-2 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700">
                                    PCI assistant error: {assessmentPciErrorHint}
                                  </div>
                                )}
                                <div className="flex gap-2 items-end">
                                  <AutoTextarea
                                    placeholder="Ask the PCI assistant..."
                                    className="w-full min-h-[44px]"
                                    value={assessmentPciInput}
                                    onChange={(e: any) => setAssessmentPciInput(e.target.value)}
                                    onKeyDown={(e: any) => {
                                      if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handlePciSend('assessment')
                                      }
                                    }}
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9"
                                    disabled={assessmentPciLoading || !assessmentPciInput.trim()}
                                    onClick={() => handlePciSend('assessment')}
                                  >
                                    {assessmentPciLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                        {/* Buttons row with Test and Save */}
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Prefill Test PCI with content from Assessment Builder
                              const content = assessmentBuilder.taskContent

                              setTestPciScores({})
                              setTestPciInput('')

                              setTestPciContent({
                                classroom: content,
                                student1: content,
                                student2: content
                              })
                              setTestPciSource('assessment')
                              toast.success('Test PCI prefilled with assessment content')
                            }}
                          >
                            Test
                          </Button>
                        </div>
                      </div>
                      {/* Right panel: DMI - resizable */}
                      <ResizablePanel
                        defaultWidth={192}
                        minWidth={150}
                        maxWidth={600}
                      >
                        <div className="mb-2">
                          <Button variant="outline" size="sm" className="w-full" onClick={() => handleGenerateDMI('assessment')}>
                            <Sparkles className="h-3 w-3 mr-2" />
                            Generate DMI
                          </Button>
                        </div>
                        <DMIPanel
                          items={assessmentDmiItems}
                          onItemsChange={setAssessmentDmiItems}
                        />
                      </ResizablePanel>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Test PCI Section - Persistent below the tabs */}
                <div className="mt-6 pt-6 border-t px-2">
                  <CardTitle className="text-base font-semibold mb-3">Test PCI</CardTitle>
                  <div className="flex gap-4">
                    {/* Main content with tabs */}
                    <div className="flex-1">
                      <Tabs value={testPciActiveTab} onValueChange={setTestPciActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 gap-1 p-1 rounded-xl border bg-gray-50">
                          {testPciTabs.map((tab) => (
                            <div key={tab.id} className="relative flex-1">
                              {editingTabId === tab.id ? (
                                <Input
                                  value={tab.label}
                                  onChange={(e: any) => {
                                    setTestPciTabs(prev => prev.map(t =>
                                      t.id === tab.id ? { ...t, label: e.target.value } : t
                                    ))
                                  }}
                                  onBlur={() => setEditingTabId(null)}
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') setEditingTabId(null)
                                  }}
                                  className="h-8 text-xs font-medium text-center"
                                  autoFocus
                                />
                              ) : (
                                <TabsTrigger
                                  value={tab.id}
                                  className="w-full border border-gray-200 rounded-lg bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                                  onDoubleClick={() => setEditingTabId(tab.id)}
                                >
                                  {tab.label}
                                </TabsTrigger>
                              )}
                            </div>
                          ))}
                        </TabsList>
                        {testPciTabs.map((tab) => (
                          <TabsContent key={tab.id} value={tab.id} className="mt-2">
                            <div className="p-4 bg-gray-50 rounded-lg min-h-[80px] max-h-[200px] overflow-y-auto">
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{testPciContent[tab.id] || `${tab.label} view content`}</p>
                              {/* Show AI scores if any */}
                              {testPciScores[tab.id]?.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <p className="text-xs font-medium text-gray-600 mb-2">AI Feedback:</p>
                                  {testPciScores[tab.id].map((score, idx) => (
                                    <div key={idx} className="mb-2 p-2 bg-white rounded border border-gray-200">
                                      <div className="flex items-center gap-2">
                                        <Badge variant={score.score >= 80 ? "default" : score.score >= 50 ? "secondary" : "destructive"} className="text-[10px]">
                                          {score.score}%
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-gray-600 mt-1">{score.feedback}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                      {/* Persistent text input with Enter button inline */}
                      <div className="mt-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder={testPciActiveTab === 'classroom' ? "Enter answer (goes to both students)..." : "Enter answer..."}
                            className="flex-1"
                            value={testPciInput}
                            onChange={(e: any) => setTestPciInput(e.target.value)}
                            onKeyDown={(e: any) => {
                              if (e.key === 'Enter' && testPciInput.trim() && !testPciLoading) {
                                e.preventDefault()
                                handleTestPciSubmit()
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={testPciLoading || !testPciInput.trim()}
                            onClick={handleTestPciSubmit}
                          >
                            {testPciLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CornerDownLeft className="h-4 w-4 mr-1" />}
                            Enter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Modals */}
        <ModuleBuilderModal
          isOpen={activeModal.type === 'module' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'module', isOpen: false })}
          onSave={handleSaveModule}
          initialData={editingData}
        />


        <HomeworkBuilderModal
          isOpen={activeModal.type === 'homework' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'homework', isOpen: false })}
          onSave={handleSaveAssessment}
          initialData={editingData}
          modules={modules}
        />

        <WorksheetBuilderModal
          isOpen={activeModal.type === 'worksheet' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'worksheet', isOpen: false })}
          onSave={handleSaveWorksheet}
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

        {/* Lesson Selection Dialog for Preview Pane Save */}
        <LessonSelectorDialog
          isOpen={lessonSelectDialog.isOpen}
          onClose={() => setLessonSelectDialog({ isOpen: false, type: null, title: '' })}
          onConfirm={(moduleId, lessonId) => {
            const title = lessonSelectDialog.title
            if (lessonSelectDialog.type === 'task') {
              const newTask = DEFAULT_TASK(0)
              newTask.title = title
              handleSaveTask(newTask, moduleId, lessonId)
            } else if (lessonSelectDialog.type === 'assessment') {
              const newAssessment = DEFAULT_HOMEWORK(0, 'assessment')
              newAssessment.title = title
              handleSaveAssessment(newAssessment, moduleId, lessonId)
            }
            setLessonSelectDialog({ isOpen: false, type: null, title: '' })
          }}
          modules={modules}
          itemType={lessonSelectDialog.type || 'item'}
        />

        {/* AI Assist Agent Modal */}
        <AIAssistAgent
          isOpen={aiAssistOpen}
          onClose={() => setAiAssistOpen(false)}
          context={aiAssistContext}
          content={aiAssistContext === 'task'
            ? (taskBuilder.activeExtensionId
              ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.content || ''
              : taskBuilder.taskContent)
            : assessmentBuilder.taskContent
          }
          pci={aiAssistContext === 'task'
            ? (taskBuilder.activeExtensionId
              ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.pci || ''
              : taskBuilder.taskPci)
            : assessmentBuilder.taskPci
          }
          title={aiAssistContext === 'task' ? taskBuilder.title : assessmentBuilder.title}
          messages={aiAssistContext === 'task' ? taskAiMessages : assessmentAiMessages}
          setMessages={aiAssistContext === 'task' ? setTaskAiMessages : setAssessmentAiMessages}
          onApplyContent={(content) => {
            if (aiAssistContext === 'task') {
              if (taskBuilder.activeExtensionId) {
                // Apply to active extension
                setTaskBuilder(prev => ({
                  ...prev,
                  extensions: prev.extensions.map(ext =>
                    ext.id === prev.activeExtensionId ? { ...ext, content } : ext
                  )
                }))
              } else {
                // Apply to task
                setTaskBuilder(prev => ({ ...prev, taskContent: content }))
              }
            } else {
              setAssessmentBuilder(prev => ({ ...prev, taskContent: content }))
            }
          }}
          onApplyPci={(pci) => {
            if (aiAssistContext === 'task') {
              if (taskBuilder.activeExtensionId) {
                setTaskBuilder(prev => ({
                  ...prev,
                  extensions: prev.extensions.map(ext =>
                    ext.id === prev.activeExtensionId ? { ...ext, pci } : ext
                  )
                }))
              } else {
                setTaskBuilder(prev => ({ ...prev, taskPci: pci }))
              }
            } else {
              setAssessmentBuilder(prev => ({ ...prev, taskPci: pci }))
            }
          }}
        />

        {/* Question Bank Modal */}
        <QuestionBankModal
          isOpen={questionBankOpen}
          onClose={() => {
            setQuestionBankOpen(false)
            setImportTarget(null)
          }}
          onImport={(items) => {
            const joinedQuestions = items.map(i => i.questionText).join('\n\n')
            const joinedPci = items.map(i => i.pciText).join('\n\n')

            if (importTarget) {
              setImportTypeModalData({ target: importTarget, items })
              setQuestionBankOpen(false)
              setImportTarget(null)
            } else if (questionBankTarget) {
              const [targetType, targetId] = questionBankTarget.split('-')

              setModules(prev => prev.map(mod => ({
                ...mod,
                lessons: mod.lessons.map(lesson => ({
                  ...lesson,
                  tasks: lesson.tasks.map(t => {
                    if (targetType === 'task' && t.id === targetId) {
                      return {
                        ...t,
                        description: (t.description || '') + ((t.description) ? '\n\n' : '') + joinedQuestions,
                        instructions: (t.instructions || '') + ((t.instructions) ? '\n\n' : '') + joinedPci
                      }
                    }
                    return t
                  }),
                  homework: lesson.homework.map(h => {
                    if ((targetType === 'assessment' || targetType === 'homework') && h.id === targetId) {
                      return {
                        ...h,
                        description: (h.description || '') + ((h.description) ? '\n\n' : '') + joinedQuestions,
                        instructions: (h.instructions || '') + ((h.instructions) ? '\n\n' : '') + joinedPci
                      }
                    }
                    return h
                  })
                }))
              })))

              // ALSO update task/assessmentBuilder if it's currently loaded
              if (targetType === 'task' && loadedTaskId === targetId) {
                setTaskBuilder(prev => ({
                  ...prev,
                  taskContent: prev.taskContent + (prev.taskContent ? '\n\n' : '') + joinedQuestions,
                  taskPci: prev.taskPci + (prev.taskPci ? '\n\n' : '') + joinedPci
                }))
              } else if (targetType === 'extension') {
                setTaskBuilder(prev => ({
                  ...prev,
                  extensions: prev.extensions.map(ext =>
                    ext.id === targetId
                      ? {
                        ...ext,
                        content: (ext.content || '') + (ext.content ? '\n\n' : '') + joinedQuestions,
                        pci: (ext.pci || '') + (ext.pci ? '\n\n' : '') + joinedPci
                      }
                      : ext
                  )
                }))
              } else if ((targetType === 'assessment' || targetType === 'homework') && loadedAssessmentId === targetId) {
                setAssessmentBuilder(prev => ({
                  ...prev,
                  taskContent: prev.taskContent + (prev.taskContent ? '\n\n' : '') + joinedQuestions,
                  taskPci: prev.taskPci + (prev.taskPci ? '\n\n' : '') + joinedPci
                }))
              }

              toast.success('Questions imported from Assessment Bank')
            }
          }}
        />

        {/* Import Type Selector Modal */}
        <Dialog open={!!importTypeModalData} onOpenChange={(open) => !open && setImportTypeModalData(null)}>
          <DialogContent className="sm:max-w-md border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
            <DialogHeader>
              <DialogTitle>Import as...</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-4">
              <Button variant="outline" className="justify-start gap-2" onClick={() => {
                if (!importTypeModalData) return
                const { target, items } = importTypeModalData
                const joinedQuestions = items.map(i => i.questionText).join('\n\n')
                const joinedPci = items.map(i => i.pciText).join('\n\n')

                setModules(prev => prev.map(mod => {
                  if (mod.id !== target.moduleId) return mod
                  return {
                    ...mod,
                    lessons: mod.lessons.map(lesson => {
                      if (lesson.id !== target.lessonId) return lesson
                      const newTask = DEFAULT_LESSON(0).tasks[0]
                      return {
                        ...lesson,
                        tasks: [...lesson.tasks, { ...newTask, id: `task-${Date.now()}`, title: 'Imported Task', description: joinedQuestions, instructions: joinedPci }]
                      }
                    })
                  }
                }))
                toast.success('Items imported as Task')
                setImportTypeModalData(null)
              }}>
                <ListTodo className="h-4 w-4 text-orange-500" />
                Task
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => {
                if (!importTypeModalData) return
                const { target, items } = importTypeModalData
                const joinedQuestions = items.map(i => i.questionText).join('\n\n')
                const joinedPci = items.map(i => i.pciText).join('\n\n')

                setModules(prev => prev.map(mod => {
                  if (mod.id !== target.moduleId) return mod
                  return {
                    ...mod,
                    lessons: mod.lessons.map(lesson => {
                      if (lesson.id !== target.lessonId) return lesson
                      const newAssessment = DEFAULT_HOMEWORK(0, 'assessment')
                      return {
                        ...lesson,
                        homework: [...lesson.homework, { ...newAssessment, id: `hw-${Date.now()}`, title: 'Imported Assessment', description: joinedQuestions, instructions: joinedPci }]
                      }
                    })
                  }
                }))
                toast.success('Items imported as Assessment')
                setImportTypeModalData(null)
              }}>
                <FileQuestion className="h-4 w-4 text-purple-500" />
                Assessment
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => {
                if (!importTypeModalData) return
                const { target, items } = importTypeModalData
                const joinedQuestions = items.map(i => i.questionText).join('\n\n')
                const joinedPci = items.map(i => i.pciText).join('\n\n')

                setModules(prev => prev.map(mod => {
                  if (mod.id !== target.moduleId) return mod
                  return {
                    ...mod,
                    lessons: mod.lessons.map(lesson => {
                      if (lesson.id !== target.lessonId) return lesson
                      const newHomework = DEFAULT_HOMEWORK(0, 'homework')
                      return {
                        ...lesson,
                        homework: [...lesson.homework, { ...newHomework, id: `hw-${Date.now()}`, title: 'Imported Homework', description: joinedQuestions, instructions: joinedPci }]
                      }
                    })
                  }
                }))
                toast.success('Items imported as Homework')
                setImportTypeModalData(null)
              }}>
                <Home className="h-4 w-4 text-emerald-500" />
                Homework
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
})
