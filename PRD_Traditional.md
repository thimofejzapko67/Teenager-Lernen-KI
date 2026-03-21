# PRD: ClawAcademy - Teenager KI-Entwicklungs-Plattform

| Feld | Wert |
|------|------|
| **Codename** | ClawAcademy |
| **Version** | 2.0 - Extended |
| **Status** | Draft |
| **Datum** | 2025-03-21 |
| **Product Owner** | Jörn-Christoph Kleemann |
| **Team** | JCK + Claude + 3 Co-Founders |

---

## Executive Summary

**ClawAcademy** ist eine kostenlose Lernplattform für Teenager (13-19 Jahre), die KI-Tools, Agent-Entwicklung und Full-Stack Development mit einem **AI-First Ansatz** lehrt. Die KI schreibt den Code, der User lernt Prompting.

### Vision Statement

> "Jeder Teenager soll KI-Tools nutzen und Apps bauen können – egal ob Anfänger oder Fortgeschrittener. Wir befähigen die nächste Generation von Entwicklern durch praktische KI-Agent-Entwicklung."

### Mission

1. **Bildung**: Kostenlose, hochwertige KI-Entwicklungs-Schulung
2. **Chancen**: Sponsoring-Programme verbinden Talente mit Firmen
3. **Community**: Netzwerk von jungen Entwicklern aufbauen
4. **Zukunft**: Nachwuchstalente für die Tech-Industrie gewinnen

---

## 1. Zielgruppe (Personas)

### Primary Persona: "Der Neugierige" (13-16 Jahre)

**Profil:**
- **Name**: Leo
- **Alter**: 14 Jahre
- **Schule**: 8. Klasse Gymnasium
- **Tech-Skills**: Smartphone-Profi, spielt Minecraft/Roblox
- **Coding**: Null Vorkenntnisse
- **Geräte**: Familien-Laptop (Windows MacBook)
- **Zeit**: 15-30 Minuten am Tag nach der Schule

**Motivation:**
- Spass am Lernen
- Games und Apps verstehen
- Von Freunden beeindrucken
- Maybe später Geld verdienen

**Pain Points:**
- Schul-Unterricht ist langweilig
- Keine Ahnung wo man anfängt
- Zu viel Fachchinesisch in Tutorials

**Goals:**
- Erste eigene Webseite bauen
- KI für Hausaufgaben nutzen
- In der Gruppe cool sein

---

### Secondary Persona: "Der Coder" (15-18 Jahre)

**Profil:**
- **Name**: Mira
- **Alter**: 16 Jahre
- **Schule**: 10. Klasse, Informatik AG
- **Tech-Skills**: HTML/CSS Grundlagen, bisschen JavaScript
- **Coding**: Hat mal ein YouTube Tutorial gemacht
- **Geräte**: Eigener MacBook Air
- **Zeit**: 1-2 Stunden am Tag

**Motivation:**
- Portfolio für Praktika aufbauen
- Eigene Ideen realisieren
- Karriere in Tech

**Pain Points:**
- Tutorials sind zu kompliziert
- Kein Feedback auf Code
- Nichts "echtes" gebaut

**Goals:**
- Praktikum bei Tech-Firma
- eigene App veröffentlichen
- Online-Präsenz haben

---

### Tertiary Persona: "Der Developer" (16-19 Jahre)

**Profil:**
- **Name**: Tim
- **Alter**: 18 Jahre
- **Schule**: Abitur gemacht, Gap Year
- **Tech-Skills**: Fortgeschritten, mehrere Projekte
- **Coding**: Seit 3 Jahren aktiv, GitHub Profil
- **Geräte**: High-End MacBook Pro M3
- **Zeit**: 3+ Stunden am Tag

**Motivation:**
- Startup gründen
- Networking mit anderen Entwicklern
- Etwas Grosses bauen

**Pain Points:**
- Keine Gleichgesinnten in der Umgebung
- Keine Verbindung zu Industrie
- Wissen fehlt für echtes Scaling

**Goals:**
- Startup mit Funding
- Tech-Community aufbauen
- Full-Stack Master werden

---

## 2. Core Features

### 2.1 Rank System (Progression)

