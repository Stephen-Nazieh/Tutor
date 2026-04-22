'use client'

import { useEffect, useRef } from 'react'
import { useDailyCall } from '@/hooks/use-daily-call'
import { Loader2 } from 'lucide-react'

interface DailyVideoFrameProps {
  roomUrl: string
  token?: string | null
  className?: string
}

export function DailyVideoFrame({ roomUrl, token, className }: DailyVideoFrameProps) {
  const { call, isJoined, join, leave, toggleAudio, toggleVideo, isAudioEnabled, isVideoEnabled } =
    useDailyCall()
  const joinedRef = useRef(false)

  useEffect(() => {
    if (!roomUrl || joinedRef.current) return
    joinedRef.current = true
    join(roomUrl, token || undefined)

    return () => {
      leave()
      joinedRef.current = false
    }
  }, [roomUrl, token, join, leave])

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!call || !containerRef.current) return
    const container = containerRef.current
    const el = call.iframe()
    if (el && el.parentElement !== container) {
      container.innerHTML = ''
      container.appendChild(el)
    }
  }, [call])

  if (!roomUrl) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 text-white ${className || ''}`}>
        <p className="text-sm">No video room available</p>
      </div>
    )
  }

  if (!isJoined) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 text-white ${className || ''}`}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span className="text-sm">Connecting...</span>
      </div>
    )
  }

  // NOTE: Video feature is temporarily disabled as per design requirements.
  // We return null to completely hide the "Joining video..." and black box.
  return null

  // return (
  //   <div
  //     className={`relative flex flex-col overflow-hidden rounded-lg bg-black ${className || ''}`}
  //   >
  //     <div ref={containerRef} className="flex-1" />
  //     <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
  //       <button
  //         type="button"
  //         onClick={toggleAudio}
  //         className={`rounded-full px-2 py-1 text-xs font-medium ${isAudioEnabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
  //       >
  //         {isAudioEnabled ? 'Mic On' : 'Mic Off'}
  //       </button>
  //       <button
  //         type="button"
  //         onClick={toggleVideo}
  //         className={`rounded-full px-2 py-1 text-xs font-medium ${isVideoEnabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
  //       >
  //         {isVideoEnabled ? 'Cam On' : 'Cam Off'}
  //       </button>
  //     </div>
  //   </div>
  // )
}
