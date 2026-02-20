'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'

export interface QuizQuestion {
  type: string
  question: string
  options?: string[]
  answer?: string
  rubric?: string
}

interface InlineQuizOverlayProps {
  title?: string
  questions: QuizQuestion[]
  onSubmit: (answers: Record<number, string>) => void
  onSkip: () => void
  locale?: 'zh' | 'en'
}

export function InlineQuizOverlay({
  title,
  questions,
  onSubmit,
  onSkip,
  locale = 'zh',
}: InlineQuizOverlayProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    onSubmit(answers)
  }

  const labels = locale === 'zh'
    ? { title: '随堂小测', submit: '提交', skip: '跳过', done: '完成' }
    : { title: 'Quick Check', submit: 'Submit', skip: 'Skip', done: 'Done' }

  if (questions.length === 0) {
    return (
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md text-center">
          <p className="text-gray-600 mb-4">{locale === 'zh' ? '暂无题目' : 'No questions.'}</p>
          <Button onClick={onSkip}>{labels.skip}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30 p-4 overflow-auto">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-8 h-8 text-blue-500 shrink-0" />
          <h3 className="text-lg font-bold">{title || labels.title}</h3>
        </div>
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="text-left">
              <p className="font-medium text-gray-900 mb-2">{i + 1}. {q.question}</p>
              {q.options && q.options.length > 0 ? (
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <label key={j} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${i}`}
                        checked={answers[i] === String(j)} 
                        onChange={() => setAnswers((a) => ({ ...a, [i]: String(j) }))}
                        className="rounded"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={answers[i] ?? ''}
                  onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                  placeholder={locale === 'zh' ? '输入答案' : 'Your answer'}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onSkip}>{labels.skip}</Button>
          <Button onClick={handleSubmit} disabled={submitted}>{submitted ? labels.done : labels.submit}</Button>
        </div>
      </div>
    </div>
  )
}
