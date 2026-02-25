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
  ChevronRight
} from 'lucide-react'
import { AIAvatar, AIAvatarPlaceholder } from '@/components/ai-tutor/ai-avatar'
import { SkillRadar } from '../../dashboard/components'
import { AIWhiteboard, extractWhiteboardItems } from '@/components/ai-tutor/ai-whiteboard'
import { TopicSidebar, ENGLISH_TOPICS } from '@/components/ai-tutor/topic-sidebar'
import { TutorPreferences } from '@/components/ai-tutor/tutor-preferences'
import { CurriculumSidebar, CurriculumMiniCard } from '@/components/ai-tutor/curriculum-sidebar'
import { AIActivityArea } from '@/components/ai-tutor/ai-activity-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { 
  PersonalitySelector,
  MissionModeToggle,
  WorldsSidebar,
  ConfidenceMeter,
  XpAnimation,
  LevelUpAnimation
} from '@/components/gamification'
import type { AvatarPersonality } from '@/lib/gamification/service'

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
  
  // Curriculum state
  const [curriculum, setCurriculum] = useState<any>(null)
  const [currentLessonId, setCurrentLessonId] = useState<string | undefined>()
  
  // Suggestions based on context
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showCurriculum, setShowCurriculum] = useState(false)
  
  // GAMIFICATION STATE
  const [personality, setPersonality] = useState<AvatarPersonality>('friendly_mentor')
  const [mode, setMode] = useState<'free' | 'mission'>('free')
  const [currentMission, setCurrentMission] = useState<any>(null)
  const [worlds, setWorlds] = useState<any[]>([])
  const [gamification, setGamification] = useState<any>(null)
  const [confidenceScore, setConfidenceScore] = useState(72)
  const [showXpAnimation, setShowXpAnimation] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [xpGain, setXpGain] = useState({ amount: 0, reason: '' })

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
      
      // Set personality from enrollment
      if (englishEnroll.avatarPersonality) {
        setPersonality(englishEnroll.avatarPersonality)
      }
      
      // Load curriculum if assigned
      if (englishEnroll.curriculumId) {
        await loadCurriculum()
      }
      
      // Load gamification data
      const [usageRes, gamificationRes, worldsRes] = await Promise.all([
        fetch('/api/ai-tutor/usage'),
        fetch('/api/gamification'),
        fetch('/api/gamification/worlds')
      ])
      
      const usageData = await usageRes.json()
      setUsage({
        remaining: usageData.remainingMessages,
        total: usageData.remainingMessages + (usageData.messagesSent || 0)
      })
      
      const gamificationData = await gamificationRes.json()
      if (gamificationData.success) {
        setGamification(gamificationData.data)
        setConfidenceScore(gamificationData.data.skills.confidence)
      }
      
      const worldsData = await worldsRes.json()
      if (worldsData.success) {
        setWorlds(worldsData.data)
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
      timestamp: new Date().toISOString()
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
          personality,
          missionId: currentMission?.id,
          teachingMode: mode === 'mission' ? 'socratic' : 'standard',
          chatHistory: messages.slice(-5).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
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
        relevantConcepts: data.data.relevantConcepts
      }

      setMessages(prev => [...prev, assistantMessage])
      
      // Show XP animation if XP was earned
      if (data.data.xpEarned) {
        setXpGain({ amount: data.data.xpEarned, reason: 'AI Conversation' })
        setShowXpAnimation(true)
      }
      
      // Show level up animation
      if (data.data.leveledUp) {
        setTimeout(() => setShowLevelUp(true), 2000)
      }
      
      // Update gamification data
      if (data.data.gamification) {
        setGamification(data.data.gamification)
        setConfidenceScore(data.data.gamification.skills.confidence)
      }
      
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

  const loadCurriculum = async () => {
    try {
      const res = await fetch('/api/curriculum')
      const data = await res.json()
      if (data.curriculum) {
        setCurriculum(data.curriculum)
        
        // Find current lesson
        if (data.curriculum.modules) {
          for (const module of data.curriculum.modules) {
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
      console.error('Failed to load curriculum:', error)
    }
  }

  const handleSelectLesson = (lesson: any, module: any) => {
    setCurrentLessonId(lesson.id)
    setInput(`Let's work on "${lesson.title}" from ${module.title}. Can you walk me through this lesson?`)
    setShowCurriculum(false)
    
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
            lessonId: lessonId
          })
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
      case 'encouragement': return 'encouraging'
      case 'socratic': return 'thinking'
      default: return 'neutral'
    }
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading English Tutor...</p>
        </div>
      </div>
    )
  }

  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop()
  const currentMood = getMood(lastAssistantMessage?.hintType)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 shrink-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push('/student/ai-tutor')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold">English AI Tutor</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Badge variant="outline">{enrollment.englishLevel}</Badge>
                <span>Age: {enrollment.teachingAge}</span>
                <span>{enrollment.voiceGender}</span>
                <span>{enrollment.voiceAccent === 'us' ? '🇺🇸' : enrollment.voiceAccent === 'uk' ? '🇬🇧' : '🇦🇺'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Gamification Stats */}
            {gamification && (
              <div className="hidden md:flex items-center gap-3">
                {/* Level Badge */}
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700">Level {gamification.level}</span>
                </div>
                
                {/* Streak */}
                {gamification.streakDays > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-lg">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-700">{gamification.streakDays}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Personality Selector */}
            <PersonalitySelector
              currentPersonality={personality}
              onSelect={setPersonality}
            />
            
            {/* Confidence Meter */}
            <ConfidenceMeter
              isListening={isRecording}
              confidenceScore={confidenceScore}
              className="hidden lg:flex"
            />
            
            {/* Usage Badge */}
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500">
                {usage.remaining === -1 ? 'Unlimited' : `${usage.remaining} left`}
              </p>
            </div>
            
            {/* Preferences */}
            <Sheet open={showPreferences} onOpenChange={setShowPreferences}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
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
                      avatarStyle: enrollment.avatarStyle
                    }}
                    onUpdate={handlePreferencesUpdate}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mission Mode Toggle Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 pb-2">
        <div className="flex items-center justify-between bg-white rounded-lg p-2 border">
          <MissionModeToggle
            currentMode={mode}
            currentMission={currentMission ? {
              id: currentMission.id,
              title: currentMission.title,
              worldName: currentMission.worldName,
              emoji: currentMission.emoji
            } : undefined}
            onModeChange={setMode}
          />
          
          {mode === 'mission' && currentMission && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Target className="w-3 h-3 mr-1" />
              Mission Mode
            </Badge>
          )}
          
          <Link href="/student/worlds">
            <Button variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-1" />
              Browse Worlds
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
        {/* Left Sidebar - Worlds & Missions */}
        <div className={cn(
          "hidden lg:block transition-all duration-300",
          sidebarCollapsed ? "lg:w-16" : "lg:col-span-1"
        )}>
          {mode === 'mission' && worlds.length > 0 ? (
            <WorldsSidebar
              worlds={worlds}
              currentWorldId={currentMission?.worldId}
              currentMissionId={currentMission?.id}
              onSelectMission={(worldId, mission) => {
                setCurrentMission({
                  ...mission,
                  worldId,
                  worldName: worlds.find((w: any) => w.id === worldId)?.name,
                  emoji: worlds.find((w: any) => w.id === worldId)?.emoji
                })
                setInput(`I'd like to start the mission: ${mission.title}`)
              }}
              className="h-full"
            />
          ) : curriculum ? (
            <Card className="h-full flex flex-col">
              <Tabs defaultValue="curriculum" className="flex-1 flex flex-col">
                <TabsList className={cn(
                  "grid w-full mx-4 mt-4 mb-0",
                  sidebarCollapsed ? "grid-cols-1 w-10" : "grid-cols-2"
                )}>
                  <TabsTrigger value="curriculum" className={cn(sidebarCollapsed && "px-2")}>
                    <GraduationCap className="w-4 h-4" />
                    {!sidebarCollapsed && <span className="ml-1">Course</span>}
                  </TabsTrigger>
                  {!sidebarCollapsed && (
                    <TabsTrigger value="topics">Topics</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="curriculum" className="flex-1 mt-0">
                  <CurriculumSidebar
                    curriculum={curriculum}
                    currentLessonId={currentLessonId}
                    onSelectLesson={handleSelectLesson}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                  />
                </TabsContent>
                
                {!sidebarCollapsed && (
                  <TabsContent value="topics" className="flex-1 mt-0">
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
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Top: Avatar Section */}
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <AIAvatar isSpeaking={isSpeaking} mood={currentMood} size="md" />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Your English Tutor</h2>
                <p className="text-sm text-gray-500 mt-1">
                  I'm teaching you like a {enrollment.teachingAge}-year-old with a {enrollment.voiceGender} {enrollment.voiceAccent} voice.
                </p>
              </div>
              {/* Mobile topic menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden mt-4">
                  <Button variant="outline" size="sm">
                    <Menu className="w-4 h-4 mr-2" />
                    Browse Topics
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetTitle>{curriculum ? 'Curriculum' : 'Topics'}</SheetTitle>
                  <div className="mt-4 h-full">
                    {curriculum ? (
                      <CurriculumSidebar
                        curriculum={curriculum}
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
          <Card className="flex-1 min-h-[200px] p-4">
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <Lightbulb className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">Learning Content Area</p>
              <p className="text-xs mt-1">Interactive lessons and exercises will appear here</p>
            </div>
          </Card>

          {/* Bottom: Chat Area */}
          <Card className="flex flex-col overflow-hidden" style={{ maxHeight: '400px' }}>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
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
                          : 'bg-white border shadow-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      
                      {message.hintType && (
                        <Badge variant="secondary" className="mt-2 text-xs capitalize">
                          {message.hintType}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <AIAvatarPlaceholder mood="thinking" size="sm" />
                    <div className="bg-white border rounded-lg p-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsRecording(!isRecording)}
                  className={isRecording ? 'text-red-500' : ''}
                >
                  {isRecording ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
                <Input
                  placeholder="Ask your English question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading || usage.remaining === 0}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!input.trim() || loading || usage.remaining === 0}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {usage.remaining === 0 && (
                <p className="text-sm text-orange-600 mt-2 text-center">
                  Daily message limit reached. Upgrade for unlimited messages.
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Whiteboard, Skills, and AI Learning Space (Independent Collapse) */}
        <div className="hidden lg:flex flex-col gap-4 w-80">
          {/* Whiteboard (Top) - Independent Collapse */}
          <div className={cn(
            "transition-all duration-300 flex",
            whiteboardCollapsed ? "justify-end" : "w-full"
          )}>
            <AIWhiteboard 
              items={whiteboardItems}
              onClear={() => setWhiteboardItems([])}
              collapsed={whiteboardCollapsed}
              onToggleCollapse={() => setWhiteboardCollapsed(!whiteboardCollapsed)}
              collapseDirection="right"
            />
          </div>

          {/* Skills Section */}
          <SkillRadar skills={gamification?.skills || null} />

          {/* AI Learning Space (Bottom) - Independent Collapse */}
          <div className={cn(
            "transition-all duration-300 flex flex-1 min-h-0",
            activityAreaCollapsed ? "justify-end" : "w-full"
          )}>
            <AIActivityArea 
              className={cn(
                "transition-all duration-300",
                activityAreaCollapsed ? "w-16" : "flex-1"
              )}
              collapsed={activityAreaCollapsed}
              onToggleCollapse={() => setActivityAreaCollapsed(!activityAreaCollapsed)}
              collapseDirection="right"
              isListening={isRecording}
              transcriptions={[]}
              onStartGame={(gameType) => {
                console.log('Starting game:', gameType)
              }}
            />
          </div>
        </div>
      </div>
      
      {/* XP Animation */}
      {showXpAnimation && (
        <XpAnimation
          amount={xpGain.amount}
          reason={xpGain.reason}
          onComplete={() => setShowXpAnimation(false)}
        />
      )}
      
      {/* Level Up Animation */}
      {showLevelUp && gamification && (
        <LevelUpAnimation
          level={gamification.level}
          onComplete={() => setShowLevelUp(false)}
        />
      )}
    </div>
  )
}
