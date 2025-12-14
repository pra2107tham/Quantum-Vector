"use client";

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import { CalendarIcon, ClockIcon, UserIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import RazorpayButton from "@/components/RazorpayButton/AWS_Course_RazorpayButton";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useState } from "react";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

interface WebinarDetail {
  heading: string;
  items: string[];
}

interface WebinarSpeaker {
  name: string;
}

interface WebinarData {
  title: string;
  isLive: boolean;
  date: string;
  time: string;
  duration: string;
  fee: string;
  originalPrice?: string;
  discount?: string;
  mode: string;
  subheading: string;
  speaker: WebinarSpeaker;
  description: string;
  details: WebinarDetail[];
  registrationUrl: string;
  registrationText: string;
  isCompleted: boolean;
  headingWords: string;
  subheadingWords: string;
  descriptionWords: string;
}

function DetailCard({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-6 md:p-8 rounded-[20px] h-full flex flex-col">
      <h3 className="text-lg md:text-xl font-outfit font-semibold text-[#2d2d2d] mb-4">{heading}</h3>
      <ul className="list-disc pl-6 space-y-2 flex-1">
        {items.map((item, j) => (
          <li key={j} className="text-sm md:text-base font-sans font-normal text-[#2d2d2d] leading-relaxed">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string | React.ReactNode }) {
  return (
    <div className="glass-card glass-card-blur-lg glass-card-opacity-light rounded-lg p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#1447e6]/10 flex items-center justify-center text-[#1447e6] flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs md:text-sm font-sans font-medium text-[#2d2d2d]/70">{title}</div>
        <div className="text-sm md:text-base font-sans font-semibold text-[#2d2d2d] truncate">{value}</div>
      </div>
    </div>
  );
}

export default function WebinarDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Webinar data for both current and past webinars
  const webinars: Record<string, WebinarData> = {
    "terraform-azure-5day": {
      title: "Terraform Webinar Series (5 Days) – Azure-Focused Hands-on",
      isLive: false,
        date: "13th–17th October, 2025",
      time: "7:00 PM – 8:30 PM IST (Daily)",
      duration: "5 days, 1.5 hours each day",
      fee: "₹999",
      originalPrice: "₹1,999",
      discount: "Limited seats • Register soon",
      mode: "Live Zoom Sessions",
      subheading: "Automate Azure infra with Terraform using real projects and best practices",
      speaker: {
        name: "Terraform Expert",
      },
      description: `A hands-on 5-day series to master Terraform for Azure with practical demos daily, AWS comparisons, enterprise best practices, and a capstone deploying production-style infra.`,
      details: [
        {
          heading: "🚀 Why Join This Webinar?",
          items: [
            "Automate Azure infra with Terraform end-to-end",
            "Hands-on demos, not just slides",
            "Real-world patterns: governance, security, CI/CD",
            "Multi-cloud mindset with Azure vs AWS comparisons",
            "Capstone project mirroring production infra"
          ]
        },
        {
          heading: "Day 1 – Introduction to IaC & Terraform",
          items: [
            "Manual provisioning vs IaC, benefits and workflows",
            "Terraform overview, architecture and providers",
            "Setup: Terraform + Azure CLI",
            "Azure demo: Create a Resource Group",
            "AWS comparison: S3 bucket syntax"
          ]
        },
        {
          heading: "Day 2 – Terraform Core Concepts",
          items: [
            "Providers, resources, variables, outputs",
            "Terraform state: local vs remote (Azure Storage)",
            "Azure demo: Linux VM + VNet + NSG + Public IP + NIC",
            "AWS comparison: EC2 + VPC"
          ]
        },
        {
          heading: "Day 3 – Modules & Workspaces",
          items: [
            "Why modules, local and registry modules",
            "Workspaces for multi-environment",
            "Azure demo: VM module, multiple VMs, dev/prod"
          ]
        },
        {
          heading: "Day 4 – Azure Resources with Terraform",
          items: [
            "Networking, Storage, Compute, Databases, Key Vault",
            "Azure demo: VM Scale Set + Load Balancer + SQL DB + Key Vault"
          ]
        },
        {
          heading: "Day 5 – Advanced Concepts & CI/CD",
          items: [
            "Remote state locking, Terraform Cloud vs Azure backend",
            "CI/CD with Azure DevOps",
            "Policy-as-Code with OPA",
            "Azure demo: Full Terraform pipeline"
          ]
        },
        {
          heading: "🎯 Capstone Project – Real-World Azure Infra",
          items: [
            "3-tier app: App Service, VM Scale Set, Azure Postgres",
            "Security: Key Vault, NSGs, Managed Identity",
            "Networking: VNet, subnets, autoscaling"
          ]
        },
        {
          heading: "🏆 Key Takeaways",
          items: [
            "Master fundamentals + advanced Terraform",
            "Automate Azure with confidence",
            "Best practices: modules, state, CI/CD",
            "Compare Terraform across Azure & AWS",
            "Build a production-style project"
          ]
        }
      ],
      registrationUrl: "https://pages.razorpay.com/pl_RMI4kw9wUDVfWG/view?label=terraform_webinar", // replace with real link
      registrationText: "Pay ₹999 & Register Now",
      isCompleted: false,
      headingWords: "Terraform Webinar Series",
      subheadingWords: "Azure-Focused, Hands-on (5 Days)",
      descriptionWords: "Master Terraform for Azure with hands-on demos, best practices, AWS comparisons, and a production-style capstone project over 5 days.",
    },
    "docker-kubernetes-bootcamp": {
      title: "Docker & Kubernetes Mastery – 2-Week Live Bootcamp",
      isLive: false,
      date: "13th–24th October, 2025",
      time: "10:00 AM – 11:00 AM IST (Daily)",
      duration: "2 weeks, 1 hour each day",
      fee: "₹2,999",
      originalPrice: "₹2,999",
      discount: "Limited seats • Register soon",
      mode: "Live Zoom Sessions",
      subheading: "Master containerization and orchestration for DevOps excellence",
      speaker: {
        name: "Kubernetes Expert",
      },
      description: `Master Docker and Kubernetes from basics to production deployment. Comprehensive 2-week bootcamp with hands-on labs and real-world projects! Very limited seats — secure your spot now.`,
      details: [
        {
          heading: "📚 Week 1 – Docker Fundamentals & Kubernetes Basics",
          items: [
            "Day 1: Introduction to Docker & Container Fundamentals",
            "Day 2: Dockerfile Creation & Best Practices",
            "Day 3: Docker Images, Registry & Docker Hub Integration",
            "Day 4: Introduction to Kubernetes Architecture & Core Objects",
            "Day 5: Kubernetes PODs, ReplicaSets, Deployments & Services",
          ],
        },
        {
          heading: "📚 Week 1 – Core Kubernetes Objects (Continued)",
          items: [
            "Day 1 (Mon): Introduction to Kubernetes & Architecture, Real-World Use Cases & Adoption, Cluster Setup using Minikube/Kubeadm",
            "Day 2 (Tue): Kubernetes Installation (Hands-on), Working with kubectl – Basic Commands",
            "Day 3 (Wed): Kubernetes Objects: POD, ReplicaSet, Deployment, Update Strategies: Rolling Update vs Recreate",
            "Day 4 (Thu): DaemonSet, StatefulSet, Storage: PersistentVolume & PersistentVolumeClaim, Managing ConfigMaps & Secrets",
            "Day 5 (Fri): Kubernetes Services: ClusterIP, NodePort, LoadBalancer, Ingress Controller Setup, Resource Quota & LimitRange, Q&A Session",
          ],
        },
        {
          heading: "🔧 Week 2 – Advanced Kubernetes Concepts & Projects",
          items: [
            "Day 6 (Mon): Health Checks: Liveness & Readiness Probes, Auto-scaling with HPA, Metrics Server Installation",
            "Day 7 (Tue): Node Maintenance: Cordon, Drain, Uncordon, Scheduling: Taints, Tolerations, Affinity & Anti-Affinity",
            "Day 8 (Wed): Kubernetes RBAC: Roles, RoleBindings, ServiceAccounts, Kubernetes Dashboard Setup",
            "Day 9 (Thu): Production Deployment Strategies, CI/CD Pipeline Integration",
            "Day 10 (Fri): Real-world Project Implementation & Final Q&A",
          ],
        },
        {
          heading: "🔥 Why Attend This Bootcamp?",
          items: [
            "Master Docker from Basics to Advanced – Dockerfile, Images, Registry, Docker Hub",
            "Complete Kubernetes Learning – From Architecture to Production Deployment",
            "Hands-on Practice – Real-time container and cluster management",
            "Industry Projects – Deploy real applications with CI/CD pipelines",
            "Expert Guidance – Live sessions with experienced DevOps professionals",
            "Production-ready skills for modern infrastructure",
          ],
        },
        {
          heading: "👥 Who Should Join?",
          items: [
            "DevOps Engineers looking to master containerization",
            "Developers wanting to learn container orchestration",
            "System Administrators transitioning to cloud-native",
            "Anyone serious about modern infrastructure management",
            "Professionals preparing for CKA/CKAD certifications",
          ],
        },
        {
          heading: "💰 What You Get for ₹2,999",
          items: [
            "2-Week Live Training Sessions (1 hour daily)",
            "Docker & Kubernetes Complete Curriculum",
            "Hands-on Labs & Real Projects",
            "Industry Expert Sessions",
            "Certificate of Completion",
            "Lifetime Access to Recordings",
            "Career Guidance & Job Assistance",
          ],
        },
      ],
      registrationUrl: "https://pages.razorpay.com/pl_QyuVjAdAPl6lAo/view?label=docker_kubernetes", // placeholder
      registrationText: "Pay ₹2,999 & Register Now",
      isCompleted: false,
      headingWords: "Docker & Kubernetes Mastery",
      subheadingWords: "2-Week Live Bootcamp",
      descriptionWords: "Master containerization and orchestration for DevOps excellence. This comprehensive 2-week live bootcamp covers Docker fundamentals, Kubernetes architecture, and production deployment strategies with hands-on labs and real-world projects.",
    },
    "linux-for-devops-5day-demo": {
      title: "Linux for DevOps – 5-Day Live Demo",
      isLive: false,
      date: "July 21st-25th, 2025",
      time: "10:00 AM - 11:00 AM IST (Daily)",
      duration: "5 days, 1 hour each day",
      fee: "₹499",
      mode: "Live Zoom Sessions",
      subheading: "Master Linux for DevOps roles in 5 days",
      speaker: {
        name: "DevOps Expert",
      },
      description: `Master Linux from scratch for DevOps roles. Hands-on, live Zoom sessions over 5 days. Only ₹499 for complete training!`,
      details: [
        {
          heading: "🔥 Why Attend This 5-Day Demo?",
          items: [
            "Master Linux from Scratch – Tailored for DevOps roles",
            "Hands-on Practice – Real-time terminal usage over 5 days",
            "Essential Commands – Files, permissions, processes, networking",
            "Shell Scripting Basics – Automate tasks",
            "Practical for DevOps Projects – Not just theory",
            "Progressive learning – Build skills day by day",
          ],
        },
        {
          heading: "👥 Who Should Join?",
          items: [
            "Beginners with zero tech background",
            "Career switchers from non-IT fields",
            "Freshers or students looking to upskill",
            "Anyone interested in DevOps, Cloud, or Linux Admin",
          ],
        },
        {
          heading: "🎁 Bonus Session Included!",
          items: [
            "Free DevOps Roadmap: Learn the exact tools & skills needed to become a DevOps engineer",
            "Step-by-step roadmap from beginner to expert",
            "Toolstack breakdown (Linux → Git → Docker → Kubernetes → AWS → CI/CD)",
            "Live Q&A Session: Get personalized career suggestions, ask anything about DevOps jobs, interviews, certifications, and more!",
          ],
        },
        {
          heading: "💰 What You Get for ₹499",
          items: [
            "5-Day Live Linux Training (1 hour daily)",
            "Free DevOps Career Roadmap",
            "Personalized Career Q&A",
            "Recordings Access for all sessions",
            "Certificate of Participation",
          ],
        },
      ],
      registrationUrl: "https://rzp.io/rzp/wLPwpbVF",
      registrationText: "Pay ₹499 & Register Now",
      isCompleted: true,
      headingWords: "Linux for DevOps",
      subheadingWords: "5-Day Live Demo",
      descriptionWords: "Master Linux from scratch for DevOps roles. This comprehensive 5-day live webinar series covers everything from basic commands to advanced shell scripting for DevOps automation, with 1 hour of hands-on learning each day.",
    },
    "devops-roadmap-2025": {
  title: "DevOps Roadmap Webinar – Build a Career That Scales in 2025",
      isLive: false,
  date: "May 30, 2025",
  time: "10:00 AM IST",
  duration: "2 hours",
      fee: "Free",
      mode: "Live Zoom Session",
      subheading: "A 2-hour live masterclass for complete career clarity",
  speaker: {
    name: "DevOps Expert",
      },
      description: `A comprehensive masterclass designed to give you complete clarity on the DevOps career path, tools, and job strategy — even if you're just starting out.`,
      details: [
        {
          heading: "🎯 Key Takeaways",
          items: [
    "The 2025 DevOps Roadmap — What to learn, in what order",
    "Key tools explained: Git, Docker, Jenkins, Kubernetes, Terraform, AWS",
    "How to structure real-world DevOps projects that get you noticed",
    "How to write a DevOps resume that clears ATS",
    "The exact way to optimize your LinkedIn profile to attract recruiters",
    "How to showcase skills on GitHub (with examples)",
    "DevOps interview structure and top questions",
            "Emerging trends: AI + Prompt Engineering in DevOps",
          ],
        },
        {
          heading: "👤 Who Was This For?",
          items: [
    "Freshers exploring cloud/DevOps careers",
    "Professionals restarting after a break",
    "Testers, Support Engineers & Sysadmins moving to DevOps",
    "Working professionals switching domains",
            "Developers moving into platform, automation, or SRE roles",
          ],
        },
      ],
      isCompleted: true,
      registrationUrl: "",
      registrationText: "Registration Closed",
      headingWords: "DevOps Roadmap",
      subheadingWords: "Career masterclass",
      descriptionWords: "A comprehensive 2-hour masterclass designed to give you complete clarity on the DevOps career path, tools, and job strategy for building a career that scales in 2025.",
    },
  };

  const webinar = webinars[id as keyof typeof webinars];

  if (!webinar) {
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

        <div className="relative w-full min-h-screen flex items-center justify-center px-4">
          <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-8 md:p-12 rounded-[20px] max-w-2xl w-full text-center">
            <CalendarIcon className="w-20 h-20 text-[#1447e6] mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-outfit font-semibold text-[#2d2d2d] mb-4">
              Webinar Not Found
            </h1>
            <p className="text-xl font-sans font-normal text-[#2d2d2d] mb-8">
              Sorry, we couldn&apos;t find the webinar you&apos;re looking for.
            </p>
            <Link href="/webinars">
              <button className="px-8 py-3 bg-[#1447e6] text-white font-sans font-semibold rounded-xl hover:bg-[#0d3bb8] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base whitespace-nowrap">
                Back to Webinars
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Main Content Container with Header */}
      <div className="glass-card-main relative min-h-[700px] md:min-h-[800px] mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[700px] md:min-h-[800px] w-full z-10">
          <Header />
          
          {/* Hero Section */}
          <div className="absolute flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-center left-0 md:left-[59px] top-[120px] md:top-[140px] w-full md:w-[calc(100%-118px)] max-w-full md:max-w-none px-4 md:px-0 md:pr-[59px] pb-0">
            {/* Left Content */}
            <div className="flex flex-col gap-[30px] items-start relative shrink-0 w-full md:w-[60%]">
              <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-[60px] h-[60px] rounded-full bg-[#1447e6]/10 flex items-center justify-center">
                    <CalendarIcon className="text-[#1447e6] w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-outfit font-semibold text-[#2d2d2d] leading-tight">
                      <TextGenerateEffect 
                        words={webinar.headingWords} 
                        onComplete={() => setShowSubheading(true)}
                      />
                    </h1>
                    {webinar.isCompleted ? (
                      <span className="glass-card glass-card-blur-lg glass-card-opacity-light inline-block text-[#2d2d2d] px-3 py-1.5 rounded-full text-xs font-sans font-semibold whitespace-nowrap h-fit">Completed</span>
                    ) : (
                      <span className="glass-card glass-card-blur-lg glass-card-opacity-medium inline-block text-[#1447e6] px-3 py-1.5 rounded-full text-xs font-sans font-semibold whitespace-nowrap h-fit">Upcoming</span>
                    )}
                  </div>
                </div>
                
                {showSubheading && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg md:text-xl lg:text-2xl font-sans font-medium text-[#1447e6] pl-1"
                  >
                    <TextGenerateEffect 
                      words={webinar.subheadingWords} 
                      onComplete={() => setShowDescription(true)}
                    />
                  </motion.div>
                )}

                {showDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-sm md:text-base lg:text-lg font-sans font-normal text-[#2d2d2d] leading-relaxed pl-1"
                  >
                    <TextGenerateEffect 
                      words={webinar.descriptionWords} 
                      onComplete={() => setShowContent(true)}
                    />
                  </motion.div>
                )}

                {/* Why Join This Webinar Section */}
                {showContent && (() => {
                  const whySection = webinar.details.find((section) => 
                    section.heading.toLowerCase().includes("why")
                  );
                  return whySection ? (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="w-full mt-4"
                    >
                      <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 md:p-6 rounded-[16px]">
                        <h3 className="text-base md:text-lg font-outfit font-semibold text-[#2d2d2d] mb-3">{whySection.heading}</h3>
                        <ul className="flex flex-col gap-2">
                          {whySection.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm md:text-base font-sans font-normal text-[#2d2d2d]">
                              <span className="text-[#1447e6] mt-1">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null;
                })()}
              </div>
            </div>

            {/* Right Content - Pricing Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-[38%] relative"
            >
              <div className="glass-card glass-card-blur-sm glass-card-opacity-light relative rounded-[20px] p-6 md:p-8 overflow-hidden">
                <div className="flex flex-col items-center text-center mb-6 relative z-10">
                  <div className="text-sm font-sans font-semibold text-[#2d2d2d]/70 mb-2">
                    {webinar.isCompleted ? "Webinar Completed" : "Registration Fee"}
                  </div>
                  {!webinar.isCompleted && (
                    <>
                      <div className="flex items-end justify-center gap-2 mb-4">
                        {webinar.originalPrice && (
                          <span className="text-[#2d2d2d]/50 line-through text-lg font-sans">{webinar.originalPrice}</span>
                        )}
                        <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#2d2d2d]">{webinar.fee}</span>
                      </div>
                      {webinar.discount && (
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-sans font-bold text-white bg-gradient-to-r from-[#ff4444] to-[#ff6666] shadow-lg shadow-[#ff4444]/30 whitespace-nowrap animate-pulse">{webinar.discount}</span>
                        </div>
                      )}
                      <div className="w-full mb-6">
                        {id === 'docker-kubernetes-bootcamp' ? (
                          <Link href="/webinars/docker-kubernetes-bootcamp/checkout" className="block w-full">
                            <button className="w-full px-6 py-4 bg-[#1447e6] text-white rounded-lg font-sans font-semibold shadow-sm hover:bg-[#0d3bb8] hover:shadow-md transition-all duration-200 whitespace-nowrap">
                              Secure Checkout
                            </button>
                          </Link>
                        ) : (
                          <div className="w-full [&>div]:w-full">
                            <RazorpayButton
                              url={webinar.registrationUrl}
                              text={webinar.registrationText}
                              color="#1447e6"
                              size="large"
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-sans text-[#2d2d2d]/50 text-center leading-relaxed">
                        {id === 'docker-kubernetes-bootcamp' ? (
                          <>Limited seats remaining — registration closes soon. After payment, you will receive a confirmation email, joining link, schedule, and free DevOps career PDF.</>
                        ) : (
                          <>After payment, you will receive a confirmation email, joining link, schedule, and free DevOps career PDF.</>
                        )}
                      </p>
                    </>
                  )}
                  {webinar.isCompleted && (
                    <div className="glass-card glass-card-blur-lg glass-card-opacity-light p-4 rounded-lg text-center">
                      <div className="text-base font-sans font-semibold text-[#2d2d2d] mb-2">Registration Closed</div>
                      <p className="text-xs font-sans font-normal text-[#2d2d2d]">This webinar has ended. Check back for future sessions!</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section - Outside Hero Container */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          {/* Webinar Info Cards */}
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-[1261px]"
            >
              <div className="glass-card glass-card-blur-md glass-card-opacity-light p-6 md:p-8 rounded-[20px]">
                <h3 className="text-lg md:text-xl font-outfit font-semibold text-[#2d2d2d] mb-4">Webinar Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <InfoCard 
                    icon={<CalendarIcon className="w-5 h-5" />}
                    title="Date"
                    value={webinar.date}
                  />
                  <InfoCard 
                    icon={<ClockIcon className="w-5 h-5" />}
                    title="Time & Duration"
                    value={`${webinar.time} (${webinar.duration})`}
                  />
                  <InfoCard 
                    icon={<UserIcon className="w-5 h-5" />}
                    title="Speaker"
                    value={webinar.speaker.name}
                  />
                  <InfoCard 
                    icon={<CurrencyRupeeIcon className="w-5 h-5" />}
                    title="Registration Fee"
                    value={
                      webinar.originalPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-[#1447e6]">{webinar.fee}</span>
                          {webinar.discount && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-sans font-bold text-white bg-gradient-to-r from-[#ff4444] to-[#ff6666] shadow-lg shadow-[#ff4444]/30 whitespace-nowrap animate-pulse">{webinar.discount}</span>
                          )}
                        </div>
                      ) : (
                        webinar.fee
                      )
                    }
                  />
                </div>
                <div className="mt-4">
                  <InfoCard 
                    icon={<CalendarIcon className="w-5 h-5" />}
                    title="Mode"
                    value={webinar.mode}
                  />
                </div>
                <div className="mt-4 glass-card glass-card-blur-lg glass-card-opacity-light p-4 rounded-lg">
                  <p className="text-sm md:text-base font-sans font-normal text-[#2d2d2d] text-center">{webinar.description}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Content Sections */}
          {showContent && (
            <div className="w-full max-w-[1261px] grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
              {webinar.details
                .filter((section) => !section.heading.toLowerCase().includes("why"))
                .map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05, type: "spring", stiffness: 90 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="w-full h-full"
                  >
                    <DetailCard heading={section.heading} items={section.items} />
                  </motion.div>
                ))}
            </div>
          )}

          {/* Completion Message for Past Webinars */}
          {showContent && webinar.isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-[1261px]"
            >
              <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-6 md:p-8 rounded-[20px]">
                <div className="glass-card glass-card-blur-lg glass-card-opacity-light p-4 md:p-6 rounded-lg text-center">
                  <div className="text-base md:text-lg font-sans font-semibold text-[#2d2d2d] mb-2">
                    This webinar has been completed.
                  </div>
                  <span className="text-sm md:text-base font-sans font-normal text-[#2d2d2d]">
                    Recording or summary will be available soon.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
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