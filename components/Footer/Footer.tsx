"use client";
import React from "react";
import Link from "next/link";
import { FaInstagram, FaEnvelope, FaUsers } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-50 border-t border-blue-100 w-full pt-12 pb-8 px-4 md:px-12 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        {/* Left: About Quantum Vector */}
        <div className="flex-1 min-w-[250px] md:max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <FaUsers className="w-8 h-8 text-blue-700" />
            <span className="font-bold text-xl text-blue-900">Quantum Vector</span>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed mb-3">
            Empowering engineers to grow, innovate, and lead in the world of DevOps and Cloud computing through hands-on training and community support.
          </p>
          <Link href="/about" passHref>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline">
              Learn more about us →
            </button>
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex-[2] grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
          <div>
            <div className="font-semibold text-blue-900 mb-3 text-base">Explore</div>
            <ul className="space-y-2 text-neutral-600 text-sm">
              <li><Link href="/" className="hover:text-blue-700 hover:underline">Home</Link></li>
              <li><Link href="/courses" className="hover:text-blue-700 hover:underline">Courses</Link></li>
              <li><Link href="/webinars" className="hover:text-blue-700 hover:underline">Webinars</Link></li>
              <li><Link href="/blog" className="hover:text-blue-700 hover:underline">Blog</Link></li>
              <li><Link href="/about" className="hover:text-blue-700 hover:underline">About Us</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-blue-900 mb-3 text-base">Connect</div>
            <ul className="space-y-2 text-neutral-600 text-sm">
              <li><a href="https://www.instagram.com/devops__community/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:underline flex items-center gap-1.5"><FaInstagram /> Instagram</a></li>
              <li><a href="mailto:frontdesk@thedevopscommunity.com" className="hover:text-blue-700 hover:underline flex items-center gap-1.5"><FaEnvelope /> Support</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-blue-900 mb-3 text-base">Resources</div>
            <ul className="space-y-2 text-neutral-600 text-sm">
              <li><Link href="/#faq" className="hover:text-blue-700 hover:underline">FAQ</Link></li>
              <li><Link href="/contact-us" className="hover:text-blue-700 hover:underline">Contact Us</Link></li>
              <li><Link href="/shipping-and-delivery" className="hover:text-blue-700 hover:underline">Shipping & Delivery</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright and Quick Links */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-blue-200 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-neutral-500">
        <p>&copy; {new Date().getFullYear()} Quantum Vector from TheDevOpsCommunity. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 sm:mt-0">
          <Link href="/privacy-policy" className="hover:text-blue-700 hover:underline">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-blue-700 hover:underline">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
} 