"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Copy, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LessonContentProps {
  content: string;
  title: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function LessonContent({ content, title }: LessonContentProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [readingTime, setReadingTime] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const copiedMapRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Calculate reading time (average 200 words per minute)
  useEffect(() => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    setReadingTime(minutes);
  }, [content]);

  // Extract headings for TOC
  useEffect(() => {
    if (!contentRef.current) return;

    const extractedHeadings: Heading[] = [];
    const headingElements = contentRef.current.querySelectorAll("h2, h3");

    headingElements.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      extractedHeadings.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.substring(1)),
      });
    });

    setHeadings(extractedHeadings);
  }, [content]);

  // Intersection Observer for active heading
  useEffect(() => {
    if (!contentRef.current || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -70% 0px",
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Copy to clipboard function
  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);

      // Clear existing timeout for this block
      const existingTimeout = copiedMapRef.current.get(id);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      // Set copied state
      const copiedStateKey = `copied-${id}`;
      localStorage.setItem(copiedStateKey, "true");

      // Clear after 2 seconds
      const timeout = setTimeout(() => {
        localStorage.removeItem(copiedStateKey);
      }, 2000);

      copiedMapRef.current.set(id, timeout);

      // Force re-render
      setCopiedStates((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const codeBlockIndex = { current: 0 };

  // Generate stable unique ID for code blocks based on content + position
  const generateCodeId = (code: string, index: number) => {
    return `code-${index}-${code.slice(0, 20).replace(/[^a-zA-Z0-9]/g, "")}`;
  };

  return (
    <div className="space-y-6">
      {/* Reading Time */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Lesezeit: ca. {readingTime} Minuten</span>
      </div>

      {/* Markdown Content */}
      <div
        ref={contentRef}
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-display prose-headings:font-bold
          prose-h1:text-3xl prose-h1:text-primary prose-h1:mb-4
          prose-h2:text-2xl prose-h2:text-foreground prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:text-foreground/90 prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-foreground/80 prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-card/50 prose-pre:border prose-pre:border-border/50
          prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4
          prose-ul:list-disc prose-ol:list-decimal
          prose-li:marker:text-primary
          prose-hr:border-border/50
          prose-img:rounded-lg prose-img:border prose-img:border-border/50
        "
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            // Custom code block with copy button
            pre({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const codeContent = String(children).replace(/\n$/, "");
              const codeId = generateCodeId(codeContent, codeBlockIndex.current++);

              return (
                <div className="relative group">
                  <pre
                    className={cn(
                      className,
                      "bg-card/80 border border-border/50 rounded-lg p-4 overflow-x-auto"
                    )}
                    {...props}
                  >
                    {children}
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn(
                      "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
                      "bg-card/80 hover:bg-card border border-border/50",
                      "h-8 px-2"
                    )}
                    onClick={() => copyToClipboard(codeContent, codeId)}
                  >
                    {copiedStates[codeId] ? (
                      <>
                        <Check className="h-4 w-4 mr-1 text-green-400" />
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Kopieren
                      </>
                    )}
                  </Button>
                  {language && (
                    <span className="absolute bottom-2 right-2 text-xs text-muted-foreground uppercase font-mono">
                      {language}
                    </span>
                  )}
                </div>
              );
            },
            // Style inline code
            code({ node, className, children, ...props }) {
              // Check if this is inline code (not inside a pre tag)
              const hasNode = node && "position" in node;
              const classNameStr = className ? String(className) : "";
              const isInline = !hasNode || !classNameStr.includes("hljs");

              if (isInline) {
                return (
                  <code
                    className={cn(
                      className,
                      "bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono"
                    )}
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

    </div>
  );
}
