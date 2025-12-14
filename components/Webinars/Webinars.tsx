"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { CalendarIcon 
  ,ArrowRightIcon
 } from "@heroicons/react/24/outline";

interface WebinarCard {
  title: string;
  subheading: string;
  description: string;
  date: string;
  time: string;
  duration?: string;
  fee?: string;
  originalPrice?: string;
  discount?: string;
  mode?: string;
  speaker: {
    name: string;
  };
  isLive: boolean;
  id: string;
}

const webinars: WebinarCard[] = [
  {
    title: "Terraform Webinar Series (5 Days) – Azure-Focused Hands-on",
    subheading: "Master Terraform for Azure with real-world, production-style projects",
    description: `Learn to automate Azure infrastructure with Terraform using best practices, modules, workspaces, and CI/CD. Includes Azure demos daily and AWS comparisons to keep you multi-cloud ready. Build a production-style capstone by the end.`,
        date: "13th–17th October, 2025",
    time: "7:00 PM – 8:30 PM IST (Daily)",
    duration: "5 days, 1.5 hours each day",
    mode: "Live Zoom Sessions",
    speaker: {
      name: "Terraform Expert",
    },
    isLive: false,
    id: "terraform-azure-5day"
  },
  {
    title: "Docker & Kubernetes Mastery – 2-Week Live Bootcamp",
    subheading: "Master containerization and orchestration for DevOps excellence",
    description: `🔥 Why Attend This Bootcamp?
✔️ Master Docker from Basics to Advanced – Dockerfile, Images, Registry, Docker Hub
✔️ Complete Kubernetes Learning – From Architecture to Production Deployment
✔️ Hands-on Practice – Real-time container and cluster management
✔️ Industry Projects – Deploy real applications with CI/CD pipelines
✔️ Expert Guidance – Live sessions with experienced DevOps professionals

📚 Week 1 – Docker Fundamentals & Kubernetes Basics
✔️ Docker Installation & Container Fundamentals
✔️ Dockerfile Creation & Image Management
✔️ Docker Registry & Docker Hub Integration
✔️ Kubernetes Architecture & Core Objects
✔️ PODs, ReplicaSets, Deployments & Services
✔️ ConfigMaps, Secrets & Storage Management

🔧 Week 2 – Advanced Kubernetes & Production Projects
✔️ Health Checks, Auto-scaling & Monitoring
✔️ RBAC, Security & Resource Management
✔️ Production Deployment Strategies
✔️ Real-world Project Implementation

👥 Who Should Join?
- DevOps Engineers looking to master containerization
- Developers wanting to learn container orchestration
- System Administrators transitioning to cloud-native
- Anyone serious about modern infrastructure management

💰 Registration Fee: ₹2,999 Only
✅ 2-Week Live Training Sessions
✅ Docker & Kubernetes Complete Curriculum
✅ Hands-on Labs & Real Projects
✅ Industry Expert Sessions
✅ Certificate of Completion`,
    date: "13th–24th October, 2025",
    time: "10:00 AM – 11:00 AM IST (Daily)",
    duration: "2 weeks, 1 hour each day",
    fee: "₹2,999",
    originalPrice: "₹5,999",
    discount: "Limited seats • Register soon",
    mode: "Live Zoom Sessions",
    speaker: {
      name: "Kubernetes Expert",
    },
    isLive: false,
    id: "docker-kubernetes-bootcamp"
  },
  {
    title: "Linux for DevOps – 5-Day Live Demo",
    subheading: "Master Linux for DevOps roles in 5 days",
    description: `🔥 Why Attend This Demo?
✔️ Master Linux from Scratch – Tailored for DevOps roles
✔️ Hands-on Practice – Real-time terminal usage over 5 days
✔️ Essential Commands – Files, permissions, processes, networking
✔️ Shell Scripting Basics – Automate tasks
✔️ Practical for DevOps Projects – Not just theory

👥 Who Should Join?
- Beginners with zero tech background
- Career switchers from non-IT fields
- Freshers or students looking to upskill
- Anyone interested in DevOps, Cloud, or Linux Admin

💰 Registration Fee: ₹499 Only
✅ 5-Day Live Linux Training (1 hour daily)
✅ Free DevOps Career Roadmap
✅ Personalized Career Q&A
✅ Recordings Access
✅ Certificate of Participation`,
    date: "July 21st-25th, 2025",
    time: "9:30 AM - 10:30 AM IST (Daily)",
    duration: "5 days, 1 hour each day",
    fee: "₹499",
    mode: "Live Zoom Sessions",
    speaker: {
      name: "DevOps Expert",
    },
    isLive: false,
    id: "linux-for-devops-5day-demo"
  },
  {
    title: "DevOps Roadmap Webinar – Build a Career That Scales in 2025",
    subheading: "A 2-hour live masterclass for complete career clarity",
    description: "A comprehensive masterclass designed to give you complete clarity on the DevOps career path, tools, and job strategy — even if you're just starting out.",
    date: "May 30, 2025",
    time: "10:00 AM IST",
    duration: "2 hours",
    fee: "Free",
    mode: "Live Zoom Session",
    speaker: {
      name: "DevOps Expert",
    },
    isLive: false,
    id: "devops-roadmap-2025"
  }
];

