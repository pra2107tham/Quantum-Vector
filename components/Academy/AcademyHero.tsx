import React from "react";

export default function AcademyHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-200/60 bg-gradient-to-b from-blue-50 via-white to-blue-100 shadow-[0_8px_24px_rgba(30,64,175,0.08)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
      </div>
      <div className="relative px-6 py-12 md:px-10 md:py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-blue-900">
            Learning Academy
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-900/70">
            Self‑paced DevOps lessons and webinar recordings. Explore free previews, enroll to unlock full access.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-blue-900 ring-1 ring-blue-200">
              <span className="h-2 w-2 rounded-full bg-blue-600" /> Streamed securely
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-blue-900 ring-1 ring-blue-200">
              <span className="h-2 w-2 rounded-full bg-blue-600" /> Free previews
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-blue-900 ring-1 ring-blue-200">
              <span className="h-2 w-2 rounded-full bg-blue-600" /> Resume progress
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
