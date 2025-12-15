"use client";
import { useState } from "react";
import Image from "next/image";
import { FaLinux, FaGitAlt, FaAws, FaDocker, FaJenkins, FaLinkedin, FaCloud } from "react-icons/fa";
import { SiApachemaven, SiKubernetes, SiTerraform, SiAnsible } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";
import RazorpayButton from "@/components/RazorpayButton/AWS_Course_RazorpayButton";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";


const modules = [
  {
    title: "DevOps & Cloud Foundations",
    topics: [
      {
        icon: <FaCloud className="text-blue-500" size={28} />,
        title: "DevOps Introduction",
        desc: "Application software overview, DevOps core concepts, SDLC (Waterfall vs Agile), Dev and Ops roles in Agile.",
      },
      {
        icon: <FaCloud className="text-yellow-500" size={28} />,
        title: "Cloud Introduction",
        desc: "AWS, GCP, Azure overview, cloud computing concepts, service models (SaaS, PaaS, IaaS), client-server basics.",
      },
    ],
  },
  {
    title: "Linux Fundamentals",
    topics: [
      {
        icon: <FaLinux className="text-gray-700" size={28} />,
        title: "Operating System Concepts",
        desc: "OS and kernel basics, VirtualBox and CentOS 7 installation, Linux OS management.",
      },
      {
        icon: <FaLinux className="text-green-500" size={28} />,
        title: "Command Line & Administration",
        desc: "User/group management, file system, permissions, package management, process control, networking.",
      },
    ],
  },
  {
    title: "Shell Scripting",
    topics: [
      {
        icon: <MdOutlineDescription className="text-green-500" size={28} />,
        title: "Shell Basics",
        desc: "Shell types, script writing, naming conventions, variables, command-line arguments.",
      },
      {
        icon: <MdOutlineDescription className="text-blue-500" size={28} />,
        title: "Scripting Concepts",
        desc: "Control structures, functions, pipes, real-world automation examples for DevOps tasks.",
      },
    ],
  },
  {
    title: "Version Control with Git",
    topics: [
      {
        icon: <FaGitAlt className="text-orange-500" size={28} />,
        title: "Git Fundamentals",
        desc: "GitHub/GitLab/Bitbucket setup, VCS concepts, branching, SSH keys, cloning, merging.",
      },
      {
        icon: <FaGitAlt className="text-red-500" size={28} />,
        title: "Collaboration & Best Practices",
        desc: "Forking, README files, release management, commit best practices, pull requests.",
      },
    ],
  },
  {
    title: "Build & Artifact Management",
    topics: [
      {
        icon: <SiApachemaven className="text-purple-500" size={28} />,
        title: "Maven",
        desc: "Installation, environment setup, pom.xml, repositories, lifecycle, multi-module builds.",
      },
      {
        icon: <SiApachemaven className="text-blue-500" size={28} />,
        title: "Nexus",
        desc: "Artifact repository management, EC2 installation, Maven & Jenkins integration, release management.",
      },
    ],
  },
  {
    title: "Continuous Integration & Delivery",
    topics: [
      {
        icon: <FaJenkins className="text-red-500" size={28} />,
        title: "Jenkins Core",
        desc: "CI/CD concepts, installation, project setup, plugin management, security, pipeline creation.",
      },
      {
        icon: <FaJenkins className="text-blue-500" size={28} />,
        title: "Advanced Jenkins",
        desc: "Master/slave setup, Blue Ocean, shared libraries, integrations, notifications, job parameters.",
      },
    ],
  },
  {
    title: "Configuration Management",
    topics: [
      {
        icon: <SiAnsible className="text-yellow-600" size={28} />,
        title: "Ansible Basics",
        desc: "Architecture, host inventory, installation, basic commands and concepts.",
      },
      {
        icon: <SiAnsible className="text-red-600" size={28} />,
        title: "Playbooks & Automation",
        desc: "Writing playbooks, tags, handlers, variables, loops, conditionals, vault for secrets.",
      },
    ],
  },
  {
    title: "Containerization with Docker",
    topics: [
      {
        icon: <FaDocker className="text-blue-400" size={28} />,
        title: "Docker Fundamentals",
        desc: "VM vs containers, installation, CLI, image building, Dockerfile, multi-stage builds.",
      },
      {
        icon: <FaDocker className="text-blue-600" size={28} />,
        title: "Container Management",
        desc: "Docker Hub, ECR, networking, volumes, Docker Compose setup and commands.",
      },
    ],
  },
  {
    title: "Orchestration with Kubernetes",
    topics: [
      {
        icon: <SiKubernetes className="text-blue-600" size={28} />,
        title: "Kubernetes Core",
        desc: "Architecture, installation, core objects (Pods, Deployments, Services), ConfigMaps, Secrets.",
      },
      {
        icon: <SiKubernetes className="text-blue-800" size={28} />,
        title: "Kubernetes Operations",
        desc: "Resource quotas, ingress, load balancing, RBAC, monitoring with Prometheus/Grafana.",
      },
    ],
  },
  {
    title: "AWS Cloud Platform",
    topics: [
      {
        icon: <FaAws className="text-yellow-500" size={28} />,
        title: "Core AWS Services",
        desc: "EC2, IAM, S3, EBS, RDS, VPC, ELB, Auto Scaling, Route 53, CloudFront, CloudWatch, SNS.",
      },
      {
        icon: <FaAws className="text-yellow-400" size={28} />,
        title: "Service Configuration",
        desc: "Instance management, security groups, storage options, networking, monitoring, and automation.",
      },
    ],
  },
  {
    title: "DevOps on AWS Cloud",
    topics: [
      {
        icon: <FaAws className="text-blue-500" size={28} />,
        title: "AWS DevOps Tools",
        desc: "CodeCommit for repositories, CodeBuild for automation, CodeDeploy for deployments.",
      },
      {
        icon: <FaAws className="text-blue-700" size={28} />,
        title: "Pipeline Management",
        desc: "CodePipeline setup, scheduling, management, and integration with other AWS services.",
      },
    ],
  },
  {
    title: "Infrastructure as Code",
    topics: [
      {
        icon: <SiTerraform className="text-purple-600" size={28} />,
        title: "Terraform Fundamentals",
        desc: "IaC concepts, terminology, resource creation in AWS, state management.",
      },
      {
        icon: <SiTerraform className="text-purple-400" size={28} />,
        title: "Practical Automation",
        desc: "Real-world Terraform scenarios, best practices, and interview-level implementations.",
      },
    ],
  },
  {
    title: "Capstone Project",
    topics: [
      {
        icon: <FaCloud className="text-green-500" size={28} />,
        title: "End-to-End DevOps Project",
        desc: "3-tier application deployment (UI, backend, MySQL DB) using all tools and practices learned.",
      },
    ],
  },
  {
    title: "Interview & Career Preparation",
    topics: [
      {
        icon: <FaLinkedin className="text-blue-700" size={28} />,
        title: "Resume & LinkedIn",
        desc: "Craft a DevOps-ready resume, optimize LinkedIn profile, prepare for technical interviews.",
      },
      {
        icon: <BsFillPersonLinesFill className="text-pink-400" size={28} />,
        title: "Mock Interviews & Q&A",
        desc: "Practice with real DevOps scenarios, expert guidance, and job search strategies.",
      },
    ],
  },
];

function CurriculumCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass-card glass-card-blur-sm glass-card-opacity-light flex flex-col gap-4 items-start px-[20px] py-[24px] relative rounded-[12px] shrink-0 w-full hover:scale-[1.02] transition-transform">
      <div className="flex items-center gap-3 w-full">
        <div className="w-[48px] h-[48px] rounded-full bg-[#ff9900]/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-[18px] leading-tight flex-1">{title}</div>
      </div>
      <div className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[15px] leading-relaxed w-full">{desc}</div>
    </div>
  );
}


export default function AwsDevopsCurriculumPage() {
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const headingWords = "AWS DevOps";
  const subheadingWords = "View our curriculum";
  const descriptionWords = "Master AWS DevOps with our comprehensive curriculum. This program takes 2-3 months to complete, covering everything from cloud foundations to advanced IaC and CI/CD on AWS.";

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
          
          {/* Hero Section */}
          <div className="relative w-full pt-[120px] md:pt-[140px] pb-[60px] px-4 md:px-[59px]">
            <div className="flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-start">
              {/* Left side - Hero Content */}
              <div className="flex flex-col gap-[30px] items-start relative shrink-0 w-full md:w-[60%]">
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
                    className="w-[60px] h-[60px] rounded-full bg-[#ff9900]/10 flex items-center justify-center"
                  >
                    <FaAws className="text-[#ff9900]" size={40} />
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
                    Starts 1st December
                  </span>
                  <span className="glass-card glass-card-blur-lg glass-card-opacity-light inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-sans font-semibold text-[#2d2d2d] whitespace-nowrap">
                    Duration: 2-3 Months
                  </span>
                  <span className="glass-card glass-card-blur-lg glass-card-opacity-medium inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-sans font-semibold text-[#1447e6] whitespace-nowrap">
                    Limited Seats Available
                  </span>
                </motion.div>
              </div>

              {/* Right side - Pricing Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-[38%] relative"
              >
                <div className="glass-card glass-card-blur-sm glass-card-opacity-light relative rounded-[20px] p-6 md:p-8 overflow-hidden">
                  <div className="flex flex-col items-center text-center mb-6 relative z-10">
                    <div className="text-sm font-sans font-semibold text-[#2d2d2d]/70 mb-2">Course Fee</div>
                    <div className="flex items-end justify-center gap-2 mb-4">
                      <span className="text-[#2d2d2d]/50 line-through text-lg font-sans">₹25,000</span>
                      <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#2d2d2d]">₹22,000</span>
                    </div>
                    <div className="glass-card glass-card-blur-lg glass-card-opacity-medium inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-sans font-semibold text-[#1447e6] whitespace-nowrap mb-4">
                      Starts 1 Dec • 2-3 Months • Limited Seats
                    </div>
                    {/* Benefits bullets */}
                    <div className="flex flex-col gap-3 mb-6 text-sm font-sans font-normal text-[#2d2d2d] w-full">
                      <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1447e6]" /> Lifetime access with recordings</div>
                      <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1447e6]" /> Capstone project on AWS</div>
                      <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1447e6]" /> Free previews, secure streaming</div>
                    </div>
                    {/* Razorpay Button */}
                    <RazorpayButton
                      url="https://pages.razorpay.com/pl_Qh23UMxKat9LKQ/view?label=aws_course"
                      text="Enroll Now — ₹22,000"
                      color="#1447e6"
                      size="large"
                      className="w-full"
                    />
                    <div className="mt-3 text-[12px] font-sans text-[#2d2d2d]/50 text-center">Payments powered by Razorpay</div>
                  </div>
                </div>
              </motion.div>
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
