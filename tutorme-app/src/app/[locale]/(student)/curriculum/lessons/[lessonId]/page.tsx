/**
 * Curriculum Lesson Session Page
 * Interactive AI tutoring session for structured curriculum lessons
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import {
  Send,
  Lightbulb,
  Target,
  CheckCircle,
  BookOpen,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  section?: string
  whiteboardItems?: WhiteboardItem[]
  understandingLevel?: number
}

interface WhiteboardItem {
  type: 'code' | 'diagram' | 'formula' | 'text'
  content: string
  caption?: string
}

interface LessonSession {
  id: string
  lessonId: string
  currentSection: string
  conceptMastery: Record<string, number>
  status: string
  lesson: {
    title: string
    objectives: string[]
    teachingPoints: string[]
    sections: string[]
    examples: any[]
    practiceProblems: any[]
  }
}

const SECTIONS = [
  { id: 'introduction', label: 'Introduction', icon: BookOpen },
  { id: 'concept', label: 'Concept', icon: Lightbulb },
  { id: 'example', label: 'Example', icon: Play },
  { id: 'practice', label: 'Practice', icon: Target },
  { id: 'review', label: 'Review', icon: CheckCircle },
]

export default function LessonSessionPage() {
  const params = useParams()
  const lessonId = params.lessonId as string

  const [session, setSession] = useState<LessonSession | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [whiteboardItems, setWhiteboardItems] = useState<WhiteboardItem[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load lesson session
  useEffect(() => {
    loadLessonSession()
  }, [lessonId])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadLessonSession = async () => {
    try {
      // Get lesson details
      const lessonRes = await fetch(`/api/curriculum/lessons/${lessonId}`)
      if (!lessonRes.ok) throw new Error('Failed to load lesson')
      const lessonData = await lessonRes.json()

      // Get or create session
      const sessionRes = await fetch(`/api/curriculum/lessons/${lessonId}/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const sessionData = await sessionRes.json()

      setSession({
        ...sessionData.session,
        lesson: lessonData.lesson,
      })

      // Load message history
      const messagesRes = await fetch(`/api/curriculum/lessons/${lessonId}/messages`)
      if (messagesRes.ok) {
        const messagesData = await messagesRes.json()
        setMessages(
          messagesData.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }))
        )
      }
    } catch (error) {
      console.error('Failed to load session:', error)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !session || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      section: session.currentSection,
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const res = await fetch(`/api/curriculum/lessons/${lessonId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: session.id,
          currentSection: session.currentSection,
        }),
      })

      if (!res.ok) throw new Error('Failed to get response')

      const data = await res.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        section: data.currentSection,
        whiteboardItems: data.whiteboardItems,
        understandingLevel: data.understandingLevel,
      }

      setMessages(prev => [...prev, assistantMessage])

      if (data.whiteboardItems) {
        setWhiteboardItems(data.whiteboardItems)
      }

      if (data.currentSection && data.currentSection !== session.currentSection) {
        setSession(prev => (prev ? { ...prev, currentSection: data.currentSection } : null))
      }

      if (data.conceptMastery) {
        setSession(prev => (prev ? { ...prev, conceptMastery: data.conceptMastery } : null))
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentSectionIndex = () => {
    return SECTIONS.findIndex(s => s.id === session?.currentSection)
  }

  const getSectionProgress = (sectionId: string) => {
    if (!session?.conceptMastery) return 0
    const concepts = Object.values(session.conceptMastery)
    if (concepts.length === 0) return 0
    return Math.round(concepts.reduce((a, b) => a + b, 0) / concepts.length)
  }

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    )
  }

  const currentSection = SECTIONS[getCurrentSectionIndex()]
  const SectionIcon = currentSection?.icon || BookOpen

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Lesson Progress */}
      <div className="flex w-72 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h2 className="mb-1 font-semibold text-gray-900">{session.lesson.title}</h2>
          <p className="text-sm text-gray-500">Learn with AI tutor</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-2 p-4">
            {/* Section Progress */}
            <div className="space-y-2">
              {SECTIONS.map((section, index) => {
                const isCompleted = index < getCurrentSectionIndex()
                const isCurrent = index === getCurrentSectionIndex()
                const Icon = section.icon

                return (
                  <div
                    key={section.id}
                    className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                      isCurrent
                        ? 'border border-indigo-200 bg-indigo-50'
                        : isCompleted
                          ? 'border border-green-200 bg-green-50'
                          : 'border border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div
                      className={`rounded-lg p-2 ${
                        isCurrent
                          ? 'bg-indigo-600 text-white'
                          : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          isCurrent
                            ? 'text-indigo-900'
                            : isCompleted
                              ? 'text-green-900'
                              : 'text-gray-600'
                        }`}
                      >
                        {section.label}
                      </p>
                      {isCurrent && (
                        <Progress value={getSectionProgress(section.id)} className="mt-1 h-1" />
                      )}
                    </div>
                    {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                )
              })}
            </div>

            {/* Objectives */}
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium text-gray-700">Learning objectives</h3>
              <ul className="space-y-2">
                {session.lesson.objectives?.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Teaching Points */}
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium text-gray-700">Key points</h3>
              <div className="flex flex-wrap gap-2">
                {session.lesson.teachingPoints?.map((point, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {point}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Concept Mastery */}
        <div className="border-t border-gray-200 p-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">Concept mastery</h3>
          <div className="space-y-2">
            {Object.entries(session.conceptMastery || {}).map(([concept, mastery]) => (
              <div key={concept}>
                <div className="mb-1 flex justify-between text-xs text-gray-600">
                  <span>{concept}</span>
                  <span>{mastery}%</span>
                </div>
                <Progress value={mastery} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-100 p-2">
                <SectionIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">
                  Current section: {currentSection?.label}
                </h1>
                <p className="text-sm text-gray-500">
                  {getCurrentSectionIndex() + 1} / {SECTIONS.length} sections
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={loadLessonSession}>
                <RotateCcw className="mr-1 h-4 w-4" />
                Restart
              </Button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-indigo-50 p-4">
                  <SectionIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Start {currentSection?.label}
                </h3>
                <p className="mx-auto max-w-md text-gray-600">
                  Ask the AI tutor a question, or let me know when you're ready to start.
                </p>
              </div>
            )}

            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {message.role === 'user' ? 'Me' : 'AI'}
                </div>
                <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <Card
                    className={message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white'}
                  >
                    <CardContent className="p-3">
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>

                      {/* Whiteboard Items */}
                      {message.whiteboardItems && message.whiteboardItems.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.whiteboardItems.map((item, index) => (
                            <div
                              key={index}
                              className="rounded-lg bg-gray-900 p-3 font-mono text-sm text-gray-100"
                            >
                              <pre className="overflow-x-auto">{item.content}</pre>
                              {item.caption && (
                                <p className="mt-2 text-xs text-gray-400">{item.caption}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <p className="mt-1 text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                  AI
                </div>
                <Card className="bg-white">
                  <CardContent className="p-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-100" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="mx-auto flex max-w-3xl gap-3">
            <Textarea
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Type your question or answer..."
              className="min-h-[80px] flex-1 resize-none"
            />
            <div className="flex flex-col gap-2">
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="h-10"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => setInputMessage('')}
              >
                Clear
              </Button>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-gray-400">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>

      {/* Right Sidebar - Whiteboard */}
      {whiteboardItems.length > 0 && (
        <div className="flex w-80 flex-col border-l border-gray-800 bg-gray-900">
          <div className="border-b border-gray-800 p-4">
            <h3 className="flex items-center gap-2 font-medium text-white">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              Whiteboard
            </h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {whiteboardItems.map((item, index) => (
                <div key={index} className="rounded-lg border border-gray-700 bg-gray-800 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="border-gray-600 text-xs text-gray-400">
                      {item.type}
                    </Badge>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-gray-100">
                    {item.content}
                  </pre>
                  {item.caption && <p className="mt-2 text-xs text-gray-500">{item.caption}</p>}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
