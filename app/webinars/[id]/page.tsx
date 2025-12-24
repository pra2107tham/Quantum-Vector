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
  UserGroupIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

// Webinar data
const webinarData: Record<string, any> = {
  "devops-roadmap-2026": {
    id: "devops-roadmap-2026",
    title: "DevOps Roadmap 2026 – Complete Career Guide",
    tagline: "Learn What to Study, How to Study, and How to Get DevOps Jobs in 2026",
    date: "28th December 2025",
    time: "9:00–10:30 AM IST",
    price: "₹99",
    originalPrice: null,
    mode: "Live Online",
    bonus: "Full End-to-End DevOps Roadmap PDF",
    status: "upcoming",
    description: "DevOps in 2026 demands real-world skills, not random tools or outdated tutorials. This session gives you a clear, practical, and industry-aligned DevOps career roadmap, so you know exactly what to learn and why.",
    whyMatters: {
      title: "Why DevOps Roadmap 2026 Matters 🚀",
      content: "DevOps in 2026 demands real-world skills, not random tools or outdated tutorials. This session gives you a clear, practical, and industry-aligned DevOps career roadmap, so you know exactly what to learn and why.",
    },
    whatYoullLearn: [
      "Complete DevOps Roadmap (2026-ready) – Beginner to Advanced",
      "Skills and tools companies actually hire for",
      "How to study DevOps step by step (no confusion, no guesswork)",
      "Cloud, CI/CD, Kubernetes, and Monitoring skills relevant for 2026 roles",
      "Career paths: DevOps Engineer, SRE, Platform Engineer, Cloud Engineer",
    ],
    whoIsFor: [
      "Students & freshers planning a DevOps career",
      "Working professionals switching to DevOps",
      "DevOps engineers unsure about their next learning step",
      "Anyone targeting DevOps jobs in 2026",
    ],
    whatYoullGet: [
      "Full End-to-End DevOps Roadmap PDF",
      "Clear learning order: Linux → Cloud → CI/CD → Kubernetes → Monitoring",
      "Guidance on where to learn and how to practice",
      "Career clarity with realistic expectations",
    ],
    whereToLearn: {
      title: "Where to Learn DevOps the Right Way 🏗️",
      content: "Continue your DevOps journey with QuantumVector, where we focus on real production-grade DevOps workflows, practical understanding over theory, and career-oriented learning, not just certifications. We teach DevOps the way companies use it in real environments.",
    },
    paymentLink: "https://rzp.io/rzp/82o07jIT",
  },
};

