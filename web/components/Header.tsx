"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { imgShape1, imgFolder2 } from "../assets";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const handleCoursesClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      const coursesSection = document.querySelector('section[id="courses"]');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="absolute top-[15px] md:top-[25px] left-1/2 -translate-x-1/2 w-[calc(100%-30px)] md:w-[95%] max-w-[1328px] z-50 overflow-visible">
      {/* Header Bar */}
      <div className={`glass-card glass-card-blur-lg glass-card-opacity-heavy flex items-center justify-between px-4 md:px-[40px] py-3 md:py-[6px] h-auto md:h-[86px] ${isMobileMenuOpen ? 'rounded-t-[20px] rounded-b-none' : 'rounded-[30px] md:rounded-[50px]'} transition-all overflow-visible`}>
        {/* Logo */}
        <Link href="/" className="flex gap-2 md:gap-[14px] items-center shrink-0">
          <div className="overflow-clip relative shrink-0 size-[45px] md:size-[63px]">
            <div className="absolute inset-[3.13%]">
              <div className="absolute inset-[-3.39%]">
                <Image src={imgShape1} alt="DevOps Community" fill sizes="(max-width: 768px) 45px, 63px" className="object-contain" />
              </div>
            </div>
            <div className="absolute contents inset-[32.03%_19.61%_31.48%_18.2%]">
              <div className="absolute inset-[32.03%_19.61%_31.48%_18.2%]">
                <Image src={imgFolder2} alt="" fill sizes="(max-width: 768px) 45px, 63px" className="object-contain" />
              </div>
            </div>
          </div>
          <p className="font-sans font-normal leading-normal text-[#2d2d2d] text-[16px] md:text-[20px] whitespace-nowrap">
            DevOps Community
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-[30px] xl:gap-[50px] items-center">
          <Link 
            href="/courses" 
            onClick={handleCoursesClick}
            className="font-sans font-normal text-[#2d2d2d] text-[16px] xl:text-[20px] hover:text-[#1447e6] transition-all cursor-pointer whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/20"
          >
            Courses
          </Link>
          <Link 
            href="/webinars"
            className="font-sans font-normal text-[#2d2d2d] text-[16px] xl:text-[20px] hover:text-[#1447e6] transition-all cursor-pointer whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/20"
          >
            Webinars
          </Link>
          <div 
            className="relative z-[100]"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <button
              onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
              className={`flex gap-2 items-center font-sans font-normal text-[16px] xl:text-[20px] transition-all cursor-pointer whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/20 ${isSolutionsOpen ? 'text-[#1447e6]' : 'text-[#2d2d2d] hover:text-[#1447e6]'}`}
            >
              Solutions
              <svg 
                width="12" 
                height="8" 
                viewBox="0 0 12 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : 'rotate-0'}`}
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Desktop Dropdown */}
            {isSolutionsOpen && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-xl rounded-[12px] p-3 min-w-[180px] shadow-2xl border border-gray-200/50 z-[9999]"
              >
                <Link
                  href="/mock-interviews"
                  className="block font-sans font-normal text-[#2d2d2d] text-[16px] py-2 px-3 rounded-lg hover:text-[#1447e6] hover:bg-[#1447e6]/10 transition-all whitespace-nowrap"
                  onClick={() => setIsSolutionsOpen(false)}
                >
                  Mock Interviews
                </Link>
                <Link
                  href="/blog"
                  className="block font-sans font-normal text-[#2d2d2d] text-[16px] py-2 px-3 rounded-lg hover:text-[#1447e6] hover:bg-[#1447e6]/10 transition-all whitespace-nowrap"
                  onClick={() => setIsSolutionsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/dclp"
                  className="block font-sans font-normal text-[#2d2d2d] text-[16px] py-2 px-3 rounded-lg hover:text-[#1447e6] hover:bg-[#1447e6]/10 transition-all whitespace-nowrap"
                  onClick={() => setIsSolutionsOpen(false)}
                >
                  DCLP Program
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Register for Webinar Button - Desktop */}
        <Link 
          href="/webinars/terraform-azure-5day"
          className="hidden lg:flex bg-[rgba(147,155,164,0.49)] h-[44px] xl:h-[52px] items-center justify-center px-4 xl:px-[18px] py-2 rounded-[30px] shrink-0 hover:bg-[rgba(147,155,164,0.6)] transition-colors cursor-pointer"
        >
          <p className="font-sans font-semibold text-[14px] xl:text-[18px] text-[rgba(45,45,45,0.79)] whitespace-nowrap">
            Register For Webinar
          </p>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 text-[#2d2d2d] shrink-0"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - Connected to header */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full rounded-b-[20px] border-t border-white/20 p-4 shadow-2xl bg-white">
          <div className="flex flex-col gap-3">
            <Link
              href="/courses"
              onClick={(e) => {
                handleCoursesClick(e);
                setIsMobileMenuOpen(false);
              }}
              className="font-sans font-normal text-[#2d2d2d] text-[16px] hover:text-[#1447e6] transition-all px-3 py-3 rounded-lg hover:bg-white/20"
            >
              Courses
            </Link>
            <Link
              href="/webinars"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans font-normal text-[#2d2d2d] text-[16px] hover:text-[#1447e6] transition-all px-3 py-3 rounded-lg hover:bg-white/20"
            >
              Webinars
            </Link>
            <div className="flex flex-col">
              <button
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                className="flex items-center justify-between font-sans font-normal text-[#2d2d2d] text-[16px] hover:text-[#1447e6] transition-all px-3 py-3 rounded-lg hover:bg-white/20 w-full text-left"
              >
                Solutions
                <svg 
                  width="12" 
                  height="8" 
                  viewBox="0 0 12 8" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {isSolutionsOpen && (
                <div className="pl-6 flex flex-col gap-1 mt-2">
                  <Link
                    href="/mock-interviews"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSolutionsOpen(false);
                    }}
                    className="font-sans font-normal text-[#2d2d2d] text-[15px] hover:text-[#1447e6] transition-colors px-3 py-2 rounded-lg hover:bg-white/20"
                  >
                    Mock Interviews
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSolutionsOpen(false);
                    }}
                    className="font-sans font-normal text-[#2d2d2d] text-[15px] hover:text-[#1447e6] transition-colors px-3 py-2 rounded-lg hover:bg-white/20"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/dclp"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSolutionsOpen(false);
                    }}
                    className="font-sans font-normal text-[#2d2d2d] text-[15px] hover:text-[#1447e6] transition-colors px-3 py-2 rounded-lg hover:bg-white/20"
                  >
                    DCLP Program
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/webinars/terraform-azure-5day"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-[#66707d] flex h-[48px] items-center justify-center px-[18px] py-[12px] rounded-[30px] hover:bg-[#5a626d] transition-colors mt-2 shadow-md"
            >
              <p className="font-sans font-semibold text-[16px] text-white whitespace-nowrap">
                Register For Webinar
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

