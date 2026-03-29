'use client'

import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
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
  useDroppable,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EnhancedWhiteboard } from '@/components/class/enhanced-whiteboard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { extractTextFromFile } from '@/lib/extract-file-text'
import { toast } from 'sonner'
import type { LiveTask } from '@/lib/socket'
import type { LiveStudent, EngagementMetrics } from '@/types/live-session'
import type {
  Video,
  Image,
  Document,
  ImportedLearningResource,
  VisibleDocumentPayload,
  DMIQuestion,
  Task,
  Assessment,
  QuizQuestion,
  Quiz,
  Content,
  DifficultyLevel,
  DifficultyMode,
  DifficultyVariant,
  WithDifficultyVariants,
  Worksheet,
  Lesson,
  ModuleQuiz,
  Module,
  InsightsSessionOption,
  CourseBuilderInsightsProps,
  CourseBuilderProps,
  CourseBuilderRef,
} from './builder-types'

export type {
  Video,
  Image,
  Document,
  ImportedLearningResource,
  VisibleDocumentPayload,
  DMIQuestion,
  Task,
  Assessment,
  QuizQuestion,
  Quiz,
  Content,
  DifficultyLevel,
  DifficultyMode,
  DifficultyVariant,
  WithDifficultyVariants,
  Worksheet,
  Lesson,
  ModuleQuiz,
  Module,
  InsightsSessionOption,
  CourseBuilderInsightsProps,
  CourseBuilderProps,
  CourseBuilderRef,
} from './builder-types'

import { DMIPanel } from './DMIPanel'
import { QuestionBankModal } from './QuestionBankModal'
import {
  ResourceImportPanel,
  MatchingPairsEditor,
  QuestionBankQuickImport,
  ManualQuestionComposer,
  QuestionsPreview,
  TreeItem,
  DroppableHomeworkZone,
  DroppableTaskZone,
  DroppableAssessmentZone,
  ResizablePanel,
  DifficultyBadge,
  SortableTreeItem,
  StudentPreviewModal,
  PreviewCard,
} from './builder-components'
import { LessonSelectorDialog } from './LessonSelectorDialog'
import {
  AssessmentBuilderModal,
  TaskBuilderModal,
  HomeworkBuilderModal,
  AssessmentBuilderModalWithSelector,
} from './AssessmentBuilderModal'
import { WorksheetBuilderModal } from './WorksheetBuilderModal'
import { QuizBuilderModal } from './QuizBuilderModal'
import { ContentBuilderModal } from './ContentBuilderModal'
import { AIAssistAgent } from './AIAssistAgent'
import { ModuleBuilderModal } from './ModuleBuilderModal'
import { LessonBuilderModal } from './LessonBuilderModal'
import {
  generateId as utilsGenerateId,
  mapQuestionBankToBuilderQuestion,
  DEFAULT_CONTENT,
  DEFAULT_TASK,
  DEFAULT_HOMEWORK,
  DEFAULT_LESSON,
  DEFAULT_WORKSHEET,
  DEFAULT_QUIZ,
  DEFAULT_MODULE_QUIZ,
  DEFAULT_MODULE,
  convertQuizToAssessment,
  normalizeModulesForAssessments,
  normalizeGeneratedQuestionType,
  mapGeneratedModulesToBuilder,
  AI_SUGGESTIONS,
  CONTENT_TEMPLATES,
  generateQuestionPaperPDF,
  resolveSelectedItem,
} from './builder-utils'

const generateId = utilsGenerateId

import {
  Plus,
  Trash2,
  Copy,
  FileText,
  Video as VideoIcon,
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
  Radio,
  SignalHigh,
  SignalLow,
  Settings,
  Layers2,
  GripHorizontal,
  CornerDownLeft,
} from 'lucide-react'
import { ChevronLeft as ChevronLeftIcon } from 'lucide-react'

// ============================================
// BUILDER MODAL COMPONENTS
// ============================================

// ============================================
// MAIN COURSE BUILDER COMPONENT
// ============================================

// Main Course Builder

// LessonSelectorDialog Removed

// Extended props for modals with lesson selector
// BuilderModalWithModulesProps Removed

// Types and payload definitions
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

// ============================================
// MAIN COURSE BUILDER COMPONENT
// ============================================

