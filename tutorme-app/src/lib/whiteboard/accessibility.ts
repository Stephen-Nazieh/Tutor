/**
 * Accessibility System
 * 
 * Features:
 * - Keyboard drawing flows
 * - High-contrast mode
 * - Screen reader announcements
 * - ARIA labels and roles
 * - Focus management
 */

import type { WhiteboardStroke } from '@/hooks/use-live-class-whiteboard'

export interface A11yConfig {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  screenReaderOptimized: boolean
  keyboardMode: boolean
}

export interface KeyboardShortcut {
  key: string
  modifiers: {
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
    meta?: boolean
  }
  action: string
  description: string
}

export interface ScreenReaderAnnouncement {
  id: string
  message: string
  priority: 'polite' | 'assertive'
  timestamp: number
}

export class AccessibilityManager {
  private config: A11yConfig = {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReaderOptimized: false,
    keyboardMode: false,
  }

  private announcements: ScreenReaderAnnouncement[] = []
  private focusStack: string[] = []
  private currentFocus: string | null = null
  private onAnnouncement?: (announcement: ScreenReaderAnnouncement) => void

  constructor(
    onAnnouncement?: (announcement: ScreenReaderAnnouncement) => void
  ) {
    this.onAnnouncement = onAnnouncement
  }

  // ============================================================================
  // Configuration
  // ============================================================================

