# PRD: Teenager KI-Entwicklungs-Plattform

| Feld | Wert |
|------|------|
| **Codename** | ClawAcademy |
| **Version** | 1.0 |
| **Status** | Draft |
| **Datum** | 2025-03-21 |
| **Product Owner** | Jörn-Christoph Kleemann |

---

## 1. Vision Statement

Eine kostenlose Lernplattform, die Teenagern (13-19 Jahre) befähigt, KI-Tools zu nutzen, Agenten zu entwickeln und Apps zu bauen – **ohne Programmier-Vorkenntnisse**. AI-First: Die KI schreibt den Code, der User lernt Prompting.

> "Jeder Teenager soll KI-Tools nutzen und Apps bauen können – egal ob Anfänger oder Fortgeschrittener."

---

## 2. Zielgruppe

### Primary Persona: "Der Neugierige" (13-16 Jahre)
- **Skills:** Null Vorkenntnisse
- **Motivation:** Spass, Games, Geld verdienen
- **Geräte:** Familien-Laptop
- **Zeit:** 15 Minuten am Tag

### Secondary Persona: "Der Coder" (15-18 Jahre)
- **Skills:** HTML/CSS/JS Grundlagen
- **Motivation:** Portfolio, Praktika, Karriere
- **Geräte:** Eigener Laptop
- **Zeit:** 1-2 Stunden am Tag

### Tertiary Persona: "Der Developer" (16-19 Jahre)
- **Skills:** Fortgeschritten
- **Motivation:** Startup gründen, Networking
- **Geräte:** High-End Laptop
- **Zeit:** 3+ Stunden am Tag

---

## 3. Core Features

### 3.1 Rank System

| Rank | XP Required | Benefits |
|------|-------------|----------|
| Novice | 0 | Lektionen freischalten |
| Coder | 1,000 | Projekte hochladen |
| Developer | 5,000 | Scoutbar für Firmen |
| Architect | 15,000 | Mentorship Zugang |
| Master | 50,000 | Exklusive Events |
| Legend | 100,000 | Hall of Fame |

**XP Quellen:**
- Lektion abschliessen: +50-200 XP
- Täglicher Login: +10 XP
- 7-Tage Streak: +100 XP Bonus
- Projekt hochladen: +100-500 XP
- Hackathon Teilnahme: +200-1,000 XP

**Ränge verlieren bei:**
- Inaktivität (7 Tage): -5% XP
- Schlechtes Projekt: -200 XP
- Quiz-Fehler: -10 XP

### 3.2 Leaderboard & Sponsoring

- **Top 3:** Premium Sponsoren (Praktika, Hardware, Geld)
- **Top 10:** Exklusive Sponsoren-Pakete
- **Top 100:** Profil sichtbar für Scout-Firmen
- **Alle:** Durchsuchbares Profil

**Gewinner-Regel:** Nach 3+ Siegen → 1 Monat Sponsor-Sperre (aber Scoutbar)

### 3.3 Lektionen-Format

Jede Lektion (max. 15 Min):
```
1. Konzept-Erklärung (Text)
2. Prompt Example (Copy & Paste)
3. Schritt-für-Schritt Guide
4. Commands/Tools erklärt
5. Quiz (Multiple Choice oder Prompt schreiben)
```

### 3.4 Sponsoren-Marktplatz

Firmen können:
- Profile durchsuchen (filterbar nach Skills/Rank/Standort)
- Direkte Kontaktanfragen
- Sponsor-Pakete buchen

| Sponsor-Tier | Preis | Leistungen |
|--------------|-------|------------|
| Bronze | €500/Monat | Logo Footer, 1 Scout |
| Silver | €1.500/Monat | Logo Header, 5 Scouts, Event Sponsor |
| Gold | €5.000/Monat | Alles + Named Hackathon, Mentorship |

---

## 4. Curriculum

### Modul 1: KI-Grundlagen (10 Lektionen)
- Was ist KI/AGI?
- Prompt Engineering Grundkurs
- Kostenlose KI-Tools (Claude, DeepSeek, etc.)
- Beste KI-Tools (paid)

