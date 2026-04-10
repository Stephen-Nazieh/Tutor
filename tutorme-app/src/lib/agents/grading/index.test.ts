import { describe, it, expect } from 'vitest'
import { gradeEssay, gradeMathProblem } from './index'

describe('grading agent fallbacks', () => {
  it('throws error for legacy gradeEssay function', async () => {
    await expect(gradeEssay('Explain gravity', ['Clarity'], 'My essay', 10, 'u1')).rejects.toThrow(
      'Legacy essay grading removed'
    )
  })

  it('throws error for legacy gradeMathProblem function', async () => {
    await expect(gradeMathProblem('2+2', '4', ['Add'], '5', 5)).rejects.toThrow(
      'Legacy math grading removed'
    )
  })
})
