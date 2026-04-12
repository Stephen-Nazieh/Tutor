'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { toast } from 'sonner'
import {
  Send,
  BookOpen,
  MessageCircle,
  AlertCircle,
  Video,
  FileText,
  Lightbulb,
  Settings,
  Menu,
  ChevronLeft,
  Mic,
  MicOff,
  GraduationCap,
  Target,
  Flame,
  Zap,
  Globe,
  ChevronRight,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { AIAvatarPlaceholder } from '@/components/ai-tutor/ai-avatar'
const AIAvatar = dynamic(() => import('@/components/ai-tutor/ai-avatar').then(m => m.AIAvatar), {
  ssr: false,
})
import { SkillRadar } from '../../dashboard/components/SkillRadar'
import { AIWhiteboard, extractWhiteboardItems } from '@/components/ai-tutor/ai-whiteboard'
import { TopicSidebar, ENGLISH_TOPICS } from '@/components/ai-tutor/topic-sidebar'
import { TutorPreferences } from '@/components/ai-tutor/tutor-preferences'
import { CourseSidebar, CourseMiniCard } from '@/components/ai-tutor/course-sidebar'
import { AIActivityArea } from '@/components/ai-tutor/ai-activity-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  hintType?: 'socratic' | 'direct' | 'encouragement' | 'clarification'
  relevantConcepts?: string[]
}

interface Enrollment {
  id: string
  subject: string
  englishLevel: string
  focusAreas: string[]
  teachingAge: number
  voiceGender: string
  voiceAccent: string
  avatarStyle: string
  totalMessages: number
  totalSessions: number
}

interface WhiteboardItem {
  id: string
  type: 'text' | 'quote' | 'example' | 'tip'
  content: string
  timestamp: string
}

