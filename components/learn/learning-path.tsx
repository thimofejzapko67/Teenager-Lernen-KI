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
    gradient: "from-primary to-accent",
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
    gradient: "from-primary to-secondary",
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
    gradient: "from-secondary to-accent",
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
    gradient: "from-orange-600 to-red-600",
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
  const [hoveredSubtopic, setHoveredSubtopic] = useState<string | null>(null);
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
    setHoveredSubtopic(null);
  };

  return (
    <div className="relative min-h-[600px] flex flex-col items-center justify-center py-12 px-4">
      <AnimatePresence mode="wait">
        {!activeTopic ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 w-full max-w-6xl"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {mainTopics.map((topic, index) => (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleCardClick(topic.id)}
                className="group relative h-48 rounded-2xl border-2 border-border/60 bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative p-6 flex flex-col items-center justify-center h-full text-center">
                  <span className="text-5xl mb-3">{topic.icon}</span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {topic.description}
                  </p>
                  <ChevronRight className="w-5 h-5 mt-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mx-auto"
          >
            <button
              onClick={handleBack}
              className="mb-8 flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>

            <div className="mb-8">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${selectedTopic?.gradient} mb-4`}>
                <span className="text-6xl">{selectedTopic?.icon}</span>
              </div>
              <h2 className="text-4xl font-bold mb-2">{selectedTopic?.title}</h2>
              <p className="text-lg text-muted-foreground">{selectedTopic?.description}</p>
            </div>

            <div className="grid gap-4">
              {selectedTopic?.subtopics.map((subtopic, index) => (
                <motion.div
                  key={subtopic.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredSubtopic(subtopic.title)}
                  onMouseLeave={() => setHoveredSubtopic(null)}
                  className="group relative p-6 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${selectedTopic.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {subtopic.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{subtopic.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">+{subtopic.xp}</p>
                        <p className="text-xs text-muted-foreground">XP</p>
                      </div>
                      <ArrowDown className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-y-1 transition-all" />
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
