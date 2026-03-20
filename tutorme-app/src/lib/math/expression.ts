import { create, all, type MathNode } from 'mathjs'

// Create a secure math instance with limited functions
const math = create(all, {
  number: 'number',
  precision: 14,
})

// Whitelist of allowed functions and constants
const ALLOWED_FUNCTIONS = new Set([
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
  'sinh', 'cosh', 'tanh', 'sqrt', 'abs',
  'log', 'log10', 'ln', 'exp',
  'floor', 'ceil', 'round', 'min', 'max', 'pow',
  'pi', 'e', 'x'
])

/**
 * Compile a mathematical expression into a function
 * Uses mathjs for secure evaluation with a whitelist of allowed functions
 */
export function compileExpression(expression: string): (x: number) => number | null {
  const trimmed = expression.trim()
  if (!trimmed) return () => null

  try {
    // Parse the expression to check for unsafe elements
    const parsed = math.parse(trimmed)
    
    // Check that all symbols are allowed
    const symbols: string[] = []
    parsed.traverse((node: MathNode) => {
      if (node.type === 'SymbolNode' && 'name' in node && typeof node.name === 'string') {
        symbols.push(node.name)
      }
    })
    
    for (const symbol of symbols) {
      if (!ALLOWED_FUNCTIONS.has(symbol)) {
        console.warn(`[Expression] Disallowed symbol in expression: ${symbol}`)
        return () => null
      }
    }

    // Compile the expression
    const compiled = parsed.compile()
    
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
