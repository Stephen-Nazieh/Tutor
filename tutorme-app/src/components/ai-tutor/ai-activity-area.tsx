/**
 * AI Activity Area
 * Central space for AI demonstrations, voice transcription, games, and interactive content
 * Replaces the old chat area in the middle section
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Mic,
  Gamepad2,
  Presentation,
  Type,
  Sparkles,
  Play,
  Pause,
  Volume2,
  Lightbulb,
  Target,
  Award,
  Clock,
  PanelRight,
  PanelRightClose,
  PanelLeftClose,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TranscriptionItem {
  id: string
  word: string
  pronunciation?: string
  definition?: string
  timestamp: number
}

interface GameState {
  isActive: boolean
  score: number
  currentQuestion?: any
  timeRemaining?: number
}

interface AIActivityAreaProps {
  className?: string
  isListening?: boolean
  transcriptions?: TranscriptionItem[]
  onStartGame?: (gameType: string) => void
  currentActivity?: 'demo' | 'game' | 'transcription' | 'idle'
  collapsed?: boolean
  onToggleCollapse?: () => void
  collapseDirection?: 'left' | 'right'
}

// Demo content for AI teaching
interface DemoContent {
  type: 'diagram' | 'text' | 'highlight' | 'animation'
  title: string
  content: React.ReactNode
}

function AIActivityArea({
  className,
  isListening = false,
  transcriptions = [],
  onStartGame,
  currentActivity = 'idle',
  collapsed = false,
  onToggleCollapse,
  collapseDirection = 'left',
}: AIActivityAreaProps) {
  const [activeTab, setActiveTab] = useState('demo')
  const [demoContent, setDemoContent] = useState<DemoContent | null>(null)
  const [gameScore, setGameScore] = useState(0)

  // Collapsed mode - right edge collapse
  if (collapsed) {
    return (
      <Card className={cn('flex w-16 flex-col items-center py-3', className)}>
        <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="mb-2">
          <PanelRight className="h-4 w-4" />
        </Button>

        <div className="my-2 h-px w-8 bg-gray-200" />

        <div className="flex flex-col items-center gap-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <Zap className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
            <Gamepad2 className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <Presentation className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      </Card>
    )
  }

  // Sample demonstration content
  const renderDemoContent = () => {
    return (
      <div className="space-y-4">
        {/* Essay Structure Visualizer */}
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Presentation className="h-4 w-4 text-blue-500" />
            Essay Structure
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                1
              </div>
              <div className="flex-1 rounded border-l-4 border-blue-500 bg-white p-2">
                <span className="text-sm font-medium">Introduction</span>
                <p className="text-xs text-gray-500">Hook + Background + Thesis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                2
              </div>
              <div className="flex-1 rounded border-l-4 border-green-500 bg-white p-2">
                <span className="text-sm font-medium">Body Paragraph 1</span>
                <p className="text-xs text-gray-500">Topic sentence + Evidence + Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                3
              </div>
              <div className="flex-1 rounded border-l-4 border-green-500 bg-white p-2">
                <span className="text-sm font-medium">Body Paragraph 2</span>
                <p className="text-xs text-gray-500">Topic sentence + Evidence + Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                4
              </div>
              <div className="flex-1 rounded border-l-4 border-purple-500 bg-white p-2">
                <span className="text-sm font-medium">Conclusion</span>
                <p className="text-xs text-gray-500">Restate thesis + Summarize + Final thought</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <h5 className="mb-1 text-sm font-medium text-yellow-800">Thesis Statement</h5>
            <p className="text-xs text-yellow-700">The main argument of your essay</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <h5 className="mb-1 text-sm font-medium text-green-800">Topic Sentence</h5>
            <p className="text-xs text-green-700">Introduces each paragraph's focus</p>
          </div>
        </div>
      </div>
    )
  }

  // Voice transcription display
  const renderTranscriptions = () => {
    if (transcriptions.length === 0 && !isListening) {
      return (
        <div className="flex h-48 flex-col items-center justify-center text-gray-400">
          <Mic className="mb-3 h-12 w-12 opacity-50" />
          <p className="text-sm">Start speaking to see key words</p>
          <p className="mt-1 text-xs">Important vocabulary will appear here</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {isListening && (
          <div className="mb-4 flex items-center gap-2 text-blue-600">
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="text-sm font-medium">Listening...</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {transcriptions.map(item => (
            <div
              key={item.id}
              className="rounded-lg border bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="text-lg font-medium text-gray-800">{item.word}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Volume2 className="h-3 w-3" />
                </Button>
              </div>
              {item.pronunciation && (
                <p className="mt-1 text-xs text-gray-500">/{item.pronunciation}/</p>
              )}
              {item.definition && <p className="mt-1 text-xs text-gray-600">{item.definition}</p>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Games section
  const renderGames = () => {
    const games = [
      { id: 'vocab-match', name: 'Vocabulary Match', icon: '🎯', difficulty: 'Easy' },
      { id: 'grammar-fix', name: 'Grammar Fix', icon: '🔧', difficulty: 'Medium' },
      { id: 'essay-race', name: 'Essay Race', icon: '⏱️', difficulty: 'Hard' },
      { id: 'word-scramble', name: 'Word Scramble', icon: '🧩', difficulty: 'Easy' },
    ]

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => onStartGame?.(game.id)}
              className="group rounded-lg border bg-gradient-to-br from-blue-50 to-purple-50 p-4 text-left transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-2 text-2xl">{game.icon}</div>
              <h4 className="text-sm font-medium group-hover:text-blue-600">{game.name}</h4>
              <Badge variant="secondary" className="mt-1 text-xs">
                {game.difficulty}
              </Badge>
            </button>
          ))}
        </div>

        {/* Current Score Display */}
        <div className="rounded-lg border bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="font-medium">Your Score</span>
            </div>
            <span className="text-2xl font-bold text-yellow-700">{gameScore}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className={cn('flex h-full flex-col', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-purple-500" />
            AI Learning Space
          </CardTitle>
          <div className="flex items-center gap-1">
            {isListening && (
              <Badge variant="default" className="mr-1 animate-pulse bg-red-500">
                <Mic className="mr-1 h-3 w-3" />
                Listening
              </Badge>
            )}
            {onToggleCollapse && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleCollapse}>
                {collapseDirection === 'right' ? (
                  <PanelRightClose className="h-4 w-4" />
                ) : (
                  <PanelLeftClose className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
        <TabsList className="mx-4 mb-2 grid w-full grid-cols-3">
          <TabsTrigger value="demo" className="text-xs">
            <Presentation className="mr-1 h-3 w-3" />
            Demo
          </TabsTrigger>
          <TabsTrigger value="words" className="text-xs">
            <Type className="mr-1 h-3 w-3" />
            Words
          </TabsTrigger>
          <TabsTrigger value="games" className="text-xs">
            <Gamepad2 className="mr-1 h-3 w-3" />
            Games
          </TabsTrigger>
        </TabsList>

        <CardContent className="flex-1 p-4 pt-0">
          <ScrollArea className="h-[calc(100vh-350px)]">
            <TabsContent value="demo" className="mt-0">
              {renderDemoContent()}
            </TabsContent>

            <TabsContent value="words" className="mt-0">
              {renderTranscriptions()}
            </TabsContent>

            <TabsContent value="games" className="mt-0">
              {renderGames()}
            </TabsContent>
          </ScrollArea>
        </CardContent>
      </Tabs>
    </Card>
  )
}

export { AIActivityArea }
export type { TranscriptionItem }
