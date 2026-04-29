"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  BoltIcon,
  CalendarIcon,
  CheckCircleIcon,
  CircleStackIcon,
  ClockIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeIcon,
  CurrencyRupeeIcon,
  MicrophoneIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

const techStack = [
  { name: "Python", icon: <CodeBracketIcon className="w-4 h-4" /> },
  { name: "Git", icon: <CommandLineIcon className="w-4 h-4" /> },
  { name: "Docker", icon: <CubeIcon className="w-4 h-4" /> },
  { name: "Pydantic", icon: <ShieldCheckIcon className="w-4 h-4" /> },
  { name: "LLMs", icon: <CpuChipIcon className="w-4 h-4" /> },
  { name: "RAG", icon: <CircleStackIcon className="w-4 h-4" /> },
  { name: "LangChain", icon: <SparklesIcon className="w-4 h-4" /> },
  { name: "LangGraph", icon: <SparklesIcon className="w-4 h-4" /> },
  { name: "MCP", icon: <BoltIcon className="w-4 h-4" /> },
  { name: "Voice AI", icon: <MicrophoneIcon className="w-4 h-4" /> },
];

const curriculumSections = [
  {
    title: "Part 1 — Foundations",
    description: "Build the engineering base every AI developer needs.",
    items: [
      "Python from scratch — syntax, data types, OOP, and advanced features",
      "Git & GitHub — branching, merging, collaboration, and professional workflows",
      "Docker — containerization, images, volumes, and deploying applications",
      "Pydantic — type-safe, structured data handling for modern Python apps",
    ],
  },
  {
    title: "Part 2 — AI & LLM Fundamentals",
    description: "Understand how LLMs work under the hood.",
    items: [
      "What are LLMs and how GPT predicts the next token",
      "Tokenization, embeddings, and the attention mechanism explained simply",
      "Multi-head attention, positional encodings, and the Attention Is All You Need paper",
      "Base models vs instruction-tuned models and when to use each",
    ],
  },
  {
    title: "Part 3 — Prompt Engineering",
    description: "The craft of communicating with AI models.",
    items: [
      "Core strategies: zero-shot, one-shot, few-shot, chain-of-thought, persona-based",
      "Prompt formats: Alpaca, ChatML, LLaMA-2",
      "Designing prompts for structured JSON outputs with Pydantic",
      "Prompt anti-patterns that cause hallucinations and how to fix them",
    ],
  },
  {
    title: "Part 4 — Running & Using LLMs",
    description: "Connect to cloud APIs and run models locally.",
    items: [
      "OpenAI & Gemini API setup and integration with Python",
      "Running models locally with Ollama + Docker with zero API cost",
      "Using Hugging Face models and INSTRUCT-tuned variants",
      "Connecting LLMs to FastAPI endpoints for production use",
    ],
  },
  {
    title: "Part 5 — Agents & RAG Systems",
    description: "Build AI that retrieves knowledge and takes action.",
    items: [
      "Build your first AI agent from scratch with the ReAct loop",
      "CLI-based coding agents with Claude",
      "The complete RAG pipeline: indexing → retrieval → answering",
      "LangChain: document loaders, splitters, retrievers, and vector stores",
      "Advanced RAG with Redis or Valkey queues for async processing",
      "Scaling RAG with background workers and FastAPI",
    ],
  },
  {
    title: "Part 6 — LangGraph & Memory",
    description: "Give your agents state, persistence, and long-term memory.",
    items: [
      "LangGraph fundamentals: state, nodes, edges, and graph-based AI workflows",
      "Checkpointing with MongoDB to resume agents across sessions",
      "Memory architecture: short-term, long-term, episodic, and semantic memory",
      "Implementing memory layers with Mem0 and vector databases",
      "Graph memory with Neo4j and Cypher queries",
    ],
  },
  {
    title: "Part 7 — Conversational & Multi-Modal AI",
    description: "Build agents that see, speak, and listen.",
    items: [
      "Voice-based conversational agents with real-time interaction",
      "Integrating Speech-to-Text and Text-to-Speech",
      "Build your own AI voice assistant for coding with a Cursor IDE style workflow",
      "Multi-modal LLMs that process images and text together in one pipeline",
    ],
  },
  {
    title: "Part 8 — Model Context Protocol (MCP)",
    description: "The open standard that connects AI to everything.",
    items: [
      "What MCP is and why it is becoming the standard for AI integrations",
      "MCP transports: STDIO and SSE",
      "Build and deploy an MCP server with Python",
    ],
  },
];

