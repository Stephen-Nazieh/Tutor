/**
 * Insights Layout with Integrated Course Builder
 * Integrated Course Builder within the Live Session Insights page
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
    <div className="flex min-h-screen w-full flex-col">
      {/* Main Content */}
      <div className="flex min-h-0 w-full flex-1">
        {/* Course Builder */}
        <div className="flex min-h-0 w-full flex-1">{children}</div>
      </div>
    </div>
  )
}
