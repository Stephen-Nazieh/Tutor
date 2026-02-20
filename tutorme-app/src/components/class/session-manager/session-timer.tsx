/**
 * Smart Session Timer & Agenda Manager
 * Structured time management during lessons with AI pacing suggestions
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Clock, 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw,
  CheckCircle2,
  Circle,
  Timer,
  AlertCircle,
  ChevronRight,
  Plus,
  X,
  GripVertical,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AgendaItem {
  id: string
  title: string
  duration: number           // in minutes
  type: 'intro' | 'content' | 'activity' | 'discussion' | 'quiz' | 'break' | 'wrapup'
  status: 'pending' | 'active' | 'completed' | 'skipped'
  actualDuration?: number    // actual time spent
  description?: string
  aiSuggestion?: string      // AI-generated suggestion for this segment
}

export interface SessionTimerProps {
  agenda: AgendaItem[]
  totalSessionDuration: number  // in minutes
  onAgendaChange?: (agenda: AgendaItem[]) => void
  onPhaseComplete?: (phaseId: string) => void
  onTimeWarning?: (message: string) => void
}

export function SessionTimer({ 
  agenda: initialAgenda, 
  totalSessionDuration,
  onAgendaChange,
  onPhaseComplete,
  onTimeWarning
}: SessionTimerProps) {
  const [agenda, setAgenda] = useState<AgendaItem[]>(initialAgenda)
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(initialAgenda[0]?.duration || 15)
  const [isRunning, setIsRunning] = useState(false)
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(totalSessionDuration * 60)
  const [showAddPhase, setShowAddPhase] = useState(false)
  // Default collapsed to reduce clutter (ClassRoom.md: collapsible Session Agenda)
  const [expanded, setExpanded] = useState(false)

  // Calculate overall progress
  const completedPhases = agenda.filter(a => a.status === 'completed').length
  const totalPhases = agenda.length
  const progress = (completedPhases / totalPhases) * 100

  // Calculate current phase progress
  const currentPhase = agenda[currentPhaseIndex]
  const currentPhaseProgress = currentPhase 
    ? ((currentPhase.duration * 60 - timeRemaining) / (currentPhase.duration * 60)) * 100 
    : 0

  // Timer effect
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Phase complete
          handlePhaseComplete()
          return 0
        }
        return prev - 1
      })
      setTotalTimeRemaining(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, currentPhaseIndex])

  // Time warnings
  useEffect(() => {
    if (timeRemaining === 60) {
      onTimeWarning?.(`1 minute remaining for: ${currentPhase?.title}`)
    }
    if (timeRemaining === 30) {
      onTimeWarning?.(`30 seconds remaining for: ${currentPhase?.title}`)
    }
    if (totalTimeRemaining === 300) {
      onTimeWarning?.('5 minutes remaining in session')
    }
  }, [timeRemaining, totalTimeRemaining, currentPhase])

  const handlePhaseComplete = useCallback(() => {
    const updatedAgenda = [...agenda]
    updatedAgenda[currentPhaseIndex].status = 'completed'
    updatedAgenda[currentPhaseIndex].actualDuration = updatedAgenda[currentPhaseIndex].duration
    
    onPhaseComplete?.(agenda[currentPhaseIndex].id)

    // Move to next phase
    const nextIndex = currentPhaseIndex + 1
    if (nextIndex < agenda.length) {
      updatedAgenda[nextIndex].status = 'active'
      setAgenda(updatedAgenda)
      onAgendaChange?.(updatedAgenda)
      setCurrentPhaseIndex(nextIndex)
      setTimeRemaining(updatedAgenda[nextIndex].duration * 60)
      setIsRunning(false)
    } else {
      setAgenda(updatedAgenda)
      onAgendaChange?.(updatedAgenda)
      setIsRunning(false)
    }
  }, [agenda, currentPhaseIndex, onAgendaChange, onPhaseComplete])

  const handleSkipPhase = useCallback(() => {
    const updatedAgenda = [...agenda]
    updatedAgenda[currentPhaseIndex].status = 'skipped'
    
    const nextIndex = currentPhaseIndex + 1
    if (nextIndex < agenda.length) {
      updatedAgenda[nextIndex].status = 'active'
      setAgenda(updatedAgenda)
      onAgendaChange?.(updatedAgenda)
      setCurrentPhaseIndex(nextIndex)
      setTimeRemaining(updatedAgenda[nextIndex].duration * 60)
      setIsRunning(false)
    }
  }, [agenda, currentPhaseIndex, onAgendaChange])

  const handleReset = useCallback(() => {
    const resetAgenda = agenda.map((item, index) => ({
      ...item,
      status: index === 0 ? 'active' : 'pending' as const,
      actualDuration: undefined
    }))
    setAgenda(resetAgenda)
    onAgendaChange?.(resetAgenda)
    setCurrentPhaseIndex(0)
    setTimeRemaining(resetAgenda[0]?.duration || 15)
    setTotalTimeRemaining(totalSessionDuration * 60)
    setIsRunning(false)
  }, [agenda, totalSessionDuration, onAgendaChange])

  const handleAddPhase = useCallback((title: string, duration: number, type: AgendaItem['type']) => {
    const newPhase: AgendaItem = {
      id: `phase-${Date.now()}`,
      title,
      duration,
      type,
      status: 'pending'
    }
    const updatedAgenda = [...agenda, newPhase]
    setAgenda(updatedAgenda)
    onAgendaChange?.(updatedAgenda)
    setShowAddPhase(false)
  }, [agenda, onAgendaChange])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'intro': return 'bg-blue-500'
      case 'content': return 'bg-purple-500'
      case 'activity': return 'bg-green-500'
      case 'discussion': return 'bg-yellow-500'
      case 'quiz': return 'bg-red-500'
      case 'break': return 'bg-gray-500'
      case 'wrapup': return 'bg-indigo-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'intro': return '👋'
      case 'content': return '📚'
      case 'activity': return '🎯'
      case 'discussion': return '💬'
      case 'quiz': return '❓'
      case 'break': return '☕'
      case 'wrapup': return '✅'
      default: return '📝'
    }
  }

  // AI pacing suggestion
  const pacingSuggestion = useCallback(() => {
    if (!currentPhase) return null
    
    const elapsed = currentPhase.duration * 60 - timeRemaining
    const expectedProgress = elapsed / (currentPhase.duration * 60)
    
    if (expectedProgress > 0.8 && timeRemaining > 120) {
      return "You're ahead of schedule! Consider extending discussion."
    }
    if (expectedProgress < 0.5 && timeRemaining < 60) {
      return "Running behind. Consider summarizing key points."
    }
    if (currentPhase.type === 'content' && elapsed > 300 && timeRemaining > 180) {
      return "Students may need a break soon. Consider an activity."
    }
    return null
  }, [currentPhase, timeRemaining])

  const suggestion = pacingSuggestion()

  return (
    <div className="w-full bg-slate-900 border-b border-slate-700">
      {/* Main Timer Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Current Phase Info */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-lg", getTypeColor(currentPhase?.type || 'content'))}>
              {getTypeIcon(currentPhase?.type || 'content')}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{currentPhase?.title || 'No active phase'}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Phase {currentPhaseIndex + 1} of {totalPhases}</span>
                {currentPhase?.duration && (
                  <span>• {currentPhase.duration} min</span>
                )}
              </div>
            </div>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "text-3xl font-mono font-bold tabular-nums",
              timeRemaining < 60 ? 'text-red-400 animate-pulse' : 'text-white'
            )}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-xs text-slate-500">
              <div>Total: {formatTime(totalTimeRemaining)}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setIsRunning(!isRunning)}
                    className="h-9 w-9"
                  >
                    {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isRunning ? 'Pause' : 'Start'} Timer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleSkipPhase}
                    disabled={currentPhaseIndex >= agenda.length - 1}
                    className="h-9 w-9"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Skip Phase</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleReset}
                    className="h-9 w-9"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset Timer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Session Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Expand/Collapse - visible on dark card (avoid same color as background) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="border-slate-600 bg-slate-700/90 text-slate-200 hover:bg-slate-600 hover:text-white shrink-0"
          >
            {expanded ? 'Hide' : 'Show'} Agenda
          </Button>
        </div>

        {/* AI Suggestion */}
        {suggestion && (
          <div className="mt-3 flex items-center gap-2 text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-800/50 rounded-lg px-3 py-2">
            <Sparkles className="h-3 w-3" />
            <span>{suggestion}</span>
          </div>
        )}
      </div>

      {/* Expanded Agenda Timeline */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-800">
          <div className="flex items-center justify-between py-3">
            <h3 className="text-sm font-medium text-white">Session Agenda</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAddPhase(!showAddPhase)}
              className="h-7 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Phase
            </Button>
          </div>

          {showAddPhase && (
            <AddPhaseForm onAdd={handleAddPhase} onCancel={() => setShowAddPhase(false)} />
          )}

          <div className="space-y-2">
            {agenda.map((phase, index) => (
              <AgendaPhaseRow
                key={phase.id}
                phase={phase}
                index={index}
                isActive={index === currentPhaseIndex}
                isPast={index < currentPhaseIndex}
                getTypeColor={getTypeColor}
                getTypeIcon={getTypeIcon}
                onUpdate={(updated) => {
                  const updatedAgenda = [...agenda]
                  updatedAgenda[index] = updated
                  setAgenda(updatedAgenda)
                  onAgendaChange?.(updatedAgenda)
                }}
                onRemove={() => {
                  const updatedAgenda = agenda.filter((_, i) => i !== index)
                  setAgenda(updatedAgenda)
                  onAgendaChange?.(updatedAgenda)
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Individual Agenda Phase Row
interface AgendaPhaseRowProps {
  phase: AgendaItem
  index: number
  isActive: boolean
  isPast: boolean
  getTypeColor: (type: string) => string
  getTypeIcon: (type: string) => string
  onUpdate: (phase: AgendaItem) => void
  onRemove: () => void
}

function AgendaPhaseRow({ 
  phase, 
  index, 
  isActive, 
  isPast,
  getTypeColor,
  getTypeIcon,
  onUpdate,
  onRemove
}: AgendaPhaseRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(phase.title)
  const [editDuration, setEditDuration] = useState(phase.duration)

  const handleSave = () => {
    onUpdate({ ...phase, title: editTitle, duration: editDuration })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg">
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
        />
        <input
          type="number"
          value={editDuration}
          onChange={(e) => setEditDuration(parseInt(e.target.value) || 0)}
          className="w-16 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
        />
        <span className="text-xs text-slate-400">min</span>
        <Button size="sm" variant="ghost" className="h-7" onClick={handleSave}>Save</Button>
        <Button size="sm" variant="ghost" className="h-7" onClick={() => setIsEditing(false)}>Cancel</Button>
      </div>
    )
  }

  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg transition-colors",
        isActive ? "bg-blue-900/30 border border-blue-800/50" : "bg-slate-800 hover:bg-slate-700",
        isPast && "opacity-50"
      )}
    >
      {/* Status Icon */}
      <div className="w-5 h-5 flex items-center justify-center">
        {phase.status === 'completed' ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : phase.status === 'active' ? (
          <div className={cn("w-3 h-3 rounded-full animate-pulse", getTypeColor(phase.type))} />
        ) : phase.status === 'skipped' ? (
          <div className="text-slate-500 text-xs">⦻</div>
        ) : (
          <Circle className="h-4 w-4 text-slate-600" />
        )}
      </div>

      {/* Type Icon */}
      <div className="text-sm">{getTypeIcon(phase.type)}</div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm truncate",
          isActive ? "text-white font-medium" : "text-slate-300"
        )}>
          {phase.title}
        </p>
        {phase.actualDuration && phase.actualDuration !== phase.duration && (
          <p className="text-[10px] text-slate-500">
            Planned: {phase.duration}m • Actual: {phase.actualDuration}m
          </p>
        )}
      </div>

      {/* Duration */}
      <div className="text-xs text-slate-400">
        {phase.duration}m
      </div>

      {/* Actions */}
      {!isActive && !isPast && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setIsEditing(true)}>
            <GripVertical className="h-3 w-3 text-slate-500" />
          </Button>
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onRemove}>
            <X className="h-3 w-3 text-slate-500" />
          </Button>
        </div>
      )}
    </div>
  )
}

