// @ts-nocheck
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { GraphElement, PlottedFunction } from '@/types/math-whiteboard'
import { compileExpression } from '@/lib/math/expression'

// Load Plotly script dynamically
let plotlyPromise: Promise<void> | null = null

const loadPlotly = (): Promise<void> => {
  if (plotlyPromise) return plotlyPromise

  if (typeof window === 'undefined') return Promise.resolve()

  if ((window as any).Plotly) {
    return Promise.resolve()
  }

  plotlyPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.plot.ly/plotly-2.27.0.min.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Plotly'))
    document.head.appendChild(script)
  })

  return plotlyPromise
}

// Generate data points for a function
const generateFunctionData = (
  func: PlottedFunction,
  xMin: number,
  xMax: number,
  points: number = 500
): { x: number[]; y: number[] } => {
  const fn = compileExpression(func.expression)
  const x: number[] = []
  const y: number[] = []

  const step = (xMax - xMin) / points

  for (let i = 0; i <= points; i++) {
    const xVal = xMin + i * step
    const yVal = fn(xVal)

    if (yVal !== null && !isNaN(yVal) && isFinite(yVal)) {
      x.push(xVal)
      y.push(yVal)
    } else {
      // Break the line at discontinuities
      if (x.length > 0) {
        x.push(null as any)
        y.push(null as any)
      }
    }
  }

  return { x, y }
}

interface GraphRendererProps {
  element: GraphElement
  width?: number
  height?: number
  editable?: boolean
  onUpdate?: (changes: Partial<GraphElement>) => void
}

