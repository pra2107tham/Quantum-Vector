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
    <div className="group relative transition-all duration-300 hover:-translate-y-0.5">
      <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-b from-blue-300/25 via-blue-200/10 to-transparent blur-xl opacity-70 group-hover:opacity-90" />
      <div className="relative rounded-2xl border border-blue-200/70 bg-white p-5 shadow-[0_8px_24px_rgba(30,64,175,0.08)] hover:shadow-[0_14px_36px_rgba(30,64,175,0.12)]">
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500" />

        {course.thumbnail_url && (
          <div className="mb-4 overflow-hidden rounded-xl">
            <img src={course.thumbnail_url} alt={course.title} className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          </div>
        )}

        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-blue-900/80">{course.course_categories?.name || "General"}</span>
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            {freePreviewCount > 0 && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 font-semibold text-green-700 ring-1 ring-green-200">{freePreviewCount} free</span>
            )}
            <span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-blue-700 ring-1 ring-blue-200">{videoCount} video{videoCount !== 1 ? "s" : ""}</span>
          </div>
        </div>

        <h3 className="mb-2 line-clamp-2 text-xl font-black leading-tight tracking-tight text-blue-900">{course.title}</h3>
        {course.description && (
          <p className="mb-4 line-clamp-3 text-[0.95rem] leading-relaxed text-neutral-700">{course.description}</p>
        )}

        {totalDuration > 0 && (
          <div className="mb-4 text-xs font-medium text-neutral-600">
            Duration: {hours > 0 ? `${hours}h ` : ""}
            {minutes}min
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-blue-900">₹{course.price}</div>
          </div>
          <Link
            href={href}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(30,64,175,0.25)] transition-colors ${
              enrolled ? "bg-green-600 hover:bg-green-700" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {enrolled ? "Continue" : "View Course"}
          </Link>
        </div>
      </div>
    </div>
  );
}
