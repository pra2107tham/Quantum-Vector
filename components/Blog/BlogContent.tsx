"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  // Type-safe theme for SyntaxHighlighter (coerce union -> map via spread)
            // Fallback to satisfy SyntaxHighlighter typing differences across versions
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const prismStyle = (tomorrow as unknown) as any;

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading components
          h1: ({ children }) => (
            <h1 className="font-outfit font-semibold text-black text-[32px] md:text-[40px] mb-6 mt-8 first:mt-0 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-outfit font-semibold text-black text-[28px] md:text-[36px] mb-4 mt-8 leading-tight border-b-2 border-[#e5e5e5] pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-outfit font-semibold text-black text-[24px] md:text-[28px] mb-3 mt-6 leading-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-2 mt-4">
              {children}
            </h4>
          ),
          
          // Paragraph styling
          p: ({ children }) => (
            <p className="font-sans font-normal text-[#2d2d2d] leading-relaxed mb-4 text-[16px] md:text-[18px]">
              {children}
            </p>
          ),
          
          // List styling
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-[#2d2d2d] ml-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-[#2d2d2d] ml-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="font-sans font-normal text-[#2d2d2d] text-[16px] md:text-[18px] leading-relaxed">
              {children}
            </li>
          ),
          
          // Link styling
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-medium text-[#1447e6] hover:underline transition-colors"
            >
              {children}
            </a>
          ),
          
          // Blockquote styling
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#1447e6] pl-6 py-2 my-6 glass-card glass-card-blur-sm glass-card-opacity-light rounded-r-lg italic text-[#2d2d2d]">
              {children}
            </blockquote>
          ),
          
          // Table styling
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-[#e5e5e5] rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="glass-card glass-card-blur-sm glass-card-opacity-light">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-sans font-semibold text-black text-[14px] md:text-[16px] border-b border-[#e5e5e5]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] border-b border-[#e5e5e5]">
              {children}
            </td>
          ),
          
          // Code styling
          code: (props: React.HTMLAttributes<HTMLElement> & { inline?: boolean; className?: string; children?: React.ReactNode }) => {
            const { inline, className, children, ...rest } = props || {};
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && language) {
              return (
                <div className="my-6">
                  <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
                    <span className="text-sm font-medium capitalize">{language}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                      }}
                      className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={prismStyle}
                    language={language}
                    PreTag="div"
                    className="!mt-0 rounded-t-none"
                    showLineNumbers={true}
                    {...rest}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }
            
            return (
              <code className="glass-card glass-card-blur-sm glass-card-opacity-light text-black px-2 py-1 rounded text-[14px] font-mono" {...rest}>
                {children}
              </code>
            );
          },
          
          // Image styling
          img: ({ src, alt }) => (
            <div className="my-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={typeof src === 'string' ? src : ''}
                alt={alt || ''}
                className="rounded-lg shadow-lg w-full h-auto"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  // Silently handle image load errors
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {alt && (
                <p className="text-center font-sans font-normal text-[#2d2d2d] text-[12px] md:text-[14px] mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
          
          // Horizontal rule
          hr: () => (
            <hr className="my-8 border-t-2 border-[#e5e5e5]" />
          ),
          
          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-sans font-bold text-black">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="font-sans italic text-[#2d2d2d]">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}