export function GraphRenderer({
  element,
  width = 400,
  height = 300,
  editable = false,
  onUpdate,
}: GraphRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const plotlyRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Render the graph
  const renderGraph = useCallback(async () => {
    if (!containerRef.current) return

    try {
      setIsLoading(true)
      setError(null)

      await loadPlotly()

      const Plotly = (window as any).Plotly
      if (!Plotly) {
        throw new Error('Plotly not available')
      }

      // Generate traces for each function
      const traces = element.functions
        .filter(f => f.visible)
        .map(func => {
          const data = generateFunctionData(func, element.xMin, element.xMax)

          return {
            x: data.x,
            y: data.y,
            mode: 'lines',
            name: func.expression,
            line: {
              color: func.color,
              width: func.lineWidth,
              dash:
                func.lineStyle === 'dashed'
                  ? 'dash'
                  : func.lineStyle === 'dotted'
                    ? 'dot'
                    : 'solid',
            },
            hovertemplate: `<b>${func.expression}</b><br>x: %{x:.2f}<br>y: %{y:.2f}<extra></extra>`,
          }
        })

      // Layout configuration
      const layout = {
        width,
        height,
        margin: { t: 30, r: 30, b: 40, l: 50 },
        showlegend: element.functions.length > 1,
        legend: {
          x: 0,
          y: 1.1,
          orientation: 'h',
        },
        xaxis: {
          title: 'x',
          showgrid: element.showGrid,
          zeroline: element.showAxes,
          range: [element.xMin, element.xMax],
          fixedrange: !editable,
        },
        yaxis: {
          title: 'y',
          showgrid: element.showGrid,
          zeroline: element.showAxes,
          range: [element.yMin, element.yMax],
          fixedrange: !editable,
        },
        plot_bgcolor: '#ffffff',
        paper_bgcolor: '#ffffff',
        hovermode: 'closest',
        dragmode: editable ? 'pan' : false,
      }

      // Configuration
      const config = {
        displayModeBar: editable,
        displaylogo: false,
        modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d'],
        scrollZoom: editable,
      }

      // Render
      await Plotly.newPlot(containerRef.current, traces, layout, config)
      plotlyRef.current = Plotly

      // Add click handler for trace values
      if (editable) {
        containerRef.current.on('plotly_click', (data: any) => {
          const point = data.points[0]
          console.log('Clicked point:', { x: point.x, y: point.y })
        })
      }

      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to render graph')
      setIsLoading(false)
    }
  }, [element, width, height, editable])

  // Initial render
  useEffect(() => {
    renderGraph()
  }, [renderGraph])

  // Cleanup
  useEffect(() => {
    return () => {
      if (plotlyRef.current && containerRef.current) {
        plotlyRef.current.purge(containerRef.current)
      }
    }
  }, [])

  if (error) {
    return (
      <div
        className="flex items-center justify-center rounded border border-red-200 bg-red-50"
        style={{ width, height }}
      >
        <div className="p-4 text-center">
          <p className="text-sm text-red-600">Error: {error}</p>
          <button onClick={renderGraph} className="mt-2 text-xs text-blue-600 hover:underline">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div ref={containerRef} style={{ width, height }} />

      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white/80"
          style={{ width, height }}
        >
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
            <p className="mt-2 text-xs text-slate-500">Rendering...</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Graph Editor Component
interface GraphEditorProps {
  initialElement?: Partial<GraphElement>
  onSubmit: (element: GraphElement) => void
  onCancel?: () => void
}

export function GraphEditor({ initialElement, onSubmit, onCancel }: GraphEditorProps) {
  const [functions, setFunctions] = useState<PlottedFunction[]>(
    initialElement?.functions || [
      {
        id: '1',
        expression: 'x^2',
        color: '#3b82f6',
        lineWidth: 2,
        lineStyle: 'solid',
        visible: true,
      },
    ]
  )
  const [xMin, setXMin] = useState(initialElement?.xMin ?? -10)
  const [xMax, setXMax] = useState(initialElement?.xMax ?? 10)
  const [yMin, setYMin] = useState(initialElement?.yMin ?? -10)
  const [yMax, setYMax] = useState(initialElement?.yMax ?? 10)
  const [showGrid, setShowGrid] = useState(initialElement?.showGrid ?? true)
  const [showAxes, setShowAxes] = useState(initialElement?.showAxes ?? true)

  const addFunction = () => {
    const colors = ['#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    setFunctions(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        expression: '',
        color: colors[prev.length % colors.length],
        lineWidth: 2,
        lineStyle: 'solid',
        visible: true,
      },
    ])
  }

  const updateFunction = (id: string, updates: Partial<PlottedFunction>) => {
    setFunctions(prev => prev.map(f => (f.id === id ? { ...f, ...updates } : f)))
  }

  const removeFunction = (id: string) => {
    setFunctions(prev => prev.filter(f => f.id !== id))
  }

  const handleSubmit = () => {
    const validFunctions = functions.filter(f => f.expression.trim())
    if (validFunctions.length === 0) return

    const element: GraphElement = {
      id: initialElement?.id || `graph-${Date.now()}`,
      type: 'graph',
      authorId: 'current-user',
      layer: 0,
      locked: false,
      x: initialElement?.x ?? 100,
      y: initialElement?.y ?? 100,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      version: 1,
      lastModified: Date.now(),
      modifiedBy: 'current-user',
      functions: validFunctions,
      xMin,
      xMax,
      yMin,
      yMax,
      showGrid,
      showAxes,
    }

    onSubmit(element)
  }

  const previewElement: GraphElement = {
    id: 'preview',
    type: 'graph',
    authorId: '',
    layer: 0,
    locked: false,
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    version: 1,
    lastModified: Date.now(),
    modifiedBy: '',
    functions: functions.filter(f => f.expression.trim()),
    xMin,
    xMax,
    yMin,
    yMax,
    showGrid,
    showAxes,
  }

  const functionExamples = [
    'x^2',
    'sin(x)',
    'cos(x)',
    'x^3',
    'sqrt(x)',
    'abs(x)',
    'log(x)',
    'exp(x)',
    '1/x',
    'tan(x)',
  ]

  return (
    <div className="max-h-[80vh] w-[600px] max-w-full overflow-auto rounded-lg bg-white p-4 shadow-lg">
      <h3 className="mb-3 text-lg font-semibold">Insert Graph</h3>

      {/* Functions */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">Functions</label>
          <button
            onClick={addFunction}
            className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
          >
            + Add Function
          </button>
        </div>

        <div className="space-y-2">
          {functions.map((func, index) => (
            <div key={func.id} className="flex items-center gap-2 rounded border p-2">
              <input
                type="color"
                value={func.color}
                onChange={e => updateFunction(func.id, { color: e.target.value })}
                className="h-8 w-8 cursor-pointer rounded"
              />

              <input
                type="text"
                value={func.expression}
                onChange={e => updateFunction(func.id, { expression: e.target.value })}
                placeholder="e.g., x^2"
                className="flex-1 rounded border px-2 py-1 font-mono text-sm"
              />

              <select
                value={func.lineStyle}
                onChange={e => updateFunction(func.id, { lineStyle: e.target.value as any })}
                className="rounded border px-2 py-1 text-sm"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>

              <input
                type="number"
                value={func.lineWidth}
                onChange={e => updateFunction(func.id, { lineWidth: Number(e.target.value) })}
                min={1}
                max={10}
                className="w-14 rounded border px-2 py-1 text-sm"
              />

              {functions.length > 1 && (
                <button
                  onClick={() => removeFunction(func.id)}
                  className="px-1 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Examples */}
        <div className="mt-2">
          <span className="text-xs text-slate-500">Examples:</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {functionExamples.map(ex => (
              <button
                key={ex}
                onClick={() => {
                  const firstFunc = functions[0]
                  if (firstFunc) {
                    updateFunction(firstFunc.id, { expression: ex })
                  }
                }}
                className="rounded bg-slate-100 px-2 py-0.5 text-xs hover:bg-slate-200"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Axis Ranges */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">X Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={xMin}
              onChange={e => setXMin(Number(e.target.value))}
              className="w-20 rounded border px-2 py-1"
            />
            <span className="text-slate-400">to</span>
            <input
              type="number"
              value={xMax}
              onChange={e => setXMax(Number(e.target.value))}
              className="w-20 rounded border px-2 py-1"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Y Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={yMin}
              onChange={e => setYMin(Number(e.target.value))}
              className="w-20 rounded border px-2 py-1"
            />
            <span className="text-slate-400">to</span>
            <input
              type="number"
              value={yMax}
              onChange={e => setYMax(Number(e.target.value))}
              className="w-20 rounded border px-2 py-1"
            />
          </div>
        </div>
      </div>

      {/* Display Options */}
      <div className="mb-4 flex gap-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} />
          <span className="text-sm">Show Grid</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={showAxes} onChange={e => setShowAxes(e.target.checked)} />
          <span className="text-sm">Show Axes</span>
        </label>
      </div>

      {/* Preview */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Preview</label>
        <div className="flex justify-center rounded border bg-white">
          {functions.some(f => f.expression.trim()) ? (
            <GraphRenderer element={previewElement} width={500} height={300} />
          ) : (
            <div className="flex h-[300px] w-[500px] items-center justify-center text-slate-400">
              Enter a function to see preview
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            onClick={onCancel}
            className="rounded border px-4 py-2 text-sm hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!functions.some(f => f.expression.trim())}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Insert Graph
        </button>
      </div>
    </div>
  )
}
