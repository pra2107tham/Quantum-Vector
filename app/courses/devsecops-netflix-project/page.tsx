"use client";
import { useState } from "react";
import { 
  FaShieldAlt, 
  FaDocker, 
  FaCloud, 
  FaCogs, 
  FaCode, 
  FaGitAlt, 
  FaChartLine,
  FaBell,
  FaAws,
  FaCheckCircle
} from "react-icons/fa";
import { SiNetflix, SiJenkins, SiPrometheus, SiGrafana, SiArgo } from "react-icons/si";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import RazorpayButton from "@/components/RazorpayButton/AWS_Course_RazorpayButton";
import { motion } from "motion/react";

const modules = [
  {
    title: "DevSecOps Foundations",
    topics: [
      {
        icon: <FaShieldAlt className="text-blue-600" size={28} />,
        title: "Why DevSecOps Matters",
        desc: "Understanding how security fits into modern delivery pipelines and the shift-left security mindset with industry best practices.",
      },
      {
        icon: <FaShieldAlt className="text-green-600" size={28} />,
        title: "Security Best Practices",
        desc: "Learn industry-standard security practices and how to integrate them into your development workflow.",
      },
    ],
  },
  {
    title: "Containerization & Cloud Deployment",
    topics: [
      {
        icon: <FaDocker className="text-blue-400" size={28} />,
        title: "Dockerizing Netflix-Clone",
        desc: "Containerize the full-stack Netflix-clone application using Docker, creating optimized images for production deployment.",
      },
      {
        icon: <FaCloud className="text-orange-500" size={28} />,
        title: "AWS Deployment",
        desc: "Deploy to AWS using EC2 or EKS, managing cloud resources and understanding infrastructure essentials for production workloads.",
      },
    ],
  },
  {
    title: "CI/CD Pipeline Implementation",
    topics: [
      {
        icon: <SiJenkins className="text-red-500" size={28} />,
        title: "Build & Test Automation",
        desc: "Set up automated builds, testing, and container image creation using Jenkins or similar CI tools.",
      },
      {
        icon: <FaCogs className="text-blue-600" size={28} />,
        title: "Secure Pipeline Configuration",
        desc: "Securing credentials, handling private registries, and implementing secure deployment workflows.",
      },
    ],
  },
  {
    title: "Security Automation (Sec in DevSecOps)",
    topics: [
      {
        icon: <FaCode className="text-purple-600" size={28} />,
        title: "Static Code Analysis (SAST)",
        desc: "Implement automated static code analysis to catch security vulnerabilities early in the development cycle.",
      },
      {
        icon: <FaShieldAlt className="text-red-600" size={28} />,
        title: "Vulnerability Scanning",
        desc: "Dependency vulnerability scanning (SCA) and container image scanning for CVEs. Understanding security reports and fixing issues.",
      },
    ],
  },
  {
    title: "GitOps Deployment",
    topics: [
      {
        icon: <FaGitAlt className="text-orange-500" size={28} />,
        title: "Git as Source of Truth",
        desc: "Managing deployments declaratively using Git as the single source of truth for infrastructure and application code.",
      },
      {
        icon: <SiArgo className="text-blue-600" size={28} />,
        title: "ArgoCD Automation",
        desc: "Using ArgoCD (or similar tools) to automate deployment to Kubernetes, implementing GitOps workflows.",
      },
    ],
  },
  {
    title: "Monitoring & Observability",
    topics: [
      {
        icon: <SiPrometheus className="text-orange-600" size={28} />,
        title: "Prometheus Setup",
        desc: "Deploying Prometheus for metrics collection and understanding how to monitor application and system performance.",
      },
      {
        icon: <SiGrafana className="text-orange-500" size={28} />,
        title: "Grafana Dashboards",
        desc: "Creating comprehensive dashboards for application and system metrics, visualizing performance and health.",
      },
    ],
  },
  {
    title: "Notifications & Reporting",
    topics: [
      {
        icon: <FaBell className="text-yellow-500" size={28} />,
        title: "Alert Configuration",
        desc: "Setting up alerts for failures, performance issues, and resource spikes with automated notifications.",
      },
      {
        icon: <FaChartLine className="text-green-600" size={28} />,
        title: "Email & Slack Integration",
        desc: "Email and Slack notifications for pipeline status, with monitoring alerts integrated into real-time dashboards.",
      },
    ],
  },
  {
    title: "Production Deployment",
    topics: [
      {
        icon: <SiNetflix className="text-red-600" size={28} />,
        title: "Netflix-Clone Deployment",
        desc: "End-to-end production-style deployment of the Netflix-clone application using all learned DevSecOps practices.",
      },
      {
        icon: <FaAws className="text-orange-500" size={28} />,
        title: "AWS Production Setup",
        desc: "Complete AWS environment setup with production-grade configurations, security, and scalability considerations.",
      },
    ],
  },
];

const learningOutcomes = [
  "DevSecOps foundations and security-first mindset",
  "Containerization with Docker and cloud deployment",
  "CI/CD pipeline implementation with Jenkins",
  "Automated security scanning (SAST, SCA, container scanning)",
  "GitOps deployment with ArgoCD",
  "Monitoring with Prometheus and Grafana",
  "Production-grade deployment workflows",
  "End-to-end ownership of the full lifecycle"
];

const targetRoles = [
  "DevOps Engineer",
  "Cloud Engineer",
  "SRE (Site Reliability Engineer)",
  "Platform Engineer",
  "DevSecOps Specialist"
];

function CurriculumCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="relative border-2 border-blue-200 rounded-3xl p-2 bg-transparent overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
        <div className="absolute top-0 left-8 h-0.5 w-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full z-20" />
        <div className="absolute top-[-8px] left-6 w-24 h-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-30 blur-2xl rounded-full z-10" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shadow-md">
            {icon}
          </div>
          <div className="font-bold text-blue-900 text-lg">{title}</div>
        </div>
        <div className="text-neutral-600 text-base leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

export default function DevSecOpsNetflixProjectPage() {
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const headingWords = "DevSecOps Project: Netflix-Clone on AWS";
  const subheadingWords = "Deploy with CI/CD, Security, Monitoring & GitOps";
  const descriptionWords = "Build a production-grade DevSecOps pipeline deploying a full-stack Netflix-clone on AWS. Learn security automation, CI/CD, monitoring, and GitOps with real-world hands-on experience.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-neutral-800 py-10 px-4 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side - Modules (70%) */}
          <div className="lg:w-[70%]">
            <div className="mb-12 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-1"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SiNetflix className="text-red-600" size={55} />
                </motion.div>
                <div className="text-3xl lg:text-5xl lg:leading-tight font-bold text-blue-900">
                  <TextGenerateEffect 
                    words={headingWords} 
                    onComplete={() => setShowSubheading(true)}
                  />
                </div>
              </motion.div>
              {showSubheading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl lg:text-2xl lg:leading-tight mt-2 font-medium text-blue-700 pl-1"
                >
                  <TextGenerateEffect 
                    words={subheadingWords} 
                    onComplete={() => setShowDescription(true)}
                  />
                </motion.div>
              )}
              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base lg:text-lg lg:leading-relaxed mt-3 text-neutral-600 pl-1"
                >
                  <TextGenerateEffect 
                    words={descriptionWords} 
                    onComplete={() => setShowContent(true)}
                  />
                </motion.div>
              )}
              {/* Project badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-5 flex flex-wrap gap-3"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-700 border border-red-200 px-4 py-1.5 text-sm font-semibold">
                  🎯 Hands-On Project
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-4 py-1.5 text-sm font-semibold">
                  Production-Grade
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 text-sm font-semibold">
                  Job-Ready Skills
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 text-purple-700 border border-purple-200 px-4 py-1.5 text-sm font-semibold">
                  📅 13-14th December 2025
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 border border-orange-200 px-4 py-1.5 text-sm font-semibold">
                  ⏰ 9AM to 1PM IST
                </span>
              </motion.div>
            </div>

            {/* Project Overview */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100"
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-900">Project Overview</h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  This project teaches learners how to build, secure, deploy, and monitor a full-stack Netflix-clone application on AWS using a production-grade DevSecOps pipeline. The focus is not just on application deployment, but on integrating security, observability, and automated delivery workflows that mirror real enterprise environments.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  Learners implement the entire lifecycle — <strong>code → container → security scans → CI/CD → deployment → monitoring → GitOps</strong> — exactly how modern engineering teams operate.
                </p>
              </motion.div>
            )}

            {/* What Students Will Learn */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-10 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100"
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-900">What You&apos;ll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                      <span className="text-neutral-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Modules */}
            {showContent && modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, type: "spring", stiffness: 90 }}
                viewport={{ once: true, amount: 0.2 }}
                className="mb-10 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100"
              >
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-md">
                    Module {i + 1}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-5 text-blue-900">{mod.title}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mod.topics.map((topic) => (
                    <CurriculumCard key={topic.title} {...topic} />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Why This Project Is Valuable */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200"
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-900">Why This Project Is Valuable</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Industry-Level Practical Experience</h3>
                    <p className="text-neutral-700">Students don&apos;t just learn tools — they learn how modern engineering teams actually ship software in the real world.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Security-First Delivery Approach</h3>
                    <p className="text-neutral-700">The project integrates automated security checks across the pipeline, teaching learners how to prevent vulnerabilities early.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Cloud-Native Workflow Exposure</h3>
                    <p className="text-neutral-700">Students get hands-on experience with containers, orchestration, cloud infrastructure, monitoring, and GitOps.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">End-to-End Ownership</h3>
                    <p className="text-neutral-700">This project lets learners handle the full lifecycle: development → security → deployment → monitoring → scaling.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Target Roles */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-10 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100"
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-900">Perfect For These Roles</h2>
                <p className="text-neutral-700 mb-4">Completing this project demonstrates competency for roles such as:</p>
                <div className="flex flex-wrap gap-3">
                  {targetRoles.map((role, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                      {role}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right side - Sticky Payment (30%) */}
          <div className="lg:w-[30%]">
            <div className="sticky top-28 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-200">
              {/* Pricing */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-blue-900/70">Project Price</div>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-2xl font-extrabold text-blue-900">₹1,499</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 text-xs font-semibold w-full justify-center">
                    📅 13-14th December 2025
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 text-xs font-semibold w-full justify-center">
                    ⏰ 9AM to 1PM IST
                  </div>
                </div>
              </div>

              {/* Benefits bullets */}
              <ul className="mb-6 space-y-2 text-sm text-blue-900/80">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Real-world Netflix-clone deployment</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Complete DevSecOps pipeline</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Security automation & monitoring</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> GitOps & CI/CD implementation</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Lifetime access with recordings</li>
              </ul>

              {/* Razorpay Button */}
              <RazorpayButton
                url="https://rzp.io/rzp/pSK4kUHK"
                text="Enroll Now — ₹1,499"
                color="#1d4ed8"
                size="large"
                className="w-full"
              />

              <div className="mt-3 text-[12px] text-neutral-500 text-center">Payments powered by Razorpay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

