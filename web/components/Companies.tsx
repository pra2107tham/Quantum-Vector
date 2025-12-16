import Image from "next/image";
import {
  imgFrame,
  imgFrame1,
  imgFrame2,
  imgFrame3,
  imgFrame4,
  imgFrame5,
  imgFrame6,
  imgFrame7,
} from "../assets";

export default function Companies() {
  // Seven unique logos only
  const companyLogos = [imgFrame, imgFrame1, imgFrame2, imgFrame3, imgFrame4, imgFrame5, imgFrame6];
  // Duplicate track for seamless loop; second pass is aria-hidden
  const marqueeLogos = [...companyLogos, ...companyLogos];

  return (
    <div className="flex flex-col gap-4 md:gap-6 items-center relative shrink-0 w-full px-2">
      <p className="font-outfit font-semibold leading-tight relative shrink-0 text-[#2d2d2d] text-[18px] md:text-[32px] lg:text-[40px] text-center">
        Our Alumni Work At
      </p>
      <div className="relative w-full overflow-hidden py-2">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 md:w-16 bg-gradient-to-r from-[#dee2e9] via-[#dee2e9]/70 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 md:w-16 bg-gradient-to-l from-[#dee2e9] via-[#dee2e9]/70 to-transparent z-10" />

        <div className="flex flex-nowrap items-center gap-6 md:gap-10 animate-marquee" style={{ "--marquee-duration": "22s" } as React.CSSProperties}>
          {marqueeLogos.map((logo, index) => (
            <div
              key={index}
              className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-85 hover:opacity-100 transition-opacity"
            >
              <Image src={logo} alt={`Company logo ${index + 1}`} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee var(--marquee-duration, 20s) linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