export const CourseBuilder = forwardRef<CourseBuilderRef, CourseBuilderProps>(
  function CourseBuilder(
    {
      courseId,
      courseName,
      panelMode = 'default',
      initialModules,
      lessonBankMode = false,
      onSave,
      onMakeVisibleToStudents,
      insightsProps,
    },
    ref
  ) {
    const resolvedInitialModules = useMemo(
      () => (initialModules ? initialModules : []),
      [initialModules]
    )
    const initialModulesKey = useMemo(() => {
      try {
        return JSON.stringify(resolvedInitialModules)
      } catch {
        return String(resolvedInitialModules?.length ?? 0)
      }
    }, [resolvedInitialModules])
    const lastInitialModulesKeyRef = useRef<string | null>(null)
    const [modules, setModules] = useState<Module[]>([])
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
    const [selectedItem, setSelectedItem] = useState<{ type: string; id: string } | null>(null)
    const [outlineModalOpen, setOutlineModalOpen] = useState(false)
    const [aiPanelOpen, setAiPanelOpen] = useState(false)
    const [importTarget, setImportTarget] = useState<{ moduleId: string; lessonId: string } | null>(
      null
    )
    const [lessonBankImportOpen, setLessonBankImportOpen] = useState(false)
    const [importLessonSelectorOpen, setImportLessonSelectorOpen] = useState(false)
    const [lessonBankModules, setLessonBankModules] = useState<Module[]>([])
    const [lessonBankLessonKey, setLessonBankLessonKey] = useState<string>('')
    const [courseAssets, setCourseAssets] = useState<
      { id: string; name: string; content?: string }[]
    >([])
    const [loadAsModalOpen, setLoadAsModalOpen] = useState(false)
    const [assetToLoad, setAssetToLoad] = useState<{ name: string; content?: string } | null>(null)
    const [leftPanelHidden, setLeftPanelHidden] = useState(false)
    const [leftPanelWidth, setLeftPanelWidth] = useState(280)
    const [leftPanelResizing, setLeftPanelResizing] = useState(false)
    const leftPanelRef = useRef<HTMLDivElement>(null)
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
    const [testPciTabs, setTestPciTabs] = useState(() =>
      insightsProps
        ? [
            { id: 'classroom', label: 'Classroom' },
            { id: 'student1', label: 'Whiteboard' },
          ]
        : [
            { id: 'classroom', label: 'Classroom' },
            { id: 'student1', label: 'Test Student 1' },
            { id: 'student2', label: 'Test Student 2' },
          ]
    )

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
      extensions: [] as {
        id: string
        name: string
        description?: string
        content: string
        pci: string
      }[],
      activeExtensionId: null as string | null, // null = viewing task, string = viewing extension
    })

    const [assessmentBuilder, setAssessmentBuilder] = useState({
      title: '',
      taskContent: '',
      taskPci: '',
      details: '',
      extensions: [] as {
        id: string
        name: string
        description?: string
        content: string
        pci: string
      }[],
      activeExtensionId: null as string | null,
    })

    const [taskPciMessages, setTaskPciMessages] = useState<
      { role: 'user' | 'assistant'; content: string }[]
    >([])
    const [taskExtensionPciMessages, setTaskExtensionPciMessages] = useState<
      Record<string, { role: 'user' | 'assistant'; content: string }[]>
    >({})
    const [taskExtensionPciInputs, setTaskExtensionPciInputs] = useState<Record<string, string>>({})
    const [assessmentPciMessages, setAssessmentPciMessages] = useState<
      { role: 'user' | 'assistant'; content: string }[]
    >([])
    const [taskPciInput, setTaskPciInput] = useState('')
    const [assessmentPciInput, setAssessmentPciInput] = useState('')
    const [taskPciLoading, setTaskPciLoading] = useState(false)
    const [assessmentPciLoading, setAssessmentPciLoading] = useState(false)
    const [taskPciErrorHint, setTaskPciErrorHint] = useState('')
    const [assessmentPciErrorHint, setAssessmentPciErrorHint] = useState('')

    // AI Assist Agent state - separate for task and assessment
    const [aiAssistOpen, setAiAssistOpen] = useState(false)
    const [aiAssistContext, setAiAssistContext] = useState<'task' | 'assessment'>('task')
    const [taskAiMessages, setTaskAiMessages] = useState<
      { role: 'user' | 'assistant'; content: string }[]
    >([])
    const [assessmentAiMessages, setAssessmentAiMessages] = useState<
      { role: 'user' | 'assistant'; content: string }[]
    >([])

    // Uploaded files tracking
    const [taskUploadedFiles, setTaskUploadedFiles] = useState<{ id: string; name: string }[]>([])
    const [assessmentUploadedFiles, setAssessmentUploadedFiles] = useState<
      { id: string; name: string }[]
    >([])

    // Test PCI state
    const [testPciInput, setTestPciInput] = useState('')
    const [testPciContent, setTestPciContent] = useState<Record<string, string>>({
      classroom: '',
      student1: '',
      student2: '',
    })
    // AI scoring results for Test PCI
    const [testPciScores, setTestPciScores] = useState<
      Record<string, { score: number; feedback: string }[]>
    >({
      classroom: [],
      student1: [],
      student2: [],
    })
    const [testPciLoading, setTestPciLoading] = useState(false)
    const [testPciActiveTab, setTestPciActiveTab] = useState('classroom')
    const [testPciSource, setTestPciSource] = useState<'task' | 'assessment'>('task')
    const [taskDmiItems, setTaskDmiItems] = useState<DMIQuestion[]>([])
    const [assessmentDmiItems, setAssessmentDmiItems] = useState<DMIQuestion[]>([])

    // Active tab tracking for Enter button
    const [taskBuilderActiveTab, setTaskBuilderActiveTab] = useState<'content' | 'pci'>('content')
    const [assessmentBuilderActiveTab, setAssessmentBuilderActiveTab] = useState<'content' | 'pci'>(
      'content'
    )

    // Main builder tab (task vs assessment)
    const [mainBuilderTab, setMainBuilderTab] = useState<'task' | 'assessment'>('task')
    const [showInsightsPanel, setShowInsightsPanel] = useState(true)

    // Insights panel state
    const [insightsTab, setInsightsTab] = useState<'analytics' | 'poll' | 'question'>('analytics')
    const [pollPrompt, setPollPrompt] = useState('Did you find this task difficult')
    const [questionPrompt, setQuestionPrompt] = useState('Do you have a question about this task?')

    // Question Bank modal state
    const [questionBankOpen, setQuestionBankOpen] = useState(false)
    const [questionBankTarget, setQuestionBankTarget] = useState<string | null>(null)
    const [importTypeModalData, setImportTypeModalData] = useState<{
      target: { moduleId: string; lessonId: string }
      items: { questionText: string; pciText: string }[]
    } | null>(null)

    // Track currently loaded item for saving back
    const [loadedTaskId, setLoadedTaskId] = useState<string | null>(null)
    const [loadedAssessmentId, setLoadedAssessmentId] = useState<string | null>(null)
    const activeInsightsTaskId = mainBuilderTab === 'assessment' ? loadedAssessmentId : loadedTaskId
    const activeInsightsTask =
      activeInsightsTaskId && insightsProps
        ? (insightsProps.liveTasks.find(task => task.id === activeInsightsTaskId) ?? null)
        : null

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

    const loadTaskIntoBuilder = useCallback(
      (task: Task, activeExtensionId: string | null = null) => {
        // Prioritize description over sourceDocument - description holds edited content
        const content = task.description || task.sourceDocument?.extractedText || ''
        setTaskBuilder({
          title: task.title || '',
          taskContent: content,
          taskPci: task.instructions || '',
          details: task.shortDescription || '',
          extensions: (task.extensions || []).map(ext => ({
            ...ext,
            description: ext.description || '',
          })),
          activeExtensionId,
        })
        setTaskDmiItems(task.dmiItems || [])
        setTaskPciMessages(parsePciTranscript(task.instructions || ''))
        setTaskExtensionPciMessages(
          (task.extensions || []).reduce<
            Record<string, { role: 'user' | 'assistant'; content: string }[]>
          >((acc, ext) => {
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
        setTaskUploadedFiles(
          task.sourceDocument ? [{ id: 'source', name: task.sourceDocument.fileName }] : []
        )
      },
      []
    )

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
      setAssessmentUploadedFiles(
        assessment.sourceDocument
          ? [{ id: 'source', name: assessment.sourceDocument.fileName }]
          : []
      )
    }, [])

    // Load tutor assets from API on mount
    useEffect(() => {
      if (insightsProps) return
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
    const saveAssetsToApi = useCallback(
      async (assets: typeof courseAssets) => {
        if (insightsProps) return
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
      },
      [insightsProps]
    )

    // Debounced assets save
    useEffect(() => {
      if (insightsProps) return
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
        setModules(prev =>
          prev.map(mod => ({
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
                      sourceDocument: task.sourceDocument,
                    }
                  : task
              ),
            })),
          }))
        )
      }, 1000) // Auto-save after 1 second of inactivity

      return () => clearTimeout(timeoutId)
    }, [
      taskBuilder.title,
      taskBuilder.details,
      taskBuilder.taskContent,
      taskBuilder.taskPci,
      taskBuilder.extensions,
      taskDmiItems,
      loadedTaskId,
    ])

    // Auto-save assessment on the fly (debounced)
    useEffect(() => {
      if (!loadedAssessmentId) return

      const timeoutId = setTimeout(() => {
        setModules(prev =>
          prev.map(mod => ({
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
                      sourceDocument: hw.sourceDocument,
                    }
                  : hw
              ),
            })),
          }))
        )
      }, 1000) // Auto-save after 1 second of inactivity

      return () => clearTimeout(timeoutId)
    }, [
      assessmentBuilder.title,
      assessmentBuilder.taskContent,
      assessmentBuilder.taskPci,
      assessmentDmiItems,
      loadedAssessmentId,
    ])

    // Dev mode state for saving (declared early for ref access)
    const [devMode, setDevMode] = useState<'single' | 'multi'>('single')
    const [previewDifficulty, setPreviewDifficulty] = useState<
      'all' | 'beginner' | 'intermediate' | 'advanced'
    >('all')

    // State for course properties (name, description)
    const [coursePropsModal, setCoursePropsModal] = useState({
      isOpen: false,
      name: courseName || '',
      description: '',
    })

    // Expose save method via ref
    useImperativeHandle(ref, () => ({
      save: () => {
        // If courseName is missing (e.g. builder-draft), prompt for properties
        if (!courseName && !coursePropsModal.name) {
          setCoursePropsModal(prev => ({ ...prev, isOpen: true }))
          return
        }

        if (onSave) {
          onSave(modules, {
            developmentMode: devMode,
            previewDifficulty,
            courseName: coursePropsModal.name || courseName,
            courseDescription: coursePropsModal.description,
          })
        }
      },
    }))

    const trackObjectUrl = useCallback((url: string) => {
      if (url.startsWith('blob:')) {
        objectUrlsRef.current.push(url)
      }
      return url
    }, [])

    const formatPciTranscript = (messages: { role: 'user' | 'assistant'; content: string }[]) =>
      messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n')

    const loadLessonBankModules = useCallback(() => {
      try {
        const raw = localStorage.getItem('lesson-bank-modules-v1')
        if (!raw) return []
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed as Module[]
      } catch {
        return []
      }
    }, [])

    const openLessonBankImport = useCallback(
      (target: { moduleId: string; lessonId: string }) => {
        const bankModules = loadLessonBankModules()
        setLessonBankModules(bankModules)
        const firstLesson = bankModules[0]?.lessons?.[0]
        if (firstLesson) {
          setLessonBankLessonKey(`${bankModules[0].id}:${firstLesson.id}`)
        } else {
          setLessonBankLessonKey('')
        }
        setImportTarget(target)
        setLessonBankImportOpen(true)
      },
      [loadLessonBankModules]
    )

    const cloneTask = (task: Task): Task => ({
      ...task,
      id: `task-${generateId()}`,
      extensions: (task.extensions || []).map(ext => ({
        ...ext,
        id: `ext-${generateId()}`,
      })),
    })

    const cloneAssessment = (assessment: Assessment): Assessment => ({
      ...assessment,
      id: `homework-${generateId()}`,
    })

    const findTaskById = useCallback(
      (id: string): Task | null => {
        for (const mod of modules) {
          for (const lesson of mod.lessons) {
            const task = lesson.tasks?.find(t => t.id === id)
            if (task) return task
          }
        }
        return null
      },
      [modules]
    )

    const findAssessmentById = useCallback(
      (id: string): Assessment | null => {
        for (const mod of modules) {
          for (const lesson of mod.lessons) {
            const assessment = lesson.homework?.find(h => h.id === id)
            if (assessment) return assessment
          }
        }
        return null
      },
      [modules]
    )

    const moveToHomework = useCallback(
      (
        moduleId: string,
        lessonId: string,
        type: 'task' | 'assessment',
        item: Task | Assessment
      ) => {
        const base = DEFAULT_HOMEWORK(
          modules.flatMap(m => m.lessons.flatMap(l => l.homework || [])).length,
          'homework'
        )
        const homeworkItem: Assessment =
          type === 'task'
            ? {
                ...base,
                id: `hw-${generateId()}`,
                title: item.title || 'Task',
                description: (item as Task).description || '',
                instructions: (item as Task).instructions || '',
                dmiItems: (item as Task).dmiItems || [],
              }
            : {
                ...cloneAssessment(item as Assessment),
                id: `hw-${generateId()}`,
                category: 'homework' as const,
              }
        setModules(prev =>
          prev.map(mod => {
            if (mod.id !== moduleId) return mod
            return {
              ...mod,
              lessons: mod.lessons.map(les => {
                if (les.id !== lessonId) return les
                if (type === 'task') {
                  const newTasks = (les.tasks || []).filter(t => t.id !== item.id)
                  return {
                    ...les,
                    tasks: newTasks,
                    homework: [...(les.homework || []), homeworkItem],
                  }
                }
                const newHwList = (les.homework || [])
                  .filter(h => h.id !== item.id)
                  .concat([homeworkItem])
                return { ...les, homework: newHwList }
              }),
            }
          })
        )
        if (type === 'task') {
          if (loadedTaskId === item.id) {
            setSelectedItem({ type: 'homework', id: homeworkItem.id })
            loadAssessmentIntoBuilder(homeworkItem)
            setMainBuilderTab('assessment')
          }
          setLoadedTaskId(null)
          setTaskBuilder({
            title: '',
            taskContent: '',
            taskPci: '',
            details: '',
            extensions: [],
            activeExtensionId: null,
          })
        } else {
          if (loadedAssessmentId === item.id) {
            setSelectedItem({ type: 'homework', id: homeworkItem.id })
            loadAssessmentIntoBuilder(homeworkItem)
          }
          setLoadedAssessmentId(null)
          setAssessmentBuilder({
            title: '',
            taskContent: '',
            taskPci: '',
            details: '',
            extensions: [],
            activeExtensionId: null,
          })
        }
        toast.success('Moved to homework')
      },
      [cloneAssessment, loadAssessmentIntoBuilder, modules]
    )

    const cloneLesson = (lesson: Lesson, order: number): Lesson => ({
      ...lesson,
      id: `lesson-${generateId()}`,
      order,
      tasks: (lesson.tasks || []).map(cloneTask),
      homework: (lesson.homework || []).map(cloneAssessment),
      worksheets: (lesson.worksheets || []).map(w => ({ ...w, id: `worksheet-${generateId()}` })),
      quizzes: (lesson.quizzes || []).map(q => ({ ...q, id: `quiz-${generateId()}` })),
    })

    const handlePciSend = async (type: 'task' | 'assessment') => {
      const isTask = type === 'task'
      const activeTaskInput = taskBuilder.activeExtensionId
        ? taskExtensionPciInputs[taskBuilder.activeExtensionId] || ''
        : taskPciInput
      const input = isTask ? activeTaskInput : assessmentPciInput
      const loading = isTask ? taskPciLoading : assessmentPciLoading
      if (!input.trim() || loading) return

      let taskId = loadedTaskId
      let assessmentId = loadedAssessmentId
      if (isTask && !taskId) {
        const created = autoCreateTask()
        taskId = created?.id ?? loadedTaskId
      }
      if (!isTask && !assessmentId) {
        const created = autoCreateAssessment()
        assessmentId = created?.id ?? loadedAssessmentId
      }

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
      } else {
        setAssessmentPciInput('')
      }

      const currentTaskMessages = taskBuilder.activeExtensionId
        ? taskExtensionPciMessages[taskBuilder.activeExtensionId] || []
        : taskPciMessages
      const nextMessages = (isTask ? currentTaskMessages : assessmentPciMessages).concat({
        role: 'user',
        content: userMessage,
      })
      const updateTaskPciFromMessages = (
        messages: { role: 'user' | 'assistant'; content: string }[]
      ) => {
        setTaskBuilder(prev => {
          if (prev.activeExtensionId) {
            return {
              ...prev,
              extensions: prev.extensions.map(ext =>
                ext.id === prev.activeExtensionId
                  ? { ...ext, pci: formatPciTranscript(messages) }
                  : ext
              ),
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
        const slideContent = isTask ? taskBuilder.taskContent : assessmentBuilder.taskContent
        const pci = isTask
          ? taskBuilder.activeExtensionId
            ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.pci ||
              taskBuilder.taskPci
            : taskBuilder.taskPci
          : assessmentBuilder.taskPci
        const sessionId = isTask
          ? taskId
            ? `pci-task:${taskId}`
            : undefined
          : assessmentId
            ? `pci-assessment:${assessmentId}`
            : undefined
        const extensionName =
          isTask && taskBuilder.activeExtensionId
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
          }),
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
        const assistantMessage = {
          role: 'assistant' as const,
          content: data.response || 'Unable to respond.',
        }
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
        const errorMessage = {
          role: 'assistant' as const,
          content: 'Sorry, there was an error processing your request. Please try again.',
        }
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
        } else {
          const updated = nextMessages.concat(errorMessage)
          setAssessmentPciMessages(updated)
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
      const pciContent =
        testPciSource === 'task'
          ? taskBuilder.activeExtensionId
            ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.pci ||
              taskBuilder.taskPci
            : taskBuilder.taskPci
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
        const gradingContent =
          testPciActiveTab === 'classroom'
            ? testPciContent.classroom
            : testPciContent[testPciActiveTab] || ''
        const prompt = `You are an AI grading assistant. Please evaluate the following student answer.

Question/Task Content:
${gradingContent || 'No content provided'}

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
            temperature: 0.3,
          }),
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
            newScores[tab] = [
              ...(newScores[tab] || []),
              { score, feedback: `Answer: ${answer}\n${feedback}` },
            ]
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
            newScores[tab] = [
              ...(newScores[tab] || []),
              {
                score: 0,
                feedback: `Answer: ${answer}\nError: Could not score - ${error instanceof Error ? error.message : 'Unknown error'}`,
              },
            ]
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

      lines.forEach(line => {
        const match = line.match(/^(?:Q(?:uestion)?\s*)?(\d+)[:.)\s]+(.+)$/i)
        if (match) {
          questionLines.push({
            number: parseInt(match[1]),
            text: match[2].trim(),
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
              text: firstLine,
            })
          }
        })
      }

      const items: DMIQuestion[] = questionLines.map(q => ({
        id: `dmi-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        questionNumber: q.number,
        questionText: q.text,
        answer: '',
      }))

      if (isTask) {
        setTaskDmiItems(items)
      } else {
        setAssessmentDmiItems(items)
      }

      toast.success('DMI form created from Slide content')
    }

    const handleDeployAssessmentDmi = useCallback(() => {
      if (!loadedAssessmentId) {
        toast.error('Select an assessment to deploy')
        return
      }
      if (!insightsProps?.sessionId) {
        toast.error('Select a course session for insights')
        return
      }

      const task: LiveTask = {
        id: loadedAssessmentId,
        title: assessmentBuilder.title || 'Assessment',
        content: assessmentBuilder.taskContent,
        source: 'assessment',
        dmiItems: assessmentDmiItems.map(item => ({
          id: item.id,
          questionNumber: item.questionNumber,
          questionText: item.questionText,
        })),
        deployedAt: Date.now(),
        polls: [],
        questions: [],
      }

      insightsProps.onDeployTask(task)
      toast.success('DMI deployed to live class')
    }, [assessmentBuilder, assessmentDmiItems, insightsProps, loadedAssessmentId])

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
      if (lastInitialModulesKeyRef.current === initialModulesKey) return
      lastInitialModulesKeyRef.current = initialModulesKey
      setModules(normalizeModulesForAssessments(resolvedInitialModules))
    }, [initialModulesKey, resolvedInitialModules])

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
      setCollapsedSections(prev => {
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

    const ensureSectionExpanded = (
      moduleId: string,
      section: 'task' | 'assessment' | 'homework'
    ) => {
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

      const newContent = DEFAULT_CONTENT(
        modules[moduleIndex].lessons[lessonIndex].content?.length || 0
      )
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
      const newAssessment = DEFAULT_HOMEWORK(
        modules[moduleIndex].lessons[lessonIndex].homework.length,
        'assessment'
      )
      const newModules = [...modules]
      newModules[moduleIndex].lessons[lessonIndex].homework.push(newAssessment)
      setModules(newModules)
      if (isFirstAssessment) ensureSectionExpanded(moduleId, 'assessment')
      // Just add to list without opening modal - same as addTask behavior
      toast.success('Assessment added')
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
      setActiveModal({
        type: 'moduleQuiz',
        isOpen: true,
        moduleId: workingModules[lastModuleIndex].id,
      })
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
      const newAssessment = DEFAULT_HOMEWORK(
        modules[moduleIndex].lessons[lessonIndex].homework.length,
        'assessment'
      )
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

    const applyTemplate = useCallback(
      (template: (typeof CONTENT_TEMPLATES)[number]) => {
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
      },
      [addAssessment, addModule, addTask, ensureFirstLessonContext]
    )

    // Drag & Drop handlers
    const handleDragStart = (event: DragStartEvent) => {
      setActiveDragId(event.active.id as string)
    }

    // Helper function to renumber module titles after reordering
    const renumberModules = (mods: Module[]): Module[] => {
      return mods.map((mod, idx) => ({
        ...mod,
        order: idx,
        title: mod.title.replace(/^Lesson \d+/, `Lesson ${idx + 1}`),
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

      // Drop onto Homework folder (move task/assessment to that lesson's homework)
      if (typeof overId === 'string' && overId.startsWith('drop-hw-')) {
        const rest = overId.slice('drop-hw-'.length)
        const sep = rest.indexOf('::')
        const targetModuleId = sep >= 0 ? rest.slice(0, sep) : rest
        const targetLessonId = sep >= 0 ? rest.slice(sep + 2) : ''
        if (targetModuleId && targetLessonId) {
          const taskLoc = findTaskLocation(activeId)
          const hwLoc = findHomeworkLocation(activeId)
          if (taskLoc) {
            const task = modules[taskLoc.mIdx].lessons[taskLoc.lIdx].tasks[taskLoc.taskIndex]
            moveToHomework(targetModuleId, targetLessonId, 'task', task)
            setModules(prev =>
              prev.map((mod, mIdx) => {
                if (mIdx !== taskLoc.mIdx) return mod
                return {
                  ...mod,
                  lessons: mod.lessons.map((les, lIdx) => {
                    if (lIdx !== taskLoc.lIdx) return les
                    return { ...les, tasks: les.tasks.filter(t => t.id !== activeId) }
                  }),
                }
              })
            )
            return
          }
          if (hwLoc) {
            const hw = modules[hwLoc.mIdx].lessons[hwLoc.lIdx].homework[hwLoc.hwIndex]
            moveToHomework(targetModuleId, targetLessonId, 'assessment', hw)
            setModules(prev =>
              prev.map((mod, mIdx) => {
                if (mIdx !== hwLoc.mIdx) return mod
                return {
                  ...mod,
                  lessons: mod.lessons.map((les, lIdx) => {
                    if (lIdx !== hwLoc.lIdx) return les
                    return { ...les, homework: les.homework.filter(h => h.id !== activeId) }
                  }),
                }
              })
            )
            return
          }
        }
      }

      // Drag from Homework to Tasks: convert homework (assessment) to task and add to target lesson's tasks
      if (typeof overId === 'string' && overId.startsWith('drop-task-')) {
        const rest = overId.slice('drop-task-'.length)
        const sep = rest.indexOf('::')
        const targetModuleId = sep >= 0 ? rest.slice(0, sep) : rest
        const targetLessonId = sep >= 0 ? rest.slice(sep + 2) : ''
        const hwLoc = findHomeworkLocation(activeId)
        if (hwLoc && targetModuleId && targetLessonId) {
          const hw = modules[hwLoc.mIdx].lessons[hwLoc.lIdx].homework[hwLoc.hwIndex]
          const newTask: Task = {
            id: `task-${generateId()}`,
            title: hw.title || 'Task',
            description: hw.description || '',
            instructions: hw.instructions || '',
            dmiItems: hw.dmiItems || [],
            estimatedMinutes: hw.estimatedMinutes ?? 15,
            points: hw.points ?? 10,
            submissionType: 'text',
            isAiGraded: false,
            difficultyMode: 'all',
          }
          const srcModId = modules[hwLoc.mIdx].id
          const srcLesId = modules[hwLoc.mIdx].lessons[hwLoc.lIdx].id
          setModules(prev =>
            prev.map(mod => {
              if (mod.id !== targetModuleId) {
                if (mod.id !== srcModId) return mod
                return {
                  ...mod,
                  lessons: mod.lessons.map(les =>
                    les.id === srcLesId
                      ? { ...les, homework: les.homework.filter(h => h.id !== activeId) }
                      : les
                  ),
                }
              }
              return {
                ...mod,
                lessons: mod.lessons.map(les => {
                  let next = les
                  if (les.id === srcLesId)
                    next = { ...next, homework: next.homework.filter(h => h.id !== activeId) }
                  if (les.id === targetLessonId)
                    next = { ...next, tasks: [...(next.tasks || []), newTask] }
                  return next
                }),
              }
            })
          )
          if (loadedAssessmentId === activeId) {
            setLoadedAssessmentId(null)
            setSelectedItem({ type: 'task', id: newTask.id })
            loadTaskIntoBuilder(newTask, null)
            setMainBuilderTab('task')
          }
          toast.success('Moved to tasks')
          return
        }
      }

      // Drag from Homework to Assessments: move homework item to target lesson as assessment (category !== homework)
      if (typeof overId === 'string' && overId.startsWith('drop-assessment-')) {
        const rest = overId.slice('drop-assessment-'.length)
        const sep = rest.indexOf('::')
        const targetModuleId = sep >= 0 ? rest.slice(0, sep) : rest
        const targetLessonId = sep >= 0 ? rest.slice(sep + 2) : ''
        const hwLoc = findHomeworkLocation(activeId)
        if (hwLoc && targetModuleId && targetLessonId) {
          const hw = modules[hwLoc.mIdx].lessons[hwLoc.lIdx].homework[hwLoc.hwIndex]
          const asAssessment = {
            ...cloneAssessment(hw),
            category: 'assessment' as const,
            id: `a-${generateId()}`,
          }
          setModules(prev =>
            prev.map(mod => {
              if (mod.id === modules[hwLoc.mIdx].id) {
                return {
                  ...mod,
                  lessons: mod.lessons.map((les, lIdx) =>
                    lIdx === hwLoc.lIdx
                      ? { ...les, homework: les.homework.filter(h => h.id !== activeId) }
                      : les
                  ),
                }
              }
              if (mod.id !== targetModuleId) return mod
              return {
                ...mod,
                lessons: mod.lessons.map(les =>
                  les.id !== targetLessonId
                    ? les
                    : { ...les, homework: [...(les.homework || []), asAssessment] }
                ),
              }
            })
          )
          if (loadedAssessmentId === activeId) {
            setSelectedItem({ type: 'homework', id: asAssessment.id })
            loadAssessmentIntoBuilder(asAssessment)
          }
          toast.success('Moved to assessments')
          return
        }
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
            title: lesson.title.replace(/^Lesson \d+/, `Lesson ${idx + 1}`),
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
        if (
          targetLesson &&
          (taskSource.mIdx !== targetLesson.mIdx || taskSource.lIdx !== targetLesson.lIdx)
        ) {
          const newModules = [...modules]
          const sourceTasks = newModules[taskSource.mIdx].lessons[taskSource.lIdx].tasks
          const [movedTask] = sourceTasks.splice(taskSource.taskIndex, 1)
          const targetTasks = newModules[targetLesson.mIdx].lessons[targetLesson.lIdx].tasks
          const insertIndex = targetTaskLocation
            ? targetTasks.findIndex(t => t.id === overId)
            : targetTasks.length
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
        if (
          targetLesson &&
          (hwSource.mIdx !== targetLesson.mIdx || hwSource.lIdx !== targetLesson.lIdx)
        ) {
          const newModules = [...modules]
          const sourceHomework = newModules[hwSource.mIdx].lessons[hwSource.lIdx].homework
          const [movedHw] = sourceHomework.splice(hwSource.hwIndex, 1)
          const targetHomework = newModules[targetLesson.mIdx].lessons[targetLesson.lIdx].homework
          const insertIndex = targetHwLocation
            ? targetHomework.findIndex(h => h.id === overId)
            : targetHomework.length
          targetHomework.splice(
            insertIndex === -1 ? targetHomework.length : insertIndex,
            0,
            movedHw
          )
          setModules(newModules)
          return
        }
      }
    }

    // Save handlers
    const handleSaveModule = (data: any) => {
      if (activeModal.itemId) {
        setModules(modules.map(m => (m.id === activeModal.itemId ? { ...m, ...data } : m)))
      } else {
        setModules(modules.map(m => (m.id === editingData.id ? { ...m, ...data } : m)))
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
          ...data,
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
      const taskIndex = newModules[moduleIndex].lessons[lessonIndex].tasks.findIndex(
        t => t.id === editingData?.id
      )
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
      const lessonIndex = modules[moduleIndex]?.lessons.findIndex(
        l => l.id === activeModal.lessonId
      )
      if (moduleIndex === -1 || lessonIndex === -1) return

      const newModules = [...modules]
      const contentIndex = newModules[moduleIndex].lessons[lessonIndex].content?.findIndex(
        c => c.id === editingData?.id
      )
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
      const hwIndex = newModules[moduleIndex].lessons[lessonIndex].homework.findIndex(
        h => h.id === editingData?.id
      )
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
      const lessonIndex = modules[moduleIndex]?.lessons.findIndex(
        l => l.id === activeModal.lessonId
      )
      if (moduleIndex === -1 || lessonIndex === -1) return

      const newModules = [...modules]
      if (!newModules[moduleIndex].lessons[lessonIndex].worksheets) {
        newModules[moduleIndex].lessons[lessonIndex].worksheets = []
      }
      const worksheetIndex = newModules[moduleIndex].lessons[lessonIndex].worksheets.findIndex(
        w => w.id === editingData.id
      )
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
      const quizIndex = newModules[moduleIndex].moduleQuizzes.findIndex(
        q => q.id === editingData.id
      )
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
      setModules(
        modules.map(m =>
          m.id === moduleId ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) } : m
        )
      )
      toast.success('Lesson deleted')
    }

    const deleteTask = (moduleId: string, lessonId: string, taskId: string) => {
      setModules(
        modules.map(m =>
          m.id === moduleId
            ? {
                ...m,
                lessons: m.lessons.map(l =>
                  l.id === lessonId
                    ? { ...l, tasks: (l.tasks || []).filter(t => t.id !== taskId) }
                    : l
                ),
              }
            : m
        )
      )
      setSelectedItem(null)
      toast.success('Task removed')
    }

    const deleteAssessment = (moduleId: string, lessonId: string, hwId: string) => {
      setModules(
        modules.map(m =>
          m.id === moduleId
            ? {
                ...m,
                lessons: m.lessons.map(l =>
                  l.id === lessonId
                    ? { ...l, homework: (l.homework || []).filter(h => h.id !== hwId) }
                    : l
                ),
              }
            : m
        )
      )
      setSelectedItem(null)
      toast.success('Assessment removed')
    }

    const deleteModuleQuiz = (moduleId: string, quizId: string) => {
      setModules(
        modules.map(m =>
          m.id === moduleId
            ? { ...m, moduleQuizzes: (m.moduleQuizzes || []).filter(q => q.id !== quizId) }
            : m
        )
      )
      setSelectedItem(null)
      toast.success('Exam removed')
    }

    const duplicateTask = (moduleId: string, lessonId: string, task: Task) => {
      const copy: Task = {
        ...task,
        id: `task-${generateId()}`,
        title: `${task.title} (copy)`,
        questions: task.questions?.map(q => ({ ...q, id: `q-${generateId()}` })),
      }
      const moduleIndex = modules.findIndex(m => m.id === moduleId)
      if (moduleIndex === -1) return
      const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
      if (lessonIndex === -1) return
      const newModules = [...modules]
      newModules[moduleIndex].lessons[lessonIndex].tasks = [
        ...(newModules[moduleIndex].lessons[lessonIndex].tasks || []),
        copy,
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
        questions: hw.questions?.map(q => ({ ...q, id: `q-${generateId()}` })),
      }
      const moduleIndex = modules.findIndex(m => m.id === moduleId)
      if (moduleIndex === -1) return
      const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
      if (lessonIndex === -1) return
      const newModules = [...modules]
      newModules[moduleIndex].lessons[lessonIndex].homework = [
        ...(newModules[moduleIndex].lessons[lessonIndex].homework || []),
        copy,
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
        questions: quiz.questions?.map(q => ({ ...q, id: `q-${generateId()}` })),
      }
      const moduleIndex = modules.findIndex(m => m.id === moduleId)
      if (moduleIndex === -1) return
      const newModules = [...modules]
      newModules[moduleIndex].moduleQuizzes = [
        ...(newModules[moduleIndex].moduleQuizzes || []),
        copy,
      ]
      setModules(newModules)
      setSelectedItem({ type: 'moduleQuiz', id: copy.id })
      toast.success('Exam duplicated')
    }

    const deleteWorksheet = (moduleId: string, lessonId: string, worksheetId: string) => {
      setModules(
        modules.map(m =>
          m.id === moduleId
            ? {
                ...m,
                lessons: m.lessons.map(l =>
                  l.id === lessonId
                    ? { ...l, worksheets: (l.worksheets || []).filter(w => w.id !== worksheetId) }
                    : l
                ),
              }
            : m
        )
      )
      setSelectedItem(null)
      toast.success('Worksheet removed')
    }

    const duplicateWorksheet = (moduleId: string, lessonId: string, worksheet: Worksheet) => {
      const copy: Worksheet = {
        ...worksheet,
        id: `worksheet-${generateId()}`,
        title: `${worksheet.title} (copy)`,
        questions: worksheet.questions?.map(q => ({ ...q, id: `q-${generateId()}` })),
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
        copy,
      ]
      setModules(newModules)
      setSelectedItem({ type: 'worksheet', id: copy.id })
      toast.success('Worksheet duplicated')
    }

    const getAllLessons = () => {
      return modules.flatMap(m => m.lessons)
    }

    // File upload handlers for Media and Docs
    const handleMediaUpload = (
      moduleId: string,
      lessonId: string,
      files: FileList | null,
      type: 'video' | 'image'
    ) => {
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
            duration: 0,
          })
        } else {
          newModules[moduleIndex].lessons[lessonIndex].media.images.push({
            id: `image-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
            title: file.name,
            url: trackObjectUrl(URL.createObjectURL(file)),
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
        const docType =
          ext === 'pdf'
            ? 'pdf'
            : ext === 'doc' || ext === 'docx'
              ? 'doc'
              : ext === 'ppt' || ext === 'pptx'
                ? 'ppt'
                : 'other'

        newModules[moduleIndex].lessons[lessonIndex].docs.push({
          id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
          title: file.name,
          url: trackObjectUrl(URL.createObjectURL(file)),
          type: docType,
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
      setModules(prev =>
        prev.map(module => {
          if (module.id !== moduleId) return module
          return {
            ...module,
            lessons: module.lessons.map(lesson => {
              if (lesson.id !== lessonId) return lesson
              return {
                ...lesson,
                media: {
                  ...lesson.media,
                  videos:
                    mediaType === 'video'
                      ? (lesson.media?.videos || []).filter(v => v.id !== mediaId)
                      : lesson.media?.videos || [],
                  images:
                    mediaType === 'image'
                      ? (lesson.media?.images || []).filter(i => i.id !== mediaId)
                      : lesson.media?.images || [],
                },
              }
            }),
          }
        })
      )
    }

    const handleDeleteAssetDoc = (docId: string) => {
      const { moduleId, lessonId } = ensureFirstLessonContext()
      setModules(prev =>
        prev.map(module => {
          if (module.id !== moduleId) return module
          return {
            ...module,
            lessons: module.lessons.map(lesson => {
              if (lesson.id !== lessonId) return lesson
              return {
                ...lesson,
                docs: (lesson.docs || []).filter(doc => doc.id !== docId),
              }
            }),
          }
        })
      )
    }

    const getAssetIcon = (name: string) => {
      const ext = name.split('.').pop()?.toLowerCase() || ''
      if (['doc', 'docx'].includes(ext)) return <FileText className="h-4 w-4 text-blue-600" />
      if (['pdf'].includes(ext)) return <FileText className="h-4 w-4 text-red-600" />
      if (['xls', 'xlsx', 'csv'].includes(ext))
        return <FileText className="h-4 w-4 text-green-600" />
      if (['ppt', 'pptx'].includes(ext)) return <FileText className="h-4 w-4 text-orange-600" />
      if (['png', 'jpg', 'jpeg', 'gif'].includes(ext))
        return <FileText className="h-4 w-4 text-purple-600" />
      if (['mp4', 'mov', 'webm'].includes(ext))
        return <FileText className="h-4 w-4 text-pink-600" />
      return <FileText className="h-4 w-4 text-slate-500" />
    }

    const handleDragFiles = async (
      e: React.DragEvent<HTMLTextAreaElement>,
      onText: (t: string) => void
    ) => {
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
      <div className="mt-4 rounded-md border">
        <div
          className="flex cursor-pointer items-center justify-between border-b bg-slate-100 p-2"
          onClick={() => setAssetsOpen(!assetsOpen)}
        >
          <span className="flex items-center gap-1 text-xs font-semibold">
            <FolderOpen className="h-3 w-3" /> Assets
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
                        content: textContent,
                      }
                    })
                  )
                  setCourseAssets(prev => [...prev, ...newAssets])
                  if (files.length > 0) toast.success(`${files.length} asset(s) imported`)
                  e.target.value = ''
                }}
              />
              <span className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                <Upload className="h-3 w-3" /> Upload Asset
              </span>
            </label>
          </div>
        </div>
        {assetsOpen && (
          <div className="flex min-h-[50px] flex-col gap-2 rounded-b-md bg-white p-2">
            {courseAssets.length === 0 ? (
              <p className="w-full py-2 text-center text-xs text-muted-foreground">
                No assets imported.
              </p>
            ) : (
              courseAssets.map(asset => (
                <div
                  key={asset.id}
                  draggable
                  onDragStart={(e: any) => {
                    e.dataTransfer.setData('text/plain', `[Asset: ${asset.name}]`)
                    e.dataTransfer.effectAllowed = 'copy'
                  }}
                  className="flex cursor-grab items-center justify-between rounded border border-slate-400 bg-white px-2 py-2 text-xs shadow-sm transition-colors hover:bg-slate-50"
                  title="Drag or load into editor"
                >
                  <div className="mr-2 flex flex-1 items-center gap-2 overflow-hidden">
                    {getAssetIcon(asset.name)}
                    <span
                      className="flex-1 cursor-text truncate font-medium"
                      onDoubleClick={() => {
                        const newName = prompt('Rename asset:', asset.name)
                        if (newName && newName.trim() !== '') {
                          setCourseAssets(prev =>
                            prev.map(a => (a.id === asset.id ? { ...a, name: newName.trim() } : a))
                          )
                        }
                      }}
                      title="Double click to rename"
                    >
                      {asset.name}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 text-[10px]"
                      onClick={() => handleLoadAsset(asset)}
                      title="Load into builder text area"
                    >
                      Load
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        setCourseAssets(prev => prev.filter(a => a.id !== asset.id))
                      }}
                      title="Delete asset"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <Dialog open={loadAsModalOpen} onOpenChange={setLoadAsModalOpen}>
          <DialogContent className="rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Load as...</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <p className="text-sm text-gray-500">
                Select how you would like to load "{assetToLoad?.name}":
              </p>
              <Button
                className="w-full justify-start gap-2"
                variant="outline"
                onClick={() => {
                  const { moduleId, lessonId } = ensureFirstLessonContext()
                  const moduleIndex = modules.findIndex(m => m.id === moduleId)
                  const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
                  const newTask = DEFAULT_TASK(
                    modules[moduleIndex].lessons[lessonIndex].tasks.length
                  )
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
                }}
              >
                <ListTodo className="h-4 w-4 text-orange-500" />
                Task
              </Button>
              <Button
                className="w-full justify-start gap-2"
                variant="outline"
                onClick={() => {
                  const textToInsert = assetToLoad?.content || `[Asset: ${assetToLoad?.name}]`
                  if (taskBuilder.activeExtensionId) {
                    setTaskBuilder(prev => ({
                      ...prev,
                      extensions: prev.extensions.map(ext =>
                        ext.id === prev.activeExtensionId ? { ...ext, content: textToInsert } : ext
                      ),
                    }))
                    if (loadedTaskId) {
                      setModules(prev =>
                        prev.map(mod => ({
                          ...mod,
                          lessons: mod.lessons.map(lesson => ({
                            ...lesson,
                            tasks: lesson.tasks.map(t =>
                              t.id === loadedTaskId
                                ? {
                                    ...t,
                                    extensions: (t.extensions || []).map(ext =>
                                      ext.id === taskBuilder.activeExtensionId
                                        ? { ...ext, content: textToInsert }
                                        : ext
                                    ),
                                  }
                                : t
                            ),
                          })),
                        }))
                      )
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
                    pci: '',
                  }
                  setTaskExtensionPciMessages(prev => ({ ...prev, [newExtension.id]: [] }))
                  setTaskExtensionPciInputs(prev => ({ ...prev, [newExtension.id]: '' }))
                  setTaskBuilder(prev => ({
                    ...prev,
                    extensions: [...prev.extensions, newExtension],
                    activeExtensionId: newExtension.id,
                  }))
                  setModules(prev =>
                    prev.map(mod => ({
                      ...mod,
                      lessons: mod.lessons.map(lesson => ({
                        ...lesson,
                        tasks: lesson.tasks.map(t =>
                          t.id === loadedTaskId
                            ? { ...t, extensions: [...(t.extensions || []), newExtension] }
                            : t
                        ),
                      })),
                    }))
                  )
                  setMainBuilderTab('task')
                  toast.success(`Created extension and loaded '${assetToLoad?.name}'`)
                  setLoadAsModalOpen(false)
                  setAssetToLoad(null)
                }}
              >
                <Layers2 className="h-4 w-4 text-orange-500" />
                Extensions
              </Button>
              <Button
                className="w-full justify-start gap-2"
                variant="outline"
                onClick={() => {
                  const { moduleId, lessonId } = ensureFirstLessonContext()
                  const moduleIndex = modules.findIndex(m => m.id === moduleId)
                  const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId)
                  const newAssess = DEFAULT_HOMEWORK(
                    modules[moduleIndex].lessons[lessonIndex].homework.length,
                    'assessment'
                  )
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
                }}
              >
                <FileQuestion className="h-4 w-4 text-purple-500" />
                Assessment
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

      setModules(prev =>
        prev.map(mod => {
          if (mod.id !== target.moduleId) return mod
          return {
            ...mod,
            lessons: mod.lessons.map(lesson => {
              if (lesson.id !== target.lessonId) return lesson
              if (selectedItem.type === 'task') {
                const taskUpdates = updates as Partial<Task>
                return {
                  ...lesson,
                  tasks: lesson.tasks.map(task =>
                    task.id === selectedItem.id ? { ...task, ...taskUpdates } : task
                  ),
                }
              }
              if (selectedItem.type === 'homework') {
                const homeworkUpdates = updates as Partial<Assessment>
                return {
                  ...lesson,
                  homework: lesson.homework.map(hw =>
                    hw.id === selectedItem.id ? { ...hw, ...homeworkUpdates } : hw
                  ),
                }
              }
              if (selectedItem.type === 'worksheet') {
                const worksheetUpdates = updates as Partial<Worksheet>
                return {
                  ...lesson,
                  worksheets: (lesson.worksheets || []).map(ws =>
                    ws.id === selectedItem.id ? { ...ws, ...worksheetUpdates } : ws
                  ),
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
      ? taskExtensionPciMessages[taskBuilder.activeExtensionId] || []
      : taskPciMessages
    const activeTaskPciInput = taskBuilder.activeExtensionId
      ? taskExtensionPciInputs[taskBuilder.activeExtensionId] || ''
      : taskPciInput
    const taskHeaderTitle = activeTaskExtension
      ? `${taskBuilder.title || 'Task'} ${activeTaskExtension.name}`
      : taskBuilder.title || 'Task'
    const taskHeaderDescription = activeTaskExtension
      ? activeTaskExtension.description || 'Add a short description'
      : taskBuilder.details || 'Add a short description'

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

    const leftResizeStartX = useRef(0)
    const leftResizeStartW = useRef(280)
    useEffect(() => {
      if (!leftPanelResizing) return
      const onMove = (e: MouseEvent) => {
        const delta = e.clientX - leftResizeStartX.current
        const newW = Math.max(200, Math.min(500, leftResizeStartW.current + delta))
        setLeftPanelWidth(newW)
      }
      const onUp = () => setLeftPanelResizing(false)
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
      return () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
      }
    }, [leftPanelResizing])

    return (
      <div
        className={cn(
          'flex h-full w-full flex-col items-stretch space-y-4',
          panelMode === 'live-class' && 'pt-3'
        )}
      >
        <div className="flex h-full w-full min-w-0 flex-1 gap-0">
          {/* LEFT PANEL - Course Structure (resizable, ~75% of original width) */}
          {!leftPanelHidden && (
            <>
              <div
                ref={leftPanelRef}
                style={{ width: leftPanelWidth }}
                className="flex min-h-0 shrink-0 flex-col"
              >
                <Card className="flex h-full min-h-0 flex-1 flex-col rounded-2xl border border-border bg-card shadow-xl ring-1 ring-black/5">
                  {!lessonBankMode && (
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-end">
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
                  )}
                  <CardContent className="flex flex-1 flex-col pt-0">
                    <ScrollArea className="flex-1">
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="space-y-1">
                          {/* Course Root */}
                          <div className="mb-2 flex items-center justify-between border-b py-2 text-sm font-semibold">
                            <div className="flex items-center gap-2">
                              {!lessonBankMode && (
                                <GraduationCap className="h-4 w-4 text-blue-600" />
                              )}
                              {!lessonBankMode && !insightsProps && (
                                <span className="truncate">{courseName || 'Course'}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {!lessonBankMode && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    // Open lesson bank import
                                    const bankModules = loadLessonBankModules()
                                    if (bankModules.length === 0) {
                                      toast.error(
                                        'No lesson bank content found. Build lessons in the Lesson Bank first.'
                                      )
                                      return
                                    }
                                    setLessonBankModules(bankModules)
                                    const firstLesson = bankModules[0]?.lessons?.[0]
                                    if (firstLesson) {
                                      setLessonBankLessonKey(
                                        `${bankModules[0].id}:${firstLesson.id}`
                                      )
                                    } else {
                                      setLessonBankLessonKey('')
                                    }

                                    // If no lessons exist, skip the lesson selector and open import modal directly
                                    // The import modal will handle auto-creating a lesson for task/assessment/homework imports
                                    if (modules.length === 0) {
                                      setImportTarget(null) // No specific target, will auto-create
                                      setLessonBankImportOpen(true)
                                    } else {
                                      setImportLessonSelectorOpen(true)
                                    }
                                  }}
                                  className="h-6 gap-1 text-xs"
                                >
                                  <FolderOpen className="h-3 w-3" />
                                  Import
                                </Button>
                              )}
                              <Button size="sm" onClick={addModule} className="h-6 gap-1 text-xs">
                                <Plus className="h-3 w-3" />
                                Lesson
                              </Button>
                              {lessonBankMode && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => setLeftPanelHidden(true)}
                                  title="Hide panel"
                                  aria-label="Hide panel"
                                >
                                  <ChevronLeftIcon className="h-4 w-4" />
                                </Button>
                              )}
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
                              const assessments = (primaryLesson.homework || []).filter(
                                h => h.category !== 'homework'
                              )
                              const totalItems = taskCount + assessments.length
                              return (
                                <SortableTreeItem
                                  key={module.id}
                                  id={module.id}
                                  depth={1}
                                  isLast={moduleIdx === modules.length - 1}
                                  inlineDragHandle
                                >
                                  <div className="group">
                                    <div
                                      className={cn(
                                        'flex cursor-pointer flex-wrap items-center gap-1.5 rounded px-2 py-1.5 transition-colors',
                                        'border border-blue-400 bg-blue-50 hover:bg-blue-100'
                                      )}
                                      onClick={() => toggleModule(module.id)}
                                    >
                                      {expandedModules.has(module.id) ? (
                                        <ChevronDown className="h-3 w-3 text-blue-600" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3 text-blue-600" />
                                      )}
                                      <Layers className="h-3 w-3 text-blue-600" />
                                      <span
                                        className="group/tooltip relative max-w-[120px] truncate text-sm font-medium"
                                        title={module.title}
                                      >
                                        {module.title}
                                        {/* Custom Tooltip */}
                                        <span className="absolute -top-8 left-0 z-50 hidden whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover/tooltip:block">
                                          {module.title}
                                          <span className="absolute left-4 top-full border-4 border-transparent border-t-gray-900"></span>
                                        </span>
                                      </span>
                                      <span className="text-blue-400">:</span>
                                      <div className="flex-1" />
                                      <Badge
                                        variant="secondary"
                                        className="h-4 shrink-0 text-[10px]"
                                      >
                                        {totalItems}
                                      </Badge>

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
                                        {/* Tasks - droppable so homework can be moved here */}
                                        <TreeItem depth={2} isLast={false}>
                                          <DroppableTaskZone
                                            moduleId={module.id}
                                            lessonId={primaryLesson.id}
                                            className="flex items-center gap-1.5 rounded-lg border-b-4 border-orange-600 bg-gradient-to-r from-orange-400 to-orange-500 px-3 py-2 shadow-md transition-all active:translate-y-1 active:border-b-0"
                                          >
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-5 w-5 hover:bg-white/20"
                                              onClick={() => toggleSection(module.id, 'task')}
                                              aria-label={
                                                isSectionCollapsed(module.id, 'task')
                                                  ? 'Expand tasks'
                                                  : 'Collapse tasks'
                                              }
                                            >
                                              {isSectionCollapsed(module.id, 'task') ? (
                                                <ChevronRight className="h-4 w-4 text-white" />
                                              ) : (
                                                <ChevronDown className="h-4 w-4 text-white" />
                                              )}
                                            </Button>
                                            <span className="text-xs font-bold tracking-wide text-white drop-shadow-sm">
                                              Tasks
                                            </span>
                                            <Button
                                              variant="secondary"
                                              size="sm"
                                              className="ml-auto h-6 gap-1 px-2 text-[10px] font-bold text-orange-600 shadow-sm hover:bg-orange-50"
                                              onClick={() => addTask(module.id, primaryLesson.id)}
                                            >
                                              <Plus className="h-3 w-3" />
                                              Task
                                            </Button>
                                          </DroppableTaskZone>
                                        </TreeItem>
                                        {!isSectionCollapsed(module.id, 'task') && (
                                          <>
                                            <SortableContext
                                              items={primaryLesson.tasks?.map(t => t.id) || []}
                                              strategy={verticalListSortingStrategy}
                                            >
                                              {(primaryLesson.tasks || []).map((task, idx) => (
                                                <div key={task.id} className="contents">
                                                  <SortableTreeItem
                                                    id={task.id}
                                                    depth={2}
                                                    isLast={
                                                      idx === (primaryLesson.tasks?.length || 0) - 1
                                                    }
                                                  >
                                                    <div
                                                      className={cn(
                                                        'group/item flex cursor-pointer items-center gap-1.5 rounded border px-2 py-1 transition-colors',
                                                        selectedItem?.type === 'task' &&
                                                          selectedItem?.id === task.id
                                                          ? 'border-orange-400 bg-orange-200 ring-1 ring-orange-400'
                                                          : 'border-orange-400 bg-orange-50 hover:bg-orange-100'
                                                      )}
                                                      onClick={e => {
                                                        if (
                                                          (e.target as HTMLElement).closest('input')
                                                        )
                                                          return
                                                        // Auto-save current assessment if switching from one
                                                        if (loadedAssessmentId) {
                                                          setModules(prev =>
                                                            prev.map(mod => ({
                                                              ...mod,
                                                              lessons: mod.lessons.map(lesson => ({
                                                                ...lesson,
                                                                homework: lesson.homework.map(hw =>
                                                                  hw.id === loadedAssessmentId
                                                                    ? {
                                                                        ...hw,
                                                                        title:
                                                                          assessmentBuilder.title,
                                                                        description:
                                                                          assessmentBuilder.taskContent,
                                                                        instructions:
                                                                          assessmentBuilder.taskPci,
                                                                        dmiItems:
                                                                          assessmentDmiItems,
                                                                        sourceDocument:
                                                                          hw.sourceDocument,
                                                                      }
                                                                    : hw
                                                                ),
                                                              })),
                                                            }))
                                                          )
                                                        }
                                                        // Auto-save current task if switching from another task
                                                        if (
                                                          loadedTaskId &&
                                                          loadedTaskId !== task.id
                                                        ) {
                                                          setModules(prev =>
                                                            prev.map(mod => ({
                                                              ...mod,
                                                              lessons: mod.lessons.map(lesson => ({
                                                                ...lesson,
                                                                tasks: lesson.tasks.map(t =>
                                                                  t.id === loadedTaskId
                                                                    ? {
                                                                        ...t,
                                                                        title: taskBuilder.title,
                                                                        description:
                                                                          taskBuilder.taskContent,
                                                                        instructions:
                                                                          taskBuilder.taskPci,
                                                                        extensions:
                                                                          taskBuilder.extensions,
                                                                        dmiItems: taskDmiItems,
                                                                        sourceDocument:
                                                                          t.sourceDocument,
                                                                      }
                                                                    : t
                                                                ),
                                                              })),
                                                            }))
                                                          )
                                                        }
                                                        setSelectedItem({
                                                          type: 'task',
                                                          id: task.id,
                                                        })
                                                        loadTaskIntoBuilder(task)
                                                        setMainBuilderTab('task')
                                                      }}
                                                    >
                                                      <ListTodo className="h-3 w-3 shrink-0 text-orange-500" />
                                                      <span className="shrink-0 text-[10px] font-semibold text-orange-700">
                                                        {idx + 1}. {task.title}:
                                                      </span>
                                                      <div className="flex-1" />
                                                      <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                          <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-5 w-5 opacity-0 group-hover/item:opacity-100"
                                                            onClick={e => e.stopPropagation()}
                                                          >
                                                            <MoreVertical className="h-3 w-3 text-slate-500" />
                                                          </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                          {!lessonBankMode && (
                                                            <>
                                                              <DropdownMenuItem
                                                                onClick={e => {
                                                                  e.stopPropagation()
                                                                  moveToHomework(
                                                                    module.id,
                                                                    primaryLesson.id,
                                                                    'task',
                                                                    task
                                                                  )
                                                                }}
                                                              >
                                                                Move to homework
                                                              </DropdownMenuItem>
                                                              <DropdownMenuItem
                                                                onClick={e => {
                                                                  e.stopPropagation()
                                                                  setEditingData(task)
                                                                  setActiveModal({
                                                                    type: 'task',
                                                                    isOpen: true,
                                                                    moduleId: module.id,
                                                                    lessonId: primaryLesson.id,
                                                                    itemId: task.id,
                                                                  })
                                                                }}
                                                              >
                                                                Edit
                                                              </DropdownMenuItem>
                                                            </>
                                                          )}
                                                          <DropdownMenuItem
                                                            className="text-red-500"
                                                            onClick={e => {
                                                              e.stopPropagation()
                                                              if (
                                                                !confirm(`Delete "${task.title}"?`)
                                                              )
                                                                return
                                                              deleteTask(
                                                                module.id,
                                                                primaryLesson.id,
                                                                task.id
                                                              )
                                                            }}
                                                          >
                                                            Delete
                                                          </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                      </DropdownMenu>
                                                    </div>
                                                  </SortableTreeItem>
                                                  {loadedTaskId === task.id &&
                                                    taskBuilder.extensions.length > 0 && (
                                                      <div className="ml-8 mt-1 space-y-1 border-l border-orange-400 pl-3">
                                                        <div
                                                          className="flex cursor-pointer items-center gap-2 rounded border bg-white px-2 py-1 text-[10px]"
                                                          onClick={() => toggleExtensions(task.id)}
                                                        >
                                                          {isExtensionsCollapsed(task.id) ? (
                                                            <ChevronRight className="h-3 w-3 text-orange-600" />
                                                          ) : (
                                                            <ChevronDown className="h-3 w-3 text-orange-600" />
                                                          )}
                                                          <FolderOpen className="h-3 w-3 text-orange-600" />
                                                          <span className="font-semibold text-orange-700">
                                                            Extensions
                                                          </span>
                                                          <span className="text-muted-foreground">
                                                            ({taskBuilder.extensions.length})
                                                          </span>
                                                        </div>
                                                        {!isExtensionsCollapsed(task.id) && (
                                                          <div className="ml-3 space-y-1">
                                                            {taskBuilder.extensions.map(
                                                              (ext, extIdx) => (
                                                                <div
                                                                  key={ext.id}
                                                                  className={cn(
                                                                    'group/extension flex cursor-pointer items-center gap-2 rounded border px-2 py-1 text-[10px]',
                                                                    taskBuilder.activeExtensionId ===
                                                                      ext.id
                                                                      ? 'border-orange-300 bg-orange-100'
                                                                      : 'border-orange-100 bg-white hover:bg-orange-50'
                                                                  )}
                                                                  onClick={() => {
                                                                    setSelectedItem({
                                                                      type: 'task',
                                                                      id: task.id,
                                                                    })
                                                                    loadTaskIntoBuilder(
                                                                      task,
                                                                      ext.id
                                                                    )
                                                                    setMainBuilderTab('task')
                                                                  }}
                                                                >
                                                                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                                                                  <span className="font-semibold text-orange-700">
                                                                    {idx + 1}.{extIdx + 1}
                                                                  </span>
                                                                  <span className="flex-1 truncate text-muted-foreground">
                                                                    {ext.name}
                                                                  </span>
                                                                  {!lessonBankMode && (
                                                                    <Button
                                                                      variant="ghost"
                                                                      size="sm"
                                                                      className="h-5 gap-1 px-1 text-[10px] opacity-0 group-hover/extension:opacity-100"
                                                                      onClick={(e: any) => {
                                                                        e.stopPropagation()
                                                                        setQuestionBankTarget(
                                                                          `extension-${ext.id}`
                                                                        )
                                                                        setQuestionBankOpen(true)
                                                                      }}
                                                                    >
                                                                      Import
                                                                    </Button>
                                                                  )}
                                                                  <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-5 w-5 opacity-0 group-hover/extension:opacity-100"
                                                                    onClick={(e: any) => {
                                                                      e.stopPropagation()
                                                                      if (
                                                                        !confirm(
                                                                          `Delete "${ext.name}"?`
                                                                        )
                                                                      )
                                                                        return
                                                                      setTaskExtensionPciMessages(
                                                                        prev => {
                                                                          const next = { ...prev }
                                                                          delete next[ext.id]
                                                                          return next
                                                                        }
                                                                      )
                                                                      setTaskExtensionPciInputs(
                                                                        prev => {
                                                                          const next = { ...prev }
                                                                          delete next[ext.id]
                                                                          return next
                                                                        }
                                                                      )
                                                                      setTaskBuilder(prev => ({
                                                                        ...prev,
                                                                        extensions:
                                                                          prev.extensions.filter(
                                                                            e => e.id !== ext.id
                                                                          ),
                                                                        activeExtensionId:
                                                                          prev.activeExtensionId ===
                                                                          ext.id
                                                                            ? null
                                                                            : prev.activeExtensionId,
                                                                      }))
                                                                      if (loadedTaskId) {
                                                                        setModules(prev =>
                                                                          prev.map(mod => ({
                                                                            ...mod,
                                                                            lessons:
                                                                              mod.lessons.map(
                                                                                lesson => ({
                                                                                  ...lesson,
                                                                                  tasks:
                                                                                    lesson.tasks.map(
                                                                                      t =>
                                                                                        t.id ===
                                                                                        loadedTaskId
                                                                                          ? {
                                                                                              ...t,
                                                                                              extensions:
                                                                                                (
                                                                                                  t.extensions ||
                                                                                                  []
                                                                                                ).filter(
                                                                                                  e =>
                                                                                                    e.id !==
                                                                                                    ext.id
                                                                                                ),
                                                                                            }
                                                                                          : t
                                                                                    ),
                                                                                })
                                                                              ),
                                                                          }))
                                                                        )
                                                                      }
                                                                    }}
                                                                  >
                                                                    <Trash2 className="h-3 w-3 text-red-500" />
                                                                  </Button>
                                                                </div>
                                                              )
                                                            )}
                                                          </div>
                                                        )}
                                                      </div>
                                                    )}
                                                </div>
                                              ))}
                                            </SortableContext>
                                          </>
                                        )}

                                        {/* Assessments - droppable so homework can be moved here */}
                                        <TreeItem depth={2} isLast={false}>
                                          <DroppableAssessmentZone
                                            moduleId={module.id}
                                            lessonId={primaryLesson.id}
                                            className="flex items-center gap-1.5 rounded-lg border-b-4 border-purple-600 bg-gradient-to-r from-purple-400 to-purple-500 px-3 py-2 shadow-md transition-all active:translate-y-1 active:border-b-0"
                                          >
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-5 w-5 hover:bg-white/20"
                                              onClick={() => toggleSection(module.id, 'assessment')}
                                              aria-label={
                                                isSectionCollapsed(module.id, 'assessment')
                                                  ? 'Expand assessments'
                                                  : 'Collapse assessments'
                                              }
                                            >
                                              {isSectionCollapsed(module.id, 'assessment') ? (
                                                <ChevronRight className="h-4 w-4 text-white" />
                                              ) : (
                                                <ChevronDown className="h-4 w-4 text-white" />
                                              )}
                                            </Button>
                                            <span className="text-xs font-bold tracking-wide text-white drop-shadow-sm">
                                              Assessments
                                            </span>
                                            <Button
                                              variant="secondary"
                                              size="sm"
                                              className="ml-auto h-6 gap-1 px-2 text-[10px] font-bold text-purple-600 shadow-sm hover:bg-purple-50"
                                              onClick={() =>
                                                addAssessment(module.id, primaryLesson.id)
                                              }
                                            >
                                              <Plus className="h-3 w-3" />
                                              Assessment
                                            </Button>
                                          </DroppableAssessmentZone>
                                        </TreeItem>
                                        {!isSectionCollapsed(module.id, 'assessment') && (
                                          <>
                                            <SortableContext
                                              items={assessments.map(h => h.id)}
                                              strategy={verticalListSortingStrategy}
                                            >
                                              {assessments.map((hw, idx) => (
                                                <SortableTreeItem
                                                  key={hw.id}
                                                  id={hw.id}
                                                  depth={2}
                                                  isLast={idx === assessments.length - 1}
                                                >
                                                  <div
                                                    className={cn(
                                                      'group/item flex cursor-pointer items-center gap-1.5 rounded border px-2 py-1 transition-colors',
                                                      selectedItem?.type === 'homework' &&
                                                        selectedItem?.id === hw.id
                                                        ? 'border-purple-400 bg-purple-200 ring-1 ring-purple-400'
                                                        : 'border-purple-400 bg-purple-50 hover:bg-purple-100'
                                                    )}
                                                    onClick={e => {
                                                      if (
                                                        (e.target as HTMLElement).closest('input')
                                                      )
                                                        return
                                                      // Auto-save current task if switching from one
                                                      if (loadedTaskId) {
                                                        setModules(prev =>
                                                          prev.map(mod => ({
                                                            ...mod,
                                                            lessons: mod.lessons.map(lesson => ({
                                                              ...lesson,
                                                              tasks: lesson.tasks.map(t =>
                                                                t.id === loadedTaskId
                                                                  ? {
                                                                      ...t,
                                                                      title: taskBuilder.title,
                                                                      shortDescription:
                                                                        taskBuilder.details,
                                                                      description:
                                                                        taskBuilder.taskContent,
                                                                      instructions:
                                                                        taskBuilder.taskPci,
                                                                      extensions:
                                                                        taskBuilder.extensions,
                                                                      sourceDocument:
                                                                        t.sourceDocument,
                                                                    }
                                                                  : t
                                                              ),
                                                            })),
                                                          }))
                                                        )
                                                      }
                                                      // Auto-save current assessment if switching from another assessment
                                                      if (
                                                        loadedAssessmentId &&
                                                        loadedAssessmentId !== hw.id
                                                      ) {
                                                        setModules(prev =>
                                                          prev.map(mod => ({
                                                            ...mod,
                                                            lessons: mod.lessons.map(lesson => ({
                                                              ...lesson,
                                                              homework: lesson.homework.map(h =>
                                                                h.id === loadedAssessmentId
                                                                  ? {
                                                                      ...h,
                                                                      title:
                                                                        assessmentBuilder.title,
                                                                      description:
                                                                        assessmentBuilder.taskContent,
                                                                      instructions:
                                                                        assessmentBuilder.taskPci,
                                                                      sourceDocument:
                                                                        h.sourceDocument,
                                                                    }
                                                                  : h
                                                              ),
                                                            })),
                                                          }))
                                                        )
                                                      }
                                                      setSelectedItem({
                                                        type: 'homework',
                                                        id: hw.id,
                                                      })
                                                      loadAssessmentIntoBuilder(hw)
                                                      setMainBuilderTab('assessment')
                                                    }}
                                                  >
                                                    <FileQuestion className="h-3 w-3 shrink-0 text-purple-500" />
                                                    <span className="shrink-0 text-[10px] font-semibold text-purple-700">
                                                      {idx + 1}. {hw.title}:
                                                    </span>
                                                    <div className="flex-1" />

                                                    <DropdownMenu>
                                                      <DropdownMenuTrigger asChild>
                                                        <Button
                                                          variant="ghost"
                                                          size="icon"
                                                          className="h-5 w-5 opacity-0 group-hover/item:opacity-100"
                                                          onClick={e => e.stopPropagation()}
                                                        >
                                                          <MoreVertical className="h-3 w-3 text-slate-500" />
                                                        </Button>
                                                      </DropdownMenuTrigger>
                                                      <DropdownMenuContent align="end">
                                                        {!lessonBankMode && (
                                                          <>
                                                            <DropdownMenuItem
                                                              onClick={e => {
                                                                e.stopPropagation()
                                                                moveToHomework(
                                                                  module.id,
                                                                  primaryLesson.id,
                                                                  'assessment',
                                                                  hw
                                                                )
                                                              }}
                                                            >
                                                              Move to homework
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                              onClick={e => {
                                                                e.stopPropagation()
                                                                setEditingData(hw)
                                                                setActiveModal({
                                                                  type: 'homework',
                                                                  isOpen: true,
                                                                  moduleId: module.id,
                                                                  lessonId: primaryLesson.id,
                                                                  itemId: hw.id,
                                                                })
                                                              }}
                                                            >
                                                              Edit
                                                            </DropdownMenuItem>
                                                          </>
                                                        )}
                                                        <DropdownMenuItem
                                                          className="text-red-500"
                                                          onClick={e => {
                                                            e.stopPropagation()
                                                            if (!confirm(`Delete "${hw.title}"?`))
                                                              return
                                                            deleteAssessment(
                                                              module.id,
                                                              primaryLesson.id,
                                                              hw.id
                                                            )
                                                          }}
                                                        >
                                                          Delete
                                                        </DropdownMenuItem>
                                                      </DropdownMenuContent>
                                                    </DropdownMenu>
                                                  </div>
                                                </SortableTreeItem>
                                              ))}
                                            </SortableContext>
                                          </>
                                        )}

                                        {/* Homework (per-lesson) - drop zone; header + description in one box; sortable items with drag handle */}
                                        {!lessonBankMode &&
                                          (() => {
                                            const hwItems = (primaryLesson.homework || []).filter(
                                              h => h.category === 'homework'
                                            )
                                            return (
                                              <>
                                                <TreeItem depth={2} isLast={false}>
                                                  <DroppableHomeworkZone
                                                    moduleId={module.id}
                                                    lessonId={primaryLesson.id}
                                                    className="flex items-center gap-1.5 rounded-lg border-b-4 border-emerald-600 bg-gradient-to-r from-emerald-400 to-emerald-500 px-3 py-2 shadow-md transition-all active:translate-y-1 active:border-b-0"
                                                  >
                                                    <div className="flex items-center gap-1.5">
                                                      <FolderOpen className="h-4 w-4 text-white" />
                                                      <span className="text-xs font-bold tracking-wide text-white drop-shadow-sm">
                                                        Homework {hwItems.length}:
                                                      </span>
                                                    </div>
                                                  </DroppableHomeworkZone>
                                                </TreeItem>
                                                <SortableContext
                                                  items={hwItems.map(h => h.id)}
                                                  strategy={verticalListSortingStrategy}
                                                >
                                                  {hwItems.map((hw, hwIdx) => (
                                                    <SortableTreeItem
                                                      key={hw.id}
                                                      id={hw.id}
                                                      depth={2}
                                                      isLast={hwIdx === hwItems.length - 1}
                                                    >
                                                      <div
                                                        className={cn(
                                                          'group/item flex cursor-pointer items-center gap-1.5 rounded border border-emerald-400 bg-emerald-50 px-2 py-1 transition-colors hover:bg-emerald-100',
                                                          selectedItem?.type === 'homework' &&
                                                            selectedItem?.id === hw.id &&
                                                            'ring-1 ring-emerald-400'
                                                        )}
                                                        onClick={() => {
                                                          setSelectedItem({
                                                            type: 'homework',
                                                            id: hw.id,
                                                          })
                                                          loadAssessmentIntoBuilder(hw)
                                                          setMainBuilderTab('assessment')
                                                        }}
                                                      >
                                                        <FileQuestion className="h-3 w-3 shrink-0 text-emerald-600" />
                                                        <span className="flex-1 truncate text-[10px] text-emerald-700">
                                                          {hw.title}
                                                        </span>
                                                        <Button
                                                          variant="ghost"
                                                          size="icon"
                                                          className="h-5 w-5 shrink-0 opacity-0 group-hover/item:opacity-100"
                                                          onClick={(e: any) => {
                                                            e.stopPropagation()
                                                            if (!confirm(`Delete "${hw.title}"?`))
                                                              return
                                                            setModules(prev =>
                                                              prev.map(mod =>
                                                                mod.id !== module.id
                                                                  ? mod
                                                                  : {
                                                                      ...mod,
                                                                      lessons: mod.lessons.map(
                                                                        les =>
                                                                          les.id !==
                                                                          primaryLesson.id
                                                                            ? les
                                                                            : {
                                                                                ...les,
                                                                                homework: (
                                                                                  les.homework || []
                                                                                ).filter(
                                                                                  x =>
                                                                                    x.id !== hw.id
                                                                                ),
                                                                              }
                                                                      ),
                                                                    }
                                                              )
                                                            )
                                                          }}
                                                        >
                                                          <Trash2 className="h-3 w-3 text-red-500" />
                                                        </Button>
                                                      </div>
                                                    </SortableTreeItem>
                                                  ))}
                                                </SortableContext>
                                              </>
                                            )
                                          })()}

                                        {/* End of Module Quizzes */}
                                        {(module.moduleQuizzes || []).map((quiz, quizIdx) => (
                                          <TreeItem
                                            key={quiz.id}
                                            depth={2}
                                            isLast={
                                              quizIdx === (module.moduleQuizzes?.length || 0) - 1
                                            }
                                          >
                                            <div
                                              className="group flex cursor-pointer items-center gap-1.5 rounded border border-red-300 bg-red-100 px-2 py-1 hover:bg-red-200"
                                              onClick={() =>
                                                setSelectedItem({ type: 'moduleQuiz', id: quiz.id })
                                              }
                                            >
                                              <FileQuestion className="h-3 w-3 text-red-600" />
                                              <span className="flex-1 truncate text-xs font-medium">
                                                {quiz.title}
                                              </span>
                                              <Badge
                                                variant="default"
                                                className="h-4 bg-red-600 px-1 text-[8px]"
                                              >
                                                Summative
                                              </Badge>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-5 gap-1 px-1 text-[10px] opacity-0 group-hover:opacity-100"
                                                onClick={(e: any) => {
                                                  e.stopPropagation()
                                                  setEditingData(quiz)
                                                  setActiveModal({
                                                    type: 'moduleQuiz',
                                                    isOpen: true,
                                                    moduleId: module.id,
                                                    itemId: quiz.id,
                                                  })
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
                            <div className="py-8 text-center text-muted-foreground">
                              <Layers className="mx-auto mb-2 h-8 w-8 opacity-30" />
                              <p className="text-sm">No lessons yet. Click "Lesson" to add one.</p>
                            </div>
                          )}
                        </div>
                      </DndContext>
                    </ScrollArea>
                    {/* Assets Folder added to the bottom of the left panel */}
                    <div className="mt-4 border-t pt-4">{renderAssetsFolder()}</div>
                  </CardContent>
                </Card>
              </div>
              <div
                className="group flex w-2 shrink-0 cursor-col-resize items-center justify-center transition-colors hover:bg-primary/20 active:bg-primary/30"
                onMouseDown={e => {
                  e.preventDefault()
                  leftResizeStartX.current = e.clientX
                  leftResizeStartW.current = leftPanelWidth
                  setLeftPanelResizing(true)
                }}
                title="Drag to resize"
              >
                <GripHorizontal className="h-3 w-3 rotate-90 text-muted-foreground group-hover:text-primary" />
              </div>
            </>
          )}

          {/* CENTER PANEL - New Three-Section Design */}
          <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-stretch">
            <div className="flex min-h-0 w-full flex-1 grow flex-col items-stretch gap-4">
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

              {/* Test PCI Section - Moved above Task/Assessment Builder */}
              <Card className="flex w-full min-w-0 flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-xl ring-1 ring-black/5">
                <CardContent className="flex h-full min-h-0 w-full flex-col overflow-hidden p-0 pt-4">
                  <CardTitle className="mb-3 flex items-center justify-between gap-2 px-4 text-base font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      {courseName || 'Course'}
                    </div>
                    {insightsProps && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs"
                        onClick={() => setShowInsightsPanel(prev => !prev)}
                      >
                        Insights
                      </Button>
                    )}
                  </CardTitle>
                  <div
                    className={cn(
                      'flex min-h-0 w-full flex-1 flex-col items-stretch gap-0 overflow-hidden',
                      insightsProps && showInsightsPanel && 'xl:flex-row'
                    )}
                  >
                    {/* Main content with tabs */}
                    <div className="flex h-full w-full min-w-0 flex-1 flex-col pb-0">
                      <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden px-0">
                        <Tabs
                          value={testPciActiveTab}
                          onValueChange={setTestPciActiveTab}
                          className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col items-stretch overflow-hidden"
                        >
                          <TabsList className="flex h-auto min-h-10 w-full shrink-0 flex-nowrap gap-1 rounded-xl border bg-muted p-1">
                            {testPciTabs.map(tab => (
                              <div key={tab.id} className="relative min-w-0 flex-1 basis-0">
                                {editingTabId === tab.id ? (
                                  <Input
                                    value={tab.label}
                                    onChange={(e: any) => {
                                      setTestPciTabs(prev =>
                                        prev.map(t =>
                                          t.id === tab.id ? { ...t, label: e.target.value } : t
                                        )
                                      )
                                    }}
                                    onBlur={() => setEditingTabId(null)}
                                    onKeyDown={(e: any) => {
                                      if (e.key === 'Enter') setEditingTabId(null)
                                    }}
                                    className="h-8 min-w-0 text-center text-xs font-medium"
                                    autoFocus
                                  />
                                ) : (
                                  <TabsTrigger
                                    value={tab.id}
                                    className="w-full min-w-0 truncate rounded-lg border border-gray-400 bg-white px-2 text-xs font-medium data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 sm:text-sm"
                                    onDoubleClick={() => setEditingTabId(tab.id)}
                                  >
                                    {tab.label}
                                  </TabsTrigger>
                                )}
                              </div>
                            ))}
                          </TabsList>
                          {testPciTabs.map(tab => (
                            <TabsContent
                              key={tab.id}
                              value={tab.id}
                              className="mt-2 flex h-full w-full min-w-0 flex-1 flex-col self-stretch overflow-hidden data-[state=active]:flex data-[state=inactive]:hidden"
                            >
                              <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-y-auto rounded-lg bg-muted p-4">
                                {tab.id === 'student1' ? (
                                  <Tabs defaultValue="my-board" className="flex h-full flex-col">
                                    <TabsList className="mx-auto mb-6 grid w-full shrink-0 grid-cols-2 gap-1 rounded-xl border border-gray-300 bg-white p-1 md:w-[450px]">
                                      <TabsTrigger
                                        value="my-board"
                                        className="rounded-lg border border-transparent data-[state=active]:border-gray-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                                      >
                                        My Board
                                      </TabsTrigger>
                                      <TabsTrigger
                                        value="student-boards"
                                        className="rounded-lg border border-transparent data-[state=active]:border-gray-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                                      >
                                        Student Boards
                                      </TabsTrigger>
                                    </TabsList>
                                    <TabsContent
                                      value="my-board"
                                      className="mt-4 flex-1 outline-none"
                                    >
                                      <div className="flex h-[calc(100vh-320px)] min-h-[600px] flex-col overflow-hidden shadow-xl ring-1 ring-black/5">
                                        <EnhancedWhiteboard />
                                      </div>
                                    </TabsContent>
                                    <TabsContent
                                      value="student-boards"
                                      className="mt-4 flex-1 outline-none"
                                    >
                                      <div className="flex flex-1 flex-col overflow-hidden">
                                        <div className="grid h-full grid-cols-1 gap-4 overflow-y-auto p-2 sm:grid-cols-2 lg:grid-cols-3">
                                          {insightsProps?.students &&
                                          insightsProps.students.length > 0 ? (
                                            insightsProps.students.map(student => (
                                              <Card
                                                key={student.id}
                                                className="flex flex-col overflow-hidden border-border bg-card shadow-sm"
                                              >
                                                <div className="flex items-center justify-between border-b bg-muted/30 px-3 py-2">
                                                  <span className="text-xs font-semibold">
                                                    {student.name}
                                                  </span>
                                                  <Badge
                                                    variant={
                                                      student.status === 'online'
                                                        ? 'default'
                                                        : 'secondary'
                                                    }
                                                    className="text-[10px]"
                                                  >
                                                    {student.status}
                                                  </Badge>
                                                </div>
                                                <div className="flex-1 shrink-0 p-0">
                                                  <div className="h-[200px] w-full transform-gpu transition-all hover:scale-[1.02]">
                                                    <EnhancedWhiteboard readOnly />
                                                  </div>
                                                </div>
                                              </Card>
                                            ))
                                          ) : (
                                            <div className="col-span-full flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center">
                                              <p className="text-sm font-medium text-gray-500">
                                                No student boards active
                                              </p>
                                              <p className="mt-1 text-xs text-muted-foreground">
                                                Student live whiteboard snapshots will appear here
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </TabsContent>
                                  </Tabs>
                                ) : (
                                  <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                                    {testPciContent[tab.id] || `${tab.label} view content`}
                                  </p>
                                )}
                                {/* Show AI scores if any */}
                                {testPciScores[tab.id]?.length > 0 && (
                                  <div className="mt-3 border-t border-gray-400 pt-3">
                                    <p className="mb-2 text-xs font-medium text-gray-600">
                                      AI Feedback:
                                    </p>
                                    {testPciScores[tab.id].map((score, idx) => (
                                      <div
                                        key={idx}
                                        className="mb-2 rounded border border-gray-400 bg-white p-2"
                                      >
                                        <div className="flex items-center gap-2">
                                          <Badge
                                            variant={
                                              score.score >= 80
                                                ? 'default'
                                                : score.score >= 50
                                                  ? 'secondary'
                                                  : 'destructive'
                                            }
                                            className="text-[10px]"
                                          >
                                            {score.score}%
                                          </Badge>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-600">
                                          {score.feedback}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                        {/* Enhanced text input styled as Kimi AI */}
                        <div className="mt-4 rounded-2xl border border-border bg-background shadow-xl backdrop-blur-md">
                          <div className="relative p-1">
                            <AutoTextarea
                              className="min-h-[100px] w-full border-0 bg-transparent py-4 pl-4 pr-14 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder={
                                testPciActiveTab === 'classroom'
                                  ? 'Enter answer (goes to both students)...'
                                  : 'Ask your AI coach or share a reflection...'
                              }
                              value={testPciInput}
                              onChange={(e: any) => setTestPciInput(e.target.value)}
                              onKeyDown={(e: any) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  if (testPciInput.trim() && !testPciLoading) {
                                    e.preventDefault()
                                    handleTestPciSubmit()
                                  }
                                }
                              }}
                            />
                            <Button
                              size="icon"
                              className="absolute bottom-3 right-3 h-9 w-9 rounded-xl bg-slate-600 shadow-lg hover:bg-slate-700 disabled:opacity-30"
                              disabled={!testPciInput.trim() || testPciLoading}
                              onClick={handleTestPciSubmit}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="border-t border-border/50 bg-muted/20 px-4 py-2.5">
                            <p className="text-[10px] text-muted-foreground">
                              Tip: Start line with &quot;1.&quot;, &quot;-&quot;, or &quot;a.&quot;
                              for auto-numbering. Use Tab/Shift+Tab to indent.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {insightsProps && showInsightsPanel && (
                      <div className="min-h-0 w-full xl:w-[360px]">
                        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-cyan-200/70 bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-4 shadow-[0_10px_40px_-20px_rgba(14,116,144,0.65)] ring-1 ring-cyan-200/60">
                          {insightsProps.onToggleRecording && (
                            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-cyan-100 bg-white/50 p-2 shadow-sm">
                              <div className="flex items-center gap-2 pl-1">
                                <div
                                  className={cn(
                                    'h-2 w-2 rounded-full',
                                    insightsProps.isRecording
                                      ? 'animate-pulse bg-red-500'
                                      : 'bg-gray-300'
                                  )}
                                />
                                <span className="text-xs font-medium text-gray-600">
                                  {insightsProps.isRecording ? (
                                    <>
                                      REC {Math.floor((insightsProps.recordingDuration ?? 0) / 60)}m{' '}
                                      {String((insightsProps.recordingDuration ?? 0) % 60).padStart(
                                        2,
                                        '0'
                                      )}
                                      s
                                    </>
                                  ) : (
                                    'Not Recording'
                                  )}
                                </span>
                              </div>
                              <Button
                                variant={insightsProps.isRecording ? 'destructive' : 'outline'}
                                size="sm"
                                className="h-8 gap-2 px-3 text-xs font-semibold shadow-sm"
                                onClick={insightsProps.onToggleRecording}
                              >
                                <Radio
                                  className={cn(
                                    'h-3.5 w-3.5',
                                    insightsProps.isRecording && 'animate-pulse'
                                  )}
                                />
                                {insightsProps.isRecording ? 'Stop' : 'Record'}
                              </Button>
                            </div>
                          )}

                          <Tabs
                            value={insightsTab}
                            onValueChange={value =>
                              setInsightsTab(value as 'analytics' | 'poll' | 'question')
                            }
                            className="flex h-full min-h-0 flex-col"
                          >
                            <TabsList className="mb-4 grid w-full grid-cols-3 gap-1 rounded-xl border border-cyan-200/70 bg-white/80 p-1 shadow-sm">
                              <TabsTrigger
                                value="analytics"
                                className="rounded-lg border border-cyan-200/70 bg-white/80 data-[state=active]:bg-cyan-100 data-[state=active]:text-cyan-900"
                              >
                                Class Analytics
                              </TabsTrigger>
                              <TabsTrigger
                                value="poll"
                                className="rounded-lg border border-cyan-200/70 bg-white/80 data-[state=active]:bg-cyan-100 data-[state=active]:text-cyan-900"
                              >
                                Poll
                              </TabsTrigger>
                              <TabsTrigger
                                value="question"
                                className="rounded-lg border border-cyan-200/70 bg-white/80 data-[state=active]:bg-cyan-100 data-[state=active]:text-cyan-900"
                              >
                                Question
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="analytics" className="mx-[-16px] flex-1 space-y-4">
                              {insightsProps.liveTasks.length > 0 && (
                                <div className="space-y-4">
                                  <div className="flex flex-wrap items-center gap-3">
                                    <Badge variant="secondary" className="text-xs">
                                      Tasks deployed: {insightsProps.liveTasks.length}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                      Active task:{' '}
                                      {activeInsightsTask?.title || 'Select a task in the builder'}
                                    </Badge>
                                  </div>
                                  <div className="grid gap-3">
                                    <div className="rounded-lg border bg-white/90 p-3">
                                      <p className="text-xs font-semibold uppercase text-muted-foreground">
                                        Task Completion
                                      </p>
                                      <p className="mt-1 text-lg font-semibold text-gray-900">--</p>
                                      <p className="text-xs text-muted-foreground">
                                        Waiting for submissions
                                      </p>
                                    </div>
                                    <div className="rounded-lg border bg-white/90 p-3">
                                      <p className="text-xs font-semibold uppercase text-muted-foreground">
                                        Assessment Scores
                                      </p>
                                      <p className="mt-1 text-lg font-semibold text-gray-900">--</p>
                                      <p className="text-xs text-muted-foreground">No scores yet</p>
                                    </div>
                                    <div className="rounded-lg border bg-white/90 p-3">
                                      <p className="text-xs font-semibold uppercase text-muted-foreground">
                                        Questions Asked
                                      </p>
                                      <p className="mt-1 text-lg font-semibold text-gray-900">
                                        {insightsProps.liveTasks.reduce(
                                          (sum, task) =>
                                            sum +
                                            task.questions.reduce(
                                              (questionSum, question) =>
                                                questionSum + question.responses.length,
                                              0
                                            ),
                                          0
                                        )}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Live student responses
                                      </p>
                                    </div>
                                  </div>
                                  {insightsProps.liveTasks.map(task => {
                                    const pollResponses = task.polls.reduce(
                                      (sum, poll) => sum + poll.responses.length,
                                      0
                                    )
                                    const questionResponses = task.questions.reduce(
                                      (sum, q) => sum + q.responses.length,
                                      0
                                    )
                                    return (
                                      <div
                                        key={task.id}
                                        className="rounded-lg border bg-white/90 p-4"
                                      >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                          <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                              {task.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              Polls: {task.polls.length} • Questions:{' '}
                                              {task.questions.length}
                                            </p>
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>Poll responses: {pollResponses}</span>
                                            <span>Question answers: {questionResponses}</span>
                                          </div>
                                        </div>
                                        {task.polls.map(poll => {
                                          const counts = poll.options.map(option => ({
                                            option,
                                            count: poll.responses.filter(r => r.value === option)
                                              .length,
                                          }))
                                          return (
                                            <div
                                              key={poll.id}
                                              className="mt-3 rounded-md border bg-slate-50/80 p-3"
                                            >
                                              <p className="text-xs font-medium text-gray-700">
                                                {poll.question}
                                              </p>
                                              <div className="mt-2 flex flex-wrap gap-2">
                                                {counts.map(entry => (
                                                  <span
                                                    key={`${poll.id}-${entry.option}`}
                                                    className="rounded-full bg-white px-2 py-1 text-[11px] text-gray-600"
                                                  >
                                                    {entry.option}: {entry.count}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          )
                                        })}
                                        {task.questions.map(question => (
                                          <div
                                            key={question.id}
                                            className="mt-3 rounded-md border bg-slate-50/80 p-3"
                                          >
                                            <p className="text-xs font-medium text-gray-700">
                                              {question.prompt}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                              Answers: {question.responses.length}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    )
                                  })}
                                </div>
                              )}
                            </TabsContent>

                            <TabsContent value="poll" className="space-y-4 pt-2">
                              <div className="rounded-2xl border border-cyan-100 bg-white/40 p-1 shadow-xl backdrop-blur-md">
                                <div className="space-y-2 p-3">
                                  <Label className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                                    Poll question
                                  </Label>
                                  <div className="relative">
                                    <AutoTextarea
                                      className="min-h-[100px] w-full border-0 bg-transparent py-4 pl-3 pr-14 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                      placeholder="What should students answer?"
                                      value={pollPrompt}
                                      onChange={event => setPollPrompt(event.target.value)}
                                    />
                                    <Button
                                      size="icon"
                                      className="absolute bottom-3 right-3 h-9 w-9 rounded-xl bg-cyan-600 shadow-lg hover:bg-cyan-700 disabled:opacity-30"
                                      disabled={
                                        !activeInsightsTaskId ||
                                        !activeInsightsTask ||
                                        !insightsProps.sessionId ||
                                        !pollPrompt.trim()
                                      }
                                      onClick={() => {
                                        if (
                                          !activeInsightsTaskId ||
                                          !activeInsightsTask ||
                                          !insightsProps.sessionId
                                        )
                                          return
                                        insightsProps.onSendPoll({
                                          taskId: activeInsightsTaskId,
                                          question: pollPrompt,
                                        })
                                        setPollPrompt('')
                                      }}
                                    >
                                      <Send className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="border-t border-cyan-50/50 bg-cyan-50/20 px-4 py-3">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                        Scale:
                                      </span>
                                      <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(v => (
                                          <span
                                            key={v}
                                            className="flex h-5 w-5 items-center justify-center rounded-md border border-cyan-100 bg-white text-[10px] font-medium text-cyan-600 shadow-sm"
                                          >
                                            {v}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <p className="max-w-[140px] truncate text-[10px] font-medium text-cyan-600">
                                      Task: {activeInsightsTask?.title || 'None Selected'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="question" className="space-y-4 pt-2">
                              <div className="rounded-2xl border border-cyan-100 bg-white/40 p-1 shadow-xl backdrop-blur-md">
                                <div className="space-y-2 p-3">
                                  <Label className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                                    Question prompt
                                  </Label>
                                  <div className="relative">
                                    <AutoTextarea
                                      className="min-h-[120px] w-full border-0 bg-transparent py-4 pl-3 pr-14 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                      placeholder="Ask your AI coach or share a reflection..."
                                      value={questionPrompt}
                                      onChange={event => setQuestionPrompt(event.target.value)}
                                    />
                                    <Button
                                      size="icon"
                                      className="absolute bottom-3 right-3 h-9 w-9 rounded-xl bg-cyan-600 shadow-lg hover:bg-cyan-700 disabled:opacity-30"
                                      disabled={
                                        !activeInsightsTaskId ||
                                        !activeInsightsTask ||
                                        !insightsProps.sessionId ||
                                        !questionPrompt.trim()
                                      }
                                      onClick={() => {
                                        if (
                                          !activeInsightsTaskId ||
                                          !activeInsightsTask ||
                                          !insightsProps.sessionId
                                        )
                                          return
                                        insightsProps.onSendQuestion({
                                          taskId: activeInsightsTaskId,
                                          prompt: questionPrompt,
                                        })
                                        setQuestionPrompt('')
                                      }}
                                    >
                                      <Send className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="border-t border-cyan-50/50 bg-cyan-50/20 px-4 py-3 text-[10px]">
                                  <div className="flex items-center justify-between">
                                    <p className="font-medium text-cyan-600">
                                      Topic: {activeInsightsTask?.title || 'General'}
                                    </p>
                                    <Badge
                                      variant="outline"
                                      className="border-cyan-200 bg-white/50 text-cyan-700"
                                    >
                                      AI Integrated
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* COMBINED BUILDER: Task & Assessment Tabs */}
              <Card className="mt-8 flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-card/95 shadow-xl backdrop-blur-md">
                <CardContent className="pt-4">
                  <Tabs
                    value={mainBuilderTab}
                    onValueChange={v => setMainBuilderTab(v as 'task' | 'assessment')}
                    className="w-full"
                  >
                    {/* Main Builder Tabs */}
                    <TabsList className="mb-4 grid w-full grid-cols-2 gap-1 rounded-xl border border-border bg-muted/30 p-1">
                      <TabsTrigger
                        value="task"
                        className="gap-2 rounded-lg border border-transparent bg-transparent data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      >
                        <ListTodo className="h-4 w-4 text-orange-500" />
                        Task Builder
                      </TabsTrigger>
                      <TabsTrigger
                        value="assessment"
                        className="gap-2 rounded-lg border border-transparent bg-transparent data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      >
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
                              placeholder={
                                loadedTaskId
                                  ? 'Task Title'
                                  : 'Select a task from the left sidebar to edit'
                              }
                              className="font-semibold"
                              value={
                                taskBuilder.activeExtensionId ? taskHeaderTitle : taskBuilder.title
                              }
                              onChange={(e: any) =>
                                setTaskBuilder(prev => ({ ...prev, title: e.target.value }))
                              }
                              disabled={!loadedTaskId || !!taskBuilder.activeExtensionId}
                            />
                            <Input
                              placeholder={
                                loadedTaskId
                                  ? taskBuilder.activeExtensionId
                                    ? 'Extension Description'
                                    : 'Description'
                                  : 'Select a task to edit description'
                              }
                              value={
                                taskBuilder.activeExtensionId
                                  ? activeTaskExtension?.description || ''
                                  : taskBuilder.details
                              }
                              onChange={(e: any) => {
                                const value = e.target.value
                                if (taskBuilder.activeExtensionId) {
                                  setTaskBuilder(prev => ({
                                    ...prev,
                                    extensions: prev.extensions.map(ext =>
                                      ext.id === prev.activeExtensionId
                                        ? { ...ext, description: value }
                                        : ext
                                    ),
                                  }))
                                } else {
                                  setTaskBuilder(prev => ({ ...prev, details: value }))
                                }
                              }}
                              disabled={!loadedTaskId}
                            />
                          </div>
                          {loadedTaskId && (
                            <p className="mt-1 text-xs text-muted-foreground">
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
                            onValueChange={v => {
                              setTaskBuilderActiveTab(v as 'content' | 'pci')
                            }}
                            className="w-full"
                          >
                            <TabsList className="grid w-full grid-cols-2 gap-1 rounded-xl border bg-muted p-1">
                              <TabsTrigger
                                value="content"
                                className="rounded-lg border border-gray-400 bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                              >
                                Slide
                              </TabsTrigger>
                              <TabsTrigger
                                value="pci"
                                className="rounded-lg border border-gray-400 bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                              >
                                PCI
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="content" className="mt-2 space-y-2">
                              <AutoTextarea
                                placeholder={
                                  taskBuilder.activeExtensionId
                                    ? 'Extension content...'
                                    : 'Enter task content or drop files here...'
                                }
                                className="min-h-[300px] w-full"
                                onDrop={(e: any) =>
                                  handleDragFiles(e, text => {
                                    setTaskBuilder(prev => {
                                      if (prev.activeExtensionId) {
                                        const ext = prev.extensions.find(
                                          x => x.id === prev.activeExtensionId
                                        )
                                        const combined = ext
                                          ? ext.content + (ext.content ? '\n\n' : '') + text
                                          : text
                                        return {
                                          ...prev,
                                          extensions: prev.extensions.map(x =>
                                            x.id === prev.activeExtensionId
                                              ? { ...x, content: combined }
                                              : x
                                          ),
                                        }
                                      } else {
                                        const combined =
                                          prev.taskContent + (prev.taskContent ? '\n\n' : '') + text
                                        return {
                                          ...prev,
                                          taskContent: combined,
                                        }
                                      }
                                    })
                                  })
                                }
                                // Show task content if no extension active, otherwise show active extension's content
                                value={
                                  taskBuilder.activeExtensionId
                                    ? taskBuilder.extensions.find(
                                        e => e.id === taskBuilder.activeExtensionId
                                      )?.content || ''
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
                                        ),
                                      }
                                    })
                                  } else {
                                    // Update task content
                                    setTaskBuilder(prev => ({
                                      ...prev,
                                      taskContent: newContent,
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
                                <div className="max-h-[300px] min-h-[300px] space-y-3 overflow-y-auto p-3">
                                  {activeTaskPciMessages.length === 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      Start a PCI chat to build instructions with the assistant.
                                    </p>
                                  )}
                                  {activeTaskPciMessages.map((msg, idx) => (
                                    <div
                                      key={idx}
                                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <div
                                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                          msg.role === 'user'
                                            ? 'bg-blue-50 text-gray-900'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                      >
                                        <div className="whitespace-pre-wrap">{msg.content}</div>
                                      </div>
                                    </div>
                                  ))}
                                  {taskPciLoading && (
                                    <div className="flex justify-start">
                                      <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm">
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
                                  <div className="relative flex items-end gap-2">
                                    <AutoTextarea
                                      placeholder="Ask the PCI assistant..."
                                      className="min-h-[44px] w-full pr-11"
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
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      className="absolute bottom-1 right-1 h-8 w-8 shrink-0 rounded-full"
                                      disabled={taskPciLoading || !activeTaskPciInput.trim()}
                                      onClick={() => handlePciSend('task')}
                                      aria-label="Send"
                                    >
                                      {taskPciLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Send className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                          {/* Buttons row with Test and Save */}
                          <div className="mt-3 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Prefill Test PCI with content from Task Builder
                                const content = taskBuilder.activeExtensionId
                                  ? taskBuilder.extensions.find(
                                      e => e.id === taskBuilder.activeExtensionId
                                    )?.content || taskBuilder.taskContent
                                  : taskBuilder.taskContent

                                setTestPciScores({})
                                setTestPciInput('')

                                setTestPciContent({
                                  classroom: content,
                                  student1: content,
                                  student2: content,
                                })
                                setTestPciSource('task')
                                toast.success('Test PCI prefilled with task content')
                              }}
                            >
                              Test
                            </Button>
                          </div>
                        </div>
                        {/* Right panels container */}
                        <div className="flex flex-col gap-4">
                          {/* Extensions panel */}
                          <ResizablePanel
                            defaultWidth={200}
                            minWidth={150}
                            maxWidth={300}
                            actionButton={
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => {
                                  if (!loadedTaskId) {
                                    toast.error('Please select a task first')
                                    return
                                  }
                                  const extNumber = taskBuilder.extensions.length + 1
                                  const newExtension = {
                                    id: `ext-${Date.now()}`,
                                    name: `Extension ${extNumber}`,
                                    content: '',
                                    pci: '',
                                  }
                                  setTaskBuilder(prev => ({
                                    ...prev,
                                    extensions: [...prev.extensions, newExtension],
                                    activeExtensionId: newExtension.id,
                                  }))
                                }}
                              >
                                Add Extension
                              </Button>
                            }
                          >
                            <h4 className="mb-2 text-sm font-medium">
                              {taskBuilder.title || 'Task'} Extensions
                            </h4>
                            <div className="min-h-[100px] space-y-2 rounded-lg bg-slate-50 p-3">
                              {taskBuilder.extensions.length === 0 ? (
                                <p className="text-xs text-muted-foreground">No extensions added</p>
                              ) : (
                                taskBuilder.extensions.map(ext => (
                                  <Button
                                    key={ext.id}
                                    variant={
                                      taskBuilder.activeExtensionId === ext.id ? 'default' : 'ghost'
                                    }
                                    size="sm"
                                    className="w-full justify-start text-xs"
                                    onClick={() => {
                                      if (taskBuilder.activeExtensionId === ext.id) {
                                        // Deactivate
                                        setTaskBuilder(prev => ({
                                          ...prev,
                                          activeExtensionId: null,
                                        }))
                                      } else {
                                        // Activate extension
                                        setTaskBuilder(prev => ({
                                          ...prev,
                                          activeExtensionId: ext.id,
                                        }))
                                      }
                                    }}
                                  >
                                    {ext.name}
                                  </Button>
                                ))
                              )}
                            </div>
                          </ResizablePanel>

                          {/* DMI Panel */}
                          <ResizablePanel defaultWidth={200} minWidth={150} maxWidth={300}>
                            <DMIPanel
                              items={taskDmiItems}
                              onItemsChange={setTaskDmiItems}
                              onDeploy={() => {
                                if (!loadedTaskId) {
                                  toast.error('Select a task to deploy')
                                  return
                                }
                                if (!insightsProps?.sessionId) {
                                  toast.error('Select a course session for insights')
                                  return
                                }

                                const task: LiveTask = {
                                  id: loadedTaskId,
                                  title: taskBuilder.title || 'Task',
                                  content: taskBuilder.activeExtensionId
                                    ? taskBuilder.extensions.find(
                                        e => e.id === taskBuilder.activeExtensionId
                                      )?.content || taskBuilder.taskContent
                                    : taskBuilder.taskContent,
                                  source: 'task',
                                  dmiItems: taskDmiItems.map(item => ({
                                    id: item.id,
                                    questionNumber: item.questionNumber,
                                    questionText: item.questionText,
                                  })),
                                  deployedAt: Date.now(),
                                  polls: [],
                                  questions: [],
                                }

                                insightsProps.onDeployTask(task)
                                toast.success('DMI deployed to live class')
                              }}
                            />
                          </ResizablePanel>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Assessment Builder Tab */}
                    <TabsContent value="assessment" className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <Input
                            placeholder={
                              loadedAssessmentId
                                ? 'Assessment Title'
                                : 'Select an assessment from the left sidebar to edit'
                            }
                            className="font-semibold"
                            value={assessmentBuilder.title}
                            onChange={(e: any) =>
                              setAssessmentBuilder(prev => ({ ...prev, title: e.target.value }))
                            }
                            disabled={!loadedAssessmentId}
                          />
                          {loadedAssessmentId && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Editing: {assessmentBuilder.title || 'Untitled Assessment'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        {/* Main content with tabs */}
                        <div className="flex-1">
                          <Tabs
                            value={assessmentBuilderActiveTab}
                            onValueChange={v => {
                              setAssessmentBuilderActiveTab(v as 'content' | 'pci')
                            }}
                            className="w-full"
                          >
                            <TabsList className="grid w-full grid-cols-2 gap-1 rounded-xl border bg-muted p-1">
                              <TabsTrigger
                                value="content"
                                className="rounded-lg border border-gray-400 bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                              >
                                Slide
                              </TabsTrigger>
                              <TabsTrigger
                                value="pci"
                                className="rounded-lg border border-gray-400 bg-white data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                              >
                                PCI
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="content" className="mt-2 space-y-2">
                              <AutoTextarea
                                placeholder="Enter assessment content or drop files here..."
                                className="min-h-[300px] w-full"
                                onDrop={(e: any) =>
                                  handleDragFiles(e, text => {
                                    setAssessmentBuilder(prev => {
                                      const combined =
                                        prev.taskContent + (prev.taskContent ? '\n\n' : '') + text
                                      return {
                                        ...prev,
                                        taskContent: combined,
                                      }
                                    })
                                  })
                                }
                                value={assessmentBuilder.taskContent}
                                onChange={(e: any) => {
                                  const newContent = e.target.value
                                  // Auto-create assessment if none loaded
                                  if (!loadedAssessmentId) {
                                    autoCreateAssessment()
                                  }
                                  setAssessmentBuilder(prev => ({
                                    ...prev,
                                    taskContent: newContent,
                                  }))
                                }}
                              />
                              {/* Uploaded Files List - only for assessment (not extensions) */}
                              {/* Upload button - only for assessment (not extensions) */}
                              {/* Assets Folder added to Slide Tab removed from here */}
                            </TabsContent>
                            <TabsContent value="pci" className="mt-2">
                              <div className="rounded-lg border bg-white">
                                <div className="max-h-[300px] min-h-[300px] space-y-3 overflow-y-auto p-3">
                                  {assessmentPciMessages.length === 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      Start a PCI chat to build instructions with the assistant.
                                    </p>
                                  )}
                                  {assessmentPciMessages.map((msg, idx) => (
                                    <div
                                      key={idx}
                                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <div
                                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                          msg.role === 'user'
                                            ? 'bg-blue-50 text-gray-900'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                      >
                                        <div className="whitespace-pre-wrap">{msg.content}</div>
                                      </div>
                                    </div>
                                  ))}
                                  {assessmentPciLoading && (
                                    <div className="flex justify-start">
                                      <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm">
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
                                  <div className="relative flex items-end gap-2">
                                    <AutoTextarea
                                      placeholder="Ask the PCI assistant..."
                                      className="min-h-[44px] w-full pr-11"
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
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      className="absolute bottom-1 right-1 h-8 w-8 shrink-0 rounded-full"
                                      disabled={assessmentPciLoading || !assessmentPciInput.trim()}
                                      onClick={() => handlePciSend('assessment')}
                                      aria-label="Send"
                                    >
                                      {assessmentPciLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Send className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                        {/* Right panels container */}
                        <div className="flex flex-col gap-4">
                          {/* DMI Panel */}
                          <ResizablePanel
                            defaultWidth={200}
                            minWidth={150}
                            maxWidth={300}
                            actionButton={
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => {
                                  // Generate DMI from Slide content
                                  const content = assessmentBuilder.taskContent
                                  if (!content.trim()) {
                                    toast.error('Please add content to the Slide tab first')
                                    return
                                  }
                                  handleGenerateDMI('assessment')
                                }}
                              >
                                Generate DMI
                              </Button>
                            }
                          >
                            <DMIPanel
                              items={assessmentDmiItems}
                              onItemsChange={setAssessmentDmiItems}
                              onDeploy={handleDeployAssessmentDmi}
                            />
                          </ResizablePanel>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
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
            content={
              aiAssistContext === 'task'
                ? taskBuilder.activeExtensionId
                  ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)
                      ?.content || ''
                  : taskBuilder.taskContent
                : assessmentBuilder.taskContent
            }
            pci={
              aiAssistContext === 'task'
                ? taskBuilder.activeExtensionId
                  ? taskBuilder.extensions.find(e => e.id === taskBuilder.activeExtensionId)?.pci ||
                    ''
                  : taskBuilder.taskPci
                : assessmentBuilder.taskPci
            }
            title={aiAssistContext === 'task' ? taskBuilder.title : assessmentBuilder.title}
            messages={aiAssistContext === 'task' ? taskAiMessages : assessmentAiMessages}
            setMessages={aiAssistContext === 'task' ? setTaskAiMessages : setAssessmentAiMessages}
            onApplyContent={content => {
              if (aiAssistContext === 'task') {
                if (taskBuilder.activeExtensionId) {
                  // Apply to active extension
                  setTaskBuilder(prev => ({
                    ...prev,
                    extensions: prev.extensions.map(ext =>
                      ext.id === prev.activeExtensionId ? { ...ext, content } : ext
                    ),
                  }))
                } else {
                  // Apply to task
                  setTaskBuilder(prev => ({ ...prev, taskContent: content }))
                }
              } else {
                setAssessmentBuilder(prev => ({ ...prev, taskContent: content }))
              }
            }}
            onApplyPci={pci => {
              if (aiAssistContext === 'task') {
                if (taskBuilder.activeExtensionId) {
                  setTaskBuilder(prev => ({
                    ...prev,
                    extensions: prev.extensions.map(ext =>
                      ext.id === prev.activeExtensionId ? { ...ext, pci } : ext
                    ),
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
            onImport={items => {
              const joinedQuestions = items.map(i => i.questionText).join('\n\n')
              const joinedPci = items.map(i => i.pciText).join('\n\n')

              if (importTarget) {
                setImportTypeModalData({ target: importTarget, items })
                setQuestionBankOpen(false)
                setImportTarget(null)
              } else if (questionBankTarget) {
                const [targetType, targetId] = questionBankTarget.split('-')

                setModules(prev =>
                  prev.map(mod => ({
                    ...mod,
                    lessons: mod.lessons.map(lesson => ({
                      ...lesson,
                      tasks: lesson.tasks.map(t => {
                        if (targetType === 'task' && t.id === targetId) {
                          return {
                            ...t,
                            description:
                              (t.description || '') +
                              (t.description ? '\n\n' : '') +
                              joinedQuestions,
                            instructions:
                              (t.instructions || '') + (t.instructions ? '\n\n' : '') + joinedPci,
                          }
                        }
                        return t
                      }),
                      homework: lesson.homework.map(h => {
                        if (
                          (targetType === 'assessment' || targetType === 'homework') &&
                          h.id === targetId
                        ) {
                          return {
                            ...h,
                            description:
                              (h.description || '') +
                              (h.description ? '\n\n' : '') +
                              joinedQuestions,
                            instructions:
                              (h.instructions || '') + (h.instructions ? '\n\n' : '') + joinedPci,
                          }
                        }
                        return h
                      }),
                    })),
                  }))
                )

                // ALSO update task/assessmentBuilder if it's currently loaded
                if (targetType === 'task' && loadedTaskId === targetId) {
                  setTaskBuilder(prev => ({
                    ...prev,
                    taskContent:
                      prev.taskContent + (prev.taskContent ? '\n\n' : '') + joinedQuestions,
                    taskPci: prev.taskPci + (prev.taskPci ? '\n\n' : '') + joinedPci,
                  }))
                } else if (targetType === 'extension') {
                  setTaskBuilder(prev => ({
                    ...prev,
                    extensions: prev.extensions.map(ext =>
                      ext.id === targetId
                        ? {
                            ...ext,
                            content:
                              (ext.content || '') + (ext.content ? '\n\n' : '') + joinedQuestions,
                            pci: (ext.pci || '') + (ext.pci ? '\n\n' : '') + joinedPci,
                          }
                        : ext
                    ),
                  }))
                } else if (
                  (targetType === 'assessment' || targetType === 'homework') &&
                  loadedAssessmentId === targetId
                ) {
                  setAssessmentBuilder(prev => ({
                    ...prev,
                    taskContent:
                      prev.taskContent + (prev.taskContent ? '\n\n' : '') + joinedQuestions,
                    taskPci: prev.taskPci + (prev.taskPci ? '\n\n' : '') + joinedPci,
                  }))
                }

                toast.success('Questions imported from Assessment Bank')
              }
            }}
          />

          {/* Import Type Selector Modal */}
          <Dialog
            open={!!importTypeModalData}
            onOpenChange={open => !open && setImportTypeModalData(null)}
          >
            <DialogContent className="rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Import as...</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3 py-4">
                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => {
                    if (!importTypeModalData) return
                    const { target, items } = importTypeModalData
                    const joinedQuestions = items.map(i => i.questionText).join('\n\n')
                    const joinedPci = items.map(i => i.pciText).join('\n\n')

                    setModules(prev =>
                      prev.map(mod => {
                        if (mod.id !== target.moduleId) return mod
                        return {
                          ...mod,
                          lessons: mod.lessons.map(lesson => {
                            if (lesson.id !== target.lessonId) return lesson
                            const newTask = DEFAULT_LESSON(0).tasks[0]
                            return {
                              ...lesson,
                              tasks: [
                                ...lesson.tasks,
                                {
                                  ...newTask,
                                  id: `task-${Date.now()}`,
                                  title: 'Imported Task',
                                  description: joinedQuestions,
                                  instructions: joinedPci,
                                },
                              ],
                            }
                          }),
                        }
                      })
                    )
                    toast.success('Items imported as Task')
                    setImportTypeModalData(null)
                  }}
                >
                  <ListTodo className="h-4 w-4 text-orange-500" />
                  Task
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => {
                    if (!importTypeModalData) return
                    const { target, items } = importTypeModalData
                    const joinedQuestions = items.map(i => i.questionText).join('\n\n')
                    const joinedPci = items.map(i => i.pciText).join('\n\n')

                    setModules(prev =>
                      prev.map(mod => {
                        if (mod.id !== target.moduleId) return mod
                        return {
                          ...mod,
                          lessons: mod.lessons.map(lesson => {
                            if (lesson.id !== target.lessonId) return lesson
                            const newAssessment = DEFAULT_HOMEWORK(0, 'assessment')
                            return {
                              ...lesson,
                              homework: [
                                ...lesson.homework,
                                {
                                  ...newAssessment,
                                  id: `hw-${Date.now()}`,
                                  title: 'Imported Assessment',
                                  description: joinedQuestions,
                                  instructions: joinedPci,
                                },
                              ],
                            }
                          }),
                        }
                      })
                    )
                    toast.success('Items imported as Assessment')
                    setImportTypeModalData(null)
                  }}
                >
                  <FileQuestion className="h-4 w-4 text-purple-500" />
                  Assessment
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => {
                    if (!importTypeModalData) return
                    const { target, items } = importTypeModalData
                    const joinedQuestions = items.map(i => i.questionText).join('\n\n')
                    const joinedPci = items.map(i => i.pciText).join('\n\n')

                    setModules(prev =>
                      prev.map(mod => {
                        if (mod.id !== target.moduleId) return mod
                        return {
                          ...mod,
                          lessons: mod.lessons.map(lesson => {
                            if (lesson.id !== target.lessonId) return lesson
                            const newHomework = DEFAULT_HOMEWORK(0, 'homework')
                            return {
                              ...lesson,
                              homework: [
                                ...lesson.homework,
                                {
                                  ...newHomework,
                                  id: `hw-${Date.now()}`,
                                  title: 'Imported Homework',
                                  description: joinedQuestions,
                                  instructions: joinedPci,
                                },
                              ],
                            }
                          }),
                        }
                      })
                    )
                    toast.success('Items imported as Homework')
                    setImportTypeModalData(null)
                  }}
                >
                  <Home className="h-4 w-4 text-emerald-500" />
                  Homework
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Import Lesson Selector Modal - Step 1: Choose which lesson to import into */}
          <Dialog
            open={importLessonSelectorOpen}
            onOpenChange={open => {
              if (!open) {
                setImportLessonSelectorOpen(false)
                setImportTarget(null)
              }
            }}
          >
            <DialogContent className="rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Import into which lesson?</DialogTitle>
                <DialogDescription>
                  Select a lesson to import content into, or create a new one.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {modules.length === 0 || modules.every(m => m.lessons.length === 0) ? (
                  <div className="py-4 text-center">
                    <p className="mb-4 text-sm text-muted-foreground">
                      No lessons available. A new lesson will be created automatically.
                    </p>
                    <Button
                      onClick={() => {
                        // Auto-create a lesson and proceed
                        const newModule = DEFAULT_MODULE(modules.length)
                        setModules(prev => [...prev, newModule])
                        setImportTarget({
                          moduleId: newModule.id,
                          lessonId: newModule.lessons[0].id,
                        })
                        setImportLessonSelectorOpen(false)
                        setLessonBankImportOpen(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Lesson & Continue
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="max-h-[300px] space-y-2 overflow-y-auto">
                      <Label>Select Target Lesson</Label>
                      {modules.map(mod => (
                        <div key={mod.id} className="space-y-1">
                          <p className="px-2 text-xs font-medium text-muted-foreground">
                            {mod.title}
                          </p>
                          {mod.lessons.map(lesson => (
                            <Button
                              key={lesson.id}
                              variant="outline"
                              className="w-full justify-start text-sm"
                              onClick={() => {
                                setImportTarget({ moduleId: mod.id, lessonId: lesson.id })
                                setImportLessonSelectorOpen(false)
                                setLessonBankImportOpen(true)
                              }}
                            >
                              <GraduationCap className="mr-2 h-4 w-4 text-blue-500" />
                              {lesson.title}
                            </Button>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          // Create new lesson and proceed
                          const newModule = DEFAULT_MODULE(modules.length)
                          setModules(prev => [...prev, newModule])
                          setImportTarget({
                            moduleId: newModule.id,
                            lessonId: newModule.lessons[0].id,
                          })
                          setImportLessonSelectorOpen(false)
                          setLessonBankImportOpen(true)
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Lesson
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setImportLessonSelectorOpen(false)
                    setImportTarget(null)
                  }}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Lesson Bank Import Modal - Step 2: Choose what to import from lesson bank */}
          <Dialog
            open={lessonBankImportOpen}
            onOpenChange={open => {
              if (!open) {
                setLessonBankImportOpen(false)
                setImportTarget(null)
              }
            }}
          >
            <DialogContent className="rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Import from Lesson Bank</DialogTitle>
                <DialogDescription>Select a lesson to import into this course.</DialogDescription>
              </DialogHeader>
              {lessonBankModules.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No lesson bank content found. Build lessons in the Lesson Bank first.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Lesson</Label>
                    <Select value={lessonBankLessonKey} onValueChange={setLessonBankLessonKey}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lesson" />
                      </SelectTrigger>
                      <SelectContent>
                        {lessonBankModules.flatMap(mod =>
                          mod.lessons.map(lesson => (
                            <SelectItem
                              key={`${mod.id}:${lesson.id}`}
                              value={`${mod.id}:${lesson.id}`}
                            >
                              {mod.title} • {lesson.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Button
                      variant="outline"
                      disabled={!lessonBankLessonKey}
                      onClick={() => {
                        if (!lessonBankLessonKey) return
                        const [moduleId, lessonId] = lessonBankLessonKey.split(':')
                        const bankModule = lessonBankModules.find(m => m.id === moduleId)
                        const bankLesson = bankModule?.lessons.find(l => l.id === lessonId)
                        if (!bankLesson) return

                        // If no importTarget (no existing lessons), create a new module with the lesson
                        if (!importTarget) {
                          const newModule = DEFAULT_MODULE(modules.length)
                          const clonedLesson = cloneLesson(bankLesson, 0)
                          newModule.lessons = [clonedLesson]
                          setModules(prev => [...prev, newModule])
                        } else {
                          // Import into existing module
                          setModules(prev =>
                            prev.map(mod => {
                              if (mod.id !== importTarget.moduleId) return mod
                              const nextLesson = cloneLesson(bankLesson, mod.lessons.length)
                              return {
                                ...mod,
                                lessons: [...mod.lessons, nextLesson],
                              }
                            })
                          )
                        }
                        toast.success('Lesson imported')
                        setLessonBankImportOpen(false)
                        setImportTarget(null)
                      }}
                    >
                      Import Lesson
                    </Button>
                    <Button
                      variant="outline"
                      disabled={!lessonBankLessonKey}
                      onClick={() => {
                        if (!lessonBankLessonKey) return
                        const [moduleId, lessonId] = lessonBankLessonKey.split(':')
                        const bankModule = lessonBankModules.find(m => m.id === moduleId)
                        const bankLesson = bankModule?.lessons.find(l => l.id === lessonId)
                        if (!bankLesson) return

                        // If no importTarget (no existing lessons), auto-create a lesson first
                        if (!importTarget) {
                          const newModule = DEFAULT_MODULE(modules.length)
                          newModule.lessons[0].tasks = bankLesson.tasks.map(cloneTask)
                          setModules(prev => [...prev, newModule])
                        } else {
                          // Import into existing lesson
                          setModules(prev =>
                            prev.map(mod => {
                              if (mod.id !== importTarget.moduleId) return mod
                              return {
                                ...mod,
                                lessons: mod.lessons.map(lesson => {
                                  if (lesson.id !== importTarget.lessonId) return lesson
                                  return {
                                    ...lesson,
                                    tasks: [...lesson.tasks, ...bankLesson.tasks.map(cloneTask)],
                                  }
                                }),
                              }
                            })
                          )
                        }
                        toast.success('Tasks imported')
                        setLessonBankImportOpen(false)
                        setImportTarget(null)
                      }}
                    >
                      Import Tasks
                    </Button>
                    <Button
                      variant="outline"
                      disabled={!lessonBankLessonKey}
                      onClick={() => {
                        if (!lessonBankLessonKey) return
                        const [moduleId, lessonId] = lessonBankLessonKey.split(':')
                        const bankModule = lessonBankModules.find(m => m.id === moduleId)
                        const bankLesson = bankModule?.lessons.find(l => l.id === lessonId)
                        if (!bankLesson) return
                        const assessments = (bankLesson.homework || []).filter(
                          h => h.category !== 'homework'
                        )

                        // If no importTarget (no existing lessons), auto-create a lesson first
                        if (!importTarget) {
                          const newModule = DEFAULT_MODULE(modules.length)
                          newModule.lessons[0].homework = assessments.map(cloneAssessment)
                          setModules(prev => [...prev, newModule])
                        } else {
                          // Import into existing lesson
                          setModules(prev =>
                            prev.map(mod => {
                              if (mod.id !== importTarget.moduleId) return mod
                              return {
                                ...mod,
                                lessons: mod.lessons.map(lesson => {
                                  if (lesson.id !== importTarget.lessonId) return lesson
                                  return {
                                    ...lesson,
                                    homework: [
                                      ...lesson.homework,
                                      ...assessments.map(cloneAssessment),
                                    ],
                                  }
                                }),
                              }
                            })
                          )
                        }
                        toast.success('Assessments imported')
                        setLessonBankImportOpen(false)
                        setImportTarget(null)
                      }}
                    >
                      Import Assessments
                    </Button>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLessonBankImportOpen(false)
                    setImportTarget(null)
                  }}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Course Properties Modal */}
          <Dialog
            open={coursePropsModal.isOpen}
            onOpenChange={open => setCoursePropsModal(prev => ({ ...prev, isOpen: open }))}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Course Properties</DialogTitle>
                <DialogDescription>
                  Set the name and description for your new course before saving.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={coursePropsModal.name}
                    onChange={e => setCoursePropsModal(prev => ({ ...prev, name: e.target.value }))}
                    className="col-span-3"
                    placeholder="e.g. Introduction to Physics"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <AutoTextarea
                    id="description"
                    value={coursePropsModal.description}
                    onChange={e =>
                      setCoursePropsModal(prev => ({ ...prev, description: e.target.value }))
                    }
                    className="col-span-3"
                    placeholder="Briefly describe what this course is about..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!coursePropsModal.name.trim()}
                  onClick={() => {
                    setCoursePropsModal(prev => ({ ...prev, isOpen: false }))
                    if (onSave) {
                      onSave(modules, {
                        developmentMode: devMode,
                        previewDifficulty,
                        courseName: coursePropsModal.name,
                        courseDescription: coursePropsModal.description,
                      })
                    }
                  }}
                >
                  Save Course
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }
)
