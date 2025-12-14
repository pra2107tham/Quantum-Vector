"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDownIcon, MagnifyingGlassIcon, FunnelIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalBlogs: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  featuredTags?: string[];
  onTagFilter?: (tag: string) => void;
  categoryCounts?: Record<string, number>;
}

const getCategoryIcon = (cat: string) => {
  const icons: Record<string, string> = {
    DevOps: "🚀",
    Kubernetes: "☸️",
    AWS: "☁️",
    Azure: "🔷",
    Infrastructure: "🏗️",
    "Data Science": "📊",
    Security: "📝",
    Monitoring: "📝",
  };
  return icons[cat] || "📝";
};

export default function BlogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalBlogs,
  sortBy,
  onSortChange,
  featuredTags = [],
  onTagFilter,
  categoryCounts = {},
}: BlogFiltersProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsDropdownOpen(false);
  };

  const handleSortSelect = (sort: string) => {
    onSortChange(sort);
    setIsSortDropdownOpen(false);
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'category', label: 'Category' },
  ];

  const getSortLabel = (value: string) => {
    return sortOptions.find(option => option.value === value)?.label || 'Newest First';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col gap-[30px] items-start w-full"
    >
      {/* Featured Tags Section */}
      {featuredTags.length > 0 && (
        <div className="flex flex-col gap-[20px] items-start w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-full">
            <div className="flex gap-[15px] items-center">
              <FunnelIcon className="w-6 h-6 text-[#2d2d2d] shrink-0" />
              <p className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-[24px]">
                Popular Tags
              </p>
            </div>
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="glass-card glass-card-blur-sm glass-card-opacity-light flex h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px] gap-[10px]"
              >
                <div className="flex flex-col items-start">
                  <p className="font-sans font-normal text-[#1447e6] text-[12px] leading-tight">
                    All
                  </p>
                  <p className="font-sans font-normal text-[#1447e6] text-[12px] leading-tight">
                    Categories
                  </p>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-[#1447e6] transition-transform flex-shrink-0 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {/* Dropdown wrapper with height: 0 to not affect layout */}
              <div className="absolute top-full left-0 h-0 overflow-visible" style={{ zIndex: 1000 }}>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="mt-1 flex flex-col glass-card glass-card-blur-md glass-card-opacity-medium rounded-[10px] p-1 shadow-lg"
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`text-left px-3 py-1.5 text-[11px] rounded-md transition-colors whitespace-nowrap ${
                          selectedCategory === category
                            ? "bg-white/20 text-[#1447e6] font-semibold"
                            : "text-[#2d2d2d] hover:bg-white/10"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-[20px] items-center">
            {featuredTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => onTagFilter && onTagFilter(tag)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card glass-card-blur-sm glass-card-opacity-light flex h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px] hover:bg-white/20 transition-all"
              >
                <p className="font-sans font-normal text-[#1447e6] text-[12px]">
                  #{tag}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Explore by Category Section */}
      {categories.length > 0 && (
        <div className="flex flex-col gap-[20px] items-start w-full">
          <div className="flex gap-[15px] items-center">
            <FunnelIcon className="w-6 h-6 text-[#2d2d2d] shrink-0" />
            <p className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-[24px]">
              Explore by Category
            </p>
          </div>
          <div className="flex flex-wrap gap-[20px] items-center">
            {categories.filter(cat => cat !== "All Categories").slice(0, 8).map((category) => {
              const categoryCount = categoryCounts[category] || 0;
              return (
                <motion.button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`glass-card glass-card-blur-sm glass-card-opacity-light flex h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px] hover:bg-white/20 transition-all ${
                    selectedCategory === category ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <span className="text-[16px]">{getCategoryIcon(category)}</span>
                    <p className="font-sans font-normal text-[#1447e6] text-[12px] whitespace-nowrap">
                      {category} ({categoryCount})
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

    </motion.div>
  );
}