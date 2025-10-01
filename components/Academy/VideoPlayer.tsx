"use client"

import Hls from 'hls.js'
import { useEffect, useRef, useState } from 'react'

type VideoPlayerProps = {
  videoId: string
  title: string
  isPremium: boolean
  watermarkText?: string
}

export default function VideoPlayer({ videoId, title, isPremium, watermarkText }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null)

  useEffect(() => {
    let hls: Hls | null = null
    let cancelled = false

    async function setup() {
      setLoading(true)
      setError(null)

      try {
        console.log('🎬 VideoPlayer: Fetching playback URL for videoId:', videoId)
        const res = await fetch(`/api/academy/videos/${videoId}/playback`, { cache: 'no-store' })
        console.log('🎬 VideoPlayer: Response status:', res.status, res.statusText)
        
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          console.log('🎬 VideoPlayer: Error response body:', body)
          throw new Error(body?.error || `Failed to get playback URL (${res.status})`)
        }
        const data = await res.json()
        console.log('🎬 VideoPlayer: Success response:', { hasPlaybackUrl: !!data.playbackUrl, expiresAt: data.expiresAt })
        if (cancelled) return
        setPlaybackUrl(data.playbackUrl)

        const videoEl = videoRef.current
        if (!videoEl) return

        if (Hls.isSupported()) {
          console.log('🎬 VideoPlayer: Using HLS.js for playback')
          hls = new Hls({
            maxBufferLength: 60,
            enableWorker: true,
            lowLatencyMode: true,
          })
          
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            console.log('🎬 VideoPlayer: Media attached to HLS')
          })
          
          hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
            console.log('🎬 VideoPlayer: Manifest parsed, levels:', data.levels?.length || 0)
            setLoading(false)
          })
          
          hls.on(Hls.Events.ERROR, (event, data) => {
            console.log('🎬 VideoPlayer: HLS Error:', {
              type: data.type,
              details: data.details,
              fatal: data.fatal,
              error: data.error
            })
            if (data.fatal) {
              setError(`Playback error: ${data.details || 'Unknown error'}. Please refresh the page.`)
            }
          })
          
          hls.loadSource(data.playbackUrl)
          hls.attachMedia(videoEl)
        } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
          console.log('🎬 VideoPlayer: Using native HLS (Safari)')
          videoEl.src = data.playbackUrl
          videoEl.addEventListener('loadedmetadata', () => {
            console.log('🎬 VideoPlayer: Native HLS metadata loaded')
            setLoading(false)
          }, { once: true })
          videoEl.addEventListener('error', (e) => {
            console.log('🎬 VideoPlayer: Native video error:', e)
            setError('Native video playback error')
          }, { once: true })
        } else {
          console.log('🎬 VideoPlayer: HLS not supported')
          setError('Your browser does not support HLS playback.')
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to initialize player')
      } finally {
        setLoading(false)
      }
    }

    setup()

    return () => {
      cancelled = true
      if (hls) {
        try { hls.destroy() } catch {}
      }
    }
  }, [videoId])

  // Deterrence against casual downloads
  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <div className="relative">
      <div className="aspect-video w-full bg-black">
        <video
          ref={videoRef}
          className="h-full w-full"
          controls
          playsInline
          preload="metadata"
          onContextMenu={onContextMenu}
        />
      </div>

      {isPremium && watermarkText && (
        <div className="pointer-events-none absolute left-4 top-4 rounded bg-black/30 px-2 py-1 text-xs font-medium text-white">
          {watermarkText}
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded bg-black/60 px-4 py-2 text-sm text-white">Loading video…</div>
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


