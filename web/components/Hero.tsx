"use client";

import Image from "next/image";
import Link from "next/link";
import { imgImage2, imgImage3, imgGroup3 } from "../assets";

export default function Hero() {
  return (
    <div className="absolute flex flex-col md:flex-row gap-8 md:gap-[100px] h-auto md:h-[591px] items-center left-0 md:left-[59px] top-[130px] md:top-[159px] w-full md:w-[calc(100%-118px)] max-w-full md:max-w-none px-3 md:px-0">
      <div className="flex flex-col items-start relative shrink-0 w-full md:w-[642px]">
        <div className="flex flex-col gap-5 md:gap-[30px] items-start relative shrink-0 w-full">
          <div className="flex flex-col gap-3 md:gap-[15px] items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-2 md:gap-[15px] items-start leading-normal relative shrink-0 w-full">
              <h1 className="font-outfit font-semibold relative shrink-0 text-[#2d2d2d] text-[28px] md:text-[56px] lg:text-[64px] w-full leading-tight">
                Land Your DevOps Job in 90 Days
              </h1>
              <p className="font-sans font-medium not-italic relative shrink-0 text-[#1447e6] text-[14px] md:text-[18px] lg:text-[20px] w-full">
                From Zero to Job-Ready — Guaranteed Results
              </p>
              <p className="font-sans font-normal not-italic relative shrink-0 text-[#2d2d2d] text-[13px] md:text-[16px] lg:text-[18px] w-full md:w-[574px] leading-relaxed">
                Join 2000+ engineers who transformed their careers with our intensive, mentor-led program. Learn from experts with 10+ years at top tech companies.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-[15px] items-center relative shrink-0">
              <div className="glass-card glass-card-blur-lg glass-card-opacity-medium flex h-[32px] md:h-[40px] items-center justify-center px-3 md:px-[18px] py-2 relative rounded-[30px] shrink-0">
                <p className="font-sans font-semibold leading-normal not-italic relative shrink-0 text-[#1447e6] text-[11px] md:text-[14px] z-10">
                  2000+ Success Stories
                </p>
              </div>
              <div className="glass-card glass-card-blur-lg glass-card-opacity-light flex h-[32px] md:h-[40px] items-center justify-center px-3 md:px-[18px] py-2 relative rounded-[30px] shrink-0">
                <p className="font-sans font-semibold leading-normal not-italic relative shrink-0 text-[#1447e6] text-[11px] md:text-[14px] z-10">
                  Hands-On Projects
                </p>
              </div>
              <div className="glass-card glass-card-blur-lg glass-card-opacity-light flex h-[32px] md:h-[40px] items-center justify-center px-3 md:px-[18px] py-2 relative rounded-[30px] shrink-0">
                <p className="font-sans font-semibold leading-normal not-italic relative shrink-0 text-[#1447e6] text-[11px] md:text-[14px] z-10">
                  1:1 Mentorship
                </p>
              </div>
            </div>
          </div>
          <Link href="/dclp">
            <div className="bg-[#1447e6] flex h-[44px] md:h-[52px] items-center justify-center px-5 md:px-[24px] py-3 relative rounded-[30px] shadow-lg shrink-0 hover:bg-[#0f3bb8] transition-colors cursor-pointer">
              <p className="font-sans font-semibold leading-normal not-italic relative shrink-0 text-[13px] md:text-[16px] text-white whitespace-nowrap">
                Start Your Journey →
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex glass-card glass-card-blur-lg glass-card-opacity-heavy flex-col gap-[20px] h-[620px] items-start p-[12px] relative rounded-[12px] shrink-0 w-[436px]">
        <div className="aspect-[680/461] relative rounded-[20px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
          <Image
            src={imgImage2}
            alt="DevOps Training"
            fill
            className="object-cover rounded-[20px] pointer-events-none"
          />
        </div>
        <div className="aspect-[436/312] relative rounded-[20px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
          <Image
            src={imgImage3}
            alt="DevOps Community"
            fill
            className="object-cover rounded-[20px] pointer-events-none"
          />
        </div>
        <div className="absolute h-[51px] left-[370px] top-[45px] w-[59px]">
          <Image src={imgGroup3} alt="" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
