"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const mainTopics = [
  {
    id: "free-tools",
    title: "Free Tools",
    description: "KI-Tools für effizienteres Entwickeln",
    route: "/learn/free-tools",
    emoji: "🛠️",
    color: "#FF9600",
    shadow: "#E08800",
    bg: "#FFF3E0",
    subtopics: [
      { title: "Cursor", description: "KI-gesteuerter Code Editor", xp: 50 },
      { title: "Windsurf", description: "Intelligente IDE", xp: 50 },
      { title: "Bolt", description: "Schnelles Prototyping", xp: 75 },
      { title: "v0", description: "UI mit KI generieren", xp: 100 },
    ],
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Websites & Web Apps bauen",
    emoji: "🌐",
    color: "#1CB0F6",
    shadow: "#0E9BD8",
    bg: "#EBF8FE",
    subtopics: [
      { title: "Frontend", description: "HTML, CSS, React, Next.js", xp: 150 },
      { title: "Backend", description: "Node.js, APIs, Databases", xp: 150 },
      { title: "Databases", description: "SQL, PostgreSQL, Supabase", xp: 100 },
      { title: "Deploy", description: "Vercel, Netlify, CI/CD", xp: 75 },
    ],
  },
  {
    id: "app-dev",
    title: "App Development",
    description: "Mobile Apps entwickeln",
    emoji: "📱",
    color: "#CE82FF",
    shadow: "#A854F7",
    bg: "#F5EEFF",
    subtopics: [
      { title: "iOS", description: "Swift, SwiftUI", xp: 150 },
      { title: "Android", description: "Kotlin, Jetpack Compose", xp: 150 },
      { title: "Cross-Platform", description: "React Native, Flutter", xp: 200 },
      { title: "Publishing", description: "App Store & Play Store", xp: 100 },
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "Sichere Anwendungen bauen",
    emoji: "🔐",
    color: "#FF4B4B",
    shadow: "#EA2929",
    bg: "#FFEAEA",
    subtopics: [
      { title: "Authentication", description: "OAuth, JWT, Sessions", xp: 100 },
      { title: "Data Protection", description: "Verschlüsselung, Privacy", xp: 100 },
      { title: "Vulnerabilities", description: "XSS, SQL Injection, CSRF", xp: 150 },
      { title: "Best Practices", description: "Secure Coding", xp: 75 },
    ],
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
    } else {
      setActiveTopic(topicId);
    }
  };

  const handleSubtopicClick = (topicId: string, subtopicTitle: string) => {
    const slug = subtopicTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    router.push(`/learn/${topicId}/${slug}`);
  };

  return (
    <div className="relative py-4 px-4">
      <AnimatePresence mode="wait">
        {!activeTopic ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
          >
            {mainTopics.map((topic, index) => (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.07 }}
                onClick={() => handleCardClick(topic.id)}
                className="group relative text-left"
              >
                <div
                  className="relative flex items-center gap-4 p-5 rounded-2xl border-[2.5px] bg-card transition-all duration-150 hover:-translate-y-1"
                  style={{
                    borderColor: topic.color,
                    boxShadow: `0 5px 0 ${topic.shadow}`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl"
                    style={{ background: topic.bg }}
                  >
                    {topic.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-800 text-base leading-tight mb-0.5">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-body line-clamp-2">
                      {topic.description}
                    </p>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-150 group-hover:translate-x-1"
                    style={{ color: topic.color }}
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto"
          >
            <button
              onClick={() => setActiveTopic(null)}
              className="mb-6 flex items-center gap-2 text-sm font-display font-700 px-4 py-2 rounded-xl border-2 border-border bg-card hover:border-primary transition-colors"
              style={{ boxShadow: "0 3px 0 var(--color-border)" }}
            >
              <ChevronLeft className="w-4 h-4" />
              Zurück
            </button>

            <div
              className="flex items-center gap-4 p-5 rounded-2xl border-[2.5px] mb-5"
              style={{
                borderColor: selectedTopic?.color,
                background: selectedTopic?.bg,
                boxShadow: `0 4px 0 ${selectedTopic?.shadow}`,
              }}
            >
              <span className="text-4xl">{selectedTopic?.emoji}</span>
              <div>
                <h2 className="text-xl font-display font-900" style={{ color: selectedTopic?.shadow }}>
                  {selectedTopic?.title}
                </h2>
                <p className="text-sm font-body text-muted-foreground">{selectedTopic?.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedTopic?.subtopics.map((subtopic, index) => (
                <motion.button
                  key={subtopic.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.07 }}
                  onClick={() => handleSubtopicClick(selectedTopic.id, subtopic.title)}
                  className="w-full group text-left"
                >
                  <div
                    className="flex items-center gap-4 p-5 rounded-2xl border-[2.5px] bg-card transition-all duration-150 hover:-translate-y-0.5"
                    style={{
                      borderColor: selectedTopic.color,
                      boxShadow: `0 4px 0 ${selectedTopic.shadow}`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center font-display font-900 text-sm text-white"
                      style={{ background: selectedTopic.color, boxShadow: `0 3px 0 ${selectedTopic.shadow}` }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display font-800 text-sm">{subtopic.title}</h4>
                      <p className="text-xs text-muted-foreground font-body">{subtopic.description}</p>
                    </div>
                    <div
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-display font-800 border-2"
                      style={{ background: selectedTopic.bg, color: selectedTopic.shadow, borderColor: selectedTopic.color }}
                    >
                      <Star className="w-3.5 h-3.5" />
                      +{subtopic.xp}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
