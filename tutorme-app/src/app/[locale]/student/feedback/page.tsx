'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Send, ClipboardList, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSocket } from '@/hooks/use-socket'
import { toast } from 'sonner'

// Types
interface DeployedTask {
  id: string
  taskId: string
  title: string
  content: string
  type: 'task' | 'assessment'
  deployedAt: string
  tutorId: string
  tutorName?: string
}

interface Poll {
  id: string
  taskId: string
  question: string
  options: number[] // [1, 2, 3, 4, 5]
  responses: Record<string, number> // studentId -> selected option
  isActive: boolean
  sentAt: string
}

interface Question {
  id: string
  taskId: string
  question: string
  answer?: string
  answeredAt?: string
  sentAt: string
}

interface FeedbackItem {
  id: string
  type: 'poll' | 'question'
  data: Poll | Question
}

export default function StudentFeedbackPage() {
  const { data: session } = useSession()
  const { socket, isConnected } = useSocket()
  const [tasks, setTasks] = useState<DeployedTask[]>([])
  const [activeTask, setActiveTask] = useState<DeployedTask | null>(null)
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null)
  const [questionAnswer, setQuestionAnswer] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [isTasksOpen, setIsTasksOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const studentId = session?.user?.id

  // Fetch initial deployed tasks
  useEffect(() => {
    const fetchDeployedTasks = async () => {
      try {
        const res = await fetch('/api/student/feedback/tasks')
        if (res.ok) {
          const data = await res.json()
          setTasks(data.tasks || [])
        }
      } catch (error) {
        console.error('Failed to fetch deployed tasks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeployedTasks()
  }, [])

  // Socket.io event handlers
  useEffect(() => {
    if (!socket || !studentId) return

    // Join student room
    socket.emit('student_feedback_join', { studentId })

    // Listen for new deployed tasks
    socket.on('task_deployed', (task: DeployedTask) => {
      setTasks(prev => [task, ...prev])
      toast.info(`New task deployed: ${task.title}`)
    })

    // Listen for new polls
    socket.on('poll_received', (poll: Poll) => {
      setFeedbackItems(prev => [...prev, { id: poll.id, type: 'poll', data: poll }])
      setSelectedPollOption(null)
      toast.info('New poll received from tutor')
    })

    // Listen for new questions
    socket.on('question_received', (question: Question) => {
      setFeedbackItems(prev => [...prev, { id: question.id, type: 'question', data: question }])
      setQuestionAnswer('')
      toast.info('New question from tutor')
    })

    // Listen for poll updates (closed, responses updated)
    socket.on('poll_updated', (updatedPoll: Poll) => {
      setFeedbackItems(prev =>
        prev.map(item =>
          item.type === 'poll' && item.data.id === updatedPoll.id
            ? { ...item, data: updatedPoll }
            : item
        )
      )
    })

    return () => {
      socket.off('task_deployed')
      socket.off('poll_received')
      socket.off('question_received')
      socket.off('poll_updated')
    }
  }, [socket, studentId])

  // Scroll to bottom of feedback
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [feedbackItems])

  const handleTaskClick = (task: DeployedTask) => {
    setActiveTask(task)
    // Load feedback items for this task
    const taskFeedback = feedbackItems.filter(item => item.data.taskId === task.taskId)
    if (taskFeedback.length === 0) {
      // Clear feedback items that aren't for this task
      setFeedbackItems([])
    }
  }

  const handlePollResponse = (pollId: string, option: number) => {
    if (!studentId || !socket) return

    setSelectedPollOption(option)
    socket.emit('poll_response', {
      pollId,
      studentId,
      option,
      taskId: activeTask?.taskId,
    })
  }

  const handleQuestionSubmit = (questionId: string) => {
    if (!studentId || !socket || !questionAnswer.trim()) return

    socket.emit('question_answer', {
      questionId,
      studentId,
      answer: questionAnswer,
      taskId: activeTask?.taskId,
    })

    // Update local state
    setFeedbackItems(prev =>
      prev.map(item =>
        item.type === 'question' && item.data.id === questionId
          ? {
              ...item,
              data: {
                ...(item.data as Question),
                answer: questionAnswer,
                answeredAt: new Date().toISOString(),
              },
            }
          : item
      )
    )

    setQuestionAnswer('')
  }

  const handleChatSubmit = () => {
    if (!chatInput.trim() || !socket || !studentId) return

    socket.emit('feedback_chat_message', {
      studentId,
      message: chatInput,
      taskId: activeTask?.taskId,
      timestamp: new Date().toISOString(),
    })

    setChatInput('')
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Feedback Classroom</h1>
          {activeTask && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              {activeTask.title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Tasks Button */}
          <Sheet open={isTasksOpen} onOpenChange={setIsTasksOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ClipboardList className="h-4 w-4" />
                Tasks
                {tasks.length > 0 && (
                  <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-xs text-white">
                    {tasks.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Deployed Tasks</SheetTitle>
              </SheetHeader>
              <ScrollArea className="mt-4 h-[calc(100vh-120px)]">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <ClipboardList className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                    <p>No tasks deployed yet</p>
                    <p className="text-sm">Tasks will appear here when your tutor deploys them</p>
                  </div>
                ) : (
                  <div className="space-y-3 pr-4">
                    {tasks.map(task => (
                      <button
                        key={task.id}
                        onClick={() => {
                          handleTaskClick(task)
                          setIsTasksOpen(false)
                        }}
                        className={cn(
                          'w-full rounded-lg border p-4 text-left transition-all hover:shadow-md',
                          activeTask?.id === task.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-blue-300'
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{task.title}</h3>
                            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                              {task.content}
                            </p>
                          </div>
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-xs',
                              task.type === 'assessment'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-green-100 text-green-700'
                            )}
                          >
                            {task.type}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                          <span>{task.tutorName || 'Tutor'}</span>
                          <span>{new Date(task.deployedAt).toLocaleTimeString()}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {/* Feedback Button */}
          <Sheet open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Feedback
                {feedbackItems.length > 0 && (
                  <span className="rounded-full bg-green-500 px-1.5 py-0.5 text-xs text-white">
                    {feedbackItems.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[50vw]">
              <SheetHeader>
                <SheetTitle>Feedback Panel</SheetTitle>
              </SheetHeader>
              <ScrollArea className="mt-4 h-[calc(100vh-200px)]">
                <div className="space-y-4 pr-4">
                  {feedbackItems.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                      <MessageSquare className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                      <p>No feedback items yet</p>
                      <p className="text-sm">Polls and questions will appear here</p>
                    </div>
                  ) : (
                    feedbackItems.map(item => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        {item.type === 'poll' ? (
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {(item.data as Poll).question}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">Rate from 1 to 5</p>
                            <div className="mt-3 flex gap-2">
                              {(item.data as Poll).options.map(option => (
                                <button
                                  key={option}
                                  onClick={() => handlePollResponse(item.data.id, option)}
                                  disabled={!(item.data as Poll).isActive}
                                  className={cn(
                                    'flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-medium transition-all',
                                    selectedPollOption === option
                                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50',
                                    !(item.data as Poll).isActive && 'cursor-not-allowed opacity-50'
                                  )}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                            {(item.data as Poll).isActive ? (
                              <p className="mt-2 text-xs text-green-600">Poll is active</p>
                            ) : (
                              <p className="mt-2 text-xs text-gray-500">Poll closed</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {(item.data as Question).question}
                            </h4>
                            {(item.data as Question).answer ? (
                              <div className="mt-3 rounded-lg bg-green-50 p-3">
                                <p className="text-sm text-gray-700">
                                  {(item.data as Question).answer}
                                </p>
                                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Submitted
                                </div>
                              </div>
                            ) : (
                              <div className="mt-3 flex gap-2">
                                <Input
                                  value={questionAnswer}
                                  onChange={e => setQuestionAnswer(e.target.value)}
                                  placeholder="Type your answer..."
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleQuestionSubmit(item.data.id)}
                                  disabled={!questionAnswer.trim()}
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Classroom Content */}
      <main className="flex-1 overflow-hidden p-4">
        {activeTask ? (
          <div className="mx-auto h-full max-w-4xl overflow-y-auto rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{activeTask.title}</h2>
              <span
                className={cn(
                  'rounded-full px-3 py-1 text-sm',
                  activeTask.type === 'assessment'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-green-100 text-green-700'
                )}
              >
                {activeTask.type === 'assessment' ? 'Assessment' : 'Task'}
              </span>
            </div>
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: activeTask.content }} />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <ClipboardList className="mb-4 h-16 w-16 text-gray-300" />
            <p className="text-lg font-medium">No task selected</p>
            <p className="text-sm">Click "Tasks" to view deployed tasks</p>
          </div>
        )}
      </main>

      {/* Bottom Chat Input */}
      <div className="border-t bg-white p-4">
        <div className="mx-auto flex max-w-4xl gap-2">
          <Input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleChatSubmit()
              }
            }}
          />
          <Button onClick={handleChatSubmit} disabled={!chatInput.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-yellow-100 px-4 py-2 text-sm text-yellow-800">
          Reconnecting...
        </div>
      )}
    </div>
  )
}
