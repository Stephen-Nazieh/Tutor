'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useDailyCall } from '@/hooks/use-daily-call'
import {
  Loader2,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Settings2,
  Users,
  Video,
  VideoOff,
  Wifi,
} from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DailyVideoFrameProps {
  roomUrl: string
  token?: string | null
  className?: string
  autoRecord?: boolean
}

export function DailyVideoFrame({ roomUrl, token, className, autoRecord }: DailyVideoFrameProps) {
  const {
    call,
    isJoined,
    join,
    leave,
    toggleAudio,
    toggleVideo,
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
    startRecording,
    participants,
  } = useDailyCall()
  const joinedRef = useRef(false)
  const recordingRef = useRef(false)

  useEffect(() => {
    if (!roomUrl || joinedRef.current) return
    joinedRef.current = true
    join(roomUrl, token || undefined)

    return () => {
      joinedRef.current = false
      recordingRef.current = false
    }
  }, [roomUrl, token, join, leave])

  useEffect(() => {
    if (isJoined && autoRecord && !recordingRef.current && call) {
      recordingRef.current = true
      // Short delay to ensure room is fully initialized before starting recording
      setTimeout(() => {
        try {
          startRecording()
        } catch (err) {
          console.error('Failed to auto-start recording', err)
        }
      }, 3000)
    }
  }, [isJoined, autoRecord, call, startRecording])

  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null)
  const [devicesOpen, setDevicesOpen] = useState(false)
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([])
  const [videoInputs, setVideoInputs] = useState<MediaDeviceInfo[]>([])
  const [audioOutputs, setAudioOutputs] = useState<MediaDeviceInfo[]>([])
  const [audioInputId, setAudioInputId] = useState<string>('')
  const [videoInputId, setVideoInputId] = useState<string>('')
  const [audioOutputId, setAudioOutputId] = useState<string>('')
  const [isRefreshingDevices, setIsRefreshingDevices] = useState(false)

  useEffect(() => {
    if (!call) return
    const handler = (e: any) => {
      const id = e?.activeSpeaker?.peerId || e?.activeSpeaker?.session_id || null
      setActiveSpeakerId(id)
    }
    call.on('active-speaker-change', handler)
    return () => {
      call.off('active-speaker-change', handler)
    }
  }, [call])

  const refreshDevices = async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) return
    setIsRefreshingDevices(true)
    try {
      const first = await navigator.mediaDevices.enumerateDevices()
      const hasLabels = first.some(d => !!d.label)
      if (!hasLabels) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
          stream.getTracks().forEach(t => t.stop())
        } catch {}
      }

      const list = await navigator.mediaDevices.enumerateDevices()
      const audIn = list.filter(d => d.kind === 'audioinput')
      const vidIn = list.filter(d => d.kind === 'videoinput')
      const audOut = list.filter(d => d.kind === 'audiooutput')

      setAudioInputs(audIn)
      setVideoInputs(vidIn)
      setAudioOutputs(audOut)

      if (!audioInputId && audIn[0]?.deviceId) setAudioInputId(audIn[0].deviceId)
      if (!videoInputId && vidIn[0]?.deviceId) setVideoInputId(vidIn[0].deviceId)
      if (!audioOutputId && audOut[0]?.deviceId) setAudioOutputId(audOut[0].deviceId)
    } finally {
      setIsRefreshingDevices(false)
    }
  }

  useEffect(() => {
    if (!devicesOpen) return
    void refreshDevices()
  }, [devicesOpen])

  useEffect(() => {
    if (!call) return
    const fn = (call as any).setInputDevicesAsync || (call as any).setInputDevices
    if (!fn) return
    if (!audioInputId && !videoInputId) return
    Promise.resolve(
      fn.call(call, {
        audioDeviceId: audioInputId || undefined,
        videoDeviceId: videoInputId || undefined,
      })
    ).catch(() => {})
  }, [call, audioInputId, videoInputId])

  useEffect(() => {
    if (!call) return
    const fn = (call as any).setOutputDevice || (call as any).setAudioOutputDevice
    if (!fn) return
    if (!audioOutputId) return
    Promise.resolve(fn.call(call, audioOutputId)).catch(() => {})
  }, [call, audioOutputId])

  const dailyParticipants = useMemo(() => {
    if (!call) return []
    const map = call.participants() as Record<string, any>
    return Object.values(map)
  }, [call, participants])

  const localParticipant = useMemo(
    () => dailyParticipants.find((p: any) => p?.local),
    [dailyParticipants]
  )

  const remoteParticipants = useMemo(
    () => dailyParticipants.filter((p: any) => !p?.local),
    [dailyParticipants]
  )

  const screenShareParticipant = useMemo(() => {
    for (const p of dailyParticipants) {
      const state = (p as any)?.tracks?.screenVideo?.state
      if (state === 'playable') return p
    }
    return null
  }, [dailyParticipants])

  const mainTile = screenShareParticipant ?? remoteParticipants[0] ?? localParticipant ?? null

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

  const handleLeave = () => {
    leave()
    joinedRef.current = false
    recordingRef.current = false
    setActiveSpeakerId(null)
  }

  return (
    <div
      className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-black ${className || ''}`}
    >
      <div className="absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur">
        <Wifi className="h-4 w-4" />
        <span>Live</span>
        <span className="mx-1 h-1 w-1 rounded-full bg-white/60" />
        <Users className="h-4 w-4" />
        <span>{Math.max(1, dailyParticipants.length)}</span>
      </div>

      <div className="relative min-h-0 flex-1 p-3">
        <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-[1fr_260px]">
          <div className="relative min-h-0 overflow-hidden rounded-2xl bg-slate-950">
            {mainTile ? (
              <ParticipantMediaTile
                participant={mainTile}
                mode={screenShareParticipant ? 'screen' : 'camera'}
                isActiveSpeaker={activeSpeakerId === (mainTile as any)?.session_id}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/70">
                Waiting for participants...
              </div>
            )}
          </div>

          <div className="min-h-0 overflow-hidden rounded-2xl bg-slate-950/70">
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs font-semibold text-white/80">
              <span>Participants</span>
              <span>{Math.max(1, dailyParticipants.length)}</span>
            </div>
            <div className="h-full overflow-auto p-2">
              <div className="grid grid-cols-1 gap-2">
                {localParticipant && <ParticipantRow participant={localParticipant} label="You" />}
                {remoteParticipants.map((p: any) => (
                  <ParticipantRow key={p.session_id} participant={p} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {remoteParticipants.map((p: any) => (
          <ParticipantAudio key={`${p.session_id}-audio`} participant={p} />
        ))}
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/80 px-3 py-2 backdrop-blur">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <ControlButton
            onClick={toggleAudio}
            active={isAudioEnabled}
            activeIcon={<Mic className="h-4 w-4" />}
            inactiveIcon={<MicOff className="h-4 w-4" />}
            activeLabel="Mic"
            inactiveLabel="Mic"
          />
          <ControlButton
            onClick={toggleVideo}
            active={isVideoEnabled}
            activeIcon={<Video className="h-4 w-4" />}
            inactiveIcon={<VideoOff className="h-4 w-4" />}
            activeLabel="Cam"
            inactiveLabel="Cam"
          />
          <ControlButton
            onClick={() => (isScreenSharing ? stopScreenShare() : startScreenShare())}
            active={isScreenSharing}
            activeIcon={<MonitorUp className="h-4 w-4" />}
            inactiveIcon={<MonitorUp className="h-4 w-4" />}
            activeLabel="Sharing"
            inactiveLabel="Share"
          />
          <button
            type="button"
            onClick={handleLeave}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-red-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-500"
          >
            <PhoneOff className="h-4 w-4" />
            Leave
          </button>

          <Popover open={devicesOpen} onOpenChange={setDevicesOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-white/15"
              >
                <Settings2 className="h-4 w-4" />
                Devices
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-[360px] rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">Device settings</div>
                <button
                  type="button"
                  onClick={() => void refreshDevices()}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  disabled={isRefreshingDevices}
                >
                  {isRefreshingDevices ? 'Refreshing…' : 'Refresh'}
                </button>
              </div>

              <div className="mt-3 grid gap-3">
                <div className="grid gap-1">
                  <div className="text-xs font-semibold text-slate-600">Microphone</div>
                  <Select value={audioInputId} onValueChange={setAudioInputId}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select microphone" />
                    </SelectTrigger>
                    <SelectContent>
                      {audioInputs.map(d => (
                        <SelectItem key={d.deviceId} value={d.deviceId}>
                          {d.label || 'Microphone'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1">
                  <div className="text-xs font-semibold text-slate-600">Camera</div>
                  <Select value={videoInputId} onValueChange={setVideoInputId}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select camera" />
                    </SelectTrigger>
                    <SelectContent>
                      {videoInputs.map(d => (
                        <SelectItem key={d.deviceId} value={d.deviceId}>
                          {d.label || 'Camera'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1">
                  <div className="text-xs font-semibold text-slate-600">Speaker</div>
                  <Select value={audioOutputId} onValueChange={setAudioOutputId}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select speaker" />
                    </SelectTrigger>
                    <SelectContent>
                      {audioOutputs.length > 0 ? (
                        audioOutputs.map(d => (
                          <SelectItem key={d.deviceId} value={d.deviceId}>
                            {d.label || 'Speaker'}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="__na__" disabled>
                          Not supported in this browser
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

function ControlButton({
  onClick,
  active,
  activeIcon,
  inactiveIcon,
  activeLabel,
  inactiveLabel,
}: {
  onClick: () => void
  active: boolean
  activeIcon: ReactNode
  inactiveIcon: ReactNode
  activeLabel: string
  inactiveLabel: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold shadow-sm transition-colors ${
        active
          ? 'bg-white text-slate-900 hover:bg-white/90'
          : 'bg-white/10 text-white hover:bg-white/15'
      }`}
    >
      {active ? activeIcon : inactiveIcon}
      {active ? activeLabel : inactiveLabel}
    </button>
  )
}

