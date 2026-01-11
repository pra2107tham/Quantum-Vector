"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  AcademicCapIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

export default function CoursesPage() {
  const scrollToCourses = () => {
    document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
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
      <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />

      {/* Hero Section */}
      <div className="glass-card-main relative min-h-[600px] md:min-h-[750px] mx-auto my-[15px] md:my-[23px] rounded-[20px] md:rounded-[32px] w-[calc(100%-20px)] md:w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[600px] md:min-h-[750px] w-full z-10">
          <Header />

          {/* Hero Content */}
          <div className="absolute flex flex-col md:flex-row gap-6 md:gap-10 items-start left-0 md:left-[59px] top-[110px] md:top-[140px] w-full md:w-[calc(100%-118px)] max-w-full md:max-w-none px-3 md:px-0 md:pr-[59px] pb-0">
            {/* Left Content */}
            <div className="flex flex-col gap-3 md:gap-5 items-start relative shrink-0 w-full md:w-[58%]">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#1447e6] text-[11px] md:text-sm whitespace-nowrap">
                  🎯 Job-Ready
                </span>
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#ff9900] text-[11px] md:text-sm whitespace-nowrap">
                  ☁️ AWS Focused
                </span>
              </div>

              {/* Title */}
              <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-[44px] lg:text-[52px] leading-tight w-full">
                AWS DevOps
                <span className="text-[#1447e6]"> Courses</span>
              </h1>

              {/* Description */}
              <p className="font-sans font-normal text-[#2d2d2d] text-[13px] md:text-[16px] leading-relaxed w-full max-w-[550px]">
                Master DevOps with AWS Cloud from scratch to production. Complete curriculum covering Linux, Docker, Kubernetes, and AWS services.
              </p>

              {/* Course Highlights */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">2–3 Month Program</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserGroupIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">1:1 Mentorship</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RocketLaunchIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">Real Projects</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/courses/aws-devops"
                className="bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base px-5 md:px-7 py-2.5 md:py-3.5 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap mt-2"
              >
                View Course Details →
              </Link>
            </div>

            {/* Right Content - Why Choose Card */}
            <div className="w-full md:w-[40%] shrink-0">
              <div className="glass-card glass-card-blur-md glass-card-opacity-light flex flex-col gap-4 md:gap-5 items-start p-4 md:p-6 relative rounded-[12px] md:rounded-[16px] shrink-0 w-full">
                <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-[22px]">
                  Why Choose Our Course?
                </h3>
                <div className="flex flex-col gap-3 md:gap-4 w-full">
                  {[
                    { title: "Industry Curriculum", desc: "Updated for 2024 job market" },
                    { title: "Project Portfolio", desc: "4 production-grade projects" },
                    { title: "Lifetime Access", desc: "Recordings & materials forever" },
                    { title: "Career Support", desc: "Resume + interview prep" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="bg-[#1447e6] rounded-full p-0.5 shrink-0 mt-0.5">
                        <CheckCircleIcon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans font-semibold text-[#2d2d2d] text-[12px] md:text-[14px]">{item.title}</span>
                        <span className="font-sans font-normal text-[#66707d] text-[10px] md:text-[12px]">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button 
            onClick={scrollToCourses}
            className="absolute bottom-[20px] md:bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm whitespace-nowrap">See Details</span>
        <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDownIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1447e6]" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Course Section */}
      <div id="courses-section" className="relative w-full mt-[40px] md:mt-[60px] scroll-mt-8">
        <div className="relative flex flex-col gap-6 md:gap-10 items-center px-2 md:px-4 max-w-[1383.548px] mx-auto">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-[36px] mb-2">
              Program Details
            </h2>
            <p className="font-sans text-[#66707d] text-[12px] md:text-base max-w-xl mx-auto">
              Everything you need to become a DevOps professional
            </p>
          </div>

          {/* AWS DevOps Course Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[900px] px-2"
          >
            <Link href="/courses/aws-devops" className="block">
              <div className="glass-card glass-card-blur-md glass-card-opacity-light rounded-[14px] md:rounded-[20px] p-4 md:p-6 hover:shadow-xl transition-all group">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  {/* Icon */}
                  <div className="bg-[#ff9900] rounded-[12px] md:rounded-[16px] p-3 md:p-4 shrink-0 group-hover:scale-105 transition-transform">
                    <AcademicCapIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                      <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[18px] md:text-[24px]">
                        Complete AWS DevOps Course
                      </h3>
                      <span className="glass-card glass-card-blur-sm px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold text-[#1447e6] whitespace-nowrap w-fit">
                        Starts Jan 19, 2026
                      </span>
                    </div>
                    
                    <p className="font-sans text-[#66707d] text-[12px] md:text-[15px] mb-3">
                      Master DevOps with AWS Cloud from scratch. Complete curriculum covering Linux, Docker, Kubernetes, CI/CD, and AWS services with 4 real-world projects.
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                      {["Linux", "Docker", "Kubernetes", "AWS", "Terraform", "Jenkins"].map((feature, i) => (
                        <span key={i} className="glass-card glass-card-blur-sm px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-sans text-[#2d2d2d]">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4 text-[#1447e6]" />
                          <span className="font-sans text-[#2d2d2d] text-[10px] md:text-sm">2-3 Months</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <RocketLaunchIcon className="w-4 h-4 text-[#1447e6]" />
                          <span className="font-sans text-[#2d2d2d] text-[10px] md:text-sm">4 Projects</span>
                        </div>
                      </div>
                      <span className="bg-[#1447e6] text-white font-sans font-semibold text-[11px] md:text-sm px-4 md:px-5 py-1.5 md:py-2 rounded-full group-hover:bg-[#0f3bb8] transition-colors">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
              </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative w-full mt-[50px] md:mt-[80px]">
        <div className="relative flex flex-col items-center justify-center pt-[30px] md:pt-[50px] pb-[30px] md:pb-[50px] px-2 md:px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
          </div>
  );
} 
