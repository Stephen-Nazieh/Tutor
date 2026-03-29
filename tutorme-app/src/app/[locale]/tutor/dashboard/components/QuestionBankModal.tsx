'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { BookOpen, CheckCircle } from 'lucide-react'

interface QuestionBankModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (items: { questionText: string; pciText: string }[]) => void
}

interface Question {
  id: string
  type: 'multiple_choice' | 'short_answer' | 'essay'
  question: string
  options?: string[]
  correctAnswer?: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
  points?: number
  explanation?: string
}

export function QuestionBankModal({ isOpen, onClose, onImport }: QuestionBankModalProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set())
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null)
  const [filterSubject, setFilterSubject] = useState<string>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isOpen) return
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/tutor/question-bank?limit=200', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        const next = Array.isArray(data.questions) ? data.questions : []
        if (active) setQuestions(next)
      } catch {
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [isOpen])

  const subjects = Array.from(new Set(questions.map(q => q.subject).filter(Boolean)))

  const filteredQuestions = questions.filter(q => {
    const matchesSubject = filterSubject === 'all' || q.subject === filterSubject
    const matchesDifficulty = filterDifficulty === 'all' || q.difficulty === filterDifficulty
    const matchesSearch =
      searchQuery === '' ||
      (q.question && q.question.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.subject && q.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSubject && matchesDifficulty && matchesSearch
  })

  const toggleQuestion = (id: string) => {
    const newSelected = new Set(selectedQuestions)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedQuestions(newSelected)

    // Set preview to the last selected question
    const question = questions.find(q => q.id === id)
    if (question && newSelected.has(id)) {
      setPreviewQuestion(question)
    } else if (newSelected.size === 0) {
      setPreviewQuestion(null)
    }
  }

  const handleImport = () => {
    const selectedQList = questions.filter(q => selectedQuestions.has(q.id))
    const items = selectedQList.map((q, idx) => {
      let qText = `${idx + 1}. ${q.question}`
      if (q.options && Array.isArray(q.options) && q.options.length > 0) {
        qText += '\n    - ' + q.options.join('\n    - ')
      }
      let answerStr = q.correctAnswer
      if (Array.isArray(q.correctAnswer)) {
        answerStr = q.correctAnswer.join(', ')
      }
      let pciText = `${idx + 1}. ${answerStr || '[Answer goes here]'}`
      return { questionText: qText, pciText }
    })

    onImport(items)
    setSelectedQuestions(new Set())
    setPreviewQuestion(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[90vh] max-w-4xl flex-col rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Assessment Bank
          </DialogTitle>
        </DialogHeader>

        {/* Filters */}
        <div className="mb-4 flex gap-3">
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <select
            value={filterSubject}
            onChange={(e: any) => setFilterSubject(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm"
          >
            <option value="all">All Subjects</option>
            {subjects.map(s => (
              <option key={s as string} value={s as string}>
                {s as string}
              </option>
            ))}
          </select>
          <select
            value={filterDifficulty}
            onChange={(e: any) => setFilterDifficulty(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Left: Question List */}
          <div className="flex-1 overflow-y-auto rounded-lg border">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading bank...</div>
            ) : filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No matched items</div>
            ) : (
              filteredQuestions.map(question => (
                <div
                  key={question.id}
                  onClick={() => toggleQuestion(question.id)}
                  className={`cursor-pointer border-b p-3 transition-colors ${
                    selectedQuestions.has(question.id)
                      ? 'border-blue-400 bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border ${
                        selectedQuestions.has(question.id)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-500'
                      }`}
                    >
                      {selectedQuestions.has(question.id) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="line-clamp-2 text-sm font-medium">{question.question}</p>
                      <div className="mt-1 flex gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {question.type?.toUpperCase() || 'UNKNOWN'}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {question.difficulty || 'medium'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Preview Area */}
          <div className="flex w-[400px] flex-col rounded-lg border bg-gray-50">
            {previewQuestion ? (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Badge>{previewQuestion.subject || 'No Subject'}</Badge>
                  <Badge variant="outline">{previewQuestion.difficulty || 'medium'}</Badge>
                  <Badge variant="secondary">{previewQuestion.points || 1} pts</Badge>
                </div>
                <h3 className="mb-4 text-lg font-medium">{previewQuestion.question}</h3>

                {previewQuestion.options &&
                  Array.isArray(previewQuestion.options) &&
                  previewQuestion.options.length > 0 && (
                    <div className="mb-6 space-y-2">
                      <p className="text-sm font-medium text-gray-500">Options:</p>
                      {previewQuestion.options.map((opt: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 rounded-md border bg-white p-2 text-sm"
                        >
                          <span className="w-6 font-medium text-gray-400">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-500">Correct Answer:</p>
                  <div className="rounded-md border border-green-400 bg-green-50 p-3 text-sm text-green-700">
                    {Array.isArray(previewQuestion.correctAnswer)
                      ? previewQuestion.correctAnswer.join(', ')
                      : previewQuestion.correctAnswer || 'Not specified'}
                  </div>
                </div>

                {previewQuestion.explanation && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-gray-500">Explanation:</p>
                    <p className="rounded-md border bg-white p-3 text-sm text-gray-700">
                      {previewQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-gray-400">
                <BookOpen className="mb-4 h-12 w-12 opacity-20" />
                <p>Select a question from the list to preview its details</p>
              </div>
            )}

            <div className="flex items-center justify-between border-t bg-white p-4">
              <span className="text-sm font-medium">{selectedQuestions.size} selected</span>
              <Button
                onClick={handleImport}
                disabled={selectedQuestions.size === 0}
                className="gap-2"
              >
                Import Selected
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
