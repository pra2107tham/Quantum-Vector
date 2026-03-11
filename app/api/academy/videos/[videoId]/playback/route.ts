import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSignedHlsUrl } from '@/lib/cloudinary'
import { v2 as cloudinary } from 'cloudinary'

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await context.params
  console.log('🎬 Playback API called for videoId:', videoId)
  
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log('👤 User:', user ? `${user.email} (${user.id})` : 'Not authenticated')

  // Fetch video with course to validate access rules
  const { data: video, error: videoError } = await supabase
    .from('videos')
    .select(
      `id, course_id, is_free_preview, cloudinary_public_id,
       courses(id, title)`
    )
    .eq('id', videoId)
    .single()

  console.log('📹 Video query result:', { video, videoError })

  if (videoError || !video) {
    console.log('❌ Video not found:', videoError)
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  if (!video.cloudinary_public_id) {
    console.log('❌ No Cloudinary public ID for video:', video.id)
    return NextResponse.json({ error: 'Video not yet available' }, { status: 409 })
  }

  console.log('🔐 Checking access for video:', {
    isFreePreview: video.is_free_preview,
    hasUser: !!user,
    cloudinaryId: video.cloudinary_public_id
  })

  // Optional: verify resource exists in Cloudinary (debug aid)
  try {
    const info = await cloudinary.api.resource(video.cloudinary_public_id, { resource_type: 'video' })
    console.log('🧾 Cloudinary asset found:', {
      public_id: info.public_id,
      resource_type: info.resource_type,
      type: info.type,
      format: info.format,
      bytes: info.bytes,
      secure_url_sample: (info.secure_url || '').slice(0, 100) + '...'
    })
  } catch (e: unknown) {
    const err = e as { error?: string; message?: string } | null
    console.log('⚠️ Cloudinary lookup failed for public_id:', video.cloudinary_public_id, 'error:', err?.error || err?.message || e)
  }

  // Access control
  if (!video.is_free_preview) {
    if (!user) {
      console.log('❌ Authentication required for premium video')
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', video.course_id)
      .eq('payment_status', 'completed')
      .single()

    console.log('🎓 Enrollment check:', { enrollment, courseId: video.course_id })

    if (!enrollment) {
      console.log('❌ Access denied - no enrollment')
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
  }

  // Generate a short-lived signed HLS URL
  console.log('🔗 Generating signed URL for:', video.cloudinary_public_id)
  const { url, expiresAt } = generateSignedHlsUrl({
    publicId: video.cloudinary_public_id,
    expiresInSeconds: 300,
    streamingProfile: 'hd',
  })

  console.log('✅ Generated playback URL:', { url: url.substring(0, 100) + '...', expiresAt })
  return NextResponse.json({ playbackUrl: url, expiresAt })
}


