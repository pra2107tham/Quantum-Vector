"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";
import { motion } from "motion/react";
import { EnvelopeIcon, PhoneIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          name: form.name,
          email: form.email,
          phone: form.phone || '',
          type: 'contact',
          message: form.message
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
        phone: '',
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
      <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />

      {/* Hero Section */}
      <div className="glass-card-main relative min-h-[400px] md:min-h-[500px] mx-auto my-[15px] md:my-[23px] rounded-[20px] md:rounded-[32px] w-[calc(100%-20px)] md:w-[calc(100%-50px)] max-w-[1383.548px] flex flex-col">
        <Header />
        <div className="flex flex-col gap-4 md:gap-5 items-center justify-center flex-1 px-3 md:px-[59px] pb-[30px] md:pb-[50px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-outfit font-semibold text-black text-[28px] md:text-[44px] lg:text-[56px] text-center leading-tight"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans font-normal text-[#2d2d2d] text-[13px] md:text-[16px] lg:text-[18px] text-center max-w-[700px] leading-relaxed"
          >
            Have questions about our DCLP program? We&apos;re here to help you make the right decision for your DevOps career.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative w-full mt-[30px] md:mt-[50px] mb-[30px] md:mb-[50px]">
        <div className="relative flex flex-col lg:flex-row gap-5 md:gap-8 items-start justify-center px-2 md:px-4 max-w-[1200px] mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-[45%] w-full"
          >
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] md:rounded-[20px] p-5 md:p-8">
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[26px] mb-5 md:mb-6">Get in Touch</h2>
              
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-2.5 rounded-[10px] bg-[#1447e6]/10 shrink-0">
                    <EnvelopeIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1447e6]" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-black text-[13px] md:text-[15px] mb-1">Email</p>
                    <a href="mailto:frontdesk@thedevopscommunity.com" className="font-sans font-normal text-[#1447e6] text-[12px] md:text-[14px] hover:underline break-all">
                      frontdesk@thedevopscommunity.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-2.5 rounded-[10px] bg-[#1447e6]/10 shrink-0">
                    <ClockIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1447e6]" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-black text-[13px] md:text-[15px] mb-1">Business Hours</p>
                    <p className="font-sans font-normal text-[#2d2d2d] text-[12px] md:text-[14px]">Monday - Friday</p>
                    <p className="font-sans font-normal text-[#66707d] text-[11px] md:text-[13px]">9 AM - 6 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-2.5 rounded-[10px] bg-[#1447e6]/10 shrink-0">
                    <MapPinIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1447e6]" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-black text-[13px] md:text-[15px] mb-1">Location</p>
                    <p className="font-sans font-normal text-[#2d2d2d] text-[12px] md:text-[14px]">India (Remote-First)</p>
                  </div>
                </div>
              </div>

              {/* Quick Response Note */}
              <div className="mt-5 md:mt-6 p-3 md:p-4 rounded-[12px] bg-[#1447e6]/5 border border-[#1447e6]/10">
                <p className="font-sans font-medium text-[#1447e6] text-[12px] md:text-[14px]">
                  💬 We typically respond within 24 hours
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-[55%] w-full"
          >
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] md:rounded-[20px] p-5 md:p-8">
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[26px] mb-5 md:mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-8 md:py-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-2">Message Sent!</h3>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[13px] md:text-[15px] mb-4">We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-sans font-medium text-[#1447e6] text-[13px] md:text-[14px] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block font-sans font-medium text-black text-[12px] md:text-[13px] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-[10px] bg-white/50 border border-gray-200 font-sans text-[#2d2d2d] text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] focus:bg-white transition-all placeholder:text-gray-400 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-sans font-medium text-black text-[12px] md:text-[13px] mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-[10px] bg-white/50 border border-gray-200 font-sans text-[#2d2d2d] text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] focus:bg-white transition-all placeholder:text-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block font-sans font-medium text-black text-[12px] md:text-[13px] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-[10px] bg-white/50 border border-gray-200 font-sans text-[#2d2d2d] text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] focus:bg-white transition-all placeholder:text-gray-400 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block font-sans font-medium text-black text-[12px] md:text-[13px] mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your inquiry - whether it's about the DCLP program, pricing, or any other questions..."
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-[10px] bg-white/50 border border-gray-200 font-sans text-[#2d2d2d] text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] focus:bg-white transition-all placeholder:text-gray-400 outline-none resize-none"
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[10px] font-sans text-[12px] md:text-[13px]">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1447e6] hover:bg-[#0d3bb3] text-white font-sans font-semibold text-[13px] md:text-[15px] py-3 md:py-3.5 px-6 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#1447e6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
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
      <div className="relative w-full mt-[30px] md:mt-[50px]">
        <div className="relative flex flex-col items-center justify-center px-2 md:px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
