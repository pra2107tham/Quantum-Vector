"use client";

import React from "react";
import { motion } from "motion/react";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  blogs: BlogPost[];
  loading?: boolean;
}

const LoadingSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200" />
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-14 bg-gray-200 rounded-full" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
    className="col-span-full flex flex-col items-center justify-center py-20 px-4"
  >
    <motion.div
      animate={{ 
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-8 shadow-lg"
    >
      <svg
        className="w-16 h-16 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </motion.div>
    <h3 className="text-3xl font-bold text-blue-900 mb-4">No Blog Posts Found</h3>
    <p className="text-neutral-600 text-center max-w-md mb-8 text-lg">
      We couldn&apos;t find any blog posts matching your criteria. Try adjusting your filters or search terms to discover more content.
    </p>
    <div className="flex gap-4">
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Refresh Page
      </button>
      <button
        onClick={() => {
          // Clear all filters
          const event = new CustomEvent('clearAllFilters');
          window.dispatchEvent(event);
        }}
        className="px-6 py-3 bg-white border border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5"
      >
        Clear Filters
      </button>
    </div>
  </motion.div>
);

export default function BlogGrid({ blogs, loading = false }: BlogGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 6 }, (_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
    >
      {blogs.map((blog, index) => (
        <BlogCard key={blog._id} blog={blog} index={index} />
      ))}
    </motion.div>
  );
}