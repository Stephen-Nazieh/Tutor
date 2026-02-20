/**
 * One-Click Interactive Polls/Quizzes
 * Quick comprehension checks with live results
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  BarChart3, 
  Plus, 
  X, 
  Check, 
  Clock, 
  Users,
  Eye,
  EyeOff,
  Sparkles,
  History,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageSquare,
  Settings2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type PollType = 'multiple_choice' | 'true_false' | 'rating' | 'short_answer' | 'word_cloud'

export interface PollOption {
  id: string
  text: string
  isCorrect?: boolean  // For quizzes with correct answers
}

export interface PollResponse {
  studentId: string
  studentName: string
  answer: string | string[]
  timestamp: Date
  isCorrect?: boolean
}

export interface Poll {
  id: string
  question: string
  type: PollType
  options: PollOption[]
  isAnonymous: boolean
  timeLimit?: number  // seconds, undefined = no limit
  status: 'draft' | 'active' | 'closed'
  responses: PollResponse[]
  createdAt: Date
  endedAt?: Date
  showResults: boolean  // Whether to show results to students
}

interface QuickPollProps {
  polls: Poll[]
  onCreatePoll: (poll: Omit<Poll, 'id' | 'responses' | 'createdAt' | 'status'>) => void
  onStartPoll: (pollId: string) => void
  onEndPoll: (pollId: string) => void
  onDeletePoll: (pollId: string) => void
  studentCount: number
}

// Predefined quick poll templates
const pollTemplates: { type: PollType; question: string; options: string[] }[] = [
  { type: 'true_false', question: 'Do you understand this concept?', options: ['Yes, I understand', 'No, I need more explanation'] },
  { type: 'rating', question: 'How confident are you with this topic?', options: ['1 - Not confident', '2', '3', '4', '5 - Very confident'] },
  { type: 'multiple_choice', question: 'Which topic should we review next?', options: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
  { type: 'true_false', question: 'Ready to move on?', options: ['Yes, let\'s continue', 'No, let\'s stay here'] },
  { type: 'multiple_choice', question: 'What is the correct answer?', options: ['Option A', 'Option B', 'Option C', 'Option D'] },
]

export function QuickPoll({ 
  polls, 
  onCreatePoll, 
  onStartPoll, 
  onEndPoll, 
  onDeletePoll,
  studentCount 
}: QuickPollProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [viewingPollId, setViewingPollId] = useState<string | null>(null)

  const activePoll = polls.find(p => p.status === 'active')
  const viewingPoll = polls.find(p => p.id === viewingPollId)
  const closedPolls = polls.filter(p => p.status === 'closed')

  return (
    <div className="w-[400px] bg-slate-900 border-l border-slate-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Quick Polls</h2>
              <p className="text-xs text-slate-400">Interactive assessments</p>
            </div>
          </div>
          <Button 
            size="sm" 
            onClick={() => setIsCreating(!isCreating)}
            variant={isCreating ? 'outline' : 'default'}
          >
            {isCreating ? <X className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
            {isCreating ? 'Cancel' : 'New Poll'}
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-slate-700">
            {polls.filter(p => p.status === 'active').length} Active
          </Badge>
          <Badge variant="secondary" className="bg-slate-700">
            {closedPolls.length} Completed
          </Badge>
          {activePoll && (
            <Badge className="bg-green-600 animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              Live
            </Badge>
          )}
        </div>
      </div>

      {/* Create Poll */}
      {isCreating && (
        <CreatePollPanel
          templates={pollTemplates}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
          onCreate={(poll) => {
            onCreatePoll(poll)
            setIsCreating(false)
            setSelectedTemplate(null)
          }}
          onCancel={() => {
            setIsCreating(false)
            setSelectedTemplate(null)
          }}
        />
      )}

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Active Poll */}
          {activePoll && (
            <ActivePollCard
              poll={activePoll}
              studentCount={studentCount}
              onEnd={() => onEndPoll(activePoll.id)}
            />
          )}

          {/* Viewing Past Poll */}
          {viewingPoll && viewingPoll.status === 'closed' && (
            <PollResultsCard
              poll={viewingPoll}
              studentCount={studentCount}
              onClose={() => setViewingPollId(null)}
              onRestart={() => {
                // Create a new poll with same question
                onCreatePoll({
                  question: viewingPoll.question,
                  type: viewingPoll.type,
                  options: viewingPoll.options,
                  isAnonymous: viewingPoll.isAnonymous,
                  timeLimit: viewingPoll.timeLimit,
                  showResults: viewingPoll.showResults
                })
                setViewingPollId(null)
              }}
            />
          )}

          {/* Poll History */}
          {closedPolls.length > 0 && !viewingPoll && (
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <History className="h-4 w-4" />
                Recent Polls
              </h3>
              <div className="space-y-2">
                {closedPolls.slice(0, 5).map(poll => (
                  <PollHistoryCard
                    key={poll.id}
                    poll={poll}
                    onView={() => setViewingPollId(poll.id)}
                    onDelete={() => onDeletePoll(poll.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Draft Polls */}
          {polls.filter(p => p.status === 'draft').length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3">Draft Polls</h3>
              <div className="space-y-2">
                {polls.filter(p => p.status === 'draft').map(poll => (
                  <DraftPollCard
                    key={poll.id}
                    poll={poll}
                    onStart={() => onStartPoll(poll.id)}
                    onDelete={() => onDeletePoll(poll.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

// Create Poll Panel
interface CreatePollPanelProps {
  templates: { type: PollType; question: string; options: string[] }[]
  selectedTemplate: number | null
  onSelectTemplate: (index: number | null) => void
  onCreate: (poll: Omit<Poll, 'id' | 'responses' | 'createdAt' | 'status'>) => void
  onCancel: () => void
}

function CreatePollPanel({ 
  templates, 
  selectedTemplate, 
  onSelectTemplate, 
  onCreate, 
  onCancel 
}: CreatePollPanelProps) {
  const [customQuestion, setCustomQuestion] = useState('')
  const [customOptions, setCustomOptions] = useState(['', ''])
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [showResults, setShowResults] = useState(true)
  const [timeLimit, setTimeLimit] = useState<number | undefined>(undefined)

  const handleCreate = () => {
    if (selectedTemplate !== null) {
      const template = templates[selectedTemplate]
      onCreate({
        question: template.question,
        type: template.type,
        options: template.options.map((text, i) => ({ id: `opt-${i}`, text })),
        isAnonymous,
        timeLimit,
        showResults
      })
    } else if (customQuestion && customOptions.filter(o => o).length >= 2) {
      onCreate({
        question: customQuestion,
        type: 'multiple_choice',
        options: customOptions.filter(o => o).map((text, i) => ({ id: `opt-${i}`, text })),
        isAnonymous,
        timeLimit,
        showResults
      })
    }
  }

  return (
    <div className="p-4 border-b border-slate-700 bg-slate-800/50">
      <h3 className="text-sm font-medium text-white mb-3">Quick Templates</h3>
      
      {/* Templates */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        {templates.map((template, index) => (
          <button
            key={index}
            onClick={() => onSelectTemplate(selectedTemplate === index ? null : index)}
            className={cn(
              "text-left p-3 rounded-lg border transition-colors text-sm",
              selectedTemplate === index
                ? "border-purple-500 bg-purple-500/20"
                : "border-slate-700 bg-slate-800 hover:bg-slate-700"
            )}
          >
            <div className="font-medium text-white">{template.question}</div>
            <div className="text-xs text-slate-400 mt-1">
              {template.type.replace('_', ' ')} • {template.options.length} options
            </div>
          </button>
        ))}
      </div>

      {/* Custom Poll */}
      <div className="border-t border-slate-700 pt-4">
        <h3 className="text-sm font-medium text-white mb-3">Or Create Custom</h3>
        <Input
          placeholder="Enter your question..."
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          className="mb-3 bg-slate-800 border-slate-700"
        />
        <div className="space-y-2 mb-3">
          {customOptions.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...customOptions]
                  newOptions[index] = e.target.value
                  setCustomOptions(newOptions)
                }}
                className="bg-slate-800 border-slate-700"
              />
              {customOptions.length > 2 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setCustomOptions(customOptions.filter((_, i) => i !== index))}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCustomOptions([...customOptions, ''])}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Option
          </Button>
        </div>

        {/* Settings */}
        <div className="space-y-2 mb-4">
          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded border-slate-600"
            />
            Anonymous responses
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showResults}
              onChange={(e) => setShowResults(e.target.checked)}
              className="rounded border-slate-600"
            />
            Show results to students
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
        <Button 
          className="flex-1" 
          onClick={handleCreate}
          disabled={selectedTemplate === null && (!customQuestion || customOptions.filter(o => o).length < 2)}
        >
          Create Poll
        </Button>
      </div>
    </div>
  )
}

// Active Poll Card
interface ActivePollCardProps {
  poll: Poll
  studentCount: number
  onEnd: () => void
}

function ActivePollCard({ poll, studentCount, onEnd }: ActivePollCardProps) {
  const responseCount = poll.responses.length
  const responseRate = studentCount > 0 ? (responseCount / studentCount) * 100 : 0

  // Calculate results
  const results = useMemo(() => {
    const counts: Record<string, number> = {}
    poll.options.forEach(opt => counts[opt.id] = 0)
    poll.responses.forEach(r => {
      const answer = Array.isArray(r.answer) ? r.answer[0] : r.answer
      counts[answer] = (counts[answer] || 0) + 1
    })
    return counts
  }, [poll])

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-700/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-green-600 animate-pulse">LIVE</Badge>
              {poll.isAnonymous && <Badge variant="outline" className="text-[10px]">Anonymous</Badge>}
            </div>
            <CardTitle className="text-base text-white">{poll.question}</CardTitle>
          </div>
          <Button size="sm" variant="destructive" onClick={onEnd}>
            End Poll
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Response Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {responseCount} of {studentCount} responded
            </span>
            <span>{Math.round(responseRate)}%</span>
          </div>
          <Progress value={responseRate} className="h-2 bg-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
              style={{ width: `${responseRate}%` }}
            />
          </Progress>
        </div>

        {/* Live Results */}
        <div className="space-y-2">
          {poll.options.map(option => {
            const count = results[option.id] || 0
            const percentage = responseCount > 0 ? (count / responseCount) * 100 : 0
            
            return (
              <div key={option.id} className="relative">
                <div 
                  className="absolute inset-0 bg-purple-500/20 rounded transition-all"
                  style={{ width: `${percentage}%` }}
                />
                <div className="relative flex items-center justify-between p-2">
                  <span className="text-sm text-white">{option.text}</span>
                  <span className="text-sm font-medium text-slate-300">
                    {count} ({Math.round(percentage)}%)
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Poll Results Card
interface PollResultsCardProps {
  poll: Poll
  studentCount: number
  onClose: () => void
  onRestart: () => void
}

function PollResultsCard({ poll, studentCount, onClose, onRestart }: PollResultsCardProps) {
  const responseCount = poll.responses.length
  
  const results = useMemo(() => {
    const counts: Record<string, { count: number; students: string[] }> = {}
    poll.options.forEach(opt => counts[opt.id] = { count: 0, students: [] })
    poll.responses.forEach(r => {
      const answer = Array.isArray(r.answer) ? r.answer[0] : r.answer
      if (counts[answer]) {
        counts[answer].count++
        if (!poll.isAnonymous) {
          counts[answer].students.push(r.studentName)
        }
      }
    })
    return counts
  }, [poll])

  const mostPopular = Object.entries(results).sort((a, b) => b[1].count - a[1].count)[0]

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className="mb-2">Completed</Badge>
            <CardTitle className="text-base text-white">{poll.question}</CardTitle>
            <p className="text-xs text-slate-400 mt-1">
              {responseCount} responses • Ended {poll.endedAt?.toLocaleTimeString()}
            </p>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {poll.options.map(option => {
            const data = results[option.id] || { count: 0, students: [] }
            const percentage = responseCount > 0 ? (data.count / responseCount) * 100 : 0
            const isMostPopular = mostPopular?.[0] === option.id
            
            return (
              <div key={option.id} className="relative">
                <div 
                  className={cn(
                    "absolute inset-0 rounded transition-all",
                    isMostPopular ? "bg-green-500/20" : "bg-slate-700/50"
                  )}
                  style={{ width: `${percentage}%` }}
                />
                <div className="relative flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    {isMostPopular && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                    <span className="text-sm text-white">{option.text}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-300">
                    {data.count} ({Math.round(percentage)}%)
                  </span>
                </div>
                {!poll.isAnonymous && data.students.length > 0 && (
                  <p className="text-[10px] text-slate-500 px-2 pb-1">
                    {data.students.join(', ')}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex gap-2 mt-4 pt-3 border-t border-slate-700">
          <Button variant="outline" className="flex-1" size="sm" onClick={onRestart}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Run Again
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Poll History Card
function PollHistoryCard({ poll, onView, onDelete }: { poll: Poll; onView: () => void; onDelete: () => void }) {
  return (
    <Card className="bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600" onClick={onView}>
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-sm text-white truncate">{poll.question}</p>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>{poll.responses.length} responses</span>
              <span>•</span>
              <span>{poll.type.replace('_', ' ')}</span>
            </div>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 shrink-0"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Draft Poll Card
function DraftPollCard({ poll, onStart, onDelete }: { poll: Poll; onStart: () => void; onDelete: () => void }) {
  return (
    <Card className="bg-slate-800 border-slate-600 border-dashed">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-sm text-white truncate">{poll.question}</p>
            <p className="text-xs text-slate-400">{poll.options.length} options</p>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={onStart}>
              <Play className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onDelete}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
