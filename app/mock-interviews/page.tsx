"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { 
  CodeBracketIcon, 
  CpuChipIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon, 
  ChatBubbleLeftRightIcon,
  CubeIcon,
  CogIcon,
  CloudIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  StarIcon,
  CheckCircleIcon,
  PlayIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10, imgGroup, imgFrame6, imgBxsMessage, imgFrame1000003337, imgFrame1000003338 } from "@/web/assets";

export default function MockInterviewsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [calLoaded, setCalLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Inject Cal.com inline embed exactly as provided (with queuing shim)
    const inlineScript = document.createElement('script');
    inlineScript.type = 'text/javascript';
    inlineScript.text = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://cal.id/embed-link/embed.js", "init");

      Cal("init", "default", {origin:"https://cal.id"});

      Cal.ns["default"]("inline", {
        elementOrSelector:"#my-cal-inline",
        config: {"layout":"month_view"},
        calLink: "devops/devops-mock-interviews",
      });

      Cal.ns["default"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#007ee5"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.body.appendChild(inlineScript);

    // Detect when Cal iframe is injected to remove loader
    const checkLoaded = () => {
      const container = document.getElementById('my-cal-inline');
      if (container && container.querySelector('iframe')) {
        setCalLoaded(true);
        return true;
      }
      return false;
    };
    // quick checks, then fallback polling for a short time
    const start = Date.now();
    const interval = setInterval(() => {
      if (checkLoaded() || Date.now() - start > 8000) {
        clearInterval(interval);
      }
    }, 150);

    return () => {
      inlineScript.remove();
    };
  }, []);

  const benefits = [
    {
      icon: <CodeBracketIcon className="w-6 h-6 text-black" />,
      title: "Technical Deep Dive",
      description: "Practice Kubernetes, Docker, CI/CD, Terraform, and Git with real-world scenarios and troubleshooting.",
    },
    {
      icon: <CpuChipIcon className="w-6 h-6 text-black" />,
      title: "System Design",
      description: "Discuss architecture patterns, scaling strategies, and reliability engineering with industry experts.",
    },
    {
      icon: <UserGroupIcon className="w-6 h-6 text-black" />,
      title: "Behavioral Questions",
      description: "Master STAR method, team scenarios, and conflict resolution for leadership and collaboration questions.",
    },
    {
      icon: <DocumentTextIcon className="w-6 h-6 text-black" />,
      title: "Resume & Career",
      description: "Get CV review, job search tips, and salary negotiation strategies from experienced professionals.",
    },
    {
      icon: <ExclamationTriangleIcon className="w-6 h-6 text-black" />,
      title: "Real Scenarios",
      description: "Practice production incidents, on-call situations, and emergency troubleshooting scenarios.",
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-black" />,
      title: "Expert Feedback",
      description: "Receive detailed review, improvement areas, and curated resources for continuous learning.",
    }
  ];

  const focusAreas = [
    {
      icon: <CubeIcon className="w-12 h-12 text-black" />,
      title: "Kubernetes & Containerization",
      description: "Pods, Services, Deployments, StatefulSets, and container orchestration"
    },
    {
      icon: <CogIcon className="w-12 h-12 text-black" />,
      title: "CI/CD Pipelines & Automation",
      description: "Jenkins, GitHub Actions, GitLab CI, and deployment strategies"
    },
    {
      icon: <CloudIcon className="w-12 h-12 text-black" />,
      title: "Cloud Platforms",
      description: "AWS, Azure, GCP services, networking, and cost optimization"
    },
    {
      icon: <WrenchScrewdriverIcon className="w-12 h-12 text-black" />,
      title: "Infrastructure as Code",
      description: "Terraform, Ansible, CloudFormation, and configuration management"
    },
    {
      icon: <ChartBarIcon className="w-12 h-12 text-black" />,
      title: "Monitoring & Observability",
      description: "Prometheus, Grafana, ELK Stack, and distributed tracing"
    },
    {
      icon: <ShieldCheckIcon className="w-12 h-12 text-black" />,
      title: "Security & Compliance",
      description: "DevSecOps, vulnerability management, and compliance frameworks"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Your Time Slot",
      description: "Select a convenient 1-hour slot that fits your schedule"
    },
    {
      number: "02",
      title: "Receive Confirmation & Prep Materials",
      description: "Get interview guidelines and preparation resources via email"
    },
    {
      number: "03",
      title: "Join 1-Hour Video Interview",
      description: "Connect via video call for your personalized mock interview session"
    },
    {
      number: "04",
      title: "Get Detailed Feedback Report",
      description: "Receive comprehensive feedback and improvement recommendations"
    }
  ];

  const faqs = [
    {
      question: "What happens in a mock interview?",
      answer: "Our mock interviews simulate real DevOps interviews with technical questions, system design discussions, behavioral scenarios, and resume review. You'll receive detailed feedback on your performance and areas for improvement."
    },
    {
      question: "How should I prepare for the session?",
      answer: "Review your resume, prepare examples of your DevOps projects, and think about challenges you've solved. We'll send you preparation materials once you book your session."
    },
    {
      question: "What technology do I need?",
      answer: "You'll need a computer with a webcam, microphone, and stable internet connection. We'll use Cal.com's video calling feature for the session."
    },
    {
      question: "Can I choose specific topics to focus on?",
      answer: "Yes! You can specify areas you'd like to focus on during the booking process, such as Kubernetes, CI/CD, cloud platforms, or system design."
    },
    {
      question: "How long is each session?",
      answer: "Each mock interview session is 1 hour long, giving us time to cover technical questions, behavioral scenarios, and provide comprehensive feedback."
    },
    {
      question: "Will I get feedback after the interview?",
      answer: "Absolutely! You'll receive a detailed feedback report within 24 hours covering your strengths, areas for improvement, and specific resources to help you prepare for real interviews."
    },
    {
      question: "Can I reschedule if needed?",
      answer: "Yes, you can reschedule or cancel your session up to 24 hours before your scheduled time through your booking confirmation email."
    },
    {
      question: "Is this suitable for beginners?",
      answer: "Yes! Our mock interviews are tailored to your experience level, whether you're just starting in DevOps or are a senior professional looking to practice for specific roles."
    }
  ];

  const scrollToScheduler = () => {
    document.getElementById('scheduler-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const earlyBirdOffers = [
    {
      icon: <StarSolidIcon className="w-6 h-6 text-black" />,
      title: "Early Bird Special",
      description: "Be among the first 50 participants and get 30% off your first mock interview session",
      highlight: "30% OFF",
      bgColor: "bg-[#e5e5e5]"
    },
    {
      icon: <CheckCircleIcon className="w-6 h-6 text-black" />,
      title: "Founder's Choice",
      description: "Direct interview with our founder and DevOps expert for personalized career guidance",
      highlight: "FOUNDER ACCESS",
      bgColor: "bg-[#e5e5e5]"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-black" />,
      title: "Pioneer Program",
      description: "Help shape our interview process and get lifetime access to all future improvements",
      highlight: "LIFETIME ACCESS",
      bgColor: "bg-[#e5e5e5]"
    }
  ];

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
      <div className="glass-card-main relative min-h-[700px] md:min-h-[800px] mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[700px] md:min-h-[800px] w-full z-10">
          <Header />
          
          {/* Hero Content */}
          <div className="absolute flex flex-col gap-[30px] items-center left-1/2 top-[140px] md:top-[160px] -translate-x-1/2 w-full max-w-[1095px] px-4">
            {/* Badge */}
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex gap-[10px] h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px]">
              <Image src={imgFrame6} alt="" width={24} height={24} className="shrink-0" />
              <span className="font-sans font-semibold text-[#2d2d2d] text-base whitespace-nowrap">🚀 LAUNCHING NOW - Be the First to Experience</span>
            </div>

            {/* Title and Description */}
            <div className="flex flex-col gap-[15px] items-center">
              <h1 className="font-outfit font-semibold text-black text-[48px] md:text-[64px] text-center leading-tight">
              Ace Your DevOps Interview
            </h1>
              <p className="font-sans font-normal text-[#2d2d2d] text-[18px] md:text-[20px] text-center max-w-[723px] leading-relaxed">
              Practice with industry experts and get personalized feedback on technical, behavioral, and system design questions
            </p>
            
            {/* Stats */}
              <div className="flex gap-[30px] items-start justify-center mt-4 flex-wrap">
              <div className="text-center">
                  <p className="font-sans font-semibold text-black text-[28px] md:text-[32px] mb-0">30%</p>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[20px]">Early Bird Discount</p>
              </div>
              <div className="text-center">
                  <p className="font-sans font-semibold text-black text-[28px] md:text-[32px] mb-0">50</p>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[20px]">Limited Spots Available</p>
              </div>
              <div className="text-center">
                  <p className="font-sans font-semibold text-black text-[28px] md:text-[32px] mb-0">1-on-1</p>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[20px]">Founder Sessions</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-[20px] items-center justify-center flex-wrap">
              <button
                onClick={scrollToScheduler}
                className="bg-black text-white px-6 py-3 rounded-lg font-sans font-semibold shadow-sm hover:bg-[#1a1a1a] hover:shadow-md transition-all duration-200 whitespace-nowrap"
              >
                Schedule Your Mock Interview
              </button>
              <button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-card glass-card-blur-sm glass-card-opacity-light px-6 py-3 rounded-lg font-sans font-semibold text-black hover:bg-white/30 transition-all duration-200 whitespace-nowrap"
              >
                See Your Success Stories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Get Section */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <div className="flex flex-col gap-[17px] items-center text-center max-w-[579px]">
            <h2 className="font-outfit font-semibold text-black text-[52px] md:text-[42px]">What You&apos;ll Get</h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[20px]">Comprehensive interview preparation covering all aspects of DevOps roles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1261px]">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card glass-card-blur-sm glass-card-opacity-light flex flex-col items-start p-6 md:p-8 rounded-[20px] h-full"
              >
                <div className="flex flex-col gap-6 items-start w-full">
                  <div className="glass-card glass-card-blur-md glass-card-opacity-medium flex items-center justify-center p-3 rounded-full size-[75px] bg-black/10">
                      {benefit.icon}
                  </div>
                  <div className="flex flex-col gap-3 items-start w-full">
                    <h3 className="font-outfit font-semibold text-black text-xl md:text-2xl">{benefit.title}</h3>
                    <p className="font-sans font-normal text-[#2d2d2d] text-base leading-relaxed">{benefit.description}</p>
                    <div className="flex gap-2 items-center mt-2">
                      <CheckCircleIcon className="w-5 h-5 text-black" />
                      <span className="font-sans font-semibold text-black text-sm md:text-base">Included in session</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Focus Areas Section */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <div className="flex flex-col gap-[17px] items-center text-center max-w-[579px]">
            <h2 className="font-outfit font-semibold text-black text-[52px] md:text-[42px]">Interview Focus Areas</h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[20px]">Cover all essential DevOps topics and technologies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1261px] auto-rows-fr">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card glass-card-blur-sm glass-card-opacity-light flex flex-col items-center p-6 md:p-8 rounded-[20px] w-full h-full"
              >
                <div className="flex flex-col gap-5 items-center text-center w-full">
                  <div className="flex justify-center">{area.icon}</div>
                  <div className="flex flex-col gap-3 items-center">
                    <h3 className="font-outfit font-semibold text-black text-xl md:text-2xl">{area.title}</h3>
                    <p className="font-sans font-normal text-[#2d2d2d] text-base leading-relaxed">{area.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <div className="flex flex-col gap-[17px] items-center text-center max-w-[579px]">
            <h2 className="font-outfit font-semibold text-black text-[52px] md:text-[42px]">How It Works</h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[20px]">Simple 4-step process to get interview-ready</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1261px]">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card glass-card-blur-sm glass-card-opacity-light flex flex-col items-center p-6 md:p-8 rounded-[20px] w-full h-full"
              >
                <div className="flex flex-col gap-5 items-center text-center w-full">
                  <p className="font-outfit font-semibold text-black text-4xl md:text-5xl">{step.number}</p>
                  <div className="flex flex-col gap-3 items-center">
                    <h3 className="font-outfit font-semibold text-black text-xl md:text-2xl">{step.title}</h3>
                    <p className="font-sans font-normal text-[#2d2d2d] text-base leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Be the First to Experience Section */}
      <div id="testimonials" className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <div className="flex flex-col gap-[15px] items-center">
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex gap-[10px] h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px]">
              <Image src={imgFrame6} alt="" width={24} height={24} />
              <span className="font-sans font-semibold text-[#2d2d2d] text-[16px] whitespace-nowrap">LAUNCH SPECIAL - Limited Time</span>
            </div>
            <h2 className="font-outfit font-semibold text-black text-[52px] md:text-[42px] text-center">Be the First to Experience</h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[20px] text-center max-w-[681px]">
              Join our exclusive early bird program and get premium benefits while helping us perfect our interview process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1261px]">
            {earlyBirdOffers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card glass-card-blur-sm glass-card-opacity-light flex flex-col items-start p-6 md:p-8 rounded-[20px] w-full h-full"
              >
                <div className="flex flex-col gap-5 items-start w-full">
                  <div className="flex items-end gap-2">
                    <div className={`${offer.bgColor} flex items-center justify-center p-3 rounded-[10px] size-[75px]`}>
                    {offer.icon}
                  </div>
                    <div className={`${offer.bgColor} flex h-[29px] items-center justify-center px-4 py-2 rounded-[30px]`}>
                      <span className="font-sans font-normal text-black text-xs whitespace-nowrap">{offer.highlight}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-start w-full">
                    <h3 className="font-outfit font-semibold text-black text-xl md:text-2xl">{offer.title}</h3>
                    <p className="font-sans font-normal text-[#2d2d2d] text-base leading-relaxed">{offer.description}</p>
                    <div className="flex gap-2 items-center mt-2">
                      <CheckCircleIcon className="w-5 h-5 text-black" />
                      <span className="font-sans font-semibold text-black text-sm md:text-base">Limited spots available</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Be an Early Adopter */}
          <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex flex-col items-center p-6 md:p-8 rounded-[20px] w-full max-w-[1261px]">
            <div className="flex flex-col gap-8 items-center w-full">
              <h3 className="font-outfit font-semibold text-black text-2xl md:text-3xl text-center">Why Be an Early Adopter?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="flex gap-3 items-start">
                  <CheckCircleIcon className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <p className="font-sans font-semibold text-black text-base md:text-lg">Shape the Future</p>
                    <p className="font-sans font-normal text-[#2d2d2d] text-sm md:text-base">Your feedback helps us improve for everyone</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircleIcon className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <p className="font-sans font-semibold text-black text-base md:text-lg">Premium Access</p>
                    <p className="font-sans font-normal text-[#2d2d2d] text-sm md:text-base">Get founder-level attention and support</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircleIcon className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <p className="font-sans font-semibold text-black text-base md:text-lg">Best Value</p>
                    <p className="font-sans font-normal text-[#2d2d2d] text-sm md:text-base">Exclusive pricing that won&apos;t last forever</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Your Mock Interview Section */}
      <div id="scheduler-section" className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <div className="flex flex-col gap-[15px] items-center text-center max-w-[604px]">
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex h-[40px] items-center justify-center px-[18px] py-[12px] rounded-[30px]">
              <div className="flex gap-[5px] items-center">
                <Image src={imgGroup} alt="" width={20.5} height={17.78} />
                <span className="font-sans font-normal text-black text-[16px]">Ready to get started?</span>
              </div>
            </div>
            <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[52px] md:text-[42px]">Book Your Mock Interview</h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[16px] text-center max-w-[511px]">
              Choose your preferred time slot and start your interview preparation journey
            </p>
          </div>

          <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex flex-col items-center justify-center p-6 md:p-8 rounded-[20px] w-full max-w-[1261px]">
            <div className="min-h-[600px] w-full rounded-[20px] overflow-hidden relative">
                {!calLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 rounded-[20px]">
                    <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <div className="text-sm font-sans font-normal text-[#2d2d2d]">Loading scheduler…</div>
                    </div>
                  </div>
                )}
                <div id="my-cal-inline" style={{ width: '100%', height: '100%', overflow: 'scroll' }} />
              </div>
            </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <div className="flex flex-col gap-[15px] items-center text-center max-w-[656px]">
            <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[52px] md:text-[42px]">Frequently Asked Questions</h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[16px]">Everything you need to know about our mock interviews</p>
          </div>

          <div className="flex gap-[46px] items-end w-full max-w-[1261px] flex-wrap">
            <div className="flex flex-col gap-[20px] items-end flex-1 min-w-[300px]">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="w-full"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className={`glass-card glass-card-blur-sm glass-card-opacity-light flex items-center justify-between px-5 py-4 rounded-[20px] w-full hover:bg-white/20 transition-all ${
                    openFaqIndex === index ? 'bg-[#e5e5e5]' : ''
                  }`}
                >
                  <p className={`font-sans font-semibold text-base md:text-lg text-left pr-4 ${
                    openFaqIndex === index ? 'text-black' : 'text-[#2d2d2d]'
                  }`}>
                    {faq.question}
                  </p>
                  <ChevronDownIcon className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    openFaqIndex === index ? 'rotate-180 text-black' : 'text-black'
                  }`} />
                </button>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card glass-card-blur-sm glass-card-opacity-light mt-2 px-5 py-4 rounded-[20px]"
                  >
                    <p className="font-sans font-normal text-[#2d2d2d] text-base leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
            </div>

            {/* Contact Form Card */}
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex flex-col items-center justify-center p-8 md:p-12 rounded-[20px] w-full md:w-[513px]">
              <div className="flex flex-col gap-8 items-center w-full">
                <Image src={imgBxsMessage} alt="" width={88} height={88} />
                <div className="flex flex-col gap-8 items-center w-full">
                  <div className="flex flex-col gap-4 items-center text-center w-full">
                    <h3 className="font-outfit font-semibold text-[#2d2d2d] text-2xl md:text-3xl">Still Have Questions?</h3>
                    <p className="font-sans font-normal text-[#2d2d2d] text-base">
                      Fill out the form and our team will get back to you soon.
                    </p>
                  </div>
                  <button className="bg-[#66707d] text-white px-6 py-3 rounded-lg font-sans font-semibold shadow-sm hover:bg-[#5a6470] hover:shadow-md transition-all duration-200 whitespace-nowrap">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <div className="glass-card glass-card-blur-md glass-card-opacity-medium flex flex-col items-center justify-center p-8 md:p-12 rounded-[20px] w-full max-w-[1261px]">
            <div className="flex flex-col gap-6 items-center justify-center w-full">
              <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex gap-2 h-[40px] items-center justify-center px-4 py-2 rounded-[30px]">
                <Image src={imgFrame6} alt="" width={24} height={24} />
                <span className="font-sans font-semibold text-black text-sm md:text-base whitespace-nowrap">🔥 30% OFF - First 50 Participants Only!</span>
              </div>
              <h2 className="font-outfit font-semibold text-black text-3xl md:text-4xl text-center">Ready to Ace Your Next Interview?</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-base md:text-lg text-center max-w-[771px]">
              Be among the first to experience our premium DevOps interview coaching and help us perfect our process for future participants
            </p>
              <div className="flex gap-4 items-center justify-center flex-wrap">
                <button
                onClick={scrollToScheduler}
                  className="bg-black text-white px-6 py-3 rounded-lg font-sans font-semibold shadow-sm hover:bg-[#1a1a1a] hover:shadow-md transition-all duration-200 whitespace-nowrap"
              >
                Get 30% Off - Book Now!
                </button>
                <button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                  className="glass-card glass-card-blur-sm glass-card-opacity-light px-6 py-3 rounded-lg font-sans font-semibold text-black hover:bg-white/20 transition-all duration-200 whitespace-nowrap"
              >
                See Early Bird Offers
                </button>
              </div>
              <div className="flex gap-6 items-start justify-center flex-wrap mt-4">
                <div className="flex gap-2 items-center">
                  <CheckCircleIcon className="w-5 h-5 text-black" />
                  <span className="font-sans font-normal text-[#2d2d2d] text-sm md:text-base">30% discount for early birds</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircleIcon className="w-5 h-5 text-black" />
                  <span className="font-sans font-normal text-[#2d2d2d] text-sm md:text-base">Founder-level attention</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircleIcon className="w-5 h-5 text-black" />
                  <span className="font-sans font-normal text-[#2d2d2d] text-sm md:text-base">Shape our interview process</span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
