# Tech Stack: ClawAcademy

## Primary Languages & Frameworks

```yaml
Frontend:
  Language: TypeScript 5.x (strict mode)
  Framework: Next.js 15.2 (App Router)
  UI Library: React 19.x
  Styling: Tailwind CSS 4.x
  Components: shadcn/ui (Radix UI + Tailwind)
```

---

## Key Dependencies

### Core
```json
{
  "next": "15.2.x",
  "react": "19.x",
  "typescript": "5.x",
  "@types/node": "latest",
  "@types/react": "latest"
}
```

### Styling
```json
{
  "tailwindcss": "4.x",
  "class-variance-authority": "^0.7.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

### UI Components
```json
{
  "@radix-ui/react-slot": "^1.x",
  "@radix-ui/react-dropdown-menu": "^2.x",
  "@radix-ui/react-dialog": "^1.x",
  "@radix-ui/react-tabs": "^1.x",
  "@radix-ui/react-avatar": "^1.x",
  "@radix-ui/react-progress": "^1.x",
  "@radix-ui/react-toast": "^1.x",
  "lucide-react": "latest"
}
```

### Backend/Database
```json
{
  "@supabase/supabase-js": "^2.x",
  "@supabase/ssr": "^0.x"
}
```

### Forms & Validation
```json
{
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "@hookform/resolvers": "^3.x"
}
```

### Internationalization
```json
{
  "next-intl": "^3.x"
}
```

### State Management
```json
{
  "zustand": "^5.x"
}
```

---

## Infrastructure & Deployment

```yaml
Hosting: Vercel
Database: Supabase (PostgreSQL 16)
Storage: Supabase Storage
Auth: Supabase Auth
Realtime: Supabase Realtime
Edge Functions: Supabase Edge Functions
CDN: Vercel Edge Network
DNS: Cloudflare (optional)
```

---

## Development Tools

```yaml
Package Manager: pnpm
Linter: ESLint + Biome
Formatter: Biome
Type Checker: tsc
Git Hooks: Husky + lint-staged
Testing: Vitest (unit), Playwright (e2e)
```

---

## Analytics & Monitoring

```yaml
Analytics: PostHog + Vercel Analytics
Error Tracking: Sentry
Performance: Vercel Speed Insights
Uptime: UptimeRobot (or similar)
```

---

## AI Services

```yaml
Primary LLM: Claude (Anthropic)
Secondary LLM: DeepSeek (cost-effective)
Embeddings: OpenAI text-embedding-3-small
Vector DB: Supabase Vector (pgvector)
Future: Custom Fine-tuned Model for review
```

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# AI (optional for user-provided keys)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Discord Bot
DISCORD_BOT_TOKEN=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_REDIRECT_URI=

# Email (Resend)
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Next.js 15 + React 19 Features Used

### Partial Prerendering (PPR)
- Static shell rendert sofort
- Dynamic parts streamen ein
- `<Suspense>` Boundaries für Splits

### Server Actions (Stable)
- Form Mutations ohne API Routes
- Progressive Enhancement
- Automatic Error Handling

### React 19 Features
- `use()` Hook für Resources
- Verbesserte Suspense
- Actions in Forms
- Automatic client-side `<form>`

### Turbopack
- Bis zu 500x schnellere Dev Updates
- Default in Next.js 15

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| TTFB | < 0.8s |
| Lighthouse | > 90 |

---

## Security Stack

- HTTPS only (Vercel automatic)
- HSTS enabled
- CSP headers
- Supabase RLS for database
- Zod for input validation
- Environment variables only for secrets
- No API keys in client code

---

*Last Updated: 2025-03-21*
