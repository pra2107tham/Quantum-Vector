"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import { BlogPost } from "@/types/blog";
import { formatDate, getRelativeTime } from "@/lib/blog-api";
import { imgGroup } from "@/web/assets";

interface BlogCardProps {
  blog: BlogPost;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, type: "spring", stiffness: 90 },
  }),
};

export default function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="flex flex-col items-start w-full overflow-hidden group cursor-pointer"
    >
      <Link href={`/blog/${blog.slug}`} className="block h-full w-full">
        {/* Cover Image Header */}
        <div className="relative w-full h-[279px] overflow-hidden rounded-tl-[10px] rounded-tr-[10px] max-w-[407px]">
          <Image
            src="/Gemini_Generated_Image.png"
            alt={blog.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[53.226%] from-transparent to-black/50" />
          
          <div className="absolute inset-0 flex flex-col gap-[45px] items-start justify-end px-5 py-[30px] z-10">
            <div className="flex gap-[143px] items-center justify-between w-full">
              {/* Category Badge */}
              <div className="glass-card glass-card-blur-sm glass-card-opacity-medium flex h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px] backdrop-blur-[18.6px]">
                <p className="font-sans font-normal text-[#1447e6] text-[12px] whitespace-nowrap">
                  #{blog.category}
                </p>
              </div>
              
              {/* Reading Time */}
              <div className="glass-card glass-card-blur-sm glass-card-opacity-medium flex gap-[10px] h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px] backdrop-blur-[18.6px]">
                <Image src={imgGroup} alt="" width={16} height={16} className="shrink-0" />
                <p className="font-sans font-normal text-white text-[12px] whitespace-nowrap">
                  {blog.reading_time} min read
                </p>
              </div>
            </div>
            
            {/* Title Overlay */}
            <h3 className="font-outfit font-semibold text-white text-[20px] md:text-[24px] leading-tight line-clamp-2 max-w-[267px]">
              {blog.title.length > 52 ? `${blog.title.substring(0, 52)}...` : blog.title}
            </h3>
          </div>
        </div>

        {/* Content Card */}
        <div className="glass-card glass-card-blur-sm glass-card-opacity-light border border-white flex flex-col items-start justify-center px-[20px] py-[23px] md:py-[39px] rounded-bl-[10px] rounded-br-[10px] w-full max-w-[407px]">
          <div className="flex flex-col gap-[30px] items-start w-full">
            {/* Tags */}
            <div className="flex flex-col gap-[10px] items-start justify-center w-full">
              <div className="flex flex-wrap gap-[10px] items-start">
                {blog.tags.slice(0, 3).map((tag) => (
                  <div
                    key={tag}
                    className="glass-card glass-card-blur-sm glass-card-opacity-light flex h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px]"
                  >
                    <p className="font-sans font-normal text-[#1447e6] text-[12px] whitespace-nowrap">
                      #{tag}
                    </p>
                  </div>
                ))}
                {blog.tags.length > 3 && (
                  <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px] w-[83px]">
                    <p className="font-sans font-normal text-[#2d2d2d] text-[12px]">
                      +{blog.tags.length - 3} more
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-[10px] items-start w-full">
              {/* Title */}
              <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-[24px] leading-tight line-clamp-2 w-full">
                {blog.title}
              </h3>

              {/* Summary */}
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] leading-relaxed line-clamp-3 w-full">
                {blog.summary}
              </p>

              {/* Meta Information */}
              <div className="flex gap-[30px] items-start">
                <div className="flex gap-[10px] items-center">
                  <CalendarIcon className="w-[17px] h-[17px] text-[#2d2d2d] shrink-0" />
                  <p className="font-sans font-normal text-[#2d2d2d] text-[12px] whitespace-nowrap">
                    {formatDate(blog.published_at)}
                  </p>
                </div>
                <div className="flex gap-[10px] items-center">
                  <UserIcon className="w-[15px] h-[18px] text-[#2d2d2d] shrink-0" />
                  <p className="font-sans font-normal text-[#2d2d2d] text-[12px] whitespace-nowrap">
                    {blog.authors[0] || "DevOps Engineer"}
                  </p>
                </div>
              </div>

              {/* Read Article Link */}
              <div className="flex gap-[178px] items-start justify-between w-full">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="flex gap-[5px] items-center group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="font-sans font-semibold text-[#1447e6] text-[12px] group-hover/link:underline whitespace-nowrap">
                    Read Article
                  </p>
                  <svg className="w-[13px] h-[13px] text-[#1447e6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <p className="font-sans font-normal text-[12px] text-[rgba(45,45,45,0.25)] whitespace-nowrap">
                  {formatDate(blog.published_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}