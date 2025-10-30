"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
// Cal.com inline embed will be loaded via script in useEffect
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
  ChevronRightIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

export default function MockInterviewsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [calLoaded, setCalLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Inject Cal.com inline embed exactly as provided (with queuing shim)
    const inlineScript = document.createElement('script');
    inlineScript.type = 'text/javascript';
    inlineScript.text = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document; C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
          if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;}
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "devops-mock-interview", {origin:"https://app.cal.com"});

      Cal.ns["devops-mock-interview"]("inline", {
        elementOrSelector:"#my-cal-inline-devops-mock-interview",
        config: {"layout":"month_view"},
        calLink: "nitish-sagar-akqnjf/devops-mock-interview",
      });

      Cal.ns["devops-mock-interview"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.body.appendChild(inlineScript);

    // Detect when Cal iframe is injected to remove loader
    const checkLoaded = () => {
      const container = document.getElementById('my-cal-inline-devops-mock-interview');
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
      icon: <CodeBracketIcon className="w-8 h-8" />,
      title: "Technical Deep Dive",
      description: "Practice Kubernetes, Docker, CI/CD, Terraform, and Git with real-world scenarios and troubleshooting.",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <CpuChipIcon className="w-8 h-8" />,
      title: "System Design",
      description: "Discuss architecture patterns, scaling strategies, and reliability engineering with industry experts.",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "Behavioral Questions",
      description: "Master STAR method, team scenarios, and conflict resolution for leadership and collaboration questions.",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8" />,
      title: "Resume & Career",
      description: "Get CV review, job search tips, and salary negotiation strategies from experienced professionals.",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100"
    },
    {
      icon: <ExclamationTriangleIcon className="w-8 h-8" />,
      title: "Real Scenarios",
      description: "Practice production incidents, on-call situations, and emergency troubleshooting scenarios.",
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
      title: "Expert Feedback",
      description: "Receive detailed review, improvement areas, and curated resources for continuous learning.",
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-50 to-indigo-100"
    }
  ];

  const focusAreas = [
    {
      icon: <CubeIcon className="w-12 h-12" />,
      title: "Kubernetes & Containerization",
      description: "Pods, Services, Deployments, StatefulSets, and container orchestration"
    },
    {
      icon: <CogIcon className="w-12 h-12" />,
      title: "CI/CD Pipelines & Automation",
      description: "Jenkins, GitHub Actions, GitLab CI, and deployment strategies"
    },
    {
      icon: <CloudIcon className="w-12 h-12" />,
      title: "Cloud Platforms",
      description: "AWS, Azure, GCP services, networking, and cost optimization"
    },
    {
      icon: <WrenchScrewdriverIcon className="w-12 h-12" />,
      title: "Infrastructure as Code",
      description: "Terraform, Ansible, CloudFormation, and configuration management"
    },
    {
      icon: <ChartBarIcon className="w-12 h-12" />,
      title: "Monitoring & Observability",
      description: "Prometheus, Grafana, ELK Stack, and distributed tracing"
    },
    {
      icon: <ShieldCheckIcon className="w-12 h-12" />,
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
      icon: <StarSolidIcon className="w-8 h-8" />,
      title: "Early Bird Special",
      description: "Be among the first 50 participants and get 30% off your first mock interview session",
      highlight: "30% OFF",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50"
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8" />,
      title: "Founder's Choice",
      description: "Direct interview with our founder and DevOps expert for personalized career guidance",
      highlight: "FOUNDER ACCESS",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
      title: "Pioneer Program",
      description: "Help shape our interview process and get lifetime access to all future improvements",
      highlight: "LIFETIME ACCESS",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, type: "spring", stiffness: 90 },
    }),
  };

  const testimonialVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, type: "spring", stiffness: 100 },
    }),
  };

  return (
    <main className="relative w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 text-neutral-800">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-orange-200 shadow-lg"
            >
              <StarSolidIcon className="w-4 h-4 text-yellow-600" />
              <span>🚀 LAUNCHING NOW - Be the First to Experience</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900 tracking-tight">
              Ace Your DevOps Interview
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Practice with industry experts and get personalized feedback on technical, behavioral, and system design questions
            </p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">30%</div>
                <div className="text-sm text-neutral-600">Early Bird Discount</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">50</div>
                <div className="text-sm text-neutral-600">Limited Spots Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">1-on-1</div>
                <div className="text-sm text-neutral-600">Founder Sessions</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                onClick={scrollToScheduler}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <PlayIcon className="w-5 h-5" />
                Schedule Your Mock Interview
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <StarIcon className="w-5 h-5" />
                See Success Stories
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 bg-white/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
              What You'll Get
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive interview preparation covering all aspects of DevOps roles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white rounded-2xl shadow-lg border border-blue-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.bgGradient} mb-6 text-white shadow-lg`}>
                    <div className={`text-white`}>
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    <span>Included in session</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="w-full py-16 bg-white/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
              Interview Focus Areas
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Cover all essential DevOps topics and technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {area.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Simple 4-step process to get interview-ready
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Bird Offers Section */}
      <section id="testimonials" className="w-full py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-orange-200 shadow-lg"
            >
              <StarSolidIcon className="w-5 h-5 text-yellow-600" />
              <span>LAUNCH SPECIAL - Limited Time</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
              Be the First to Experience
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Join our exclusive early bird program and get premium benefits while helping us perfect our interview process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {earlyBirdOffers.map((offer, index) => (
              <motion.div
                key={offer.title}
                custom={index}
                variants={testimonialVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-white rounded-2xl shadow-lg border border-blue-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${offer.color} mb-6 text-white shadow-lg`}>
                    {offer.icon}
                  </div>
                  <div className={`inline-block bg-gradient-to-r ${offer.color} text-white px-4 py-2 rounded-full text-xs font-bold mb-4`}>
                    {offer.highlight}
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {offer.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {offer.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    <span>Limited spots available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-8 border border-blue-300">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Why Be an Early Adopter?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-blue-900">Shape the Future</div>
                    <div className="text-sm text-neutral-600">Your feedback helps us improve for everyone</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-blue-900">Premium Access</div>
                    <div className="text-sm text-neutral-600">Get founder-level attention and support</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-blue-900">Best Value</div>
                    <div className="text-sm text-neutral-600">Exclusive pricing that won't last forever</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cal.com Scheduler Section */}
      <section id="scheduler-section" className="w-full py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200">
              <CheckCircleIcon className="w-4 h-4" />
              <span>Ready to get started?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
              Book Your Mock Interview
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choose your preferred time slot and start your interview preparation journey
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent rounded-3xl blur-xl" />
            <div className="relative bg-white rounded-2xl shadow-xl border border-blue-100 p-8 md:p-12">
              <div className="min-h-[600px] rounded-xl overflow-hidden relative">
                {!calLoaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-8 w-8 rounded-full border-2 border-blue-300 border-t-blue-700 animate-spin" />
                      <div className="text-sm text-neutral-600">Loading scheduler…</div>
                    </div>
                  </div>
                )}
                <div id="my-cal-inline-devops-mock-interview" style={{ width: '100%', height: '100%', overflow: 'scroll' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 bg-white/30">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600">
              Everything you need to know about our mock interviews
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors duration-200 group"
                >
                  <span className="text-lg font-semibold text-blue-900 pr-4 group-hover:text-blue-700 transition-colors">
                    {faq.question}
                  </span>
                  <div className={`transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDownIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </div>
                </button>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 border-t border-blue-100"
                  >
                    <p className="text-neutral-600 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000" />
        
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 backdrop-blur-sm text-white px-8 py-4 rounded-full text-sm font-bold mb-8 border border-yellow-300/30 shadow-lg"
            >
              <StarSolidIcon className="w-5 h-5 text-yellow-300" />
              <span>🔥 30% OFF - First 50 Participants Only!</span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Be among the first to experience our premium DevOps interview coaching and help us perfect our process for future participants
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                onClick={scrollToScheduler}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-colors duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3"
              >
                <PlayIcon className="w-6 h-6" />
                Get 30% Off - Book Now!
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors duration-300 flex items-center gap-3"
              >
                <StarIcon className="w-6 h-6" />
                See Early Bird Offers
              </motion.button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-300" />
                <span>30% discount for early birds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-300" />
                <span>Founder-level attention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-300" />
                <span>Shape our interview process</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
