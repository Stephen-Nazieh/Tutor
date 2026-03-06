'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PDFCollaborativeViewer } from '@/components/pdf-tutoring/PDFCollaborativeViewer'
import { 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Users, 
  BrainCircuit,
  Clock,
  Pencil,
  Type,
  Shapes
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { QuizQuestion } from '../../dashboard/components/CourseBuilder'

export interface LiveDocumentCollaborationPolicy {
  allowDrawing: boolean
  allowTyping: boolean
  allowShapes: boolean
}

export interface LiveSharedDocument {
  shareId: string
  classRoomId: string
  ownerId: string
  ownerName: string
  assignedStudentId?: string
  templateShareId?: string
  title: string
  description?: string
  fileUrl?: string
  mimeType?: string
  pdfRoomId: string
  visibleToAll: boolean
  allowCollaborativeWrite: boolean
  collaborationPolicy?: LiveDocumentCollaborationPolicy
  active: boolean
  submissions?: Array<{ userId: string; userName: string; submittedAt: number }>
  updatedAt: number
  questions?: QuizQuestion[]
  revealAnswersToStudents?: boolean
  isAiGraded?: boolean
  timeLimit?: number
}

interface LiveSharedDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  share: LiveSharedDocument | null
  viewerRole: 'tutor' | 'student'
  canManageShare?: boolean
  onVisibilityChange?: (visible: boolean) => void
  onWriteAccessChange?: (allow: boolean) => void
  onCollaborationPolicyChange?: (policy: LiveDocumentCollaborationPolicy) => void
  onSubmitToTutor?: () => void
  onRevealAnswersChange?: (revealed: boolean) => void
  onAiGradingChange?: (enabled: boolean) => void
  onTimeLimitChange?: (minutes: number) => void
  hasSubmitted?: boolean
}

