/**
 * Collapsible Sidebar for AI Tutor
 * Saves space and provides quick access to topics/lessons
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Target,
  MoreHorizontal,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  prompt: string
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'essay', label: 'Essay Help', icon: '📝', prompt: 'Help me write an essay about...' },
  {
    id: 'grammar',
    label: 'Grammar Check',
    icon: '✓',
    prompt: 'Check this sentence for grammar errors: ',
  },
  { id: 'analyze', label: 'Analyze Text', icon: '📖', prompt: 'Analyze this passage: ' },
  { id: 'brainstorm', label: 'Brainstorm', icon: '💡', prompt: 'Help me brainstorm ideas for...' },
]

interface CollapsibleSidebarProps {
  children: React.ReactNode
  title?: string
  defaultCollapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
}

export function CollapsibleSidebar({
  children,
  title = 'Topics',
  defaultCollapsed = false,
  onCollapse,
}: CollapsibleSidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const toggleCollapse = () => {
    const newState = !collapsed
    setCollapsed(newState)
    onCollapse?.(newState)
  }

  if (collapsed) {
    return (
      <Card className="flex w-14 flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={toggleCollapse} className="mb-4">
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div className="space-y-2">
          <BookOpen className="mx-auto h-5 w-5 text-gray-400" />
          <div className="mx-auto h-px w-8 bg-gray-200" />

          {QUICK_ACTIONS.slice(0, 3).map(action => (
            <Button
              key={action.id}
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              title={action.label}
            >
              <span className="text-lg">{action.icon}</span>
            </Button>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{title}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleCollapse}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        {/* Quick Actions */}
        <div className="border-b px-4 pb-3">
          <p className="mb-2 text-xs text-gray-500">Quick Actions</p>
          <div className="flex flex-wrap gap-1">
            {QUICK_ACTIONS.map(action => (
              <Button key={action.id} variant="secondary" size="sm" className="h-7 text-xs">
                <span className="mr-1">{action.icon}</span>
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <ScrollArea className="h-[calc(100vh-280px)]">{children}</ScrollArea>
      </CardContent>
    </Card>
  )
}

// Compact topic list for collapsed state
export function CompactTopicList({
  topics,
  onSelect,
  currentTopic,
}: {
  topics: any[]
  onSelect: (id: string) => void
  currentTopic?: string
}) {
  const recentTopics = topics.slice(0, 5)

  return (
    <div className="flex flex-col items-center space-y-1 py-2">
      {recentTopics.map(topic => (
        <Button
          key={topic.id}
          variant={currentTopic === topic.id ? 'default' : 'ghost'}
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={() => onSelect(topic.id)}
          title={topic.name}
        >
          <span className="text-xs font-bold">{topic.name.charAt(0)}</span>
        </Button>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          {topics.slice(5).map(topic => (
            <DropdownMenuItem key={topic.id} onClick={() => onSelect(topic.id)}>
              {topic.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { QUICK_ACTIONS }
