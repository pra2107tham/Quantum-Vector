"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircleIcon, RocketLaunchIcon, UserGroupIcon, AcademicCapIcon, BriefcaseIcon, CalendarIcon, ClockIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import Header from "@/web/components/Header";
import Hero from "@/web/components/Hero";
import Companies from "@/web/components/Companies";
import Features from "@/web/components/Features";
import Testimonials from "@/web/components/Testimonials";
import FAQ from "@/web/components/FAQ";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

export default function Home() {
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

      {/* Main Content Container */}
      <div className="glass-card-main relative min-h-[650px] md:min-h-[785.582px] mx-auto my-[15px] md:my-[23px] rounded-[20px] md:rounded-[32px] w-[calc(100%-20px)] md:w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[650px] md:min-h-[785.582px] w-full z-10">
          <Header />
          <Hero />
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="relative w-full mt-[60px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[50px] md:gap-[100px] items-center justify-center pt-[40px] md:pt-[80px] pb-[30px] md:pb-[60px] px-2 md:px-4 max-w-[1447.97px] mx-auto">
          
          {/* AWS DevOps Course Marketing Section - Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[1300px] px-2"
          >
            <div className="glass-card glass-card-blur-lg glass-card-opacity-medium p-4 md:p-8 lg:p-10 rounded-[16px] md:rounded-[20px] relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 md:top-4 right-3 md:right-4">
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-sm font-bold text-[#ff9900]">
                  ☁️ AWS Focused
                </span>
              </div>

              <div className="flex flex-col gap-4 md:gap-6">
                {/* Header */}
                <div>
                  <p className="font-sans font-semibold text-[#1447e6] text-[11px] md:text-sm uppercase tracking-wider mb-1 md:mb-2">
                    Transform Your Career
                  </p>
                  <h2 className="font-outfit font-bold text-[#2d2d2d] text-[22px] md:text-3xl lg:text-4xl leading-tight">
                    Complete AWS DevOps Job-Ready Course
                  </h2>
                </div>
                
                {/* Value Proposition */}
                <p className="font-sans font-normal text-[#2d2d2d] text-[13px] md:text-base lg:text-lg leading-relaxed max-w-3xl">
                  Master DevOps with AWS Cloud from scratch. Our <span className="font-semibold text-[#1447e6]">comprehensive 2-3 month program</span> gives you the exact skills, projects, and mentorship to land your DevOps role.
                </p>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0 mt-0.5" />
                    <span className="font-sans text-[11px] md:text-sm text-[#2d2d2d]">Online & Offline (Hyderabad)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0 mt-0.5" />
                    <span className="font-sans text-[11px] md:text-sm text-[#2d2d2d]">4 Production-grade AWS projects</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0 mt-0.5" />
                    <span className="font-sans text-[11px] md:text-sm text-[#2d2d2d]">Linux, Docker, K8s, AWS, Terraform</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0 mt-0.5" />
                    <span className="font-sans text-[11px] md:text-sm text-[#2d2d2d]">Resume + interview prep included</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mt-2">
                  <Link
                    href="/courses/aws-devops"
                    className="bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base px-5 md:px-8 py-2.5 md:py-3.5 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg"
                  >
                    View Course Details →
                  </Link>
                  <span className="font-sans text-[11px] md:text-sm text-[#66707d]">
                    Starts January 12th, 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[1300px] px-2"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { icon: <UserGroupIcon className="w-6 h-6 md:w-8 md:h-8" />, number: "2000+", label: "Engineers Trained" },
                { icon: <BriefcaseIcon className="w-6 h-6 md:w-8 md:h-8" />, number: "85%", label: "Placement Rate" },
                { icon: <AcademicCapIcon className="w-6 h-6 md:w-8 md:h-8" />, number: "10+", label: "Years Experience" },
                { icon: <RocketLaunchIcon className="w-6 h-6 md:w-8 md:h-8" />, number: "4", label: "Real Projects" },
              ].map((stat, i) => (
                <div key={i} className="glass-card glass-card-blur-sm glass-card-opacity-light p-3 md:p-5 rounded-[12px] md:rounded-[16px] text-center">
                  <div className="text-[#1447e6] flex justify-center mb-2">{stat.icon}</div>
                  <p className="font-outfit font-bold text-[#2d2d2d] text-[20px] md:text-3xl">{stat.number}</p>
                  <p className="font-sans text-[#66707d] text-[10px] md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Webinars Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[1300px] px-2"
          >
            <div className="glass-card glass-card-blur-lg glass-card-opacity-medium p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                {/* Left: Content */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#1447e6] text-[11px] md:text-sm">
                      🎯 Upcoming Webinar
                    </span>
                    <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#e54a2d] text-[11px] md:text-sm">
                      ⚡ Limited Seats
                    </span>
                  </div>
                  
                  <h2 className="font-outfit font-bold text-[#2d2d2d] text-[20px] md:text-[28px] lg:text-[32px] leading-tight">
                    Python for DevOps 2026 – Live Weekend Webinar
                  </h2>
                  
                  <p className="font-sans font-normal text-[#66707d] text-[13px] md:text-[16px] leading-relaxed">
                    Hands-on Python automation for real DevOps workflows across two weekends.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-[#2d2d2d] text-[11px] md:text-[13px]">10, 11, 17, 18 (Two Weekends)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-[#2d2d2d] text-[11px] md:text-[13px]">6:00 PM – 9:00 PM IST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <VideoCameraIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-[#2d2d2d] text-[11px] md:text-[13px]">Live Online</span>
                    </div>
                  </div>
                  
                  <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-3 rounded-[10px]">
                    <p className="font-sans font-medium text-[#1447e6] text-[11px] md:text-[13px]">
                      📄 Bonus: Code templates + AWS/Boto3 snippets for automation
                    </p>
                  </div>
                </div>
                
                {/* Right: CTA */}
                <div className="w-full md:w-[240px] shrink-0 flex flex-col gap-4">
                  <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 rounded-[12px] text-center">
                    <p className="font-sans text-[#66707d] text-[11px] md:text-[12px] mb-1">One-Time Fee</p>
                    <p className="font-outfit font-bold text-[#1447e6] text-[24px] md:text-[28px]">₹1999</p>
                  </div>
                  <Link
                    href="/webinars/python-for-devops-2026"
                    className="w-full bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-[15px] py-3 px-6 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg text-center"
                  >
                    View Details & Register →
                  </Link>
                  <Link
                    href="/webinars"
                    className="w-full glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[12px] md:text-[14px] py-2.5 px-6 rounded-full hover:bg-white/20 transition-colors text-center"
                  >
                    View All Webinars
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          <Companies />
          <Features />
          <Testimonials />
          <FAQ />
          <Footer />
        </div>
      </div>
    </div>
  );
}
