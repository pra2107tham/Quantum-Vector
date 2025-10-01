"use client";

import { useState } from 'react';
import Link from 'next/link';
import AuthModal from '@/components/Auth/AuthModal';

interface AcademyAuthSectionProps {
  user: any;
}

export default function AcademyAuthSection({ user }: AcademyAuthSectionProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  if (user) {
    return (
      <>
        <Link
          href="/academy/dashboard"
          className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Go to Dashboard
        </Link>
        <form action="/auth/logout" method="post">
          <button
            type="submit"
            className="rounded-xl bg-gray-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600"
          >
            Sign Out
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <div className="text-center">
        <p className="text-gray-600 mb-4">Sign in to access your enrolled courses and track progress</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              setAuthModalMode('login');
              setIsAuthModalOpen(true);
            }}
            className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthModalMode('signup');
              setIsAuthModalOpen(true);
            }}
            className="rounded-xl bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-200 hover:bg-blue-100"
          >
            Get Started
          </button>
        </div>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
