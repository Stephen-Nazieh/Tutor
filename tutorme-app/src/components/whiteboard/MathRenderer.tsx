'use client'

import { useEffect, useRef, useState } from 'react'

interface MathRendererProps {
  latex: string
  displayMode?: boolean
  className?: string
  onRender?: () => void
}

// Load MathJax script dynamically
let mathJaxPromise: Promise<void> | null = null

const loadMathJax = (): Promise<void> => {
  if (mathJaxPromise) return mathJaxPromise
  
  if (typeof window === 'undefined') return Promise.resolve()
  
  // Check if already loaded
  if ((window as any).MathJax) {
    return Promise.resolve()
  }
  
  mathJaxPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.min.js'
    script.async = true
    
    // MathJax configuration
    ;(window as any).MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true,
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      },
      startup: {
        pageReady: () => {
          resolve()
        },
      },
    }
    
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load MathJax'))
    
    document.head.appendChild(script)
  })
  
  return mathJaxPromise
}

export function MathRenderer({ 
  latex, 
  displayMode = false,
  className = '',
  onRender,
}: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    
    const renderMath = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        await loadMathJax()
        
        if (!isMounted || !containerRef.current) return
        
        const MathJax = (window as any).MathJax
        if (!MathJax) {
          throw new Error('MathJax not available')
        }
        
        // Clear previous content
        containerRef.current.innerHTML = ''
        
        // Create the math element
        const wrapper = document.createElement(displayMode ? 'div' : 'span')
        wrapper.textContent = latex
        containerRef.current.appendChild(wrapper)
        
        // Typeset
        await MathJax.typesetPromise([containerRef.current])
        
        if (isMounted) {
          setIsLoading(false)
          onRender?.()
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Render failed')
          setIsLoading(false)
        }
      }
    }
    
    renderMath()
    
    return () => {
      isMounted = false
    }
  }, [latex, displayMode, onRender])

  if (error) {
    return (
      <div className={`text-red-500 text-sm ${className}`}>
        Error rendering math: {error}
      </div>
    )
  }

  return (
    <div 
      ref={containerRef} 
      className={`math-renderer ${className}`}
      style={{ 
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.2s',
        minHeight: '20px',
      }}
    >
      {isLoading && (
        <span className="text-slate-400 text-sm">Loading...</span>
      )}
    </div>
  )
}

// Equation Editor Component
interface EquationEditorProps {
  initialLatex?: string
  onSubmit: (latex: string) => void
  onCancel?: () => void
}

const LATEX_SHORTCUTS = [
  { label: 'x²', latex: 'x^{2}' },
  { label: '√', latex: '\\sqrt{x}' },
  { label: '÷', latex: '\\div' },
  { label: '∞', latex: '\\infty' },
  { label: 'π', latex: '\\pi' },
  { label: '∑', latex: '\\sum_{i=1}^{n}' },
  { label: '∫', latex: '\\int_{a}^{b}' },
  { label: 'α', latex: '\\alpha' },
  { label: 'β', latex: '\\beta' },
  { label: 'θ', latex: '\\theta' },
  { label: '≤', latex: '\\leq' },
  { label: '≥', latex: '\\geq' },
  { label: '≠', latex: '\\neq' },
  { label: '→', latex: '\\rightarrow' },
  { label: '⇒', latex: '\\Rightarrow' },
  { label: '∈', latex: '\\in' },
]

export function EquationEditor({ 
  initialLatex = '', 
  onSubmit, 
  onCancel 
}: EquationEditorProps) {
  const [latex, setLatex] = useState(initialLatex)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertLatex = (snippet: string) => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const value = textarea.value
    
    const newValue = value.substring(0, start) + snippet + value.substring(end)
    setLatex(newValue)
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + snippet.length
      textarea.focus()
    }, 0)
  }

  const handleSubmit = () => {
    if (latex.trim()) {
      onSubmit(latex)
    }
  }

  const commonEquations = [
    { name: 'Quadratic', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { name: 'Pythagorean', latex: 'a^2 + b^2 = c^2' },
    { name: 'Euler', latex: 'e^{i\\pi} + 1 = 0' },
    { name: 'Derivative', latex: '\\frac{d}{dx}f(x)' },
    { name: 'Integral', latex: '\\int_{a}^{b} f(x) \\, dx' },
    { name: 'Limit', latex: '\\lim_{x \\to \\infty} f(x)' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-[500px] max-w-full">
      <h3 className="text-lg font-semibold mb-3">Insert Equation</h3>
      
      {/* Shortcut buttons */}
      <div className="mb-3">
        <label className="text-xs text-slate-500 mb-1 block">Symbols</label>
        <div className="flex flex-wrap gap-1">
          {LATEX_SHORTCUTS.map(({ label, latex: snippet }) => (
            <button
              key={label}
              onClick={() => insertLatex(snippet)}
              className="w-8 h-8 text-sm border rounded hover:bg-slate-100 transition-colors"
              title={snippet}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Common equations */}
      <div className="mb-3">
        <label className="text-xs text-slate-500 mb-1 block">Templates</label>
        <div className="flex flex-wrap gap-2">
          {commonEquations.map(({ name, latex: eq }) => (
            <button
              key={name}
              onClick={() => setLatex(eq)}
              className="px-2 py-1 text-xs border rounded hover:bg-slate-100 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* LaTeX input */}
      <div className="mb-3">
        <label className="text-xs text-slate-500 mb-1 block">LaTeX</label>
        <textarea
          ref={textareaRef}
          value={latex}
          onChange={(e) => setLatex(e.target.value)}
          className="w-full p-2 border rounded font-mono text-sm"
          rows={3}
          placeholder="Enter LaTeX..."
        />
      </div>

      {/* Preview */}
      <div className="mb-4">
        <label className="text-xs text-slate-500 mb-1 block">Preview</label>
        <div className="w-full p-3 border rounded bg-slate-50 min-h-[60px] flex items-center justify-center">
          {latex ? (
            <MathRenderer latex={latex} displayMode />
          ) : (
            <span className="text-slate-400 text-sm">Preview will appear here</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!latex.trim()}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Insert
        </button>
      </div>
    </div>
  )
}
