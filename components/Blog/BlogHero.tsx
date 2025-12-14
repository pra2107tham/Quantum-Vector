"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BlogPost } from "@/types/blog";
import { getRelativeTime } from "@/lib/blog-api";

interface BlogHeroProps {
  blog: BlogPost;
}

export default function BlogHero({ blog }: BlogHeroProps) {
  return (
    <div className="relative flex flex-col gap-[20px] items-start w-full flex-1 justify-center px-4 md:px-[59px] pb-[40px] md:pb-[60px]">
      {/* Hero Content */}
      <div className="flex flex-col gap-[20px] items-start w-full max-w-[1095px] mx-auto mt-[80px] md:mt-[100px]">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 glass-card glass-card-blur-sm glass-card-opacity-light text-black px-4 py-2 rounded-[30px] hover:bg-white/20 transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="font-sans font-medium text-[14px] md:text-[16px] whitespace-nowrap">Back to Blog</span>
          </Link>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="glass-card glass-card-blur-sm glass-card-opacity-light text-[#1447e6] px-4 py-2 rounded-[30px] font-sans font-semibold text-[12px] md:text-[14px] whitespace-nowrap">
            {blog.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-outfit font-semibold text-black text-[32px] md:text-[48px] lg:text-[64px] leading-tight"
        >
          {blog.title}
        </motion.h1>
        
        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed max-w-[900px]"
        >
          {blog.summary}
        </motion.p>

        {/* Meta Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4 md:gap-6"
        >
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-[#2d2d2d]" />
            <span className="font-sans font-medium text-[#2d2d2d] text-[14px] md:text-[16px]">{blog.authors.join(", ")}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#2d2d2d]" />
            <span className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">{getRelativeTime(blog.published_at)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-[#2d2d2d]" />
            <span className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">{blog.reading_time} min read</span>
          </div>
        </motion.div>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-2 mt-2"
        >
          <Link href="/" className="font-sans font-normal text-[#1447e6] text-[14px] md:text-[16px] hover:underline transition-all">
            Home
          </Link>
          <span className="text-[#2d2d2d]">/</span>
          <Link href="/blog" className="font-sans font-normal text-[#1447e6] text-[14px] md:text-[16px] hover:underline transition-all">
            Blog
          </Link>
          <span className="text-[#2d2d2d]">/</span>
          <span className="font-sans font-medium text-black text-[14px] md:text-[16px] truncate max-w-[300px] md:max-w-none">
            {blog.title}
          </span>
        </motion.div>
      </div>
    </div>
  );
}