  /**
   * Update accessibility configuration
   */
  setConfig(config: Partial<A11yConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Get current configuration
   */
  getConfig(): A11yConfig {
    return { ...this.config }
  }

  /**
   * Toggle high contrast mode
   */
  toggleHighContrast(): boolean {
    this.config.highContrast = !this.config.highContrast
    this.announce(
      this.config.highContrast ? 'High contrast mode enabled' : 'High contrast mode disabled',
      'polite'
    )
    return this.config.highContrast
  }

  /**
   * Toggle keyboard mode
   */
  toggleKeyboardMode(): boolean {
    this.config.keyboardMode = !this.config.keyboardMode
    this.announce(
      this.config.keyboardMode ? 'Keyboard drawing mode enabled' : 'Keyboard drawing mode disabled',
      'assertive'
    )
    return this.config.keyboardMode
  }

  // ============================================================================
  // Screen Reader Support
  // ============================================================================

  /**
   * Make an announcement to screen readers
   */
  announce(message: string, priority: ScreenReaderAnnouncement['priority'] = 'polite'): void {
    const announcement: ScreenReaderAnnouncement = {
      id: `announce-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      priority,
      timestamp: Date.now(),
    }

    this.announcements.push(announcement)

    // Keep only recent announcements
    if (this.announcements.length > 50) {
      this.announcements.shift()
    }

    this.onAnnouncement?.(announcement)
  }

  /**
   * Announce a drawing action
   */
  announceDrawingAction(action: string, details?: string): void {
    const message = details ? `${action}: ${details}` : action
    this.announce(message, 'polite')
  }

  /**
   * Announce tool change
   */
  announceToolChange(tool: string, color: string): void {
    this.announce(`Tool changed to ${tool} with ${color} color`, 'polite')
  }

  /**
   * Announce canvas state
   */
  announceCanvasState(strokeCount: number, selectedTool: string): void {
    this.announce(
      `Canvas has ${strokeCount} strokes. Current tool: ${selectedTool}`,
      'polite'
    )
  }

  /**
   * Get recent announcements
   */
  getAnnouncements(count: number = 10): ScreenReaderAnnouncement[] {
    return this.announcements.slice(-count)
  }

  // ============================================================================
  // Keyboard Navigation
  // ============================================================================

  /**
   * Get keyboard shortcuts
   */
  getKeyboardShortcuts(): KeyboardShortcut[] {
    return [
      {
        key: 'p',
        modifiers: {},
        action: 'select_pen',
        description: 'Select pen tool',
      },
      {
        key: 'e',
        modifiers: {},
        action: 'select_eraser',
        description: 'Select eraser tool',
      },
      {
        key: 't',
        modifiers: {},
        action: 'select_text',
        description: 'Select text tool',
      },
      {
        key: 's',
        modifiers: {},
        action: 'select_shape',
        description: 'Select shape tool',
      },
      {
        key: 'h',
        modifiers: {},
        action: 'select_hand',
        description: 'Select hand/pan tool',
      },
      {
        key: 'z',
        modifiers: { ctrl: true },
        action: 'undo',
        description: 'Undo last action',
      },
      {
        key: 'z',
        modifiers: { ctrl: true, shift: true },
        action: 'redo',
        description: 'Redo last action',
      },
      {
        key: 'c',
        modifiers: { ctrl: true },
        action: 'copy',
        description: 'Copy selection',
      },
      {
        key: 'v',
        modifiers: { ctrl: true },
        action: 'paste',
        description: 'Paste from clipboard',
      },
      {
        key: 'Delete',
        modifiers: {},
        action: 'delete',
        description: 'Delete selection',
      },
      {
        key: 'ArrowUp',
        modifiers: { shift: true },
        action: 'move_up',
        description: 'Move selection up',
      },
      {
        key: 'ArrowDown',
        modifiers: { shift: true },
        action: 'move_down',
        description: 'Move selection down',
      },
      {
        key: 'ArrowLeft',
        modifiers: { shift: true },
        action: 'move_left',
        description: 'Move selection left',
      },
      {
        key: 'ArrowRight',
        modifiers: { shift: true },
        action: 'move_right',
        description: 'Move selection right',
      },
      {
        key: '+',
        modifiers: { ctrl: true },
        action: 'zoom_in',
        description: 'Zoom in',
      },
      {
        key: '-',
        modifiers: { ctrl: true },
        action: 'zoom_out',
        description: 'Zoom out',
      },
      {
        key: '0',
        modifiers: { ctrl: true },
        action: 'reset_zoom',
        description: 'Reset zoom',
      },
      {
        key: 'k',
        modifiers: {},
        action: 'toggle_keyboard_mode',
        description: 'Toggle keyboard drawing mode',
      },
      {
        key: 'F1',
        modifiers: {},
        action: 'show_help',
        description: 'Show keyboard shortcuts help',
      },
    ]
  }

  /**
   * Parse a keyboard event to action
   */
  parseKeyboardEvent(event: KeyboardEvent): string | null {
    const shortcuts = this.getKeyboardShortcuts()

    for (const shortcut of shortcuts) {
      if (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        !!event.ctrlKey === !!shortcut.modifiers.ctrl &&
        !!event.shiftKey === !!shortcut.modifiers.shift &&
        !!event.altKey === !!shortcut.modifiers.alt &&
        !!event.metaKey === !!shortcut.modifiers.meta
      ) {
        return shortcut.action
      }
    }

    return null
  }

  // ============================================================================
  // Focus Management
  // ============================================================================

  /**
   * Push focus to stack
   */
  pushFocus(elementId: string): void {
    if (this.currentFocus) {
      this.focusStack.push(this.currentFocus)
    }
    this.currentFocus = elementId
  }

  /**
   * Pop focus from stack
   */
  popFocus(): string | null {
    this.currentFocus = this.focusStack.pop() || null
    return this.currentFocus
  }

  /**
   * Set current focus
   */
  setFocus(elementId: string): void {
    this.currentFocus = elementId
  }

  /**
   * Get current focus
   */
  getCurrentFocus(): string | null {
    return this.currentFocus
  }

  /**
   * Clear focus
   */
  clearFocus(): void {
    this.currentFocus = null
    this.focusStack = []
  }

  // ============================================================================
  // ARIA Attributes
  // ============================================================================

  /**
   * Get ARIA attributes for canvas
   */
  getCanvasAriaAttrs(): Record<string, string> {
    return {
      role: 'application',
      'aria-label': 'Interactive whiteboard canvas',
      'aria-describedby': 'whiteboard-help',
      tabIndex: '0',
    }
  }

  /**
   * Get ARIA attributes for toolbar
   */
  getToolbarAriaAttrs(): Record<string, string> {
    return {
      role: 'toolbar',
      'aria-label': 'Drawing tools',
    }
  }

  /**
   * Get ARIA attributes for tool button
   */
  getToolButtonAriaAttrs(tool: string, isActive: boolean): Record<string, string> {
    return {
      role: 'button',
      'aria-label': tool,
      'aria-pressed': isActive ? 'true' : 'false',
      tabIndex: '0',
    }
  }

  /**
   * Get ARIA attributes for color picker
   */
  getColorPickerAriaAttrs(): Record<string, string> {
    return {
      role: 'button',
      'aria-label': 'Select color',
      'aria-haspopup': 'dialog',
    }
  }

  /**
   * Get ARIA attributes for stroke
   */
  getStrokeAriaAttrs(stroke: WhiteboardStroke, index: number): Record<string, string> {
    return {
      role: 'img',
      'aria-label': `${stroke.type} stroke ${index + 1}, ${stroke.points.length} points`,
    }
  }

  // ============================================================================
  // High Contrast Colors
  // ============================================================================

  /**
   * Get high contrast color palette
   */
  getHighContrastColors(): Record<string, string> {
    return {
      black: '#000000',
      white: '#ffffff',
      red: '#ff0000',
      blue: '#0000ff',
      green: '#008000',
      yellow: '#ffff00',
      cyan: '#00ffff',
      magenta: '#ff00ff',
      orange: '#ff6600',
      purple: '#800080',
    }
  }

  /**
   * Convert color to high contrast equivalent
   */
  toHighContrast(color: string): string {
    const highContrast = this.getHighContrastColors()
    
    // Map common colors to high contrast equivalents
    const colorMap: Record<string, string> = {
      '#000000': highContrast.black,
      '#ffffff': highContrast.white,
      '#ff0000': highContrast.red,
      '#0000ff': highContrast.blue,
      '#008000': highContrast.green,
      '#ffff00': highContrast.yellow,
      '#00ffff': highContrast.cyan,
      '#ff00ff': highContrast.magenta,
    }

    return colorMap[color.toLowerCase()] || highContrast.black
  }

  // ============================================================================
  // Keyboard Drawing Mode
  // ============================================================================

  /**
   * Handle keyboard drawing input
   */
  handleKeyboardDrawing(
    key: string,
    currentPosition: { x: number; y: number },
    step: number = 10
  ): { x: number; y: number; shouldDraw: boolean } {
    let x = currentPosition.x
    let y = currentPosition.y
    let shouldDraw = false

    switch (key) {
      case 'ArrowUp':
        y -= step
        shouldDraw = true
        break
      case 'ArrowDown':
        y += step
        shouldDraw = true
        break
      case 'ArrowLeft':
        x -= step
        shouldDraw = true
        break
      case 'ArrowRight':
        x += step
        shouldDraw = true
        break
      case ' ':
        shouldDraw = false // Lift pen
        break
      case 'Enter':
        shouldDraw = true // Put pen down
        break
    }

    return { x, y, shouldDraw }
  }

  /**
   * Get keyboard drawing help text
   */
  getKeyboardDrawingHelp(): string {
    return `
      Keyboard Drawing Mode:
      - Arrow keys: Move cursor and draw
      - Shift + Arrow: Move without drawing
      - Space: Lift pen (stop drawing)
      - Enter: Put pen down (start drawing)
      - K: Toggle keyboard mode
      - P, E, T, S: Select pen, eraser, text, shape
    `.trim()
  }
}
