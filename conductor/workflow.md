# Workflow: ClawAcademy

## Development Methodology

**Git Flow** mit Feature Branches

```bash
main          # Production
├── develop   # Integration branch
└── feature/* # Feature branches
```

---

## Git Workflow

### Branch Creation
```bash
git checkout develop
git pull origin develop
git checkout -b feature/feature-name
```

### Commit Convention (Conventional Commits)
```bash
feat: add user authentication
fix: resolve XSS vulnerability
docs: update README
style: format code with prettier
refactor: simplify XP calculation
test: add tests for quiz system
chore: update dependencies
```

### Pull Request
- Target: `develop`
- Required: 1 approval
- Required: CI checks pass
- Required: No merge conflicts

### Release
```bash
git checkout develop
git merge feature/*
# QA testing
git checkout main
git merge develop --no-ff
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
```

---

## Code Quality Standards

### TypeScript Rules
- Strict mode enabled
- No `any` types
- All functions typed
- Interfaces over types for objects
- Explicit return types

### Naming Conventions
```typescript
// Components: PascalCase
export const UserProfile: FC = () => {}

// Hooks: camelCase with 'use' prefix
export const useUserProfile = () => {}

// Utils/Functions: camelCase
export const calculateXp = (base: number) => {}

// Constants: UPPER_SNAKE_CASE
export const MAX_XP_DAILY = 1000

// Files: kebab-case
// user-profile.tsx
// use-user-profile.ts
// xp-calculator.ts
```

### File Organization
```
app/
  (auth)/
  (dashboard)/
  api/
components/
  ui/           # shadcn components
  features/     # Feature-specific components
lib/
  supabase/
  utils/
types/
  index.ts
public/
  images/
  fonts/
```

---

## Testing Requirements

### Unit Tests (Vitest)
- Coverage target: 70%
- All utility functions tested
- All custom hooks tested
- Critical business logic tested

### E2E Tests (Playwright)
- Critical user flows:
  - Sign up → Login
  - Complete lesson
  - Upload project
  - View leaderboard

### Test Command
```bash
pnpm test              # Unit tests
pnpm test:watch        # Watch mode
pnpm test:e2e          # E2E tests
pnpm test:coverage     # Coverage report
```

---

## Code Review Requirements

### Before PR
- [ ] Self-review complete
- [ ] Tests pass locally
- [ ] Linter passes
- [ ] Typecheck passes
- [ ] Documentation updated (if needed)

### Reviewer Checklist
- [ ] Code follows conventions
- [ ] Logic is correct
- [ ] No security issues
- [ ] Tests added/updated
- [ ] No unnecessary changes

---

## Quality Gates

### Pre-commit (Husky)
```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### Pre-push
- [ ] All tests pass
- [ ] Typecheck passes
- [ ] Build succeeds

### CI/CD (Vercel)
- [ ] Lint check
- [ ] Type check
- [ ] Build check
- [ ] E2E tests

---

## Deployment Process

### Environments
```yaml
Development: Vercel Preview (on PR)
Staging: vercel-staging.prod
Production: vercel.prod
```

### Deploy to Production
```bash
# Via Vercel Dashboard
# Or via GitHub merge to main
```

### Database Migrations
```bash
supabase db push
# Or via Supabase Dashboard
```

---

## Issue Tracking

### Bug Report Template
```markdown
## Description
Clear description of bug

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser:
- OS:
- User role:
```

### Feature Request Template
```markdown
## Problem
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives
What other approaches did you consider?

## Priority
Low / Medium / High
```

---

## Documentation Standards

### Code Comments
- JSDoc for functions
- Explain WHY, not WHAT
- Keep comments up to date

### README Standards
- Installation instructions
- Development setup
- Environment variables
- Testing commands
- Deployment process

---

## Incident Response

### Severity Levels
- **P0**: Site down (all hands)
- **P1**: Critical feature broken (immediate)
- **P2**: Important feature degraded (24h)
- **P3**: Minor issue (1 week)

### Postmortem
- What happened
- Impact
- Root cause
- Resolution
- Prevention (next steps)

---

*Last Updated: 2025-03-21*
