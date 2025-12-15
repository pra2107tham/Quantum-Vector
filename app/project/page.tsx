"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";
import { ClockIcon, RocketLaunchIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

export default function ProjectPage() {
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

      {/* Hero Section Container */}
      <div className="glass-card-main relative min-h-[500px] md:min-h-[600px] mx-auto my-[15px] md:my-[23px] rounded-[20px] md:rounded-[32px] w-[calc(100%-20px)] md:w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[500px] md:min-h-[600px] w-full z-10">
          <Header />

          {/* Launching Soon Content */}
          <div className="relative w-full pt-[110px] md:pt-[140px] pb-[40px] md:pb-[60px] px-4 md:px-[59px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[720px] flex flex-col items-center text-center gap-5 md:gap-6"
            >
              <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-4 py-1.5 rounded-full font-sans text-[11px] md:text-xs text-[#1447e6] flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Coming Soon
              </span>

              <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-[40px] lg:text-[48px] leading-tight">
                Real-World DevOps Project
                <span className="block text-[#1447e6] mt-1">
                  Launching Soon
                </span>
              </h1>

              <p className="font-sans text-[#2d2d2d] text-[13px] md:text-[16px] leading-relaxed max-w-[640px]">
                We are building a production-grade, end-to-end DevOps project that mirrors how modern engineering teams ship, secure, and operate applications in the real world.
                This page will soon host full details, architecture breakdowns, and step-by-step guidance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full mt-2">
                <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-3 md:p-4 rounded-[12px] flex flex-col items-center gap-1">
                  <RocketLaunchIcon className="w-6 h-6 text-[#1447e6]" />
                  <p className="font-sans font-semibold text-[#2d2d2d] text-[12px] md:text-sm">
                    Job-Ready Focus
                  </p>
                  <p className="font-sans text-[#66707d] text-[10px] md:text-xs">
                    Designed to match real hiring expectations.
                  </p>
                </div>
                <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-3 md:p-4 rounded-[12px] flex flex-col items-center gap-1">
                  <WrenchScrewdriverIcon className="w-6 h-6 text-[#1447e6]" />
                  <p className="font-sans font-semibold text-[#2d2d2d] text-[12px] md:text-sm">
                    Complete Pipeline
                  </p>
                  <p className="font-sans text-[#66707d] text-[10px] md:text-xs">
                    From code to deployment, monitoring, and automation.
                  </p>
                </div>
                <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-3 md:p-4 rounded-[12px] flex flex-col items-center gap-1">
                  <ClockIcon className="w-6 h-6 text-[#1447e6]" />
                  <p className="font-sans font-semibold text-[#2d2d2d] text-[12px] md:text-sm">
                    Stay Tuned
                  </p>
                  <p className="font-sans text-[#66707d] text-[10px] md:text-xs">
                    Details, timelines, and access will be announced soon.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative w-full mt-[30px] md:mt-[50px] mb-[30px] md:mb-[50px]">
        <div className="relative flex flex-col items-center justify-center px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}


