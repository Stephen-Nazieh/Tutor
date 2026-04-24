'use client'

import { useEffect, useMemo, useRef, useState, Suspense, type ComponentProps } from 'react'
import { createPortal } from 'react-dom'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { AutoTextarea } from '@/components/ui/auto-textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSocket } from '@/hooks/use-socket'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  ListTodo,
  MessageSquare,
  Send,
  Bell,
  Loader2,
  Layout,
  ArrowLeft,
  FileText,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Folder,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { EnhancedWhiteboard } from '@/components/class/enhanced-whiteboard'
import { DailyVideoFrame } from '@/components/class/daily-video-frame'
import type { LiveTask, LiveTaskPoll, LiveTaskQuestion, ChatMessage } from '@/lib/socket'

type WhiteboardPages = NonNullable<ComponentProps<typeof EnhancedWhiteboard>['pages']>
type WhiteboardPage = WhiteboardPages[number]

const createDefaultWhiteboardPages = (): WhiteboardPages => [
  {
    id: 'page-1',
    name: 'Page 1',
    strokes: [],
    texts: [],
    shapes: [],
    backgroundColor: '#ffffff',
    backgroundStyle: 'solid',
  },
]

interface SessionSummary {
  id: string
  title: string
  subject: string
  scheduledAt: string
  status: string
}

export default function StudentFeedbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <StudentFeedbackContent />
    </Suspense>
  )
}