| Rank | XP Required | Level | Benefits | Badge |
|------|-------------|-------|----------|-------|
| **Novice** | 0-999 | 1-9 | Lektionen freischalten | 🌱 |
| **Coder** | 1,000-4,999 | 10-19 | Projekte hochladen | 💻 |
| **Developer** | 5,000-14,999 | 20-29 | Scoutbar für Firmen | 🚀 |
| **Architect** | 15,000-49,999 | 30-39 | Mentorship Zugang | 🏗️ |
| **Master** | 50,000-99,999 | 40-49 | Exklusive Events | 👑 |
| **Legend** | 100,000+ | 50+ | Hall of Fame | 🏆 |

**XP-Quellen detailliert:**

| Aktivität | XP | Bedingungen |
|-----------|-----|-------------|
| Lektion abschliessen (Beginner) | +50 | Quiz bestanden |
| Lektion abschliessen (Intermediate) | +100 | Quiz bestanden |
| Lektion abschliessen (Advanced) | +200 | Quiz bestanden |
| Täglicher Login | +10 | Einmal pro Tag |
| 3-Tage Streak | +30 Bonus | 3 Tage am Stück |
| 7-Tage Streak | +100 Bonus | 7 Tage am Stück |
| 30-Tage Streak | +500 Bonus | 30 Tage am Stück |
| Projekt hochladen | +100 | Peer Review bestanden |
| Projekt hochladen (Exzellent) | +500 | 4.5+ Sterne |
| Hackathon Teilnahme | +200 | Eingereicht |
| Hackathon Gewinner | +1,000 | 1. Platz |
| Hackathon 2. Platz | +500 | 2. Platz |
| Hackathon 3. Platz | +250 | 3. Platz |
| Event Teilnahme | +150 | AMA, Workshop |
| Mentor-Stunden geben | +50 | Pro Stunde |

**Ränge verlieren:**

| Grund | XP Verlust |
|-------|------------|
| Inaktivität 7 Tage | -5% des aktuellen XP |
| Inaktivität 30 Tage | -25% des aktuellen XP |
| Schlechtes Projekt (<2 Sterne) | -200 XP |
| Quiz wiederholt failed | -10 XP pro failed |
| Regelverstoss | -500 bis -2,000 |

---

### 2.2 Leaderboard & Sponsoring

**Leaderboard Arten:**

1. **Global Leaderboard**
   - Top 100 aller User
   - Real-time Updates
   - Jeder ist sichtbar

2. **Wochen-Leaderboard**
   - Top 50 der Woche
   - Jeden Montag reset
   - Wochen-Champion Badge

3. **Monats-Leaderboard**
   - Top 50 des Monats
   - Monatlicher Champion
   - Grössere Preise

4. **Friends Leaderboard**
   - Nur Freunde
   - Privater Wettbewerb
   - Motivation durch Peers

**Sponsoring-Tabelle:**

| Platz | Sponsor-Paket | Wert |
|-------|---------------|------|
| **#1** | Premium Sponsor | €500-€2,000 + Praktikum |
| **#2** | Gold Sponsor | €300-€1,000 + Praktikum |
| **#3** | Silver Sponsor | €200-€500 + Praktikum |
| **#4-10** | Bronze Scout | Sichtbarkeit, Kontaktmöglichkeiten |
| **#11-100** | Discovery | Profil durchsuchbar für Firmen |

**Sponsor-Sperre (Anti-Monopol):**
- Nach 3+ Siegen in Top 3: 1 Monat Sponsor-Sperre
- Aber: weiterhin Scoutbar für Firmen
- Zweck: Andere bekommen auch Chancen
- Fairness-System

**Scout-System für Firmen:**
- Filter: Skills, Rank, Standort, Verfügbarkeit
- Vollständiges Profil mit Statistiken
- ProjektePortfolio
- Direkte Kontaktanfrage
- Praktikumsplatz-Angebote

---

### 2.3 Lektionen-Format (Micro-Learning)

**Struktur einer Lektion (max. 15 Minuten):**

