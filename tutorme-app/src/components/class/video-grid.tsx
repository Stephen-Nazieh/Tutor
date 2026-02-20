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

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
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
      className="grid gap-2 h-full"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      }}
    >
      {/* Local video */}
      <div className="relative bg-gray-800 rounded-lg overflow-hidden">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
          You {isVideoEnabled ? '' : '(Video Off)'}
        </div>
      </div>

      {/* Remote participants */}
      {participants.map((participant) => (
        <div 
          key={participant.id}
          className="relative bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center"
        >
          {participant.isVideoEnabled ? (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">Video Placeholder</span>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {participant.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          
          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm flex items-center gap-2">
            <span>{participant.name}</span>
            {!participant.isAudioEnabled && (
              <span className="text-red-400">Muted</span>
            )}
          </div>

          {participant.isScreenSharing && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
              Sharing
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
