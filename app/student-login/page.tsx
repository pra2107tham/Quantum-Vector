"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/web/components/Header";
import { imgImage10 } from "@/web/assets";

export default function StudentLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Invalid credentials");
        return;
      }
      router.push("/student/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative flex items-center justify-center px-4 pb-12 pt-4 md:pt-8 min-h-[calc(100vh-140px)]">
        <div className="glass-card glass-card-blur-md glass-card-opacity-light p-6 md:p-8 rounded-[16px] md:rounded-[20px] w-full max-w-md shadow-xl">
          <h1 className="font-outfit font-bold text-[#2d2d2d] text-[24px] md:text-[28px] mb-4 text-center">
            Student Login
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="font-sans text-[#2d2d2d] text-sm">Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-[12px] border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1447e6]"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-sans text-[#2d2d2d] text-sm">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-[12px] border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1447e6]"
                required
              />
            </label>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-[12px] px-3 py-2">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1447e6] text-white font-sans font-semibold rounded-[12px] py-3 hover:bg-[#0f3bb8] transition-colors disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

