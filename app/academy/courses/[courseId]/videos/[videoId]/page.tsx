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
    .select('id, title, order_index, is_free_preview')
    .eq('course_id', courseId)
    .order('order_index')

  const typedAllVideos: CourseVideoNav[] = (allVideos || []) as unknown as CourseVideoNav[]
  const currentIndex = typedAllVideos.findIndex((v: CourseVideoNav) => v.id === videoId) || 0
  const nextVideo = typedAllVideos?.[currentIndex + 1]
  const prevVideo = typedAllVideos?.[currentIndex - 1]

  function formatDuration(seconds: number) {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs > 0 ? `${hrs}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Video Player Area */}
      <div className="relative bg-black">
        {/* HLS Player */}
        {
          (() => {
            const watermark = !video.is_free_preview && user ? `${user.email?.split('@')[0] || 'user'} • premium` : undefined
            return (
              <VideoPlayer
                videoId={videoId}
                title={video.title}
                isPremium={!video.is_free_preview}
                watermarkText={watermark}
              />
            )
          })()
        }

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="text-xl font-semibold">{video.title}</h1>
              <p className="text-gray-300 text-sm">
                {video.courses?.course_categories?.name} • {formatDuration(video.duration_seconds)}
              </p>
            </div>
            
            {!video.is_free_preview && (
              <div className="bg-green-600 px-3 py-1 rounded-full text-sm">
                Premium Content
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Navigation */}
              <div className="mb-6">
                <Link 
                  href={`/academy/courses/${courseId}`}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                  ← Back to {video.courses?.title}
                </Link>
              </div>

              {/* Video Info */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h2>
                <p className="text-gray-600 leading-relaxed">{video.description}</p>
              </div>

              {/* Video Navigation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevVideo && (
                  <Link
                    href={`/academy/courses/${courseId}/videos/${prevVideo.id}`}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm text-gray-500 mb-1">Previous Video</div>
                    <div className="font-medium text-gray-900">{prevVideo.title}</div>
                  </Link>
                )}
                
                {nextVideo && (
                  <Link
                    href={`/academy/courses/${courseId}/videos/${nextVideo.id}`}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors md:ml-auto"
                  >
                    <div className="text-sm text-gray-500 mb-1">Next Video</div>
                    <div className="font-medium text-gray-900">{nextVideo.title}</div>
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar - Course Videos List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Videos</h3>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {typedAllVideos?.map((v: CourseVideoNav, index: number) => {
                    const canAccess = v.is_free_preview || isEnrolled
                    const isCurrent = v.id === videoId
                    
                    return (
                      <div
                        key={v.id}
                        className={`p-3 rounded-lg border transition-colors ${
                          isCurrent 
                            ? 'bg-blue-50 border-blue-200' 
                            : canAccess 
                              ? 'hover:bg-gray-50 border-gray-200' 
                              : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {canAccess ? (
                          <Link
                            href={`/academy/courses/${courseId}/videos/${v.id}`}
                            className="block"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                                isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                              }`}>
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className={`font-medium text-sm ${
                                  isCurrent ? 'text-blue-900' : 'text-gray-900'
                                }`}>
                                  {v.title}
                                </div>
                                {v.is_free_preview && (
                                  <div className="text-xs text-green-600 mt-1">FREE</div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-3 opacity-50">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-gray-200 text-gray-400">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-400">{v.title}</div>
                              <div className="text-xs text-gray-400 mt-1">🔒 Premium</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {!isEnrolled && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href={`/academy/courses/${courseId}`}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block font-medium"
                    >
                      Enroll to Access All Videos
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
