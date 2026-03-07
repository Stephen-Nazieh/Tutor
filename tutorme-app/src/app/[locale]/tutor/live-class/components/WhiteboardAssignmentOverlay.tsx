'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Eye, 
  EyeOff, 
  Users, 
  BrainCircuit,
  Clock,
  Pencil,
  Type,
  Shapes,
  X,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuizQuestion } from '../../dashboard/components/CourseBuilder'
import type { LiveSharedDocument, LiveDocumentCollaborationPolicy } from './LiveSharedDocumentModal'

interface WhiteboardAssignmentOverlayProps {
  share: LiveSharedDocument | null
  onClose: () => void
  onVisibilityChange?: (visible: boolean) => void
  onCollaborationPolicyChange?: (policy: LiveDocumentCollaborationPolicy) => void
  onRevealAnswersChange?: (revealed: boolean) => void
  onAiGradingChange?: (enabled: boolean) => void
  onTimeLimitChange?: (minutes: number) => void
  canManageShare?: boolean
}

export function WhiteboardAssignmentOverlay({
  share,
  onClose,
  onVisibilityChange,
  onCollaborationPolicyChange,
  onRevealAnswersChange,
  onAiGradingChange,
  onTimeLimitChange,
  canManageShare = false,
}: WhiteboardAssignmentOverlayProps) {
  const questions = Array.isArray(share?.questions) ? share?.questions : []
  const isQuestionShare = questions.length > 0
  const collaborationPolicy: LiveDocumentCollaborationPolicy = {
    allowDrawing: share?.collaborationPolicy?.allowDrawing ?? true,
    allowTyping: share?.collaborationPolicy?.allowTyping ?? true,
    allowShapes: share?.collaborationPolicy?.allowShapes ?? true,
  }
  
  const [showTutorAnswers, setShowTutorAnswers] = useState(false)
  const [timeLimitInput, setTimeLimitInput] = useState<number>(share?.timeLimit || 30)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setTimeLimitInput(share?.timeLimit || 30)
    setCurrentIndex(0)
  }, [share?.shareId, share?.timeLimit])

  const handleTimeLimitChange = (value: string) => {
    const minutes = parseInt(value) || 0
    setTimeLimitInput(minutes)
    onTimeLimitChange?.(minutes)
  }

  if (!share) return null

  return (
    <div 
      className={cn(
        "absolute inset-x-4 bottom-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 z-30",
        isMinimized ? "h-14" : "h-[60vh] max-h-[600px]"
      )}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">{share.title}</Badge>
          <Badge variant={share.visibleToAll ? 'default' : 'secondary'} className="text-xs">
            {share.visibleToAll ? 'Visible' : 'Private'}
          </Badge>
          {isQuestionShare && (
            <span className="text-xs text-muted-foreground">
              {questions.length} Q
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {canManageShare && isQuestionShare && (
            <>
              {/* Me */}
              <Button
                type="button"
                variant={showTutorAnswers ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowTutorAnswers(!showTutorAnswers)}
                className="h-7 px-2 text-xs"
              >
                {showTutorAnswers ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                Me
              </Button>
              
              {/* Students */}
              <Button
                type="button"
                variant={share.revealAnswersToStudents ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  const newValue = !share.revealAnswersToStudents
                  if (newValue && !confirm('Reveal answers to students?')) return
                  onRevealAnswersChange?.(newValue)
                }}
                className="h-7 px-2 text-xs"
              >
                {share.revealAnswersToStudents ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                Students
              </Button>
            </>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-7 w-7 p-0"
          >
            {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-7 w-7 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Controls Bar - only when not minimized */}
      {!isMinimized && canManageShare && (
        <div className="px-4 py-2 border-b bg-gray-50/50 flex flex-wrap items-center gap-x-4 gap-y-2">
          {/* Visible to class */}
          <div className="flex items-center gap-1.5">
            <Switch 
              checked={share.visibleToAll} 
              onCheckedChange={onVisibilityChange} 
              id="visible-to-all"
              className="scale-75"
            />
            <Label htmlFor="visible-to-all" className="flex items-center gap-1 cursor-pointer text-xs">
              <Users className="h-3 w-3 text-muted-foreground" />
              Visible to class
            </Label>
          </div>

          {isQuestionShare && (
            <>
              {/* AI grading */}
              <div className="flex items-center gap-1.5">
                <Switch 
                  checked={share.isAiGraded ?? false} 
                  onCheckedChange={onAiGradingChange}
                  id="ai-grading"
                  className="scale-75"
                />
                <Label htmlFor="ai-grading" className="flex items-center gap-1 cursor-pointer text-xs">
                  <BrainCircuit className="h-3 w-3 text-purple-500" />
                  AI grading
                </Label>
              </div>

              {/* Timer */}
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <Label htmlFor="time-limit" className="text-xs">Time:</Label>
                <Input
                  id="time-limit"
                  type="number"
                  min={0}
                  max={180}
                  value={timeLimitInput}
                  onChange={(e) => handleTimeLimitChange(e.target.value)}
                  className="w-14 h-6 text-xs"
                />
                <span className="text-xs text-muted-foreground">min</span>
              </div>
            </>
          )}

          {/* Collaboration controls */}
          <div className="flex items-center gap-3 border-l pl-3">
            <div className="flex items-center gap-1">
              <Switch
                checked={collaborationPolicy.allowDrawing}
                onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowDrawing: checked })}
                id="allow-drawing"
                className="scale-75"
              />
              <Label htmlFor="allow-drawing" className="flex items-center gap-1 cursor-pointer text-xs">
                <Pencil className="h-3 w-3" />
                Draw
              </Label>
            </div>
            <div className="flex items-center gap-1">
              <Switch
                checked={collaborationPolicy.allowTyping}
                onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowTyping: checked })}
                id="allow-typing"
                className="scale-75"
              />
              <Label htmlFor="allow-typing" className="flex items-center gap-1 cursor-pointer text-xs">
                <Type className="h-3 w-3" />
                Type
              </Label>
            </div>
            <div className="flex items-center gap-1">
              <Switch
                checked={collaborationPolicy.allowShapes}
                onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowShapes: checked })}
                id="allow-shapes"
                className="scale-75"
              />
              <Label htmlFor="allow-shapes" className="flex items-center gap-1 cursor-pointer text-xs">
                <Shapes className="h-3 w-3" />
                Shapes
              </Label>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      {!isMinimized && (
        <ScrollArea className="h-[calc(100%-80px)]">
          <div className="p-4">
            {isQuestionShare ? (
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div 
                    key={q.id} 
                    className={cn(
                      "rounded-lg border p-3 space-y-2 cursor-pointer transition-colors",
                      currentIndex === idx ? "border-blue-400 bg-blue-50/30" : "hover:bg-gray-50"
                    )}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="text-xs shrink-0">Q{idx + 1}</Badge>
                      <div className="text-sm font-medium flex-1">{q.question}</div>
                    </div>
                    
                    {q.options && q.options.length > 0 && (
                      <div className="pl-8 text-xs text-muted-foreground">
                        {q.options.join(' • ')}
                      </div>
                    )}
                    
                    {showTutorAnswers && (
                      <div className="pl-8 text-xs text-emerald-600 font-medium">
                        Answer: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer || '—'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : share.fileUrl ? (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <p className="text-sm">PDF Document</p>
                <a 
                  href={share.fileUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline mt-1"
                >
                  Open in new tab
                </a>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                No content available
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
