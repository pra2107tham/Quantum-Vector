"use client";

import Image from "next/image";
import Link from "next/link";
import {
  imgShape2,
  imgFolder2,
  imgFrame2147223317,
  imgGroup231,
  imgLine1,
} from "../assets";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#66707d] flex flex-col items-center px-4 md:px-[60px] py-5 md:py-[28px] relative rounded-[14px] md:rounded-[20px] shadow-md shrink-0 w-full max-w-[1410px]">
      <div className="flex flex-col gap-3 md:gap-4 items-center relative shrink-0 w-full max-w-[1260px]">
        {/* Logo */}
        <Link href="/" className="flex gap-2 md:gap-[14px] items-center">
          <div className="overflow-clip relative shrink-0 w-10 h-10 md:w-[55px] md:h-[55px]">
            <div className="absolute inset-[3.13%]">
              <div className="absolute inset-[-3.39%]">
                <Image src={imgShape2} alt="DevOps Community" fill sizes="55px" className="object-contain" />
              </div>
            </div>
            <div className="absolute contents inset-[32.03%_19.61%_31.48%_18.2%]">
              <div className="absolute inset-[32.03%_19.61%_31.48%_18.2%]">
                <Image src={imgFolder2} alt="" fill sizes="55px" className="object-contain" />
              </div>
            </div>
          </div>
          <p className="font-sans font-normal leading-normal text-[13px] md:text-[15px] text-white whitespace-nowrap">
            DevOps Community
          </p>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex flex-col gap-2 md:gap-3 items-center">
          <div className="flex flex-wrap gap-3 md:gap-6 items-center justify-center">
            <Link href="/" className="font-sans font-normal text-[12px] md:text-[14px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
              Home
            </Link>
            <Link href="/courses" className="font-sans font-normal text-[12px] md:text-[14px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
              Courses
            </Link>
            <Link href="/dclp" className="font-sans font-normal text-[12px] md:text-[14px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
              DCLP
            </Link>
            <Link href="/about" className="font-sans font-normal text-[12px] md:text-[14px] text-white hover:text-blue-200 transition-colors whitespace-nowrap">
              About
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-6 items-center justify-center">
            <Link href="/#faq" className="font-sans font-normal text-[11px] md:text-[13px] text-white/80 hover:text-white transition-colors whitespace-nowrap">FAQ</Link>
            <Link href="/contact-us" className="font-sans font-normal text-[11px] md:text-[13px] text-white/80 hover:text-white transition-colors whitespace-nowrap">Contact</Link>
            <Link href="/shipping-and-delivery" className="font-sans font-normal text-[11px] md:text-[13px] text-white/80 hover:text-white transition-colors whitespace-nowrap">Shipping</Link>
          </div>
        </div>
        
        {/* Social Icons */}
        <div className="flex gap-3 md:gap-4 items-center">
          <a
            href="https://www.instagram.com/devops__community/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 w-9 h-9 md:w-10 md:h-10 hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <Image
              src={imgGroup231}
              alt="Instagram"
              fill
              sizes="40px"
              className="object-contain"
            />
          </a>
          <a
            href="mailto:frontdesk@thedevopscommunity.com"
            className="relative shrink-0 w-9 h-9 md:w-10 md:h-10 hover:opacity-80 transition-opacity"
            aria-label="Email"
          >
            <Image
              src={imgFrame2147223317}
              alt="Email"
              fill
              sizes="40px"
              className="object-contain"
            />
          </a>
        </div>
        
        {/* Divider */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <Image src={imgLine1} alt="" fill sizes="100vw" className="object-contain" />
          </div>
        </div>
        
        {/* Copyright & Legal */}
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center w-full">
          <p className="font-sans font-medium text-[11px] md:text-[13px] text-center text-white/90">
            © {currentYear} DevOps Community
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 items-center justify-center">
            <Link href="/privacy-policy" className="font-sans font-normal text-[10px] md:text-[12px] text-white/70 hover:text-white transition-colors whitespace-nowrap">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="font-sans font-normal text-[10px] md:text-[12px] text-white/70 hover:text-white transition-colors whitespace-nowrap">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
