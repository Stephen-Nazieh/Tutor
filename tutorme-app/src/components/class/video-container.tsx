/**
 * Video Container Component
 * Displays video participants from Daily.co call object
 */

import { useEffect, useRef, useState } from 'react'
import { VideoParticipant } from '@/lib/video/types'

interface VideoContainerProps {
  participants: VideoParticipant[]
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isScreenSharing: boolean
}

export function VideoContainer({
  participants,
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing,
}: VideoContainerProps) {
  const [localVideoTrack, setLocalVideoTrack] = useState<MediaStreamTrack | null>(null)
  const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)

  // Get local media stream
  useEffect(() => {
    const getLocalStream = async () => {
      try {
        if (isVideoEnabled || isAudioEnabled) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: isVideoEnabled,
            audio: isAudioEnabled,
          })

          const videoTrack = stream.getVideoTracks()[0]
          const audioTrack = stream.getAudioTracks()[0]

          if (videoTrack) setLocalVideoTrack(videoTrack)
          if (audioTrack) setLocalAudioTrack(audioTrack)

          if (localVideoRef.current && videoTrack) {
            localVideoRef.current.srcObject = stream
          }
        } else {
          // Stop tracks when disabled
          localVideoTrack?.stop()
          localAudioTrack?.stop()
          setLocalVideoTrack(null)
          setLocalAudioTrack(null)
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = null
          }
        }
      } catch (error) {
        console.error('Failed to get local media:', error)
      }
    }

    getLocalStream()

    return () => {
      localVideoTrack?.stop()
      localAudioTrack?.stop()
    }
  }, [isVideoEnabled, isAudioEnabled])

  // Calculate grid layout
  const participantCount = participants.length || 1
  const gridCols = participantCount <= 1 ? 1 : participantCount <= 4 ? 2 : 3
  const gridRows = Math.ceil(participantCount / gridCols)

  return (
    <div className="h-full w-full overflow-hidden rounded-lg bg-gray-800">
      {participants.length === 0 ? (
        // Waiting state
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-700">
              <svg
                className="h-10 w-10 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-400">Waiting for participants...</p>
          </div>
        </div>
      ) : (
        // Video grid
        <div
          className="grid h-full w-full gap-2 p-2"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          }}
        >
          {/* Local participant */}
          <div className="relative overflow-hidden rounded-lg bg-gray-700">
            {isVideoEnabled && localVideoTrack ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                    <span className="text-xl font-semibold text-white">You</span>
                  </div>
                  <p className="text-sm text-gray-400">Camera Off</p>
                </div>
              </div>
            )}

            {/* Status indicators */}
            <div className="absolute bottom-2 left-2 flex gap-2">
              <span className="rounded bg-black/50 px-2 py-1 text-xs text-white">You</span>
              {!isAudioEnabled && (
                <span className="rounded bg-red-600/80 px-2 py-1 text-xs text-white">Muted</span>
              )}
              {isScreenSharing && (
                <span className="rounded bg-green-600/80 px-2 py-1 text-xs text-white">
                  Sharing
                </span>
              )}
            </div>
          </div>

          {/* Remote participants */}
          {participants
            .filter(p => p.name !== 'Anonymous')
            .map(participant => (
              <div key={participant.id} className="relative overflow-hidden rounded-lg bg-gray-700">
                {/* Remote video placeholder - in a real implementation, 
                  you'd attach the remote video track here */}
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
                      <span className="text-xl font-semibold text-white">
                        {participant.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{participant.name}</p>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="absolute bottom-2 left-2 flex gap-2">
                  <span className="rounded bg-black/50 px-2 py-1 text-xs text-white">
                    {participant.name}
                  </span>
                  {!participant.isAudioEnabled && (
                    <span className="rounded bg-red-600/80 px-2 py-1 text-xs text-white">
                      Muted
                    </span>
                  )}
                  {participant.isScreenSharing && (
                    <span className="rounded bg-green-600/80 px-2 py-1 text-xs text-white">
                      Sharing
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
