import { requireAuth, getUserProfile } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await requireAuth()
  const profile = await getUserProfile(user.id)
  const supabase = await createClient()

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url,
        videos (id, title, duration_seconds)
      )
    `)
    .eq('user_id', user.id)
    .eq('payment_status', 'completed')
    .order('enrolled_at', { ascending: false })

  const { data: progress } = await supabase
    .from('video_progress')
    .select('*')
    .eq('user_id', user.id)

  type ProgressRow = { video_id: string; completed: boolean; progress_seconds: number }

  const progressMap = (progress as ProgressRow[] | null)?.reduce((acc, p) => {
    acc[p.video_id] = p
    return acc
  }, {} as Record<string, ProgressRow>) || {}

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white/90 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">My Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, {profile?.full_name || user.email}</p>
              </div>
              <Link href="/academy" className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/95 rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrolled Courses</h3>
            <p className="text-3xl font-bold text-blue-600">{enrollments?.length || 0}</p>
          </div>

          <div className="bg-white/95 rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Videos Watched</h3>
            <p className="text-3xl font-bold text-green-600">
              {progress?.filter(p => p.completed).length || 0}
            </p>
          </div>

          <div className="bg-white/95 rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Progress</h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.round((progress?.filter(p => p.completed).length || 0) * 100 / Math.max(progress?.length || 1, 1))}%
            </p>
          </div>
        </div>

        {enrollments && enrollments.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Your Courses</h2>
            <div className="space-y-6">
              {enrollments.map((enrollment) => {
                const course = enrollment.courses
                if (!course) return null

                const totalVideos = course.videos?.length || 0
                const completedVideos = course.videos?.filter((video: { id: string }) =>
                  progressMap[video.id]?.completed
                ).length || 0
                const courseProgress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0

                return (
                  <div key={enrollment.id} className="bg-white/95 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="md:flex">
                      {course.thumbnail_url && (
                        <div className="md:w-1/3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={course.thumbnail_url}
                            alt={course.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="p-5 sm:p-6 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                            <p className="text-gray-600 text-sm">{course.description}</p>
                          </div>
                          <Link
                            href={`/academy/courses/${course.id}`}
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap ml-4"
                          >
                            Continue
                          </Link>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm text-gray-500">
                              {completedVideos} of {totalVideos} videos completed
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${courseProgress}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {Math.round(courseProgress)}% complete
                          </p>
                        </div>

                        <div className="mt-4 text-sm text-gray-500">
                          Enrolled on {new Date(enrollment.enrolled_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/95 rounded-xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Courses Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven&apos;t enrolled in any courses yet. Browse our course catalog to get started!
              </p>
              <Link
                href="/academy"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors inline-block"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
