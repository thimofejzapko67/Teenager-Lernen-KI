# TypeScript Style Guide: ClawAcademy

## Core Principles

1. **Strict mode always** - No exceptions
2. **Type safety over convenience** - No `any` without justification
3. **Explicit over implicit** - Explicit return types, explicit generics
4. **Readability** - Code is read more than written

---

## Type Definitions

### Interfaces vs Types

```typescript
// ✅ Use interfaces for objects that can be extended
interface User {
  id: string
  username: string
  rank: Rank
}

interface UserWithProfile extends User {
  bio?: string
  avatarUrl?: string
}

// ✅ Use types for unions, aliases, mapped types
type Rank = 'novice' | 'coder' | 'developer' | 'architect' | 'master' | 'legend'

type XpTransaction = {
  amount: number
  source: 'lesson' | 'project' | 'streak' | 'event'
  timestamp: Date
}

// ✅ Use types for utility transformations
type Nullable<T> = T | null
type Optional<T> = T | undefined
type Json = string | number | boolean | null | Json[] | { [key: string]: Json }
```

---

## Functions

### Function Declarations

```typescript
// ✅ Explicit return type
function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

// ✅ Async functions return Promise
async function getUserProfile(id: string): Promise<User | null> {
  const { data } = await supabase.from('profiles').select().eq('id', id).single()
  return data
}

// ✅ Generic functions with constraints
function first<T>(items: T[]): T | undefined {
  return items[0]
}
```

### Arrow Functions

```typescript
// ✅ Short, pure functions
const addXp = (current: number, amount: number): number => current + amount

// ✅ Event handlers
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // ...
}
```

---

## React Components

### Component Types

```typescript
// ✅ Function Components with FC
import { type FC } from 'react'

interface UserProfileProps {
  username: string
  rank: Rank
  onEdit?: () => void
}

export const UserProfile: FC<UserProfileProps> = ({ username, rank, onEdit }) => {
  return (
    <div>
      <h2>{username}</h2>
      <span>{rank}</span>
      {onEdit && <button onClick={onEdit}>Edit</button>}
    </div>
  )
}
```

### Children Prop

```typescript
// ✅ Explicit children type
interface CardProps {
  children: React.ReactNode
  header?: string
}

export const Card: FC<CardProps> = ({ children, header }) => {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      {children}
    </div>
  )
}
```

---

## Custom Hooks

```typescript
// ✅ Hook naming convention: use + PascalCase
// ✅ Return tuple for mutable values, object for readonly
import { useState, useCallback } from 'react'

interface UseUserProfileReturn {
  user: User | null
  loading: boolean
  error: Error | null
  refresh: () => Promise<void>
}

export function useUserProfile(userId: string): UseUserProfileReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchUserProfile(userId)
      setUser(data)
    } catch (e) {
      setError(e as Error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { user, loading, error, refresh }
}
```

---

## Supabase Types

```typescript
// ✅ Generate types from Supabase schema
// types/database.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          rank: Rank
          xp: number
          level: number
          streak: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      // ... other tables
    }
  }
}

// ✅ Use generated types
type Profile = Database['public']['Tables']['profiles']['Row']
type NewProfile = Database['public']['Tables']['profiles']['Insert']
```

---

## Server Actions (Next.js 15)

```typescript
// ✅ Server Actions with explicit types
'use server'

import { revalidatePath } from 'next/cache'

interface AddXpResult {
  success: boolean
  newTotal: number
  rankUp?: Rank
  error?: string
}

export async function addXpTransaction(
  userId: string,
  amount: number,
  source: XpSource
): Promise<AddXpResult> {
  try {
    const result = await supabase.rpc('add_xp', {
      p_user_id: userId,
      p_amount: amount,
      p_source: source
    })

    if (result.error) throw result.error

    revalidatePath('/dashboard')
    revalidatePath('/profile')

    return {
      success: true,
      newTotal: result.data.new_xp,
      rankUp: result.data.rank_up
    }
  } catch (error) {
    return {
      success: false,
      newTotal: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
```

---

## Error Handling

```typescript
// ✅ Result type for operations that can fail
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

async function safeFetch<T>(
  url: string
): Promise<Result<T>> {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

// Usage
const result = await safeFetch<User>('/api/user')
if (result.success) {
  console.log(result.data.username)
} else {
  console.error(result.error.message)
}
```

---

## Utility Types

```typescript
// ✅ Common utility patterns
type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type Exactly<T> = T & { [K: string]: never }

type Writable<T> = {
  -readonly [K in keyof T]: T[K]
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

// ✅ Make specific props required
type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>
```

---

## Imports

```typescript
// ✅ External dependencies first
import { useState, useEffect } from 'react'
import { clsx } from 'clsx'

// ✅ Internal imports second
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { type User } from '@/types'

// ✅ Type-only imports
import type { UserProfile } from '@/types/user'
```

---

## Enums vs Union Types

```typescript
// ❌ Avoid enums (they generate code)
enum Rank {
  Novice = 'novice',
  Coder = 'coder',
  // ...
}

// ✅ Use union types (better tree-shaking)
type Rank = 'novice' | 'coder' | 'developer' | 'architect' | 'master' | 'legend'

// ✅ For many values, use const object
const RANKS = {
  NOVICE: 'novice',
  CODER: 'coder',
  DEVELOPER: 'developer',
  ARCHITECT: 'architect',
  MASTER: 'master',
  LEGEND: 'legend'
} as const

type Rank = typeof RANKS[keyof typeof RANKS]
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"]
    }
  }
}
```

---

*Last Updated: 2025-03-21*
