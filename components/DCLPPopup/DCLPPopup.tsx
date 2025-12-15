"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, unknown>) => void;
  }
}

interface DCLPPopupProps {
  showOnPages?: string[]; // Pages where the popup should show
  delay?: number; // Delay before showing popup (in ms)
}

export default function DCLPPopup({ 
  showOnPages = ['/blog', '/blog/'], 
  delay = 3000 
}: DCLPPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup (session-based)
    const isDismissed = sessionStorage.getItem('dclp-popup-dismissed');
    
    if (isDismissed === 'true') {
      return; // Don't show if dismissed in this session
    }

    // Check if current page should show popup
    const currentPath = window.location.pathname;
    const shouldShow = showOnPages.some(page => 
      page === '/' ? currentPath === '/' : currentPath.startsWith(page)
    );

    if (!shouldShow) return;

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [showOnPages, delay]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Remember dismissal for this session only
    sessionStorage.setItem('dclp-popup-dismissed', 'true');
  };

  const handleLearnMore = () => {
    // Track click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'dclp_popup_click', {
        event_category: 'engagement',
        event_label: 'DCLP Program'
      });
    }
    handleDismiss();
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={handleDismiss}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4 
            }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       glass-card glass-card-blur-lg glass-card-opacity-heavy rounded-2xl shadow-2xl 
                       border border-white/30 max-w-md w-[90vw] max-h-[90vh] overflow-hidden z-[10000]"
          >
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 text-[#2d2d2d] hover:text-[#1447e6] 
                         transition-colors z-[10001] glass-card glass-card-blur-sm rounded-full
                         hover:bg-white/20 shadow-lg"
              style={{ pointerEvents: 'auto' }}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Badge */}
              <div className="mb-4">
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1 rounded-full text-xs font-semibold text-[#1447e6]">
                  Limited Batch - Only 6 Learners
                </span>
              </div>

              {/* Title */}
              <h3 className="font-outfit font-semibold text-[#2d2d2d] text-2xl md:text-3xl mb-3 leading-tight">
                End-to-End DevOps & Cloud Job-Ready Program
              </h3>

              {/* Description */}
              <p className="font-sans font-normal text-[#2d2d2d] text-sm md:text-base mb-4 leading-relaxed">
                Master DevOps from fundamentals to production-level skills. Learn how modern software is built, deployed, secured, and scaled in real companies.
              </p>

              {/* Key Points */}
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#1447e6] font-bold mt-1">✓</span>
                  <span className="font-sans text-sm text-[#2d2d2d]">Focused batch of only 6 learners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1447e6] font-bold mt-1">✓</span>
                  <span className="font-sans text-sm text-[#2d2d2d]">Real-world projects & hands-on practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1447e6] font-bold mt-1">✓</span>
                  <span className="font-sans text-sm text-[#2d2d2d]">Complete curriculum: Linux, Docker, K8s, AWS, Terraform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1447e6] font-bold mt-1">✓</span>
                  <span className="font-sans text-sm text-[#2d2d2d]">Job-ready with capstone project</span>
                </li>
              </ul>

              {/* CTA Button */}
              <Link
                href="/dclp"
                onClick={handleLearnMore}
                className="block w-full bg-[#1447e6] text-white text-center font-sans font-semibold 
                           py-3 px-6 rounded-[30px] hover:bg-[#0f3bb8] transition-colors shadow-lg"
              >
                Learn More About the Program
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

