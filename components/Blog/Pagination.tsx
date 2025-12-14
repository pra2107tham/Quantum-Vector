"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  loading = false,
}: PaginationProps) {
  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2; // Show 2 pages before and after current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Calculate start and end of the range around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Always show last page (if it's not the first page)
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where there are gaps
    let prev = 0;
    for (const page of range) {
      if (page - prev === 2) {
        rangeWithDots.push(prev + 1);
      } else if (page - prev !== 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-[15px] mt-8 mb-4"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage || loading}
        className={`flex items-center justify-center transition-all duration-200 ${
          hasPrevPage && !loading
            ? "text-[#1447e6] hover:opacity-70 cursor-pointer"
            : "text-gray-400 cursor-not-allowed"
        }`}
      >
        <svg className="w-[7px] h-[13px]" fill="none" viewBox="0 0 7 13" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 1L1 6.5L6 12" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-0">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="font-sans font-normal text-[#1447e6] text-[24px] capitalize px-2"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <motion.button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              disabled={loading}
              whileHover={!isCurrentPage && !loading ? { scale: 1.05 } : {}}
              whileTap={!isCurrentPage && !loading ? { scale: 0.95 } : {}}
              className={`font-sans font-normal text-sm md:text-[24px] capitalize transition-all duration-200 ${
                isCurrentPage
                  ? "bg-[#1447e6] text-white rounded-[400px] w-[36px] h-[36px] flex items-center justify-center px-[10px] py-0"
                  : loading
                  ? "text-gray-400 cursor-not-allowed px-2"
                  : "text-[#1447e6] hover:opacity-70 px-2"
              }`}
            >
              {pageNumber}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || loading}
        className={`flex items-center justify-center transition-all duration-200 rotate-180 ${
          hasNextPage && !loading
            ? "text-[#1447e6] hover:opacity-70 cursor-pointer"
            : "text-gray-400 cursor-not-allowed"
        }`}
      >
        <svg className="w-[7px] h-[13px]" fill="none" viewBox="0 0 7 13" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 1L1 6.5L6 12" />
        </svg>
      </button>

      {/* Page Info */}
      <p className="font-sans font-normal text-[12px] text-[rgba(0,0,0,0.25)] ml-2">
        Page {currentPage} of {totalPages}
      </p>
    </motion.div>
  );
}