// function getTimeRemaining(dateString: string) {
//   const total = Date.parse(dateString) - Date.now();
//   const seconds = Math.floor((total / 1000) % 60);
//   const minutes = Math.floor((total / 1000 / 60) % 60);
//   const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//   const days = Math.floor(total / (1000 * 60 * 60 * 24));
//   return { total, days, hours, minutes, seconds };
// }

/* function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 18);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 18);
  }

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden rounded-2xl w-full h-full bg-gray-100"
      style={{ perspective: 600 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="object-cover w-full h-full transition-transform duration-300"
        style={{ x, y, scale: 1.05 }}
      />
    </motion.div>
  );
} */

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const WebinarCard = ({ webinar, index }: { webinar: WebinarCard; index: number }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 8px 32px rgba(56,189,248,0.15)", 
        borderColor: "#38bdf8",
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      transition={{ type: "spring", stiffness: 120 }}
      className="relative flex flex-col bg-white rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden"
    >
      <div className="hidden md:block w-2 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-2xl" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-1 text-blue-900">{webinar.title}</h3>
        <p className="text-lg text-neutral-600 mb-2">{webinar.subheading}</p>
        <p className="text-base text-neutral-700 mb-4 whitespace-pre-line">{webinar.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-neutral-500">{webinar.speaker.name}</span>
        </div>
        <Link href={`/webinars/${webinar.id}`} className="block w-full h-full text-center">
          <button className="mt-2 px-7 py-2 w-auto bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold shadow-sm text-base md:text-lg flex items-center gap-2 relative z-10">
            <span className="inline-flex items-center gap-2">
              Register Now <ArrowRightIcon className="w-4 h-4" />
            </span>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default function Webinars() {
  return (
    <section id="webinars" className="w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {webinars.length > 0 ? (
            webinars.map((webinar, idx) => (
              <motion.div
                key={webinar.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`relative flex flex-col glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] overflow-hidden hover:scale-[1.02] transition-transform ${webinar.isLive ? '' : 'opacity-80'}`}
              >
                <div className="p-6 md:p-8 relative z-10 flex flex-col h-full">
                  {/* Header Section */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-outfit font-semibold text-[#2d2d2d] mb-2 leading-tight">{webinar.title}</h3>
                      <p className="text-base md:text-lg font-sans font-normal text-[#1447e6] mb-3">{webinar.subheading}</p>
                    </div>
                    {webinar.isLive ? (
                      <span className="glass-card glass-card-blur-lg glass-card-opacity-medium inline-block text-[#1447e6] px-3 py-1.5 rounded-full text-xs font-sans font-semibold whitespace-nowrap h-fit">Upcoming</span>
                    ) : (
                      <span className="glass-card glass-card-blur-lg glass-card-opacity-light inline-block text-[#2d2d2d] px-3 py-1.5 rounded-full text-xs font-sans font-semibold whitespace-nowrap h-fit">Completed</span>
                    )}
                  </div>
                  
                  {/* Webinar Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div className="glass-card glass-card-blur-lg glass-card-opacity-light flex items-center gap-2.5 text-[#2d2d2d] rounded-lg p-3">
                      <CalendarIcon className="w-5 h-5 text-[#1447e6] flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-sans font-medium text-[#2d2d2d]/70">Date</span>
                        <span className="font-sans font-semibold text-sm truncate">{webinar.date}</span>
                      </div>
                    </div>
                    <div className="glass-card glass-card-blur-lg glass-card-opacity-light flex items-center gap-2.5 text-[#2d2d2d] rounded-lg p-3">
                      <span className="text-[#1447e6] text-lg flex-shrink-0">🕐</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-sans font-medium text-[#2d2d2d]/70">Time</span>
                        <span className="font-sans font-semibold text-sm truncate">{webinar.time}</span>
                      </div>
                    </div>
                    {webinar.fee && (
                      <div className="glass-card glass-card-blur-lg glass-card-opacity-light flex items-center gap-2.5 text-[#2d2d2d] rounded-lg p-3">
                        <span className="text-[#1447e6] text-lg flex-shrink-0">💰</span>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-sans font-medium text-[#2d2d2d]/70">Fee</span>
                          <div className="flex items-center gap-2">
                            {webinar.originalPrice && (
                              <span className="text-[#2d2d2d]/50 line-through text-sm font-sans font-medium">{webinar.originalPrice}</span>
                            )}
                            <span className="font-sans font-bold text-[#1447e6] text-sm">{webinar.fee}</span>
                          </div>
                        </div>
                        {webinar.discount && (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-sans font-bold text-white bg-gradient-to-r from-[#ff4444] to-[#ff6666] shadow-lg shadow-[#ff4444]/30 whitespace-nowrap ml-auto animate-pulse">{webinar.discount}</span>
                        )}
                      </div>
                    )}
                    {webinar.mode && (
                      <div className="glass-card glass-card-blur-lg glass-card-opacity-light flex items-center gap-2.5 text-[#2d2d2d] rounded-lg p-3">
                        <span className="text-[#1447e6] text-lg flex-shrink-0">💻</span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-sans font-medium text-[#2d2d2d]/70">Mode</span>
                          <span className="font-sans font-semibold text-sm truncate">{webinar.mode}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base font-sans font-normal text-[#2d2d2d] mb-5 whitespace-pre-line line-clamp-3 leading-relaxed flex-1">{webinar.description}</p>
                  
                  {/* Footer Section */}
                  <div className="mt-auto pt-4 border-t border-[#2d2d2d]/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#1447e6]/10 flex items-center justify-center">
                          <span className="text-[#1447e6] text-base font-sans font-semibold">👤</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-sans font-medium text-[#2d2d2d]/70">Speaker</span>
                          <span className="text-sm font-sans font-semibold text-[#2d2d2d]">{webinar.speaker.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link href={`/webinars/${webinar.id}`} className="block w-full">
                      <button
                        className={`w-full px-6 py-3 rounded-lg font-sans font-semibold shadow-sm text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-200 whitespace-nowrap ${webinar.isLive ? 'bg-[#1447e6] text-white hover:bg-[#0d3bb8] hover:shadow-md' : 'glass-card glass-card-blur-lg glass-card-opacity-light text-[#2d2d2d] cursor-not-allowed'}`}
                        disabled={!webinar.isLive}
                      >
                        <span className="inline-flex items-center gap-2">
                          {webinar.isLive ? 'Register Now' : 'View Details'} <ArrowRightIcon className="w-4 h-4" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 80 }}
          viewport={{ once: true }}
          className="col-span-full mb-16 md:mb-20 glass-card glass-card-blur-sm glass-card-opacity-light p-6 md:p-8 rounded-[20px] text-center"
        >
          <div className="max-w-2xl mx-auto">
            <CalendarIcon className="w-12 md:w-16 h-12 md:h-16 text-[#1447e6] mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl lg:text-3xl font-outfit font-semibold text-[#2d2d2d] mb-4">No Webinars Currently Scheduled</h3>
            <p className="text-base md:text-lg font-sans font-normal text-[#2d2d2d] mb-6">
              We are working on bringing you valuable webinars on DevOps, cloud technologies, and career development. 
              Check back soon for updates on our upcoming sessions.
            </p>
            <Link href="/courses">
              <button className="px-6 md:px-8 py-3 bg-[#1447e6] text-white font-sans font-semibold rounded-xl hover:bg-[#0d3bb8] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm md:text-base whitespace-nowrap">
                Explore Our Courses
              </button>
            </Link>
          </div>
        </motion.div>
          )}
        </div>
      </div>
    </section>
  );
} 