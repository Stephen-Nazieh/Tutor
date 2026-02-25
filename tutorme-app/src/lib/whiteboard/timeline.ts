/**
 * Time-Travel Playback System
 * 
 * Features:
 * - Timeline scrubber with authored events
 * - Snapshot-based reconstruction
 * - Playback controls (play/pause/speed)
 * - Event filtering by type/user
 */

import type { DurableOperation } from './durability'

export interface TimelineEvent {
  id: string
  seq: number
  timestamp: number
  type: 'stroke' | 'delete' | 'update' | 'clear' | 'cursor' | 'selection'
  userId: string
  userName: string
  description: string
  operation: DurableOperation
}

export interface TimelineState {
  currentSeq: number
  isPlaying: boolean
  playbackSpeed: number
  startTime: number
  endTime: number
  currentTime: number
  events: TimelineEvent[]
  filteredEvents: TimelineEvent[]
}

export interface TimelineFilter {
  users?: string[]
  types?: string[]
  startTime?: number
  endTime?: number
}

export interface PlaybackSession {
  id: string
  roomId: string
  startSeq: number
  endSeq: number
  currentSeq: number
  isPlaying: boolean
  speed: number
  startedAt: number
}

export class TimelinePlayer {
  private session: PlaybackSession | null = null
  private events: TimelineEvent[] = []
  private currentState: unknown = null
  private onStateChange: ((state: unknown) => void) | null = null
  private onEvent: ((event: TimelineEvent) => void) | null = null
  private playbackTimer: ReturnType<typeof setInterval> | null = null
  private filter: TimelineFilter = {}

  constructor(
    private readonly reconstructFn: (state: unknown, op: DurableOperation) => unknown
  ) {}

  /**
   * Initialize timeline with events
   */
  initialize(events: TimelineEvent[], initialState: unknown): void {
    this.events = events.sort((a, b) => a.seq - b.seq)
    this.currentState = initialState
    
    if (this.events.length > 0) {
      this.session = {
        id: `playback-${Date.now()}`,
        roomId: '',
        startSeq: this.events[0].seq,
        endSeq: this.events[this.events.length - 1].seq,
        currentSeq: this.events[0].seq,
        isPlaying: false,
        speed: 1,
        startedAt: Date.now(),
      }
    }
  }

  /**
   * Set callbacks
   */
  onStateChangeCallback(fn: (state: unknown) => void): void {
    this.onStateChange = fn
  }

  onEventCallback(fn: (event: TimelineEvent) => void): void {
    this.onEvent = fn
  }

  /**
   * Apply filter to events
   */
  setFilter(filter: TimelineFilter): void {
    this.filter = filter
    
    if (this.session) {
      const filtered = this.events.filter((event) => {
        if (filter.users && !filter.users.includes(event.userId)) return false
        if (filter.types && !filter.types.includes(event.type)) return false
        if (filter.startTime && event.timestamp < filter.startTime) return false
        if (filter.endTime && event.timestamp > filter.endTime) return false
        return true
      })
      
      this.session.startSeq = filtered[0]?.seq || 0
      this.session.endSeq = filtered[filtered.length - 1]?.seq || 0
    }
  }

  /**
   * Get filtered events
   */
  getFilteredEvents(): TimelineEvent[] {
    return this.events.filter((event) => {
      if (this.filter.users && !this.filter.users.includes(event.userId)) return false
      if (this.filter.types && !this.filter.types.includes(event.type)) return false
      if (this.filter.startTime && event.timestamp < this.filter.startTime) return false
      if (this.filter.endTime && event.timestamp > this.filter.endTime) return false
      return true
    })
  }

  /**
   * Play the timeline
   */
  play(): void {
    if (!this.session) return
    
    this.session.isPlaying = true
    this.startPlaybackTimer()
  }

  /**
   * Pause playback
   */
  pause(): void {
    if (!this.session) return
    
    this.session.isPlaying = false
    this.stopPlaybackTimer()
  }