const projects = [
  {
    title: "Tokenizer from scratch",
    description: "Implement tokenization rules and build a custom tokenizer pipeline.",
    tech: ["Python", "NLP"],
    icon: <CodeBracketIcon className="w-6 h-6" />,
  },
  {
    title: "Local Ollama + FastAPI AI app",
    description: "Serve LLMs locally and expose production-ready APIs.",
    tech: ["Ollama", "Docker", "FastAPI"],
    icon: <CubeIcon className="w-6 h-6" />,
  },
  {
    title: "Python CLI coding assistant",
    description: "Build an agent-driven assistant with Claude API workflows.",
    tech: ["Agents", "Claude API"],
    icon: <CommandLineIcon className="w-6 h-6" />,
  },
  {
    title: "Document RAG pipeline",
    description: "Index, retrieve, and answer with embeddings and vector stores.",
    tech: ["LangChain", "ChromaDB"],
    icon: <CircleStackIcon className="w-6 h-6" />,
  },
  {
    title: "Queue-based scalable RAG system",
    description: "Scale retrieval with Redis queues and async workers.",
    tech: ["Redis", "FastAPI", "Workers"],
    icon: <BoltIcon className="w-6 h-6" />,
  },
  {
    title: "AI conversational voice agent",
    description: "Ship real-time voice agents with STT and TTS.",
    tech: ["STT", "GPT", "TTS"],
    icon: <MicrophoneIcon className="w-6 h-6" />,
  },
  {
    title: "Graph memory agent",
    description: "Add durable memory with Neo4j and LangGraph.",
    tech: ["Neo4j", "LangGraph"],
    icon: <SparklesIcon className="w-6 h-6" />,
  },
  {
    title: "MCP-powered AI server",
    description: "Connect AI to tools using the MCP standard.",
    tech: ["MCP SDK", "STDIO", "SSE"],
    icon: <BoltIcon className="w-6 h-6" />,
  },
];

const audiences = [
  {
    title: "Complete beginners",
    description: "Step-by-step path from Python basics to production AI.",
  },
  {
    title: "Backend / Data engineers",
    description: "Drop-in AI skills with agents, RAG, and LLMs in existing stacks.",
  },
  {
    title: "Developers using APIs",
    description: "Go deeper on queues, scaling, memory, and graph agents.",
  },
  {
    title: "Students & professionals",
    description: "Job-ready portfolio with eight real projects.",
  },
];

const standoutPoints = [
  "System design with queues, workers, and async pipelines",
  "Scaling with Redis-backed RAG that handles real load",
  "Memory architectures including graph-based workflows with Neo4j",
  "Voice and vision with multi-modal pipelines from day one",
  "Local-first development with Ollama on your own machine",
  "Standards-first integrations with MCP across tools",
];

const includedItems = [
  "8 production-grade AI projects",
  "Python + LLM engineering foundations",
  "Agents, RAG, LangChain, LangGraph, and MCP",
  "Live weekday classes with mentor support",
  "Job-ready portfolio and career guidance",
  "Lifetime access to recordings",
];

export default function AiLlmEngineeringBootcampPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image
          src={imgImage10}
          alt="AI and LLM Engineering Bootcamp Background"
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

          <div className="relative w-full pt-[110px] md:pt-[140px] pb-[40px] md:pb-[60px] px-3 md:px-[59px]">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col gap-4 md:gap-5"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-bold text-[#e54a2d] text-[11px] md:text-sm">
                    🤖 AI & LLM Bootcamp
                  </span>
                  <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#1447e6] text-[11px] md:text-sm flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    45 Days • Mon–Fri • 8:30–9:30 AM IST
                  </span>
                  <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#ff9900] text-[11px] md:text-sm">
                    📍 Live Online Classes
                  </span>
                </div>

                <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-4xl lg:text-[48px] leading-tight">
                  Complete AI & LLM Engineering
                  <br />
                  <span className="text-[#1447e6]">Bootcamp Program</span>
                </h1>

                <div className="space-y-3">
                  <p className="font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-lg">
                    From Zero to Production-Ready AI Engineer.
                  </p>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[13px] md:text-base leading-relaxed max-w-xl">
                    Learn Python, Git, Docker, Pydantic, LLMs, agents, RAG, LangChain, LangGraph, voice AI, and MCP in one place.
                  </p>
                  <p className="font-sans font-normal text-[#66707d] text-[12px] md:text-sm leading-relaxed max-w-xl">
                    Every lesson is hands-on and built around real-world production workflows. Build, deploy, and scale the same kinds of AI systems powering ChatGPT, Gemini, and Claude.
                  </p>
                </div>

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

                <div className="flex items-center gap-3 mt-3">
                  <a
                    href="https://rzp.io/rzp/dyM5IyUO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap"
                  >
                    Enroll Now – ₹4,999
                  </a>
                  <Link
                    href="#curriculum"
                    className="glass-card glass-card-blur-sm glass-card-opacity-light font-sans font-semibold text-[#2d2d2d] text-[13px] md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-white/20 transition-colors whitespace-nowrap"
                  >
                    View Curriculum
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:w-[380px] shrink-0"
              >
                <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-6 rounded-[16px] md:rounded-[20px]">
                  <div className="text-center mb-4">
                    <p className="font-sans text-[#66707d] text-[12px] md:text-sm">Total Course Fee</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-sans text-[#66707d] line-through text-[12px] md:text-sm">₹39,999</span>
                      <span className="font-outfit font-bold text-[#22c55e] text-[28px] md:text-[34px]">₹29,999</span>
                    </div>
                    <p className="font-sans text-[#66707d] text-[11px] md:text-xs mt-1">45 days • Monday to Friday • Live online</p>
                  </div>

                  <div className="border-t border-white/30 pt-4 mb-4">
                    <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-3">
                      What is Included
                    </h3>
                    <div className="space-y-2">
                      {includedItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-[#1447e6] shrink-0 mt-0.5" />
                          <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://rzp.io/rzp/dyM5IyUO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base py-3 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <CurrencyRupeeIcon className="w-5 h-5" />
                    Reserve Your Seat – ₹4,999 Enrollment
                  </a>
                  <p className="font-sans text-[#66707d] text-[10px] md:text-xs text-center mt-2">
                    Limited seats for this cohort
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
                    What This Course Is
                  </h2>
                  <p className="font-sans text-[#2d2d2d] text-[13px] md:text-base leading-relaxed mb-4">
                    This is not a theory course. Every concept is applied in code so you build real systems while learning.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[10px] md:rounded-[12px]">
                      <h4 className="font-outfit font-semibold text-[#66707d] text-[12px] md:text-sm mb-1 md:mb-2">Hands-On First</h4>
                      <p className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">Build agents, RAG, and production APIs from day one.</p>
                    </div>
                    <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[10px] md:rounded-[12px] border-2 border-[#1447e6]/20">
                      <h4 className="font-outfit font-semibold text-[#1447e6] text-[12px] md:text-sm mb-1 md:mb-2">Production-Ready ✓</h4>
                      <p className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">Deploy and scale AI apps like real-world engineering teams.</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[280px] shrink-0">
                  <div className="glass-card glass-card-blur-sm glass-card-opacity-medium p-4 rounded-[12px] h-full flex flex-col justify-center">
                    <p className="font-outfit font-semibold text-[#1447e6] text-[14px] md:text-lg mb-2">Bootcamp Outcome</p>
                    <p className="font-sans text-[#2d2d2d] text-[12px] md:text-sm">
                      Build, deploy, and scale AI systems that power assistants, agents, and retrieval workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-3xl mb-2 md:mb-3">
                  Why This Course Stands Out
                </h2>
                <p className="font-sans text-[#66707d] text-[12px] md:text-base">
                  Go beyond API calls with real system design, memory, and scaling.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {standoutPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6] shrink-0 mt-0.5" />
                    <span className="font-sans text-[#2d2d2d] text-[12px] md:text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

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
                Eight focused parts that take you from fundamentals to production-grade AI systems.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
              {curriculumSections.map((section) => (
                <div key={section.title} className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 md:p-6 rounded-[16px] md:rounded-[20px]">
                  <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[15px] md:text-lg mb-1">
                    {section.title}
                  </h3>
                  <p className="font-sans text-[#66707d] text-[11px] md:text-sm mb-3">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-[#1447e6] shrink-0 mt-0.5" />
                        <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="text-center mb-6 md:mb-8">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-4xl mb-2 md:mb-3">
                Projects You Will Build
              </h2>
              <p className="font-sans text-[#66707d] text-[12px] md:text-lg">
                Eight portfolio-grade builds that prove production skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
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
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="glass-card glass-card-blur-sm px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-sans font-medium text-[#1447e6]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="text-center mb-6 md:mb-8">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-4xl mb-2 md:mb-3">
                Who This Course Is For
              </h2>
              <p className="font-sans text-[#66707d] text-[12px] md:text-lg">
                The bootcamp supports a range of backgrounds and goals.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {audiences.map((audience) => (
                <div key={audience.title} className="glass-card glass-card-blur-sm glass-card-opacity-light p-4 md:p-6 rounded-[16px] md:rounded-[20px]">
                  <p className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg mb-2">
                    {audience.title}
                  </p>
                  <p className="font-sans text-[#66707d] text-[11px] md:text-sm">{audience.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-card glass-card-blur-md glass-card-opacity-light p-5 md:p-8 rounded-[16px] md:rounded-[20px]">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-3xl mb-2 md:mb-3">
                  Schedule & Pricing
                </h2>
                <p className="font-sans text-[#66707d] text-[12px] md:text-base">
                  Live weekday sessions with a job-ready project portfolio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="glass-card glass-card-blur-sm p-4 rounded-[12px] md:rounded-[16px]">
                  <div className="flex items-center gap-2 mb-2">
                    <ClockIcon className="w-5 h-5 text-[#1447e6]" />
                    <p className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg">45 Days Classes</p>
                  </div>
                  <p className="font-sans text-[#66707d] text-[12px] md:text-sm">Monday to Friday, 8:30 AM – 9:30 AM IST</p>
                </div>
                <div className="glass-card glass-card-blur-sm p-4 rounded-[12px] md:rounded-[16px]">
                  <div className="flex items-center gap-2 mb-2">
                    <CurrencyRupeeIcon className="w-5 h-5 text-[#1447e6]" />
                    <p className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg">Offer Price ₹29,999</p>
                  </div>
                  <p className="font-sans text-[#66707d] text-[12px] md:text-sm">
                    Course fee ₹39,999. Limited seats for the current cohort.
                  </p>
                </div>
                <div className="glass-card glass-card-blur-sm p-4 rounded-[12px] md:rounded-[16px]">
                  <div className="flex items-center gap-2 mb-2">
                    <UserGroupIcon className="w-5 h-5 text-[#1447e6]" />
                    <p className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg">Live Instructor-Led</p>
                  </div>
                  <p className="font-sans text-[#66707d] text-[12px] md:text-sm">Interactive classes with mentor support.</p>
                </div>
                <div className="glass-card glass-card-blur-sm p-4 rounded-[12px] md:rounded-[16px]">
                  <div className="flex items-center gap-2 mb-2">
                    <RocketLaunchIcon className="w-5 h-5 text-[#1447e6]" />
                    <p className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-lg">8 Capstone Builds</p>
                  </div>
                  <p className="font-sans text-[#66707d] text-[12px] md:text-sm">Real projects to showcase in interviews.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            id="pricing"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full scroll-mt-8"
          >
            <div className="glass-card glass-card-blur-lg glass-card-opacity-medium p-6 md:p-12 rounded-[16px] md:rounded-[20px] text-center">
              <h2 className="font-outfit font-bold text-[#2d2d2d] text-[22px] md:text-4xl mb-3 md:mb-4">
                Ready to Become a Production-Ready AI Engineer?
              </h2>
              <p className="font-sans text-[#2d2d2d] text-[14px] md:text-xl mb-4 max-w-2xl mx-auto">
                Complete curriculum from Python foundations to agents, RAG, and MCP. Live weekday sessions with eight real-world AI projects.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-6">
                <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[12px]">
                  <p className="font-sans text-[#66707d] text-[11px] md:text-sm">Course Fee</p>
                  <p className="font-outfit font-bold text-[#2d2d2d] text-[24px] md:text-3xl">₹39,999</p>
                </div>
                <div className="glass-card glass-card-blur-sm p-3 md:p-4 rounded-[12px]">
                  <p className="font-sans text-[#66707d] text-[11px] md:text-sm">Offer Price</p>
                  <p className="font-outfit font-bold text-[#1447e6] text-[24px] md:text-3xl">₹29,999</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <a
                  href="https://rzp.io/rzp/dyM5IyUO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1447e6] text-white font-sans font-semibold text-[14px] md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap"
                >
                  Enroll Now – ₹4,999
                </a>
                <Link
                  href="#curriculum"
                  className="glass-card glass-card-blur-sm font-sans font-semibold text-[#2d2d2d] text-[14px] md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/20 transition-colors whitespace-nowrap"
                >
                  View Full Curriculum
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative w-full mt-[50px] md:mt-[80px]">
        <div className="relative flex flex-col items-center justify-center pt-[30px] md:pt-[50px] pb-[30px] md:pb-[50px] px-2 md:px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