function StudentFeedbackContent() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const sessionIdFromQuery = searchParams.get('sessionId')

  const [sessions, setSessions] = useState<SessionSummary[]>([])
  const [sessionsLoading, setSessionsLoading] = useState(true)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(sessionIdFromQuery)
  const [tasks, setTasks] = useState<LiveTask[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [showTasksPanel, setShowTasksPanel] = useState(false)
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false)
  const [unseenTaskIds, setUnseenTaskIds] = useState<string[]>([])
  const [questionDrafts, setQuestionDrafts] = useState<Record<string, string>>({})
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [sessionContext, setSessionContext] = useState<{
    topic: string | null
    objectives: string[] | null
    roomUrl: string | null
    token: string | null
    tutorUsername: string | null
    courseCategory: string | null
  } | null>(null)
  const [myBoardPages, setMyBoardPages] = useState<WhiteboardPage[]>(createDefaultWhiteboardPages)
  const [myBoardPageIndex, setMyBoardPageIndex] = useState(0)
  const [tutorBoardPages, setTutorBoardPages] = useState<WhiteboardPage[]>(
    createDefaultWhiteboardPages
  )
  const [tutorBoardPageIndex, setTutorBoardPageIndex] = useState(0)
  const saveBoardsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Left Panel state
  const [leftPanelHidden, setLeftPanelHidden] = useState(false)
  const [leftPanelWidth, setLeftPanelWidth] = useState(300)
  const [leftPanelResizing, setLeftPanelResizing] = useState(false)
  const leftResizeStartX = useRef(0)
  const leftResizeStartW = useRef(300)

  // Assets state
  const [courseAssets, setCourseAssets] = useState<any[]>([])
  const [assetsLoading, setAssetsLoading] = useState(false)
  const [foldersOpen, setFoldersOpen] = useState<Record<string, boolean>>({
    tutorRoot: true,
    courseCategory: true,
    tasks: true,
    assessments: true,
    homework: true,
    reports: true,
    recordedSessions: true,
  })

  // Portal target for TabsList
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const el = document.getElementById('student-live-tabs-portal')
    if (el) {
      setPortalTarget(el)
    }
  }, [])

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

  useEffect(() => {
    const loadAssets = async () => {
      setAssetsLoading(true)
      try {
        const res = await fetch('/api/student/resources', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setCourseAssets(data.resources || [])
        }
      } catch (err) {
        console.error('Failed to load assets:', err)
      } finally {
        setAssetsLoading(false)
      }
    }
    loadAssets()
  }, [])

  useEffect(() => {
    const loadSessions = async () => {
      setSessionsLoading(true)
      try {
        const res = await fetch('/api/class/rooms', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load sessions')
        const data = await res.json()
        const nextSessions = (data.sessions || []) as SessionSummary[]
        setSessions(nextSessions)
        if (nextSessions.length > 0) {
          setSelectedSessionId(prev => prev ?? sessionIdFromQuery ?? nextSessions[0].id)
        }
      } catch (error) {
        toast.error('Unable to load live classes')
      } finally {
        setSessionsLoading(false)
      }
    }

    loadSessions()
  }, [])

  const socketOptions = useMemo(() => {
    if (!selectedSessionId || !session?.user?.id) return undefined
    return {
      roomId: selectedSessionId,
      userId: session.user.id,
      name: session.user.name || 'Student',
      role: 'student' as const,
      onRoomState: (state: { tasks?: LiveTask[] }) => {
        if (state.tasks) {
          setTasks(state.tasks)
        }
      },
    }
  }, [selectedSessionId, session?.user?.id, session?.user?.name])

  const { socket, error } = useSocket(socketOptions)

  useEffect(() => {
    setTasks([])
    setActiveTaskId(null)
    setUnseenTaskIds([])
    setQuestionDrafts({})
    setMyBoardPages(createDefaultWhiteboardPages())
    setMyBoardPageIndex(0)
    setTutorBoardPages(createDefaultWhiteboardPages())
    setTutorBoardPageIndex(0)
    setChatMessages([])
  }, [selectedSessionId])

  useEffect(() => {
    if (!selectedSessionId) return
    let cancelled = false
    const loadSession = async () => {
      try {
        const res = await fetch(`/api/class/rooms/${selectedSessionId}/join`, {
          method: 'POST',
          credentials: 'include',
        })
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        setSessionContext({
          topic: data?.session?.topic ?? null,
          objectives: data?.session?.objectives ?? null,
          roomUrl: data?.roomUrl ?? null,
          token: data?.token ?? null,
          tutorUsername: data?.session?.tutor?.profile?.name || 'Tutor',
          courseCategory: data?.session?.category || 'General',
        })
      } catch {
        // ignore
      }
    }
    loadSession()
    return () => {
      cancelled = true
    }
  }, [selectedSessionId])

  useEffect(() => {
    if (!socket) return
    const handleChatMessage = (message: ChatMessage) => {
      setChatMessages(prev => [...prev.slice(-19), message])
    }
    socket.on('chat_message', handleChatMessage)
    return () => {
      socket.off('chat_message', handleChatMessage)
    }
  }, [socket])

  useEffect(() => {
    if (!selectedSessionId || typeof window === 'undefined') return
    try {
      const stored = window.localStorage.getItem(`feedback-whiteboards:${selectedSessionId}`)
      if (!stored) return
      const parsed = JSON.parse(stored) as {
        my?: { pages?: WhiteboardPage[]; pageIndex?: number }
        tutor?: { pages?: WhiteboardPage[]; pageIndex?: number }
      }
      if (parsed.my?.pages) setMyBoardPages(parsed.my.pages)
      if (typeof parsed.my?.pageIndex === 'number') setMyBoardPageIndex(parsed.my.pageIndex)
      if (parsed.tutor?.pages) setTutorBoardPages(parsed.tutor.pages)
      if (typeof parsed.tutor?.pageIndex === 'number')
        setTutorBoardPageIndex(parsed.tutor.pageIndex)
    } catch {
      // Ignore malformed cache.
    }
  }, [selectedSessionId])

  useEffect(() => {
    if (!selectedSessionId || typeof window === 'undefined') return
    if (saveBoardsTimeoutRef.current) clearTimeout(saveBoardsTimeoutRef.current)
    saveBoardsTimeoutRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(
          `feedback-whiteboards:${selectedSessionId}`,
          JSON.stringify({
            my: { pages: myBoardPages, pageIndex: myBoardPageIndex },
            tutor: { pages: tutorBoardPages, pageIndex: tutorBoardPageIndex },
          })
        )
      } catch {
        // Ignore write errors (storage quota, etc).
      }
    }, 250)
    return () => {
      if (saveBoardsTimeoutRef.current) clearTimeout(saveBoardsTimeoutRef.current)
    }
  }, [selectedSessionId, myBoardPages, myBoardPageIndex, tutorBoardPages, tutorBoardPageIndex])

  useEffect(() => {
    if (!socket) return

    const handleTaskDeployed = (task: LiveTask) => {
      setTasks(prev => {
        const exists = prev.some(item => item.id === task.id)
        if (exists) {
          return prev.map(item => (item.id === task.id ? { ...item, ...task } : item))
        }
        return [...prev, task]
      })
      setUnseenTaskIds(prev => (prev.includes(task.id) ? prev : [...prev, task.id]))
      toast.success(`New task deployed: ${task.title}`)
    }

    const handleTaskUpdated = (payload: { task: LiveTask }) => {
      setTasks(prev => prev.map(item => (item.id === payload.task.id ? payload.task : item)))
    }

    socket.on('task:deployed', handleTaskDeployed)
    socket.on('task:updated', handleTaskUpdated)

    return () => {
      socket.off('task:deployed', handleTaskDeployed)
      socket.off('task:updated', handleTaskUpdated)
    }
  }, [socket])

  useEffect(() => {
    if (!activeTaskId && tasks.length > 0) {
      setActiveTaskId(tasks[0].id)
    }
  }, [activeTaskId, tasks])

  const activeTask = tasks.find(task => task.id === activeTaskId) || null

  const feedbackPolls = activeTask?.polls ?? []
  const feedbackQuestions = activeTask?.questions ?? []

  const handleSelectTask = (taskId: string) => {
    setActiveTaskId(taskId)
    setUnseenTaskIds(prev => prev.filter(id => id !== taskId))
    setShowTasksPanel(false)
  }

  const handlePollVote = (poll: LiveTaskPoll, value: number) => {
    if (!socket || !selectedSessionId || !activeTask) return
    socket.emit('insight:respond', {
      roomId: selectedSessionId,
      taskId: activeTask.id,
      type: 'poll',
      insightId: poll.id,
      value,
    })
  }

  const handleQuestionSend = (question: LiveTaskQuestion) => {
    const draft = questionDrafts[question.id]?.trim()
    if (!draft || !socket || !selectedSessionId || !activeTask) return
    socket.emit('insight:respond', {
      roomId: selectedSessionId,
      taskId: activeTask.id,
      type: 'question',
      insightId: question.id,
      answer: draft,
    })
    setQuestionDrafts(prev => ({ ...prev, [question.id]: '' }))
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-50">
      {/* Floating collapsed/expanded pill */}
      <div
        className="absolute top-1/2 z-50 flex h-16 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-full border border-l-0 border-[#E5E7EB] bg-white shadow-[2px_0_8px_rgba(0,0,0,0.08)] transition-all hover:w-10 hover:bg-slate-50"
        style={{ left: leftPanelHidden ? 0 : leftPanelWidth - 16 }}
        onClick={() => setLeftPanelHidden(!leftPanelHidden)}
        title={leftPanelHidden ? 'Show directory' : 'Hide directory'}
      >
        {leftPanelHidden ? (
          <ChevronRight className="h-5 w-5 text-[#2B5FB8]" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-[#2B5FB8]" />
        )}
      </div>

      {!leftPanelHidden && (
        <div
          className="absolute inset-y-0 left-0 z-40 flex h-full flex-col border-r border-[#E5E7EB] bg-white shadow-2xl transition-all"
          style={{ width: leftPanelWidth }}
        >
          <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#E5E7EB] px-4">
            <h2 className="text-sm font-semibold text-[#1F2933]">Directory</h2>
          </div>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-1">
              {/* Tutor Root Folder */}
              <div>
                <button
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100"
                  onClick={() => setFoldersOpen(prev => ({ ...prev, tutorRoot: !prev.tutorRoot }))}
                >
                  {foldersOpen.tutorRoot ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                  )}
                  <Folder className="h-4 w-4 shrink-0 text-slate-400" fill="currentColor" />
                  <span className="truncate text-sm font-medium text-slate-700">
                    Tutor@{sessionContext?.tutorUsername || 'username'}
                  </span>
                </button>

                {foldersOpen.tutorRoot && (
                  <div className="mt-1 flex flex-col gap-1 pl-4">
                    {/* Course Category Folder */}
                    <div>
                      <button
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100"
                        onClick={() =>
                          setFoldersOpen(prev => ({
                            ...prev,
                            courseCategory: !prev.courseCategory,
                          }))
                        }
                      >
                        {foldersOpen.courseCategory ? (
                          <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                        )}
                        <Folder className="h-4 w-4 shrink-0 text-indigo-400" fill="currentColor" />
                        <span className="truncate text-sm font-medium text-slate-700">
                          {sessionContext?.courseCategory || 'Course Category'}
                        </span>
                      </button>

                      {foldersOpen.courseCategory && (
                        <div className="mt-1 flex flex-col gap-1 pl-4">
                          {/* 1. Tasks */}
                          <div>
                            <button
                              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100"
                              onClick={() =>
                                setFoldersOpen(prev => ({ ...prev, tasks: !prev.tasks }))
                              }
                            >
                              {foldersOpen.tasks ? (
                                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                              )}
                              <Folder
                                className="h-4 w-4 shrink-0 text-blue-400"
                                fill="currentColor"
                              />
                              <span className="text-sm font-medium text-slate-700">Tasks</span>
                              {unseenTaskIds.length > 0 && (
                                <span className="ml-auto rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] text-white">
                                  {unseenTaskIds.length}
                                </span>
                              )}
                            </button>
                            {foldersOpen.tasks && (
                              <div className="mt-1 flex flex-col gap-0.5 pl-6">
                                {tasks.length === 0 && (
                                  <span className="px-2 py-1 text-xs text-slate-500">
                                    Empty folder
                                  </span>
                                )}
                                {tasks.map(task => (
                                  <button
                                    key={task.id}
                                    onClick={() => handleSelectTask(task.id)}
                                    className={cn(
                                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                                      activeTaskId === task.id
                                        ? 'bg-blue-50 font-medium text-blue-700'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    )}
                                  >
                                    <FileText className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">{task.title}</span>
                                    {unseenTaskIds.includes(task.id) && (
                                      <div className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. Assessments */}
                          <div>
                            <button
                              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100"
                              onClick={() =>
                                setFoldersOpen(prev => ({
                                  ...prev,
                                  assessments: !prev.assessments,
                                }))
                              }
                            >
                              {foldersOpen.assessments ? (
                                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                              )}
                              <Folder
                                className="h-4 w-4 shrink-0 text-purple-400"
                                fill="currentColor"
                              />
                              <span className="text-sm font-medium text-slate-700">
                                Assessments
                              </span>
                            </button>
                            {foldersOpen.assessments && (
                              <div className="mt-1 flex flex-col gap-0.5 pl-6">
                                <span className="px-2 py-1 text-xs text-slate-500">
                                  Empty folder
                                </span>
                              </div>
                            )}
                          </div>

                          {/* 3. Homework */}
                          <div>
                            <button
                              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100"
                              onClick={() =>
                                setFoldersOpen(prev => ({ ...prev, homework: !prev.homework }))
                              }
                            >
                              {foldersOpen.homework ? (
                                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                              )}
                              <Folder
                                className="h-4 w-4 shrink-0 text-emerald-400"
                                fill="currentColor"
                              />
                              <span className="text-sm font-medium text-slate-700">Homework</span>
                            </button>
                            {foldersOpen.homework && (
                              <div className="mt-1 flex flex-col gap-0.5 pl-6">
                                <span className="px-2 py-1 text-xs text-slate-500">
                                  Empty folder
                                </span>
                              </div>
                            )}
                          </div>

                          {/* 4. Reports */}
                          <div>
                            <button
                              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100"
                              onClick={() =>
                                setFoldersOpen(prev => ({ ...prev, reports: !prev.reports }))
                              }
                            >
                              {foldersOpen.reports ? (
                                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                              )}
                              <Folder
                                className="h-4 w-4 shrink-0 text-orange-400"
                                fill="currentColor"
                              />
                              <span className="text-sm font-medium text-slate-700">Reports</span>
                            </button>
                            {foldersOpen.reports && (
                              <div className="mt-1 flex flex-col gap-0.5 pl-6">
                                <span className="px-2 py-1 text-xs text-slate-500">
                                  Empty folder
                                </span>
                              </div>
                            )}
                          </div>

                          {/* 5. Recorded Sessions */}
                          <div>
                            <button
                              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100"
                              onClick={() =>
                                setFoldersOpen(prev => ({
                                  ...prev,
                                  recordedSessions: !prev.recordedSessions,
                                }))
                              }
                            >
                              {foldersOpen.recordedSessions ? (
                                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                              )}
                              <Folder
                                className="h-4 w-4 shrink-0 text-rose-400"
                                fill="currentColor"
                              />
                              <span className="text-sm font-medium text-slate-700">
                                Recorded sessions
                              </span>
                            </button>
                            {foldersOpen.recordedSessions && (
                              <div className="mt-1 flex flex-col gap-0.5 pl-6">
                                <span className="px-2 py-1 text-xs text-slate-500">
                                  Empty folder
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Legacy Assets Mapping - Fallback to Course Category root for now */}
                          {courseAssets.length > 0 && (
                            <div className="mt-2 flex flex-col gap-0.5 pl-6">
                              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                Shared Assets
                              </div>
                              {assetsLoading ? (
                                <span className="flex items-center gap-2 px-2 py-1 text-xs text-slate-500">
                                  <Loader2 className="h-3 w-3 animate-spin" /> Loading...
                                </span>
                              ) : (
                                courseAssets.map(asset => (
                                  <a
                                    key={asset.resourceId}
                                    href={asset.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                                    title={asset.name}
                                  >
                                    <FileText className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                    <span className="truncate">{asset.name}</span>
                                  </a>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>

          <div
            className="absolute bottom-0 right-0 top-0 w-2 cursor-col-resize hover:bg-blue-500/20 active:bg-blue-500/40"
            onMouseDown={e => {
              setLeftPanelResizing(true)
              leftResizeStartX.current = e.clientX
              leftResizeStartW.current = leftPanelWidth
            }}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="bg-[#fafafc] px-4 pb-2 pt-4 sm:px-6">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">Live Classroom</h1>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between gap-4">
                <div className="mt-0 flex shrink-0 items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowTasksPanel(true)}
                    className="gap-2 font-medium text-slate-700 hover:text-slate-900"
                  >
                    <ListTodo className="h-4 w-4" />
                    Directory
                    {unseenTaskIds.length > 0 && (
                      <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">
                        {unseenTaskIds.length}
                      </span>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowFeedbackPanel(true)}
                    className="gap-2 font-medium text-slate-700 hover:text-slate-900"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Feedback
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {sessionContext && (sessionContext.topic || sessionContext.objectives) && (
            <div className="border-t border-blue-100 bg-blue-50/60 px-4 py-2 text-sm text-blue-900">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {sessionContext.topic && (
                  <span>
                    <span className="font-semibold">Lesson:</span> {sessionContext.topic}
                  </span>
                )}
              </div>
              {sessionContext.objectives && sessionContext.objectives.length > 0 && (
                <div className="mt-1 text-xs text-blue-800">
                  <span className="font-semibold">Objectives:</span>{' '}
                  {sessionContext.objectives.map((obj, idx) => (
                    <span key={idx}>
                      {idx + 1}) {obj}{' '}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          <div id="student-live-tabs-portal" className="mt-2 w-full" />
        </div>

        {sessionContext?.roomUrl && (
          <div className="h-44 w-full border-b bg-black sm:h-52">
            <DailyVideoFrame roomUrl={sessionContext.roomUrl} token={sessionContext.token} />
          </div>
        )}

        <div className="flex-1 p-4 pt-4 sm:p-6">
          <div className="flex h-full flex-col gap-6">
            <Tabs defaultValue="task" className="flex flex-1 flex-col">
              {portalTarget ? (
                createPortal(
                  <div className="mb-0 min-h-[48px] w-full shrink-0">
                    <TabsList className="grid h-[48px] w-full grid-cols-3 gap-2 border-0 bg-transparent p-0 shadow-none">
                      <TabsTrigger
                        value="task"
                        className="flex items-center justify-center gap-2 rounded-full border-0 px-4 py-2.5 text-sm font-semibold transition-all data-[state=inactive]:bg-white data-[state=active]:bg-[linear-gradient(145deg,rgba(18,20,22,0.82),rgba(62,68,75,0.62))] data-[state=active]:text-white data-[state=inactive]:text-[#1F2933] data-[state=active]:shadow-[0_12px_26px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.25)] data-[state=inactive]:shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                      >
                        Classroom
                      </TabsTrigger>
                      <TabsTrigger
                        value="my-board"
                        className="flex items-center justify-center gap-2 rounded-full border-0 px-4 py-2.5 text-sm font-semibold transition-all data-[state=inactive]:bg-white data-[state=active]:bg-[linear-gradient(145deg,rgba(18,20,22,0.82),rgba(62,68,75,0.62))] data-[state=active]:text-white data-[state=inactive]:text-[#1F2933] data-[state=active]:shadow-[0_12px_26px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.25)] data-[state=inactive]:shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                      >
                        My Board
                      </TabsTrigger>
                      <TabsTrigger
                        value="tutor-board"
                        className="flex items-center justify-center gap-2 rounded-full border-0 px-4 py-2.5 text-sm font-semibold transition-all data-[state=inactive]:bg-white data-[state=active]:bg-[linear-gradient(145deg,rgba(18,20,22,0.82),rgba(62,68,75,0.62))] data-[state=active]:text-white data-[state=inactive]:text-[#1F2933] data-[state=active]:shadow-[0_12px_26px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.25)] data-[state=inactive]:shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                      >
                        Tutor Board
                      </TabsTrigger>
                    </TabsList>
                  </div>,
                  portalTarget
                )
              ) : (
                <div className="hidden">
                  <TabsList>
                    <TabsTrigger value="task">Classroom</TabsTrigger>
                    <TabsTrigger value="my-board">My Board</TabsTrigger>
                    <TabsTrigger value="tutor-board">Tutor Board</TabsTrigger>
                  </TabsList>
                </div>
              )}

              <TabsContent value="task" className="flex flex-1 flex-col outline-none">
                <Card className="flex min-h-[420px] flex-1 flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-3">
                      <span>{activeTask?.title || 'Select a task to begin'}</span>
                      <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[calc(100vh-280px)] min-h-[600px] flex-1 space-y-4 overflow-hidden p-0">
                    {activeTask ? (
                      <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
                        {(activeTask.sourceDocument || activeTask.content) && (
                          <ResizablePanel
                            defaultSize={activeTask.dmiItems?.length ? 50 : 100}
                            minSize={20}
                          >
                            <div className="h-full w-full overflow-y-auto p-4">
                              {activeTask.sourceDocument ? (
                                <div className="h-full space-y-2">
                                  <p className="text-xs font-semibold uppercase text-gray-500">
                                    Document
                                  </p>
                                  {activeTask.sourceDocument.mimeType === 'application/pdf' ? (
                                    <div className="h-[calc(100%-24px)] w-full overflow-hidden rounded border">
                                      <iframe
                                        src={`${activeTask.sourceDocument.fileUrl}#toolbar=0&navpanes=0`}
                                        title={activeTask.sourceDocument.fileName}
                                        className="h-full w-full"
                                      />
                                    </div>
                                  ) : activeTask.sourceDocument.mimeType.startsWith('image/') ? (
                                    <div className="overflow-hidden rounded border">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={activeTask.sourceDocument.fileUrl}
                                        alt={activeTask.sourceDocument.fileName}
                                        className="h-auto max-h-[500px] w-full object-contain"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 rounded border bg-white p-4">
                                      <FileText className="h-5 w-5 text-blue-600" />
                                      <a
                                        href={activeTask.sourceDocument.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-blue-600 underline"
                                      >
                                        Open {activeTask.sourceDocument.fileName}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="rounded-lg border bg-white p-4 text-sm text-gray-700">
                                  <p className="whitespace-pre-wrap">{activeTask.content}</p>
                                </div>
                              )}
                            </div>
                          </ResizablePanel>
                        )}

                        {(activeTask.sourceDocument || activeTask.content) &&
                        activeTask.dmiItems?.length ? (
                          <ResizableHandle withHandle />
                        ) : null}

                        {activeTask.dmiItems && activeTask.dmiItems.length > 0 && (
                          <ResizablePanel
                            defaultSize={activeTask.sourceDocument || activeTask.content ? 50 : 100}
                            minSize={20}
                          >
                            <div className="h-full w-full overflow-y-auto bg-gray-50/50 p-4">
                              <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase text-gray-500">
                                  Task Prompts (DMI)
                                </p>
                                <div className="space-y-2">
                                  {activeTask.dmiItems.map(item => (
                                    <div
                                      key={item.id}
                                      className="rounded-lg border bg-white p-3 shadow-sm"
                                    >
                                      <p className="mb-1 text-xs font-semibold text-blue-600">
                                        Q{item.questionNumber}
                                      </p>
                                      <p className="text-sm font-medium text-gray-800">
                                        {item.questionText}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </ResizablePanel>
                        )}
                      </ResizablePanelGroup>
                    ) : (
                      <div className="flex h-full items-center justify-center p-8">
                        <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
                          Choose a task from the Tasks panel to view it here.
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="mt-4 w-full rounded-2xl border border-cyan-300 bg-white/90 shadow-[0_0_15px_rgba(34,211,238,0.4)] backdrop-blur-md transition-all duration-300 focus-within:shadow-[0_0_25px_rgba(34,211,238,0.6)]">
                  <div className="relative flex w-full flex-col p-px">
                    <div className="flex w-full flex-col">
                      <AutoTextarea
                        placeholder="Type a message to the class..."
                        className="min-h-[100px] w-full flex-1 border-0 bg-transparent px-4 py-4 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={chatInput}
                        onChange={event => setChatInput(event.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            if (chatInput.trim() && socket) {
                              socket.emit('chat_message', { text: chatInput.trim() })
                              setChatInput('')
                            }
                          }
                        }}
                      />
                      <div className="flex w-full items-center justify-end gap-2 px-2 pb-2">
                        <Button
                          size="icon"
                          className="h-9 w-9 rounded-xl bg-slate-400 shadow-sm hover:bg-slate-500 disabled:opacity-30"
                          disabled={!chatInput.trim() || !socket}
                          onClick={() => {
                            if (chatInput.trim() && socket) {
                              socket.emit('chat_message', { text: chatInput.trim() })
                              setChatInput('')
                            }
                          }}
                          title="Send"
                        >
                          <Send className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="my-board" className="flex-1 outline-none">
                <div className="flex h-[calc(100vh-320px)] min-h-[600px] flex-col overflow-hidden">
                  <EnhancedWhiteboard
                    pages={myBoardPages}
                    currentPageIndex={myBoardPageIndex}
                    onPagesChange={setMyBoardPages}
                    onPageIndexChange={setMyBoardPageIndex}
                  />
                </div>
              </TabsContent>

              <TabsContent value="tutor-board" className="flex-1 outline-none">
                <div className="flex h-[calc(100vh-320px)] min-h-[600px] flex-col overflow-hidden">
                  <EnhancedWhiteboard
                    readOnly
                    pages={tutorBoardPages}
                    currentPageIndex={tutorBoardPageIndex}
                    onPagesChange={setTutorBoardPages}
                    onPageIndexChange={setTutorBoardPageIndex}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Sheet open={showTasksPanel} onOpenChange={setShowTasksPanel}>
        <SheetContent side="right" className="w-[340px] sm:w-[380px]">
          <SheetHeader>
            <SheetTitle>Tasks & Assessments</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {tasks.length === 0 && <p className="text-sm text-gray-500">No tasks deployed yet.</p>}
            {tasks.map(task => (
              <button
                key={task.id}
                type="button"
                onClick={() => handleSelectTask(task.id)}
                className={`flex w-full flex-col gap-1 rounded-lg border px-3 py-2 text-left transition-colors ${
                  activeTaskId === task.id
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-100 hover:bg-blue-50/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-gray-900">{task.title}</span>
                  {unseenTaskIds.includes(task.id) && (
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">
                      New
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  Deployed {new Date(task.deployedAt).toLocaleTimeString()}
                </span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showFeedbackPanel} onOpenChange={setShowFeedbackPanel}>
        <SheetContent side="right" className="w-full sm:w-[50vw] sm:max-w-[50vw]">
          <SheetHeader>
            <SheetTitle>Feedback</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            {!activeTask && (
              <p className="text-sm text-gray-500">Select a task to see feedback prompts.</p>
            )}
            {activeTask && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Active Task</p>
                  <p className="text-sm font-medium text-gray-900">{activeTask.title}</p>
                </div>

                {feedbackPolls.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase text-gray-500">Polls</p>
                    {feedbackPolls.map(poll => {
                      const selectedValue = poll.responses.find(
                        response => response.studentId === session?.user?.id
                      )?.value
                      return (
                        <div key={poll.id} className="rounded-lg border bg-white p-4">
                          <p className="text-sm font-medium text-gray-900">{poll.question}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {poll.options.map(option => (
                              <Button
                                key={`${poll.id}-${option}`}
                                variant={selectedValue === option ? 'default' : 'outline'}
                                size="sm"
                                disabled={poll.status === 'closed'}
                                onClick={() => handlePollVote(poll, option)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                          {poll.status === 'closed' && (
                            <p className="mt-2 text-xs text-gray-500">Poll closed</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {feedbackQuestions.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase text-gray-500">Questions</p>
                    {feedbackQuestions.map(question => (
                      <div key={question.id} className="rounded-lg border bg-white p-4">
                        <p className="text-sm font-medium text-gray-900">{question.prompt}</p>
                        <div className="mt-3">
                          <AutoTextarea
                            placeholder="Type your answer..."
                            className="min-h-[72px]"
                            value={questionDrafts[question.id] || ''}
                            onChange={event =>
                              setQuestionDrafts(prev => ({
                                ...prev,
                                [question.id]: event.target.value,
                              }))
                            }
                          />
                          <div className="mt-2 flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleQuestionSend(question)}
                              disabled={!questionDrafts[question.id]?.trim()}
                            >
                              Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {feedbackPolls.length === 0 && feedbackQuestions.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Waiting for tutor insights to appear here.
                  </p>
                )}

                <div className="border-t pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Class Chat</p>
                  <ScrollArea className="h-48 rounded-lg border bg-gray-50 p-2">
                    <div className="space-y-2">
                      {chatMessages.length === 0 && (
                        <p className="text-center text-xs text-gray-400">No messages yet.</p>
                      )}
                      {chatMessages.map(msg => (
                        <div key={msg.id} className="flex flex-col text-sm">
                          <span className="text-[10px] text-gray-500">{msg.name}</span>
                          <div className="w-fit max-w-[90%] rounded-lg bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-sm">
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="mt-2 flex items-end gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          if (chatInput.trim() && socket) {
                            socket.emit('chat_message', { text: chatInput.trim() })
                            setChatInput('')
                          }
                        }
                      }}
                      className="min-h-[36px] flex-1 text-xs"
                    />
                    <Button
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      disabled={!chatInput.trim() || !socket}
                      onClick={() => {
                        if (chatInput.trim() && socket) {
                          socket.emit('chat_message', { text: chatInput.trim() })
                          setChatInput('')
                        }
                      }}
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
