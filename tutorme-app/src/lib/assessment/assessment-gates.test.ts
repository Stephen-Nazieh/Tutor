import { describe, it, expect } from 'vitest'
import { findOpenItemsMissingRubric } from './assessment-gates'

describe('findOpenItemsMissingRubric (ASMT-8)', () => {
  it('flags open (short/long) questions with no rubric, by label', () => {
    const missing = findOpenItemsMissingRubric([
      { questionType: 'long', questionLabel: '1(a)', rubric: '' },
      { questionType: 'short', questionNumber: 2, rubric: '   ' },
    ])
    expect(missing).toEqual(['1(a)', 'Q2'])
  })

  it('passes when open questions have a rubric (including a manual-marking note)', () => {
    expect(
      findOpenItemsMissingRubric([
        { questionType: 'long', questionLabel: '1', rubric: 'Award 2 for method, 1 for answer.' },
        {
          questionType: 'short',
          questionLabel: '2',
          rubric: 'Manual marking — tutor grades by hand.',
        },
      ])
    ).toEqual([])
  })

  it('does not gate closed/auto-graded or untyped legacy items', () => {
    expect(
      findOpenItemsMissingRubric([
        { questionType: 'mcq', questionLabel: '1', rubric: '' },
        { questionType: 'fill_blank', questionLabel: '2', rubric: '' },
        { questionType: 'matching', questionLabel: '3', rubric: '' },
        { questionType: undefined, questionLabel: '4', rubric: '' },
      ])
    ).toEqual([])
  })
})