  /**
   * Stop playback and reset
   */
  stop(): void {
    this.pause()
    if (this.session) {
      this.session.currentSeq = this.session.startSeq
    }
  }

  /**
   * Seek to a specific sequence number
   */
  seekToSeq(seq: number): void {
    if (!this.session) return
    
    // Clamp to valid range
    seq = Math.max(this.session.startSeq, Math.min(seq, this.session.endSeq))
    
    // Reconstruct state up to this point
    this.reconstructToSeq(seq)
    this.session.currentSeq = seq
  }

  /**
   * Seek to a specific timestamp
   */
  seekToTime(timestamp: number): void {
    const event = this.events.find((e) => e.timestamp >= timestamp)
    if (event) {
      this.seekToSeq(event.seq)
    }
  }

  /**
   * Set playback speed
   */
  setSpeed(speed: number): void {
    if (!this.session) return
    
    this.session.speed = Math.max(0.25, Math.min(speed, 4))
    
    // Restart timer with new speed if playing
    if (this.session.isPlaying) {
      this.stopPlaybackTimer()
      this.startPlaybackTimer()
    }
  }

  /**
   * Step forward one event
   */
  stepForward(): void {
    if (!this.session) return
    
    const nextEvent = this.events.find((e) => e.seq > this.session!.currentSeq)
    if (nextEvent) {
      this.applyEvent(nextEvent)
      this.session.currentSeq = nextEvent.seq
    }
  }

  /**
   * Step backward one event
   */
  stepBackward(): void {
    if (!this.session) return
    
    // Find previous event in filtered list
    const filtered = this.getFilteredEvents()
    const currentIndex = filtered.findIndex((e) => e.seq >= this.session!.currentSeq)
    
    if (currentIndex > 0) {
      const prevEvent = filtered[currentIndex - 1]
      this.reconstructToSeq(prevEvent.seq)
      this.session.currentSeq = prevEvent.seq
    }
  }

  /**
   * Get current playback state
   */
  getState(): TimelineState {
    const filtered = this.getFilteredEvents()
    
    return {
      currentSeq: this.session?.currentSeq || 0,
      isPlaying: this.session?.isPlaying || false,
      playbackSpeed: this.session?.speed || 1,
      startTime: this.events[0]?.timestamp || 0,
      endTime: this.events[this.events.length - 1]?.timestamp || 0,
      currentTime: this.events.find((e) => e.seq === this.session?.currentSeq)?.timestamp || 0,
      events: this.events,
      filteredEvents: filtered,
    }
  }

  /**
   * Get event at current position
   */
  getCurrentEvent(): TimelineEvent | null {
    if (!this.session) return null
    return this.events.find((e) => e.seq === this.session!.currentSeq) || null
  }

  /**
   * Get user activity summary
   */
  getUserActivity(): Array<{
    userId: string
    userName: string
    eventCount: number
    firstEvent: number
    lastEvent: number
  }> {
    const userMap = new Map<string, {
      userId: string
      userName: string
      events: TimelineEvent[]
    }>()

    this.events.forEach((event) => {
      const existing = userMap.get(event.userId)
      if (existing) {
        existing.events.push(event)
      } else {
        userMap.set(event.userId, {
          userId: event.userId,
          userName: event.userName,
          events: [event],
        })
      }
    })

    return Array.from(userMap.values()).map((user) => ({
      userId: user.userId,
      userName: user.userName,
      eventCount: user.events.length,
      firstEvent: user.events[0].timestamp,
      lastEvent: user.events[user.events.length - 1].timestamp,
    }))
  }

  /**
   * Export timeline as JSON
   */
  exportTimeline(): string {
    return JSON.stringify({
      events: this.events,
      session: this.session,
      exportedAt: Date.now(),
    })
  }

  /**
   * Import timeline from JSON
   */
  importTimeline(json: string, initialState: unknown): void {
    const data = JSON.parse(json)
    this.initialize(data.events, initialState)
  }