function getTrack(participant: any, mode: 'camera' | 'screen') {
  const tracks = participant?.tracks
  if (!tracks) return null
  const key = mode === 'screen' ? 'screenVideo' : 'video'
  const t = tracks[key]
  if (!t) return null
  return t.persistentTrack || t.track || null
}

function ParticipantMediaTile({
  participant,
  mode,
  isActiveSpeaker,
}: {
  participant: any
  mode: 'camera' | 'screen'
  isActiveSpeaker: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const track = getTrack(participant, mode)
  const hasVideo = !!track

  useEffect(() => {
    if (!videoRef.current) return
    if (!track) {
      videoRef.current.srcObject = null
      return
    }
    const stream = new MediaStream([track])
    videoRef.current.srcObject = stream
    videoRef.current.play().catch(() => {})
  }, [track])

  const name = participant?.user_name || participant?.user_id || 'Participant'
  const initials = String(name)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((x: string) => x[0]?.toUpperCase())
    .join('')

  return (
    <div className="relative h-full w-full">
      {hasVideo ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={!!participant?.local}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-2xl font-semibold text-white">
            {initials || '?'}
          </div>
        </div>
      )}

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
        <div className="truncate rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          {participant?.local ? 'You' : name}
        </div>
        {isActiveSpeaker && (
          <div className="rounded-full bg-emerald-500/90 px-3 py-1.5 text-xs font-semibold text-white">
            Speaking
          </div>
        )}
      </div>
    </div>
  )
}

function ParticipantRow({ participant, label }: { participant: any; label?: string }) {
  const name = participant?.user_name || participant?.user_id || 'Participant'
  const isMuted = !participant?.audio
  const isCamOff = !participant?.video
  const isSharing = !!participant?.screen

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-white">
          {label ? `${label} · ${name}` : name}
        </div>
        <div className="mt-0.5 text-xs text-white/60">
          {isSharing ? 'Sharing screen' : 'In call'}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-white/70">
        {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        {isCamOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
      </div>
    </div>
  )
}

function ParticipantAudio({ participant }: { participant: any }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const track =
    participant?.tracks?.audio?.persistentTrack || participant?.tracks?.audio?.track || null

  useEffect(() => {
    if (!audioRef.current) return
    if (!track) {
      audioRef.current.srcObject = null
      return
    }
    const stream = new MediaStream([track])
    audioRef.current.srcObject = stream
    audioRef.current.play().catch(() => {})
  }, [track])

  return <audio ref={audioRef} autoPlay playsInline />
}
