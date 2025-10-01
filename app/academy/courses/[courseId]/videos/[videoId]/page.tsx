import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import VideoPlayer from '@/components/Academy/VideoPlayer'

interface PageProps {
  params: Promise<{ courseId: string; videoId: string }>
}

type CourseVideoNav = {
  id: string
  title: string
  order_index: number
  is_free_preview: boolean
  duration_seconds?: number
}

export default async function VideoPage({ params }: PageProps) {
  const { courseId, videoId } = await params
  const user = await getUser()
  const supabase = await createClient()

  // Get video and course details
  const { data: video } = await supabase
    .from('videos')
    .select(`
      *,
      courses(
        id,
        title,
        course_categories(name)
      )
    `)
    .eq('id', videoId)
    .eq('course_id', courseId)
    .single()

  if (!video || video.courses?.id !== courseId) {
    notFound()
  }

  // Check access permissions
  const canWatch = video.is_free_preview || false
  let isEnrolled = false

  if (user && !video.is_free_preview) {
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .eq('payment_status', 'completed')
      .single()
    
    isEnrolled = !!enrollment
  }

  // If user can't watch this video, redirect appropriately
  if (!video.is_free_preview && !isEnrolled) {
    if (!user) {
      redirect(`/auth/login?redirect=/academy/courses/${courseId}/videos/${videoId}`)
    } else {
      redirect(`/academy/courses/${courseId}`)
    }
  }

  // Get all videos in the course for navigation
  const { data: allVideos } = await supabase
    .from('videos')
    .select('id, title, order_index, is_free_preview, duration_seconds')
    .eq('course_id', courseId)
    .order('order_index')

  const typedAllVideos: CourseVideoNav[] = (allVideos || []) as unknown as CourseVideoNav[]
  const currentIndex = typedAllVideos.findIndex((v: CourseVideoNav) => v.id === videoId) || 0
  const nextVideo = typedAllVideos?.[currentIndex + 1]
  const prevVideo = typedAllVideos?.[currentIndex - 1]

  const totalCourseSeconds = typedAllVideos.reduce((acc, v) => acc + (v.duration_seconds || 0), 0)

  function formatDuration(seconds: number) {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs > 0 ? `${hrs}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Main column (player + details) ~58% */}
        <main className="lg:col-span-7">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-black shadow-sm">
            {(() => {
              const watermark = !video.is_free_preview && user ? `${user.email?.split('@')[0] || 'user'} • premium` : undefined
              return (
                <VideoPlayer
                  videoId={videoId}
                  title={video.title}
                  isPremium={!video.is_free_preview}
                  watermarkText={watermark}
                  showTitleOverlay={false}
                />
              )
            })()}
          </div>

          {/* Next video quick action */}
          {nextVideo && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div>
                <div className="text-xs text-gray-500">Next video</div>
                <Link href={`/academy/courses/${courseId}/videos/${nextVideo.id}`} className="text-sm font-medium text-blue-700 hover:text-blue-800">
                  {nextVideo.title}
                </Link>
              </div>
              <Link href={`/academy/courses/${courseId}/videos/${nextVideo.id}`} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Play next
              </Link>
            </div>
          )}

          {/* Title and meta */}
          <div className="mt-4 flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
            <div className="text-sm text-gray-500">{video.courses?.course_categories?.name} • {formatDuration(video.duration_seconds)}</div>
          </div>

          {/* Description */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-gray-700 leading-relaxed">{video.description}</p>
          </div>

          
        </main>

        {/* Right sidebar (outline) ~42% */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Course Content</h3>
              <div className="text-xs text-gray-500">{typedAllVideos.length} lectures • {formatDuration(totalCourseSeconds)}</div>
            </div>
            <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
              {typedAllVideos?.map((v: CourseVideoNav, index: number) => {
                const canAccess = v.is_free_preview || isEnrolled
                const isCurrent = v.id === videoId
                return (
                  <Link
                    key={v.id}
                    href={canAccess ? `/academy/courses/${courseId}/videos/${v.id}` : `/academy/courses/${courseId}`}
                    className={`block rounded-lg border p-3 transition-colors ${
                      isCurrent
                        ? 'border-blue-300 bg-blue-50'
                        : canAccess
                          ? 'border-gray-200 hover:bg-gray-50'
                          : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{index + 1}</div>
                      <div className="min-w-0 flex-1">
                        <div className={`truncate text-sm font-medium ${isCurrent ? 'text-blue-900' : 'text-gray-900'}`}>{v.title}</div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <span>{v.is_free_preview ? 'FREE preview' : 'Premium'}</span>
                          {typeof v.duration_seconds === 'number' && (
                            <span>• {formatDuration(v.duration_seconds)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {!isEnrolled && (
              <div className="mt-4 border-t pt-3">
                <Link href={`/academy/courses/${courseId}`} className="block rounded-lg bg-green-600 px-4 py-2 text-center font-medium text-white hover:bg-green-700">
                  Enroll to Access All Videos
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
