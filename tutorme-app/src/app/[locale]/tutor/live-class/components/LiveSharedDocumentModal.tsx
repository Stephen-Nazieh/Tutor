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

  const currentQuestion = extendMode ? extendQuestion : questions[currentIndex]
  const isStudent = viewerRole === 'student'

  useEffect(() => {
    setCurrentIndex(0)
    setExtendMode(false)
    setExtendStreak(0)
    setExtendQuestion(null)
    setExtendBaseQuestion(null)
    setAnswer(null)
  }, [share?.shareId])

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

  if (!share) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-[1300px] overflow-hidden p-0">
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b px-5 py-4">
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
            <div className="grid grid-cols-1 gap-4 border-b px-5 py-3 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Switch checked={share.visibleToAll} onCheckedChange={onVisibilityChange} />
                <Label>Visible to everyone in this live class</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={share.allowCollaborativeWrite} onCheckedChange={onWriteAccessChange} />
                <Label>Allow others to write/type on this document</Label>
              </div>
              {isQuestionShare && (
                <div className="flex items-center gap-2 md:col-span-2">
                  <Switch
                    checked={share.revealAnswersToStudents ?? false}
                    onCheckedChange={(checked) => {
                      if (checked && !confirm('Reveal answers to students now?')) return
                      onRevealAnswersChange?.(checked)
                    }}
                  />
                  <Label>Reveal answers to students</Label>
                </div>
              )}
              <div className="col-span-full grid grid-cols-1 gap-3 rounded-md border bg-muted/20 px-3 py-2 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={collaborationPolicy.allowDrawing}
                    onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowDrawing: checked })}
                    disabled={!share.allowCollaborativeWrite}
                  />
                  <Label>Allow drawing</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={collaborationPolicy.allowTyping}
                    onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowTyping: checked })}
                    disabled={!share.allowCollaborativeWrite}
                  />
                  <Label>Allow typing</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={collaborationPolicy.allowShapes}
                    onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowShapes: checked })}
                    disabled={!share.allowCollaborativeWrite}
                  />
                  <Label>Allow shapes</Label>
                </div>
              </div>
            </div>
          )}

          {!canManageShare && onSubmitToTutor && (
            <div className="border-b px-5 py-3">
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
                      <div className="flex items-center gap-2">
                        <Switch checked={showTutorAnswers} onCheckedChange={setShowTutorAnswers} />
                        <Label>Reveal answers to me</Label>
                      </div>
                    </div>
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
                  </>
                ) : currentQuestion ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Question {Math.min(currentIndex + 1, questions.length)} of {questions.length}
                      </div>
                      {extendLoading && <Badge variant="secondary">Generating follow-up…</Badge>}
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
