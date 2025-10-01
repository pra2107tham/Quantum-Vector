import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary from environment variables (server-side only)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

type GenerateHlsUrlParams = {
  publicId: string
  expiresInSeconds?: number
  streamingProfile?: 'hd' | 'full_hd' | 'auto'
}

export function generateSignedHlsUrl({
  publicId,
  expiresInSeconds = 300,
  streamingProfile = 'hd',
}: GenerateHlsUrlParams): { url: string; expiresAt: number } {
  const now = Math.floor(Date.now() / 1000)
  const expiresAt = now + Math.max(60, expiresInSeconds)

  // Build a signed HLS playlist URL for the video asset
  // Note: format m3u8 and streaming_profile selects adaptive bitrate rendition
  const url = cloudinary.url(publicId, {
    resource_type: 'video',
    type: 'upload',
    sign_url: true,
    expires_at: expiresAt,
    format: 'm3u8',
    transformation: [
      streamingProfile === 'auto'
        ? { streaming_profile: 'auto' }
        : streamingProfile === 'full_hd'
          ? { streaming_profile: 'full_hd' }
          : { streaming_profile: 'hd' },
    ],
  })

  return { url, expiresAt }
}


