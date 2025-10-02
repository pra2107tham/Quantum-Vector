"use client";

import { useState } from 'react';
import { FaTimes, FaLock, FaCheck, FaClock, FaVideo } from 'react-icons/fa';
import ModalShell from '@/components/ui/ModalShell';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'video' | 'course';
  title: string;
  price: number;
  description?: string;
  features?: string[];
  courseId?: string;
  videoId?: string;
}

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  type, 
  title, 
  price, 
  description,
  features = [],
  courseId,
  videoId 
}: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setIsProcessing(true);
    console.log('Checkout initiated:', { type, courseId, videoId, price });
    setTimeout(() => { setIsProcessing(false); onClose(); }, 2000);
  };

  const defaultFeatures = type === 'course' 
    ? [
        'Full access to all course videos',
        'Downloadable resources and materials',
        'Progress tracking across all videos',
        'Certificate of completion',
        'Lifetime access to course content',
        '30-day money-back guarantee'
      ]
    : [
        'Access to this premium video',
        'High-quality video streaming',
        'Progress tracking for this video',
        'Mobile and desktop access'
      ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {type === 'course' ? (
                <FaVideo className="w-5 h-5 text-blue-600" />
              ) : (
                <FaLock className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{type === 'course' ? 'Enroll in Course' : 'Unlock Video'}</h2>
              <p className="text-sm text-gray-600">Secure checkout</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Item Details */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          {description && (<p className="text-sm text-gray-600 mb-2">{description}</p>)}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{type === 'course' ? 'Full Course Access' : 'Premium Video'}</span>
            <span className="text-xl font-bold text-blue-600">₹{price}</span>
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">What's included:</h4>
          <ul className="space-y-1">
            {displayFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheck className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Security Badge */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700 font-medium">Secure payment powered by Razorpay</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <FaLock className="w-4 h-4" />
              Proceed to Checkout - ₹{price}
            </>
          )}
        </button>

        {/* Money Back Guarantee */}
        {type === 'course' && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <FaClock className="w-4 h-4" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        )}
      </div>
    </ModalShell>
  );
}
