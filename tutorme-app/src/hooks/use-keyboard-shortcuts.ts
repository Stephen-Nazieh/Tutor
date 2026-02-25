'use client'

import { useEffect, useCallback } from 'react'
import type { ToolType } from '@/types/math-whiteboard'

interface KeyboardShortcutsOptions {
  onUndo: () => void
  onRedo: () => void
  onExport: () => void
  onClear: () => void
  onDelete: () => void
  onSetTool: (tool: ToolType) => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  canUndo: boolean
  canRedo: boolean
  activeTool: ToolType
  isEditing: boolean
}

export function useKeyboardShortcuts({
  onUndo,
  onRedo,
  onExport,
  onClear,
  onDelete,
  onSetTool,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  canUndo,
  canRedo,
  isEditing,
}: KeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger shortcuts when editing text or in input fields
      if (isEditing) return
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey

      // Ctrl/Cmd + Key shortcuts
      if (ctrlOrCmd) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              if (canRedo) onRedo()
            } else {
              if (canUndo) onUndo()
            }
            return
          case 'y':
            e.preventDefault()
            if (canRedo) onRedo()
            return
          case 's':
            e.preventDefault()
            onExport()
            return
          case 'a':
            e.preventDefault()
            // Select all - handled by component
            return
          case '0':
            e.preventDefault()
            onResetZoom()
            return
          case '=':
          case '+':
            e.preventDefault()
            onZoomIn()
            return
          case '-':
            e.preventDefault()
            onZoomOut()
            return
        }
      }

      // Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        onDelete()
        return
      }

      // Escape key
      if (e.key === 'Escape') {
        onSetTool('select')
        return
      }

      // Tool shortcuts (single keys)
      if (!ctrlOrCmd && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'v':
            e.preventDefault()
            onSetTool('select')
            break
          case 'h':
            e.preventDefault()
            onSetTool('hand')
            break
          case 'p':
            e.preventDefault()
            onSetTool('pen')
            break
          case 'e':
            e.preventDefault()
            onSetTool('eraser')
            break
          case 'r':
            e.preventDefault()
            onSetTool('rectangle')
            break
          case 'c':
            if (!e.shiftKey) {
              e.preventDefault()
              onSetTool('circle')
            }
            break
          case 'l':
            e.preventDefault()
            onSetTool('line')
            break
          case 'a':
            e.preventDefault()
            onSetTool('arrow')
            break
          case 't':
            e.preventDefault()
            onSetTool('text')
            break
          case 'q':
            e.preventDefault()
            onSetTool('equation')
            break
          case 'g':
            e.preventDefault()
            onSetTool('graph')
            break
          case 'f':
            e.preventDefault()
            onSetTool('laser')
            break
          case 'k':
            e.preventDefault()
            onClear()
            break
        }
      }
    },
    [
      onUndo,
      onRedo,
      onExport,
      onClear,
      onDelete,
      onSetTool,
      onZoomIn,
      onZoomOut,
      onResetZoom,
      canUndo,
      canRedo,
      isEditing,
    ]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// Export shortcut reference for UI display
export const KEYBOARD_SHORTCUTS = [
  { key: 'V', tool: 'Select', description: 'Select tool' },
  { key: 'H', tool: 'Hand', description: 'Pan canvas' },
  { key: 'P', tool: 'Pen', description: 'Draw freehand' },
  { key: 'E', tool: 'Eraser', description: 'Erase' },
  { key: 'R', tool: 'Rectangle', description: 'Draw rectangle' },
  { key: 'C', tool: 'Circle', description: 'Draw circle' },
  { key: 'L', tool: 'Line', description: 'Draw line' },
  { key: 'A', tool: 'Arrow', description: 'Draw arrow' },
  { key: 'T', tool: 'Text', description: 'Insert text' },
  { key: 'Q', tool: 'Equation', description: 'Insert equation' },
  { key: 'G', tool: 'Graph', description: 'Insert graph' },
  { key: 'F', tool: 'Laser', description: 'Laser pointer' },
  { key: 'K', tool: 'Clear', description: 'Clear canvas' },
  { key: 'Esc', tool: 'Escape', description: 'Cancel / Select tool' },
  { key: 'Ctrl+Z', tool: 'Undo', description: 'Undo last action' },
  { key: 'Ctrl+Y', tool: 'Redo', description: 'Redo last action' },
  { key: 'Ctrl+S', tool: 'Export', description: 'Export whiteboard' },
  { key: 'Ctrl++', tool: 'Zoom In', description: 'Zoom in' },
  { key: 'Ctrl+-', tool: 'Zoom Out', description: 'Zoom out' },
  { key: 'Ctrl+0', tool: 'Reset Zoom', description: 'Reset zoom' },
  { key: 'Delete', tool: 'Delete', description: 'Delete selected' },
]

export default useKeyboardShortcuts