export default function EnglishTutorPage() {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [usage, setUsage] = useState({ remaining: 5, total: 5 })
  const [whiteboardItems, setWhiteboardItems] = useState<WhiteboardItem[]>([])
  const [currentTopic, setCurrentTopic] = useState<string | undefined>()
  const [showPreferences, setShowPreferences] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  // Sidebar collapsed state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [whiteboardCollapsed, setWhiteboardCollapsed] = useState(false)
  const [activityAreaCollapsed, setActivityAreaCollapsed] = useState(false)

  // Course state
  const [course, setCourse] = useState<any>(null)
  const [currentLessonId, setCurrentLessonId] = useState<string | undefined>()

  // Suggestions based on context
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showCourse, setShowCourse] = useState(false)

  useEffect(() => {
    loadEnrollment()
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadEnrollment = async () => {
    try {
      // Get enrollment
      const enrollRes = await fetch('/api/ai-tutor/enrollments')
      const enrollData = await enrollRes.json()
      const englishEnroll = enrollData.enrollments?.find((e: any) => e.subject === 'english')

      if (!englishEnroll) {
        toast.error('Not enrolled in English tutor')
        router.push('/student/ai-tutor/browse')
        return
      }

      setEnrollment(englishEnroll)

      // Load course if assigned
      if (englishEnroll.courseId) {
        await loadCourse()
      }

      // Load session messages
      const sessionRes = await fetch(`/api/ai-tutor/sessions?enrollmentId=${englishEnroll.id}`)
      const sessionData = await sessionRes.json()

      if (sessionData.sessions?.length > 0) {
        const latestSession = sessionData.sessions[0]
        setMessages(latestSession.messages || [])

        // Extract whiteboard items from messages
        const allItems: WhiteboardItem[] = []
        latestSession.messages?.forEach((msg: any) => {
          if (msg.role === 'assistant') {
            const items = extractWhiteboardItems(msg.content)
            allItems.push(...items)
          }
        })
        setWhiteboardItems(allItems)
      }
    } catch (error) {
      toast.error('Failed to load tutor session')
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || !enrollment) return
    if (usage.remaining === 0) {
      toast.error('Daily message limit reached. Upgrade for more.')
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setIsSpeaking(true)

    try {
      // Use the new gamified chat API
      const res = await fetch('/api/ai-tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          teachingMode: 'standard',
          chatHistory: messages.slice(-5).map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.upgradeRequired) {
          toast.error('Daily limit reached. Upgrade for unlimited messages.')
        }
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.data.response,
        timestamp: new Date().toISOString(),
        hintType: data.data.hintType,
        relevantConcepts: data.data.relevantConcepts,
      }

      setMessages(prev => [...prev, assistantMessage])

      setUsage(prev => ({ ...prev, remaining: prev.remaining - 1 }))

      // Extract whiteboard items from response
      const newItems = extractWhiteboardItems(data.data.response)
      if (newItems.length > 0) {
        setWhiteboardItems(prev => [...prev, ...newItems])
      }

      // TODO: Text-to-speech with selected voice
      // speakText(data.response, enrollment.voiceGender, enrollment.voiceAccent)
    } catch (error) {
      toast.error('Failed to get response')
    } finally {
      setLoading(false)
      setIsSpeaking(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleTopicSelect = (topicId: string) => {
    setCurrentTopic(topicId)
    const topic = ENGLISH_TOPICS.find(t => t.id === topicId)
    if (topic) {
      setInput(`I'd like to learn about ${topic.name.toLowerCase()}. ${topic.description}`)
    }
  }

  const loadCourse = async () => {
    try {
      const res = await fetch('/api/course')
      const data = await res.json()
      if (data.course) {
        setCourse(data.course)

        // Find current lesson
        if (data.course.modules) {
          for (const module of data.course.modules) {
            for (const lesson of module.lessons) {
              if (lesson.progress?.status !== 'COMPLETED') {
                setCurrentLessonId(lesson.id)
                return
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to load course:', error)
    }
  }

  const handleSelectLesson = (lesson: any, module: any) => {
    setCurrentLessonId(lesson.id)
    setInput(
      `Let's work on "${lesson.title}" from ${module.title}. Can you walk me through this lesson?`
    )
    setShowCourse(false)

    // Link session to lesson if available
    if (lesson.id) {
      linkSessionToLesson(lesson.id)
    }
  }

  const linkSessionToLesson = async (lessonId: string) => {
    try {
      // Get current session ID from recent sessions
      const sessionRes = await fetch(`/api/ai-tutor/sessions?enrollmentId=${enrollment?.id}`)
      const sessionData = await sessionRes.json()

      if (sessionData.sessions?.length > 0) {
        const latestSession = sessionData.sessions[0]
        await fetch('/api/ai-tutor/lesson-context', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: latestSession.id,
            lessonId: lessonId,
          }),
        })
      }
    } catch (error) {
      console.error('Failed to link session to lesson:', error)
    }
  }

  const handlePreferencesUpdate = (prefs: any) => {
    if (enrollment) {
      setEnrollment({ ...enrollment, ...prefs })
    }
  }

  const getMood = (hintType?: string): 'neutral' | 'happy' | 'thinking' | 'encouraging' => {
    switch (hintType) {
      case 'encouragement':
        return 'encouraging'
      case 'socratic':
        return 'thinking'
      default:
        return 'neutral'
    }
  }

  if (!enrollment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading English Tutor...</p>
        </div>
      </div>
    )
  }

  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop()
  const currentMood = getMood(lastAssistantMessage?.hintType)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="shrink-0 border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push('/student/ai-tutor')}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold">English AI Tutor</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Badge variant="outline">{enrollment.englishLevel}</Badge>
                <span>Age: {enrollment.teachingAge}</span>
                <span>{enrollment.voiceGender}</span>
                <span>
                  {enrollment.voiceAccent === 'us'
                    ? '🇺🇸'
                    : enrollment.voiceAccent === 'uk'
                      ? '🇬🇧'
                      : '🇦🇺'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Usage Badge */}
            <div className="hidden text-right sm:block">
              <p className="text-xs text-gray-500">
                {usage.remaining === -1 ? 'Unlimited' : `${usage.remaining} left`}
              </p>
            </div>

            {/* Preferences */}
            <Sheet open={showPreferences} onOpenChange={setShowPreferences}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>Preferences</SheetTitle>
                <div className="mt-4">
                  <TutorPreferences
                    enrollmentId={enrollment.id}
                    currentPreferences={{
                      teachingAge: enrollment.teachingAge,
                      voiceGender: enrollment.voiceGender,
                      voiceAccent: enrollment.voiceAccent,
                      avatarStyle: enrollment.avatarStyle,
                    }}
                    onUpdate={handlePreferencesUpdate}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-4">
        {/* Left Sidebar - Worlds & Missions */}
        <div
          className={cn(
            'hidden transition-all duration-300 lg:block',
            sidebarCollapsed ? 'lg:w-16' : 'lg:col-span-1'
          )}
        >
          {course ? (
            <Card className="flex h-full flex-col">
              <Tabs defaultValue="course" className="flex flex-1 flex-col">
                <TabsList
                  className={cn(
                    'mx-4 mb-0 mt-4 grid w-full',
                    sidebarCollapsed ? 'w-10 grid-cols-1' : 'grid-cols-2'
                  )}
                >
                  <TabsTrigger value="course" className={cn(sidebarCollapsed && 'px-2')}>
                    <GraduationCap className="h-4 w-4" />
                    {!sidebarCollapsed && <span className="ml-1">Course</span>}
                  </TabsTrigger>
                  {!sidebarCollapsed && <TabsTrigger value="topics">Topics</TabsTrigger>}
                </TabsList>

                <TabsContent value="course" className="mt-0 flex-1">
                  <CourseSidebar
                    course={course}
                    currentLessonId={currentLessonId}
                    onSelectLesson={handleSelectLesson}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                  />
                </TabsContent>

                {!sidebarCollapsed && (
                  <TabsContent value="topics" className="mt-0 flex-1">
                    <TopicSidebar
                      topics={ENGLISH_TOPICS}
                      currentTopic={currentTopic}
                      onSelectTopic={handleTopicSelect}
                    />
                  </TabsContent>
                )}
              </Tabs>
            </Card>
          ) : (
            <TopicSidebar
              topics={ENGLISH_TOPICS}
              currentTopic={currentTopic}
              onSelectTopic={handleTopicSelect}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          )}
        </div>

        {/* Center Column - Welcome Section, Content Area, Chat at Bottom */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Top: Avatar Section */}
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <AIAvatar isSpeaking={isSpeaking} mood={currentMood} size="md" />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Your English Tutor</h2>
                <p className="mt-1 text-sm text-gray-500">
                  I'm teaching you like a {enrollment.teachingAge}-year-old with a{' '}
                  {enrollment.voiceGender} {enrollment.voiceAccent} voice.
                </p>
              </div>
              {/* Mobile topic menu */}
              <Sheet>
                <SheetTrigger asChild className="mt-4 lg:hidden">
                  <Button variant="outline" size="sm">
                    <Menu className="mr-2 h-4 w-4" />
                    Browse Topics
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetTitle>{course ? 'Course' : 'Topics'}</SheetTitle>
                  <div className="mt-4 h-full">
                    {course ? (
                      <CourseSidebar
                        course={course}
                        currentLessonId={currentLessonId}
                        onSelectLesson={handleSelectLesson}
                      />
                    ) : (
                      <TopicSidebar
                        topics={ENGLISH_TOPICS}
                        currentTopic={currentTopic}
                        onSelectTopic={handleTopicSelect}
                      />
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </Card>

          {/* Middle: Content Area (Lesson/Learning Space) */}
          <Card className="min-h-[200px] flex-1 p-4">
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
              <Lightbulb className="mb-3 h-12 w-12 opacity-50" />
              <p className="text-sm">Learning Content Area</p>
              <p className="mt-1 text-xs">Interactive lessons and exercises will appear here</p>
            </div>
          </Card>

          {/* Bottom: Chat Area */}
          <Card className="flex flex-col overflow-hidden" style={{ maxHeight: '400px' }}>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <AIAvatarPlaceholder mood={getMood(message.hintType)} size="sm" />
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'border bg-white shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>

                      {message.hintType && (
                        <Badge variant="secondary" className="mt-2 text-xs capitalize">
                          {message.hintType}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start gap-3">
                    <AIAvatarPlaceholder mood="thinking" size="sm" />
                    <div className="rounded-lg border bg-white p-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-100" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-200" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t bg-gray-50 p-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsRecording(!isRecording)}
                  className={isRecording ? 'text-red-500' : ''}
                >
                  {isRecording ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Input
                  placeholder="Ask your English question..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading || usage.remaining === 0}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading || usage.remaining === 0}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {usage.remaining === 0 && (
                <p className="mt-2 text-center text-sm text-orange-600">
                  Daily message limit reached. Upgrade for unlimited messages.
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Whiteboard, Skills, and AI Learning Space (Independent Collapse) */}
        <div className="hidden w-80 flex-col gap-4 lg:flex">
          {/* Whiteboard (Top) - Independent Collapse */}
          <div
            className={cn(
              'flex transition-all duration-300',
              whiteboardCollapsed ? 'justify-end' : 'w-full'
            )}
          >
            <AIWhiteboard
              items={whiteboardItems}
              onClear={() => setWhiteboardItems([])}
              collapsed={whiteboardCollapsed}
              onToggleCollapse={() => setWhiteboardCollapsed(!whiteboardCollapsed)}
              collapseDirection="right"
            />
          </div>

          {/* Skills Section */}
          <SkillRadar skills={null} />

          {/* AI Learning Space (Bottom) - Independent Collapse */}
          <div
            className={cn(
              'flex min-h-0 flex-1 transition-all duration-300',
              activityAreaCollapsed ? 'justify-end' : 'w-full'
            )}
          >
            <AIActivityArea
              className={cn(
                'transition-all duration-300',
                activityAreaCollapsed ? 'w-16' : 'flex-1'
              )}
              collapsed={activityAreaCollapsed}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
