"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mainTopics = [
  {
    id: "free-tools",
    title: "Free Tools",
    description: "KI-Tools für effizienteres Entwickeln",
    icon: "🛠️",
    route: "/learn/free-tools",
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
    icon: "💻",
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
    icon: "📱",
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
    icon: "🔒",
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
    <div className="relative min-h-[700px] flex flex-col items-center justify-center py-16 px-4">
      <AnimatePresence mode="wait">
        {!activeTopic ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="grid gap-8 w-full max-w-5xl"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {mainTopics.map((topic, index) => (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleCardClick(topic.id)}
                className="group relative h-56 rounded-3xl border-2 border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-8 flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className="text-6xl mb-4"
                  >
                    {topic.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient-primary transition-all">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {topic.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-semibold">
                    <span>Entdecken</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl mx-auto"
          >
            <button
              onClick={handleBack}
              className="mb-10 flex items-center gap-3 px-6 py-3 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück
            </button>

            <div className="mb-12 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="inline-block p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-6"
              >
                <span className="text-8xl">{selectedTopic?.icon}</span>
              </motion.div>
              <h2 className="text-5xl font-bold mb-4 text-gradient-primary">{selectedTopic?.title}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{selectedTopic?.description}</p>
            </div>

            <div className="grid gap-6">
              {selectedTopic?.subtopics.map((subtopic, index) => (
                <motion.div
                  key={subtopic.title}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {subtopic.title}
                      </h4>
                      <p className="text-muted-foreground">{subtopic.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gradient-primary">+{subtopic.xp}</p>
                        <p className="text-sm text-muted-foreground font-medium">XP</p>
                      </div>
                      <ArrowDown className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-y-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
