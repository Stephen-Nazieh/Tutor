'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { 
  Sparkles, 
  Send, 
  Loader2, 
  BookOpen, 
  Users, 
  Lightbulb,
  Target,
  Plus,
  Trash2,
  ChevronRight
} from 'lucide-react'

interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
}

interface AIInsight {
  id: string
  type: 'lesson_idea' | 'student_analysis' | 'content_suggestion' | 'engagement_tip'
  title: string
  content: string
  applied: boolean
  createdAt: string
}

interface AISession {
  id: string
  title: string
  context: string | null
  status: string
  messages: AIMessage[]
  insights: AIInsight[]
  createdAt: string
  updatedAt: string
}

export default function AIAssistantPage() {
  const [session, setSession] = useState<AISession | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'insights'>('chat')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load session on mount
  useEffect(() => {
    loadSession()
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [session?.messages])

  const loadSession = async () => {
    try {
      const res = await fetch('/api/tutor/ai-assistant', {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setSession(data.session)
      } else {
        toast.error('Failed to load AI session')
      }
    } catch {
      toast.error('Failed to load AI session')
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || !session) return

    setSending(true)
    const messageContent = input
    setInput('')

    try {
      const res = await fetch('/api/tutor/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: messageContent,
          sessionId: session.id,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setSession(prev => {
          if (!prev) return data.session
          return {
            ...prev,
            messages: [...prev.messages, data.message],
            insights: data.session.insights || prev.insights,
          }
        })
      } else {
        toast.error('Failed to send message')
        setInput(messageContent) // Restore input on error
      }
    } catch {
      toast.error('Failed to send message')
      setInput(messageContent)
    } finally {
      setSending(false)
    }
  }

  const createNewSession = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/tutor/ai-assistant/sessions', {
        method: 'DELETE', // This archives old and creates new
        credentials: 'include',
      })
      if (res.ok) {
        await loadSession()
        toast.success('New session started')
      }
    } catch {
      toast.error('Failed to create session')
    } finally {
      setLoading(false)
    }
  }

  const markInsightApplied = async (insightId: string) => {
    try {
      const res = await fetch(`/api/tutor/ai-assistant/insights/${insightId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ applied: true }),
      })

      if (res.ok) {
        setSession(prev => {
          if (!prev) return null
          return {
            ...prev,
            insights: prev.insights.map(i =>
              i.id === insightId ? { ...i, applied: true } : i
            ),
          }
        })
        toast.success('Marked as applied')
      }
    } catch {
      toast.error('Failed to update insight')
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson_idea': return <BookOpen className="w-4 h-4" />
      case 'student_analysis': return <Users className="w-4 h-4" />
      case 'content_suggestion': return <Lightbulb className="w-4 h-4" />
      case 'engagement_tip': return <Target className="w-4 h-4" />
      default: return <Sparkles className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson_idea': return 'bg-blue-100 text-blue-700'
      case 'student_analysis': return 'bg-orange-100 text-orange-700'
      case 'content_suggestion': return 'bg-green-100 text-green-700'
      case 'engagement_tip': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Teaching Assistant</h1>
        <p className="text-gray-600 mt-1">
          Get AI-powered insights and assistance for your teaching
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">AI Assistant</CardTitle>
                    <p className="text-xs text-gray-500">
                      {session?.messages.length || 0} messages
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={createNewSession}>
                    <Plus className="w-4 h-4 mr-1" />
                    New Chat
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'chat' 
                      ? 'border-b-2 border-blue-500 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('chat')}
                >
                  Chat
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'insights' 
                      ? 'border-b-2 border-blue-500 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('insights')}
                >
                  Insights ({session?.insights.filter(i => !i.applied).length || 0})
                </button>
              </div>

              {activeTab === 'chat' ? (
                <>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {session?.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${
                            message.role === 'user' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <Avatar className="w-8 h-8 shrink-0">
                            {message.role === 'user' ? (
                              <AvatarFallback className="bg-gray-200">You</AvatarFallback>
                            ) : (
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                                AI
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div
                            className={`max-w-[80%] p-3 rounded-lg text-sm ${
                              message.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <div className="whitespace-pre-wrap">{message.content}</div>
                            <span className="text-xs opacity-70 mt-1 block">
                              {new Date(message.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask the AI Assistant..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !sending && sendMessage()}
                        disabled={sending}
                        className="flex-1"
                      />
                      <Button 
                        onClick={sendMessage} 
                        disabled={sending || !input.trim()}
                      >
                        {sending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Try: "Help me explain derivatives to struggling students" or "Generate a quiz on quadratic equations"
                    </p>
                  </div>
                </>
              ) : (
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {session?.insights.filter(i => !i.applied).length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No pending insights</p>
                        <p className="text-sm">Continue chatting to generate insights</p>
                      </div>
                    ) : (
                      session?.insights
                        .filter(i => !i.applied)
                        .map((insight) => (
                          <Card key={insight.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge className={getTypeColor(insight.type)}>
                                    {getTypeIcon(insight.type)}
                                  </Badge>
                                  <span className="font-medium text-sm">{insight.title}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                {insight.content}
                              </p>
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => markInsightApplied(insight.id)}
                                >
                                  Mark Applied
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    )}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500" />
                  Ask for lesson plan ideas for any topic
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500" />
                  Get help explaining complex concepts
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500" />
                  Generate practice questions and quizzes
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500" />
                  Analyze student engagement strategies
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500" />
                  Request Socratic questioning examples
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Session Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {session?.messages.filter(m => m.role === 'user').length || 0}
                  </p>
                  <p className="text-xs text-gray-500">Your Messages</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {session?.insights.filter(i => !i.applied).length || 0}
                  </p>
                  <p className="text-xs text-gray-500">Pending Insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
