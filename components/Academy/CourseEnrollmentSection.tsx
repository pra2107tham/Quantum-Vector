"use client";

import { useState } from 'react';
import Link from 'next/link';
import AuthModal from '@/components/Auth/AuthModal';
import CheckoutModal from '@/components/Academy/CheckoutModal';

interface CourseEnrollmentSectionProps {
  user: any;
  isEnrolled: boolean;
  courseId: string;
  coursePrice: number;
  freeVideosCount: number;
  courseTitle?: string;
  courseDescription?: string;
}

export default function CourseEnrollmentSection({ 
  user, 
  isEnrolled, 
  courseId, 
  coursePrice, 
  freeVideosCount,
  courseTitle = "Course",
  courseDescription
}: CourseEnrollmentSectionProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (isEnrolled) {
    return (
      <div className="space-y-3">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-700 font-medium">✓ You're enrolled in this course</p>
        </div>
        <Link
          href="/academy/dashboard"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <div className="space-y-3">
          <button 
            onClick={() => setCheckoutModalOpen(true)}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Enroll Now - ₹{coursePrice}
          </button>
          <p className="text-xs text-gray-500 text-center">
            30-day money-back guarantee
          </p>
        </div>

        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          type="course"
          title={courseTitle}
          price={coursePrice}
          description={courseDescription}
          courseId={courseId}
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <button
          onClick={() => {
            setAuthModalMode('signup');
            setAuthModalOpen(true);
          }}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Sign Up to Enroll
        </button>
        <button
          onClick={() => {
            setAuthModalMode('login');
            setAuthModalOpen(true);
          }}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Already have an account?
        </button>
        {freeVideosCount > 0 && (
          <p className="text-xs text-gray-500 text-center">
            {freeVideosCount} free preview{freeVideosCount > 1 ? 's' : ''} available without signup
          </p>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
