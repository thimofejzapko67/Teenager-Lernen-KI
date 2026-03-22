"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowLeft } from "lucide-react";

const mainTopics = [
  {
    id: "free-tools",
    title: "Free Tools",
    subtopics: ["openCode", "Kilo CLI", "openRouter", "QwenCoder"],
    route: "/learn/free-tools",
  },
  {
    id: "web-dev",
    title: "Web Development",
    subtopics: ["Frontend", "Backend", "Databases", "Deploy"],
    route: "/learn/web-dev",
  },
  {
    id: "app-dev",
    title: "App Development",
    subtopics: ["iOS", "Android", "Cross-Platform", "Publishing"],
    route: "/learn/app-dev",
  },
  {
    id: "security",
    title: "Security",
    subtopics: ["Authentication", "Data Protection", "Vulnerabilities", "Best Practices"],
    route: "/learn/security",
  },
];

export function LearningPath() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const router = useRouter();

  const selectedTopic = mainTopics.find((t) => t.id === activeTopic);

  const handleCardClick = (topicId: string) => {
    const topic = mainTopics.find((t) => t.id === topicId);
    if (topic?.route) {
      router.push(topic.route);
    } else if (activeTopic === topicId) {
      setActiveTopic(null);
    } else {
      setActiveTopic(topicId);
    }
  };

  const handleBack = () => {
    setActiveTopic(null);
  };

  return (
    <div className="relative min-h-[500px] flex flex-col items-center justify-center py-12">
      <div
        className={cn(
          "grid gap-6 w-full max-w-5xl transition-all duration-500 ease-in-out",
          activeTopic ? "opacity-0 scale-95 pointer-events-none absolute" : "opacity-100 scale-100"
        )}
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {mainTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleCardClick(topic.id)}
            className={cn(
              "group relative h-40 rounded-xl border-2 border-foreground/30 bg-transparent",
              "hover:border-primary hover:shadow-lg hover:shadow-primary/10",
              "transition-all duration-300 hover:-translate-y-1",
              "flex items-center justify-center"
            )}
          >
            <span className="text-lg font-semibold text-center px-4 group-hover:text-primary transition-colors">
              {topic.title}
            </span>
          </button>
        ))}
      </div>

      {selectedTopic && (
        <div className="absolute inset-0 flex flex-col items-center pt-8 animate-in fade-in duration-500">
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/30 hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>

          <button
            onClick={handleBack}
            className={cn(
              "relative px-12 py-6 rounded-xl border-2 border-primary bg-transparent",
              "transition-all duration-300 hover:shadow-lg hover:shadow-primary/20",
              "flex items-center justify-center"
            )}
          >
            <span className="text-2xl font-bold text-primary">
              {selectedTopic.title}
            </span>
          </button>

          <div className="relative mt-8 mb-4 flex justify-center gap-16">
            {[0, 1].map((idx) => (
              <ArrowDown
                key={idx}
                className="w-6 h-6 text-foreground/40 animate-bounce"
                style={{ animationDelay: `${idx * 200}ms` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-4 gap-6 w-full max-w-5xl mt-4">
            {selectedTopic.subtopics.map((subtopic, idx) => (
              <button
                key={subtopic}
                onClick={() => {
                  if (selectedTopic.id === "free-tools") {
                    const toolId = subtopic.toLowerCase().replace(/\s+/g, "-");
                    router.push(`/learn/free-tools/${toolId}`);
                  }
                }}
                className={cn(
                  "group relative h-32 rounded-xl border-2 border-foreground/20 bg-transparent",
                  "hover:border-secondary hover:shadow-lg hover:shadow-secondary/10",
                  "transition-all duration-300 hover:-translate-y-1",
                  "flex items-center justify-center",
                  "animate-in fade-in slide-in-from-top-4"
                )}
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <span className="text-base font-medium text-center px-3 group-hover:text-secondary transition-colors">
                  {subtopic}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
