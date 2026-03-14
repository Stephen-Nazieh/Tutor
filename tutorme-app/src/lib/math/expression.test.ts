import { describe, expect, it } from 'vitest'
import { compileExpression } from './expression'

describe('compileExpression', () => {
  it('evaluates basic expressions', () => {
    const fn = compileExpression('x^2 + 1')
    expect(fn(2)).toBe(5)
  })

  it('supports common functions and constants', () => {
    const fn = compileExpression('sin(pi / 2)')
    expect(fn(0)).toBe(1)
  })

  it('blocks unsafe expressions', () => {
    const fn = compileExpression('process.exit()')
    expect(fn(1)).toBeNull()
  })

  it('blocks member access', () => {
    const fn = compileExpression('x.constructor')
    expect(fn(1)).toBeNull()
  })
})
