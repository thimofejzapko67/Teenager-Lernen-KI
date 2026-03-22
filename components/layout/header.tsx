import Link from "next/link"
import { Menu, X, Home, BookOpen, Trophy, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl font-black text-white">
              C
            </div>
            <span className="text-2xl font-black tracking-tight">CodeLift</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link href="/learn" className="flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground transition-colors">
              <BookOpen className="w-5 h-5" />
              Lernen
            </Link>
            <Link href="/leaderboard" className="flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground transition-colors">
              <Trophy className="w-5 h-5" />
              Ranking
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/profile">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profil
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t-2 border-border/50">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors font-semibold">
                <Home className="w-5 h-5" />
                Home
              </Link>
              <Link href="/learn" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors font-semibold">
                <BookOpen className="w-5 h-5" />
                Lernen
              </Link>
              <Link href="/leaderboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors font-semibold">
                <Trophy className="w-5 h-5" />
                Ranking
              </Link>
              <Link href="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors font-semibold">
                <User className="w-5 h-5" />
                Profil
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
