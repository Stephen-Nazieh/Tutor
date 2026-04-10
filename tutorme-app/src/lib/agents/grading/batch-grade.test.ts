import { describe, it, expect } from 'vitest'
import { gradeQuizBatch } from './index'

describe('grading agent batch quiz grading', () => {
  it('throws error for legacy gradeQuizBatch function', async () => {
    const answers = new Map<string, string>([
      ['q1', '4'],
      ['q2', 'Rome'],
    ])

    await expect(
      gradeQuizBatch({
        quizId: 'quiz_1',
        studentId: 'student_1',
        answers,
      })
    ).rejects.toThrow('Legacy quiz batch grading removed')
  })
})