export default async function WebinarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const webinar = webinarData[id];

  if (!webinar) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-outfit font-bold text-[#2d2d2d] text-2xl mb-4">Webinar Not Found</h1>
          <Link href="/webinars" className="text-[#1447e6] hover:underline">
            ← Back to Webinars
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="absolute flex flex-col lg:flex-row gap-6 lg:gap-10 items-start left-0 md:left-[59px] top-[110px] md:top-[140px] w-full md:w-[calc(100%-118px)] max-w-full md:max-w-none px-3 md:px-0 md:pr-[59px] pb-[40px] md:pb-[60px]">
            {/* Left: Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col gap-4 md:gap-5"
            >
              {/* Badges */}
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
              <h1 className="font-outfit font-bold text-[#2d2d2d] text-[24px] md:text-[36px] lg:text-[44px] leading-tight">
                {webinar.title}
              </h1>

              {/* Tagline */}
              <p className="font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-[18px] leading-relaxed">
                {webinar.tagline}
              </p>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                  <span className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px]">{webinar.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                  <span className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px]">{webinar.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                  <span className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px]">One-Time Fee: {webinar.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <VideoCameraIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                  <span className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px]">{webinar.mode}</span>
                </div>
              </div>

              {/* Bonus */}
              <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-3 md:p-4 rounded-[10px]">
                <p className="font-sans font-medium text-[#1447e6] text-[13px] md:text-[15px]">
                  📄 Bonus: {webinar.bonus}
                </p>
              </div>
            </motion.div>

            {/* Right: Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-[380px] shrink-0"
            >
              <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-6 rounded-[16px] md:rounded-[20px] sticky top-[120px]">
                <div className="text-center mb-4">
                  <p className="font-sans text-[#66707d] text-[12px] md:text-sm mb-2">Registration Fee</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-outfit font-bold text-[#2d2d2d] text-[32px] md:text-[40px]">{webinar.price}</span>
                  </div>
                  <p className="font-sans text-[#66707d] text-[11px] md:text-xs mt-2">One-Time Fee</p>
                </div>

                <div className="border-t border-white/30 pt-4 mb-4">
                  <p className="font-sans text-[#66707d] text-[11px] md:text-[12px] text-center mb-3">
                    Includes: {webinar.bonus}
                  </p>
                  <p className="font-sans text-[#e54a2d] text-[11px] md:text-[12px] text-center font-semibold">
                    Limited Seats Available
                  </p>
                </div>

                <a
                  href={webinar.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1447e6] text-white font-sans font-semibold text-[14px] md:text-[16px] py-3 md:py-3.5 px-6 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg text-center block"
                >
                  Register Now – {webinar.price}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative w-full mt-[30px] md:mt-[50px] mb-[40px] md:mb-[60px]">
        <div className="relative flex flex-col gap-6 md:gap-8 items-center px-3 md:px-4 max-w-[1200px] mx-auto">
          {/* Why This Matters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] md:rounded-[20px] p-5 md:p-8 w-full"
          >
            <h2 className="font-outfit font-bold text-[#2d2d2d] text-[20px] md:text-[28px] mb-4">
              {webinar.whyMatters.title}
            </h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] leading-relaxed">
              {webinar.whyMatters.content}
            </p>
          </motion.div>

          {/* What You'll Learn */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] md:rounded-[20px] p-5 md:p-8 w-full"
          >
            <h2 className="font-outfit font-bold text-[#2d2d2d] text-[20px] md:text-[28px] mb-4">
              What You'll Learn in This Session 📘
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {webinar.whatYoullLearn.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-[#1447e6] shrink-0 mt-0.5" />
                  <span className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Who This Is For */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] md:rounded-[20px] p-5 md:p-8 w-full"
          >
            <h2 className="font-outfit font-bold text-[#2d2d2d] text-[20px] md:text-[28px] mb-4">
              Who This Session Is For 👥
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {webinar.whoIsFor.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <UserGroupIcon className="w-5 h-5 text-[#1447e6] shrink-0 mt-0.5" />
                  <span className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px]">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-sans font-medium text-[#66707d] text-[12px] md:text-[14px] mt-4">
              No prior DevOps experience required.
            </p>
          </motion.div>

          {/* What You'll Get */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] md:rounded-[20px] p-5 md:p-8 w-full"
          >
            <h2 className="font-outfit font-bold text-[#2d2d2d] text-[20px] md:text-[28px] mb-4">
              What You'll Get 🎁
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {webinar.whatYoullGet.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-[#1447e6] shrink-0 mt-0.5" />
                  <span className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Where to Learn */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] md:rounded-[20px] p-5 md:p-8 w-full"
          >
            <h2 className="font-outfit font-bold text-[#2d2d2d] text-[20px] md:text-[28px] mb-4">
              {webinar.whereToLearn.title}
            </h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] leading-relaxed">
              {webinar.whereToLearn.content}
            </p>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card glass-card-blur-md glass-card-opacity-medium rounded-[16px] md:rounded-[20px] p-6 md:p-8 w-full text-center"
          >
            <h2 className="font-outfit font-bold text-[#2d2d2d] text-[20px] md:text-[28px] mb-3">
              🚀 Get Clarity. Get Direction. Build Your DevOps Career.
            </h2>
            <p className="font-sans font-normal text-[#66707d] text-[14px] md:text-[16px] mb-6">
              Stop guessing your DevOps learning path. Start 2026 with a roadmap you can actually follow.
            </p>
            <a
              href={webinar.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1447e6] text-white font-sans font-semibold text-[14px] md:text-[16px] py-3 md:py-4 px-8 md:px-10 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg"
            >
              Register Now – Limited Seats Available →
            </a>
          </motion.div>
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

