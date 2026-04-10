'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  MessageSquare,
  BatteryLow,
  PictureInPicture,
} from 'lucide-react'

const LABELS_ZH = {
  quickCheck: '随堂小测',
  takeQuiz: '开始答题',
  skipForNow: '暂不答题',
  skipWithNote: '跳过并备注',
  play: '播放',
  pause: '暂停',
  speed: '倍速',
  fullscreen: '全屏',
  pip: '画中画',
  quality: '画质',
  auto: '自动',
}

interface VideoPlayerProps {
  videoUrl: string
  title: string
  onProgress?: (progress: { currentTime: number; duration: number; percentage: number }) => void
  onQuizTrigger?: (timestamp: number) => void
  onQuizSkip?: (timestamp: number, note?: string) => void
  onPlay?: (videoSeconds: number) => void
  onPause?: (videoSeconds: number) => void
  onSeek?: (fromTime: number, toTime: number) => void
  onComplete?: () => void
  quizTimestamps?: number[]
  videoVariants?: Record<string, string>
  locale?: 'zh' | 'en'
}

export function VideoPlayer({
  videoUrl,
  title,
  onProgress,
  onQuizTrigger,
  onQuizSkip,
  onPlay,
  onPause,
  onSeek,
  onComplete,
  quizTimestamps = [],
  videoVariants,
  locale = 'zh',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const labels =
    locale === 'zh'
      ? LABELS_ZH
      : {
          quickCheck: 'Quick Check!',
          takeQuiz: 'Take Quiz',
          skipForNow: 'Skip for Now',
          skipWithNote: 'Skip with note',
          play: 'Play',
          pause: 'Pause',
          speed: 'Speed',
          fullscreen: 'Fullscreen',
          pip: 'Picture-in-picture',
          quality: 'Quality',
          auto: 'Auto',
        }

  const variantKeys = videoVariants
    ? Object.keys(videoVariants).sort((a, b) => parseInt(b, 10) - parseInt(a, 10))
    : []
  const [currentQuality, setCurrentQuality] = useState<string>(variantKeys[0] ?? 'auto')
  const effectiveUrl =
    currentQuality === 'auto' || !videoVariants?.[currentQuality]
      ? videoUrl
      : videoVariants[currentQuality]

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [showQuizPrompt, setShowQuizPrompt] = useState(false)
  const [quizTimestamp, setQuizTimestamp] = useState<number | null>(null)
  const [skipNote, setSkipNote] = useState('')
  const [watchedSegments, setWatchedSegments] = useState<Set<number>>(new Set())
  const [showControls, setShowControls] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [lowBattery, setLowBattery] = useState(false)
  const [pipActive, setPipActive] = useState(false)
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const touchStartX = useRef(0)

  // Track which quiz timestamps have been triggered
  const triggeredQuizzes = useRef<Set<number>>(new Set())

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    setIsMobile(mq.matches)
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('getBattery' in navigator)) return
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{
        level: number
        addEventListener?: (e: string, fn: () => void) => void
      }>
    }
    nav
      .getBattery?.()
      .then(b => {
        setLowBattery(b.level < 0.2)
        b.addEventListener?.('levelchange', () => setLowBattery(b.level < 0.2))
      })
      .catch(() => {
        // Battery API not supported or permission denied - ignore silently
      })
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)

      // Track watched segments (every 5 seconds)
      const segment = Math.floor(video.currentTime / 5)
      setWatchedSegments(prev => new Set([...prev, segment]))

      // Call progress callback
      onProgress?.({
        currentTime: video.currentTime,
        duration: video.duration || 0,
        percentage: video.duration ? (video.currentTime / video.duration) * 100 : 0,
      })

      // Check for quiz triggers
      quizTimestamps.forEach(timestamp => {
        if (
          Math.abs(video.currentTime - timestamp) < 0.5 &&
          !triggeredQuizzes.current.has(timestamp)
        ) {
          triggeredQuizzes.current.add(timestamp)
          video.pause()
          setIsPlaying(false)
          setQuizTimestamp(timestamp)
          setShowQuizPrompt(true)
          onQuizTrigger?.(timestamp)
        }
      })
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onProgress, onQuizTrigger, onComplete, quizTimestamps])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
      onPause?.(video.currentTime)
    } else {
      video.play()
      onPlay?.(video.currentTime)
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, onPlay, onPause])

  const handleSeek = (value: number) => {
    const video = videoRef.current
    if (!video) return

    const fromTime = video.currentTime
    const newTime = (value / 100) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
    onSeek?.(fromTime, newTime)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current
    if (!video) return

    video.volume = value
    setVolume(value)
    setIsMuted(value === 0)
  }

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      container.requestFullscreen()
    }
  }

  const togglePiP = useCallback(async () => {
    const video = videoRef.current
    if (!video || !document.pictureInPictureEnabled) return
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
        setPipActive(false)
      } else {
        await video.requestPictureInPicture()
        setPipActive(true)
      }
    } catch {
      setPipActive(false)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onEnterPiP = () => setPipActive(true)
    const onLeavePiP = () => setPipActive(false)
    video.addEventListener('enterpictureinpicture', onEnterPiP)
    video.addEventListener('leavepictureinpicture', onLeavePiP)
    return () => {
      video.removeEventListener('enterpictureinpicture', onEnterPiP)
      video.removeEventListener('leavepictureinpicture', onLeavePiP)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const video = videoRef.current
      if (!video) return
      switch (e.key) {
        case ' ':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowLeft':
          e.preventDefault()
          skip(-10)
          break
        case 'ArrowRight':
          e.preventDefault()
          skip(10)
          break
        case 'ArrowUp':
          e.preventDefault()
          handleVolumeChange(Math.min(1, volume + 0.1))
          break
        case 'ArrowDown':
          e.preventDefault()
          handleVolumeChange(Math.max(0, volume - 0.1))
          break
        default:
          break
      }
    }
    container.setAttribute('tabIndex', '0')
    container.addEventListener('keydown', onKeyDown)
    return () => container.removeEventListener('keydown', onKeyDown)
  }, [volume, togglePlay])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0
  const watchProgress = duration ? ((watchedSegments.size * 5) / duration) * 100 : 0

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    if (isMobile) setShowControls(c => !c)
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50 && duration) {
      const video = videoRef.current
      if (video) {
        const delta = dx > 0 ? 10 : -10
        video.currentTime = Math.max(0, Math.min(duration, video.currentTime + delta))
      }
    }
  }

  const controlsOpacity = isMobile ? (showControls ? 1 : 0) : undefined

  return (
    <div ref={containerRef} className="group relative overflow-hidden rounded-lg bg-black">
      {/* Video: portrait-friendly on narrow screens */}
      <div className="aspect-video max-h-[70vh] w-full sm:aspect-video sm:max-h-none">
        <video
          ref={videoRef}
          src={effectiveUrl}
          className="h-full w-full object-contain"
          onClick={() => (isMobile ? setShowControls(c => !c) : togglePlay())}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          playsInline
        />
      </div>

      {/* Battery-aware hint */}
      {lowBattery && isPlaying && (
        <div className="absolute left-2 right-2 top-2 z-10 flex items-center gap-2 rounded bg-black/70 px-3 py-2 text-sm text-white">
          <BatteryLow className="h-4 w-4 shrink-0" />
          <span>省电：可降低播放速度或亮度以节省电量</span>
        </div>
      )}

      {/* Quiz Prompt Overlay - Chinese localized */}
      {showQuizPrompt && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-center">
            <MessageSquare className="mx-auto mb-4 h-12 w-12 text-blue-500" />
            <h3 className="mb-2 text-xl font-bold">{labels.quickCheck}</h3>
            <p className="mb-4 text-gray-600">
              {locale === 'zh'
                ? '来检验一下刚才的内容吧。'
                : "Let's test your understanding of what you just watched."}
            </p>
            {onQuizSkip && (
              <div className="mb-4">
                <label className="mb-1 block text-left text-sm text-gray-600">
                  {locale === 'zh' ? '跳过备注（可选）' : 'Skip note (optional)'}
                </label>
                <textarea
                  value={skipNote}
                  onChange={e => setSkipNote(e.target.value.slice(0, 300))}
                  placeholder={locale === 'zh' ? '例如：稍后再做' : 'e.g. Do later'}
                  className="min-h-[44px] w-full rounded-md border px-3 py-2 text-sm"
                  rows={2}
                />
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                className="touch-target min-h-[44px]"
                onClick={() => {
                  if (quizTimestamp != null && onQuizSkip)
                    onQuizSkip(quizTimestamp, skipNote || undefined)
                  setShowQuizPrompt(false)
                  setSkipNote('')
                  videoRef.current?.play()
                  setIsPlaying(true)
                }}
              >
                {onQuizSkip && skipNote ? labels.skipWithNote : labels.skipForNow}
              </Button>
              <Button
                className="touch-target min-h-[44px]"
                onClick={() => {
                  setShowQuizPrompt(false)
                  setSkipNote('')
                  if (quizTimestamp != null) onQuizTrigger?.(quizTimestamp)
                }}
              >
                {labels.takeQuiz}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Controls: bottom-sheet style on mobile, hover on desktop */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 ${
          isMobile ? 'pb-safe rounded-t-xl' : ''
        }`}
        style={controlsOpacity !== undefined ? { opacity: controlsOpacity } : undefined}
      >
        {/* Progress Bar - touch-friendly thumb on mobile */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={e => handleSeek(Number(e.target.value))}
            className="h-2 w-full cursor-pointer touch-manipulation appearance-none rounded-lg bg-gray-600 py-2 accent-blue-500 sm:h-1 sm:py-0 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 sm:[&::-webkit-slider-thumb]:h-3 sm:[&::-webkit-slider-thumb]:w-3"
          />
          <div className="mt-1 flex justify-between text-xs text-white">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play/Pause - touch 44px on mobile */}
            <Button
              variant="ghost"
              size={isMobile ? 'icon-touch' : 'icon'}
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            {/* Skip Buttons */}
            <Button
              variant="ghost"
              size={isMobile ? 'icon-touch' : 'icon'}
              onClick={() => skip(-10)}
              className="text-white hover:bg-white/20"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size={isMobile ? 'icon-touch' : 'icon'}
              onClick={() => skip(10)}
              className="text-white hover:bg-white/20"
            >
              <SkipForward className="h-5 w-5" />
            </Button>

            {/* Volume - hide slider on small mobile */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size={isMobile ? 'icon-touch' : 'icon'}
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={e => handleVolumeChange(Number(e.target.value))}
                className="hidden h-1 w-20 cursor-pointer appearance-none rounded-lg bg-gray-600 accent-white sm:block"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Playback Speed - touch target on mobile */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className={`text-white hover:bg-white/20 ${isMobile ? 'min-h-[44px] min-w-[44px]' : ''}`}
              >
                <Settings className="mr-1 h-4 w-4" />
                {playbackRate}x
              </Button>

              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 min-w-[100px] rounded-lg bg-black/90 p-2">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => changePlaybackRate(rate)}
                      className={`block flex min-h-[44px] w-full items-center rounded px-3 py-2 text-left text-sm sm:min-h-0 sm:py-1 ${
                        playbackRate === rate
                          ? 'bg-blue-500 text-white'
                          : 'text-white hover:bg-white/20'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Picture-in-picture */}
            {typeof document !== 'undefined' && document.pictureInPictureEnabled && (
              <Button
                variant="ghost"
                size={isMobile ? 'icon-touch' : 'icon'}
                onClick={togglePiP}
                className="text-white hover:bg-white/20"
                title={labels.pip}
              >
                <PictureInPicture className={`h-5 w-5 ${pipActive ? 'text-blue-400' : ''}`} />
              </Button>
            )}

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size={isMobile ? 'icon-touch' : 'icon'}
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
              title={labels.fullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quality selector - when videoVariants provided */}
      {variantKeys.length > 0 && (
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowQualityMenu(q => !q)
              setShowSettings(false)
            }}
            className="text-white hover:bg-white/20"
          >
            {labels.quality} {currentQuality === 'auto' ? labels.auto : currentQuality + 'p'}
          </Button>
          {showQualityMenu && (
            <div className="absolute right-0 top-full mt-1 min-w-[80px] rounded bg-black/90 p-2">
              {['auto', ...variantKeys].map(q => (
                <button
                  key={q}
                  onClick={() => {
                    setCurrentQuality(q)
                    setShowQualityMenu(false)
                  }}
                  className={`block w-full rounded px-2 py-1 text-left text-sm text-white ${
                    currentQuality === q ? 'bg-blue-500' : 'hover:bg-white/20'
                  }`}
                >
                  {q === 'auto' ? labels.auto : q + 'p'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quiz Markers on Progress Bar */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gray-800">
        {quizTimestamps.map((timestamp, index) => (
          <div
            key={index}
            className="absolute top-0 h-full w-1 bg-yellow-500"
            style={{ left: `${(timestamp / duration) * 100}%` }}
            title={`Quiz at ${formatTime(timestamp)}`}
          />
        ))}
      </div>
    </div>
  )
}
