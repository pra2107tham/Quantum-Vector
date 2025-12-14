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
    question: "What is this platform about?",
    answer: "This platform helps you master DevOps and Cloud skills with hands-on, project-based learning, live webinars, and expert mentorship.",
  },
  {
    id: 2,
    question: "Are the courses beginner friendly?",
    answer: "Yes! Our courses start from the basics and progress to advanced topics, suitable for both beginners and experienced professionals.",
  },
  {
    id: 3,
    question: "Do you offer live classes or only recorded content?",
    answer: "We offer both live webinars and recorded modules so you can learn at your own pace and interact with instructors in real time.",
  },
  {
    id: 4,
    question: "Is there a community for doubt support?",
    answer: "Absolutely! You get access to a peer community, expert engineers, and regular mock interviews for doubt resolution and career guidance.",
  },
  {
    id: 5,
    question: "What is the refund policy?",
    answer: "Purchases are processed via Whop, which has its own refund policy. Please review their terms before enrolling.",
  },
];

function InquiryModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#1447e6] hover:bg-[#0d3bb3] text-white font-sans font-semibold text-[14px] md:text-[16px] flex h-[52px] items-center justify-center px-[18px] py-[12px] relative rounded-[30px] shrink-0 w-[164px] transition-colors cursor-pointer shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] whitespace-nowrap"
      >
        Contact Us
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          <div className="relative glass-card glass-card-blur-md glass-card-opacity-medium rounded-[20px] shadow-xl w-full max-w-md mx-auto p-6 md:p-8 z-10 flex flex-col">
            <button
              className="absolute top-3 right-3 text-[#2d2d2d] text-2xl font-bold hover:text-black transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-4 text-center">Inquiry Form</h3>
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
      <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-8 rounded-[20px] text-center">
        <div className="w-16 h-16 bg-[#1447e6] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-outfit font-semibold text-black text-[24px] md:text-[28px] mb-2">Thank You!</h3>
        <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="block font-sans font-medium text-black text-[12px] md:text-[14px]">
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
          className="w-full px-4 py-2.5 rounded-[10px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d]"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="block font-sans font-medium text-black text-[12px] md:text-[14px]">
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
          className="w-full px-4 py-2.5 rounded-[10px] glass-card glass-card-blur-sm glass-card-opacity-light border border-white/30 font-sans font-normal text-[#2d2d2d] text-[14px] focus:ring-2 focus:ring-[#1447e6] focus:border-[#1447e6] transition-colors placeholder:text-[#66707d]"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="phone" className="block font-sans font-medium text-black text-[12px] md:text-[14px]">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
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
          'Submit Inquiry'
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
    <div className="flex flex-col gap-[30px] items-center relative shrink-0 w-full max-w-[1261px]">
      <div className="flex flex-col gap-[15px] items-start leading-normal relative shrink-0 text-[#2d2d2d] w-full max-w-[656px] whitespace-pre-wrap">
        <p className="font-outfit font-semibold min-w-full relative shrink-0 text-[32px] md:text-[52px] w-[min-content]">
          Frequently Asked Questions
        </p>
        <p className="font-sans font-normal not-italic relative shrink-0 text-[14px] md:text-[16px] text-center w-full max-w-[536px]">
          Find answers to the most common questions about our platform, courses, and community.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-[46px] items-end relative shrink-0 w-full">
        <div className="flex flex-col gap-[20px] items-end relative shrink-0 w-full md:w-[702px]">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`${
                openFaq === faq.id
                  ? "bg-[#66707d]"
                  : "glass-card glass-card-blur-md glass-card-opacity-light"
              } flex ${
                openFaq === faq.id ? "h-auto min-h-[119px]" : "h-[68px]"
              } items-center justify-center px-[20px] py-[10px] relative rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full cursor-pointer transition-all`}
              onClick={() => toggleFaq(faq.id)}
            >
              <div className="flex items-center justify-between w-full gap-4">
                {openFaq === faq.id ? (
                  <div className="capitalize flex flex-col gap-[10px] items-start justify-center leading-[1.4] not-italic relative shrink-0 text-white whitespace-pre-wrap z-10 flex-1">
                    <p className="font-sans font-semibold relative shrink-0 text-[16px] md:text-[20px] w-full">
                      {faq.question}
                    </p>
                    {faq.answer && (
                      <p className="font-sans font-normal relative shrink-0 text-[14px] md:text-[16px] w-full">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="capitalize font-sans font-semibold leading-[1.4] not-italic relative shrink-0 text-[#2d2d2d] text-[16px] md:text-[20px] w-full whitespace-pre-wrap z-10 flex-1">
                    {faq.question}
                  </p>
                )}
                <div className="relative shrink-0 size-[43px] z-10">
                  <Image
                    src={
                      openFaq === faq.id
                        ? imgFrame1000003338
                        : imgFrame1000003337
                    }
                    alt={openFaq === faq.id ? "Close" : "Open"}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card glass-card-blur-md glass-card-opacity-light flex flex-col h-auto md:h-[471px] items-center justify-center px-[40px] md:px-[85px] py-[40px] md:py-[77px] relative rounded-[10px] shrink-0 w-full md:w-[513px]">
          <div className="flex flex-col gap-[30px] items-center relative shrink-0 w-full max-w-[341px] z-10">
            <div className="relative shrink-0 size-[88px]">
              <Image src={imgBxsMessage} alt="Contact us" fill className="object-contain" />
            </div>
            <div className="flex flex-col gap-[30px] items-center relative shrink-0 w-full">
              <div className="capitalize flex flex-col gap-[15px] items-start leading-[1.4] not-italic relative shrink-0 text-black w-full whitespace-pre-wrap">
                <p className="font-sans font-semibold relative shrink-0 text-[24px] md:text-[32px] w-full text-center">
                  Still Have Questions?
                </p>
                <p className="font-sans font-normal relative shrink-0 text-[14px] md:text-[16px] text-center w-full">
                  Fill out the form and our team will get back to you soon.
                </p>
              </div>
              <InquiryModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

