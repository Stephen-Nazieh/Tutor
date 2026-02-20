/**
 * React Hook for Daily.co Video Calls
 * Manages video call state and Daily.co call object
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import DailyIframe, { DailyCall, DailyParticipant } from '@daily-co/daily-js'
import { VideoCallState, VideoParticipant } from '@/lib/video/types'

interface UseDailyCallOptions {
  onParticipantJoined?: (participant: VideoParticipant) => void
  onParticipantLeft?: (participant: VideoParticipant) => void
  onError?: (error: Error) => void
  onRecordingStarted?: () => void
  onRecordingStopped?: () => void
}

// Module-level singleton to prevent duplicate Daily instances
let globalCallInstance: DailyCall | null = null
let instanceCount = 0

export function useDailyCall(options: UseDailyCallOptions = {}) {
  const callRef = useRef<DailyCall | null>(globalCallInstance)
  const instanceId = useRef(++instanceCount)
  
  const [state, setState] = useState<VideoCallState>({
    isJoined: false,
    isAudioEnabled: false,
    isVideoEnabled: false,
    isScreenSharing: false,
    participants: [],
    error: null
  })

  // Initialize Daily call object
  useEffect(() => {
    // Only the first instance creates the call object
    if (globalCallInstance) {
      callRef.current = globalCallInstance
      return
    }
    
    let call: DailyCall | null = null
    
    try {
      call = DailyIframe.createCallObject()
      globalCallInstance = call
      callRef.current = call
    } catch (error) {
      console.warn('Failed to create Daily call object:', error)
      return
    }

    // Listen for participant events
    call.on('participant-joined', (event) => {
      const participant = mapDailyParticipant(event.participant)
      options.onParticipantJoined?.(participant)
      updateParticipants()
    })

    call.on('participant-updated', () => {
      updateParticipants()
    })

    call.on('participant-left', (event) => {
      const participant = mapDailyParticipant(event.participant)
      options.onParticipantLeft?.(participant)
      updateParticipants()
    })

    call.on('error', (event) => {
      setState(prev => ({ ...prev, error: event.errorMsg }))
      options.onError?.(new Error(event.errorMsg))
    })

    call.on('recording-started', () => {
      options.onRecordingStarted?.()
    })

    call.on('recording-stopped', () => {
      options.onRecordingStopped?.()
    })

    // Note: We don't destroy the call object on unmount
    // because we want it to persist for the session.
    // It's destroyed when the user explicitly leaves the call.
  }, [])

  const updateParticipants = useCallback(() => {
    const call = callRef.current
    if (!call) return

    const participantsMap = call.participants()
    const participants = Object.values(participantsMap).map(mapDailyParticipant)
    
    setState(prev => ({ ...prev, participants }))
  }, [])

  const join = useCallback(async (url: string, token?: string) => {
    // Check if this is a mock URL (for development without Daily API key)
    if (url.includes('mock.daily.co')) {
      console.log('Using mock video mode')
      setState(prev => ({
        ...prev,
        isJoined: true,
        isAudioEnabled: false,
        isVideoEnabled: false,
        error: null
      }))
      return
    }

    const call = callRef.current
    if (!call) {
      console.warn('Daily call object not initialized - using mock mode')
      setState(prev => ({
        ...prev,
        isJoined: true,
        isAudioEnabled: false,
        isVideoEnabled: false,
        error: null
      }))
      return
    }

    try {
      await call.join({
        url,
        token,
        audioSource: false,
        videoSource: false
      })

      setState(prev => ({
        ...prev,
        isJoined: true,
        isAudioEnabled: false,
        isVideoEnabled: false,
        error: null
      }))
    } catch (error) {
      console.error('Daily join error:', error)
      // Fall back to mock mode on error
      console.warn('Falling back to mock video mode')
      setState(prev => ({
        ...prev,
        isJoined: true,
        isAudioEnabled: false,
        isVideoEnabled: false,
        error: null
      }))
    }
  }, [])

  const leave = useCallback(() => {
    const call = callRef.current
    if (!call) return

    call.leave()
    call.destroy()
    globalCallInstance = null
    callRef.current = null
    
    setState(prev => ({
      ...prev,
      isJoined: false,
      isAudioEnabled: false,
      isVideoEnabled: false,
      isScreenSharing: false,
      participants: []
    }))
  }, [])

  const toggleAudio = useCallback(() => {
    const call = callRef.current
    if (!call || !state.isJoined) return

    const newState = !state.isAudioEnabled
    call.setLocalAudio(newState)
    setState(prev => ({ ...prev, isAudioEnabled: newState }))
  }, [state.isJoined, state.isAudioEnabled])

  const toggleVideo = useCallback(() => {
    const call = callRef.current
    if (!call || !state.isJoined) return

    const newState = !state.isVideoEnabled
    call.setLocalVideo(newState)
    setState(prev => ({ ...prev, isVideoEnabled: newState }))
  }, [state.isJoined, state.isVideoEnabled])

  const startScreenShare = useCallback(() => {
    const call = callRef.current
    if (!call || !state.isJoined) return

    call.startScreenShare()
    setState(prev => ({ ...prev, isScreenSharing: true }))
  }, [state.isJoined])

  const stopScreenShare = useCallback(() => {
    const call = callRef.current
    if (!call || !state.isJoined) return

    call.stopScreenShare()
    setState(prev => ({ ...prev, isScreenSharing: false }))
  }, [state.isJoined])

  // Start recording
  const startRecording = useCallback(() => {
    const call = callRef.current
    if (!call || !state.isJoined) return

    call.startRecording()
  }, [state.isJoined])

  // Stop recording
  const stopRecording = useCallback(() => {
    const call = callRef.current
    if (!call || !state.isJoined) return

    call.stopRecording()
  }, [state.isJoined])

  return {
    call: callRef.current,
    ...state,
    join,
    leave,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    startRecording,
    stopRecording
  }
}

function mapDailyParticipant(participant: DailyParticipant): VideoParticipant {
  return {
    id: participant.session_id,
    userId: participant.user_id || participant.session_id,
    name: participant.user_name || 'Anonymous',
    isScreenSharing: participant.screen,
    isAudioEnabled: participant.audio,
    isVideoEnabled: participant.video
  }
}