```markdown
# Lektion: Prompt Engineering Grundlagen

## 1. Konzept-Erklärung (2-3 Min)
[Kurzer, knackiger Text mit Beispielen]

## 2. Prompt Example (Copy & Paste)
```prompt
Dein perfekt formulierter Prompt hier
```

## 3. Schritt-für-Schritt Guide (5-7 Min)
1. Öffne KI-Tool X
2. Kopiere Prompt
3. Füge ein und drücke Send
4. Beobachte Ergebnis
5. Passe an und lerne

## 4. Commands & Tools (2-3 Min)
- Welches Tool?
- Warum genau dieses?
- Alternativen
- Kosten (Gratis vs Paid)

## 5. Quiz (2-3 Min)
[3-5 Fragen Multiple Choice oder Prompt schreiben]
```

**Lektionen-Kategorien:**

| Kategorie | Anzahl Lektionen | XP Total |
|-----------|------------------|----------|
| KI-Basics | 10 | 500-1,500 |
| Prompt Engineering | 15 | 1,000-2,500 |
| Web-Dev (Next.js) | 20 | 1,500-3,500 |
| Mobile-Dev (React Native) | 15 | 1,000-3,000 |
| KI-Agenten (LangChain) | 20 | 2,000-4,500 |
| AGI-Sicherheit | 5 | 500-1,000 |
| Security | 15 | 1,000-2,500 |
| **TOTAL** | **100** | **7,500-18,500** |

---

### 2.4 Sponsoren-Marktplatz

**Für Firmen (Sponsoren):**

| Sponsor-Tier | Preis/Monat | Leistungen |
|--------------|-------------|------------|
| **Bronze** | €500 | Logo Footer, 1 Scout/Monat, Basic Profile Access |
| **Silver** | €1,500 | Logo Header, 5 Scouts/Monat, Event Sponsor, Featured Profile |
| **Gold** | €5,000 | Alles + Named Hackathon, Mentorship Programm, Priority Support, Quarterly Event |
| **Platinum** | €15,000 | Alles + Exclusive Hiring Pipeline, Branded Content, Annual Keynote, Custom Integration |

**Sponsor-Funktionen:**
- Advanced Filters (Skills, Stack, Location, Availability)
- Bulk Contact Requests
- Talent Pool Management
- Analytics (Views, Contact Rate, Hire Rate)
- Branded Company Profile
- Job Posting Board
- Virtual Career Fair Booths

---

## 3. Curriculum (Detailliert)

### Modul 1: KI-Grundlagen (10 Lektionen, ~3 Stunden)

1. **Was ist KI?** - Begriffe, ML vs DL vs AGI
2. **KI-Tools Übersicht** - Claude, GPT, DeepSeek, Local LLMs
3. **Prompt Engineering 1** - Grundstruktur
4. **Prompt Engineering 2** - Few-shot, Chain-of-Thought
5. **Prompt Engineering 3** - Role Playing, Context
6. **Kostenlose Tools** - Wo findet man gratis KI
7. **Beste Tools** - Wann sich was lohnt
8. **API Basics** - Wie funktioniert API Calling
9. **KI-Ethik** - Verantwortungsvoller Umgang
10. **Erste prompts** - Praktische Beispiele

### Modul 2: Web-Entwicklung (20 Lektionen, ~6 Stunden)

11. **Web-Basics** - HTML, CSS, JS in 15 Min
12. **React Basics** - Components, Props, State
13. **Next.js Intro** - Warum Next.js?
14. **Next.js App Router** - Pages, Layouts
15. **Tailwind CSS** - Utility-first Styling
16. **shadcn/ui** - Copy-Paste Components
17. **Supabase Basics** - Database as a Service
18. **Supabase Auth** - User Authentication
19. **Vercel Deployment** - In 5 Min live
20. **Alternativen** - Cloudflare, Netlify, Railway
21. **Data Fetching** - Server Actions, Streaming
22. **State Management** - Zustand, Context
23. **Forms** - Server Actions, Validation
24. **API Routes** - Backend im Frontend
25. **File Upload** - Images, Documents
26. **Realtime** - Supabase Realtime
27. **SEO** - Metadata, Social Cards
28. **Analytics** - Posthog, Vercel Analytics
29. **Error Handling** - Error Boundaries
30. **Performance** - Caching, Optimisation

### Modul 3: Mobile-Entwicklung (15 Lektionen, ~5 Stunden)

