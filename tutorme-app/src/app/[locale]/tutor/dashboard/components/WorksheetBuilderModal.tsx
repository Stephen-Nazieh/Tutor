'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AutoTextarea } from '@/components/ui/auto-textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Plus, X, Shield, Unlock, Lock } from 'lucide-react'
import type { Worksheet, QuizQuestion } from './builder-types'
import { DEFAULT_WORKSHEET } from './builder-utils'
import {
  ResourceImportPanel,
  MatchingPairsEditor,
  QuestionsPreview,
  formatMatchingExplanation,
} from './builder-components'

interface BuilderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  initialData?: any
}

export function WorksheetBuilderModal({ isOpen, onClose, onSave, initialData }: BuilderModalProps) {
  const [data, setData] = useState<Worksheet>(initialData || DEFAULT_WORKSHEET(0))
  const [showAnswerKey, setShowAnswerKey] = useState(false)

  const addQuestion = (type: QuizQuestion['type']) => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-500" />
            Worksheet Builder
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
            className="mt-4 space-y-4 rounded-2xl bg-white/95 p-6 py-4 shadow-2xl backdrop-blur-md"
          >
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Worksheet Title *</Label>
                <Input
                  value={data.title}
                  onChange={(e: any) => setData({ ...data, title: e.target.value })}
                  placeholder="e.g., Practice Problems - Chapter 3"
                />
              </div>
              <div className="space-y-2">
                <Label>Instructions</Label>
                <AutoTextarea
                  value={data.description}
                  onChange={(e: any) => setData({ ...data, description: e.target.value })}
                  placeholder="What should students know before starting this worksheet?"
                  rows={2}
                />
              </div>
              <ResourceImportPanel data={data} setData={setData} targetField="instructions" />
              <div className="space-y-2">
                <Label>Instructions *</Label>
                <AutoTextarea
                  value={data.instructions}
                  onChange={(e: any) => setData({ ...data, instructions: e.target.value })}
                  placeholder="Detailed instructions for students"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Time (min)</Label>
                  <Input
                    type="number"
                    value={data.estimatedMinutes}
                    onChange={(e: any) =>
                      setData({ ...data, estimatedMinutes: parseInt(e.target.value) || 20 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={data.points}
                    onChange={(e: any) =>
                      setData({ ...data, points: parseInt(e.target.value) || 15 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Passing Score (%)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={data.passingScore}
                    onChange={(e: any) =>
                      setData({ ...data, passingScore: parseInt(e.target.value) || 70 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Attempts</Label>
                  <Input
                    type="number"
                    min={1}
                    value={data.maxAttempts}
                    onChange={(e: any) =>
                      setData({ ...data, maxAttempts: parseInt(e.target.value) || 1 })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4 rounded-lg border bg-cyan-50/30 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-cyan-700">Questions ({data.questions.length})</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => addQuestion('mcq')}>
                      <Plus className="mr-1 h-4 w-4" /> MCQ
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('truefalse')}>
                      <Plus className="mr-1 h-4 w-4" /> T/F
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('shortanswer')}>
                      <Plus className="mr-1 h-4 w-4" /> Short
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addQuestion('matching')}>
                      <Plus className="mr-1 h-4 w-4" /> Matching
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {data.questions.map((q, idx) => (
                    <div key={q.id} className="space-y-3 rounded-lg border bg-white p-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          Q{idx + 1} - {q.type.toUpperCase()}
                        </Badge>
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
                        onChange={(e: any) => updateQuestion(idx, { explanation: e.target.value })}
                        placeholder="Explanation (shown after answering)"
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer Key Section */}
              <div className="mt-4 border-t pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <Label className="font-medium text-amber-700">Answer Key (Protected)</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 text-xs"
                    onClick={() => setShowAnswerKey(!showAnswerKey)}
                  >
                    {showAnswerKey ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    {showAnswerKey ? 'Hide' : 'Show'}
                  </Button>
                </div>
                {showAnswerKey ? (
                  <div className="space-y-3">
                    <Textarea
                      value={data.answerKey || ''}
                      onChange={(e: any) => setData({ ...data, answerKey: e.target.value })}
                      placeholder="Enter solution details..."
                      rows={4}
                      className="border-amber-400 bg-amber-50/30"
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={data.answerKeyProtected}
                        onCheckedChange={checked =>
                          setData({ ...data, answerKeyProtected: checked })
                        }
                      />
                      <Label className="text-xs text-muted-foreground">Protect answer key</Label>
                    </div>
                  </div>
                ) : (
                  <div className="rounded border border-dashed border-gray-400 bg-gray-50 p-3 text-center">
                    <span className="text-xs text-muted-foreground">Answer key is hidden</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="preview"
            className="mt-4 space-y-4 rounded-2xl bg-white/95 p-6 py-4 shadow-2xl backdrop-blur-md"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{data.title}</h3>
              <p className="text-sm text-muted-foreground">{data.description}</p>
              <div className="text-sm">{data.instructions}</div>
              <div className="mt-4">
                <h4 className="mb-2 font-medium">Questions</h4>
                <QuestionsPreview questions={data.questions} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(data)}>Save Worksheet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
