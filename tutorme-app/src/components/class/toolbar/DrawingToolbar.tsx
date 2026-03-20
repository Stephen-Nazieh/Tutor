/**
 * Drawing Toolbar Component
 * Tool selection UI for whiteboard
 */

import { Button } from '@/components/ui/button'
import {
  Pen,
  Eraser,
  Hand,
  MousePointer,
  Type,
  Square,
  Circle,
  Minus,
  Triangle,
} from 'lucide-react'
import type { Tool, ShapeType } from '../hooks'

interface DrawingToolbarProps {
  activeTool: Tool
  onToolChange: (tool: Tool) => void
  activeShape?: ShapeType
  onShapeChange?: (shape: ShapeType) => void
  color: string
  onColorChange: (color: string) => void
  lineWidth: number
  onLineWidthChange: (width: number) => void
  readOnly?: boolean
}

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'White', value: '#ffffff' },
]

const LINE_WIDTHS = [
  { name: 'Thin', value: 2 },
  { name: 'Medium', value: 4 },
  { name: 'Thick', value: 8 },
]

export function DrawingToolbar({
  activeTool,
  onToolChange,
  activeShape,
  onShapeChange,
  color,
  onColorChange,
  lineWidth,
  onLineWidthChange,
  readOnly = false,
}: DrawingToolbarProps) {
  if (readOnly) return null

  const toolButtons = [
    { tool: 'pen' as Tool, icon: Pen, label: 'Pen' },
    { tool: 'eraser' as Tool, icon: Eraser, label: 'Eraser' },
    { tool: 'pan' as Tool, icon: Hand, label: 'Pan' },
    { tool: 'select' as Tool, icon: MousePointer, label: 'Select' },
    { tool: 'text' as Tool, icon: Type, label: 'Text' },
    { tool: 'shape' as Tool, icon: Square, label: 'Shape' },
  ]

  const shapeButtons = [
    { shape: 'rectangle' as ShapeType, icon: Square, label: 'Rectangle' },
    { shape: 'circle' as ShapeType, icon: Circle, label: 'Circle' },
    { shape: 'line' as ShapeType, icon: Minus, label: 'Line' },
    { shape: 'triangle' as ShapeType, icon: Triangle, label: 'Triangle' },
  ]

  return (
    <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800/90 p-2 shadow-lg backdrop-blur-sm">
      {/* Tool Selection */}
      <div className="flex flex-col gap-1">
        {toolButtons.map(({ tool, icon: Icon, label }) => (
          <Button
            key={tool}
            variant={activeTool === tool ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onToolChange(tool)}
            title={label}
            className="h-10 w-10 p-0"
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      {/* Shape Selection (when shape tool is active) */}
      {activeTool === 'shape' && (
        <div className="flex flex-col gap-1 border-t border-gray-700 pt-2">
          {shapeButtons.map(({ shape, icon: Icon, label }) => (
            <Button
              key={shape}
              variant={activeShape === shape ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onShapeChange?.(shape)}
              title={label}
              className="h-10 w-10 p-0"
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      )}

      {/* Color Selection */}
      <div className="flex flex-col gap-1 border-t border-gray-700 pt-2">
        {COLORS.map(c => (
          <button
            key={c.value}
            onClick={() => onColorChange(c.value)}
            title={c.name}
            className={`h-10 w-10 rounded border-2 transition-all ${
              color === c.value ? 'scale-110 border-white' : 'border-gray-600 hover:border-gray-400'
            }`}
            style={{ backgroundColor: c.value }}
          />
        ))}
      </div>

      {/* Line Width Selection */}
      <div className="flex flex-col gap-1 border-t border-gray-700 pt-2">
        {LINE_WIDTHS.map(w => (
          <Button
            key={w.value}
            variant={lineWidth === w.value ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onLineWidthChange(w.value)}
            title={w.name}
            className="h-10 w-10 p-0"
          >
            <div
              className="rounded-full bg-current"
              style={{
                width: `${Math.min(w.value * 2, 16)}px`,
                height: `${Math.min(w.value * 2, 16)}px`,
              }}
            />
          </Button>
        ))}
      </div>
    </div>
  )
}
