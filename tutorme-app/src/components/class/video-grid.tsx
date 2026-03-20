/**
 * Video Grid Component
 * Displays video tiles for all participants in the class
 */

import { useEffect, useRef } from 'react'
import { VideoParticipant } from '@/lib/video/types'

interface VideoGridProps {
  participants: VideoParticipant[]
  isVideoEnabled: boolean
}

export function VideoGrid({ participants, isVideoEnabled }: VideoGridProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null)

  // Get local media stream
  useEffect(() => {
    if (!isVideoEnabled) {
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
        localVideoRef.current.srcObject = null
      }
      return
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      })
      .catch(err => console.error('Failed to get local video:', err))

    return () => {
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [isVideoEnabled])

  // Calculate grid layout
  const count = participants.length + 1 // +1 for local video
  const cols = count <= 2 ? 1 : count <= 4 ? 2 : 3
  const rows = Math.ceil(count / cols)

  return (
    <div
      className="grid h-full gap-2"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {/* Local video */}
      <div className="relative overflow-hidden rounded-lg bg-gray-800">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
          You {isVideoEnabled ? '' : '(Video Off)'}
        </div>
      </div>

      {/* Remote participants */}
      {participants.map(participant => (
        <div
          key={participant.id}
          className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-800"
        >
          {participant.isVideoEnabled ? (
            <div className="flex h-full w-full items-center justify-center bg-gray-700">
              <span className="text-gray-400">Video Placeholder</span>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-700">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white">
                {participant.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
            <span>{participant.name}</span>
            {!participant.isAudioEnabled && <span className="text-red-400">Muted</span>}
          </div>

          {participant.isScreenSharing && (
            <div className="absolute right-2 top-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
              Sharing
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
