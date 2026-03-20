import { describe, it, expect, vi, beforeEach } from 'vitest'

const dbMocks = vi.hoisted(() => {
  const quizRow = {
    id: 'quiz_1',
    title: 'Quiz 1',
    lessonId: 'lesson_1',
    timeLimit: null,
    totalPoints: 10,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: '2+2?',
        options: ['3', '4'],
        correctAnswer: '4',
        explanation: '2+2=4',
        points: 5,
        difficulty: 'easy',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'Capital of France?',
        options: ['Paris', 'Rome'],
        correctAnswer: 'Paris',
        explanation: 'Paris',
        points: 5,
        difficulty: 'easy',
      },
    ],
  }

  const drizzleDb = {
    select: () => ({
      from: () => ({
        where: () => ({
          limit: async () => [quizRow],
        }),
      }),
    }),
  }

  return { drizzleDb, quizRow }
})

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: dbMocks.drizzleDb,
}))

vi.mock('@/lib/db/schema', () => ({
  quiz: { id: 'id' },
}))

import { gradeQuizBatch } from './index'

describe('grading agent batch quiz grading', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('grades multiple choice answers and summarizes results', async () => {
    const answers = new Map<string, string>([
      ['q1', '4'],
      ['q2', 'Rome'],
    ])

    const res = await gradeQuizBatch({
      quizId: 'quiz_1',
      studentId: 'student_1',
      answers,
    })

    expect(res.totalScore).toBe(5)
    expect(res.maxScore).toBe(10)
    expect(Math.round(res.percentage)).toBe(50)
    expect(res.gradedAnswers).toHaveLength(2)
    expect(res.summary).toContain('You scored 1 out of 2')
  })
})
