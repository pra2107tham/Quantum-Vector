"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function hasAdminSession() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("admin_session="));
}

function randomPassword(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasAdminSession()) {
      router.replace("/admin-531204");
    }
  }, [router]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setGeneratedPassword("");
    setLoading(true);
    const password = randomPassword(8);
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create student");
        return;
      }
      setGeneratedPassword(data.password || password);
      setName("");
      setUsername("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8ecf4] to-[#dfe6f3] px-4">
      <div className="glass-card glass-card-blur-md glass-card-opacity-light p-6 md:p-8 rounded-[16px] md:rounded-[20px] w-full max-w-2xl shadow-xl">
        <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-[30px] mb-4 text-center">
          Admin Dashboard
        </h1>
        <p className="font-sans text-[#66707d] text-[13px] md:text-[15px] text-center mb-6">
          Create student accounts. Passwords are shown once; copy and share securely.
        </p>

        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="font-sans text-[#2d2d2d] text-sm">Student name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-[12px] border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1447e6]"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-sans text-[#2d2d2d] text-sm">Student username (unique)</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="rounded-[12px] border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1447e6]"
              />
            </label>
          </div>

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
            {loading ? "Creating..." : "Create Student"}
          </button>
        </form>

        {generatedPassword && (
          <div className="mt-6 glass-card glass-card-blur-sm glass-card-opacity-light rounded-[12px] p-4 border border-[#1447e6]/30">
            <p className="font-sans font-semibold text-[#2d2d2d] text-sm mb-2">Student created</p>
            <p className="font-sans text-[#66707d] text-sm">Share this password with the student (shown once):</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="font-mono text-lg text-[#1447e6] bg-white/70 px-3 py-1 rounded">{generatedPassword}</span>
              <button
                onClick={() => navigator.clipboard.writeText(generatedPassword)}
                className="text-sm text-[#1447e6] font-semibold hover:underline"
                type="button"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

