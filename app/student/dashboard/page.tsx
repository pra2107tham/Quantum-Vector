"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/web/components/Header";
import { imgImage10 } from "@/web/assets";

function hasStudentSession() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("student_session="));
}

export default function StudentDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!hasStudentSession()) {
      router.replace("/student-login");
    }
  }, [router]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image
          src={imgImage10}
          alt="Quantum Vector background"
          fill
          className="object-cover object-center pointer-events-none"
          priority
          unoptimized
        />
      </div>
      <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />

      <div className="relative w-full max-w-[1383.548px] mx-auto px-2 md:px-4 pt-4 md:pt-6">
        <Header />
      </div>

      <div className="relative flex items-center justify-center px-4 pb-12 pt-4 md:pt-8 text-center">
        <div className="glass-card glass-card-blur-md glass-card-opacity-light p-8 md:p-10 rounded-[16px] md:rounded-[20px] w-full max-w-2xl shadow-xl">
          <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-[32px] mb-4">
            Student Dashboard
          </h1>
          <p className="font-sans text-[#66707d] text-[14px] md:text-[16px] leading-relaxed">
            Welcome! Course notes and webinar resources will be available here soon.
          </p>
        </div>
      </div>
    </div>
  );
}

