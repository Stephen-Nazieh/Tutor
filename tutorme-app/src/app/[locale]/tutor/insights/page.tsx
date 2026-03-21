'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Send,
  BarChart3,
  HelpCircle,
  MessageSquare,
  Users,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSocket } from '@/hooks/use-socket'
import { toast } from 'sonner'

// Analytics Components
interface AnalyticsData {
  activeStudents: number
  taskCompletionRate: number
  averageScore: number
  activePolls: number
  pendingQuestions: number
  pollResults: {
    pollId: string
    question: string
    responses: { option: number; count: number }[]
    totalResponses: number
  }[]
}

// Poll Response Data
interface PollResponse {
  studentId: string
  studentName: string
  option: number
  respondedAt: string
}

export default function TutorInsightsPage() {
  const { data: session } = useSession()
  const { socket, isConnected } = useSocket()
  const [activeTab, setActiveTab] = useState('analytics')
  const [inputText, setInputText] = useState('')
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    activeStudents: 0,
    taskCompletionRate: 0,
    averageScore: 0,
    activePolls: 0,
    pendingQuestions: 0,
    pollResults: [],
  })
  const [pollResponses, setPollResponses] = useState<Record<string, PollResponse[]>>({})
  const [isSending, setIsSending] = useState(false)

  const tutorId = session?.user?.id
  const tutorName = session?.user?.name || 'Tutor'

  // Default questions for tabs
  const defaultPollQuestion = 'Did you find this task difficult?'
  const defaultQuestionText = 'Do you have a question about this task?'

  // Set default input text when tab changes
  useEffect(() => {
    if (activeTab === 'poll') {
      setInputText(defaultPollQuestion)
    } else if (activeTab === 'question') {
      setInputText(defaultQuestionText)
    } else {
      setInputText('')
    }
  }, [activeTab])

  // Socket.io event handlers
  useEffect(() => {
    if (!socket || !tutorId) return

    // Join tutor room
    socket.emit('tutor_insights_join', { tutorId })

    // Listen for analytics updates
    socket.on('analytics_updated', (data: AnalyticsData) => {
      setAnalytics(data)
    })

    // Listen for poll responses
    socket.on(
      'poll_response_received',
      ({ pollId, response }: { pollId: string; response: PollResponse }) => {
        setPollResponses(prev => ({
          ...prev,
          [pollId]: [...(prev[pollId] || []), response],
        }))

        // Update analytics poll results
        setAnalytics(prev => ({
          ...prev,
          pollResults: prev.pollResults.map(poll =>
            poll.pollId === pollId
              ? {
                  ...poll,
                  responses: poll.responses.map(r =>
                    r.option === response.option ? { ...r, count: r.count + 1 } : r
                  ),
                  totalResponses: poll.totalResponses + 1,
                }
              : poll
          ),
        }))
      }
    )

    // Listen for question answers
    socket.on(
      'question_answer_received',
      ({ questionId, answer }: { questionId: string; answer: string }) => {
        toast.info(`New answer received for question`)
      }
    )

    return () => {
      socket.off('analytics_updated')
      socket.off('poll_response_received')
      socket.off('question_answer_received')
    }
  }, [socket, tutorId])

  const handleSend = async () => {
    if (!inputText.trim() || !socket || !tutorId) return

    setIsSending(true)

    try {
      if (activeTab === 'poll') {
        // Send poll to students
        const pollData = {
          id: `poll-${Date.now()}`,
          question: inputText,
          options: [1, 2, 3, 4, 5],
          responses: {},
          isActive: true,
          sentAt: new Date().toISOString(),
          tutorId,
          tutorName,
        }

        socket.emit('send_poll', pollData)

        // Update local analytics
        setAnalytics(prev => ({
          ...prev,
          activePolls: prev.activePolls + 1,
          pollResults: [
            ...prev.pollResults,
            {
              pollId: pollData.id,
              question: pollData.question,
              responses: [1, 2, 3, 4, 5].map(n => ({ option: n, count: 0 })),
              totalResponses: 0,
            },
          ],
        }))

        toast.success('Poll sent to students')
      } else if (activeTab === 'question') {
        // Send question to students
        const questionData = {
          id: `question-${Date.now()}`,
          question: inputText,
          sentAt: new Date().toISOString(),
          tutorId,
          tutorName,
        }

        socket.emit('send_question', questionData)

        // Update local analytics
        setAnalytics(prev => ({
          ...prev,
          pendingQuestions: prev.pendingQuestions + 1,
        }))

        toast.success('Question sent to students')
      }

      // Clear input after sending (except for polls which keep default)
      if (activeTab === 'question') {
        setInputText('')
      }
    } catch (error) {
      toast.error('Failed to send')
    } finally {
      setIsSending(false)
    }
  }

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'poll':
        return 'Enter poll question (e.g., Did you find this task difficult?)'
      case 'question':
        return 'Enter question for students...'
      default:
        return ''
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Insights</h1>
          <Badge variant={isConnected ? 'default' : 'secondary'}>
            {isConnected ? 'Live' : 'Connecting...'}
          </Badge>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Course Builder Placeholder */}
        <div className="flex-1 overflow-y-auto border-r bg-white p-4">
          <div className="mb-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <h2 className="text-lg font-medium text-gray-700">Course Builder</h2>
            <p className="mt-2 text-sm text-gray-500">
              Course builder interface will be integrated here
            </p>
            <p className="mt-1 text-xs text-gray-400">
              (Reusing the existing course builder components)
            </p>
          </div>
        </div>

        {/* Right Side - Insights Panel */}
        <div className="flex w-[450px] flex-col bg-white">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
              <TabsTrigger value="analytics" className="gap-1">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="poll" className="gap-1">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Poll</span>
              </TabsTrigger>
              <TabsTrigger value="question" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Question</span>
              </TabsTrigger>
            </TabsList>

            {/* Class Analytics Tab */}
            <TabsContent value="analytics" className="mt-0 flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4 p-4">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-medium text-gray-500">
                          Active Students
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-blue-500" />
                          <span className="text-2xl font-bold">{analytics.activeStudents}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-medium text-gray-500">
                          Task Completion
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span className="text-2xl font-bold">
                            {analytics.taskCompletionRate}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-medium text-gray-500">
                          Avg Score
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-purple-500" />
                          <span className="text-2xl font-bold">{analytics.averageScore}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-medium text-gray-500">
                          Active Polls
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-orange-500" />
                          <span className="text-2xl font-bold">{analytics.activePolls}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Poll Results */}
                  {analytics.pollResults.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-900">Poll Results</h3>
                      {analytics.pollResults.map(poll => (
                        <Card key={poll.pollId}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">{poll.question}</CardTitle>
                            <p className="text-xs text-gray-500">{poll.totalResponses} responses</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {poll.responses.map(r => (
                                <div key={r.option} className="flex items-center gap-2">
                                  <span className="w-4 text-sm font-medium">{r.option}</span>
                                  <div className="flex-1 rounded-full bg-gray-100">
                                    <div
                                      className="h-2 rounded-full bg-blue-500 transition-all"
                                      style={{
                                        width:
                                          poll.totalResponses > 0
                                            ? `${(r.count / poll.totalResponses) * 100}%`
                                            : '0%',
                                      }}
                                    />
                                  </div>
                                  <span className="w-8 text-right text-xs text-gray-500">
                                    {r.count}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Poll Tab */}
            <TabsContent value="poll" className="mt-0 flex-1 overflow-hidden">
              <div className="flex h-full flex-col p-4">
                <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                  <p>
                    Create a poll with a 1-5 rating scale. Students will see numbers 1-5 to select
                    from.
                  </p>
                </div>

                {/* Preview */}
                <div className="mb-4 rounded-lg border bg-gray-50 p-4">
                  <p className="mb-3 text-sm font-medium text-gray-700">Preview:</p>
                  <p className="mb-3 text-gray-900">{inputText || defaultPollQuestion}</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        className="flex h-10 w-10 cursor-default items-center justify-center rounded-lg border-2 border-gray-200 bg-white text-sm font-medium text-gray-700"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1" />
              </div>
            </TabsContent>

            {/* Question Tab */}
            <TabsContent value="question" className="mt-0 flex-1 overflow-hidden">
              <div className="flex h-full flex-col p-4">
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  <p>
                    Ask students an open-ended question. They can type their answers in the feedback
                    panel.
                  </p>
                </div>

                {/* Preview */}
                <div className="mb-4 rounded-lg border bg-gray-50 p-4">
                  <p className="mb-3 text-sm font-medium text-gray-700">Preview:</p>
                  <p className="text-gray-900">{inputText || defaultQuestionText}</p>
                  <div className="mt-3 rounded-lg bg-white p-3 text-sm text-gray-500">
                    Student answer will appear here...
                  </div>
                </div>

                <div className="flex-1" />
              </div>
            </TabsContent>
          </Tabs>

          {/* Bottom Input Area - Kimi AI style */}
          <div className="border-t bg-white p-4">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={getPlaceholder()}
                className="flex-1"
                disabled={activeTab === 'analytics'}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey && activeTab !== 'analytics') {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <Button
                onClick={handleSend}
                disabled={!inputText.trim() || activeTab === 'analytics' || isSending}
                className={cn(
                  'transition-all',
                  activeTab === 'poll' && 'bg-blue-600 hover:bg-blue-700',
                  activeTab === 'question' && 'bg-green-600 hover:bg-green-700'
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">
              {activeTab === 'analytics'
                ? 'View live analytics data'
                : activeTab === 'poll'
                  ? 'Poll will be sent to all connected students'
                  : 'Question will be sent to all connected students'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
