import {
  CloudIcon,
  ServerIcon,
  CogIcon,
  SparklesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ArrowPathIcon,
  PresentationChartBarIcon,
  ChipIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function Companies() {
  const companyLogos = [
    { Icon: CloudIcon, name: "Cloud" },
    { Icon: ServerIcon, name: "Server" },
    { Icon: CogIcon, name: "Automation" },
    { Icon: SparklesIcon, name: "Innovation" },
    { Icon: GlobeAltIcon, name: "Global" },
    { Icon: ShieldCheckIcon, name: "Security" },
    { Icon: AcademicCapIcon, name: "Academics" },
    { Icon: BriefcaseIcon, name: "Consulting" },
    { Icon: ArrowPathIcon, name: "Cycle" },
    { Icon: PresentationChartBarIcon, name: "Insights" },
    { Icon: ChipIcon, name: "Hardware" },
    { Icon: RocketLaunchIcon, name: "Launch" },
  ];
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

        <div className="flex flex-nowrap items-center gap-6 md:gap-10 animate-marquee" style={{ "--marquee-duration": "35s" } as React.CSSProperties}>
          {marqueeLogos.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-center shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-85 hover:opacity-100 transition-opacity rounded-full bg-white/60 shadow-inner"
              aria-label={entry.name}
            >
              <entry.Icon className="w-8 h-8 text-[#1447e6]" />
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
          animation: marquee var(--marquee-duration, 30s) linear infinite;
          width: max-content;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
