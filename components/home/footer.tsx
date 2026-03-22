"use client"

import { Github, Twitter, Instagram, Mail } from "lucide-react"
import Link from "next/link"

const links = {
  produkt: [
    { label: "Lektionen", href: "/learn" },
    { label: "Rangliste", href: "/leaderboard" },
    { label: "Sponsoren", href: "/sponsors" },
  ],
  firma: [
    { label: "Über uns", href: "/about" },
    { label: "Kontakt", href: "/contact" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "/agb" },
  ],
}

const socials = [
  { icon: Github, href: "https://github.com/codelift", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/codelift_de", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/codelift_de", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@codelift.de", label: "Email" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      {/* Top lime line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center shadow-md shadow-primary/25">
                <span className="text-primary-foreground font-display font-extrabold text-sm">C</span>
              </div>
              <span className="text-lg font-display font-extrabold text-foreground group-hover:text-primary transition-colors">
                Codelift
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Die KI-Lernplattform für Teenager. Lerne, baue, werde gesponsert.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {group === "produkt" ? "Produkt" : group === "firma" ? "Unternehmen" : "Rechtliches"}
              </h4>
              <ul className="space-y-2.5">
                {items.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Codelift. Gebaut für Teenager.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Alle Systeme aktiv</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
