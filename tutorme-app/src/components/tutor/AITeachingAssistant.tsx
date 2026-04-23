'use client'

import { useMemo, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  Sparkles,
  Lightbulb,
  MessageCircle,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Loader2,
} from 'lucide-react'

interface AITeachingAssistantProps {
  currentTopic?: string
  nodes?: any[]
  onUseAsPoll?: (text: string) => void
  onUseAsQuestion?: (text: string) => void
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
  currentTopic = 'General Course Content',
  nodes = [],
  onUseAsPoll,
  onUseAsQuestion,
}: AITeachingAssistantProps) {
  const [activeTab, setActiveTab] = useState<'question'>('question')
  const [selectedPrompt, setSelectedPrompt] = useState<SocraticPrompt | null>(null)
  const [showFollowUps, setShowFollowUps] = useState(false)
  
  const [socraticPrompts, setSocraticPrompts] = useState<SocraticPrompt[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generatePrompts = async () => {
    setIsLoading(true)
    try {
      // Summarize nodes to not overload token limit
      const courseSummary = nodes.map(node => ({
        lesson: node.title,
        tasks: node.lessons[0]?.tasks?.map((t: any) => t.title).join(', ')
      })).slice(0, 10)

      const promptText = `You are a Socratic AI Teaching Assistant helping a tutor engage their students.
The course structure is: ${JSON.stringify(courseSummary)}
The current topic is: ${currentTopic}

Generate exactly 3 Socratic questions that the tutor can use as a Poll or Discussion Question.
Return ONLY a valid JSON array of objects. Do not include markdown formatting like \`\`\`json.
Each object must match this interface:
{
  "id": "unique-id",
  "context": "Short context on when to use this (e.g. 'When introducing X')",
  "question": "The actual engaging question",
  "followUps": ["follow up 1", "follow up 2"],
  "difficulty": "easy" | "medium" | "hard"
}`

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: promptText })
      })

      if (res.ok) {
        const data = await res.json()
        const parsed = JSON.parse(data.response.replace(/^```json|```$/g, '').trim())
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSocraticPrompts(parsed)
          return
        }
      }
      throw new Error('Failed to generate')
    } catch (err) {
      console.error('Failed to generate AI prompts', err)
      setSocraticPrompts(buildSocraticPrompts())
    } finally {
      setIsLoading(false)
    }
  }

  // Automatically fetch on mount if empty
  useEffect(() => {
    if (socraticPrompts.length === 0) {
      generatePrompts()
    }
  }, [])

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
            variant={activeTab === 'question' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveTab('question')}
          >
            <HelpCircle className="mr-1 h-3 w-3" />
            Question
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100%-20px)]">
          <div className="px-4 pb-4">
            {activeTab === 'question' && (
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

                      <div className="mt-4 flex gap-2">
                        {onUseAsQuestion && (
                          <Button className="w-full gap-2" onClick={() => onUseAsQuestion(selectedPrompt.question)}>
                            <MessageCircle className="h-4 w-4" />
                            Use as Question
                          </Button>
                        )}
                        {onUseAsPoll && (
                          <Button variant="secondary" className="w-full gap-2" onClick={() => onUseAsPoll(selectedPrompt.question)}>
                            <HelpCircle className="h-4 w-4" />
                            Use as Poll
                          </Button>
                        )}
                        {!onUseAsQuestion && !onUseAsPoll && (
                          <Button className="w-full gap-2" onClick={() => setShowFollowUps(true)}>
                            <MessageCircle className="h-4 w-4" />
                            Show Follow-ups
                          </Button>
                        )}
                      </div>

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

                    <div className="mb-2 mt-4 flex items-center justify-between">
                      <p className="text-xs font-medium text-gray-500">
                        SUGGESTED QUESTIONS
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[10px] text-blue-600"
                        onClick={() => generatePrompts()}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Sparkles className="mr-1 h-3 w-3" />}
                        Regenerate
                      </Button>
                    </div>

                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-500 mb-2" />
                        <p className="text-xs">Analyzing course content...</p>
                      </div>
                    ) : (
                      socraticPrompts.map(prompt => (
                        <button
                          key={prompt.id}
                          className="w-full rounded-lg border border-gray-200 p-3 text-left transition-all hover:border-blue-300 hover:bg-blue-50"
                          onClick={() => {
                            setSelectedPrompt(prompt)
                            setShowFollowUps(true)
                          }}
                        >
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-gray-500">{prompt.context}</span>
                            <Badge variant="outline" className="text-xs">
                              {prompt.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-gray-800">{prompt.question}</p>
                        </button>
                      ))
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
