"use client";

import Link from "next/link";
import {
  CheckCircleIcon,
  CodeBracketIcon,
  CpuChipIcon,
  MicrophoneIcon,
  CircleStackIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const syllabus = [
  { title: "Part 1 — Foundations", topics: ["Python from scratch", "Git & GitHub workflows", "Docker fundamentals", "Pydantic for structured data"] },
  { title: "Part 2 — AI & LLM Fundamentals", topics: ["How LLMs predict tokens", "Tokenization, embeddings, attention", "Multi-head attention and positional encoding", "Base vs instruction-tuned models"] },
  { title: "Part 3 — Prompt Engineering", topics: ["Zero-shot to few-shot prompting", "Prompt formats: Alpaca, ChatML, LLaMA-2", "Structured JSON prompts with Pydantic", "Reducing hallucinations"] },
  { title: "Part 4 — Running & Using LLMs", topics: ["OpenAI & Gemini API integration", "Local models with Ollama + Docker", "Hugging Face instruct models", "FastAPI production endpoints"] },
  { title: "Part 5 — Agents & RAG Systems", topics: ["ReAct agents from scratch", "CLI coding agents", "End-to-end RAG pipelines", "Redis/Valkey queue-based scaling"] },
  { title: "Part 6 — LangGraph & Memory", topics: ["Graph-based workflows", "MongoDB checkpoints", "Mem0 and vector memory layers", "Neo4j graph memory with Cypher"] },
  { title: "Part 7 — Conversational & Multi-Modal AI", topics: ["Real-time voice agents", "STT + TTS integration", "Coding voice assistant project", "Image + text multimodal pipelines"] },
  { title: "Part 8 — Model Context Protocol (MCP)", topics: ["MCP architecture", "STDIO and SSE transports", "Build and deploy MCP servers in Python"] },
];

export default function AiLlmBootcampPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">From Zero to Production</span>
            <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">8 Hands-on Projects</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900">Complete AI & LLM Engineering Bootcamp</h1>
          <p className="mt-4 text-slate-600 max-w-3xl">Learn Python, Git, Docker, Pydantic, LLMs, Agents, RAG, LangChain, LangGraph, Voice AI, and MCP by building production-ready applications step by step.</p>

          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-sm text-slate-500">Course Fee</p>
              <div className="flex items-center gap-3">
                <span className="text-lg text-slate-400 line-through">₹39,999</span>
                <span className="text-3xl font-bold text-emerald-600">₹29,999</span>
              </div>
            </div>
            <Link href="/contact-us" className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors">Enroll Now</Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          {[{ icon: CodeBracketIcon, label: "Foundation to Advanced" }, { icon: CpuChipIcon, label: "LLMs, Agents & RAG" }, { icon: MicrophoneIcon, label: "Voice + Multi-Modal AI" }, { icon: CircleStackIcon, label: "MCP + Integrations" }, { icon: SparklesIcon, label: "Production-ready Projects" }, { icon: CheckCircleIcon, label: "Beginner Friendly Path" }].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
              <item.icon className="w-6 h-6 text-blue-600" />
              <p className="text-sm font-medium text-slate-700">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Curriculum</h2>
          <div className="grid gap-4">
            {syllabus.map((part) => (
              <div key={part.title} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-3">{part.title}</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {part.topics.map((topic) => (
                    <li key={topic}>• {topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
