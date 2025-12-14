"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";
import { motion } from "motion/react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          type: 'general'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit message');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="flex flex-col gap-[20px] items-center justify-center flex-1 px-4 md:px-[59px] pb-[40px] md:pb-[60px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-outfit font-semibold text-black text-[32px] md:text-[48px] lg:text-[64px] text-center leading-tight"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[18px] lg:text-[20px] text-center max-w-[800px] leading-relaxed"
          >
            We&apos;d love to hear from you! Whether you have a question about our webinars, courses, pricing, or anything else, our team is ready to answer all your questions.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative w-full mt-[40px] md:mt-[60px] mb-[40px] md:mb-[60px]">
        <div className="relative flex flex-col lg:flex-row gap-8 items-start justify-center px-4 max-w-[1447.97px] mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] p-6 md:p-8">
              <h2 className="font-outfit font-semibold text-black text-[24px] md:text-[28px] mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-sans font-semibold text-black text-[14px] md:text-[16px] mb-2">
                    General Inquiries:
                  </p>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                    Email: <a href="mailto:info@thedevopscommunity.com" className="text-[#1447e6] hover:underline">info@thedevopscommunity.com</a>
                  </p>
                </div>

                <div>
                  <p className="font-sans font-semibold text-black text-[14px] md:text-[16px] mb-2">
                    Support:
                  </p>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                    Email: <a href="mailto:frontdesk@thedevopscommunity.com" className="text-[#1447e6] hover:underline">frontdesk@thedevopscommunity.com</a>
                  </p>
                </div>

                <div>
                  <p className="font-sans font-semibold text-black text-[14px] md:text-[16px] mb-2">
                    Business Hours:
                  </p>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Monday - Friday, 9 AM - 5 PM (India Standard Time)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] p-6 md:p-8">
              <h2 className="font-outfit font-semibold text-black text-[24px] md:text-[28px] mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-8 rounded-[20px] text-center">
                  <div className="w-16 h-16 bg-[#1447e6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-outfit font-semibold text-black text-[24px] md:text-[28px] mb-2">Thank You!</h3>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="block font-sans font-medium text-black text-[12px] md:text-[14px]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-[10px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="block font-sans font-medium text-black text-[12px] md:text-[14px]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-[10px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="subject" className="block font-sans font-medium text-black text-[12px] md:text-[14px]">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this regarding?"
                      className="w-full px-4 py-2.5 rounded-[10px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="message" className="block font-sans font-medium text-black text-[12px] md:text-[14px]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2.5 rounded-[10px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d] resize-none"
                    />
                  </div>
                  {error && (
                    <div className="glass-card glass-card-blur-sm glass-card-opacity-light border border-red-200 text-red-600 px-4 py-3 rounded-[10px] font-sans font-normal text-[12px] md:text-[14px]">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1447e6] hover:bg-[#0d3bb3] text-white font-sans font-semibold text-[14px] md:text-[16px] py-3 px-6 rounded-[30px] focus:outline-none focus:ring-2 focus:ring-[#1447e6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-lg whitespace-nowrap"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative w-full mt-[40px] md:mt-[60px]">
        <div className="relative flex flex-col items-center justify-center px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
