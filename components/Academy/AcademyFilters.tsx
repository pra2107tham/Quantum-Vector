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

const chipBase =
  "px-3 py-1.5 rounded-full text-sm font-medium ring-1 transition-colors";

export default function AcademyFilters({ categories, onChange }: AcademyFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<AcademyFilter["sort"]>("newest");

  const filter = useMemo(() => ({ search, category, sort }), [search, category, sort]);

  React.useEffect(() => {
    onChange(filter);
  }, [filter, onChange]);

  return (
    <div className="rounded-2xl border border-blue-200/60 bg-white/70 p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-blue-900/80">Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses"
            className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none ring-0 placeholder:text-blue-900/40 focus:border-blue-400"
          />
        </div>
        {/* Categories */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-blue-900/80">Category</label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`${chipBase} ${
                !category
                  ? "bg-blue-600 text-white ring-blue-600"
                  : "bg-white text-blue-900 ring-blue-200 hover:bg-blue-50"
              }`}
              onClick={() => setCategory(null)}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={`${chipBase} ${
                  category === c.id
                    ? "bg-blue-600 text-white ring-blue-600"
                    : "bg-white text-blue-900 ring-blue-200 hover:bg-blue-50"
                }`}
                onClick={() => setCategory(category === c.id ? null : c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        {/* Sort */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-blue-900/80">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as AcademyFilter["sort"])}
            className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none ring-0 focus:border-blue-400"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
