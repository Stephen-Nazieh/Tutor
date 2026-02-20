/**
 * Improved Topic Sidebar with Collapsible Sections
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Lock,
  PanelLeft,
  PanelLeftClose,
  Lightbulb,
  Zap,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Topic {
  id: string
  name: string
  description: string
  progress: number
  status: 'locked' | 'available' | 'in_progress' | 'completed'
  subtopics?: string[]
  icon?: string
}

interface TopicSidebarProps {
  topics: Topic[]
  currentTopic?: string
  onSelectTopic: (topicId: string) => void
  className?: string
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const ENGLISH_TOPICS: Topic[] = [
  {
    id: 'essay_basics',
    name: 'Essay Basics',
    description: 'Introduction to essay structure',
    progress: 0,
    status: 'available',
    subtopics: ['Thesis Statements', 'Introductions', 'Conclusions'],
    icon: '📝'
  },
  {
    id: 'grammar_fundamentals',
    name: 'Grammar Fundamentals',
    description: 'Parts of speech and sentence structure',
    progress: 0,
    status: 'available',
    subtopics: ['Nouns & Verbs', 'Adjectives & Adverbs', 'Sentence Types'],
    icon: '✓'
  },
  {
    id: 'punctuation',
    name: 'Punctuation Mastery',
    description: 'Commas, periods, and more',
    progress: 0,
    status: 'available',
    subtopics: ['Commas', 'Semicolons', 'Apostrophes'],
    icon: '،'
  },
  {
    id: 'sentence_structure',
    name: 'Sentence Structure',
    description: 'Building strong sentences',
    progress: 0,
    status: 'available',
    subtopics: ['Simple Sentences', 'Compound Sentences', 'Complex Sentences'],
    icon: '🏗️'
  },
  {
    id: 'thesis_development',
    name: 'Thesis Development',
    description: 'Crafting arguable claims',
    progress: 0,
    status: 'available',
    subtopics: ['Arguable Claims', 'Specificity', 'Placement'],
    icon: '🎯'
  },
  {
    id: 'evidence_analysis',
    name: 'Evidence & Analysis',
    description: 'Supporting your arguments',
    progress: 0,
    status: 'available',
    subtopics: ['Quotations', 'Paraphrasing', 'Analysis Techniques'],
    icon: '💡'
  },
  {
    id: 'transitions',
    name: 'Transitions & Flow',
    description: 'Connecting ideas smoothly',
    progress: 0,
    status: 'available',
    subtopics: ['Between Paragraphs', 'Within Paragraphs', 'Transition Words'],
    icon: '→'
  },
  {
    id: 'literary_analysis',
    name: 'Literary Analysis',
    description: 'Analyzing literature',
    progress: 0,
    status: 'available',
    subtopics: ['Themes', 'Symbols', 'Character Analysis'],
    icon: '📚'
  },
  {
    id: 'rhetorical_analysis',
    name: 'Rhetorical Analysis',
    description: 'Ethos, pathos, logos',
    progress: 0,
    status: 'locked',
    subtopics: ['Ethos', 'Pathos', 'Logos'],
    icon: '🎭'
  },
  {
    id: 'research_writing',
    name: 'Research Writing',
    description: 'Using sources effectively',
    progress: 0,
    status: 'locked',
    subtopics: ['Finding Sources', 'Citation', 'Synthesis'],
    icon: '🔬'
  }
]

export function TopicSidebar({ 
  topics = ENGLISH_TOPICS, 
  currentTopic, 
  onSelectTopic,
  className,
  collapsed = false,
  onToggleCollapse
}: TopicSidebarProps) {
  const [expandedTopics, setExpandedTopics] = useState<string[]>([])

  const toggleTopic = (topicId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'in_progress': return <Circle className="w-4 h-4 text-blue-500 fill-blue-500" />
      case 'locked': return <Lock className="w-4 h-4 text-gray-400" />
      default: return <Circle className="w-4 h-4 text-gray-300" />
    }
  }

  // Collapsed mode - ultra compact
  if (collapsed) {
    return (
      <Card className={cn("w-16 flex flex-col items-center py-3", className)}>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className="mb-2"
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
        
        <div className="w-8 h-px bg-gray-200 my-2" />
        
        <ScrollArea className="flex-1 w-full">
          <div className="flex flex-col items-center gap-1 py-2">
            {topics.slice(0, 6).map((topic) => (
              <Button
                key={topic.id}
                variant={currentTopic === topic.id ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "w-9 h-9 rounded-lg",
                  topic.status === 'locked' && "opacity-50"
                )}
                onClick={() => topic.status !== 'locked' && onSelectTopic(topic.id)}
                title={topic.name}
              >
                <span className="text-sm">{topic.icon}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
        
        <div className="mt-auto pt-2">
          <Badge variant="secondary" className="text-[10px] px-1">
            {topics.filter(t => t.status === 'completed').length}/{topics.length}
          </Badge>
        </div>
      </Card>
    )
  }

  // Expanded mode with collapsible sections
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-500" />
          <CardTitle className="text-sm font-medium">Topics</CardTitle>
        </div>
        {onToggleCollapse && (
          <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-8 w-8">
            <PanelLeftClose className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        {/* Progress summary */}
        <div className="px-4 pb-3 border-b">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Progress</span>
            <span>
              {topics.filter(t => t.status === 'completed').length} of {topics.length}
            </span>
          </div>
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ 
                width: `${(topics.filter(t => t.status === 'completed').length / topics.length) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Quick filters */}
        <div className="px-4 py-2 flex gap-1 overflow-x-auto">
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-50">
            <Zap className="w-3 h-3 mr-1" />
            Quick Start
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-50">
            <Target className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        </div>

        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="space-y-1 p-3">
            {topics.map((topic) => (
              <div key={topic.id} className="group">
                <div
                  className={cn(
                    "w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all",
                    currentTopic === topic.id
                      ? 'bg-blue-50 border border-blue-200 shadow-sm'
                      : topic.status === 'locked'
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-50'
                  )}
                >
                  {/* Topic click area */}
                  <button
                    onClick={() => {
                      if (topic.status !== 'locked') {
                        onSelectTopic(topic.id)
                      }
                    }}
                    disabled={topic.status === 'locked'}
                    className="flex-1 flex items-center gap-2 min-w-0 text-left"
                  >
                    <span className="text-lg w-6 text-center">{topic.icon}</span>
                    
                    <div className="min-w-0">
                      <p className={cn(
                        "text-sm font-medium truncate",
                        currentTopic === topic.id ? 'text-blue-700' : 'text-gray-700'
                      )}>
                        {topic.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{topic.description}</p>
                    </div>
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {getStatusIcon(topic.status)}
                    
                    {topic.subtopics && topic.subtopics.length > 0 && (
                      <button
                        onClick={(e) => toggleTopic(topic.id, e)}
                        className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {expandedTopics.includes(topic.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Expandable subtopics */}
                {expandedTopics.includes(topic.id) && topic.subtopics && (
                  <div className="ml-9 mt-1 space-y-0.5 animate-in slide-in-from-top-1">
                    {topic.subtopics.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectTopic(`${topic.id}_${idx}`)}
                        className="w-full flex items-center gap-2 p-1.5 pl-3 rounded text-left text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="truncate">{subtopic}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export { ENGLISH_TOPICS }
export type { Topic }