31. **Mobile Basics** - Native vs Cross-Platform
32. **React Native Intro** - Write Once, Run Everywhere
33. **Expo** - Der einfachste Weg
34. **Native Components** - Views, Text, Images
35. **Navigation** - React Navigation
36. **State** - AsyncStorage, State Management
37. **API Calls** - Fetch in Mobile
38. **Push Notifications** - Expo Notifications
39. **App Icons & Splash** - Branding
40. **Build & Deploy** - EAS Build
41. **App Store** - iOS Submission
42. **Play Store** - Android Submission
43. **Flutter Alternative** - When to use
44. **Swift Basics** - Native iOS
45. **Kotlin Basics** - Native Android

### Modul 4: KI-Agenten (20 Lektionen, ~8 Stunden)

46. **Was sind Agenten?** - KI die für uns denkt
47. **LangChain Intro** - Framework für Agenten
48. **Prompts & Chains** - Erste Chain bauen
49. **Memory** - Agenten die sich erinnern
50. **Tools** - Function Calling
51. **Agents** - Autonome Entscheidungen
52. **Multi-Agent** - Agent Teams
53. **LangGraph** - Visual Agent Workflows
54. **RAG Basics** - Retrieval Augmented Generation
55. **Vector DBs** - Pinecone, Weaviate, Supabase Vector
56. **Embeddings** - Text in Vektor
57. **Fine-Tuning Intro** - Model anpassen
58. **LoRA** - Effizientes Fine-Tuning
59. **Ollama Local** - Eigene LLMs laufen
60. **MLX** - Apple Silicon Optimisation
61. **Prompt Templates** - Wiederverwendbare Prompts
62. **Output Parsers** - Strukturierte Antworten
63. **Agent Tools** - Web Search, Calculator, Code
64. **Safety** - Agent Limits, Guardrails
65. **Production** - Deployment, Monitoring

### Modul 5: AGI-Sicherheit (5 Lektionen, ~2 Stunden)

66. **Paperclip Maximizer** - Alignment Problem
67. **Reward Hacking** - Wenn KI cheatet
68. **Open Claw** - (TBD nach Research)
69. **Safe Development** - Sicherheits-Prinzipien
70. **Future** - Was kommt als nächstes

### Modul 6: Security (15 Lektionen, ~5 Stunden)

71. **OWASP Top 10** - Die gefährlichsten Angriffe
72. **XSS Prevention** - Cross-Site Scripting
73. **SQL Injection** - Database Attacks
74. **Authentication** - Sicheres Login
75. **Authorization** - Wer darf was
76. **API Security** - Keys, Rate Limiting
77. **Secrets Management** - .env, Vault
78. **HTTPS** - SSL/TLS Basics
79. **Input Validation** - Nie vertrauen
80. **Output Encoding** - Safe Rendering
81. **CSRF** - Cross-Site Request Forgery
82. **Dependencies** - Supply Chain Security
83. **Pen Testing** - Selbst angreifen
84. **Bug Bounty** - Rewards finden
85. **Compliance** - DSGVO, COPPA

---

## 4. Gamification (Engagement)

### Achievements (Badges)

| Category | Achievement | Requirement | XP Bonus |
|----------|-------------|-------------|----------|
| **First Steps** | 🎓 First Lesson | Erste Lektion abgeschlossen | +50 |
| | 📚 Bookworm | 10 Lektionen abgeschlossen | +100 |
| | 🧠 Knowledge | 50 Lektionen abgeschlossen | +500 |
| **Streaks** | 🔥 On Fire | 3-Tage Streak | +30 |
| | 💪 Dedicated | 7-Tage Streak | +100 |
| | 👑 Legendary | 30-Tage Streak | +500 |
| **Projects** | 🛠️ Builder | Erstes Projekt hochgeladen | +100 |
| | 🏗️ Architect | 5 Projekte | +300 |
| | 🎯 Creator | 10 Projekte | +500 |
| **Social** | 👥 Connected | 5 Freunde | +50 |
| | 🤝 Mentor | Erste Mentor-Stunde | +100 |
| | 🌟 Influencer | 10 Follower | +200 |
| **Events** | 🎪 Participant | Erstes Event | +150 |
| | 🏆 Champion | Hackathon Gewinner | +1,000 |
| | 💎 Sponsored | Erster Sponsor | +500 |
| **Special** | 🦾 Early Adopter | Beta User | +1,000 |
| | 🎨 Artist | Custom Avatar | +100 |
| | 📝 Writer | Forum Post 100+ Upvotes | +200 |

