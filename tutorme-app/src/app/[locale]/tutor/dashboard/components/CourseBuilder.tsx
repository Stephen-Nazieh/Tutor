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
  sourceDocument?: ImportedLearningResource
}

export interface Assessment extends WithDifficultyVariants {
  id: string
  title: string
  description: string
  instructions: string
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
  title: order === 0 ? 'Lesson' : `Lesson ${order + 1}`,
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

interface ResourceImportPanelProps<T extends { sourceDocument?: ImportedLearningResource }> {
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

function QuestionBankQuickImport({ onImport }: { onImport: (questions: QuizQuestion[]) => void }) {
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

  return (
    <div className="rounded border border-dashed p-2.5 bg-background/80">
      <div className="flex flex-wrap gap-2 items-center">
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="min-w-[260px] h-8">
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
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!selectedId}
          onClick={() => {
            const selected = items.find((item) => item.id === selectedId)
            if (!selected) return
            onImport([mapQuestionBankToBuilderQuestion(selected)])
            toast.success('Question imported from question bank')
            setSelectedId('')
          }}
        >
          Import Selected
        </Button>
        <Button type="button" variant="ghost" size="sm" asChild>
          <a href="/tutor/question-bank" target="_blank" rel="noreferrer">
            Open Question Bank
          </a>
        </Button>
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
        onChange={(e) => setQuestionText(e.target.value)}
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

function ResourceImportPanel<T extends { sourceDocument?: ImportedLearningResource }>({
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
        setData({ ...data, sourceDocument })
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
    <div className="space-y-3 rounded-lg border border-dashed p-3">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={extracting} asChild>
          <label className="cursor-pointer">
            {extracting ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Upload className="mr-1 h-3 w-3" />}
            Upload file
            <input
              type="file"
              className="hidden"
              accept=".pdf,.txt,.md,.doc,.docx,image/*"
              onChange={(e) => {
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
      </div>
      {source && (
        <div className="space-y-2 rounded border bg-muted/20 p-3">
          <div className="text-xs text-muted-foreground">
            Imported: <span className="font-medium text-foreground">{source.fileName}</span>
          </div>
          <Textarea
            value={source.extractedText}
            onChange={(e) =>
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

// Task Builder Modal (now uses Assessment Builder layout)
function TaskBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  return (
    <AssessmentBuilderModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      initialData={initialData}
      builderType="task"
    />
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
  const isTask = builderType === 'task'
  const isHomework = builderType === 'homework'
  const titleLabel = isTask ? 'Task' : isHomework ? 'Homework' : 'Assessment'
  const assessmentData = data as Assessment

  const addQuestion = (type: QuizQuestion['type']) => {
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: (type === 'mcq' || type === 'multiselect') ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview (student view)</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="space-y-4 py-2">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{titleLabel} Title *</Label>
                <Input
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder={`e.g., ${titleLabel} 1`}
                />
              </div>
              <div className="space-y-2">
                <Label>Instructions</Label>
                <Textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="What should students know before starting this assessment?"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>{isTask ? 'Instructions *' : 'Question *'}</Label>
                <Textarea
                  value={data.instructions}
                  onChange={(e) => setData({ ...data, instructions: e.target.value })}
                  placeholder={isTask ? 'Enter the task instructions here' : 'Enter the question here'}
                  rows={4}
                />
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
                                    onChange={(e) => {
                                      const next = new Set(selectedAnswers)
                                      if (e.target.checked) next.add(opt)
                                      else next.delete(opt)
                                      updateQuestion(idx, { correctAnswer: Array.from(next) })
                                    }}
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
                        onChange={(e) => setData({ ...(data as Assessment), latePenalty: parseInt(e.target.value) || 0 })}
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
                    onChange={(e) => setData({
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
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Time (min)</Label>
                      <Input
                        type="number"
                        value={assessmentData.estimatedMinutes}
                        onChange={(e) => setData({ ...assessmentData, estimatedMinutes: parseInt(e.target.value) || 30 })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Points</Label>
                      <Input
                        type="number"
                        value={assessmentData.points}
                        onChange={(e) => setData({ ...assessmentData, points: parseInt(e.target.value) || 20 })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Submission</Label>
                      <Select
                        value={assessmentData.submissionType}
                        onValueChange={(v: Assessment['submissionType']) => setData({ ...assessmentData, submissionType: v })}
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
                    </div>
                  </div>
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
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={assessmentData.isAiGraded ?? false}
                        onCheckedChange={(checked) => setData({ ...assessmentData, isAiGraded: checked })}
                      />
                      <Label className="text-sm">Enable AI grading assistance</Label>
                    </div>
                  </div>
                </div>
              )}
              <p className="text-xs text-muted-foreground">{data.estimatedMinutes} min · {data.points} pts · {data.submissionType}</p>
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

// Worksheet Builder Modal
function WorksheetBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  const [data, setData] = useState<Worksheet>(initialData || DEFAULT_WORKSHEET(0))
  const [showAnswerKey, setShowAnswerKey] = useState(false)

  const addQuestion = (type: QuizQuestion['type']) => {
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: type === 'mcq' ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-500" />
            Worksheet Builder
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
                <Label>Worksheet Title *</Label>
                <Input
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder="e.g., Practice Problems - Chapter 3"
                />
              </div>
              <div className="space-y-2">
                <Label>Instructions</Label>
                <Textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="What should students know before starting this worksheet?"
                  rows={2}
                />
              </div>
              <ResourceImportPanel data={data} setData={setData} targetField="instructions" />
              <div className="space-y-2">
                <Label>Instructions *</Label>
                <Textarea
                  value={data.instructions}
                  onChange={(e) => setData({ ...data, instructions: e.target.value })}
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
                    onChange={(e) => setData({ ...data, estimatedMinutes: parseInt(e.target.value) || 20 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={data.points}
                    onChange={(e) => setData({ ...data, points: parseInt(e.target.value) || 15 })}
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
                <div className="space-y-2">
                  <Label>Max Attempts</Label>
                  <Input
                    type="number"
                    min={1}
                    value={data.maxAttempts}
                    onChange={(e) => setData({ ...data, maxAttempts: parseInt(e.target.value) || 3 })}
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
          <TabsContent value="preview" className="space-y-4 py-2">
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
                    onChange={(e) => setData({
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
                      onChange={(e) => setData({ ...data, estimatedMinutes: parseInt(e.target.value) || 30 })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Points</Label>
                    <Input
                      type="number"
                      value={data.points}
                      onChange={(e) => setData({ ...data, points: parseInt(e.target.value) || 20 })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Passing Score (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={data.passingScore}
                      onChange={(e) => setData({ ...data, passingScore: parseInt(e.target.value) || 70 })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Max Attempts</Label>
                    <Input
                      type="number"
                      min={1}
                      value={data.maxAttempts}
                      onChange={(e) => setData({ ...data, maxAttempts: parseInt(e.target.value) || 3 })}
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
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: type === 'mcq' ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileQuestion className="h-5 w-5 text-red-500" />
              {isModuleQuiz ? 'Exam Builder (Summative)' : 'Assessment Builder'}
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
                <Label>{isModuleQuiz ? 'Exam Title *' : 'Assessment Title *'}</Label>
                <Input
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder={isModuleQuiz ? "e.g., Lesson 1 Comprehensive Exam" : "e.g., Lesson 1 Assessment"}
                />
              </div>
              <div className="space-y-2">
                <Label>Instructions</Label>
                <Textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
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

              {/* Answer Key Section - Protected */}
              <div className="space-y-3 border rounded-lg p-4 bg-amber-50/50">
                <div className="flex items-center justify-between">
                  <Label className="text-amber-700 font-medium">Instructor Answer Key (Protected)</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAnswerKey(!showAnswerKey)}
                  >
                    {showAnswerKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {showAnswerKey ? 'Hide' : 'Show'}
                  </Button>
                </div>
                {showAnswerKey ? (
                  <>
                    <Textarea
                      value={data.answerKey || ''}
                      onChange={(e) => setData({ ...data, answerKey: e.target.value })}
                      placeholder="Enter the complete answer key here. This is ONLY visible to instructors."
                      rows={6}
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={data.answerKeyProtected !== false}
                        onCheckedChange={(checked) => setData({ ...data, answerKeyProtected: checked })}
                      />
                      <Label className="text-sm">Protect answer key (never visible to students)</Label>
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">Answer key is hidden. Click &quot;Show&quot; to view/edit.</span>
                )}
              </div>

              <Separator />

              {/* Questions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Questions ({data.questions.length})</h3>
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
          <TabsContent value="preview" className="space-y-4 py-2">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <h3 className="font-semibold">{data.title}</h3>
              {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
              {data.sourceDocument && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Imported material (editable)</p>
                  <Textarea
                    value={data.sourceDocument.extractedText}
                    onChange={(e) => setData({
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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
        onChange={(e) => setFilter(e.target.value)}
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
                className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedIds.has(item.id) ? 'bg-blue-50 hover:bg-blue-100' : ''
                }`}
                onClick={() => toggleSelection(item.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center ${
                    selectedIds.has(item.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
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
            <>
              <ResourceImportPanel data={data} setData={setData} targetField="body" />
              <div className="space-y-2">
                <Label>Content Body</Label>
                <Textarea
                  value={data.body || ''}
                  onChange={(e) => setData({ ...data, body: e.target.value })}
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
}

function PreviewCard({ type, item, onEdit, onDuplicate, onRemove, onUpdateItem, courseId, lessonId, showLiveShareAction, onMakeVisibleToStudents }: PreviewCardProps) {
  const [studentPreviewOpen, setStudentPreviewOpen] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [resourceText, setResourceText] = useState('')
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false)
  const [generatedPdf, setGeneratedPdf] = useState<{ url: string; fileName: string; blob: Blob } | null>(null)
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
  const isDraft = normalizedItem.isPublished === false

  useEffect(() => {
    setResourceText(sourceDocument?.extractedText || '')
  }, [sourceDocument?.extractedText, sourceDocument?.fileName])

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
            <Button size="sm" onClick={handleGenerateAndPreviewPDF} disabled={publishing || questions.length === 0} className="gap-1">
              {publishing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
              {showLiveShareAction ? 'Assign Individual Copies to Students' : 'Publish & Assign'}
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
          {onUpdateItem && (
            <QuestionBankQuickImport
              onImport={(incomingQuestions) =>
                onUpdateItem({
                  questions: [...(normalizedItem.questions || []), ...incomingQuestions],
                } as PreviewUpdatePayload)
              }
            />
          )}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Time (min)</Label>
              <Input
                type="number"
                value={normalizedItem.estimatedMinutes || 0}
                onChange={(e) => onUpdateItem?.({ estimatedMinutes: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Points</Label>
              <Input
                type="number"
                value={normalizedItem.points || 0}
                onChange={(e) => onUpdateItem?.({ points: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Submission</Label>
              <Select
                value={normalizedItem.submissionType || 'text'}
                onValueChange={(v) =>
                  onUpdateItem?.({ submissionType: v } as PreviewUpdatePayload)
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
                  {type === 'task' ? (
                    <SelectItem value="none">None</SelectItem>
                  ) : (
                    <SelectItem value="multiple">Multiple</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={(item as Task | Assessment).isAiGraded ?? false}
              onCheckedChange={(checked) => onUpdateItem?.({ isAiGraded: checked })}
            />
            <Label className="text-sm">Enable AI grading assistance</Label>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        {typeof normalizedItem.estimatedMinutes === 'number' && (
          <div><span className="text-muted-foreground">Time:</span> {normalizedItem.estimatedMinutes} min</div>
        )}
        {typeof normalizedItem.points === 'number' && (
          <div><span className="text-muted-foreground">Points:</span> {normalizedItem.points}</div>
        )}
        {'submissionType' in normalizedItem && normalizedItem.submissionType && (
          <div><span className="text-muted-foreground">Submission:</span> {normalizedItem.submissionType}</div>
        )}
        {'timeLimit' in normalizedItem && normalizedItem.timeLimit != null && (
          <div><span className="text-muted-foreground">Time limit:</span> {normalizedItem.timeLimit} min</div>
        )}
        {'attemptsAllowed' in normalizedItem && typeof normalizedItem.attemptsAllowed === 'number' && (
          <div><span className="text-muted-foreground">Attempts:</span> {normalizedItem.attemptsAllowed}</div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Questions ({questions?.length ?? 0})</h4>
        <QuestionsPreview questions={questions ?? []} />
      </div>
      {sourceDocument && (
        <div className="space-y-2 rounded-lg border p-3">
          <div className="text-xs text-muted-foreground">
            Imported file: <span className="font-medium text-foreground">{sourceDocument.fileName}</span>
          </div>
          <Textarea
            value={resourceText}
            onChange={(e) => setResourceText(e.target.value)}
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
      
      {/* PDF Preview Modal */}
      <Dialog open={pdfPreviewOpen} onOpenChange={setPdfPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
  const [modules, setModules] = useState<Module[]>(() => normalizeModulesForAssessments(initialModules))
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<{ type: string; id: string } | null>(null)
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [assetsOpen, setAssetsOpen] = useState(true)
  const [mediaOpen, setMediaOpen] = useState(true)
  const [docsOpen, setDocsOpen] = useState(true)
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())

  // AI Prompt state
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const objectUrlsRef = useRef<string[]>([])

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

  const handleSendPrompt = async () => {
    if (!aiPrompt.trim() && attachedFiles.length === 0) return
    if (!courseId) {
      toast.error('Course ID is required to generate structure')
      return
    }

    setIsGenerating(true)
    try {
      const referenceTexts = await Promise.all(
        attachedFiles.map(async (file) => {
          try {
            return await extractTextFromFile(file)
          } catch {
            return ''
          }
        })
      )

      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${courseId}/builder-generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          prompt: aiPrompt,
          references: referenceTexts.filter((text) => text.trim().length > 0),
        }),
      })

      const payload = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(payload?.error || 'Failed to generate course structure')
      }

      const generatedModules = mapGeneratedModulesToBuilder(payload.modules ?? [])
      if (generatedModules.length === 0) {
        throw new Error('AI generation returned empty modules')
      }

      setModules(normalizeModulesForAssessments(generatedModules))
      toast.success('Complete course structure generated')
      setAiPrompt('')
      setAttachedFiles([])
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate course')
    } finally {
      setIsGenerating(false)
    }
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

  // Add handlers
  const addModule = () => {
    const newModule = DEFAULT_MODULE(modules.length)
    setModules([...modules, newModule])
    setExpandedModules(new Set([...expandedModules, newModule.id]))
    setEditingData(newModule)
    setActiveModal({ type: 'module', isOpen: true })
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

    const newAssessment = DEFAULT_HOMEWORK(modules[moduleIndex].lessons[lessonIndex].homework.length, 'assessment')
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].homework.push(newAssessment)
    setModules(newModules)
    setEditingData(newAssessment)
    setActiveModal({ type: 'homework', isOpen: true, moduleId, lessonId })
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

    const newHomework = DEFAULT_HOMEWORK(modules[moduleIndex].lessons[lessonIndex].homework.length, 'homework')
    const newModules = [...modules]
    newModules[moduleIndex].lessons[lessonIndex].homework.push(newHomework)
    setModules(newModules)
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

  const assetsLesson = modules[0]?.lessons?.[0] ?? null

  const applyAiSuggestion = useCallback((suggestion: (typeof AI_SUGGESTIONS)[number]) => {
    setAiPrompt(`Suggestion: ${suggestion.title}. ${suggestion.description}`)
    toast.success(`Applied suggestion: ${suggestion.title}`)
  }, [])

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

  const handleSaveAssessment = (data: any) => {
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
    toast.success('Assessment saved')
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
        {/* LEFT PANEL - Course Structure */}
        <div className="col-span-4">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  Start here!
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setAiPanelOpen(!aiPanelOpen)}
                >
                  <Wand2 className="h-4 w-4" />
                  AI Assist
                </Button>
              </div>
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
                  AI will generate lessons, tasks, and assessments based on your description
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

                    {/* Assets folder (course-level) */}
                    <TreeItem depth={1} isLast={false}>
                      <div className="group">
                        <div
                          className={cn(
                            "flex items-center gap-1.5 py-1.5 px-2 rounded cursor-pointer transition-colors",
                            "bg-slate-50 hover:bg-slate-100 border border-slate-200"
                          )}
                          onClick={() => setAssetsOpen((prev) => !prev)}
                        >
                          {assetsOpen ? (
                            <ChevronDown className="h-3 w-3 text-slate-600" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-slate-600" />
                          )}
                          <Paperclip className="h-3 w-3 text-slate-600" />
                          <span className="text-sm font-medium flex-1 truncate">Assets</span>
                          <Badge variant="secondary" className="text-[10px] h-4">
                            {(assetsLesson?.docs?.length || 0) + (assetsLesson?.media?.videos?.length || 0) + (assetsLesson?.media?.images?.length || 0)}
                          </Badge>
                        </div>

                        {assetsOpen && (
                          <div className="mt-1 space-y-1">
                            <TreeItem depth={2} isLast={false}>
                              <div className="py-1 px-2 rounded bg-gray-50 border border-gray-200 group/media">
                                <div className="flex items-center gap-1.5">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4"
                                    onClick={() => setMediaOpen((prev) => !prev)}
                                    aria-label={mediaOpen ? 'Collapse media' : 'Expand media'}
                                  >
                                    {mediaOpen ? (
                                      <ChevronDown className="h-3 w-3 text-gray-600" />
                                    ) : (
                                      <ChevronRight className="h-3 w-3 text-gray-600" />
                                    )}
                                  </Button>
                                  <Video className="h-3 w-3 text-gray-500" />
                                  <span className="text-[10px] text-muted-foreground">Media</span>
                                  <span className="text-[10px] text-muted-foreground">
                                    ({assetsLesson?.media?.videos?.length || 0}v, {assetsLesson?.media?.images?.length || 0}i)
                                  </span>
                                  <div className="flex items-center gap-1 ml-auto opacity-0 group-hover/media:opacity-100">
                                    <label className="cursor-pointer">
                                      <input
                                        type="file"
                                        accept="video/*"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleAssetsMediaUpload(e.target.files, 'video')}
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
                                        onChange={(e) => handleAssetsMediaUpload(e.target.files, 'image')}
                                      />
                                      <span className="flex items-center gap-1 text-[10px] text-green-600 hover:text-green-700">
                                        <ImageIcon className="h-3 w-3" /> Img
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                {mediaOpen && (assetsLesson?.media?.videos?.length > 0 || assetsLesson?.media?.images?.length > 0) && (
                                  <div className="mt-1.5 space-y-0.5 pl-4 border-l border-dashed border-gray-300 ml-1">
                                    {assetsLesson?.media?.videos?.map((video) => (
                                      <div key={video.id} className="flex items-start gap-1 text-[10px] text-gray-600">
                                        <Play className="h-3 w-3 shrink-0 mt-[2px]" />
                                        <span className="flex-1 min-w-0 break-words whitespace-normal">{video.title}</span>
                                        <span className="text-gray-400 shrink-0">{video.duration > 0 ? `${Math.floor(video.duration / 60)}m` : '—'}</span>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5"
                                          onClick={() => {
                                            if (!confirm(`Delete "${video.title}"?`)) return
                                            handleDeleteAssetMedia('video', video.id)
                                          }}
                                        >
                                          <Trash2 className="h-3 w-3 text-red-500" />
                                        </Button>
                                      </div>
                                    ))}
                                    {assetsLesson?.media?.images?.map((img) => (
                                      <div key={img.id} className="flex items-start gap-1 text-[10px] text-gray-600">
                                        <ImageIcon className="h-3 w-3 shrink-0 mt-[2px]" />
                                        <span className="flex-1 min-w-0 break-words whitespace-normal">{img.title}</span>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5"
                                          onClick={() => {
                                            if (!confirm(`Delete "${img.title}"?`)) return
                                            handleDeleteAssetMedia('image', img.id)
                                          }}
                                        >
                                          <Trash2 className="h-3 w-3 text-red-500" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </TreeItem>
                            <TreeItem depth={2} isLast={false}>
                              <div className="py-1 px-2 rounded bg-gray-50 border border-gray-200 group/docs">
                                <div className="flex items-center gap-1.5">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4"
                                    onClick={() => setDocsOpen((prev) => !prev)}
                                    aria-label={docsOpen ? 'Collapse docs' : 'Expand docs'}
                                  >
                                    {docsOpen ? (
                                      <ChevronDown className="h-3 w-3 text-gray-600" />
                                    ) : (
                                      <ChevronRight className="h-3 w-3 text-gray-600" />
                                    )}
                                  </Button>
                                  <FileText className="h-3 w-3 text-gray-500" />
                                  <span className="text-[10px] text-muted-foreground">Docs ({assetsLesson?.docs?.length || 0})</span>
                                  <label className="cursor-pointer ml-auto opacity-0 group-hover/docs:opacity-100">
                                    <input
                                      type="file"
                                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                                      multiple
                                      className="hidden"
                                      onChange={(e) => handleAssetsDocUpload(e.target.files)}
                                    />
                                    <span className="flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-700">
                                      <Upload className="h-3 w-3" /> Upload
                                    </span>
                                  </label>
                                </div>
                                {docsOpen && assetsLesson?.docs?.length > 0 && (
                                  <div className="mt-1.5 space-y-0.5 pl-4 border-l border-dashed border-gray-300 ml-1">
                                    {assetsLesson?.docs?.map((doc) => (
                                      <div key={doc.id} className="flex items-start gap-1 text-[10px] text-gray-600">
                                        <FileText className="h-3 w-3 shrink-0 mt-[2px]" />
                                        <span className="flex-1 min-w-0 break-words whitespace-normal">{doc.title}</span>
                                        <span className="text-gray-400 uppercase shrink-0">{doc.type}</span>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5"
                                          onClick={() => {
                                            if (!confirm(`Delete "${doc.title}"?`)) return
                                            handleDeleteAssetDoc(doc.id)
                                          }}
                                        >
                                          <Trash2 className="h-3 w-3 text-red-500" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </TreeItem>
                          </div>
                        )}
                      </div>
                    </TreeItem>

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
                                {totalItems}
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
                                {/* Tasks */}
                                <TreeItem depth={2} isLast={false}>
                                  <div className="flex items-center gap-1.5">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-5 text-[10px] gap-1 text-orange-600 px-2"
                                      onClick={() => addTask(module.id, primaryLesson.id)}
                                    >
                                      <Plus className="h-3 w-3" />
                                      Task
                                    </Button>
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
                                      <SortableTreeItem key={task.id} id={task.id} depth={2} isLast={idx === (primaryLesson.tasks?.length || 0) - 1}>
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
                                              setActiveModal({ type: 'task', isOpen: true, moduleId: module.id, lessonId: primaryLesson.id, itemId: task.id })
                                            }}
                                          >
                                            Edit
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 opacity-0 group-hover/item:opacity-100"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              if (!confirm(`Delete "${task.title}"?`)) return
                                              deleteTask(module.id, primaryLesson.id, task.id)
                                            }}
                                          >
                                            <Trash2 className="h-3 w-3 text-red-500" />
                                          </Button>
                                        </div>
                                      </SortableTreeItem>
                                    ))}
                                  </SortableContext>
                                )}

                                {/* Assessments */}
                                <TreeItem depth={2} isLast={false}>
                                  <div className="flex items-center gap-1.5">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-5 text-[10px] gap-1 text-purple-600 px-2"
                                      onClick={() => addAssessment(module.id, primaryLesson.id)}
                                    >
                                      <Plus className="h-3 w-3" />
                                      Assessment
                                    </Button>
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
                                          className="flex items-center gap-1.5 py-1 px-2 rounded bg-purple-50 border border-purple-200 group/item cursor-pointer hover:bg-purple-100"
                                          onClick={() => setSelectedItem({ type: 'homework', id: hw.id })}
                                        >
                                          <FileQuestion className="h-3 w-3 text-purple-500" />
                                          <span className="text-[10px] flex-1 truncate">{hw.title}</span>
                                          <span className="text-[10px] text-muted-foreground">{hw.points}pts</span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                            onClick={(e) => {
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
                                            onClick={(e) => {
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

                                {/* Homework */}
                                <TreeItem depth={2} isLast={false}>
                                  <div className="flex items-center gap-1.5">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-5 text-[10px] gap-1 text-emerald-600 px-2"
                                      onClick={() => addHomework(module.id, primaryLesson.id)}
                                    >
                                      <Plus className="h-3 w-3" />
                                      Homework
                                    </Button>
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
                                  </div>
                                </TreeItem>
                                {!isSectionCollapsed(module.id, 'homework') && (
                                  <SortableContext
                                    items={homeworkItems.map(h => h.id)}
                                    strategy={verticalListSortingStrategy}
                                  >
                                    {homeworkItems.map((hw, idx) => (
                                      <SortableTreeItem key={hw.id} id={hw.id} depth={2} isLast={idx === homeworkItems.length - 1}>
                                        <div
                                          className="flex items-center gap-1.5 py-1 px-2 rounded bg-emerald-50 border border-emerald-200 group/item cursor-pointer hover:bg-emerald-100"
                                          onClick={() => setSelectedItem({ type: 'homework', id: hw.id })}
                                        >
                                          <Home className="h-3 w-3 text-emerald-500" />
                                          <span className="text-[10px] flex-1 truncate">{hw.title}</span>
                                          <span className="text-[10px] text-muted-foreground">{hw.points}pts</span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 text-[10px] gap-1 opacity-0 group-hover/item:opacity-100 px-1"
                                            onClick={(e) => {
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
                                            onClick={(e) => {
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
                                        onClick={(e) => {
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
                                        onClick={(e) => {
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
            </CardContent>
          </Card>
        </div>

        {/* CENTER PANEL - Preview/Workspace */}
        <div className={aiPanelOpen ? 'col-span-5' : 'col-span-8'}>
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
                        <p className="text-sm mt-2">Click a lesson, task, assessment, or exam</p>
                      </div>
                    </div>
                  )
                }
                const { item, moduleId, lessonId } = resolved
                const itemType = selectedItem?.type as 'task' | 'homework' | 'worksheet' | 'moduleQuiz' | 'lesson' | 'module'
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
                  else if (selectedItem?.type === 'homework' && lessonId) deleteAssessment(moduleId, lessonId, item.id)
                  else if (selectedItem?.type === 'worksheet' && lessonId) deleteWorksheet(moduleId, lessonId, item.id)
                  else if (selectedItem?.type === 'moduleQuiz') deleteModuleQuiz(moduleId, item.id)
                }
                const onDuplicate = () => {
                  if (selectedItem?.type === 'task' && lessonId) duplicateTask(moduleId, lessonId, item as Task)
                  else if (selectedItem?.type === 'homework' && lessonId) duplicateAssessment(moduleId, lessonId, item as Assessment)
                  else if (selectedItem?.type === 'worksheet' && lessonId) duplicateWorksheet(moduleId, lessonId, item as Worksheet)
                  else if (selectedItem?.type === 'moduleQuiz') duplicateModuleQuiz(moduleId, item as ModuleQuiz)
                }
                return (
                  <PreviewCard
                    type={itemType}
                    item={item}
                    onEdit={onEdit}
                    onDuplicate={onDuplicate}
                    onRemove={onRemove}
                    onUpdateItem={updateSelectedItem}
                    courseId={courseId}
                    lessonId={lessonId}
                    showLiveShareAction={panelMode === 'live-class'}
                    onMakeVisibleToStudents={onMakeVisibleToStudents}
                  />
                )
              })()}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANEL - AI Assistant & Templates (conditional) */}
        {aiPanelOpen && (
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
                  onClick={() => applyAiSuggestion(suggestion)}
                >
                  <suggestion.icon className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{suggestion.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{suggestion.description}</p>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={() => {
                  const nextSuggestion = AI_SUGGESTIONS[(Math.floor(Math.random() * AI_SUGGESTIONS.length))]
                  applyAiSuggestion(nextSuggestion)
                }}
              >
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
                  onClick={() => applyTemplate(template)}
                >
                  <template.icon className="h-4 w-4 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{template.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{template.description}</p>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => applyTemplate(CONTENT_TEMPLATES[0])}
              >
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
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold">
                    {modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Sections</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold">
                    {modules.reduce((acc, m) => acc + m.moduleQuizzes.length, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Exams</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold">
                    {modules.reduce((acc, m) => acc + m.lessons.reduce((lacc, l) => lacc + l.tasks.length + l.homework.length + (l.worksheets?.length || 0), 0), 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Activities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        )}

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

        <AssessmentBuilderModal
          isOpen={activeModal.type === 'homework' && activeModal.isOpen}
          onClose={() => setActiveModal({ type: 'homework', isOpen: false })}
          onSave={handleSaveAssessment}
          initialData={editingData}
          builderType={editingData?.category === 'homework' ? 'homework' : 'assessment'}
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
      </div>
    </div>
  )
})
