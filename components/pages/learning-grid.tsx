"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

const categories = [
  {
    id: "free-tools",
    title: "Free Tools",
    description: "KI-Tools für effizienteres Entwickeln",
    icon: "🛠️",
    color: "from-blue-500 to-cyan-500",
    lessons: 4,
    xp: 275
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Websites & Web Apps bauen",
    icon: "💻",
    color: "from-purple-500 to-pink-500",
    lessons: 4,
    xp: 475
  },
  {
    id: "app-dev",
    title: "App Development",
    description: "Mobile Apps entwickeln",
    icon: "📱",
    color: "from-green-500 to-emerald-500",
    lessons: 4,
    xp: 500
  },
  {
    id: "security",
    title: "Security",
    description: "Sichere Anwendungen bauen",
    icon: "🔒",
    color: "from-orange-500 to-red-500",
    lessons: 4,
    xp: 375
  },
]

export function LearningGrid() {
  const router = useRouter()

  return (
    <section className="px-4 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">Wähle deinen Pfad</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vier Hauptkategorien, jedes mit XP-Belohnungen und echten Projekten
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => router.push(`/learn/${category.id}`)}
              className="group relative text-left"
            >
              <div className="relative h-full p-8 rounded-3xl border-2 border-border bg-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.color} text-5xl mb-6 shadow-lg`}>
                    {category.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">{category.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{category.lessons}</span>
                      <span className="text-muted-foreground">Lektionen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gradient-primary">{category.xp}</span>
                      <span className="text-muted-foreground">XP</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