### Story Mode (Missionen)

**Chapter 1: Hello World**
- Mission 1: Erste Webseite bauen
- Mission 2: KI-Tool nutzen
- Mission 3: Prompt perfektionieren
- Belohnung: +500 XP, Badge "Hello World"

**Chapter 2: Web Developer**
- Mission 1: Next.js App deployen
- Mission 2: Supabase verbinden
- Mission 3: Auth hinzufügen
- Belohnung: +1,000 XP, Badge "Web Dev"

**Chapter 3: AI Engineer**
- Mission 1: Erster Agent
- Mission 2: RAG System
- Mission 3: Fine-Tuned Model
- Belohnung: +2,000 XP, Badge "AI Engineer"

**Chapter 4: Mobile Master**
- Mission 1: React Native App
- Mission 2: App Store Submission
- Mission 3: 100 Downloads
- Belohnung: +1,500 XP, Badge "Mobile Dev"

**Chapter 5: Legend**
- Mission 1: Sponsor gewinnen
- Mission 2: Hackathon gewinnen
- Mission 3: Mentor werden
- Belohnung: +5,000 XP, Badge "Legend"

### Daily Rewards

| Tag | Belohnung |
|-----|-----------|
| 1 | +10 XP |
| 2 | +15 XP |
| 3 | +20 XP + 30 XP Streak Bonus |
| 4 | +25 XP |
| 5 | +30 XP |
| 6 | +35 XP |
| 7 | +40 XP + 100 XP Streak Bonus |
| 14 | +500 XP (2 Wochen) |
| 30 | +1,000 XP (1 Monat) |
| 100 | +5,000 XP (100 Tage) |
| 365 | +25,000 XP (1 Jahr!) |

---

## 5. Technical Requirements

### Tech Stack (Next.js 15 + React 19)

```yaml
Frontend:
  Framework: Next.js 15.2 (App Router)
  React: 19.x (Latest)
  TypeScript: 5.x (Strict Mode)
  Styling: Tailwind CSS 4.x
  Components: shadcn/ui (Radix UI + Tailwind)
  Icons: Lucide React
  Forms: React Hook Form + Zod
  State: Zustand (Client) + Server Actions
  i18n: next-intl

Backend:
  API: Next.js Route Handlers + Server Actions
  Database: Supabase (PostgreSQL 16)
  Auth: Supabase Auth
  Storage: Supabase Storage
  Realtime: Supabase Realtime
  Edge Functions: Supabase Edge Functions
  Queue: Supabase Queue (for background jobs)

Infrastructure:
  Hosting: Vercel
  CDN: Vercel Edge Network
  DNS: Cloudflare (optional)
  Analytics: PostHog + Vercel Analytics
  Error Tracking: Sentry
  Monitoring: Vercel Speed Insights
  Email: Resend (for transactional emails)

AI:
  Primary: Claude (Anthropic)
  Secondary: DeepSeek (cost-effective)
  Review AI: Custom Fine-tuned Model (future)
  Embeddings: OpenAI text-embedding-3-small
  Vector: Supabase Vector (pgvector)

Development:
  Package Manager: pnpm
  Linter: ESLint + Biome
  Formatter: Biome (faster than Prettier)
  Type Checker: tsc
  Git Hooks: Husky + lint-staged
  Testing: Vitest (unit), Playwright (e2e)
```

### Next.js 15 + React 19 Features

**Partial Prerendering (PPR):**
- Static Shell rendert sofort
- Dynamic Parts streamen ein
- `<Suspense>` Boundaries definieren Splits
-大幅度 verbesserte LCP/TTI

**Server Actions (Stable):**
- Form Mutations ohne API Routes
- Progressive Enhancement
- Automatic Error Handling
- Revalidation

