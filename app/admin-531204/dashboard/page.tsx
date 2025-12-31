"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/web/components/Header";
import { imgImage10 } from "@/web/assets";

type Student = {
  id: number;
  name: string;
  username: string;
  password: string;
};

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
  const [adminPassword, setAdminPassword] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [listError, setListError] = useState("");
  const [listLoading, setListLoading] = useState(false);

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

  const handleFetchStudents = async (e: React.FormEvent) => {
    e.preventDefault();
    setListError("");
    setListLoading(true);
    setStudents([]);
    try {
      const res = await fetch("/api/admin/students/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setListError(data.error || "Failed to fetch students");
        return;
      }
      setStudents(data.students || []);
    } catch {
      setListError("Something went wrong. Please try again.");
    } finally {
      setListLoading(false);
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

      <div className="relative flex items-start justify-center px-4 pb-12 pt-4 md:pt-8">
        <div className="glass-card glass-card-blur-md glass-card-opacity-light p-6 md:p-8 rounded-[16px] md:rounded-[20px] w-full max-w-4xl shadow-xl">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-[30px] text-center">
              Admin Dashboard
            </h1>
            <p className="font-sans text-[#66707d] text-[13px] md:text-[15px] text-center">
              Create student accounts and view existing students (requires admin password).
            </p>
          </div>

          <div className="flex flex-col gap-10">
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
              <div className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[12px] p-4 border border-[#1447e6]/30">
                <p className="font-sans font-semibold text-[#2d2d2d] text-sm mb-2">Student created</p>
                <p className="font-sans text-[#66707d] text-sm">Share this password with the student (shown once):</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-mono text-lg text-[#1447e6] bg-white/70 px-3 py-1 rounded">
                    {generatedPassword}
                  </span>
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

            <div className="border-t border-gray-200 pt-6">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[18px] md:text-[20px] mb-3">
                View existing students
              </h2>
              <p className="font-sans text-[#66707d] text-sm mb-4">
                Enter the admin password to fetch the latest list. Passwords are shown in plain text for now.
              </p>

              <form onSubmit={handleFetchStudents} className="flex flex-col md:flex-row gap-3 md:items-center mb-4">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password to view students"
                  required
                  className="flex-1 rounded-[12px] border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1447e6]"
                />
                <button
                  type="submit"
                  disabled={listLoading}
                  className="bg-[#1447e6] text-white font-sans font-semibold rounded-[12px] px-4 py-3 hover:bg-[#0f3bb8] transition-colors disabled:opacity-70"
                >
                  {listLoading ? "Fetching..." : "Show Students"}
                </button>
              </form>

              {listError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-[12px] px-3 py-2 mb-4">
                  {listError}
                </div>
              )}

              {students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-2 text-left font-semibold text-[#2d2d2d]">Name</th>
                        <th className="px-3 py-2 text-left font-semibold text-[#2d2d2d]">Username</th>
                        <th className="px-3 py-2 text-left font-semibold text-[#2d2d2d]">Password</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-3 py-2 text-[#2d2d2d]">{student.name}</td>
                          <td className="px-3 py-2 text-[#2d2d2d] font-mono">{student.username}</td>
                          <td className="px-3 py-2 text-[#1447e6] font-mono">{student.password}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="font-sans text-[#66707d] text-sm">No students to show yet.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

