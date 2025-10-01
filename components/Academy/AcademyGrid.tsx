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
      <AcademyFilters categories={categories} onChange={setFilter} />

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-blue-900/70">
          Showing <span className="font-semibold text-blue-900">{filtered.length}</span> course{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-blue-200 bg-white p-10 text-center text-blue-900/70">
          No courses found. Try a different search or category.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  );
}
