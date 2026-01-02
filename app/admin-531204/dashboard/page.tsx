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

type StudentFile = {
  id: number;
  title: string;
  description: string | null;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
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
  
  // File upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileTitle, setFileTitle] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [files, setFiles] = useState<StudentFile[]>([]);
  const [filesLoading, setFilesLoading] = useState(false);

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

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError("Please select a file");
      return;
    }

    setUploadError("");
    setUploadSuccess(false);
    setUploadLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", fileTitle || selectedFile.name);
      if (fileDescription) {
        formData.append("description", fileDescription);
      }

      const res = await fetch("/api/admin/files/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Failed to upload file");
        return;
      }

      setUploadSuccess(true);
      setSelectedFile(null);
      setFileTitle("");
      setFileDescription("");
      // Refresh files list
      fetchFiles();
    } catch {
      setUploadError("Something went wrong. Please try again.");
    } finally {
      setUploadLoading(false);
    }
  };

  const fetchFiles = async () => {
    setFilesLoading(true);
    try {
      const res = await fetch("/api/admin/files/list");
      const data = await res.json();
      if (res.ok) {
        setFiles(data.files || []);
      }
    } catch {
      // Silent fail for now
    } finally {
      setFilesLoading(false);
    }
  };

  const handleDeleteFile = async (id: number) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch("/api/admin/files/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchFiles();
      }
    } catch {
      // Silent fail
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

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

            {/* File Upload Section */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[18px] md:text-[20px] mb-3">
                Upload Files for Students
              </h2>
              <p className="font-sans text-[#66707d] text-sm mb-4">
                Upload photos, videos, or PDFs that students can access from their dashboard.
              </p>

              <form onSubmit={handleFileUpload} className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <span className="font-sans text-[#2d2d2d] text-sm">File (Images, Videos, PDFs - Max 50MB)</span>
                  <input
                    type="file"
                    accept="image/*,video/*,.pdf"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    required
                    className="rounded-[12px] border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1447e6]"
                  />
                  {selectedFile && (
                    <span className="font-sans text-[#66707d] text-xs">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-sans text-[#2d2d2d] text-sm">Title (optional)</span>
                  <input
                    type="text"
                    value={fileTitle}
                    onChange={(e) => setFileTitle(e.target.value)}
                    placeholder="Leave empty to use file name"
                    className="rounded-[12px] border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1447e6]"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-sans text-[#2d2d2d] text-sm">Description (optional)</span>
                  <textarea
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                    placeholder="Add a description for this file"
                    rows={3}
                    className="rounded-[12px] border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1447e6]"
                  />
                </label>

                {uploadError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-[12px] px-3 py-2">
                    {uploadError}
                  </div>
                )}

                {uploadSuccess && (
                  <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-[12px] px-3 py-2">
                    File uploaded successfully!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploadLoading || !selectedFile}
                  className="bg-[#1447e6] text-white font-sans font-semibold rounded-[12px] py-3 hover:bg-[#0f3bb8] transition-colors disabled:opacity-70"
                >
                  {uploadLoading ? "Uploading..." : "Upload File"}
                </button>
              </form>

              {/* Files List */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-[18px]">
                    Uploaded Files ({files.length})
                  </h3>
                  <button
                    onClick={fetchFiles}
                    disabled={filesLoading}
                    className="text-sm text-[#1447e6] font-semibold hover:underline disabled:opacity-50"
                  >
                    {filesLoading ? "Loading..." : "Refresh"}
                  </button>
                </div>

                {files.length > 0 ? (
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 rounded-[12px] flex items-start justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-sans font-semibold text-[#2d2d2d] text-sm mb-1 truncate">
                            {file.title}
                          </h4>
                          {file.description && (
                            <p className="font-sans text-[#66707d] text-xs mb-2 line-clamp-2">
                              {file.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 text-xs text-[#66707d]">
                            <span>{file.file_name}</span>
                            <span>•</span>
                            <span>{(file.file_size / 1024 / 1024).toFixed(2)} MB</span>
                            <span>•</span>
                            <span>{new Date(file.uploaded_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-semibold shrink-0"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-sans text-[#66707d] text-sm">No files uploaded yet.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

