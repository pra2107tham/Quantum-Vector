import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import AcademyHero from '@/components/Academy/AcademyHero'
import AcademyGrid from '@/components/Academy/AcademyGrid'

export default async function AcademyPage() {
  const user = await getUser() // Optional user (no redirect if not logged in)
  const supabase = await createClient()

  // Get published courses
  const { data: courses } = await supabase
    .from('courses')
    .select(`
      *,
      course_categories(id, name),
      videos(id, is_free_preview, duration_seconds)
    `)
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  // Fetch categories for filters
  const { data: categories } = await supabase
    .from('course_categories')
    .select('id, name')
    .order('name')

  // Get user enrollments (only if logged in)
  let enrolledCourseIds: string[] = []
  if (user) {
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', user.id)
      .eq('payment_status', 'completed')
    
    enrolledCourseIds = enrollments?.map(e => e.course_id) || []
  }

  return (
    <div className="mt-8 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <AcademyHero />

        {/* Quick actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {user ? (
            <>
              <Link
                href="/academy/dashboard"
                className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Go to Dashboard
              </Link>
              <form action="/auth/logout" method="post">
                <button
                  type="submit"
                  className="rounded-xl bg-gray-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-xl bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-200 hover:bg-blue-100"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Enrolled Courses */}
        {enrolledCourseIds.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Your Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses?.filter(course => enrolledCourseIds.includes(course.id)).map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isEnrolled={true}
                  user={user}
                />
              ))}
            </div>
          </div>
        )}

        {/* Catalog with filters */}
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-blue-900">Browse Courses</h2>
          <AcademyGrid
            courses={(courses as any) || []}
            categories={(categories as any) || []}
            enrolledIds={enrolledCourseIds}
          />
        </div>

        {courses?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CourseCard({ course, isEnrolled, user }: { course: any, isEnrolled: boolean, user: any }) {
  const videoCount = course.videos?.length || 0
  const freePreviewCount = course.videos?.filter((v: any) => v.is_free_preview)?.length || 0
  const totalDuration = course.videos?.reduce((acc: number, video: any) => acc + (video.duration_seconds || 0), 0) || 0
  const hours = Math.floor(totalDuration / 3600)
  const minutes = Math.floor((totalDuration % 3600) / 60)
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {course.thumbnail_url && (
        <img
          src={course.thumbnail_url}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">
            {course.course_categories?.name || 'General'}
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {freePreviewCount > 0 && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                {freePreviewCount} Free Preview{freePreviewCount > 1 ? 's' : ''}
              </span>
            )}
            <span>{videoCount} video{videoCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
        
        {totalDuration > 0 && (
          <div className="text-sm text-gray-500 mb-4">
            Duration: {hours > 0 ? `${hours}h ` : ''}{minutes}min
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-900">
              ₹{course.price}
            </span>
            {!user && freePreviewCount > 0 && (
              <div className="text-xs text-green-600 mt-1">Free preview available</div>
            )}
          </div>
          
          {isEnrolled ? (
            <Link
              href={`/academy/courses/${course.id}`}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Continue Learning
            </Link>
          ) : (
            <Link
              href={`/academy/courses/${course.id}`}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
            >
              View Course
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