### Modul 2: Web-Entwicklung (20 Lektionen)
- Next.js vs React vs Vue vs Svelte
- Tailwind CSS
- Supabase (Database + Auth + Hosting)
- Vercel Deployment
- Alternativen: Cloudflare, Netlify

### Modul 3: Mobile-Entwicklung (15 Lektionen)
- React Native vs Flutter vs Expo
- Native: Swift (iOS) + Kotlin (Android)
- App Store Submission
- Push Notifications

### Modul 4: KI-Agenten (20 Lektionen)
- LangChain, LangGraph
- Function Calling, Tools
- Multi-Agent Systems
- Fine-Tuning, LoRA

### Modul 5: AGI-Sicherheit (5 Lektionen)
- Paperclip Maximizer (Alignment Problem)
- Open Claw (wenn dokumentiert)
- Reward Hacking
- Safe AI Development

### Modul 6: Security (15 Lektionen)
- OWASP Top 10
- XSS, SQL Injection Prevention
- API Key Management
- Supply Chain Security

---

## 5. Gamification

### Achievements
- First Steps (Erste Lektion)
- Streak Master (7 Tage am Stück)
- Project Creator (Erstes Projekt)
- Hackathon Hero (Erster Hackathon)
- Sponsor Winner (Erster Sponsor)

### Story Mode
Missionen wie:
- "Baue deine erste Webseite"
- "Erstelle einen KI-Agenten"
- "Veröffentliche eine App"

### Events
- Weekly Challenges
- Monthly Hackathons
- Guest Speakers
- Sponsor Meetups

---

## 6. Technical Requirements

### Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS, shadcn/ui
- **Backend:** Next.js Route Handlers
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Hosting:** Vercel
- **AI:** Claude (primary), DeepSeek (secondary)

### Non-Functional Requirements
- **Performance:** L < 2.5s
- **Uptime:** > 99.5%
- **Security:** DSGVO-konform, SSL
- **Scalability:** 10.000+ User

---

## 7. Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| Registrierungen | 1,000 | 3 Monate |
| Aktive User (MAU) | 500 | 3 Monate |
| Lektionen absolviert | 5,000 | 3 Monate |
| Projekte hochgeladen | 200 | 3 Monate |
| Sponsoren | 10 | 6 Monate |
| Discord Mitglieder | 500 | 3 Monate |

---

## 8. Roadmap

### Phase 1: MVP (Monate 1-3)
- Branding & Design
- Plattform entwickeln (Next.js + Supabase)
- Auth + Profil System
- Erste 10 Lektionen
- Leaderboard
- Discord Integration
- Beta Launch mit 50 Teenagern

### Phase 2: Content (Monate 4-9)
- 50+ Lektionen
- Hackathon System
- Sponsoren-Marktplatz
- Projects Upload & Review
- KI Review Agent

### Phase 3: Growth (Monate 10-24)
- Mobile Apps (PWA)
- 200+ Lektionen
- 10.000+ User
- 50+ Sponsoren
- Mentoren-Programm

### Phase 4: Scale (Monate 25+)
- Native iOS/Android Apps
- International (EU first)
- Offline Mode
- Zertifikate (anerkannt)

---

## 9. Legal & Compliance

- **DSGVO-konform:** Ja
- **Impressum:** Erforderlich
- **Datenschutzerklärung:** Erforderlich
- **Elterliche Zustimmung:** Für <16 Jahre
- **Content Moderation:** Ja
- **Bug Bounty Program:** Phase 3

---

## 10. Open Questions

| Frage | Priority | Status |
|-------|----------|--------|
| Open Claw - Was genau ist es? | HIGH | Open |
| Plattform-Name final | HIGH | Open |
| Pro-Rank-Dauer | MEDIUM | TBD |
| Quiz-Genau-Format | MEDIUM | TBD |
| Sponsor-Gebühr-Modell | LOW | TBD |

---

*Document Owner: Jörn-Christoph Kleemann*
*Last Updated: 2025-03-21*
