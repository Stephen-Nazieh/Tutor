import { Parser } from 'expr-eval'

const parser = new Parser({
  operators: {
    add: true,
    subtract: true,
    multiply: true,
    divide: true,
    remainder: true,
    power: true,
    factorial: false,
    comparison: false,
    logical: false,
    conditional: false,
    in: false,
    assignment: false,
  },
  allowMemberAccess: false,
})

parser.functions = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  sqrt: Math.sqrt,
  abs: Math.abs,
  log: Math.log,
  log10: Math.log10,
  ln: Math.log,
  exp: Math.exp,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  min: Math.min,
  max: Math.max,
  pow: Math.pow,
}

parser.consts = {
  pi: Math.PI,
  e: Math.E,
}

export function compileExpression(expression: string): (x: number) => number | null {
  const trimmed = expression.trim()
  if (!trimmed) return () => null
  try {
    const compiled = parser.parse(trimmed)
    return (x: number) => {
      try {
        const result = compiled.evaluate({ x })
        if (typeof result !== 'number' || !Number.isFinite(result)) return null
        return result
      } catch {
        return null
      }
    }
  } catch {
    return () => null
  }
}
