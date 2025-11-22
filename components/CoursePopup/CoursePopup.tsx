"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { XMarkIcon, CalendarIcon, ClockIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, unknown>) => void;
  }
}

interface CoursePopupProps {
  showOnPages?: string[];
  delay?: number;
  courseName: string;
  startDate: string;
  duration: string;
  price: string;
  blockingFee: string;
  enrollUrl: string;
}

export default function CoursePopup({ 
  showOnPages = ['/courses/aws-devops'], 
  delay = 3000,
  courseName,
  startDate,
  duration,
  price,
  blockingFee,
  enrollUrl
}: CoursePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem(`course-popup-dismissed-${courseName}`);
    
    if (isDismissed === 'true') {
      return;
    }

    const currentPath = window.location.pathname;
    const shouldShow = showOnPages.some(page => 
      page === '/' ? currentPath === '/' : currentPath.startsWith(page)
    );

    if (!shouldShow) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [showOnPages, delay, courseName]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem(`course-popup-dismissed-${courseName}`, 'true');
  };

  const handleEnroll = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'course_popup_click', {
        event_category: 'engagement',
        event_label: courseName
      });
    }
    handleDismiss();
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={handleDismiss}
          />
          
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
                       bg-white rounded-2xl shadow-2xl border border-blue-200 
                       max-w-md w-[90vw] max-h-[90vh] overflow-hidden z-[10000]"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 
                         transition-colors z-[10001] bg-white/90 backdrop-blur-sm rounded-full
                         hover:bg-white shadow-lg border border-gray-200"
              style={{ pointerEvents: 'auto' }}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8 z-0" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8 z-0" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    🔥 LIMITED SEATS
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-1 leading-tight">
                  {courseName}
                </h2>
                <p className="text-blue-100 text-sm">
                  Starts {startDate} • {duration}
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Starts: {startDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Duration: {duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <CurrencyRupeeIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 line-through text-sm">{price}</span>
                    <span className="font-bold text-green-600 text-lg">{blockingFee}</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Limited seats
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">What You&apos;ll Master:</h3>
                <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>AWS core services & DevOps tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>CI/CD pipelines & automation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Kubernetes & containerization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Terraform & Infrastructure as Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Capstone project + Career support</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href={enrollUrl} onClick={handleEnroll}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                                   py-3 px-6 rounded-lg transition-colors duration-200 
                                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    🚀 Enroll Now - {blockingFee}
                  </button>
                </Link>
                
                <button
                  onClick={handleDismiss}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium 
                           py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Maybe Later
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>🏆</span>
                    <span>Expert Instructors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📜</span>
                    <span>Certificate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🔒</span>
                    <span>Lifetime Access</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

