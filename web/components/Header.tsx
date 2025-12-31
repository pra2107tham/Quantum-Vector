"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="absolute top-[15px] md:top-[25px] left-1/2 -translate-x-1/2 w-[calc(100%-30px)] md:w-[95%] max-w-[1328px] z-50">
      {/* Header Bar */}
      <div 
        className={`glass-card glass-card-blur-lg glass-card-opacity-heavy flex items-center justify-between px-4 md:px-[40px] py-3 md:py-[6px] h-auto md:h-[86px] ${isMobileMenuOpen ? 'rounded-t-[20px] rounded-b-none' : 'rounded-[30px] md:rounded-[50px]'} transition-all`}
        style={{ overflow: 'visible' }}
      >
        {/* Logo */}
        <Link href="/" className="flex gap-3 md:gap-4 items-center shrink-0">
          <div className="relative shrink-0 w-[48px] h-[48px] md:w-[62px] md:h-[62px]">
            <Image
              src="/Logo/LOGO_ICON_PNG_FORMAT.png"
              alt="Quantum Vector"
              fill
              sizes="(max-width: 768px) 48px, 62px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-[1.05]">
            <span className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-[22px] whitespace-nowrap tracking-[-0.01em]">
              Quantum <span className="text-[#1447e6]">Vector</span>
            </span>
            <span className="font-sans font-medium text-[#2d2d2d]/60 text-[10px] md:text-[12px] whitespace-nowrap tracking-[0.02em] mt-0.5">
              from <span className="text-[#2d2d2d]/70">TheDevOpsCommunity</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-[30px] xl:gap-[50px] items-center">
          <Link 
            href="/" 
            className={`font-sans font-normal text-[16px] xl:text-[20px] transition-all cursor-pointer whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/20 ${pathname === '/' ? 'text-[#1447e6]' : 'text-[#2d2d2d] hover:text-[#1447e6]'}`}
          >
            Home
          </Link>
          <Link 
            href="/courses" 
            className={`font-sans font-normal text-[16px] xl:text-[20px] transition-all cursor-pointer whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/20 ${pathname === '/courses' || pathname === '/dclp' ? 'text-[#1447e6]' : 'text-[#2d2d2d] hover:text-[#1447e6]'}`}
          >
            Courses
          </Link>
          <Link 
            href="/webinars"
            className={`font-sans font-normal text-[16px] xl:text-[20px] transition-all cursor-pointer whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/20 ${pathname === '/webinars' || pathname?.startsWith('/webinars/') ? 'text-[#1447e6]' : 'text-[#2d2d2d] hover:text-[#1447e6]'}`}
          >
            Webinars
          </Link>
          <Link 
            href="/about"
            className={`font-sans font-normal text-[16px] xl:text-[20px] transition-all cursor-pointer whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/20 ${pathname === '/about' ? 'text-[#1447e6]' : 'text-[#2d2d2d] hover:text-[#1447e6]'}`}
          >
            About
          </Link>
        </nav>

        {/* Student Login Button - Desktop */}
        <Link 
          href="/student-login"
          className="hidden lg:flex bg-[#1447e6] h-[44px] xl:h-[52px] items-center justify-center px-4 xl:px-[18px] py-2 rounded-[30px] shrink-0 hover:bg-[#0f3bb8] transition-colors cursor-pointer"
        >
          <p className="font-sans font-semibold text-[14px] xl:text-[18px] text-white whitespace-nowrap">
            Student Login
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full rounded-b-[20px] border-t border-white/20 p-4 shadow-2xl bg-white">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-sans font-normal text-[16px] transition-all px-3 py-3 rounded-lg hover:bg-white/20 ${pathname === '/' ? 'text-[#1447e6]' : 'text-[#2d2d2d] hover:text-[#1447e6]'}`}
            >
              Home
            </Link>
            <Link
              href="/courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-sans font-normal text-[16px] transition-all px-3 py-3 rounded-lg hover:bg-white/20 ${pathname === '/courses' || pathname === '/dclp' ? 'text-[#1447e6]' : 'text-[#2d2d2d] hover:text-[#1447e6]'}`}
            >
              Courses
            </Link>
            <Link
              href="/webinars"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-sans font-normal text-[16px] transition-all px-3 py-3 rounded-lg hover:bg-white/20 ${pathname === '/webinars' || pathname?.startsWith('/webinars/') ? 'text-[#1447e6]' : 'text-[#2d2d2d] hover:text-[#1447e6]'}`}
            >
              Webinars
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-sans font-normal text-[16px] transition-all px-3 py-3 rounded-lg hover:bg-white/20 ${pathname === '/about' ? 'text-[#1447e6]' : 'text-[#2d2d2d] hover:text-[#1447e6]'}`}
            >
              About
            </Link>
            <Link
              href="/student-login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-[#1447e6] flex h-[48px] items-center justify-center px-[18px] py-[12px] rounded-[30px] hover:bg-[#0f3bb8] transition-colors mt-2 shadow-md"
            >
              <p className="font-sans font-semibold text-[16px] text-white whitespace-nowrap">
                Student Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
