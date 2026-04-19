'use client'

import { useEffect, useMemo, useRef, useState, Suspense, type ComponentProps } from 'react'
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
import {
  ListTodo,
  MessageSquare,
  Send,
  Bell,
  Loader2,
  Layout,
  ArrowLeft,
  FileText,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  } | null>(null)
  const [myBoardPages, setMyBoardPages] = useState<WhiteboardPage[]>(createDefaultWhiteboardPages)
  const [myBoardPageIndex, setMyBoardPageIndex] = useState(0)
  const [tutorBoardPages, setTutorBoardPages] = useState<WhiteboardPage[]>(
    createDefaultWhiteboardPages
  )
  const [tutorBoardPageIndex, setTutorBoardPageIndex] = useState(0)
  const saveBoardsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="border-b bg-white">
        <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex flex-1 flex-wrap items-center justify-between gap-3">
            <div className="flex flex-1 items-center justify-center">
              <h1 className="text-lg font-semibold text-gray-900">Live Classroom</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTasksPanel(true)}
                className="gap-2"
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
                size="sm"
                onClick={() => setShowFeedbackPanel(true)}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Feedback
              </Button>
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
      </div>

      {sessionContext?.roomUrl && (
        <div className="h-44 w-full border-b bg-black sm:h-52">
          <DailyVideoFrame roomUrl={sessionContext.roomUrl} token={sessionContext.token} />
        </div>
      )}

      <div className="flex-1 p-4 sm:p-6">
        <div className="flex h-full flex-col gap-6">
          <Tabs defaultValue="task" className="flex flex-1 flex-col">
            <TabsList className="mx-auto mb-6 grid w-full grid-cols-3 gap-1 rounded-xl border border-gray-200 bg-white p-1 md:w-[600px]">
              <TabsTrigger
                value="task"
                className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Classroom
              </TabsTrigger>
              <TabsTrigger
                value="my-board"
                className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                My Board
              </TabsTrigger>
              <TabsTrigger
                value="tutor-board"
                className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Tutor Board
              </TabsTrigger>
            </TabsList>

            <TabsContent value="task" className="flex-1 outline-none">
              <Card className="min-h-[420px]">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-3">
                    <span>{activeTask?.title || 'Select a task to begin'}</span>
                    <Button variant="ghost" size="icon">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeTask ? (
                    <div className="space-y-4">
                      {activeTask.sourceDocument ? (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase text-gray-500">Document</p>
                          {activeTask.sourceDocument.mimeType === 'application/pdf' ? (
                            <div className="overflow-hidden rounded border">
                              <iframe
                                src={activeTask.sourceDocument.fileUrl}
                                title={activeTask.sourceDocument.fileName}
                                className="h-[500px] w-full"
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
                      {activeTask.dmiItems && activeTask.dmiItems.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase text-gray-500">
                            Task Prompts
                          </p>
                          <div className="space-y-2">
                            {activeTask.dmiItems.map(item => (
                              <div key={item.id} className="rounded-lg border bg-white p-3">
                                <p className="text-xs font-semibold text-blue-600">
                                  Q{item.questionNumber}
                                </p>
                                <p className="text-sm text-gray-700">{item.questionText}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
                      Choose a task from the Tasks panel to view it here.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-board" className="flex-1 outline-none">
              <Card className="flex h-[calc(100vh-320px)] min-h-[600px] flex-col overflow-hidden shadow-xl ring-1 ring-black/5">
                <EnhancedWhiteboard
                  pages={myBoardPages}
                  currentPageIndex={myBoardPageIndex}
                  onPagesChange={setMyBoardPages}
                  onPageIndexChange={setMyBoardPageIndex}
                />
              </Card>
            </TabsContent>

            <TabsContent value="tutor-board" className="flex-1 outline-none">
              <Card className="flex h-[calc(100vh-320px)] min-h-[600px] flex-col overflow-hidden shadow-xl ring-1 ring-black/5">
                <EnhancedWhiteboard
                  readOnly
                  pages={tutorBoardPages}
                  currentPageIndex={tutorBoardPageIndex}
                  onPagesChange={setTutorBoardPages}
                  onPageIndexChange={setTutorBoardPageIndex}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <div className="mx-auto flex max-w-5xl items-end gap-3">
          <div className="relative flex-1">
            <AutoTextarea
              placeholder="Type a message to the class..."
              className="min-h-[52px] w-full pr-12"
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
            <Button
              size="icon"
              className="absolute bottom-2 right-2 h-8 w-8"
              disabled={!chatInput.trim() || !socket}
              onClick={() => {
                if (chatInput.trim() && socket) {
                  socket.emit('chat_message', { text: chatInput.trim() })
                  setChatInput('')
                }
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={showTasksPanel} onOpenChange={setShowTasksPanel}>
        <SheetContent side="right" className="w-[340px] sm:w-[380px]">
          <SheetHeader>
            <SheetTitle>Tasks</SheetTitle>
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
