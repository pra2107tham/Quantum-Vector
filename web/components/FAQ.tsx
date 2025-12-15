"use client";

import { useState } from "react";
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
    answer: "The intensive program runs for 90 days with live sessions, project work, and career preparation included.",
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

function InquiryModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#1447e6] hover:bg-[#0d3bb3] text-white font-sans font-semibold text-[12px] md:text-[14px] flex h-[40px] md:h-[48px] items-center justify-center px-4 md:px-5 py-2 relative rounded-full shrink-0 transition-colors cursor-pointer shadow-lg whitespace-nowrap"
      >
        Contact Us
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          <div className="relative glass-card glass-card-blur-md glass-card-opacity-medium rounded-[16px] shadow-xl w-full max-w-md mx-auto p-4 md:p-6 z-10 flex flex-col">
            <button
              className="absolute top-2 right-3 text-[#2d2d2d] text-2xl font-bold hover:text-black transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="font-outfit font-semibold text-black text-[18px] md:text-[22px] mb-3 text-center">Get in Touch</h3>
            <InquiryForm />
          </div>
        </div>
      )}
    </>
  );
}

const InquiryForm = () => {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-6 rounded-[16px] text-center">
        <div className="w-12 h-12 bg-[#1447e6] rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-outfit font-semibold text-black text-[18px] md:text-[22px] mb-1">Thank You!</h3>
        <p className="font-sans font-normal text-[#2d2d2d] text-[12px] md:text-[14px]">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="name" className="block font-sans font-medium text-black text-[11px] md:text-[12px] mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full px-3 py-2 rounded-[8px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[13px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-sans font-medium text-black text-[11px] md:text-[12px] mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full px-3 py-2 rounded-[8px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[13px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d]"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block font-sans font-medium text-black text-[11px] md:text-[12px] mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 00000 00000"
          className="w-full px-3 py-2 rounded-[8px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[13px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block font-sans font-medium text-black text-[11px] md:text-[12px] mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={3}
          placeholder="How can we help?"
          className="w-full px-3 py-2 rounded-[8px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[13px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d] resize-none"
        />
      </div>
      {error && (
        <div className="glass-card glass-card-blur-sm glass-card-opacity-light border border-red-200 text-red-600 px-3 py-2 rounded-[8px] font-sans font-normal text-[11px] md:text-[12px]">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1447e6] hover:bg-[#0d3bb3] text-white font-sans font-semibold text-[13px] md:text-[14px] py-2.5 px-5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1447e6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
