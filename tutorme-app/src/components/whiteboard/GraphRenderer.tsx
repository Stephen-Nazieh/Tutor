// @ts-nocheck
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { GraphElement, PlottedFunction } from '@/types/math-whiteboard'

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

// Parse mathematical expression to JavaScript function
const parseExpression = (expression: string): ((x: number) => number | null) => {
  try {
    // Replace common math functions
    let processed = expression
      .replace(/\^/g, '**')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/asin/g, 'Math.asin')
      .replace(/acos/g, 'Math.acos')
      .replace(/atan/g, 'Math.atan')
      .replace(/sinh/g, 'Math.sinh')
      .replace(/cosh/g, 'Math.cosh')
      .replace(/tanh/g, 'Math.tanh')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/abs/g, 'Math.abs')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/exp/g, 'Math.exp')
      .replace(/pi/gi, 'Math.PI')
      .replace(/e(?![a-z])/gi, 'Math.E')
      .replace(/floor/g, 'Math.floor')
      .replace(/ceil/g, 'Math.ceil')
      .replace(/round/g, 'Math.round')
    
    // Create function
    return new Function('x', `
      try {
        return ${processed}
      } catch {
        return null
      }
    `) as (x: number) => number | null
  } catch {
    return () => null
  }
}

// Generate data points for a function
const generateFunctionData = (
  func: PlottedFunction,
  xMin: number,
  xMax: number,
  points: number = 500
): { x: number[]; y: number[] } => {
  const fn = parseExpression(func.expression)
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
          const data = generateFunctionData(
            func,
            element.xMin,
            element.xMax
          )
          
          return {
            x: data.x,
            y: data.y,
            mode: 'lines',
            name: func.expression,
            line: {
              color: func.color,
              width: func.lineWidth,
              dash: func.lineStyle === 'dashed' ? 'dash' : 
                    func.lineStyle === 'dotted' ? 'dot' : 'solid',
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
        className="flex items-center justify-center bg-red-50 border border-red-200 rounded"
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <p className="text-red-600 text-sm">Error: {error}</p>
          <button 
            onClick={renderGraph}
            className="mt-2 text-xs text-blue-600 hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        style={{ width, height }}
      />
      
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-white/80"
          style={{ width, height }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
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

export function GraphEditor({
  initialElement,
  onSubmit,
  onCancel,
}: GraphEditorProps) {
  const [functions, setFunctions] = useState<PlottedFunction[]>(
    initialElement?.functions || [
      { id: '1', expression: 'x^2', color: '#3b82f6', lineWidth: 2, lineStyle: 'solid', visible: true }
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
    setFunctions(prev => [...prev, {
      id: Date.now().toString(),
      expression: '',
      color: colors[prev.length % colors.length],
      lineWidth: 2,
      lineStyle: 'solid',
      visible: true,
    }])
  }

  const updateFunction = (id: string, updates: Partial<PlottedFunction>) => {
    setFunctions(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f))
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
    <div className="bg-white rounded-lg shadow-lg p-4 w-[600px] max-w-full max-h-[80vh] overflow-auto">
      <h3 className="text-lg font-semibold mb-3">Insert Graph</h3>
      
      {/* Functions */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">Functions</label>
          <button
            onClick={addFunction}
            className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Function
          </button>
        </div>
        
        <div className="space-y-2">
          {functions.map((func, index) => (
            <div key={func.id} className="flex items-center gap-2 p-2 border rounded">
              <input
                type="color"
                value={func.color}
                onChange={(e) => updateFunction(func.id, { color: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer"
              />
              
              <input
                type="text"
                value={func.expression}
                onChange={(e) => updateFunction(func.id, { expression: e.target.value })}
                placeholder="e.g., x^2"
                className="flex-1 px-2 py-1 border rounded font-mono text-sm"
              />
              
              <select
                value={func.lineStyle}
                onChange={(e) => updateFunction(func.id, { lineStyle: e.target.value as any })}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
              
              <input
                type="number"
                value={func.lineWidth}
                onChange={(e) => updateFunction(func.id, { lineWidth: Number(e.target.value) })}
                min={1}
                max={10}
                className="w-14 px-2 py-1 border rounded text-sm"
              />
              
              {functions.length > 1 && (
                <button
                  onClick={() => removeFunction(func.id)}
                  className="text-red-500 hover:text-red-700 px-1"
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
          <div className="flex flex-wrap gap-1 mt-1">
            {functionExamples.map(ex => (
              <button
                key={ex}
                onClick={() => {
                  const firstFunc = functions[0]
                  if (firstFunc) {
                    updateFunction(firstFunc.id, { expression: ex })
                  }
                }}
                className="text-xs px-2 py-0.5 bg-slate-100 rounded hover:bg-slate-200"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Axis Ranges */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium mb-1 block">X Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={xMin}
              onChange={(e) => setXMin(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded"
            />
            <span className="text-slate-400">to</span>
            <input
              type="number"
              value={xMax}
              onChange={(e) => setXMax(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Y Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={yMin}
              onChange={(e) => setYMin(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded"
            />
            <span className="text-slate-400">to</span>
            <input
              type="number"
              value={yMax}
              onChange={(e) => setYMax(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Display Options */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
          <span className="text-sm">Show Grid</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showAxes}
            onChange={(e) => setShowAxes(e.target.checked)}
          />
          <span className="text-sm">Show Axes</span>
        </label>
      </div>

      {/* Preview */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-1 block">Preview</label>
        <div className="border rounded bg-white flex justify-center">
          {functions.some(f => f.expression.trim()) ? (
            <GraphRenderer element={previewElement} width={500} height={300} />
          ) : (
            <div className="w-[500px] h-[300px] flex items-center justify-center text-slate-400">
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
            className="px-4 py-2 text-sm border rounded hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!functions.some(f => f.expression.trim())}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Insert Graph
        </button>
      </div>
    </div>
  )
}
