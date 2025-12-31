"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8ecf4] to-[#dfe6f3] px-4 text-center">
      <div className="glass-card glass-card-blur-md glass-card-opacity-light p-8 md:p-10 rounded-[16px] md:rounded-[20px] w-full max-w-2xl shadow-xl">
        <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-[32px] mb-4">
          Student Dashboard
        </h1>
        <p className="font-sans text-[#66707d] text-[14px] md:text-[16px] leading-relaxed">
          Welcome! Course notes and webinar resources will be available here soon.
        </p>
      </div>
    </div>
  );
}

