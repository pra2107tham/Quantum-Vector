"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

// Webinar data
const webinars = [
  {
    id: "terraform-webinar-2026",
    title: "Terraform Webinar – Infrastructure as Code Mastery",
    tagline:
      "Master Terraform for production-ready Infrastructure as Code with hands-on projects across 5 days.",
    date: "28, 29, 30 Jan, 31 Jan, 1 Feb",
    time: "8:30 AM – 9:30 AM IST (10:30 AM on 31 Jan & 1 Feb)",
    price: "₹999",
    mode: "Live Online",
    bonus: "Terraform modules + Real-world project templates + CI/CD integration",
    status: "upcoming",
  },
  {
    id: "docker-kubernetes-2026",
    title: "Docker & Kubernetes Webinar – Live Weekend Program",
    tagline:
      "Master containerization and orchestration with hands-on microservices project across weekend sessions.",
    date: "31 Jan, 1, 7, 8 Feb",
    time: "7:00 PM – 9:30 PM IST",
    price: "₹2999",
    mode: "Live Online",
    bonus: "Docker scripts + K8s manifests + E-commerce project code",
    status: "upcoming",
  },
  {
    id: "python-for-devops-2026",
    title: "Python for DevOps 2026 – Live Weekend Webinar",
    tagline:
      "Hands-on Python automation for real DevOps workflows across two weekends.",
    date: "10, 11, 17, 18 (Two Weekends)",
    time: "6:00 PM – 9:00 PM IST",
    price: "₹1999",
    mode: "Live Online",
    bonus: "Code templates + AWS/Boto3 snippets for automation",
    status: "completed",
  },
  {
    id: "devops-roadmap-2026",
    title: "DevOps Roadmap 2026 – Complete Career Guide",
    tagline: "Learn What to Study, How to Study, and How to Get DevOps Jobs in 2026",
    date: "28th December 2025",
    time: "9:00–10:30 AM IST",
    price: "₹99",
    mode: "Live Online",
    bonus: "Full End-to-End DevOps Roadmap PDF",
    status: "completed",
  },
];

export default function WebinarsPage() {
  const scrollToWebinars = () => {
    document.getElementById("webinars-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image
          src={imgImage10}
          alt="Quantum Vector Background"
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
                  🎯 Live & Interactive
                </span>
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#ff9900] text-[11px] md:text-sm whitespace-nowrap">
                  ⚡ Career Growth
                </span>
              </div>

              {/* Title */}
              <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-[44px] lg:text-[52px] leading-tight w-full">
                Live DevOps
                <span className="text-[#1447e6]"> Webinars</span>
              </h1>

              {/* Description */}
              <p className="font-sans font-normal text-[#2d2d2d] text-[13px] md:text-[16px] leading-relaxed w-full max-w-[550px]">
                Learn from industry experts in live, interactive sessions. Get practical insights, ask questions, and accelerate your DevOps career with production-grade automation workflows.
              </p>

              {/* Webinar Highlights */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">Live Sessions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RocketLaunchIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">Practical Projects</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={scrollToWebinars}
                className="bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base px-5 md:px-7 py-2.5 md:py-3.5 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap mt-2"
              >
                Browse All Webinars ↓
              </button>
            </div>

            {/* Right Content - Why Choose Card */}
            <div className="w-full md:w-[40%] shrink-0">
              <div className="glass-card glass-card-blur-md glass-card-opacity-light flex flex-col gap-4 md:gap-5 items-start p-4 md:p-6 relative rounded-[12px] md:rounded-[16px] shrink-0 w-full">
                <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-[22px]">
                  Why Our Webinars?
                </h3>
                <div className="flex flex-col gap-3 md:gap-4 w-full">
                  {[
                    { title: "Expert Led", desc: "Taught by real DevOps engineers" },
                    { title: "Hands-on Focus", desc: "No boring theory, just automation" },
                    { title: "Live Q&A", desc: "Get your doubts cleared instantly" },
                    { title: "Resource Access", desc: "Code templates & roadmap PDFs" },
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
            onClick={scrollToWebinars}
            className="absolute bottom-[20px] md:bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm whitespace-nowrap">View Webinars</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDownIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1447e6]" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Webinars List Section */}
      <div id="webinars-section" className="relative w-full mt-[40px] md:mt-[60px] scroll-mt-8">
        <div className="relative flex flex-col gap-6 md:gap-10 items-center px-2 md:px-4 max-w-[1383.548px] mx-auto">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-[36px] mb-2">
              Available Webinars
            </h2>
            <p className="font-sans text-[#66707d] text-[12px] md:text-base max-w-xl mx-auto">
              Everything you need to accelerate your DevOps career
            </p>
          </div>

          <div className="relative flex flex-col gap-6 md:gap-8 items-center w-full max-w-[1100px] mx-auto">
            {webinars.map((webinar, index) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full px-2"
              >
                <Link href={`/webinars/${webinar.id}`} className="block">
                  <div className="glass-card glass-card-blur-md glass-card-opacity-light rounded-[14px] md:rounded-[20px] p-4 md:p-6 hover:shadow-xl transition-all group">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                      {/* Icon */}
                      <div className="bg-[#1447e6] rounded-[12px] md:rounded-[16px] p-3 md:p-4 shrink-0 group-hover:scale-105 transition-transform">
                        <RocketLaunchIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                          <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[18px] md:text-[24px]">
                            {webinar.title}
                          </h3>
                          <div className="flex gap-2">
                            {webinar.status === "upcoming" ? (
                              <span className="glass-card glass-card-blur-sm px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold text-[#1447e6] whitespace-nowrap w-fit">
                                🎯 Upcoming
                              </span>
                            ) : (
                              <span className="glass-card glass-card-blur-sm px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold text-[#198754] whitespace-nowrap w-fit">
                                ✓ Completed
                              </span>
                            )}
                            <span className="glass-card glass-card-blur-sm px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold text-[#e54a2d] whitespace-nowrap w-fit">
                              ⚡ Limited Seats
                            </span>
                          </div>
                        </div>
                        
                        <p className="font-sans text-[#66707d] text-[12px] md:text-[15px] mb-3">
                          {webinar.tagline}
                        </p>

                        <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
                          <div className="flex items-center gap-1.5">
                            <CalendarIcon className="w-4 h-4 text-[#1447e6]" />
                            <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{webinar.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ClockIcon className="w-4 h-4 text-[#1447e6]" />
                            <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{webinar.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <VideoCameraIcon className="w-4 h-4 text-[#1447e6]" />
                            <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{webinar.mode}</span>
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <span className="font-outfit font-bold text-[#1447e6] text-[20px] md:text-[24px]">
                              {webinar.price}
                            </span>
                            <span className="font-sans text-[#66707d] text-[10px] md:text-xs">
                              One-Time Fee
                            </span>
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
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative w-full mt-[50px] md:mt-[80px]">
        <div className="relative flex flex-col items-center justify-center pt-[30px] md:pt-[50px] pb-[30px] md:pb-[50px] px-2 md:px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}

