'use client'

import { useState, useCallback } from 'react'
import {
  Sparkles,
  Wand2,
  Calculator,
  CheckCircle,
  AlertCircle,
  X,
  MessageSquare,
  Lightbulb,
} from 'lucide-react'
import type { AnyMathElement } from '@/types/math-whiteboard'

interface AIMathAssistantProps {
  elements: AnyMathElement[]
  onAddElement: (element: AnyMathElement) => void
  selectedElement: AnyMathElement | null
}

type AIAction = 'solve' | 'check' | 'explain' | 'generate'

interface AIResponse {
  action: AIAction
  result: string
  steps?: string[]
  element?: AnyMathElement
  error?: string
}

export function AIMathAssistant({ elements, onAddElement, selectedElement }: AIMathAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<AIResponse | null>(null)
  const [activeAction, setActiveAction] = useState<AIAction | null>(null)

  const handleAIAction = useCallback(
    async (action: AIAction) => {
      setIsLoading(true)
      setActiveAction(action)
      setResponse(null)

      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      let aiResponse: AIResponse

      switch (action) {
        case 'solve':
          aiResponse = await mockSolveEquation(selectedElement)
          break
        case 'check':
          aiResponse = await mockCheckWork(elements)
          break
        case 'explain':
          aiResponse = await mockExplainConcept(selectedElement)
          break
        case 'generate':
          aiResponse = await mockGenerateProblem()
          break
        default:
          aiResponse = { action, result: 'Unknown action', error: 'Invalid action' }
      }

      setResponse(aiResponse)
      setIsLoading(false)

      // If there's an element to add, add it
      if (aiResponse.element) {
        onAddElement(aiResponse.element)
      }
    },
    [elements, selectedElement, onAddElement]
  )

  return (
    <>
      {/* AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-all ${
          isOpen
            ? 'bg-purple-600 text-white shadow-lg'
            : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
        } `}
      >
        <Sparkles className="h-4 w-4" />
        <span className="text-sm">AI Assist</span>
      </button>

      {/* AI Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-lg border bg-white shadow-xl">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Math AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3 p-4">
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <AIActionButton
                icon={<Calculator className="h-4 w-4" />}
                label="Solve"
                description="Solve selected equation"
                onClick={() => handleAIAction('solve')}
                disabled={!selectedElement || selectedElement.type !== 'equation'}
                isLoading={isLoading && activeAction === 'solve'}
              />
              <AIActionButton
                icon={<CheckCircle className="h-4 w-4" />}
                label="Check Work"
                description="Verify solution"
                onClick={() => handleAIAction('check')}
                disabled={elements.length === 0}
                isLoading={isLoading && activeAction === 'check'}
              />
              <AIActionButton
                icon={<Lightbulb className="h-4 w-4" />}
                label="Explain"
                description="Explain concept"
                onClick={() => handleAIAction('explain')}
                disabled={!selectedElement}
                isLoading={isLoading && activeAction === 'explain'}
              />
              <AIActionButton
                icon={<Wand2 className="h-4 w-4" />}
                label="Generate"
                description="New practice problem"
                onClick={() => handleAIAction('generate')}
                isLoading={isLoading && activeAction === 'generate'}
              />
            </div>

            {/* Response Area */}
            {(response || isLoading) && (
              <div className="rounded-lg border bg-slate-50 p-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-purple-600" />
                    <span className="ml-2 text-sm text-slate-600">AI is thinking...</span>
                  </div>
                ) : response?.error ? (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{response.error}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Complete</span>
                    </div>
                    <p className="text-sm text-slate-700">{response?.result}</p>
                    {response?.steps && response.steps.length > 0 && (
                      <div className="mt-2">
                        <p className="mb-1 text-xs font-medium text-slate-500">Steps:</p>
                        <ol className="list-inside list-decimal space-y-1 text-xs text-slate-600">
                          {response.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Context Info */}
            <div className="border-t pt-2 text-xs text-slate-400">
              {selectedElement ? (
                <p>
                  Selected: <span className="capitalize">{selectedElement.type}</span>
                </p>
              ) : (
                <p>Select an element to use AI features</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// AI Action Button Component
interface AIActionButtonProps {
  icon: React.ReactNode
  label: string
  description: string
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}

function AIActionButton({
  icon,
  label,
  description,
  onClick,
  disabled,
  isLoading,
}: AIActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex flex-col items-center rounded-lg border p-3 transition-all ${
        disabled
          ? 'cursor-not-allowed bg-slate-50 opacity-50'
          : 'hover:border-purple-200 hover:bg-purple-50'
      } `}
    >
      <div className="mb-1 text-purple-600">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
      <span className="text-[10px] text-slate-500">{description}</span>
    </button>
  )
}

// Mock AI functions (replace with actual AI integration)
async function mockSolveEquation(element: AnyMathElement | null): Promise<AIResponse> {
  if (!element || element.type !== 'equation') {
    return { action: 'solve', result: '', error: 'No equation selected' }
  }

  const eq = element as any
  const latex = eq.latex

  // Mock solution based on equation content
  if (latex.includes('x^2')) {
    return {
      action: 'solve',
      result: 'Quadratic equation solved using the quadratic formula',
      steps: [
        'Identify coefficients: a=1, b=0, c=-1',
        'Apply quadratic formula: x = (-b ± √(b² - 4ac)) / 2a',
        'Calculate discriminant: Δ = 0 - 4(1)(-1) = 4',
        'Find roots: x = ±2/2 = ±1',
        'Solution: x = 1 or x = -1',
      ],
    }
  }

  return {
    action: 'solve',
    result: 'Solved: x = 5',
    steps: ['Isolate variable', 'Simplify', 'x = 5'],
  }
}

async function mockCheckWork(elements: AnyMathElement[]): Promise<AIResponse> {
  const hasEquation = elements.some(e => e.type === 'equation')

  if (!hasEquation) {
    return { action: 'check', result: '', error: 'No equations to check' }
  }

  return {
    action: 'check',
    result: '✓ Your work looks correct! All steps are logically valid.',
    steps: [
      'Step 1: Correct algebraic manipulation',
      'Step 2: Proper distribution',
      'Step 3: Accurate simplification',
    ],
  }
}

async function mockExplainConcept(element: AnyMathElement | null): Promise<AIResponse> {
  if (!element) {
    return { action: 'explain', result: '', error: 'No element selected' }
  }

  const explanations: Record<string, string> = {
    equation:
      'This equation represents a mathematical statement showing equality between two expressions. The variable x represents an unknown value we need to find.',
    graph:
      'This graph visually represents a function, showing how the output (y) changes with different input values (x).',
    path: 'This freehand drawing can represent a concept, graph, or annotation on the whiteboard.',
    text: 'Text annotations help label and explain mathematical concepts.',
    rectangle: 'Geometric shapes help visualize mathematical concepts and relationships.',
    circle:
      'Circles represent constant distance from a center point, useful in geometry and trigonometry.',
  }

  return {
    action: 'explain',
    result:
      explanations[element.type] || 'This element represents a mathematical concept or annotation.',
  }
}

async function mockGenerateProblem(): Promise<AIResponse> {
  const problems = [
    {
      text: 'Solve for x: 2x + 5 = 15',
      latex: '2x + 5 = 15',
    },
    {
      text: 'Find the derivative of f(x) = x³ + 2x² - x + 1',
      latex: 'f(x) = x^3 + 2x^2 - x + 1',
    },
    {
      text: 'Calculate the area of a circle with radius r = 5',
      latex: 'A = \\pi r^2, \\quad r = 5',
    },
  ]

  const problem = problems[Math.floor(Math.random() * problems.length)]

  return {
    action: 'generate',
    result: `Generated practice problem: ${problem.text}`,
    element: {
      id: `ai-gen-${Date.now()}`,
      type: 'equation',
      authorId: 'ai-assistant',
      layer: 0,
      locked: false,
      x: 150,
      y: 150,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      version: 1,
      lastModified: Date.now(),
      modifiedBy: 'ai-assistant',
      latex: problem.latex,
      fontSize: 18,
      color: '#3b82f6',
    } as AnyMathElement,
  }
}

export default AIMathAssistant