// Add Phase Form
interface AddPhaseFormProps {
  onAdd: (title: string, duration: number, type: AgendaItem['type']) => void
  onCancel: () => void
}

function AddPhaseForm({ onAdd, onCancel }: AddPhaseFormProps) {
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState(10)
  const [type, setType] = useState<AgendaItem['type']>('content')

  const phaseTypes: { value: AgendaItem['type']; label: string; icon: string }[] = [
    { value: 'intro', label: 'Introduction', icon: '👋' },
    { value: 'content', label: 'Content', icon: '📚' },
    { value: 'activity', label: 'Activity', icon: '🎯' },
    { value: 'discussion', label: 'Discussion', icon: '💬' },
    { value: 'quiz', label: 'Quiz', icon: '❓' },
    { value: 'break', label: 'Break', icon: '☕' },
    { value: 'wrapup', label: 'Wrap-up', icon: '✅' },
  ]

  return (
    <div className="p-3 bg-slate-800 rounded-lg mb-3 space-y-3">
      <input
        placeholder="Phase title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder:text-slate-500"
      />
      
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-[10px] text-slate-500 mb-1 block">Duration (min)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
          />
        </div>
        <div className="flex-[2]">
          <label className="text-[10px] text-slate-500 mb-1 block">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as AgendaItem['type'])}
            className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
          >
            {phaseTypes.map(t => (
              <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onCancel}>Cancel</Button>
        <Button 
          size="sm" 
          className="flex-1" 
          onClick={() => { if (title) onAdd(title, duration, type); }}
          disabled={!title}
        >
          Add Phase
        </Button>
      </div>
    </div>
  )
}