**React 19 Features:**
- `use()` Hook für Resources
- Verbesserte Suspense
- Actions in Forms
- `<form>` automatisch client-side

**Turbopack (Default in Dev):**
- Bis zu 500x schneller Updates
- Bessere DX

### Performance Targets

| Metric | Target | Why |
|--------|--------|-----|
| LCP (Largest Contentful Paint) | < 2.5s | Core Web Vitals Good |
| FID (First Input Delay) | < 100ms | Core Web Vitals Good |
| CLS (Cumulative Layout Shift) | < 0.1 | Core Web Vitals Good |
| TTFB (Time to First Byte) | < 0.8s | Fast Server |
| FCP (First Contentful Paint) | < 1.8s | Fast Perceived Load |
| TTI (Time to Interactive) | < 3.8s | Fast Interactivity |
| Lighthouse Score | > 90 | Overall Quality |

### Security Requirements

- **HTTPS only** (no HTTP)
- **HSTS** enabled
- **CSP** (Content Security Policy)
- **XSS Protection** via React auto-escaping
- **SQL Injection Prevention** via Supabase RLS
- **Rate Limiting** on all public endpoints
- **CSRF Protection** via SameSite cookies
- **Input Validation** via Zod schemas
- **Secrets** in environment variables only
- **Dependency Scanning** via Depcheck + Snyk

---

## 6. Non-Functional Requirements

### Scalability

| Metric | Target | Timeline |
|--------|--------|----------|
| Concurrent Users | 1,000 | MVP |
| | 10,000 | Phase 2 |
| | 100,000 | Phase 3 |
| Database Rows | 1M+ | Phase 2 |
| Storage | 100GB+ | Phase 2 |
| API Requests/Minute | 1,000 | MVP |
| | 10,000 | Phase 2 |

### Availability

- **Uptime Target**: 99.5% ( ~3.65 days downtime/year)
- **Backup**: Daily backups, 30-day retention
- **Disaster Recovery**: RTO < 4h, RPO < 1h
- **Monitoring**: 24/7 checks

### Accessibility

- **WCAG 2.1 AA** compliant
- **Screen Reader** friendly
- **Keyboard Navigation** fully functional
- **Color Contrast** minimum 4.5:1
- **Font Sizing** resizable up to 200%

### Internationalization

- **Languages**: German (primary), English (secondary)
- **RTL Support**: Future consideration (Arabic)
- **Date/Time**: Localized formats
- **Currency**: EUR (primary), future: USD, GBP

---

## 7. Data Model

### Schema Overview

```sql
-- Users & Profiles
profiles (id, username, avatar_url, rank, xp, level, streak, created_at)

-- Content
lessons (id, title, slug, category, difficulty, content, xp_reward, duration, order_index)
lesson_progress (user_id, lesson_id, completed_at, quiz_score)

-- Projects
projects (id, user_id, title, description, github_url, screenshot_url, tech_stack, rating_count, rating_sum, created_at)

-- Achievements
achievements (id, title, description, icon, requirement_type, requirement_value, xp_bonus)
user_achievements (user_id, achievement_id, unlocked_at)

-- Gamification
daily_logins (user_id, login_date, streak_count)
xp_transactions (id, user_id, amount, source, reference_id, created_at)

-- Community
friends (user_id, friend_id, status, created_at)
notifications (id, user_id, type, title, content, read, created_at)

-- Sponsors
sponsors (id, company_name, logo_url, tier, contact_email, created_at)
sponsorships (id, sponsor_id, user_id, status, created_at, expires_at)

-- Hackathons
hackathons (id, title, description, start_date, end_date, prizes, created_at)
hackathon_submissions (id, hackathon_id, user_id, project_url, rank, prize, created_at)

-- Admin
admin_roles (user_id, role, granted_at, granted_by)
audit_logs (id, actor_id, action, entity_type, entity_id, changes, created_at)
```

---

## 8. Success Metrics (KPIs)

### User Metrics

| Metric | MVP (3mo) | Phase 2 (6mo) | Phase 3 (12mo) |
|--------|-----------|---------------|----------------|
| Signups | 1,000 | 5,000 | 25,000 |
| MAU (Monthly Active) | 500 | 2,500 | 12,500 |
| DAU/MAU Ratio | 20% | 25% | 30% |
| Retention (D7) | 30% | 35% | 40% |
| Retention (D30) | 15% | 20% | 25% |

