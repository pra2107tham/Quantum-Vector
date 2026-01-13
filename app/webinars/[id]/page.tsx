"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  CalendarIcon,
  ClockIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  UserGroupIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

// Webinar data
const webinarData: Record<string, any> = {
  "python-for-devops-2026": {
    id: "python-for-devops-2026",
    title: "Python for DevOps 2026 – Live Weekend Webinar",
    tagline:
      "Beginner-to-intermediate live program focused on real DevOps automation with Python across two weekends.",
    date: "10, 11, 17, 18 (Two Weekends)",
    time: "6:00 PM – 9:00 PM IST",
    duration: "10+ Hours (Live, Hands-on)",
    price: "₹1999",
    originalPrice: null,
    mode: "Live Online",
    bonus: "Code templates + AWS/Boto3 snippets for automation",
    status: "completed",
    description:
      "A hands-on, weekend-only webinar that treats Python as a DevOps automation tool—not just a programming language. Build scripts, automate infra tasks, and practice the exact workflows companies expect in 2026.",
    whyMatters: {
      title: "Why This Webinar Matters 🚀",
      content:
        "DevOps teams expect automation that is reliable, repeatable, and production-aware. This webinar shows you how to use Python for real DevOps tasks—from file/config updates to AWS automation—so you can ship value quickly without wrestling with theory-heavy material.",
    },
    projects: [
      "Manage and optimize server configurations using Python dictionaries",
      "Automate file and configuration updates based on external triggers",
      "AWS automation script to deploy or manage cloud resources with Boto3",
    ],
    outcomes: [
      "Write Python scripts for DevOps automation with confidence",
      "Apply Fabric and Boto3 for real-world infrastructure tasks",
      "Build a reusable toolkit for configs, logs, and cloud actions",
    ],
    whatYoullLearn: [
      "Python fundamentals tailored for DevOps engineers",
      "Strings, numbers, control flow, and reusable functions/modules",
      "Environment variables, .env handling, and CLI-based scripts",
      "Loops, lists, dictionaries, and sets to automate repetitive tasks",
      "File operations for configuration and server management",
      "Log parsing and system data processing scripts",
      "Remote automation with Fabric (run commands, manage servers)",
      "AWS automation with Boto3 (EC2, S3, common cloud tasks)",
      "Structuring DevOps-ready Python projects for reuse",
    ],
    whoIsFor: [
      "Engineering students (CS/IT/AIML/Data/Cloud) targeting DevOps/SRE",
      "Freshers preparing for DevOps, SRE, or Cloud roles",
      "Backend developers moving toward DevOps automation",
      "Anyone with basic coding skills who wants production-ready automation",
      "Not ideal if you are already a senior DevOps engineer",
    ],
    whatYoullGet: [
      "10+ hours of live, hands-on sessions across two weekends",
      "Project walkthroughs with code templates you can reuse",
      "Fabric + Boto3 examples for real infra automation",
      "Actionable scripts for configs, logs, and cloud tasks",
    ],
    whereToLearn: {
      title: "Next Steps After the Webinar 🏗️",
      content:
        "Use these Python automation foundations to move into CI/CD, IaC, and Kubernetes with confidence. Keep practicing with real scenarios—configs, logs, and cloud tasks—so your skills stay production-grade, not tutorial-level.",
    },
    paymentLink: "http://pages.razorpay.com/pl_RyuwUJfRjvq5vL/view?label=python_for_devops_2026",
  },
  "devops-roadmap-2026": {
    id: "devops-roadmap-2026",
    title: "DevOps Roadmap 2026 – Complete Career Guide",
    tagline: "Learn What to Study, How to Study, and How to Get DevOps Jobs in 2026",
    date: "28th December 2025",
    time: "9:00–10:30 AM IST",
    duration: "90 minutes live session",
    price: "₹99",
    originalPrice: null,
    mode: "Live Online",
    bonus: "Full End-to-End DevOps Roadmap PDF",
    status: "completed",
    description: "DevOps in 2026 demands real-world skills, not random tools or outdated tutorials. This session gives you a clear, practical, and industry-aligned DevOps career roadmap, so you know exactly what to learn and why.",
    whyMatters: {
      title: "Why DevOps Roadmap 2026 Matters 🚀",
      content: "DevOps in 2026 demands real-world skills, not random tools or outdated tutorials. This session gives you a clear, practical, and industry-aligned DevOps career roadmap, so you know exactly what to learn and why.",
    },
    whatYoullLearn: [
      "Complete DevOps Roadmap (2026-ready) – Beginner to Advanced",
      "Skills and tools companies actually hire for",
      "How to study DevOps step by step (no confusion, no guesswork)",
      "Cloud, CI/CD, Kubernetes, and Monitoring skills relevant for 2026 roles",
      "Career paths: DevOps Engineer, SRE, Platform Engineer, Cloud Engineer",
    ],
    whoIsFor: [
      "Students & freshers planning a DevOps career",
      "Working professionals switching to DevOps",
      "DevOps engineers unsure about their next learning step",
      "Anyone targeting DevOps jobs in 2026",
          ],
    whatYoullGet: [
      "Full End-to-End DevOps Roadmap PDF",
      "Clear learning order: Linux → Cloud → CI/CD → Kubernetes → Monitoring",
      "Guidance on where to learn and how to practice",
      "Career clarity with realistic expectations",
          ],
    whereToLearn: {
      title: "Where to Learn DevOps the Right Way 🏗️",
      content: "Continue your DevOps journey with QuantumVector, where we focus on real production-grade DevOps workflows, practical understanding over theory, and career-oriented learning, not just certifications. We teach DevOps the way companies use it in real environments.",
    },
    paymentLink: "https://pages.razorpay.com/pl_RvT6DzJQ239j4F/view?label=roadmap_webinar",
    projects: [],
    outcomes: [
      "Clarity on the complete DevOps learning path for 2026 roles",
      "Understand hiring expectations and how to practice the right way",
      "Actionable roadmap to move into DevOps, SRE, or Platform Engineering",
    ],
  },
  "docker-kubernetes-2026": {
    id: "docker-kubernetes-2026",
    title: "Docker & Kubernetes Webinar – Live Weekend Program",
    tagline:
      "Master containerization and orchestration with hands-on microservices project across weekend sessions.",
    date: "24, 25, 31 Jan & 1 Feb (Weekends Only)",
    time: "8:00 AM – 10:30 AM IST",
    duration: "10+ Hours (Live, Hands-on)",
    price: "₹2999",
    originalPrice: null,
    mode: "Live Online",
    bonus: "Docker scripts + K8s manifests + E-commerce project code",
    status: "upcoming",
    description:
      "A comprehensive weekend webinar series focused on Docker containerization and Kubernetes orchestration. Build a real-time e-commerce microservices application with User Login, Shopping Cart, Product Inventory, and Payment services—learning production-grade container orchestration workflows.",
    projectHighlight: {
      title: "Real-Time E-Commerce Microservices Project 🛒",
      description:
        "Build a complete e-commerce application using microservice architecture throughout the webinar. This isn't a pre-built demo—we'll develop it live, showing you real production-grade containerization and orchestration patterns.",
      services: [
        "User Login Service - Authentication and session management",
        "Shopping Cart Service - Real-time cart operations with state management",
        "Product Inventory Service - Product catalog with database integration",
        "Payment Service - Secure payment processing microservice",
      ],
    },
    whyMatters: {
      title: "Why Docker & Kubernetes Matter 🚀",
      content:
        "Modern cloud-native applications run on containers orchestrated by Kubernetes. Companies expect engineers who can containerize applications, manage deployments, configure auto-scaling, and implement production-ready microservices. This webinar bridges theory and practice with a real e-commerce project using microservice architecture.",
    },
    projects: [
      "Build and containerize User Login microservice with Docker",
      "Deploy Shopping Cart service with persistent storage in Kubernetes",
      "Implement Product Inventory service with ConfigMaps and Secrets",
      "Create Payment microservice with service mesh communication",
      "Set up Ingress routing and LoadBalancer for external access",
      "Configure auto-scaling with HPA based on CPU metrics",
    ],
    outcomes: [
      "Master Docker containerization for microservices applications",
      "Deploy and manage applications on Kubernetes clusters",
      "Implement production-ready patterns: health checks, auto-scaling, RBAC",
      "Build a complete e-commerce platform with microservice architecture",
      "Understand Kubernetes objects: Pods, Deployments, Services, Ingress",
      "Configure persistent storage, ConfigMaps, and Secrets for real applications",
    ],
    whatYoullLearn: [
      "Introduction to Kubernetes architecture and real-world use cases",
      "Cluster setup using Minikube/Kubeadm with hands-on installation",
      "Working with kubectl commands and Kubernetes objects",
      "PODs, ReplicaSets, Deployments with Rolling Update strategies",
      "DaemonSets, StatefulSets for stateful applications",
      "PersistentVolumes and PersistentVolumeClaims for data storage",
      "Managing ConfigMaps and Secrets for configuration management",
      "Kubernetes Services: ClusterIP, NodePort, LoadBalancer",
      "Ingress Controller setup for HTTP/HTTPS routing",
      "Resource Quotas and LimitRange for resource management",
      "Liveness and Readiness Probes for health monitoring",
      "Horizontal Pod Autoscaler (HPA) with Metrics Server",
      "Node maintenance: Cordon, Drain, Uncordon operations",
      "Scheduling with Taints, Tolerations, Affinity & Anti-Affinity",
      "Kubernetes RBAC: Roles, RoleBindings, ServiceAccounts",
      "Kubernetes Dashboard setup with read-only access control",
      "Production-ready microservices deployment patterns",
    ],
    whoIsFor: [
      "DevOps engineers wanting to master container orchestration",
      "Backend developers moving to cloud-native microservices",
      "Students (CS/IT/Cloud) targeting Kubernetes-based roles",
      "SRE and Platform engineers managing production clusters",
      "Freshers preparing for DevOps/Cloud/SRE positions",
      "Anyone with basic Docker knowledge wanting to learn Kubernetes",
    ],
    whatYoullGet: [
      "10+ hours of live, hands-on weekend sessions",
      "Real e-commerce microservices project with complete source code",
      "Docker scripts and Kubernetes manifests for all services",
      "Production-ready patterns for health checks, scaling, and RBAC",
      "Access to all project resources and configuration files",
      "Lifetime access to session recordings and materials",
    ],
    whereToLearn: {
      title: "Next Steps After the Webinar 🏗️",
      content:
        "After mastering Docker and Kubernetes fundamentals, move into advanced topics like Helm charts, Service Mesh (Istio), CI/CD with ArgoCD/Flux, and multi-cluster management. Practice deploying real applications on cloud platforms (EKS, GKE, AKS) and focus on production observability with Prometheus and Grafana.",
    },
    paymentLink: "https://pages.razorpay.com/pl_S3RQ3QPcNGva1R/view?label=docker_kubernetes_webinar_2026",
  },
};

