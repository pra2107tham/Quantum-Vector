"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CalendarIcon, ClockIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/blog-api";
import ShareButtons from "./ShareButtons";

interface BlogMetaProps {
  blog: BlogPost;
}

export default function BlogMeta({ blog }: BlogMetaProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(100, Math.max(0, (scrolled / maxScroll) * 100));
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] p-6"
    >
      {/* Article Info */}
      <div className="mb-6">
        <h3 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-4">Article Info</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-[#2d2d2d] flex-shrink-0" />
            <div>
              <div className="font-sans font-medium text-[#2d2d2d] text-[12px] md:text-[14px]">Published</div>
              <div className="font-sans font-normal text-[#2d2d2d] text-[12px] md:text-[14px]">{formatDate(blog.published_at)}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ClockIcon className="w-5 h-5 text-[#2d2d2d] flex-shrink-0" />
            <div>
              <div className="font-sans font-medium text-[#2d2d2d] text-[12px] md:text-[14px]">Reading Time</div>
              <div className="font-sans font-normal text-[#2d2d2d] text-[12px] md:text-[14px]">{blog.reading_time} minutes</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <UserIcon className="w-5 h-5 text-[#2d2d2d] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-sans font-medium text-[#2d2d2d] text-[12px] md:text-[14px]">Authors</div>
              <div className="font-sans font-normal text-[#2d2d2d] text-[12px] md:text-[14px]">
                {blog.authors.map((author, index) => (
                  <span key={author}>
                    {author}
                    {index < blog.authors.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <h4 className="font-outfit font-semibold text-black text-[18px] md:text-[20px] mb-3 flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-[#2d2d2d]" />
          Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block glass-card glass-card-blur-sm glass-card-opacity-light text-[#1447e6] font-sans font-medium text-[11px] md:text-[12px] px-3 py-1 rounded-[30px] hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <div className="mb-6">
        <h4 className="font-outfit font-semibold text-black text-[18px] md:text-[20px] mb-3">Share Article</h4>
        <ShareButtons 
          url={currentUrl}
          title={blog.title}
          description={blog.summary}
        />
      </div>

      {/* Reading Progress */}
      <div className="border-t border-[#e5e5e5] pt-6 mt-6">
        <h4 className="font-outfit font-semibold text-black text-[18px] md:text-[20px] mb-3">Reading Progress</h4>
        <div className="w-full bg-[#e5e5e5] rounded-full h-2">
          <div
            className="bg-[#1447e6] h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        <p className="font-sans font-normal text-[#2d2d2d] text-[11px] md:text-[12px] mt-2">
          {Math.round(readingProgress)}% completed
        </p>
      </div>
    </motion.div>
  );
}