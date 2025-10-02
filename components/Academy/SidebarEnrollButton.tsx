"use client";

import { useState } from 'react';
import CheckoutModal from '@/components/Academy/CheckoutModal';

interface SidebarEnrollButtonProps {
  courseId: string;
  title: string;
  description?: string;
  price?: number;
  className?: string;
  label?: string;
}

export default function SidebarEnrollButton({ courseId, title, description, price = 999, className = '', label = 'Enroll to Access All Videos' }: SidebarEnrollButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`block w-full rounded-lg bg-green-600 px-4 py-2 text-center font-medium text-white hover:bg-green-700 ${className}`}
      >
        {label}
      </button>
      <CheckoutModal
        isOpen={open}
        onClose={() => setOpen(false)}
        type="course"
        title={title}
        price={price}
        description={description}
        courseId={courseId}
      />
    </>
  );
}
