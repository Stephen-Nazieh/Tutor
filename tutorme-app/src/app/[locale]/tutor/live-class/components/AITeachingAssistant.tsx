'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { LiveStudent, EngagementMetrics } from '@/types/live-session'
import {
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Clock,
  MessageCircle,
  ChevronRight,
  Check,
  X,
  Zap,
  BookOpen,
  BarChart3,
  HelpCircle,
} from 'lucide-react'

interface AITeachingAssistantProps {
  students: LiveStudent[]
  metrics: EngagementMetrics | null
  currentTopic?: string
  classDuration: number
}

interface AIInsight {
  id: string
  type: 'guidance' | 'misconception' | 'pacing' | 'engagement' | 'socratic'
  title: string
  message: string
  suggestion?: string
  priority: 'high' | 'medium' | 'low'
  timestamp: string
  acknowledged: boolean
  actionable?: boolean
  actionLabel?: string
}

interface SocraticPrompt {
  id: string
  context: string
  question: string
  followUps: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  targetStudentIds?: string[]
}

const buildInsights = (students: LiveStudent[], duration: number): AIInsight[] => {
  const insights: AIInsight[] = []

  // Check for disengaged students
  const disengagedStudents = students.filter(s => s.engagementScore < 50 && s.status === 'online')
  if (disengagedStudents.length > 0) {
    insights.push({
      id: 'insight-1',
      type: 'engagement',
      title: 'Low Engagement Detected',
      message: `${disengagedStudents.length} student(s) showing low engagement`,
      suggestion: 'Try asking a direct question or use a quick poll to re-engage',
      priority: 'high',
      timestamp: new Date().toISOString(),
      acknowledged: false,
      actionable: true,
      actionLabel: 'View Students',
    })
  }

  // Pacing insight
  if (duration > 30 && duration < 35) {
    insights.push({
      id: 'insight-2',
      type: 'pacing',
      title: 'Pacing Alert',
      message: "You've been on this topic for 30+ minutes",
      suggestion: 'Consider wrapping up with a summary or moving to practice exercises',
      priority: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      acknowledged: false,
      actionable: true,
      actionLabel: 'Suggest Wrap-up',
    })
  }

  // Common misconception
  insights.push({
    id: 'insight-3',
    type: 'misconception',
    title: 'Common Misconception Alert',
    message: '3 students may be confusing "derivative" with "slope"',
    suggestion: 'Clarify: Derivative = instantaneous rate, Slope = average rate over interval',
    priority: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    acknowledged: false,
    actionable: true,
    actionLabel: 'Show Explanation',
  })

  // Socratic guidance
  insights.push({
    id: 'insight-4',
    type: 'socratic',
    title: 'Socratic Opportunity',
    message: 'Students are ready for deeper questioning',
    suggestion: 'Ask: "What would happen if we changed this variable?"',
    priority: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    acknowledged: false,
    actionable: true,
    actionLabel: 'Use Question',
  })

  return insights
}

const buildSocraticPrompts = (): SocraticPrompt[] => [
  {
    id: 'prompt-1',
    context: 'When discussing derivatives',
    question: 'What do you think would happen to the slope if we made this curve steeper?',
    followUps: [
      'Can you explain why?',
      'How does that relate to the derivative?',
      'What would the graph look like?',
    ],
    difficulty: 'medium',
  },
  {
    id: 'prompt-2',
    context: 'For students struggling with concepts',
    question: 'Can you explain this concept in your own words?',
    followUps: ['What part is confusing?', 'How would you explain it to a friend?'],
    difficulty: 'easy',
  },
  {
    id: 'prompt-3',
    context: 'Advanced challenge',
    question: 'How would this problem change if we had three variables instead of two?',
    followUps: ['What new challenges would arise?', 'Which method would still work?'],
    difficulty: 'hard',
  },
]

