'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { 
  Sparkles, 
  Lightbulb, 
  AlertTriangle, 
  Clock, 
  BookOpen,
  ChevronRight,
  Check,
  X,
  TrendingUp,
  Users,
  Target,
  Loader2,
  MessageSquare
} from 'lucide-react'

interface AIAssistantInsight {
  id: string
  type: 'lesson_idea' | 'student_analysis' | 'content_suggestion' | 'engagement_tip'
  title: string
  content: string
  applied: boolean
  createdAt: string
}

interface AITeachingAssistantWidgetProps {
  upcomingClass?: {
    id: string
    title: string
    time: string
    studentCount: number
  }
}

export function AITeachingAssistantWidget({ upcomingClass }: AITeachingAssistantWidgetProps) {
  const [activeTab, setActiveTab] = useState<'insights' | 'chat'>('insights')
  const [insights, setInsights] = useState<AIAssistantInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([])
  
  // Fetch insights from API
  useEffect(() => {
    fetchInsights()
  }, [])
  
  const fetchInsights = async () => {
    try {
      const res = await fetch('/api/tutor/ai-assistant/insights', {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setInsights(data.insights || [])
      }
    } catch {
      // Silent fail - widget shows default state
    } finally {
      setLoading(false)
    }
  }
  
  const markAsApplied = async (insightId: string) => {
    try {
      const res = await fetch(`/api/tutor/ai-assistant/insights/${insightId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ applied: true }),
      })
      
      if (res.ok) {
        setInsights(prev => prev.map(i => 
          i.id === insightId ? { ...i, applied: true } : i
        ))
        toast.success('Marked as applied')
      }
    } catch {
      toast.error('Failed to update')
    }
  }
  
  const dismissInsight = (id: string) => {
    setDismissedInsights(prev => [...prev, id])
  }
  
  const visibleInsights = insights.filter(i => !dismissedInsights.includes(i.id) && !i.applied)
  
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'lesson_idea': return <Clock className="w-4 h-4 text-blue-500" />
      case 'student_analysis': return <Users className="w-4 h-4 text-orange-500" />
      case 'content_suggestion': return <BookOpen className="w-4 h-4 text-green-500" />
      case 'engagement_tip': return <Target className="w-4 h-4 text-purple-500" />
      default: return <Sparkles className="w-4 h-4 text-blue-500" />
    }
  }
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson_idea': return 'Lesson Idea'
      case 'student_analysis': return 'Student Insight'
      case 'content_suggestion': return 'Content'
      case 'engagement_tip': return 'Engagement'
      default: return 'Insight'
    }
  }
  
  if (loading) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">AI Teaching Assistant</CardTitle>
              <p className="text-xs text-gray-500">Personalized insights & guidance</p>
            </div>
          </div>
          {visibleInsights.length > 0 && (
            <Badge variant="destructive" className="text-xs">
              {visibleInsights.length}
            </Badge>
          )}
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 mt-3">
          <Button
            variant={activeTab === 'insights' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveTab('insights')}
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            Insights
          </Button>
          <Link href="/tutor/ai-assistant" className="flex-1">
            <Button
              variant={activeTab === 'chat' ? 'default' : 'ghost'}
              size="sm"
              className="w-full text-xs"
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Chat
            </Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="px-4 pb-4">
          {visibleInsights.length === 0 ? (
            <div className="text-center py-8">
              <Check className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">All caught up!</p>
              <p className="text-xs text-gray-400">No new insights. Start a chat for personalized help.</p>
              <Link href="/tutor/ai-assistant">
                <Button size="sm" className="mt-3 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Ask AI Assistant
                </Button>
              </Link>
            </div>
          ) : (
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {visibleInsights.slice(0, 5).map((insight) => (
                  <div
                    key={insight.id}
                    className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{insight.title}</span>
                            <Badge variant="secondary" className="text-xs">
                              {getTypeLabel(insight.type)}
                            </Badge>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 -mr-1"
                            onClick={() => dismissInsight(insight.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{insight.content}</p>
                        
                        <div className="flex gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => markAsApplied(insight.id)}
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {visibleInsights.length > 5 && (
                  <Link href="/tutor/ai-assistant">
                    <Button variant="ghost" className="w-full text-xs">
                      View {visibleInsights.length - 5} more insights
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </ScrollArea>
          )}
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">AI Chats</span>
              </div>
              <p className="text-lg font-bold text-blue-800">{insights.length > 0 ? 'Active' : 'Start'}</p>
              <p className="text-xs text-blue-600">
                {insights.length} insights generated
              </p>
            </div>
            <Link href="/tutor/ai-assistant">
              <div className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-purple-600 font-medium">Chat Now</span>
                </div>
                <p className="text-lg font-bold text-purple-800">Ask AI</p>
                <p className="text-xs text-purple-600">Get personalized help →</p>
              </div>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
