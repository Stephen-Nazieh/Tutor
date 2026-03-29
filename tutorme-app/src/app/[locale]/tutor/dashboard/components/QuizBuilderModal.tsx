'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AutoTextarea } from '@/components/ui/auto-textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileQuestion, Plus, X, BookOpen, Shield, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import {
  type Quiz,
  type ModuleQuiz,
  type QuizQuestion,
  type BuilderModalProps,
} from './builder-types'
import { ResourceImportPanel, MatchingPairsEditor, QuestionsPreview } from './builder-components'
import {
  DEFAULT_QUIZ,
  DEFAULT_MODULE_QUIZ,
  generateId,
  mapQuestionBankToBuilderQuestion,
} from './builder-utils'

function formatMatchingExplanation(pairs: { left: string; right: string }[]) {
  return pairs.map(p => `${p.left} -> ${p.right}`).join('\n')
}

export function QuizBuilderModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  isModuleQuiz = false,
}: BuilderModalProps & { isModuleQuiz?: boolean }) {
  const [data, setData] = useState<Quiz | ModuleQuiz>(
    initialData || (isModuleQuiz ? DEFAULT_MODULE_QUIZ(0) : DEFAULT_QUIZ(0))
  )
  const [showQuestionBankModal, setShowQuestionBankModal] = useState(false)

  const addQuestion = async (type: QuizQuestion['type']) => {
    const matchingPairs =
      type === 'matching'
        ? [
            { left: '', right: '' },
            { left: '', right: '' },
          ]
        : undefined
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options:
        type === 'mcq' ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : undefined,
      matchingPairs,
      correctAnswer: matchingPairs ? matchingPairs.map(pair => pair.right) : undefined,
    }
    setData({ ...data, questions: [...data.questions, newQuestion] })

    // Auto-save to question bank
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      await fetch('/api/tutor/question-bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          question: newQuestion.question || '[Empty Question]',
          type: newQuestion.type,
          options: newQuestion.options,
          correctAnswer: newQuestion.correctAnswer,
          explanation: newQuestion.explanation || '',
        }),
      })
    } catch {
      // Silent fail - question is still added to the assessment
    }
  }

  const updateQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    const newQuestions = [...data.questions]
    newQuestions[index] = { ...newQuestions[index], ...updates }
    setData({ ...data, questions: newQuestions })
  }

  const removeQuestion = (index: number) => {
    setData({ ...data, questions: data.questions.filter((_, i) => i !== index) })
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileQuestion className="h-5 w-5 text-red-500" />
              {isModuleQuiz ? 'Exam Builder (Summative)' : 'Assessment Builder'}
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2 gap-1 rounded-xl border bg-muted p-1">
              <TabsTrigger
                value="edit"
                className="rounded-lg border border-gray-400 bg-white transition-all duration-200 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
              >
                Edit
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="rounded-lg border border-gray-400 bg-white transition-all duration-200 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
              >
                Preview (student view)
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="edit"
              className="mt-4 space-y-4 rounded-2xl border border-border bg-card/95 p-6 py-4 shadow-xl backdrop-blur-md"
            >
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>{isModuleQuiz ? 'Exam Title *' : 'Assessment Title *'}</Label>
                  <Input
                    value={data.title}
                    onChange={(e: any) => setData({ ...data, title: e.target.value })}
                    placeholder={
                      isModuleQuiz
                        ? 'e.g., Lesson 1 Comprehensive Exam'
                        : 'e.g., Lesson 1 Assessment'
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <AutoTextarea
                    value={data.description}
                    onChange={(e: any) => setData({ ...data, description: e.target.value })}
                    placeholder="What should students know before starting this exam?"
                    rows={2}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={data.showCorrectAnswers}
                      onCheckedChange={checked => setData({ ...data, showCorrectAnswers: checked })}
                      disabled={data.answersNeverVisible}
                    />
                    <Label className="text-sm">Show correct answers</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={data.randomizeQuestions}
                      onCheckedChange={checked => setData({ ...data, randomizeQuestions: checked })}
                    />
                    <Label className="text-sm">Randomize questions</Label>
                  </div>
                  <div className="flex items-center gap-2 border-l border-amber-400 pl-4">
                    <Switch
                      checked={data.answersNeverVisible}
                      onCheckedChange={checked =>
                        setData({
                          ...data,
                          answersNeverVisible: checked,
                          showCorrectAnswers: checked ? false : data.showCorrectAnswers,
                        })
                      }
                    />
                    <Label className="flex items-center gap-1 text-sm font-medium text-amber-700">
                      <Shield className="h-3 w-3" />
                      Never show answers to students
                    </Label>
                  </div>
                </div>

                {isModuleQuiz && (
                  <div className="space-y-2 rounded-lg border bg-blue-50 p-4">
                    <Label>Coverage</Label>
                    <Select
                      value={(data as ModuleQuiz).coverage}
                      onValueChange={v =>
                        setData({ ...data, coverage: v as 'all_lessons' | 'selected_lessons' })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_lessons">All lessons in module</SelectItem>
                        <SelectItem value="selected_lessons">Selected lessons only</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      This is a summative assessment covering knowledge from the entire module
                    </p>
                  </div>
                )}

                <ResourceImportPanel data={data} setData={setData} targetField="description" />

                {/* Questions Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Questions ({data.questions.length})</h3>
                  </div>

                  <div className="space-y-3">
                    {data.questions.map((q, idx) => (
                      <div key={q.id} className="space-y-3 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">
                              Q{idx + 1} - {q.type.toUpperCase()}
                            </Badge>
                            <label className="flex items-center gap-1 text-xs text-muted-foreground">
                              <input
                                type="checkbox"
                                checked={q.extendEnabled ?? false}
                                onChange={(e: any) =>
                                  updateQuestion(idx, { extendEnabled: e.target.checked })
                                }
                              />
                              Extend
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              className="h-8 w-20"
                              value={q.points}
                              onChange={(e: any) =>
                                updateQuestion(idx, { points: parseInt(e.target.value) || 1 })
                              }
                            />
                            <span className="text-sm text-muted-foreground">pts</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeQuestion(idx)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <AutoTextarea
                          value={q.question}
                          onChange={(e: any) => updateQuestion(idx, { question: e.target.value })}
                          placeholder="Enter question"
                          rows={2}
                        />
                        {q.type === 'mcq' && q.options && (
                          <div className="space-y-2 pl-4">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${q.id}`}
                                  checked={q.correctAnswer === opt}
                                  onChange={() => updateQuestion(idx, { correctAnswer: opt })}
                                />
                                <Input
                                  value={opt}
                                  onChange={(e: any) => {
                                    const newOptions = [...q.options!]
                                    newOptions[optIdx] = e.target.value
                                    updateQuestion(idx, { options: newOptions })
                                  }}
                                  placeholder={`Option ${optIdx + 1}`}
                                  className="flex-1"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {q.type === 'truefalse' && (
                          <div className="flex gap-4 pl-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctAnswer === 'True'}
                                onChange={() => updateQuestion(idx, { correctAnswer: 'True' })}
                              />
                              <span>True</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctAnswer === 'False'}
                                onChange={() => updateQuestion(idx, { correctAnswer: 'False' })}
                              />
                              <span>False</span>
                            </label>
                          </div>
                        )}
                        {q.type === 'matching' && (
                          <MatchingPairsEditor
                            pairs={
                              q.matchingPairs ?? [
                                { left: '', right: '' },
                                { left: '', right: '' },
                              ]
                            }
                            onChange={nextPairs =>
                              updateQuestion(idx, {
                                matchingPairs: nextPairs,
                                correctAnswer: nextPairs.map(pair => pair.right),
                                explanation: formatMatchingExplanation(nextPairs),
                              })
                            }
                          />
                        )}
                        <Textarea
                          value={q.explanation || ''}
                          onChange={(e: any) =>
                            updateQuestion(idx, { explanation: e.target.value })
                          }
                          placeholder="Explanation (shown after answering)"
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add Questions Bar */}
                  <div className="flex flex-wrap items-center gap-2 border-t pt-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowQuestionBankModal(true)}
                    >
                      <BookOpen className="mr-1 h-4 w-4" /> Add from question bank
                    </Button>
                    <div className="mx-1 h-6 w-px bg-border" />
                    <Button variant="outline" size="sm" onClick={() => addQuestion('mcq')}>
                      <Plus className="mr-1 h-4 w-4" /> MCQ
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('truefalse')}>
                      <Plus className="mr-1 h-4 w-4" /> T/F
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('shortanswer')}>
                      <Plus className="mr-1 h-4 w-4" /> Short
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('essay')}>
                      <Plus className="mr-1 h-4 w-4" /> Essay
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('multiselect')}>
                      <Plus className="mr-1 h-4 w-4" /> Multi
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('matching')}>
                      <Plus className="mr-1 h-4 w-4" /> Match
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('fillblank')}>
                      <Plus className="mr-1 h-4 w-4" /> Fill
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="preview"
              className="mt-4 space-y-4 rounded-2xl bg-white/95 p-6 py-4 shadow-2xl backdrop-blur-md"
            >
              <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
                <h3 className="font-semibold">{data.title}</h3>
                {data.description && (
                  <p className="text-sm text-muted-foreground">{data.description}</p>
                )}
                {data.sourceDocument && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Imported material (editable)
                    </p>
                    <Textarea
                      value={data.sourceDocument.extractedText}
                      onChange={(e: any) =>
                        setData({
                          ...data,
                          sourceDocument: {
                            ...data.sourceDocument!,
                            extractedText: e.target.value,
                          },
                        })
                      }
                      rows={6}
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {data.timeLimit != null ? `${data.timeLimit} min limit · ` : ''}
                  {(data as Quiz).attemptsAllowed} attempt(s) · {data.questions.length} questions
                </p>
                <h4 className="mt-4 text-sm font-medium">Questions</h4>
                <QuestionsPreview questions={data.questions ?? []} />
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave({ ...data })} disabled={data.questions.length === 0}>
              Save ({data.questions.length} questions)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Question Bank Modal */}
      <Dialog open={showQuestionBankModal} onOpenChange={setShowQuestionBankModal}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Question Bank
            </DialogTitle>
          </DialogHeader>
          <QuestionBankSelector
            onSelect={questions => {
              setData({ ...data, questions: [...data.questions, ...questions] })
              setShowQuestionBankModal(false)
              toast.success(`${questions.length} question(s) added`)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

interface QuestionBankItemLite {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: string | string[] | null
  points?: number
}

function QuestionBankSelector({ onSelect }: { onSelect: (questions: QuizQuestion[]) => void }) {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<QuestionBankItemLite[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/tutor/question-bank?limit=200', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        const next = Array.isArray(data.questions) ? data.questions : []
        if (active) setItems(next)
      } catch {
        // Non-fatal.
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const filteredItems = items.filter(
    item =>
      item.question.toLowerCase().includes(filter.toLowerCase()) ||
      item.type.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search questions..."
        value={filter}
        onChange={(e: any) => setFilter(e.target.value)}
        className="w-full"
      />
      <div className="max-h-[400px] overflow-y-auto rounded-lg border">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filteredItems.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No questions found</div>
        ) : (
          <div className="divide-y">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={`cursor-pointer p-3 transition-colors hover:bg-muted/50 ${
                  selectedIds.has(item.id) ? 'bg-blue-50 hover:bg-blue-100' : ''
                }`}
                onClick={() => toggleSelection(item.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                      selectedIds.has(item.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                    }`}
                  >
                    {selectedIds.has(item.id) && <CheckCircle className="h-3 w-3 text-white" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.options?.length || 0} options
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm">{item.question}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() =>
            onSelect(items.filter(i => selectedIds.has(i.id)).map(mapQuestionBankToBuilderQuestion))
          }
          disabled={selectedIds.size === 0}
        >
          Add Selected ({selectedIds.size})
        </Button>
      </div>
    </div>
  )
}
