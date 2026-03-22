import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t-2 border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-lg font-black text-white">
                C
              </div>
              <span className="text-xl font-black">CodeLift</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Die KI-Lernplattform für Teenager. Lerne programmieren, baue KI-Apps und werde gesponsort.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Lernen</h4>
            <ul className="space-y-2">
              <li><Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">Alle Kurse</Link></li>
              <li><Link href="/learn/free-tools" className="text-muted-foreground hover:text-foreground transition-colors">Free Tools</Link></li>
              <li><Link href="/learn/web-dev" className="text-muted-foreground hover:text-foreground transition-colors">Web Dev</Link></li>
              <li><Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">Ranking</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Social</h4>
            <div className="flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border hover:border-primary hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border hover:border-primary hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t-2 border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2026 CodeLift. Für Teenager, von Teenagern.</p>
        </div>
      </div>
    </footer>
  )
}
