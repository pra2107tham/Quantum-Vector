"use client";

import { useState } from 'react';
import Link from 'next/link';
import VideoAuthModal from './VideoAuthModal';
import CheckoutModal from '@/components/Academy/CheckoutModal';

interface VideoAccessGuardProps {
  canAccess: boolean;
  isEnrolled?: boolean;
  hasUser?: boolean;
  courseId: string;
  courseTitle?: string;
  courseDescription?: string;
  coursePrice?: number;
  videoTitle?: string;
  children: React.ReactNode;
}

export default function VideoAccessGuard({
  canAccess,
  hasUser = false,
  courseId,
  courseTitle,
  courseDescription,
  coursePrice = 999,
  videoTitle,
  children
}: VideoAccessGuardProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  if (canAccess) {
    return <>{children}</>;
  }

  const premiumCopy = courseTitle && videoTitle
    ? `"${videoTitle}" is part of our premium content. Enroll in "${courseTitle}" to access this video and more.`
    : "This video is part of our premium content.";

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Premium Content
          </h3>

          <p className="text-gray-600 mb-6">
            {premiumCopy}
          </p>

          <div className="space-y-3 w-full">
            {hasUser ? (
              <>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Enroll to Access
                </button>
                <Link
                  href={`/academy/courses/${courseId}`}
                  className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center"
                >
                  View Course Details
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  Sign Up to Access
                </button>
                <Link
                  href={`/academy/courses/${courseId}`}
                  className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center"
                >
                  View Course Details
                </Link>
                <div className="mt-6 text-sm text-gray-500">
                  <p>Already have an account? <button
                    onClick={() => setShowAuthModal(true)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign in here
                  </button></p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {!hasUser && (
        <VideoAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          courseTitle={courseTitle}
          videoTitle={videoTitle}
        />
      )}

      {hasUser && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          type="course"
          title={courseTitle || 'Course'}
          price={coursePrice}
          description={courseDescription}
          courseId={courseId}
        />
      )}
    </>
  );
}
