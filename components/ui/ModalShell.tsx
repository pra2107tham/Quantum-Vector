"use client";

import { ReactNode } from "react";

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidthClass?: string;
}

export default function ModalShell({ isOpen, onClose, children, maxWidthClass = "max-w-md" }: ModalShellProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop with blur */}
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />
        {/* Card */}
        <div className={`relative w-full ${maxWidthClass} rounded-2xl border border-gray-200 bg-white/90 shadow-xl`}>
          {children}
        </div>
      </div>
    </div>
  );
}