export function LiveSharedDocumentModal({
  open,
  onOpenChange,
  share,
  viewerRole,
  canManageShare = false,
  onVisibilityChange,
  onWriteAccessChange,
  onCollaborationPolicyChange,
  onSubmitToTutor,
  onRevealAnswersChange,
  onAiGradingChange,
  onTimeLimitChange,
  hasSubmitted = false,
}: LiveSharedDocumentModalProps) {
  const questions = Array.isArray(share?.questions) ? share?.questions : []
  const isQuestionShare = questions.length > 0
  const isPdf = !isQuestionShare && ((share?.mimeType || '').includes('pdf') || (share?.fileUrl || '').toLowerCase().includes('.pdf'))
  const isReadOnly = share ? !share.allowCollaborativeWrite && !canManageShare : true
  const collaborationPolicy: LiveDocumentCollaborationPolicy = {
    allowDrawing: share?.collaborationPolicy?.allowDrawing ?? true,
    allowTyping: share?.collaborationPolicy?.allowTyping ?? true,
    allowShapes: share?.collaborationPolicy?.allowShapes ?? true,
  }
  const [currentIndex, setCurrentIndex] = useState(0)
  const [extendMode, setExtendMode] = useState(false)
  const [extendStreak, setExtendStreak] = useState(0)
  const [extendQuestion, setExtendQuestion] = useState<QuizQuestion | null>(null)
  const [extendBaseQuestion, setExtendBaseQuestion] = useState<QuizQuestion | null>(null)
  const [answer, setAnswer] = useState<string | string[] | null>(null)
  const [extendLoading, setExtendLoading] = useState(false)
  const [showTutorAnswers, setShowTutorAnswers] = useState(false)
  const [timeLimitInput, setTimeLimitInput] = useState<number>(share?.timeLimit || 30)

  const currentQuestion = extendMode ? extendQuestion : questions[currentIndex]
  const isStudent = viewerRole === 'student'

  useEffect(() => {
    setCurrentIndex(0)
    setExtendMode(false)
    setExtendStreak(0)
    setExtendQuestion(null)
    setExtendBaseQuestion(null)
    setAnswer(null)
    setTimeLimitInput(share?.timeLimit || 30)
  }, [share?.shareId, share?.timeLimit])

  useEffect(() => {
    if (!currentQuestion) return
    if (currentQuestion.type === 'multiselect') {
      setAnswer([])
    } else if (currentQuestion.type === 'matching') {
      const pairs = currentQuestion.matchingPairs ?? []
      setAnswer(pairs.map(() => ''))
    } else {
      setAnswer('')
    }
  }, [currentQuestion?.id])

  const requestExtendedQuestion = async (baseQuestion: QuizQuestion, difficulty: 'easier' | 'harder') => {
    try {
      setExtendLoading(true)
      const res = await fetch('/api/live-class/questions/extend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ question: baseQuestion, difficulty }),
      })
      if (!res.ok) return null
      const data = await res.json()
      return data?.question as QuizQuestion
    } catch {
      return null
    } finally {
      setExtendLoading(false)
    }
  }

  const isAnswerCorrect = (question: QuizQuestion, value: string | string[] | null) => {
    if (value === null || value === undefined) return false
    const correct = question.correctAnswer
    if (question.type === 'multiselect') {
      const selected = Array.isArray(value) ? value : []
      const expected = Array.isArray(correct) ? correct : []
      return selected.length === expected.length && selected.every((v) => expected.includes(v))
    }
    if (question.type === 'matching') {
      const selected = Array.isArray(value) ? value : []
      const expected = Array.isArray(correct) ? correct : []
      return selected.length === expected.length && selected.every((v, idx) => v === expected[idx])
    }
    if (typeof correct === 'string') {
      return String(value).trim().toLowerCase() === correct.trim().toLowerCase()
    }
    return String(value).trim().length > 0
  }

  const handleNextQuestion = async () => {
    if (!currentQuestion) return
    const correct = isAnswerCorrect(currentQuestion, answer)

    if (!extendMode && currentQuestion.extendEnabled) {
      const nextDifficulty: 'easier' | 'harder' = correct ? 'harder' : 'easier'
      const generated = await requestExtendedQuestion(currentQuestion, nextDifficulty)
      if (generated) {
        setExtendMode(true)
        setExtendBaseQuestion(currentQuestion)
        setExtendQuestion(generated)
        setExtendStreak(correct ? 1 : 0)
        return
      }
    }

    if (extendMode && extendBaseQuestion) {
      const nextStreak = correct ? extendStreak + 1 : 0
      if (nextStreak >= 3) {
        setExtendMode(false)
        setExtendStreak(0)
        setExtendQuestion(null)
        setExtendBaseQuestion(null)
        setCurrentIndex((prev) => Math.min(prev + 1, questions.length))
        return
      }
      const nextDifficulty: 'easier' | 'harder' = correct ? 'harder' : 'easier'
      const generated = await requestExtendedQuestion(extendBaseQuestion, nextDifficulty)
      if (generated) {
        setExtendQuestion(generated)
        setExtendStreak(nextStreak)
        return
      }
    }

    const isLast = currentIndex + 1 >= questions.length
    if (isLast && onSubmitToTutor && viewerRole === 'student') {
      onSubmitToTutor()
    }
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length))
  }

  const handleTimeLimitChange = (value: string) => {
    const minutes = parseInt(value) || 0
    setTimeLimitInput(minutes)
    onTimeLimitChange?.(minutes)
  }

  if (!share) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-[1300px] overflow-hidden p-0">
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b px-5 py-4 shrink-0">
            <div className="flex items-center gap-2">
              <DialogTitle>{share.title}</DialogTitle>
              <Badge variant="outline">Owner: {share.ownerName}</Badge>
              <Badge variant={share.visibleToAll ? 'default' : 'secondary'}>
                {share.visibleToAll ? 'Visible to class' : 'Private copy'}
              </Badge>
              <Badge variant="outline">
                Submissions: {share.submissions?.length || 0}
              </Badge>
            </div>
            <DialogDescription>
              {share.description || 'Shared live document session'}
            </DialogDescription>
          </DialogHeader>

          {canManageShare && (
            <ScrollArea className="border-b shrink-0">
              <div className="px-5 py-3 space-y-4">
                {/* Row 1: Visibility Controls - Icons with labels */}
                <div className="flex flex-wrap items-center gap-6">
                  {/* Reveal answers to me - Icon button */}
                  {isQuestionShare && (
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant={showTutorAnswers ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowTutorAnswers(!showTutorAnswers)}
                        className="gap-2"
                        title="Reveal answers to me"
                      >
                        {showTutorAnswers ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        <span className="hidden sm:inline">Answers to me</span>
                      </Button>
                    </div>
                  )}
                  
                  {/* Reveal answers to students - Icon button */}
                  {isQuestionShare && (
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant={share.revealAnswersToStudents ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          const newValue = !share.revealAnswersToStudents
                          if (newValue && !confirm('Reveal answers to students now?')) return
                          onRevealAnswersChange?.(newValue)
                        }}
                        className="gap-2"
                        title="Reveal answers to students"
                      >
                        {share.revealAnswersToStudents ? <GraduationCap className="h-4 w-4" /> : <GraduationCap className="h-4 w-4 opacity-50" />}
                        <span className="hidden sm:inline">Answers to students</span>
                      </Button>
                    </div>
                  )}
                  
                  {/* Visible to everyone */}
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={share.visibleToAll} 
                      onCheckedChange={onVisibilityChange} 
                      id="visible-to-all"
                    />
                    <Label htmlFor="visible-to-all" className="flex items-center gap-1.5 cursor-pointer">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Visible to everyone in this live class
                    </Label>
                  </div>
                </div>

                {/* Row 2: AI Grading & Timer */}
                {isQuestionShare && (
                  <div className="flex flex-wrap items-center gap-6 pt-2 border-t">
                    {/* Enable AI grading assistance */}
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={share.isAiGraded ?? false} 
                        onCheckedChange={onAiGradingChange}
                        id="ai-grading"
                      />
                      <Label htmlFor="ai-grading" className="flex items-center gap-1.5 cursor-pointer">
                        <BrainCircuit className="h-4 w-4 text-purple-500" />
                        Enable AI grading assistance
                      </Label>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="time-limit" className="text-sm">Time limit:</Label>
                      <Input
                        id="time-limit"
                        type="number"
                        min={0}
                        max={180}
                        value={timeLimitInput}
                        onChange={(e) => handleTimeLimitChange(e.target.value)}
                        className="w-20 h-8"
                      />
                      <span className="text-sm text-muted-foreground">minutes</span>
                    </div>
                  </div>
                )}

                {/* Row 3: Write Access & Collaboration Policy */}
                <div className="pt-2 border-t">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Allow others to write */}
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={share.allowCollaborativeWrite} 
                        onCheckedChange={onWriteAccessChange}
                        id="allow-write"
                      />
                      <Label htmlFor="allow-write" className="flex items-center gap-1.5 cursor-pointer">
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                        Allow others to write/type on this document
                      </Label>
                    </div>

                    {/* Collaboration policy controls - disabled when write access is off */}
                    <div className="flex items-center gap-4 ml-0 sm:ml-4 pl-0 sm:pl-4 border-0 sm:border-l">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={collaborationPolicy.allowDrawing}
                          onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowDrawing: checked })}
                          disabled={!share.allowCollaborativeWrite}
                          id="allow-drawing"
                        />
                        <Label htmlFor="allow-drawing" className={`flex items-center gap-1.5 cursor-pointer ${!share.allowCollaborativeWrite ? 'opacity-50' : ''}`}>
                          <Pencil className="h-3.5 w-3.5" />
                          Allow drawing
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={collaborationPolicy.allowTyping}
                          onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowTyping: checked })}
                          disabled={!share.allowCollaborativeWrite}
                          id="allow-typing"
                        />
                        <Label htmlFor="allow-typing" className={`flex items-center gap-1.5 cursor-pointer ${!share.allowCollaborativeWrite ? 'opacity-50' : ''}`}>
                          <Type className="h-3.5 w-3.5" />
                          Allow typing
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={collaborationPolicy.allowShapes}
                          onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowShapes: checked })}
                          disabled={!share.allowCollaborativeWrite}
                          id="allow-shapes"
                        />
                        <Label htmlFor="allow-shapes" className={`flex items-center gap-1.5 cursor-pointer ${!share.allowCollaborativeWrite ? 'opacity-50' : ''}`}>
                          <Shapes className="h-3.5 w-3.5" />
                          Allow shapes
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}

          {!canManageShare && onSubmitToTutor && (
            <div className="border-b px-5 py-3 shrink-0">
              <button
                type="button"
                onClick={onSubmitToTutor}
                disabled={hasSubmitted}
                className="rounded border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-60"
              >
                {hasSubmitted ? 'Submitted to Tutor' : 'Submit to Tutor'}
              </button>
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-auto p-0">
            {isQuestionShare ? (
              <div className="p-6 space-y-4">
                {extendMode && (
                  <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    Extend mode active. Keep answering to complete the extension streak.
                  </div>
                )}
                {canManageShare ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Tutor view — {questions.length} question(s)
                      </div>
                      {/* Timer display for tutor */}
                      {share.timeLimit && share.timeLimit > 0 && (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Time limit: {share.timeLimit} min</span>
                        </div>
                      )}
                    </div>
                    <ScrollArea className="h-[50vh] border rounded-lg p-4">
                      <div className="space-y-3">
                        {questions.map((q, idx) => (
                          <div key={q.id} className="rounded-lg border p-4 space-y-2">
                            <div className="text-sm font-medium">
                              Q{idx + 1}. {q.question}
                            </div>
                            {q.options?.length ? (
                              <div className="text-xs text-muted-foreground">
                                Options: {q.options.join(', ')}
                              </div>
                            ) : null}
                            {q.type === 'matching' && q.matchingPairs && (
                              <div className="text-xs text-muted-foreground">
                                Pairs: {q.matchingPairs.map((pair) => `${pair.left} → ${pair.right}`).join(' | ')}
                              </div>
                            )}
                            {showTutorAnswers && (
                              <div className="text-xs text-emerald-700">
                                Answer: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer || '—'}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </>
                ) : currentQuestion ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Question {Math.min(currentIndex + 1, questions.length)} of {questions.length}
                      </div>
                      {extendLoading && <Badge variant="secondary">Generating follow-up…</Badge>}
                      {/* Timer display for students */}
                      {share.timeLimit && share.timeLimit > 0 && (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Time limit: {share.timeLimit} min</span>
                        </div>
                      )}
                    </div>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="font-medium">{currentQuestion.question}</div>
                      {currentQuestion.type === 'mcq' && currentQuestion.options && (
                        <div className="space-y-2">
                          {currentQuestion.options.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-sm">
                              <input
                                type="radio"
                                name={`answer-${currentQuestion.id}`}
                                checked={answer === opt}
                                onChange={() => setAnswer(opt)}
                                disabled={!isStudent}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {currentQuestion.type === 'truefalse' && (
                        <div className="flex gap-4">
                          {['True', 'False'].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-sm">
                              <input
                                type="radio"
                                name={`answer-${currentQuestion.id}`}
                                checked={answer === opt}
                                onChange={() => setAnswer(opt)}
                                disabled={!isStudent}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {currentQuestion.type === 'multiselect' && currentQuestion.options && (
                        <div className="space-y-2">
                          {currentQuestion.options.map((opt) => {
                            const selected = Array.isArray(answer) ? answer : []
                            const checked = selected.includes(opt)
                            return (
                              <label key={opt} className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => {
                                    const next = new Set(selected)
                                    if (e.target.checked) next.add(opt)
                                    else next.delete(opt)
                                    setAnswer(Array.from(next))
                                  }}
                                  disabled={!isStudent}
                                />
                                <span>{opt}</span>
                              </label>
                            )
                          })}
                        </div>
                      )}
                      {currentQuestion.type === 'matching' && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            {(currentQuestion.matchingPairs || []).map((pair, idx) => (
                              <div key={`left-${idx}`} className="rounded border px-2 py-1">
                                {pair.left || `Column A ${idx + 1}`}
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            {(currentQuestion.matchingPairs || []).map((pair, idx) => {
                              const selected = Array.isArray(answer) ? answer : []
                              const rightOptions = (currentQuestion.matchingPairs || []).map((p) => p.right)
                              return (
                                <select
                                  key={`right-${idx}`}
                                  className="w-full rounded border px-2 py-1"
                                  value={selected[idx] || ''}
                                  onChange={(e) => {
                                    const next = [...selected]
                                    next[idx] = e.target.value
                                    setAnswer(next)
                                  }}
                                  disabled={!isStudent}
                                >
                                  <option value="">Select match</option>
                                  {rightOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt || '—'}
                                    </option>
                                  ))}
                                </select>
                              )
                            })}
                          </div>
                        </div>
                      )}
                      {(currentQuestion.type === 'shortanswer' || currentQuestion.type === 'fillblank') && (
                        <Input
                          value={typeof answer === 'string' ? answer : ''}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Type your answer"
                          disabled={!isStudent}
                        />
                      )}
                      {currentQuestion.type === 'essay' && (
                        <Textarea
                          value={typeof answer === 'string' ? answer : ''}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Write your response"
                          rows={4}
                          disabled={!isStudent}
                        />
                      )}
                      {share.revealAnswersToStudents && (
                        <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                          Answer: {Array.isArray(currentQuestion.correctAnswer)
                            ? currentQuestion.correctAnswer.join(', ')
                            : currentQuestion.correctAnswer || '—'}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleNextQuestion} disabled={!isStudent || extendLoading}>
                        {currentIndex + 1 >= questions.length && !extendMode ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="rounded border p-4 text-sm text-muted-foreground">
                    No questions available.
                  </div>
                )}
              </div>
            ) : isPdf ? (
              <PDFCollaborativeViewer
                roomId={share.pdfRoomId}
                role={viewerRole}
                initialPdfUrl={share.fileUrl}
                forceLocked={isReadOnly}
                showLockControl={canManageShare}
                showCollabStatus={viewerRole === 'tutor'}
                showAiActions={viewerRole === 'tutor'}
                capabilities={{
                  draw: canManageShare || (share.allowCollaborativeWrite && collaborationPolicy.allowDrawing),
                  erase: canManageShare || (share.allowCollaborativeWrite && collaborationPolicy.allowDrawing),
                  text: canManageShare || (share.allowCollaborativeWrite && collaborationPolicy.allowTyping),
                  shapes: canManageShare || (share.allowCollaborativeWrite && collaborationPolicy.allowShapes),
                  select: canManageShare || share.allowCollaborativeWrite,
                  clear: canManageShare || share.allowCollaborativeWrite,
                }}
              />
            ) : (
              <div className="m-4 rounded-lg border bg-muted/20 p-4 text-sm">
                <p className="font-medium">This file is not a PDF.</p>
                <p className="text-muted-foreground">
                  Open the source file in a new tab. PDF canvas annotation is available for PDF files.
                </p>
                {share.fileUrl && (
                  <a
                    href={share.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-blue-600 underline"
                  >
                    Open source file
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
