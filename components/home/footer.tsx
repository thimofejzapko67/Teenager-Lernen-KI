"use client"

import { Github, Twitter, Instagram, Mail, Heart } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  product: {
    title: "Produkt",
    links: [
      { label: "Lektionen", href: "/learn" },
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Community", href: "/community" },
    ],
  },
  company: {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Karriere", href: "/careers" },
      { label: "Kontakt", href: "/contact" },
    ],
  },
  legal: {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
    ],
  },
}

const socialLinks = [
  { icon: Github, href: "https://github.com/clawacademy", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/clawacademy", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/clawacademy", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@clawacademy.de", label: "Email" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 bg-card/20 backdrop-blur-sm">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-2 space-y-4">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-bold text-sm font-display">C</span>
                </div>
                <h3 className="text-xl font-display font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  Codelift
                </h3>
              </Link>
              <p className="text-muted-foreground max-w-xs">
                Die KI-Lernplattform für Teenager. Lerne programmieren, baue KI-Apps, werde gesponsert.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex p-2 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Product links */}
            <div className="space-y-4">
              <h4 className="font-semibold">{footerLinks.product.title}</h4>
              <ul className="space-y-2">
                {footerLinks.product.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div className="space-y-4">
              <h4 className="font-semibold">{footerLinks.company.title}</h4>
              <ul className="space-y-2">
                {footerLinks.company.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div className="space-y-4">
              <h4 className="font-semibold">{footerLinks.legal.title}</h4>
              <ul className="space-y-2">
                {footerLinks.legal.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              © {currentYear} Codelift. Made with{" "}
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for teens.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Alle Systeme aktiv
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
