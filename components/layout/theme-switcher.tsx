"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("codelift-theme")
    const initialTheme = saved || "light"
    setIsDark(initialTheme === "dark")
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const handleThemeChange = () => {
    const newTheme = isDark ? "light" : "dark"
    setIsDark(!isDark)
    localStorage.setItem("codelift-theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        onClick={handleThemeChange}
        className="rounded-full shadow-2xl hover:scale-110 transition-transform"
        variant={isDark ? "default" : "outline"}
      >
        {isDark ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </Button>
    </div>
  )
}
