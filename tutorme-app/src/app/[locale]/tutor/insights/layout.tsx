/**
 * Insights Layout with Integrated Course Builder
 * Reuses the full course builder from /tutor/courses/[id]/builder
 * Adds a hidable Insights panel on the right with Analytics, Poll, and Question tabs
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PanelRightClose,
  PanelRightOpen,
  Rocket,
  ArrowLeft,
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

// Analytics Types
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

interface PollResponse {
  studentId: string
  studentName: string
  option: number
  respondedAt: string
}

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  const [isInsightsOpen, setIsInsightsOpen] = useState(true)
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('return') || '/tutor/dashboard'

  // Insights panel state
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
  const [isSending, setIsSending] = useState(false)

  const defaultPollQuestion = 'Did you find this task difficult?'
  const defaultQuestionText = 'Do you have a question about this task?'

  useEffect(() => {
    if (activeTab === 'poll') {
      setInputText(defaultPollQuestion)
    } else if (activeTab === 'question') {
      setInputText(defaultQuestionText)
    } else {
      setInputText('')
    }
  }, [activeTab])

  // Socket.io handlers
  useEffect(() => {
    if (!socket) return

    socket.on('analytics_updated', (data: AnalyticsData) => {
      setAnalytics(data)
    })

    socket.on(
      'poll_response_received',
      ({ pollId, response }: { pollId: string; response: PollResponse }) => {
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

    return () => {
      socket.off('analytics_updated')
      socket.off('poll_response_received')
    }
  }, [socket])

  const handleSend = useCallback(async () => {
    if (!inputText.trim() || !socket) return

    setIsSending(true)
    try {
      if (activeTab === 'poll') {
        const pollData = {
          id: `poll-${Date.now()}`,
          question: inputText,
          options: [1, 2, 3, 4, 5],
          isActive: true,
          sentAt: new Date().toISOString(),
        }
        socket.emit('send_poll', pollData)
        toast.success('Poll sent to students')
      } else if (activeTab === 'question') {
        const questionData = {
          id: `question-${Date.now()}`,
          question: inputText,
          sentAt: new Date().toISOString(),
        }
        socket.emit('send_question', questionData)
        toast.success('Question sent to students')
        setInputText('')
      }
    } catch (error) {
      toast.error('Failed to send')
    } finally {
      setIsSending(false)
    }
  }, [activeTab, inputText, socket])

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'poll':
        return 'Enter poll question...'
      case 'question':
        return 'Enter question for students...'
      default:
        return ''
    }
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href={returnUrl}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Insights & Course Builder</h1>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs',
              isConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            )}
          >
            {isConnected ? 'Live' : 'Offline'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
            <Rocket className="h-4 w-4" />
            Deploy
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left - Course Builder */}
        <div className="flex flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
