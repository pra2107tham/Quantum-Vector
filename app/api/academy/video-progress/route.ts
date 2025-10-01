import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { videoId, progressSeconds, completed } = await request.json()

    if (!videoId || typeof progressSeconds !== 'number' || typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Verify user has access to this video
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .select('id, course_id, is_free_preview')
      .eq('id', videoId)
      .single()

    if (videoError || !video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    // Check access (free preview or enrolled)
    if (!video.is_free_preview) {
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

    // Upsert progress record
    const { error: progressError } = await supabase
      .from('video_progress')
      .upsert({
        user_id: user.id,
        video_id: videoId,
        progress_seconds: Math.max(0, progressSeconds),
        completed: completed,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,video_id'
      })

    if (progressError) {
      console.error('Progress save error:', progressError)
      return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Progress API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { data: progress, error } = await supabase
      .from('video_progress')
      .select('progress_seconds, completed, updated_at')
      .eq('user_id', user.id)
      .eq('video_id', videoId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Progress fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    }

    return NextResponse.json({ 
      progress: progress || { progress_seconds: 0, completed: false, updated_at: null }
    })
  } catch (error) {
    console.error('Progress fetch API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
