import Image from "next/image";
import { imgGroup, imgGroup1, imgGroup2 } from "../assets";

const features = [
  {
    title: "Real-World Projects",
    description: "Build production-grade applications",
    icon: imgGroup,
    isBlue: false,
  },
  {
    title: "Career Support",
    description: "Resume & LinkedIn optimization",
    icon: imgGroup1,
    isBlue: true,
  },
  {
    title: "Expert Mentorship",
    description: "1:1 guidance from senior engineers",
    icon: imgGroup2,
    isBlue: false,
  },
];

export default function Features() {
  return (
    <div className="flex flex-col gap-6 md:gap-[39px] items-center relative shrink-0 w-full max-w-[1298px] px-2">
      <p className="font-outfit font-semibold leading-tight min-w-full relative shrink-0 text-[#2d2d2d] text-[22px] md:text-[40px] lg:text-[48px] text-center">
        Why Engineers Choose Us
      </p>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 items-stretch w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${
                feature.isBlue ? "glass-card-blue" : "glass-card glass-card-blur-md glass-card-opacity-light"
              } flex flex-col h-auto items-center justify-center px-4 md:px-8 py-5 md:py-8 relative rounded-[12px] md:rounded-[16px] shrink-0 w-full`}
            >
              <div className="flex flex-col gap-3 md:gap-5 items-center relative shrink-0 w-full max-w-[312px] z-10">
                <div
                  className={`${
                    feature.isBlue ? "bg-[rgba(255,255,255,0.5)]" : "bg-[#66707d]"
                  } flex items-center justify-center p-2 md:p-3 relative rounded-full shrink-0 w-12 h-12 md:w-[65px] md:h-[65px]`}
                >
                  <div className="h-8 md:h-[50px] overflow-clip relative shrink-0 w-8 md:w-[50px]">
                    <div className="absolute inset-[6%]">
                      <Image src={feature.icon} alt="" fill className="object-contain" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className={`font-sans font-semibold leading-tight not-italic relative shrink-0 ${
                      feature.isBlue ? "text-white" : "text-[#2d2d2d]"
                    } text-[15px] md:text-[20px] lg:text-[22px]`}
                  >
                    {feature.title}
                  </p>
                  <p
                    className={`font-sans font-normal leading-tight not-italic relative shrink-0 ${
                      feature.isBlue ? "text-white/80" : "text-[#66707d]"
                    } text-[11px] md:text-[14px] mt-1`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
