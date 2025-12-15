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
  const companyLogos = [
    imgFrame,
    imgFrame1,
    imgFrame2,
    imgFrame3,
    imgFrame4,
    imgFrame5,
    imgFrame6,
    imgFrame7,
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-6 items-center relative shrink-0 w-full px-2">
      <p className="font-outfit font-semibold leading-tight relative shrink-0 text-[#2d2d2d] text-[18px] md:text-[32px] lg:text-[40px] text-center">
        Our Alumni Work At
      </p>
      <div className="w-full overflow-hidden">
        <div className="flex flex-wrap gap-3 md:gap-6 items-center justify-center w-full">
          {companyLogos.map((logo, index) => (
            <div key={index} className="relative shrink-0 w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-80 hover:opacity-100 transition-opacity">
              <Image src={logo} alt={`Company logo ${index + 1}`} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