export default function WebinarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const webinar = webinarData[id];

  if (!webinar) {
  return (
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-outfit font-bold text-[#2d2d2d] text-2xl mb-4">Webinar Not Found</h1>
          <Link href="/webinars" className="text-[#1447e6] hover:underline">
            ← Back to Webinars
              </Link>
        </div>
      </div>
    );
  }

  const detailItems = [
    { label: "Dates", value: webinar.date, icon: CalendarIcon },
    { label: "Time", value: webinar.time, icon: ClockIcon },
    { label: "Duration", value: webinar.duration || "Live session", icon: ClockIcon },
    { label: "Mode", value: webinar.mode, icon: VideoCameraIcon },
    { label: "Price", value: webinar.price, icon: CheckCircleIcon },
  ];

  const projects = webinar.projects || [];
  const outcomes = webinar.outcomes || webinar.whatYoullGet || [];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image
          src={imgImage10}
          alt="Quantum Vector Background"
          fill
          className="object-cover object-center pointer-events-none"
          priority
          unoptimized
                    />
                  </div>
      <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />

      {/* Hero Section */}
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
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-bold text-[#e54a2d] text-[11px] md:text-sm">
                    🚀 Live Webinar
                  </span>
                  {webinar.status === "completed" ? (
                    <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#198754] text-[11px] md:text-sm">
                      ✓ Completed
                    </span>
                  ) : (
                    <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#1447e6] text-[11px] md:text-sm flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {webinar.date}
                    </span>
                  )}
                  <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#e54a2d] text-[11px] md:text-sm">
                    ⚡ Limited Seats
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-4xl lg:text-[48px] leading-tight">
                  {webinar.title.split('–')[0].trim()}
                  <br />
                  <span className="text-[#1447e6]">{webinar.title.split('–')[1]?.trim() || ''}</span>
                </h1>

                {/* Description */}
                <div className="space-y-3">
                  <p className="font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-lg">
                    {webinar.tagline}
                  </p>
                  {webinar.description && (
                    <p className="font-sans font-normal text-[#2d2d2d] text-[13px] md:text-base leading-relaxed max-w-xl">
                      {webinar.description}
                    </p>
                  )}
                </div>

                {/* Details Grid (Compact Pills) */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2">
                  {detailItems.slice(0, 4).map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <span
                        key={idx}
                        className="glass-card glass-card-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-sans font-medium text-[#2d2d2d] flex items-center gap-1"
                      >
                        <Icon className="w-3 h-3 md:w-4 md:h-4 text-[#1447e6]" />
                        {item.value}
                      </span>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 mt-3">
                  {webinar.status === "completed" ? (
                    <span className="glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[13px] md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full whitespace-nowrap">
                      Session Completed
                    </span>
                  ) : webinar.paymentLink ? (
                    <Link
                      href={webinar.paymentLink}
                      target="_blank"
                      className="bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap"
                    >
                      Register Now – {webinar.price}
                    </Link>
                  ) : (
                    <span className="glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[13px] md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full whitespace-nowrap">
                      Registration Opening Soon
                    </span>
                  )}
                  <Link
                    href="/webinars"
                    className="glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[13px] md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-white/20 transition-colors whitespace-nowrap"
                  >
                    All Webinars
                  </Link>
                </div>
              </motion.div>

              {/* Right: CTA Pricing Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:w-[380px] shrink-0"
              >
                <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-6 rounded-[16px] md:rounded-[20px]">
                  <div className="text-center mb-4">
                    <p className="font-sans text-[#66707d] text-[12px] md:text-sm">One-Time Fee</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-outfit font-bold text-[#2d2d2d] text-[32px] md:text-[40px]">{webinar.price}</span>
                    </div>
                    {webinar.duration && (
                      <p className="font-sans text-[#66707d] text-[11px] md:text-xs mt-1">{webinar.duration}</p>
                    )}
                  </div>

                  <div className="border-t border-white/30 pt-4 mb-4">
                    <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-3">
                      What's Included?
                    </h3>
                    <div className="space-y-2">
                      {webinar.whatYoullGet.slice(0, 5).map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-[#1447e6] shrink-0 mt-0.5" />
                          <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {webinar.status === "completed" ? (
                    <>
                      <div className="w-full glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[13px] md:text-base py-3 rounded-full text-center mb-2">
                        Session Completed
                      </div>
                      <p className="font-sans text-[#66707d] text-[10px] md:text-xs text-center">
                        Check back for future dates
                      </p>
                    </>
                  ) : webinar.paymentLink ? (
                    <>
                      <Link
                        href={webinar.paymentLink}
                        target="_blank"
                        className="w-full bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base py-3 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg flex items-center justify-center gap-2"
                      >
                        Register Now
                      </Link>
                      <Link
                        href="/webinars"
                        className="w-full glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[12px] md:text-sm py-2.5 rounded-full hover:bg-white/20 transition-colors text-center mt-2 block"
                      >
                        ← Back to Webinars
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="w-full glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[13px] md:text-base py-3 rounded-full text-center mb-2">
                        Registration Opening Soon
                      </div>
                      <p className="font-sans text-[#66707d] text-[10px] md:text-xs text-center mb-3">
                        Registration link will be updated in a few hours
                      </p>
                      <Link
                        href="/webinars"
                        className="w-full glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[12px] md:text-sm py-2.5 rounded-full hover:bg-white/20 transition-colors text-center block"
                      >
                        ← Back to Webinars
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full mt-[30px] md:mt-[40px]">
        <div className="relative flex flex-col gap-[40px] md:gap-[60px] items-center pt-[20px] pb-[40px] md:pb-[60px] px-2 md:px-4 max-w-[1383.548px] mx-auto">
          {/* Why This Matters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-3xl mb-3 md:mb-4">
                {webinar.whyMatters.title}
              </h2>
              <p className="font-sans text-[#2d2d2d] text-[13px] md:text-base leading-relaxed">
                {webinar.whyMatters.content}
              </p>
            </div>
          </motion.div>

          {/* Real-Time Project Highlight */}
          {webinar.projectHighlight && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="glass-card glass-card-blur-lg glass-card-opacity-medium p-6 md:p-10 rounded-[16px] md:rounded-[20px] border-2 border-[#1447e6]/20">
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-4xl mb-3 md:mb-4">
                    {webinar.projectHighlight.title}
                  </h2>
                  <p className="font-sans text-[#2d2d2d] text-[13px] md:text-lg max-w-3xl mx-auto">
                    {webinar.projectHighlight.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
                  {webinar.projectHighlight.services.map((service: string, index: number) => {
                    const [serviceName, serviceDesc] = service.split(' - ');
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 md:p-5 rounded-[12px] md:rounded-[16px] hover:shadow-lg transition-all hover:scale-[1.02]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-[8px] bg-[#1447e6]/10 shrink-0">
                            <RocketLaunchIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1447e6]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[13px] md:text-base mb-1">
                              {serviceName}
                            </h3>
                            <p className="font-sans text-[#66707d] text-[11px] md:text-sm">
                              {serviceDesc}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 md:mt-8 text-center">
                  <div className="inline-flex items-center gap-2 glass-card glass-card-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full">
                    <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#198754]" />
                    <span className="font-sans font-semibold text-[#2d2d2d] text-[11px] md:text-sm">
                      Built live during the webinar - not pre-recorded demos
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* What You'll Learn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-3xl mb-4">
                What You'll Learn in This Session 📘
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {webinar.whatYoullLearn.map((item: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0 mt-0.5" />
                    <span className="font-sans text-[#2d2d2d] text-[12px] md:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Webinar Modules */}
          {projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="text-center mb-6 md:mb-8">
                <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-4xl mb-2 md:mb-3">
                  Webinar Modules 📚
                </h2>
                <p className="font-sans text-[#66707d] text-[12px] md:text-lg">
                  Practical modules covered throughout the webinar sessions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {projects.map((item: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 md:p-6 rounded-[16px] md:rounded-[20px] hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="p-2 md:p-3 rounded-[10px] md:rounded-[12px] bg-[#1447e6]/10 shrink-0">
                        <RocketLaunchIcon className="w-6 h-6 md:w-8 md:h-8 text-[#1447e6]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-1 md:mb-2">
                          Module {index + 1}
                        </h3>
                        <p className="font-sans text-[#66707d] text-[11px] md:text-sm">{item}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Outcomes */}
          {outcomes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
                <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-3xl mb-4">
                  Outcomes 🎯
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {outcomes.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <AcademicCapIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0 mt-0.5" />
                      <span className="font-sans text-[#2d2d2d] text-[12px] md:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Who This Is For */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-3xl mb-4">
                Who This Session Is For 👥
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {webinar.whoIsFor.map((item: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <UserGroupIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0 mt-0.5" />
                    <span className="font-sans text-[#2d2d2d] text-[12px] md:text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-sans font-medium text-[#66707d] text-[11px] md:text-sm mt-4">
                No prior DevOps experience required.
              </p>
            </div>
          </motion.div>

          {/* What You'll Get / Logistics Combined */}
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
                    What You'll Get 🎁
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {webinar.whatYoullGet.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0 mt-0.5" />
                        <span className="font-sans text-[#2d2d2d] text-[12px] md:text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-[280px] shrink-0">
                  <div className="glass-card glass-card-blur-sm glass-card-opacity-medium p-4 rounded-[12px] h-full flex flex-col justify-center">
                    <p className="font-outfit font-semibold text-[#1447e6] text-[14px] md:text-lg mb-2">
                      Schedule & Logistics
                    </p>
                    <div className="space-y-2">
                      {detailItems.slice(0, 3).map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-[#1447e6] shrink-0" />
                            <span className="font-sans text-[#2d2d2d] text-[11px] md:text-[13px]">
                              {item.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps / Pricing CTA */}
          <motion.div
            id="register"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full scroll-mt-8"
          >
            <div className="glass-card glass-card-blur-lg glass-card-opacity-medium p-6 md:p-12 rounded-[16px] md:rounded-[20px] text-center">
              <h2 className="font-outfit font-bold text-[#2d2d2d] text-[22px] md:text-4xl mb-3 md:mb-4">
                {webinar.status === "completed"
                  ? "Session Completed"
                  : "Ready to Join This Webinar?"}
              </h2>
              {webinar.status === "completed" ? (
                <p className="font-sans text-[#2d2d2d] text-[14px] md:text-xl mb-4 max-w-2xl mx-auto">
                  This session has been completed. Check back for future dates or explore our other webinars and courses.
                </p>
              ) : (
                <>
                  <p className="font-sans text-[#2d2d2d] text-[14px] md:text-xl mb-4 max-w-2xl mx-auto">
                    {webinar.duration}. Live, hands-on learning. Production-ready workflows.
                    {webinar.tagline}
                  </p>
                  
                  {/* Pricing Summary */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-6">
                    <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[12px]">
                      <p className="font-sans text-[#66707d] text-[11px] md:text-sm">One-Time Fee</p>
                      <p className="font-outfit font-bold text-[#1447e6] text-[24px] md:text-3xl">{webinar.price}</p>
                      <p className="font-sans text-[#66707d] text-[10px] md:text-xs">{webinar.duration}</p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                {webinar.status === "completed" ? (
                  <Link
                    href="/webinars"
                    className="bg-[#1447e6] text-white font-sans font-semibold text-[14px] md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap"
                  >
                    View All Webinars
                  </Link>
                ) : webinar.paymentLink ? (
                  <>
                    <Link
                      href={webinar.paymentLink}
                      target="_blank"
                      className="bg-[#1447e6] text-white font-sans font-semibold text-[14px] md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap"
                    >
                      Register Now – {webinar.price}
                    </Link>
                    <Link
                      href="/webinars"
                      className="glass-card glass-card-blur-sm font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/20 transition-colors whitespace-nowrap"
                    >
                      View All Webinars
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="glass-card glass-card-blur-sm font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full whitespace-nowrap">
                      Registration Opening Soon
                    </span>
                    <Link
                      href="/webinars"
                      className="glass-card glass-card-blur-sm font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/20 transition-colors whitespace-nowrap"
                    >
                      View All Webinars
                    </Link>
                  </>
                )}
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

