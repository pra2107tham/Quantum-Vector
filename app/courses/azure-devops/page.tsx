// File: app/courses/azure-devops/page.tsx

"use client";
import { useState } from "react";
import Image from "next/image";
import { FaCloud, FaLock, FaDatabase, FaServer, FaUserShield, FaClipboardList, FaCogs, FaTools, FaUserTie } from "react-icons/fa";
import { SiTerraform, SiApachespark } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { MdStorage, MdDns, MdOutlineMonitor, MdOutlineApi } from "react-icons/md";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import RazorpayButton from "@/components/RazorpayButton/AWS_Course_RazorpayButton";
import { motion } from "motion/react";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

// Updated curriculum per provided outline
const modules = [
  {
    title: "Fundamentals (Basics for Everyone)",
    topics: [
      {
        icon: <FaCloud className="text-blue-500" size={28} />,
        title: "Introduction to Cloud Computing",
        desc: "IaaS, PaaS, SaaS; Public, Private, Hybrid models and core benefits.",
      },
      {
        icon: <FaCogs className="text-blue-600" size={28} />,
        title: "Introduction to DevOps",
        desc: "Culture, principles and benefits; collaboration and automation mindset.",
      },
      {
        icon: <FaServer className="text-green-600" size={28} />,
        title: "Basic Linux Fundamentals",
        desc: "Shell, commands, file system, users and permissions for DevOps work.",
      },
      {
        icon: <FaTools className="text-purple-600" size={28} />,
        title: "Version Control with Git & GitHub",
        desc: "Git basics, branching, pull requests, GitHub workflows.",
      },
    ],
  },
  {
    title: "Azure Fundamentals",
    topics: [
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Azure Overview & Global Infrastructure",
        desc: "Regions, Availability Zones and resiliency fundamentals.",
      },
      {
        icon: <FaClipboardList className="text-pink-500" size={28} />,
        title: "Subscriptions, Resource Groups & Management",
        desc: "Structure, access and governance for Azure resources.",
      },
      {
        icon: <MdDns className="text-blue-500" size={28} />,
        title: "Azure Networking",
        desc: "VNet, Subnet, NSG, Firewall, VPN Gateway and ExpressRoute.",
      },
      {
        icon: <FaServer className="text-blue-600" size={28} />,
        title: "Compute Services",
        desc: "Virtual Machines, VM Scale Sets, App Services and Azure Functions.",
      },
      {
        icon: <MdStorage className="text-yellow-500" size={28} />,
        title: "Storage Services",
        desc: "Blob, Queue, Table, File Storage and Azure Disk options.",
      },
      {
        icon: <FaDatabase className="text-blue-700" size={28} />,
        title: "Databases",
        desc: "Azure SQL, Cosmos DB, PostgreSQL and MySQL on Azure.",
      },
      {
        icon: <MdOutlineMonitor className="text-green-600" size={28} />,
        title: "Monitoring & Management",
        desc: "Azure Monitor, Log Analytics and Application Insights.",
      },
      {
        icon: <FaUserShield className="text-blue-700" size={28} />,
        title: "Identity & Security",
        desc: "Azure AD, RBAC, Managed Identity and Key Vault integration.",
      },
      {
        icon: <MdOutlineApi className="text-blue-400" size={28} />,
        title: "Messaging & Integration",
        desc: "Event Grid, Event Hub and Service Bus patterns.",
      },
      {
        icon: <SiApachespark className="text-yellow-500" size={28} />,
        title: "Data & Analytics",
        desc: "Data Factory, Synapse Analytics and Azure Databricks overview.",
      },
      {
        icon: <VscAzure className="text-blue-600" size={28} />,
        title: "Containers & Serverless",
        desc: "Azure Container Instances and Azure Kubernetes Service (AKS).",
      },
    ],
  },
  {
    title: "Azure DevOps",
    topics: [
      {
        icon: <VscAzure className="text-blue-600" size={28} />,
        title: "Azure DevOps Overview",
        desc: "Core services and end‑to‑end delivery workflows.",
      },
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Azure Repos (Git & TFVC)",
        desc: "Source control, branching strategies and PR reviews.",
      },
      {
        icon: <VscAzure className="text-blue-500" size={28} />,
        title: "Azure Boards",
        desc: "Agile project management with work items and sprints.",
      },
      {
        icon: <VscAzure className="text-indigo-600" size={28} />,
        title: "Azure Pipelines",
        desc: "CI/CD using YAML and Classic pipelines across environments.",
      },
      {
        icon: <VscAzure className="text-blue-500" size={28} />,
        title: "Azure Test Plans",
        desc: "Manual and exploratory testing for quality gates.",
      },
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Azure Artifacts",
        desc: "Package feeds and dependency management.",
      },
      {
        icon: <FaCogs className="text-pink-500" size={28} />,
        title: "Integrations",
        desc: "GitHub Actions and third‑party toolchain integrations.",
      },
    ],
  },
  {
    title: "DevOps Tools & Practices",
    topics: [
      {
        icon: <SiTerraform className="text-purple-600" size={28} />,
        title: "Infrastructure as Code — Terraform",
        desc: "Terraform on Azure for repeatable environment provisioning.",
      },
      {
        icon: <FaTools className="text-blue-500" size={28} />,
        title: "Configuration Management",
        desc: "Ansible, Chef and Puppet — where they fit (overview).",
      },
      {
        icon: <FaServer className="text-blue-600" size={28} />,
        title: "Containerization — Docker",
        desc: "Images, containers, Dockerfile and Compose fundamentals.",
      },
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Orchestration — Kubernetes",
        desc: "Pods, Services, Deployments and Helm basics.",
      },
      {
        icon: <MdOutlineMonitor className="text-green-600" size={28} />,
        title: "Monitoring & Logging",
        desc: "Prometheus, Grafana and ELK stack patterns.",
      },
      {
        icon: <FaUserShield className="text-blue-700" size={28} />,
        title: "Security in DevOps",
        desc: "DevSecOps, SAST/DAST and securing CI/CD pipelines.",
      },
    ],
  },
  {
    title: "Cloud Networking & Security",
    topics: [
      {
        icon: <MdDns className="text-blue-500" size={28} />,
        title: "VNet Peering & Service Endpoints",
        desc: "Patterns for secure and performant network design.",
      },
      {
        icon: <FaLock className="text-purple-600" size={28} />,
        title: "Private Link & Private Endpoints",
        desc: "Private connectivity to PaaS services.",
      },
      {
        icon: <FaServer className="text-blue-600" size={28} />,
        title: "Load Balancing & Traffic",
        desc: "LB (public/private), Application Gateway and Traffic Manager.",
      },
      {
        icon: <MdDns className="text-blue-400" size={28} />,
        title: "DNS, Firewall & WAF",
        desc: "Name resolution, perimeter security and web protection.",
      },
      {
        icon: <FaUserShield className="text-blue-700" size={28} />,
        title: "Zero Trust & Governance",
        desc: "Best practices for access, policy and guardrails.",
      },
    ],
  },
  {
    title: "Capstone & Next Steps",
    topics: [
      {
        icon: <FaClipboardList className="text-pink-500" size={28} />,
        title: "Real‑Time Project",
        desc: "Deploy a multi‑tier app on Azure using DevOps practices.",
      },
      {
        icon: <MdOutlineMonitor className="text-green-600" size={28} />,
        title: "Integrations",
        desc: "Wire up monitoring, security and automation end‑to‑end.",
      },
      {
        icon: <FaUserTie className="text-blue-700" size={28} />,
        title: "Career Path",
        desc: "Roadmap for Azure DevOps & Cloud Engineering roles.",
      },
    ],
  },
];

function CurriculumCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex flex-col gap-4 items-start px-[20px] py-[24px] relative rounded-[12px] shrink-0 w-full hover:scale-[1.02] transition-transform">
      <div className="flex items-center gap-3 w-full">
        <div className="w-[48px] h-[48px] rounded-full bg-[#1447e6]/10 flex items-center justify-center shrink-0">
            {icon}
        </div>
        <div className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-[18px] leading-tight flex-1">{title}</div>
      </div>
      <div className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[15px] leading-relaxed w-full">{desc}</div>
    </div>
  );
}


export default function AzureDevopsCurriculumPage() {
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const headingWords = "Azure DevOps Course";
  const subheadingWords = "Curriculum & roadmap — everything you'll master";
  const descriptionWords = "Master Azure DevOps with our comprehensive curriculum covering cloud computing, networking, security, and more. Learn from industry experts and get hands-on experience with real-world projects.";

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
      <div className="glass-card-main relative mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative w-full z-10">
          <Header />
          
          {/* Hero Section with YouTube Embed */}
          <div className="relative w-full pt-[120px] md:pt-[140px] pb-[60px] px-4 md:px-[59px]">
            <div className="flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-start">
              {/* Left side - Hero Content */}
              <div className="flex-1 w-full">
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
                    className="w-[60px] h-[60px] rounded-full bg-[#1447e6]/10 flex items-center justify-center"
                >
                    <VscAzure className="text-[#1447e6]" size={40} />
                </motion.div>
                  <div className="text-3xl lg:text-5xl lg:leading-tight font-outfit font-semibold text-[#2d2d2d]">
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
                    className="text-xl lg:text-2xl lg:leading-tight mt-2 font-sans font-medium text-[#1447e6] pl-1"
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
                    className="text-base lg:text-lg lg:leading-relaxed mt-3 font-sans font-normal text-[#2d2d2d] pl-1"
                >
                  <TextGenerateEffect 
                    words={descriptionWords} 
                    onComplete={() => setShowContent(true)}
                  />
                </motion.div>
              )}
              {/* Course info badges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-5 flex flex-wrap gap-3"
              >
                  <span className="glass-card glass-card-blur-lg glass-card-opacity-medium inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-sans font-semibold text-[#1447e6] whitespace-nowrap">
                  Starts 10 November
                </span>
                  <span className="glass-card glass-card-blur-lg glass-card-opacity-light inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-sans font-semibold text-[#2d2d2d] whitespace-nowrap">
                  Timings: 7:00–8:30 AM IST
                </span>
                  <span className="glass-card glass-card-blur-lg glass-card-opacity-medium inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-sans font-semibold text-[#1447e6] whitespace-nowrap">
                  Only 7 seats left (15 per batch)
                </span>
              </motion.div>
            </div>

              {/* Right side - YouTube Embed */}
              <div className="flex-1 w-full md:max-w-[677px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
                  <div className="glass-card glass-card-blur-md glass-card-opacity-light relative rounded-[20px] overflow-hidden p-2">
                    <div className="w-full h-[260px] sm:h-[360px] md:h-[420px] lg:h-[498px] rounded-[16px] overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/R9lH7uaSgUE"
                        title="Master Azure DevOps from Real Engineers | Hands-on Azure & DevOps Course"
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section - Outside Hero Container */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          <div className="glass-card glass-card-blur-sm glass-card-opacity-light relative rounded-[20px] p-6 md:p-8 max-w-[1260px] w-full overflow-hidden">
            <div className="flex flex-col items-center text-center mb-6 relative z-10">
              <div className="text-sm font-sans font-semibold text-[#2d2d2d]/70 mb-2">Course Fee</div>
              <div className="flex items-end justify-center gap-2 mb-4">
                <span className="text-[#2d2d2d]/50 line-through text-lg font-sans">₹25,000</span>
                <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#2d2d2d]">₹22,000</span>
              </div>
              <div className="text-sm md:text-base font-sans font-normal text-[#2d2d2d] max-w-[686px] mb-4">
                Pay <span className="font-semibold">₹3,000</span> now to block your seat. The remaining balance will be collected by our team after registration.
              </div>
              {/* Benefits bullets */}
              <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm font-sans font-normal text-[#2d2d2d]">
                <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1447e6]" /> Lifetime access with recordings</div>
                <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1447e6]" /> Capstone project on Azure</div>
                <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1447e6]" /> Free previews, secure streaming</div>
              </div>
              <div className="glass-card glass-card-blur-lg glass-card-opacity-medium inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-sans font-semibold text-[#1447e6] whitespace-nowrap mb-6">
                Only 7 seats left • Starts 10 Nov • 7:00–8:30 AM IST
              </div>
              {/* Razorpay Button */}
              <RazorpayButton
                url="https://pages.razorpay.com/pl_RDakh7O49L14YT/view?label=azure_course"
                text="Block Your Seat — ₹3,000"
                color="#1447e6"
                size="large"
                className="w-full max-w-[476px]"
              />
              <div className="mt-3 text-[12px] font-sans text-[#2d2d2d]/50 text-center">Payments powered by Razorpay</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Content Section - Outside Hero Container */}
      <div className="relative w-full mt-[80px] md:mt-[120px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
            {showContent && modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, type: "spring", stiffness: 90 }}
                viewport={{ once: true, amount: 0.2 }}
              className="w-full max-w-[1261px]"
              >
              <div className="glass-card glass-card-blur-sm glass-card-opacity-light p-6 md:p-8 rounded-[20px]">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="glass-card glass-card-blur-lg glass-card-opacity-medium px-4 py-1.5 text-sm font-sans font-semibold rounded-full text-[#1447e6] whitespace-nowrap">
                    Module {i + 1}
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-outfit font-semibold mb-5 text-[#2d2d2d]">{mod.title}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mod.topics.map((topic) => (
                    <CurriculumCard key={topic.title} {...topic} />
                  ))}
                </div>
                </div>
              </motion.div>
            ))}
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