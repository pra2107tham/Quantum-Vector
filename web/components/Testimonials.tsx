"use client";

import Image from "next/image";
import { imgGroup4, imgFrame57 } from "../assets";

const testimonials = [
  {
    quote: `"Switched from QA to DevOps in 90 days. The mentors were always available!"`,
    author: "Ravi",
    company: "Capgemini",
    initial: "R",
  },
  {
    quote: `"Real projects made the difference. Landed my first DevOps job at Infosys!"`,
    author: "Priya",
    company: "Infosys",
    initial: "P",
  },
  {
    quote: `"Resume help was a game changer. Got 3 MNC interviews in a month."`,
    author: "Sandeep",
    company: "TCS",
    initial: "S",
  },
  {
    quote: `"Mock interviews gave me confidence to ace my Azure DevOps interview."`,
    author: "Anjali",
    company: "Cognizant",
    initial: "A",
  },
];

export default function Testimonials() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 items-center justify-center relative shrink-0 w-full px-2">
      <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-[36px] lg:text-[42px] text-center mb-2">
        Success Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-stretch relative shrink-0 w-full max-w-[900px]">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="glass-card glass-card-blur-md glass-card-opacity-light flex flex-col h-auto items-center justify-between p-4 md:p-5 relative rounded-[12px] md:rounded-[16px] shrink-0 w-full"
          >
            <div className="flex flex-col gap-3 items-center justify-center relative shrink-0 w-full z-10">
              {/* Quote Icon & Rating */}
              <div className="flex items-center justify-between w-full">
                <div className="overflow-clip relative shrink-0 w-8 h-8 md:w-10 md:h-10">
                  <Image src={imgGroup4} alt="" fill className="object-contain" />
                </div>
                <div className="h-3 md:h-4 relative shrink-0 w-20 md:w-24">
                  <Image src={imgFrame57} alt="5 stars" fill className="object-contain" />
                </div>
              </div>
              
              {/* Quote */}
              <p className="font-sans font-normal leading-relaxed not-italic relative shrink-0 text-[#2d2d2d] text-[12px] md:text-[14px] w-full text-center">
                {testimonial.quote}
              </p>
              
              {/* Author */}
              <div className="flex gap-2 md:gap-3 items-center justify-center relative shrink-0 mt-2">
                <div className="relative rounded-full shrink-0 w-9 h-9 md:w-11 md:h-11 bg-[#1447e6] flex items-center justify-center">
                  <span className="font-sans font-semibold text-white text-[14px] md:text-[18px]">
                    {testimonial.initial}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-sans font-semibold leading-tight text-[#2d2d2d] text-[12px] md:text-[14px]">
                    {testimonial.author}
                  </p>
                  <p className="font-sans font-normal leading-tight text-[#66707d] text-[10px] md:text-[12px]">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
