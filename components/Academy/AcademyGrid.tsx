"use client";

import React from "react";
import AcademyFilters, { type AcademyFilter } from "./AcademyFilters";
import AcademyCourseCard, { type Course } from "./AcademyCourseCard";

export default function AcademyGrid({
  courses,
  categories,
  enrolledIds,
}: {
  courses: Course[];
  categories: { id: string; name: string }[];
  enrolledIds: string[];
}) {
  const [filter, setFilter] = React.useState<AcademyFilter>({
    search: "",
    category: null,
    sort: "newest",
  });

  const filtered = React.useMemo(() => {
    let arr = [...courses];

    if (filter.category) {
      arr = arr.filter((c) => c && (c as any).category_id === filter.category);
    }

    if (filter.search.trim()) {
      const q = filter.search.toLowerCase();
      arr = arr.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q)
      );
    }

    switch (filter.sort) {
      case "price_low":
        arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price_high":
        arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      default:
        // newest by created_at desc; created_at exists on Course via select(*), but not typed
        arr.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return arr;
  }, [courses, filter]);

  return (
    <div className="mt-8">
      <div className="rounded-2xl border border-gray-200 bg-white/90 p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="lg:col-span-3">
            <AcademyFilters categories={categories} onChange={setFilter} />
          </div>
          <div className="lg:col-span-1">
            <div className="h-full rounded-xl border border-gray-200 bg-white p-4">
              <div className="text-sm font-semibold text-gray-900">Tips</div>
              <ul className="mt-2 space-y-2 text-xs text-gray-600">
                <li>Use search to quickly find topics</li>
                <li>Filter by category to narrow results</li>
                <li>Free previews available on many courses</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-blue-900">{filtered.length}</span> course{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-600">
            No courses found. Try a different search or category.
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => (
              <AcademyCourseCard
                key={course.id}
                course={course}
                href={`/academy/courses/${course.id}`}
                enrolled={enrolledIds.includes(course.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