### Content Metrics

| Metric | MVP (3mo) | Phase 2 (6mo) | Phase 3 (12mo) |
|--------|-----------|---------------|----------------|
| Lessons Published | 30 | 75 | 150 |
| Lessons Completed | 5,000 | 50,000 | 500,000 |
| Avg Completion Rate | 60% | 65% | 70% |
| Projects Uploaded | 200 | 2,000 | 20,000 |
| Avg Project Rating | 3.5/5 | 3.7/5 | 4.0/5 |

### Sponsor Metrics

| Metric | MVP (3mo) | Phase 2 (6mo) | Phase 3 (12mo) |
|--------|-----------|---------------|----------------|
| Active Sponsors | 5 | 25 | 100 |
| Sponsorships Placed | 10 | 100 | 1,000 |
| Avg Sponsor Value | €500 | €750 | €1,000 |
| Internship Placements | 2 | 20 | 200 |

### Community Metrics

| Metric | MVP (3mo) | Phase 2 (6mo) | Phase 3 (12mo) |
|--------|-----------|---------------|----------------|
| Discord Members | 500 | 2,500 | 15,000 |
| Daily Active Discord | 100 | 500 | 3,000 |
| Hackathon Participants | 50 | 250 | 1,500 |
| Mentor Hours Logged | 50 | 500 | 5,000 |

---

## 9. Roadmap (Phased)

### Phase 1: MVP (Months 1-3)

**Sprint 1 (Weeks 1-2): Foundation**
- [ ] Project setup (Next.js 15, TypeScript, Tailwind)
- [ ] Supabase project + schema
- [ ] Authentication (Email + OAuth)
- [ ] Basic UI components (shadcn/ui)

**Sprint 2 (Weeks 3-4): Core Features**
- [ ] User profiles + rankings
- [ ] XP system + progression
- [ ] First 10 lessons (KI-Basics)
- [ ] Leaderboard

**Sprint 3 (Weeks 5-6): Content**
- [ ] Lesson browser + filters
- [ ] Quiz system
- [ ] 20 more lessons (Web Dev intro)
- [ ] Achievements system

**Sprint 4 (Weeks 7-8): Polish**
- [ ] Projects upload
- [ ] Daily streaks
- [ ] Notifications
- [ ] German translations

**Sprint 5 (Weeks 9-10): Launch**
- [ ] Beta testing with 50 users
- [ ] Bug fixes
- [ ] Marketing site
- [ ] Discord setup
- [ ] Soft launch

**Sprint 6 (Weeks 11-12): Learn**
- [ ] User feedback analysis
- [ ] Quick improvements
- [ ] First hackathon (beta)
- [ ] First sponsor onboard

### Phase 2: Growth (Months 4-9)

**Content Expansion**
- [ ] 50+ lessons total
- [ ] Video content (select lessons)
- [ ] Interactive coding challenges

**Platform Features**
- [ ] Sponsors marketplace
- [ ] Advanced filters
- [ ] Messaging system
- [ ] Team matchmaking

**Community**
- [ ] Mentorship program
- [ ] Monthly hackathons
- [ ] Guest speaker series
- [ ] Discord events

**Monetization**
- [ ] Affiliate partnerships
- [ ] First sponsors onboarded
- [ ] Sponsor tiers activated

### Phase 3: Scale (Months 10-24)

**Mobile**
- [ ] PWA (Progressive Web App)
- [ ] Offline mode for lessons
- [ ] Push notifications

**Content**
- [ ] 100+ lessons
- [ ] Course bundles
- [ ] Certificates (internal)

**Advanced Features**
- [ ] AI-powered code review
- [ ] Custom learning paths
- [ ] Peer code review
- [ ] Leaderboard leagues

**International**
- [ ] French translation
- [ ] Spanish translation
- [ ] EU expansion

### Phase 4: Ecosystem (Months 25+)

**Native Apps**
- [ ] iOS app (Swift/SwiftUI)
- [ ] Android app (Kotlin/Compose)

