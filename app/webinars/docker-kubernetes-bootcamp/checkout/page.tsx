"use client";

import React from "react";
import Link from "next/link";


export default function DockerKubernetesCheckoutPage() {
  // Registration is closed for this webinar
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-200 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🔒</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Registration Closed
            </h1>
            <p className="text-gray-600 mb-6">
              Registration for the Docker & Kubernetes Mastery Bootcamp has ended. 
              Thank you for your interest!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/webinars" 
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                View Other Webinars
              </Link>
              <Link 
                href="/courses" 
                className="bg-white text-blue-700 border border-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
