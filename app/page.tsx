"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
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
      {/* Fallback background color */}
      <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />

      {/* Main Content Container */}
      <div className="glass-card-main relative min-h-[785.582px] mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[785.582px] w-full z-10">
          <Header />
          <Hero />
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="relative w-full mt-[120px]">
        <div className="relative flex flex-col gap-[80px] md:gap-[120px] items-center justify-center pt-[60px] md:pt-[129px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          
          {/* DCLP Program Marketing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[1260px]"
          >
            <div className="glass-card glass-card-blur-lg glass-card-opacity-medium p-6 md:p-10 rounded-[20px] relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-[#1447e6]">
                  Only 6 Learners Per Batch
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                <div className="flex-1">
                  <h2 className="font-outfit font-semibold text-[#2d2d2d] text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight">
                    End-to-End DevOps & Cloud Job-Ready Program
                  </h2>
                  <p className="font-sans font-normal text-[#2d2d2d] text-base md:text-lg leading-relaxed mb-6">
                    Master DevOps from fundamentals to production-level skills. Learn how modern software is built, deployed, secured, and scaled in real companies.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-sm md:text-base text-[#2d2d2d]">Focused batch of only 6 learners</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-sm md:text-base text-[#2d2d2d]">Real-world projects & hands-on practice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-sm md:text-base text-[#2d2d2d]">Complete curriculum: Linux, Docker, K8s, AWS, Terraform</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-[#1447e6] shrink-0" />
                      <span className="font-sans text-sm md:text-base text-[#2d2d2d]">Job-ready with capstone project</span>
                    </div>
                  </div>

                  <Link
                    href="/dclp"
                    className="inline-block bg-[#1447e6] text-white font-sans font-semibold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-[30px] hover:bg-[#0f3bb8] transition-colors shadow-lg"
                  >
                    Learn More About the Program
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
