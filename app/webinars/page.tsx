"use client";
import Image from "next/image";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import Webinars from "@/components/Webinars/Webinars";
import { imgImage10 } from "@/web/assets";

export default function WebinarsPage() {
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

      {/* Main Content Container with Header and Hero */}
      <div className="glass-card-main relative min-h-[700px] md:min-h-[800px] mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[700px] md:min-h-[800px] w-full z-10">
          <Header />
          
          {/* Hero Section */}
          <div className="absolute flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-center left-0 md:left-[59px] top-[120px] md:top-[140px] w-full md:w-[calc(100%-118px)] max-w-full md:max-w-none px-4 md:px-0 md:pr-[59px] pb-0">
            {/* Left Content */}
            <div className="flex flex-col gap-[30px] items-start relative shrink-0 w-full md:w-[60%]">
              {/* Heading Section */}
              <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <h1 className="font-outfit font-semibold relative shrink-0 text-[#2d2d2d] text-[32px] md:text-[56px] w-full leading-tight">
                  Webinars: Learn DevOps Live
                </h1>
                <p className="font-sans font-medium not-italic relative shrink-0 text-[#1447e6] text-[18px] md:text-[22px] w-full">
                  Master DevOps, Linux, and Cloud Technologies with Live Sessions
                </p>
                <p className="font-sans font-normal not-italic relative shrink-0 text-[#2d2d2d] text-[16px] md:text-[18px] w-full leading-relaxed">
                  Join our live, hands-on webinars to master DevOps, Linux, and cloud technologies. Each session is designed for real-world skills, career clarity, and direct Q&A with experts. Learn from industry professionals with 10+ years of experience from top tech companies and get practical experience that prepares you for DevOps roles.
                </p>
              </div>
              
              {/* Feature Badges */}
              <div className="flex flex-wrap gap-[15px] items-center relative shrink-0 w-full">
                <div className="glass-card glass-card-blur-lg glass-card-opacity-medium flex h-[40px] items-center justify-center px-[18px] py-[12px] relative rounded-[30px] shrink-0">
                  <p className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[#1447e6] text-[14px] md:text-[16px] z-10 whitespace-nowrap">
                    Live Sessions
                  </p>
                </div>
                <div className="glass-card glass-card-blur-lg glass-card-opacity-light flex h-[40px] items-center justify-center px-[18px] py-[12px] relative rounded-[30px] shrink-0">
                  <p className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[#1447e6] text-[14px] md:text-[16px] z-10 whitespace-nowrap">
                    Expert Q&A
                  </p>
                </div>
                <div className="glass-card glass-card-blur-lg glass-card-opacity-medium flex h-[40px] items-center justify-center px-[18px] py-[12px] relative rounded-[30px] shrink-0">
                  <p className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[#1447e6] text-[14px] md:text-[16px] z-10 whitespace-nowrap">
                    Recordings Access
                  </p>
                </div>
                <div className="glass-card glass-card-blur-lg glass-card-opacity-light flex h-[40px] items-center justify-center px-[18px] py-[12px] relative rounded-[30px] shrink-0">
                  <p className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[#1447e6] text-[14px] md:text-[16px] z-10 whitespace-nowrap">
                    Hands-On Practice
                  </p>
                </div>
                <div className="glass-card glass-card-blur-lg glass-card-opacity-medium flex h-[40px] items-center justify-center px-[18px] py-[12px] relative rounded-[30px] shrink-0">
                  <p className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[#1447e6] text-[14px] md:text-[16px] z-10 whitespace-nowrap">
                    Industry Experts
                  </p>
                </div>
              </div>

              {/* Webinar Highlights */}
              <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                <div className="flex items-start gap-[12px] relative shrink-0 w-full">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#1447e6]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#1447e6] text-[14px] font-semibold">✓</span>
                  </div>
                  <p className="font-sans font-normal not-italic relative shrink-0 text-[#2d2d2d] text-[15px] md:text-[16px] leading-relaxed flex-1">
                    Interactive live sessions with real-time coding and demos
                  </p>
                </div>
                <div className="flex items-start gap-[12px] relative shrink-0 w-full">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#1447e6]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#1447e6] text-[14px] font-semibold">✓</span>
                  </div>
                  <p className="font-sans font-normal not-italic relative shrink-0 text-[#2d2d2d] text-[15px] md:text-[16px] leading-relaxed flex-1">
                    Direct Q&A with experienced DevOps engineers
                  </p>
                </div>
                <div className="flex items-start gap-[12px] relative shrink-0 w-full">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#1447e6]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#1447e6] text-[14px] font-semibold">✓</span>
                  </div>
                  <p className="font-sans font-normal not-italic relative shrink-0 text-[#2d2d2d] text-[15px] md:text-[16px] leading-relaxed flex-1">
                    Lifetime access to webinar recordings and materials
                  </p>
                </div>
                <div className="flex items-start gap-[12px] relative shrink-0 w-full">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#1447e6]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#1447e6] text-[14px] font-semibold">✓</span>
                  </div>
                  <p className="font-sans font-normal not-italic relative shrink-0 text-[#2d2d2d] text-[15px] md:text-[16px] leading-relaxed flex-1">
                    Practical projects and real-world scenarios
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Why Choose Our Webinars */}
            <div className="w-full md:w-[38%] relative flex items-center">
              <div className="glass-card glass-card-blur-md glass-card-opacity-light flex flex-col gap-[24px] items-start px-[24px] py-[28px] relative rounded-[12px] shrink-0 w-full">
                <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-[24px] w-full">Why Choose Our Webinars?</h2>
                <div className="flex flex-col gap-[18px] items-start relative shrink-0 w-full">
                  <div className="flex items-start gap-[12px] relative shrink-0 w-full">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#1447e6] flex items-center justify-center shrink-0 flex-shrink-0">
                      <span className="text-white text-[18px] font-bold">✓</span>
                    </div>
                    <div className="flex flex-col gap-[4px] items-start relative shrink-0 flex-1 min-w-0">
                      <p className="font-sans font-semibold text-[#2d2d2d] text-[16px]">Expert-Led Sessions</p>
                      <p className="font-sans font-normal text-[#2d2d2d] text-[14px] leading-relaxed">Learn from industry professionals with real-world experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[12px] relative shrink-0 w-full">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#1447e6] flex items-center justify-center shrink-0 flex-shrink-0">
                      <span className="text-white text-[18px] font-bold">✓</span>
                    </div>
                    <div className="flex flex-col gap-[4px] items-start relative shrink-0 flex-1 min-w-0">
                      <p className="font-sans font-semibold text-[#2d2d2d] text-[16px]">Interactive Learning</p>
                      <p className="font-sans font-normal text-[#2d2d2d] text-[14px] leading-relaxed">Hands-on practice with live coding and demos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[12px] relative shrink-0 w-full">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#1447e6] flex items-center justify-center shrink-0 flex-shrink-0">
                      <span className="text-white text-[18px] font-bold">✓</span>
                    </div>
                    <div className="flex flex-col gap-[4px] items-start relative shrink-0 flex-1 min-w-0">
                      <p className="font-sans font-semibold text-[#2d2d2d] text-[16px]">Career-Focused</p>
                      <p className="font-sans font-normal text-[#2d2d2d] text-[14px] leading-relaxed">Practical skills that prepare you for DevOps roles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Webinars Content Section */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
      <Webinars />
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
} 