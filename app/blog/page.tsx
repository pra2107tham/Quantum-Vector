"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, BlogApiResponse } from "@/types/blog";
import { getAllBlogs } from "@/lib/blog-api";
import BlogGrid from "@/components/Blog/BlogGrid";
import BlogFilters from "@/components/Blog/BlogFilters";
import Pagination from "@/components/Blog/Pagination";
import BackToTop from "@/components/Blog/BackToTop";
import ErrorMessage from "@/components/ui/error-message";
import DCLPPopup from "@/components/DCLPPopup/DCLPPopup";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10, imgFrame, imgGroup } from "@/web/assets";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredTags, setFeaturedTags] = useState<string[]>([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Fetch blogs with current filters
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data: BlogApiResponse = await getAllBlogs({
        page: currentPage,
        limit: 6,
        sort: sortBy as 'newest' | 'oldest' | 'title' | 'category',
        category: selectedCategory !== "All Categories" ? selectedCategory : undefined,
        search: searchQuery || undefined,
      });
      
      setBlogs(data.blogs);
      setCategories(data.categories);
      setTotalBlogs(data.total);
      setTotalPages(data.totalPages);
      setHasNextPage(data.hasNextPage);
      setHasPrevPage(data.hasPrevPage);
      
      // Extract featured tags from all blogs for the filter
      if (data.blogs.length > 0) {
        const allTags = data.blogs.flatMap(blog => blog.tags);
        const tagCounts = allTags.reduce((acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const sortedTags = Object.entries(tagCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 8)
          .map(([tag]) => tag);
        
        setFeaturedTags(sortedTags);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortBy, selectedCategory, searchQuery]);

  // Fetch initial data
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Listen for clear filters event from empty state
  useEffect(() => {
    const handleClearFilters = () => {
      setSelectedCategory("All Categories");
      setSearchQuery("");
      setSortBy("newest");
      setCurrentPage(1);
    };

    window.addEventListener('clearAllFilters', handleClearFilters);
    return () => window.removeEventListener('clearAllFilters', handleClearFilters);
  }, []);

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setIsCategoryDropdownOpen(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // This will trigger fetchBlogs through the useEffect dependency
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTagFilter = (tag: string) => {
    setSearchQuery(tag);
    setCurrentPage(1);
  };

  const handleRetry = () => {
    fetchBlogs();
  };

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

  const getCategoryCount = (category: string) => {
    return blogs.filter(blog => blog.category === category).length;
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image
          src={imgImage10}
          alt="DevOps Community Background"
          fill
          className="object-cover object-center pointer-events-none"
          priority
          unoptimized
        />
      </div>
      {/* Fallback background color */}
      <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />

      {/* Hero Section */}
      <div className="glass-card-main relative min-h-[700px] md:min-h-[800px] mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[700px] md:min-h-[800px] w-full z-10 flex flex-col">
          <Header />
          
          {/* Hero Content */}
          <div className="flex flex-col gap-[15px] items-center justify-center flex-1 w-full max-w-[1095px] mx-auto px-4">
            <h1 className="font-outfit font-semibold text-black text-[48px] md:text-[64px] text-center leading-tight">
              DevOps Community Blog
            </h1>
            <p className="font-sans font-normal text-[#2d2d2d] text-[18px] md:text-[20px] text-center max-w-[723px] leading-relaxed">
              AI-generated insights, tutorials, and best practices for DevOps, Cloud, and Data Science. Stay updated with the latest trends and technologies in the industry.
            </p>
            <p className="font-sans font-normal text-[#2d2d2d] text-[18px] md:text-[20px] text-center">
              Home / Blog
            </p>
            
            {/* Tag Badges */}
            <div className="flex flex-wrap gap-[15px] items-center justify-center mt-4">
              {featuredTags.slice(0, 3).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  className="glass-card glass-card-blur-sm glass-card-opacity-light flex h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px] hover:bg-white/20 transition-all"
                >
                  <p className="font-sans font-normal text-[#1447e6] text-[14px] md:text-[16px] whitespace-nowrap">
                    {tag}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          
          {/* Filters Section */}
          <div className="w-full max-w-[1260px]">
            <BlogFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              totalBlogs={totalBlogs}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              featuredTags={featuredTags}
              onTagFilter={handleTagFilter}
              categoryCounts={categories.reduce((acc, cat) => {
                if (cat !== "All Categories") {
                  acc[cat] = getCategoryCount(cat);
                }
                return acc;
              }, {} as Record<string, number>)}
            />
          </div>

          {/* Error State */}
          {error && !loading && (
            <ErrorMessage
              title="Failed to Load Blog Posts"
              message={error}
              onRetry={handleRetry}
              className="my-8"
            />
          )}

          {/* Blog Grid */}
          {!error && (
            <>
              <div className="w-full max-w-[1260px]">
                <BlogGrid blogs={blogs} loading={loading} />
              </div>
              
              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="w-full max-w-[1260px]">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    onPageChange={handlePageChange}
                    loading={loading}
                  />
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          {!loading && !error && (
            <div className="glass-card glass-card-blur-md glass-card-opacity-medium flex flex-col items-center justify-center p-8 md:p-12 rounded-[20px] w-full max-w-[1260px]">
              <div className="flex flex-col gap-[15px] items-center">
                <h2 className="font-outfit font-semibold text-[#1447e6] text-[28px] md:text-[32px] text-center">
                  Stay Updated with Latest Posts
                </h2>
                <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] text-center max-w-[771px]">
                  Our AI-powered blog is constantly updated with new insights, tutorials, and best practices. Check back regularly for fresh content on DevOps, Cloud, and Data Science.
                </p>
                <div className="flex gap-[15px] items-center justify-center flex-wrap mt-4">
                  <button
                    onClick={() => fetchBlogs()}
                    className="bg-[#9eabbb] text-white px-[18px] py-[12px] rounded-[30px] font-sans font-semibold text-[14px] md:text-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#8a96a5] transition-all duration-200 whitespace-nowrap"
                  >
                    Refresh For New Posts
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory("All Categories");
                      setSearchQuery("");
                      setSortBy("newest");
                      setCurrentPage(1);
                    }}
                    className="glass-card glass-card-blur-sm glass-card-opacity-light px-[18px] py-[12px] rounded-[30px] font-sans font-semibold text-[#1447e6] text-[14px] md:text-[16px] hover:bg-white/20 transition-all duration-200 whitespace-nowrap"
                  >
                    View All Posts
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
      
      {/* DCLP Popup */}
      <DCLPPopup showOnPages={['/blog', '/blog/']} delay={3000} />
    </div>
  );
}
