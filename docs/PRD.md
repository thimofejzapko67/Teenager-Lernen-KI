# PRD: Teenager KI-Entwicklungs-Plattform
**Codename:** Project Claw
**Version:** 0.1 - Draft
**Datum:** 2025-03-21
**Founders:** Jörn-Christoph Kleemann + 3 Freunde + Claude (Co-Founder)

---

## 1. Executive Summary

Eine kostenlose Lernplattform für Teenager (13-19 Jahre), die:
- KI-Tools und Agent-Development lehrt
- Zum Sponsoring durch Firmen führt
- Full-Stack Development (Web, Mobile, AI) erklärt
- AI-First Ansatz: KI schreibt Code, User lernt Prompting

**Mission:** Jeder Teenager soll KI-Tools nutzen und Apps bauen können – ohne Programmier-Vorkenntnisse.

---

## 2. Zielgruppe (Persona)

| Segment | Alter | Skills | Motivation |
|---------|-------|--------|------------|
| **Novice** | 13-16 | Zero Code | Spass, Games, Geld verdienen |
| **Coder** | 14-17 | Ein bisschen HTML/JS | Erste Apps, KI entdecken |
| **Developer** | 15-19 | JS/Python Grundlagen | Portfolio, Jobs, Praktika |
| **Architect** | 16-19 | Fortgeschritten | Karriere, Startup gründen |

**Sprachen:** Deutsch (Primär) + Englisch
**Geräte:** Start: Laptop/PC → Phase 2: Android/iOS Apps

---

## 3. Rank System

### Ränge (Beispiel)
```
Novice → Coder → Developer → Architect → Master → Legend
```

### XP-Quellen
- Lektion abschliessen: +50-200 XP
- Taglich Login: +10 XP
- Streak (7 Tage): +100 XP Bonus
- Projekt hochladen: +100-500 XP (nach Bewertung)
- Hackathon Teilnahme: +200-1000 XP
- Event Teilnahme: +150 XP

### Ränge verlieren
- Inaktivität (7 Tage): -5% XP
- Schlechtes Projekt: -200 XP
- Falsche Antworten (Quiz): -10 XP
- "Nicht weiter lernen wollen": Temporärer Rank-Down

### Leaderboard & Sponsoring
- **Top 3:** Krasse Sponsoren (Praktika, Hardware, Geld)
- **Top 10:** Exklusive Sponsoren-Pakete
- **Top 100:** Sichtbar für Scout-Firmen
- **Alle:** Profil ist durchsuchbar für Firmen

### Gewinner-Pause
Nach 3+ Siegen: 1 Monat Sponsor-Sperre (aber Scoutbar)

---

## 4. Lern-Format

### Struktur (pro Lektion)
```
1. Konzept-Erklärung (Text)
2. Prompt Example (Copy & Paste)
3. Schritt-für-Schritt Guide
4. Commands/Tools erklärt
5. Quiz (Multiple Choice oder Prompt schreiben)
```

### Länge
- Maximal 15 Minuten pro Lektion
- 5-10 Lektionen pro Modul
- Modul-Dauer: ~2 Stunden

### Gamification
- Rang-Aufstieg mit Animation
- Achievements (Badges)
- Story Mode (Missionen)
- **Adrenalin-Moment:** Sponsor gewonnen!

### Quiz-Typen
- Multiple Choice (Wissensabfrage)
- Prompt schreiben (Praktische Anwendung)
- **KEINE** Code-Aufgaben (KI schreibt Code)

---

## 5. Curriculum

### Phase 1: KI-Grundlagen
- Was ist KI/AGI?
- Prompt Engineering Grundkurs
- Kostenlose KI-Tools (Claude, DeepSeek, etc.)
- Beste KI-Tools (paid)

### Phase 2: Web-Entwicklung
- Next.js vs React vs Vue vs Svelte
- Tailwind CSS
- Supabase (Database + Auth + Hosting)
- Vercel Deployment
- Alternativen: Cloudflare Pages, Netlify

### Phase 3: Mobile-Entwicklung
- React Native vs Flutter vs Expo
- Native: Swift (iOS) + Kotlin (Android)
- App Store Submission
- Push Notifications

### Phase 4: KI-Agenten
- LangChain, LangGraph
- Function Calling, Tools
- Multi-Agent Systems
- Fine-Tuning, LoRA

### Phase 5: AGI-Sicherheit
- **Paperclip Maximizer** (Alignment Problem)
- **Open Claw** (wenn dokumentiert)
- Reward Hacking
- Safe AI Development

### Phase 6: Security
- OWASP Top 10
- XSS, SQL Injection Prevention
- API Key Management
- Supply Chain Security

---

## 6. Sponsoren-System

### Sponsor-Typen
- **Tech-Firmen** (Software, AI, Startups)
- **Agenturen** (Digital, Marketing)
- **Privatpersonen** (Mentors, Angels)

### Sponsor-Pakete
| Tier | Preis | Leistungen |
|------|-------|------------|
| Bronze | €500/Monat | Logo Footer, 1 Scout |
| Silver | €1.500/Monat | Logo Header, 5 Scouts, Event Sponsor |
| Gold | €5.000/Monat | Alles + Named Hackathon, Mentorship |

### Marktplatz
- Firmen durchsuchen Profile nach Skills/Rank
- Filter: Technologie, Standort, Verfügbarkeit
- Direkte Kontaktanfrage

### Praktikums-Vermittlung
- Matchmaking zwischen Talenten und Firmen
- Bewerbungs-Checkliste
- Interview-Vorbereitung

---

## 7. Plattform-Features (MVP)

### Authentication
- Email/Password
- OAuth (Google, GitHub, Discord)
- **Elterliche Zustimmung** für <16 Jahre