export function AITeachingAssistant({
  students,
  metrics,
  currentTopic = 'Derivatives and Rates of Change',
  classDuration,
}: AITeachingAssistantProps) {
  const [activeTab, setActiveTab] = useState<'insights' | 'socratic' | 'guide'>('insights')
  const [selectedPrompt, setSelectedPrompt] = useState<SocraticPrompt | null>(null)
  const [showFollowUps, setShowFollowUps] = useState(false)
  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([])
  const [dismissedIds, setDismissedIds] = useState<string[]>([])

  const socraticPrompts = useMemo(() => buildSocraticPrompts(), [])
  const insights = useMemo(() => {
    return buildInsights(students, classDuration)
      .filter(insight => !dismissedIds.includes(insight.id))
      .map(insight => ({
        ...insight,
        acknowledged: acknowledgedIds.includes(insight.id),
      }))
  }, [students, classDuration, acknowledgedIds, dismissedIds])

  const acknowledgeInsight = (id: string) => {
    setAcknowledgedIds(prev => (prev.includes(id) ? prev : [...prev, id]))
  }

  const dismissInsight = (id: string) => {
    setDismissedIds(prev => (prev.includes(id) ? prev : [...prev, id]))
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'guidance':
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case 'misconception':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'pacing':
        return <Clock className="h-4 w-4 text-purple-500" />
      case 'engagement':
        return <Zap className="h-4 w-4 text-yellow-500" />
      case 'socratic':
        return <HelpCircle className="h-4 w-4 text-green-500" />
      default:
        return <Sparkles className="h-4 w-4 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const unacknowledgedInsights = insights.filter(i => !i.acknowledged)

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">AI Teaching Assistant</CardTitle>
              <p className="text-xs text-gray-500">Real-time insights & guidance</p>
            </div>
          </div>
          {unacknowledgedInsights.length > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unacknowledgedInsights.length} New
            </Badge>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-3 flex gap-1">
          <Button
            variant={activeTab === 'insights' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveTab('insights')}
          >
            <Zap className="mr-1 h-3 w-3" />
            Insights
          </Button>
          <Button
            variant={activeTab === 'socratic' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveTab('socratic')}
          >
            <HelpCircle className="mr-1 h-3 w-3" />
            Socratic
          </Button>
          <Button
            variant={activeTab === 'guide' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveTab('guide')}
          >
            <BookOpen className="mr-1 h-3 w-3" />
            Guide
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100%-20px)]">
          <div className="px-4 pb-4">
            {activeTab === 'insights' && (
              <div className="space-y-3">
                {insights.length === 0 ? (
                  <div className="py-8 text-center">
                    <Sparkles className="mx-auto mb-2 h-10 w-10 text-gray-300" />
                    <p className="text-sm text-gray-500">No insights yet</p>
                    <p className="text-xs text-gray-400">AI is monitoring the class...</p>
                  </div>
                ) : (
                  insights.map(insight => (
                    <div
                      key={insight.id}
                      className={cn(
                        'rounded-lg border p-3 transition-all',
                        insight.acknowledged
                          ? 'border-gray-200 bg-gray-50 opacity-60'
                          : 'border-gray-200 bg-white shadow-sm',
                        insight.priority === 'high' &&
                          !insight.acknowledged &&
                          'border-l-4 border-l-red-500'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {getInsightIcon(insight.type)}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{insight.title}</span>
                            <Badge
                              variant="outline"
                              className={cn('text-xs', getPriorityColor(insight.priority))}
                            >
                              {insight.priority}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{insight.message}</p>
                          {insight.suggestion && (
                            <div className="mt-2 rounded bg-blue-50 p-2 text-sm text-blue-800">
                              <Lightbulb className="mr-1 inline h-3 w-3" />
                              {insight.suggestion}
                            </div>
                          )}

                          {!insight.acknowledged && (
                            <div className="mt-3 flex gap-2">
                              {insight.actionable && (
                                <Button size="sm" variant="outline" className="flex-1 text-xs">
                                  {insight.actionLabel}
                                  <ChevronRight className="ml-1 h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs"
                                onClick={() => acknowledgeInsight(insight.id)}
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Got it
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => dismissInsight(insight.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'socratic' && (
              <div className="space-y-3">
                {selectedPrompt ? (
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        setSelectedPrompt(null)
                        setShowFollowUps(false)
                      }}
                    >
                      ← Back to prompts
                    </Button>

                    <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                      <Badge className="mb-2 bg-blue-600">Selected Prompt</Badge>
                      <p className="mb-2 text-sm text-gray-600">{selectedPrompt.context}</p>
                      <p className="text-lg font-medium text-gray-800">{selectedPrompt.question}</p>

                      <Button className="mt-4 w-full gap-2" onClick={() => setShowFollowUps(true)}>
                        <MessageCircle className="h-4 w-4" />
                        Ask This Question
                      </Button>

                      {showFollowUps && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-medium text-gray-500">Follow-up questions:</p>
                          {selectedPrompt.followUps.map((followUp, idx) => (
                            <button
                              key={idx}
                              className="w-full rounded border bg-white p-2 text-left text-sm transition-colors hover:border-blue-300"
                            >
                              {followUp}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Current Topic</span>
                      </div>
                      <p className="text-sm text-purple-700">{currentTopic}</p>
                    </div>

                    <p className="mb-2 mt-4 text-xs font-medium text-gray-500">
                      SUGGESTED QUESTIONS
                    </p>

                    {socraticPrompts.map(prompt => (
                      <button
                        key={prompt.id}
                        className="w-full rounded-lg border border-gray-200 p-3 text-left transition-all hover:border-blue-300 hover:bg-blue-50"
                        onClick={() => setSelectedPrompt(prompt)}
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-gray-500">{prompt.context}</span>
                          <Badge variant="outline" className="text-xs">
                            {prompt.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-800">{prompt.question}</p>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="space-y-4">
                <div className="rounded-lg border bg-gradient-to-br from-green-50 to-blue-50 p-3">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <BarChart3 className="h-4 w-4" />
                    Lesson Progress
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Time elapsed</span>
                      <span className="font-medium">
                        {Math.floor(classDuration / 60)}h {classDuration % 60}m
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                        style={{ width: `${Math.min((classDuration / 90) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {classDuration < 45
                        ? 'Early phase - good for introducing concepts'
                        : classDuration < 75
                          ? 'Mid-lesson - consider practice activities'
                          : 'Wrapping up - time for summary and review'}
                    </p>
                    {metrics && (
                      <p className="text-xs text-gray-500">
                        Current class engagement: {metrics.averageEngagement}%
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4" />
                    Recommended Next Steps
                  </h3>

                  <div className="space-y-2">
                    {classDuration < 30 && (
                      <div className="rounded-lg border border-gray-200 bg-white p-3">
                        <p className="text-sm font-medium">Continue Concept Introduction</p>
                        <p className="mt-1 text-xs text-gray-500">
                          Use visual examples and ask for student predictions
                        </p>
                      </div>
                    )}

                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                      <p className="text-sm font-medium">Check for Understanding</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Quick poll: &quot;Rate your confidence 1-5&quot;
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                      <p className="text-sm font-medium">Practice Exercise</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Give students 3 minutes to solve independently
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                      <p className="text-sm font-medium">Breakout Discussion</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Group students to explain concepts to each other
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-yellow-800">
                    <Lightbulb className="h-4 w-4" />
                    Teaching Tip
                  </h3>
                  <p className="text-xs text-yellow-700">
                    Students retain 90% of what they teach others. Consider having students explain
                    concepts to the class.
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
