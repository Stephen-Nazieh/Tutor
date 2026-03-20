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

  const labels =
    locale === 'zh'
      ? { title: '随堂小测', submit: '提交', skip: '跳过', done: '完成' }
      : { title: 'Quick Check', submit: 'Submit', skip: 'Skip', done: 'Done' }

  if (questions.length === 0) {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 p-4">
        <div className="max-w-md rounded-lg bg-white p-6 text-center">
          <p className="mb-4 text-gray-600">{locale === 'zh' ? '暂无题目' : 'No questions.'}</p>
          <Button onClick={onSkip}>{labels.skip}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center overflow-auto bg-black/80 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="h-8 w-8 shrink-0 text-blue-500" />
          <h3 className="text-lg font-bold">{title || labels.title}</h3>
        </div>
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="text-left">
              <p className="mb-2 font-medium text-gray-900">
                {i + 1}. {q.question}
              </p>
              {q.options && q.options.length > 0 ? (
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <label key={j} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${i}`}
                        checked={answers[i] === String(j)}
                        onChange={() => setAnswers(a => ({ ...a, [i]: String(j) }))}
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
                  onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                  placeholder={locale === 'zh' ? '输入答案' : 'Your answer'}
                  className="w-full rounded border px-3 py-2 text-sm"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onSkip}>
            {labels.skip}
          </Button>
          <Button onClick={handleSubmit} disabled={submitted}>
            {submitted ? labels.done : labels.submit}
          </Button>
        </div>
      </div>
    </div>
  )
}
