"use client";

import Image from "next/image";
import Link from "next/link";
import {
  imgShape2,
  imgFolder2,
  imgFrame2147223317,
  imgGroup232,
  imgGroup231,
  imgLine1,
} from "../assets";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#66707d] flex flex-col items-start px-[40px] md:px-[75px] py-[31px] relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full max-w-[1410px]">
      <div className="flex flex-col gap-[15px] items-center relative shrink-0 w-full max-w-[1260px]">
        <div className="flex flex-col gap-[30px] items-center relative shrink-0">
          <div className="flex flex-col gap-[50px] items-center relative shrink-0">
            <Link href="/" className="flex gap-[14px] items-center">
              <div className="overflow-clip relative shrink-0 size-[63px]">
                <div className="absolute inset-[3.13%]">
                  <div className="absolute inset-[-3.39%]">
                    <Image src={imgShape2} alt="DevOps Community" fill sizes="63px" className="object-contain" />
                  </div>
                </div>
                <div className="absolute contents inset-[32.03%_19.61%_31.48%_18.2%]">
                  <div className="absolute inset-[32.03%_19.61%_31.48%_18.2%]">
                    <Image src={imgFolder2} alt="" fill sizes="63px" className="object-contain" />
                  </div>
                </div>
              </div>
              <p className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                DevOps Community
              </p>
            </Link>
            <div className="flex flex-col gap-[20px] items-center relative shrink-0">
              <div className="flex flex-wrap gap-[20px] md:gap-[30px] items-center justify-center relative shrink-0">
                <Link href="/" className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[16px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
                  Home
                </Link>
                <Link href="/courses" className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[16px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
                  Courses
                </Link>
                <Link href="/dclp" className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[16px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
                  DCLP Program
                </Link>
                <Link href="/about" className="font-sans font-normal leading-normal not-italic relative shrink-0 text-[16px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
                  About Us
                </Link>
              </div>
              <div className="flex flex-wrap font-sans gap-[20px] md:gap-[30px] items-center justify-center leading-normal not-italic relative shrink-0 text-[16px] text-white">
                <Link href="/#faq" className="relative shrink-0 hover:text-blue-200 transition-colors whitespace-nowrap">FAQ</Link>
                <Link href="/contact-us" className="relative shrink-0 hover:text-blue-200 transition-colors whitespace-nowrap">Contact Us</Link>
                <Link href="/shipping-and-delivery" className="relative shrink-0 hover:text-blue-200 transition-colors whitespace-nowrap">Shipping & Delivery</Link>
              </div>
            </div>
          </div>
          <div className="flex h-[46.118px] items-start relative shrink-0">
            <div className="flex gap-[20px] items-center relative shrink-0">
              <a
                href="https://www.instagram.com/devops__community/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative shrink-0 size-[46.118px] hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Image
                  src={imgGroup231}
                  alt="Instagram"
                  fill
                  sizes="46.118px"
                  className="object-contain"
                />
              </a>
              <a
                href="mailto:frontdesk@thedevopscommunity.com"
                className="relative shrink-0 size-[46.118px] hover:opacity-80 transition-opacity"
                aria-label="Email"
              >
                <Image
                  src={imgFrame2147223317}
                  alt="Email"
                  fill
                  sizes="46.118px"
                  className="object-contain"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[15px] items-center relative shrink-0 w-full">
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <Image src={imgLine1} alt="" fill sizes="100vw" className="object-contain" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full">
            <p className="font-sans font-medium leading-normal not-italic relative shrink-0 text-[14px] md:text-[16px] text-center text-white">
              © {currentYear} DevOps Community. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 items-center justify-center">
              <Link href="/privacy-policy" className="font-sans font-normal text-[14px] md:text-[16px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="font-sans font-normal text-[14px] md:text-[16px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

