import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSignedHlsUrl } from '@/lib/cloudinary'

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await context.params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: video, error: videoError } = await supabase
    .from('videos')
    .select(
      `id, course_id, is_free_preview, cloudinary_public_id,
       courses(id, title)`
    )
    .eq('id', videoId)
    .single()

  if (videoError || !video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  if (!video.cloudinary_public_id) {
    return NextResponse.json({ error: 'Video not yet available' }, { status: 409 })
  }

  // Access control
  if (!video.is_free_preview) {
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', video.course_id)
      .eq('payment_status', 'completed')
      .single()

    if (!enrollment) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
  }

  // Generate a short-lived signed HLS URL
  const { url, expiresAt } = generateSignedHlsUrl({
    publicId: video.cloudinary_public_id,
    expiresInSeconds: 300,
    streamingProfile: 'hd',
  })

  return NextResponse.json({ playbackUrl: url, expiresAt })
}
