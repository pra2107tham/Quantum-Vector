"use client";

import React, { useMemo, useState } from "react";

export type AcademyFilter = {
  search: string;
  category: string | null;
  sort: "newest" | "price_low" | "price_high";
};

export type AcademyFiltersProps = {
  categories: { id: string; name: string }[];
  onChange: (f: AcademyFilter) => void;
};

export default function AcademyFilters({ categories, onChange }: AcademyFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<AcademyFilter["sort"]>("newest");

  const filter = useMemo(() => ({ search, category, sort }), [search, category, sort]);

  React.useEffect(() => {
    onChange(filter);
  }, [filter, onChange]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[180px] max-w-[360px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-gray-400 focus:border-blue-400"
          />
        </div>

        {/* Category */}
        <div>
          <select
            value={category || ""}
            onChange={(e) => setCategory(e.target.value || null)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as AcademyFilter["sort"])}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>

        {/* Clear */}
        {(search || category) && (
          <button
            className="text-xs font-medium text-gray-600 hover:text-gray-800 underline underline-offset-2"
            onClick={() => { setSearch(""); setCategory(null); }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
