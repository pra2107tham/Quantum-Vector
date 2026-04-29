"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";

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
  { id: "1", name: "Tokenizer from scratch", skills: "Python, NLP fundamentals" },
  { id: "2", name: "Local Ollama + FastAPI AI app", skills: "Docker, Ollama, FastAPI" },
  { id: "3", name: "Python CLI coding assistant", skills: "Agents, Claude API" },
  { id: "4", name: "Document RAG pipeline", skills: "LangChain, ChromaDB, embeddings" },
  { id: "5", name: "Queue-based scalable RAG system", skills: "Redis, FastAPI, async workers" },
  { id: "6", name: "AI conversational voice agent", skills: "STT, GPT, TTS, WebSockets" },
  { id: "7", name: "Graph memory agent", skills: "Neo4j, LangGraph, Cypher" },
  { id: "8", name: "MCP-powered AI server", skills: "MCP SDK, Python, STDIO/SSE" },
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

export default function AiLlmEngineeringBootcampPage() {
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

      {/* Hero Section */}
      <div className="glass-card-main relative min-h-[620px] md:min-h-[760px] mx-auto my-[15px] md:my-[23px] rounded-[20px] md:rounded-[32px] w-[calc(100%-20px)] md:w-[calc(100%-50px)] max-w-[1383.548px]">
        <div className="relative min-h-[620px] md:min-h-[760px] w-full z-10">
          <Header />

          <div className="absolute flex flex-col md:flex-row gap-6 md:gap-10 items-start left-0 md:left-[59px] top-[110px] md:top-[140px] w-full md:w-[calc(100%-118px)] max-w-full md:max-w-none px-3 md:px-0 md:pr-[59px] pb-0">
            <div className="flex flex-col gap-4 md:gap-5 items-start relative shrink-0 w-full md:w-[60%]">
              <div className="flex flex-wrap gap-2">
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#1447e6] text-[11px] md:text-sm whitespace-nowrap">
                  🎯 Job-Ready
                </span>
                <span className="glass-card glass-card-blur-sm glass-card-opacity-light px-3 py-1.5 rounded-full font-sans font-semibold text-[#ff9900] text-[11px] md:text-sm whitespace-nowrap">
                  🤖 AI + LLM Focused
                </span>
              </div>

              <h1 className="font-outfit font-bold text-[#2d2d2d] text-[26px] md:text-[44px] lg:text-[52px] leading-tight w-full">
                Complete AI & LLM Engineering Bootcamp
              </h1>
              <p className="font-outfit font-semibold text-[#1447e6] text-[14px] md:text-[20px]">
                From Zero to Production-Ready AI Engineer
              </p>
              <p className="font-sans font-normal text-[#2d2d2d] text-[13px] md:text-[16px] leading-relaxed w-full max-w-[560px]">
                Learn Python, Git, Docker, Pydantic, LLMs, agents, RAG, LangChain, LangGraph, voice AI, and MCP in one place.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">45 Days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">Mon–Fri • 8:30–9:30 AM IST</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RocketLaunchIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1447e6]" />
                  <span className="font-sans text-[#2d2d2d] text-[11px] md:text-sm">8 Projects</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link
                  href="#curriculum"
                  className="bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base px-5 md:px-7 py-2.5 md:py-3.5 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg whitespace-nowrap"
                >
                  View Curriculum →
                </Link>
                <Link
                  href="/contact-us"
                  className="glass-card glass-card-blur-sm glass-card-opacity-light text-[#2d2d2d] font-sans font-semibold text-[13px] md:text-base px-5 md:px-7 py-2.5 md:py-3.5 rounded-full hover:bg-white/40 transition-colors shadow-lg whitespace-nowrap"
                >
                  Enroll Now
                </Link>
              </div>
            </div>

            <div className="w-full md:w-[38%] shrink-0">
              <div className="glass-card glass-card-blur-md glass-card-opacity-light flex flex-col gap-4 md:gap-5 items-start p-4 md:p-6 relative rounded-[12px] md:rounded-[16px] shrink-0 w-full">
                <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-[22px]">
                  Bootcamp Fee
                </h3>
                <div className="flex items-center gap-3">
                  <div className="bg-[#1447e6]/10 rounded-full p-2">
                    <CurrencyRupeeIcon className="w-5 h-5 text-[#1447e6]" />
                  </div>
                  <div>
                    <p className="font-sans text-[#66707d] text-[11px] md:text-sm">Course Fee</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-[#66707d] text-[12px] md:text-sm line-through">₹39,999</span>
                      <span className="font-outfit font-bold text-[#22c55e] text-[20px] md:text-[26px]">₹29,999</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 w-full">
                  <div className="flex items-center gap-2 text-sm text-[#2d2d2d]">
                    <ClockIcon className="w-4 h-4 text-[#1447e6]" />
                    <span className="font-sans">45 days classes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2d2d2d]">
                    <CalendarIcon className="w-4 h-4 text-[#1447e6]" />
                    <span className="font-sans">Monday to Friday</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2d2d2d]">
                    <UserGroupIcon className="w-4 h-4 text-[#1447e6]" />
                    <span className="font-sans">Live online sessions</span>
                  </div>
                </div>
                <Link
                  href="/contact-us"
                  className="w-full bg-[#1447e6] text-white font-sans font-semibold text-[13px] md:text-base px-5 md:px-7 py-2.5 md:py-3 rounded-full hover:bg-[#0f3bb8] transition-colors shadow-lg text-center"
                >
                  Reserve Your Seat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full mt-[40px] md:mt-[60px]">
        <div className="relative flex flex-col gap-8 md:gap-12 items-center px-2 md:px-4 max-w-[1383.548px] mx-auto">
          <section className="w-full max-w-[1000px] glass-card glass-card-blur-md glass-card-opacity-light rounded-[16px] p-5 md:p-8">
            <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-[30px] mb-3">
              What This Course Is
            </h2>
            <p className="font-sans text-[#2d2d2d] text-[13px] md:text-[16px] leading-relaxed mb-3">
              This is not a theory course. Every concept is applied in code so you build real systems as you learn.
            </p>
            <p className="font-sans text-[#2d2d2d] text-[13px] md:text-[16px] leading-relaxed">
              By the end, you will build, deploy, and scale real-world AI applications using the same techniques that power ChatGPT, Gemini, and Claude from a blank terminal to production.
            </p>
          </section>

          <section id="curriculum" className="w-full max-w-[1100px]">
            <div className="text-center mb-6">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-[34px] mb-2">
                What You Will Learn
              </h2>
              <p className="font-sans text-[#66707d] text-[12px] md:text-base">
                Eight focused parts that take you from fundamentals to production-grade AI systems.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {curriculumSections.map((section) => (
                <div key={section.title} className="glass-card glass-card-blur-md glass-card-opacity-light rounded-[16px] p-5 md:p-6">
                  <h3 className="font-outfit font-semibold text-[#2d2d2d] text-[16px] md:text-[22px] mb-1">
                    {section.title}
                  </h3>
                  <p className="font-sans text-[#66707d] text-[12px] md:text-[14px] mb-3">
                    {section.description}
                  </p>
                  <ul className="space-y-2 text-[12px] md:text-[14px] text-[#2d2d2d]">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-[#1447e6] mt-0.5" />
                        <span className="font-sans">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full max-w-[1100px]">
            <div className="text-center mb-6">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-[34px] mb-2">
                Projects You Will Build
              </h2>
              <p className="font-sans text-[#66707d] text-[12px] md:text-base">
                Eight portfolio-grade builds that prove production skills.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="glass-card glass-card-blur-md glass-card-opacity-light rounded-[14px] p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#1447e6] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      {project.id}
                    </div>
                    <div>
                      <p className="font-outfit font-semibold text-[#2d2d2d] text-[14px] md:text-[16px] mb-1">
                        {project.name}
                      </p>
                      <p className="font-sans text-[#66707d] text-[12px] md:text-[14px]">{project.skills}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full max-w-[1100px]">
            <div className="text-center mb-6">
              <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[22px] md:text-[34px] mb-2">
                Who This Course Is For
              </h2>
              <p className="font-sans text-[#66707d] text-[12px] md:text-base">
                The bootcamp supports a range of backgrounds and goals.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audiences.map((audience) => (
                <div key={audience.title} className="glass-card glass-card-blur-md glass-card-opacity-light rounded-[14px] p-5">
                  <p className="font-outfit font-semibold text-[#2d2d2d] text-[15px] md:text-[18px] mb-2">
                    {audience.title}
                  </p>
                  <p className="font-sans text-[#66707d] text-[12px] md:text-[14px]">{audience.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full max-w-[1000px] glass-card glass-card-blur-md glass-card-opacity-light rounded-[16px] p-5 md:p-8">
            <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-[30px] mb-3">
              Why This Course Stands Out
            </h2>
            <ul className="space-y-2 text-[12px] md:text-[15px] text-[#2d2d2d]">
              {standoutPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-[#1447e6] mt-0.5" />
                  <span className="font-sans">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="w-full max-w-[1000px] glass-card glass-card-blur-md glass-card-opacity-light rounded-[16px] p-5 md:p-8">
            <h2 className="font-outfit font-semibold text-[#2d2d2d] text-[20px] md:text-[30px] mb-3">
              Schedule & Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <ClockIcon className="w-5 h-5 text-[#1447e6]" />
                <div>
                  <p className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px] font-semibold">45 days classes</p>
                  <p className="font-sans text-[#66707d] text-[12px] md:text-[14px]">Monday to Friday</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-[#1447e6]" />
                <div>
                  <p className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px] font-semibold">8:30 AM to 9:30 AM IST</p>
                  <p className="font-sans text-[#66707d] text-[12px] md:text-[14px]">Weekday live sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CurrencyRupeeIcon className="w-5 h-5 text-[#1447e6]" />
                <div>
                  <p className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px] font-semibold">Course fee ₹39,999</p>
                  <p className="font-sans text-[#22c55e] text-[12px] md:text-[14px]">Offer price ₹29,999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UserGroupIcon className="w-5 h-5 text-[#1447e6]" />
                <div>
                  <p className="font-sans text-[#2d2d2d] text-[13px] md:text-[15px] font-semibold">Live instructor-led cohort</p>
                  <p className="font-sans text-[#66707d] text-[12px] md:text-[14px]">Weekday sessions with support</p>
                </div>
              </div>
            </div>
          </section>
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
