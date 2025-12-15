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
      <div className="glass-card-main relative min-h-[700px] md:min-h-[800px] mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[700px] md:min-h-[800px] w-full z-10">
          <Header />

          {/* Hero Content */}
          <div className="absolute flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-center left-0 md:left-[59px] top-[120px] md:top-[140px] w-full md:w-[calc(100%-118px)] max-w-full md:max-w-none px-4 md:px-0 md:pr-[59px] pb-0">
            {/* Left Content */}
            <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full md:w-[60%]">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-4 py-2 rounded-full font-sans font-semibold text-[#1447e6] text-sm whitespace-nowrap">
                  🎯 Job-Ready Program
                </span>
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-4 py-2 rounded-full font-sans font-semibold text-[#2d2d2d] text-sm whitespace-nowrap">
                  🚀 Limited to 6 Learners
                </span>
              </div>

              {/* Title */}
              <h1 className="font-outfit font-semibold text-[#2d2d2d] text-[32px] md:text-[48px] lg:text-[56px] leading-tight w-full">
                DevOps & Cloud
                <br />
                <span className="text-[#1447e6]">Learning Program</span>
              </h1>

              {/* Description */}
              <p className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[18px] leading-relaxed w-full max-w-[600px]">
                A complete, end-to-end program designed to take you from core fundamentals to real-world production-level skills. Master Linux, Docker, Kubernetes, AWS, and more.
              </p>

              {/* Course Highlights */}
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-sm">Comprehensive Curriculum</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-sm">1-on-1 Mentorship</span>
                </div>
                <div className="flex items-center gap-2">
                  <RocketLaunchIcon className="w-5 h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-sm">Real Projects</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/dclp"
                className="bg-[#1447e6] text-white font-sans font-semibold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-[30px] hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap mt-4"
              >
                View Program Details
              </Link>
            </div>

            {/* Right Content - Why Choose Card */}
            <div className="w-full md:w-[38%] shrink-0">
              <div className="glass-card glass-card-blur-md glass-card-opacity-light flex flex-col gap-[24px] items-start px-[24px] py-[28px] relative rounded-[12px] shrink-0 w-full h-full">
                <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-[24px]">
                  Why Choose DCLP?
                </h3>
                <div className="flex flex-col gap-[16px] w-full">
                  {[
                    { title: "Industry-Relevant Curriculum", desc: "Updated content aligned with current industry standards" },
                    { title: "Project-Based Learning", desc: "Build real-world projects for your portfolio" },
                    { title: "Lifetime Access", desc: "Access to recordings and materials forever" },
                    { title: "Career Support", desc: "Resume review and interview preparation" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-[#1447e6] rounded-full p-1 shrink-0 mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-[16px]">{item.title}</span>
                        <span className="font-sans font-normal text-[#66707d] text-[12px] md:text-[14px]">{item.desc}</span>
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
            className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="font-sans text-[#2d2d2d] text-sm whitespace-nowrap">Explore Program</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDownIcon className="w-6 h-6 text-[#1447e6]" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Course Section */}
      <div id="courses-section" className="relative w-full mt-[60px] scroll-mt-8">
        <div className="relative flex flex-col gap-[40px] items-center px-4 max-w-[1383.548px] mx-auto">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[32px] md:text-[40px] mb-4">
              Our Program
            </h2>
            <p className="font-sans text-[#66707d] text-base md:text-lg max-w-2xl mx-auto">
              Complete DevOps & Cloud training designed for serious learners
            </p>
          </div>

          {/* DCLP Program Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[900px]"
          >
            <Link href="/dclp" className="block">
              <div className="glass-card glass-card-blur-md glass-card-opacity-light rounded-[20px] p-6 md:p-8 hover:shadow-xl transition-all group">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Icon */}
                  <div className="bg-[#1447e6] rounded-[16px] p-4 shrink-0 group-hover:scale-105 transition-transform">
                    <AcademicCapIcon className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[24px] md:text-[28px]">
                        DevOps & Cloud Learning Program (DCLP)
                      </h3>
                      <span className="glass-card glass-card-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#1447e6] whitespace-nowrap">
                        Limited Seats
                      </span>
                    </div>
                    
                    <p className="font-sans text-[#66707d] text-base md:text-lg mb-4">
                      End-to-end DevOps & Cloud job-ready program with focused batch of only 6 learners. 
                      Master Linux, Shell Scripting, Git, Jenkins, Docker, Kubernetes, AWS, Terraform, and more.
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {["Linux & Shell Scripting", "Docker & Kubernetes", "AWS Cloud", "CI/CD with Jenkins", "Terraform IaC", "Real Projects"].map((feature, i) => (
                        <span key={i} className="glass-card glass-card-blur-sm px-3 py-1.5 rounded-full text-sm font-sans text-[#2d2d2d]">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <UserGroupIcon className="w-5 h-5 text-[#1447e6]" />
                          <span className="font-sans text-[#2d2d2d] text-sm">6 Learners/Batch</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <RocketLaunchIcon className="w-5 h-5 text-[#1447e6]" />
                          <span className="font-sans text-[#2d2d2d] text-sm">Job-Ready</span>
                        </div>
                      </div>
                      <span className="bg-[#1447e6] text-white font-sans font-semibold text-sm px-6 py-2 rounded-full group-hover:bg-[#0f3bb8] transition-colors">
                        View Details →
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
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
