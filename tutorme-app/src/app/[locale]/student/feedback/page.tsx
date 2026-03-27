'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
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
import { AutoTextarea } from '@/components/ui/auto-textarea'
import { useSocket } from '@/hooks/use-socket'
import { toast } from 'sonner'
import { ListTodo, MessageSquare, Send, Bell, Loader2, Layout } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EnhancedWhiteboard } from '@/components/class/enhanced-whiteboard'
import type { LiveTask, LiveTaskPoll, LiveTaskQuestion } from '@/lib/socket'

interface SessionSummary {
  id: string
  title: string
  subject: string
  scheduledAt: string
  status: string
}

export default function StudentFeedbackPage() {
  const { data: session } = useSession()
  const [sessions, setSessions] = useState<SessionSummary[]>([])
  const [sessionsLoading, setSessionsLoading] = useState(true)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [tasks, setTasks] = useState<LiveTask[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [showTasksPanel, setShowTasksPanel] = useState(false)
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false)
  const [unseenTaskIds, setUnseenTaskIds] = useState<string[]>([])
  const [questionDrafts, setQuestionDrafts] = useState<Record<string, string>>({})
  const [chatInput, setChatInput] = useState('')

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
          setSelectedSessionId(prev => prev ?? nextSessions[0].id)
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
  }, [selectedSessionId])

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
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Live Classroom</h1>
              <p className="text-xs text-gray-500">Feedback and tasks update in real time.</p>
            </div>
            <div className="min-w-[220px]">
              <Select
                value={selectedSessionId ?? undefined}
                onValueChange={value => setSelectedSessionId(value)}
                disabled={sessionsLoading || sessions.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select live class" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map(sessionItem => (
                    <SelectItem key={sessionItem.id} value={sessionItem.id}>
                      {sessionItem.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedSessionId && sessions.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {sessions.find(item => item.id === selectedSessionId)?.subject || 'Live Session'}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTasksPanel(true)}
              className="gap-2"
            >
              <ListTodo className="h-4 w-4" />
              Tasks
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

      <div className="flex-1 p-4 sm:p-6">
        {error && (
          <Card className="mb-4 border-amber-200 bg-amber-50">
            <CardContent className="py-3 text-sm text-amber-700">
              Realtime updates are offline: {error}
            </CardContent>
          </Card>
        )}
        {sessionsLoading && (
          <div className="flex items-center justify-center py-12 text-gray-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading live classes...
          </div>
        )}
        {!sessionsLoading && sessions.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-sm text-gray-500">
              No active live classes found right now.
            </CardContent>
          </Card>
        )}
        {selectedSessionId && (
          <div className="flex h-full flex-col gap-6">
            <Tabs defaultValue="task" className="flex flex-1 flex-col">
              <TabsList className="mb-4 grid w-full grid-cols-3 gap-1 rounded-xl border border-gray-200 bg-white p-1 md:w-[450px]">
                <TabsTrigger value="task">Current Task</TabsTrigger>
                <TabsTrigger value="my-board">My Board</TabsTrigger>
                <TabsTrigger value="tutor-board">Tutor Board</TabsTrigger>
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
                        <div className="rounded-lg border bg-white p-4 text-sm text-gray-700">
                          <p className="whitespace-pre-wrap">{activeTask.content}</p>
                        </div>
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
                <Card className="flex h-[600px] flex-col overflow-hidden">
                  <EnhancedWhiteboard />
                </Card>
              </TabsContent>

              <TabsContent value="tutor-board" className="flex-1 outline-none">
                <Card className="flex h-[600px] flex-col overflow-hidden">
                  <EnhancedWhiteboard readOnly />
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <div className="border-t bg-white p-4">
        <div className="mx-auto flex max-w-5xl items-end gap-3">
          <div className="relative flex-1">
            <AutoTextarea
              placeholder="Ask your AI coach or share a reflection..."
              className="min-h-[52px] w-full pr-12"
              value={chatInput}
              onChange={event => setChatInput(event.target.value)}
            />
            <Button
              size="icon"
              className="absolute bottom-2 right-2 h-8 w-8"
              disabled={!chatInput.trim()}
              onClick={() => setChatInput('')}
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
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
