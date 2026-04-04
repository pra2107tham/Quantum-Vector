import React from "react";

export default function AcademyHero({ actionHref, actionLabel }: { actionHref?: string; actionLabel?: string }) {
  return (
    <section className="relative">
      <div className="flex items-start justify-between gap-6 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 ring-1 ring-blue-200">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold text-blue-900">On-demand DevOps learning</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-blue-900">Learning Academy</h1>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            Self-paced lessons and webinar recordings. Watch free previews, enroll to unlock full courses, and track your progress.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 ring-1 ring-gray-200">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Secure streaming
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 ring-1 ring-gray-200">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Free previews
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 ring-1 ring-gray-200">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Resume progress
            </span>
          </div>
        </div>
        {actionHref && (
          <div className="shrink-0 pt-1">
            <a href={actionHref} className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
              {actionLabel || 'Go to Dashboard'}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
