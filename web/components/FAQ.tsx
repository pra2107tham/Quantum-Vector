"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  imgFrame1000003337,
  imgFrame1000003338,
  imgBxsMessage,
} from "../assets";

const faqs = [
  {
    id: 1,
    question: "Who is this program for?",
    answer: "Perfect for freshers, career changers, and professionals looking to transition into DevOps. No prior experience needed.",
  },
  {
    id: 2,
    question: "What makes DCLP different?",
    answer: "Small batch of 6 learners, 1:1 mentorship, real production projects, and job placement support. Not just theory—actual hands-on skills.",
  },
  {
    id: 3,
    question: "How long is the program?",
    answer: "The intensive program typically runs for 2–3 months with live sessions, project work, and career preparation included.",
  },
  {
    id: 4,
    question: "Do you help with job placement?",
    answer: "Yes! You get resume optimization, LinkedIn profile review, mock interviews, and referral support from our network.",
  },
  {
    id: 5,
    question: "What if I can't keep up?",
    answer: "We record all sessions. Plus, with only 6 learners per batch, you get personalized attention and support.",
  },
];

// Modal Portal Component
function ModalPortal({ children, open }: { children: React.ReactNode; open: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(children, document.body);
}

function InquiryModal() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#1447e6] hover:bg-[#0d3bb3] text-white font-sans font-semibold text-[12px] md:text-[14px] flex h-[40px] md:h-[48px] items-center justify-center px-4 md:px-5 py-2 relative rounded-full shrink-0 transition-colors cursor-pointer shadow-lg whitespace-nowrap"
      >
        Contact Us
      </button>
      
      <ModalPortal open={open}>
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md" 
            onClick={() => setOpen(false)} 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[420px] mx-auto p-6 md:p-8 z-10">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#1447e6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-[#1447e6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-[24px]">Get in Touch</h3>
              <p className="font-sans text-[#66707d] text-[13px] md:text-[14px] mt-1">We&apos;ll get back to you within 24 hours</p>
            </div>
            
            <InquiryForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      </ModalPortal>
    </>
  );
}

const InquiryForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
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
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Auto close after 2 seconds
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] mb-2">Message Sent!</h3>
        <p className="font-sans text-[#66707d] text-[14px]">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-sans font-medium text-[#2d2d2d] text-[13px] mb-1.5">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 font-sans text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] focus:bg-white transition-all placeholder:text-gray-400 outline-none"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block font-sans font-medium text-[#2d2d2d] text-[13px] mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 font-sans text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] focus:bg-white transition-all placeholder:text-gray-400 outline-none"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block font-sans font-medium text-[#2d2d2d] text-[13px] mb-1.5">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 00000 00000"
          className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 font-sans text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] focus:bg-white transition-all placeholder:text-gray-400 outline-none"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block font-sans font-medium text-[#2d2d2d] text-[13px] mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={3}
          placeholder="How can we help you?"
          className="w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-200 font-sans text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] focus:bg-white transition-all placeholder:text-gray-400 outline-none resize-none"
        />
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[10px] font-sans text-[13px]">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1447e6] hover:bg-[#0d3bb3] text-white font-sans font-semibold text-[14px] py-3.5 px-6 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#1447e6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
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
  );
};

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div id="faq" className="flex flex-col gap-5 md:gap-8 items-center relative shrink-0 w-full max-w-[1261px] px-2">
      <div className="flex flex-col gap-2 md:gap-3 items-center text-center relative shrink-0 text-[#2d2d2d] w-full max-w-[600px]">
        <h2 className="font-outfit font-semibold text-[22px] md:text-[36px] lg:text-[44px]">
          Questions? We&apos;ve Got Answers
        </h2>
        <p className="font-sans font-normal not-italic text-[12px] md:text-[14px] text-[#66707d]">
          Everything you need to know about the DCLP program
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch relative shrink-0 w-full">
        {/* FAQ List */}
        <div className="flex flex-col gap-2 md:gap-3 items-end relative shrink-0 w-full md:w-[60%]">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`${
                openFaq === faq.id
                  ? "bg-[#1447e6]"
                  : "glass-card glass-card-blur-md glass-card-opacity-light"
              } flex items-start justify-center px-4 py-3 md:px-5 md:py-4 relative rounded-[12px] md:rounded-[14px] shadow-md shrink-0 w-full cursor-pointer transition-all`}
              onClick={() => toggleFaq(faq.id)}
            >
              <div className="flex items-start justify-between w-full gap-3">
                <div className="flex-1">
                  <p className={`font-sans font-semibold leading-tight text-[13px] md:text-[16px] ${openFaq === faq.id ? "text-white" : "text-[#2d2d2d]"}`}>
                    {faq.question}
                  </p>
                  {openFaq === faq.id && faq.answer && (
                    <p className="font-sans font-normal text-white/90 text-[11px] md:text-[14px] mt-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
                <div className="relative shrink-0 w-7 h-7 md:w-9 md:h-9 z-10">
                  <Image
                    src={openFaq === faq.id ? imgFrame1000003338 : imgFrame1000003337}
                    alt={openFaq === faq.id ? "Close" : "Open"}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Card */}
        <div className="glass-card glass-card-blur-md glass-card-opacity-light flex flex-col h-auto items-center justify-center p-5 md:p-8 relative rounded-[12px] md:rounded-[16px] shrink-0 w-full md:w-[40%]">
          <div className="flex flex-col gap-4 md:gap-5 items-center relative shrink-0 w-full max-w-[300px] z-10">
            <div className="relative shrink-0 w-14 h-14 md:w-16 md:h-16">
              <Image src={imgBxsMessage} alt="Contact us" fill className="object-contain" />
            </div>
            <div className="flex flex-col gap-3 items-center relative shrink-0 w-full text-center">
              <h3 className="font-sans font-semibold text-[#2d2d2d] text-[18px] md:text-[24px]">
                Still Have Questions?
              </h3>
              <p className="font-sans font-normal text-[#66707d] text-[11px] md:text-[14px]">
                Our team is here to help you make the right decision.
              </p>
              <InquiryModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