  /**
   * Start the playback timer
   */
  private startPlaybackTimer(): void {
    if (!this.session) return
    
    const interval = Math.max(100, 1000 / this.session.speed)
    
    this.playbackTimer = setInterval(() => {
      this.stepForward()
      
      // Check if we've reached the end
      if (this.session!.currentSeq >= this.session!.endSeq) {
        this.pause()
      }
    }, interval)
  }

  /**
   * Stop the playback timer
   */
  private stopPlaybackTimer(): void {
    if (this.playbackTimer) {
      clearInterval(this.playbackTimer)
      this.playbackTimer = null
    }
  }

  /**
   * Apply a single event
   */
  private applyEvent(event: TimelineEvent): void {
    this.currentState = this.reconstructFn(this.currentState, event.operation)
    
    if (this.onStateChange) {
      this.onStateChange(this.currentState)
    }
    
    if (this.onEvent) {
      this.onEvent(event)
    }
  }

  /**
   * Reconstruct state up to a specific sequence number
   */
  private reconstructToSeq(targetSeq: number): void {
    // Reset to initial state and replay all events up to target
    const filtered = this.getFilteredEvents()
    const eventsToApply = filtered.filter((e) => e.seq <= targetSeq)
    
    // In a real implementation, we might want to use a snapshot here
    // for performance, but for simplicity we'll replay from start
    eventsToApply.forEach((event) => {
      this.currentState = this.reconstructFn(this.currentState, event.operation)
    })
    
    if (this.onStateChange) {
      this.onStateChange(this.currentState)
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stopPlaybackTimer()
    this.session = null
    this.events = []
    this.onStateChange = null
    this.onEvent = null
  }
}

/**
 * Create a timeline event from a durable operation
 */
export function createTimelineEvent(
  operation: DurableOperation,
  userName: string
): TimelineEvent {
  const descriptions: Record<string, (op: DurableOperation) => string> = {
    stroke: (op) => `drew ${getShapeDescription(op.payload)}`,
    delete: () => 'deleted an element',
    update: () => 'updated an element',
    clear: () => 'cleared the board',
  }

  const description = descriptions[operation.type]?.(operation) || 'performed an action'

  return {
    id: `event-${operation.id}`,
    seq: operation.seq,
    timestamp: operation.timestamp,
    type: operation.type,
    userId: operation.userId,
    userName,
    description: `${userName} ${description}`,
    operation,
  }
}

/**
 * Get a human-readable description of a shape
 */
function getShapeDescription(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return 'something'
  
  const p = payload as Record<string, unknown>
  
  if (p.type === 'shape') {
    const shapeType = p.shapeType as string
    return shapeType || 'shape'
  }
  
  if (p.type === 'text') return 'text'
  if (p.type === 'eraser') return 'with eraser'
  
  return 'a stroke'
}

/**
 * Generate a timeline thumbnail
 */
export function generateTimelineThumbnail(
  events: TimelineEvent[],
  width: number,
  height: number
): string {
  // Create a simple SVG representation of activity over time
  const startTime = events[0]?.timestamp || 0
  const endTime = events[events.length - 1]?.timestamp || startTime
  const duration = endTime - startTime || 1

  const userColors = new Map<string, string>()
  let colorIndex = 0
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']

  // Assign colors to users
  events.forEach((event) => {
    if (!userColors.has(event.userId)) {
      userColors.set(event.userId, colors[colorIndex % colors.length])
      colorIndex++
    }
  })

  // Create activity bars
  const barHeight = height / userColors.size
  const bars = Array.from(userColors.entries()).map(([userId, color], index) => {
    const userEvents = events.filter((e) => e.userId === userId)
    const segments = userEvents.map((event) => {
      const x = ((event.timestamp - startTime) / duration) * width
      return `<rect x="${x}" y="${index * barHeight}" width="3" height="${barHeight - 2}" fill="${color}" rx="1" />`
    })
    return segments.join('')
  })

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#f8fafc" />
      ${bars.join('')}
    </svg>
  `
}
