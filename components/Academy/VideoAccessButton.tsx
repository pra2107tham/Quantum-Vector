"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaPlay, FaLock } from 'react-icons/fa';
import AuthModal from '@/components/Auth/AuthModal';
import CheckoutModal from '@/components/Academy/CheckoutModal';
import type { User } from '@supabase/supabase-js';

type VideoAccessButtonVideo = { id: string; title: string; description?: string | null; is_free_preview: boolean }

interface VideoAccessButtonProps {
  video: VideoAccessButtonVideo;
  courseId: string;
  courseTitle: string;
  user: User | null;
  isEnrolled: boolean;
  isCompleted: boolean;
  coursePrice?: number;
}

export default function VideoAccessButton({ 
  video, 
  courseId, 
  user, 
  isEnrolled, 
  isCompleted,
  coursePrice = 999
}: VideoAccessButtonProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const status = getVideoStatus(video, user, isEnrolled);

  function getVideoStatus(video: VideoAccessButtonVideo, user: User | null, isEnrolled: boolean) {
    if (video.is_free_preview) return 'free';
    if (!user) return 'login_required';
    if (isEnrolled) return 'enrolled';
    return 'payment_required';
  }

  if (status === 'free' || status === 'enrolled') {
    return (
      <Link
        href={`/academy/courses/${courseId}/videos/${video.id}`}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        <FaPlay className="w-3 h-3" />
        {isCompleted ? 'Rewatch' : 'Watch'}
      </Link>
    );
  }

  if (status === 'login_required') {
    return (
      <>
        <button
          onClick={() => {
            setAuthModalMode('login');
            setAuthModalOpen(true);
          }}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Login to Watch
        </button>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authModalMode}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setCheckoutModalOpen(true)}
        className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
      >
        <FaLock className="w-3 h-3" />
        Unlock Video
      </button>

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        type="video"
        title={video.title}
        price={coursePrice}
        description={video.description ?? undefined}
        courseId={courseId}
        videoId={video.id}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
