"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { CalendarIcon 
  ,ArrowRightIcon
 } from "@heroicons/react/24/outline";
import { PointerHighlight } from "../ui/pointer-highlight";

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
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, type: "spring", stiffness: 80 },
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
          <button className="mt-2 px-7 py-2 w-auto bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold shadow-sm text-base md:text-lg flex items-center gap-2 relative z-10 pointer-cursor">
            <PointerHighlight 
              pointerClassName="text-red-500" 
              rectangleClassName="border-white rounded-xl"
            >
              <span className="inline-flex items-center gap-2 p-2">
                Register Now <ArrowRightIcon className="w-4 h-4" />
              </span>
            </PointerHighlight>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default function Webinars() {
  return (
    <section id="webinars" className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Short Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-blue-900 tracking-tight">
            Webinars: Learn DevOps Live
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto">
            Join our live, hands-on webinars to master DevOps, Linux, and cloud technologies. Each session is designed for real-world skills, career clarity, and direct Q&A with experts. Check out our upcoming and past webinars below!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {webinars.length > 0 ? (
            webinars.map((webinar, idx) => (
              <motion.div
                key={webinar.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={webinar.isLive ? {
                  y: -8,
                  boxShadow: "0 8px 32px rgba(56,189,248,0.15)",
                  borderColor: "#38bdf8",
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                } : {}}
                transition={{ type: "spring", stiffness: 120 }}
                className={`relative flex flex-col bg-white rounded-2xl shadow-lg border-2 ${webinar.isLive ? 'border-blue-100' : 'border-gray-200 opacity-80'} overflow-hidden`}
              >
                <div className="hidden md:block w-2 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-2xl" />
                <div className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-900 flex-1">{webinar.title}</h3>
                    {webinar.isLive ? (
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold w-fit">Upcoming</span>
                    ) : (
                      <span className="inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold w-fit">Completed</span>
                    )}
                  </div>
                  <p className="text-base md:text-lg text-neutral-600 mb-3">{webinar.subheading}</p>
                  
                  {/* Webinar Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-xs md:text-sm">
                    <div className="flex items-center gap-2 text-blue-800 bg-blue-50 rounded-lg p-2">
                      <CalendarIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="font-medium">{webinar.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-800 bg-blue-50 rounded-lg p-2">
                      <span className="text-blue-400 flex-shrink-0">🕐</span>
                      <span className="font-medium">{webinar.time}</span>
                    </div>
                    {webinar.fee && (
                      <div className="flex items-center gap-2 text-blue-800 bg-blue-50 rounded-lg p-2">
                        <span className="text-blue-400 flex-shrink-0">💰</span>
                        <div className="flex items-center gap-2">
                          {webinar.originalPrice && (
                            <span className="text-gray-500 line-through text-sm font-medium">{webinar.originalPrice}</span>
                          )}
                          <span className="font-bold text-green-600">{webinar.fee}</span>
                          {webinar.discount && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">{webinar.discount}</span>
                          )}
                        </div>
                      </div>
                    )}
                    {webinar.mode && (
                      <div className="flex items-center gap-2 text-blue-800 bg-blue-50 rounded-lg p-2">
                        <span className="text-blue-400 flex-shrink-0">💻</span>
                        <span className="font-medium">{webinar.mode}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm md:text-base text-neutral-700 mb-4 whitespace-pre-line line-clamp-4">{webinar.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">👤</span>
                    </div>
                    <span className="text-sm text-neutral-500">{webinar.speaker.name}</span>
                  </div>
                  
                  <Link href={`/webinars/${webinar.id}`} className="block w-full">
                    <button
                      className={`w-full px-6 py-3 rounded-lg font-semibold shadow-sm text-sm md:text-base flex items-center justify-center gap-2 transition-colors duration-200 ${webinar.isLive ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                      disabled={!webinar.isLive}
                    >
                      <PointerHighlight 
                        pointerClassName="text-red-500" 
                        rectangleClassName="border-white rounded-xl"
                      >
                        <span className="inline-flex items-center gap-2 p-2">
                          {webinar.isLive ? 'Register Now' : 'View Details'} <ArrowRightIcon className="w-4 h-4" />
                        </span>
                      </PointerHighlight>
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 80 }}
          viewport={{ once: true }}
              className="col-span-full mb-16 md:mb-20 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200 text-center"
        >
          <div className="max-w-2xl mx-auto">
                <CalendarIcon className="w-12 md:w-16 h-12 md:h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 mb-4">No Webinars Currently Scheduled</h3>
                <p className="text-base md:text-lg text-neutral-700 mb-6">
              We are working on bringing you valuable webinars on DevOps, cloud technologies, and career development. 
              Check back soon for updates on our upcoming sessions.
            </p>
            <Link href="/courses">
                  <button className="px-6 md:px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm md:text-base">
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