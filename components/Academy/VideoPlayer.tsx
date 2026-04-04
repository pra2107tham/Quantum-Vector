"use client"

import Hls from 'hls.js'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaBackward, FaForward } from 'react-icons/fa'

type VideoPlayerProps = {
  videoId: string
  title: string
  isPremium: boolean
  watermarkText?: string
  showTitleOverlay?: boolean
}

export default function VideoPlayer({ videoId, title, isPremium, watermarkText, showTitleOverlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [lastSavedProgress, setLastSavedProgress] = useState(0)
  const [isSavingProgress, setIsSavingProgress] = useState(false)

  useEffect(() => {
    let hls: Hls | null = null
    let cancelled = false

    async function setup() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/academy/videos/${videoId}/playback`, { cache: 'no-store' })

        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body?.error || `Failed to get playback URL (${res.status})`)
        }
        const data = await res.json()
        if (cancelled) return
        setPlaybackUrl(data.playbackUrl)

        const videoEl = videoRef.current
        if (!videoEl) return

        if (Hls.isSupported()) {
          hls = new Hls({
            maxBufferLength: 60,
            enableWorker: true,
            lowLatencyMode: true,
          })

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setLoading(false)
          })

          hls.on(Hls.Events.ERROR, (_event, data) => {
            if (data.fatal) {
              setError(`Playback error: ${data.details || 'Unknown error'}. Please refresh the page.`)
            }
          })

          hls.loadSource(data.playbackUrl)
          hls.attachMedia(videoEl)
        } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
          videoEl.src = data.playbackUrl
          videoEl.addEventListener('loadedmetadata', () => {
            setLoading(false)
          }, { once: true })
          videoEl.addEventListener('error', () => {
            setError('Native video playback error')
          }, { once: true })
        } else {
          setError('Your browser does not support HLS playback.')
        }
      } catch (e: unknown) {
        setError((e as Error)?.message || 'Failed to initialize player')
      } finally {
        setLoading(false)
      }
    }

    setup()

    return () => {
      cancelled = true
      if (hls) {
        try { hls.destroy() } catch { /* noop */ }
      }
    }
  }, [videoId])

  // Load existing progress on mount
  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await fetch(`/api/academy/video-progress?videoId=${videoId}`)
        if (res.ok) {
          const data = await res.json()
          if (data.progress && data.progress.progress_seconds > 0) {
            setCurrentTime(data.progress.progress_seconds)
            setLastSavedProgress(data.progress.progress_seconds)
            const el = videoRef.current
            if (el && el.duration > 0) {
              el.currentTime = data.progress.progress_seconds
            }
          }
        }
      } catch (e) {
        console.log('Could not load progress:', e)
      }
    }
    loadProgress()
  }, [videoId])

  const saveProgress = useCallback(async (progressSeconds: number, completed: boolean = false) => {
    if (isSavingProgress || Math.abs(progressSeconds - lastSavedProgress) < 5) return

    setIsSavingProgress(true)
    try {
      const res = await fetch('/api/academy/video-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId,
          progressSeconds: Math.floor(progressSeconds),
          completed
        })
      })
      if (res.ok) {
        setLastSavedProgress(progressSeconds)
      }
    } catch (e) {
      console.log('Could not save progress:', e)
    } finally {
      setIsSavingProgress(false)
    }
  }, [videoId, isSavingProgress, lastSavedProgress])

  // Wire up element events for UI state
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const onLoaded = () => {
      setDuration(el.duration || 0)
      setVolume(el.volume)
      setMuted(el.muted)
    }
    const onTime = () => {
      const time = el.currentTime || 0
      setCurrentTime(time)

      if (time - lastSavedProgress >= 15) {
        saveProgress(time, false)
      }
    }
    const onPlay = () => setIsPlaying(true)
    const onPause = () => {
      setIsPlaying(false)
      saveProgress(el.currentTime || 0, false)
    }
    const onEnded = () => {
      setIsPlaying(false)
      saveProgress(el.duration || 0, true)
    }

    el.addEventListener('loadedmetadata', onLoaded)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onEnded)

    return () => {
      el.removeEventListener('loadedmetadata', onLoaded)
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnded)
    }
  }, [playbackUrl, lastSavedProgress, saveProgress])

  function formatTime(totalSeconds: number) {
    const sec = Math.max(0, Math.floor(totalSeconds || 0))
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${m}:${String(s).padStart(2, '0')}`
  }

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  const seekBy = (deltaSeconds: number) => {
    const el = videoRef.current
    if (!el) return
    const next = Math.min(Math.max(0, (el.currentTime || 0) + deltaSeconds), el.duration || Infinity)
    el.currentTime = next
    setCurrentTime(next)
  }

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = videoRef.current
    if (!el) return
    const value = Number(e.target.value)
    el.currentTime = value
    setCurrentTime(value)
  }

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = videoRef.current
    if (!el) return
    const value = Number(e.target.value)
    el.volume = value
    setVolume(value)
    if (value > 0 && el.muted) {
      el.muted = false
      setMuted(false)
    }
  }

  const toggleMute = () => {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  const onRate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const el = videoRef.current
    if (!el) return
    const rate = Number(e.target.value)
    el.playbackRate = rate
    setPlaybackRate(rate)
  }

  const goFullscreen = () => {
    const el = videoRef.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else {
      el.requestFullscreen?.().catch(() => {})
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isTyping = !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (isTyping) return

      if (e.code === 'Space' || e.key.toLowerCase() === 'k') {
        e.preventDefault()
        togglePlay()
      } else if (e.key.toLowerCase() === 'j') {
        seekBy(-10)
      } else if (e.key.toLowerCase() === 'l') {
        seekBy(10)
      } else if (e.key === 'ArrowLeft') {
        seekBy(-5)
      } else if (e.key === 'ArrowRight') {
        seekBy(5)
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute()
      } else if (e.key.toLowerCase() === 'f') {
        goFullscreen()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const el = videoRef.current
        if (!el) return
        const v = Math.min(1, (el.volume || 0) + 0.05)
        el.volume = v
        setVolume(v)
        if (v > 0 && el.muted) { el.muted = false; setMuted(false) }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const el = videoRef.current
        if (!el) return
        const v = Math.max(0, (el.volume || 0) - 0.05)
        el.volume = v
        setVolume(v)
        if (v === 0) { el.muted = true; setMuted(true) }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <div className="relative">
      <div className="aspect-video w-full bg-black">
        <video
          ref={videoRef}
          className="h-full w-full"
          controls={false}
          playsInline
          preload="metadata"
          onContextMenu={onContextMenu}
          onClick={togglePlay}
        />
      </div>

      {isPremium && watermarkText && (
        <div className="pointer-events-none absolute left-4 top-4 rounded bg-black/30 px-2 py-1 text-xs font-medium text-white">
          {watermarkText}
        </div>
      )}

      {/* Controls overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
        {showTitleOverlay && (
          <div className="pointer-events-auto m-4 self-start rounded bg-black/40 px-2 py-1 text-xs text-white">
            {title}
          </div>
        )}

        <div className="pointer-events-auto w-full bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs tabular-nums text-white/80 w-14 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={Math.max(1, duration)}
              step={0.1}
              value={Math.min(currentTime, duration)}
              onChange={onSeek}
              className="h-1 w-full cursor-pointer appearance-none rounded bg-white/30 accent-blue-500"
            />
            <span className="text-xs tabular-nums text-white/80 w-14">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-3 text-white">
            <button onClick={() => seekBy(-10)} className="rounded bg-white/10 p-2 hover:bg-white/20" aria-label="Seek backward 10 seconds">
              <FaBackward />
            </button>
            <button onClick={togglePlay} className="rounded bg-white/10 p-2 hover:bg-white/20" aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={() => seekBy(10)} className="rounded bg-white/10 p-2 hover:bg-white/20" aria-label="Seek forward 10 seconds">
              <FaForward />
            </button>

            <button onClick={toggleMute} className="rounded bg-white/10 p-2 hover:bg-white/20" aria-label={muted ? 'Unmute' : 'Mute'}>
              {muted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={onVolume}
              className="h-1 w-28 cursor-pointer appearance-none rounded bg-white/30 accent-blue-500"
            />

            <div className="ml-auto flex items-center gap-2">
              <label className="text-xs text-white/70">Speed</label>
              <select
                value={playbackRate}
                onChange={onRate}
                className="rounded bg-white/10 px-2 py-1 text-xs text-white hover:bg-white/20"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={1.75}>1.75x</option>
                <option value={2}>2x</option>
              </select>

              <button onClick={goFullscreen} className="rounded bg-white/10 p-2 hover:bg-white/20" aria-label="Fullscreen">
                <FaExpand />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded bg-black/60 px-4 py-2 text-sm text-white">Loading video...</div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-md rounded bg-black/70 p-4 text-center text-red-200">
            <div className="mb-1 text-white">Playback error</div>
            <div className="text-sm">{error}</div>
          </div>
        </div>
      )}
    </div>
  )
}
