'use client'

import { useState, useEffect } from 'react'
import type { AnyMathElement } from '@/types/math-whiteboard'
import { X, Move, RotateCw, Trash2, Copy, Lock, Unlock } from 'lucide-react'

interface ElementPropertiesPanelProps {
  element: AnyMathElement | null
  onUpdate: (changes: Partial<AnyMathElement>) => void
  onDelete: () => void
  onDuplicate: () => void
  onClose: () => void
}

const COLORS = [
  '#000000', '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef',
  '#f43f5e', '#78716c', '#ffffff',
]

export function ElementPropertiesPanel({
  element,
  onUpdate,
  onDelete,
  onDuplicate,
  onClose,
}: ElementPropertiesPanelProps) {
  const [localValues, setLocalValues] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
  })

  useEffect(() => {
    if (element) {
      setLocalValues({
        x: Math.round(element.x),
        y: Math.round(element.y),
        rotation: element.rotation || 0,
        opacity: (element as any).opacity ?? 1,
      })
    }
  }, [element])

  if (!element) return null

  const handleUpdate = (field: string, value: number) => {
    setLocalValues(prev => ({ ...prev, [field]: value }))
    onUpdate({ [field]: value })
  }

  const getElementSpecificProperties = () => {
    switch (element.type) {
      case 'path':
        const pathEl = element as any
        return (
          <>
            <PropertyRow label="Stroke Color">
              <ColorPicker
                value={pathEl.strokeColor}
                onChange={(color) => onUpdate({ strokeColor: color })}
              />
            </PropertyRow>
            <PropertyRow label="Stroke Width">
              <RangeInput
                value={pathEl.strokeWidth}
                min={1}
                max={20}
                onChange={(v) => onUpdate({ strokeWidth: v })}
              />
            </PropertyRow>
          </>
        )
      case 'rectangle':
        const rectEl = element as any
        return (
          <>
            <PropertyRow label="Fill Color">
              <ColorPicker
                value={rectEl.fillColor || 'transparent'}
                onChange={(color) => onUpdate({ fillColor: color === 'transparent' ? undefined : color })}
                allowTransparent
              />
            </PropertyRow>
            <PropertyRow label="Stroke Color">
              <ColorPicker
                value={rectEl.strokeColor}
                onChange={(color) => onUpdate({ strokeColor: color })}
              />
            </PropertyRow>
            <PropertyRow label="Stroke Width">
              <RangeInput
                value={rectEl.strokeWidth}
                min={1}
                max={20}
                onChange={(v) => onUpdate({ strokeWidth: v })}
              />
            </PropertyRow>
            <PropertyRow label="Width">
              <NumberInput
                value={rectEl.width}
                onChange={(v) => onUpdate({ width: v })}
              />
            </PropertyRow>
            <PropertyRow label="Height">
              <NumberInput
                value={rectEl.height}
                onChange={(v) => onUpdate({ height: v })}
              />
            </PropertyRow>
          </>
        )
      case 'circle':
        const circleEl = element as any
        return (
          <>
            <PropertyRow label="Fill Color">
              <ColorPicker
                value={circleEl.fillColor || 'transparent'}
                onChange={(color) => onUpdate({ fillColor: color === 'transparent' ? undefined : color })}
                allowTransparent
              />
            </PropertyRow>
            <PropertyRow label="Stroke Color">
              <ColorPicker
                value={circleEl.strokeColor}
                onChange={(color) => onUpdate({ strokeColor: color })}
              />
            </PropertyRow>
            <PropertyRow label="Radius">
              <RangeInput
                value={circleEl.radius}
                min={1}
                max={500}
                onChange={(v) => onUpdate({ radius: v })}
              />
            </PropertyRow>
          </>
        )
      case 'text':
        const textEl = element as any
        return (
          <>
            <PropertyRow label="Text">
              <textarea
                value={textEl.text}
                onChange={(e) => onUpdate({ text: e.target.value })}
                className="w-full px-2 py-1 border rounded text-sm"
                rows={2}
              />
            </PropertyRow>
            <PropertyRow label="Font Size">
              <RangeInput
                value={textEl.fontSize}
                min={8}
                max={72}
                onChange={(v) => onUpdate({ fontSize: v })}
              />
            </PropertyRow>
            <PropertyRow label="Color">
              <ColorPicker
                value={textEl.color}
                onChange={(color) => onUpdate({ color })}
              />
            </PropertyRow>
            <PropertyRow label="Bold">
              <input
                type="checkbox"
                checked={textEl.bold || false}
                onChange={(e) => onUpdate({ bold: e.target.checked })}
              />
            </PropertyRow>
            <PropertyRow label="Italic">
              <input
                type="checkbox"
                checked={textEl.italic || false}
                onChange={(e) => onUpdate({ italic: e.target.checked })}
              />
            </PropertyRow>
          </>
        )
      case 'equation':
        const eqEl = element as any
        return (
          <>
            <PropertyRow label="LaTeX">
              <textarea
                value={eqEl.latex}
                onChange={(e) => onUpdate({ latex: e.target.value })}
                className="w-full px-2 py-1 border rounded text-sm font-mono"
                rows={3}
              />
            </PropertyRow>
            <PropertyRow label="Font Size">
              <RangeInput
                value={eqEl.fontSize}
                min={12}
                max={48}
                onChange={(v) => onUpdate({ fontSize: v })}
              />
            </PropertyRow>
            <PropertyRow label="Color">
              <ColorPicker
                value={eqEl.color}
                onChange={(color) => onUpdate({ color })}
              />
            </PropertyRow>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="absolute right-4 top-20 w-64 bg-white rounded-lg shadow-lg border p-4 z-40">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Properties</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Element Type Badge */}
      <div className="mb-3">
        <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded capitalize">
          {element.type}
        </span>
      </div>

      {/* Common Properties */}
      <div className="space-y-3 mb-4">
        <PropertyRow label="Position X">
          <NumberInput
            value={localValues.x}
            onChange={(v) => handleUpdate('x', v)}
          />
        </PropertyRow>
        <PropertyRow label="Position Y">
          <NumberInput
            value={localValues.y}
            onChange={(v) => handleUpdate('y', v)}
          />
        </PropertyRow>
        <PropertyRow label="Rotation">
          <div className="flex items-center gap-2">
            <RangeInput
              value={localValues.rotation}
              min={-180}
              max={180}
              onChange={(v) => handleUpdate('rotation', v)}
            />
            <span className="text-xs text-slate-500 w-10">{localValues.rotation}°</span>
          </div>
        </PropertyRow>
        <PropertyRow label="Opacity">
          <RangeInput
            value={localValues.opacity}
            min={0}
            max={1}
            step={0.1}
            onChange={(v) => handleUpdate('opacity', v)}
          />
        </PropertyRow>
      </div>

      {/* Divider */}
      <hr className="my-3" />

      {/* Type-specific Properties */}
      <div className="space-y-3">
        {getElementSpecificProperties()}
      </div>

      {/* Divider */}
      <hr className="my-3" />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onDuplicate}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border rounded hover:bg-slate-50"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  )
}

// Helper Components
function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <label className="text-xs text-slate-500 min-w-[80px]">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  )
}

function NumberInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-2 py-1 border rounded text-sm"
    />
  )
}

function RangeInput({
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
  )
}

function ColorPicker({
  value,
  onChange,
  allowTransparent = false,
}: {
  value: string
  onChange: (v: string) => void
  allowTransparent?: boolean
}) {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="w-8 h-8 rounded border shadow-sm"
        style={{
          backgroundColor: value === 'transparent' ? '#fff' : value,
          backgroundImage: value === 'transparent'
            ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
            : undefined,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
        }}
      />
      {showPicker && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded shadow-lg z-50 grid grid-cols-7 gap-1">
          {allowTransparent && (
            <button
              onClick={() => {
                onChange('transparent')
                setShowPicker(false)
              }}
              className="w-6 h-6 rounded border"
              style={{
                backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                backgroundSize: '4px 4px',
              }}
              title="Transparent"
            />
          )}
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => {
                onChange(color)
                setShowPicker(false)
              }}
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ElementPropertiesPanel
