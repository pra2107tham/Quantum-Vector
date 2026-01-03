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
  const [selectedPreview, setSelectedPreview] = useState<{ file: StudentFile; url: string } | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [zoom, setZoom] = useState(100); // PDF zoom percentage
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

  const handleOpenPreview = async (file: StudentFile) => {
    setPreviewLoading(true);
    try {
      const url = await getSignedUrl(file.file_path);
      setSelectedPreview({ file, url });
      setZoom(100); // Reset to 100% when opening new file
    } catch (error) {
      alert("Failed to load file. Please try again.");
    } finally {
      setPreviewLoading(false);
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
                const typeLabel = isPDF ? "PDF Document" : isImage ? "Image" : isVideo ? "Video" : "File";

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
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#66707d] mb-3">
                          <span className="glass-card glass-card-blur-sm px-2 py-1 rounded-full text-[#1447e6] font-semibold">{typeLabel}</span>
                          <span>{formatFileSize(file.file_size)}</span>
                          <span>•</span>
                          <span>{new Date(file.uploaded_at).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="font-mono text-[#2d2d2d] truncate max-w-[180px]">{file.file_name}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleOpenPreview(file)}
                            disabled={previewLoading}
                            className="inline-flex items-center gap-2 bg-[#1447e6] text-white font-sans font-semibold text-[12px] md:text-[13px] px-4 py-2 rounded-full hover:bg-[#0f3bb8] transition-colors disabled:opacity-70"
                          >
                            {previewLoading ? "Loading..." : "View"}
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

      {/* Preview Modal (Image / Video / PDF) */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedPreview && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPreview(null)}
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
                  className="bg-white rounded-[20px] w-full max-w-3xl max-h-[90vh] min-h-[70vh] flex flex-col shadow-2xl pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-outfit font-bold text-[#2d2d2d] text-[18px] md:text-[20px] truncate">
                        {selectedPreview.file.title}
                      </h3>
                      {selectedPreview.file.description && (
                        <p className="font-sans text-[#66707d] text-[13px] md:text-[14px] mt-1 line-clamp-1">
                          {selectedPreview.file.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedPreview.file.file_type === "application/pdf" && (
                        <div className="flex items-center gap-2 bg-[#f3f5fb] rounded-full px-3 py-1">
                          <button
                            onClick={() => setZoom((z) => Math.max(50, z - 25))}
                            className="text-[#1447e6] font-bold text-sm px-2 py-1 rounded-full hover:bg-white"
                            aria-label="Zoom out"
                          >
                            −
                          </button>
                          <span className="font-sans text-[#2d2d2d] text-sm w-12 text-center">
                            {zoom}%
                          </span>
                          <button
                            onClick={() => setZoom((z) => Math.min(200, z + 25))}
                            className="text-[#1447e6] font-bold text-sm px-2 py-1 rounded-full hover:bg-white"
                            aria-label="Zoom in"
                          >
                            +
                          </button>
                          <button
                            onClick={() => setZoom(100)}
                            className="text-[#1447e6] font-semibold text-sm px-2 py-1 rounded-full hover:bg-white"
                            aria-label="Reset zoom"
                          >
                            Reset
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => setSelectedPreview(null)}
                        className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0"
                        aria-label="Close"
                      >
                        <XMarkIcon className="w-6 h-6 text-[#2d2d2d]" />
                      </button>
                    </div>
                  </div>

                  {/* Viewer */}
                  <div className="flex-1 overflow-auto bg-[#f7f8fb]">
                    {selectedPreview.file.file_type === "application/pdf" ? (
                      <div className="w-full h-full">
                        <iframe
                          key={zoom} // Force reload when zoom changes
                          src={`${selectedPreview.url}#zoom=${zoom}&toolbar=0&navpanes=0&scrollbar=1`}
                          className="w-full h-full min-h-[600px] border-0 bg-white"
                          title={selectedPreview.file.title}
                        />
                      </div>
                    ) : selectedPreview.file.file_type.startsWith("image/") ? (
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <img
                          src={selectedPreview.url}
                          alt={selectedPreview.file.title}
                          className="max-h-[70vh] max-w-full object-contain rounded-[12px] shadow-lg"
                        />
                      </div>
                    ) : selectedPreview.file.file_type.startsWith("video/") ? (
                      <div className="w-full h-full flex items-center justify-center bg-black">
                        <video
                          src={selectedPreview.url}
                          controls
                          className="w-full h-full max-h-[70vh]"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6">
                        <p className="font-sans text-[#66707d]">Preview not available for this file type.</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between p-4 md:p-6 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-[#66707d] flex-wrap">
                      <span className="glass-card glass-card-blur-sm px-2 py-1 rounded-full text-[#1447e6] font-semibold">
                        {selectedPreview.file.file_type === "application/pdf"
                          ? "PDF Document"
                          : selectedPreview.file.file_type.startsWith("image/")
                          ? "Image"
                          : selectedPreview.file.file_type.startsWith("video/")
                          ? "Video"
                          : "File"}
                      </span>
                      <span>{formatFileSize(selectedPreview.file.file_size)}</span>
                      <span>•</span>
                      <span>{selectedPreview.file.file_name}</span>
                    </div>
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

