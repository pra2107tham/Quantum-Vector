import Link from "next/link";

export type Course = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  thumbnail_url: string | null;
  course_categories?: { name: string } | null;
  videos?: { id: string; is_free_preview: boolean; duration_seconds?: number | null }[];
};

export default function AcademyCourseCard({ course, href, enrolled }: { course: Course; href: string; enrolled?: boolean }) {
  const videoCount = course.videos?.length || 0;
  const freePreviewCount = course.videos?.filter((v) => v.is_free_preview)?.length || 0;
  const totalDuration = (course.videos || []).reduce((acc, v) => acc + (v.duration_seconds || 0), 0);
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <div className="group relative transition-all duration-200">
      <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md overflow-hidden">
        {course.thumbnail_url && (
          <div className="h-36 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={course.thumbnail_url} alt={course.title} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center justify-between text-[11px] text-neutral-600">
            <span className="font-medium text-blue-900/80">{course.course_categories?.name || "General"}</span>
            <div className="flex items-center gap-2">
              {freePreviewCount > 0 && (
                <span className="rounded-full bg-green-50 px-2 py-0.5 font-semibold text-green-700 ring-1 ring-green-200">{freePreviewCount} free</span>
              )}
              <span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-blue-700 ring-1 ring-blue-200">{videoCount} video{videoCount !== 1 ? "s" : ""}</span>
            </div>
          </div>
          <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug tracking-tight text-blue-900">{course.title}</h3>
          {course.description && (
            <p className="mt-1 line-clamp-2 text-sm text-neutral-700">{course.description}</p>
          )}
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-neutral-600">{hours > 0 ? `${hours}h ` : ""}{minutes}min</div>
            <div className="flex items-center gap-3">
              <div className="text-lg font-extrabold text-blue-900">₹{course.price}</div>
              <Link href={href} className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white ${enrolled ? "bg-green-600 hover:bg-green-700" : "bg-blue-700 hover:bg-blue-800"}`}>
                {enrolled ? "Continue" : "View Course"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