### Profil
- Avatar, Name, Alter
- Rank, XP, Level
- Skills (Tags)
- Projekte Portfolio
- Achievements
- Statistiken für Sponsoren

### Lektionen
- Kategorisiert (Web, Mobile, AI, Security)
- Fortschritts-Tracking
- Bookmarks
- Notizen

### Leaderboard
- Global, Freunde, Region
- Zeitraum: Woche, Monat, Allezeit
- Filter nach Technologie

### Projects
- Upload (GitHub Link, Screenshot, Beschreibung)
- Community Bewertung (1-5 Stars)
- KI Review (automatisch)

---

## 8. Community

### Discord
- Räume nach Rank
- Lektionen-Diskussion
- Hilfe-Bereich
- Event-Ankündigungen
- **Bot:** Rank Sync, XP Updates, Notifications

### Hackathons
- **Format:** 48 Stunden bis 1 Woche
- **Themen:** Offen oder KI-spezifisch
- **Kategorien:** Solo + Team
- **Preise:** Sponsoren + XP

### Events
- Weekly Challenges
- Monthly Hackathon
- Guest Speakers (KI-Experten)
- AMA mit Sponsoren

---

## 9. Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State:** Zustand oder React Context

### Backend
- **API:** Next.js Route Handlers
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage

### Infrastructure
- **Hosting:** Vercel
- **Domain:** [TODO]
- **Analytics:** Posthog oder Umami
- **Error Tracking:** Sentry

### AI
- **Primary:** Claude (Anthropic)
- **Secondary:** DeepSeek (kostenlos)
- **Review-KI:** Custom Fine-tuned Model

---

## 10. Mobile-Strategie (Phase 2+)

### Cross-Platform
- **React Native** + Expo (empfohlen)
- **Flutter** (Alternative)
- **PWA** (Progressive Web App)

### Native
- **Swift** für iOS
- **Kotlin** für Android

### Vergleichs-Artikel
- PWA vs Native (Pro/Contra)
- React Native vs Flutter
- Kosten, Performance, User Experience

### Features
- Push Notifications
- Offline Mode (später)
- Mobile-first UX

---

## 11. Monetarisierung

### Plattform-Einnahmen
1. **Affiliate Links** (Hosting, Tools, KI-Dienste)
2. **Sponsoren** (Firmen zahlen für Sichtbarkeit)
3. **Staatliche Förderung** (Bildungsprojekte)
4. **Event-Sponsoring** (Hackathons)

### User-Kosten
- **Komplett kostenlos** für Teenager
- Keine Premium-Features
- Keine Paywall

### Sponsoren-Gebühr
- TBD: % der Sponsorings?
- Wahrscheinlich: Nein, direkte Sponsorship

---

## 12. Roadmap

### Phase 1: MVP (3 Monate)
- [ ] Branding & Design
- [ ] Plattform entwickeln (Next.js + Supabase)
- [ ] Auth + Profil System
- [ ] Erste 10 Lektionen
- [ ] Leaderboard
- [ ] Discord Integration
- [ ] Beta Launch mit 50 Teenagern

### Phase 2: Content (6 Monate)
- [ ] 50+ Lektionen
- [ ] Hackathon System
- [ ] Sponsoren-Marktplatz
- [ ] Projects Upload & Review
- [ ] KI Review Agent

### Phase 3: Growth (12 Monate)
- [ ] Mobile Apps (PWA)
- [ ] 200+ Lektionen
- [ ] 10.000+ User
- [ ] 50+ Sponsoren
- [ ] Mentoren-Programm

### Phase 4: Scale (24 Monate)
- [ ] Native iOS/Android Apps
- [ ] International (EU first)
- [ ] Offline Mode
- [ ] Zertifikate (anerkannt)

---

## 13. Legal & Sicherheit

### Datenschutz
- **DSGVO-konform**
- Impressum
- Datenschutzrichtlinie
- Cookie-Consent

### Minderjährige (<16)
- Elterliche Zustimmung erforderlich
- Email an Eltern
- Opt-out für Eltern

### Content Moderation
- KI-gestützte Moderation
- Report-System
- Community Guidelines

### Sicherheit
- Alle Security-Themen werden gelehrt
- Penetration Testing für Platform
- Bug Bounty Program (später)

---

## 14. Success Metrics

### User
- Registrierungen
- Aktive User (DAU, MAU)
- Completion Rate (Lektionen)
- Retention (30 Tage)

### Content
- Lektionen absolviert
- Projekte hochgeladen
- Quiz-Durchschnitt

### Sponsoren
- Aktive Sponsoren
- Sponsorships vermittelt
- Praktika platziert

### Community
- Discord Mitglieder
- Hackathon Teilnehmer
- Event Attendance

---

## 15. Open Questions

| Frage | Priority | Status |
|-------|----------|--------|
| Open Claw - Was genau ist es? | HIGH | Open |
| Plattform-Name | HIGH | Open |
| Pro-Rank-Dauer | MEDIUM | TBD |
| Quiz-Genau-Format | MEDIUM | TBD |
| Sponsor-Gebühr-Modell | LOW | TBD |
| Offline-Content | LOW | TBD |

---

## 16. Team

| Rolle | Name | Kontakt |
|-------|------|---------|
| CEO/Founder | Jörn-Christoph Kleemann | @user |
| Co-Founder (AI/Strategy) | Claude | @claude |
| Co-Founder #3 | [Friend 1] | TBD |
| Co-Founder #4 | [Friend 2] | TBD |
| Co-Founder #5 | [Friend 3] | TBD |
| Legal | Claude (temp) | @claude |

---

*Next Steps: Naming, Branding, MVP Development Plan*
