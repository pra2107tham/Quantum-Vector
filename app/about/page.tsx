"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";
import { FaAws, FaDocker, FaUsers, FaChalkboardTeacher, FaNetworkWired, FaBuilding, FaLightbulb, FaCloud } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiJenkins, SiGithubactions } from 'react-icons/si';

export default function AboutPage() {
  const techSkills = [
    { name: "AWS DevOps", icon: <FaAws className="w-6 h-6 text-orange-500" /> },
    { name: "Azure DevOps", icon: <FaCloud className="w-6 h-6 text-blue-500" /> },
    { name: "Kubernetes", icon: <SiKubernetes className="w-6 h-6 text-blue-600" /> },
    { name: "Terraform", icon: <SiTerraform className="w-6 h-6 text-purple-600" /> },
    { name: "Docker", icon: <FaDocker className="w-6 h-6 text-blue-400" /> },
    { name: "CI/CD Pipelines", icon: <SiJenkins className="w-6 h-6 text-gray-500" /> },
    { name: "GitHub Actions", icon: <SiGithubactions className="w-6 h-6 text-black" /> },
    { name: "Cloud-native security & automation", icon: <FaNetworkWired className="w-6 h-6 text-green-500" /> },
  ];

  const offerings = [
    { name: "Live webinars and workshops with 10+ year experts", icon: <FaChalkboardTeacher className="w-8 h-8 text-blue-500" /> },
    { name: "Practical DevOps roadmaps for beginners to advanced", icon: <FaUsers className="w-8 h-8 text-green-500" /> },
    { name: "Community support and job-oriented mentorship", icon: <FaUsers className="w-8 h-8 text-purple-500" /> },
    { name: "Courses built on real-world projects — no fluff", icon: <FaLightbulb className="w-8 h-8 text-yellow-500" /> },
    { name: "A growing global network of learners and engineers", icon: <FaNetworkWired className="w-8 h-8 text-teal-500" /> },
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
      <div className="glass-card-main relative min-h-[500px] md:min-h-[600px] mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px] flex flex-col">
        <Header />
        <div className="flex flex-col gap-[20px] items-center justify-center flex-1 px-4 md:px-[59px] pb-[40px] md:pb-[60px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-outfit font-semibold text-black text-[32px] md:text-[48px] lg:text-[64px] text-center leading-tight"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[18px] lg:text-[20px] text-center max-w-[800px] leading-relaxed"
          >
            Welcome to DevOps Community — where engineers grow, innovate, and lead.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative w-full mt-[40px] md:mt-[60px] mb-[40px] md:mb-[60px]">
        <div className="relative flex flex-col gap-[60px] md:gap-[80px] items-center justify-center pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-4 max-w-[1447.97px] mx-auto">
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] p-6 md:p-8 lg:p-12 w-full max-w-[1260px]"
          >
            <p className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[18px] leading-relaxed text-center">
              At DevOps Community, we believe that DevOps isn&apos;t just a skill — it&apos;s a mindset. Our mission is to empower individuals from all backgrounds to master the tools, practices, and culture that drive world-class software delivery.
            </p>
          </motion.div>

          {/* Hands-on Training Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] p-6 md:p-8 lg:p-12 w-full max-w-[1260px]"
          >
            <h2 className="font-outfit font-semibold text-black text-[24px] md:text-[32px] mb-6 text-center">
              Real-World, Hands-On Training In:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {techSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-4 glass-card glass-card-blur-sm glass-card-opacity-light rounded-[10px] hover:bg-white/20 transition-all"
                >
                  {skill.icon}
                  <span className="font-sans font-medium text-[#2d2d2d] text-[14px] md:text-[16px]">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why We Exist Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card glass-card-blur-md glass-card-opacity-medium rounded-[20px] p-6 md:p-8 lg:p-12 w-full max-w-[1260px] bg-[#1447e6]/10"
          >
            <h2 className="font-outfit font-semibold text-black text-[24px] md:text-[32px] mb-4 text-center">Why We Exist</h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[18px] leading-relaxed text-center max-w-[1000px] mx-auto">
              The tech industry is evolving fast. Traditional degrees alone don&apos;t cut it. We fill that gap with industry-aligned, project-based training crafted by real engineers — not textbook authors.
              <br/><br/>
              We&apos;re not just an educational platform. We&apos;re a movement — building a strong, inclusive community of DevOps enthusiasts, practitioners, and leaders.
            </p>
          </motion.div>

          {/* What We Offer Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] p-6 md:p-8 lg:p-12 w-full max-w-[1260px]"
          >
            <h2 className="font-outfit font-semibold text-black text-[24px] md:text-[32px] mb-8 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {offerings.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center p-6 glass-card glass-card-blur-sm glass-card-opacity-light rounded-[10px] hover:bg-white/20 transition-all"
                >
                  <div className="p-3 bg-white/50 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <p className="font-sans font-medium text-[#2d2d2d] text-[14px] md:text-[16px] leading-relaxed">{item.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Join the Movement Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card glass-card-blur-md glass-card-opacity-medium rounded-[20px] p-8 md:p-12 lg:p-16 w-full max-w-[1260px] text-center bg-[#1447e6]/10"
          >
            <h2 className="font-outfit font-semibold text-black text-[28px] md:text-[36px] lg:text-[40px] mb-6">Join the Movement</h2>
            <p className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[18px] mb-8 max-w-xl mx-auto">
              Whether you&apos;re a developer, system admin, student, or career switcher — DevOps Community is your launchpad to the future of engineering.
            </p>
            <p className="font-sans font-semibold text-black text-[18px] md:text-[20px] mb-6">
              👉 Let&apos;s automate, collaborate, and innovate — together.
            </p>
            <div className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[16px] p-4 mb-6">
              <p className="font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-[16px]">
                Visit our Hyderabad office:
              </p>
              <p className="font-sans text-[#66707d] text-[12px] md:text-[14px] leading-relaxed">
                Flat No.403, Nandini Residency, 15/A Addagutta Society - HMT Hills Rd, near JNTU, Addagutta Society, Jal Vayu Vihar, Kukatpally, Hyderabad, Telangana 500085
              </p>
            </div>
            <Link href="/webinars">
              <button className="bg-[#1447e6] hover:bg-[#0d3bb3] text-white font-sans font-semibold text-[14px] md:text-[16px] py-3.5 px-10 rounded-[30px] transition-all duration-200 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-lg whitespace-nowrap">
                Explore Webinars & Courses
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative w-full mt-[40px] md:mt-[60px]">
        <div className="relative flex flex-col items-center justify-center px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