**Professional**
- [ ] Accredited certificates
- [ ] University partnerships
- [ ] Job board
- [ ] Career coaching

**Enterprise**
- [ ] B2B sponsor platform
- [ ] White-label option
- [ ] Analytics dashboard for sponsors

---

## 10. Legal & Compliance

### Required Documents

| Document | Required By | Status |
|----------|-------------|--------|
| Impressum | DSGVO | TBD |
| Datenschutz (Privacy Policy) | DSGVO | TBD |
| AGB (Terms of Service) | DSGVO | TBD |
| Cookie Policy | DSGVO | TBD |
| Elterliche Einwilligung | COPPA/DSGVO | TBD |

### Age Verification

- **< 13 years**: No access (COPPA)
- **13-15 years**: Parental consent required
- **16-17 years**: Parent notification optional
- **18+ years**: Full access

### Data Protection

- **Hosting**: EU (Frankfurt) for DSGVO compliance
- **Data Export**: Available to user
- **Data Deletion**: Right to be forgotten
- **Data Portability**: GDPR export
- **Cookie Consent**: First-visit modal

### Content Moderation

- **AI Filters**: Toxic language detection
- **User Reports**: Flag system
- **Human Review**: For serious violations
- **Ban Policy**: 3 strikes system

### Safety Measures

- **Community Guidelines**: Published and enforced
- **Anti-Bullying**: Zero tolerance
- **Safe Space**: Mental health resources
- **Crisis Support**: Link to help resources

---

## 11. Open Questions

| ID | Question | Priority | Owner | Due |
|----|----------|----------|-------|-----|
| Q1 | Open Claw - Was genau ist es? | HIGH | JCK | ASAP |
| Q2 | Finaler Plattform-Name | HIGH | Team | W2 |
| Q3 | Hosting Location (EU vs US) | MEDIUM | Team | W3 |
| Q4 | Quiz Format Finalisierung | MEDIUM | Team | W4 |
| Q5 | Sponsor Fee Model | LOW | Team | M2 |
| Q6 | Offline Content Strategy | LOW | Team | M6 |
| Q7 | Certificate Accreditation | LOW | Team | M12 |

---

## 12. Dependencies

| Dependency | Type | Owner | Status |
|------------|------|-------|--------|
| Branding finalized | External | Designer | Pending |
| Domain registered | External | JCK | Pending |
| Supabase setup | Technical | Dev | Pending |
| Legal documents | Legal | Lawyer | Pending |
| First sponsors | Business | JCK | Pending |
| Beta users | Community | Team | Pending |

---

## 13. Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low user adoption | High | Medium | Strong marketing, school partnerships |
| Sponsor attraction fails | High | Low | Multiple revenue streams, bootstrappable |
| Technical scalability issues | Medium | Medium | Cloud-native architecture, monitoring |
| Legal/Compliance issues | High | Low | Legal review from day 1 |
| Content quality inconsistency | Medium | Medium | AI review + peer review |
| Competitor copies model | Medium | High | First-mover, community moat |
| Teen engagement drops | High | Medium | Gamification, continuous feedback |

---

## 14. Team

| Role | Name | Commitment |
|------|------|------------|
| CEO/Founder | Jörn-Christoph Kleemann | 100% |
| Co-Founder (AI/Strategy) | Claude | 100% |
| Co-Founder #3 | TBD | TBD |
| Co-Founder #4 | TBD | TBD |
| Co-Founder #5 | TBD | TBD |
| Advisor (Legal) | Claude (temp) | Ad-hoc |
| Advisor (Design) | Claude (temp) | Ad-hoc |

---

## Appendices

### A. Glossary

- **XP**: Experience Points - Punkte für Fortschritt
- **RLS**: Row Level Security - Supabase Security Feature
- **PPR**: Partial Prerendering - Next.js 15 Feature
- **AGI**: Artificial General Intelligence
- **RAG**: Retrieval Augmented Generation
- **LLM**: Large Language Model

### B. References

- Nick Bostrom - Superintelligence (2014)
- Next.js 15 Documentation
- Supabase Documentation
- React 19 Documentation

---

*Document Owner: Jörn-Christoph Kleemann*
*Last Updated: 2025-03-21*
*Version: 2.0 Extended*
