"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import Header from "@/web/components/Header";
import { imgImage10 } from "@/web/assets";
import {
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type StudentFile = {
  id: number;
  title: string;
  description: string | null;
  file_name: string;
  file_path: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
};

function hasStudentSession() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("student_session="));
}

function getFileIcon(fileType: string) {
  if (fileType.startsWith("image/")) return PhotoIcon;
  if (fileType.startsWith("video/")) return VideoCameraIcon;
  return DocumentIcon;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [files, setFiles] = useState<StudentFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPDF, setSelectedPDF] = useState<{ file: StudentFile; url: string } | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [urlCache, setUrlCache] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!hasStudentSession()) {
      router.replace("/student-login");
      return;
    }
    fetchFiles();
  }, [router]);

  const fetchFiles = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/student/files");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load files");
        return;
      }
      const fetchedFiles = data.files || [];
      setFiles(fetchedFiles);
      
      // Preload image URLs
      const imageFiles = fetchedFiles.filter((f: StudentFile) => f.file_type.startsWith("image/"));
      for (const file of imageFiles) {
        try {
          const url = await getSignedUrl(file.file_path);
          setUrlCache((prev) => ({ ...prev, [file.file_path]: url }));
        } catch {
          // Silent fail for image preloading
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getSignedUrl = async (filePath: string): Promise<string> => {
    // Check cache first
    if (urlCache[filePath]) {
      return urlCache[filePath];
    }

    try {
      const res = await fetch("/api/student/files/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_path: filePath }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        // Cache the URL
        setUrlCache((prev) => ({ ...prev, [filePath]: data.url }));
        return data.url;
      }
      throw new Error(data.error || "Failed to get file URL");
    } catch (error) {
      console.error("Error getting signed URL:", error);
      throw error;
    }
  };

  const handleOpenPDF = async (file: StudentFile) => {
    setPdfLoading(true);
    try {
      const url = await getSignedUrl(file.file_path);
      setSelectedPDF({ file, url });
    } catch (error) {
      alert("Failed to load PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleDownload = async (file: StudentFile) => {
    try {
      const url = await getSignedUrl(file.file_path);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Failed to download file. Please try again.");
    }
  };

  const handleViewImage = async (file: StudentFile) => {
    try {
      const url = await getSignedUrl(file.file_path);
      window.open(url, "_blank");
    } catch (error) {
      alert("Failed to load image. Please try again.");
    }
  };

  const handleViewVideo = async (file: StudentFile) => {
    try {
      const url = await getSignedUrl(file.file_path);
      window.open(url, "_blank");
    } catch (error) {
      alert("Failed to load video. Please try again.");
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
        <div className="glass-card glass-card-blur-md glass-card-opacity-light p-6 md:p-8 rounded-[16px] md:rounded-[20px] w-full max-w-4xl shadow-xl">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-[30px] text-center">
              Student Dashboard
            </h1>
            <p className="font-sans text-[#66707d] text-[13px] md:text-[15px] text-center">
              Access your course materials, notes, and resources
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="font-sans text-[#66707d]">Loading files...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="font-sans text-red-600">{error}</p>
              <button
                onClick={fetchFiles}
                className="mt-4 text-[#1447e6] font-semibold hover:underline"
              >
                Try again
              </button>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-sans text-[#66707d] text-[14px] md:text-[16px]">
                No files available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {files.map((file) => {
                const FileIcon = getFileIcon(file.file_type);
                const isImage = file.file_type.startsWith("image/");
                const isVideo = file.file_type.startsWith("video/");
                const isPDF = file.file_type === "application/pdf";

                return (
                  <div
                    key={file.id}
                    className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 md:p-5 rounded-[12px] md:rounded-[16px] hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* File Preview/Icon */}
                      <div className="shrink-0">
                        {isImage ? (
                          <div className="w-full md:w-32 h-32 rounded-[10px] overflow-hidden bg-gray-100 relative">
                            {urlCache[file.file_path] ? (
                              <img
                                src={urlCache[file.file_path]}
                                alt={file.title}
                                className="w-full h-full object-cover"
                                onError={async () => {
                                  // If cached URL fails, try to get a new one
                                  try {
                                    const url = await getSignedUrl(file.file_path);
                                    setUrlCache((prev) => ({ ...prev, [file.file_path]: url }));
                                  } catch {
                                    // Silent fail
                                  }
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <PhotoIcon className="w-8 h-8 text-[#1447e6]" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full md:w-32 h-32 rounded-[10px] bg-[#1447e6]/10 flex items-center justify-center">
                            <FileIcon className="w-12 h-12 text-[#1447e6]" />
                          </div>
                        )}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-[18px] mb-1">
                          {file.title}
                        </h3>
                        {file.description && (
                          <p className="font-sans text-[#66707d] text-[13px] md:text-[14px] mb-2 line-clamp-2">
                            {file.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#66707d] mb-3">
                          <span>{file.file_name}</span>
                          <span>•</span>
                          <span>{formatFileSize(file.file_size)}</span>
                          <span>•</span>
                          <span>{new Date(file.uploaded_at).toLocaleDateString()}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          {isPDF ? (
                            <button
                              onClick={() => handleOpenPDF(file)}
                              disabled={pdfLoading}
                              className="inline-flex items-center gap-2 bg-[#1447e6] text-white font-sans font-semibold text-[12px] md:text-[13px] px-4 py-2 rounded-full hover:bg-[#0f3bb8] transition-colors disabled:opacity-70"
                            >
                              {pdfLoading ? "Loading..." : "View PDF"}
                              <ArrowDownTrayIcon className="w-4 h-4" />
                            </button>
                          ) : isImage ? (
                            <button
                              onClick={() => handleViewImage(file)}
                              className="inline-flex items-center gap-2 bg-[#1447e6] text-white font-sans font-semibold text-[12px] md:text-[13px] px-4 py-2 rounded-full hover:bg-[#0f3bb8] transition-colors"
                            >
                              View Image
                              <ArrowDownTrayIcon className="w-4 h-4" />
                            </button>
                          ) : isVideo ? (
                            <button
                              onClick={() => handleViewVideo(file)}
                              className="inline-flex items-center gap-2 bg-[#1447e6] text-white font-sans font-semibold text-[12px] md:text-[13px] px-4 py-2 rounded-full hover:bg-[#0f3bb8] transition-colors"
                            >
                              Watch Video
                              <ArrowDownTrayIcon className="w-4 h-4" />
                            </button>
                          ) : null}
                          <button
                            onClick={() => handleDownload(file)}
                            className="inline-flex items-center gap-2 glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[12px] md:text-[13px] px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* PDF Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedPDF && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPDF(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  className="bg-white rounded-[20px] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-outfit font-bold text-[#2d2d2d] text-[18px] md:text-[20px] truncate">
                        {selectedPDF.file.title}
                      </h3>
                      {selectedPDF.file.description && (
                        <p className="font-sans text-[#66707d] text-[13px] md:text-[14px] mt-1 line-clamp-1">
                          {selectedPDF.file.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedPDF(null)}
                      className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0"
                      aria-label="Close"
                    >
                      <XMarkIcon className="w-6 h-6 text-[#2d2d2d]" />
                    </button>
                  </div>

                  {/* PDF Viewer */}
                  <div className="flex-1 overflow-hidden">
                    <iframe
                      src={selectedPDF.url}
                      className="w-full h-full min-h-[500px] border-0"
                      title={selectedPDF.file.title}
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between p-4 md:p-6 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-[#66707d]">
                      <span>{formatFileSize(selectedPDF.file.file_size)}</span>
                      <span>•</span>
                      <span>{selectedPDF.file.file_name}</span>
                    </div>
                    <button
                      onClick={() => handleDownload(selectedPDF.file)}
                      className="inline-flex items-center gap-2 bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-[14px] px-4 py-2 rounded-full hover:bg-[#0f3bb8] transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

