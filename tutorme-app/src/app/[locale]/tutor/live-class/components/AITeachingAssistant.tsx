'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { LiveStudent, EngagementMetrics } from '@/types/live-session'
import {
  Sparkles,
  Clock,
  MessageCircle,
  BookOpen,
  BarChart3,
  HelpCircle,
  Lightbulb,
} from 'lucide-react'

interface AITeachingAssistantProps {
  students: LiveStudent[]
  metrics: EngagementMetrics | null
  currentTopic?: string
  classDuration: number
}

interface SocraticPrompt {
  id: string
  context: string
  question: string
  followUps: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  targetStudentIds?: string[]
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
  const [activeTab, setActiveTab] = useState<'socratic' | 'guide'>('socratic')
  const [selectedPrompt, setSelectedPrompt] = useState<SocraticPrompt | null>(null)
  const [showFollowUps, setShowFollowUps] = useState(false)

  const socraticPrompts = useMemo(() => buildSocraticPrompts(), [])

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
        </div>

        {/* Tabs */}
        <div className="mt-3 flex gap-1">
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
