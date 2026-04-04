"use client";

import { useState } from 'react';
import AuthModal from '@/components/Auth/AuthModal';
import ModalShell from '@/components/ui/ModalShell';

interface VideoAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  videoTitle?: string;
}

export default function VideoAuthModal({ isOpen, onClose, courseTitle, videoTitle }: VideoAuthModalProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');

  return (
    <>
      <ModalShell isOpen={isOpen} onClose={onClose}>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unlock Premium Content</h2>
          <p className="text-gray-600">
            {courseTitle && videoTitle
              ? `Access "${videoTitle}" from "${courseTitle}"`
              : "Sign up to access premium video content"
            }
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What you&apos;ll get:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>Full access to all premium videos</li>
              <li>Progress tracking across all courses</li>
              <li>Downloadable resources and materials</li>
              <li>Certificate of completion</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setAuthModalMode('login'); setAuthModalOpen(true); }} className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">Sign In</button>
            <button onClick={() => { setAuthModalMode('signup'); setAuthModalOpen(true); }} className="flex-1 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors font-medium">Get Started</button>
          </div>

          <p className="text-xs text-gray-500 text-center">Join thousands of DevOps professionals learning with us</p>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
          <button onClick={onClose} className="w-full text-sm text-gray-600 hover:text-gray-800 transition-colors">Continue browsing without signing up</button>
        </div>
      </ModalShell>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authModalMode} />
    </>
  );
}
