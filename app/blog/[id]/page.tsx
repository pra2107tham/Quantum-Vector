"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";

import { BlogPost } from "@/types/blog";
import { getBlogById } from "@/lib/blog-api";
import BlogHero from "@/components/Blog/BlogHero";
import BlogContent from "@/components/Blog/BlogContent";
import BlogMeta from "@/components/Blog/BlogMeta";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ErrorMessage from "@/components/ui/error-message";
import { debugMetaTags } from "@/lib/social-sharing-utils";
import DCLPPopup from "@/components/DCLPPopup/DCLPPopup";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const blogData = await getBlogById(id);
        setBlog(blogData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Update reading progress
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(100, Math.max(0, (scrolled / maxScroll) * 100));
      
      // Update progress bar if it exists
      const progressBar = document.querySelector('[data-progress-bar]') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Set meta tags for social sharing - always call useEffect  
  useEffect(() => {
    if (!blog) return; // Early return if no blog data
    
    // Update document title
    document.title = `${blog.title} | DevOps Community Blog`;
    
    // Get current URL for meta tags
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    // Update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', blog.summary);
    updateMetaTag('author', blog.authors.join(', '));
    
    // Use blog image if available, otherwise fallback to default
    let blogImage = `${window.location.origin}/blue.png`; // Default fallback
    
    if (blog.image_url && blog.image_url.trim() !== '') {
      // Ensure the image URL is absolute
      if (blog.image_url.startsWith('http://') || blog.image_url.startsWith('https://')) {
        blogImage = blog.image_url;
      } else if (blog.image_url.startsWith('/')) {
        blogImage = `${window.location.origin}${blog.image_url}`;
      } else {
        blogImage = `${window.location.origin}/${blog.image_url}`;
      }
    }
    
    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Blog Image Debug:', {
        original_image_url: blog.image_url,
        processed_blogImage: blogImage,
        hasImage: !!(blog.image_url && blog.image_url.trim() !== ''),
        isAbsolute: blogImage.startsWith('http')
      });
    }
    
    // Enhanced description for social sharing - just the blog summary, no extra branding
    const socialDescription = blog.summary;
    
    // Open Graph tags for rich link previews - blog title as main title
    updateMetaTag('og:type', 'article');
    updateMetaTag('og:title', blog.title);
    updateMetaTag('og:description', socialDescription);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:image', blogImage);
    updateMetaTag('og:site_name', 'DevOps Community');
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:image:alt', blog.title);
    updateMetaTag('og:locale', 'en_US');
    
    // Article specific tags
    updateMetaTag('article:author', blog.authors.join(', '));
    updateMetaTag('article:published_time', blog.published_at);
    updateMetaTag('article:section', 'DevOps');
    updateMetaTag('article:tag', blog.tags.join(', '));
    
    // Twitter Card tags for Twitter sharing - blog title as main title
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@devops_community');
    updateMetaTag('twitter:creator', '@devops_community');
    updateMetaTag('twitter:title', blog.title);
    updateMetaTag('twitter:description', socialDescription);
    updateMetaTag('twitter:image', blogImage);
    updateMetaTag('twitter:image:alt', blog.title);
    
    // Additional meta tags for better SEO and sharing
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Additional tags for better social sharing
    updateMetaTag('og:updated_time', new Date().toISOString());
    updateMetaTag('article:modified_time', new Date().toISOString());
    updateMetaTag('article:expiration_time', new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()); // 1 year from now
    
    // WhatsApp specific tags
    updateMetaTag('og:image:type', 'image/jpeg');
    updateMetaTag('og:image:secure_url', blogImage);
    
    // LinkedIn specific tags
    updateMetaTag('linkedin:owner', 'devops-community');
    
    // Pinterest specific tags
    updateMetaTag('pinterest:description', socialDescription);
    updateMetaTag('pinterest:image', blogImage);
    
    // Add structured data (JSON-LD) for better SEO and social sharing
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blog.title,
      "description": socialDescription,
      "image": blogImage,
      "author": {
        "@type": "Person",
        "name": blog.authors.join(', ')
      },
      "publisher": {
        "@type": "Organization",
        "name": "DevOps Community",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.svg`
        }
      },
      "datePublished": blog.published_at,
      "dateModified": blog.published_at,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      },
      "keywords": blog.tags.join(', '),
      "articleSection": "DevOps",
      "wordCount": blog.content?.length || 0
    };
    
    // Remove existing structured data if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [blog]);

  if (loading) {
    return (
      <div className="relative w-full min-h-screen overflow-x-hidden">
        {/* Background Image */}
        <div className="fixed inset-0 -z-10 w-full h-full">
          <Image
            src={imgImage10}
            alt="DevOps Community Background"
            fill
            className="object-cover object-center pointer-events-none"
            priority
            unoptimized
          />
        </div>
        {/* Fallback background color */}
        <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 font-sans font-normal text-[#2d2d2d]">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="relative w-full min-h-screen overflow-x-hidden">
        {/* Background Image */}
        <div className="fixed inset-0 -z-10 w-full h-full">
          <Image
            src={imgImage10}
            alt="DevOps Community Background"
            fill
            className="object-cover object-center pointer-events-none"
            priority
            unoptimized
          />
        </div>
        {/* Fallback background color */}
        <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />
        
        <div className="flex items-center justify-center min-h-screen">
          <ErrorMessage
            title={error === "Blog post not found" ? "Blog Post Not Found" : "Failed to Load Blog Post"}
            message={error || "The blog post you're looking for doesn't exist or has been moved."}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image
          src={imgImage10}
          alt="DevOps Community Background"
          fill
          className="object-cover object-center pointer-events-none"
          priority
          unoptimized
        />
      </div>
      {/* Fallback background color */}
      <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />

      {/* Hero Section */}
      <div className="glass-card-main relative min-h-[500px] md:min-h-[600px] mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px] flex flex-col">
        <Header />
        <BlogHero blog={blog} />
      </div>

      {/* Content Section */}
      <div className="relative w-full mt-[40px] md:mt-[60px] mb-[40px] md:mb-[60px]">
        <div className="relative flex flex-col lg:flex-row gap-8 items-start justify-center px-4 max-w-[1447.97px] mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:w-2/3 w-full"
          >
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] p-6 md:p-8 lg:p-12">
              {blog.image_url && blog.image_url.trim() !== '' && (
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-[20px] overflow-hidden mb-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Silently handle image load errors
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <BlogContent content={blog.content} />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:w-1/3 w-full lg:sticky lg:top-6"
          >
            <BlogMeta blog={blog} />
          </motion.div>
        </div>
      </div>

      {/* Continue Reading Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative w-full mb-[40px] md:mb-[60px]"
      >
        <div className="relative flex items-center justify-center px-4 max-w-[1447.97px] mx-auto">
          <div className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] p-6 md:p-8 w-full">
            <h2 className="font-outfit font-semibold text-black text-[24px] md:text-[28px] mb-6 text-center">
              Continue Reading
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.history.back()}
                className="glass-card glass-card-blur-sm glass-card-opacity-light text-[#1447e6] px-6 py-3 font-sans font-semibold rounded-[30px] hover:bg-white/20 transition-all duration-200 whitespace-nowrap"
              >
                ← Previous Page
              </button>
              <button
                onClick={() => window.location.href = '/blog'}
                className="bg-[#1447e6] text-white px-6 py-3 font-sans font-semibold rounded-[30px] hover:bg-[#0d3bb3] transition-all duration-200 whitespace-nowrap shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
              >
                View All Posts
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <Footer />

      {/* DCLP Popup */}
      <DCLPPopup showOnPages={['/blog']} delay={3000} />

      {/* Reading Progress Bar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          data-progress-bar
          className="h-full bg-[#1447e6] transition-all duration-300 ease-out"
          style={{ width: '0%' }}
        />
      </div>
      
      {/* Debug button for development only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={debugMetaTags}
            className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-mono hover:bg-red-600 transition-colors"
            title="Debug Meta Tags (Development Only)"
          >
            🔍 Debug Meta
          </button>
        </div>
      )}
    </div>
  );
}