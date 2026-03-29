import { type QuizQuestion, type Task, type Assessment, type Module } from './builder-types'

export const generateId = () => `id-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`

export function toBuilderQuestionType(type: string): QuizQuestion['type'] {
  if (type === 'multiple_choice') return 'mcq'
  if (type === 'multi_select') return 'multiselect'
  if (type === 'true_false') return 'truefalse'
  if (type === 'fill_in_blank') return 'fillblank'
  if (type === 'matching') return 'matching'
  if (type === 'short_answer') return 'shortanswer'
  return 'essay'
}

export function mapQuestionBankToBuilderQuestion(item: {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: string | string[] | null
  points?: number
}): QuizQuestion {
  const builderType = toBuilderQuestionType(item.type)
  const options = Array.isArray(item.options) ? item.options : undefined
  const normalizedCorrect = (() => {
    if (builderType === 'truefalse' && typeof item.correctAnswer === 'string') {
      return item.correctAnswer.toLowerCase() === 'true' ? 'True' : 'False'
    }
    return item.correctAnswer ?? undefined
  })()

  return {
    id: `q-${generateId()}`,
    type: builderType,
    question: item.question || '',
    options:
      builderType === 'mcq' || builderType === 'multiselect'
        ? options && options.length > 0
          ? options
          : ['', '', '', '']
        : builderType === 'truefalse'
          ? ['True', 'False']
          : undefined,
    correctAnswer: normalizedCorrect as string | string[] | undefined,
    points: Math.max(1, item.points ?? 1),
  }
}

export const DEFAULT_TASK = (order: number): Task => ({
  id: `task-${Date.now()}`,
  title: 'New Task',
  description: '',
  instructions: '',
  estimatedMinutes: 15,
  points: 10,
  submissionType: 'text',
  isAiGraded: true,
  difficultyMode: 'fixed',
  fixedDifficulty: 'beginner',
})

export const DEFAULT_HOMEWORK = (
  order: number,
  category: 'assessment' | 'homework' = 'homework'
): Assessment => ({
  id: `homework-${Date.now()}`,
  title: `New ${category === 'homework' ? 'Homework' : 'Assessment'}`,
  description: '',
  instructions: '',
  category,
  estimatedMinutes: 30,
  points: 100,
  submissionType: 'text',
  allowLateSubmission: true,
  difficultyMode: 'fixed',
  fixedDifficulty: 'beginner',
})
