import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FaPlay, FaLock, FaClock, FaVideo } from 'react-icons/fa'

interface PageProps {
  params: Promise<{ courseId: string }>
}

export default async function CoursePage({ params }: PageProps) {
  const { courseId } = await params
  const user = await getUser()
  const supabase = await createClient()

  // Get course details
  const { data: course } = await supabase
    .from('courses')
    .select(`
      *,
      course_categories(name),
      videos(
        id,
        title,
        description,
        duration_seconds,
        order_index,
        is_free_preview
      )
    `)
    .eq('id', courseId)
    .eq('is_published', true)
    .single()

  if (!course) {
    notFound()
  }

  // Check if user is enrolled (only if logged in)
  let isEnrolled = false
  if (user) {
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .eq('payment_status', 'completed')
      .single()
    
    isEnrolled = !!enrollment
  }

  // Get user progress (only if enrolled)
  let progressMap: Record<string, any> = {}
  if (user && isEnrolled) {
    const { data: progress } = await supabase
      .from('video_progress')
      .select('*')
      .eq('user_id', user.id)
      .in('video_id', course.videos?.map(v => v.id) || [])
    
    progressMap = progress?.reduce((acc, p) => {
      acc[p.video_id] = p
      return acc
    }, {} as Record<string, any>) || {}
  }

  // Sort videos by order_index
  const sortedVideos = course.videos?.sort((a, b) => a.order_index - b.order_index) || []
  
  // Calculate total duration
  const totalDuration = sortedVideos.reduce((acc, video) => acc + (video.duration_seconds || 0), 0)
  const hours = Math.floor(totalDuration / 3600)
  const minutes = Math.floor((totalDuration % 3600) / 60)

  const freeVideos = sortedVideos.filter(v => v.is_free_preview)
  const paidVideos = sortedVideos.filter(v => !v.is_free_preview)

  function formatDuration(seconds: number) {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}min`
  }

  function getVideoStatus(video: any) {
    if (video.is_free_preview) return 'free'
    if (!user) return 'login_required'
    if (isEnrolled) return 'enrolled'
    return 'payment_required'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/academy" className="text-blue-600 hover:text-blue-800">
            ← Back to Learning Academy
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Course Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {course.course_categories?.name || 'General'}
                  </span>
                  {freeVideos.length > 0 && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Free Preview Available
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                  {course.title}
                </h1>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <FaVideo className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{sortedVideos.length}</div>
                  <div className="text-sm text-gray-600">Videos</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <FaClock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">
                    {hours > 0 ? `${hours}h` : `${minutes}min`}
                  </div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <FaPlay className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-900">{freeVideos.length}</div>
                  <div className="text-sm text-gray-600">Free Videos</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <FaLock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-900">{paidVideos.length}</div>
                  <div className="text-sm text-gray-600">Premium Videos</div>
                </div>
              </div>

              {/* Course Content */}
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Course Content</h2>
                
                <div className="space-y-4">
                  {sortedVideos.map((video, index) => {
                    const status = getVideoStatus(video)
                    const progress = progressMap[video.id]
                    const isCompleted = progress?.completed || false
                    const progressPercent = progress ? (progress.progress_seconds / video.duration_seconds) * 100 : 0
                    
                    return (
                      <div key={video.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                              {index + 1}
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{formatDuration(video.duration_seconds)}</span>
                                {status === 'free' && (
                                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">FREE</span>
                                )}
                                {isCompleted && (
                                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">COMPLETED</span>
                                )}
                              </div>
                              
                              {progress && progressPercent > 0 && progressPercent < 100 && (
                                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                                  <div
                                    className="bg-blue-600 h-1 rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="ml-4">
                            {status === 'free' || status === 'enrolled' ? (
                              <Link
                                href={`/academy/courses/${courseId}/videos/${video.id}`}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                              >
                                <FaPlay className="w-3 h-3" />
                                {isCompleted ? 'Rewatch' : 'Watch'}
                              </Link>
                            ) : status === 'login_required' ? (
                              <Link
                                href="/auth/login"
                                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                              >
                                Login to Watch
                              </Link>
                            ) : (
                              <button
                                disabled
                                className="flex items-center gap-2 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed text-sm"
                              >
                                <FaLock className="w-3 h-3" />
                                Locked
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              {course.thumbnail_url && (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
              )}
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-900 mb-2">₹{course.price}</div>
                {!user && (
                  <p className="text-sm text-gray-600 mb-4">
                    {freeVideos.length > 0 
                      ? `${freeVideos.length} free preview${freeVideos.length > 1 ? 's' : ''} available`
                      : 'Sign in to preview content'
                    }
                  </p>
                )}
              </div>

              {isEnrolled ? (
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-green-700 font-medium">✓ You're enrolled in this course</p>
                  </div>
                  <Link
                    href="/academy/dashboard"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              ) : user ? (
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Enroll Now - ₹{course.price}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    30-day money-back guarantee
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/auth/signup"
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                  >
                    Sign Up to Enroll
                  </Link>
                  <Link
                    href="/auth/login"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
                  >
                    Already have an account?
                  </Link>
                  {freeVideos.length > 0 && (
                    <p className="text-xs text-gray-500 text-center">
                      {freeVideos.length} free preview{freeVideos.length > 1 ? 's' : ''} available without signup
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
