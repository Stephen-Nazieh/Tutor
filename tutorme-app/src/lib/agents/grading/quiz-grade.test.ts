import { describe, it, expect } from 'vitest'
import { gradeQuizAnswer } from './index'

describe('grading agent quiz grading', () => {
  it('throws error for legacy gradeQuizAnswer function', async () => {
    await expect(
      gradeQuizAnswer({
        question: 'Q',
        rubric: 'R',
        studentAnswer: 'A',
        maxScore: 10,
      })
    ).rejects.toThrow('Legacy quiz grading removed')
  })
})
