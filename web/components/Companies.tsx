import {
  SiTata,
  SiInfosys,
  SiWipro,
  SiHcl,
  SiRelianceindustrieslimited,
  SiFlipkart,
  SiPhonepe,
  SiSwiggy,
  SiZomato,
  SiPaytm,
  SiRazorpay,
  SiCognizant,
} from "react-icons/si";

export default function Companies() {
  const companies = [
    { Icon: SiTata, name: "TCS" },
    { Icon: SiInfosys, name: "Infosys" },
    { Icon: SiWipro, name: "Wipro" },
    { Icon: SiHcl, name: "HCL" },
    { Icon: SiRelianceindustrieslimited, name: "Reliance" },
    { Icon: SiFlipkart, name: "Flipkart" },
    { Icon: SiPhonepe, name: "PhonePe" },
    { Icon: SiSwiggy, name: "Swiggy" },
    { Icon: SiZomato, name: "Zomato" },
    { Icon: SiPaytm, name: "Paytm" },
    { Icon: SiRazorpay, name: "Razorpay" },
    { Icon: SiCognizant, name: "Cognizant" },
  ];

  // duplicate list for seamless circular marquee
  const marqueeCompanies = [...companies, ...companies];

  return (
    <div className="flex flex-col gap-4 md:gap-6 items-center w-full px-2">
      <p className="font-outfit font-semibold text-[#2d2d2d] text-[18px] md:text-[32px] lg:text-[40px] text-center">
        Our Alumni Work At
      </p>

      <div className="relative w-full overflow-hidden py-4">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#dee2e9] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#dee2e9] to-transparent z-10" />

        <div
          className="flex flex-nowrap items-center gap-8 animate-marquee"
          style={{ "--marquee-duration": "30s" } as React.CSSProperties}
        >
          {marqueeCompanies.map((company, index) => (
            <div
              key={index}
              className={`shrink-0 flex items-center justify-center
                         w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
                         rounded-full bg-white/70 backdrop-blur
                         shadow-inner hover:shadow-md
                         opacity-80 hover:opacity-100 transition`}
              aria-label={company.name}
            >
              <company.Icon className="w-10 h-10 md:w-12 md:h-12 text-[#1447e6]" />
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
