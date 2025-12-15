"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";
import {
  CheckCircleIcon,
  CodeBracketIcon,
  CloudIcon,
  ServerIcon,
  CommandLineIcon,
  CogIcon,
  RocketLaunchIcon,
  CubeIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  BookOpenIcon,
  SparklesIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  CpuChipIcon,
  BeakerIcon,
  UserGroupIcon,
  PhoneIcon,
  CurrencyRupeeIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// Tech Stack Icons
const techStack = [
  { name: "Linux", icon: <ServerIcon className="w-5 h-5" /> },
  { name: "Bash", icon: <CommandLineIcon className="w-5 h-5" /> },
  { name: "Git", icon: <CodeBracketIcon className="w-5 h-5" /> },
  { name: "Jenkins", icon: <CogIcon className="w-5 h-5" /> },
  { name: "Maven", icon: <CubeIcon className="w-5 h-5" /> },
  { name: "Ansible", icon: <WrenchScrewdriverIcon className="w-5 h-5" /> },
  { name: "Docker", icon: <CubeIcon className="w-5 h-5" /> },
  { name: "Kubernetes", icon: <CircleStackIcon className="w-5 h-5" /> },
  { name: "AWS", icon: <CloudIcon className="w-5 h-5" /> },
  { name: "Terraform", icon: <CodeBracketIcon className="w-5 h-5" /> },
];

// Curriculum Modules with Detailed Topics
const curriculumModules = [
  {
    id: 1,
    icon: <AcademicCapIcon className="w-8 h-8" />,
    title: "DevOps & SDLC Foundation",
    subtitle: "Understanding the Big Picture",
    color: "#1447e6",
    topics: [
      "What is DevOps? Define DevOps",
      "What is SDLC Process? Types of SDLC",
      "Waterfall vs Agile Methodology",
      "Phases in Agile Method",
      "How DevOps supports Agile Development",
      "Role of Dev and Ops in Agile",
      "Why DevOps matters in modern organizations",
    ],
  },
  {
    id: 2,
    icon: <ServerIcon className="w-8 h-8" />,
    title: "Linux Mastery",
    subtitle: "The Backbone of DevOps",
    color: "#2d2d2d",
    topics: [
      "Operating System Concepts, Kernel, Hardware",
      "Installing Virtual Box & CentOS",
      "Linux Day-to-Day Commands",
      "User & Group Management (CLI & Graphical)",
      "VI Editor Commands & Shortcuts",
      "System Performance & Process Management",
      "File & Directory Management",
      "Linux Permissions & Package Management",
      "SSH-Keygen Process & Remote Access",
    ],
    commands: ["mkdir", "ls", "cd", "chmod", "chown", "ps", "top", "grep", "ssh", "scp", "yum", "systemctl"],
  },
  {
    id: 3,
    icon: <CommandLineIcon className="w-8 h-8" />,
    title: "Shell Scripting",
    subtitle: "Automate Manual Processes",
    color: "#4a5568",
    topics: [
      "What is Shell? Types of Shells",
      "First Shell Script Program",
      "Variables & Command Line Arguments",
      "String Operations & Escape Characters",
      "Arithmetic Operations",
      "User Interaction using read command",
      "Input/Output Redirection",
      "Control Commands (if, for, while, switch)",
      "Functions & Pipes",
    ],
  },
  {
    id: 4,
    icon: <GlobeAltIcon className="w-8 h-8" />,
    title: "Networking for DevOps",
    subtitle: "4-Phase Comprehensive Coverage",
    color: "#1447e6",
    phases: [
      {
        name: "Phase 1: Fundamentals",
        items: ["What is Networking", "Client-Server Architecture", "LAN, WAN, Internet", "Router, Switch, Firewall"],
      },
      {
        name: "Phase 2: IP Addressing",
        items: ["Public vs Private IP", "Subnets & CIDR Notation", "Why Private IP in Cloud", "Public vs Private Subnet"],
      },
      {
        name: "Phase 3: DNS & Web Traffic",
        items: ["DNS & Record Types (A, CNAME, MX)", "How Web Requests Work", "HTTP vs HTTPS", "Status Codes (200, 404, 500)"],
      },
      {
        name: "Phase 4: Security & Access",
        items: ["Firewalls & Ports", "Common Ports (22, 80, 443, 8080)", "Inbound vs Outbound Rules", "NAT & Security Groups"],
      },
    ],
  },
  {
    id: 5,
    icon: <CodeBracketIcon className="w-8 h-8" />,
    title: "Git & Version Control",
    subtitle: "Source Code Management",
    color: "#e54a2d",
    topics: [
      "What is Git, VCS, SCM?",
      "GitHub/GitLab/BitBucket Account Setup",
      "Git Commands & Developer Workflow",
      "SSH Key Generation & Cloning",
      "Branches, Tags & Merging",
      "Pull Requests & Code Reviews",
      "Branching Strategy & Best Practices",
      "README Files & Release Commits",
    ],
  },
  {
    id: 6,
    icon: <CubeIcon className="w-8 h-8" />,
    title: "Maven Build Tool",
    subtitle: "Build & Dependency Management",
    color: "#c71a36",
    topics: [
      "Maven Features & Benefits",
      "Maven Environment Setup",
      "Directory Structure & pom.xml",
      "Maven Repositories (Local, Central, Remote)",
      "Maven Lifecycles",
      "Multi-Module Projects (Parent & Child POM)",
    ],
  },
  {
    id: 7,
    icon: <CircleStackIcon className="w-8 h-8" />,
    title: "Nexus Artifactory",
    subtitle: "Artifact Repository Management",
    color: "#2d2d2d",
    topics: [
      "What are Artifactories?",
      "Purpose of Artifact Management",
      "Install Nexus on EC2",
      "Integrate Nexus with Maven",
      "Release vs Snapshot Artifacts",
      "Integrate Nexus with Jenkins",
    ],
  },
  {
    id: 8,
    icon: <CogIcon className="w-8 h-8" />,
    title: "Jenkins CI/CD",
    subtitle: "Continuous Integration Server",
    color: "#d33b3e",
    topics: [
      "CI/CD Concepts (Continuous Integration, Delivery, Deployment)",
      "Jenkins Installation on Linux",
      "Freestyle Projects & Maven Projects",
      "Integrate Maven, Nexus, SonarQube",
      "Deploy to Tomcat (Plugin & Script)",
      "Email Notifications & Webhooks",
      "Poll SCM & Build Periodically",
      "Pipeline as Code (Declarative & Scripted)",
      "Multibranch Pipelines",
      "Jenkins Security, Roles & Access Control",
      "Plugin Management & Best Practices",
    ],
  },
  {
    id: 9,
    icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
    title: "Ansible Configuration",
    subtitle: "Infrastructure Automation",
    color: "#1a1a1a",
    topics: [
      "Ansible Introduction & Architecture",
      "Inventory Management",
      "Writing Playbooks",
      "Variables, Loops, Conditions",
      "Handlers & Roles",
      "Ansible Vault for Secrets",
    ],
  },
  {
    id: 10,
    icon: <CubeIcon className="w-8 h-8" />,
    title: "Docker Containers",
    subtitle: "Container Runtime Engine",
    color: "#0db7ed",
    topics: [
      "Containers vs VMs",
      "Docker Architecture & CLI",
      "Writing Dockerfiles",
      "Multi-Stage Builds",
      "Image Registries (Docker Hub, ECR)",
      "Networking & Volumes",
      "Docker Compose",
    ],
  },
  {
    id: 11,
    icon: <CircleStackIcon className="w-8 h-8" />,
    title: "Kubernetes",
    subtitle: "Container Orchestration",
    color: "#326ce5",
    topics: [
      "Kubernetes Architecture",
      "Installation & Setup",
      "Pods, Deployments, Services",
      "StatefulSets & DaemonSets",
      "ConfigMaps & Secrets",
      "Volumes & Persistent Storage",
      "Rolling Updates & Scaling",
      "Health Checks & Probes",
      "Scheduling, Affinity, Taints, Tolerations",
      "Ingress & Load Balancing",
      "RBAC & Security",
      "Helm Package Manager",
      "Prometheus & Grafana Monitoring",
      "ArgoCD GitOps",
    ],
  },
  {
    id: 12,
    icon: <CloudIcon className="w-8 h-8" />,
    title: "AWS Cloud",
    subtitle: "Deep & Practical Coverage",
    color: "#ff9900",
    services: [
      { name: "IAM", desc: "Identity & Access Management" },
      { name: "EC2", desc: "Elastic Compute Cloud" },
      { name: "S3", desc: "Simple Storage Service" },
      { name: "VPC", desc: "Virtual Private Cloud" },
      { name: "RDS", desc: "Relational Database Service" },
      { name: "ELB", desc: "Elastic Load Balancer" },
      { name: "Auto Scaling", desc: "Dynamic Scaling" },
      { name: "Route 53", desc: "DNS Service" },
      { name: "CloudWatch", desc: "Monitoring & Logging" },
      { name: "CloudFront", desc: "CDN Service" },
      { name: "SNS", desc: "Notification Service" },
      { name: "CodePipeline", desc: "CI/CD Service" },
    ],
  },
  {
    id: 13,
    icon: <CodeBracketIcon className="w-8 h-8" />,
    title: "Terraform IaC",
    subtitle: "Infrastructure as Code",
    color: "#623ce4",
    topics: [
      "Define Infrastructure as Code",
      "Terraform Terminology",
      "Creating Resources in AWS",
      "Interview-Level Questions",
    ],
  },
];

// Real-World Projects
const projects = [
  {
    title: "Static Website Hosting",
    description: "Host a website on S3 with Route 53 & CloudFront",
    icon: <GlobeAltIcon className="w-8 h-8" />,
    tech: ["S3", "Route 53", "CloudFront"],
  },
  {
    title: "EC2-based Web Server",
    description: "Configure Apache/Nginx on an EC2 instance",
    icon: <ServerIcon className="w-8 h-8" />,
    tech: ["EC2", "Apache", "Nginx"],
  },
  {
    title: "Multi-Tier Web App",
    description: "Deploy E-Commerce app with VPC, ALB, Kubernetes, RDS, Container Registry, Route53",
    icon: <CircleStackIcon className="w-8 h-8" />,
    tech: ["VPC", "ALB", "EKS", "RDS", "ECR"],
  },
  {
    title: "GitOps with ArgoCD",
    description: "Kubernetes deployments with Helm, Prometheus, Grafana on AWS EKS",
    icon: <RocketLaunchIcon className="w-8 h-8" />,
    tech: ["ArgoCD", "Helm", "Prometheus", "Grafana", "EKS"],
  },
];

// AI Project
const aiProject = {
  title: "AI-Assisted Cloud Operations Platform",
  subtitle: "Log Analysis + IAM Key Rotation + Alerts",
  overview: "A real-world DevOps + Security project showing practical AI usage in modern cloud operations.",
  features: [
    "Log collection from Linux, Kubernetes, CloudWatch",
    "Python-based automation scripts",
    "AI-assisted log and error analysis",
    "IAM access key rotation workflow",
    "Slack/Email alerting with AI summaries",
  ],
  aiUsage: [
    "Explaining application and Kubernetes logs",
    "Summarizing incidents in simple English",
    "Explaining IAM security risks",
    "Generating draft scripts and configs",
  ],
  schedule: [
    { day: "Day 1", title: "Foundations & Architecture", desc: "Real-world challenges, AI in DevOps, security concepts" },
    { day: "Day 2", title: "Hands-On Teaching", desc: "Log collection, Python automation, AI analysis demos" },
    { day: "Day 3", title: "Log Analyzer", desc: "Implement log collection and AI analysis module" },
    { day: "Day 4", title: "IAM Automation", desc: "IAM key scanning, risk detection, rotation automation" },
    { day: "Day 5", title: "Integration", desc: "Alerts, notifications, full project review" },
  ],
};

// Enrollment Steps
const enrollmentSteps = [
  {
    step: 1,
    icon: <ClipboardDocumentCheckIcon className="w-8 h-8" />,
    title: "Application & Registration",
    description: "Apply to the program by paying a ₹5,000 registration fee.",
  },
  {
    step: 2,
    icon: <PhoneIcon className="w-8 h-8" />,
    title: "1:1 Evaluation Call",
    description: "Our team will schedule a personal discussion to understand your background, goals, and readiness.",
  },
  {
    step: 3,
    icon: <CheckCircleIcon className="w-8 h-8" />,
    title: "Final Decision",
    description: "If selected, pay remaining fee to confirm. If not selected, get full ₹5,000 refund within 24 hours.",
  },
];

// Expandable Module Component
function ModuleCard({ module, index }: { module: typeof curriculumModules[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] md:rounded-[20px] overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-5 flex items-center gap-3 md:gap-4 text-left hover:bg-white/10 transition-colors"
      >
        <div
          className="p-2 md:p-3 rounded-[10px] md:rounded-[12px] shrink-0"
          style={{ backgroundColor: `${module.color}15` }}
        >
          <div style={{ color: module.color }} className="w-6 h-6 md:w-8 md:h-8 [&>svg]:w-full [&>svg]:h-full">{module.icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="glass-card glass-card-blur-sm px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold text-[#1447e6]">
              Module {module.id}
            </span>
          </div>
          <h3 className="font-outfit font-semibold text-[#2d2d2d] text-sm md:text-lg mt-1 truncate">
            {module.title}
          </h3>
          <p className="font-sans text-[#66707d] text-xs md:text-sm">{module.subtitle}</p>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 md:w-5 md:h-5 text-[#66707d] shrink-0 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 pt-2 border-t border-white/20">
              {/* Topics */}
              {module.topics && (
                <div className="space-y-2">
                  {module.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-3 h-3 md:w-4 md:h-4 text-[#1447e6] shrink-0 mt-0.5" />
                      <span className="font-sans text-[#2d2d2d] text-xs md:text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Commands (for Linux) */}
              {module.commands && (
                <div className="mt-4">
                  <p className="font-sans font-semibold text-[#2d2d2d] text-xs md:text-sm mb-2">Key Commands:</p>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {module.commands.map((cmd, i) => (
                      <code
                        key={i}
                        className="glass-card glass-card-blur-sm px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-mono text-[#1447e6]"
                      >
                        {cmd}
                      </code>
                    ))}
                  </div>
                </div>
              )}

              {/* Phases (for Networking) */}
              {module.phases && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {module.phases.map((phase, i) => (
                    <div key={i} className="glass-card glass-card-blur-sm glass-card-opacity-light p-2 md:p-3 rounded-[10px] md:rounded-[12px]">
                      <p className="font-sans font-semibold text-[#1447e6] text-xs md:text-sm mb-2">{phase.name}</p>
                      <ul className="space-y-1">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-[#1447e6] text-[10px] md:text-xs mt-1">•</span>
                            <span className="font-sans text-[#2d2d2d] text-[10px] md:text-xs">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* AWS Services */}
              {module.services && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {module.services.map((service, i) => (
                    <div key={i} className="glass-card glass-card-blur-sm glass-card-opacity-light p-2 md:p-3 rounded-[10px] md:rounded-[12px]">
                      <p className="font-sans font-semibold text-[#ff9900] text-xs md:text-sm">{service.name}</p>
                      <p className="font-sans text-[#66707d] text-[10px] md:text-xs">{service.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DCLPPage() {
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

      {/* Hero Section Container */}
      <div className="glass-card-main relative min-h-[750px] md:min-h-[800px] mx-auto my-[15px] md:my-[23px] rounded-[20px] md:rounded-[32px] w-[calc(100%-20px)] md:w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[750px] md:min-h-[800px] w-full z-10">
          <Header />

          {/* Hero Content */}
          <div className="relative w-full pt-[110px] md:pt-[140px] pb-[40px] md:pb-[60px] px-3 md:px-[59px]">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col gap-4 md:gap-5"
              >
                {/* Badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-bold text-[#e54a2d] text-[11px] md:text-sm animate-pulse">
                    🔥 Only 6 Seats Per Batch
                  </span>
                  <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#1447e6] text-[11px] md:text-sm">
                    DevOps + Real-World AI Usage
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-4xl lg:text-[48px] leading-tight">
                  Pack of 6
                  <br />
                  <span className="text-[#1447e6]">Job-Ready DevOps Program</span>
                </h1>

                {/* Description */}
                <div className="space-y-3">
                  <p className="font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-lg">
                    This is not a mass course.
                  </p>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[13px] md:text-base leading-relaxed max-w-xl">
                    This is a <span className="font-semibold text-[#1447e6]">high-focus, mentor-driven job-ready program</span>, limited to only 6 learners per batch.
                  </p>
                  <p className="font-sans font-normal text-[#66707d] text-[12px] md:text-sm leading-relaxed max-w-xl">
                    We built this for people who are serious about becoming real DevOps engineers — not just completing a syllabus.
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2">
                  {techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="glass-card glass-card-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-sans font-medium text-[#2d2d2d] flex items-center gap-1"
                    >
                      <span className="text-[#1447e6]">{tech.icon}</span>
                      {tech.name}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 mt-3">
                  <Link
                    href="/contact-us"
                    className="bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap"
                  >
                    Apply Now – ₹5,000
                  </Link>
                  <a
                    href="#curriculum"
                    className="glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[13px] md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-white/20 transition-colors whitespace-nowrap"
                  >
                    View Curriculum
                  </a>
                </div>
              </motion.div>

              {/* Right Content - Pricing Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:w-[380px] shrink-0"
              >
                <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-6 rounded-[16px] md:rounded-[20px]">
                  <div className="text-center mb-4">
                    <p className="font-sans text-[#66707d] text-[12px] md:text-sm line-through">₹60,000</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-outfit font-bold text-[#2d2d2d] text-[32px] md:text-[40px]">₹39,999</span>
                      <span className="glass-card glass-card-blur-sm px-2 py-1 rounded-full text-[10px] md:text-xs font-bold text-green-600 bg-green-50">
                        33% OFF
                      </span>
                    </div>
                    <p className="font-sans text-[#66707d] text-[11px] md:text-xs mt-1">Limited time offer</p>
                  </div>

                  <div className="border-t border-white/30 pt-4 mb-4">
                    <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-3">
                      What Makes This Different?
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Complete tech stack (10+ tools)",
                        "4 Real-world projects",
                        "AI-Assisted Operations Project",
                        "1-on-1 mentorship & doubt clearing",
                        "Resume & interview preparation",
                        "Lifetime access to recordings",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-[#1447e6] shrink-0 mt-0.5" />
                          <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact-us"
                    className="w-full bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base py-3 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <CurrencyRupeeIcon className="w-5 h-5" />
                    Pay ₹5,000 to Apply
                  </Link>
                  <p className="font-sans text-[#66707d] text-[10px] md:text-xs text-center mt-2">
                    Registration fee • Refundable if not selected
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full mt-[30px] md:mt-[40px]">
        <div className="relative flex flex-col gap-[40px] md:gap-[60px] items-center pt-[20px] pb-[40px] md:pb-[60px] px-2 md:px-4 max-w-[1383.548px] mx-auto">

          {/* Enrollment Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-3xl mb-2">
                  Selective Enrollment Process
                </h2>
                <p className="font-sans text-[#66707d] text-[12px] md:text-base max-w-2xl mx-auto">
                  To maintain quality and focus, we follow a carefully designed selection process.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                {enrollmentSteps.map((step, i) => (
                  <div key={i} className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 md:p-5 rounded-[12px] md:rounded-[16px] text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#1447e6] rounded-full flex items-center justify-center">
                      <span className="font-outfit font-bold text-white text-[12px] md:text-sm">{step.step}</span>
                    </div>
                    <div className="text-[#1447e6] flex justify-center mt-3 mb-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 [&>svg]:w-full [&>svg]:h-full">{step.icon}</div>
                    </div>
                    <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-2">{step.title}</h3>
                    <p className="font-sans text-[#66707d] text-[11px] md:text-sm">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* Refund Policy */}
              <div className="glass-card glass-card-blur-sm p-4 md:p-5 rounded-[12px] md:rounded-[16px] border border-[#1447e6]/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-[#1447e6]/10 shrink-0">
                    <ArrowPathIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1447e6]" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-1">Refund Policy</h4>
                    <p className="font-sans text-[#2d2d2d] text-[12px] md:text-sm">
                      If not selected after the evaluation call, your <span className="font-semibold text-[#1447e6]">₹5,000 registration fee will be fully refunded within 24 hours</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* What this ensures */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-5">
                {[
                  { icon: <UserGroupIcon className="w-5 h-5" />, text: "Highly focused learning environment" },
                  { icon: <ShieldCheckIcon className="w-5 h-5" />, text: "Right fit for mentor-driven cohort" },
                  { icon: <CheckCircleIcon className="w-5 h-5" />, text: "Fairness for every applicant" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 glass-card glass-card-blur-sm p-3 rounded-[10px]">
                    <span className="text-[#1447e6]">{item.icon}</span>
                    <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* SDLC Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex-1">
                  <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-3xl mb-3 md:mb-4">
                    Understanding DevOps & SDLC
                  </h2>
                  <p className="font-sans text-[#2d2d2d] text-[13px] md:text-base leading-relaxed mb-4">
                    DevOps is the combination of Development and Operations. In today's competitive market, 
                    applications need rapid development and delivery cycles. DevOps provides all the tools 
                    required to speed up application planning, designing, build, and deployment.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[10px] md:rounded-[12px]">
                      <h4 className="font-outfit font-semibold text-[#66707d] text-[12px] md:text-sm mb-1 md:mb-2">Waterfall Methodology</h4>
                      <p className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">Traditional sequential approach</p>
                    </div>
                    <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[10px] md:rounded-[12px] border-2 border-[#1447e6]/20">
                      <h4 className="font-outfit font-semibold text-[#1447e6] text-[12px] md:text-sm mb-1 md:mb-2">Agile Methodology ✓</h4>
                      <p className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">Focus on quality, productivity & rapid delivery</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[280px] shrink-0">
                  <div className="glass-card glass-card-blur-sm glass-card-opacity-medium p-4 rounded-[12px] h-full flex flex-col justify-center">
                    <p className="font-outfit font-semibold text-[#1447e6] text-[14px] md:text-lg mb-2">DevOps Process</p>
                    <p className="font-sans text-[#2d2d2d] text-[12px] md:text-sm">
                      Suitable for Agile methodology with tools supporting every phase of SDLC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Curriculum Section */}
          <div id="curriculum" className="w-full scroll-mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6 md:mb-8"
            >
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-4xl mb-2 md:mb-3">
                Complete Curriculum
              </h2>
              <p className="font-sans text-[#66707d] text-[12px] md:text-lg max-w-2xl mx-auto">
                13 comprehensive modules covering everything from Linux basics to Kubernetes and AWS Cloud
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {curriculumModules.map((module, index) => (
                <ModuleCard key={module.id} module={module} index={index} />
              ))}
            </div>
          </div>

          {/* Real-World Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="text-center mb-6 md:mb-8">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-4xl mb-2 md:mb-3">
                Real-World DevOps Projects
              </h2>
              <p className="font-sans text-[#66707d] text-[12px] md:text-lg">
                Build production-grade projects for your portfolio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 md:p-6 rounded-[16px] md:rounded-[20px] hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 rounded-[10px] md:rounded-[12px] bg-[#1447e6]/10 shrink-0">
                      <div className="text-[#1447e6] w-6 h-6 md:w-8 md:h-8 [&>svg]:w-full [&>svg]:h-full">{project.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-1 md:mb-2">
                        {project.title}
                      </h3>
                      <p className="font-sans text-[#66707d] text-[11px] md:text-sm mb-2 md:mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {project.tech.map((t, j) => (
                          <span
                            key={j}
                            className="glass-card glass-card-blur-sm px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-sans font-medium text-[#1447e6]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Project Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px] border border-[#1447e6]/20">
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="p-2 md:p-3 rounded-[10px] md:rounded-[12px] bg-[#1447e6]/10">
                  <SparklesIcon className="w-6 h-6 md:w-8 md:h-8 text-[#1447e6]" />
                </div>
                <div>
                  <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[18px] md:text-3xl">
                    {aiProject.title}
                  </h2>
                  <p className="font-sans text-[#1447e6] text-[11px] md:text-sm font-medium">{aiProject.subtitle}</p>
                </div>
              </div>

              <p className="font-sans text-[#2d2d2d] text-[12px] md:text-base mb-5 md:mb-6">{aiProject.overview}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5 md:mb-6">
                <div>
                  <h4 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-2 md:mb-3">What You'll Build</h4>
                  <ul className="space-y-1.5 md:space-y-2">
                    {aiProject.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-3 h-3 md:w-4 md:h-4 text-[#1447e6] shrink-0 mt-0.5" />
                        <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-2 md:mb-3">Where AI Is Used</h4>
                  <ul className="space-y-1.5 md:space-y-2">
                    {aiProject.aiUsage.map((a, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <SparklesIcon className="w-3 h-3 md:w-4 md:h-4 text-[#1447e6] shrink-0 mt-0.5" />
                        <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 5-Day Schedule */}
              <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[10px] md:rounded-[12px]">
                <h4 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-3 md:mb-4">1-Week Project Plan</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
                  {aiProject.schedule.map((day, i) => (
                    <div key={i} className="glass-card glass-card-blur-sm glass-card-opacity-light p-2 md:p-3 rounded-[8px] md:rounded-[10px] text-center">
                      <p className="font-outfit font-bold text-[#1447e6] text-[11px] md:text-sm">{day.day}</p>
                      <p className="font-sans font-semibold text-[#2d2d2d] text-[10px] md:text-xs mt-1">{day.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why Only 6 Learners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-3xl mb-4 md:mb-6 text-center">
                Why Only 6 Learners Per Batch?
              </h2>
              <p className="font-sans text-[#2d2d2d] text-[12px] md:text-base text-center mb-5 md:mb-6">
                Because real learning needs focused attention, not overcrowded classrooms.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { icon: <AcademicCapIcon className="w-6 h-6 md:w-8 md:h-8" />, text: "Personal Feedback" },
                  { icon: <BeakerIcon className="w-6 h-6 md:w-8 md:h-8" />, text: "Time to Debug" },
                  { icon: <BookOpenIcon className="w-6 h-6 md:w-8 md:h-8" />, text: "Space to Ask" },
                  { icon: <ShieldCheckIcon className="w-6 h-6 md:w-8 md:h-8" />, text: "Mentor Attention" },
                ].map((item, i) => (
                  <div key={i} className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[10px] md:rounded-[12px] text-center">
                    <div className="text-[#1447e6] flex justify-center mb-2">{item.icon}</div>
                    <p className="font-sans font-semibold text-[#2d2d2d] text-[11px] md:text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="font-outfit font-semibold text-[#1447e6] text-[14px] md:text-lg text-center mt-5 md:mt-6">
                This is not a mass course. It's a serious job-ready program.
              </p>
            </div>
          </motion.div>

          {/* Your Effort = Your Outcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-3xl mb-4 md:mb-6 text-center">
                Your Effort = Your Outcome
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="glass-card glass-card-blur-sm p-4 md:p-5 rounded-[12px] md:rounded-[16px]">
                  <h3 className="font-outfit font-semibold text-[#1447e6] text-[16px] md:text-xl mb-3 md:mb-4">We Provide</h3>
                  <ul className="space-y-2">
                    {["Structure", "Mentorship", "Real projects", "Industry guidance"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6]" />
                        <span className="font-sans text-[#2d2d2d] text-[13px] md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card glass-card-blur-sm p-4 md:p-5 rounded-[12px] md:rounded-[16px]">
                  <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-xl mb-3 md:mb-4">Your Responsibility</h3>
                  <ul className="space-y-2">
                    {["Practice", "Build", "Debug", "Ask questions", "Stay consistent"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#2d2d2d]" />
                        <span className="font-sans text-[#2d2d2d] text-[13px] md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg text-center mt-5 md:mt-6">
                If you do your part, we make sure you're job-ready.
              </p>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-lg glass-card-opacity-medium p-6 md:p-12 rounded-[16px] md:rounded-[20px] text-center">
              <h2 className="font-outfit font-bold text-[#2d2d2d] text-[22px] md:text-4xl mb-3 md:mb-4">
                Ready to Become Job-Ready?
              </h2>
              <p className="font-sans text-[#2d2d2d] text-[14px] md:text-xl mb-4 max-w-2xl mx-auto">
                Only 6 seats per batch. Complete curriculum from Linux to Kubernetes. 
                4 real-world projects + AI-Assisted Operations capstone.
              </p>
              
              {/* Pricing Summary */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-6">
                <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[12px]">
                  <p className="font-sans text-[#66707d] text-[11px] md:text-sm">Total Program Fee</p>
                  <p className="font-outfit font-bold text-[#2d2d2d] text-[24px] md:text-3xl">₹39,999</p>
                  <p className="font-sans text-[#66707d] text-[10px] md:text-xs line-through">₹60,000</p>
                </div>
                <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[12px]">
                  <p className="font-sans text-[#66707d] text-[11px] md:text-sm">Apply Now With</p>
                  <p className="font-outfit font-bold text-[#1447e6] text-[24px] md:text-3xl">₹5,000</p>
                  <p className="font-sans text-[#66707d] text-[10px] md:text-xs">Refundable if not selected</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <Link
                  href="/contact-us"
                  className="bg-[#1447e6] text-white font-sans font-semibold text-[14px] md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap"
                >
                  Apply Now – ₹5,000
                </Link>
                <a
                  href="#curriculum"
                  className="glass-card glass-card-blur-sm font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/20 transition-colors whitespace-nowrap"
                >
                  View Full Curriculum
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative w-full mt-[50px] md:mt-[80px]">
        <div className="relative flex flex-col items-center justify-center pt-[30px] md:pt-[50px] pb-[30px] md:pb-[50px] px-2 md:px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
