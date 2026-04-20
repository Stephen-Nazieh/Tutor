/**
 * Daily.co Video Provider Implementation
 * For MVP - can be swapped with Tencent TRTC later
 */

import { VideoProvider, VideoRoom } from './types'

// Daily.co API configuration
const DAILY_API_KEY = process.env.DAILY_API_KEY || ''
const DAILY_API_URL = 'https://api.daily.co/v1'

export class DailyCoProvider implements VideoProvider {
  private apiKey: string
  private apiUrl: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey || DAILY_API_KEY
    this.apiUrl = DAILY_API_URL
  }

  private ensureKey(): void {
    if (!this.apiKey) {
      throw new Error('Daily.co API key not configured. Set DAILY_API_KEY environment variable.')
    }
  }

  private async fetchDaily(endpoint: string, options: RequestInit = {}): Promise<any> {
    this.ensureKey()
    const url = `${this.apiUrl}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Daily.co API error: ${error}`)
    }

    return response.json()
  }

  async createRoom(
    sessionId: string,
    options?: {
      maxParticipants?: number
      durationMinutes?: number
    }
  ): Promise<VideoRoom> {
    const roomName = `tutorme-${sessionId}-${Date.now()}`

    const expiry = options?.durationMinutes
      ? new Date(Date.now() + options.durationMinutes * 60 * 1000)
      : new Date(Date.now() + 4 * 60 * 60 * 1000) // Default 4 hours

    const room = await this.fetchDaily('/rooms', {
      method: 'POST',
      body: JSON.stringify({
        name: roomName,
        privacy: 'public',
        properties: {
          max_participants: options?.maxParticipants || 10, // 10 is safe for most Daily.co plans
          enable_screenshare: true,
          enable_chat: false, // We use our own chat
          exp: Math.floor(expiry.getTime() / 1000),
          // Auto-join with mic/video off for students
          start_audio_off: true,
          start_video_off: true,
          // Note: Recording is not supported on current Daily.co plan
        },
      }),
    })

    return {
      id: room.name,
      url: room.url,
      expiry,
    }
  }

  async createBreakoutRoom(
    parentSessionId: string,
    options?: {
      durationMinutes?: number
    }
  ): Promise<VideoRoom> {
    const roomName = `tutorme-breakout-${parentSessionId}-${Date.now()}`

    const expiry = options?.durationMinutes
      ? new Date(Date.now() + options.durationMinutes * 60 * 1000)
      : new Date(Date.now() + 60 * 60 * 1000) // Default 1 hour for breakout

    const room = await this.fetchDaily('/rooms', {
      method: 'POST',
      body: JSON.stringify({
        name: roomName,
        privacy: 'public',
        properties: {
          max_participants: 2, // 1:1 breakout
          enable_screenshare: true,
          enable_chat: false,
          // Note: enable_recording omitted - many Daily.co plans don't support it
          exp: Math.floor(expiry.getTime() / 1000),
          start_audio_off: false,
          start_video_off: false,
        },
      }),
    })

    return {
      id: room.name,
      url: room.url,
      expiry,
    }
  }

  async createMeetingToken(
    roomName: string,
    userId: string,
    options?: {
      isOwner?: boolean
      durationMinutes?: number
    }
  ): Promise<string> {
    const expiry = options?.durationMinutes
      ? Math.floor(Date.now() / 1000) + options.durationMinutes * 60
      : Math.floor(Date.now() / 1000) + 4 * 60 * 60 // 4 hours

    const token = await this.fetchDaily('/meeting-tokens', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          room_name: roomName,
          user_id: userId,
          is_owner: options?.isOwner || false,
          exp: expiry,
        },
      }),
    })

    return token.token
  }

  async deleteRoom(roomId: string): Promise<void> {
    await this.fetchDaily(`/rooms/${roomId}`, {
      method: 'DELETE',
    })
  }

  async isRoomActive(roomId: string): Promise<boolean> {
    try {
      const room = await this.fetchDaily(`/rooms/${roomId}`)
      return room && !room.deleted
    } catch {
      return false
    }
  }
}

// Singleton instance
export const dailyProvider = new DailyCoProvider()
