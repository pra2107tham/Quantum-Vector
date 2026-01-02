"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

// Webinar data
const webinars = [
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
    status: "upcoming",
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
      <div className="glass-card-main relative min-h-[500px] md:min-h-[600px] mx-auto my-[15px] md:my-[23px] rounded-[20px] md:rounded-[32px] w-[calc(100%-20px)] md:w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[500px] md:min-h-[600px] w-full z-10">
          <Header />

          {/* Hero Content */}
          <div className="absolute flex flex-col items-center justify-center left-0 md:left-[59px] top-[110px] md:top-[140px] w-full md:w-[calc(100%-118px)] max-w-full md:max-w-none px-3 md:px-0 md:pr-[59px] pb-[40px] md:pb-[60px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4 md:gap-6 items-center text-center max-w-[800px]"
            >
              <h1 className="font-outfit font-bold text-[#2d2d2d] text-[28px] md:text-[44px] lg:text-[56px] leading-tight">
                Live DevOps Webinars
              </h1>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[18px] leading-relaxed">
                Learn from industry experts in live, interactive sessions. Get practical insights, ask questions, and accelerate your DevOps career.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Webinars List Section */}
      <div className="relative w-full mt-[30px] md:mt-[50px] mb-[40px] md:mb-[60px]">
        <div className="relative flex flex-col gap-6 md:gap-8 items-center px-3 md:px-4 max-w-[1200px] mx-auto">
          {webinars.map((webinar, index) => (
            <motion.div
              key={webinar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] md:rounded-[20px] p-5 md:p-8 w-full hover:shadow-xl transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-5 md:gap-8">
                {/* Left: Content */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {webinar.status === "upcoming" && (
                      <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#1447e6] text-[11px] md:text-sm">
                        🎯 Upcoming
                      </span>
                    )}
                    <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#e54a2d] text-[11px] md:text-sm">
                      ⚡ Limited Seats
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-outfit font-bold text-[#2d2d2d] text-[20px] md:text-[28px] lg:text-[32px] leading-tight">
                    {webinar.title}
                  </h2>

                  {/* Tagline */}
                  <p className="font-sans font-normal text-[#66707d] text-[13px] md:text-[16px] leading-relaxed">
                    {webinar.tagline}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-[#2d2d2d] text-[12px] md:text-[14px]">{webinar.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-[#2d2d2d] text-[12px] md:text-[14px]">{webinar.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CurrencyDollarIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-[#2d2d2d] text-[12px] md:text-[14px]">One-Time Fee: {webinar.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <VideoCameraIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-[#2d2d2d] text-[12px] md:text-[14px]">{webinar.mode}</span>
                    </div>
                  </div>

                  {/* Bonus */}
                  <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-3 md:p-4 rounded-[10px] mt-2">
                    <p className="font-sans font-medium text-[#1447e6] text-[12px] md:text-[14px]">
                      📄 Bonus: {webinar.bonus}
                    </p>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="lg:w-[280px] shrink-0 flex flex-col justify-between gap-4">
                  <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 md:p-5 rounded-[12px] text-center">
                    <p className="font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-[16px] mb-2">
                      Register Now
                    </p>
                    <p className="font-outfit font-bold text-[#1447e6] text-[24px] md:text-[28px] mb-1">
                      {webinar.price}
                    </p>
                    <p className="font-sans text-[#66707d] text-[11px] md:text-[12px]">
                      One-Time Fee
                    </p>
                  </div>
                  <Link
                    href={`/webinars/${webinar.id}`}
                    className="w-full bg-[#1447e6] text-white font-sans font-semibold text-[14px] md:text-[16px] py-3 md:py-3.5 px-6 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg text-center"
                  >
                    View Details & Register →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative w-full mt-[40px] md:mt-[60px]">
        <div className="relative flex flex-col items-center justify-center px-2 md:px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}

